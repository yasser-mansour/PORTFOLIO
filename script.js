// ===========================
// TRANSLATIONS DATA
// ===========================
const translations = {
    en: {
        nav: {
            work: "Work",
            contact: "Contact"
        },
        intro: {
            eyebrow: "Full-Stack Web Developer",
            headline: "I build production systems that schools and businesses use daily.",
            proof: "I've shipped real-world systems used daily — including SMS infrastructure serving schools across Morocco and field data collection tools that replaced paper workflows...",
            approach: "My approach: identify concrete problems, build reliable solutions, and refine them based on real usage. Reliability always comes first.",
            meta: {
                location: {
                    label: "Based in",
                    value: "El Jadida, Morocco"
                },
                stack: {
                    label: "Primary Stack",
                    value: "Django · Python · PostgreSQL · JavaScript · AWS S3"
                },
                focus: {
                    label: "Current Focus",
                    value: "Multi-tenant SaaS"
                }
            }
        },
        work: {
            title: "Systems in Production",
            subtitle: "Projects that are actively used",
            status: {
                active: "Active",
                paused: "Paused"
            },
            projects: {
                suivedu: {
                    description: "School attendance and parent notification platform used by schools across Morocco. Built the SMS infrastructure that handles thousands of daily notifications—automated alerts for absences, schedule changes, administrative announcements.",
                    metric: "Daily SMS"
                },
                lterrazi: {
                    description: "Internal platform for a technical high school. Includes messaging, announcements, temporary discussion rooms, and a point system for student engagement. Built for daily internal communication."
                },
                alldoc: {
                    description: "Digital forms for field technicians. Replaces paper-based reporting with mobile data collection."
                },
                lexaforms: {
                    description: "Legal document generation through structured forms (using AI). Input simple answers, output properly formatted contracts and agreements."
                },
                manostock: {
                    description: "Inventory and billing system for small businesses. Tracks stock, sales, expenses, and generates invoices."
                },
                manyo: {
                    description: "Social platform experiment combining video content, stories, and marketplace features. Built to understand complex multi-module architecture."
                }
            },
            tech: {
                sms: "SMS Infrastructure",
                multitenant: "Multi-tenant",
                messaging: "Real-time Messaging",
                rbac: "Role-based Access",
                mobile: "Mobile-First"
            },
            category: {
                education: "Education Technology",
                internal: "Internal Systems",
                business: "Business Tools"
            },
            other: "Other Work",
            cta: {
                text: "Working on a system that needs to run 24/7?",
                link: "Let's discuss your project"
            }
        },
        contact: {
            eyebrow: "Let's Work Together",
            headline: "Building something that needs to work reliably?",
            description: "I'm currently available for full-stack web development, system design, and production-ready projects. If you're building something that needs to work reliably in the real world, let's talk.",
            fit: {
                title: "Best fit for:",
                item1: "Production web applications",
                item2: "Internal and customer-facing platforms",
                item3: "Notification-driven systems (SMS, email)",
                item4: "Django-based full-stack projects"
            },
            primary: {
                label: "Primary Contact"
            },
            work: {
                label: "Work Email"
            },
            phone: {
                label: "Phone"
            },
            note: "Typically respond within 12 hours"
        },
        footer: {
            copyright: "© 2026 Yasser Mansour"
        }
    },
    fr: {
        nav: {
            work: "Travaux",
            contact: "Contact"
        },
        intro: {
            eyebrow: "Développeur Web Full-Stack",
            headline: "Je crée des systèmes de production utilisés quotidiennement par les écoles et les entreprises.",
            proof: "J'ai développé des systèmes réels utilisés quotidiennement — notamment une infrastructure SMS desservant les écoles à travers le Maroc et des outils de collecte de données sur le terrain qui ont remplacé les flux de travail papier...",
            approach: "Mon approche : identifier des problèmes concrets, créer des solutions fiables et les affiner en fonction de l'utilisation réelle. La fiabilité passe toujours en premier.",
            meta: {
                location: {
                    label: "Basé à",
                    value: "El Jadida, Maroc"
                },
                stack: {
                    label: "Stack Principal",
                    value: "Django · Python · PostgreSQL · JavaScript · AWS S3"
                },
                focus: {
                    label: "Focus Actuel",
                    value: "SaaS Multi-tenant"
                }
            }
        },
        work: {
            title: "Systèmes en Production",
            subtitle: "Projets activement utilisés",
            status: {
                active: "Actif",
                paused: "En Pause"
            },
            projects: {
                suivedu: {
                    description: "Plateforme de présence scolaire et de notification aux parents utilisée par les écoles à travers le Maroc. J'ai développé l'infrastructure SMS qui gère des milliers de notifications quotidiennes—alertes automatiques pour les absences, changements d'horaire, annonces administratives.",
                    metric: "SMS Quotidiens"
                },
                lterrazi: {
                    description: "Plateforme interne pour un lycée technique. Comprend la messagerie, les annonces, les salles de discussion temporaires et un système de points pour l'engagement des étudiants. Conçu pour la communication interne quotidienne."
                },
                alldoc: {
                    description: "Formulaires numériques pour les techniciens de terrain. Remplace les rapports papier par la collecte de données mobile."
                },
                lexaforms: {
                    description: "Génération de documents juridiques via des formulaires structurés (utilisant l'IA). Saisissez des réponses simples, obtenez des contrats et accords correctement formatés."
                },
                manostock: {
                    description: "Système d'inventaire et de facturation pour petites entreprises. Suit le stock, les ventes, les dépenses et génère des factures."
                },
                manyo: {
                    description: "Expérience de plateforme sociale combinant contenu vidéo, stories et fonctionnalités de marketplace. Développée pour comprendre l'architecture multi-modules complexe."
                }
            },
            tech: {
                sms: "Infrastructure SMS",
                multitenant: "Multi-tenant",
                messaging: "Messagerie en Temps Réel",
                rbac: "Accès Basé sur les Rôles",
                mobile: "Mobile-First"
            },
            category: {
                education: "Technologie Éducative",
                internal: "Systèmes Internes",
                business: "Outils Professionnels"
            },
            other: "Autres Travaux",
            cta: {
                text: "Vous travaillez sur un système qui doit fonctionner 24/7 ?",
                link: "Discutons de votre projet"
            }
        },
        contact: {
            eyebrow: "Travaillons Ensemble",
            headline: "Vous construisez quelque chose qui doit fonctionner de manière fiable ?",
            description: "Je suis actuellement disponible pour le développement web full-stack, la conception de systèmes et les projets prêts pour la production. Si vous construisez quelque chose qui doit fonctionner de manière fiable dans le monde réel, parlons-en.",
            fit: {
                title: "Idéal pour :",
                item1: "Applications web de production",
                item2: "Plateformes internes et orientées client",
                item3: "Systèmes basés sur les notifications (SMS, email)",
                item4: "Projets full-stack basés sur Django"
            },
            primary: {
                label: "Contact Principal"
            },
            work: {
                label: "Email Professionnel"
            },
            phone: {
                label: "Téléphone"
            },
            note: "Réponse typique sous 12 heures"
        },
        footer: {
            copyright: "© 2026 Yasser Mansour"
        }
    },
    ar: {
        nav: {
            work: "الأعمال",
            contact: "تواصل"
        },
        intro: {
            eyebrow: "مطور ويب متكامل",
            headline: "أقوم ببناء أنظمة إنتاج تستخدمها المدارس والشركات يومياً.",
            proof: "قمت بتطوير أنظمة واقعية تُستخدم يومياً — بما في ذلك بنية تحتية للرسائل القصيرة تخدم المدارس في جميع أنحاء المغرب وأدوات جمع البيانات الميدانية التي حلت محل سير العمل الورقي...",
            approach: "منهجيتي: تحديد المشاكل الملموسة، بناء حلول موثوقة، وتحسينها بناءً على الاستخدام الفعلي. الموثوقية تأتي دائماً أولاً.",
            meta: {
                location: {
                    label: "مقيم في",
                    value: "الجديدة، المغرب"
                },
                stack: {
                    label: "التقنيات الأساسية",
                    value: "Django · Python · PostgreSQL · JavaScript · AWS S3"
                },
                focus: {
                    label: "التركيز الحالي",
                    value: "SaaS متعدد المستأجرين"
                }
            }
        },
        work: {
            title: "أنظمة قيد الإنتاج",
            subtitle: "مشاريع يتم استخدامها بنشاط",
            status: {
                active: "نشط",
                paused: "متوقف مؤقتاً"
            },
            projects: {
                suivedu: {
                    description: "منصة حضور مدرسي وإشعارات لأولياء الأمور تستخدمها المدارس في جميع أنحاء المغرب. قمت ببناء البنية التحتية للرسائل القصيرة التي تتعامل مع آلاف الإشعارات اليومية—تنبيهات تلقائية للغياب، تغييرات الجدول الزمني، الإعلانات الإدارية.",
                    metric: "رسائل قصيرة يومية"
                },
                lterrazi: {
                    description: "منصة داخلية لمدرسة ثانوية تقنية. تشمل المراسلة، الإعلانات، غرف النقاش المؤقتة، ونظام نقاط لمشاركة الطلاب. بُنيت للتواصل الداخلي اليومي."
                },
                alldoc: {
                    description: "نماذج رقمية للفنيين الميدانيين. تحل محل التقارير الورقية بجمع البيانات عبر الهاتف المحمول."
                },
                lexaforms: {
                    description: "توليد المستندات القانونية من خلال نماذج منظمة (باستخدام الذكاء الاصطناعي). أدخل إجابات بسيطة، احصل على عقود واتفاقيات منسقة بشكل صحيح."
                },
                manostock: {
                    description: "نظام جرد وفوترة للشركات الصغيرة. يتتبع المخزون، المبيعات، المصروفات، ويولد الفواتير."
                },
                manyo: {
                    description: "تجربة منصة اجتماعية تجمع محتوى الفيديو، القصص، وميزات السوق. بُنيت لفهم البنية المعمارية المعقدة متعددة الوحدات."
                }
            },
            tech: {
                sms: "بنية تحتية للرسائل القصيرة",
                multitenant: "متعدد المستأجرين",
                messaging: "مراسلة فورية",
                rbac: "وصول قائم على الأدوار",
                mobile: "محمول أولاً"
            },
            category: {
                education: "تكنولوجيا التعليم",
                internal: "أنظمة داخلية",
                business: "أدوات الأعمال"
            },
            other: "أعمال أخرى",
            cta: {
                text: "تعمل على نظام يحتاج للعمل على مدار الساعة؟",
                link: "لنناقش مشروعك"
            }
        },
        contact: {
            eyebrow: "لنعمل معاً",
            headline: "تبني شيئاً يحتاج للعمل بشكل موثوق؟",
            description: "أنا متاح حالياً لتطوير الويب المتكامل، تصميم الأنظمة، والمشاريع الجاهزة للإنتاج. إذا كنت تبني شيئاً يحتاج للعمل بشكل موثوق في العالم الحقيقي، فلنتحدث.",
            fit: {
                title: "الأنسب لـ:",
                item1: "تطبيقات ويب إنتاجية",
                item2: "منصات داخلية وموجهة للعملاء",
                item3: "أنظمة قائمة على الإشعارات (SMS، البريد الإلكتروني)",
                item4: "مشاريع متكاملة قائمة على Django"
            },
            primary: {
                label: "جهة الاتصال الرئيسية"
            },
            work: {
                label: "البريد الإلكتروني للعمل"
            },
            phone: {
                label: "الهاتف"
            },
            note: "عادة أرد خلال 12 ساعة"
        },
        footer: {
            copyright: "© 2026 ياسر منصور"
        }
    }
};

// ===========================
// PORTFOLIO CLASS
// ===========================
class Portfolio {
    constructor() {
        this.nav = document.getElementById('nav');
        this.navToggle = document.getElementById('navToggle');
        this.navControls = document.querySelector('.nav-controls');
        this.navLinkElements = document.querySelectorAll('.nav-link');
        this.currentLang = 'en';
        
        this.init();
    }
    
    init() {
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupNavBackground();
        this.setupLanguageSwitcher();
        this.setupThemeToggle();
    }
    
    // ===========================
    // MOBILE MENU
    // ===========================
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
            if (!this.nav.contains(e.target) && this.navControls.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    }
    
    toggleMobileMenu() {
        this.navToggle.classList.toggle('active');
        this.navControls.classList.toggle('active');
        document.body.style.overflow = this.navControls.classList.contains('active') ? 'hidden' : '';
    }
    
    closeMobileMenu() {
        this.navToggle.classList.remove('active');
        this.navControls.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // ===========================
    // SMOOTH SCROLL
    // ===========================
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
    
    // ===========================
    // NAV BACKGROUND
    // ===========================
    setupNavBackground() {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 50) {
                this.nav.style.backgroundColor = 'var(--nav-bg-scrolled)';
                this.nav.style.backdropFilter = 'blur(10px)';
            } else {
                this.nav.style.backgroundColor = 'var(--nav-bg)';
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, { passive: true });
    }
    
    // ===========================
    // LANGUAGE SWITCHER
    // ===========================
    setupLanguageSwitcher() {
        // Load saved language preference or default to English
        const savedLang = localStorage.getItem('preferredLanguage') || 'en';
        this.setLanguage(savedLang);
        
        // Add click handlers to language buttons
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                this.setLanguage(lang);
            });
        });
    }
    
    setLanguage(lang) {
        // Validate language
        if (!translations[lang]) {
            console.warn(`Language ${lang} not found, defaulting to English`);
            lang = 'en';
        }
        
        this.currentLang = lang;
        
        // Update HTML attributes
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // Update active button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        
        // Update all translatable elements
        this.updateTranslations(lang);
        
        // Save preference
        localStorage.setItem('preferredLanguage', lang);
    }
    
    updateTranslations(lang) {
        const data = translations[lang];
        
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.dataset.i18n;
            const translation = this.getNestedTranslation(data, key);
            
            if (translation) {
                element.textContent = translation;
            }
        });
    }
    
    getNestedTranslation(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }
    
    // ===========================
    // THEME TOGGLE
    // ===========================
    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        
        // Check for saved theme preference or default to system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        
        this.setTheme(initialTheme);
        
        // Add click handler
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.dataset.theme || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            this.setTheme(newTheme);
        });
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    setTheme(theme) {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem('theme', theme);
    }
}

// ===========================
// INITIALIZE
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});
