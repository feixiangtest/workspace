import Vue from 'vue'

/**
 * 金额显示两位
 */
Vue.filter('moneyFilter', function (money) {
  if (money !== null && money !== undefined && !isNaN(money)) {
    return Number(money).toFixed(2)
  } else {
    return 0
  }
})

Vue.filter('txtFilter', function (txt) {
  if (txt) {
    txt = txt.replace(/\\n/ig, ' ')
    return txt
  } else {
    return ''
  }
})
