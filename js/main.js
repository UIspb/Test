// Main JavaScript for ArtPrints website
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Theme Management
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.querySelector('.theme-icon');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Animate theme toggle
        gsap.to(themeIcon, {
            rotation: 360,
            duration: 0.6,
            ease: "back.out(1.7)"
        });
    });
    
    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
    
    // Scroll Progress Indicator
    const scrollProgressWrapper = document.querySelector('.scroll-progress-wrapper');
    const progressRing = document.querySelector('.progress-ring');
    const scrollPercentage = document.querySelector('.scroll-percentage');
    const circumference = 2 * Math.PI * 25; // radius = 25
    
    progressRing.style.strokeDasharray = circumference;
    progressRing.style.strokeDashoffset = circumference;
    
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        const offset = circumference - (scrollPercent / 100) * circumference;
        progressRing.style.strokeDashoffset = offset;
        scrollPercentage.textContent = Math.round(scrollPercent) + '%';
        
        // Show/hide scroll progress indicator
        if (scrollTop > 300) {
            scrollProgressWrapper.classList.add('visible');
        } else {
            scrollProgressWrapper.classList.remove('visible');
        }
    }
    
    // Scroll to top when clicking progress indicator
    scrollProgressWrapper.addEventListener('click', function() {
        gsap.to(window, {
            duration: 1.5,
            scrollTo: 0,
            ease: "power2.inOut"
        });
    });
    
    window.addEventListener('scroll', updateScrollProgress);
    
    // Loading Screen
    const loader = document.querySelector('.loader');
    const loaderLine = document.querySelector('.loader-line');
    
    // Animate loader
    gsap.to(loaderLine, {
        width: '100%',
        duration: 2,
        ease: 'power2.inOut',
        onComplete: function() {
            gsap.to(loader, {
                opacity: 0,
                duration: 0.8,
                ease: 'power2.inOut',
                onComplete: function() {
                    loader.style.display = 'none';
                    initAnimations();
                }
            });
        }
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: targetElement,
                    ease: "power2.inOut"
                });
            }
        });
    });
    
    // Gallery data
    const galleryData = [
        {
            id: 1,
            title: 'Абстрактная композиция #1',
            price: '2 500 ₽',
            category: 'abstract',
            image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        {
            id: 2,
            title: 'Минимализм в цвете',
            price: '1 800 ₽',
            category: 'minimal',
            image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        {
            id: 3,
            title: 'Геометрические формы',
            price: '3 200 ₽',
            category: 'geometric',
            image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        {
            id: 4,
            title: 'Современная абстракция',
            price: '2 800 ₽',
            category: 'abstract',
            image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        {
            id: 5,
            title: 'Минималистский пейзаж',
            price: '2 200 ₽',
            category: 'minimal',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        {
            id: 6,
            title: 'Геометрический узор',
            price: '1 900 ₽',
            category: 'geometric',
            image: 'https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        {
            id: 7,
            title: 'Цветовая гармония',
            price: '2 600 ₽',
            category: 'abstract',
            image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        {
            id: 8,
            title: 'Простота форм',
            price: '1 700 ₽',
            category: 'minimal',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        },
        {
            id: 9,
            title: 'Архитектурная геометрия',
            price: '3 500 ₽',
            category: 'geometric',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
        }
    ];
    
    // Populate gallery
    function populateGallery(items = galleryData) {
        const galleryGrid = document.querySelector('.gallery-grid');
        galleryGrid.innerHTML = '';
        
        items.forEach((item, index) => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.dataset.category = item.category;
            
            galleryItem.innerHTML = `
                <div class="featured-item">
                    <div class="featured-image image-reveal">
                        <img src="${item.image}" alt="${item.title}">
                        <div class="featured-overlay">
                            <button class="btn-view" data-id="${item.id}">Подробнее</button>
                        </div>
                    </div>
                    <div class="featured-info">
                        <h3 class="featured-title">${item.title}</h3>
                        <p class="featured-price">${item.price}</p>
                    </div>
                </div>
            `;
            
            galleryGrid.appendChild(galleryItem);
            
            // Animate item appearance with delay
            gsap.fromTo(galleryItem, 
                { 
                    opacity: 0, 
                    y: 30 
                },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "power2.out"
                }
            );
        });
        
        // Add click event to view buttons
        document.querySelectorAll('.btn-view').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = this.dataset.id;
                showItemModal(itemId);
            });
        });
    }
    
    // Gallery filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            filterGallery(filter);
        });
    });
    
    function filterGallery(filter) {
        const items = filter === 'all' ? galleryData : galleryData.filter(item => item.category === filter);
        
        // Animate out current items
        gsap.to('.gallery-item', {
            opacity: 0,
            y: 20,
            duration: 0.3,
            stagger: 0.05,
            onComplete: function() {
                populateGallery(items);
            }
        });
    }
    
    // Show item modal (placeholder)
    function showItemModal(itemId) {
        const item = galleryData.find(i => i.id == itemId);
        if (item) {
            alert(`Показать детали для: ${item.title}\nЦена: ${item.price}`);
            // Here you would implement a proper modal
        }
    }
    
    // Cart functionality
    let cartCount = 0;
    const cartBtn = document.querySelector('.cart-btn');
    const cartCountElement = document.querySelector('.cart-count');
    
    function updateCart(count) {
        cartCount += count;
        cartCountElement.textContent = cartCount;
        
        // Animate cart button
        gsap.to(cartBtn, {
            scale: 1.1,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });
    }
    
    // Initialize animations after loading
    function initAnimations() {
        // Hero badge animation
        gsap.fromTo('.hero-badge', 
            { 
                y: 20,
                opacity: 0
            },
            { 
                y: 0,
                opacity: 1,
                duration: 0.6,
                delay: 0.2,
                ease: "power2.out"
            }
        );

        // Hero title animation
        const titleLines = document.querySelectorAll('.title-line');
        gsap.fromTo(titleLines, 
            { 
                y: 100,
                opacity: 0
            },
            { 
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                delay: 0.4,
                ease: "power2.out"
            }
        );
        
        // Hero description animation
        gsap.fromTo('.hero-description', 
            { 
                y: 30,
                opacity: 0
            },
            { 
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: 0.8,
                ease: "power2.out"
            }
        );
        
        // Hero stats animation
        gsap.fromTo('.hero-stats', 
            { 
                y: 30,
                opacity: 0
            },
            { 
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: 1.0,
                ease: "power2.out"
            }
        );
        
        // Hero buttons animation
        gsap.fromTo('.hero-buttons .btn', 
            { 
                y: 30,
                opacity: 0
            },
            { 
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: 1.2,
                stagger: 0.2,
                ease: "power2.out"
            }
        );
        
        // Hero image animation
        gsap.fromTo('.hero-image-container', 
            { 
                scale: 0.8,
                opacity: 0
            },
            { 
                scale: 1,
                opacity: 1,
                duration: 1,
                delay: 0.6,
                ease: "power2.out"
            }
        );

        // Floating cards animation
        gsap.fromTo('.floating-card', 
            { 
                scale: 0,
                opacity: 0
            },
            { 
                scale: 1,
                opacity: 1,
                duration: 0.6,
                delay: 1.4,
                stagger: 0.2,
                ease: "back.out(1.7)"
            }
        );

        // Hero decorations animation
        gsap.fromTo('.hero-decoration', 
            { 
                scale: 0,
                opacity: 0
            },
            { 
                scale: 1,
                opacity: 0.1,
                duration: 1,
                delay: 0.8,
                stagger: 0.3,
                ease: "power2.out"
            }
        );
        
        // Scroll animations for sections
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.fromTo(title, 
                { 
                    y: 50,
                    opacity: 0
                },
                { 
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: title,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
        
        // Featured items animation
        gsap.utils.toArray('.featured-item').forEach((item, index) => {
            gsap.fromTo(item, 
                { 
                    y: 50,
                    opacity: 0
                },
                { 
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
        
        // Parallax effect for hero image
        gsap.to('.hero-img', {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
                trigger: '.hero',
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
        
        // Populate gallery
        populateGallery();
    }
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    document.querySelectorAll('.fade-in-on-scroll, .slide-in-left-on-scroll, .slide-in-right-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    // Cursor follower (for desktop)
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.className = 'cursor-follower';
        document.body.appendChild(cursor);
        
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // Hover effects
        document.querySelectorAll('a, button, .featured-item').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }
    
    // Magnetic effect for buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(this, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        btn.addEventListener('mouseleave', function() {
            gsap.to(this, {
                x: 0,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Image reveal animations
    gsap.utils.toArray('.image-reveal').forEach(container => {
        gsap.fromTo(container.querySelector('img'), 
            { scale: 1.2 },
            { 
                scale: 1,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: container,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
        
        gsap.fromTo(container, 
            { 
                clipPath: "inset(0 100% 0 0)"
            },
            { 
                clipPath: "inset(0 0% 0 0)",
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: container,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    // Scroll indicator animation
    gsap.to('.scroll-line', {
        scaleY: 0,
        transformOrigin: "top",
        ease: "none",
        scrollTrigger: {
            trigger: '.hero',
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
    
    // Footer animation
    gsap.fromTo('.footer-content > *', 
        { 
            y: 30,
            opacity: 0
        },
        { 
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.footer',
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        }
    );
});

// Utility functions
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

// Resize handler
window.addEventListener('resize', debounce(function() {
    // Refresh ScrollTrigger on resize
    ScrollTrigger.refresh();
}, 250));