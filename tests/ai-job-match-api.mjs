import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';

const cv = 'Alex Morgan. Customer support assistant at Retail Co, 2022 to 2025. Handled 40 to 60 customer emails and calls a day, resolving billing and delivery questions. Logged every case in the ticket system and wrote weekly summaries for the product team. Skills: written communication, patience, time management.';
const job = 'We are hiring a customer support specialist. You will answer customer emails and calls, resolve billing questions, keep our CRM records accurate, and work with the product team. Experience with written customer communication is essential.';
const report = {
  matches: [{ requirement: 'Answer customer emails and calls', evidence: 'Handled 40 to 60 customer emails and calls a day.' }],
  gaps: [{ requirement: 'CRM experience', advice: 'Name the system you used only if that is true for you.' }],
  improvements: [{ section: 'summary', suggestion: 'Open with the daily email and call volume.' }],
  rewrites: [{ current: 'Logged every case in the ticket system', suggested: 'Kept ticket records accurate for every case', reason: 'Clearer.' }],
};
const completed = payload => Response.json({ status: 'completed', output: [{ type: 'reasoning' }, { type: 'message', content: [{ type: 'output_text', text: JSON.stringify(payload) }] }] });
const originalFetch = globalThis.fetch;

async function fixture(run, upstream, key = 'test-key') {
  const previousKey = process.env.OPENAI_API_KEY;
  process.env.OPENAI_API_KEY = key;
  const { default: handler } = await import(`../api/cv-job-match.mjs?test=${crypto.randomUUID()}`);
  globalThis.fetch = (url, options) => String(url) === 'https://api.openai.com/v1/responses' ? upstream(url, options) : originalFetch(url, options);
  const server = createServer(handler);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}/api/cv-job-match`;
  const post = (body = { cv, job }, headers = {}) => originalFetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) });
  try { await run({ post, url, handler }); }
  finally {
    globalThis.fetch = originalFetch;
    if (previousKey === undefined) delete process.env.OPENAI_API_KEY; else process.env.OPENAI_API_KEY = previousKey;
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
}

test('missing key returns a clear error without calling OpenAI', () => fixture(async ({ post }) => {
  const response = await post();
  assert.equal(response.status, 503);
  assert.match((await response.json()).error, /not available yet/);
}, () => assert.fail('OpenAI should not be called'), ''));

test('rejects invalid requests before calling OpenAI', () => fixture(async ({ post, url }) => {
  assert.equal((await originalFetch(url)).status, 405);
  assert.equal((await post({}, { 'sec-fetch-site': 'cross-site' })).status, 403);
  assert.equal((await post({}, { 'Content-Type': 'text/plain' })).status, 415);
  for (const body of ['broken JSON', {}, null, { cv: 123, job }, { cv, job: 'short job' }, { cv: 'too short', job }, { cv: 'x'.repeat(12_001), job }, { cv, job: 'x'.repeat(8_001) }]) assert.equal((await post(body)).status, 400);
  assert.equal((await post({ cv: 'x'.repeat(90_001), job })).status, 413);
}, () => assert.fail('OpenAI should not be called')));

test('only the CV and advert reach OpenAI and the structured report is returned', () => fixture(async ({ post }) => {
  const response = await post({ cv, job, email: 'private@example.com', photo: 'private-photo' });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await response.json(), report);
}, async (_url, options) => {
  const body = JSON.parse(options.body);
  assert.equal(options.headers.Authorization, 'Bearer test-key');
  assert.equal(body.store, false);
  assert.equal(body.text.format.strict, true);
  assert.deepEqual(JSON.parse(body.input), { cv, jobAdvert: job });
  return completed(report);
}));

test('oversized lists and malformed items are trimmed, not trusted', () => fixture(async ({ post }) => {
  const response = await post();
  assert.equal(response.status, 200);
  const result = await response.json();
  assert.equal(result.matches.length, 8);
  assert.equal(result.gaps.length, 0);
  assert.equal(result.rewrites.length, 0);
  assert.ok(result.matches.every(item => item.requirement.length <= 400));
}, async () => completed({
  matches: Array.from({ length: 20 }, (_, i) => ({ requirement: `R${i} ${'x'.repeat(500)}`, evidence: 'From the CV.' })),
  gaps: [{ requirement: 'no advice field' }],
  improvements: [],
  rewrites: 'not an array',
})));

test('incomplete and non-JSON responses are rejected', () => {
  let result;
  return fixture(async ({ post }) => {
    for (result of [
      { status: 'incomplete', output: [{ type: 'message', content: [{ type: 'output_text', text: JSON.stringify(report) }] }] },
      { status: 'completed', output: [] },
      { status: 'completed', output: [{ type: 'message', content: [{ type: 'output_text', text: 'not json' }] }] },
    ]) assert.equal((await post()).status, 502);
  }, async () => Response.json(result));
});

test('provider failures do not reveal private upstream errors or keys', () => fixture(async ({ post }) => {
  const response = await post();
  assert.equal(response.status, 502);
  assert.doesNotMatch(await response.text(), /test-key|private upstream error/);
}, async () => Response.json({ error: 'private upstream error: test-key' }, { status: 401 })));

test('limits billable calls to three per minute per instance and IP', () => {
  let calls = 0;
  return fixture(async ({ post }) => {
    for (let i = 0; i < 3; i++) assert.equal((await post()).status, 200);
    const response = await post();
    assert.equal(response.status, 429);
    assert.equal(response.headers.get('retry-after'), '60');
    assert.equal(calls, 3);
  }, async () => { calls++; return completed(report); });
});
