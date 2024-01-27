import { clickHandler } from './handle-events.js';

export function resetGame() {
  const gridItems = document.querySelectorAll('.count');
  const arr = Array.from(gridItems);
  arr.forEach((item) => {
    resetGridItem(item);
    item.addEventListener('click', clickHandler);
    item.addEventListener('contextmenu', clickHandler);
  });
}

export function resetGridItem(item) {
  item.coloured = 'false';
  item.checked = 'false';
  item.style.backgroundColor = 'transparent';
  item.classList.remove('grid-item-checked');
  item.removeEventListener('click', clickHandler);
  item.removeEventListener('contextmenu', clickHandler);
}
