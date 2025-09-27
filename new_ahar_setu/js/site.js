// Function to handle smooth scrolling
function setupScrolling() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const aboutSection = document.querySelector('#about');

    if (scrollIndicator && aboutSection) {
        scrollIndicator.addEventListener('click', () => {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Smooth scroll on nav links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Scroll to top button
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Navbar hide on scroll down
    let lastScrollTop = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            header.classList.add('hide-nav');
        } else {
            header.classList.remove('hide-nav');
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

// Function to handle navigation highlighting
function setupNavigation() {
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navLinks.forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
        });
    });
}

// Function to add parallax effect to hero section
function setupParallax() {
    const hero = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (hero) {
            hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        }
    });
}

// Function to handle mobile navigation
function setupMobileNav() {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    function handleScreenChange(e) {
        if (e.matches) {
            document.querySelectorAll('.tag').forEach(tag => {
                tag.addEventListener('click', function () {
                    this.classList.toggle('active');
                });
            });
        }
    }

    handleScreenChange(mediaQuery);
    mediaQuery.addEventListener('change', handleScreenChange);
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    setupScrolling();
    setupNavigation();
    setupParallax();
    setupMobileNav();

    console.log('Agriculture website initialized');
});
