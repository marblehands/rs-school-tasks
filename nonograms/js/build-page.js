import templates from './templates.js';

export function createBasicNode(parent, tag, attributes, classes) {
  const node = document.createElement(tag);
  if (parent) parent.append(node);
  if (!parent) document.body.append(node);
  if (classes) node.className = classes;
  return node;
}

export function drawBoard(size) {
  const gridWrapper = createBasicNode(0, 'div', 0, 'board-wrapper');
  for (let i = 0; i < size ** 2; i++) {
    const gridItem = createBasicNode(gridWrapper, 'div', 0, 'board-item');
  }
  document.body.append(gridWrapper);
  gridWrapper.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  gridWrapper.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
}

export function createEmptyMatrix(size) {
  let matrix = [];
  for (let i = 0; i < size; i++) {
    const arrRow = new Array(size).fill(0);
    matrix.push(arrRow);
  }
  return matrix;
}

drawBoard(5);
