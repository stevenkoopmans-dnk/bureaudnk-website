/* =============================================================
   BUREAU DNK — Gedeelde scripts
   main.js — nav scroll-effect + scroll reveal
   ============================================================= */

// Nav: voeg .scrolled toe na 60px scrollen
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// Scroll reveal met optionele data-delay per element
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      const delay = e.target.dataset.delay !== undefined
        ? parseInt(e.target.dataset.delay)
        : (i % 4) * 80;
      setTimeout(() => e.target.classList.add('visible'), delay);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
  .forEach(el => observer.observe(el));
