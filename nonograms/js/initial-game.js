import templates from './templates.js';
import { drawBoard } from './build-page.js';

// Initial Variables
export let map = templates[0][0].map; //default image and level
export let size = 5; //default level of complexity

drawBoard(size, map);
