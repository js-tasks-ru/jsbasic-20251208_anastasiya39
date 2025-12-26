function toggleText() {
  let toggleBtn = document.querySelector('.toggle-text-button');
  let text = document.querySelector('#text');

  toggleBtn.addEventListener('click', () => {
    text.hidden = !text.hidden;
  });
}
