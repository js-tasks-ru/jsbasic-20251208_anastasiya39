function getMinMax(str) {
  let numbers = str.split(' ').map(n => +n).filter(n => isFinite(n));

  numbers.sort((a, b) => a - b);

  let min = numbers.at(0);
  let max = numbers.at(-1);  

  return { min, max };
}
