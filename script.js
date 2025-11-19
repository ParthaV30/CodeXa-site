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
   Cursor Tracking
   ====================== */
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  const container = document.getElementById('spiderWebContainer');
  if (container) {
    const offsetX = (mouseX / window.innerWidth - 0.5) * 30;
    const offsetY = (mouseY / window.innerHeight - 0.5) * 30;
    container.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  }
});

/* ======================
   Spider Web Canvas Animation
   ====================== */
(function initSpiderWeb() {
  const canvas = document.getElementById('spiderCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const spiders = [];
  const webNodes = [];
  
  class Spider {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
      this.size = Math.random() * 4 + 2;
      this.angle = 0;
    }
    
    update() {
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 200) {
        this.vx -= (dx / dist) * 0.3;
        this.vy -= (dy / dist) * 0.3;
      }
      
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 0.98;
      this.vy *= 0.98;
      this.angle += 0.05;
      
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.fillStyle = '#d32f2f';
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ff6b35';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 1.5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }
  
  function initWeb() {
    webNodes.length = 0;
    const cols = 12, rows = 8;
    const spacingX = canvas.width / cols;
    const spacingY = canvas.height / rows;
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        webNodes.push({
          x: i * spacingX + spacingX / 2,
          y: j * spacingY + spacingY / 2,
          ox: i * spacingX + spacingX / 2,
          oy: j * spacingY + spacingY / 2,
          vx: 0,
          vy: 0
        });
      }
    }
  }
  
  function drawWeb() {
    const cols = 12;
    ctx.strokeStyle = 'rgba(255, 107, 53, 0.2)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < webNodes.length; i++) {
      const node = webNodes[i];
      if ((i + 1) % cols !== 0) {
        const next = webNodes[i + 1];
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(next.x, next.y);
        ctx.stroke();
      }
      if (i + cols < webNodes.length) {
        const below = webNodes[i + cols];
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(below.x, below.y);
        ctx.stroke();
      }
    }
  }
  
  function updateWeb() {
    webNodes.forEach(node => {
      const dx = mouseX - node.x;
      const dy = mouseY - node.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 150) {
        node.vx += (dx / dist) * 0.15;
        node.vy += (dy / dist) * 0.15;
      }
      
      node.vx *= 0.92;
      node.vy *= 0.92;
      node.x += node.vx;
      node.y += node.vy;
      
      const restoreDx = node.ox - node.x;
      const restoreDy = node.oy - node.y;
      node.vx += restoreDx * 0.02;
      node.vy += restoreDy * 0.02;
    });
  }
  
  for (let i = 0; i < 8; i++) spiders.push(new Spider());
  initWeb();
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    updateWeb();
    drawWeb();
    
    spiders.forEach(s => {
      s.update();
      s.draw();
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initWeb();
  });
})();

/* ======================
   3D Spider Web (Three.js)
   ====================== */
(function init3DWeb() {
  const container = document.getElementById('spiderWebContainer');
  if (!container || typeof THREE === 'undefined') return;
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  
  renderer.setSize(400, 400);
  renderer.setClearColor(0x000000, 0.1);
  container.appendChild(renderer.domElement);
  
  camera.position.z = 5;
  
  const geometry = new THREE.BufferGeometry();
  const positions = [];
  const cols = 6, rows = 6;
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      positions.push(
        (i - cols / 2) * 0.8,
        (j - rows / 2) * 0.8,
        Math.sin(i * 0.5) * Math.cos(j * 0.5) * 0.5
      );
    }
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
  
  const material = new THREE.LineBasicMaterial({ color: 0xff6b35, linewidth: 2 });
  const lines = new THREE.LineSegments(geometry, material);
  scene.add(lines);
  
  const sphereGeom = new THREE.SphereGeometry(0.15, 8, 8);
  const sphereMat = new THREE.MeshBasicMaterial({ color: 0xd32f2f });
  const spider = new THREE.Mesh(sphereGeom, sphereMat);
  spider.position.set(0, 0, 0);
  scene.add(spider);
  
  let time = 0;
  function animate() {
    time += 0.01;
    const normX = (mouseX / window.innerWidth) * 2 - 1;
    const normY = -(mouseY / window.innerHeight) * 2 + 1;
    lines.rotation.x = normY * 0.3;
    lines.rotation.y = normX * 0.3;
    spider.position.x = Math.sin(time) * 2 + normX * 0.5;
    spider.position.y = Math.cos(time * 0.7) * 2 + normY * 0.5;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  
  animate();
})();
