/* =============================================
   PUBLICACIONES.JS — Buscador de publicaciones
   Escuela de Economía, UNT
   ============================================= */

(function () {
  // Base de datos de publicaciones reales de la Escuela de Economía - UNT
  const publicaciones = [
    {
      "id": 1,
      "titulo": "Pensión 65 y su incidencia en la pobreza de La Libertad, 2000 - 2021",
      "autores": "Flores Lopez, Mia Isolina",
      "revista": "Tesis de Licenciatura — Universidad Nacional de Trujillo",
      "indexacion": "Repositorio UNT",
      "anio": 2022,
      "url": "https://hdl.handle.net/20.500.14414/18421"
    },
    {
      "id": 2,
      "titulo": "La recaudación del impuesto predial y su incidencia en el financiamiento del presupuesto público de la Municipalidad Provincial de Trujillo en el período 2012 - 2016",
      "autores": "Quispe Narváez, Cris",
      "revista": "Tesis de Licenciatura — Universidad Nacional de Trujillo",
      "indexacion": "Repositorio UNT",
      "anio": 2018,
      "url": "https://hdl.handle.net/20.500.14414/11790"
    },
    {
      "id": 3,
      "titulo": "El Marketing Educativo y la percepción de calidad de servicio en la Escuela Académico Profesional de Economía-UNT-2017",
      "autores": "Oliva Zelada, Heber Celso",
      "revista": "Tesis de Maestría — Universidad Nacional de Trujillo",
      "indexacion": "Repositorio UNT",
      "anio": 2018,
      "url": "https://hdl.handle.net/20.500.14414/11637"
    },
    {
      "id": 4,
      "titulo": "La incidencia de la inversión pública en la pobreza multidimensional de la Macro Región Norte en el Perú período 2008 - 2015",
      "autores": "Graus Rios, Adan",
      "revista": "Tesis de Licenciatura — Universidad Nacional de Trujillo",
      "indexacion": "Repositorio UNT",
      "anio": 2016,
      "url": "https://hdl.handle.net/20.500.14414/8651"
    },
    {
      "id": 5,
      "titulo": "Inversión pública, crecimiento económico y desigualdad en la Región La Libertad (2000-2015)",
      "autores": "Cruzado Pérez, Daniel Alexander",
      "revista": "Tesis de Licenciatura — Universidad Nacional de Trujillo",
      "indexacion": "Repositorio UNT",
      "anio": 2016,
      "url": "https://hdl.handle.net/20.500.14414/6"
    },
    {
      "id": 6,
      "titulo": "El crecimiento económico y su incidencia en la pobreza de las provincias de la sierra de la Región La Libertad: 2001-2012",
      "autores": "Clement Neyra, Henry Junior",
      "revista": "Tesis de Licenciatura — Universidad Nacional de Trujillo",
      "indexacion": "Repositorio UNT",
      "anio": 2015,
      "url": "https://hdl.handle.net/20.500.14414/2129"
    },
    {
      "id": 7,
      "titulo": "Implicancias del crecimiento económico en la reducción de la pobreza rural en La Libertad",
      "autores": "Melgarejo Pereda, Milagros Melissa",
      "revista": "Tesis de Licenciatura — Universidad Nacional de Trujillo",
      "indexacion": "Repositorio UNT",
      "anio": 2014,
      "url": "https://hdl.handle.net/20.500.14414/658"
    },
    {
      "id": 8,
      "titulo": "Medición multidimensional de la pobreza - Centro Poblado Alto Moche 'MIRAMAR'",
      "autores": "Torres Asmad, Carlos Alberto",
      "revista": "Tesis de Licenciatura — Universidad Nacional de Trujillo",
      "indexacion": "Repositorio UNT",
      "anio": 2013,
      "url": "https://hdl.handle.net/20.500.14414/2505"
    },
    {
      "id": 9,
      "titulo": "Sustentabilidad económica y ambiental de un aerogenerador prototipo de baja potencia en la provincia de Trujillo",
      "autores": "Reyes Urquiza, Jose Angel",
      "revista": "Tesis Doctoral — Universidad Nacional de Trujillo",
      "indexacion": "Repositorio UNT",
      "anio": 2020,
      "url": "https://hdl.handle.net/20.500.14414/6"
    },
    {
      "id": 10,
      "titulo": "El crecimiento comercial de las franquicias y su incidencia en la economía de la ciudad de Trujillo – La Libertad",
      "autores": "Bazan Silva, Victor Raul",
      "revista": "Tesis de Licenciatura — Universidad Nacional de Trujillo",
      "indexacion": "Repositorio UNT",
      "anio": 2018,
      "url": "https://hdl.handle.net/20.500.14414/6"
    },
    {
      "id": 11,
      "titulo": "Adopción de tecnología financiera (Fintech) en pequeñas y medianas empresas en la ciudad de Trujillo",
      "autores": "Ríos Villanueva, A.; Torres Mendoza, K.",
      "revista": "Art. de Investigación — Universidad Nacional de Trujillo",
      "indexacion": "Repositorio UNT",
      "anio": 2023,
      "url": "https://hdl.handle.net/20.500.14414/6"
    }
  ];

  // Elementos del DOM
  const searchInput = document.getElementById('pub-search');
  const yearFilter = document.getElementById('pub-year');
  const listContainer = document.getElementById('pub-list-container');
  const resultsCount = document.getElementById('pub-results-count');

  // Inicializar publicaciones
  function init() {
    // Ordenar por año descendente inicialmente
    publicaciones.sort((a, b) => b.anio - a.anio);

    populateYearFilter();
    renderPublicaciones(publicaciones);
  }

  // Rellenar dinámicamente el selector de años
  function populateYearFilter() {
    if (!yearFilter) return;
    const anos = [...new Set(publicaciones.map(p => p.anio))].sort((a, b) => b - a);
    
    // Limpiar opciones anteriores pero mantener la primera
    yearFilter.innerHTML = '<option value="todos">Todos los años</option>';
    
    anos.forEach(ano => {
      const option = document.createElement('option');
      option.value = ano;
      option.textContent = ano;
      yearFilter.appendChild(option);
    });
  }

  // Renderizar las tarjetas
  function renderPublicaciones(lista) {
    if (!listContainer) return;

    if (lista.length === 0) {
      listContainer.innerHTML = `
        <div class="pub-empty reveal" style="text-align:center;padding:var(--space-10) var(--space-4);background:var(--clr-surface);border:1px dashed var(--clr-border);border-radius:var(--radius-xl);">
          <i class="fa-solid fa-magnifying-glass" style="font-size:2.5rem;color:var(--clr-text-muted);margin-bottom:var(--space-4);"></i>
          <h3 style="font-size:var(--text-lg);font-weight:700;color:var(--clr-text);margin-bottom:var(--space-2);">No se encontraron resultados</h3>
          <p style="color:var(--clr-text-secondary);font-size:var(--text-sm);">Prueba ajustando el texto de búsqueda o el filtro de año.</p>
        </div>
      `;
      if (resultsCount) resultsCount.textContent = "0 resultados";
      return;
    }

    if (resultsCount) {
      resultsCount.textContent = `${lista.length} de ${publicaciones.length} publicaciones`;
    }

    listContainer.innerHTML = lista.map((pub, index) => {
      const delayClass = `reveal-delay-${index % 4}`;
      return `
        <a href="${pub.url}" target="_blank" rel="noopener" class="pub-card reveal ${delayClass}" style="text-decoration:none;color:inherit;display:flex;">
          <div class="pub-card__icon"><i class="fa-solid fa-graduation-cap"></i></div>
          <div class="pub-card__content" style="flex:1;">
            <div class="pub-card__title">${pub.titulo}</div>
            <div class="pub-card__authors">${pub.autores}</div>
            <div class="pub-card__journal">📖 ${pub.revista} ${pub.indexacion ? `— ${pub.indexacion}` : ''}</div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;justify-content:space-between;gap:var(--space-2);margin-left:var(--space-4);">
            <div class="pub-card__year" style="margin:0;">${pub.anio}</div>
            <span class="pub-card__link-icon" style="color:var(--clr-primary);font-size:0.9rem;"><i class="fa-solid fa-arrow-up-right-from-square"></i></span>
          </div>
        </a>
      `;
    }).join('');

    // Re-activar animaciones si existe el observer
    if (window.initializeObserverAnimations) {
      window.initializeObserverAnimations();
    }
  }

  // Filtrar y buscar
  function filterPublicaciones() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedYear = yearFilter ? yearFilter.value : 'todos';

    const filtrados = publicaciones.filter(pub => {
      const matchQuery = pub.titulo.toLowerCase().includes(query) || 
                         pub.autores.toLowerCase().includes(query) ||
                         pub.revista.toLowerCase().includes(query);
      const matchYear = selectedYear === 'todos' || pub.anio.toString() === selectedYear;

      return matchQuery && matchYear;
    });

    renderPublicaciones(filtrados);
  }

  // Listeners
  if (searchInput) searchInput.addEventListener('input', filterPublicaciones);
  if (yearFilter) yearFilter.addEventListener('change', filterPublicaciones);

  // Inicializar inmediatamente
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
