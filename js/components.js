/* =============================================
   COMPONENTS.JS — Navbar + Footer compartidos
   Escuela de Economía, UNT
   Inyecta el navbar y footer en todas las páginas
   ============================================= */

(function () {

  /* ── Páginas de navegación ── */
  const NAV_PAGES = [
    { href: 'index.html',        label: 'Inicio',        icon: '🏛️' },
    { href: 'nosotros.html',     label: 'Nosotros',      icon: '📖' },
    { href: 'programas.html',    label: 'Programas',     icon: '🎓' },
    { href: 'noticias.html',     label: 'Noticias',      icon: '📰' },
    { href: 'investigacion.html',label: 'Investigación', icon: '🔬' },
    { href: 'docentes.html',     label: 'Docentes',      icon: '👨‍🏫' },
    { href: 'egresados.html',    label: 'Egresados',     icon: '💼' },
    { href: 'contacto.html',     label: 'Contacto',      icon: '📍' },
  ];

  /* ── Detectar página actual ── */
  const rawPath   = window.location.pathname.split('/').pop();
  const CURRENT   = rawPath === '' ? 'index.html' : (rawPath || 'index.html');

  /* ── Construir links del navbar ── */
  const desktopLinks = NAV_PAGES.map(p =>
    `<a href="${p.href}" class="navbar__link${p.href === CURRENT ? ' active' : ''}">${p.label}</a>`
  ).join('\n');

  const mobileLinks = NAV_PAGES.map(p =>
    `<a href="${p.href}" class="navbar__mobile-link${p.href === CURRENT ? ' active' : ''}">${p.icon} ${p.label}</a>`
  ).join('\n');

  /* ── HTML del Navbar ── */
  const NAVBAR_HTML = `
    <header id="navbar" class="navbar" role="banner">
      <div class="container">
        <div class="navbar__inner">

          <a href="index.html" class="navbar__brand" aria-label="Inicio — Escuela de Economía UNT">
            <img src="assets/logo/logo_unt.png" alt="Escudo UNT" class="navbar__logo" />
            <div class="navbar__brand-text">
              <span class="navbar__brand-title">Universidad Nacional de Trujillo</span>
              <span class="navbar__brand-sub">Escuela de Economía</span>
            </div>
          </a>

          <nav class="navbar__nav" role="navigation" aria-label="Menú principal">
            ${desktopLinks}
          </nav>

          <div class="navbar__actions">
            <button
              id="navbar-hamburger"
              class="navbar__hamburger"
              aria-label="Abrir menu"
              aria-expanded="false"
              aria-controls="navbar-mobile"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>

        </div>
      </div>
    </header>

    <nav id="navbar-mobile" class="navbar__mobile" role="navigation" aria-label="Menú móvil">
      ${mobileLinks}
    </nav>
  `;

  /* ── HTML del Footer ── */
  const FOOTER_HTML = `
    <footer class="footer" role="contentinfo">
      <div class="container">
        <div class="footer__grid">

          <div class="footer__brand">
            <div class="footer__logo-wrap">
              <img src="assets/logo/logo_unt.png" alt="Escudo UNT" class="footer__logo" />
              <div>
                <div class="footer__brand-name">Escuela de Economía</div>
                <div class="footer__brand-sub">Universidad Nacional de Trujillo</div>
              </div>
            </div>
            <p class="footer__desc">
              Formamos economistas con excelencia académica, visión crítica y
              compromiso con el desarrollo sostenible del norte del Perú.
            </p>
            <div class="footer__social">
              <a href="https://www.facebook.com/EscuelaProfesionaldeEconomiaUNT" class="footer__social-btn" aria-label="Facebook" id="footer-facebook" target="_blank" rel="noopener"><i class="fab fa-facebook-f"></i></a>
              <a href="https://www.instagram.com/escuela_de_economia_unt" class="footer__social-btn" aria-label="Instagram" id="footer-instagram" target="_blank" rel="noopener"><i class="fab fa-instagram"></i></a>
              <a href="https://www.youtube.com/channel/UC-zYF1Th2JCRxCxurCaKisw" class="footer__social-btn" aria-label="YouTube" id="footer-youtube" target="_blank" rel="noopener"><i class="fab fa-youtube"></i></a>
              <a href="https://www.linkedin.com/school/universidad-nacional-de-trujillo/" class="footer__social-btn" aria-label="LinkedIn" id="footer-linkedin" target="_blank" rel="noopener"><i class="fab fa-linkedin-in"></i></a>
            </div>
          </div>

          <div>
            <div class="footer__col-title">Escuela</div>
            <div class="footer__links">
              <a href="nosotros.html"      class="footer__link"><i class="fa-solid fa-chevron-right" style="font-size:0.6rem;"></i> Nosotros</a>
              <a href="programas.html"     class="footer__link"><i class="fa-solid fa-chevron-right" style="font-size:0.6rem;"></i> Programas</a>
              <a href="investigacion.html" class="footer__link"><i class="fa-solid fa-chevron-right" style="font-size:0.6rem;"></i> Investigación</a>
              <a href="docentes.html"      class="footer__link"><i class="fa-solid fa-chevron-right" style="font-size:0.6rem;"></i> Docentes</a>
            </div>
          </div>

          <div>
            <div class="footer__col-title">Servicios</div>
            <div class="footer__links">
              <a href="egresados.html" class="footer__link"><i class="fa-solid fa-chevron-right" style="font-size:0.6rem;"></i> Bolsa de Trabajo</a>
              <a href="noticias.html"  class="footer__link"><i class="fa-solid fa-chevron-right" style="font-size:0.6rem;"></i> Noticias</a>
              <a href="biblioteca.html" class="footer__link" id="footer-biblioteca"><i class="fa-solid fa-chevron-right" style="font-size:0.6rem;"></i> Biblioteca Virtual</a>
            </div>
          </div>

          <div>
            <div class="footer__col-title">Contacto</div>
            <div class="footer__links">
              <a href="tel:044202578"                class="footer__link"><i class="fa-solid fa-phone" style="font-size:0.7rem;"></i> (044) 20-2578</a>
              <a href="mailto:economia@unitru.edu.pe" class="footer__link"><i class="fa-solid fa-envelope" style="font-size:0.7rem;"></i> economia@unitru.edu.pe</a>
              <a href="contacto.html"                class="footer__link"><i class="fa-solid fa-location-dot" style="font-size:0.7rem;"></i> Ciudad Universitaria, Trujillo</a>
              <a href="https://www.unitru.edu.pe" target="_blank" rel="noopener" class="footer__link"><i class="fa-solid fa-globe" style="font-size:0.7rem;"></i> www.unitru.edu.pe</a>
            </div>
          </div>

        </div>

        <div class="footer__bottom">
          <div class="footer__copy">
            © 2025 <span>Escuela de Economía — UNT</span>. Todos los derechos reservados.
          </div>
          <div class="footer__legal">
            <a href="#">Política de privacidad</a>
            <a href="#">Términos de uso</a>
            <a href="#">Accesibilidad</a>
          </div>
        </div>
      </div>
    </footer>

    <button id="back-to-top" aria-label="Volver al inicio" title="Volver al inicio">
      <i class="fa-solid fa-chevron-up"></i>
    </button>
  `;

  /* ── Inyectar componentes al cargar ── */
  function inject() {
    const navContainer    = document.getElementById('navbar-container');
    const footerContainer = document.getElementById('footer-container');

    if (navContainer)    navContainer.innerHTML    = NAVBAR_HTML;
    if (footerContainer) footerContainer.innerHTML = FOOTER_HTML;

    
  }

  /* Ejecutar cuando el DOM esté listo */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

})();





