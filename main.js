import { projects, capabilities, skillsData, companyInfo } from './projects-data.js';

/* ==========================================================================
   STATE & INITIALIZATION
   ========================================================================== */
let currentCategory = 'all';
let currentSkillTab = 'frontend';
let activeProject = null;

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCanvas();
  renderCapabilities();
  renderProjects();
  initProjectFilters();
  renderSkills();
  initSkillTabs();
  initTerminal();
  initContactForm();
  initModalEvents();
});

/* ==========================================================================
   THEME TOGGLE
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('ireri-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeIcon(theme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('ireri-theme', nextTheme);
      updateThemeIcon(nextTheme);
      showToast(`Switched to ${nextTheme} mode`);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.innerHTML = theme === 'dark'
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  }
}

/* ==========================================================================
   AMBIENT PARTICLE CANVAS
   ========================================================================== */
function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;
  
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 20), 60);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? 'rgba(16, 185, 129, ' : 'rgba(6, 182, 212, '
    });
  }

  let mouseX = -1000;
  let mouseY = -1000;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + '0.6)';
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(16, 185, 129, ${0.15 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }

      const mdx = p.x - mouseX;
      const mdy = p.y - mouseY;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < 130) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = `rgba(6, 182, 212, ${0.25 * (1 - mdist / 130)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   ENGINEERING CAPABILITIES (IRERI DEVELOPERS)
   ========================================================================== */
function renderCapabilities() {
  const grid = document.getElementById('capabilities-grid');
  if (!grid) return;

  grid.innerHTML = capabilities.map(cap => `
    <div class="capability-card">
      <div class="capability-icon-box">${cap.icon}</div>
      <h3 class="capability-title">${cap.title}</h3>
      <p class="capability-desc">${cap.description}</p>
    </div>
  `).join('');
}

/* ==========================================================================
   PROJECTS RENDERING & FILTERING
   ========================================================================== */
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const filtered = currentCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === currentCategory);

  grid.innerHTML = filtered.map(p => `
    <article class="project-card" id="card-${p.id}">
      <div class="project-img-wrapper">
        <img class="project-img" src="${p.image}" alt="${p.title}" loading="lazy" />
        <span class="project-badge-tag">${p.badge}</span>
      </div>
      <div class="project-body">
        <div class="project-meta-top">
          <span class="project-category">${p.category}</span>
          <span class="project-stats-pill">${p.stats}</span>
        </div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.tagline}</p>
        
        <div class="project-tech-tags">
          ${p.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>

        <div class="project-footer-actions">
          <button class="btn-details" onclick="window.openProjectModal('${p.id}')">
            Architecture & Deep Dive &rarr;
          </button>
          ${p.liveUrl !== '#' ? `
            <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="action-link" title="Visit Live Platform">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          ` : ''}
          <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="action-link" title="View Source">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
          </a>
        </div>
      </div>
    </article>
  `).join('');
}

function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      renderProjects();
    });
  });
}

/* ==========================================================================
   PROJECT DEEP DIVE MODAL
   ========================================================================== */
window.openProjectModal = function(projectId) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return;
  activeProject = project;

  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-dynamic-content');

  modalContent.innerHTML = `
    <div class="modal-image-header">
      <img src="${project.image}" alt="${project.title}" />
      <span class="project-badge-tag" style="top:1.5rem; right:1.5rem;">${project.badge}</span>
    </div>
    <div class="modal-body">
      <div>
        <span class="project-category">${project.category} · ${project.stats}</span>
        <h2 style="font-size:2rem; margin-top:0.4rem;">${project.title}</h2>
        <p style="font-size:1.1rem; color:var(--text-muted); margin-top:0.4rem;">${project.tagline}</p>
      </div>

      <div>
        <h4 class="modal-section-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
          Platform Overview
        </h4>
        <p style="line-height:1.7;">${project.description}</p>
      </div>

      <div>
        <h4 class="modal-section-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" stroke-width="2"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
          System Architecture Flow
        </h4>
        <div class="modal-architecture-box">${project.architecture}</div>
      </div>

      <div>
        <h4 class="modal-section-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          Key Engineering Highlights & Challenges Solved
        </h4>
        <ul class="modal-highlights-list">
          ${project.highlights.map(h => `
            <li class="modal-highlight-item">
              <span style="color:var(--accent-emerald); font-weight:bold;">&check;</span>
              <span>${h}</span>
            </li>
          `).join('')}
        </ul>
      </div>

      <div>
        <h4 class="modal-section-title">Technologies Used</h4>
        <div class="project-tech-tags">
          ${project.techStack.map(t => `<span class="tech-tag" style="font-size:0.85rem; padding:0.4rem 0.8rem;">${t}</span>`).join('')}
        </div>
      </div>

      <div class="modal-actions">
        ${project.liveUrl !== '#' ? `
          <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary">
            Visit Live Application &rarr;
          </a>
        ` : ''}
        <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-secondary">
          View Repository on GitHub
        </a>
      </div>
    </div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
};

function initModalEvents() {
  const modal = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

function closeModal() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   SKILLS TABS & PROFICIENCY
   ========================================================================== */
function renderSkills() {
  const container = document.getElementById('skills-grid');
  if (!container) return;

  const list = skillsData[currentSkillTab] || [];
  container.innerHTML = list.map(s => `
    <div class="skill-card">
      <div class="skill-header">
        <span class="skill-name">${s.name}</span>
        <span class="skill-tag">${s.tag}</span>
      </div>
      <div class="skill-bar-track">
        <div class="skill-bar-fill" style="width: ${s.level};"></div>
      </div>
    </div>
  `).join('');
}

function initSkillTabs() {
  const tabs = document.querySelectorAll('.skill-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentSkillTab = tab.getAttribute('data-tab');
      renderSkills();
    });
  });
}

/* ==========================================================================
   DEVELOPER CLI TERMINAL
   ========================================================================== */
function initTerminal() {
  const terminalInput = document.getElementById('terminal-input');
  const terminalBody = document.getElementById('terminal-body');
  const cmdBadges = document.querySelectorAll('.cmd-badge');

  if (!terminalInput || !terminalBody) return;

  const commands = {
    help: () => `
Available developer commands:
  <span class="highlight">help</span>       - Displays this command reference
  <span class="highlight">about</span>      - Studio overview & leadership
  <span class="highlight">projects</span>   - Flagship web platforms & tools
  <span class="highlight">skills</span>     - Technical capabilities & stack
  <span class="highlight">contact</span>    - Direct communication channels
  <span class="highlight">theme</span>      - Toggle light/dark interface
  <span class="highlight">clear</span>      - Clear terminal screen
    `,
    about: () => `
<span class="highlight">IRERI DEVELOPERS</span>
Full-Stack Software Engineering Studio
Founder & Lead Engineer: <span class="cyan">Brian Macharia Ireri</span>
Location: Kenya (Nairobi / Nyeri)
Specializations: Next.js (App & Pages), Node.js Microservices, Scalable Web Systems, API & Database Architecture.
Creators of <span class="cyan">Kabila La Vijana</span> (3,000+ youth reached) and the <span class="highlight">DeKUTSO Comrade Choice Award</span> platform.
    `,
    projects: () => `
<span class="highlight">Featured Platforms by Ireri Developers:</span>
  1. <span class="cyan">Kabila La Vijana</span> - Nationwide youth empowerment portal across 47 counties
  2. <span class="cyan">DeKUTSO Comrade Choice Award</span> - Official DeKUT student recognition & voting platform
  3. <span class="cyan">Offline Spotify (Kirikusa)</span> - Local audio streaming engine with QR mobile remote & AI DJ
  4. <span class="cyan">SnippAI Code Hub</span> - AI developer code management suite
  5. <span class="cyan">StrikeMarkets</span> - Live market analytics & data stream
    `,
    skills: () => `
<span class="highlight">Technical Arsenal:</span>
  Frontend     : Next.js (App & Pages), React 19, TypeScript, Modern CSS
  Backend      : Node.js, Express, REST APIs, WebSockets, Microservices
  Databases    : PostgreSQL, Supabase RLS, Redis Caching, Linux Server Ops
  Integrations : Payment Gateways (M-Pesa STK, PayHero, Stripe), HMAC Webhooks, Cloud APIs
    `,
    contact: () => `
<span class="highlight">Get in Touch with Ireri Developers:</span>
  Lead Engineer: Brian Macharia Ireri
  Email        : <a href="mailto:ekusafamily014@gmail.com" class="cyan">ekusafamily014@gmail.com</a>
  GitHub       : <a href="https://github.com/ekusafamily" target="_blank" class="cyan">github.com/ekusafamily</a>
  WhatsApp     : <a href="https://wa.me/254712345678" target="_blank" class="cyan">Chat Directly</a>
    `,
    theme: () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('ireri-theme', nextTheme);
      updateThemeIcon(nextTheme);
      return `Theme switched to: <span class="highlight">${nextTheme}</span> mode.`;
    },
    clear: () => {
      terminalBody.innerHTML = '';
      return '';
    }
  };

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const rawCmd = terminalInput.value.trim().toLowerCase();
      terminalInput.value = '';
      executeCommand(rawCmd);
    }
  });

  cmdBadges.forEach(badge => {
    badge.addEventListener('click', () => {
      const cmd = badge.getAttribute('data-cmd');
      executeCommand(cmd);
    });
  });

  function executeCommand(cmd) {
    if (!cmd) return;

    const inputEcho = document.createElement('div');
    inputEcho.innerHTML = `<span class="terminal-prompt">$ ireri</span> <span>${cmd}</span>`;
    terminalBody.appendChild(inputEcho);

    if (commands[cmd]) {
      const result = commands[cmd]();
      if (result) {
        const outputRow = document.createElement('div');
        outputRow.className = 'terminal-output';
        outputRow.innerHTML = result;
        terminalBody.appendChild(outputRow);
      }
    } else {
      const errorRow = document.createElement('div');
      errorRow.className = 'terminal-output';
      errorRow.innerHTML = `<span style="color:#EF4444;">Command not found: "${cmd}". Type "help" for valid commands.</span>`;
      terminalBody.appendChild(errorRow);
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
  }
}

/* ==========================================================================
   CONTACT FORM & TOAST
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const message = document.getElementById('form-message').value.trim();

    if (!name || !email || !message) {
      alert('Please fill out all required fields.');
      return;
    }

    const subject = encodeURIComponent(`Project Inquiry for Ireri Developers from ${name}`);
    const body = encodeURIComponent(`Hello Brian,\n\n${message}\n\nFrom: ${name} (${email})`);
    
    showToast('Opening email client to reach Ireri Developers...');
    
    setTimeout(() => {
      window.location.href = `mailto:ekusafamily014@gmail.com?subject=${subject}&body=${body}`;
      form.reset();
    }, 700);
  });
}

function showToast(message) {
  const toast = document.getElementById('toast-notice');
  if (!toast) return;

  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
    <span>${message}</span>
  `;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}
