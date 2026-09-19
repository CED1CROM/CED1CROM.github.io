document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  // Dropdown "Contenido"
  document.querySelectorAll('.dropdown').forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', (e) => {
      const isMobile = window.getComputedStyle(menuToggle).display !== 'none';
      if (isMobile) {
        // En móvil el primer tap abre/cierra el submenú en vez de navegar
        e.preventDefault();
        const isOpen = dropdown.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen);
        document.querySelectorAll('.dropdown.open').forEach(d => {
          if (d !== dropdown) d.classList.remove('open');
        });
      }
    });
  });

  // Cerrar menús al hacer click en un enlace
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        // Si el enlace es la cabecera desplegable "Contenido" en móvil, ignoramos para no cerrarlo antes de tiempo
        if (link.classList.contains('dropdown-toggle') && window.getComputedStyle(menuToggle).display !== 'none') {
          return;
        }

        const destino = link.getAttribute('href');

        // Cancelar acción si es un enlace vacío
        if (destino === '#' || !destino) {
          e.preventDefault();
        }

        // Cierra los menús desplegables
        navLinks.classList.remove('open');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
      });
    });
  }

  // Cerrar el dropdown si se hace click fuera
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown.open').forEach(d => d.classList.remove('open'));
    }
  });
});