(() => {
  const links = [...document.querySelectorAll('.section-link')];
  const sections = [...document.querySelectorAll('[data-section]')];
  const menu = document.querySelector('.page-nav');
  let scheduled = false;

  function updateCurrentSection() {
    scheduled = false;
    const marker = menu.getBoundingClientRect().bottom + 35;
    let current = sections[0].id;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= marker) current = section.id;
    }
    for (const link of links) {
      if (link.hash === '#' + current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }

  function scheduleUpdate() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(updateCurrentSection);
  }

  addEventListener('scroll', scheduleUpdate, {passive: true});
  addEventListener('resize', scheduleUpdate);
  addEventListener('hashchange', scheduleUpdate);
  addEventListener('load', scheduleUpdate);
  updateCurrentSection();
})();
