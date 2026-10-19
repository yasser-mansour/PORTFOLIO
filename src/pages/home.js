import { html } from "../html.js";
import { site } from "../site.js";
import { featured, earlier } from "../projects.js";
import { screenshot, list } from "../components.js";
import { learningDemo } from "../learning-demo.js";

export function home() {
  const find = (slug) => featured.find((p) => p.slug === slug);
  return {
    path: "/",
    section: "home",
    title: `${site.name} — Software builder & founder`,
    description: site.description,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: site.name,
      url: site.url,
      email: `mailto:${site.email}`,
      jobTitle: "Software developer and founder",
      affiliation: [
        { "@type": "CollegeOrUniversity", name: site.school },
        { "@type": "Organization", name: "Mansour Technologies" },
      ],
      knowsLanguage: site.languages,
      sameAs: [site.github.url, site.linkedin],
    },
    body: html` <section class="hero wrap" aria-labelledby="intro-name">
        <div class="hero-eyebrow">
          <span>Independent software builder & founder</span
          ><span>Based in Morocco <span aria-hidden="true">↗</span></span>
        </div>
        <div class="hero-composition">
          <h1 id="intro-name">
            Yasser<span>Mansour<span class="name-period">.</span></span>
          </h1>
          <figure class="hero-portrait">
            <div class="portrait-field">
              <span class="portrait-note" aria-hidden="true"
                >A person behind the products.</span
              ><img
                src="/images/yasser-mansour-hero.webp"
                width="408"
                height="498"
                alt="Yasser Mansour"
                fetchpriority="high"
              />
            </div>
            <figcaption>El Jadida / Meknès, MA</figcaption>
          </figure>
        </div>
        <div class="hero-bottom">
          <p class="hero-statement">
            Useful software.<br /><em>From the ground up.</em>
          </p>
          <div class="hero-intro">
            <p>
              I build learning platforms, school systems and tools for everyday
              business. Founder of Mansour Technologies. Engineering student at
              ENSAM Meknès.
            </p>
            <a class="text-link" href="#work"
              >Explore the work <span aria-hidden="true">↓</span></a
            >
          </div>
        </div>
        <div class="hero-foot">
          <span>Personal site / Selected work</span
          ><a href="/work/understand/"
            >Currently building: Understand
            <span aria-hidden="true">↗</span></a
          >
        </div>
      </section>

      <section id="work" class="work-intro wrap" aria-labelledby="work-title">
        <div class="section-label">
          <span>01 / Selected work</span><span>Ideas put to work</span>
        </div>
        <h2 id="work-title">
          Different problems.<br /><em>Same instinct to build.</em>
        </h2>
        <p>
          From a classroom register to the shop counter.<br />Software starts
          with the people who need it.
        </p>
      </section>

      <article
        class="understand-chapter wrap"
        aria-labelledby="understand-title"
      >
        <div class="chapter-heading">
          <span class="eyebrow">01 — Learning & discovery</span
          ><span class="eyebrow launch-note"
            >Public launch planned · 22 Oct 2026</span
          >
        </div>
        <div class="understand-grid">
          <div class="chapter-copy">
            <img
              class="understand-logo"
              src="/brand/understand-logo.svg"
              width="7165"
              height="1241"
              alt="Understand"
              loading="lazy"
            />
            <h3 id="understand-title">
              Beyond the answer.<br /><em>Into the why.</em>
            </h3>
            <p>
              Learning shouldn’t stop at remembering. I’m building Understand to
              make room for the reasoning: lessons, progressive exercises, hints
              and worked corrections.
            </p>
            <p class="small-copy">
              CPGE, ENCG, ENSAM, medicine, baccalaureate subjects and
              programming. Different paths into a deeper understanding.
            </p>
            <a class="text-link" href="/work/understand/"
              >Inside Understand <span aria-hidden="true">↗</span></a
            ><a class="quiet-link" href="https://www.understand.ma"
              >Visit understand.ma ↗</a
            >
          </div>
          ${learningDemo()}
        </div>
        <div class="chapter-bottom">
          <span>Product / Design / Development</span
          ><span>A Mansour Technologies product</span>
        </div>
      </article>

      <article class="suivedu-chapter" aria-labelledby="suivedu-title">
        <div class="wrap">
          <div class="chapter-heading">
            <span class="eyebrow">02 — School operations</span
            ><span class="eyebrow">In use by educational institutions</span>
          </div>
          <div class="suivedu-intro">
            <div>
              <h3 id="suivedu-title">
                SuivEdu<span aria-hidden="true">↗</span>
              </h3>
              <p class="chapter-deck">
                A clearer school day.<br />A closer connection to home.
              </p>
            </div>
            <div>
              <p>
                A teacher marks an absence. The school sees it. A parent gets
                the message. Attendance, communication and administration in one
                operational platform.
              </p>
              <a class="text-link" href="/work/suivedu/"
                >Explore the platform <span aria-hidden="true">↗</span></a
              >
            </div>
          </div>
          <a
            class="product-image"
            href="/work/suivedu/"
            aria-label="Read the SuivEdu case study"
            >${screenshot(find("suivedu"))}</a
          >
          <div class="chapter-bottom">
            <span>Real application · local sample data</span
            ><a href="https://www.suivedu.com">suivedu.com ↗</a>
          </div>
        </div>
      </article>

      <div class="secondary-work wrap">
        <article class="connecfy-chapter" aria-labelledby="connecfy-title">
          <span class="eyebrow">03 — Communication infrastructure</span>
          <h3 id="connecfy-title">Connecfy</h3>
          <p class="chapter-deck">
            From a line of code<br />to a phone in someone’s hand.
          </p>
          <div
            class="message-route"
            aria-label="Message route: API, queue, Android, SMS"
          >
            <span>API</span><i aria-hidden="true">→</i><span>Queue</span
            ><i aria-hidden="true">→</i><span>Android</span
            ><i aria-hidden="true">→</i><span>SMS</span>
          </div>
          <p>
            An SMS gateway connecting a business API to ordinary Android phones
            and their SIM cards. Queued messages, device routing and delivery
            status.
          </p>
          <a class="text-link" href="/work/connecfy/"
            >Follow the message <span aria-hidden="true">↗</span></a
          >
          <p class="product-note">
            Manually provisioned accounts ·
            <a href="https://docs.connecfy.com">Public documentation ↗</a>
          </p>
        </article>
        <article class="manostock-chapter" aria-labelledby="manostock-title">
          <span class="eyebrow">04 — Everyday business</span>
          <h3 id="manostock-title">ManoStock</h3>
          <p class="chapter-deck">
            Built for the work<br />behind the counter.
          </p>
          <a
            class="stock-image"
            href="/work/manostock/"
            aria-label="Read the ManoStock case study"
            >${screenshot(find("manostock"), {
              sizes: "(min-width: 700px) 40vw, 100vw",
            })}</a
          >
          <p>
            Stock, sales, invoices and a point-of-sale till. An Android barcode
            scanner and a local print agent connect the software to the shop.
          </p>
          <a class="text-link" href="/work/manostock/"
            >Behind the counter <span aria-hidden="true">↗</span></a
          >
          <p class="product-note">Real application · local sample data</p>
        </article>
      </div>

      <section class="company-chapter" aria-labelledby="company-title">
        <div class="wrap company-grid">
          <div class="company-symbol">
            <img
              src="/brand/mansour-technologies.svg"
              width="250"
              height="160"
              alt="Mansour Technologies — official Original Flow symbol"
              loading="lazy"
            />
          </div>
          <div>
            <span class="eyebrow">The bigger picture</span>
            <h2 id="company-title">
              Independent products.<br /><em>A shared home.</em>
            </h2>
            <p>
              I founded Mansour Technologies to bring my software products and
              ventures together. The work spans learning, school operations,
              communication and business tools. I’m the person connecting those
              pieces.
            </p>
            <div class="company-signature">
              <img
                src="/brand/mansour-technologies-wordmark.svg"
                width="384"
                height="58"
                alt="Mansour Technologies"
                loading="lazy"
              /><span class="eyebrow">Founded by Yasser Mansour</span>
            </div>
            <a class="company-website" href="https://mansourtechnologies.com"
              >Discover Mansour Technologies
              <span aria-hidden="true">↗</span></a
            >
          </div>
        </div>
      </section>

      <section class="other-work wrap" aria-labelledby="other-work-title">
        <div class="section-label">
          <h2 id="other-work-title">Also on my desk</h2>
          <span>Personal tools & earlier explorations</span>
        </div>
        <a class="lifeos-row" href="/work/lifeos/"
          ><span class="eyebrow">05 / Personal software</span>
          <h3>LifeOS <span aria-hidden="true">↗</span></h3>
          <p>
            A local-first home for tasks, study, money and notes.<br />Your
            computer. Your database. Currently in beta.
          </p></a
        >
        <ul class="index">
          ${earlier.map(
            (p) =>
              html`<li>
                <span class="index-name">${p.name}</span
                ><span class="index-summary">${p.summary}</span
                ><span class="index-stack">${list(p.stack)}</span>
              </li>`,
          )}
        </ul>
        <p class="aside">
          Some work stays private. I also build software on request for people
          and organisations.
        </p>
      </section>

      <section class="personal-chapter wrap" aria-labelledby="personal-title">
        <div>
          <span class="eyebrow">02 / The person</span>
          <h2 id="personal-title">
            Still studying.<br /><em>Already building.</em>
          </h2>
        </div>
        <div>
          <p>
            I’m from El Jadida, Morocco, and study engineering at ENSAM Meknès.
            Between academic work and running products, I keep coming back to
            the same thing: finding a real problem and staying with it until the
            software is useful.
          </p>
          <a class="text-link" href="/about/"
            >A little more about me <span aria-hidden="true">↗</span></a
          >
        </div>
      </section>

      <section
        class="contact-chapter"
        id="contact"
        aria-labelledby="contact-title"
      >
        <div class="wrap">
          <div class="section-label">
            <span>03 / A conversation</span
            ><span>English / Français / العربية</span>
          </div>
          <h2 id="contact-title">
            What are you<br /><em>working on?</em
            ><span aria-hidden="true">↗</span>
          </h2>
          <div class="contact-bottom">
            <p>
              A product, a practical problem, a possible collaboration.<br />I’d
              like to hear about it.
            </p>
            <div class="contact-email">
              <a href="mailto:${site.email}">${site.email}</a
              ><button
                class="copy"
                type="button"
                data-copy="${site.email}"
                hidden
              >
                Copy</button
              ><span
                class="visually-hidden"
                role="status"
                data-copy-status
              ></span>
            </div>
          </div>
          <div class="contact-links">
            <a href="${site.github.url}">GitHub ↗</a
            ><a href="${site.linkedin}">LinkedIn ↗</a
            ><a href="${site.phone.href}">${site.phone.display}</a>
          </div>
        </div>
      </section>`,
  };
}
