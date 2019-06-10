import $ from 'jquery'
window.$ = $
window.$.http = function (url, params, otherOptions) {
  return new Promise(function (resolve, reject) {
    if (!url) {
      reject(new Error('参数url必须是非空字符串！'))
    }
    // 判断非空对象
    var options = {
      url: url,
      type: 'POST',
      contentType: 'application/x-www-form-urlencoded; charset=utf-8',
      cache: false,
      timeout: 30000, // 超时时间：50秒
      async: true
    }
    window.store.state.home.isOffLine = false // 表示联网中
    // 继承传递的参数
    if (!window.$.isEmptyObject(otherOptions)) {
      window.$.extend(options, otherOptions)
    }
    // 参数
    options.data = params || {}

    var uuid = new Date().getTime()
    if (options.data.loading !== 'pass') {
      window.indexMain.showLoading(uuid)
    }
    // 请求超时设置
    var timeoutId = null
    // 超时提示放过的接口
    let timeoutPassArr = []
    if (!contains(url, timeoutPassArr)) {
      timeoutId = window.indexMain.setRequestTimeout(uuid) // 接口加入超时
    }
    // 不建议用户使用otherOptions.success,otherOptions.error，因为这里会做公共处理再返回
    window.$.ajax(options).then(function (res) {
      window.indexMain.clearRequestTimeout(timeoutId)
      window.indexMain.hideLoading(uuid)
      // 如果状态是999就跳转到维护页面
      if (res.code === 6) {
        window.location.href = '/wapMaintain.html'
        return ''
      }
      if (res.code === 5) {
        window.router.push('/m/login')
        return ''
      }
      if (res.code === 11) { // todo 没有权限代码
        window.router.push('/m/index')
      }
      resolve(res)
    }).fail(function (xhr) {
      console.log(xhr)
      window.indexMain.hideLoading()
    }).catch(function (error) {
      window.indexMain.clearRequestTimeout(timeoutId)
      console.info('err' + error)
      window.indexMain.hideLoading()
      // 离线判断
      if (!navigator.onLine) { // 网络无连接
        window.store.state.home.isOffLine = true
        sysAlert({
          msg: '网络连接中断，请检查您的网络！',
          resolve: resolve
        })
      } else {
        console.info('请求异常url：' + url)
        window.layer.msgWarn('操作失败，请重新重试！', () => {
          if (Number(error.status) === 404) {
            window.location.reload()
          }
        })
      }
      // throw new Error('失败了:' + error)
    })
  }).catch(function (error) {
    console.info(error, '----')
    window.indexMain.hideLoading()
  })
}

function contains (str, strArr) {
  if (!str || !strArr || !strArr.length) {
    return false
  }
  let isHave = false
  for (let s of strArr) {
    if (str.indexOf(s) >= 0) {
      isHave = true
      break
    }
  }
  return isHave
}

function sysAlert (param) {
  window.layer.msgWarn(param.msg, () => {
    window.indexMain.hideLoading()
  })
  delete param.resolve
}
