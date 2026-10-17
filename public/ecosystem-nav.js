/**
 * Cambridge IGCSE Science Ecosystem - Universal Navigation Bar
 * Custom Web Component (<igcse-nav>) & Standalone Mounting Script
 * 
 * CDN: https://igcse.xyz/ecosystem-nav.js
 * Companion CSS: https://igcse.xyz/ecosystem-nav.css
 * Zero External Dependencies
 */

(function () {
  'use strict';

  // 1. Determine origin base for companion CSS
  let assetOrigin = 'https://igcse.xyz';
  try {
    const currentScript = document.currentScript;
    if (currentScript && currentScript.src) {
      const u = new URL(currentScript.src);
      assetOrigin = u.origin;
    }
  } catch (e) {
    // Fallback to default
  }

  // 2. Auto-inject companion stylesheet if missing
  function injectStylesheet() {
    if (document.querySelector('link[data-igcse-nav-css]')) return;
    const existing = document.querySelector('link[href*="ecosystem-nav.css"]');
    if (existing) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.setAttribute('data-igcse-nav-css', 'true');
    link.href = assetOrigin + '/ecosystem-nav.css';
    document.head.appendChild(link);
  }

  // Run CSS injection early
  if (document.head) {
    injectStylesheet();
  } else {
    document.addEventListener('DOMContentLoaded', injectStylesheet);
  }

  // 3. Ecosystem Destinations Registry
  const ECOSYSTEM_DESTINATIONS = [
    {
      id: 'main',
      emoji: '🏛️',
      name: '教学主母舰',
      url: 'https://igcse.xyz',
      desc: 'Cambridge 0610/0620/0625 全考纲课时与虚拟实验'
    },
    {
      id: 'sky',
      emoji: '🎯',
      name: 'G8 词汇与大练兵',
      url: 'https://sky.igcse.xyz',
      desc: 'Sky G8 科学游戏化词汇与考点攻坚'
    },
    {
      id: 'why',
      emoji: '🌱',
      name: '小问号百科',
      url: 'https://why.igcse.xyz',
      desc: '生活化问题驱动少儿双轨互动百科（G3/G5 专席）'
    },
    {
      id: 'zperiod',
      emoji: '🧪',
      name: '3D 周期表工坊',
      url: 'https://zperiod.igcse.xyz',
      desc: '化学元素 3D 周期表与电子排布可视化'
    }
  ];

  // 4. Navigation Bar DOM Builder
  function renderNavInto(container, activeId) {
    activeId = (activeId || 'main').toLowerCase().trim();
    if (activeId === 'pre') activeId = 'why';

    container.innerHTML = `
      <header class="igcse-nav-wrapper" role="banner">
        <div class="igcse-nav-container">
          <!-- Ecosystem Brand -->
          <a href="https://igcse.xyz" class="igcse-nav-brand" title="Cambridge IGCSE Science · 国际双语教学生态">
            <span class="igcse-nav-brand-badge" aria-hidden="true">🔬</span>
            <span class="igcse-nav-brand-text">
              <span class="igcse-nav-brand-title">Cambridge IGCSE Science</span>
              <span class="igcse-nav-brand-tagline">· 国际双语教学生态</span>
            </span>
          </a>

          <!-- Desktop Pills -->
          <nav class="igcse-nav-pills-nav" aria-label="全域生态导航">
            <ul class="igcse-nav-pills" role="menubar">
              ${ECOSYSTEM_DESTINATIONS.map((dest) => {
                const isActive = dest.id === activeId;
                return `
                  <li class="igcse-nav-pill-item" role="none">
                    <a
                      href="${dest.url}"
                      class="igcse-nav-pill ${isActive ? 'is-active' : ''}"
                      role="menuitem"
                      aria-current="${isActive ? 'page' : 'false'}"
                      title="${dest.name} - ${dest.desc}"
                    >
                      <span>${dest.emoji}</span>
                      <span>${dest.name}</span>
                      ${isActive ? '<span class="igcse-nav-active-dot" aria-hidden="true"></span>' : ''}
                    </a>
                  </li>
                `;
              }).join('')}
            </ul>
          </nav>

          <!-- Mobile Hamburger Toggle -->
          <button
            type="button"
            class="igcse-nav-hamburger"
            aria-label="打开生态全域导航菜单"
            aria-expanded="false"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Mobile Drawer Backdrop -->
        <div class="igcse-nav-backdrop" aria-hidden="true"></div>

        <!-- Mobile Drawer Menu -->
        <div class="igcse-nav-drawer" role="dialog" aria-modal="true" aria-label="全域生态快速穿梭">
          <div class="igcse-nav-drawer-header">Ecosystem Network · 全域穿梭通道</div>
          <ul class="igcse-nav-drawer-list">
            ${ECOSYSTEM_DESTINATIONS.map((dest) => {
              const isActive = dest.id === activeId;
              return `
                <li>
                  <a
                    href="${dest.url}"
                    class="igcse-nav-drawer-link ${isActive ? 'is-active' : ''}"
                    aria-current="${isActive ? 'page' : 'false'}"
                  >
                    <div class="igcse-nav-drawer-left">
                      <span class="igcse-nav-drawer-emoji">${dest.emoji}</span>
                      <div class="igcse-nav-drawer-info">
                        <span class="igcse-nav-drawer-title">${dest.name}</span>
                        <span class="igcse-nav-drawer-desc">${dest.desc}</span>
                      </div>
                    </div>
                    ${isActive ? '<span class="igcse-nav-active-dot" aria-hidden="true"></span>' : ''}
                  </a>
                </li>
              `;
            }).join('')}
          </ul>
        </div>
      </header>
    `;

    // 5. Attach Interactive Events (Hamburger & Drawer)
    const hamburgerBtn = container.querySelector('.igcse-nav-hamburger');
    const drawer = container.querySelector('.igcse-nav-drawer');
    const backdrop = container.querySelector('.igcse-nav-backdrop');

    if (hamburgerBtn && drawer && backdrop) {
      function toggleDrawer(open) {
        const isOpen = open !== undefined ? open : !drawer.classList.contains('is-open');
        if (isOpen) {
          drawer.classList.add('is-open');
          backdrop.classList.add('is-open');
          hamburgerBtn.setAttribute('aria-expanded', 'true');
          hamburgerBtn.innerHTML = `
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          `;
        } else {
          drawer.classList.remove('is-open');
          backdrop.classList.remove('is-open');
          hamburgerBtn.setAttribute('aria-expanded', 'false');
          hamburgerBtn.innerHTML = `
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          `;
        }
      }

      hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDrawer();
      });

      backdrop.addEventListener('click', () => {
        toggleDrawer(false);
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
          toggleDrawer(false);
        }
      });

      // Close drawer upon clicking any link inside
      const drawerLinks = drawer.querySelectorAll('a');
      drawerLinks.forEach((link) => {
        link.addEventListener('click', () => {
          toggleDrawer(false);
        });
      });
    }
  }

  // 6. Custom Element Definition (<igcse-nav active="main">)
  class IgcseNavComponent extends HTMLElement {
    static get observedAttributes() {
      return ['active'];
    }

    connectedCallback() {
      injectStylesheet();
      this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'active' && oldValue !== newValue) {
        this.render();
      }
    }

    render() {
      const active = this.getAttribute('active') || 'main';
      renderNavInto(this, active);
    }
  }

  if (typeof customElements !== 'undefined' && !customElements.get('igcse-nav')) {
    customElements.define('igcse-nav', IgcseNavComponent);
  }

  // 7. Auto-mount scanner for traditional <div id="igcse-ecosystem-nav">
  function scanAndMount() {
    injectStylesheet();
    const targets = document.querySelectorAll('#igcse-ecosystem-nav, [data-igcse-ecosystem-nav]');
    targets.forEach((el) => {
      if (!el.__igcse_mounted) {
        el.__igcse_mounted = true;
        const active = el.getAttribute('data-active') || el.getAttribute('active') || 'main';
        renderNavInto(el, active);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scanAndMount);
  } else {
    scanAndMount();
  }

  // Expose global helper for programmatic control if needed
  window.IgcseEcosystemNav = {
    destinations: ECOSYSTEM_DESTINATIONS,
    render: renderNavInto,
    version: '1.0.0'
  };
})();
