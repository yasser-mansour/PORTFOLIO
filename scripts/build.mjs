// Renders every page in src/pages into dist/, copies public/ alongside,
// and writes the sitemap and robots.txt.

import { createHash } from 'node:crypto';
import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { layout } from '../src/layout.js';
import { pages } from '../src/pages/index.js';
import { site } from '../src/site.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const hash = (text) => createHash('sha256').update(text).digest('hex').slice(0, 8);
// Comments and line breaks only: every declaration in styles.css is on one line.
const minify = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s*\n\s*/g, '').trim();

const outputFile = (path) => join(dist, path.endsWith('/') ? `${path}index.html` : path);

async function write(file, contents) {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, contents);
}

const start = performance.now();

await rm(dist, { recursive: true, force: true });
await cp(join(root, 'public'), dist, { recursive: true });

const css = minify(await readFile(join(root, 'src/styles.css'), 'utf8'));
const script = await readFile(join(root, 'src/main.js'), 'utf8');
await write(join(dist, 'main.js'), script);
const assets = { css, js: `/main.js?v=${hash(script)}` };

const rendered = pages();
for (const page of rendered) {
  await write(outputFile(page.path), layout(page, assets));
}

const indexed = rendered.filter((page) => !page.noindex);
await write(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexed.map((page) => `  <url><loc>${site.url}${page.path}</loc></url>`).join('\n')}
</urlset>
`,
);
await write(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);

console.log(`Built ${rendered.length} pages in ${Math.round(performance.now() - start)} ms`);
