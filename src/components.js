import { html, raw } from './html.js';

export const external = (link) => html`<a href="${link.href}" rel="noopener">${link.label}</a>`;

export function status(project) {
  if (!project.status) return null;
  return html`<span class="status${project.status.live ? ' status--live' : ''}">${project.status.label}</span>`;
}

// Screenshot shared by the home page and the case study. The matching
// view-transition-name lets the browser morph one into the other.
// Every screenshot has an 800px sibling named <name>-800.webp.
export function screenshot(project, { eager = false, caption = false } = {}) {
  const { image } = project;
  if (!image) return null;
  return html`
    <figure class="shot">
      <img src="${image.src}" srcset="${image.src.replace('.webp', '-800.webp')} 800w, ${image.src} ${image.width}w"
        sizes="(min-width: 76rem) 74rem, 100vw" width="${image.width}" height="${image.height}" alt="${image.alt}"
        style="view-transition-name: shot-${project.slug}"
        ${eager ? raw('fetchpriority="high"') : raw('loading="lazy"')} decoding="async">
      ${caption && html`<figcaption>${image.caption}</figcaption>`}
    </figure>`;
}

// Label/value pairs, e.g. Role, Status, Links. Rows with no value are skipped.
export function facts(rows, className = 'facts') {
  const present = rows.filter(([, value]) => value != null && value !== '' && !(Array.isArray(value) && !value.length));
  return html`
    <dl class="${className}">
      ${present.map(([label, value]) => html`<div><dt>${label}</dt><dd>${value}</dd></div>`)}
    </dl>`;
}

export const list = (items) => items.flatMap((item, i) => (i ? [', ', item] : [item]));
