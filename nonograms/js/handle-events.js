import { getMatrix } from './handle-matrix.js';
import { matrix } from './initial-game.js';
import { drawModal } from './components/game-over.js';
import { switchTimer } from './components/timer.js';
import { saveWinGame } from './save-game.js';
import {
  playCellColoured,
  playCellEmpty,
  playCellCross,
  playWinGame,
} from './components/audio.js';

export function compareMatrix(map, currentMatrix) {
  for (let i = 0; i < map.length; i++) {
    for (let k = 0; k < map[0].length; k++) {
      if (currentMatrix[i][k] === 2 && !map[i][k]) continue;
      if (currentMatrix[i][k] !== map[i][k]) {
        return false;
      }
    }
  }
  return true;
}

function endGame() {
  drawModal();
  playWinGame();
  saveWinGame();
}

export function checkStateOfGame() {
  const currentMatrix = getMatrix();
  const matrixComparison = compareMatrix(matrix, currentMatrix);
  return matrixComparison;
}

export function clickHandler(event) {
  event.preventDefault();
  const item = event.currentTarget;
  if (event.button === 0) {
    if (!item.coloured || item.coloured === 'false') {
      playCellColoured();
      item.classList.add('grid-item-coloured');
      item.classList.remove('grid-item-checked');
      item.coloured = 'true';
      item.checked = 'false';
    } else {
      playCellEmpty();
      item.classList.remove('grid-item-coloured');
      item.classList.remove('grid-item-checked');
      item.coloured = 'false';
      item.checked = 'false';
    }
  }
  if (event.button === 2) {
    if (!item.checked || item.checked === 'false') {
      playCellCross();
      item.classList.remove('grid-item-coloured');
      item.classList.add('grid-item-checked');
      item.checked = 'true';
      item.coloured = 'false';
    } else {
      playCellEmpty();
      item.classList.remove('grid-item-coloured');
      item.classList.remove('grid-item-checked');
      item.checked = 'false';
      item.coloured = 'false';
    }
  }
  switchTimer('on');
  const isGameOver = checkStateOfGame();
  if (isGameOver) setTimeout(endGame, 450);
}
