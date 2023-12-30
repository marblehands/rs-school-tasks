import { buttons, secretLetters, secretLettersWrappers, secretWordText, guessesCount, head, manbody, leftHand, rightHand, leftFoot, rightFoot, lifes }  from "./build-page.js";
import { generateModal } from "./build-page.js";

let lettersCount = secretWordText.length;
let incorrectGuesses = 0;

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
      generateModal(secretWordText, true);
    }
  }
  if (!indexes.length) {
    incorrectGuesses++;
    guessesCount.textContent = incorrectGuesses;
    if (incorrectGuesses === 6) {
      generateModal(secretWordText, false);
    }
    switch (incorrectGuesses) {
      case 1:
        head.style.opacity = 1;
        console.log(lifes[0])
        lifes[0].style.opacity = 0;
        break;
      case 2:
        manbody.style.opacity = 1;
        lifes[1].style.opacity = 0;
        break;
      case 3:
        leftHand.style.opacity = 1;
        lifes[2].style.opacity = 0;
        break;
      case 4:
        rightHand.style.opacity = 1;
        lifes[3].style.opacity = 0;
        break;
      case 5:
        leftFoot.style.opacity = 1;
        lifes[4].style.opacity = 0;
        break;
      case 6:
        rightFoot.style.opacity = 1;
        lifes[5].style.opacity = 0;
        break;
      default:
        break
    }
    
  }
}
