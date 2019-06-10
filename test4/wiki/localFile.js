/**
 * 统一的版本管理控制存储localStorage
 */

// 当前所有js和css的版本号
var version = '99'
// 目前的大版本路径
var cdnUrl = ''
var jsVersion = '/static/lt_h5_v3'
// 每次发布需要对应修改下方的参数内容
// var appCss = cdnUrl + jsVersion + '/css/app.19f7b28ec32741b056b1c17a5d45be3f.css'
// var manifestJs = cdnUrl + jsVersion + '/js/manifest.45b12409b02a65c8f380.js'
// var vendorJs = cdnUrl + jsVersion + '/js/vendor.fab8802c0c9764ba2c32.js'
// var appJs = cdnUrl + jsVersion + '/js/app.046920c6269e86c71ef8.js'
/**
 *将js全部放在一个变量里的，并实行单文件 hash 控制的尝试方法
 *
  var jsFile = localStorage['jsFile']
  var cssFile = localStorage['cssFile']
  let jsFileList = jsFile ? JSON.parse(jsFile) : {}
  var jsList = [
    { fileName: 'jquery.min_1.8.2.js', hash: '19f7b28ec32741b056b1c17a5d45be5f' },
    { fileName: 'common.js', hash: '45b12409b02a65c8f380' },
    { fileName: 'layer_h5.m.js', hash: '046920c6269e86c71ef8' }
  ]
  var cssList = [
    { fileName: 'style.css', hash: '046920c6269e86c71ef8' },
    { fileName: 'layer_h5.css', hash: '046920c6269e86c71ef9' }
  ]

  if (jsFile) {
    let fileList = JSON.parse(jsFile)
    for (let i = 0; i < jsList.length; i++) {
      if (fileList[jsList[i].fileName] && fileList[jsList[i].fileName].hash !== jsList[i].hash) {
        loadJs('/static/lt_h5_v3/local/js/common/' + jsList[i].fileName, jsList[i].hash)
      } else {
        let html = jsFileList[jsList[i].fileName]['content']
        let script = document.createElement('script')
        script.appendChild(document.createTextNode(html))
        document.head.appendChild(script)
      }
    }
  } else {
    for (let i = 0; i < jsList.length; i++) {
      loadJs('/static/lt_h5_v3/local/js/common/' + jsList[i].fileName, jsList[i].hash)
    }
  }
**/
// 版本控制
var script = document.getElementsByTagName('script')
// 通过版本控制如果当前版本和用户本地储存的版本不一致，清空用户数据
for (var i = 0; i < script.length; i++) {
  if (version) {
    if (version !== localStorage['version']) {
      localStorage.clear()
      localStorage['version'] = version
    }
  }
}

// js
function loadJs (jsUrl) {
  var html = localStorage[jsUrl]
  if (!html) {
    html = this.getHttpResources(jsUrl)
  }
  var script = document.createElement('script')
  script.appendChild(document.createTextNode(html))
  document.head.appendChild(script)
  // return localStorage[jsUrl]
}

/**
 *将js全部放在一个变量里的，并实行单文件 hash 控制的尝试方法
  function loadJs (jsUrl, hash) {
    html = this.getHttpResources2(jsUrl, hash)
    let script = document.createElement('script')
    script.appendChild(document.createTextNode(html))
    document.head.appendChild(script)
    // return localStorage[jsUrl]
  }
*/

// img
function loadImg (img) {
  if (img.getAttribute('lsrc')) {
    if (!localStorage[img.getAttribute('lsrc')]) {
      var x = new XMLHttpRequest()
      x.responseType = 'blob'
      x.open('get', img.getAttribute('lsrc'), true)
      x.onreadystatechange = function () {
        if (x.readyState === 4) {
          var reader = new FileReader()
          reader.readAsDataURL(x.response)
          reader.onload = function () {
            localStorage[img.getAttribute('lsrc')] = this.result
            img.src = this.result
          }
        }
      }
      x.send()
    } else {
      img.src = localStorage[img.getAttribute('lsrc')]
    }
  }
}

// CSS
function loadCss (url) {
  var html = localStorage[url]
  if (!localStorage[url]) {
    html = this.getHttpResources(url)
  }
  var s = document.createElement('style')
  s.innerHTML = html
  document.getElementsByTagName('head')[0].appendChild(s)
}

/*
 * http请求资源公共方法
 */
function getHttpResources (url) {
  var html = ''
  try {
    var xmlhttp = new XMLHttpRequest()
    xmlhttp.open('GET', url, false)
    xmlhttp.send()
    localStorage[url] = xmlhttp.responseText
    html = xmlhttp.responseText
  } catch (e) {
    console.log(e)
    console.log('加载资源失败，请查看链接是否正常！')
  }
  return html
}
/**
 *将js全部放在一个变量里的，并实行单文件 hash 控制的尝试方法
  function getHttpResources2 (url, hash) {
    let html = ''
    let name = url.split('/').slice(-1)[0]
    try {
      var xmlhttp = new XMLHttpRequest()
      xmlhttp.open('GET', url, false)
      xmlhttp.send()
      jsFileList[name] = jsFile ? jsFileList[name] : {}
      jsFileList[name]['hash'] = hash
      jsFileList[name]['content'] = xmlhttp.responseText
      // debugger
      localStorage.setItem('jsFile', JSON.stringify(jsFileList))
      html = xmlhttp.responseText
    } catch (e) {
      console.log(e)
      console.log('加载资源失败，请查看链接是否正常！')
    }
    return html
  }
*/

// 公共的第三方js和css，不需要修改
loadJs(cdnUrl + jsVersion + '/local/js/common/jquery.min_1.8.2.js')
loadJs(cdnUrl + jsVersion + '/local/js/common/common.js')
loadJs(cdnUrl + jsVersion + '/local/js/common/layer_h5.m.js')

loadCss(cdnUrl + jsVersion + '/local/css/common/style.css')
loadCss(cdnUrl + jsVersion + '/local/css/common/layer_h5.css')
// loadCss(cdnUrl + jsVersion + '/local/css/common/mint-style.css')
// loadCss(cdnUrl + jsVersion + '/local/css/common/index.css')
// loadCss(cdnUrl + jsVersion + '/local/css/common/layer.css')
// 自动载入webpack打包的css和js，需要手动修改上方变量的值
// loadCss(appCss)
// loadJs(manifestJs)
// loadJs(vendorJs)
// loadJs(appJs)
