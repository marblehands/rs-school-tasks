import { currentTheme } from '../change-theme.js';

export let isSound = true;

export function toggleSound(event) {
  const button = event.currentTarget;
  if (currentTheme) {
    if (isSound) {
      button.classList.add('header__btn_sound-off');
      button.classList.remove('header__btn_sound');
    } else {
      button.classList.add('header__btn_sound');
      button.classList.remove('header__btn_sound-off');
    }
  } else {
    if (isSound) {
      button.classList.add('header__btn_sound-off_theme-dark');
      button.classList.remove('header__btn_sound_theme-dark');
    } else {
      button.classList.remove('header__btn_sound-off_theme-dark');
      button.classList.add('header__btn_sound_theme-dark');
    }
  }
  isSound = !isSound;
}

export function playCellColoured() {
  if (isSound) {
    const click = new Audio('./assets/audio/tap.mp3');
    click.addEventListener('canplaythrough', () => {
      click.play();
    });
  }
}

export function playCellEmpty() {
  if (isSound) {
    const unclick = new Audio('./assets/audio/untap.mp3');
    unclick.addEventListener('canplaythrough', () => {
      unclick.play();
    });
  }
}

export function playCellCross() {
  if (isSound) {
    const cross = new Audio('./assets/audio/cross.mp3');
    cross.addEventListener('canplaythrough', () => {
      cross.play();
    });
  }
}

export function playWinGame() {
  if (isSound) {
    const win = new Audio('./assets/audio/win.mp3');
    win.addEventListener('canplaythrough', () => {
      win.play();
    });
  }
}
