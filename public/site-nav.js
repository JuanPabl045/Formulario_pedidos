(function () {
  const NAV_PROFILES = {
    shop: {
      brandHref: 'index.html',
      brandImg: 'https://img1.wsimg.com/isteam/ip/e4799748-99b6-4912-a111-1cacb9a9c576/LOGOWEB.png/:/rs=w:234,h:75,cg:true,m/cr=w:234,h:75/qt=q:95',
      brandText: 'Molino Viejo',
      brandClass: 'display: inline-flex; align-items: center; gap: 10px;',
      logoClass: 'logo-animated',
      logoStyle: 'height: 32px; width: auto; background: rgba(255, 255, 255, 0.95); padding: 4px 8px; border-radius: 10px;',
      items: [
        { href: 'index.html', label: 'Inicio', icon: 'fa-home' },
        { href: 'nosotros.html', label: 'Carnes', icon: 'fa-drumstick-bite' },
        { href: 'lacteos.html', label: 'Lácteos', icon: 'fa-cheese' },
        { href: 'pedidos.html', label: 'Hacer Pedido', icon: 'fa-shopping-cart' }
      ]
    },
    catalogo: {
      brandHref: 'index.html',
      brandImg: 'https://img1.wsimg.com/isteam/ip/e4799748-99b6-4912-a111-1cacb9a9c576/LOGOWEB.png/:/rs=w:234,h:75,cg:true,m/cr=w:234,h:75/qt=q:95',
      brandText: 'Molino Viejo',
      brandClass: 'display: inline-flex; align-items: center; gap: 10px;',
      logoClass: 'logo-animated',
      logoStyle: 'height: 32px; width: auto; background: rgba(255, 255, 255, 0.95); padding: 4px 8px; border-radius: 10px;',
      items: [
        { href: 'index.html', label: 'Inicio', icon: 'fa-home' },
        { href: 'nosotros.html', label: 'Carnes', icon: 'fa-drumstick-bite' },
        { href: 'pedidos.html', label: 'Hacer Pedido', icon: 'fa-shopping-cart' },
        { href: 'admin.html', label: 'Admin', icon: 'fa-user-shield' }
      ]
    },
    admin: {
      brandHref: 'admin.html',
      brandImg: 'https://img1.wsimg.com/isteam/ip/e4799748-99b6-4912-a111-1cacb9a9c576/LOGOWEB.png/:/rs=w:234,h:75,cg:true,m/cr=w:234,h:75/qt=q:95',
      brandText: 'Molino Viejo',
      brandClass: 'display: inline-flex; align-items: center; gap: 10px;',
      logoClass: 'logo-animated',
      logoStyle: 'height: 32px; width: auto; background: rgba(255, 255, 255, 0.95); padding: 4px 8px; border-radius: 10px;',
      items: [
        { href: 'index.html', label: 'Inicio', icon: 'fa-home' },
        { href: 'nosotros.html', label: 'Carnes', icon: 'fa-drumstick-bite' },
        { href: 'pedidos.html', label: 'Pedidos', icon: 'fa-shopping-cart' }
      ]
    },
    landing: {
      brandHref: 'landing.html',
      brandImg: 'https://img1.wsimg.com/isteam/ip/e4799748-99b6-4912-a111-1cacb9a9c576/LOGOWEB.png/:/rs=w:234,h:75,cg:true,m/cr=w:234,h:75/qt=q:95',
      brandText: 'Molino Viejo',
      brandClass: 'display: inline-flex; align-items: center; gap: 10px;',
      logoClass: 'logo-animated',
      logoStyle: 'height: 32px; width: auto; background: rgba(255, 255, 255, 0.95); padding: 4px 8px; border-radius: 10px;',
      items: []
    }
  };

  function getFileName() {
    const path = window.location.pathname.replace(/\\/g, '/');
    const fileName = path.split('/').filter(Boolean).pop() || 'index.html';
    return fileName.toLowerCase();
  }

  function getProfile() {
    const fileName = getFileName();
    if (fileName === 'landing.html') return NAV_PROFILES.landing;
    if (fileName === 'catalogo.html') return NAV_PROFILES.catalogo;
    if (fileName === 'admin.html') return NAV_PROFILES.admin;
    return NAV_PROFILES.shop;
  }

  function renderAdminLinks(profile) {
    const adminLinksContainer = document.querySelector('#adminPanel .header > div:nth-of-type(2)');
    if (!adminLinksContainer || !profile.items.length) {
      return;
    }

    adminLinksContainer.innerHTML = profile.items.map(item => `
      <a href="${item.href}" style="color: white; text-decoration: none; margin-right: 20px;">
        <i class="fas ${item.icon} me-1"></i> ${item.label}
      </a>
    `).join('');
  }

  function renderNavbar() {
    const fileName = getFileName();
    const profile = getProfile();
    const existingNav = document.querySelector('nav.navbar');

    if (fileName === 'admin.html') {
      renderAdminLinks(profile);
    }

    if (!existingNav) {
      return;
    }

    const currentFile = getFileName();
    const itemsMarkup = profile.items.map(item => {
      const active = currentFile === item.href.toLowerCase() ? ' active' : '';
      return `
        <li class="nav-item">
          <a class="nav-link${active}" href="${item.href}">
            <i class="fas ${item.icon} me-1"></i> ${item.label}
          </a>
        </li>
      `;
    }).join('');

    const collapseMarkup = profile.items.length
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
          <a class="navbar-brand" href="${profile.brandHref}" style="${profile.brandClass}" aria-label="${profile.brandText}">
            <img src="${profile.brandImg}" alt="Logo Molino Viejo" class="${profile.logoClass} img-fluid" style="${profile.logoStyle}" loading="lazy" decoding="async">
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
