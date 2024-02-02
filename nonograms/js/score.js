import { createBasicNode } from './build-page.js';
import { getSavedWins } from './save-game.js';

export const WINS = 5;
let isScore = false;

export function drawScore() {
  const modalWrapper = createBasicNode(0, 'div', 'modal modal__score');
  const modalContent = createBasicNode(modalWrapper, 'div', 'modal__content');
  // eslint-disable-next-line no-unused-vars
  const title = createBasicNode(modalContent, 'h2', 'modal__title', `Score`);
  drawTable(modalContent, WINS);
  fillColumn('name');
  fillColumn('level');
  fillColumn('time');
}

function drawTable(parent, rows) {
  const table = createBasicNode(parent, 'table', 'table');
  const thead = createBasicNode(table, 'thead');
  const tr = createBasicNode(thead, 'tr', 'table__header');
  const titles = ['Puzzle', 'Difficulty', 'Time'];
  titles.forEach((title) =>
    createBasicNode(tr, 'th', 'table__headline', title)
  );
  const tbody = createBasicNode(table, 'tbody');
  let count = rows;
  while (count) {
    drawRow(tbody, titles.length);
    count--;
  }
}

function drawRow(parent, columns) {
  const row = createBasicNode(parent, 'tr');
  const dataAttributes = ['name', 'level', 'time'];
  for (let i = 0; i < columns; i++) {
    let content = '--';
    if (i === 2) {
      content === '00:00';
    }
    // eslint-disable-next-line no-unused-vars
    const cell = createBasicNode(row, 'td', 'table__cell', content, {
      'data-name': dataAttributes[i],
    });
  }
}

//there is the same function toggleSettings, maybe better to refactor these two into one
export function toggleScore(event) {
  const btn = event.currentTarget;
  btn.classList.toggle('checked');
  if (!isScore) {
    drawScore();
  } else {
    const score = document.querySelector('.modal__score');
    document.body.removeChild(score);
  }
  isScore = !isScore;
}

function fillColumn(property) {
  const games = getSavedWins() || 0;
  if (games) {
    let data = games.map((game) => game[property]);
    if (property === 'time') {
      data = data.map((time) => formatTime(time));
    }
    const cells = document.querySelectorAll(`[data-name="${property}"]`);
    cells.forEach((cell, index) => {
      cell.textContent = data[index];
    });
  }
}

function formatTime(str) {
  let seconds = Number(str);
  const minutes = Math.floor(seconds / 60);
  const restOfSeconds = seconds % (minutes * 60) || seconds;
  return `${minutes.toString().padStart(2, '0')}:${restOfSeconds
    .toString()
    .padStart(2, '0')}`;
}
