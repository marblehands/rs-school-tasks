import { buttons, secretLetters, secretLettersWrappers, secretWordText, guessesCount, head, manbody, leftHand, rightHand, leftFoot, rightFoot, lifes }  from "./build-page.js";
import { generateModal } from "./build-page.js";

let lettersCount = secretWordText.length;
let incorrectGuesses = 0;

buttons.forEach((btn) => {
  btn.addEventListener('click', function clickHandler(event) {
    const char = event.currentTarget.getAttribute('data-value');
    openLetters(searchMatches(char, event.currentTarget));
    btn.removeEventListener('click', clickHandler);
    btn.classList.add('disabled');
  });
})

document.addEventListener('keydown', (event) => {
  const char = getChar(event.code);
  if (event.code.includes('Key')) {
    const btn = findTargetBtn(char);
    console.log(char)
    openLetters(searchMatches(char, btn));
  }
});

function findTargetBtn(char) {
  let result;
  buttons.forEach((btn) => {
    const key = btn.getAttribute('data-value');
    if (key === char) {
      result = btn;
    }
  })
  return result;
}

function getChar(code) {
  let eventCode = code;
  let arr = eventCode.split('');
  let char = arr[arr.length - 1];
  return char;
}

export function test() {
  // console.log('test')
}

function searchMatches(char, btn) {
  let indexes = [];

for (let i = 0; i < secretWordText.length; i++) {
  const letter = secretWordText[i].toUpperCase();

  if (letter === char) {
    indexes.push(i);
    console.log(btn);
    console.log('hi');
  }
}
if (!indexes.length) {
    console.log('test');
    btn.classList.add('btn-wrong');
    btn.classList.add('btn-wrong-1');
} else {
  btn.classList.add('btn-correct');
  btn.classList.add('btn-correct-1');
}

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
  if (!indexes.length && incorrectGuesses < 6) {
    incorrectGuesses++;
    guessesCount.textContent = incorrectGuesses;
    if (incorrectGuesses === 6) {
      generateModal(secretWordText, false);
    }
    switch (incorrectGuesses) {
      case 1:
        head.style.opacity = 1;
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
        break;
    }
  }
}
