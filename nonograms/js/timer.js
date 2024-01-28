import { createBasicNode } from './build-page.js';

export let isTimer = false;
let timer;
let startTime = 0;
export let seconds;

export function drawWatch(main) {
  const wrapper = createBasicNode(main, 'div', 'timer__wrapper');
  // eslint-disable-next-line no-unused-vars
  const timer = createBasicNode(wrapper, 'span', 'timer', '00:00');
  // eslint-disable-next-line no-unused-vars
  // const pause = createBasicNode(wrapper, 'div', 'timer__icon_pause');
  // pause.addEventListener('click', pauseTime);
}

export function updateTime(startTime) {
  isTimer = true;
  const timer = document.querySelector('.timer');
  const currentTime = Date.now();
  const diff = currentTime - startTime;
  seconds = Math.floor(diff / 1000);
  let minutes = Math.floor(seconds / 60);
  if (minutes) seconds -= minutes * 60;
  timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
}

export function switchOnTimer() {
  startTime = Date.now();
  timer = setInterval(() => {
    updateTime(startTime);
  }, 1000);
}

// export function pauseTime() {
//   isTimer = false;
//   clearInterval(timer);
// }
