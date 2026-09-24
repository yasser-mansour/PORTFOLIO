// Local preview: serves dist/ the way GitHub Pages does (directory
// index.html, trailing-slash redirects, 404.html) and rebuilds when
// anything in src/ or public/ changes. Reload the browser to see it.

import { spawnSync } from 'node:child_process';
import { watch } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const port = Number(process.env.PORT) || 4321;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
};

const build = () => spawnSync(process.execPath, [join(root, 'scripts/build.mjs')], { stdio: 'inherit' });

let timer;
for (const dir of ['src', 'public']) {
  watch(join(root, dir), { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(build, 60);
  });
}

async function resolve(pathname) {
  const file = normalize(join(dist, decodeURIComponent(pathname)));
  if (!file.startsWith(dist)) return null;
  try {
    const info = await stat(file);
    if (info.isDirectory()) {
      return pathname.endsWith('/') ? { file: join(file, 'index.html') } : { redirect: `${pathname}/` };
    }
    return { file };
  } catch {
    return null;
  }
}

build();

createServer(async (req, res) => {
  const { pathname } = new URL(req.url, 'http://localhost');
  const found = await resolve(pathname);

  if (found?.redirect) {
    res.writeHead(301, { Location: found.redirect }).end();
    return;
  }

  const file = found?.file ?? join(dist, '404.html');
  try {
    const body = await readFile(file);
    res.writeHead(found ? 200 : 404, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end('Not found');
  }
}).listen(port, () => console.log(`http://localhost:${port}`));
