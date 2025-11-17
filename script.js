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
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
});



/* ======================
   Reusable slider initializer (no dots, arrows only)
   - supports multiple sliders (.team-slider, .projects-slider)
   - touch drag, keyboard arrows, debounced resize
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
      // use translate3d for GPU acceleration
      track.style.transform = `translate3d(-${x}px, 0, 0)`;
      if (!animate) {
        // clear transition after painting
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

    // arrow handlers
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

    // pointer / drag support using requestAnimationFrame
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
      // throttle with rAF
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
    // pointermove / up with passive false on move is not recommended; rAF helps keep smooth
    track.addEventListener('pointermove', onPointerMove);
    track.addEventListener('pointerup', onPointerUp);
    track.addEventListener('pointercancel', () => { isDown = false; });

    // keyboard support (left/right when wrapper focused)
    wrap.tabIndex = 0;
    wrap.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { if (btnPrev) btnPrev.click(); }
      if (e.key === 'ArrowRight') { if (btnNext) btnNext.click(); }
    });

    // responsive / dynamic updates (debounced)
    const updateSizes = debounce(() => {
      itemWidth = calcItemWidth();
      gap = parseFloat(getComputedStyle(track).gap) || 16;
      clampIndex();
      goTo(index, false);
    }, 120);

    // observe wrapper size and track children changes
    const ro = new ResizeObserver(updateSizes);
    ro.observe(wrap);
    const mo = new MutationObserver(updateSizes);
    mo.observe(track, { childList: true });

    // init
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