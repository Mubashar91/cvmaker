import { createServer } from 'node:http';
import next from 'next';
import nextEnv from '@next/env';
import improveSummary from '../api/improve-summary.mjs';
import cvJobMatch from '../api/cv-job-match.mjs';

// Use the same server-only environment files as Next's development server.
nextEnv.loadEnvConfig(process.cwd(), true);
const args = process.argv.slice(2);
const option = (long, short, fallback) => {
  const index = args.findIndex(value => value === long || value === short);
  return index >= 0 ? args[index + 1] : fallback;
};
const port = Number(option('--port', '-p', process.env.PORT || '3000'));
const hostname = option('--hostname', '-H', '127.0.0.1');
const app = next({ dev: true, hostname, port });
const handle = app.getRequestHandler();
await app.prepare();
const server = createServer((req, res) => {
  const pathname = new URL(req.url || '/', 'http://localhost').pathname;
  if (pathname === '/api/improve-summary' || pathname === '/api/improve-summary/') return improveSummary(req, res);
  if (pathname === '/api/cv-job-match' || pathname === '/api/cv-job-match/') return cvJobMatch(req, res);
  return handle(req, res);
});
server.on('upgrade', app.getUpgradeHandler());
server.listen(port, hostname, () => console.log(`Folio is ready at http://${hostname}:${port}`));
for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, async () => {
  server.close();
  server.closeAllConnections();
  await app.close();
  process.exit(0);
});
