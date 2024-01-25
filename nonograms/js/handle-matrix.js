import templates from './templates.js';

export function createEmptyMatrix(size) {
  let matrix = [];
  for (let i = 0; i < size; i++) {
    const arrRow = new Array(size).fill(0);
    matrix.push(arrRow);
  }
  return matrix;
}

export function getMatrix() {
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

export function countHints(map) {
  console.log(map);
  let rows = [];
  let columns = [];

  for (let i = 0; i < map.length; i++) {
    let rowHints = [];
    let count = 0;
    for (let k = 0; k < map.length; k++) {
      if (map[i][k]) {
        count++;
        if (count === map.length) {
          rowHints.push(count);
        }
      } else if (count) {
        rowHints.push(count);
        count = 0;
      }
    }
    rows.push(rowHints);
  }

  for (let i = 0; i < map.length; i++) {
    let columnHints = [];
    let count = 0;
    for (let k = 0; k < map.length; k++) {
      if (map[k][i]) {
        count++;
        if (count === map.length || k === map.length - 1) {
          columnHints.push(count);
        }
      } else if (count) {
        columnHints.push(count);
        count = 0;
      }
    }
    columns.push(columnHints);
  }
  return { rows: rows, columns: columns };
}
