import { createBasicNode, closeModal } from './build-page.js';
import { seconds, minutes } from './timer.js';
import { playNewGame } from './game-settings.js';

export function drawModal() {
  const time = seconds + minutes * 60;
  const modalWrapper = createBasicNode(0, 'div', 'modal modal__game-over');
  const modalContent = createBasicNode(modalWrapper, 'div', 'modal__content');
  // eslint-disable-next-line no-unused-vars
  const title = createBasicNode(
    modalContent,
    'h2',
    'modal__title',
    `Great! You have solved the nonogram in ${time} seconds!`,
  );
  const button = createBasicNode(
    modalContent,
    'button',
    'form__btn form__btn_close',
    'Close',
    {
      type: 'button',
    },
  );

  button.addEventListener('click', () => {
    closeModal('modal__game-over');
    playNewGame();
  });
}
