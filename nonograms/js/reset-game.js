import { clickHandler } from './handle-events';
import { switchTimer, resetWatch } from './components/timer';

export function resetGridItem(item) {
  item.coloured = 'false';
  item.checked = 'false';
  item.classList.remove('grid-item-coloured');
  item.classList.remove('grid-item-checked');
  item.removeEventListener('click', clickHandler);
  item.removeEventListener('contextmenu', clickHandler);
}

export function resetGame() {
  const gridItems = document.querySelectorAll('.count');
  const arr = Array.from(gridItems);
  arr.forEach((item) => {
    resetGridItem(item);
    item.addEventListener('click', clickHandler);
    item.addEventListener('contextmenu', clickHandler);
  });
  switchTimer('off');
  resetWatch();
}
