import moment from 'moment'// 彩票数据默认参数
export default {
  usaTime (type) { // 处理时间格式
    var time2 = parseInt(new Date().getTime() / 1000)
    var a = new Date()
    var offset = (4 * 60 - a.getTimezoneOffset()) * 60
    time2 -= offset
    return moment.unix(time2).format(type)
  },
  zeroAddOne (date) { // 处理时间位数，少一位增加0
    if (date >= 1 && date <= 9) {
      date = '0' + date
    }
    return date
  },
  // 获取当前时间
  getNowFormatDate () {
    var date = new Date()
    var seperator1 = '-'
    var seperator2 = ':'
    var month = date.getMonth() + 1
    var strDate = date.getDate()
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
              ' ' + date.getHours() + seperator2 + date.getMinutes() +
              seperator2 + date.getSeconds()
    return currentdate
  }
}
