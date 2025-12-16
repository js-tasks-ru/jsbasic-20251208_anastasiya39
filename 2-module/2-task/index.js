function isEmpty(obj) {
  // вариант 1 через Object.keys(obj)
  // if (Object.keys(obj).length === 0) {
  //   return true;
  // }
  // return false;

  for (let key in obj) {
    return false;
  }
  return true; 
}