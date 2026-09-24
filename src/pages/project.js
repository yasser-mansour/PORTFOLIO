import { html, raw } from '../html.js';
import { site } from '../site.js';
import { featured } from '../projects.js';
import { external, facts, list, screenshot, status } from '../components.js';

function flow({ caption, steps, note }) {
  return html`
    <figure class="flow">
      <figcaption>${caption}</figcaption>
      <ol>
        ${steps.map(([code, text]) => html`<li><code>${code}</code><span>${text}</span></li>`)}
      </ol>
      ${note && html`<p>${note}</p>`}
    </figure>`;
}

export function projectPage(p) {
  const next = featured[(featured.indexOf(p) + 1) % featured.length];

  return {
    path: `/work/${p.slug}/`,
    section: 'work',
    type: 'article',
    title: `${p.name} — ${site.name}`,
    description: p.summary,
    body: html`
      <article class="case wrap">
        <header class="case-head">
          <p class="crumb"><a href="/#work">Work</a></p>
          <h1 style="view-transition-name: title-${p.slug}">${p.name}</h1>
          <p class="case-lead">${p.summary}</p>
          ${facts(
            [
              ['Role', p.role],
              ['Platform', p.platform],
              ['Status', status(p)],
              ['Links', p.links && list(p.links.map(external))],
            ],
            'facts facts--row',
          )}
        </header>

        ${screenshot(p, { eager: true, caption: true })}

        <section class="section" aria-labelledby="overview">
          <h2 id="overview">Overview</h2>
          <div class="prose">${raw(p.overview)}</div>
        </section>

        ${p.flow &&
        html`
          <section class="section" aria-labelledby="structure">
            <h2 id="structure">How it fits together</h2>
            ${flow(p.flow)}
          </section>`}

        <section class="section" aria-labelledby="engineering">
          <h2 id="engineering">Engineering notes</h2>
          <div class="notes">
            ${p.notes.map((note) => html`<div class="note"><h3>${note.title}</h3>${raw(note.body)}</div>`)}
          </div>
        </section>

        <section class="section" aria-labelledby="stack">
          <h2 id="stack">Stack</h2>
          ${facts(p.stackGroups, 'facts facts--stack')}
        </section>

        <nav class="section next" aria-labelledby="next">
          <h2 id="next">Next</h2>
          <p><a href="/work/${next.slug}/">${next.name}</a> <span>${next.kind}</span></p>
        </nav>
      </article>`,
  };
}
