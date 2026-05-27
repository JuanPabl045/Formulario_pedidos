(function () {
  const BRAND = {
    href: 'index.html',
    img: 'img/logo.png',
    text: 'Molino Viejo',
    className: 'mv-brand',
    logoClass: 'logo-animated',
    logoStyle: 'height: 32px; width: auto; background: rgba(255, 255, 255, 0.95); padding: 4px 8px; border-radius: 10px;'
  };

  const NAV_ITEMS = [
    { href: 'index.html', label: 'Inicio', icon: 'fa-home' },
    { href: 'nosotros.html', label: 'Carnes', icon: 'fa-drumstick-bite' },
    { href: 'lacteos.html', label: 'Lácteos', icon: 'fa-cheese' },
    { href: 'pedidos.html', label: 'Pedidos', icon: 'fa-shopping-cart' }
  ];

  function getFileName() {
    const path = window.location.pathname.replace(/\\/g, '/');
    const fileName = path.split('/').filter(Boolean).pop() || 'index.html';
    return fileName.toLowerCase();
  }

  function renderNavbar() {
    const existingNav = document.querySelector('nav.navbar');

    if (!existingNav) {
      return;
    }

    const currentFile = getFileName();
    const itemsMarkup = NAV_ITEMS.map(item => {
      const active = currentFile === item.href.toLowerCase() ? ' active' : '';
      return `
        <li class="nav-item">
          <a class="nav-link${active}" href="${item.href}">
            <i class="fas ${item.icon} me-1"></i> ${item.label}
          </a>
        </li>
      `;
    }).join('');

    const collapseMarkup = NAV_ITEMS.length
      ? `
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Abrir navegación">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul class="navbar-nav">
            ${itemsMarkup}
          </ul>
        </div>
      `
      : '';

    existingNav.outerHTML = `
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid px-4">
          <a class="navbar-brand ${BRAND.className}" href="${BRAND.href}" aria-label="${BRAND.text}">
            <img src="${BRAND.img}" alt="Logo Molino Viejo" class="${BRAND.logoClass} img-fluid" style="${BRAND.logoStyle}" loading="lazy" decoding="async">
          </a>
          ${collapseMarkup}
        </div>
      </nav>
    `;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderNavbar);
  } else {
    renderNavbar();
  }
})();
