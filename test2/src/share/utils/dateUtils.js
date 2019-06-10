import dayjs from 'dayjs'
export function usaTime () { // 处理时间格式
  var time2 = parseInt(new Date().getTime() / 1000)
  var a = new Date()
  var offset = (4 * 60 - a.getTimezoneOffset()) * 60
  time2 -= offset
  return dayjs(time2 * 1000).format('YYYY-MM-DD HH:mm:ss')
}

// 获取当前时间
export function getNowFormatDate () {
  let date = new Date()
  let seperator1 = '-'
  let seperator2 = ':'
  let month = date.getMonth() + 1
  let strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
                ' ' + date.getHours() + seperator2 + date.getMinutes() +
                seperator2 + date.getSeconds()
  return currentdate
}
