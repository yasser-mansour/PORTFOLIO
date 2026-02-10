class Portfolio {
    constructor() {
        this.nav = document.getElementById('nav');
        this.navToggle = document.getElementById('navToggle');
        this.navLinks = document.querySelector('.nav-links');
        this.navLinkElements = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupNavBackground();
    }
    
    setupMobileMenu() {
        this.navToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        
        this.navLinkElements.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
        
        document.addEventListener('click', (e) => {
            if (!this.nav.contains(e.target) && this.navLinks.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    }
    
    toggleMobileMenu() {
        this.navToggle.classList.toggle('active');
        this.navLinks.classList.toggle('active');
        document.body.style.overflow = this.navLinks.classList.contains('active') ? 'hidden' : '';
    }
    
    closeMobileMenu() {
        this.navToggle.classList.remove('active');
        this.navLinks.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    this.scrollToElement(targetElement);
                }
            });
        });
    }
    
    scrollToElement(element) {
        const headerHeight = this.nav.offsetHeight;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight - 20;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
    
    setupNavBackground() {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 50) {
                this.nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                this.nav.style.backdropFilter = 'blur(10px)';
            } else {
                this.nav.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, { passive: true });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});
