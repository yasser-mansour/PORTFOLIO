import { html, raw } from './html.js';
import { site } from './site.js';

const NAV = [
  { href: '/#work', label: 'Work', section: 'work' },
  { href: '/about/', label: 'About', section: 'about' },
  { href: '/#contact', label: 'Contact', section: 'contact' },
];

function header(section) {
  return html`
    <header class="site-header wrap">
      <a class="site-name" href="/"${section === 'home' ? raw(' aria-current="page"') : ''}>${site.name}</a>
      <nav aria-label="Main">
        <ul class="nav">
          ${NAV.map(
            (item) => html`<li><a href="${item.href}"${item.section === section ? raw(' aria-current="page"') : ''}>${item.label}</a></li>`,
          )}
        </ul>
      </nav>
    </header>`;
}

function footer() {
  return html`
    <footer class="site-footer wrap">
      <p>© ${new Date().getFullYear()} ${site.name}</p>
      <p class="clock" hidden>Morocco, <time data-clock></time></p>
      <ul class="footer-links">
        <li><a href="mailto:${site.email}">Email</a></li>
        <li><a href="${site.github.url}">GitHub</a></li>
        <li><a href="/about/#colophon">Colophon</a></li>
      </ul>
    </footer>`;
}

// Drop the indentation noise that nested templates leave behind.
const tidy = (doc) => doc.replace(/[ \t]+$/gm, '').replace(/\n{2,}/g, '\n');

// page: { path, title, description, section, body, type, image, noindex, jsonLd }
export function layout(page, { css, js }) {
  const url = site.url + page.path;
  const image = site.url + (page.image ?? '/og.png');
  const title = page.title ?? site.name;

  return tidy(`<!DOCTYPE html>${html`
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${title}</title>
  <meta name="description" content="${page.description}">
  ${page.noindex ? raw('<meta name="robots" content="noindex">') : html`<link rel="canonical" href="${url}">`}
  <meta name="author" content="${site.name}">
  <meta name="color-scheme" content="light dark">
  <meta name="theme-color" content="#f6f5f1" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#141412" media="(prefers-color-scheme: dark)">
  <link rel="icon" href="/favicon.ico" sizes="32x32">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="preload" href="/fonts/ibm-plex-sans.woff2" as="font" type="font/woff2" crossorigin>
  <meta property="og:type" content="${page.type ?? 'website'}">
  <meta property="og:site_name" content="${site.name}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${page.description}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${image}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${site.name}, developer. yassermansour.com">
  <meta name="twitter:card" content="summary_large_image">
  ${page.jsonLd ? raw(`<script type="application/ld+json">${JSON.stringify(page.jsonLd)}</script>`) : ''}
  <style>${raw(css)}</style>
  <script src="${js}" defer></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  ${header(page.section)}
  <main id="main">
    ${page.body}
  </main>
  ${footer()}
</body>
</html>
`}`);
}
