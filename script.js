// ===== Mobile menu toggle (all pages) =====
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===== Theme toggle with localStorage (all pages) =====
const themeToggle = document.getElementById('themeToggle');
const htmlEl = document.documentElement;

function applyTheme(theme) {
  htmlEl.setAttribute('data-theme', theme);
  if (themeToggle) themeToggle.setAttribute('aria-pressed', theme === 'light');
}

(function initTheme() {
  try {
    const saved = localStorage.getItem('lumen-theme');
    if (saved) applyTheme(saved);
  } catch (e) { /* localStorage unavailable */ }
})();

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = htmlEl.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    applyTheme(next);
    try { localStorage.setItem('lumen-theme', next); } catch (e) {}
  });
}

// ===== Testimonial carousel (home page) =====
const reviews = document.querySelectorAll('.review');
if (reviews.length) {
  const dotsWrap = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  let current = 0;

  reviews.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.setAttribute('aria-label', `Go to review ${i + 1}`);
    dot.addEventListener('click', () => showReview(i));
    dotsWrap.appendChild(dot);
  });
  const dots = dotsWrap.querySelectorAll('.dot');

  function showReview(index) {
    reviews.forEach(r => r.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    current = (index + reviews.length) % reviews.length;
    reviews[current].classList.add('active');
    dots[current].classList.add('active');
  }

  prevBtn.addEventListener('click', () => showReview(current - 1));
  nextBtn.addEventListener('click', () => showReview(current + 1));
  showReview(0);
}

// ===== Portfolio: category filter (portfolio page) =====
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.dataset.filter;
      galleryItems.forEach(item => {
        const match = category === 'all' || item.dataset.category === category;
        item.hidden = !match;
      });
    });
  });
}

// ===== Portfolio: lightbox modal (portfolio page) =====
const lightboxOverlay = document.getElementById('lightboxOverlay');
if (lightboxOverlay) {
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (img && lightboxImg) {
        if (lightboxImg.tagName === 'IMG') {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || 'Portfolio Preview';
        } else {
          lightboxImg.innerHTML = `<img src="${img.src}" alt="${img.alt || 'Portfolio Preview'}" style="max-width:100%; height:auto;">`;
        }
      }
      if (lightboxCaption) {
        lightboxCaption.textContent = item.dataset.caption || '';
      }
      lightboxOverlay.classList.add('open');
    });
  });

  function closeLightbox() { 
    lightboxOverlay.classList.remove('open');
    if (lightboxImg && lightboxImg.tagName === 'IMG') {
      lightboxImg.src = '';
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  
  lightboxOverlay.addEventListener('click', (e) => {
    if (e.target === lightboxOverlay) closeLightbox();
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

// ===== FAQ accordion (services page) =====
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');
  const answer = item.querySelector('.faq-a');

  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(openItem => {
      if (openItem !== item) {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-a').style.maxHeight = null;
        openItem.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      }
    });
    if (isOpen) {
      item.classList.remove('open');
      answer.style.maxHeight = null;
      btn.setAttribute('aria-expanded', 'false');
    } else {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// ===== Booking form validation (booking page) =====
const form = document.getElementById('bookingForm');
if (form) {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const dateInput = document.getElementById('date');
  const packageInput = document.getElementById('package');
  const messageInput = document.getElementById('message');
  const formSuccess = document.getElementById('formSuccess');

  function setError(input, errorId, message) {
    document.getElementById(errorId).textContent = message;
    input.closest('.field').classList.toggle('invalid', Boolean(message));
  }

  function validateRequired(input, errorId, message) {
    if (!input.value.trim()) {
      setError(input, errorId, message);
      return false;
    }
    setError(input, errorId, '');
    return true;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) { setError(emailInput, 'emailError', 'Please enter your email.'); return false; }
    if (!pattern.test(value)) { setError(emailInput, 'emailError', 'Please enter a valid email.'); return false; }
    setError(emailInput, 'emailError', '');
    return true;
  }

  function validateDate() {
    if (!dateInput.value) { setError(dateInput, 'dateError', 'Please choose a preferred date.'); return false; }
    const chosen = new Date(dateInput.value);
    const today = new Date(); today.setHours(0,0,0,0);
    if (chosen < today) { setError(dateInput, 'dateError', 'Please choose a future date.'); return false; }
    setError(dateInput, 'dateError', '');
    return true;
  }

  nameInput.addEventListener('blur', () => validateRequired(nameInput, 'nameError', 'Please enter your name.'));
  emailInput.addEventListener('blur', validateEmail);
  phoneInput.addEventListener('blur', () => validateRequired(phoneInput, 'phoneError', 'Please enter a phone number.'));
  dateInput.addEventListener('blur', validateDate);
  packageInput.addEventListener('change', () => validateRequired(packageInput, 'packageError', 'Please select a package.'));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    formSuccess.textContent = '';
    const checks = [
      validateRequired(nameInput, 'nameError', 'Please enter your name.'),
      validateEmail(),
      validateRequired(phoneInput, 'phoneError', 'Please enter a phone number.'),
      validateDate(),
      validateRequired(packageInput, 'packageError', 'Please select a package.'),
    ];
    if (checks.every(Boolean)) {
      formSuccess.textContent = `Thanks, ${nameInput.value.trim()} — we'll confirm your ${dateInput.value} session shortly.`;
      form.reset();
    }
  });
}

// ===== Scroll-reveal animation (all pages) =====
(function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('in-view'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => observer.observe(el));
})();
