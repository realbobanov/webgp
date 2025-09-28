// Main JavaScript for GP GPIB Cahaya Anugerah Website with Verse of the Day

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initSmoothScrolling();
    initContactForm();
    initScrollEffects();
    initMobileMenu();
    initToggleContent();
    initVerseOfTheDay();
    initShareButtons();
    initAnimations();
});

// Bible verses data
const bibleVerses = [
    {
        indonesian: "Karena begitu besar kasih Allah akan dunia ini, sehingga Ia telah mengaruniakan Anak-Nya yang tunggal, supaya setiap orang yang percaya kepada-Nya tidak binasa, melainkan beroleh hidup yang kekal.",
        english: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
        reference: "Yohanes 3:16",
        reference_en: "John 3:16"
    },
    {
        indonesian: "Segala perkara dapat kutanggung di dalam Dia yang memberi kekuatan kepadaku.",
        english: "I can do all this through him who gives me strength.",
        reference: "Filipi 4:13",
        reference_en: "Philippians 4:13"
    },
    {
        indonesian: "Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu, demikianlah firman TUHAN, yaitu rancangan damai sejahtera dan bukan rancangan kecelakaan, untuk memberikan kepadamu hari depan yang penuh harapan.",
        english: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, to give you hope and a future.",
        reference: "Yeremia 29:11",
        reference_en: "Jeremiah 29:11"
    },
    {
        indonesian: "Jangan takut, sebab Aku menyertai engkau, janganlah bimbang, sebab Aku ini Allahmu; Aku akan meneguhkan, bahkan akan menolong engkau; Aku akan memegang engkau dengan tangan kanan-Ku yang membawa kemenangan.",
        english: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
        reference: "Yesaya 41:10",
        reference_en: "Isaiah 41:10"
    },
    {
        indonesian: "TUHAN adalah gembalaku, takkan kekurangan aku.",
        english: "The Lord is my shepherd, I lack nothing.",
        reference: "Mazmur 23:1",
        reference_en: "Psalm 23:1"
    }
];

// Verse of the Day functionality
function initVerseOfTheDay() {
    const currentDate = new Date();
    const dateElement = document.getElementById('current-date');
    const verseIndonesian = document.getElementById('verse-indonesian');
    const verseEnglish = document.getElementById('verse-english');
    const verseReference = document.getElementById('verse-reference');
    
    // Format date in Indonesian
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const formattedDate = currentDate.toLocaleDateString('id-ID', options);
    
    if (dateElement) {
        dateElement.textContent = formattedDate;
    }
    
    // Get verse based on day of year for consistent daily rotation
    const dayOfYear = getDayOfYear(currentDate);
    const verseIndex = dayOfYear % bibleVerses.length;
    const todaysVerse = bibleVerses[verseIndex];
    
    // Display verse with animation
    if (verseIndonesian && verseEnglish && verseReference) {
        // Animate verse appearance
        setTimeout(() => {
            verseIndonesian.textContent = todaysVerse.indonesian;
            verseIndonesian.style.opacity = '1';
        }, 300);
        
        setTimeout(() => {
            verseEnglish.textContent = todaysVerse.english;
            verseEnglish.style.opacity = '1';
        }, 600);
        
        setTimeout(() => {
            verseReference.textContent = todaysVerse.reference;
            verseReference.style.opacity = '1';
        }, 900);
    }
    
    // Initialize read chapter button
    const readChapterBtn = document.getElementById('read-chapter-btn');
    if (readChapterBtn) {
        readChapterBtn.addEventListener('click', function() {
            const bibleGatewayUrl = `https://www.biblegateway.com/passage/?search=${encodeURIComponent(todaysVerse.reference_en)}&version=NIV`;
            window.open(bibleGatewayUrl, '_blank');
        });
    }
}

function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

// Share functionality for verses
function initShareButtons() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const shareType = this.getAttribute('data-share');
            const verseText = document.getElementById('verse-indonesian').textContent;
            const verseRef = document.getElementById('verse-reference').textContent;
            const shareText = `"${verseText}" - ${verseRef}\n\nFirman Hari Ini dari GP GPIB Cahaya Anugerah Surabaya`;
            const shareUrl = window.location.href;
            
            if (shareType === 'facebook') {
                const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
                window.open(facebookUrl, '_blank', 'width=600,height=400');
            } else if (shareType === 'whatsapp') {
                const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`;
                window.open(whatsappUrl, '_blank');
            }
            
            // Show success message
            showNotification('Tautan berbagi telah dibuka. Terima kasih telah membagikan Firman Tuhan!', 'success');
        });
    });
}

// Toggle content functionality for "Read More" buttons
function initToggleContent() {
    const toggleButtons = document.querySelectorAll('.toggle-content');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            
            if (targetContent) {
                const isHidden = targetContent.classList.contains('hidden');
                
                if (isHidden) {
                    // Show content with animation
                    targetContent.classList.remove('hidden');
                    targetContent.style.display = 'block';
                    targetContent.style.opacity = '0';
                    targetContent.style.maxHeight = '0';
                    targetContent.style.overflow = 'hidden';
                    targetContent.style.transition = 'all 0.4s ease-out';
                    
                    // Animate in
                    requestAnimationFrame(() => {
                        targetContent.style.opacity = '1';
                        targetContent.style.maxHeight = '1000px';
                    });
                    
                    this.innerHTML = '<i class="fas fa-chevron-up"></i> Sembunyikan';
                    this.classList.add('btn--secondary');
                    this.classList.remove('btn--primary');
                } else {
                    // Hide content with animation
                    targetContent.style.opacity = '0';
                    targetContent.style.maxHeight = '0';
                    
                    setTimeout(() => {
                        targetContent.classList.add('hidden');
                        targetContent.style.display = 'none';
                        targetContent.style.maxHeight = '';
                        targetContent.style.overflow = '';
                    }, 400);
                    
                    this.innerHTML = '<i class="fas fa-book-open"></i> Baca Selengkapnya';
                    this.classList.remove('btn--secondary');
                    this.classList.add('btn--primary');
                }
            }
        });
    });
}

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('section[id]');

    // Set active navigation link based on scroll position
    function setActiveNavLink() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Update active link on scroll with throttling
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                setActiveNavLink();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Update active link on page load
    setActiveNavLink();
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navMenu = document.querySelector('.nav__menu');
                const navToggle = document.querySelector('.nav__toggle');
                if (navMenu && navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                    const icon = navToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            }
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            
            // Update toggle icon with animation
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('show')) {
                icon.style.transform = 'rotate(180deg)';
                setTimeout(() => {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                    icon.style.transform = 'rotate(0deg)';
                }, 150);
            } else {
                icon.style.transform = 'rotate(180deg)';
                setTimeout(() => {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    icon.style.transform = 'rotate(0deg)';
                }, 150);
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('show');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        });
        
        // Close menu when window is resized to desktop size
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navMenu.classList.remove('show');
                const icon = navToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        });
    }
}

// Contact form enhancement
function initContactForm() {
    const contactForm = document.querySelector('form[name="contact"]');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalContent = submitButton.innerHTML;
            
            // Add loading state
            submitButton.classList.add('loading');
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
            submitButton.disabled = true;
            
            // Form validation
            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;
            let firstErrorField = null;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('error');
                    if (!firstErrorField) firstErrorField = field;
                    isValid = false;
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value)) {
                    emailField.classList.add('error');
                    if (!firstErrorField) firstErrorField = emailField;
                    isValid = false;
                } else {
                    emailField.classList.remove('error');
                }
            }
            
            if (!isValid) {
                e.preventDefault();
                submitButton.classList.remove('loading');
                submitButton.innerHTML = originalContent;
                submitButton.disabled = false;
                
                // Focus on first error field
                if (firstErrorField) {
                    firstErrorField.focus();
                    firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                
                // Show error message
                showNotification('Mohon lengkapi semua field yang diperlukan dengan benar', 'error');
                return;
            }
            
            // If form is valid, let it submit naturally to Netlify
            // Show success message after delay
            setTimeout(() => {
                if (!e.defaultPrevented) {
                    showNotification('Pesan berhasil dikirim! Kami akan segera menghubungi Anda. Tuhan memberkati!', 'success');
                    contactForm.reset();
                    submitButton.classList.remove('loading');
                    submitButton.innerHTML = originalContent;
                    submitButton.disabled = false;
                }
            }, 1000);
        });
        
        // Real-time validation feedback
        const formFields = contactForm.querySelectorAll('.form-control');
        formFields.forEach(field => {
            field.addEventListener('input', function() {
                if (this.hasAttribute('required') && this.value.trim()) {
                    this.classList.remove('error');
                }
                
                // Email field real-time validation
                if (this.type === 'email' && this.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (emailRegex.test(this.value)) {
                        this.classList.remove('error');
                    }
                }
            });
            
            field.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.classList.add('error');
                }
                
                if (this.type === 'email' && this.value && !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value))) {
                    this.classList.add('error');
                }
            });
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    const bgColor = type === 'error' ? '#DC2626' : type === 'success' ? '#059669' : '#1E3B8A';
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        z-index: 10001;
        max-width: 400px;
        font-size: 14px;
        line-height: 1.5;
        animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        border: 1px solid rgba(255,255,255,0.2);
        backdrop-filter: blur(10px);
    `;
    
    // Add icon
    const icon = document.createElement('i');
    icon.className = type === 'error' ? 'fas fa-exclamation-circle' : 
                     type === 'success' ? 'fas fa-check-circle' : 'fas fa-info-circle';
    icon.style.marginRight = '8px';
    
    // Add message
    const messageSpan = document.createElement('span');
    messageSpan.textContent = message;
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '&times;';
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        margin-left: 12px;
        float: right;
        line-height: 1;
        opacity: 0.8;
        transition: opacity 0.2s;
    `;
    
    closeButton.addEventListener('click', () => {
        notification.remove();
    });
    
    closeButton.addEventListener('mouseenter', () => {
        closeButton.style.opacity = '1';
    });
    
    closeButton.addEventListener('mouseleave', () => {
        closeButton.style.opacity = '0.8';
    });
    
    notification.appendChild(icon);
    notification.appendChild(messageSpan);
    notification.appendChild(closeButton);
    document.body.appendChild(notification);
    
    // Auto remove after 6 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
            setTimeout(() => notification.remove(), 400);
        }
    }, 6000);
}

// Scroll effects and animations
function initScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    // Throttle scroll events
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Header effects
        if (header) {
            if (currentScrollY > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(15px)';
                header.style.boxShadow = '0 4px 20px rgba(30, 59, 138, 0.15)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
                header.style.boxShadow = '0 4px 20px rgba(30, 59, 138, 0.1)';
            }
            
            // Hide/show header on scroll (mobile only)
            if (window.innerWidth <= 768) {
                if (currentScrollY > lastScrollY && currentScrollY > 200) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
            }
        }
        
        lastScrollY = currentScrollY;
        
        // Animate elements on scroll
        animateOnScroll();
    }
}

// Initialize animations
function initAnimations() {
    // Add fade-in class to elements that should animate
    const animatedElements = document.querySelectorAll('.card, .stat, .activity__item, .event__card, .gallery__item, .contact__item');
    
    animatedElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Trigger initial animation check
    setTimeout(() => {
        animateOnScroll();
    }, 100);
}

// Animate elements when they come into view
function animateOnScroll() {
    const fadeElements = document.querySelectorAll('.fade-in:not(.visible)');
    
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Gallery functionality
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery__item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const itemTitle = this.querySelector('span').textContent;
            showNotification(`Galeri "${itemTitle}" akan segera diperbarui dengan foto-foto kegiatan terbaru melalui sistem CMS. Tetap pantau terus!`, 'info');
        });
    });
}

// Utility functions
function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date(date).toLocaleDateString('id-ID', options);
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// Parallax effect for hero section
function initParallax() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled < hero.offsetHeight) {
                hero.style.backgroundPositionY = rate + 'px';
            }
        });
    }
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initGallery();
    initParallax();
    
    // Add animation delay to stats
    const stats = document.querySelectorAll('.stat');
    stats.forEach((stat, index) => {
        stat.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Initialize verse animations
    const verseElements = document.querySelectorAll('#verse-indonesian, #verse-english, #verse-reference');
    verseElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transition = 'opacity 0.6s ease-out';
    });
});

// Add CSS animations dynamically
const animationStyles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeInUp {
        from {
            transform: translateY(30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    .fade-in.visible {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .verse__quote {
        animation: fadeInUp 0.8s ease-out 0.3s both;
    }
    
    .verse__reference {
        animation: fadeInUp 0.8s ease-out 0.6s both;
    }
    
    .stat {
        animation: fadeInUp 0.6s ease-out both;
    }
    
    .hero__badge {
        animation: fadeInUp 0.6s ease-out 0.2s both;
    }
    
    .hero__title {
        animation: fadeInUp 0.8s ease-out 0.4s both;
    }
    
    .hero__subtitle {
        animation: fadeInUp 0.8s ease-out 0.6s both;
    }
    
    .hero__description {
        animation: fadeInUp 0.8s ease-out 0.8s both;
    }
    
    .hero__buttons {
        animation: fadeInUp 0.8s ease-out 1s both;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Performance monitoring
window.addEventListener('load', function() {
    // Simple performance logging
    if ('performance' in window) {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('🚀 Page load time:', loadTime + 'ms');
        
        if (loadTime > 3000) {
            console.warn('⚠️ Page load time is slower than expected');
        }
    }
    
    // Log successful initialization
    console.log('✅ GP GPIB Cahaya Anugerah website initialized successfully');
    console.log('📖 Verse of the Day feature active');
    console.log('🎯 "Berani dan Setia" - GP GPIB');
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    
    // Only show user-friendly error message in production
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        showNotification('Terjadi kesalahan kecil. Silakan refresh halaman jika diperlukan.', 'error');
    }
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Future implementation for offline caching
        console.log('🔄 Service Worker support detected - ready for PWA features');
    });
}

// Export functions for potential external use or testing
window.GPCahayaAnugerah = {
    showNotification,
    formatDate,
    truncateText,
    initToggleContent,
    bibleVerses,
    getDayOfYear
};