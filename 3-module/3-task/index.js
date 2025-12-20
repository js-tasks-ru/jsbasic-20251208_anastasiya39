function camelize(str) {
  return str
    .split('-')
    .map((item, idx) => 
      idx == 0 ? item 
        : item[0].toUpperCase() + item.slice(1))
    .join('');
}
