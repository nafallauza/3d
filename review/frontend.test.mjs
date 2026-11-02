import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { parse } from '@babel/parser';
import { TARA_DOM_HTML as html } from '../src/taraDomTemplate.js';
const source = fs.readFileSync(new URL('../src/utils/sondavenEngine.js', import.meta.url), 'utf8');
const ast = parse(source, { sourceType: 'module' });
function fn(name) { const n = ast.program.body.find(n => n.type === 'FunctionDeclaration' && n.id.name === name); return source.slice(n.start, n.end); }
function run(name, context) { vm.createContext(context); vm.runInContext(fn(name) + ';' + name + '()', context); }
const chain = new Proxy({}, { get: () => () => chain });
class Element {
  constructor() { this.handlers = {}; this.attrs = {}; this.style = {}; this.tabIndex = 0; this.isConnected = true; this.classList = { toggle() {} }; }
  addEventListener(name, cb) { (this.handlers[name] ||= []).push(cb); }
  emit(name, event = {}) { for (const cb of this.handlers[name] || []) cb(event); }
  click() { this.emit('click'); }
  setAttribute(k, v) { this.attrs[k] = String(v); }
  getAttribute(k) { return this.attrs[k]; }
  setPointerCapture() {}
}
test('placeholder links prevent navigation; real anchors scroll', () => {
  const links = ['#', '#benefits'].map(href => { const a = new Element(); a.attrs.href = href; return a; });
  let scrolls = 0;
  run('initAnchorNavigation', { document: { querySelectorAll: () => links, querySelector: () => ({}) }, lenis: { scrollTo: () => scrolls++ }, durL: 1 });
  let prevented = 0;
  links.forEach(a => a.emit('click', { preventDefault: () => prevented++ }));
  assert.equal(prevented, 2); assert.equal(scrolls, 1);
});
test('resize refresh does not duplicate tab listeners', () => {
  const tab = new Element(); tab.offsetLeft = 10; tab.offsetWidth = 100;
  const group = { querySelectorAll: () => [tab], querySelector: s => s.includes('is-active') ? tab : {} };
  const context = { initializedTabHighlights: new WeakSet(), document: { querySelectorAll: () => [group] }, gsap: { to() {} }, durM: 1 };
  run('initTabsHilight', context);
  vm.runInContext('initTabsHilight();initTabsHilight()', context);
  assert.equal(tab.handlers.click.length, 1);
});
test('scaled SVG maps pointer into viewBox and supports touch cancellation / keyboard', () => {
  const knob = new Element(), start = new Element(), end = new Element(), summer = new Element(), winter = new Element();
  const path = { getTotalLength: () => 100, getPointAtLength: length => ({ x: length, y: 0 }) };
  const svg = { style: {}, querySelector: s => ({ '[data-active]': knob, '[data-path]': path, '[data-start]': start, '[data-end]': end })[s], getScreenCTM: () => ({ inverse: () => ({}) }), createSVGPoint: () => ({ x: 0, y: 0, matrixTransform() { return { x: (this.x - 20) / 2, y: this.y / 2 }; } }) };
  run('initSummerWinterSwitcher', { document: { querySelector: s => ({ '[data-line-animation]': svg, '[data-summer-btn]': summer, '[data-winter-btn]': winter })[s] }, gsap: { set() {}, killTweensOf() {}, to: (obj, config) => { obj.progress = config.progress; config.onUpdate(); } }, durM: 1 });
  assert.equal(svg.style.touchAction, 'none');
  knob.emit('pointerdown', { button: 0, pointerId: 1, clientX: 170, clientY: 0 });
  assert.equal(knob.attrs['aria-valuenow'], '75');
  knob.emit('pointercancel'); assert.equal(knob.attrs['aria-valuenow'], '100');
  knob.emit('keydown', { key: 'Home', preventDefault() {} }); assert.equal(knob.attrs['aria-valuenow'], '0');
  winter.click(); assert.equal(knob.attrs['aria-valuenow'], '100');
});
test('menu documentation links target blog and identity has four accessible controls', () => {
  const links = [...html.matchAll(/<a\b[^>]*modal-menu-headline="menu"[^>]*>/g)].map(m => m[0]);
  assert.equal(links.filter(s => s.includes('href="#blog"')).length, 2);
  for (let i = 1; i <= 4; i++) {
    assert.ok(html.includes(`aria-controls="identity-panel-${i}"`));
    assert.equal(html.split(`id="identity-panel-${i}"`).length - 1, 1);
  }
  assert.ok(!html.includes('tara-logo-showcase'));
});
test('modal traps Tab, closes through its control on Escape and restores focus', () => {
  const doc = new Element(); const trigger = new Element(); const first = new Element(); const last = new Element();
  const panel = new Element(); let closes = 0; let locks = 0;
  const closeControl = { click: () => closes++ };
  panel.querySelectorAll = () => [first, last]; panel.querySelector = () => closeControl;
  panel.contains = el => [panel, first, last].includes(el); panel.removeAttribute = k => delete panel.attrs[k];
  for (const el of [panel, first, last, trigger]) { el.focus = () => { doc.activeElement = el; }; el.getClientRects = () => [{}]; }
  const opener = { hasAttribute: s => s === 'modal-cta-open', getAttribute: () => 'cta' };
  const target = { closest: s => s.includes('modal-cta-open') ? opener : s === 'a,button,[tabindex]' ? trigger : null };
  doc.querySelector = () => panel; doc.querySelectorAll = () => []; trigger.closest = () => null;
  run('initModalAccessibility', { document: doc, getComputedStyle: () => ({ visibility: 'visible' }), requestAnimationFrame: cb => cb(), lockScroll: () => locks++ });
  doc.emit('click', { target }); assert.equal(doc.activeElement, first); assert.equal(locks, 1);
  doc.activeElement = last; let prevented = false;
  doc.emit('keydown', { key: 'Tab', shiftKey: false, preventDefault: () => prevented = true });
  assert.equal(prevented, true); assert.equal(doc.activeElement, first);
  doc.emit('keydown', { key: 'Escape', preventDefault() {} });
  assert.equal(closes, 1); assert.equal(doc.activeElement, trigger); assert.equal(panel.attrs['aria-modal'], undefined);
  const menu = { focus: () => { doc.activeElement = menu; } };
  trigger.getClientRects = () => [];
  doc.querySelector = selector => selector === '[modal-menu-open]' ? menu : panel;
  doc.emit('click', { target });
  doc.emit('keydown', { key: 'Escape', preventDefault() {} });
  assert.equal(doc.activeElement, menu, 'hidden menu opener falls back to the visible menu button');
});
test('logo selection, keyboard navigation and cleanup work together', async () => {
  const { initLogoPhilosophyInteractions } = await import('../src/utils/logoPhilosophyEngine.js');
  const panels = {}, caption = { textContent: '' };
  const controls = [], hotspots = [];
  for (let i = 1; i <= 4; i++) {
    const control = new EventTarget(); control.dataset = { logoFilter: String(i) }; control.attrs = {};
    control.children = [{}, { textContent: 'Element ' + i }];
    control.setAttribute = (k, v) => control.attrs[k] = v;
    control.getAttribute = () => 'identity-panel-' + i;
    control.closest = () => ({ classList: { toggle() {} } });
    control.querySelector = () => ({ textContent: '' });
    control.focus = () => { focused = i; };
    panels['identity-panel-' + i] = { hidden: i !== 1 }; controls.push(control);
    const spot = new EventTarget(); spot.dataset = { hotspot: String(i) }; spot.attrs = {};
    spot.setAttribute = (k, v) => spot.attrs[k] = v; hotspots.push(spot);
  }
  let focused = 0;
  const section = { dataset: {}, querySelectorAll: s => s === '[data-logo-filter]' ? controls : hotspots, querySelector: () => caption };
  const previous = globalThis.document;
  globalThis.document = { getElementById: id => id === 'penjelasan-logo' ? section : panels[id] };
  try {
    const cleanup = initLogoPhilosophyInteractions();
    hotspots[2].dispatchEvent(new Event('click'));
    assert.equal(panels['identity-panel-3'].hidden, false); assert.equal(panels['identity-panel-1'].hidden, true);
    assert.equal(controls[2].attrs['aria-expanded'], 'true');
    const key = new Event('keydown', { cancelable: true }); Object.defineProperty(key, 'key', { value: 'End' });
    controls[0].dispatchEvent(key); assert.equal(focused, 4);
    cleanup(); hotspots[1].dispatchEvent(new Event('click'));
    assert.equal(section.dataset.activePillar, '3');
  } finally { globalThis.document = previous; }
});

test('menu icon is keyboard operable and restores focus to its stable wrapper', () => {
  const doc = new Element(), menu = new Element(), panel = new Element(), link = new Element();
  menu.attrs['modal-menu-open'] = 'menu';
  menu.hasAttribute = name => name in menu.attrs;
  menu.querySelectorAll = () => [];
  menu.closest = selector => selector.includes('modal-menu-open') ? menu : null;
  menu.click = () => doc.emit('click', { target: menu });
  panel.querySelectorAll = () => [link];
  panel.contains = el => el === panel || el === link;
  panel.removeAttribute = key => delete panel.attrs[key];
  for (const el of [menu, panel, link]) {
    el.focus = () => { doc.activeElement = el; };
    el.getClientRects = () => [{}];
  }
  doc.querySelectorAll = () => [menu]; doc.querySelector = () => panel;
  run('initModalAccessibility', { document: doc, getComputedStyle: () => ({ visibility: 'visible' }), requestAnimationFrame: cb => cb(), lockScroll() {} });
  assert.equal(menu.attrs.role, 'button'); assert.equal(menu.attrs.tabindex, '0');
  menu.emit('keydown', { key: 'Enter', preventDefault() {} });
  assert.equal(menu.attrs['aria-expanded'], 'true'); assert.equal(doc.activeElement, link);
  doc.emit('keydown', { key: 'Escape', preventDefault() {} });
  assert.equal(menu.attrs['aria-expanded'], 'false'); assert.equal(doc.activeElement, menu);
});
