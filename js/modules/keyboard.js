import { buttons, secretLetters, secretWordText }  from "./build-page.js";

buttons.forEach((btn) => {
  btn.addEventListener('click', function (event) {
    const char = event.currentTarget.getAttribute('data-value');
    // console.log(char)
    searchMatches(char);
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
