import { createBasicNode } from './build-page.js';
import { seconds } from './timer.js';

export function drawModal() {
  const modalWrapper = createBasicNode(0, 'div', 'modal modal__game-over');
  const modalContent = createBasicNode(modalWrapper, 'div', 'modal__content');
  // eslint-disable-next-line no-unused-vars
  const title = createBasicNode(
    modalContent,
    'h2',
    'modal__title',
    `Great! You have solved the nonogram in ${seconds} seconds!`
  );
  const footer = createBasicNode(modalWrapper, 'footer', 'footer');
  // eslint-disable-next-line no-unused-vars
  const playBtn = createBasicNode(footer, 'a', 'link', 'Play Again');
  // eslint-disable-next-line no-unused-vars
  const playRandomBtn = createBasicNode(
    footer,
    'a',
    'link',
    'Play Random Game'
  );
  // eslint-disable-next-line no-unused-vars
  const scoreBtn = createBasicNode(footer, 'a', 'link', 'View High Score');
}
