/**
 *
 * @param [param={Action: '後端方法名稱', Requirement: 後端所需Json Data],[true:要顯示等待畫面，false：不顯示等待畫面]
 * @returns {msg: 'ajax錯誤如：網路數據解析錯誤',json: '後端傳回來的Json資料'}
 * Ajax 傳入參數:
 * body : 傳回後端的Json data
 * Ajax 傳回參數:json 封包
 */
function curtime () {
  return new Date().getTime()
}
export default function _fetch (param = {Action: '', Requirement: ''}) {
  // 离线判断
  if (!navigator.onLine) { // 网络无连接
    console.info('目前处于离线状态 API：' + param.Action)
    // window.layer.alert('网络不给力呀 o(╥﹏╥)o : ' + param.Action)
    return new Promise((resolve, reject) => {}).then((resolve, reject) => {
      resolve({
        Action: param.Action,
        status: 0
      })
    }).catch(function () {
      console.info('处于离线状态')
    })
  }
 // 使用Promise封装api
  return new Promise((resolve, reject) => {
    // 如果当前用户（包括未登录状态的session）过期，则禁止向后端发起请求
    if (window.store.state.home.isSessionExpired) {
      if (!window.$('.layermbox.layermshow')[0]) { // 是否目前没有显示弹窗
        window.layer.msgWarn('您的会话已超时，请您重新登录', () => {
          closeWindow()
        })
      }
      reject(new Error('session已过期，api:' + param.Action))
      return
    }
    let ajaxUrl = '/' + param.Action
    let startTime = curtime() // 统计耗费时间
    // common/betting 追加 时间戳
    var userID = 'guest'
    try {
      userID = window.store.state.home.userInfo.account
    } catch (e) {
    }
    if (param.Action && userID !== 'guest' && userID) {
      ajaxUrl = ajaxUrl + `?id=${userID}_` + curtime()
    }
    fetch(ajaxUrl, {
      credentials: 'same-origin',
      method: 'POST',
      cache: 'no-store',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(param.Requirement)
    }).then(function (data) {
      if (data.status >= 201) {
        window.insertLogs({
          redirected: data.redirected,
          status: data.status,
          statusText: data.statusText,
          type: data.type,
          url: data.url,
          param: JSON.stringify(param.Requirement),
          ReadableStream: data.body || '接口data异常'
        }, 'api')
      }
      let costTime = curtime() - startTime
      if (costTime > 3000) {
        window.insertLogs({
          startTime: startTime,
          endTime: curtime(),
          costTime: costTime,
          status: data.status,
          type: data.type,
          url: ajaxUrl
        }, 'apiCostTime')
      }
      data.json().then(apiData => {
        // 如果状态是999就跳转到维护页面
        if (apiData.status === '999') {
          window.location.href = '/maintain.html'
        } else if (apiData.status === '5') { // 重新登录跳转到空白页
          window.store.state.home.isSessionExpired = true
          window.layer.msgWarn(apiData.msg, () => {
            closeWindow()
          })
        } else {
          resolve(apiData)
          if (apiData.status === '0' && apiData.msg) {
            window.insertLogs({
              ajaxUrl: ajaxUrl,
              param: JSON.stringify(param.Requirement),
              msg: apiData.msg
            })
          }
        }
      }, xr => {
        if (data && data.status === 500) {
          window.layer.msgWarn('抱歉,请求异常,请稍后重试!!')
        }
        reject(data)
      })
    }, function (data) {
      let a = ''
      try {
        a = JSON.stringify(data)
      } catch (e) {
      }
      window.insertLogs({
        ajaxUrl: ajaxUrl,
        reject: a
      })
      reject(data)
    }).catch(function (error) {
      window.insertLogs({
        'ajaxUrl': ajaxUrl,
        'catch': error
      }, 'apiCatch')
      sysAlert({
        msg: '抱歉,请求异常,请稍后重试!',
        resolve: resolve
      })
    })
  })
}

function sysAlert (param) {
  window.layer.alert(param.msg)
  delete param.resolve
}
function closeWindow () {
  window.lotteryMain.closeLtWindow() // 关闭当前彩票窗口
  setTimeout(() => { // 如果关闭当前彩票窗口失败，则延时跳转到主系统会员端
    let memberUrl = window.store.state.home.memberUrl || localStorage.getItem('memberUrl')
    if (memberUrl.indexOf('http') >= 0) {
      window.location.href = memberUrl
    } else {
      window.location.href = 'http://' + memberUrl
    }
  }, 200)
}
