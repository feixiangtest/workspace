import Vue from 'vue'
import moment from 'moment'

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
Vue.filter('periodFilter', function (period) {
  if (!period) return ''
  if (period.length >= 14) {
    return period.substr(3, 8) + '-' + period.substr(11)
  } else {
    return period
  }
})
Vue.filter('timeFilter', function (time) {
  time = moment(time, 'YYYY-MM-DD')
  let day = moment().startOf('hour')
  if (time.isBefore(day)) {
    return time.format('YYYY-MM-DD')
  } else {
    return time.format('HH:mm')
  }
})
Vue.filter('getAreaTimeFilter', function (timeArea) {
  let d = new Date()
  let localTime = d.getTime()
  let localOffset = d.getTimezoneOffset() * 60000
  let utc = localTime + localOffset
  let calctime = utc + (3600000 * timeArea)
  return new Date(calctime)
})
Vue.filter('contentFilter', function (content, len) {
  return content.substr(0, len)
})
Vue.filter('max6Filter', function (content) {
  if (content.length > 6) {
    return content.substr(0, 6) + '...'
  } else {
    return content
  }
})
Vue.filter('subContent', function (content) {
  return content.substr(0, 12) + '...'
})
Vue.filter('subContentMsg', function (content) {
  if (content.length > 12) {
    return content.substr(0, 12) + '...'
  } else {
    return content
  }
})
Vue.filter('messageTime', function (time) {
  return moment(time).format('YYYY-MM-DD HH:mm:ss')
})
Vue.filter('numShowFilter', function (content) {
  let _v = Number(content)
  if (_v === 1) return '存入'
  if (_v === 2) return '取出'
  if (_v === 3) return '派彩'
  if (_v === 4) return '下注'
  if (_v === 5) return '返点'
  if (_v === 6) return '取消注单'
  if (_v === 7) return '取消结算'
  if (_v === 8) return '统算'
  if (_v === 12) return '公司入款'
  if (_v === 13) return '公司入款优惠'
  if (_v === 14) return '公司汇款优惠'
  if (_v === 15) return '线上存款'
  if (_v === 16) return '线上存款手续费'
  if (_v === 17) return '线上存款优惠'
  if (_v === 18) return '系统取消出款'
  if (_v === 19) return '入款其他'
  if (_v === 21) return '冲销'
  if (_v === 22) return '重复出款'
  if (_v === 23) return '手动申请出款'
  if (_v === 24) return '放弃存款优惠'
  if (_v === 25) return '公司入款误存'
  if (_v === 26) return '会员负数回冲'
  if (_v === 27) return '扣除非法下注派彩'
  if (_v === 28) return '出款其他'
  if (_v === 31) return '人工存入'
  if (_v === 32) return '人工存入取消出款'
  if (_v === 33) return '存款优惠'
  if (_v === 34) return '人工存入汇款优惠'
  if (_v === 35) return '退佣优惠'
  if (_v === 36) return '负数额度归零'
  if (_v === 37) return '人工存入其他'
  if (_v === 38) return '人工存入存款优惠'
  if (_v === 41) return '层级额度转换'
  if (_v === 42) return '系统新增快开额度'
  if (_v === 43) return '转至体育投注失败'
  if (_v === 44) return '由体育投注转入'
  if (_v === 45) return '转至体育投注'
  if (_v === 46) return '钱包存入'
  if (_v === 47) return '钱包取出'
  if (_v === 57) return 'API存入'
  if (_v === 58) return 'API取出'
  if (_v === 88) return 'API存入异常'
  if (_v === 80) return 'OPUS返点'
  if (_v === 81) return 'OPUS冲销'
  if (_v === 98) return '沙巴体育返点'
  if (_v === 99) return '沙巴体育冲销'
  if (_v === 48) return '开分-几率'
  if (_v === 49) return '洗分-几率'
  if (_v === 51) return '强制设定'
  if (_v === 53) return '重建下注（重建）'
  if (_v === 54) return '重结派彩（重结）'
  if (_v === 55) return '回结派彩（回结）'
  if (_v === 56) return '系统结算派彩'
  if (_v === 60) return 'OG返点'
  if (_v === 61) return '体育返点'
  if (_v === 62) return '视讯返点'
  if (_v === 63) return '电子返点'
  if (_v === 64) return '彩票返点'
  if (_v === 65) return 'HG返点'
  if (_v === 52) return 'AG返点'
  if (_v === 66) return 'EA返点'
  if (_v === 67) return 'BB视讯返点'
  if (_v === 68) return 'MG视讯返点'
  if (_v === 69) return 'MG电子返点'
  if (_v === 10) return 'BB体育返点'
  if (_v === 11) return 'BB彩票返点'
  if (_v === 20) return 'BB电子返点'
  if (_v === 50) return 'BB3D返点'
  if (_v === 70) return 'OG冲销'
  if (_v === 71) return '体育冲销'
  if (_v === 72) return '视讯冲销'
  if (_v === 73) return '电子冲销'
  if (_v === 74) return '传统彩冲销'
  if (_v === 75) return 'HG冲销'
  if (_v === 59) return 'AG冲销'
  if (_v === 76) return 'EA冲销'
  if (_v === 77) return 'BB视讯冲销'
  if (_v === 78) return 'MG视讯冲销'
  if (_v === 79) return 'MG电子冲销'
  if (_v === 29) return 'BB体育冲销'
  if (_v === 30) return 'BB彩票冲销'
  if (_v === 39) return 'BB电子冲销'
  if (_v === 40) return 'BB3D冲销'
  if (_v === 82) return '重新结算'
  if (_v === 83) return '未接受-体育'
  if (_v === 84) return '重复派彩扣回'
  if (_v === 85) return '系统踢单-彩票'
  if (_v === 86) return '彩金'
  if (_v === 91) return '取消实际出款'
  if (_v === 92) return '取消扣除手续费'
  if (_v === 93) return '取消扣除存款优惠'
  if (_v === 95) return '实际出款'
  if (_v === 96) return '出款扣除手续费'
  if (_v === 97) return '出款扣除存款优惠'
  if (_v === 98) return '沙巴体育返点'
  if (_v === 99) return '沙巴体育冲销'
  if (_v === 100) return 'DIOS冲销'
  if (_v === 101) return 'DIOS返点'
  if (_v === 102) return 'PT电子冲销'
  if (_v === 103) return 'PT电子返点'
  if (_v === 104) return 'LEBO视讯冲销'
  if (_v === 105) return 'LEBO视讯返点'
  if (_v === 106) return 'OGS视讯冲销'
  if (_v === 107) return 'OGS视讯返点'
  if (_v === 108) return 'AB视讯冲销'
  if (_v === 109) return 'AB视讯返点'
  if (_v === 110) return 'OG电子冲销'
  if (_v === 111) return 'OG电子返点'
  if (_v === 118) return 'MWG电子冲销'
  if (_v === 119) return 'MWG电子返点'
  if (_v === 120) return '传统彩冲销'
  if (_v === 121) return '传统彩返点'
  if (_v === 146) return '拒绝出款'
})
