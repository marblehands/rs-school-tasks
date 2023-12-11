const burger = document.querySelector('.btn-burger');
const burgerLines = document.querySelectorAll('.btn-burger-line');
const navigation = document.querySelector('.main-nav');
const header = document.querySelector('.header');

burger.addEventListener('click', () => {
  burger.classList.toggle('burger-open');
  navigation.classList.toggle('nav-open');
  document.getElementsByTagName('body')[0].style.overflow = 'hidden';
})

navigation.addEventListener('click', () => {
  burger.classList.remove('burger-open');
  navigation.classList.remove('nav-open');
  document.getElementsByTagName('body')[0].style.overflow = 'visible';
});