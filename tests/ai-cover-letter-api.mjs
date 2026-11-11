import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';

const details = {
  style: 'graduate', jobTitle: 'Junior Data Analyst', company: 'Harbour Insights',
  jobDescription: 'We are looking for a junior data analyst with SQL, Power BI, and stakeholder reporting experience.',
  experience: 'During a summer internship at Lakeside Retail Group, I cleaned weekly sales data from twelve stores and built a dashboard the regional manager uses.',
  skills: 'SQL, Power BI, Python', additional: 'Available from July.',
};
const draft = 'I am writing to apply for the Junior Data Analyst position at Harbour Insights.\n\nDuring a summer internship at Lakeside Retail Group, I cleaned weekly sales data from twelve stores and built a dashboard the regional manager uses in her planning.\n\nThank you for considering my application.';
const completed = text => Response.json({ status: 'completed', output: [{ type: 'reasoning' }, { type: 'message', content: [{ type: 'output_text', text }] }] });
const originalFetch = globalThis.fetch;

async function fixture(run, upstream, key = 'test-key') {
  const previousKey = process.env.OPENAI_API_KEY;
  process.env.OPENAI_API_KEY = key;
  const { default: handler } = await import(`../api/cover-letter-draft.mjs?test=${crypto.randomUUID()}`);
  globalThis.fetch = (url, options) => String(url) === 'https://api.openai.com/v1/responses' ? upstream(url, options) : originalFetch(url, options);
  const server = createServer(handler);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}/api/cover-letter-draft`;
  const post = (body = details, headers = {}) => originalFetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) });
  try { await run({ post, url }); }
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
  assert.equal((await post(details, { 'sec-fetch-site': 'cross-site' })).status, 403);
  assert.equal((await post(details, { 'Content-Type': 'text/plain' })).status, 415);
  for (const body of ['broken JSON', {}, null, { ...details, style: 'poem' }, { ...details, experience: 'too short' }, { ...details, jobDescription: 'x'.repeat(8_001) }, { ...details, skills: 42 }]) {
    assert.equal((await post(body)).status, 400);
  }
  assert.equal((await post({ ...details, jobDescription: 'x'.repeat(60_001) })).status, 413);
}, () => assert.fail('OpenAI should not be called')));

test('only the letter details reach OpenAI and the draft comes back', () => fixture(async ({ post }) => {
  const response = await post({ ...details, name: 'Private Person', email: 'private@example.com', manager: 'Ms Okoro' });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await response.json(), { body: draft });
}, async (_url, options) => {
  const body = JSON.parse(options.body);
  assert.equal(options.headers.Authorization, 'Bearer test-key');
  assert.equal(body.store, false);
  const input = JSON.parse(body.input);
  assert.deepEqual(Object.keys(input).sort(), ['additional', 'company', 'experience', 'jobDescription', 'jobTitle', 'skills', 'style']);
  assert.equal(input.style, 'graduate');
  assert.doesNotMatch(body.input, /Private Person|private@example.com|Okoro/);
  return completed(draft);
}));

test('incomplete, tiny, and oversized drafts are rejected', () => {
  let result;
  return fixture(async ({ post }) => {
    for (result of [
      Response.json({ status: 'incomplete', output: [{ type: 'message', content: [{ type: 'output_text', text: draft }] }] }),
      completed('Too short.'),
      completed('x'.repeat(8_001)),
    ]) assert.equal((await post()).status, 502);
  }, async () => result.clone());
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
  }, async () => { calls++; return completed(draft); });
});
