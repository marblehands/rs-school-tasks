let slideIndex = 0;

const slidesBox = document.querySelector('.slides-wrapper');
const progressbarsBox = document.querySelectorAll('.slider-pagination-item');
const progressbars = document.querySelectorAll('.progress-bar');
console.log(progressbars)

const progressbarScaling = [
  { width: "100%" },
];

const progressbarScalingBack = [
  { width: "100%" },
  { width: "0%" },
];

const progressbarTiming = {
  duration: 3000,
  iteration: 1,
};


function moveSlides() {
  if (slideIndex < 3) {
    slidesBox.style.marginLeft = (`-${slideIndex}00%`);
    progressbars[slideIndex].animate(progressbarScaling, progressbarTiming);
  } else {
    slideIndex = 0;
    slidesBox.style.marginLeft = (`-${slideIndex}00%`);
    progressbars[slideIndex].animate(progressbarScaling, progressbarTiming);
  }
  slideIndex++;
}

moveSlides()
setInterval(moveSlides, 3000)
