import quizList from "./quiz.js";

const body = document.body;

let quiz;
let gameContent; // контейнер в котором находятся все секции игры, node элемент объект, может быть это мне не надо
let secretWordText; // секретное слово, строка
let questionText; // вопрос, строка
let buttons = []; //все клавиши клавиатуры, массив объектов
let secretLetters = []; // все контейнеры где лежат буквы секретного слова, массив объектов
let secretLettersWrappers = [];
let guessesCount;
let lifes = [];
let lettersCount;
let incorrectGuesses = 0;

// Hangman bodyparts
let head;
let manbody;
let leftHand;
let rightHand;
let leftFoot;
let rightFoot;

drawHeader();
drawGameContent();
getQuestion();
drawQuestion(questionText);
drawGallow();
drawSecretWord(secretWordText);
drawKeyboard();
drawGameFooter();
drawFooter();

export function createNode(parentNode, tagName, styles = "", content = "") {
  let node = document.createElement(tagName);
  if (styles) {
    node.className = `${styles}`;
  }
  if (content) {
    node.textContent = `${content}`;
  }
  if (parentNode) {
    if (parentNode === body) {
      parentNode.append(node);
    }
    parentNode.append(node);
  }
  return node;
}

export function drawHeader() {
  let header = createNode(body, "header", "header");
  let logo = createNode(header, "img", "img-logo");
  logo.src = "assets/svg/logo-hangman.svg";
  logo.alt = "Hangman Game Logotype";
  header.appendChild(logo);
}

export function drawGameContent() {
  let main = createNode(body, "main", "main");
  gameContent = createNode(main, "div", "global-wrapper");
  main.appendChild(gameContent);
}

export function getQuestion() {
  let content = getRandomQuestion();
  questionText = content.question;
  secretWordText = content.answer;
  lettersCount = secretWordText.length;
  return [questionText, secretWordText];
}

export function drawQuestion(questionText) {
  let question = createNode(false, "div", "question-wrapper", questionText);
  gameContent.appendChild(question);
}

export function drawGallow() {
  let gallow = createNode(false, "div", "gallow-wrapper");
  let hangman = createNode(gallow, "div", "hangman-wrapper");
  head = createNode(hangman, "div", "head");
  manbody = createNode(hangman, "div", "manbody");
  leftHand = createNode(hangman, "div", "left-hand");
  rightHand = createNode(hangman, "div", "right-hand");
  leftFoot = createNode(hangman, "div", "left-foot");
  rightFoot = createNode(hangman, "div", "right-foot");
  gallow.appendChild(hangman);
  gameContent.appendChild(gallow);
}

export function drawSecretWord(secretWord) {
  quiz = createNode(false, "div", "quiz-wrapper");
  let word = createNode(quiz, "div", "word-wrapper");
  const lettersArray = secretWord.toUpperCase().split("");

  lettersArray.forEach((char) => {
    let letter = createNode(word, "div", "letter letter-default");
    let span = createNode(letter, "span", "letter-hidden", char);
    secretLettersWrappers.push(letter);
    secretLetters.push(span);
    word.appendChild(letter);
  });

  gameContent.appendChild(quiz);

  console.log("Secret Word: ", secretWord);
}

export function drawKeyboard() {
  const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let keyboard = createNode(quiz, "div", "keyboard-wrapper");

  let charsArray = ALPHABET.split("");

  charsArray.forEach((char) => {
    let btn = createNode(keyboard, "div", "key-char", char);
    btn.setAttribute("data-code", `Key${char}`);
    btn.setAttribute("data-value", char);
    buttons.push(btn);
  });

  quiz.appendChild(keyboard);
}

export function drawGameFooter() {
  let info = createNode(gameContent, "div", "info-wrapper");
  let guesses = createNode(info, "div", "guesses-wrapper");
  let title = createNode(
    guesses,
    "span",
    "guesses-title",
    "Incorrect Guesses "
  );
  guessesCount = createNode(guesses, "span", "guesses-count", "0");
  let guessesAll = createNode(guesses, "span", "gueses-all", " / 6");

  let lives = createNode(info, "div", "lifes-wrapper");
  let count = 1;
  for (let i = 0; i < 6; i++) {
    if (count > 3) count = 1;
    let life = createNode(lives, "div", `heart heart-${count}`);
    lifes.push(life);
    count++;
  }

  gameContent.appendChild(info);
}

export function drawFooter() {
  let footer = createNode(body, "footer", "footer");
  let info = createNode(footer, "span", "", "©2023 Anna Chebysheva");
  let link = createNode(footer, "a", "github-link", "GitHub");
  link.href = "https://github.com/marblehands";
  link.target = "_blank";
  body.append(footer);
}

export function generateModal(secretWordText, isWin) {
  let modalWrapper = createNode(body, "div", "modal-wrapper");
  let gameInfo = createNode(modalWrapper, "div", "game-info");
  let btnTextWrapper = createNode(gameInfo, "div", "text-btn-wrapper");
  let textWrapper = createNode(btnTextWrapper, "div", "text-wrapper");
  let title = createNode(textWrapper, "p", "game-info-title");
  let subtitle = createNode(textWrapper, "p", "game-info-subtitle");

  if (isWin) {
    title.textContent = "YOU WON ✨";
    subtitle.textContent = "Well done! Your hard work and skill paid off.";
  } else {
    title.textContent = "GAME OVER ☔";
    subtitle.textContent = "Not your day, but great effort!";
  }

  let btn = createNode(
    btnTextWrapper,
    "button",
    "btn-play-again",
    "PLAY AGAIN"
  );
  btn.addEventListener("click", function () {
    modalWrapper.classList.remove("show");
    gameInfo.classList.remove("show");
    startGame();
  });

  let wordModal = createNode(modalWrapper, "div", "word-wrapper");
  const lettersArray = secretWordText.toUpperCase().split("");
  lettersArray.forEach((char) => {
    let letter = createNode(wordModal, "div", "letter letter-default");
    let span = createNode(letter, "span", "", char);
    wordModal.appendChild(letter);
  });

  gameInfo.prepend(wordModal);

  setTimeout(() => {
    modalWrapper.classList.add("show");
    gameInfo.classList.add("show");
  }, 100);
}

function getRandomNum() {
  const min = 1;
  const max = 10;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomQuestion() {
  const currentId = localStorage.getItem("currentIdMarblehands") || 0;
  let id = getRandomNum();
  while (id === Number(currentId)) {
    id = getRandomNum();
  }
  localStorage.setItem("currentIdMarblehands", id);
  console.log("Previous Question ID: ", currentId, "Next Question ID:", id);
  const question = quizList.find((item) => item.id === id);
  return question;
}

buttons.forEach((btn) => {
  btn.addEventListener("click", function clickHandler(event) {
    const char = event.currentTarget.getAttribute("data-value");
    openLetters(searchMatches(char, event.currentTarget));
    btn.removeEventListener("click", clickHandler);
    btn.classList.add("disabled");
  });
});

document.addEventListener("keydown", (event) => {
  const char = getChar(event.code);
  // console.log(char)
  if (event.code.includes("Key")) {
    const btn = findTargetBtn(char);
    if (btn) {
      openLetters(searchMatches(char, btn));
    }
  }
});

function findTargetBtn(char) {
  let result;
  buttons.forEach((btn) => {
    const key = btn.getAttribute("data-value");
    const isDisabled = btn.classList.contains("disabled");
    if (key === char && !isDisabled) {
      result = btn;
    }
  });
  return result;
}

function getChar(code) {
  let eventCode = code;
  let arr = eventCode.split("");
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
      // console.log(btn);
      // console.log('hi');
    }
  }
  if (!indexes.length) {
    // console.log('test');
    btn.classList.add("btn-wrong");
    btn.classList.add("btn-wrong-1");
  } else {
    btn.classList.add("btn-correct");
    btn.classList.add("btn-correct-1");
  }

  return indexes;
}

function openLetters(indexes) {
  if (indexes.length) {
    indexes.forEach((index) => {
      secretLetters[Number(index)].classList.remove("letter-hidden");
      secretLettersWrappers[Number(index)].classList.remove("letter-default");
      secretLettersWrappers[Number(index)].classList.add("letter-success");
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

export function startGame() {
  const body = document.body;
  const scripts = Array.from(document.getElementsByTagName("script"));

  Array.from(body.children).forEach((child) => {
    if (!scripts.includes(child)) {
      body.removeChild(child);
    }
  });

  buttons = []; //все клавиши клавиатуры, массив объектов
  secretLetters = []; // все контейнеры где лежат буквы секретного слова, массив объектов
  secretLettersWrappers = [];
  lifes = [];
  incorrectGuesses = 0;

  drawHeader();
  drawGameContent();
  getQuestion();
  drawQuestion(questionText);
  drawGallow();
  drawSecretWord(secretWordText);
  drawKeyboard();
  drawGameFooter();
  drawFooter();

  buttons.forEach((btn) => {
    btn.addEventListener("click", function clickHandler(event) {
      const char = event.currentTarget.getAttribute("data-value");
      openLetters(searchMatches(char, event.currentTarget));
      btn.removeEventListener("click", clickHandler);
      btn.classList.add("disabled");
    });
  });
}

console.log(
  "Dear Reviewer,\n\nPlease check your keyboard layout, the game is done in English.\n\nThank you for your time and patience :)"
);
