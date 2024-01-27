import { clickHandler } from './handle-events.js';
import { map } from './initial-game.js';

export function showSolution() {
  const gridItems = document.querySelectorAll('.count');
  gridItems.forEach((item) => {
    item.coloured = 'false';
    item.checked = 'false';
    item.style.backgroundColor = 'transparent';
    item.classList.remove('grid-item-checked');
    item.removeEventListener('click', clickHandler);
    item.removeEventListener('contextmenu', clickHandler);
  });
  console.log('show solution');
  const arr = Array.from(gridItems);
  const mapArr = map.flat();
  arr.forEach((item, index) => {
    if (mapArr[index]) item.style.backgroundColor = 'black';
  });
}
