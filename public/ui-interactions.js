(function () {
  function init() {
    const nav = document.querySelector('nav.navbar');
    const scrollTopBtn = document.querySelector('[data-scroll-top]');

    function updateNav() {
      if (!nav) return;
      nav.classList.toggle('scrolled', window.scrollY > 6);
    }

    function updateScrollTop() {
      if (!scrollTopBtn) return;
      scrollTopBtn.classList.toggle('is-visible', window.scrollY > 420);
    }

    function onScroll() {
      updateNav();
      updateScrollTop();
    }

    if (scrollTopBtn) {
      scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
