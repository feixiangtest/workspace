
export function compareDate (nowDate, cookieDate) { // 判断是否超过十分钟，用于是否生成随机数
  let oDate1 = new Date(nowDate)
  let oDate2 = new Date(cookieDate)
  /* if(oDate1.getTime() > (oDate2.getTime() + (1000 * 60 * 10 ))){ */
  if (oDate1.getTime() > (oDate2.getTime() + (1000 * 60 * 10))) {
    setCookie('date', nowDate, 'd1000')
    return true
  }
  return false
}
// 设置Cookie time=过期时间
// s20是代表20秒
// h是指小时，如12小时则是：h12
// d是天数，30天则：d30
export function setCookie (name, value, time) {
  let strsec = getsec(time)
  let exp = new Date()
  exp.setTime(exp.getTime() + strsec * 1)
  let path = '/'
  document.cookie = name + '=' + escape(value) + ';path=' + path + ';expires=' + exp.toGMTString()
}
// 删除Cookie
export function delCookie (name) {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1)
  let cval = getCookie(name)
  let path = '/'
  if (cval != null) { document.cookie = name + '=' + cval + ';path=' + path + ';expires=' + exp.toGMTString() }
}
// 格式参数
export function getsec (str) {
  let str1 = str.substring(1, str.length) * 1
  let str2 = str.substring(0, 1)
  if (str2 === 's') {
    return str1 * 1000
  } else if (str2 === 'h') {
    return str1 * 60 * 60 * 1000
  } else if (str2 === 'd') {
    return str1 * 24 * 60 * 60 * 1000
  }
}
// 读取Cookie
export function getCookie (cname) {
  var name = cname + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1)
    if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
  }
  return ''
}
// 判断是否生成随机数，如果存放在cookie内的时间消失了，则重新生成，否则取旧的数据即可
export function isRefresh () {
  let nowDate = getNowFormatDate()
  let cookieDate = getCookie('date')
  if (isNullStr(cookieDate)) {
    setCookie('date', nowDate, 'd1000')
    return true
  }
  // 检查是否超过十分钟
  let isFlag = compareDate(nowDate, cookieDate)
  return isFlag
}
export function isNullStr (str) {
  if (str === null || str === '' || str === undefined) {
    return true
  }
  return false
}
export function randomPointText (min, max) { // 生成随机数
  min *= 100
  max *= 100
  let range = max - min
  let rand = Math.random()
  let num = (min + Math.round(rand * range)) / 100
  let ret = num.toString()
  if (ret.length === 3) {
    ret += '0'
  }
  return ret.substring(1)
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
