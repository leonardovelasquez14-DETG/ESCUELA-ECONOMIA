/* =============================================
   ANIMATIONS — Scroll reveal + Counter
   Escuela de Economía, UNT
   ============================================= */

(function () {
  document.addEventListener('DOMContentLoaded', () => {

    // ══════════════════════════════════════════
    // 1. Scroll Reveal (IntersectionObserver)
    // ══════════════════════════════════════════
    const revealEls = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
      );

      revealEls.forEach(el => revealObserver.observe(el));
    } else {
      // Fallback para browsers sin soporte
      revealEls.forEach(el => el.classList.add('visible'));
    }

    // ══════════════════════════════════════════
    // 2. Counter Animation
    // ══════════════════════════════════════════
    function animateCounter(el, target, duration = 2000) {
      const start     = performance.now();
      const startVal  = 0;
      const easeOut   = (t) => 1 - Math.pow(1 - t, 3);

      function update(now) {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const value    = Math.round(startVal + (target - startVal) * easeOut(progress));

        el.textContent = value.toLocaleString('es-PE');

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target.toLocaleString('es-PE');
        }
      }

      requestAnimationFrame(update);
    }

    const counterEls = document.querySelectorAll('[data-counter]');

    if ('IntersectionObserver' in window) {
      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const el     = entry.target;
              const target = parseInt(el.getAttribute('data-counter'), 10);
              animateCounter(el, target, 2200);
              counterObserver.unobserve(el);
            }
          });
        },
        { threshold: 0.5 }
      );

      counterEls.forEach(el => counterObserver.observe(el));
    } else {
      counterEls.forEach(el => {
        el.textContent = parseInt(el.getAttribute('data-counter'), 10).toLocaleString('es-PE');
      });
    }

    // ══════════════════════════════════════════
    // 3. Hero parallax suave
    // ══════════════════════════════════════════
    const heroBg = document.querySelector('.hero__bg');

    if (heroBg) {
      // Trigger hero animation on load
      const hero = document.querySelector('.hero');
      if (hero) {
        setTimeout(() => hero.classList.add('loaded'), 100);
      }

      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
          heroBg.style.transform = `scale(1) translateY(${scrollY * 0.25}px)`;
        }
      }, { passive: true });
    }

    // ══════════════════════════════════════════
    // 4. Formulario de contacto
    // ══════════════════════════════════════════
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;

        btn.innerHTML = '✅ ¡Mensaje enviado!';
        btn.disabled = true;
        btn.style.background = 'linear-gradient(135deg, #1a8a4a, #2dc26e)';

        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
          btn.style.background = '';
          contactForm.reset();
        }, 3500);
      });
    }

    // ══════════════════════════════════════════
    // 5. Botón "volver arriba"
    // ══════════════════════════════════════════
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      }, { passive: true });

      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

  });
})();
