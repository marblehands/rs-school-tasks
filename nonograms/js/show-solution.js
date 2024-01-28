import { map } from './initial-game.js';
import { switchTimer } from './timer.js';
import { loadBoard } from './initial-game.js';

export function showSolution() {
  loadBoard(map, false);
  switchTimer('off');
}
