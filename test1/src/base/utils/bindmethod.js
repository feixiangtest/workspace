class VerifyInof {
  constructor (options = {}) {
    this.options = options
  }

  checkCommon (options, $this, dataKey) {
    let {_errArr, _key, _state} = options
    if (!$this) $this = this
    _init()
    if ($this.regInfo[_key] && !$this.regInfo[_key].ifRequired && !$this.userInfo[_key]) {
      return true
    }
    if (!$this[dataKey][_key]) { // 空判断集中这里 必填
      $this.errMsg[_key] = {
        status: true,
        txt: _errArr[0]
      }
      return false
    }
    let ___state = _state()
    console.info(!___state, '_state')
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
      '账号为6-12个字元的英文字母和数字的组合！',
      'test开头的是试玩会员，不允许作为正式账号！',
      '账号已经存在！',
      '校验通过'
    ], 'account', () => {
      try {
        $this[dataKey].account = $this[dataKey].account.replace(/[^0-9a-z]/ig, '')
      } catch (e) { }
      var _account = $this[dataKey].account // check emplty
      var reg = /^[A-Za-z]+$/
      if (reg.test(_account)) {
        $this.errMsg.account = {
          status: true,
          txt: _errArr[0]
        }
        return false
      }
      if (_account !== '' && _account.length >= 6 && _account.length <= 12 && /^[a-zA-Z][a-zA-Z0-9]+$/.test(_account)) {
        // 免费试玩 by chopper 只要账号以test开头的，就提示账号已经存在了
        var accountStr = _account.substring(0, 4).toLowerCase()
        if (accountStr === 'test') {
          $this.errMsg.account = {
            status: true,
            txt: _errArr[1]
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
            console.info('行内提示', _res)
            if (_res.status !== '1') {
              $this.errMsg.account = {
                status: true,
                txt: _res.msg
              }
              return false
            }
            if (_res.msg !== _errArr[3]) {
              $this.errMsg.account = {
                status: true,
                txt: _errArr[2]
              }
              return false
            }
            checkName = true
          }
        })
        return checkName
      } else {
        $this.errMsg.account = {
          status: true,
          txt: _errArr[0]
        }
        return false
      }
    }]
    return $this.checkCommon({_errArr, _key, _state}, $this, dataKey)
  }

  checkPw1 ($this, dataKey) {
    let [_errArr, _key, _state] = [[
      '所需密码不能为空',
      '密码不能与账号相同！',
      '密码必须是6-12位英文字母或数字与字母组合'], 'password', () => {
        if ($this[dataKey].password === '') {
          $this.$set($this.errMsg, 'password', {
            status: true,
            txt: _errArr[0]
          })
          return false
        }
        // if ($this[dataKey].password === $this[dataKey].account) {
        //   $this.$set($this.errMsg, 'password', {
        //     status: true,
        //     txt: _errArr[1]
        //   })
        //   return false
        // }
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

  checkPw2 ($this, dataKey = 'creat') { // check
    let [_errArr, _key, _state] = [[
      '确认密码格式不正确',
      '确认密码不正确！'], 'password1', () => {
        if ($this[dataKey].password1.length < 6 || $this[dataKey].password1.length > 10) {
          console.log('password1', 1)
          $this.$set($this.errMsg, 'password1', {
            status: true,
            txt: _errArr[0]
          })
          return false
        }
        if ($this[dataKey].password !== $this[dataKey].password1) {
          $this.$set($this.errMsg, 'password1', {
            status: true,
            txt: _errArr[1]
          })
          return false
        }
        return true
      }]
    return $this.checkCommon({_errArr, _key, _state}, $this, dataKey)
  }

  checkcode ($this, dataKey = 'creat') {
    let [_errArr, _key, _state] = [[
      '请输入验证码!'], 'code', () => {
        if ($this[dataKey].code.length === 0) {
          $this.$set($this.errMsg, 'code', {
            status: true,
            txt: _errArr[0]
          })
          return false
        }
        return true
      }]
    return $this.checkCommon({_errArr, _key, _state}, $this, dataKey)
  }
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
      return function a (target, $this) {
        window._each($this.Tabs, function (value, key) {
          $this.Tabs[key] = false
        })
        $this.Tabs[target] = true
      }
    })()
  },
  InitData () { },

  HttpRequest (options, async = false) {
    console.log(options.url)
    window.$.ajax({
      'type': 'post',
      'url': options.url + '?t=' + new Date().getTime(),
      'dataType': 'json',
      'cache': false,
      'async': async,
      'contentType': 'application/json',
      'data': JSON.stringify(options.actions),
      'success': function (_res) {
        options.success(_res)
      },
      'error': function (res) {
        if (!options.error) {
          console.warn(res)
        } else {
          options.error()
        }
      }
    })
  },
  VerifyInof (options) {
    return new VerifyInof(options)
  },
  msgWarn (html, cbFunc = function () { window.layer.close() }) {
    if (!html) return
    // window.layer.msgWarn('<div class="yo-tancen">' + html + '</div>', cbFunc)
    window.layer.msgWarn(html, cbFunc)
  }
}
