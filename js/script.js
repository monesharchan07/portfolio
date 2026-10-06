/**
 * CH. MONESH ARCHAN — PORTFOLIO JAVASCRIPT
 * Performance-focused, accessible interactive behaviors.
 */

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCanvas();
  initNavigation();
  initScrollspy();
  initRevealAnimations();
  initProjectFilters();
  initEmailCopy();
  initContactForm();
  initPlaceholderHandlers();
});

/**
 * 1. Background Particle & Orb Canvas Animation
 * Respects prefers-reduced-motion and scales particle count by screen size.
 */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let W = (canvas.width = window.innerWidth);
  let H = (canvas.height = window.innerHeight);

  const getParticleCount = () => (window.innerWidth < 768 ? 40 : 85);
  let particleCount = getParticleCount();

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  class Particle {
    constructor() {
      this.reset(true);
    }
    reset(init = false) {
      this.x = rand(0, W);
      this.y = rand(0, H);
      this.vx = rand(-0.2, 0.2);
      this.vy = rand(-0.2, 0.2);
      this.r = rand(0.8, 1.8);
      this.a = rand(0.15, 0.5);
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) {
        this.reset(false);
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 229, 255, ${this.a})`;
      ctx.fill();
    }
  }

  let particles = Array.from({ length: particleCount }, () => new Particle());

  function drawConnections() {
    const maxD = 100;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < maxD) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 229, 255, ${(1 - d / maxD) * 0.08})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  let t = 0;
  function drawOrbs() {
    const orbs = [
      { x: W * 0.12, y: H * 0.2, r: 240, c: '0,229,255', a: 0.038 },
      { x: W * 0.88, y: H * 0.75, r: 280, c: '255,209,102', a: 0.032 },
      { x: W * 0.5, y: H * 0.45, r: 200, c: '0,180,216', a: 0.022 }
    ];
    orbs.forEach((o) => {
      const p = 1 + Math.sin(t * 0.006) * 0.08;
      const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * p);
      g.addColorStop(0, `rgba(${o.c},${o.a})`);
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r * p, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  let animationFrameId;
  function animate() {
    ctx.clearRect(0, 0, W, H);
    t++;
    drawOrbs();
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    drawConnections();
    animationFrameId = requestAnimationFrame(animate);
  }

  if (prefersReducedMotion) {
    // Render single static frame for reduced motion users
    drawOrbs();
    particles.forEach((p) => p.draw());
    drawConnections();
  } else {
    animate();
  }

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      particleCount = getParticleCount();
      particles = Array.from({ length: particleCount }, () => new Particle());
      if (prefersReducedMotion) {
        ctx.clearRect(0, 0, W, H);
        drawOrbs();
        particles.forEach((p) => p.draw());
        drawConnections();
      }
    }, 150);
  });
}

/**
 * 2. Mobile Responsive Navigation
 */
function initNavigation() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const siteNav = document.querySelector('.site-nav');

  if (!toggleBtn || !navMenu) return;

  function toggleMenu(open) {
    const isExpanded = open !== undefined ? open : toggleBtn.getAttribute('aria-expanded') !== 'true';
    toggleBtn.setAttribute('aria-expanded', isExpanded);
    navMenu.classList.toggle('open', isExpanded);
  }

  toggleBtn.addEventListener('click', () => toggleMenu());

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      toggleMenu(false);
      toggleBtn.focus();
    }
  });

  // Nav elevation on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      siteNav.classList.add('scrolled');
    } else {
      siteNav.classList.remove('scrolled');
    }
  });
}

/**
 * 3. Scrollspy for Active Section Links
 */
function initScrollspy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((sec) => observer.observe(sec));
}

/**
 * 4. Intersection Observer for Scroll Reveals
 */
function initRevealAnimations() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/**
 * 5. Project Category Filtering
 */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/**
 * 6. Email Copy Handler with Toast
 */
function initEmailCopy() {
  const copyButtons = document.querySelectorAll('.copy-email-btn');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'monesharchan07@gmail.com';
      copyToClipboard(email, 'Email copied to clipboard: ' + email);
    });
  });
}

function copyToClipboard(text, successMessage) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMessage);
    });
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(successMessage);
    } catch (err) {
      showToast('Contact: ' + text);
    }
    document.body.removeChild(textArea);
  }
}

/**
 * 7. Interactive Contact Form with Validation & Mailto
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.elements['name'].value.trim();
    const email = form.elements['email'].value.trim();
    const message = form.elements['message'].value.trim();

    if (!name || !email || !message) {
      showToast('Please fill out all fields before sending.');
      return;
    }

    const emailSubject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const emailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoUrl = `mailto:monesharchan07@gmail.com?subject=${emailSubject}&body=${emailBody}`;

    window.location.href = mailtoUrl;
    showToast('Opening your email client to send message to monesharchan07@gmail.com...');
    form.reset();
  });
}

/**
 * 8. Placeholder link toast helper
 */
function initPlaceholderHandlers() {
  const placeholderTriggers = document.querySelectorAll('[data-placeholder]');
  placeholderTriggers.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const msg = el.getAttribute('data-placeholder') || 'Resource link will be updated soon.';
      showToast(msg);
    });
  });
}

/**
 * Global Toast Notification Helper
 */
function showToast(message) {
  let toast = document.getElementById('site-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'site-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3800);
}
