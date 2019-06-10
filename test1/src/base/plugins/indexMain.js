/**
 * 主系统全局公共方法 by karl
 */
import * as version from '../config/indexVersion'
import { pagezh } from '../config/zh.js'// 中文标题
import { outerArr } from '../config/customComponents.js'
import * as jumpAPI from '../service/jumpGo'
import method from '../utils/method'

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
  // 是否IOS机型
  indexMain.isIos = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())
  /**
  * 版本号业务处理，主要用于组装参数发送到后台
  * title:存localStorage数据的标题，，用于通用处理
  * type:配置项内的数组，用于通用处理,只需要传入不同的值即可以获取到对应的版本号key
  */
  indexMain.versionFun = function (title, type) {
    // 每个方法在localStorage内都有版本号，根据传过来的title去取值
    let lotteryVersion = null
    try { lotteryVersion = JSON.parse(window.localStorage.getItem(title)) } catch (e) { }
    let versionlist = {}
    if (lotteryVersion !== null) {
      /* 版本号处理 begin */
      versionlist = {}
      // 循环配置项内的版本号的key用于循环处理
      for (let i = 0; i < version[type].length; i++) {
        // 获取对应的数据，如果没有，则需要将版本号置空传到后台
        let obj = window.localStorage.getItem(version[type][i])
        // 除了判断版本key是否存在，还得判断数据是否存在，如果数据不存在或者版本号被清空了，将版本号的value赋值为空重新获取数据填充
        let objs = '' + version[type][i]
        objs = {
          [version[type][i]]: {
            key: version[type][i],
            value: obj === null || lotteryVersion[version[type][i]] === undefined ? '' : lotteryVersion[version[type][i]].value
          }
        }
        window.$.extend(versionlist, versionlist, objs)
      }
      /* 版本号处理 end */
    } else {
      // 如果为获取到lotteryVersion直接循环赋空值用于后台重新传输版本号
      for (let i = 0; i < version[type].length; i++) {
        let obj = {[version[type][i]]: null}
        window.$.extend(versionlist, versionlist, obj)
      }
    }
    return versionlist
  }

  /**
   * 通用版本号用于mutations获取到后台数据统一处理方法
   */
  indexMain.commonVersion = function (state, res, type) {
    for (let i = 0; i < version[type].length; i++) { // 循环配置项内版本控制的key
      if (res.list[version[type][i]] !== null && res.list[version[type][i]] !== undefined) {
        if (res.list[version[type][i]].status === '1') { // 状态值为1时直接查询localStorage内的参数
          state[version[type][i]] = JSON.parse(localStorage.getItem([version[type][i]]))
        } else { // 代表后台重新发送了数据，从res中取值并存储到localStorage中
          localStorage.setItem([version[type][i]], JSON.stringify(res.data[version[type][i]]))// 将数据存储
          state[version[type][i]] = res.data[version[type][i]]
        }
      }
    }
    return state
  }

  /*
   * 关闭当前彩票窗口
   */
  indexMain.closeLtWindow = function () {
    /* --------------- 关闭当前窗口（需做根据不同浏览器使用不同的关闭方法） start --------------------------------------------- */
    if (navigator.userAgent.indexOf('MSIE') > 0) { // IE
      if (navigator.userAgent.indexOf('MSIE 6.0') > 0) { // IE6
        window.opener = null
        window.close()
      } else { // IE6+
        window.open('', '_top')
        window.top.close()
      }
    } else if (navigator.userAgent.indexOf('Firefox') > 0 || navigator.userAgent.indexOf('Presto') > 0) { // FF和Opera
      // window.location.href = 'about:blank'
      window.close()// 火狐默认状态非window.open的页面window.close是无效的
    } else {
      window.opener = null
      window.open('', '_self', '')
      window.close()
    }
   /* --------------- 关闭当前窗口（需做根据不同浏览器使用不同的关闭方法） end --------------------------------------------- */
    // window.location.href = 'about:blank'
    // open(location, '_self').close()
  }
  /**
   * 删除多余的dom元素
   */
  indexMain.mountedRemoveDoms = function () {
    if (!window.$.isArray(window.mountedRemoveDoms)) {
      return
    }
    var _item = null
    for (var i = 0; i < window.mountedRemoveDoms.length; i++) {
      _item = window.mountedRemoveDoms[i]
      _item && _item && _item.remove()
      _item = null// 释放
      window.mountedRemoveDoms[i] = null// 释放
    }
    window.mountedRemoveDoms = []
  }
  /**
   * 自定义方法调用事件，在指定时间之内(默认100ms)调用同一个方法，只执行最后一次调用的方法及参数
   * 弊端：1、只执行1个方法也会延迟到指定时间之后执行 2、无返回数据，但提供了callback回调
   * @param func 被调用的函数，不支持匿名函数
   * @param params 被调用函数的参数
   * @param callback func调用之后的回调函数，参数为func执行之后的返回数据
   * @param timestamp 自定义指定时间，单位：ms（默认100ms）
   */
  indexMain.gpoCall = function (func, params, callback, timestamp) {
    if (typeof func !== 'function' || !func.name) {
      return
    }
    var key = func.name
    if (!window.gpoCallStrategy) {
      window.gpoCallStrategy = {
        op: {
          lastTime: 0,
          timeStamp: window.$.isNumeric(timestamp) ? timestamp * 1 : 100,
          params: null,
          interval: null
        },
        cache: {}
      }
    }
    if (!window.gpoCallStrategy.cache[key]) {
      window.gpoCallStrategy.cache[key] = window.$.extend(true, {}, window.gpoCallStrategy.op)
    }
    var op = window.gpoCallStrategy.cache[key]
    op.params = params
    // 是否排队中
    if (op.interval !== null) {
      return
    }
    op.lastTime = new Date().getTime()
    op.interval = setInterval(() => {
      let newTime = new Date().getTime()
      let timeStamp = newTime - op.lastTime
      if (timeStamp >= op.timeStamp) {
        op.lastTime = newTime
        clearInterval(op.interval)
        op.interval = null
        var rt = func(op.params)
        if (typeof callback === 'function') {
          callback(rt)
        }
      }
    }, 20)
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
  // 显示/隐藏loading加载效果，可使用在同步接口前后
  indexMain.toggleLoading = function (isShow) {
    window.$('.mint-indicator').toggle(isShow) // 显示/隐藏loading，使用store.state.home.showLoading=true来控制，只能放在异步
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

  /**
   * 统一设置头部标题公共方法
   */
  indexMain.setTitle = function () {
    window.store.state.home.path = window.router.app._route.name
    window.store.state.home.title = pagezh[window.router.app._route.name]
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
      window.layer.confirm({content: '加载失败，请稍后重试！', btn: ['重新加载', '取消']}, () => {
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
  indexMain.appHiddenOverflow = function (flag) {
    flag = flag === true ? 'hidden' : ''
    var apiEl = document.getElementById(window.moduleRouter._id)
    apiEl.style.overflow = flag // 解决安卓机型弹窗遮罩后，背景可滑动的问题
    // 是否苹果机型
    if (window.indexMain.isIos) {
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
   * 站点是否有自定义该组件，如果存在则返回 该站点在站点管理配置的文件夹路径
   * @param relativeUrl 组件相对路径（相对src子目录）
   */
  indexMain.isCustomComponents = function (relativeUrl) {
    if (!relativeUrl) {
      return
    }
    // 智能删除前缀'/'
    if (relativeUrl.charAt(0) === '/') {
      relativeUrl = relativeUrl.substr(1)
    }
    // 获取该站点在站点管理配置的文件夹路径
    let folderUrl = window.store.state.home.folderUrl
    // 智能添加后缀'/'
    if (folderUrl && folderUrl.charAt(folderUrl.length - 1) !== '/') {
      folderUrl += '/'
    }
    let matchUrl = folderUrl + '' + relativeUrl
    for (let url of outerArr) {
      if (url.indexOf(matchUrl) >= 0) {
        return folderUrl
      }
    }
    return false
  }
  /**
   * 添加css
   * @param href
   * @param flag ID标识
   */
  indexMain.addCss = function (href, flag) {
    if (!href) {
      return
    }
    let linkE = document.createElement('link')
    linkE.href = href
    linkE.type = 'text/css'
    linkE.rel = 'stylesheet'
    if (flag) {
      if (document.getElementById(flag)) {
        return
      }
      linkE.id = flag
    }
    document.body.appendChild(linkE)
  }
  /**
   * 公共游戏点击事件
   * @param {Object} $this 当前vue对象
   * @param {Object} item 被点击的游戏
   * @returns {boolean}
   */
  indexMain.gameClick = function ($this, item) {
    if (window._config.Tap) { // 长按 会默认触发 一个click , 重新设置初始值 window._config.Tap
      window._config.Tap = false
      return
    }
    if (window._frequency && new Date().getTime() - window._frequency < 1000) {
      return false
    }
    window._frequency = new Date().getTime()
    // 是否是普通游戏内嵌的是电子游戏类型
    if (item.modelHtml && item.modelHtml.indexOf('openElectronGame') > -1) {
      let {goElectronGame} = method
      goElectronGame($this, item)
      return
    }
    $this.$store.dispatch('rent.action', {'modelId': item.Id}) // 保存最近浏览
    if (item.modelUrl) { // 游戏是否配置了路由
      $this.$router.push(item.modelUrl) // 跳转路由
    } else { // 没有配置路由，则检查登陆并跳转
      let {parseThird} = method
      if (!parseThird($this, item)) {
        return false
      }
      jumpAPI.checkLogin(item)
    }
  }
  /**
   * 公共游戏长按事件，调用的是腾讯的移动点击插件
   * @param {Object} $this 当前vue对象
   * @param {Object} item 被点击的游戏
   * @param {Event} event 事件对象
   * @param {Function} callback 成功之后的回调函数
   */
  indexMain.longTap = function ($this, item, event, callback) {
    window._config.Tap = true // 阻止点击事件触发
    event.stopPropagation()
    window.$.ajax({
      'type': 'post',
      'url': '/api/wap/wapFavorite/saveFavorite' + '?t=' + new Date().getTime(),
      'dataType': 'json',
      'cache': false,
      'async': false,
      'contentType': 'application/json',
      'data': JSON.stringify({
        modelId: item.Id
      }),
      'success': function (_res) {
        $this.$set(item, 'isFavofite', !item.isFavofite)
        window.indexMain.favofiteChange($this, item)
        if (typeof callback === 'function') {
          callback.call($this, item)
        }
      }
    })
  }
  /**
   * 收藏状态联动修改（首页、视讯、棋牌、捕鱼、电子等游戏）
   * @param {Object} $this 当前vue对象
   * @param {Object} item 被点击的游戏
   */
  indexMain.favofiteChange = function ($this, item) {
    let allGameMap = window.store.state.home.homeGameList // 左侧导航栏游戏
    for (let key in allGameMap) {
      let arr = window.store.state.home[key]
      if (!arr.length) {
        console.log('不存在该对象，或该对象为空或空数组：' + 'window.store.state.home.' + key)
        continue
      }
      window.indexMain.setFavofite($this, arr, item.Id, item.isFavofite) // 该游戏可能同时存在 首页列表 以及 该类游戏列表 中，因此设置成功之后不能跳出
    }
    let flag = false // 电子游戏内存在唯一，因此找到一个并设置成功之后，就无需再找电子游戏
    let eGamekeys = window.store.state.home.eGamekeys
    for (let key of eGamekeys) {
      let gArr = window.store.state.home[key + 'GameData']
      if (gArr && gArr.length) {
        !flag && (flag = window.indexMain.setFavofite($this, gArr, item.Id, item.isFavofite)) // 各电子列表
      }
    }
  }
  /**
   * 设置收藏状态数据
   * @param {Object} $this 当前vue对象
   * @param {Array} data 数据范围
   * @param {String} id 所选游戏的ID
   * @param {Object} isFavofite 收藏状态，true代表收藏，false则相反
   * @return {Boolean} true代表已找到并设置成功，false则相反
   **/
  indexMain.setFavofite = function ($this, data, id, isFavofite) {
    for (let i = 0; i < data.length; i++) {
      if (id === data[i].Id) {
        $this.$set(data[i], 'isFavofite', isFavofite)
        console.log('联动修改收藏状态成功！')
        return true
      }
    }
    return false
  }
  /**
   * 加载皮肤样式文件
   * @param folderUrl {String} 指定文件夹url
   * @param fileName {String} 文件（json格式），内容的key映射了对应皮肤文件的路径
   * @param key {String} key，是fileName文件（json格式）里面的某个key值
   * @param sync {Boolean} 是否同步加载皮肤样式文件，默认异步(false)
   * @returns null
   * @author payne 2018-08-14
   */
  indexMain.loadSkinCss = function (folderUrl, fileName, key, sync) {
    if (!folderUrl || !fileName || !key) {
      return
    }
    // 智能添加后缀'/'
    if (folderUrl && folderUrl.charAt(folderUrl.length - 1) !== '/') {
      folderUrl += '/'
    }
    // 智能删除前缀'/'
    if (fileName.charAt(0) === '/') {
      fileName = fileName.substr(1)
    }
    let oldAsync = window.$.ajaxSettings.async
    window.$.ajaxSettings.async = sync === true ? false : oldAsync
    window.$.getJSON(folderUrl + fileName, function (jsonObj) {
      if (jsonObj[key]) { // 获取到映射的皮肤文件的url
        let skinCssUrl = jsonObj[key]
        // 智能删除前缀'/'
        if (skinCssUrl.charAt(0) === '/') {
          skinCssUrl = skinCssUrl.substr(1)
        }
        // 添加样式文件，有本地缓存功能
        window.FileMap.addLoadTask([{
          fileType: 'css', url: folderUrl + skinCssUrl, isDynamicCDN: false
        }])
      }
    })
    window.$.ajaxSettings.async = oldAsync // 还原
  }
  /**
   * 找到电子游戏大类，替换其路由路径
   * @param itemArr {Array} 游戏对象集合
   * @returns null
   * @author payne 2018-12-31
   */
  indexMain.updateModelUrl = function (itemArr) {
    if (!window.$.isArray(itemArr)) {
      return
    }
    let ids = window.store.state.home.eGameIds || [] // 电子游戏大类的Id集合
    for (let item of itemArr) {
      if (ids.includes(item.Id) && item.modelUrl) {
        let reg = new RegExp(/(^\/wap\/)(.*)(Game$)/)
        if (reg.test(item.modelUrl)) {
          item.modelUrl = item.modelUrl.replace('bbin', 'bb') // bbin改成bb
          // 将'/wap/agGame'改成'/wap/eGame/ag'格式，不从数据库改的原因是为了兼容APP，APP暂时要求修改前的格式
          let newModelUrl = item.modelUrl.replace(reg, '$1e$3/$2')
          item.eGameKey = item.modelUrl.replace(reg, '$2') // 截取到电子游戏的key
          item.modelUrl = newModelUrl
        }
      }
    }
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
        window.$(iptSelector).scrollIntoView && window.$(iptSelector).scrollIntoView() // 滚动到可视区域
      }, 100)
    }).blur(function () {
      setTimeout(function () { // 如果不放在定时器中，iOS以切换支付类型的方式触发失去焦点事件时，会出现其他问题
        window.$(eleSelector).css('position', 'fixed')
      }, 100)
    })
  }
  window.indexMain = indexMain
}
