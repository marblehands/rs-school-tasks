import { createBasicNode } from './build-page.js';

export function drawWatch(main) {
  const wrapper = createBasicNode(main, 'div', 'timer__wrapper');
  const timer = createBasicNode(wrapper, 'div', 'timer');
  const minutes = createBasicNode(timer, 'span', 'timer__minutes', '00');
  minutes.id = 'minutes';
  const divider = createBasicNode(timer, 'span', ' ', ':');
  const seconds = createBasicNode(timer, 'span', 'timer__seconds', '00');
  seconds.id = seconds;
  const pause = createBasicNode(wrapper, 'div', 'timer__icon_pause');
}
