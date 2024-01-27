import { createBasicNode } from './build-page.js';
import { resetGame } from './reset-game.js';
import { showSolution } from './show-solution.js';

export function drawGameControls() {
  const footer = createBasicNode(0, 'footer', 'footer');
  const solutionBtn = createLink(footer, 'link', 'Show Solution');
  solutionBtn.addEventListener('click', showSolution);
  const resetBtn = createLink(footer, 'link', 'Reset Game');
  resetBtn.addEventListener('click', resetGame);
  createLink(footer, 'link', 'Save Current Game');
}

export function createLink(parent, classes, content) {
  // eslint-disable-next-line no-unused-vars
  const link = createBasicNode(parent, 'a', classes, content);
  return link;
}
