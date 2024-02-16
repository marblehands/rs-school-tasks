import { matrix, loadBoard } from './initial-game';
import { switchTimer } from './components/timer';

export function showSolution() {
  loadBoard(matrix, false);
  switchTimer('off');
}
