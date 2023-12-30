import { buttons, secretLetters, secretLettersWrappers, secretWordText }  from "./build-page.js";

let lettersCount = secretWordText.length;

buttons.forEach((btn) => {
  btn.addEventListener('click', function (event) {
    const char = event.currentTarget.getAttribute('data-value');
    // console.log(char)
    openLetters(searchMatches(char));
  })
})

document.addEventListener('keydown', (event) => {
  // console.log(event.code)
});

export function test() {
  // console.log('test')
}

function searchMatches(char) {
  let indexes = [];
  secretWordText.toUpperCase().split('').map((letter, index) => {
    if (letter === char) indexes.push(index);
    return index;
  })
  return indexes;
}

function openLetters(indexes) {
  if (indexes.length) {
    indexes.forEach((index) => {
      secretLetters[Number(index)].classList.remove('letter-hidden');
      secretLettersWrappers[Number(index)].classList.remove('letter-default');
      secretLettersWrappers[Number(index)].classList.add('letter-success');
    });
    lettersCount -= indexes.length;
    if (!lettersCount) {
      setTimeout(gameOver, 500)
    }
  }
  if (!indexes.length) {

  }
}

function gameOver() {
  console.log('game over')
}
