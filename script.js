// ================================
// Mobile Navigation Toggle
// ================================

const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
const nav = document.getElementById('nav');
const navLinkElements = document.querySelectorAll('.nav-link');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
navLinkElements.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ================================
// Scroll-Based Navigation Styling
// ================================

let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for backdrop effect
    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ================================
// Smooth Scroll with Offset
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
// Intersection Observer for Animations
// ================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements with fade-in animations
const observeElements = () => {
    const elements = document.querySelectorAll('.philosophy-item, .project, .expertise-category, .vision-text p');
    elements.forEach(el => {
        // Reset initial state for observer
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        animateOnScroll.observe(el);
    });
};

// Initialize observer after a short delay to ensure DOM is ready
setTimeout(observeElements, 100);

// ================================
// Dynamic Year in Footer
// ================================

const updateFooterYear = () => {
    const yearElement = document.querySelector('.footer-content p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = `© ${currentYear} Yasser Mansour. All rights reserved.`;
    }
};

updateFooterYear();

// ================================
// Parallax Effect for Hero Background
// ================================

const heroBackground = document.querySelector('.hero-background');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.3;
    
    if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${rate}px)`;
    }
});

// ================================
// Tech Tag Interaction Enhancement
// ================================

const techTags = document.querySelectorAll('.tech-tag');

techTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// ================================
// Project Card Tilt Effect (Subtle)
// ================================

const projects = document.querySelectorAll('.project');

projects.forEach(project => {
    project.addEventListener('mousemove', (e) => {
        const rect = project.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 50;
        const rotateY = (centerX - x) / 50;
        
        project.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    
    project.addEventListener('mouseleave', () => {
        project.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ================================
// Active Section Indicator in Navigation
// ================================

const sections = document.querySelectorAll('section[id]');

const highlightNavigation = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinkElements.forEach(link => link.classList.remove('active-section'));
            navLink.classList.add('active-section');
        }
    });
};

window.addEventListener('scroll', highlightNavigation);

// Add CSS for active section
const style = document.createElement('style');
style.textContent = `
    .nav-link.active-section {
        color: var(--color-accent);
    }
    .nav-link.active-section::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// ================================
// Performance: Debounce Scroll Events
// ================================

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

// Apply debounce to scroll-heavy functions
const debouncedHighlight = debounce(highlightNavigation, 100);
window.removeEventListener('scroll', highlightNavigation);
window.addEventListener('scroll', debouncedHighlight);

// ================================
// Accessibility: Keyboard Navigation
// ================================

document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ================================
// Loading Animation Complete
// ================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add loaded class style
    const loadedStyle = document.createElement('style');
    loadedStyle.textContent = `
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(loadedStyle);
});

// ================================
// Email Protection (Simple Obfuscation)
// ================================

const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Track email clicks if analytics are added later
        console.log('Email link clicked:', link.href);
    });
});

// ================================
// Console Easter Egg
// ================================

console.log('%c👋 Hello, Developer!', 'font-size: 20px; font-weight: bold; color: #DC2626;');
console.log('%cInterested in how this was built?', 'font-size: 14px; color: #525252;');
console.log('%cReach out: mansouryasser002@gmail.com', 'font-size: 14px; color: #DC2626;');

// ================================
// Initialize
// ================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio initialized successfully');
    
    // Add any additional initialization here
    
    // Ensure all animations are ready
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
