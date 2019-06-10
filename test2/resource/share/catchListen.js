// js脚本、ajax请求、资源请求异常监控源码
(function ($this) {
  var isInited = false, // 是否已初始化，只支持一次初始化，防止改
    logUrl = '//h5logtest.bwt18.com/report/err', // 默认的日志服务器接口
  //  logUrl = 'http://haitian.bwtlh.com:3000/report/err'
      // 本地
    appType = ''; // 应用类型
  $this.insertLogs = insertLogs    // 上报日志
  $this._initCL = function (type, url) {
    if (isInited)  return
    isInited = true
    logUrl = url? url: logUrl
    appType = type
  }
  /**
   * js脚本错误日志监控
   * @param {String} msg 错误信息
   * @param {String} url 出错的文件
   * @param {Number} row 出错代码的行号
   * @param {Number} col 出错代码的列号
   * @param {Object} error 错误的详细信息，Anything
   */
  window.onerror = function (msg, url, row, col, error) {
    insertLogs({
      msg: msg,
      url: url,
      row: row,
      col: col,
      error: (error && error.stack) || error
    }, 'jsCode')
  }
  /**
   * 资源请求异常日志监控
   * @param {Object} e 错误事件对象
   */
  $this.errListenSource = function (e) {
    if (!e || !e.target) {
      insertLogs(e || {}, 'jserr', '资源请求异常，异常回调函数不是事件对象，请检查！')
      return
    }
    var d = document.createElement('div')
    d.appendChild(e.target)
    // 插入日志
    insertLogs({
      dom: d.innerHTML
    }, 'source')
    var url = ''
    if (e.target.tagName === 'SCRIPT') {
      url = e.target.src
    } else if (e.target.tagName === 'LINK') {
      url = e.target.href
    }
    // 由于资源请求异常，获取不到状态码，因此再通过模拟请求，获取到资源报错的状态码，前提是资源域名无跨域问题
    var ajax = new XMLHttpRequest && new XMLHttpRequest()
    if (ajax) {
      ajax.open('get', url)
      ajax.send()
      ajax.onreadystatechange = function (xml) {
        if (ajax.readyState === 4) { // 响应
          $this.errListenAjax({
            ajaxUrl: url,
            ajaxStatus: ajax.status
          }, '通过XMLHttpRequest模拟请求资源：' + url)
        }
      }
    }
  }
  /**
   * 请求错误日志监控
   * @param {Object} logDetails 错误详情
   * @param {String} remark 备注
   */
  $this.errListenAjax = function (logDetails, remark) {
    insertLogs(logDetails, 'ajax', remark)
  }
  // 插入日志
  function insertLogs (logDetails, errorType, remark) {
    var params = {
      clientTime: new Date() + ' 毫秒：' + (+new Date() % 1000), // 客户端时间
      clientZone: 0 - new Date().getTimezoneOffset() / 60, // 客户端时区
      appType: appType, // 应用类型
      errorType: errorType, // 监听的错误类型：1 ajax jserr 2 source api  3vue err
      localstorageKeys: Object.keys && Object.keys(localStorage), // 所有本地缓存的key集合
      remark: remark || '', // 备注
      details: logDetails || {} // 错误日志详情
    }
    params.details.sitUrl = location.href
    var xmlHttp = new XMLHttpRequest && new XMLHttpRequest()
    xmlHttp.onreadystatechange = function () {
      if (xmlHttp.readyState === 4) {
        console.info(xmlHttp, xmlHttp.responseText)
      }
    }
    xmlHttp.open('post', logUrl, true)
    try {
      var a = JSON.stringify(params)
    } catch (e) {
    }
    if (!a) return ''
    xmlHttp.send(JSON.stringify(params))
  }
}(window));
// 日志监控初始化数据 debug
window._initCL('OTWEB');
