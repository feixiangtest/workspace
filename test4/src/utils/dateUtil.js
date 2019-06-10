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
  }
}
