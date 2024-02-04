import templates from './templates.js';
import { drawBoard } from './components/build-page.js';
import { drawHeader } from './components/header.js';
import { drawGameControls } from './components/footer.js';
import { resetGridItem } from './reset-game.js';
import { clickHandler } from './handle-events.js';

// Initial Variables
export let template = templates[0][0]; //default object
export let map = templates[0][0].map; //default image matrix
export let size = 5; //default level of complexity

// Initial calls for default game
drawHeader();
drawBoard(templates[0][0].size, templates[0][0].map);
drawGameControls();
saveSettings();
// setPuzzle('hash');

export function setLevel(level) {
  if (!level) {
    size = 5;
    map = templates[0][0].map;
  }
  switch (level) {
    case 'ease':
      size = 5;
      // map = templates[0][0].map;
      break;
    case 'medium':
      size = 10;
      // map = templates[1][0].map;
      break;
    case 'hard':
      size = 15;
      // map = templates[2][0].map;
      break;
    default:
      size = 5;
      // map = templates[0][0].map;
      break;
  }
  // drawBoard(size, map);
  // console.log('уровень: ', level);
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
  console.log(mapArr);
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
  console.log(name);
  const arr = templates.flat();
  const puzzle = arr.filter((item) => item.name === name);
  template = puzzle[0];
  map = template.map;
  size = Number(template.size);
  drawBoard(size, map);
}

function saveSettings() {
  const data = { level: 'easy', name: 'hash' };
  localStorage.setItem('set-marblehands', JSON.stringify(data));
}
