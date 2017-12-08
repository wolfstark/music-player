function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
/**
 * 第N个数据随机与位置0-N的数据交换位置
 *
 * @param {array} arr
 * @returns {array}
 */
export function shuffle(arr: array): array {
  const _arr = arr.slice();
  for (let i = 0; i < _arr.length; i++) {
    let randomInt = getRandomInt(0, i);
    let item = _arr[i];
    _arr[i] = _arr[randomInt];
    _arr[randomInt] = item;
  }
  return _arr;
}

export function debounce(func, delay) {
  let timer;

  return function(...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
