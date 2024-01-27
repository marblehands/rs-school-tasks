import templates from './templates.js';
import { drawBoard } from './build-page.js';
import { createBasicNode } from './build-page.js';
import { drawHeader } from './header.js';
import { drawGameControls } from './footer.js';

// Initial Variables
export let map = templates[0][0].map; //default image and level
export let size = 5; //default level of complexity

// Initial calls for default game
drawHeader();
drawBoard(size, map);
drawGameControls();

export function drawControls() {
  const levelWrapper = createBasicNode(0, 'section', 'level-wrapper');
  // eslint-disable-next-line no-unused-vars
  const title = createBasicNode(
    levelWrapper,
    'h2',
    'headline-2',
    'Choose Level'
  );
  const radioWrapper = createBasicNode(levelWrapper, 'div', 'radio-wrapper');
  createRadio(radioWrapper, 'Easy', 'easy');
  createRadio(radioWrapper, 'Medium', 'medium');
  createRadio(radioWrapper, 'Hard', 'hard');
  const continueBtn = createBasicNode(
    levelWrapper,
    'button',
    'link',
    'Confirm and Continue ->'
  );
  continueBtn.type = 'button';
  continueBtn.addEventListener('click', () => {
    drawBoard(size, map);
  });
}

function createRadio(parent, value, id) {
  const radioBtn = createBasicNode(parent, 'input', 'radio-input');
  radioBtn.type = 'radio';
  radioBtn.name = 'level';
  radioBtn.value = value;
  radioBtn.id = id;
  radioBtn.addEventListener('change', () => {
    setLevel(radioBtn.value);
  });
  const label = createBasicNode(parent, 'label', 'radio-btn');
  label.htmlFor = id;
  label.textContent = value;
}

export function setLevel(level) {
  switch (level) {
    case 'Ease':
      size = 5;
      map = templates[0][0].map;
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
      map = templates[0][0].map;
      break;
  }
  console.log('уровень: ', level);
}
