// ── Nav scroll shadow ──────────────────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ── Mobile menu toggle ─────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  // close the menu after tapping a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ── Fade-up on scroll ──────────────────────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Trigger above-the-fold elements on load
window.addEventListener('load', () => {
  document.querySelectorAll('.page-hero .fade-up, #home .fade-up').forEach(el => {
    setTimeout(() => el.classList.add('visible'), 100);
  });
});

// ── Contact form (Formspree) ───────────────────────────
async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('.form-submit');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if (response.ok) {
      btn.textContent = 'Message sent \u2713';
      btn.style.background = '#bc948d';
      form.reset();
      setTimeout(() => {
        btn.textContent = 'Send Message \u2192';
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    } else {
      throw new Error('Form submission failed');
    }
  } catch (err) {
    btn.textContent = 'Something went wrong \u2014 try emailing us directly';
    btn.style.background = '#a05050';
    btn.disabled = false;
  }
}
// wire it up if a contact form is present
const contactForm = document.querySelector('.contact-form');
if (contactForm) contactForm.addEventListener('submit', handleSubmit);
