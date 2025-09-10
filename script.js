// ===== Mobile nav toggle =====

const navToggle = document.querySelector('.nav-toggle');

const nav = document.getElementById('site-nav');

if (navToggle && nav) {

  navToggle.addEventListener('click', () => {

    const isOpen = nav.getAttribute('data-collapsed') === 'false';

    nav.setAttribute('data-collapsed', isOpen ? 'true' : 'false');

    navToggle.setAttribute('aria-expanded', String(!isOpen));

  });

}

// ===== Reveal on scroll =====

const io = new IntersectionObserver((entries) => {

  for (const entry of entries) {

    if (entry.isIntersecting) entry.target.classList.add('visible');

  }

}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ===== Animated counters =====

function animateCount(el) {

  const target = Number(el.dataset.count || 0);

  const duration = 1200;

  const start = performance.now();

  function tick(now) {

    const p = Math.min(1, (now - start) / duration);

    el.textContent = Math.floor(p * target).toLocaleString();

    if (p < 1) requestAnimationFrame(tick);

  }

  requestAnimationFrame(tick);

}

document.querySelectorAll('.num').forEach(animateCount);

// ===== Current year =====

document.getElementById('year').textContent = new Date().getFullYear();

// ===== Smooth scroll offset fix for sticky header =====

document.querySelectorAll('a[href^="#"]').forEach(a => {

  a.addEventListener('click', (e) => {

    const id = a.getAttribute('href');

    if (id.length > 1) {

      const el = document.querySelector(id);

      if (!el) return;

      e.preventDefault();

      const offset = document.querySelector('.site-header').offsetHeight + 12;

      const top = el.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: 'smooth' });

      history.pushState(null, '', id);

    }

  });

});