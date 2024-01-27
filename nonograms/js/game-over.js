import { createBasicNode } from './build-page.js';
import { createLink } from './footer.js';

export function drawModal(time) {
  const modalWrapper = createBasicNode(0, 'div', 'modal');
  const modalInfo = createBasicNode(modalWrapper, 'div', 'modal__info');
  const title = createBasicNode(
    modalInfo,
    'h2',
    'modal__title',
    `Great! You have solved the nonogram in ${time} seconds!`
  );
  const footer = createBasicNode(modalWrapper, 'footer', 'footer');
  createLink(footer, 'link', 'Play Again');
  createLink(footer, 'link', 'Play Random Game');
  createLink(footer, 'link', 'View High Score');
}
