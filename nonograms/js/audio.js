export function playCellColoured() {
  const click = new Audio('./assets/audio/tap.mp3');
  click.addEventListener('canplaythrough', () => {
    click.play();
  });
}

export function playCellEmpty() {
  const unclick = new Audio('./assets/audio/untap.mp3');
  unclick.addEventListener('canplaythrough', () => {
    unclick.play();
  });
}

export function playCellCross() {
  const cross = new Audio('./assets/audio/cross.mp3');
  cross.addEventListener('canplaythrough', () => {
    cross.play();
  });
}

export function playWinGame() {
  const win = new Audio('./assets/audio/win.mp3');
  win.addEventListener('canplaythrough', () => {
    win.play();
  });
}
