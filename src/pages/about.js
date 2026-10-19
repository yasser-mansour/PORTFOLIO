import { html } from "../html.js";
import { site } from "../site.js";
import { facts } from "../components.js";

const TOOLS = [
  ["Core", "Python, Django, PostgreSQL, JavaScript, HTML and CSS, Git"],
  ["Services", "Django REST Framework, Celery, Redis, ReportLab"],
  [
    "Beyond the browser",
    "Kotlin, Jetpack Compose, CameraX, ML Kit, Room, Swift",
  ],
  ["Shipping", "Heroku, GitHub Actions, Amazon S3"],
];

export function about() {
  return {
    path: "/about/",
    section: "about",
    title: `About — ${site.name}`,
    description:
      "Yasser Mansour: Moroccan software developer, founder of Mansour Technologies and engineering student at ENSAM Meknès. The person and decisions behind the products.",
    body: html`<div class="about wrap">
      <header class="about-head">
        <span class="eyebrow">A few things about me</span>
        <h1>A student of engineering.<br /><em>A builder by instinct.</em></h1>
      </header>
      <section class="about-intro" aria-label="My story">
        <figure class="about-portrait">
          <img
            src="/images/yasser-mansour.webp"
            width="408"
            height="612"
            alt="Yasser Mansour in a dark suit and tie"
            decoding="async"
          />
        </figure>
        <div>
          <span class="eyebrow">El Jadida → Meknès / Morocco</span>
          <p class="lead">
            I’m Yasser. I wrote my first code at 13. Building things has been
            how I learn ever since.
          </p>
          <p>
            I’m an engineering student at ENSAM Meknès and the founder of
            Mansour Technologies. Academic work and product work run alongside
            each other: one gives me new ways to think, the other asks me to
            make those ideas useful.
          </p>
          <p>
            Most of my software begins with a concrete problem. A parent should
            hear about an absence the same day. A shop should be able to scan a
            barcode with a phone and print a receipt. A learner should be able
            to work out why an answer makes sense.
          </p>
          <p>
            I design the data model, build the backend and interface, deploy the
            application, and keep it running when people depend on it. Some of
            that work is public. Some is built for people and organisations and
            stays private.
          </p>
          <p>I speak English, French and Arabic.</p>
        </div>
      </section>
      <section class="section" aria-labelledby="now">
        <h2 id="now">What I’m building now</h2>
        <div class="prose">
          <p class="lead">
            <a href="/work/understand/">Understand</a> is my current focus: a
            learning platform built around reasoning rather than memorising.
          </p>
          <p>
            Its public launch is planned for 22 October 2026. Alongside it, I’m
            bringing my software products together under Mansour Technologies
            and continuing my studies at ENSAM Meknès.
            <a href="/work/lifeos/">LifeOS</a>, my local-first personal
            application, remains in beta.
          </p>
        </div>
      </section>
      <section class="section" aria-labelledby="principles-title">
        <h2 id="principles-title">Things the work taught me</h2>
        <ol class="principles">
          <li>
            <h3>The small details are the system.</h3>
            <p>
              Money belongs in a decimal field. A report printed last month
              shouldn’t quietly change. A receipt needs to reach the printer.
              These details are what make software dependable.
            </p>
          </li>
          <li>
            <h3>The real world retries.</h3>
            <p>
              A phone on a bad connection will send the same request twice. The
              server should recognise it. I try to turn assumptions like these
              into rules, and the rules into tests.
            </p>
          </li>
          <li>
            <h3>Use what the problem needs.</h3>
            <p>
              Usually that means a Django backend and PostgreSQL. Sometimes it
              means Kotlin on a phone, a small native desktop wrapper, or a
              local agent connecting a web till to a USB printer.
            </p>
          </li>
        </ol>
      </section>
      <section class="section" aria-labelledby="tools">
        <h2 id="tools">My working tools</h2>
        ${facts(TOOLS, "facts facts--stack")}
      </section>
      <section class="section" id="colophon" aria-labelledby="colophon-title">
        <h2 id="colophon-title">About this website</h2>
        <div class="prose">
          <p>
            Plain HTML and CSS, generated from a small set of JavaScript
            modules. No frontend framework, no client-side rendering and no
            analytics. A little JavaScript adds the local time, email copying
            and an interactive learning illustration.
          </p>
          <p>
            Set in Bricolage Grotesque, IBM Plex Sans and IBM Plex Mono, with
            Georgia for the quieter italic lines. The fonts are served locally.
            Motion respects your device preferences, and the pages work without
            JavaScript.
          </p>
          <p>
            Product screenshots show real applications running with sample data,
            or public documentation. The Understand illustration explains a
            learning idea; it is not a product screenshot. The company and
            Understand marks are reused from their existing brand assets.
            <a href="${site.source}">Source on GitHub ↗</a>
          </p>
        </div>
      </section>
      <section class="about-contact" aria-labelledby="about-contact-title">
        <h2 id="about-contact-title">
          There’s more to learn.<br /><em>And more to build.</em>
        </h2>
        <a class="text-link" href="mailto:${site.email}"
          >Write to me <span aria-hidden="true">↗</span></a
        >
      </section>
    </div>`,
  };
}
