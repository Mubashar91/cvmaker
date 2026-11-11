// Shared helpers for the AI endpoints. Vercel does not deploy files that start with "_" as
// functions, so this module is only bundled into the handlers that import it.
import { createHash } from 'node:crypto';

export const MODEL = 'gpt-5-mini';
const OPENAI_URL = 'https://api.openai.com/v1/responses';

export function reply(res, status, body) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' });
  res.end(JSON.stringify(body));
}

/**
 * Method, origin, and content-type checks shared by every endpoint.
 * Replies and returns false when the request must stop.
 */
export function acceptRequest(req, res, messages) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    reply(res, 405, { error: messages.method });
    return false;
  }
  if (req.headers['sec-fetch-site'] === 'cross-site') {
    reply(res, 403, { error: messages.origin });
    return false;
  }
  if (!/^application\/json(?:\s*;|$)/i.test(req.headers['content-type'] || '')) {
    reply(res, 415, { error: messages.type });
    return false;
  }
  return true;
}

/** The Vercel project stores the key as `oprnaikey`; local .env files use OPENAI_API_KEY. */
export function openAIKey() {
  return (process.env.OPENAI_API_KEY || process.env.oprnaikey || '').trim();
}

/**
 * Reads a JSON body. Vercel may have parsed it already; local Node servers supply a stream.
 * Returns `{ body }`, or `{ status: 413 }` when too large, or `{ status: 400 }` when unreadable.
 */
export async function readJSON(req, maxBytes) {
  try {
    if (req.body !== undefined) {
      const raw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
      if (Buffer.byteLength(raw) > maxBytes) return { status: 413 };
      return { body: JSON.parse(raw) };
    }
    const chunks = [];
    let bytes = 0;
    for await (const chunk of req) {
      bytes += Buffer.byteLength(chunk);
      if (bytes > maxBytes) return { status: 413 };
      chunks.push(Buffer.from(chunk));
    }
    return { body: JSON.parse(Buffer.concat(chunks).toString('utf8')) };
  } catch {
    return { status: 400 };
  }
}

// ---------------------------------------------------------------------------
// Rate limits
//
// With a Redis REST store configured (Upstash, or Vercel's KV / Upstash integration), limits are
// shared by every server instance, and a daily cap on all AI requests protects the API bill.
// Without one, each server instance keeps its own counts in memory, which a cold start resets.
// ---------------------------------------------------------------------------

const MINUTE = 60;
const DAY = 86_400;
const MAX_TRACKED = 2_000;
export const GLOBAL_LIMIT_MESSAGE = 'Free AI help has reached today’s limit for everyone. Everything else on Folio still works, and AI help returns tomorrow.';

export function clientIp(req) {
  return process.env.VERCEL ? String(req.headers['x-forwarded-for'] || 'unknown').split(',')[0].trim() : req.socket?.remoteAddress || 'local';
}

function redisStore() {
  const url = (process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || '').trim().replace(/\/+$/, '');
  const token = (process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || '').trim();
  return url && token ? { url, token } : null;
}

/** All AI features together, per day. Set AI_DAILY_LIMIT=0 to switch the cap off. */
function globalDailyLimit() {
  const value = Number(process.env.AI_DAILY_LIMIT ?? 2_000);
  return Number.isFinite(value) && value >= 0 ? value : 2_000;
}

/** IP addresses are hashed before they are used as keys in an external store. */
function visitorKey(ip) {
  return createHash('sha256').update(`${process.env.RATE_LIMIT_SALT || 'folio-rate-limit'}:${ip}`).digest('base64url').slice(0, 24);
}

/** Increments each key (creating it with its expiry on first use) and returns the new counts. */
async function redisIncrement(store, keys) {
  const commands = keys.flatMap(({ key, ttl }) => [['SET', key, '0', 'EX', String(ttl), 'NX'], ['INCR', key]]);
  const response = await fetch(`${store.url}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${store.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
    signal: AbortSignal.timeout(2_500),
  });
  if (!response.ok) throw new Error('Rate limit store unavailable');
  const results = await response.json();
  const counts = keys.map((_, index) => Number(results?.[index * 2 + 1]?.result));
  if (counts.some(count => !Number.isFinite(count))) throw new Error('Unexpected rate limit store response');
  return counts;
}

/**
 * Creates the limiter for one endpoint. `check(req)` resolves to null when the request may
 * proceed, or `{ scope, retryAfter }` where scope is 'minute', 'day', or 'global'.
 */
export function createRateLimiter(name, { perMinute, perDay }) {
  const memory = new Map();

  function memoryCheck(ip) {
    const now = Date.now();
    for (const [key, value] of memory) if (value.expires <= now) memory.delete(key);
    const today = new Date().toISOString().slice(0, 10);
    const keys = { minute: `m:${ip}`, day: `d:${ip}`, global: `g:${today}` };
    const minute = memory.get(keys.minute) || { count: 0, expires: now + MINUTE * 1000 };
    const day = memory.get(keys.day) || { count: 0, expires: now + DAY * 1000 };
    const global = memory.get(keys.global) || { count: 0, expires: now + DAY * 1000 };
    if (memory.size >= MAX_TRACKED && (!memory.has(keys.minute) || !memory.has(keys.day))) return { scope: 'minute', retryAfter: '60' };
    if (day.count >= perDay) return { scope: 'day', retryAfter: '3600' };
    if (minute.count >= perMinute) return { scope: 'minute', retryAfter: '60' };
    const cap = globalDailyLimit();
    if (cap && global.count >= cap) return { scope: 'global', retryAfter: '3600' };
    minute.count++; day.count++; global.count++;
    memory.set(keys.minute, minute); memory.set(keys.day, day); memory.set(keys.global, global);
    return null;
  }

  async function redisCheck(store, ip) {
    const visitor = visitorKey(ip);
    const [minute] = await redisIncrement(store, [{ key: `folio:rl:${name}:m:${visitor}`, ttl: MINUTE }]);
    if (minute > perMinute) return { scope: 'minute', retryAfter: '60' };
    const today = new Date().toISOString().slice(0, 10);
    const [day, global] = await redisIncrement(store, [
      { key: `folio:rl:${name}:d:${visitor}`, ttl: DAY },
      { key: `folio:rl:all:${today}`, ttl: DAY + 3_600 },
    ]);
    if (day > perDay) return { scope: 'day', retryAfter: '3600' };
    const cap = globalDailyLimit();
    if (cap && global > cap) return { scope: 'global', retryAfter: '3600' };
    return null;
  }

  return async function check(req) {
    const ip = clientIp(req);
    const store = redisStore();
    if (store) {
      try { return await redisCheck(store, ip); }
      catch { console.warn(`[${name}] Shared rate limit store unavailable; using this instance's limits.`); }
    }
    return memoryCheck(ip);
  };
}

/** Applies a limiter. Replies with 429 and returns false when the request is over a limit. */
export async function withinLimits(check, req, res, messages) {
  const blocked = await check(req);
  if (!blocked) return true;
  res.setHeader('Retry-After', blocked.retryAfter);
  reply(res, 429, { error: blocked.scope === 'minute' ? messages.minute : blocked.scope === 'day' ? messages.day : GLOBAL_LIMIT_MESSAGE });
  return false;
}

// ---------------------------------------------------------------------------
// OpenAI
// ---------------------------------------------------------------------------

/**
 * Calls the Responses API. Returns `{ ok: false, status }` for an upstream error status
 * (429 stays 429, everything else becomes 502), or `{ ok: true, completed, text }`.
 * Network failures and timeouts throw, so each handler can answer with its own 504 message.
 */
export async function askOpenAI({ apiKey, instructions, input, maxOutputTokens, timeoutMs, schema, joiner = '\n' }) {
  const response = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    signal: AbortSignal.timeout(timeoutMs),
    body: JSON.stringify({
      model: MODEL,
      reasoning: { effort: 'low' },
      store: false,
      max_output_tokens: maxOutputTokens,
      instructions,
      input,
      ...(schema ? { text: { format: { type: 'json_schema', name: schema.name, strict: true, schema: schema.schema } } } : {}),
    }),
  });
  if (!response.ok) return { ok: false, status: response.status === 429 ? 429 : 502 };
  const result = await response.json();
  const text = Array.isArray(result.output)
    ? result.output
      .filter(item => item.type === 'message')
      .flatMap(item => Array.isArray(item.content) ? item.content : [])
      .filter(item => item.type === 'output_text' && typeof item.text === 'string')
      .map(item => item.text)
      .join(joiner)
      .trim()
    : '';
  return { ok: true, completed: result.status === 'completed', text };
}

/** Upstream error message shared by the endpoints: 429 means busy, anything else unavailable. */
export function upstreamError(status, unavailable) {
  return status === 429 ? 'The AI service is busy. Please try again in a minute.' : unavailable;
}
