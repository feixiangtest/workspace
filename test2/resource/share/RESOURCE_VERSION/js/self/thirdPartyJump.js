;(window.thirdPartyJump = (function () {
  return {
    /**
     * 第三方点击事件
     */
    gameClick: function (key, isMobile, gameId) {
      if (!isMobile) {
        isMobile = 0
      }
      // 防止过快重复点击
      if (window._frequency && new Date().getTime() - window._frequency < 1000) {
        return false
      }
      window._frequency = new Date().getTime()
      // 检查是否登录 & 查询第三方开放状态,如果要传gameId,那么设置isMobile为1
      this.checkLoginparseThird(key, isMobile, gameId)
    },
    /**
     * 检查是否登录 & 检查第三方状态
     */
    checkLoginparseThird: function (key, isMobile, gameId) {
      // 登录状态 1为已登录其它为未登录
      var _IS_LOGIN = window.common.loginStatus
      var $this = this
      // 如果没登录弹出登录弹框
      if (!_IS_LOGIN) {
        window.store.state.shareApi.showPopLogin = true
        return false
      }
      // 跳转第三方检查 是否维护
      var options = {key: key, isMobile: isMobile, gameId: gameId}
      // 查询游戏状态
      window.$.http('/member/tpsPlatformLogin/getGameStatus', options, {
        async: false,
        type: 'POST',
        hideLoading: true
      }).then(function (res) {
        // 如果是已开放
        if (String(res.status) === window.common.statusConst.SUCCESS) {
          // 跳转第三方
          $this.jumpGO(key, isMobile)
        } else {
          window.layer.msgWarn(res.msg, function () {
            // 游戏被关闭的判断res.data.isOpen === false不能改成!res.data.isOpen   isOpen=false代表游戏已关闭，需要刷新页面OT-4645
            // if (String(res.status) === window.common.statusConst.FAILURE && res.data && res.data.isOpen === false) {
            //   window.location.reload() // 重新刷新
            // }
          })
        }
      }).catch(function (err) {
        window.layer.alert(err.msg)
      })
    },
    // 跳转第三方
    jumpGO: function (key, isMobile) {
      var left = (document.body.clientWidth - 1000) / 2
      var params = 'height=680,width=970,top=0,left=' + left + ',toolbar=no,menubar=no,scrollbars=no' +
        ',resizable=yes,location=yes, status=yes'
      //  会员类型
      var _userType = window.common.userType
      if (_userType === '1') { // 表示试玩
        // OG 视讯试玩
        if (key === 'og') {
          try {
            window.open('http://freeplay.og6666.com/freeplaywls/cn/')
          } catch (error) {
            window.location.href = 'http://freeplay.og6666.com/freeplaywls/cn/'
          }
          return
        } else if (key === 'bb') {
          window.layer.msgWarn('当前游戏不对试玩账号开放，请注册正式账号再登入!', function () {
          })
          return false
        }
      }
      // 测试帐号增加新的判断 过滤
      if (_userType === '2') {
        if (key === 'ag' || key === 'og' || key === 'bb') {
          window.layer.msgWarn('该游戏不对测试账号开放!', function () {
          })
          return false
        }
      }
      // 是否创建真实账号，true娱乐试玩账号false正式账号,
      var a = navigator.userAgent.toLowerCase()
      if (key) {
        if (a.indexOf('oppo') > -1) {
          window.location.href = location.origin + '/thirdPartyJump?type=loginapi&key=' + key
          return false
        }
        try {
          window.open(location.origin + '/thirdPartyJump?type=loginapi&key=' + key + '&isMobile=' + isMobile, '视讯游戏', params)
        } catch (err) {
          window.location.href = location.origin + '/thirdPartyJump?type=loginapi&key=' + key
        }
      } else {
        return false
      }
    },
    /**
     * 请求登录之后调用此方法,
     * 代码放在这里避免以后站点多,减少所有站点重新打包次数
     */
    afterRequestLoginGame: function (res, param) {
      console.info('res:', res)
      var reg = new RegExp('^http')
      var reg2 = new RegExp('^https')

      // 自动额度转换 排除OG
      if (param.key !== 'og') {
        this.autoTransferMoney(param.key)
      }
      // 目前OT项目只有4个视讯 OG,AG,BBIN,ALLBET
      if (param.key === 'bb' || param.key === 'ag' || param.key === 'og') {
        var fo = res.data.tourl
        fo = fo.substr(fo.indexOf('<form'))
        fo = fo.substring(0, fo.indexOf('</body>'))
        window.$('#thirdparty').append(fo)
        window.$('form').submit()
      } else {
        if (reg.test(res.data.tourl) || reg2.test(res.data.tourl)) {
          window.location.href = res.data.tourl
        } else {
          window.location.href = '//' + res.data.tourl
        }
      }
    },
    /**
     * 自动额度转换
     */
    autoTransferMoney: function (gameKey) {
      window.$.http('/member/moneyConversion/autoTransferMoney?t=' + new Date().getTime(), {key: gameKey}, {
        async: true,
        type: 'POST',
        hideLoading: true
      }).then(function (_res) {
        if (Number(_res.status) === window.common.statusConst.SUCCESS) {
          window.layer.msgWarn(_res.msg)
        }
      }).catch(function (err) {
        if (err.msg) window.layer.msgWarn(err.msg)
      })
    },
    /**
     * 用于动态添加不同平台的进度条代码
     */
    addProcessCode: function (key) {
      // key为空，默认为OG平台
      key = key || 'og'
      /**
       监控到了异常
       msg: 无效字符
       url: http://otsitm201.39otgame.com/resource/share/RESOURCE_VERSION/js/self/thirdPartyJump.js
       row: 140
       col: 9
       */
      var _HTML = '<div class="thirdPlatformlogo_"  style="text-align: center;"><img src="/resource/share/RESOURCE_VERSION/imgs/thirdPartyJump/logo-' + key + '.png" alt=""></div><div class="jazait" style="text-align: center;"><h3>加载中...</h3>' +
        '<img src="/resource/share/RESOURCE_VERSION/imgs/thirdPartyJump/' + key + '.gif"  alt=""></div>'
      window.$('body').css({'background': 'url(/resource/share/RESOURCE_VERSION/imgs/thirdPartyJump/' + key + '-bj.jpg) repeat'})
      window.$('body').append(_HTML)
    }
  }
}()))
