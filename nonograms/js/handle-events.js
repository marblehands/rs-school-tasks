import { getMatrix } from './handle-matrix.js';
import { map } from './initial-game.js';

export function compareMatrix(map, currentMatrix) {
  for (let i = 0; i < map.length; i++) {
    for (let k = 0; k < map[0].length; k++) {
      if (currentMatrix[i][k] === 2) continue;
      if (currentMatrix[i][k] !== map[i][k]) {
        return false;
      }
    }
  }
  return true;
}

function endGame() {
  alert('game over');
}

export function clickHandler(event) {
  const item = event.currentTarget;
  if (event.button === 0) {
    if (!item.coloured || item.coloured === 'false') {
      item.style.backgroundColor = 'black';
      item.coloured = 'true';
      item.checked = 'false';
    } else {
      item.style.backgroundColor = 'transparent';
      item.classList.remove('grid-item-checked');
      item.coloured = 'false';
      item.checked = 'false';
    }
  }
  if (event.button === 2) {
    if (!item.checked || item.checked === 'false') {
      item.style.backgroundColor = 'transparent';
      item.classList.add('grid-item-checked');
      item.checked = 'true';
      item.coloured = 'false';
    } else {
      item.style.backgroundColor = 'transparent';
      item.classList.remove('grid-item-checked');
      item.checked = 'false';
      item.coloured = 'false';
    }
  }
  checkStateOfGame();
}

function checkStateOfGame() {
  const currentMatrix = getMatrix();
  console.log(currentMatrix);
  const matrixComparison = compareMatrix(map, currentMatrix);
  if (matrixComparison) setTimeout(endGame, 450);
}
