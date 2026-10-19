import { html } from "./html.js";

// An original explanatory illustration, explicitly distinguished from the product UI.
export function learningDemo() {
  return html`<div class="learning-demo" data-learning-demo>
    <div class="demo-top">
      <span>An idea, unpacked</span><span>01 — 03</span>
    </div>
    <div class="demo-equation" aria-label="f of x equals x squared">
      f(x) = x<span>2</span>
    </div>
    <svg
      class="demo-graph"
      viewBox="0 0 500 230"
      role="img"
      aria-labelledby="graph-title"
    >
      <title id="graph-title">
        The graph of x squared, with the point 2, 4 highlighted
      </title>
      <defs>
        <pattern
          id="graph-grid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M40 0H0V40"
            fill="none"
            stroke="currentColor"
            stroke-opacity=".08"
          />
        </pattern>
      </defs>
      <rect width="500" height="230" fill="url(#graph-grid)" />
      <path
        d="M25 200H475M250 15V215"
        fill="none"
        stroke="currentColor"
        stroke-opacity=".3"
      />
      <path
        class="graph-curve"
        d="M80 20Q250 380 420 20"
        fill="none"
        stroke="#d54b2a"
        stroke-width="3"
      />
      <path
        d="M330 200V160H250"
        fill="none"
        stroke="currentColor"
        stroke-dasharray="4 5"
        stroke-opacity=".4"
      />
      <circle cx="330" cy="160" r="5" fill="#d54b2a" />
      <text x="344" y="150" fill="currentColor" font-size="13">(2, 4)</text>
      <text x="462" y="220" fill="currentColor" font-size="12">x</text>
    </svg>
    <div
      class="demo-tabs"
      hidden
      role="group"
      aria-label="Explore the reasoning"
    >
      <button type="button" data-step="0" aria-pressed="true">
        01 Question</button
      ><button type="button" data-step="1" aria-pressed="false">
        02 Reason</button
      ><button type="button" data-step="2" aria-pressed="false">
        03 Understand
      </button>
    </div>
    <p class="demo-answer" aria-live="polite" data-demo-answer>
      What happens to the output when you double x?
    </p>
    <noscript
      ><p class="demo-answer">
        At x = 2, x² = 4. At x = 4, x² = 16. Doubling x makes the output four
        times larger.
      </p></noscript
    >
    <p class="demo-caption">
      Interactive illustration of the learning idea · not a product screenshot
    </p>
  </div>`;
}
