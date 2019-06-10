/**
 * 统一的版本管理控制存储localStorage
 * 获取 CDN值
 */
var _headEl      = document.getElementsByTagName('head')[0]
var require      = function (source, fn, a) {
  // require 函数为完成 todo
  // 对比 服务器 与 本地版本
  if (require.config.v != localStorage['RequireV']) {
    for (var key in localStorage) {
      if (key != 'cookie') delete localStorage[key]
    }
    localStorage['RequireV'] = require.config.v
    if (localStorage['DEBUG']) {
      localStorage['RequireV'] = 1
    }
  }
}
require.loadList = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    loadJs[arr[i]]
  }
  appendJS()
}
// 配置文件动态生成
require.config   = {
  v: 1, // 当前所有js和css的版本号 new Date().getTime()
  jsVersion: '/static/lt_h5_v3',
  map: {},
  cdnUrl: '' //目前的大版本路径
}
loadCDN()
var jsData         = ';'
require.config.map = {
  'style.css': require.config.cdnUrl + require.config.jsVersion + '/local/css/common/style.css',
  // 'layer_h5.css': require.config.cdnUrl + require.config.jsVersion + '/local/css/common/layer_h5.css',
  'jquery': require.config.cdnUrl + require.config.jsVersion + '/local/js/common/jquery.min_1.8.2.js',
  'common': require.config.cdnUrl + require.config.jsVersion + '/local/js/common/common.js',
  'layer_h5': require.config.cdnUrl + require.config.jsVersion + '/local/js/common/layer_h5.m.js'
}
_insert()
require()

// js
function loadJs (jsUrl) {
  var html   = localStorage[jsUrl]
  var script = document.createElement('script')
  if (!html) {
    html = getHttpResources(jsUrl)
    if (!html) {
      console.info('get code null', jsUrl)
    }
  }
  jsData = jsData + ';\n' + html
}

// load webpack js
function loadCDN () {
  var xmlhttp = new XMLHttpRequest()
  if (localStorage['cdnUrl']) {
    require.config.cdnUrl = localStorage['cdnUrl']
  } else {
    try {
      xmlhttp.open('GET', '/static/config/cdn.js', false)
      xmlhttp.send()
      if (xmlhttp.responseText.length > 50) {

      } else {
        var html = 'var __cdnUrl = ' + xmlhttp.responseText
        eval(html)
        if (__cdnUrl) require.config.cdnUrl = __cdnUrl.cdn
        // localStorage['cdnUrl'] = __cdnUrl
      }
    } catch (e) { }
  }
}

function appendJS () {
  var script = document.createElement('script')
  script.appendChild(document.createTextNode(jsData))
  script.setAttribute('is', 'js' + jsData[2])
  document.head.appendChild(script)
  jsData = ''
  // eval(jsData)
  // console.info(jsData)
}

// CSS
// 异步加载
function loadCss (url) {
  var result = ''
  var s      = document.createElement('style')
  if (!localStorage[url]) {
    getHttpResources(url)
  }
  s.innerHTML = localStorage[url]
  _headEl.appendChild(s)
}

/*
 * http请求资源公共方法
 */
function getHttpResources (name) {
  var html    = ''
  var httpUrl = require.config.map[name]
  if (!httpUrl) {
    console.log('加载资源失败，请查看链接是否正常！', name)
    return false
  }
  try {
    var xmlhttp = new XMLHttpRequest()
    httpUrl     = httpUrl.replace(/\/\/static/g, '/static')
    xmlhttp.open('GET', httpUrl, false)
    xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencode')
    xmlhttp.send()

    if (localStorage['DEBUG']) {

    } else {
      localStorage[name] = xmlhttp.responseText
    }
    html = xmlhttp.responseText
    // console.info(httpUrl, 'load ok')
  } catch (e) {
    // console.log(e)
    console.log('加载资源失败，请查看链接是否正常！', e)
  }
  return html
}

function _insert () {}

/**
 loadCss(cdnUrl + jsVersion + '/local/css/common/style.css')
 loadCss(cdnUrl + jsVersion + '/local/css/common/layer_h5.css')
 */
var reactLd = {}
