/** Keep the logo diagram and the four readable principles in sync. */
export function initLogoPhilosophyInteractions() {
  const section = document.getElementById('penjelasan-logo');
  if (!section) return () => {};
  const controls = [...section.querySelectorAll('[data-logo-filter]')];
  const hotspots = [...section.querySelectorAll('[data-hotspot]')];
  const caption = section.querySelector('[data-identity-caption]');
  const abort = new AbortController();
  const options = { signal: abort.signal };
  function select(id, allowCollapse = false) {
    const active = section.dataset.activePillar;
    const next = allowCollapse && active === id ? '' : id;
    section.dataset.activePillar = next;
    controls.forEach(control => {
      const selected = control.dataset.logoFilter === next;
      control.setAttribute('aria-expanded', String(selected));
      control.closest('[data-logo-pillar]').classList.toggle('is-active', selected);
      control.querySelector('.tara-identity_toggle').textContent = selected ? '−' : '+';
      const panel = document.getElementById(control.getAttribute('aria-controls'));
      if (panel) panel.hidden = !selected;
    });
    hotspots.forEach(spot => {
      spot.setAttribute('aria-pressed', String(spot.dataset.hotspot === next));
      spot.setAttribute('aria-expanded', String(spot.dataset.hotspot === next));
    });
    const control = controls.find(item => item.dataset.logoFilter === next);
    if (caption) caption.textContent = control ? `0${next} / ${control.children[1].textContent}` : 'Empat prinsip, satu identitas';
  }
  controls.forEach((control, index) => {
    control.addEventListener('click', () => select(control.dataset.logoFilter, true), options);
    control.addEventListener('keydown', event => {
      const keys = { ArrowDown: (index + 1) % controls.length, ArrowUp: (index + controls.length - 1) % controls.length, Home: 0, End: controls.length - 1 };
      if (!(event.key in keys)) return;
      event.preventDefault(); controls[keys[event.key]].focus();
    }, options);
  });
  hotspots.forEach(spot => spot.addEventListener('click', () => select(spot.dataset.hotspot), options));
  select('');
  return () => abort.abort();
}
