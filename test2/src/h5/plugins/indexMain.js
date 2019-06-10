
window._._uniq = function (array) {
  var result = []
  var length = array.length
  var i
  for (i = 0; i < length; i++) {
    if (result.indexOf(array[i]) < 0) {
      result.push(array[i])
    }
  }
  return result
}
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
    return !(window.store.state.h5Home.isOffLine = !navigator.onLine)
  }
  // indexMain.closeMuseUI = function () {
  //   window.store.state.h5Home.MuseUI.open = false
  //   window.store.state.h5Home.MuseUI.openR = false
  //   window.store.state.h5Home.MuseUI.dockedLeft = false
  //   window.store.state.h5Home.MuseUI.dockedRight = false
  // }

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
    window.store.state.h5Home.showLoading = true
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
        window.store.state.h5Home.showLoading = false
      }
    } else {
      if (!window.$.isEmptyObject(loadingDetail)) {
        loadingDetail = {}
      }
      window.store.state.h5Home.showLoading = false
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

  indexMain.appHiddenOverflow = function (flag, id) {
    flag = flag === true ? 'hidden' : ''
    var apiEl = document.getElementById(id)
    apiEl.style.overflow = flag // 解决安卓机型弹窗遮罩后，背景可滑动的问题
    let isApple = false
    if (/iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())) {
      isApple = true
    }
    // 是否苹果机型
    if (isApple) {
      let $apiEl = window.$(apiEl)
      // 是否弹窗遮罩需要禁止背景滑动
      if (flag === 'hidden') {
        $apiEl.css({'position': 'fixed'}) // 固定'#api'区域，禁止'#api'区域整体滑动
      } else {
        $apiEl.css({'position': ''}) // 还原
      }
    }
  }

  /**
   * 给指定页面-添加背景
   */
  indexMain.ifRouteChange = function () {
    var pathname = window.location.pathname
    switch (pathname) {
      case '/wap/login':
        window.$('body').removeClass()
        window.$('body').addClass('common-body loginBody')
        break
      case '/wap/index':
        window.$('body').removeClass()
        window.$('body').addClass('common-body indexBody')
        break
      case '/wap/basicsInfo':
        window.$('body').removeClass()
        window.$('body').addClass('common-body basicsInfoBody')
        break
      case '/wap/common/creditConversion':
        window.$('body').removeClass()
        window.$('body').addClass('common-body conversionBody')
        break
      case '/wap/cardList':
        window.$('body').removeClass()
        window.$('body').addClass('common-body whiteBody')
        break
      default:
        window.$('body').removeClass()
        window.$('body').addClass('common-body')
    }
  }
  // reset store value
  indexMain.reset = function () {
    window.store.state.h5Home.headback = false
  }
  // 重装游戏数据
  indexMain.handleGameData = function (gameData) {
    if (gameData && gameData.gameCenterCategoryList) {
      gameData.gameCenterCategoryList.forEach(value => {
        value.gameCenterCat = gameData.gameCenterList[value.id].gameCenterCat
        value.gameCenterCat.forEach(v => {
          v.centerGame = gameData.gameCenterList[value.id].centerGame[v.id]
        })
      })
    }
    return gameData
  }
  // 强制修改密码的提示
  indexMain.forceUpdateAlert = function () {
    let fp = window.store.state.h5Home.forceUpdatePwd // 是否强制
    if (fp) {
      window.layer.msgWarn(window.store.state.h5Home.forceUpdatePwdMsg || '', function () {
        sessionStorage.setItem('modifyWhichPsw', 1)
        window.router.push({path: '/wap/modifyPassWord', query: {isModifyLoginPwd: true}})
      })
    }
  }
  // 全局阻止穿透滑动的方法
  indexMain.stopScroll = function () {
    document.documentElement.style.overflow = 'hidden'
    if (/ipad/.test(navigator.userAgent.toLowerCase())) {
      document.documentElement.style.position = 'fixed'
    }
  }
  // 全局开启穿透滑动的方法
  indexMain.openScroll = function () {
    document.documentElement.style.overflow = ''
    if (/ipad/.test(navigator.userAgent.toLowerCase())) {
      document.documentElement.style.position = ''
    }
  }
  /**
   * 版本号业务处理，主要用于组装参数发送到后台
   * title:存localStorage数据的标题，，用于通用处理
   * type:配置项内的数组，用于通用处理,只需要传入不同的值即可以获取到对应的版本号key
   * 出参
   */
  indexMain.versionFun = function (api) {
    // 每个方法在localStorage内都有版本号，根据传过来的title去取值
    let list = {}
    try { list = JSON.parse(window.localStorage.getItem(api + '_vKey')) } catch (e) { }
    return list
  }
  /**
   * 通用版本号用于mutations获取到后台数据统一处理方法
   * set 保存数据到本地
   * 没有return
   * state = window.indexMain.commonVersion(state, res, _gameMap[key][1])
   * 统一处理 list 值 自动保存
   */
  indexMain.commonVersion = function (res, api, open = false) {
    // 循环配置项list控制的key
    if (res.list && !window._.isEmpty(res.list)) {
      window._.each(res.list, (val, key) => {
        if (res.list[key].status < 1) { // 新数据
          verSet(res, key, api)
        }
        if (res.list[key].status > 0) { // 旧数据
          verGet(res, key, api)
        }
      })
    } else {
      res.list = {}
      window._.each(res.data, (val, key) => {
        res.list[key] = null
      })
    }
    if (open) { // 更新 list 到本地
      try {
        localStorage[api + '_vKey'] = JSON.stringify(res.list)
      } catch (e) {
      }
    }
    return res
  }
  function verSet (res, key, api) {
    localStorage[api + '_' + key] = JSON.stringify(res.data[key])
  }
  // 从本地取出数据 附加 res 内
  function verGet (res, key, api) {
    try {
      res.data[key] = JSON.parse(localStorage[api + '_' + key])
    } catch (e) {
      res.data[key] = ''
    }
  }
  window.indexMain = indexMain
}
