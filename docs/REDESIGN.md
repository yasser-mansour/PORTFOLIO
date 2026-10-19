# Yasser Mansour — portfolio redesign

Implemented locally on 19 October 2026. No production deployment or Git push was performed.

## Audit and decisions

The portfolio is `/Users/mansour/Developer/Projects/portfolio`, not the initially selected Understand workspace. Its existing architecture is well suited to the task: a dependency-free Node static generator, escaped HTML templates, shared project data, local fonts, responsive WebP images, a custom 404, sitemap/robots generation and GitHub Pages deployment. All of these remain.

Read all source modules, page templates, project data, stylesheet, build/check/preview scripts, README, domain configuration and deployment workflow. Compared the live homepage visually with the local implementation. The live site and local source differ slightly in portrait positioning. The existing strengths are factual technical writing, honest availability notes, real application screenshots, readable type and accessible basic navigation. The weaknesses are the small, understated introduction, uniform product treatment, missing Understand/company context and little visual distinction between a product in operation and an experiment.

Preserved routes: `/`, `/about/`, `/work/suivedu/`, `/work/connecfy/`, `/work/manostock/`, `/work/lifeos/`, `/404.html`. Added `/work/understand/`. Preserved the substantive technical notes, screenshot galleries, earlier work, verified email/phone/social links and GitHub Pages workflow. No existing valuable assets were deleted.

## Creative direction

Three directions considered before implementation:

| Direction | Originality / fit | Product storytelling | Mobile / performance / maintenance | Decision |
| --- | --- | --- | --- | --- |
| An interactive systems atlas: products as an explorable connected map | Distinctive and technical, but makes the interface compete with the person | Strong relationships, weaker long-form reading | Requires a separate mobile interaction and more code | Not selected |
| A cinematic dark studio: large product films and immersive panels | Strong immediate presence, less personal; risks resembling launch marketing | Good for major launches, less suited to operational tools | Larger media cost, weaker low-bandwidth experience | Not selected |
| A personal editorial edition: oversized name, portrait, human essay and individual product chapters | Strong fit for a Moroccan student/founder whose work is already substantive | Lets each product keep its own scale and character | Native document flow, inexpensive motion, local typography, durable components | Selected |

The selected system uses warm paper, near-black ink and a restrained vermilion accent. Bricolage Grotesque gives the name and headlines their character; IBM Plex Sans carries the prose; IBM Plex Mono identifies context and sequence. Georgia italic changes the reading rhythm without loading another font. The palette is intentionally light rather than switching the art direction with the operating-system theme.

## Implementation

- Hero: oversized two-line name, existing portrait, clear developer/founder identity, engineering-student qualification and an immediate route into the work.
- Understand: first position, real existing logo, dedicated case study, verified learning paths and a small interactive quadratic explanation. The illustration is explicitly labeled as conceptual rather than a screenshot. The reasoning works with buttons and keyboard; a worked explanation replaces controls when JavaScript is unavailable.
- SuivEdu: a full-width sage chapter with a real dashboard capture and context about school operations. No invented usage counts or outcomes.
- Connecfy: a restrained four-step route based on its documented API → queue → Android → SMS workflow; links to public documentation rather than assuming self-service availability.
- ManoStock: a warmer, compact chapter showing its actual till, with barcode and print workflows explained in the preserved case study.
- Mansour Technologies: founder relationship and product umbrella, with the **approved Original Flow** symbol and outlined wordmark from the official brand package. The older draft assets in the company's `public/brand/` folder were superseded after checking the approved package README. Artwork geometry and logo colors were not modified.
- LifeOS and earlier projects remain, with deliberately lower visual priority.
- About: an introductory essay, current work, three engineering principles grounded in existing writing, working tools and a truthful colophon. No invented timeline or achievements.
- Contact: verified email, copy action with live feedback and manual-selection fallback, telephone and social links.
- Responsive layouts at 700px and 1000px change composition, project rhythm, type scale and image framing. No custom cursor or scroll interception.
- Motion: a brief unobtrusive introduction, native cross-document view transitions when supported, directional link feedback and a curve trace during the reasoning interaction. Core content is visible immediately. Reduced-motion preferences remove animation, transitions and smooth scrolling.
- SEO: updated title/description and Person structured data, retained canonicals and social metadata, regenerated 1200 × 630 social card and automatic sitemap/robots including the new case study. Stable internal anchors and descriptive controls preserve access.
- Matched the existing geometric Y favicon and its raster exports to the new palette.
- Made the metadata checker accept valid self-closing/whitespace-formatted HTML tags while retaining semantic checks.
- No runtime dependencies were added. Prettier was used as a temporary formatting tool, not installed as an application dependency.

## Content and asset evidence

The founder's supplied brief establishes the founder relationship and planned public launch. The existing portfolio source establishes personal background, contact methods and the older product descriptions. Other local repositories were inspected read-only; copied assets were added only to this portfolio.

| Source | Evidence / handling |
| --- | --- |
| `https://yassermansour.com` and local `src/projects.js` | Existing product summaries, technical notes, screenshots, contact and personal background preserved |
| `https://www.understand.ma` | HTTP 200 on 19 October; public catalogue includes CPGE, ENCG, ENSAM and medicine; platform text supports lessons, exercises, hints and corrections |
| Local Understand code and documentation | Django/PostgreSQL; browser-based Pyodide/Clang execution; existing official Understand SVG mark and wordmark copied without alteration |
| `https://www.suivedu.com` | HTTP 200 after redirect to the real login; no authentication attempted; private capabilities described using the existing factual case study and founder brief |
| `https://docs.connecfy.com` | HTTP 200; retained as the primary public technical destination; accounts remain described as manually provisioned |
| `https://caisse.yassermansour.com` | HTTP 503 during verification; no new homepage link to this unavailable endpoint was introduced |
| Company `public/CNAME`, `src/data/site.ts` | Both configure `mansourtechnologies.com`; this establishes the configured domain, not current secure reachability |
| Company `branding/Mansour-Technologies-Official-Brand/README.md` and `02-Logo-Lockups/` | Approved Original Flow symbol/wordmark; supplied white-on-navy application retained |
| Existing portfolio image captions | SuivEdu/ManoStock captures are local applications with sample data; Connecfy is public documentation; LifeOS uses demo fixtures. No simulated dashboard is represented as real. |
| Bricolage font from Understand | Existing local font copied with its SIL OFL license in `public/licenses/Bricolage-OFL.txt` |

## Verification

- `npm test`: production generation and existing static checks for every page, internal links, anchors, image alt text/dimensions/srcsets, metadata, duplicate IDs, placeholder leakage and sitemap coverage.
- Browser matrix: **8 pages × 5 widths = 40 combinations**, at 320, 390, 768, 1024 and 1440 CSS pixels. No horizontal overflow, failed images, unnamed visible controls, missing/surplus H1 or undersized buttons in this targeted audit.
- Matrix runs in real browser iframes at the exact CSS viewport widths, not separate physical devices. `scripts/browser-qa.html` is retained for reproduction. Build, temporarily copy it to `dist/__audit.html`, open that URL in the local browser and read its report. A clean build removes it; it is not shipped.
- Visually reviewed desktop hero, Understand interaction, About, contact, real product chapters, and mobile layouts. Refined the mobile name scale, home-link accessible label, official company assets, image selection sizes and no-JavaScript fallback during this pass.
- Activated the reasoning controls by mouse and Tab/Enter. Confirmed pressed state and live text change. Activated email Copy and confirmed visible and live-region feedback.
- Reviewed mobile rendering with scripts blocked: navigation, product links and email remain usable; the learning explanation remains present; enhancement-only controls are hidden.
- Browser warning/error log on reviewed production page was empty.
- Reviewed reduced-motion CSS and the native unsupported-browser fallbacks. No Lighthouse score, real-user Core Web Vitals, cross-engine/device certification or email deliverability result is claimed.
- Transfer-size proxies: generated homepage 46,101 bytes (11,609 bytes gzipped); enhancement JavaScript 2,444 bytes (1,098 bytes gzipped). These are local file measurements, not a network-speed or Core Web Vitals result.
- Preview/build can race if an automatic watcher rebuild is pending while `npm test` removes/recreates `dist/`; run final checks with the watcher stopped. This was observed once and resolved by serializing final verification.

## Review before publication

1. **Company HTTPS:** both `https://mansourtechnologies.com` and `https://www.mansourtechnologies.com` fail hostname certificate validation from this machine. The homepage company link uses the domain configured in the company repository. Repair DNS/hosting certificate issuance and verify that destination before publishing, or replace it with the eventual working canonical domain. Certificate checking was never disabled.
2. **Understand launch:** today is 19 October 2026. The site says its public launch is planned for 22 October 2026 even though a public preview responds. Confirm the actual launch before changing the status in `src/projects.js`, `src/pages/home.js` and `src/pages/about.js`. A date alone does not imply launch.
3. **ManoStock:** the existing application endpoint returned 503. The redesigned portfolio's internal case study and screenshots work; no claim of open public signup or current endpoint availability was added.
4. Review the new copy and design locally, then authorize publication separately. Pushing to the existing `main` workflow may deploy automatically. No push, deployment or workflow change was made.
