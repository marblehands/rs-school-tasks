let slideIndex = 0;

const slidesBox = document.querySelector('.slides-wrapper');
console.log(slidesBox)

function moveSlides() {
  slideIndex++;
  if (slideIndex < 3) {
    slidesBox.style.marginLeft = (`-${slideIndex}00%`);
  } else {
    slideIndex = 0;
    slidesBox.style.marginLeft = (`-${slideIndex}00%`);
  }
}

setInterval(moveSlides, 3000)