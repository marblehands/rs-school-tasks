export function clickHandler(event) {
  const item = event.currentTarget;
  if (event.button === 0) {
    if (!item.coloured || item.coloured === 'false') {
      item.style.backgroundColor = 'black';
      item.coloured = 'true';
      item.checked = 'false';
    } else {
      item.style.backgroundColor = 'transparent';
      item.classList.remove('grid-item-checked');
      item.coloured = 'false';
      item.checked = 'false';
    }
  }
  if (event.button === 2) {
    if (!item.checked || item.checked === 'false') {
      item.style.backgroundColor = 'transparent';
      item.classList.add('grid-item-checked');
      item.checked = 'true';
      item.coloured = 'false';
    } else {
      item.style.backgroundColor = 'transparent';
      item.classList.remove('grid-item-checked');
      item.checked = 'false';
      item.coloured = 'false';
    }
  }
}
