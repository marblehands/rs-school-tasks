import { isSound } from './components/audio.js';

export let currentTheme = true;

export function changeTheme() {
  const root = document.querySelector(':root');
  root.classList.toggle('dark');
  changeIcons(['settings', 'score']);
  changeIconSound();
  currentTheme = !currentTheme;
}

function changeIcons(buttons) {
  if (currentTheme) {
    buttons.forEach((type) => {
      const btn = document.querySelector(`.header__btn_${type}`);
      btn.classList.remove(`header__btn_${type}`);
      btn.classList.add(`header__btn_${type}_theme-dark`);
    });
  } else {
    buttons.forEach((type) => {
      const btn = document.querySelector(`.header__btn_${type}_theme-dark`);
      btn.classList.add(`header__btn_${type}`);
      btn.classList.remove(`header__btn_${type}_theme-dark`);
    });
  }
}

function changeIconSound() {
  const btn = document.getElementById('sound');
  if (currentTheme) {
    if (isSound) {
      btn.classList.add('header__btn_sound_theme-dark');
      btn.classList.remove('header__btn_sound');
    } else {
      btn.classList.add('header__btn_sound-off_theme-dark');
      btn.classList.remove('header__btn_sound-off');
    }
  } else {
    if (isSound) {
      btn.classList.add('header__btn_sound');
      btn.classList.remove('header__btn_sound_theme-dark');
    } else {
      btn.classList.add('header__btn_sound-off');
      btn.classList.remove('header__btn_sound-off_theme-dark');
    }
  }
}
