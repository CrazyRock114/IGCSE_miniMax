/**
 * Cambridge IGCSE Science Ecosystem - Universal Navigation Bar
 * Custom Web Component (<igcse-nav>) & Standalone Mounting Script
 *
 * Version: 1.1.0 (Bilingual EN/ZH Auto-Adaptive + Responsive Breakpoint Upgrade)
 * CDN: https://igcse.xyz/ecosystem-nav.js
 * Companion CSS: https://igcse.xyz/ecosystem-nav.css
 * Zero External Dependencies
 */

(function () {
  'use strict';

  const NAV_VERSION = '1.1.0';

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
    if (typeof document === 'undefined') return;
    if (document.querySelector('link[data-igcse-nav-css]')) return;
    const existing = document.querySelector('link[href*="ecosystem-nav.css"]');
    if (existing) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.setAttribute('data-igcse-nav-css', 'true');
    link.href = assetOrigin + '/ecosystem-nav.css';
    if (document.head) {
      document.head.appendChild(link);
    }
  }

  // Run CSS injection early
  if (typeof document !== 'undefined') {
    if (document.head) {
      injectStylesheet();
    } else {
      document.addEventListener('DOMContentLoaded', injectStylesheet);
    }
  }

  // 3. Bilingual UI Copy Dictionary
  const NAV_COPY = {
    en: {
      brandTitle: 'Cambridge IGCSE Science',
      brandTagline: '· Bilingual Learning Ecosystem',
      brandTooltip: 'Cambridge IGCSE Science · Bilingual Learning Ecosystem',
      navAriaLabel: 'Ecosystem navigation',
      hamburgerAriaLabel: 'Open ecosystem navigation menu',
      drawerAriaLabel: 'Ecosystem quick switcher',
      drawerHeader: 'Ecosystem Network · Quick Switcher'
    },
    zh: {
      brandTitle: 'Cambridge IGCSE Science',
      brandTagline: '· 国际双语教学生态',
      brandTooltip: 'Cambridge IGCSE Science · 国际双语教学生态',
      navAriaLabel: '全域生态导航',
      hamburgerAriaLabel: '打开生态全域导航菜单',
      drawerAriaLabel: '全域生态快速穿梭',
      drawerHeader: 'Ecosystem Network · 全域穿梭通道'
    }
  };

  // 4. Ecosystem Destinations Registry (Bilingual EN / ZH)
  const ECOSYSTEM_DESTINATIONS = [
    {
      id: 'main',
      emoji: '🏛️',
      name: {
        en: 'Main Hub',
        zh: '教学主母舰'
      },
      url: 'https://igcse.xyz',
      desc: {
        en: 'Cambridge 0610/0620/0625 full-syllabus lessons & virtual labs',
        zh: 'Cambridge 0610/0620/0625 全考纲课时与虚拟实验'
      }
    },
    {
      id: 'pre',
      emoji: '🌱',
      name: {
        en: 'Junior Science',
        zh: '低年级自然科学'
      },
      url: 'https://pre.igcse.xyz',
      desc: {
        en: 'Bilingual junior science concept explorer (SciencePre)',
        zh: '低年级双语科学概念启蒙营（SciencePre）'
      }
    },
    {
      id: 'sky',
      emoji: '🎯',
      name: {
        en: 'G8 Vocab & Arena',
        zh: 'G8 词汇与大练兵'
      },
      url: 'https://sky.igcse.xyz',
      desc: {
        en: 'Sky G8 gamified science vocabulary & exam practice',
        zh: 'Sky G8 科学游戏化词汇与考点攻坚'
      }
    },
    {
      id: 'why',
      emoji: '❓',
      name: {
        en: 'Why Lab',
        zh: '小问号百科'
      },
      url: 'https://why.igcse.xyz',
      desc: {
        en: 'Curiosity-driven interactive science encyclopedia (G3/G5)',
        zh: '生活化问题驱动少儿双轨互动百科（G3/G5 专席）'
      }
    },
    {
      id: 'zperiod',
      emoji: '🧪',
      name: {
        en: '3D Periodic',
        zh: '3D 周期表工坊'
      },
      url: 'https://zperiod.igcse.xyz',
      desc: {
        en: '3D periodic table & electron configuration visualizer',
        zh: '化学元素 3D 周期表与电子排布可视化'
      }
    },
    {
      id: 'phet',
      emoji: '⚗️',
      name: {
        en: 'PhET Sims',
        zh: 'PhET 仿真实验台'
      },
      url: 'https://phet.igcse.xyz',
      desc: {
        en: '42 HTML5 interactive physics & chemistry simulations',
        zh: '42 款 HTML5 交互式物理化学经典实验仿真'
      }
    }
  ];

  // 5. Language Resolution Helper
  function resolveLang(container, explicitLang) {
    const raw =
      explicitLang ||
      (container &&
        container.getAttribute &&
        (container.getAttribute('lang') || container.getAttribute('data-lang'))) ||
      (typeof document !== 'undefined' && document.documentElement && document.documentElement.lang) ||
      'en';
    const normalized = String(raw).toLowerCase().trim();
    if (normalized.startsWith('zh')) return 'zh';
    if (normalized.startsWith('en')) return 'en';
    return 'en';
  }

  function pickLocaleText(value, lang) {
    if (typeof value === 'string') return value;
    if (value && typeof value === 'object') {
      return value[lang] || value.en || value.zh || '';
    }
    return '';
  }

  // 6. Navigation Bar DOM Builder
  function renderNavInto(container, activeId, explicitLang) {
    activeId = (activeId || 'main').toLowerCase().trim();
    const lang = resolveLang(container, explicitLang);
    const copy = NAV_COPY[lang] || NAV_COPY.en;

    // Remove previous document-level keydown handler if re-rendering
    if (container.__igcse_keydown_handler && typeof document !== 'undefined') {
      document.removeEventListener('keydown', container.__igcse_keydown_handler);
      container.__igcse_keydown_handler = null;
    }

    container.setAttribute('data-resolved-lang', lang);

    container.innerHTML = `
      <header class="igcse-nav-wrapper" role="banner">
        <div class="igcse-nav-container">
          <!-- Ecosystem Brand -->
          <a href="https://igcse.xyz" class="igcse-nav-brand" title="${copy.brandTooltip}">
            <span class="igcse-nav-brand-badge" aria-hidden="true">🔬</span>
            <span class="igcse-nav-brand-text">
              <span class="igcse-nav-brand-title">${copy.brandTitle}</span>
              <span class="igcse-nav-brand-tagline">${copy.brandTagline}</span>
            </span>
          </a>

          <!-- Desktop Pills -->
          <nav class="igcse-nav-pills-nav" aria-label="${copy.navAriaLabel}">
            <ul class="igcse-nav-pills" role="menubar">
              ${ECOSYSTEM_DESTINATIONS.map((dest) => {
                const isActive = dest.id === activeId;
                const destName = pickLocaleText(dest.name, lang);
                const destDesc = pickLocaleText(dest.desc, lang);
                return `
                  <li class="igcse-nav-pill-item" role="none">
                    <a
                      href="${dest.url}"
                      class="igcse-nav-pill ${isActive ? 'is-active' : ''}"
                      role="menuitem"
                      aria-current="${isActive ? 'page' : 'false'}"
                      title="${destName} - ${destDesc}"
                    >
                      <span>${dest.emoji}</span>
                      <span>${destName}</span>
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
            aria-label="${copy.hamburgerAriaLabel}"
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
        <div class="igcse-nav-drawer" role="dialog" aria-modal="true" aria-label="${copy.drawerAriaLabel}">
          <div class="igcse-nav-drawer-header">${copy.drawerHeader}</div>
          <ul class="igcse-nav-drawer-list">
            ${ECOSYSTEM_DESTINATIONS.map((dest) => {
              const isActive = dest.id === activeId;
              const destName = pickLocaleText(dest.name, lang);
              const destDesc = pickLocaleText(dest.desc, lang);
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
                        <span class="igcse-nav-drawer-title">${destName}</span>
                        <span class="igcse-nav-drawer-desc">${destDesc}</span>
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

    // 7. Attach Interactive Events (Hamburger & Drawer)
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

      const keydownHandler = (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
          toggleDrawer(false);
        }
      };
      container.__igcse_keydown_handler = keydownHandler;
      document.addEventListener('keydown', keydownHandler);

      // Close drawer upon clicking any link inside
      const drawerLinks = drawer.querySelectorAll('a');
      drawerLinks.forEach((link) => {
        link.addEventListener('click', () => {
          toggleDrawer(false);
        });
      });
    }
  }

  // 8. Shared <html lang> MutationObserver for instant bilingual re-render
  const subscribedRenderers = new Set();
  let htmlLangObserver = null;

  function ensureHtmlLangObserver() {
    if (
      htmlLangObserver ||
      typeof MutationObserver === 'undefined' ||
      typeof document === 'undefined' ||
      !document.documentElement
    ) {
      return;
    }

    htmlLangObserver = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'lang') {
          subscribedRenderers.forEach((fn) => fn());
          break;
        }
      }
    });

    htmlLangObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang']
    });
  }

  // 9. Custom Element Definition (<igcse-nav active="main" lang="en">)
  if (typeof HTMLElement !== 'undefined') {
    class IgcseNavComponent extends HTMLElement {
      static get observedAttributes() {
        return ['active', 'lang'];
      }

      connectedCallback() {
        injectStylesheet();
        this._onHtmlLangChange = () => {
          if (!this.getAttribute('lang')) {
            this.render();
          }
        };
        subscribedRenderers.add(this._onHtmlLangChange);
        ensureHtmlLangObserver();
        this.render();
      }

      disconnectedCallback() {
        if (this._onHtmlLangChange) {
          subscribedRenderers.delete(this._onHtmlLangChange);
        }
        if (this.__igcse_keydown_handler && typeof document !== 'undefined') {
          document.removeEventListener('keydown', this.__igcse_keydown_handler);
          this.__igcse_keydown_handler = null;
        }
      }

      attributeChangedCallback(name, oldValue, newValue) {
        if ((name === 'active' || name === 'lang') && oldValue !== newValue) {
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
  }

  // 10. Auto-mount scanner for traditional <div id="igcse-ecosystem-nav">
  function scanAndMount() {
    if (typeof document === 'undefined') return;
    injectStylesheet();
    const targets = document.querySelectorAll('#igcse-ecosystem-nav, [data-igcse-ecosystem-nav]');
    targets.forEach((el) => {
      if (!el.__igcse_mounted) {
        el.__igcse_mounted = true;
        const mountRender = () => {
          const active = el.getAttribute('data-active') || el.getAttribute('active') || 'main';
          renderNavInto(el, active);
        };
        subscribedRenderers.add(mountRender);
        ensureHtmlLangObserver();
        mountRender();
      }
    });
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', scanAndMount);
    } else {
      scanAndMount();
    }
  }

  // Expose global helper for programmatic control if needed
  if (typeof window !== 'undefined') {
    window.IgcseEcosystemNav = {
      destinations: ECOSYSTEM_DESTINATIONS,
      copy: NAV_COPY,
      resolveLang: resolveLang,
      render: renderNavInto,
      version: NAV_VERSION
    };
  }
})();
