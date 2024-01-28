import { map } from './initial-game.js';
import { resetGridItem } from './reset-game.js';
import { switchTimer } from './timer.js';

export function showSolution() {
  const gridItems = document.querySelectorAll('.count');
  gridItems.forEach((item) => resetGridItem(item));
  const arr = Array.from(gridItems);
  const mapArr = map.flat();
  arr.forEach((item, index) => {
    if (mapArr[index]) item.style.backgroundColor = 'black';
  });
  switchTimer('off');
}
