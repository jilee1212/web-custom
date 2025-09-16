// Main JavaScript File - IT Company Website

// DOM Elements
const elements = {
    header: document.getElementById('header'),
    navToggle: document.getElementById('nav-toggle'),
    navMenu: document.getElementById('nav-menu'),
    navLinks: document.querySelectorAll('.nav__link'),
    scrollTop: document.getElementById('scroll-top'),
    contactForm: document.getElementById('contact-form'),
    filterBtns: document.querySelectorAll('.filter__btn'),
    portfolioItems: document.querySelectorAll('.portfolio__item'),
    statNumbers: document.querySelectorAll('.stat__number')
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollEffects();
    initPortfolioFilter();
    initContactForm();
    initCountAnimation();
    initSmoothScroll();
    initFloatingAnimation();
});

// Navigation functionality
function initNavigation() {
    // Mobile menu toggle
    if (elements.navToggle && elements.navMenu) {
        elements.navToggle.addEventListener('click', function() {
            elements.navMenu.classList.toggle('show');

            // Toggle hamburger icon
            const icon = elements.navToggle.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking on links
    elements.navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (elements.navMenu.classList.contains('show')) {
                elements.navMenu.classList.remove('show');
                const icon = elements.navToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav') && elements.navMenu.classList.contains('show')) {
            elements.navMenu.classList.remove('show');
            const icon = elements.navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Active link highlighting
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                elements.navLinks.forEach(link => link.classList.remove('active-link'));
                if (navLink) {
                    navLink.classList.add('active-link');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
}

// Scroll effects
function initScrollEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY > 50;

        // Header background on scroll
        if (elements.header) {
            elements.header.classList.toggle('scrolled', scrolled);
        }

        // Show/hide scroll to top button
        if (elements.scrollTop) {
            elements.scrollTop.classList.toggle('show', window.scrollY > 500);
        }
    });

    // Scroll to top functionality
    if (elements.scrollTop) {
        elements.scrollTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Portfolio filter functionality
function initPortfolioFilter() {
    if (elements.filterBtns.length === 0 || elements.portfolioItems.length === 0) return;

    elements.filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            // Update active button
            elements.filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter portfolio items
            elements.portfolioItems.forEach(item => {
                const categories = item.getAttribute('data-category');

                if (filter === 'all' || categories.includes(filter)) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease-in';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Contact form handling
function initContactForm() {
    if (!elements.contactForm) return;

    elements.contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Basic validation
        if (!validateForm(data)) {
            return;
        }

        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '전송 중...';
        submitBtn.disabled = true;
        submitBtn.classList.add('btn--loading');

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            showAlert('success', '문의가 성공적으로 전송되었습니다!');
            this.reset();

            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('btn--loading');
        }, 2000);
    });

    function validateForm(data) {
        const requiredFields = ['name', 'email', 'message'];

        for (let field of requiredFields) {
            if (!data[field] || data[field].trim() === '') {
                showAlert('error', `${getFieldLabel(field)}을(를) 입력해주세요.`);
                return false;
            }
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showAlert('error', '올바른 이메일 주소를 입력해주세요.');
            return false;
        }

        return true;
    }

    function getFieldLabel(field) {
        const labels = {
            name: '이름',
            email: '이메일',
            message: '문의 내용'
        };
        return labels[field] || field;
    }
}

// Alert/notification system
function showAlert(type, message) {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());

    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert--${type} slide-up`;

    const icon = type === 'success' ? 'fa-check-circle' :
                 type === 'error' ? 'fa-exclamation-circle' :
                 'fa-info-circle';

    alert.innerHTML = `
        <div class="alert__icon">
            <i class="fas ${icon}"></i>
        </div>
        <div class="alert__content">
            <div class="alert__description">${message}</div>
        </div>
    `;

    // Insert at top of main content
    const main = document.querySelector('.main');
    main.insertBefore(alert, main.firstChild);

    // Auto remove after 5 seconds
    setTimeout(() => {
        alert.style.opacity = '0';
        alert.style.transform = 'translateY(-20px)';
        setTimeout(() => alert.remove(), 300);
    }, 5000);

    // Click to dismiss
    alert.addEventListener('click', () => {
        alert.style.opacity = '0';
        alert.style.transform = 'translateY(-20px)';
        setTimeout(() => alert.remove(), 300);
    });
}

// Counter animation for statistics
function initCountAnimation() {
    if (elements.statNumbers.length === 0) return;

    const animateCount = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start);

            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    };

    // Intersection Observer for triggering animation when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCount(entry.target, target);
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.5 });

    elements.statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = elements.header ? elements.header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced floating animation for hero elements
function initFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.floating-element');

    floatingElements.forEach((element, index) => {
        // Add random slight variations to the animation
        const randomDelay = Math.random() * 2;
        const randomDuration = 3 + Math.random() * 2;

        element.style.animationDelay = `${randomDelay}s`;
        element.style.animationDuration = `${randomDuration}s`;

        // Add hover effect
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.1)';
            this.style.boxShadow = '0 10px 25px rgba(37, 99, 235, 0.3)';
        });

        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
}

// Utility functions
const utils = {
    // Debounce function for performance optimization
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Animation on scroll for elements
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.service__card, .portfolio__item, .contact__card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initScrollAnimations, 100);
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape' && elements.navMenu.classList.contains('show')) {
        elements.navMenu.classList.remove('show');
        const icon = elements.navToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Performance optimization for scroll events
window.addEventListener('scroll', utils.throttle(function() {
    // All scroll-based functionality is handled here
}, 16));

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // Could implement error reporting here
});

// Service worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment when service worker is implemented
        // navigator.serviceWorker.register('/sw.js');
    });
}