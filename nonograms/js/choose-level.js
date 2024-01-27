import { createBasicNode } from './build-page.js';
import { setLevel } from './initial-game.js';

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
