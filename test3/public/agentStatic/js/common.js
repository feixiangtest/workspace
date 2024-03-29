(function () {
  /**
     * 产生任意长度随机字母数字组合
     *
     * randomFlag-是否任意长度
     * min-任意长度最小位[固定位数]
     * max-任意长度最大位
     *
     */
  window.randomWord = function (randomFlag, min, max) {
    var str = ''

    var range = min

    var arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9',
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    var pos
    // 随机产生
    if (randomFlag) {
      range = Math.round(Math.random() * (max - min)) + min
    }
    for (var i = 0; i < range; i++) {
      pos = Math.round(Math.random() * (arr.length - 1))
      str += arr[pos]
    }
    return str
  }
})()
