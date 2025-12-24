function highlight(table) {
  let rows = table.tBodies[0].rows;

  for (let tr of rows) {
    let td = tr.cells;
    let ageTd = td[1].textContent;
    let genderTd = td[2].textContent;
    let statusTd = td[3];

    if (statusTd.hasAttribute('data-available')) {
      if (statusTd.dataset.available === 'true') {
        tr.classList.add('available');
      } else {
        tr.classList.add('unavailable');
      } 
    } else {
      tr.hidden = true;
    }

    if (genderTd === 'm') {
      tr.classList.add('male');
    } else if (genderTd === 'f') {
      tr.classList.add('female');
    }

    if (ageTd < 18) {
      tr.style.textDecoration = 'line-through';
    }
  }
}
