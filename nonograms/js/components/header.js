import { createBasicNode } from './build-page';
import { toggleSound } from './audio';
import { toggleSettings } from './game-settings';
import { toggleScore } from './score';
import { drawToggle } from './theme-toggle';

export function drawHeader() {
  const headerWrapper = createBasicNode(0, 'header', 'header');

  // eslint-disable-next-line no-unused-vars
  const logo = createBasicNode(headerWrapper, 'div', 'logo', 'NONO GAME');

  const settingsWrapper = createBasicNode(headerWrapper, 'nav', 'header__nav');

  const soundBtn = createBasicNode(
    settingsWrapper,
    'button',
    'header__btn header__btn_sound',
    '',
    {
      type: 'button',
      'aria-label': 'turn on and turn off sound effects',
      id: 'sound',
    },
  );
  soundBtn.addEventListener('click', toggleSound);

  const settingsBtn = createBasicNode(
    settingsWrapper,
    'button',
    'header__btn header__btn_settings',
    '',
    {
      type: 'button',
      'aria-label': 'open game settings modal window',
      id: 'settings',
    },
  );
  settingsBtn.addEventListener('click', toggleSettings);

  const scoreBtn = createBasicNode(
    settingsWrapper,
    'button',
    'header__btn header__btn_score',
    '',
    { type: 'button', 'aria-label': 'open score table', id: 'score' },
  );
  scoreBtn.addEventListener('click', toggleScore);

  drawToggle(settingsWrapper);
}
