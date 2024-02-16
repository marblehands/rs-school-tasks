import { matrix, loadBoard } from './initial-game.js';
import { switchTimer } from './components/timer.js';

export function showSolution() {
  loadBoard(matrix, false);
  switchTimer('off');
}
