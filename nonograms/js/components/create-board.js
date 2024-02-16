import { createBasicNode } from './build-page';
import { countHints } from '../handle-matrix';
import { drawWatch } from './timer';
import { clickHandler } from '../handle-events';

let maxLength;
let num;
let wrapper;

export function createBoard(size, map) {
  // get the necessary data
  const hints = getHints(map);
  // eslint-disable-next-line no-unused-vars
  const { rows } = hints;
  // eslint-disable-next-line no-unused-vars
  const { columns } = hints;
  maxLength = hints.maxLength;
  const module = size / 5;
  const main = createMain();

  // create timer elements
  drawWatch(main);

  // create game board
  // main wrapper
  const wrapperSize = getWrapperSize();
  num = size + maxLength;
  wrapper = createBasicNode(main, 'div', 'wrapper');
  wrapper.style.gridTemplateColumns = `calc((${wrapperSize}vw / ${num}) * ${maxLength}) 1fr`;
  wrapper.style.gridTemplateRows = `calc((${wrapperSize}vw / ${num}) * ${maxLength}) 1fr`;

  // eslint-disable-next-line no-unused-vars
  const img = createBasicNode(wrapper, 'div', 'img-preview');

  // create columns hints
  const columnHintsWrapper = createBasicNode(
    wrapper,
    'div',
    'column-hints-wrapper',
  );
  columnHintsWrapper.style.gridTemplateColumns = `repeat(${module}, 1fr)`;

  const columnHintItems = [];
  for (let i = 0; i < module; i++) {
    const columnHintsArea = createBasicNode(
      columnHintsWrapper,
      'div',
      'column-hints-area',
    );
    for (let i = 0; i < 5; i++) {
      const columnHints = createBasicNode(
        columnHintsArea,
        'div',
        'column-hints',
      );
      columnHints.style.gridTemplateRows = `repeat(${maxLength}, 1fr)`;
      const columnArr = [];
      for (let i = 0; i < maxLength; i++) {
        const hintItem = createBasicNode(columnHints, 'div', 'hint-item');
        columnArr.push(hintItem);
        if (module > 1) hintItem.style.fontSize = '80%';
      }
      columnHintItems.push(columnArr);
    }
  }

  // fill in column items with hints
  fillHints(columnHintItems, columns);

  // create rows hints
  const rowHintsWrapper = createBasicNode(wrapper, 'div', 'row-hints-wrapper');
  rowHintsWrapper.style.gridTemplateRows = `repeat(${module}, 1fr)`;

  const rowHintItems = [];
  for (let i = 0; i < module; i++) {
    const rowHintsArea = createBasicNode(
      rowHintsWrapper,
      'div',
      'row-hints-area',
    );
    for (let i = 0; i < 5; i++) {
      const rowHints = createBasicNode(rowHintsArea, 'div', 'row-hints');
      rowHints.style.gridTemplateColumns = `repeat(${maxLength}, 1fr)`;
      const rowArr = [];
      for (let i = 0; i < maxLength; i++) {
        const hintItem = createBasicNode(rowHints, 'div', 'hint-item');
        rowArr.push(hintItem);
        if (module > 1) hintItem.style.fontSize = '80%';
      }
      rowHintItems.push(rowArr);
    }
  }

  // fill in row items with hints
  fillHints(rowHintItems, rows);

  // create grid board
  const gridWrapper = createBasicNode(wrapper, 'div', 'grid-wrapper');
  gridWrapper.style.gridTemplateColumns = `repeat(${module}, 1fr)`;
  gridWrapper.style.gridTemplateRows = `repeat(${module}, 1fr)`;
  for (let i = 0; i < module ** 2; i++) {
    const gridItemsArea = createBasicNode(gridWrapper, 'div', 'grid-area-item');
    for (let j = 0; j < 25; j++) {
      const gridItem = createBasicNode(gridItemsArea, 'div', 'grid-item count');
      gridItem.addEventListener('click', clickHandler);
      gridItem.addEventListener('contextmenu', clickHandler);
    }
  }
}

export function getHints(map) {
  const hints = countHints(map);
  let { rows } = hints;
  let { columns } = hints;

  maxLength = 0;
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

  return { rows, columns, maxLength };
}

function createMain() {
  let main = document.querySelector('.main');
  if (main) {
    main.innerHTML = '';
  } else {
    main = createBasicNode(0, 'main', 'main');
  }
  return main;
}

// eslint-disable-next-line no-unused-vars
function fillHints(data, hints) {
  for (let i = 0; i < data.length; i++) {
    for (let k = 0; k < data[0].length; k++) {
      data[i][k].textContent = hints[i][k] || ' ';
    }
  }
}

function getWrapperSize() {
  const windowWidth = window.innerWidth;

  if (windowWidth <= 640) {
    return 86;
  } else if (windowWidth <= 768) {
    return 70;
  } else if (windowWidth <= 900) {
    return 60;
  } else if (windowWidth <= 1200) {
    return 50;
  } else {
    return 35;
  }
}

window.addEventListener('resize', () => {
  const wrapperSize = getWrapperSize();
  wrapper.style.gridTemplateColumns = `calc((${wrapperSize}vw / ${num}) * ${maxLength}) 1fr`;
  wrapper.style.gridTemplateRows = `calc((${wrapperSize}vw / ${num}) * ${maxLength}) 1fr`;
});
