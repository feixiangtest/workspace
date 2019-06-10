import Vue from 'vue'
/**
 *  彩票截取期数过滤器 by karl
 *  period:期数
 *  isShort:彩种
 *  lotteryId:彩票ID
 */

Vue.filter('period', function (value, period, isShort, lotteryId) {
  if (!period) return ''
  if (lotteryId === '24' || lotteryId === '64') {
    if (period.length <= 14) {
          // 六合彩返回3位
      return period.substr(-3)
    } else {
      return period.substr(-4)
    }
  }
  if (lotteryId === '15' && period.length > 5) {
    return period.substr(3, 6)
  }
  if (period.length >= 14) {
    if (isShort) {
      return period.substr(11, period.length - 11)
    } else return period.substr(3, 8) + '-' + period.substr(11, 3)
  } else {
    return period
  }
})
/**
 * 倒计时过滤器
 */
Vue.filter('timeFilter', function (time) {
  var p = function (c) {
    c = c.toString()
    return c.length === 1 ? '0' + c : c
  }
  time = Math.max(time, 0)
  if (time) {
    time = Math.ceil(time / 1000) // 得到剩余秒数
    // var d = Math.floor(time / 3600 / 24) // 得到剩余天数
    // time = time - (3600 * 24 * d) // 除去天数后剩余的秒数
    // vueData.day = d // 将天数传到页面
    var h = Math.floor(time / 60 / 60) // 算出剩余小时（不会大于24小时）
    time = time % 3600 // 剩余小时数
    var m = Math.floor(time / 60) // 除去剩余小时后剩余分钟数
    var s = time % 60
    return p(h) + ':' + p(m) + ':' + p(s)
  } else {
    return '00:00:00'
  }
})
/**
 * 截取内容显示为...，用于手机端过滤参数过长问题
 * content:内容
 * index:根据多少长度过滤
 */
Vue.filter('subContent', function (value, index) {
  if (screen.width < 375) {
    index = 5
  }
  if (value.length > index) {
    return value.substr(0, index) + '...'
  } else {
    return value
  }
})
// 封盘的时候赔率变横杠过滤器
Vue.filter('noBetFilter', function (odds) {
  let state = window.store.state.betZone.bettingState
  if (state <= 0 && odds !== undefined) {
    return '--'
  } else {
    return odds
  }
})

/**
 * 金额显示两位
 */
Vue.filter('moneyFilter', function (money) {
  if (money !== null && money !== undefined && !isNaN(money)) {
    if (money === 0) {
      return 0
    }
    return Number(money).toFixed(2)
  } else {
    return 0
  }
})
export default {
  lotteryFilter () {
    return {}
  }
}
