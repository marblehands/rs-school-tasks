let currentTheme = true;

export function changeTheme() {
  const root = document.querySelector(':root');
  root.classList.toggle('dark');
  changeIcons(['sound', 'settings', 'score']);
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
  currentTheme = !currentTheme;
}
