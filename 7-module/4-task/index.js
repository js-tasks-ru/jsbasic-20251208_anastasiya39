export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.elem = document.createElement('div');
    this.elem.className = 'slider';

    this.thumb = document.createElement('div');
    this.thumb.className = 'slider__thumb';

    this.valueElem = document.createElement('span');
    this.valueElem.className = 'slider__value';
    this.valueElem.textContent = this.value;
    this.thumb.append(this.valueElem);

    this.thumb.ondragstart = () => false;

    this.progress = document.createElement('div');
    this.progress.className = 'slider__progress';

    this.stepsElem = document.createElement('div');
    this.stepsElem.className = 'slider__steps';

    for (let i = 0; i < steps; i++) {
      let span = document.createElement('span');
      if (i === value) {
        span.classList.add('slider__step-active');
      }
      this.stepsElem.append(span);
    }

    this.elem.append(this.thumb, this.progress, this.stepsElem);

    this.elem.addEventListener('click', (event) => {
      this.onClickOrDrag(event.clientX);
    });

    this.thumb.addEventListener('pointerdown', (event) => {
      event.preventDefault();
      this.elem.classList.add('slider_dragging');

      let onPointerMove = (eventMove) => {
        this.onClickOrDrag(eventMove.clientX, true);
      };

      let onPointerUp = (eventUp) => {
        this.elem.classList.remove('slider_dragging');
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);

        this.elem.dispatchEvent(new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true
        }));
      };

      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);
    });

    this.updateSlider(this.value);
  }

  onClickOrDrag(clientX, isDragging = false) {
    let rect = this.elem.getBoundingClientRect();
    let left = clientX - rect.left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;

    }
    if (leftRelative > 1) {
      leftRelative = 1;

    }

    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);

    if (isDragging) {
      let leftPercents = leftRelative * 100;
      this.thumb.style.left = `${leftPercents}%`;
      this.progress.style.width = `${leftPercents}%`;

      this.valueElem.textContent = value;
      let spans = this.stepsElem.querySelectorAll('span');
      spans.forEach(span => span.classList.remove('slider__step-active'));
      spans[value].classList.add('slider__step-active');
      this.value = value;
    } else {
      this.value = value;
      this.updateSlider(value);

      this.elem.dispatchEvent(new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      }));
    }
  }

  updateSlider(value) {
    let segments = this.steps - 1;
    let leftPercents = (value / segments) * 100;

    this.thumb.style.left = `${leftPercents}%`;
    this.progress.style.width = `${leftPercents}%`;
    this.valueElem.textContent = value;

    let spans = this.stepsElem.querySelectorAll('span');
    spans.forEach(span => span.classList.remove('slider__step-active'));
    spans[value].classList.add('slider__step-active');
  }
}
