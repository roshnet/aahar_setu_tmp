// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('nav');
const body = document.body;

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        
        // Create overlay if it doesn't exist
        let overlay = document.querySelector('.mobile-menu-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'mobile-menu-overlay';
            body.appendChild(overlay);
        }
        
        overlay.classList.toggle('active');
        
        // Prevent body scrolling when menu is open
        if (nav.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const overlay = document.querySelector('.mobile-menu-overlay');
    if (overlay && overlay.classList.contains('active') && !e.target.closest('nav') && !e.target.closest('.mobile-menu-toggle')) {
        mobileMenuToggle.classList.remove('active');
        nav.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
    }
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
            const overlay = document.querySelector('.mobile-menu-overlay');
            if (overlay) {
                overlay.classList.remove('active');
            }
            body.style.overflow = '';
        }
    });
});

// Smooth scroll to target section on nav click
document.querySelectorAll('nav a, .btn-solutions, .btn-contact, .footer-links a, .btn-product').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
            const section = document.querySelector(targetId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
                
                // Update active class in navbar
                document.querySelectorAll('nav a').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                
                if (this.parentElement && this.parentElement.tagName === 'LI') {
                    this.classList.add('active');
                }
            }
        }
    });
});

// Scroll down button scrolls to About section
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Hide scroll indicator when scrolling down
window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    const header = document.querySelector('header');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    // Add background to header when scrolled
    if (scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Hide scroll indicator when scrolled past hero section
    if (scrollIndicator) {
        const heroHeight = document.querySelector('.hero').offsetHeight;
        if (scrollY > heroHeight * 0.3) {
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }
    }
});

// Update active menu item based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= (sectionTop - 200)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Form submission handling (placeholder)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message!');
    });
}

// Newsletter form submission (placeholder)
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for subscribing to our newsletter!');
    });
}

// Initialize page
window.addEventListener('DOMContentLoaded', function() {
    // Check initial scroll position
    if (window.scrollY > 50) {
        document.querySelector('header').classList.add('scrolled');
    }
    
    // Check if scroll indicator should be hidden initially
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator && window.scrollY > 100) {
        scrollIndicator.classList.add('hidden');
    }
});

// Resize handler
window.addEventListener('resize', function() {
    // Reset mobile menu state on window resize
    if (window.innerWidth > 768 && nav.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        nav.classList.remove('active');
        const overlay = document.querySelector('.mobile-menu-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
        body.style.overflow = '';
    }
});

document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("product-carousel-wrapper");
  if (!wrapper) {
    return;
  }

  const viewport = wrapper.querySelector(".product-carousel");
  const track = wrapper.querySelector(".product-track");
  const slides = Array.from(track?.querySelectorAll(".product-card") ?? []);
  const prevBtn = wrapper.querySelector(".carousel-btn.prev");
  const nextBtn = wrapper.querySelector(".carousel-btn.next");

  if (!viewport || !track || slides.length === 0) {
    return;
  }

  let currentIndex = 0;
  let isTransitioning = false;

  function updateActiveSlide() {
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentIndex);
    });
  }

  function applyTransform(value, { animate = true } = {}) {
    if (!animate) {
      track.classList.add("no-transition");
    } else {
      track.classList.remove("no-transition");
    }
    track.style.transform = `translateX(${value}px)`;
  }

  function calculateTranslate(index) {
    const target = slides[index];
    if (!target) {
      return 0;
    }

    const viewportWidth = viewport.clientWidth;
    const slideWidth = target.clientWidth;
    const offsetLeft = target.offsetLeft;
    const centerOffset = (viewportWidth - slideWidth) / 2;
    return centerOffset - offsetLeft;
  }

  function goTo(index, { animate = true } = {}) {
    const total = slides.length;
    currentIndex = (index + total) % total;
    updateActiveSlide();
    const translate = calculateTranslate(currentIndex);
    applyTransform(translate, { animate });
  }

  prevBtn?.addEventListener("click", () => {
    if (isTransitioning) {
      return;
    }
    isTransitioning = true;
    goTo(currentIndex - 1, { animate: true });
  });

  nextBtn?.addEventListener("click", () => {
    if (isTransitioning) {
      return;
    }
    isTransitioning = true;
    goTo(currentIndex + 1, { animate: true });
  });

  track.addEventListener("transitionend", (event) => {
    if (event.propertyName === "transform") {
      isTransitioning = false;
    }
  });

  wrapper.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      prevBtn?.click();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      nextBtn?.click();
    }
  });

  window.addEventListener("resize", () => {
    goTo(currentIndex, { animate: false });
  });

  goTo(0, { animate: false });
});
