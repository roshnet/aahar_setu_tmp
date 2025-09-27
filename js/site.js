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
  const carousel = document.querySelector(".product-carousel");
  let cards = Array.from(document.querySelectorAll(".product-card"));
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  // Clone first and last card
  const firstClone = cards[0].cloneNode(true);
  const lastClone = cards[cards.length - 1].cloneNode(true);
  firstClone.classList.add("clone");
  lastClone.classList.add("clone");

  // Append/prepend clones
  carousel.appendChild(firstClone);
  carousel.insertBefore(lastClone, cards[0]);

  // Refresh card list
  cards = Array.from(document.querySelectorAll(".product-card"));

  // Helper: update active card
  function updateActiveCard() {
    let center = carousel.scrollLeft + carousel.offsetWidth / 2;
    let closestCard = null;
    let closestOffset = Infinity;

    cards.forEach(card => {
      let cardCenter = card.offsetLeft + card.offsetWidth / 2;
      let offset = Math.abs(center - cardCenter);
      if (offset < closestOffset) {
        closestOffset = offset;
        closestCard = card;
      }
    });

    cards.forEach(card => card.classList.remove("active"));
    if (closestCard && !closestCard.classList.contains("clone")) {
      closestCard.classList.add("active");
    }
  }


function checkClones() {
  const firstReal = cards[1]; // 0 = lastClone
  const lastReal = cards[cards.length - 2]; // last = firstClone

  if (carousel.scrollLeft <= cards[0].offsetLeft + 5) {
    // At left clone → jump to last real
    carousel.scrollLeft = lastReal.offsetLeft;
  }
  if (carousel.scrollLeft >= cards[cards.length - 1].offsetLeft - 5) {
    // At right clone → jump to first real
    carousel.scrollLeft = firstReal.offsetLeft;
  }
}


  // Scroll to next/prev
  function scrollToCard(direction) {
    const activeCard = document.querySelector(".product-card.active") || cards[1];
    console.log('workss', );
    let newCard;

    if (direction === "next") {
      newCard = activeCard.nextElementSibling;
    } else {
      newCard = activeCard.previousElementSibling;
    }

    newCard.scrollIntoView({ behavior: "smooth", inline: "center" });
    setTimeout(() => {
      checkClones();
      updateActiveCard();
    }, 500);
  }

  prevBtn.addEventListener("click", () => scrollToCard("prev"));
  nextBtn.addEventListener("click", () => scrollToCard("next"));

  carousel.addEventListener("scroll", () => {
    clearTimeout(carousel.scrollTimeout);
    carousel.scrollTimeout = setTimeout(() => {
      checkClones();
      updateActiveCard();
    }, 200);
  });

  window.addEventListener("resize", updateActiveCard);

  // Start at the first real card
  setTimeout(() => {
    cards[1].scrollIntoView({ inline: "center" });
    updateActiveCard();
  }, 50);
});
