let index = 0;
let barState;
let increase;

const slidesBox = document.querySelector('.slides-wrapper');
const progressbarsBox = document.querySelectorAll('.slider-pagination-item');
const progressbars = document.querySelectorAll('.progress-bar');
const slides = document.querySelectorAll('.slider-item');
const arrowLeft = document.querySelector('.slider-arrow-left');
const arrowRight = document.querySelector('.slider-arrow-right');

slides.forEach((item) => {
  item.addEventListener('mouseenter', () => {
    clearInterval(increase);
  })
  item.addEventListener('mouseleave', () => {
    fullBar(barState);
  })
});

function moveSlides() {
  slidesBox.style.marginLeft = (`-${index + 1}00%`);
  if (index === 2) {
    slidesBox.style.marginLeft = (`-${index - 2}00%`);
  }
  progressbars[index].style.transform = 'scaleX(0)';
  index++;
  index >= 3 ? (index = 0) : index;
  fullBar(0);
}

function moveSlidesLeft() {
  // if (index === 0) {
  //   slidesBox.style.marginLeft = (`-${index - 1}00%`);
  // }
  slidesBox.style.marginLeft = (`-${index - 1}00%`);
  if( index === 0) {
    slidesBox.style.marginLeft = (`-${index + 2}00%`);
  }
  progressbars[index].style.transform = 'scaleX(0)';
  index--;
  index < 0 ? (index = 2) : index;
  fullBar(0);
}

function fullBar(width) {
  // let id;
  // index !== 0 ? id = index : id = 2;
  let bar = progressbars[index]
  bar.style.transform = 'scaleX(1)';
  increase = setInterval(() => {
    bar.style.width = `${width}%`;
    width++;
    barState = width;
    if (width > 100) {
      clearInterval(increase);
      moveSlides();
      }
    }, 50);
}

  fullBar(0);

  arrowRight.addEventListener('click', () => {
    clearInterval(increase);
    moveSlides();
  });

  arrowLeft.addEventListener('click', () => {
    console.log(index)
    clearInterval(increase);
    moveSlidesLeft();
  });



// progressbars[slideIndex].addEventListener('transitionend', () => {
//   slideIndex === 0 ? progressbars[2].style.width = '0%' : progressbars[slideIndex - 1].style.width = '0%';
//   moveSlides()
// })

// moveSlides();

// let start = Date.now();

// let timer = setInterval(function () {
//   let timePassed = Date.now() - start;
//   if (timePassed >= 3000) {
//     clearInterval(timer);
//     return;
//   }
//   draw(timePassed);
// }, 20);

// function draw(timePassed) {
//   progressbars[index].style.width = timePassed / 25 + 'px';
// }




// function animateBar() {
//   const element = progressbars[slideIndex];
//   element.style.width = '0%';
//   let currentWidth = 0;
//   let widthStep = 1;
//   currentWidth += 1;
//   element.style.width = `${currentWidth}%`;
// }

// setInterval(animateBar, 20)

// progressbars.forEach((item)=>{
//   item.addEventListener('animationend', ()=>{
//     moveSlides()
//   })
// })

// moveSlides()
// hideWidth()
// setInterval(moveSlides, 3000)
// setInterval(hideWidth, 3000)


// function hideWidth() {
//   progressbars.forEach((item)=>{
//     if (item.width === '100%') {
//       item.style.animation = 'emptyBar 1s forwards';
//     }
//   })
// }