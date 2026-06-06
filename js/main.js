/* ============================================================
   MICHAL OREN — Main JavaScript
   ============================================================ */

/* ── Navigation scroll effect ─────────────────────────────── */
const nav = document.querySelector('.nav');
if (nav) {
  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Always show when near the top
    if (currentScrollY < 80) {
      nav.classList.remove('nav--hidden');
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down — hide
      nav.classList.add('nav--hidden');
    } else {
      // Scrolling up — show
      nav.classList.remove('nav--hidden');
    }

    nav.classList.toggle('scrolled', currentScrollY > 50);
    lastScrollY = currentScrollY;
  }, { passive: true });
}

/* ── Mobile menu ───────────────────────────────────────────── */
const toggle = document.querySelector('.nav__toggle');
const links  = document.querySelector('.nav__links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && links.classList.contains('open')) {
      links.classList.remove('open');
      toggle.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ── Active nav link ───────────────────────────────────────── */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

/* ── Lightbox ──────────────────────────────────────────────── */
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox__img');
const lightboxClose = document.querySelector('.lightbox__close');

if (lightbox) {
  document.querySelectorAll('.gallery__item img').forEach(img => {
    img.parentElement.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
}

/* ── Netlify form success message ──────────────────────────── */
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('success') === 'true') {
  const msg = document.querySelector('.form-success');
  if (msg) {
    msg.style.display = 'block';
    document.querySelector('.contact-form')?.style.setProperty('display', 'none');
  }
}

/* ── Fade-in on scroll ─────────────────────────────────────── */
const fadeEls = document.querySelectorAll('.fade-in');
if (fadeEls.length && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => observer.observe(el));
}
