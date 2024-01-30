import { createBasicNode } from './build-page.js';

export const WINS = 5;
let isScore = false;

export function drawScore() {
  const modalWrapper = createBasicNode(0, 'div', 'modal modal__score');
  const modalContent = createBasicNode(modalWrapper, 'div', 'modal__content');
  // eslint-disable-next-line no-unused-vars
  const title = createBasicNode(modalContent, 'h2', 'modal__title', `Score`);
  drawTable(modalContent, WINS);
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
  const dataAttributes = ['puzzle', 'level', 'time'];
  for (let i = 0; i < columns; i++) {
    const cell = createBasicNode(row, 'th', 'table__cell', '--', {
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
