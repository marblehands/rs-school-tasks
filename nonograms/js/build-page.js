import templates from './templates.js';

let gridItems = [];

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
    gridItems.push(gridItem);
  }
  document.body.append(gridWrapper);

  gridWrapper.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  gridWrapper.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  const button = createBasicNode(0, 'button', 0, 'btn-get-matrix');

  button.addEventListener('click', getMatrix);
  document.body.append(button);
  button.style.display = 'none';
}

export function createEmptyMatrix(size) {
  let matrix = [];
  for (let i = 0; i < size; i++) {
    const arrRow = new Array(size).fill(0);
    matrix.push(arrRow);
  }
  return matrix;
}

function clickHandler(event) {
  const item = event.currentTarget;
  item.style.backgroundColor = 'black';
  item.coloured = 'true';
  console.log(item.property);
}

drawBoard(5);

function getMatrix() {
  const gridItems = document.querySelectorAll('.board-item');
  let arr = [];
  Array.from(gridItems).map((item) => {
    if (item.coloured) {
      arr.push(1);
    } else {
      arr.push(0);
    }
    return item;
  });
  let matrix = [];
  for (let i = 0; i < 21; i += 5) {
    matrix.push(arr.slice(i, i + 5));
  }
  return console.log(JSON.stringify({ size: 5, name: 'hash', map: matrix }));
}
