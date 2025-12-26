function initCarousel() {
  let carousel = document.querySelector('.carousel');
  let rightArrow = document.querySelector('.carousel__arrow_right');
  let leftArrow = document.querySelector('.carousel__arrow_left');
  let inner = document.querySelector('.carousel__inner');
  let slide = inner.querySelector('.carousel__slide');
  let slideWidth = slide.offsetWidth;
  let slidesCount = 4;
  let currentSlide = 0;

  leftArrow.style.display = 'none';

  carousel.addEventListener('click', (event) => {
    if (event.target.closest('.carousel__arrow_right')) {
      currentSlide += 1;
    }

    if (event.target.closest('.carousel__arrow_left')) {
      currentSlide -= 1;
    }

    if (currentSlide < 0) {
      currentSlide = 0;
    }

    if (currentSlide > slidesCount - 1) {
      currentSlide = slidesCount - 1;
    }

    inner.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    leftArrow.style.display = (currentSlide == 0) ? 'none' : '';
    rightArrow.style.display = (currentSlide == slidesCount - 1) ? 'none' : '';
  });
}