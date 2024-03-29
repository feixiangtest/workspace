export default {
  LoadJsonp () {
    console.log('检测 加载LoadJsonp fn run')
    if (window.devMode === 'dev') {
      console.log('不加载 本地资源')
      return false // 消除注释 修改完后
    }
    let useCdn = false
    if (window.FileMap.config.cdnUrl.slice(0, 2) === '//' && window.FileMap.config.cdnUrl.slice(-1) === '/') {
      useCdn = true
    }
    window._each(window.FileMap.config.map, function (value, key) {
      if (!localStorage[key] && !document.getElementById('__webpack_' + key)) {
        console.log('online 开始请求jsonp', value)
        var getJSurl = value
        if (useCdn) {
          getJSurl = window.FileMap.config.cdnUrl + value
          getJSurl = getJSurl.replace(/\/\/static/g, '/static')
        }
        window.FileMap.insertHtml('script', {src: getJSurl}, null, '__webpack_' + key)
      } else {
        console.log('LS 存在资源', value)
      }
    })
  }
}
