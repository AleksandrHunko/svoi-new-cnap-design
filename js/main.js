import { initNav, initMenuToggle, initAccessibilityDialog, initSearchDialog } from './nav.js';
import { validateInputs } from './validate-inputs.js';

import { initSliders } from './slider-control.js'
import { galleryInit } from './gallery.js';


window.addEventListener('load', () => {
  initNav();
  initMenuToggle();
  initAccessibilityDialog();
  initSearchDialog();

  validateInputs();

  initSliders();

  galleryInit()
  document.querySelector('.copyright-year').innerHTML = `toolkit.in.ua ${new Date().getFullYear()}. Всі права захищені.`
});