import { getMatrix } from './handle-matrix.js';
import { map } from './initial-game.js';
import { drawModal } from './game-over.js';
import { switchTimer } from './timer.js';

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
}

export function clickHandler(event) {
  event.preventDefault();
  const item = event.currentTarget;
  if (event.button === 0) {
    if (!item.coloured || item.coloured === 'false') {
      item.classList.add('grid-item-coloured');
      item.coloured = 'true';
      item.checked = 'false';
    } else {
      item.classList.remove('grid-item-coloured');
      item.classList.remove('grid-item-checked');
      item.coloured = 'false';
      item.checked = 'false';
    }
  }
  if (event.button === 2) {
    if (!item.checked || item.checked === 'false') {
      item.classList.remove('grid-item-coloured');
      item.classList.add('grid-item-checked');
      item.checked = 'true';
      item.coloured = 'false';
    } else {
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

export function checkStateOfGame() {
  const currentMatrix = getMatrix();
  const matrixComparison = compareMatrix(map, currentMatrix);
  return matrixComparison;
}
