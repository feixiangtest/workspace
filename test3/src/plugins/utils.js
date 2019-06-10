let utils = {
  toUpperCase (str = '') {
    return str.toUpperCase()
  },
  toLowerCase (str = '') {
    return str.toLowerCase()
  },
  space (string = '') { // 去掉所有的空格（中文空格、英文空格都会被替换）
    return string = string.replace(/\s/g, '')
  },
  keep2 (num) {
    let a = num * 1
    if (a < 0) a *= -1
    a = a.toFixed(2)
    if (!a || a === 'NaN') a = ''
    return a
  }
}

export default utils
