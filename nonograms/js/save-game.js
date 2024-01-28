import { checkStateOfGame } from './handle-events.js';
import { getMatrix } from './handle-matrix.js';
import { template } from './initial-game.js';

export function saveGame() {
  const currentMatrix = getMatrix();
  console.log(currentMatrix);
  const isGameOver = checkStateOfGame();
  if (!isGameOver) {
    const data = {
      state: currentMatrix,
      template: template,
    };
    localStorage.setItem('game-marblehands', JSON.stringify(data));
  }
}

export function getSavedGame() {
  const data = JSON.parse(localStorage.getItem('game-marblehands')) || 0;
  return data;
}
