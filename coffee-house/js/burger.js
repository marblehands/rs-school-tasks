const burger = document.querySelector('.btn-burger');
const burgerLines = document.querySelectorAll('.btn-burger-line');
const navigation = document.querySelector('.main-nav');

burger.addEventListener('click', () => {
  burgerLines.forEach((line, index)=>{
    line.classList.toggle(`burger-line-animated-${index + 1}`);
  })
  navigation.classList.toggle('nav-open');
})

navigation.addEventListener('click', () => {
  navigation.classList.remove('nav-open');
  burgerLines.forEach((line, index)=>{
    line.classList.remove(`burger-line-animated-${index + 1}`);
  })
})