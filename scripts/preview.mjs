#!/usr/bin/env node
// Serves the built site locally under the same URL prefix as production
// (default http://127.0.0.1:4173/presentations/), including GitHub Pages'
// directory-to-trailing-slash redirect, so relative asset paths behave
// exactly as they will once deployed.
//
//   node scripts/build-site.mjs && node scripts/preview.mjs

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const siteRoot = path.join(repoRoot, process.env.SITE_OUTPUT ?? '_site');
const prefix = '/' + (process.env.SITE_PREFIX ?? '/presentations').split('/').filter(Boolean).join('/');
const port = Number(process.env.PORT ?? 4173);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.txt': 'text/plain; charset=utf-8',
  '.rsc': 'text/plain; charset=utf-8',
  '.map': 'application/json',
};

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);

  if (urlPath === '/' || urlPath === prefix) {
    res.writeHead(302, { Location: `${prefix}/` });
    res.end();
    return;
  }

  let rel = urlPath.startsWith(`${prefix}/`) ? urlPath.slice(prefix.length) : null;
  if (rel === null) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end(`preview serves only ${prefix}/ — like production`);
    return;
  }

  let file = path.join(siteRoot, rel);
  if (!file.startsWith(siteRoot)) {
    res.writeHead(403);
    res.end();
    return;
  }

  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    if (!urlPath.endsWith('/')) {
      res.writeHead(301, { Location: `${urlPath}/` });
      res.end();
      return;
    }
    file = path.join(file, 'index.html');
  }

  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
    console.log(`404 ${urlPath}`);
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('not found');
    return;
  }

  res.writeHead(200, {
    'Content-Type': MIME[path.extname(file).toLowerCase()] ?? 'application/octet-stream',
  });
  fs.createReadStream(file).pipe(res);
});

server.listen(port, '127.0.0.1', () => {
  console.log(`serving ${siteRoot} at http://127.0.0.1:${port}${prefix}/`);
});
