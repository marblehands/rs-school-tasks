export function getMatrix() {
  const gridItems = document.querySelectorAll('.count');
  const size = Math.sqrt(Array.from(gridItems).length);
  let arr = [];
  Array.from(gridItems).map((item) => {
    if (item.coloured === 'true') {
      arr.push(1);
    } else if (item.checked === 'true') {
      arr.push(2);
    } else {
      arr.push(0);
    }
    return item;
  });
  let matrix = [];
  let limitNum = size ** 2 - (size - 1);
  for (let i = 0; i < limitNum; i += size) {
    matrix.push(arr.slice(i, i + size));
  }
  return matrix;
}

export function countHints(map) {
  let rows = [];
  let columns = [];

  for (let i = 0; i < map.length; i++) {
    let rowHints = [];
    let count = 0;
    for (let k = 0; k < map.length; k++) {
      if (map[i][k]) {
        count++;
        if (count === map.length || k === map.length - 1) {
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
