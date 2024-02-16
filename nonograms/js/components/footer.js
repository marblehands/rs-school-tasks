import { createBasicNode } from './build-page';
import { resetGame } from '../reset-game';
import { saveGame } from '../save-game';
import { showSolution } from '../show-solution';

export function drawGameControls() {
  const footer = createBasicNode(0, 'footer', 'footer');

  const solutionBtn = createBasicNode(footer, 'a', 'link', 'Show Solution');
  solutionBtn.addEventListener('click', showSolution);

  const resetBtn = createBasicNode(footer, 'a', 'link', 'Reset Game');
  resetBtn.addEventListener('click', resetGame);

  const saveBtn = createBasicNode(footer, 'a', 'link', 'Save Current Game');
  saveBtn.addEventListener('click', saveGame);
}
