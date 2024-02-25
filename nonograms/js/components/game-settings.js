import { createBasicNode } from './build-page.js';
import { setLevel } from '../initial-game.js';
import { switchTimer, resetWatch } from './timer.js';
import templates from '../templates.js';
import { setPuzzle } from '../initial-game.js';
import { closeModal } from './build-page.js';
import { generateRandomNumber } from '../random-game.js';
import { getSavedGame } from '../save-game.js';
import { loadGame } from '../initial-game.js';
import { setSavedTimer } from './timer.js';

let isSettings = false;
let isChecked;
let currentPuzzle = 'hash';
let currentLevel = 'easy';

function drawSettings() {
  const modalWrapper = createBasicNode(0, 'div', 'modal modal__settings');
  modalWrapper.addEventListener('click', closeSettingsModal);
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
  drawButtons(btnWrapper, ['Confirm & Play', 'Random Game']);
  setImageInSelect();
  const saving = getSavedGame();
  if (saving) {
    drawButtons(btnWrapper, ['Continue Last Game']);
  }
}

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
    if (isChecked && i === isChecked) {
      attributes.checked = '';
    } else if (i === 0) {
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
  currentLevel = item.value;
  isChecked = Number(values.indexOf(item.value));
  changePuzzleNames();
  if (!isChecked) {
    currentLevel = 'easy';
    currentPuzzle = 'hash';
  } else if (isChecked === 1) {
    currentLevel = 'medium';
    currentPuzzle = 'mushroom';
  } else {
    currentLevel = 'hard';
    currentPuzzle = 'peach';
  }
}

function drawImageSelect(form) {
  const wrapper = createBasicNode(
    form,
    'div',
    'form__group form__group_select'
  );
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

  const puzzles = getCurrentPuzzles(currentLevel)
    .flat()
    .map((item) => item.name);
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
    if (label === 'Confirm & Play') {
      button.setAttribute('id', 'confirm');
      button.addEventListener('click', toggleSettings);
      button.addEventListener('click', playNewGame);
    }
    if (label === 'Random Game') {
      button.addEventListener('click', toggleSettings);
      button.addEventListener('click', randomFunction);
    }
    if (label === 'Continue Last Game') {
      button.addEventListener('click', toggleSettings);
      button.addEventListener('click', continueLastGame);
    }
  });
}

export function toggleSettings() {
  const btn = document.getElementById('settings');
  const settings = document.querySelector('.modal__settings');
  if (!settings) {
    btn.classList.add('checked');
    drawSettings();
    closeModal('modal__game-over');
    closeModal('modal__score');
  } else {
    btn.classList.remove('checked');
    document.body.removeChild(settings);
  }
  isSettings = !isSettings;
}

function getCurrentPuzzles(currentLevel) {
  let level = currentLevel;
  if (!level) level = 'easy';
  return templates.filter((item) =>
    item.some((puzzle) => puzzle.level == level)
  );
}

function getRandomNames() {
  const names = templates.flatMap((level) =>
    level.map((template) => template.name)
  );
  const max = names.length;
  const index = generateRandomNumber(max);
  console.log(names[index]);
  return names[index];
}

function randomFunction() {
  const puzzle = getRandomNames();
  const template = templates.flatMap((level) =>
    level.filter((template) => template.name === puzzle)
  );
  console.log(template);
  currentLevel = template[0].level;
  currentPuzzle = puzzle;
  playNewGame();
  isChecked = levelToNum(currentLevel);
}

function levelToNum(level) {
  let index;
  if (level === 'easy') {
    index = 0;
  } else if (level === 'medium') {
    index = 1;
  } else {
    index = 2;
  }
  return index;
}

function changePuzzleNames() {
  const options = document.querySelectorAll('[data-name="option"]');
  const puzzles = getCurrentPuzzles(currentLevel)
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
  currentPuzzle = option.value;
}

export function playNewGame() {
  switchTimer('off');
  resetWatch();
  setLevel(currentLevel);
  setPuzzle(currentPuzzle);
  setCurrentSettings(currentLevel, currentPuzzle);
}

function closeSettingsModal(event) {
  const target = event.currentTarget;
  const confirmBtn = document.getElementById('confirm');
  if (target === confirmBtn) {
    isSettings = !isSettings;
  }
}

function setCurrentSettings(level, name) {
  localStorage.setItem(
    'set-marblehands',
    JSON.stringify({ level: `${level}`, name: `${name}` })
  );
}

function setImageInSelect() {
  const currImg = JSON.parse(localStorage.getItem('set-marblehands')).name;
  const options = document.querySelectorAll('[data-name="option"]');
  options.forEach((option) => (option.selected = false));
  const option = Array.from(options).find((option) => option.value === currImg);
  if (option) option.selected = true;
}

function continueLastGame() {
  const saving = getSavedGame();
  const seconds = saving.seconds;
  const minutes = saving.minutes;
  const savedTimer = { seconds, minutes };
  setSavedTimer(savedTimer);
  switchTimer('off');
  switchTimer('continue');
  const template = saving.template;
  currentLevel = template.level;
  currentPuzzle = template.name;
  setLevel(currentLevel);
  setPuzzle(currentPuzzle);
  const watch = document.querySelector('.timer');
  watch.textContent = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
  setCurrentSettings(currentLevel, currentPuzzle);
  loadGame(saving.state, saving.template);
}
