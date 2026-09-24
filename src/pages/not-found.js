import { html } from '../html.js';
import { site } from '../site.js';

export function notFound() {
  return {
    path: '/404.html',
    noindex: true,
    title: `Not found — ${site.name}`,
    description: 'The page you asked for does not exist on yassermansour.com.',
    body: html`
      <section class="missing wrap">
        <p class="missing-code">404</p>
        <h1>Nothing here.</h1>
        <p><code data-path>This address</code> isn’t a page on this site. It may have moved when the site was rebuilt.</p>
        <p><a href="/#work">See the work</a> or <a href="/">go to the homepage</a>.</p>
      </section>`,
  };
}
