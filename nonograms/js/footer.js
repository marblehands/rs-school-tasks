import { createBasicNode } from './build-page.js';
import { resetGame } from './reset-game.js';
import { showSolution } from './show-solution.js';

export function drawGameControls() {
  const footer = createBasicNode(0, 'footer', 'footer');
  const solutionBtn = createBasicNode(footer, 'a', 'link', 'Show Solution');
  solutionBtn.addEventListener('click', showSolution);
  const resetBtn = createBasicNode(footer, 'a', 'link', 'Reset Game');
  resetBtn.addEventListener('click', resetGame);
  // eslint-disable-next-line no-unused-vars
  const saveBtn = createBasicNode(footer, 'a', 'link', 'Save Current Game');
}
