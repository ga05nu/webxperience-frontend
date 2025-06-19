console.log('script.js loaded');

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Loader (Code-based Animation)
window.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader');
    const splitContainer = document.querySelector('.loader-split-container');
    const countdownEl = document.getElementById('loader-countdown');
    let count = 3;
    let interval;

    function startCountdown() {
        countdownEl.textContent = count;
        interval = setInterval(() => {
            count--;
            if (count > 0) {
                countdownEl.textContent = count;
            } else if (count === 0) {
                countdownEl.textContent = 0;
                setTimeout(() => {
                    countdownEl.style.opacity = '0';
                    splitContainer.classList.add('loader-split');
                    setTimeout(() => {
                        loader.style.opacity = '0';
                        setTimeout(() => {
                            loader.style.display = 'none';
                        }, 500);
                    }, 1200); // Wait for split and logo reveal
                }, 700); // Small pause on 0
                clearInterval(interval);
            }
        }, 1000);
    }

    if (splitContainer && countdownEl) {
        startCountdown();
    }

    // Theme Toggle Logic
    const themeToggle = document.querySelector('.theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    if (!themeToggle) {
        console.log('Theme toggle button not found');
    } else {
        console.log('Theme toggle button found');
        // Set initial theme from localStorage or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        htmlElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);

        themeToggle.addEventListener('click', () => {
            console.log('Theme toggle button clicked');
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            console.log('Theme toggled to', newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (themeIcon) {
            themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
});

// Mobile Navigation
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const parallax = document.querySelector('.parallax-bg');
    const scrolled = window.pageYOffset;
    parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Enhanced Services Carousel
const carousel = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const indicatorsContainer = document.querySelector('.carousel-indicators');

const services = [
    {
        title: 'Web Development',
        description: 'Creating modern and responsive websites with cutting-edge technologies',
        icon: 'fa-code'
    },
    {
        title: 'UI/UX Design',
        description: 'Crafting beautiful and intuitive user experiences',
        icon: 'fa-paint-brush'
    },
    {
        title: 'Mobile Apps',
        description: 'Building powerful cross-platform mobile applications',
        icon: 'fa-mobile-alt'
    },
    {
        title: 'Cloud Solutions',
        description: 'Scalable and secure cloud infrastructure services',
        icon: 'fa-cloud'
    },
    {
        title: 'Digital Marketing',
        description: 'Strategic digital marketing solutions for business growth',
        icon: 'fa-chart-line'
    }
];

// Create carousel items
carousel.innerHTML = '';
services.forEach((service, index) => {
    const item = document.createElement('div');
    item.className = `carousel-item`;
    item.innerHTML = `
        <i class="fas ${service.icon}"></i>
        <h3>${service.title}</h3>
        <p>${service.description}</p>
    `;
    carousel.appendChild(item);
});

const items = document.querySelectorAll('.carousel-item');
const totalSlides = items.length;
let currentSlide = 0;

// Create indicators
indicatorsContainer.innerHTML = '';
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.className = 'carousel-indicator';
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        goToSlide(i);
    });
    indicatorsContainer.appendChild(dot);
}
const indicators = document.querySelectorAll('.carousel-indicator');

function updateCarousel() {
    // Infinite loop logic
    if (currentSlide < 0) currentSlide = totalSlides - 1;
    if (currentSlide >= totalSlides) currentSlide = 0;

    // Remove all classes
    items.forEach(item => {
        item.classList.remove('active', 'prev', 'next');
    });

    // Set active, prev, next
    items[currentSlide].classList.add('active');
    if (items[currentSlide - 1]) items[currentSlide - 1].classList.add('prev');
    else items[totalSlides - 1].classList.add('prev');
    if (items[currentSlide + 1]) items[currentSlide + 1].classList.add('next');
    else items[0].classList.add('next');

    // Move track
    const slideWidth = items[0].offsetWidth + parseInt(getComputedStyle(items[0]).marginLeft) * 2;
    carousel.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

    // Update indicators
    indicators.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });

    // Update button states (always enabled for infinite loop)
    prevBtn.style.opacity = '1';
    nextBtn.style.opacity = '1';
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

prevBtn.addEventListener('click', () => {
    currentSlide--;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    currentSlide++;
    updateCarousel();
});

// Auto-advance carousel
let carouselInterval = setInterval(() => {
    currentSlide++;
    updateCarousel();
}, 5000);

// Pause auto-advance on hover
carousel.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
});
carousel.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(() => {
        currentSlide++;
        updateCarousel();
    }, 5000);
});

// Swipe support for mobile
let startX = 0;
let isDragging = false;
carousel.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
});
carousel.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - startX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            currentSlide--;
        } else {
            currentSlide++;
        }
        updateCarousel();
        isDragging = false;
    }
});
carousel.addEventListener('touchend', () => {
    isDragging = false;
});

// Initialize carousel
updateCarousel();

// Work Showcase
const showcaseGrid = document.querySelector('.showcase-grid');
const works = [
    {
        title: 'Project 1',
        category: 'Web Design',
        image: 'path/to/image1.jpg'
    },
    {
        title: 'Project 2',
        category: 'Mobile App',
        image: 'path/to/image2.jpg'
    },
    {
        title: 'Project 3',
        category: 'UI/UX',
        image: 'path/to/image3.jpg'
    }
];

works.forEach(work => {
    const item = document.createElement('div');
    item.className = 'showcase-item';
    item.setAttribute('data-aos', 'fade-up');
    item.innerHTML = `
        <div class="showcase-image">
            <img src="${work.image}" alt="${work.title}">
        </div>
        <h3>${work.title}</h3>
        <p>${work.category}</p>
    `;
    showcaseGrid.appendChild(item);
});

// Testimonials Carousel
const testimonials = [
    {
        name: 'John Doe',
        role: 'CEO, Tech Corp',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        text: 'Amazing work! The team delivered beyond our expectations. The process was smooth and the results outstanding.'
    },
    {
        name: 'Jane Smith',
        role: 'Marketing Director',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        text: 'Professional service and outstanding results. Our website looks fantastic and our users love it!'
    },
    {
        name: 'Mike Johnson',
        role: 'Startup Founder',
        avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
        text: 'Highly recommended for any web development needs. The support and communication were top-notch.'
    },
    {
        name: 'Emily Chen',
        role: 'Product Manager',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        text: 'The animations and design are world-class. Our product launch was a huge success thanks to this team.'
    }
];

const testimonialsTrack = document.querySelector('.testimonials-track');
const testimonialsPrev = document.querySelector('.testimonials-prev');
const testimonialsNext = document.querySelector('.testimonials-next');
const testimonialsIndicators = document.querySelector('.testimonials-indicators');

// Render testimonials
function renderTestimonials() {
    testimonialsTrack.innerHTML = '';
    testimonials.forEach((t, i) => {
        const item = document.createElement('div');
        item.className = 'testimonial-item';
        item.innerHTML = `
            <img class="testimonial-avatar" src="${t.avatar}" alt="${t.name}">
            <div class="testimonial-content">“${t.text}”</div>
            <div class="testimonial-author">
                <h4>${t.name}</h4>
                <p>${t.role}</p>
            </div>
        `;
        testimonialsTrack.appendChild(item);
    });
}
renderTestimonials();
const testimonialItems = document.querySelectorAll('.testimonial-item');

// Render indicators
function renderTestimonialIndicators() {
    testimonialsIndicators.innerHTML = '';
    for (let i = 0; i < testimonials.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'testimonials-indicator';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToTestimonial(i);
        });
        testimonialsIndicators.appendChild(dot);
    }
}
renderTestimonialIndicators();
const testimonialDots = document.querySelectorAll('.testimonials-indicator');

let currentTestimonial = 0;

function updateTestimonialsCarousel() {
    // Infinite loop logic
    if (currentTestimonial < 0) currentTestimonial = testimonials.length - 1;
    if (currentTestimonial >= testimonials.length) currentTestimonial = 0;

    testimonialItems.forEach((item, i) => {
        item.classList.toggle('active', i === currentTestimonial);
    });
    testimonialDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentTestimonial);
    });
    // Move track
    testimonialsTrack.style.transform = `translateX(-${currentTestimonial * 100}%)`;
}

function goToTestimonial(index) {
    currentTestimonial = index;
    updateTestimonialsCarousel();
}

testimonialsPrev.addEventListener('click', () => {
    currentTestimonial--;
    updateTestimonialsCarousel();
});
testimonialsNext.addEventListener('click', () => {
    currentTestimonial++;
    updateTestimonialsCarousel();
});

// Auto-advance
let testimonialInterval = setInterval(() => {
    currentTestimonial++;
    updateTestimonialsCarousel();
}, 6000);

testimonialsTrack.addEventListener('mouseenter', () => {
    clearInterval(testimonialInterval);
});
testimonialsTrack.addEventListener('mouseleave', () => {
    testimonialInterval = setInterval(() => {
        currentTestimonial++;
        updateTestimonialsCarousel();
    }, 6000);
});

// Swipe support for mobile
let testimonialStartX = 0;
let testimonialDragging = false;
testimonialsTrack.addEventListener('touchstart', (e) => {
    testimonialDragging = true;
    testimonialStartX = e.touches[0].clientX;
});
testimonialsTrack.addEventListener('touchmove', (e) => {
    if (!testimonialDragging) return;
    const diff = e.touches[0].clientX - testimonialStartX;
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            currentTestimonial--;
        } else {
            currentTestimonial++;
        }
        updateTestimonialsCarousel();
        testimonialDragging = false;
    }
});
testimonialsTrack.addEventListener('touchend', () => {
    testimonialDragging = false;
});

// Initialize
updateTestimonialsCarousel();

// Ripple Effect
function createRipple(event) {
    const button = event.currentTarget || event.target;
    const rect = button.getBoundingClientRect();
    const circle = document.createElement('span');
    circle.classList.add('ripple');
    const size = Math.max(rect.width, rect.height);
    let x, y;
    if (event.touches && event.touches.length) {
        x = event.touches[0].clientX - rect.left - size / 2;
        y = event.touches[0].clientY - rect.top - size / 2;
    } else {
        x = event.clientX - rect.left - size / 2;
        y = event.clientY - rect.top - size / 2;
    }
    circle.style.width = circle.style.height = `${size}px`;
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    button.appendChild(circle);
    console.log('Ripple created on', button.className, 'at', x, y);
    circle.addEventListener('animationend', () => {
        circle.remove();
    });
}

const rippleSelectors = ['.nav-button', '.dark-mode-toggle', '.service-card', '.learn-more'];
document.addEventListener('click', function(e) {
    for (const selector of rippleSelectors) {
        if (e.target.closest(selector)) {
            console.log('Ripple event for selector:', selector);
            createRipple.call(e.target.closest(selector), e);
            break;
        }
    }
});
document.addEventListener('touchstart', function(e) {
    for (const selector of rippleSelectors) {
        if (e.target.closest(selector)) {
            console.log('Ripple event (touch) for selector:', selector);
            createRipple.call(e.target.closest(selector), e);
            break;
        }
    }
}, {passive: true});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

function updateCount(counter) {
    const target = +counter.innerText.replace('+', '');
    const count = +counter.getAttribute('data-count') || 0;
    const increment = target / speed;

    if (count < target) {
        counter.setAttribute('data-count', Math.ceil(count + increment));
        counter.innerText = Math.ceil(count + increment) + '+';
        setTimeout(() => updateCount(counter), 1);
    } else {
        counter.innerText = target + '+';
    }
}

// Intersection Observer for counters
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            updateCount(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

counters.forEach(counter => observer.observe(counter));

// Enhanced Scroll Animations
const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            scrollObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px'
});

scrollRevealElements.forEach(element => {
    scrollObserver.observe(element);
});

// Popup logic
const popupTriggers = document.querySelectorAll('.popup-trigger');
const popupOverlay = document.querySelector('.popup-overlay');
const popupModal = document.getElementById('popup-modal');
const closePopupBtn = document.querySelector('.close-popup');
const popupContent = popupModal.querySelector('.popup-content');

function openPopup(contentHtml) {
    if (contentHtml) {
        popupContent.innerHTML = contentHtml + '<button class="close-popup" aria-label="Close popup">&times;</button>';
        // Re-attach close event to new button
        popupContent.querySelector('.close-popup').addEventListener('click', closePopup);
    }
    popupOverlay.classList.add('active');
    popupModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePopup() {
    popupOverlay.classList.remove('active');
    popupModal.classList.remove('active');
    document.body.style.overflow = '';
}

popupTriggers.forEach(trigger => {
    trigger.addEventListener('click', e => {
        e.preventDefault();
        const contentHtml = trigger.getAttribute('data-popup-content');
        openPopup(contentHtml);
    });
});

closePopupBtn.addEventListener('click', closePopup);
popupOverlay.addEventListener('click', closePopup);

// Enhanced Work Showcase
const showcaseItems = document.querySelectorAll('.showcase-item');

showcaseItems.forEach(item => {
    item.addEventListener('click', () => {
        const content = `
            <div class="showcase-popup">
                <img src="${item.querySelector('img').src}" alt="${item.querySelector('h3').textContent}">
                <h3>${item.querySelector('h3').textContent}</h3>
                <p>${item.querySelector('p').textContent}</p>
                <div class="showcase-details">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    <ul>
                        <li>Feature 1</li>
                        <li>Feature 2</li>
                        <li>Feature 3</li>
                    </ul>
                    <button class="cta-button ripple-effect">View Project</button>
                </div>
            </div>
        `;
        openPopup(content);
    });
});

// Enhanced Feature Cards
const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
    // 3D Tilt Effect
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 30;
        const angleY = (centerX - x) / 30;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
    });
    
    // Icon Rotation on Hover
    const icon = card.querySelector('.feature-icon');
    if (icon) {
        card.addEventListener('mouseenter', () => {
            icon.style.transform = 'rotateY(180deg)';
            setTimeout(() => {
                icon.querySelector('i').style.transform = 'rotateY(-180deg)';
            }, 200);
        });
        
        card.addEventListener('mouseleave', () => {
            icon.style.transform = 'rotateY(0)';
            icon.querySelector('i').style.transform = 'rotateY(0)';
        });
    }
    
    // Learn More Button Animation
    const learnMore = card.querySelector('.learn-more');
    if (learnMore) {
        learnMore.addEventListener('mouseenter', () => {
            learnMore.querySelector('i').style.transform = 'translateX(5px)';
        });
        
        learnMore.addEventListener('mouseleave', () => {
            learnMore.querySelector('i').style.transform = 'translateX(0)';
        });
    }
});

// Smooth reveal of feature details
const featureDetails = document.querySelectorAll('.feature-details');
featureDetails.forEach(details => {
    const parent = details.closest('.feature-card');
    const list = details.querySelector('.feature-list');
    
    if (parent && list) {
        parent.addEventListener('mouseenter', () => {
            details.style.height = `${list.offsetHeight + 60}px`; // Add padding
        });
        
        parent.addEventListener('mouseleave', () => {
            details.style.height = '0';
        });
    }
});

// Initialize AOS with custom settings for features
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    delay: 100
});

// Enhanced Navbar
const navbar = document.querySelector('.navbar');
const navLinkElements = document.querySelectorAll('.nav-link');
const mobileMenu = document.querySelector('.nav-links');

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinkElements.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
    
    // Add background to navbar when scrolled
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    menuToggle.querySelector('i').classList.toggle('fa-bars');
    menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Smooth scroll for nav links
navLinkElements.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const offset = navbar.offsetHeight;
        
        window.scrollTo({
            top: targetSection.offsetTop - offset,
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.remove('fa-times');
        }
    });
});

// Hero Section Scroll Indicator
const scrollIndicator = document.querySelector('.hero-scroll-indicator');
scrollIndicator.addEventListener('click', () => {
    const featuresSection = document.querySelector('#features');
    const offset = navbar.offsetHeight;
    
    window.scrollTo({
        top: featuresSection.offsetTop - offset,
        behavior: 'smooth'
    });
});

// Hero Video Background
const heroVideo = document.querySelector('.hero-bg video');
if (heroVideo) {
    // Ensure video is loaded and playing
    heroVideo.play().catch(function(error) {
        console.log("Video play failed:", error);
    });

    // Handle video loading
    heroVideo.addEventListener('loadeddata', () => {
        heroVideo.style.opacity = '1';
    });
}

// Parallax effect for hero content
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroScrollIndicator = document.querySelector('.hero-scroll-indicator');
    
    if (scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / (window.innerHeight / 2));
        
        heroScrollIndicator.style.opacity = 1 - (scrolled / (window.innerHeight / 4));
    }
});

// Initialize graph bars
function initializeGraphBars() {
    const bars = document.querySelectorAll('.bar');
    bars.forEach(bar => {
        const height = bar.getAttribute('data-height');
        setTimeout(() => {
            bar.style.height = `${height}%`;
        }, 500);
    });
}

// Animate statistics when they come into view
function animateStatistics() {
    const stats = document.querySelectorAll('.stat-card h3');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = target.textContent;
                if (value.includes('+')) {
                    const numericValue = parseInt(value);
                    animateValue(target, 0, numericValue, 2000);
                } else if (value.includes('%')) {
                    const numericValue = parseInt(value);
                    animateValue(target, 0, numericValue, 2000, '%');
                }
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

// Helper function to animate counting
function animateValue(obj, start, end, duration, suffix = '+') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        obj.textContent = current + suffix;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeGraphBars();
    animateStatistics();
});

// Initialize statistics animation
function initializeStatistics() {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = parseInt(target.textContent);
                animateValue(target, 0, value, 2000);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));
}

// Animate number counting
function animateValue(obj, start, end, duration) {
    const suffix = obj.textContent.includes('+') ? '+' : '';
    let startTimestamp = null;

    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        obj.textContent = current + suffix;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize graph animation
function initializeGraph() {
    const bars = document.querySelectorAll('.bar');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.height = entry.target.style.height || '0%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    bars.forEach(bar => observer.observe(bar));
}

// Service card hover effects
function initializeCards() {
    const cards = document.querySelectorAll('.service-card');
    cards.forEach(card => {
        const image = card.querySelector('.card-image img');
        
        card.addEventListener('mouseenter', () => {
            image.style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            image.style.transform = 'scale(1)';
        });
    });
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeStatistics();
    initializeGraph();
    initializeCards();
});

// Parallax Effects
document.addEventListener('DOMContentLoaded', () => {
    const parallaxSections = document.querySelectorAll('.parallax-section');
    const fadeElements = document.querySelectorAll('.fade-up, .scale-in');
    
    // Parallax scroll effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxSections.forEach(section => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            section.style.setProperty('--scroll-speed', `${yPos}px`);
            
            // Animate shapes
            const shapes = section.querySelectorAll('.parallax-shape');
            shapes.forEach(shape => {
                const rect = shape.getBoundingClientRect();
                const centerY = rect.top + rect.height / 2;
                const viewportHeight = window.innerHeight;
                const distance = centerY - viewportHeight / 2;
                const speed = parseFloat(shape.className.match(/scroll-speed-(\d)/)[1]) * 0.1;
                
                shape.style.transform = `translateY(${distance * speed}px)`;
            });
        });
        
        // Fade in elements when they come into view
        fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const triggerPoint = window.innerHeight * 0.8;
            
            if (rect.top < triggerPoint) {
                element.classList.add('visible');
            }
        });
    });
    
    // Initial check for elements in view
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 100);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Theme Toggle Logic
const themeToggle = document.querySelector('.theme-toggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

// Set initial theme from localStorage or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    console.log('Theme toggle button clicked');
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    console.log('Theme toggled to', newTheme);
});

function updateThemeIcon(theme) {
    if (themeIcon) {
        themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
} 