import { html, raw } from '../html.js';
import { site } from '../site.js';
import { featured, earlier } from '../projects.js';
import { external, facts, list, screenshot, status } from '../components.js';

function project(p, index) {
  const href = `/work/${p.slug}/`;
  return html`
    <article class="project" aria-labelledby="p-${p.slug}">
      <header class="project-head">
        <h3 id="p-${p.slug}"><a href="${href}" style="view-transition-name: title-${p.slug}">${p.name}</a></h3>
        <p class="project-kind">${p.kind}</p>
      </header>
      <p class="project-summary">${p.summary}</p>
      ${p.showcase && html`<a class="shot-link" href="${href}" tabindex="-1" aria-hidden="true">${screenshot(p, { eager: index === 0 })}</a>`}
      <div class="project-body">
        <div class="project-detail">
          <h4>Detail</h4>
          <p>${raw(p.detail)}</p>
          <a class="more" href="${href}">Case study<span class="visually-hidden">: ${p.name}</span></a>
        </div>
        ${facts([
          ['Status', status(p)],
          ['Stack', list(p.stack)],
          ['Links', p.links && list(p.links.map(external))],
        ])}
      </div>
    </article>`;
}

export function home() {
  return {
    path: '/',
    section: 'home',
    title: `${site.name} — Developer`,
    description: site.description,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: site.name,
      url: site.url,
      email: `mailto:${site.email}`,
      jobTitle: 'Developer',
      affiliation: { '@type': 'CollegeOrUniversity', name: 'ENSAM Meknès' },
      knowsLanguage: site.languages,
      sameAs: [site.github.url],
    },
    body: html`
      <section class="intro wrap" aria-labelledby="intro-name">
        <h1 id="intro-name">${site.name}</h1>
        <p class="intro-role">Developer. First-year engineering student at ${site.school}.</p>
        <div class="intro-text">
          <p>I build software for schools, small businesses and myself. Mostly Django backends with PostgreSQL behind them, and an Android or desktop app when the problem needs one.</p>
          <p>Some of it runs in production. Some of it only runs on my laptop.</p>
        </div>
        <dl class="intro-meta">
          <div><dt>Now</dt><dd>Building <a href="/work/lifeos/">LifeOS</a>, in beta</dd></div>
          <div><dt>Based in</dt><dd>El Jadida and Meknès, Morocco</dd></div>
        </dl>
      </section>

      <section class="section wrap" id="work" aria-labelledby="work-title">
        <h2 id="work-title">Selected work</h2>
        <div class="projects">
          ${featured.map(project)}
        </div>
      </section>

      <section class="section wrap" aria-labelledby="earlier-title">
        <h2 id="earlier-title">Earlier</h2>
        <ul class="index">
          ${earlier.map(
            (p) => html`
              <li>
                <span class="index-name">${p.name}</span>
                <span class="index-summary">${p.summary}</span>
                <span class="index-stack">${list(p.stack)}</span>
              </li>`,
          )}
        </ul>
      </section>

      <section class="section wrap" id="contact" aria-labelledby="contact-title">
        <h2 id="contact-title">Contact</h2>
        <div class="contact">
          <p class="contact-lead">The best way to reach me is email.</p>
          <p class="contact-email">
            <a href="mailto:${site.email}">${site.email}</a>
            <button type="button" class="copy" data-copy="${site.email}" hidden>Copy</button>
            <span class="visually-hidden" role="status" data-copy-status></span>
          </p>
          ${facts([
            ['Phone', html`<a href="${site.phone.href}">${site.phone.display}</a>`],
            ['GitHub', html`<a href="${site.github.url}">${site.github.handle}</a>`],
            ['Languages', site.languages.join(', ')],
          ])}
        </div>
      </section>`,
  };
}
