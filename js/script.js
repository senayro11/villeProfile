// ==========================================================================
// VILLE.SYS — Portfolio interactions
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNav();
  initTypedText();
  initReveal();
  initCounters();
  initSkillBars();
  initTerminal();
  initProjectModal();
  initContactForm();
  document.getElementById('year').textContent = new Date().getFullYear();
});

// ---------------------------------------------------------------------
// Preloader / boot sequence
// ---------------------------------------------------------------------
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const fill = document.getElementById('bootFill');
  const log = document.getElementById('bootLog');

  const lines = [
    '> loading assets...',
    '> connecting to network...',
    '> rendering interface...',
    '> access granted.'
  ];

  requestAnimationFrame(() => { fill.style.width = '100%'; });

  lines.forEach((text, i) => {
    const span = document.createElement('span');
    span.textContent = text;
    span.style.animationDelay = `${0.3 + i * 0.3}s`;
    log.appendChild(span);
  });

  setTimeout(() => {
    preloader.classList.add('hide');
    document.body.style.overflow = '';
  }, 1900);
}

// ---------------------------------------------------------------------
// Navbar: scroll shadow, active link, mobile menu
// ---------------------------------------------------------------------
function initNav() {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('navBurger');
  const links = document.getElementById('navLinks');
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('main section[id]');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);

    let current = sections[0]?.id;
    sections.forEach((sec) => {
      if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  });

  burger.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => links.classList.remove('open'));
  });
}

// ---------------------------------------------------------------------
// Hero typing effect
// ---------------------------------------------------------------------
function initTypedText() {
  const el = document.getElementById('typedText');
  const phrases = [
    'Full-Stack Developer',
    'UI / Motion Enthusiast',
    'Building the future, one interface at a time'
  ];
  let phraseIndex = 0, charIndex = 0, deleting = false;

  function tick() {
    const current = phrases[phraseIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1400);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(tick, deleting ? 35 : 65);
  }
  tick();
}

// ---------------------------------------------------------------------
// Scroll reveal
// ---------------------------------------------------------------------
function initReveal() {
  const targets = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach((t) => observer.observe(t));
}

// ---------------------------------------------------------------------
// Animated stat counters
// ---------------------------------------------------------------------
function initCounters() {
  const stats = document.querySelectorAll('.stat__value');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1400;
      const start = performance.now();

      function frame(now) {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(frame);
        else el.textContent = target;
      }
      requestAnimationFrame(frame);
      observer.unobserve(el);
    });
  }, { threshold: 0.4 });

  stats.forEach((s) => observer.observe(s));
}

// ---------------------------------------------------------------------
// Skill bar fill animation
// ---------------------------------------------------------------------
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const bar = entry.target;
      const fill = bar.querySelector('.skill-bar__fill');
      fill.style.width = `${bar.dataset.level}%`;
      observer.unobserve(bar);
    });
  }, { threshold: 0.4 });

  bars.forEach((b) => observer.observe(b));
}

// ---------------------------------------------------------------------
// About terminal type-out
// ---------------------------------------------------------------------
function initTerminal() {
  const body = document.getElementById('terminalBody');
  const script = [
    '$ whoami',
    'ryan_villanueva // full-stack developer',
    '$ cat mission.txt',
    'Build fast, resilient, beautiful software.',
    '$ status --check',
    'READY FOR NEW MISSIONS ▓'
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      let i = 0;
      function nextLine() {
        if (i >= script.length) return;
        const line = document.createElement('div');
        body.appendChild(line);
        typeLine(line, script[i], () => {
          i++;
          setTimeout(nextLine, 250);
        });
      }
      nextLine();
    });
  }, { threshold: 0.3 });

  observer.observe(document.getElementById('aboutTerminal'));
}

function typeLine(el, text, done) {
  let i = 0;
  const interval = setInterval(() => {
    el.textContent = text.slice(0, i + 1);
    i++;
    if (i === text.length) {
      clearInterval(interval);
      done();
    }
  }, 22);
}

// ---------------------------------------------------------------------
// Project modal
// ---------------------------------------------------------------------
const PROJECT_DATA = {
  nexus: {
    id: 'FILE_01', title: 'Nexus Dashboard',
    desc: 'A real-time analytics dashboard streaming live data over WebSockets, with custom D3.js visualizations and sub-100ms update latency.',
    tags: ['React', 'WebSocket', 'D3.js', 'Node.js'],
    role: 'Lead Dev', year: '2025', status: 'DEPLOYED',
    live: '#', code: '#'
  },
  cipher: {
    id: 'FILE_02', title: 'Cipher Auth',
    desc: 'A secure authentication microservice supporting multi-factor login flows, token rotation, and audit logging.',
    tags: ['Node.js', 'JWT', 'PostgreSQL', 'Redis'],
    role: 'Backend Dev', year: '2024', status: 'DEPLOYED',
    live: '#', code: '#'
  },
  drift: {
    id: 'FILE_03', title: 'Drift Commerce',
    desc: 'A headless e-commerce storefront with animated product exploration, built for speed and conversion.',
    tags: ['Next.js', 'Stripe', 'Framer Motion'],
    role: 'Frontend Dev', year: '2024', status: 'DEPLOYED',
    live: '#', code: '#'
  },
  orbit: {
    id: 'FILE_04', title: 'Orbit Chat',
    desc: 'An encrypted real-time messaging application with presence indicators, reactions, and offline sync.',
    tags: ['Socket.io', 'Redis', 'React'],
    role: 'Full-Stack Dev', year: '2023', status: 'ARCHIVED',
    live: '#', code: '#'
  }
};

function initProjectModal() {
  const overlay = document.getElementById('modalOverlay');
  const closeBtn = document.getElementById('modalClose');
  const cards = document.querySelectorAll('.project-card');

  cards.forEach((card) => {
    card.addEventListener('click', () => openModal(card.dataset.project));
  });

  function openModal(key) {
    const data = PROJECT_DATA[key];
    if (!data) return;

    document.getElementById('modalId').textContent = data.id;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDesc').textContent = data.desc;
    document.getElementById('modalRole').textContent = data.role;
    document.getElementById('modalYear').textContent = data.year;
    document.getElementById('modalStatus').textContent = data.status;
    document.getElementById('modalLive').href = data.live;
    document.getElementById('modalCode').href = data.code;

    const tagsEl = document.getElementById('modalTags');
    tagsEl.innerHTML = '';
    data.tags.forEach((t) => {
      const span = document.createElement('span');
      span.textContent = t;
      tagsEl.appendChild(span);
    });

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// ---------------------------------------------------------------------
// Contact form (front-end only — wire to your own backend/service)
// ---------------------------------------------------------------------
function initContactForm() {
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    note.textContent = '> TRANSMISSION SENT SUCCESSFULLY. Standing by for reply...';
    form.reset();
    setTimeout(() => { note.textContent = ''; }, 5000);
  });
}
