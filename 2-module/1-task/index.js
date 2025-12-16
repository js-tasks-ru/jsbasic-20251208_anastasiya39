function sumSalary(salaries) {
  let result = 0;

  for (let sal in salaries) {
    let value = salaries[sal];

    if (Number.isFinite(value)) {
      result += value ;  
    }
  }

  return result;
}

let salaries = {
  John: 1000,
  Ann: 1600,
  Pete: 1300,
  month: 'December',
  currency: 'USD',
  isPayed: false,
};