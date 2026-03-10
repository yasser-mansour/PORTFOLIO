/* ═══════════════════════════════════════════════════════════════════════
   SCRIPT.JS — Yasser Mansour Portfolio
   Clean, modular vanilla JavaScript
   ═══════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ────────────────────────────────────────────────────────────────────
     UTILITY HELPERS
  ──────────────────────────────────────────────────────────────────── */

  /**
   * Run callback after DOM is ready.
   */
  function onReady(fn) {
    if (document.readyState !== 'loading') { fn(); }
    else { document.addEventListener('DOMContentLoaded', fn); }
  }

  /**
   * Throttle a function to run at most once per animation frame.
   * Returns a wrapper that can safely be attached to scroll events.
   */
  function rafThrottle(fn) {
    let ticking = false;
    return function (...args) {
      if (!ticking) {
        requestAnimationFrame(() => {
          fn.apply(this, args);
          ticking = false;
        });
        ticking = true;
      }
    };
  }

  /* ────────────────────────────────────────────────────────────────────
     NAVIGATION — sticky scroll state + mobile burger
  ──────────────────────────────────────────────────────────────────── */

  function initNav() {
    const nav      = document.getElementById('nav');
    const burger   = document.getElementById('burger');
    const navLinks = document.getElementById('navLinks');

    if (!nav || !burger || !navLinks) return;

    // Scroll → add .scrolled class for glassy background
    const handleScroll = rafThrottle(() => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // run once on init

    // Mobile burger toggle
    burger.addEventListener('click', () => {
      const isOpen = burger.classList.toggle('open');
      navLinks.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      burger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
        burger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && burger.classList.contains('open')) {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ────────────────────────────────────────────────────────────────────
     ACTIVE NAV LINK — highlight based on scroll position
  ──────────────────────────────────────────────────────────────────── */

  function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const links    = document.querySelectorAll('.nav__link');

    if (!sections.length || !links.length) return;

    const update = rafThrottle(() => {
      const scrollY = window.scrollY + 120;

      let current = '';
      sections.forEach(section => {
        if (scrollY >= section.offsetTop) {
          current = section.getAttribute('id');
        }
      });

      links.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${current}`
        );
      });
    });

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ────────────────────────────────────────────────────────────────────
     HERO — staggered fade-up entrance
  ──────────────────────────────────────────────────────────────────── */

  function initHeroAnimation() {
    const elements = document.querySelectorAll('.fade-up');
    if (!elements.length) return;

    // Small delay so browser has rendered the page
    setTimeout(() => {
      elements.forEach((el, i) => {
        setTimeout(() => {
          el.classList.add('in');
        }, i * 120);
      });
    }, 80);
  }

  /* ────────────────────────────────────────────────────────────────────
     REVEAL ON SCROLL — IntersectionObserver for .reveal elements
  ──────────────────────────────────────────────────────────────────── */

  function initReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        // Stagger siblings within the same parent for a cascading effect
        const siblings = Array.from(
          entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')
        );
        const idx = siblings.indexOf(entry.target);
        const delay = Math.max(0, idx) * 90;

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      });
    }, {
      threshold:   0.08,
      rootMargin: '0px 0px -48px 0px',
    });

    reveals.forEach(el => observer.observe(el));
  }

  /* ────────────────────────────────────────────────────────────────────
     SKILL BARS — animated fill on scroll-into-view
  ──────────────────────────────────────────────────────────────────── */

  function initSkillBars() {
    const bars = document.querySelectorAll('.skill-bar__fill');
    if (!bars.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const target = entry.target;
        const width  = target.getAttribute('data-width');

        // Slight delay for visual delight
        setTimeout(() => {
          target.style.width = `${width}%`;
        }, 250);

        observer.unobserve(target);
      });
    }, { threshold: 0.2 });

    bars.forEach(bar => observer.observe(bar));
  }

  /* ────────────────────────────────────────────────────────────────────
     COUNTER ANIMATION — numeric stats in hero
  ──────────────────────────────────────────────────────────────────── */

  function animateCounter(el) {
    const target   = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1400;
    const start    = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out-cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }

    requestAnimationFrame(step);
  }

  function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  /* ────────────────────────────────────────────────────────────────────
     TIMELINE DOT — activate dot when card becomes visible
  ──────────────────────────────────────────────────────────────────── */

  function initTimeline() {
    const items = document.querySelectorAll('.tl-item');
    if (!items.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    items.forEach(item => observer.observe(item));
  }

  /* ────────────────────────────────────────────────────────────────────
     SMOOTH SCROLL — override default anchor behaviour
  ──────────────────────────────────────────────────────────────────── */

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        const navHeight = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--nav-h'),
          10
        ) || 72;

        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  /* ────────────────────────────────────────────────────────────────────
     CUSTOM CURSOR — smooth magnetic follower
  ──────────────────────────────────────────────────────────────────── */

  function initCursor() {
    const cursor   = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');

    // Only on pointer-capable (non-touch) devices
    if (!cursor || !follower) return;
    if (window.matchMedia('(pointer: coarse)').matches) {
      cursor.style.display   = 'none';
      follower.style.display = 'none';
      return;
    }

    let mouseX = 0, mouseY = 0;
    let followX = 0, followY = 0;
    let isVisible = false;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      cursor.style.left = `${mouseX}px`;
      cursor.style.top  = `${mouseY}px`;

      if (!isVisible) {
        cursor.style.opacity   = '1';
        follower.style.opacity = '1';
        isVisible = true;
      }
    });

    document.addEventListener('mouseleave', () => {
      cursor.style.opacity   = '0';
      follower.style.opacity = '0';
      isVisible = false;
    });

    // Scale cursor on interactive elements
    const interactive = 'a, button, input, textarea, [role="button"]';
    document.querySelectorAll(interactive).forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform   = 'translate(-50%, -50%) scale(1.6)';
        follower.style.transform = 'translate(-50%, -50%) scale(1.3)';
        follower.style.borderColor = 'var(--gold)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform   = 'translate(-50%, -50%) scale(1)';
        follower.style.transform = 'translate(-50%, -50%) scale(1)';
        follower.style.borderColor = '';
      });
    });

    // Smooth follower loop
    function animateFollower() {
      // Lerp toward cursor
      followX += (mouseX - followX) * 0.1;
      followY += (mouseY - followY) * 0.1;

      follower.style.left = `${followX}px`;
      follower.style.top  = `${followY}px`;

      requestAnimationFrame(animateFollower);
    }
    animateFollower();
  }

  /* ────────────────────────────────────────────────────────────────────
     PARALLAX ORBS — subtle scroll parallax on hero orbs
  ──────────────────────────────────────────────────────────────────── */

  function initParallaxOrbs() {
    const orbs = document.querySelectorAll('.orb');
    if (!orbs.length) return;

    const handleScroll = rafThrottle(() => {
      const y = window.scrollY;
      orbs.forEach((orb, i) => {
        const speed  = 0.06 + i * 0.035;
        const offset = y * speed;
        orb.style.transform = `translateY(${offset}px)`;
      });
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  /* ────────────────────────────────────────────────────────────────────
     PROJECT CARD HOVER — subtle cursor-tracked glow tilt
  ──────────────────────────────────────────────────────────────────── */

  function initCardTilt() {
    const cards = document.querySelectorAll('.proj-card');
    if (!cards.length) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    cards.forEach(card => {
      const shell = card.querySelector('.proj-card__shell');
      if (!shell) return;

      card.addEventListener('mousemove', (e) => {
        const rect   = card.getBoundingClientRect();
        const x      = (e.clientX - rect.left) / rect.width  - 0.5; // –0.5 → 0.5
        const y      = (e.clientY - rect.top)  / rect.height - 0.5;
        const tiltX  = y * 5;   // degrees
        const tiltY  = -x * 5;

        shell.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.01)`;
        shell.style.transition = 'transform 0.08s linear';
      });

      card.addEventListener('mouseleave', () => {
        shell.style.transform  = '';
        shell.style.transition = 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)';
      });
    });
  }

  /* ────────────────────────────────────────────────────────────────────
     CONTACT FORM — validation + success feedback
  ──────────────────────────────────────────────────────────────────── */

  function initContactForm() {
    const form    = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');

    if (!form || !success) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn          = form.querySelector('button[type="submit"]');
      const originalHTML = btn.innerHTML;

      // Loading state
      btn.innerHTML  = 'Sending…';
      btn.disabled   = true;
      btn.style.opacity = '0.7';

      // Simulate async send (replace with real fetch in production)
      setTimeout(() => {
        form.reset();

        // Restore button
        btn.innerHTML = originalHTML;
        btn.disabled  = false;
        btn.style.opacity = '';

        // Show success message
        success.classList.add('show');

        // Auto-hide after 5 s
        setTimeout(() => {
          success.classList.remove('show');
        }, 5000);
      }, 1300);
    });
  }

  /* ────────────────────────────────────────────────────────────────────
     ABOUT CARD — stagger children on reveal
  ──────────────────────────────────────────────────────────────────── */

  function initAboutCards() {
    const cards = document.querySelectorAll('.about-card');
    if (!cards.length) return;

    cards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 80}ms`;
    });
  }

  /* ────────────────────────────────────────────────────────────────────
     PROJECT TAGS — hover colour shift
  ──────────────────────────────────────────────────────────────────── */

  function initTagHovers() {
    document.querySelectorAll('.proj-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.querySelectorAll('.tag').forEach(tag => {
          tag.style.borderColor = 'rgba(201,168,76,0.3)';
          tag.style.color       = 'var(--text-primary)';
        });
      });
      card.addEventListener('mouseleave', () => {
        card.querySelectorAll('.tag').forEach(tag => {
          tag.style.borderColor = '';
          tag.style.color       = '';
        });
      });
    });
  }

  /* ────────────────────────────────────────────────────────────────────
     INIT — run all modules
  ──────────────────────────────────────────────────────────────────── */

  onReady(() => {
    initNav();
    initActiveNav();
    initHeroAnimation();
    initReveal();
    initSkillBars();
    initCounters();
    initTimeline();
    initSmoothScroll();
    initCursor();
    initParallaxOrbs();
    initCardTilt();
    initContactForm();
    initAboutCards();
    initTagHovers();
  });

})();

