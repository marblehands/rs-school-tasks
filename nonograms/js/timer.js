import { createBasicNode } from './build-page.js';

export function drawWatch(main) {
  const wrapper = createBasicNode(main, 'div', 'timer__wrapper');
  const timer = createBasicNode(wrapper, 'span', 'timer', '00:00');
  const pause = createBasicNode(wrapper, 'div', 'timer__icon_pause');
}

const startTime = Date.now();

export function getTime() {
  const timer = document.querySelector('.timer');
  const currentTime = Date.now();
  const diff = currentTime - startTime;
  let seconds = Math.floor(diff / 1000);
  let minutes = Math.floor(seconds / 60);
  if (minutes) seconds -= minutes * 60;
  timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
}

setInterval(getTime, 1000);
