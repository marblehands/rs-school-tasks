// import templates from './templates.js';
// import { getMatrix } from './handle-matrix.js';
import { clickHandler } from './handle-events.js';
import { countHints } from './handle-matrix.js';

export function createBasicNode(parent, tag, classes = '', content = '') {
  const node = document.createElement(tag);
  if (parent) parent.append(node);
  if (!parent) document.body.append(node);
  if (classes) node.className = classes;
  if (content) node.textContent = content;
  return node;
}

function defineModuleSize(size) {
  if (size === 5) return 60;
  if (size === 10) return 40;
  if (size === 15) return 30;
}

export function drawBoard(size, map) {
  const existingBoard = document.querySelector('.main');
  if (existingBoard) document.body.removeChild(existingBoard);
  const module = defineModuleSize(size);
  // Get hints
  const hints = countHints(map);
  let rows = hints.rows;
  let columns = hints.columns;

  let maxLength = 0;
  rows.forEach((row) => {
    maxLength = row.length > maxLength ? row.length : maxLength;
  });
  columns.forEach((column) => {
    maxLength = column.length > maxLength ? column.length : maxLength;
  });

  rows = rows.map((row) => {
    while (row.length < maxLength) {
      row.unshift(0);
    }
    return row;
  });

  columns = columns.map((column) => {
    while (column.length < maxLength) {
      column.unshift(0);
    }
    return column;
  });

  // console.log(rows);
  // console.log(columns);
  // console.log(maxLength);

  // Generate board
  const main = createBasicNode(0, 'main', 'main');
  const boardWrapper = createBasicNode(main, 'div', 'board-wrapper');
  boardWrapper.style.gridTemplateColumns = `${module * maxLength}px 1fr`;
  boardWrapper.style.gridTemplateRows = `${module * maxLength}px 1fr`;
  // eslint-disable-next-line no-unused-vars
  const imgPreview = createBasicNode(boardWrapper, 'div', 'img-preview');
  const columnHintsWrapper = createBasicNode(
    boardWrapper,
    'div',
    'column-hints-wrapper'
  );

  for (let i = 0; i < size; i++) {
    const columnWrapper = createBasicNode(
      columnHintsWrapper,
      'div',
      'column-wrapper'
    );
    for (let k = 0; k < maxLength; k++) {
      let content = columns[i][k] || ' ';
      const hintItem = createBasicNode(
        columnWrapper,
        'div',
        'hint-item grid-item',
        content
      );
      hintItem.style.width = `${module}px`;
      hintItem.style.height = `${module}px`;
    }
  }

  const rowHintsWrapper = createBasicNode(
    boardWrapper,
    'div',
    'row-hints-wrapper'
  );

  for (let i = 0; i < size; i++) {
    const rowWrapper = createBasicNode(rowHintsWrapper, 'div', 'row-wrapper');
    for (let k = 0; k < maxLength; k++) {
      let content = rows[i][k] || ' ';
      const hintItem = createBasicNode(
        rowWrapper,
        'div',
        'hint-item grid-item',
        content
      );
      hintItem.style.width = `${module}px`;
      hintItem.style.height = `${module}px`;
    }
  }

  const gridWrapper = createBasicNode(boardWrapper, 'div', 'grid-wrapper');
  for (let i = 0; i < size ** 2; i++) {
    const gridItem = createBasicNode(gridWrapper, 'div', 'grid-item count');
    gridItem.addEventListener('click', clickHandler);
    gridItem.addEventListener('contextmenu', clickHandler);
    gridItem.style.width = `${module}px`;
    gridItem.style.height = `${module}px`;
  }

  gridWrapper.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  gridWrapper.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  // const button = createBasicNode(0, 'button', 'btn-get-matrix', 'Get Matrix');

  // button.addEventListener('click', () => getMatrix(size));
  // document.body.append(button);
  // button.style.display = 'none';
}
