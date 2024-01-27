import { createBasicNode } from './build-page.js';

export function drawHeader() {
  const headerWrapper = createBasicNode(0, 'header', 'header');
  // eslint-disable-next-line no-unused-vars
  const logo = createBasicNode(headerWrapper, 'div', 'logo', 'NONO GAME');
  // eslint-disable-next-line no-unused-vars
  const settingsWrapper = createBasicNode(headerWrapper, 'nav', 'header__nav');
  drawButton(settingsWrapper, 'header__btn header__btn_sound');
  drawButton(settingsWrapper, 'header__btn header__btn_settings');
  drawButton(settingsWrapper, 'header__btn header__btn_score');
}

function drawButton(parent, classes = '', content = '') {
  // eslint-disable-next-line no-unused-vars
  const btn = createBasicNode(parent, 'button', classes, content);
}
