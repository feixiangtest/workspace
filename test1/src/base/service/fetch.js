/**
 *
 * @param [param={Action: '後端方法名稱', Requirement: 後端所需Json Data],[true:要顯示等待畫面，false：不顯示等待畫面]
 * @returns {msg: 'ajax錯誤如：網路數據解析錯誤',json: '後端傳回來的Json資料'}
 * Ajax 傳入參數:
 * body : 傳回後端的Json data
 * Ajax 傳回參數:json 封包
 */

export default function _fetch (param = {Action: '', Requirement: ''}) {
  // 使用Promise封装api
  return new Promise((resolve, reject) => {
    let ajaxUrl = '/' + param.Action
    // console.info(APIDebug, 'APIDebug')
    // if (window.__DEBUG) {
    //   console.info(param.Action, param, 'use debug API ==> base fetch')
    //   resolve(APIDebug[param.Action])
    //   return
    // }
    window.store.state.home.isOffLine = false // 表示联网中
    var uuid = new Date().getTime()
    console.info('fetch run')
    if (param.Requirement.loading !== 'pass') {
      window.indexMain.showLoading(uuid)
    } else {
      delete param.Requirement.loading // 删除，不能作为参数
    }
    // 请求超时设置
    var timeoutId = null
    // 超时提示放过的接口，额度转换 第三方转点 提款 刷新余额不走30秒超时逻辑
    let timeoutPassArr = [
      'queryIndexModel', 'moneyConversion', 'conversionToThird',
      'initDrawData', 'updateSessionMoney', 'getThirdMoney'
    ]
    if (!contains(param.Action, timeoutPassArr)) {
      timeoutId = window.indexMain.setRequestTimeout(uuid) // 接口加入超时
    }
    fetch(ajaxUrl, {
      credentials: 'same-origin',
      method: 'POST',
      cache: 'no-store',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(param.Requirement) || {}
    }).then(function (data) {
      if (data.status === 200) {
        try {
          data.json().then(apiData => {
            window.indexMain.clearRequestTimeout(timeoutId)
            window.indexMain.hideLoading(uuid)
            // 如果状态是999就跳转到维护页面
            if (apiData.status === '6') {
              window.location.href = '/maintain.html'
            } else if (apiData.status === '5') { // 跳转到登录页
              // 清空用户数据
              window.store.state.home.userInfo = {}
              window.store.state.home.isLogin = false
              // 清空MG活动默认数据
              window.store.state.home.tpsActivityAlias = ''
              window.store.state.home.hasActivityAlias = 'N'
              window.layer.msgWarn('网络超时或中断，请重新登录！！', function () {
                // 判断是否原生APP，并触发原生APP提供的方法
                if (window.myNative && window.myNative.popToLogin && window.myNative.popToLogin()) {
                  return // 如果触发成功，则阻止后续H5的代码执行
                }
                window.moduleRouter.push('/wap/login') // 统一使用跳转方式，兼容gpo系统与支付系统之间的跳转
              })
            } else if (apiData.status === '2') { // 跳转到微信完善资料
              window.layer.msgWarn('为了您的资金安全，请您完善资料信息！！', function () {
                window.moduleRouter.push('/wap/memberCenter/completeAccount') // 统一使用跳转方式，兼容gpo系统与支付系统之间的跳转
              })
            } else if (apiData.status === '4') { // 登录后在点击注册等接口时直接刷新页面跳转首页
              window.location.href = '/wap/index'
            } else {
              resolve(apiData)
            }
          })
        } catch (error) {
          window.indexMain.clearRequestTimeout(timeoutId)
          window.indexMain.hideLoading(uuid)
          resolve(null)
        }
      } else {
        window.indexMain.clearRequestTimeout(timeoutId)
        window.indexMain.hideLoading(uuid)
        reject(data)
      }
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
        console.info('请求异常url：' + ajaxUrl)
        if (ajaxUrl.indexOf('saveRecen') > -1) { // 放过
        } else {
          sysAlert({
            msg: '网络异常，请您稍后重试！',
            resolve: resolve
          })
        }
      }
      // throw new Error('失败了:' + error)
    })
  }).catch(function (err) {
    console.info(err, '----')
    window.indexMain.hideLoading()
  })
}
function sysAlert (param) {
  window.layer.msgWarn(param.msg, () => {
    window.indexMain.hideLoading()
  })
  delete param.resolve
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
