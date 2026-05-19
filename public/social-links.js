(function () {
  const defaultWhatsapp = String(window.whatsappNumber || '51989719386').replace(/\D/g, '');

  const links = Object.assign(
    {
      facebook: 'https://www.facebook.com/tu-pagina',
      instagram: 'https://www.instagram.com/tu-cuenta',
      whatsapp: `https://wa.me/${defaultWhatsapp}`
    },
    window.socialLinks || {}
  );

  const labels = {
    facebook: 'Facebook de Molino Viejo',
    instagram: 'Instagram de Molino Viejo',
    whatsapp: 'WhatsApp de Molino Viejo'
  };

  document.querySelectorAll('[data-social]').forEach((anchor) => {
    const key = (anchor.getAttribute('data-social') || '').toLowerCase();
    const href = links[key];
    if (!href) return;

    anchor.setAttribute('href', href);
    anchor.setAttribute('aria-label', labels[key] || 'Red social Molino Viejo');
    anchor.setAttribute('title', key.charAt(0).toUpperCase() + key.slice(1));

    if (href.startsWith('http')) {
      anchor.setAttribute('target', '_blank');
      anchor.setAttribute('rel', 'noopener noreferrer');
    }
  });
})();
