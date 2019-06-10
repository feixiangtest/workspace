// http://www.itread01.com/articles/1488001229.html
export default function () {
  /*  Date.prototype.Format = function (fmt) { // author: meizz
      var o = {
        'M+': this.getMonth() + 1, // 月份
        'd+': this.getDate(), // 日
        'h+': this.getHours(), // 小時
        'm+': this.getMinutes(), // 分
        's+': this.getSeconds(), // 秒
        'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
        'S': this.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    }
    */
  document.addEventListener('copy', function (t) {
    let e = t.target
    let a = [].filter.call(e.parentNode.children, function (t) {
      return t !== e
    })[0]
    a && a.className.indexOf('copy') > -1 && window.layer.alert('<b style="color:red">已将内容复制到剪切板</b>')
  })
}
