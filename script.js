/* ======================
   Utility: debounce
   ====================== */
function debounce(fn, wait = 120) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

/* ======================
   Mobile Detection
   ====================== */
const isMobile = () => window.innerWidth <= 768;

/* ======================
   Scroll reveal (IntersectionObserver)
   ====================== */
(function initReveal() {
  const nodes = document.querySelectorAll('.reveal');
  if (!nodes.length) return;

  const obs = new IntersectionObserver((entries, o) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const d = Number(e.target.dataset.delay || 0);
        setTimeout(() => e.target.classList.add('active'), d);
        o.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });

  nodes.forEach(n => obs.observe(n));
})();

/* ======================
   Nav toggle, smooth scroll, sticky nav
   ====================== */
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    toggle.classList.toggle('active');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('active');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
});

/* ======================
   Reusable slider initializer
   ====================== */
(function initSliders() {
  const wrappers = Array.from(document.querySelectorAll('.team-slider, .projects-slider'));
  if (!wrappers.length) return;

  wrappers.forEach(setup);

  function setup(wrapper) {
    const wrap = wrapper.querySelector('.slider-track-wrap');
    const track = wrapper.querySelector('.slider-track');
    const btnPrev = wrapper.querySelector('.slider-btn.prev');
    const btnNext = wrapper.querySelector('.slider-btn.next');
    if (!wrap || !track) return;

    let index = 0;
    let itemWidth = calcItemWidth();
    let gap = parseFloat(getComputedStyle(track).gap) || 16;
    let raf = null;

    function items() { return Array.from(track.querySelectorAll('.slide-item')); }
    function calcItemWidth() {
      const first = track.querySelector('.slide-item');
      return first ? Math.round(first.getBoundingClientRect().width) : 220;
    }
    function visibleCount() {
      const available = Math.max(1, wrap.clientWidth);
      const w = itemWidth + gap;
      return Math.max(1, Math.floor((available + gap) / w));
    }
    function clampIndex() {
      const total = items().length;
      const visible = visibleCount();
      const maxIndex = Math.max(0, total - visible);
      index = Math.min(Math.max(0, index), maxIndex);
    }
    function setTransform(x, animate = true) {
      if (!animate) track.style.transition = 'none';
      track.style.transform = `translate3d(-${x}px, 0, 0)`;
      if (!animate) {
        requestAnimationFrame(() => { track.style.transition = ''; });
      }
    }
    function goTo(i, animate = true) {
      const x = i === 0 ? 0 : i * (itemWidth + gap);
      setTransform(x, animate);
      updateButtons();
    }
    function updateButtons() {
      if (!btnPrev || !btnNext) return;
      const total = items().length;
      const visible = visibleCount();
      btnPrev.disabled = index <= 0;
      btnNext.disabled = index >= Math.max(0, total - visible);
    }

    if (btnPrev) btnPrev.addEventListener('click', () => {
      index = Math.max(0, index - Math.max(1, visibleCount() - 1));
      clampIndex();
      goTo(index);
    });
    if (btnNext) btnNext.addEventListener('click', () => {
      index = Math.min(items().length - visibleCount(), index + Math.max(1, visibleCount() - 1));
      clampIndex();
      goTo(index);
    });

    let isDown = false, startX = 0, startScroll = 0;
    function onPointerDown(e) {
      isDown = true;
      track.setPointerCapture(e.pointerId);
      startX = e.clientX;
      startScroll = index * (itemWidth + gap);
      track.style.transition = 'none';
      e.preventDefault();
    }
    function onPointerMove(e) {
      if (!isDown) return;
      const dx = e.clientX - startX;
      const tx = Math.max(0, startScroll - dx);
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        track.style.transform = `translate3d(-${tx}px,0,0)`;
      });
    }
    function onPointerUp(e) {
      if (!isDown) return;
      isDown = false;
      const dx = e.clientX - startX;
      const moved = Math.round(-dx / (itemWidth + gap));
      index = Math.max(0, index + moved);
      clampIndex();
      goTo(index);
    }

    track.addEventListener('pointerdown', onPointerDown);
    track.addEventListener('pointermove', onPointerMove);
    track.addEventListener('pointerup', onPointerUp);
    track.addEventListener('pointercancel', () => { isDown = false; });

    wrap.tabIndex = 0;
    wrap.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { if (btnPrev) btnPrev.click(); }
      if (e.key === 'ArrowRight') { if (btnNext) btnNext.click(); }
    });

    const updateSizes = debounce(() => {
      itemWidth = calcItemWidth();
      gap = parseFloat(getComputedStyle(track).gap) || 16;
      clampIndex();
      goTo(index, false);
    }, 120);

    const ro = new ResizeObserver(updateSizes);
    ro.observe(wrap);
    const mo = new MutationObserver(updateSizes);
    mo.observe(track, { childList: true });

    window.addEventListener('load', updateSizes);
    window.addEventListener('resize', updateSizes);
    updateSizes();
  }
})();

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Rturox-Tech",
  "description": "Professional web development and digital solutions company",
  "url": "https://www.rturox-tech.com",
  "logo": "https://www.rturox-tech.com/assets/logo.png",
  "sameAs": [
    "https://www.linkedin.com/company/rturox-tech",
    "https://www.instagram.com/rturox.tech"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "email": "you@example.com"
  }
};


/* ======================
   Neural Network / Constellation Animation
   ====================== */
(function initNeuralNetwork() {
  const canvas = document.getElementById('orbCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;

  let particles = [];
  const PARTICLE_COUNT = 60; // Adjust for density
  const CONNECTION_DIST = 180;
  const MOUSE_DIST = 250;

  let mouse = { x: null, y: null };

  // Resize handling
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  }

  window.addEventListener('resize', resize);
  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  document.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.size = Math.random() * 2 + 1;
      this.color = Math.random() > 0.5 ? '#00f3ff' : '#bc13fe'; // Cyan or Purple
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off edges
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interaction
      if (mouse.x != null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MOUSE_DIST) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (MOUSE_DIST - distance) / MOUSE_DIST;
          const directionX = forceDirectionX * force * 0.6;
          const directionY = forceDirectionY * force * 0.6;

          this.vx += directionX;
          this.vy += directionY;
        }
      }

      // Friction
      this.vx *= 0.98;
      this.vy *= 0.98;

      // Minimum movement to keep it alive
      if (Math.abs(this.vx) < 0.1) this.vx += (Math.random() - 0.5) * 0.05;
      if (Math.abs(this.vy) < 0.1) this.vy += (Math.random() - 0.5) * 0.05;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.shadowBlur = 0; // Reset
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connections first
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        let dx = particles[i].x - particles[j].x;
        let dy = particles[i].y - particles[j].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < CONNECTION_DIST) {
          ctx.beginPath();
          let opacity = 1 - (distance / CONNECTION_DIST);
          ctx.strokeStyle = `rgba(100, 116, 139, ${opacity * 0.3})`; // Subtle slate color

          // If close to mouse, light up connections
          if (mouse.x != null) {
            let d1 = Math.sqrt((particles[i].x - mouse.x) ** 2 + (particles[i].y - mouse.y) ** 2);
            if (d1 < MOUSE_DIST) {
              ctx.strokeStyle = `rgba(0, 243, 255, ${opacity * 0.6})`; // Cyan glow
            }
          }

          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Update and draw particles
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  resize();
  animate();
})();
