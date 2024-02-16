import { createBasicNode } from './build-page';
import { changeTheme } from '../change-theme';

export function drawToggle(parent) {
  const wrapper = createBasicNode(parent, 'div', 'toggle__wrapper');
  // eslint-disable-next-line no-unused-vars
  const input = createBasicNode(wrapper, 'input', 'toggle__input', '', {
    type: 'checkbox',
    id: 'theme-toggle',
  });
  input.addEventListener('change', changeTheme);
  // eslint-disable-next-line no-unused-vars
  const label = createBasicNode(wrapper, 'label', 'toggle__label', '', {
    for: 'theme-toggle',
  });
}
