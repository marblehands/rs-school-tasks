const burger = document.querySelector('.btn-burger');
const burgerLines = document.querySelectorAll('.btn-burger-line');
const navigation = document.querySelector('.main-nav');
const linkHome = document.querySelector('#menu');
// const linkFavorite = document.querySelector('#favorite');
// const linkAbout = document.querySelector('#about');
// const linkmobile = document.querySelector('#mobile');
const body = document.querySelector('.body-wrapper')
const linksMenu = document.querySelectorAll('[data-link-menu]');
const linkLogoMenu = document.querySelector('[data-link-logo="menu"]');
const linkLogoHome = document.querySelector('[data-link-logo="home"]');

let burgerState = 0;

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

body.addEventListener('click', (event) => {
  event.stopPropagation();
  if (burgerState && event.target !== burger) {
    closeBurger();
  }
})

if(linkHome) {
  linkHome.addEventListener('click', (event) => {
    event.preventDefault();
    setTimeout(() => {
      openPage('menu.html')
    }, 520);
  })
}

if(linksMenu) {
  linksMenu.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const linkMenuValue = link.dataset.linkMenu;
      let url = `index.html#${linkMenuValue}`
      setTimeout(() => {
        openPage(url)
      }, 520);
    })
  })
}

if(linkLogoMenu) {
  linkLogoMenu.addEventListener('click', (event) => {
    event.preventDefault();
    setTimeout(() => {
      openPage('index.html')
    }, 520);
  })
}

if(linkLogoHome) {
  linkLogoHome.addEventListener('click', (event) => {
    event.preventDefault();
    setTimeout(() => {
      openPage('index.html')
    }, 520);
  })
}

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

function openPage(link) {
  window.location.href = `${link}`;
}
