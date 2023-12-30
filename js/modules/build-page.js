import { getRandomQuestion } from "./generate-quiz.js";

const body = document.body;

let quiz;
let gameContent; // контейнер в котором находятся все секции игры, node элемент объект, может быть это мне не надо
let secretWordText; // секретное слово, строка
let questionText; // вопрос, строка
let buttons = []; //все клавиши клавиатуры, массив объектов
let secretLetters = []; // все контейнеры где лежат буквы секретного слова, массив объектов
let secretLettersWrappers = [];

drawHeader();
drawGameContent();
getQuestion();
drawQuestion(questionText);
drawGallow();
drawSecretWord(secretWordText);
drawKeyboard();
drawGameFooter();
drawFooter();

export function createNode (parentNode, tagName, styles = '', content = '') {
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
  let header = createNode(body, 'header', 'header');
  let logo = createNode(header, 'img', 'img-logo');
  logo.src = 'assets/svg/logo-hangman.svg';
  logo.alt = 'Hangman Game Logotype';
  header.appendChild(logo);
}

export function drawGameContent() {
  let main = createNode(body, 'main', 'main');
  gameContent = createNode(main, 'div', 'global-wrapper');
  main.appendChild(gameContent);
}

function getQuestion() {
  let content = getRandomQuestion();
  questionText = content.question;
  secretWordText = content.answer;
  return [questionText, secretWordText];
}

export function drawQuestion(questionText) {
  let question = createNode(false, 'div', 'question-wrapper', questionText);
  gameContent.appendChild(question);
}

export function drawGallow() {
  let gallow = createNode(false, 'div', 'gallow-wrapper');
  let hangman = createNode(gallow, 'div', 'hangman-wrapper');
  let head = createNode(hangman, 'div', 'head');
  let manbody = createNode(hangman, 'div', 'manbody');
  let leftHand = createNode(hangman, 'div', 'left-hand');
  let rightHand = createNode(hangman, 'div', 'right-hand');
  let leftFoot = createNode(hangman, 'div', 'left-foot');
  let rightFoot = createNode(hangman, 'div', 'right-foot');
  gallow.appendChild(hangman);
  gameContent.appendChild(gallow);
}

export function drawSecretWord(secretWord) {
  quiz = createNode(false, 'div', 'quiz-wrapper');
  let word = createNode(quiz, 'div', 'word-wrapper');
  const lettersArray = secretWord.toUpperCase().split('');

  lettersArray.forEach((char) => {
    let letter = createNode(word, 'div', 'letter letter-default');
    let span = createNode(letter, 'span', 'letter-hidden', char);
    secretLettersWrappers.push(letter);
    secretLetters.push(span);
    word.appendChild(letter);
  });

  gameContent.appendChild(quiz);

  console.log('Secret Word: ', secretWord)
}

export function drawKeyboard() {
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let keyboard = createNode(quiz, 'div', 'keyboard-wrapper');

  let charsArray = ALPHABET.split('');

  charsArray.forEach((char) => {
    let btn = createNode(keyboard, 'div', 'key-char', char);
    btn.setAttribute('data-code', `Key${char}`);
    btn.setAttribute('data-value', char);
    buttons.push(btn);
  });

  quiz.appendChild(keyboard);
}

export function drawGameFooter() {
  let info = createNode(gameContent, 'div', 'info-wrapper');
  let guesses = createNode(info, 'div', 'guesses-wrapper');
  let title = createNode(guesses, 'span', 'guesses-title', 'Incorrect Guesses ');
  let guessesCount = createNode(guesses, 'span', 'guesses-count', '0');
  let guessesAll = createNode(guesses, 'span', 'gueses-all', ' / 6');

  let lifes = createNode(info, 'div', 'lifes-wrapper');
  let count = 1;
  for (let i = 0; i < 6; i++) {
    if (count > 3) count = 1;
    let life = createNode(lifes, 'div', `heart heart-${count}`);
    count++;
    lifes.appendChild(life);
  }

  gameContent.appendChild(info);
}

export function drawFooter() {
  let footer = createNode(body, 'footer', 'footer');
  let info = createNode(footer, 'span', '', '©2023 Anna Chebysheva');
  let link = createNode(footer, 'a', 'github-link', 'GitHub');
  link.href = 'https://github.com/marblehands';
  link.target = '_blank';
  body.append(footer);
}

export function generateModal(word, isWin) {
  let modalWrapper = createNode(quiz, 'div', 'modal-wrapper');
  let gameInfo = createNode(modalWrapper, 'div', 'game-info');
  let title = createNode(gameInfo, 'p', 'game-info-title');
  let subtitle = createNode(gameInfo, 'p', 'game-info-subtitle');

  if (isWin) {
    title.textContent = 'YOU WON ✨';
    subtitle.textContent = 'Well done! Your hard work and skill paid off.'
  } else {
    title.textContent = 'Game Over ☔';
    subtitle.textContent = 'Not your day, but great effort!';
  }

  let btn = createNode(modalWrapper, 'button', 'btn-play-again', 'PLAY AGAIN');
}

export { buttons, secretLetters, secretLettersWrappers, secretWordText };