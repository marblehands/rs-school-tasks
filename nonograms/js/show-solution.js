import { map } from './initial-game.js';
import { resetGridItem } from './reset-game.js';

export function showSolution() {
  const gridItems = document.querySelectorAll('.count');
  gridItems.forEach((item) => resetGridItem(item));
  console.log('show solution');
  const arr = Array.from(gridItems);
  const mapArr = map.flat();
  arr.forEach((item, index) => {
    if (mapArr[index]) item.style.backgroundColor = 'black';
  });
}
