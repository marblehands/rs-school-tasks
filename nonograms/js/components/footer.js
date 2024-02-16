import { createBasicNode } from './build-page.js';
import { resetGame } from '../reset-game.js';
import { saveGame } from '../save-game.js';
import { showSolution } from '../show-solution.js';

export function drawGameControls() {
  const footer = createBasicNode(0, 'footer', 'footer');

  const solutionBtn = createBasicNode(footer, 'a', 'link', 'Show Solution');
  solutionBtn.addEventListener('click', showSolution);

  const resetBtn = createBasicNode(footer, 'a', 'link', 'Reset Game');
  resetBtn.addEventListener('click', resetGame);

  const saveBtn = createBasicNode(footer, 'a', 'link', 'Save Current Game');
  saveBtn.addEventListener('click', saveGame);
}
