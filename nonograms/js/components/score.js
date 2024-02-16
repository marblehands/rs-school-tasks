import { createBasicNode, closeModal } from './build-page';
import { getSavedWins } from '../save-game';

export const WINS = 5;
let isScore = false;

export function drawScore() {
  const modalWrapper = createBasicNode(0, 'div', 'modal modal__score');
  const modalContent = createBasicNode(modalWrapper, 'div', 'modal__content');
  // eslint-disable-next-line no-unused-vars
  const title = createBasicNode(modalContent, 'h2', 'modal__title', 'Score');
  drawTable(modalContent, WINS);
  fillColumn('name');
  fillColumn('level');
  fillColumn('time');

  const button = createBasicNode(
    modalContent,
    'button',
    'form__btn form__btn_close',
    'Close',
    {
      type: 'button',
    },
  );

  button.addEventListener('click', () => {
    closeModal('modal__score');
  });
}

function drawTable(parent, rows) {
  const table = createBasicNode(parent, 'table', 'table');
  const thead = createBasicNode(table, 'thead');
  const tr = createBasicNode(thead, 'tr', 'table__header');
  const titles = ['Puzzle', 'Difficulty', 'Time'];
  titles.forEach((title) =>
    createBasicNode(tr, 'th', 'table__headline', title),
  );
  const tbody = createBasicNode(table, 'tbody');
  let count = rows;
  while (count) {
    drawRow(tbody, titles.length);
    count--;
  }
}

function drawRow(parent, columns) {
  const row = createBasicNode(parent, 'tr', 'table__row');
  const dataAttributes = ['name', 'level', 'time'];
  for (let i = 0; i < columns; i++) {
    let content = '--';
    if (i === 2) {
      content = '00:00';
    }
    // eslint-disable-next-line no-unused-vars
    const cell = createBasicNode(
      row,
      'td',
      `table__cell ${dataAttributes[i]}`,
      content,
      {
        'data-name': dataAttributes[i],
      },
    );
  }
}

// there is the same function toggleSettings, maybe better to refactor these two into one
export function toggleScore(event) {
  const btn = event.currentTarget;
  const score = document.querySelector('.modal__score');
  if (!score) {
    btn.classList.add('checked');
    drawScore();
    closeModal('modal__game-over');
    closeModal('modal__settings');
  } else {
    document.body.removeChild(score);
    btn.classList.remove('checked');
  }
  isScore = !isScore;
}

function fillColumn(property) {
  const games = getSavedWins() || 0;
  const cells = document.querySelectorAll(`[data-name="${property}"]`);
  if (games) {
    let data = games.map((game) => game[property]);
    if (property === 'time') {
      data = data.map((time) => formatTime(time));
    }
    cells.forEach((cell, index) => {
      if (data[index]) {
        cell.textContent = data[index];
      } else {
        cell.textContent = '--';
      }
    });
  }
}

function formatTime(str) {
  const seconds = Number(str);
  const minutes = Math.floor(seconds / 60);
  const restOfSeconds = seconds % (minutes * 60) || seconds;
  return `${minutes.toString().padStart(2, '0')}:${restOfSeconds
    .toString()
    .padStart(2, '0')}`;
}
