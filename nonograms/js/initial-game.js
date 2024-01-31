import templates from './templates.js';
import { drawBoard } from './build-page.js';
import { createBasicNode } from './build-page.js';
import { drawHeader } from './header.js';
import { drawGameControls } from './footer.js';
import { resetGridItem } from './reset-game.js';
import { clickHandler } from './handle-events.js';

// Initial Variables
export let template = templates[0][0]; //default object
export let map = templates[0][0].map; //default image matrix
export let size = templates[0][0].size; //default level of complexity

// Initial calls for default game
drawHeader();
drawBoard(size, map);
drawGameControls();

export function drawControls() {
  const levelWrapper = createBasicNode(0, 'section', 'level-wrapper');
  // eslint-disable-next-line no-unused-vars
  const title = createBasicNode(
    levelWrapper,
    'h2',
    'headline-2',
    'Choose Level'
  );
  const radioWrapper = createBasicNode(levelWrapper, 'div', 'radio-wrapper');
  createRadio(radioWrapper, 'Easy', 'easy');
  createRadio(radioWrapper, 'Medium', 'medium');
  createRadio(radioWrapper, 'Hard', 'hard');
  const continueBtn = createBasicNode(
    levelWrapper,
    'button',
    'link',
    'Confirm and Continue ->'
  );
  continueBtn.type = 'button';
  continueBtn.addEventListener('click', () => {
    drawBoard(size, map);
  });
}

function createRadio(parent, value, id) {
  const radioBtn = createBasicNode(parent, 'input', 'radio-input');
  radioBtn.type = 'radio';
  radioBtn.name = 'level';
  radioBtn.value = value;
  radioBtn.id = id;
  radioBtn.addEventListener('change', () => {
    setLevel(radioBtn.value);
  });
  const label = createBasicNode(parent, 'label', 'radio-btn');
  label.htmlFor = id;
  label.textContent = value;
}

export function setLevel(level) {
  switch (level) {
    case 'ease':
      size = 5;
      map = templates[0][0].map;
      break;
    case 'medium':
      size = 10;
      map = templates[1][0].map;
      break;
    case 'hard':
      size = 15;
      map = templates[2][0].map;
      break;
    default:
      size = 5;
      map = templates[0][0].map;
      break;
  }
  drawBoard(size, map);
  console.log('уровень: ', level);
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
