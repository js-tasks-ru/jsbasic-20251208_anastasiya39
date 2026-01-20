import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    this.elem = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <nav class="ribbon__inner"></nav>

        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);

    this.ribbonInner = this.elem.querySelector('.ribbon__inner');
    this.arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    this.arrowRight = this.elem.querySelector('.ribbon__arrow_right');

    this.render();
    this.initScroll();
    this.initSelect();
  }

  render() {
    for (let category of this.categories) {
      let link = createElement(`
        <a href="#" class="ribbon__item" data-id="${category.id}">
          ${category.name}
        </a>
      `);

      this.ribbonInner.append(link);
    }

    this.ribbonInner.firstElementChild.classList.add('ribbon__item_active');
  }

  initScroll() {
    this.arrowRight.addEventListener('click', () => {
      this.ribbonInner.scrollBy(350, 0);
    });

    this.arrowLeft.addEventListener('click', () => {
      this.ribbonInner.scrollBy(-350, 0);
    });

    this.ribbonInner.addEventListener('scroll', () => {
      let scrollLeft = this.ribbonInner.scrollLeft;
      let scrollRight = this.ribbonInner.scrollWidth - scrollLeft - this.ribbonInner.clientWidth;

      if (scrollLeft === 0) {
        this.arrowLeft.classList.remove('ribbon__arrow_visible');
      } else {
        this.arrowLeft.classList.add('ribbon__arrow_visible');
      }

      if (scrollRight < 1) {
        this.arrowRight.classList.remove('ribbon__arrow_visible');
      } else {
        this.arrowRight.classList.add('ribbon__arrow_visible');
      }
    });
  }

  initSelect() {
    this.ribbonInner.addEventListener('click', (event) => {
      let item = event.target.closest('.ribbon__item');
      if (!item) return;
      event.preventDefault();

      this.ribbonInner.querySelector('.ribbon__item_active').classList.remove('ribbon__item_active');
      item.classList.add('ribbon__item_active');

      this.elem.dispatchEvent(
        new CustomEvent('ribbon-select', {
          detail: item.dataset.id,
          bubbles: true
        })
      );
    });
  }
}
