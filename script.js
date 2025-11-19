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
   Multiple Orb Webs with Spider Bots
   ====================== */
(function initOrbWebs() {
  const canvas = document.getElementById('orbCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const orbs = [];
  const spiders = [];
  let mouseX = 0, mouseY = 0;
  let imageBounds = [];
  let spawnProgress = 0;
  const SPAWN_DURATION = 400;
  
  function updateImageBounds() {
    imageBounds = [];
    document.querySelectorAll('img').forEach(img => {
      const rect = img.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        imageBounds.push({
          x: rect.left + window.scrollX,
          y: rect.top + window.scrollY,
          width: rect.width,
          height: rect.height
        });
      }
    });
  }
  
  function isOverImage(x, y) {
    return imageBounds.some(img => 
      x >= img.x && x <= img.x + img.width &&
      y >= img.y && y <= img.y + img.height
    );
  }
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  class OrbWeb {
    constructor(centerX, centerY) {
      this.centerX = centerX;
      this.centerY = centerY;
      this.nodes = [];
      this.connections = [];
      this.initOrb();
    }
    
    initOrb() {
      this.nodes = [];
      this.connections = [];
      const layers = 3;
      const nodesPerLayer = 6;
      
      this.nodes.push({
        x: this.centerX,
        y: this.centerY,
        ox: this.centerX,
        oy: this.centerY,
        vx: 0,
        vy: 0,
        layer: 0
      });
      
      for (let l = 1; l <= layers; l++) {
        const radius = 60 * l;
        for (let i = 0; i < nodesPerLayer; i++) {
          const angle = (i / nodesPerLayer) * Math.PI * 2;
          const x = this.centerX + Math.cos(angle) * radius;
          const y = this.centerY + Math.sin(angle) * radius;
          this.nodes.push({
            x, y, ox: x, oy: y,
            vx: 0, vy: 0,
            layer: l
          });
        }
      }
      
      for (let i = 0; i < this.nodes.length; i++) {
        for (let j = i + 1; j < this.nodes.length; j++) {
          const n1 = this.nodes[i];
          const n2 = this.nodes[j];
          const layerDiff = Math.abs(n1.layer - n2.layer);
          
          if (layerDiff === 1 || (n1.layer === 0 && n2.layer === 1)) {
            this.connections.push([i, j]);
          }
        }
      }
    }
    
    update() {
      this.nodes.forEach((node) => {
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 200) {
          node.vx += (dx / dist) * 0.08;
          node.vy += (dy / dist) * 0.08;
        }
        
        node.vx *= 0.92;
        node.vy *= 0.92;
        node.x += node.vx;
        node.y += node.vy;
        
        const restoreDx = node.ox - node.x;
        const restoreDy = node.oy - node.y;
        node.vx += restoreDx * 0.03;
        node.vy += restoreDy * 0.03;
      });
    }
    
    draw(progress) {
      ctx.strokeStyle = 'rgba(255, 107, 53, 0.2)';
      ctx.lineWidth = 1;
      this.connections.forEach(([i, j]) => {
        const n1 = this.nodes[i];
        const n2 = this.nodes[j];
        if (!isOverImage(n1.x, n1.y) && !isOverImage(n2.x, n2.y)) {
          const minX = Math.min(n1.x, n2.x);
          const spawnX = minX / window.innerWidth;
          if (progress >= spawnX) {
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      });
      
      this.nodes.forEach((node, idx) => {
        if (isOverImage(node.x, node.y)) return;
        const spawnX = node.x / window.innerWidth;
        if (progress < spawnX) return;
        
        const size = idx === 0 ? 4 : 2;
        const glowColor = idx === 0 ? 'rgba(255, 107, 53, 0.2)' : 'rgba(211, 47, 47, 0.15)';
        const color = idx === 0 ? 'rgba(255, 107, 53, 0.6)' : 'rgba(211, 47, 47, 0.5)';
        
        ctx.fillStyle = glowColor;
        ctx.beginPath();
        ctx.arc(node.x, node.y, size * 3, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        ctx.fill();
      });
    }
  }
  
  class Spider {
    constructor(orbIndex) {
      this.orbIndex = orbIndex;
      this.nodeIndex = 0;
      this.nextNodeIndex = 1;
      this.progress = 0;
      this.speed = 0.002 + Math.random() * 0.002;
      this.angle = 0;
      this.legPhase = 0;
    }
    
    update() {
      this.progress += this.speed;
      if (this.progress >= 1) {
        this.progress = 0;
        this.nodeIndex = this.nextNodeIndex;
        const orb = orbs[this.orbIndex];
        if (orb) {
          this.nextNodeIndex = Math.floor(Math.random() * orb.nodes.length);
        }
      }
      
      const orb = orbs[this.orbIndex];
      if (orb && orb.nodes[this.nextNodeIndex]) {
        const n1 = orb.nodes[this.nodeIndex];
        const n2 = orb.nodes[this.nextNodeIndex];
        this.angle = Math.atan2(n2.y - n1.y, n2.x - n1.x);
      }
      
      this.legPhase += 0.1;
    }
    
    draw() {
      const orb = orbs[this.orbIndex];
      if (!orb || !orb.nodes[this.nodeIndex] || !orb.nodes[this.nextNodeIndex]) return;
      
      const n1 = orb.nodes[this.nodeIndex];
      const n2 = orb.nodes[this.nextNodeIndex];
      const x = n1.x + (n2.x - n1.x) * this.progress;
      const y = n1.y + (n2.y - n1.y) * this.progress;
      
      if (isOverImage(x, y)) return;
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(this.angle);
      ctx.fillStyle = 'rgba(211, 47, 47, 0.9)';
      ctx.strokeStyle = 'rgba(211, 47, 47, 0.9)';
      ctx.lineWidth = 0.8;
      
      ctx.beginPath();
      ctx.arc(0, -1, 1, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.ellipse(0, 0.2, 1, 1.5, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.ellipse(0, 2, 1.2, 1.2, 0, 0, Math.PI * 2);
      ctx.fill();
      
      for (let i = 0; i < 4; i++) {
        const side = i < 2 ? -1 : 1;
        const yOff = (i % 2) * 1.2 - 0.6;
        const legBend = Math.sin(this.legPhase + i * Math.PI / 2) * 0.5;
        ctx.beginPath();
        ctx.moveTo(side * 1, yOff);
        ctx.lineTo(side * (3 + legBend), yOff + 0.8);
        ctx.stroke();
      }
      
      for (let i = 0; i < 4; i++) {
        const side = i < 2 ? -1 : 1;
        const yOff = (i % 2) * 1.2 + 0.6;
        const legBend = Math.sin(this.legPhase + i * Math.PI / 2 + Math.PI / 4) * 0.5;
        ctx.beginPath();
        ctx.moveTo(side * 1, yOff);
        ctx.lineTo(side * (3 + legBend), yOff + 1);
        ctx.stroke();
      }
      
      ctx.restore();
    }
  }
  
  function createOrbs() {
    orbs.length = 0;
    const cols = Math.ceil(window.innerWidth / 400);
    const rows = Math.ceil(window.innerHeight / 400);
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = (i + 0.5) * (window.innerWidth / cols);
        const y = (j + 0.5) * (window.innerHeight / rows);
        orbs.push(new OrbWeb(x, y));
      }
    }
  }
  
  createOrbs();
  updateImageBounds();
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (spawnProgress < 1) {
      spawnProgress += 1 / SPAWN_DURATION;
    }
    
    orbs.forEach(orb => {
      orb.update();
      orb.draw(spawnProgress);
    });
    
    if (spawnProgress >= 0.6) {
      spiders.forEach(spider => {
        spider.update();
        spider.draw();
      });
    }
    
    if (spawnProgress >= 1 && spiders.length === 0) {
      for (let i = 0; i < Math.min(orbs.length, 12); i++) {
        spiders.push(new Spider(i));
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
  
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '1';
  canvas.style.pointerEvents = 'none';
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createOrbs();
    updateImageBounds();
  });
  
  window.addEventListener('scroll', updateImageBounds);
  document.addEventListener('load', updateImageBounds, true);
})();
