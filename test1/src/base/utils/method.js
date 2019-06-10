import bindmethod from './bindmethod'
import * as types from '../store/home/type'
import * as statusCode from './status_const'
class Verify {
  constructor (options = {}) {
    this.options = options
  }

  checkCommon (options, $this, dataKey) {
    let {_errArr, _key, _state} = options
    if (!$this) $this = this
    _init()
    if ($this.regInfo) {
      if (!$this.regInfo[_key].ifRequired && !$this.user1[_key]) { // !必填
        return true
      }
      if (!$this[dataKey][_key] && $this.regInfo[_key].ifRequired === 1 && $this.regInfo[_key].ifShow === 1) { // 空判断集中这里 必填
        $this.errMsg[_key] = {
          status: true,
          txt: _errArr[0]
        }
        return false
      }
    } else {
      if (!$this[dataKey][_key]) { // 空判断集中这里 必填
        $this.errMsg[_key] = {
          status: true,
          txt: _errArr[0]
        }
        return false
      }
    }
    let ___state = _state()
    if (!___state) return false

    function _init () {
      $this.$set($this.errMsg, _key, {
        status: false,
        txt: ''
      })
    }
    _init()
    return true
  }

  checkAccount ($this, dataKey) {
    let [_errArr, _key, _state] = [[
      '账号为6-12位英文与数字的组合或纯字母！',
      'test开头的是试玩会员，不允许作为正式账号！',
      '账号首位必须为英文字母！'
    ], 'account', () => {
      try {
        $this[dataKey].account = $this[dataKey].account.replace(/[^0-9a-z]/ig, '')
      } catch (e) {}
      var _account = $this[dataKey].account // check emplty
      // check number
      let accountStr = _account.substring(0, 4).toLowerCase()
      if (accountStr === 'test') {
        $this.$set($this.errMsg, 'account', {
          status: true,
          txt: _errArr[1]
        })
        return false
      }
      _account = _account.replace(/[^0-9a-zA-Z]/ig, '')
      if (!isNaN(_account.slice(0, 1))) {
        $this.errMsg.account = {
          status: true,
          txt: _errArr[2]
        }
        return false
      }
      if (_account.length < 6 || _account.length > 12) {
        $this.errMsg.account = {
          status: true,
          txt: _errArr[0]
        }
        return false
      }
      var checkName = false
      window.$.ajax({
        'type': 'post',
        'url': '/api/wap/wapLogin/checkAccount' + '?t=' + new Date().getTime(),
        'dataType': 'json',
        'cache': false,
        'async': false,
        'contentType': 'application/json',
        'data': JSON.stringify({
          account: _account
        }),
        'success': function (_res) {
          if (_res.status === '4') { // 登录后在点击注册等接口时直接刷新页面跳转首页
            window.location.href = '/wap/index'
          }
          if (_res.status === '0') {
            $this.errMsg.account = {
              status: true,
              txt: _res.msg
            }
            return
          }
          checkName = true
        }
      })
      return checkName
    }]
    return $this.checkCommon({_errArr, _key, _state}, $this, dataKey)
  }

  checkPw1 ($this, dataKey) {
    let [_errArr, _key, _state] = [[
      '密码必须是6-12位英文或数字与字母组合！',
      '密码不能与账号相同！',
      '密码必须是6-12位英文或数字与字母组合！',
      '确认密码错误！请重新输入！'], 'password', () => {
        if ($this[dataKey].password.length < 6) {
          $this.$set($this.errMsg, 'password', {
            status: true,
            txt: _errArr[0]
          })
          return false
        }
        if ($this[dataKey].password === $this[dataKey].account) {
          $this.$set($this.errMsg, 'password', {
            status: true,
            txt: _errArr[1]
          })
          return false
        }
        if (/^[0-9]{6,12}$/.test($this[dataKey].password) || !/^[A-Za-z0-9]{6,12}$/.test($this[dataKey].password)) {
          $this.$set($this.errMsg, 'password', {
            status: true,
            txt: _errArr[2]
          })
          return false
        }
        return true
      }]
    return $this.checkCommon({_errArr, _key, _state}, $this, dataKey)
  }

  checkPw2 ($this, dataKey) { // check
    let [_errArr, _key, _state] = [[
      '确认密码错误！请重新输入！'], 'password1', () => {
        if ($this[dataKey].password !== $this[dataKey].password1) {
          $this.$set($this.errMsg, 'password1', {
            status: true,
            txt: _errArr[0]
          })
          return false
        }
        return true
      }]
    return $this.checkCommon({_errArr, _key, _state}, $this, dataKey)
  }

  checkClientPw1 ($this, dataKey) {
    let [_errArr, _key, _state] = [[
      '密码必须是6-12位英文字母与数字的组合！'], 'password', () => {
        if (!/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,12}$/.test($this[dataKey].password)) {
          $this.$set($this.errMsg, 'password', {
            status: true,
            txt: _errArr[0]
          })
          return false
        }
        return true
      }]
    return $this.checkCommon({_errArr, _key, _state}, $this, dataKey)
  }

  ajaxVerify (options, $this) {
    let checkRes = false
    window.$.ajax({
      'type': 'post',
      'url': options.url + '?t=' + new Date().getTime(),
      'dataType': 'json',
      'cache': false,
      'async': false,
      'contentType': 'application/json',
      'data': JSON.stringify(options.actions),
      'success': function (_res) {
        if (_res.status === '4') { // 登录后在点击注册等接口时直接刷新页面跳转首页
          window.location.href = '/wap/index'
        }
        if (_res.status === '1') {
          checkRes = true
        } else {
          options.failed($this)
        }
      }
    })
    return checkRes
  }
}
function delay (fn, time = 0) {
  setTimeout(function () { fn() }, time)
}
// 函数名字、参数等不可改，也不可删除，method.js中goElectronGame方法里面有调用，通过eval使用item.modelHtml中调用
window.openElectronGame = function (key, gameId) {
  if (key === false) { // 调用一次openElectronGame，用于消除警告
    return false
  }
  if (!key) {
    window.layer.msgWarn('该游戏数据未配置正确，请联系客服！')
    return false
  }
  if (!gameId) {
    window.layer.msgWarn('该游戏数据未配置正确，请联系客服！')
    return false
  }
  key = key.toLowerCase()
  let pKey = key
  switch (key) {
    case 'yoplay':
      pKey = 'ag' // yoplay游戏，传的key是ag
      break
    case 'bbin':
      pKey = 'bb' // bbin游戏，传的key是bb
      break
  }
  // CQ9新年龙虎榜活动，单独处理(下线后删除) by payne 2019/1/15
  if (key === 'cq9' && gameId === 'activity') {
    window.open('https://web.cq9promo.com/newyear')
    return true
  }
  window.store.dispatch(types.LOGIN_GAME_ACTION, {'gameId': gameId, 'key': pKey}).then(res => {
    if (res.status === statusCode.statusConst.SUCCESS) {
      if (pKey === 'pt') {
        window.location.href = '/pt-play.html?userName=' + res.data.userName + '&password=' + res.data.password + '&gameid=' + gameId + '&domain=' + res.data.ptLoginDomain
      } else if (pKey === 'ag') {
        if (res.data.indexOf('<form') !== -1) {
          let st = res.data.indexOf('<form')
          let ed = res.data.indexOf('</form>')
          let bodys = res.data.substring(st, ed + 7)
          window.$('body').append(bodys)
          window.$('form').submit()
        } else {
          window.location.href = res.data
        }
      } else {
        window.location.href = res.data
      }
    }
  })
}
export default {
  Negate (data) {
    return !data
  },
  InitTabs ($this) {
    $this.$set($this, 'Tabs', {
      tab1: true,
      tab2: false
    })
    return (function () {
      return function a (target, $this, lodash) {
        lodash.each($this.Tabs, function (value, key) {
          $this.Tabs[key] = false
        })
        $this.Tabs[target] = true
      }
    })()
  },
  InitData () { },
  verify (options) {
    return new Verify(options)
  },
  msgWarn (html) {
    if (!html) return
    // window.layer.msgWarn('<div class="yo-tancen">' + html + '</div>', function () { window.layer.close() })
    window.layer.msgWarn(html, function () { window.layer.close() })
  },
  browser: {
    versions: (function () {
      var u = navigator.userAgent
      return {
        uc: u.indexOf('UCBrowser') > -1 || u.indexOf('UBrowser') > -1
      }
    }())
  },
  listenKeyboard: function ($this) {
    // 只执行一次该方法的判断
    if (window.isGpoLoadlistenKeyboard) {
      return
    }
    window.isGpoLoadlistenKeyboard = true
    var isKeyboardAvail = false // 是否resize监听到
    var focusinLastTime = 0 // 最后一次聚焦时间
    // resize监听 谷歌、火狐、360、QQ、UC等浏览器都触发resize，目前发现safari浏览器不触发
    window.$(window).resize(function () {
      isKeyboardAvail = true
      // 通过聚焦触发键盘弹起，再触发resize事件的，不做处理，因为聚焦事件那里已经做处理了
      if (new Date().getTime() - focusinLastTime <= 200) {
        return
      }
      window.indexMain.gpoCall(keyboardChangeAfter, 'resize', (isOpen) => {
        if (!isOpen && window.$('input:focus,textarea:focus').length > 0) {
          window.$('input, textarea').blur()
        }
        $this.iskeyBoardOpen = isOpen
        $this.listenKeyBoardType = 'resize'
      }, 200)
    })
    addListenFocus()
    // 监听当前页面焦点变化，通过焦点判断键盘状态
    function addListenFocus () {
      // 动态绑定失焦/聚焦事件
      window.$(document).off('focusout.gpo focusin.gpo').on('focusout.gpo focusin.gpo', 'input, textarea', (event) => {
        // 每次键盘弹起，都会通过聚焦来触发，因此每次聚焦事件都不走resize监听判断键盘状态。如果触发的是失焦事件，判断是否未通过resize监听键盘
        if (event.type === 'focusin' || !isKeyboardAvail) {
          if (event.type === 'focusin') {
            focusinLastTime = new Date().getTime()
          }
          window.indexMain.gpoCall(keyboardChangeAfter, event.type, (isOpen) => {
            $this.iskeyBoardOpen = isOpen
            $this.listenKeyBoardType = 'focus'
          }, 200)
        }
      })
    }
    // 键盘状态判断
    function keyboardChangeAfter (type) {
      var isOpen = false // 键盘是否打开
      if (type === 'resize') {
        let gcs = window.indexMain.getGpoCurrentScreen()
        let innerHeight = window.orientation === 0 ? gcs.innerHeight : gcs.innerWidth
        let newHeight = window.innerHeight // 键盘变化之后屏幕高度
        // 谷歌、火狐、360、QQ、UC等浏览器键盘展开/收缩都有高度差，目前发现safari浏览器无高度差
        if (Math.abs(innerHeight - newHeight) < 80) { // 通过前后高度差判断键盘是否展开/收缩  140是个估算值
          isOpen = false
        } else {
          isOpen = $this.iskeyBoardOpen
        }
      } else if (type === 'focusin') {
        isOpen = true
      } else if (type === 'focusout') {
        isOpen = false
      }
      return isOpen
    }
  },
  goLogin: function ($this) {
    if (!$this.isLogin) {
      $this.$router.push('/wap/login')
      return true
    }
    return false
  },
  // 普通游戏进入电子游戏时调用
  goElectronGame: function ($this, item) {
    if (!item.modelHtml || item.modelHtml.indexOf('openElectronGame') === -1) {
      return false
    }
    if (!$this.$store.state.home.isLogin) {
      $this.$router.push('/wap/login')
      return false
    }
    $this.$store.dispatch('rent.action', {'modelId': item.Id, 'accountId': item.accountId}) // 保存最近浏览
    window.openElectronGame(false) // 调用一次openElectronGame，用于消除警告
    window.$.globalEval(item.modelHtml) // 调用openElectronGame方法，总控游戏配置时，字段：前台接口html，必须配置类似格式为：openElectronGame('cq9','AB1')
  },
  parseThird: function ($this, item, pass) {
    window.indexMain.hideLoading()
    // 关闭加载效果
    // 跳转第三方检查 是否维护 默认放过
    let {HttpRequest} = bindmethod
    let {modelHtml, modelType, modelUrl} = item
    let options = {key: null}
    let _status = true
    if (pass) {
      options = item
      check()
      return _status
    } else {
      if (modelUrl) return true
      if (!modelType) return false
    }
    /**
     *  defalutLottery 跳 彩票
     *  loadInfo 需要根据参数来判断 体育 + 彩票
     */
    if (modelHtml.indexOf('loadInfo') > -1 || modelHtml.indexOf('defalutLottery') > -1) {
      var num = modelHtml.replace('loadInfo(', '')
      num = num.replace(')', '')
      options.key = 'cp'
      if (num >= 30 && num <= 36) {
        options.key = 'ty'
      }
    }
    if (modelHtml.indexOf('_href') > -1) { // live视讯 还有些电子是直接走的这个
      let letrun = 'get' + modelHtml
      window.$.globalEval(letrun)
      // 沙箱函数无法使用 evel, 使用全局变量
      options.key = window.indexMain._getResut[0]
      if (window.indexMain._getResut[0] === 'og' && Number(window.store.state.home.type) === 1) {
        return true
      }
      if (options.key === 'bg_ele' || options.key === 'bg_fish') options.key = 'bg'
    }
    if (!options.key) return true
    check()
    function check () {
      HttpRequest({
        url: '/api/wap/login3rd/getGameStatus',
        actions: options,
        success: function (res) {
          _status = false
          if (res.status * 1 === 1) {
            _status = true
          }
          if (res.status * 1 === 5) { // 状态是5 表示要登陆 （后端处理，除了彩票和体育，其他的第三方都有可能返回5）
            window.router.push('/wap/login')
          }
          if (res.status * 1 === 7 || res.status * 1 === 0) {
            window.layer.msgWarn(res.msg, function () {
              console.info('')
            })
          }
        },
        error: function () {
          _status = false
        }
      })
    }
    return _status
  },
  delay,
  max20Num: function (content, len) {
    let awardArray = content.split(',')
    let count = 0
    let awardStr = ''
    awardArray.forEach(item => {
      item += ','
      count += item.length
      if (count > len - 1) {
        awardStr += '<br>'
        count = 0
      }
      awardStr += item
    })
    awardStr = awardStr.substring(0, awardStr.length - 1) // 删除字符串最后一个逗号
    return awardStr
  },
  tooLongBreak: function (content, len) {
    let awardArray = content.split('')
    let count = 0
    let awardStr = ''
    awardArray.forEach(item => {
      if (count > len - 1) {
        awardStr += '<br>'
        count = 0
      }
      count += 1
      awardStr += item
    })
    return awardStr
  }
}
