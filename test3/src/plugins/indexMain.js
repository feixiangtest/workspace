/**
 * 产生任意长度随机字母数字组合
 *
 * randomFlag-是否任意长度
 * min-任意长度最小位[固定位数]
 * max-任意长度最大位
 *
 */
window.randomWord = function (randomFlag, min, max) {
  var str = ''

  var range = min

  var arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

  var pos
  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min
  }
  for (var i = 0; i < range; i++) {
    pos = Math.round(Math.random() * (arr.length - 1))
    str += arr[pos]
  }
  return str
}

export default function () {
  let indexMain = window.indexMain

  // 初始化
  indexMain = {
    loadingDetail: {}, // loading加载效果对象
    requestTimeout: {// 请求超时Timeout对象
      data: {}, // 请求超时Timeout集合
      opening: false, // 当前是否正在提示'加载失败，请稍后重试！'
      reset: function () {
        this.data = {}
        this.opening = false
      }
    }
  }

  /**
   * 防止点击穿透
   * @param $dom 谨防被穿透的dom对象
   */
  indexMain.pointerEvents = function ($dom) {
    if (!$dom || !$dom[0]) {
      return
    }
    $dom.css('pointer-events', 'none')
    setTimeout(function () {
      $dom.css('pointer-events', '')
    }, 410)
  }

  /**
   * 判断现在是否有网的情况
   */
  indexMain.isOnLine = function () {
    return !(window.store.state.home.isOffLine = !navigator.onLine)
  }
  indexMain.closeMuseUI = function () {
    window.store.state.home.MuseUI.open = false
    window.store.state.home.MuseUI.openR = false
    window.store.state.home.MuseUI.dockedLeft = false
    window.store.state.home.MuseUI.dockedRight = false
  }

  // 回到顶部
  indexMain.gpoScrollTop = function () {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  // 手机初始旋转位置的高宽
  indexMain.initGpoCurrentScreen = function () {
    if (!indexMain.gpoScreenRotate) {
      let ht = window.innerHeight
      let wt = window.innerWidth
      // 由于移动端旋转90°的宽比高大，旋转0°宽比高小，因此统一处理将大的定为高，小的定为宽
      indexMain.gpoScreenRotate = {
        innerHeight: ht > wt ? ht : wt,
        innerWidth: ht > wt ? wt : ht
      }
    }
  }
  indexMain.getGpoCurrentScreen = function () {
    return indexMain.gpoScreenRotate
  }

  // 在线客服
  indexMain.openOnlineService = function () {
    let url = ''
    try { url = window.store.state.home.onlineService.junctionSim } catch (e) { }
    if (!url) {
      window.layer.msgWarn('客服繁忙，请联系上级')
    } else {
      let reg = new RegExp('^http')
      let reg2 = new RegExp('^https')
      if (reg.test(url) || reg2.test(url)) {

      } else {
        url = '//' + url
      }
      let isLocal = window.store.state.home.onlineService.hrefTargetSim // 是否当前页面打开
      let windowHeight = window.store.state.home.onlineService.gbkHeight // 弹窗高
      let windowWidth = window.store.state.home.onlineService.gbkWidth // 弹窗宽
      let isWindow = window.store.state.home.onlineService.picStatusSim // 是否弹窗
      let domain = window.location.host
      if (isWindow) {
        var params = 'height=' +
          windowHeight +
          ',width=' +
          windowWidth +
          ',top=0,left=0,toolbar=no,menubar=no,scrollbars=' +
          scroll +
          ', resizable=yes,location=yes, status=yes'
        // 如果是内部链接需要将域名加上
        if (isLocal === '1') {
          url = '//' + domain + window.store.state.home.onlineService.junctionSim
        }
        window.open(url, '即时聊天', params)
      } else {
        if (isLocal === '0') {
          window.location.href = url
        } else {
          //  Uncaught TypeError: window.location.open is not a function
          url = '//' + domain + window.store.state.home.onlineService.junctionSim
          window.open(url)
        }
      }
    }
  }

  /**
   * 显示loading加载效果
   * @param {String} uuid 记录本次显示的标识，一般使用new Date().getTime()，uuid可以为空，但是不加入loading的管控
   * loading管控效果：比如，多个同时发送的异步请求(针对类似的都有效)，当所有异步请求响应之后才进行loading加载效果隐藏
   */
  indexMain.showLoading = function (uuid) {
    let loadingDetail = indexMain.loadingDetail
    if (uuid) {
      loadingDetail[uuid] = true
    }
    window.store.state.home.showLoading = true
  }

  /**
   * 隐藏loading加载效果
   * @param {String} uuid 与本次调用showLoading方法的标识保持一致，一般使用new Date().getTime()，uuid可以为空，但是不加入loading的管控
   */
  indexMain.hideLoading = function (uuid) {
    let loadingDetail = indexMain.loadingDetail
    if (uuid) {
      loadingDetail[uuid] = false
      let flag = false
      window.$.each(loadingDetail, (key, value) => {
        if (value === true) {
          flag = true
          return false // 跳出each循环
        }
      })
      if (!flag) {
        loadingDetail = {}
        window.store.state.home.showLoading = false
      }
    } else {
      if (!window.$.isEmptyObject(loadingDetail)) {
        loadingDetail = {}
      }
      window.store.state.home.showLoading = false
    }
  }

  /**
   * 设置请求超时方法
   * @params callback {Function} 执行请求超时之后的回调函数
   * @return id {Number} 该次创建的请求超时记录的唯一标识，可通过clearRequestTimeout(id)取消
   */
  indexMain.setRequestTimeout = function (uuid, callback) {
    var id = setTimeout(() => {
      if (indexMain.requestTimeout.opening === true) {
        return
      }
      indexMain.requestTimeout.opening = true
      window.layer.confirm({ content: '加载失败，请稍后重试！', btn: ['重新加载', '取消'] }, () => {
        location.reload()
      }, () => {
        window.indexMain.hideLoading(uuid)
        // 清理所有注册的请求超时Timeout对象
        for (var key in indexMain.requestTimeout.data) {
          indexMain.clearRequestTimeout(key)
        }
        indexMain.requestTimeout.reset()
      })
    }, 1000 * 30)
    indexMain.requestTimeout.data[id] = id
    return id
  }

  indexMain.clearRequestTimeout = function (id) {
    clearTimeout(id)
    delete indexMain.requestTimeout.data[id]
  }

  /**
  * 虚拟键盘弹起，有时需要取消底部 fixed 元素定位，改成static,解决安卓的谷歌、UC浏览器被底部元素遮住输入框等问题
  * @param iptSelector {String} DOM选择器，如 '.app input',需要绑定事件的元素
  * @param eleSelector {String} DOM选择器，需要取消 fixed 定位的元素
  * @returns null
  * @author kollen 2018-08-18
  */
  indexMain.closeFixed = function (iptSelector, eleSelector) {
    window.$(iptSelector).focus(function () {
      window.$(eleSelector).css('position', 'static')
      setTimeout(function () {
        window.$(this).scrollIntoView() // 滚动到可视区域
      }, 100)
    }).blur(function () {
      setTimeout(function () { // 如果不放在定时器中，iOS以切换支付类型的方式触发失去焦点事件时，会出现其他问题
        window.$(eleSelector).css('position', 'fixed')
      }, 100)
    })
  }
  window.indexMain = indexMain
}
