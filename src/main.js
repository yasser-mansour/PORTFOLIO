// The only JavaScript on the site. Everything works without it.

// Local time in Morocco, in the footer.
const clocks = document.querySelectorAll('[data-clock]');
if (clocks.length) {
  const format = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Africa/Casablanca',
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

// "Copy" next to the email address.
for (const button of document.querySelectorAll('[data-copy]')) {
  const announce = button.parentElement.querySelector('[data-copy-status]');
  if (!navigator.clipboard) continue;
  button.hidden = false;
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      button.textContent = 'Copied';
      if (announce) announce.textContent = 'Email address copied';
    } catch {
      button.textContent = 'Copy failed';
    }
    setTimeout(() => {
      button.textContent = 'Copy';
      if (announce) announce.textContent = '';
    }, 1800);
  });
}

// The 404 page names the address that was requested.
const missing = document.querySelector('[data-path]');
if (missing) missing.textContent = location.pathname;
