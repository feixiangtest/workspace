export default {
  LoadJsonp () {
    console.log('检测 加载LoadJsonp fn run')
    if (window.devMode === 'dev') {
      console.log('不加载 本地资源')
      return false // 消除注释 修改完后
    }
    window._each(window.FileMap.config.map, function (value, key) {
      if (!localStorage[key] && !document.getElementById('__webpack_' + key)) {
        console.log('online 开始请求jsonp', value)
        window.FileMap.insertHtml('script', {src: value}, null, '__webpack_' + key)
      } else {
        console.log('LS 存在资源', value)
      }
    })
  }
}
