// todo h5 ajax 需要修改
if (!window.common) window.common = {}
window.common.statusConst = {
  'SUCCESS': '0', // 数据返回成功
  'FAILURE': '1', // 返回失败
  'VERSION': '9', // 版本号一致
  'ISLOGIN': '5', // 未登录或者IP不一致
  'COMPLETEACCOUNT': '2' // 微信帐号完善资料状态，当返回这个值时必须完善资料后才可跳转其他
}
window.$.http = function (url, params, otherOptions) {
  var startTime = Date.now()
  var loadingFlag = (!otherOptions || !otherOptions.hideLoading) && window.$Loading && window.$Loading.service // 是否应该加载loading效果
  var loadingInstance = loadingFlag ? window.$Loading.service({fullscreen: true}) : ''
  if (!otherOptions || !otherOptions.hideLoading) window.store.state.shareApi.showLoading = true
  try {
    // 如果再params里面也设置了隐藏loading，那么也隐藏loading
    if (params.hideLoading) window.store.state.shareApi.showLoading = false
  } catch (error) {
    console.log(error, params, url, '22222222222')
  }

  // 开启版本号功能
  if (params.versionFun) {
    // 取 api 参数
    params.list = window.indexMain.versionFun(url)
  }
  return new Promise(function (resolve, reject) {
    if (typeof url !== 'string' || !url) {
      reject({
        status: -1,
        msg: '参数url必须是非空字符串！'
      })
    }
    // 判断非空对象
    var options = {
      versionFun: params.versionFun,
      url: url,
      type: 'POST',
      contentType: 'application/json',
      xhrFields: { withCredentials: true },
      async: true
    }
    delete params.versionFun
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
      if (loadingInstance) loadingInstance.close()// 相应成功关闭加载图标
      window.store.state.shareApi.showLoading = false
      if (res.status === '6') {
        // 如果没有维护就跳转到首页
        window.location.href = '/maintain.html'
      }
      if (res.status === '5' && location.href.indexOf('/login') === -1) { // 会员中心未登录而且当前不是首页则跳转到首页
        // let firstMain = localStorage.getItem('firstMain')
        // window.localStorage.clear()
        // localStorage.setItem('firstMain', firstMain)
        // location.href = '/wap/login'
        window.layer.msgWarn(res.msg, function () {
          location.href = '/wap/login'
        })
        // 预留
        return ''
      }
      if (res.status === '10' && location.href.indexOf('/wap/modifyPassWord') === -1) { // 第一次登录去修改密码
        window.store.state.h5Home.forceUpdatePwdMsg = res.msg || ''
        window.store.state.h5Home.forceUpdatePwd = true // 是否强制修改登录密码
        window.indexMain.forceUpdateAlert() // 提示强制修改密码
        // 预留
        return ''
      }
      if (res.status === '5') {
        window.store.state.user.isLogin = false
        // window.localStorage.clear()
        window.layer.msgWarn(res.msg)
        return
      }
      if (res.status === '10') {
        localStorage.setItem('setFirstPwd', '1')
        return
      }
      // 启用版本号控制脚本
      resolve(window.indexMain.commonVersion(res, options.url, options.versionFun))
    }).fail(function (xhr) {
      if (!navigator.onLine) { // 网络无连接
        if (loadingInstance) loadingInstance.close()// 相应失败关闭加载图标
        window.store.state.shareApi.showLoading = false
        let msg = '网络连接异常，请检查您的网络！'
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
        window.store.state.shareApi.showLoading = false
      } else {
        if (loadingInstance) loadingInstance.close()// 相应失败关闭加载图标
        window.store.state.shareApi.showLoading = false
        window.layer.msgWarn('网络连接异常，请检查您的网络！')
        reject({
          status: 0,
          msg: '网络连接异常，请检查您的网络！'
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
