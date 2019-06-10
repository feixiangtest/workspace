import method from '../utils/method'
export function checkLogin (item) {
  let reg = new RegExp('^CP|^TY|^HGTY') // 彩票和体育不需要登陆
  // let reg = new RegExp('^CP') // 沙巴体育 需要登陆
  if ((!window.store.state.home.isLogin && (!reg.test(item.modelType) && item.modelName !== '沙巴体育')) || (!window.store.state.home.isLogin && item.modelName === '沙巴体育')) {
    window.router.push('/wap/login')
    return false
  }
  window.$.globalEval(item.modelHtml)
}

window.LotteryAPIGO = function (id, urlGo) {
  if (urlGo) {
    window.router.push(urlGo)
  }
  let url = window._HOSTNAME + '/wap/thirdPartyJump?type=loginapi&key=cp&gameId=' + id + '&isMobile=1&domainList=' + window.store.state.site.fastUrl
  if (!id) {
    url = window._HOSTNAME + '/wap/thirdPartyJump?type=loginapi&key=cp&isMobile=1&domainList=' + window.store.state.site.fastUrl
  }
  let left = (document.body.clientWidth - 1000) / 2
  let params = 'height=680,width=970,top=0,left=' + left +
    ',toolbar=no,menubar=no,scrollbars=yes, resizable=yes,location=yes, status=yes'
  console.info(url)
  try { // IOS打包后 iPhone5c不能正常跳转第三方
    window.open(url, '传统彩', params).focus()
  } catch (error) {
    window.location.href = url
  }
}

window.defalutLottery = function () {
  window.LotteryAPIGO()
}

/**
 * 棋牌游戏的跳转
 */
window.toQpGame = function (key, gameId) {
  if (window.store.state.home.type === '1' && key !== 'fg' && key !== 'ky') { // 表示试玩
    window.layer.msgWarn('当前游戏不对试玩账号开放，请注册正式账号再登入!', function () {})
    return false
  }
  // 测试帐号增加新的判断
  if (window.store.state.home.type === '2') {
    window.layer.msgWarn('该游戏不对测试账号开放!', function () {})
    return false
  }
  var left = (document.body.clientWidth - 1000) / 2
  var params = 'height=680,width=970,top=0,left=' + left +
        ',toolbar=no,menubar=no,scrollbars=no, resizable=yes,location=yes, status=yes'
  try {
    window.open(window._HOSTNAME + '/wap/thirdPartyJump?type=playgame&key=' + key + '&isMobile=1&gameId=' + gameId, '棋牌游戏', params).focus()
  } catch (error) {
    window.location.href = window._HOSTNAME + '/wap/thirdPartyJump?type=playgame&key=ty&isMobile=1'
  }
  return false
}

/**
 *   id：游戏id
 *  url：跳转地址
 * type：游戏类型
 */
window.loadInfo = function (id, url, type) {
  let {browser} = method
  var left = (document.body.clientWidth - 1000) / 2
  var params = 'height=680,width=970,top=0,left=' + left +
    ',toolbar=no,menubar=no,scrollbars=no, resizable=yes,location=yes, status=yes'

  // 添加体育 和彩票跳转
  if (id >= 30 && id <= 36) {
    if (browser.versions.uc) {  // 新增需求 uc 在当前页面上跳转
      window.location.href = window._HOSTNAME + '/wap/thirdPartyJump?type=playgame&key=ty&isMobile=1&gameId=' + id
    } else {
      try {
        window.open(window._HOSTNAME + '/wap/thirdPartyJump?type=playgame&key=ty&isMobile=1&gameId=' + id, '皇冠体育', params).focus()
      } catch (error) {
        window.location.href = window._HOSTNAME + '/wap/thirdPartyJump?type=playgame&key=ty&isMobile=1&gameId=' + id
      }
    }
    return false
  }
  window.LotteryAPIGO(id, url)
}
// 具体跳转 第三方
window._href = function (val, platformName) {
  let {browser} = method
  var left = (document.body.clientWidth - 1000) / 2
  var params = 'height=680,width=970,top=0,left=' + left +
    ',toolbar=no,menubar=no,scrollbars=no, resizable=yes,location=yes, status=yes'
  if (val === 3) { // 根据旧项目表示跳转到MG电子列表
    window.router.push('/wap/eGame/mg')
  } else if (val === 4) { // 根据旧项目表示跳转到体育
    window.router.push('/wap/sports')
  } else if (val === 2) {
    window.layer.msgWarn('内测中，敬请期待!', function () {})
  } else {
    if (window.store.state.home.type === '1') { // 表示试玩
      if (val === 'og') { // OG 视讯试玩
        try {
          window.open('http://freeplay.og6666.com/freeplaywls/cn')
        } catch (error) {
          window.location.href = 'http://freeplay.og6666.com/freeplaywls/cn'
        }
        return
      } else if (val === 'bb' || val === 'ibc' || val === 'ds' || val === 'cmd' || val === 'bg_ele' || val === 'bg_fish' || val === 'bg') {
        window.layer.msgWarn('当前游戏不对试玩账号开放，请注册正式账号再登入!', function () {})
        return false
      }
    }
    // 测试帐号增加新的判断 过滤
    if (window.store.state.home.type === '2') {
      if (val === 'ag' || val === 'og' || val === 'bb' || val === 'ibc' || val === 'ds' || val === 'ag_fish' || val === 'cmd' || val === 'bg_ele' || val === 'bg_ele' || val === 'bg_fish' || val === 'bg') {
        window.layer.msgWarn('该游戏不对测试账号开放!', function () {})
        return false
      }
    }
    // 新增 bg 游戏
    if (val === 'bg_ele') {
      // bg dianzi youxi BG电子 gameId=2
      var bgUrl = window._HOSTNAME + '/wap/thirdPartyJump?type=loginapi&isMobile=1&key=bg&gameId=2'
      try {
        window.open(bgUrl, platformName, params).focus()
      } catch (error) {
        window.location.href = bgUrl
      }
      return ''
    }
    if (val === 'bg_fish') {
      // bg dianzi youxi BG捕鱼 gameId=1
      var bgFish = window._HOSTNAME + '/wap/thirdPartyJump?type=loginapi&isMobile=1&key=bg&gameId=1'
      try {
        window.open(bgFish, platformName, params).focus()
      } catch (error) {
        window.location.href = bgFish
      }
      return ''
    }
    if (val === 'bg') {
      // bg dianzi youxi BG 视讯 不传参数
      var bgLive = window._HOSTNAME + '/wap/thirdPartyJump?type=loginapi&isMobile=1&key=bg'
      try {
        window.open(bgLive, platformName, params).focus()
      } catch (error) {
        window.location.href = bgLive
      }
      return ''
    }
    // 新增 bg 游戏 结束
    // 是否创建真实账号，true娱乐试玩账号false正式账号,空由调用端决定
    if (val !== '' && val !== null) {
      if (val === '皇冠体育') {
        if (browser.versions.uc) {  // 新增需求 uc 在当前页面上跳转
          window.location.href = window._HOSTNAME + '/wap/thirdPartyJump?type=playgame&key=ty&isMobile=1'
        } else {
          try {
            window.open(window._HOSTNAME + '/wap/thirdPartyJump?type=playgame&key=ty&isMobile=1', '皇冠体育', params).focus()
          } catch (error) {
            window.location.href = window._HOSTNAME + '/wap/thirdPartyJump?type=playgame&key=ty&isMobile=1'
          }
        }
        return false
        // 本地调试 不加, params
      }
      if (val === 'ag_fish') { // AG捕鱼
        try {
          window.open(window._HOSTNAME + '/wap/thirdPartyJump?type=playgame&key=ag&isMobile=1', 'AG捕鱼', params).focus()
        } catch (error) {
          window.location.href = window._HOSTNAME + '/wap/thirdPartyJump?type=playgame&key=ag&isMobile=1'
        }
      } else {
        try {
          window.open(window._HOSTNAME + '/wap/thirdPartyJump?type=loginapi&isMobile=1&key=' + val, platformName, params).focus()
        } catch (error) {
          window.location.href = window._HOSTNAME + '/wap/thirdPartyJump?type=loginapi&isMobile=1&key=' + val
        }
      }
    } else {
      return false
    }
  }
}
