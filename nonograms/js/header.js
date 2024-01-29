import { createBasicNode } from './build-page.js';
import { changeTheme } from './change-theme.js';
import { toggleSound } from './audio.js';

export function drawHeader() {
  const headerWrapper = createBasicNode(0, 'header', 'header');

  const logo = createBasicNode(headerWrapper, 'div', 'logo', 'NONO GAME');
  logo.addEventListener('click', changeTheme);

  const settingsWrapper = createBasicNode(headerWrapper, 'nav', 'header__nav');

  const soundBtn = createBasicNode(
    settingsWrapper,
    'button',
    'header__btn header__btn_sound'
  );
  soundBtn.aliasLabel = 'turn on and turn off sound effects';
  soundBtn.addEventListener('click', toggleSound);

  const settingsBtn = createBasicNode(
    settingsWrapper,
    'button',
    'header__btn header__btn_settings'
  );
  settingsBtn.aliasLabel = 'open game settings modal window';

  const scoreBtn = createBasicNode(
    settingsWrapper,
    'button',
    'header__btn header__btn_score'
  );
  scoreBtn.aliasLabel = 'open score table';
}
