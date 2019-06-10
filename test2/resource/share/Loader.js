/**
 域名 // 开头
 必须  / 结尾
 */
CDNMap = {
  cdnUrl: ''
};

/**
 * 加载 js css
// 添加
 loader.push({
  script: '',
  js: '//2333.js',
  css: '//222222.css'
})
 * @constructor
 */
function Loader() {
  this._dom = ''
}

Loader.prototype.push   = function (sources) {
  this._dom = ''
  for (var key in sources) {
    this._dom = this.GetDom(key, sources[key])
    if (this._dom && document) {
      document.write(this._dom)
    }
  }
}
// 地址自动会加上 cdn 的 url
// 没有设置 cdn 就是 ''
Loader.prototype.GetDom = function (key, val) {
  var _html = ''
  if (key == 'script') {
    // 预留
  }
  if (key == 'js') {
    _html = '<script type=text/javascript src="' + CDNMap.cdnUrl + val + '"><\/script>'
    return _html
  }
  if (key == 'css') {
    _html = '<link rel="stylesheet" href="' + CDNMap.cdnUrl + val + '" type="text/css">'
    return _html
  }
  return _html
}
window.loader              = new Loader()
