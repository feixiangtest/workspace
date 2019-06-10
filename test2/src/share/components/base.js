/** 添加全局fn --> vue
 *  * 依赖影响： pc  h5
 * 注意：非公用不要加，谨慎添加修改
 */
function openChatWin (wap) {
  // 获取数据
  var articleList = {}
  if (wap === 'h5home') {
    articleList = window.store.state.h5Home.articleList
  } else {
    articleList = window.store.state.shareApi.articleList
  }

  var onlineservice = {}
  // 判断是否有编辑在线客服
  // Uncaught TypeError: Cannot read property 'junctionSim' of undefined
  if (articleList && articleList.onlineservice && articleList.onlineservice.junctionSim) {
    // 在线客服数据
    onlineservice = articleList.onlineservice
    var windowHeight = onlineservice.gbkHeight // 弹窗高
    var windowWidth = onlineservice.gbkWidth // 弹窗宽
    var isLocal = onlineservice.hrefTargetSim // 是否当前页面打开
    var url = onlineservice.junctionSim // 跳转地址
    var isWindow = onlineservice.picStatusSim // 是否弹窗
    var reg = new RegExp('^http')
    var reg2 = new RegExp('^https')
    var domain = window.location.host
    if (reg.test(url) || reg2.test(url)) {

    } else {
      url = '//' + url
    }
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
        url = '//' + domain + onlineservice.junctionSim
      }
      window.open(url, '即时聊天', params)
    } else {
      if (isLocal === '0') {
        window.location.href = url
      } else {
        //  Uncaught TypeError: window.location.open is not a function
        url = '//' + domain + onlineservice.junctionSim
        window.open(url)
      }
    }
  } else {
    window.layer.msgWarn('客服繁忙，请联系上级')
  }
}

exports.install = function (Vue, options) {
  // 在线客服方法
  Vue.prototype.$openChatWin = function (wap) {
    openChatWin(wap)
  }
  // 添加全局真人视讯方法
  Vue.prototype.$jumpLive = function (key, isMobile, gameId) {
    window.thirdPartyJump.gameClick(key, isMobile, gameId)
  }
  // 添加全局需要验证是否登录，与试玩账号的方法
  // 如果需要登录才可以进，那么传param.needLogin:true,禁止试玩账号登录那么param.forbidTryUser:true,自定义文字param.text:'kjklj'
  Vue.prototype.$authJumpUrl = function (url, param) {
    let config = param || {}
    if (config.needLogin) {
      if (!window.store.state.user.userInfo.account) {
        // window.layer.msgWarn(config.text || '请先登录')
        this.$router.push({
          path: '/wap/login'
        })
        return
      }
    }
    if (config.forbidTryUser) {
      if (window.store.state.h5Home.type === '1') {
        window.layer.msgWarn(`对不起，${config.text || '此页面'}不对试玩账号开放！`)
        return
      }
    }

    if (url.indexOf('transactionRecord') > -1) {
      sessionStorage.setItem('originToTransection', this.$route.name)
    }

    this.$router.push({
      path: '/' + url
    })
  }

  // 添加全局open方法，等同于window.open()
  Vue.prototype.$open = function (url, target, params) {
    if (url) {
      window.open(url, target, params)
    }
  }
  // 添加切换皮肤的方法 注意： h5 使用这个方法会报错 ， h5另外写 不要改这里
  Vue.prototype.$changeSkin = function () {
    let newSkinDir = this.$store.state.shareApi.newDurl // 获取到新皮肤站点字段
    window.common.setCookie('changeSkin', newSkinDir) // 将新站点字段存储在皮肤
    // window.location.replace(window.location.href)
    // window.location.reload(true)
    window.location.href = window.location.href.split('?nocache=')[0] + '?nocache=' + (new Date()).getTime()
    // window.location.href = window.location.href
  }
  // 免费试玩
  Vue.prototype.$freeLogin = function () {
    this.$store.dispatch('loginFree.action', {}).then(res => {
      if (res.status === window.common.statusConst.SUCCESS) {
        try {
          this.$store.state.site.nowPosition = 0
        } catch (e) {
        }
        window.store.dispatch('initData.action')
        // 重新获取首页信息
        window.layer.msgWarn('您已进入试玩模式，平台试玩金额与进入第三方后的试玩金额可能不一致，请尽情体验！！', () => {
          try {
            this.$store.state.home.gameNoticeFlag = true // 首页游戏公告显示
          } catch (e) {
          }
          this.$router.push('/home')
        })
      }
    })
  }
  // 添加全局检测是否登录方法
  Vue.prototype.$isLoginStatus = function () {
    // 用于判断是否登录状态
    var userInfo = window.localStorage.getItem('userInfo')
    if (userInfo !== null && userInfo !== undefined) {
      this.$store.state.user.userInfo = JSON.parse(userInfo)
      this.$store.state.user.isLogin = true
    } else {
      this.$set(this.$store.state.user, 'isLogin', false)
    }
  }
}
