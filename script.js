/**
 * Portfolio Website - Main JavaScript
 * Yasser Mansour - yassermansour.com
 */

'use strict';

// ================================
// DOM ELEMENTS
// ================================

const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
const navLinkElements = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');
const heroBackground = document.querySelector('.hero-background');
const introSection = document.querySelector('.introduction');

// ================================
// MOBILE NAVIGATION
// ================================

function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    navToggle.classList.remove('active');
    navLinks.classList.remove('active');
    document.body.style.overflow = '';
}

// Toggle menu on button click
navToggle.addEventListener('click', toggleMobileMenu);

// Close menu when clicking a nav link
navLinkElements.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        closeMobileMenu();
    }
});

// ================================
// SMOOTH SCROLL WITH OFFSET
// ================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = nav.offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// SCROLL-BASED EFFECTS
// ================================

let lastScroll = 0;

function handleScroll() {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class to nav for backdrop effect
    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    // Parallax effect for hero background
    if (heroBackground && currentScroll < window.innerHeight) {
        const rate = currentScroll * 0.3;
        heroBackground.style.transform = `translateY(${rate}px)`;
    }
    
    // Fade out introduction section as user scrolls
    if (introSection) {
        const introHeight = introSection.offsetHeight;
        const opacity = Math.max(0, 1 - (currentScroll / introHeight) * 1.5);
        introSection.style.opacity = opacity;
    }
    
    lastScroll = currentScroll;
}

// Debounced scroll handler for performance
const debouncedScroll = debounce(handleScroll, 10);
window.addEventListener('scroll', debouncedScroll, { passive: true });

// ================================
// ACTIVE SECTION HIGHLIGHTING
// ================================

function highlightActiveSection() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (correspondingNavLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinkElements.forEach(link => link.classList.remove('active-section'));
            correspondingNavLink.classList.add('active-section');
        }
    });
}

const debouncedHighlight = debounce(highlightActiveSection, 100);
window.addEventListener('scroll', debouncedHighlight, { passive: true });

// ================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            // Optionally unobserve after animation
            // animateOnScroll.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe animated elements
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.approach-card, .project-card, .expertise-category'
    );
    
    animatedElements.forEach(el => {
        animateOnScroll.observe(el);
    });
}

// ================================
// PROJECT CARD INTERACTIONS
// ================================

function initProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 50;
            const rotateY = (centerX - x) / 50;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ================================
// TECH BADGE INTERACTIONS
// ================================

function initTechBadgeEffects() {
    const techBadges = document.querySelectorAll('.tech-badge');
    
    techBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// ================================
// DYNAMIC YEAR IN FOOTER
// ================================

function updateFooterYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ================================
// UTILITY FUNCTIONS
// ================================

/**
 * Debounce function to limit the rate of function calls
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to ensure function is called at most once per interval
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ================================
// EMAIL LINK TRACKING (OPTIONAL)
// ================================

function initEmailTracking() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Optional: Add analytics tracking here
            console.log('Email link clicked:', this.href);
        });
    });
}

// ================================
// PERFORMANCE OPTIMIZATIONS
// ================================

// Preload critical resources
function preloadResources() {
    // Add any resource preloading if needed
}

// Lazy load images if any are added in the future
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// ================================
// CONSOLE EASTER EGG
// ================================

function showConsoleMessage() {
    const styles = {
        title: 'font-size: 20px; font-weight: bold; color: #DC2626;',
        text: 'font-size: 14px; color: #525252;',
        link: 'font-size: 14px; color: #DC2626; font-weight: bold;'
    };
    
    console.log('%c👋 Hello, Developer!', styles.title);
    console.log('%cInterested in how this was built?', styles.text);
    console.log('%cReach out: mansouryasser002@gmail.com', styles.link);
    console.log('%c─────────────────────────────────', 'color: #E5E5E5;');
    console.log('%cThis portfolio was built with:', styles.text);
    console.log('%c• Vanilla JavaScript (no frameworks)', styles.text);
    console.log('%c• Semantic HTML5', styles.text);
    console.log('%c• Modern CSS with custom properties', styles.text);
    console.log('%c• Mobile-first responsive design', styles.text);
    console.log('%c• Optimized performance', styles.text);
}

// ================================
// ACCESSIBILITY ENHANCEMENTS
// ================================

function initAccessibility() {
    // Add skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#introduction';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--color-accent);
        color: white;
        padding: 8px 16px;
        text-decoration: none;
        z-index: 10000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '0';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// ================================
// INITIALIZATION
// ================================

function init() {
    // Update dynamic content
    updateFooterYear();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize interactive effects
    initProjectCardEffects();
    initTechBadgeEffects();
    
    // Initialize email tracking
    initEmailTracking();
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Initialize accessibility features
    initAccessibility();
    
    // Show console message
    showConsoleMessage();
    
    // Initial scroll handler call
    handleScroll();
    highlightActiveSection();
    
    console.log('Portfolio initialized successfully ✓');
}

// ================================
// PAGE LOAD EVENTS
// ================================

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Optional: Add page visibility API to pause animations when tab is not visible
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations or heavy operations
    } else {
        // Resume animations
    }
});

// Optional: Detect if user prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable or simplify animations
    document.body.classList.add('reduce-motion');
}

// ================================
// EXPORT FOR POTENTIAL MODULE USE
// ================================

// If using modules, export functions as needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        init,
        debounce,
        throttle
    };
}
