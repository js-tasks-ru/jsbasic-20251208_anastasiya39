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
      let rect = this.elem.getBoundingClientRect();
      let left = event.clientX - rect.left;
      let leftRelative = left / this.elem.offsetWidth;

      let segments = this.steps - 1;
      let value = Math.round(leftRelative * segments);

      this.value = value;
      this.updateSlider(value);

      this.elem.dispatchEvent(new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      }));
    });

    this.updateSlider(this.value);
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
