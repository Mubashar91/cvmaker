import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import nextEnv from '@next/env';
import { apiHandler } from '../api/_routes.mjs';

nextEnv.loadEnvConfig(process.cwd(), false);

const root = resolve('out');
const port = Number(process.env.PORT || 3000);
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.txt': 'text/plain; charset=utf-8' };
await stat(root).catch(() => { console.error('Build the site first with npm run build.'); process.exit(1); });
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url || '/', 'http://localhost').pathname);
    const api = apiHandler(pathname);
    if (api) return await api(req, res);
    let file = resolve(root, '.' + pathname);
    if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403); res.end(); return; }
    const info = await stat(file);
    if (info.isDirectory()) file = resolve(file, 'index.html');
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer' }); res.end(body);
  } catch {
    const page = await readFile(resolve(root, '404.html')).catch(() => 'Page not found');
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }); res.end(page);
  }
}).listen(port, '127.0.0.1', () => console.log(`Folio is ready at http://localhost:${port}`));
