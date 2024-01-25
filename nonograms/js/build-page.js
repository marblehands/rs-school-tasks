import templates from './templates.js';
import { countHints, getMatrix } from './handle-matrix.js';
import { createEmptyMatrix } from './handle-matrix.js';
import { clickHandler } from './handle-events.js';

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
    gridItem.addEventListener('click', clickHandler);
  }
  document.body.append(gridWrapper);

  gridWrapper.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  gridWrapper.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  const button = createBasicNode(0, 'button', 0, 'btn-get-matrix');

  button.addEventListener('click', getMatrix);
  document.body.append(button);
  button.style.display = 'none';
}

drawBoard(5);

console.log(countHints(templates[0].map));

export function drawHints() {}
