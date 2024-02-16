import { checkStateOfGame } from './handle-events';
import { getMatrix } from './handle-matrix';
import { template } from './initial-game';
import { seconds, minutes } from './components/timer';
import { WINS } from './components/score';

export function saveGame() {
  const currentMatrix = getMatrix();
  const isGameOver = checkStateOfGame();
  if (!isGameOver) {
    const data = {
      state: currentMatrix,
      template,
      seconds,
      minutes,
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
  const { name, level } = template;
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
      JSON.stringify([{ name, level, time }]),
    );
  }
}
