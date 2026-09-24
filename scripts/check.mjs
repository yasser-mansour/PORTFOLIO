// Checks the built site in dist/ for the mistakes that are easy to ship:
// broken internal links and anchors, images without alt text or
// dimensions, missing metadata, duplicate ids, and a stale sitemap.
// Exits non-zero if anything fails.

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist', import.meta.url));
const SITE = 'https://yassermansour.com';

const files = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? files(path) : [path];
  });

const pages = files(dist).filter((f) => f.endsWith('.html'));
const urlOf = (file) => '/' + relative(dist, file).replace(/index\.html$/, '');
const idsByUrl = new Map(
  pages.map((file) => [urlOf(file), new Set([...readFileSync(file, 'utf8').matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))]),
);

const errors = [];
const fail = (file, message) => errors.push(`${relative(dist, file)}: ${message}`);

function resolves(target) {
  const path = join(dist, decodeURIComponent(target));
  if (!existsSync(path)) return false;
  return statSync(path).isFile() || existsSync(join(path, 'index.html'));
}

for (const file of pages) {
  const doc = readFileSync(file, 'utf8');
  const url = urlOf(file);
  const is404 = url === '/404.html';

  if (!/<html lang="en">/.test(doc)) fail(file, 'missing lang');
  if (!/<title>[^<]{10,}<\/title>/.test(doc)) fail(file, 'missing or short <title>');
  if (!/<meta name="description" content="[^"]{30,}">/.test(doc)) fail(file, 'missing or short description');
  if (!is404 && !doc.includes(`<link rel="canonical" href="${SITE}${url}">`)) fail(file, 'wrong canonical');
  if ((doc.match(/<h1[\s>]/g) ?? []).length !== 1) fail(file, 'needs exactly one <h1>');
  if (!doc.includes('id="main"')) fail(file, 'missing main landmark target');

  const ids = [...doc.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  for (const id of new Set(ids.filter((id, i) => ids.indexOf(id) !== i))) fail(file, `duplicate id "${id}"`);

  for (const [img] of doc.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt="[^"]+"/.test(img)) fail(file, `image without alt: ${img.slice(0, 80)}`);
    if (!/\swidth="\d+"/.test(img) || !/\sheight="\d+"/.test(img)) fail(file, `image without dimensions: ${img.slice(0, 80)}`);
  }

  for (const [, srcset] of doc.matchAll(/\ssrcset="([^"]+)"/g)) {
    for (const candidate of srcset.split(',')) {
      const src = candidate.trim().split(/\s+/)[0];
      if (!resolves(src)) fail(file, `broken srcset entry: ${src}`);
    }
  }

  for (const [, attr, value] of doc.matchAll(/\s(href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:)/.test(value)) continue;
    const [path, hash] = value.split('#');
    const target = path.split('?')[0] || url;
    if (target && !resolves(target)) fail(file, `broken ${attr}: ${value}`);
    if (hash) {
      const ids = idsByUrl.get(target.endsWith('/') || target.endsWith('.html') ? target : `${target}/`);
      if (!ids?.has(hash)) fail(file, `missing anchor: ${value}`);
    }
  }

  if (/TODO|lorem ipsum|undefined|\[object Object\]/i.test(doc.replace(/<script[\s\S]*?<\/script>/g, ''))) {
    fail(file, 'contains placeholder text');
  }
}

const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8');
for (const file of pages) {
  const url = urlOf(file);
  if (url !== '/404.html' && !sitemap.includes(`<loc>${SITE}${url}</loc>`)) fail(file, 'not in sitemap');
}

if (errors.length) {
  console.error(errors.join('\n'));
  console.error(`\n${errors.length} problem(s) found.`);
  process.exit(1);
}
console.log(`Checked ${pages.length} pages: no problems.`);
