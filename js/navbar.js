/* =============================================
   NAVBAR — Sticky + Mobile hamburger
   Escuela de Economía, UNT
   ============================================= */

(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const navbar    = document.getElementById('navbar');
    const hamburger = document.getElementById('navbar-hamburger');
    const mobileNav = document.getElementById('navbar-mobile');
    const navLinks  = document.querySelectorAll('.navbar__link, .navbar__mobile-link');
    const sections  = document.querySelectorAll('section[id]');

    // ── Scroll effect ──
    function onScroll() {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
      updateActiveLink();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ── Active link on scroll ──
    function updateActiveLink() {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }

    // ── Smooth scroll on link click ──
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const offset = target.offsetTop - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-h')) || 72);
            window.scrollTo({ top: offset, behavior: 'smooth' });
          }
          closeMobileNav();
        }
      });
    });

    // ── Hamburger toggle ──
    if (hamburger && mobileNav) {
      hamburger.addEventListener('click', () => {
        const isOpen = mobileNav.classList.contains('open');
        if (isOpen) {
          closeMobileNav();
        } else {
          openMobileNav();
        }
      });
    }

    function openMobileNav() {
      mobileNav.classList.add('open');
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      hamburger.setAttribute('aria-label', 'Cerrar menú');
      document.body.style.overflow = 'hidden';
    }

    function closeMobileNav() {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.setAttribute('aria-label', 'Abrir menú');
      document.body.style.overflow = '';
    }

    // Cerrar al hacer click fuera
    document.addEventListener('click', (e) => {
      if (mobileNav && mobileNav.classList.contains('open')) {
        if (!navbar.contains(e.target) && !mobileNav.contains(e.target)) {
          closeMobileNav();
        }
      }
    });

    // Cerrar al hacer resize a desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) {
        closeMobileNav();
      }
    });
  });
})();
