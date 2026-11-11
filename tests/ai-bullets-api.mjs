import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';

const description = 'Responsible for answering customer emails\nAlso did the weekly sales reports for the manager';
const improved = 'Answered customer emails, resolving most questions at first contact\nPrepared the weekly sales reports for the store manager';
const completed = text => Response.json({ status: 'completed', output: [{ type: 'reasoning' }, { type: 'message', content: [{ type: 'output_text', text }] }] });
const originalFetch = globalThis.fetch;

async function fixture(run, upstream, key = 'test-key') {
  const previousKey = process.env.OPENAI_API_KEY;
  process.env.OPENAI_API_KEY = key;
  const { default: handler } = await import(`../api/improve-bullets.mjs?test=${crypto.randomUUID()}`);
  globalThis.fetch = (url, options) => String(url) === 'https://api.openai.com/v1/responses' ? upstream(url, options) : originalFetch(url, options);
  const server = createServer(handler);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}/api/improve-bullets`;
  const post = (body = { description, title: 'Customer Assistant' }, headers = {}) => originalFetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) });
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
  assert.equal((await post({}, { 'sec-fetch-site': 'cross-site' })).status, 403);
  assert.equal((await post({}, { 'Content-Type': 'text/plain' })).status, 415);
  for (const body of ['broken JSON', {}, null, { description: 123 }, { description: 'short' }, { description: 'x'.repeat(3_001) }, { description, title: {} }]) assert.equal((await post(body)).status, 400);
  assert.equal((await post({ description: 'x'.repeat(16_001) })).status, 413);
}, () => assert.fail('OpenAI should not be called')));

test('only the description and title reach OpenAI and the lines come back', () => fixture(async ({ post }) => {
  const response = await post({ description, title: 'Customer Assistant', email: 'private@example.com' });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { description: improved });
}, async (_url, options) => {
  const body = JSON.parse(options.body);
  assert.equal(options.headers.Authorization, 'Bearer test-key');
  assert.equal(body.store, false);
  assert.deepEqual(JSON.parse(body.input), { description, title: 'Customer Assistant' });
  assert.doesNotMatch(body.input, /private@example.com/);
  return completed(improved);
}));

test('limits billable calls to five per minute per instance and IP', () => {
  let calls = 0;
  return fixture(async ({ post }) => {
    for (let i = 0; i < 5; i++) assert.equal((await post()).status, 200);
    const response = await post();
    assert.equal(response.status, 429);
    assert.equal(response.headers.get('retry-after'), '60');
    assert.equal(calls, 5);
  }, async () => { calls++; return completed(improved); });
});
