// 字体颜色变换
// new toggleColor('#j-promotions', ['#FF0','#FF0000'] , 500 );
function toggleColor (id, arr, s) {
  var self = this
  self._i = 0
  self._timer = null
  self.run = function () {
    if (arr[self._i]) {
      $(id).css('color', arr[self._i])
    }
    self._i == 0 ? self._i++ : self._i = 0
    self._timer = setTimeout(function () {
      self.run(id, arr, s)
    }, s)
  }
  self.run()
}

$(function () {
  new toggleColor('.changeC1', ['rgb(181, 44, 47)', 'rgb(253, 252, 252)'], 500)
  new toggleColor('.changeC2', ['rgb(253, 252, 252)', 'rgb(181, 44, 47)'], 500)
  new toggleColor('.changeC3', ['rgb(253, 252, 252)', 'rgb(181, 44, 47)'], 500)
  new toggleColor('.nav>ul>li.hot>a', ['rgb(255, 255, 255)', 'rgb(255, 58, 67)'], 500)
})
