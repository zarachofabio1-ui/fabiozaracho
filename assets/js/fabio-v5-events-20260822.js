(() => {
  'use strict';

  document.documentElement.classList.add('js');

  const header = document.querySelector('[data-header]') || document.querySelector('.site-header');
  const menuButton = document.querySelector('[data-menu-button]');
  const mobileNav = document.querySelector('[data-mobile-nav]');

  const updateHeader = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 16);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const closeMenu = () => {
    if (!mobileNav || !menuButton) return;
    mobileNav.classList.remove('open');
    mobileNav.hidden = true;
    document.body.classList.remove('menu-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
  };

  if (menuButton && mobileNav) {
    mobileNav.hidden = true;
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMenu();
        return;
      }
      mobileNav.hidden = false;
      requestAnimationFrame(() => mobileNav.classList.add('open'));
      document.body.classList.add('menu-open');
      menuButton.setAttribute('aria-expanded', 'true');
      menuButton.setAttribute('aria-label', 'Cerrar menú');
    });
    mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 920) closeMenu();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  document.querySelectorAll('[data-year]').forEach((element) => {
    element.textContent = String(Math.max(2026, new Date().getFullYear()));
  });

  const revealItems = document.querySelectorAll('.reveal');
  revealItems.forEach((item) => {
    const delay = Number(item.dataset.delay || 0);
    item.style.setProperty('--delay', `${Math.max(0, Math.min(delay, 500))}ms`);
  });

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('visible'));
  }

  window.setTimeout(() => {
    revealItems.forEach((item) => item.classList.add('visible'));
  }, 1400);

  const trackTikTokEvent = (eventName) => {
    if (window.ttq && typeof window.ttq.track === 'function') {
      window.ttq.track(eventName);
    }
  };

  const trackTikTokContact = () => trackTikTokEvent('Contact');
  const trackTikTokLead = () => trackTikTokEvent('Lead');

  document.querySelectorAll('a[href*="wa.me/"]').forEach((link) => {
    link.addEventListener('click', trackTikTokContact);
  });

  const form = document.querySelector('[data-whatsapp-form]');
  if (form) {
    const status = form.querySelector('[data-form-status]');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const consent = form.querySelector('input[name="consentimiento"]');
      const nombre = String(data.get('nombre') || '').trim();
      const actividad = String(data.get('actividad') || '').trim();
      const servicio = String(data.get('servicio') || '').trim();
      const presupuesto = String(data.get('presupuesto') || '').trim();
      const mensaje = String(data.get('mensaje') || '').trim();

      if (!nombre || !actividad || !servicio || !mensaje) {
        if (status) status.textContent = 'Completá los campos obligatorios para preparar la consulta.';
        form.querySelector(':invalid')?.focus();
        return;
      }
      if (!consent?.checked) {
        if (status) status.textContent = 'Aceptá la Política de Privacidad antes de continuar.';
        consent?.focus();
        return;
      }

      if (status) status.textContent = '';
      const text = [
        'Hola Fabio, quiero cotizar un proyecto web.',
        '',
        `Nombre: ${nombre}`,
        `Actividad o negocio: ${actividad}`,
        `Servicio: ${servicio}`,
        `Presupuesto estimado: ${presupuesto || 'A definir'}`,
        `Necesidad principal: ${mensaje}`,
        '',
        'Confirmo que leí la Política de Privacidad del sitio.'
      ].join('\n');

      const url = `https://wa.me/595971404438?text=${encodeURIComponent(text)}`;
      trackTikTokLead();
      trackTikTokContact();
      const popup = window.open(url, '_blank', 'noopener,noreferrer');
      if (!popup) window.location.href = url;
    });
  }
})();