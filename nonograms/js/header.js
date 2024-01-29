import { createBasicNode } from './build-page.js';
import { changeTheme } from './change-theme.js';
import { toggleSound } from './audio.js';
import { toggleSettings } from './game-settings.js';

export function drawHeader() {
  const headerWrapper = createBasicNode(0, 'header', 'header');

  const logo = createBasicNode(headerWrapper, 'div', 'logo', 'NONO GAME');
  logo.addEventListener('click', changeTheme);

  const settingsWrapper = createBasicNode(headerWrapper, 'nav', 'header__nav');

  const soundBtn = createBasicNode(
    settingsWrapper,
    'button',
    'header__btn header__btn_sound',
    '',
    { type: 'button', 'aria-label': 'turn on and turn off sound effects' }
  );
  soundBtn.addEventListener('click', toggleSound);

  const settingsBtn = createBasicNode(
    settingsWrapper,
    'button',
    'header__btn header__btn_settings',
    '',
    { type: 'button', 'aria-label': 'open game settings modal window' }
  );
  settingsBtn.addEventListener('click', toggleSettings);

  // eslint-disable-next-line no-unused-vars
  const scoreBtn = createBasicNode(
    settingsWrapper,
    'button',
    'header__btn header__btn_score',
    '',
    { type: 'button', 'aria-label': 'open score table' }
  );
}
