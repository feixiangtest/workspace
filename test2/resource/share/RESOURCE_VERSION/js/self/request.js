;(function () {
  /**
   * 封装pc $.ajax之后的方法，
   * 默认请求类型是‘POST’，默认异步，都可支持修改，建议所有请求都使用该方法
   * @param url {String} 必传，请求的url
   * @param params {Object} 选传，请求的参数
   * @param otherOptions {Object} 选传，默认请求的时候加载loading图，传参为false则不加载loading图
   * @returns Promise
   * @author payne 2018-08-28
   */
  window.$.http = function (url, params, otherOptions) {
    var startTime = Date.now()
    var loadingFlag = (!otherOptions || !otherOptions.hideLoading) && window.$Loading && window.$Loading.service // 是否应该加载loading效果
    var loadingInstance = loadingFlag ? window.$Loading.service({fullscreen: true}) : ''
    return new Promise(function (resolve, reject) {
      if (typeof url !== 'string' || !url) {
        reject({
          status: -1,
          msg: '参数url必须是非空字符串！'
        })
      }
      // 判断非空对象
      var options = {
        url: url,
        type: 'POST',
        contentType: 'application/json',
        async: true
      }
      // 继承传递的参数
      if (!window.$.isEmptyObject(otherOptions)) {
        window.$.extend(options, otherOptions)
      }
      // 参数
      if (options.type.toLowerCase() === 'post') {
        options.data = (params && JSON.stringify(params)) || {}
      } else {
        options.data = params || {}
      }
      // 不建议用户使用otherOptions.success,otherOptions.error，因为这里会做公共处理再返回
      window.$.ajax(options).then(function (res) {
        delete localStorage.setFirstPwd
        setTimeout(function () { // 设置loading效果最少也要500毫秒消失
          if (loadingInstance) loadingInstance.close()// 相应成功关闭加载图标
        }, (500 + startTime - Date.now()))
        if (res.status === '6') {
          // 如果没有维护就跳转到首页
          window.location.href = '/maintain.html'
        }
        if (res.status === '5' && location.href.indexOf('/home') === -1) { // 会员中心未登录而且当前不是首页则跳转到首页
          // 如果被踢出默认将修改密码弹框设置为关闭
          window.store.state.shareApi.showChangePwd = false
          var firstMain = localStorage.getItem('firstMain')
          window.localStorage.clear()
          localStorage.setItem('firstMain', firstMain)
          window.layer.msgWarn(res.msg, function () {
            location.href = '/home'
          })
          // 预留
          return ''
        }
        if (res.status === '10' && location.href.indexOf('/center/myAccount/safeSet') === -1) { // 第一次登录去修改密码
          if (location.href.indexOf('/center') > -1) {
            window.router.push('/center/myAccount/safeSet')
          }
          window.layer.msgWarn(res.msg, function () {
            // 设置第一次修改密码拦截标识
            localStorage.setItem('setFirstPwd', '1')
            // if (location.href.indexOf('/center') > -1) {
            //   window.router.push('/center/myAccount/safeSet')
            // } else {
            //   window.open('/center/myAccount/safeSet')
            // }
            window.store.state.shareApi.showChangePwd = true
          })
          // 预留
          return ''
        }
        if (res.status === '5') {
          // 如果被踢出默认将修改密码弹框设置为关闭
          window.store.state.shareApi.showChangePwd = false
          window.store.state.user.isLogin = false
          var firstMain = localStorage.getItem('firstMain')
          window.localStorage.clear()
          localStorage.setItem('firstMain', firstMain)
          window.layer.msgWarn(res.msg)
          return
        }
        if (res.status === '10') {
          localStorage.setItem('setFirstPwd', '1')
          return
        }
        resolve(res)
        /*        if (res.code == 1) {
         // Java 异常了
         var logRes = ''
         try {
         logRes = JSON.stringify(res)
         } catch (e) { }
         window.insertLogs({
         'ajaxUrl': url,
         'catch': logRes,
         'remak': 'window.$.http fail',
         'options': JSON.stringify(options)
         }, 'javaErr')
         } */
      }).fail(function (xhr) {
        if (!navigator.onLine) { // 网络无连接
          if (loadingInstance) loadingInstance.close()// 相应失败关闭加载图标
          var msg = '网络连接异常，请检查您的网络！'
          window.layer.msgWarn(msg)
          reject({
            status: 0,
            msg: msg
          })
          return false
        }
        window.insertLogs({
          'ajaxUrl': url,
          'catch': JSON.stringify(xhr),
          'remak': 'window.$.http fail',
          'options': JSON.stringify(options)
        }, 'api')
        if (location.href.indexOf('/thirdPartyJump') > 0) {
          if (loadingInstance) loadingInstance.close()// 相应失败关闭加载图标
        } else {
          setTimeout(function () {
            if (loadingInstance) loadingInstance.close()// 相应失败关闭加载图标
            window.layer.msgWarn('网络连接异常，请检查您的网络！')
          }, (500 + startTime - Date.now())) // 设置loading效果最少也要500毫秒消失
          reject({
            status: 0,
            msg: '服务请求错误！'
          })
        }
      })
    })
  }
  //  同步 方法 默认请求类型是‘POST’
  window.$.httpAsync = function (url, params) {
    var res = ''
    if (typeof url !== 'string' || !url) {
      res = {
        status: -1,
        msg: '参数url必须是非空字符串！'
      }
      return res
    }
    window.$.ajax({
      'type': 'post',
      'url': url,
      'dataType': 'json',
      'cache': false,
      'async': false,
      'contentType': 'application/json',
      'data': JSON.stringify(params),
      'success': function (_res) {
        res = _res
        if (res.code === 5 && location.href.indexOf('/home') === -1) { // 会员中心未登录而且当前不是首页则跳转到首页
          window.layer.msgWarn(res.msg, function () {
            location.href = '/home'
          })
        }
      }
    })
    return res
  }
}())
