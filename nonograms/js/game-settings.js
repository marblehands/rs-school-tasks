import { createBasicNode } from './build-page.js';

export function drawSettings() {
  const modalWrapper = createBasicNode(0, 'div', 'modal');
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
  drawButtons(btnWrapper, ['Play Game', 'Random Game']);
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
    if (i === 0) {
      attributes.checked = '';
    }
    // eslint-disable-next-line no-unused-vars
    const radio = createBasicNode(
      radioWrapper,
      'input',
      'input input__chips',
      '',
      attributes
    );
    // eslint-disable-next-line no-unused-vars
    const label = createBasicNode(
      radioWrapper,
      'label',
      'label label__radio',
      `${values[i].toUpperCase()}`,
      { for: `${values[i]}` }
    );
  }
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

  const values = ['1', '2', '3', '4', '5'];
  for (let i = 0; i < 5; i++) {
    // eslint-disable-next-line no-unused-vars
    const option = createBasicNode(select, 'option', '', `${values[i]}`, {
      value: `${values[i]}`,
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
