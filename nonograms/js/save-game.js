import { checkStateOfGame } from './handle-events.js';
import { getMatrix } from './handle-matrix.js';
import { template } from './initial-game.js';
import { seconds, minutes } from './components/timer.js';
import { WINS } from './components/score.js';

export function saveGame() {
  const currentMatrix = getMatrix();
  const isGameOver = checkStateOfGame();
  if (!isGameOver) {
    const data = {
      state: currentMatrix,
      template: template,
      seconds: seconds,
      minutes: minutes,
    };
    localStorage.setItem('game-marblehands', JSON.stringify(data));
  }
}

export function getSavedGame() {
  const data = JSON.parse(localStorage.getItem('game-marblehands')) || 0;
  return data;
}

export function getSavedWins() {
  const data = JSON.parse(localStorage.getItem('win-marblehands')) || 0;
  if (data) return data.sort((a, b) => a.time - b.time);
}

export function saveWinGame() {
  const name = template.name;
  const level = template.level;
  const time = minutes * 60 + seconds;
  const data = getSavedWins();
  if (data) {
    if (data.length >= WINS) {
      const itemsRemoved = data.length - WINS + 1;
      data.splice(0, itemsRemoved);
    }
    data.push({ name, level, time });
    localStorage.setItem('win-marblehands', JSON.stringify(data));
  } else {
    localStorage.setItem(
      'win-marblehands',
      JSON.stringify([{ name, level, time }])
    );
  }
}
