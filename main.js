/* =============================================================
   BUREAU DNK — Gedeelde scripts
   main.js — nav scroll, opbouw-reveals (gestaffeld), tellende
   cijfers, hero mask-reveal en hero fade-out bij scroll.
   ============================================================= */

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Nav: .scrolled na 60px
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

// Hero in beeld zetten (mask-reveal van de koppen) bij laden
const hero = document.getElementById('hero');
if (hero) requestAnimationFrame(() => hero.classList.add('in'));

// Tellende cijfers
function countUp(el) {
  const to = parseInt(el.dataset.to, 10);
  if (reduce || !to) { el.textContent = isNaN(to) ? el.textContent : to; return; }
  const dur = 1300, t0 = performance.now();
  function tick(t) {
    const p = Math.min((t - t0) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(to * eased);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// Opbouw bij scroll, gestaffeld per groep (kaarten in een rij na elkaar)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const sibs = el.parentElement
      ? Array.from(el.parentElement.children).filter(c => c.classList.contains('reveal') || c.classList.contains('reveal-left') || c.classList.contains('reveal-right') || c.classList.contains('stat'))
      : [el];
    const idx = Math.max(0, sibs.indexOf(el));
    const delay = el.dataset.delay !== undefined ? parseInt(el.dataset.delay, 10) : Math.min(idx, 5) * 90;
    setTimeout(() => {
      el.classList.add('visible');
      if (el.querySelectorAll) el.querySelectorAll('.num').forEach(countUp);
    }, delay);
    observer.unobserve(el);
  });
}, { threshold: 0.16, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stat')
  .forEach(el => observer.observe(el));

// Rustige header: zachte fade-out bij scrollen (alleen homepage-hero)
const heroInner = document.querySelector('.hero .hero-inner');
const heroPhoto = document.querySelector('.hero .hero-photo');
const scrollCue = document.querySelector('.hero .scroll-cue');
if (hero && heroInner && !reduce) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const vh = window.innerHeight;
    if (y > vh * 1.25) return;
    const p = Math.min(y / (vh * 0.72), 1);
    heroInner.style.opacity = `${1 - p}`;
    heroInner.style.transform = `translateY(${y * -0.10}px)`;
    if (heroPhoto) heroPhoto.style.opacity = `${1 - p * 0.5}`;
    if (scrollCue) scrollCue.style.opacity = `${Math.max(0, 1 - p * 2.4)}`;
  }, { passive: true });
}
