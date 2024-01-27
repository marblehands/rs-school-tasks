import templates from './templates.js';
import { drawBoard } from './build-page.js';
import { drawControls } from './choose-level.js';

// Initial Variables
export let map = templates[1][0].map; //default image and level
export let size = 10; //default level of complexity

export function setLevel(level) {
  switch (level) {
    case 'Ease':
      size = 5;
      break;
    case 'Medium':
      size = 10;
      map = templates[1][0].map;
      break;
    case 'Hard':
      size = 15;
      map = templates[2][0].map;
      break;
    default:
      size = 5;
      break;
  }
  console.log('уровень: ', level);
  drawBoard(size, map);
}

drawControls();
