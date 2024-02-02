import { createBasicNode } from './build-page.js';
import { setLevel } from './initial-game.js';
import { switchTimer, resetWatch } from './timer.js';
import { size } from './initial-game.js';
import templates from './templates.js';
import { setPuzzle } from './initial-game.js';

let isSettings = false;

function drawSettings() {
  const modalWrapper = createBasicNode(0, 'div', 'modal modal__settings');
  const modalContent = createBasicNode(modalWrapper, 'div', 'modal__content');
  // eslint-disable-next-line no-unused-vars
  const title = createBasicNode(
    modalContent,
    'h2',
    'modal__title',
    'Game Settings'
  );
  const form = createBasicNode(
    modalContent,
    'form',
    'form form__settings',
    '',
    { action: '#' }
  );
  drawRadio(form);
  drawImageSelect(form);
  const btnWrapper = createBasicNode(form, 'div', 'form__btn-wrapper');
  drawButtons(btnWrapper, ['Random Game', 'Play Game']);
}

let isChecked = 0;
function drawRadio(form) {
  const wrapper = createBasicNode(form, 'div', 'form__group form__group_radio');
  // eslint-disable-next-line no-unused-vars
  const title = createBasicNode(wrapper, 'p', 'form__label', 'Choose level:');
  const radioWrapper = createBasicNode(wrapper, 'div', 'form__group-wrapper');
  const values = ['easy', 'medium', 'hard'];
  for (let i = 0; i < 3; i++) {
    const attributes = {
      type: 'radio',
      name: 'level',
      id: `${values[i]}`,
      value: `${values[i]}`,
    };
    if (i === isChecked) {
      attributes.checked = '';
    }
    // eslint-disable-next-line no-unused-vars
    const radio = createBasicNode(
      radioWrapper,
      'input',
      'form__input',
      '',
      attributes
    );
    radio.addEventListener('change', (event) => {
      levelRadioHandler(event, values);
    });
    // eslint-disable-next-line no-unused-vars
    const label = createBasicNode(
      radioWrapper,
      'label',
      'form__radio-label',
      `${values[i].toUpperCase()}`,
      { for: `${values[i]}` }
    );
  }
}

export function levelRadioHandler(event, values) {
  const item = event.currentTarget;
  setLevel(item.value);
  isChecked = values.indexOf(item.value);
  switchTimer('off');
  resetWatch();
  changePuzzleNames();
}

function drawImageSelect(form) {
  const wrapper = createBasicNode(
    form,
    'div',
    'form__group form__group_select'
  );
  // eslint-disable-next-line no-unused-vars

  // eslint-disable-next-line no-unused-vars
  const label = createBasicNode(
    wrapper,
    'label',
    'form__label',
    'Choose image:',
    { for: 'image' }
  );

  const select = createBasicNode(wrapper, 'select', 'form__select', '', {
    id: 'image',
    name: 'image',
  });

  select.addEventListener('change', selectHandler);

  const puzzles = getCurrentPuzzles(size)
    .flat()
    .map((item) => item.name);
  console.log(puzzles);
  for (let i = 0; i < 5; i++) {
    // eslint-disable-next-line no-unused-vars
    const option = createBasicNode(select, 'option', '', `${puzzles[i]}`, {
      value: `${puzzles[i]}`,
      'data-name': 'option',
    });
  }
}

function drawButtons(form, labels) {
  labels.forEach((label) => {
    // eslint-disable-next-line no-unused-vars
    const button = createBasicNode(form, 'button', 'form__btn', label, {
      type: 'button',
    });
  });
}

export function toggleSettings(event) {
  const btn = event.currentTarget;
  btn.classList.toggle('checked');
  if (!isSettings) {
    drawSettings();
  } else {
    const settings = document.querySelector('.modal__settings');
    document.body.removeChild(settings);
  }
  isSettings = !isSettings;
}

function getCurrentPuzzles(size) {
  return templates.filter((item) => item.some((puzzle) => puzzle.size == size));
}

function changePuzzleNames() {
  const options = document.querySelectorAll('[data-name="option"]');
  const puzzles = getCurrentPuzzles(size)
    .flat()
    .map((item) => item.name);
  for (let i = 0; i < 5; i++) {
    options[i].value = puzzles[i];
    options[i].textContent = puzzles[i];
  }
}

function selectHandler(event) {
  const select = event.currentTarget;
  const index = select.selectedIndex;
  const option = select.options[index];
  console.log(option.value);
  setPuzzle(option.value);
}
