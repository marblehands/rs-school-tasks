import templates from './templates.js';
import { drawHeader } from './components/header.js';
import { drawGameControls } from './components/footer.js';
import { resetGridItem } from './reset-game.js';
import { clickHandler } from './handle-events.js';
import { createBoard } from './components/create-board.js';

// Initial Variables
export let template = templates[0][0]; //default object
export let map = templates[0][0].map; //default image matrix
export let size = 5; //default level of complexity

// Initial calls for default game
drawHeader();
createBoard(templates[0][0].size, templates[0][0].map);
drawGameControls();
saveSettings();

export function setLevel(level) {
  if (!level) {
    size = 5;
    map = templates[0][0].map;
  }
  switch (level) {
    case 'ease':
      size = 5;
      break;
    case 'medium':
      size = 10;
      break;
    case 'hard':
      size = 15;
      break;
    default:
      size = 5;
      break;
  }
}

export function loadGame(state, templateData) {
  template = templateData;
  map = templateData.map;
  size = templateData.size;

  loadBoard(state, true);
}

export function loadBoard(matrix, isBtnActive) {
  const gridItems = document.querySelectorAll('.count');
  const mapArr = matrix.flat();
  gridItems.forEach((item, index) => {
    resetGridItem(item);
    if (isBtnActive) {
      item.addEventListener('click', clickHandler);
      item.addEventListener('contextmenu', clickHandler);
    }
    loadGridItem(mapArr[index], item);
  });
}

export function loadGridItem(value, item) {
  if (!value) drawEmptyItem(item);
  if (value === 1) drawBlackItem(item);
  if (value === 2) drawCrossItem(item);
}

function drawBlackItem(item) {
  item.classList.add('grid-item-coloured');
  item.classList.remove('grid-item-checked');
  item.coloured = 'true';
  item.checked = 'false';
}

function drawCrossItem(item) {
  item.classList.remove('grid-item-coloured');
  item.classList.add('grid-item-checked');
  item.coloured = 'false';
  item.checked = 'true';
}

function drawEmptyItem(item) {
  item.classList.remove('grid-item-coloured');
  item.classList.remove('grid-item-checked');
  item.coloured = 'false';
  item.checked = 'false';
}

export function setPuzzle(name) {
  const arr = templates.flat();
  const puzzle = arr.filter((item) => item.name === name);
  template = puzzle[0];
  map = template.map;
  size = Number(template.size);
  createBoard(size, map);
}

function saveSettings() {
  const data = { level: 'easy', name: 'hash' };
  localStorage.setItem('set-marblehands', JSON.stringify(data));
}
