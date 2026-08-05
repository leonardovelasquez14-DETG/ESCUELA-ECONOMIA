/* =============================================
   THEME TOGGLE — Dark / Light Mode
   Escuela de Economía, UNT
   ============================================= */

(function () {
  const STORAGE_KEY = 'unt-econ-theme';
  const ICON_LIGHT  = '☀️';
  const ICON_DARK   = '🌙';

  // Determinar tema inicial
  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Aplicar tema al documento
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    updateToggleIcon(theme);
  }

  // Actualizar ícono del botón
  function updateToggleIcon(theme) {
    const btn = document.getElementById('theme-toggle-btn');
    if (!btn) return;
    btn.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    btn.title = theme === 'dark' ? 'Modo claro' : 'Modo oscuro';
    btn.innerHTML = theme === 'dark' ? ICON_LIGHT : ICON_DARK;
  }

  // Toggle
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);

    // Animación de ripple en el botón
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) {
      btn.classList.remove('bounce-anim');
      void btn.offsetWidth; // reflow
      btn.classList.add('bounce-anim');
    }
  }

  // Escuchar cambios del sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Init: aplicar tema antes del render para evitar flash
  applyTheme(getPreferredTheme());

  // Cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) {
      btn.addEventListener('click', toggleTheme);
      updateToggleIcon(getPreferredTheme());
    }
  });
})();
