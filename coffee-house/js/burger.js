const body = document.getElementsByTagName('body');
const burger = document.querySelector('.btn-burger');
const burgerLines = document.querySelectorAll('.btn-burger-line');
const navigation = document.querySelector('.main-nav');
const linkMenu = document.querySelector('.link-active');

let burgerState = 0;

console.log(body)

burger.addEventListener('click', (event) => {
  event.stopPropagation();
    openBurger();
})

burgerLines.forEach((line) => {
  line.addEventListener('click', (event) => {
    event.stopPropagation();
    openBurger();
  })
})

navigation.addEventListener('click', (event) => {
  event.stopPropagation();
  closeBurger();
});

body[0].addEventListener('click', (event) => {
  event.stopPropagation();
  if (burgerState && event.target !== burger) {
    closeBurger();
  }
})

function openBurger() {
  burgerState = 1;
  burger.classList.toggle('burger-open');
  navigation.classList.toggle('nav-open');
  document.getElementsByTagName('body')[0].style.overflow = 'hidden';
}

function closeBurger() {
  burgerState = 0;
  burger.classList.remove('burger-open');
  navigation.classList.remove('nav-open');
  document.getElementsByTagName('body')[0].style.overflow = 'visible';
}