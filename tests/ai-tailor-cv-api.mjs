import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';

const job = 'We are hiring a customer support specialist. You will answer customer emails and calls, resolve billing questions, keep our CRM records accurate, and work with the product team. Experience with written customer communication is essential.';
const cv = {
  headline: 'Customer support assistant',
  summary: 'Customer support assistant who answers 40 to 60 customer emails and calls a day.',
  skills: 'Written communication, patience\nTools: Zendesk, Excel',
  languages: 'English: Native',
  experience: [
    { id: 'e1', title: 'Customer support assistant', organization: 'Retail Co', dates: '2022 – 2025', description: 'Handled 40 to 60 customer emails and calls a day.\nLogged every case in Zendesk.\nWrote weekly summaries for the product team.' },
    { id: 'e2', title: 'Sales assistant', organization: 'Corner Shop', dates: '2020 – 2022', description: 'Served customers at the till.' },
  ],
  projects: [{ id: 'p1', title: 'Help centre rewrite', organization: 'Retail Co', dates: '2024', description: 'Rewrote 12 help articles about billing.' }],
  education: [{ title: 'BTEC Business', organization: 'City College', dates: '2018 – 2020', description: '' }],
  certifications: [],
};
const tailored = {
  summary: 'Customer support assistant answering 40 to 60 customer emails and calls a day, resolving billing questions and keeping case records accurate.',
  skills: 'Customer communication: Written communication, patience\nTools: Zendesk, Excel',
  experience: [
    { id: 'e1', description: '• Answered 40 to 60 customer emails and calls a day.\n- Kept accurate case records in Zendesk.\nShared weekly summaries with the product team.' },
    { id: 'e2', description: 'Served customers at the till.' },
  ],
  projects: [{ id: 'p1', description: 'Rewrote 12 billing help articles.' }],
  changes: [{ section: 'summary', note: 'Leads with email and call volume.' }],
  missing: [{ requirement: 'CRM experience', advice: 'Zendesk is a help desk; name a CRM only if you used one.' }],
};
const completed = payload => Response.json({ status: 'completed', output: [{ type: 'reasoning' }, { type: 'message', content: [{ type: 'output_text', text: JSON.stringify(payload) }] }] });
const originalFetch = globalThis.fetch;

async function fixture(run, upstream, key = 'test-key', env = {}) {
  const previous = Object.fromEntries(['OPENAI_API_KEY', ...Object.keys(env)].map(name => [name, process.env[name]]));
  process.env.OPENAI_API_KEY = key;
  for (const [name, value] of Object.entries(env)) process.env[name] = value;
  const { default: handler } = await import(`../api/tailor-cv.mjs?test=${crypto.randomUUID()}`);
  globalThis.fetch = (url, options) => String(url) === 'https://api.openai.com/v1/responses' || String(url).startsWith('https://redis.example') ? upstream(url, options) : originalFetch(url, options);
  const server = createServer(handler);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}/api/tailor-cv`;
  const post = (body = { cv, job }, headers = {}) => originalFetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) });
  try { await run({ post, url }); }
  finally {
    globalThis.fetch = originalFetch;
    for (const [name, value] of Object.entries(previous)) if (value === undefined) delete process.env[name]; else process.env[name] = value;
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
  for (const body of [
    'broken JSON', {}, null, { cv, job: 'short job' }, { cv: 'plain text', job }, { cv: { ...cv, summary: 5 }, job },
    { cv: { ...cv, experience: [{ id: 'x1', description: 'Bad id' }] }, job },
    { cv: { ...cv, experience: [cv.experience[0], cv.experience[0]] }, job },
    { cv: { ...cv, experience: Array.from({ length: 16 }, (_, i) => ({ id: `e${i}`, description: 'Too many' })) }, job },
    { cv: { headline: 'Only a title' }, job },
  ]) assert.equal((await post(body)).status, 400, JSON.stringify(body).slice(0, 80));
  assert.equal((await post({ cv: { ...cv, summary: 'x'.repeat(100_001) }, job })).status, 413);
}, () => assert.fail('OpenAI should not be called')));

test('only CV content and the advert reach OpenAI, with a strict schema', () => fixture(async ({ post }) => {
  const response = await post({ cv: { ...cv, email: 'private@example.com', name: 'Private Person', photo: 'data:image/png;base64,AAAA' }, job });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-store');
}, async (_url, options) => {
  const body = JSON.parse(options.body);
  assert.equal(body.store, false);
  assert.equal(body.text.format.strict, true);
  const input = JSON.parse(body.input);
  assert.deepEqual(Object.keys(input), ['cv', 'jobAdvert']);
  assert.doesNotMatch(body.input, /private@example\.com|Private Person|base64/);
  assert.equal(input.cv.experience[0].organization, 'Retail Co');
  return completed(tailored);
}));

test('the improved wording is returned with bullet characters removed', () => fixture(async ({ post }) => {
  const result = await (await post()).json();
  assert.equal(result.summary, tailored.summary);
  assert.equal(result.experience[0].description, 'Answered 40 to 60 customer emails and calls a day.\nKept accurate case records in Zendesk.\nShared weekly summaries with the product team.');
  assert.deepEqual(result.projects, [{ id: 'p1', description: 'Rewrote 12 billing help articles.' }]);
  assert.deepEqual(result.changes, tailored.changes);
  assert.deepEqual(result.missing, tailored.missing);
  assert.deepEqual(result.kept, []);
}, async () => completed(tailored)));

test('invented numbers, unknown skills, and unknown entries are not trusted', () => fixture(async ({ post }) => {
  const result = await (await post()).json();
  // A summary with a number the CV does not contain falls back to the original.
  assert.equal(result.summary, cv.summary);
  // Same for an entry; the other entry keeps its rewrite.
  assert.equal(result.experience[0].description, cv.experience[0].description);
  assert.equal(result.experience[1].description, 'Delivered friendly service to customers at the till.');
  assert.equal(result.experience.length, 2);
  assert.ok(!result.experience.some(entry => entry.id === 'e9'));
  // Skills the CV never mentions are removed and reported; lost original skills come back.
  assert.doesNotMatch(result.skills, /Salesforce|Java\b/);
  assert.match(result.skills, /Zendesk/);
  assert.match(result.skills, /patience/);
  assert.deepEqual(result.removedSkills.sort(), ['Java', 'Salesforce']);
  assert.equal(result.kept.length, 2);
}, async () => completed({
  ...tailored,
  summary: 'Customer support assistant with 5 years of experience answering 40 to 60 emails a day.',
  skills: 'Tools: Zendesk, Salesforce, Java\nWritten communication',
  experience: [
    { id: 'e1', description: 'Handled 90 customer emails and calls a day, a 50% increase.' },
    { id: 'e2', description: 'Delivered friendly service to customers at the till.' },
    { id: 'e9', description: 'An entry that does not exist.' },
  ],
})));

test('incomplete and non-JSON responses are rejected', () => {
  let result;
  return fixture(async ({ post }) => {
    for (result of [
      { status: 'incomplete', output: [{ type: 'message', content: [{ type: 'output_text', text: JSON.stringify(tailored) }] }] },
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
  }, async () => { calls++; return completed(tailored); });
});

test('a daily cap on all AI requests protects the bill', () => fixture(async ({ post }) => {
  assert.equal((await post()).status, 200);
  const response = await post();
  assert.equal(response.status, 429);
  assert.match((await response.json()).error, /today’s limit for everyone/);
}, async () => completed(tailored), 'test-key', { AI_DAILY_LIMIT: '1' }));

test('a shared Redis store keeps limits across instances without storing raw IP addresses', () => {
  const counts = new Map();
  const keys = [];
  let calls = 0;
  return fixture(async ({ post }) => {
    for (let i = 0; i < 3; i++) assert.equal((await post()).status, 200);
    assert.equal((await post()).status, 429);
    assert.equal(calls, 3);
    assert.ok(keys.length > 0);
    assert.ok(keys.every(key => !key.includes('127.0.0.1') && !key.includes('::1')));
  }, async (url, options) => {
    if (String(url) === 'https://redis.example/pipeline') {
      assert.equal(options.headers.Authorization, 'Bearer redis-token');
      const results = JSON.parse(options.body).map(([command, key]) => {
        keys.push(key);
        if (command === 'SET') { if (!counts.has(key)) counts.set(key, 0); return { result: 'OK' }; }
        counts.set(key, counts.get(key) + 1);
        return { result: counts.get(key) };
      });
      return Response.json(results);
    }
    calls++;
    return completed(tailored);
  }, 'test-key', { UPSTASH_REDIS_REST_URL: 'https://redis.example', UPSTASH_REDIS_REST_TOKEN: 'redis-token' });
});

test('an unavailable Redis store falls back to per-instance limits', () => fixture(async ({ post }) => {
  assert.equal((await post()).status, 200);
}, async url => String(url).startsWith('https://redis.example') ? new Response('down', { status: 500 }) : completed(tailored), 'test-key', { UPSTASH_REDIS_REST_URL: 'https://redis.example', UPSTASH_REDIS_REST_TOKEN: 'redis-token' }));
