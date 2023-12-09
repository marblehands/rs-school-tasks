let index = 0;

const slidesBox = document.querySelector('.slides-wrapper');
const progressbarsBox = document.querySelectorAll('.slider-pagination-item');
const progressbars = document.querySelectorAll('.progress-bar');

// progressbars[slideIndex].addEventListener('transitionend', () => {
//   slideIndex === 0 ? progressbars[2].style.width = '0%' : progressbars[slideIndex - 1].style.width = '0%';
//   moveSlides()
// })

function moveSlides() {
  slidesBox.style.marginLeft = (`-${index}00%`);
  progressbars[index].style.transform = 'scaleX(0)';
  index++;
  index >= 3 ? (index = 0) : index;
  fullBar();
}

function fullBar() {
  let bar = progressbars[index];
  bar.style.transform = 'scaleX(2)';
  let width = 1;
  const increase = setInterval(() => {
    bar.style.width = `${width}%`;
    width++;
    console.log(width)
  if (width > 100) {
    clearInterval(increase);
    moveSlides();
  }
  }, 30);
}

fullBar();



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