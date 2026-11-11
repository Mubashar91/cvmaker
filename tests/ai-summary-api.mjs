import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';

const summary = 'Frontend developer building accessible websites with React and TypeScript.';
const originalFetch = globalThis.fetch;

async function fixture(run, upstream, key = 'test-key') {
  const previousKey = process.env.OPENAI_API_KEY;
  process.env.OPENAI_API_KEY = key;
  const { default: handler } = await import(`../api/improve-summary.mjs?test=${crypto.randomUUID()}`);
  globalThis.fetch = (url, options) => String(url) === 'https://api.openai.com/v1/responses' ? upstream(url, options) : originalFetch(url, options);
  const server = createServer(handler);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const url = `http://127.0.0.1:${server.address().port}/api/improve-summary`;
  const post = (body = { summary }, headers = {}) => originalFetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) });
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
  for (const body of ['broken JSON', {}, null, { summary: 123 }, { summary: 'short' }, { summary: 'x'.repeat(5_001) }, { summary, headline: {} }]) assert.equal((await post(body)).status, 400);
  assert.equal((await post({ summary: 'x'.repeat(24_001) })).status, 413);
}, () => assert.fail('OpenAI should not be called')));

test('only allowed input reaches OpenAI and completed text is extracted after reasoning', () => fixture(async ({ post }) => {
  const response = await post({ summary, headline: 'Developer', email: 'private@example.com', photo: 'private-photo' });
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await response.json(), { summary: 'An improved, truthful summary.' });
}, async (_url, options) => {
  const body = JSON.parse(options.body);
  assert.equal(options.headers.Authorization, 'Bearer test-key');
  assert.equal(body.store, false);
  assert.equal(body.max_output_tokens, 2_048);
  assert.deepEqual(JSON.parse(body.input), { summary, headline: 'Developer' });
  return Response.json({ status: 'completed', output: [{ type: 'reasoning' }, { type: 'message', content: [{ type: 'output_text', text: 'An improved, truthful summary.' }] }] });
}));

test('provider failures do not reveal private upstream errors or keys', () => fixture(async ({ post }) => {
  const response = await post();
  assert.equal(response.status, 502);
  const text = await response.text();
  assert.doesNotMatch(text, /test-key|private upstream error/);
}, async () => Response.json({ error: 'private upstream error: test-key' }, { status: 401 })));

test('provider rate limits are recoverable', () => fixture(async ({ post }) => {
  const response = await post();
  assert.equal(response.status, 429);
  assert.match((await response.json()).error, /try again/);
}, async () => new Response('', { status: 429 })));

test('incomplete, empty, refusal, and oversized responses are rejected', () => {
  let result;
  return fixture(async ({ post }) => {
    for (result of [
      { status: 'incomplete', output: [{ type: 'message', content: [{ type: 'output_text', text: 'Partial text' }] }] },
      { status: 'completed', output: [] },
      { status: 'completed', output: [{ type: 'message', content: [{ type: 'refusal', refusal: 'No' }] }] },
      { status: 'completed', output: [{ type: 'message', content: [{ type: 'output_text', text: 'x'.repeat(3_001) }] }] },
    ]) assert.equal((await post()).status, 502);
  }, async () => Response.json(result));
});

test('connection failures return a recoverable timeout message', () => fixture(async ({ post }) => {
  const response = await post();
  assert.equal(response.status, 504);
  assert.match((await response.json()).error, /original summary is safe/);
}, async () => { throw new Error('private connection details'); }));

test('limits billable calls to five per minute per instance and IP', () => {
  let calls = 0;
  return fixture(async ({ post }) => {
    for (let i = 0; i < 5; i++) assert.equal((await post()).status, 200);
    const response = await post();
    assert.equal(response.status, 429);
    assert.equal(response.headers.get('retry-after'), '60');
    assert.equal(calls, 5);
  }, async () => { calls++; return Response.json({ status: 'completed', output: [{ type: 'message', content: [{ type: 'output_text', text: 'Improved summary.' }] }] }); });
});
