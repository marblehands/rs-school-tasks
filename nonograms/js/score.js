import { createBasicNode } from './build-page.js';

let isScore = false;

function drawScore() {
  const modalWrapper = createBasicNode(0, 'div', 'modal modal__score');
  const modalContent = createBasicNode(modalWrapper, 'div', 'modal__content');
  // eslint-disable-next-line no-unused-vars
  const title = createBasicNode(modalContent, 'h2', 'modal__title', `Score`);
}

export function toggleScore(event) {
  const btn = event.currentTarget;
  btn.classList.toggle('checked');
  if (!isScore) {
    drawScore();
  } else {
    const score = document.querySelector('.modal__score');
    document.body.removeChild(score);
  }
  isScore = !isScore;
}
