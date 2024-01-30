import { createBasicNode } from './build-page.js';

export let isTimer = false;
export let seconds;
export let minutes;
let timer;

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
  const watch = document.querySelector('.timer');
  const currentTime = Date.now();
  const diff = currentTime - startTime;
  seconds = Math.floor(diff / 1000);
  minutes = Math.floor(seconds / 60);
  if (minutes) seconds -= minutes * 60;
  watch.textContent = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
}

export function switchTimer(command) {
  if (!isTimer && command === 'on') {
    isTimer = true;
    const startTime = Date.now();
    timer = setInterval(() => {
      updateTime(startTime);
    }, 1000);
  }
  if (isTimer && command === 'off') {
    isTimer = false;
    clearInterval(timer);
  }
}

// export function pauseTime() {
//   isTimer = false;
//   clearInterval(timer);
// }

export function resetWatch() {
  const timer = document.querySelector('.timer');
  timer.textContent = '00:00';
}
