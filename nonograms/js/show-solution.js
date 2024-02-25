import { matrix } from './initial-game.js';
import { switchTimer } from './components/timer.js';
import { loadBoard } from './initial-game.js';

export function showSolution() {
  loadBoard(matrix, false);
  switchTimer('off');
}
