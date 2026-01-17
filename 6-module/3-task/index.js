import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.currentIndex = 0;

    this.elem = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>

        <div class="carousel__inner"></div>
      </div>
    `);

    this.inner = this.elem.querySelector('.carousel__inner');
    this.arrowLeft = this.elem.querySelector('.carousel__arrow_left');
    this.arrowRight = this.elem.querySelector('.carousel__arrow_right');

    this.renderSlides();
    this.updateArrows();
    this.initCarousel();
  }

  renderSlides() {
    this.slides.forEach(slide => {
      const slideElem = createElement(`
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `);

      slideElem.querySelector('.carousel__button').addEventListener('click', () => {
        this.elem.dispatchEvent(new CustomEvent('product-add', {
          detail: slide.id,
          bubbles: true
        }));
      });

      this.inner.append(slideElem);
    });
  }

  moveCarousel() {
    const offset = -this.currentIndex * this.inner.offsetWidth;
    this.inner.style.transform = `translateX(${offset}px)`;
    this.updateArrows();
  }

  updateArrows() {
    this.arrowLeft.style.display =
      this.currentIndex === 0 ? 'none' : '';

    this.arrowRight.style.display =
      this.currentIndex === this.slides.length - 1 ? 'none' : '';
  }

  initCarousel() {
    this.arrowRight.addEventListener('click', () => {
      this.currentIndex++;
      this.moveCarousel();
    });

    this.arrowLeft.addEventListener('click', () => {
      this.currentIndex--;
      this.moveCarousel();
    });
  }
}
