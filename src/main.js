// Progressive enhancements. Core content and navigation work without JavaScript.

// Local time in Morocco, in the footer.
const clocks = document.querySelectorAll("[data-clock]");
if (clocks.length) {
  const format = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Casablanca",
  });
  const tick = () => {
    const now = new Date();
    for (const clock of clocks) {
      clock.textContent = format.format(now);
      clock.dateTime = now.toISOString();
      clock.parentElement.hidden = false;
    }
  };
  tick();
  setInterval(tick, 20_000);
}

// "Copy" next to the email address. If the clipboard is unavailable,
// select the address instead so it can be copied by hand.
for (const button of document.querySelectorAll("[data-copy]")) {
  const announce = button.parentElement.querySelector("[data-copy-status]");
  const address = button.parentElement.querySelector("a");
  button.hidden = false;
  button.addEventListener("click", async () => {
    let message = "Copied";
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
    } catch {
      getSelection().selectAllChildren(address);
      message = "Selected";
    }
    button.textContent = message;
    if (announce)
      announce.textContent = `Email address ${message.toLowerCase()}`;
    setTimeout(() => {
      button.textContent = "Copy";
      if (announce) announce.textContent = "";
    }, 1800);
  });
}

// The 404 page names the address that was requested.
const missing = document.querySelector("[data-path]");
if (missing) missing.textContent = location.pathname;

// A small explanation, rather than a simulated product interface.
const reasoning = [
  "What happens to the output when you double x?",
  "Try x = 2: 2 × 2 = 4. Now double x to 4: 4 × 4 = 16.",
  "Doubling x makes x² four times larger. The output grows quadratically, not linearly.",
];
for (const demo of document.querySelectorAll("[data-learning-demo]")) {
  demo.querySelector(".demo-tabs").hidden = false;
  for (const tab of demo.querySelectorAll("[data-step]")) {
    tab.addEventListener("click", () => {
      for (const other of demo.querySelectorAll("[data-step]"))
        other.setAttribute("aria-pressed", String(other === tab));
      demo.querySelector("[data-demo-answer]").textContent =
        reasoning[Number(tab.dataset.step)];
      demo.dataset.activeStep = tab.dataset.step;
    });
  }
}
