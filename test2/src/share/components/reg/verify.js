/**
 * 依赖关系：
 导入： 无
 导出： 有公用
 * 注意：h5 借用 pc 注册的验证js 如果 有修改 注意不要改挂了
 * webpack build: 影响 需 依赖build
 *
 * *注册校验方法
 *  不通过 验证 return false
 */
import dayjs from 'dayjs'
import { Alert } from 'muse-ui'

export default {
  methods: {
    /**
     * 验证fn 统一调用 checkCommon 来执行 统一管理状态
     * @param options
     * @param $this
     * @param dataKey
     * @returns {boolean}
     */
    checkCommon (options, $this, dataKey, pass = false) {
      let {_errArr, _key, _state} = options
      if (pass) return _state()
      if (!$this) $this = this
      // 非必填 空数据 放过
      if (!$this.regInfo[_key].ifRequired && !$this.user1[_key]) {
        $this.errMsg[_key] = {
          status: 'complete', // 验证 ok
          txt: ''
        }
        return true
      }
      // 必填情况
      if ($this.regInfo[_key].ifRequired) {
        if (!$this[dataKey][_key]) { // 集中 空判断
          $this.errMsg[_key] = {
            status: 'err',
            txt: _errArr[0]
          }
          // console.info('空判断')
          return false
        }
      }
      // 执行 各自的回调 函数
      let ___state = _state()
      if (!___state) return false
      return true
    },
    assertAccount () {
      try {
        this.user1.account = this.user1.account.replace(/[^0-9a-z]/ig, '')
      } catch (e) {
      }
      try {
        this.user1.account = this.user1.account.toLowerCase()
      } catch (e) {
      }
    },
    // 检验微信号
    checkWechat () {
      let dataKey = 'user1' // checkAccount 字段 key 是多少
      var $this = this
      window.$('.wechat1 >p.y-error-msg').removeClass('longtext')

      if (localStorage.place === '_h5') {
        let [_errArr, _key, _state] = [[
          '请输入6-20位的微信账号',
          '请输入6-20位的微信账号',
          '6-20位字母、数字、下划线和减号，且字母开头，支持字母大小写，不支持中文'
        ], 'wechat', () => {
          let result = true
          let wxreg = /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/
          if (!wxreg.test($this[dataKey].wechat)) {
            $this.errMsg.wechat = {
              status: 'err',
              txt: _errArr[2]
            }
            result = false
            // 文字过长 需要调整 jquery 来处理
            setTimeout(() => {
              window.$('.wechat1 >p.y-error-msg').addClass('longtext')
            }, 10)
            return result
          }
          if ($this.regInfo.wechat.ifValidate === 1) {
            // 存在唯一性 问题
            let _res = window.$.httpAsync('/member/account/checkWechat' + '?t=' + new Date().getTime(), {
              wechat: $this[dataKey].wechat
            })
            if (_res.code !== 0) { // 非正常情况
              $this.errMsg.wechat = {
                status: 'err',
                txt: _res.msg
              }
              return false
            }
          }

          $this.errMsg.wechat = {
            status: 'complete',
            txt: ''
          }
          return result
        }]
        return $this.checkCommon({_errArr, _key, _state}, $this, dataKey)
      } else {
        let [_errArr, _key, _state] = [[
          '请输入微信',
          '微信号规范输入6-20位数字、英文或数字加英文组合',
          '6-20位字母、数字、下划线和减号，且字母开头，支持字母大小写，不支持中文'
        ], 'wechat', () => {
          let result = true
          let wxreg = /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/
          if (!wxreg.test($this[dataKey].wechat)) {
            $this.errMsg.wechat = {
              status: 'err',
              txt: _errArr[2]
            }
            result = false
            // 文字过长 需要调整 jquery 来处理
            setTimeout(() => {
              window.$('.wechat1 >p.y-error-msg').addClass('longtext')
            }, 10)
            return result
          }
          if ($this.regInfo.wechat.ifValidate === 1) {
            // 存在唯一性 问题
            let _res = window.$.httpAsync('/member/account/checkWechat' + '?t=' + new Date().getTime(), {
              wechat: $this[dataKey].wechat
            })
            if (_res.code !== 0) { // 非正常情况
              $this.errMsg.wechat = {
                status: 'err',
                txt: _res.msg
              }
              return false
            }
          }

          $this.errMsg.wechat = {
            status: 'complete',
            txt: ''
          }
          return result
        }]
        return $this.checkCommon({_errArr, _key, _state}, $this, dataKey)
      }
    },
    // 账号检验
    checkAccount () {
      let dataKey = 'user1' // checkAccount 字段 key 是多少
      var $this = this
      if (localStorage.place === '_h5') {
        let [_errArr, _key, _state] = [[
          '请输入字母开头6-12位字母或数字组合',
          'test开头是试玩会员，不允许作为正式会员名！',
          '请输入字母开头6-12位字母或数字组合'
        ], 'account', () => {
          try {
            $this[dataKey].account = $this[dataKey].account.replace(/[^0-9a-z]/ig, '')
          } catch (e) {
          }
          var _account = $this[dataKey].account // check emplty
          // check number
          let accountStr = _account.substring(0, 4).toLowerCase()
          if (accountStr === 'test') {
            $this.$set($this.errMsg, 'account', {
              status: 'err',
              txt: _errArr[1]
            })
            return false
          }
          _account = _account.replace(/[^0-9a-zA-Z]/ig, '')
          if (!isNaN(_account.slice(0, 1))) {
            $this.errMsg.account = {
              status: 'err',
              txt: _errArr[2]
            }
            return false
          }
          if (_account.length < 6 || _account.length > 12) {
            $this.errMsg.account = {
              status: 'err',
              txt: _errArr[0]
            }
            return false
          }
          var checkName = false
          /**
           {
              "code": 0, 正常情况
              "status": null,
              "msg": null,
              "data": null,
              "list": null,
              "otherData": null,
              "count": null
            }
           */
          let _res = window.$.httpAsync('/member/account/checkAccount' + '?t=' + new Date().getTime(), {
            account: _account
          })
          if (_res.code !== 0) { // 非正常情况
            $this.errMsg.account = {
              status: 'err',
              txt: _res.msg
            }
            return false
          }
          checkName = true

          if (checkName) {
            $this.errMsg.account = {
              status: 'complete',
              txt: ''
            }
          }
          // pass
          return checkName
        }]
        return $this.checkCommon({_errArr, _key, _state}, $this, dataKey)
      } else {
        let [_errArr, _key, _state] = [[
          '账号为6-12位英文与数字的组合或纯字母',
          'test开头的是试玩会员，不允许作为正式账号',
          '请输入字母开头6-12位字母或数字组合'
        ], 'account', () => {
          try {
            $this[dataKey].account = $this[dataKey].account.replace(/[^0-9a-z]/ig, '')
          } catch (e) {
          }
          var _account = $this[dataKey].account // check emplty
          // check number
          let accountStr = _account.substring(0, 4).toLowerCase()
          if (accountStr === 'test') {
            $this.$set($this.errMsg, 'account', {
              status: 'err',
              txt: _errArr[1]
            })
            return false
          }
          _account = _account.replace(/[^0-9a-zA-Z]/ig, '')
          if (!isNaN(_account.slice(0, 1))) {
            $this.errMsg.account = {
              status: 'err',
              txt: _errArr[2]
            }
            return false
          }
          if (_account.length < 6 || _account.length > 12) {
            $this.errMsg.account = {
              status: 'err',
              txt: _errArr[0]
            }
            return false
          }
          var checkName = false
          /**
           {
              "code": 0, 正常情况
              "status": null,
              "msg": null,
              "data": null,
              "list": null,
              "otherData": null,
              "count": null
            }
           */
          let _res = window.$.httpAsync('/member/account/checkAccount' + '?t=' + new Date().getTime(), {
            account: _account
          })
          if (_res.code !== 0) { // 非正常情况
            $this.errMsg.account = {
              status: 'err',
              txt: _res.msg
            }
            return false
          }
          checkName = true

          if (checkName) {
            $this.errMsg.account = {
              status: 'complete',
              txt: ''
            }
          }
          // pass
          return checkName
        }]
        return $this.checkCommon({_errArr, _key, _state}, $this, dataKey)
      }
    },
    // 检查真实姓名，过滤空格
    checkName () {
      this.user1.realName = this.user1.realName.replace(/\s+/g, '')
    },
    // 检查真实姓名
    checkRealName () {
      let dataKey = 'user1' // checkAccount 字段 key 是多少
      var $this = this
      try {
        this.user1.realName = this.user1.realName.replace(/ +/g, '')
      } catch (e) {
      }
      let [_errArr, _key, _state] = [['请输入真实姓名', '请输入真实姓名'], 'realName', () => {
        if ($this.user1[_key] === '真实姓名') {
          $this.$set($this.errMsg, 'realName', {
            status: 'err',
            txt: _errArr[0]
          })
          return false
        }
        //  this.user1.realName.replace(/[\u4e00-\u9fa5]/g,'').length === 0 中文
        if ($this.user1[_key].length < 1 || $this.user1[_key].length > 20) {
          $this.$set($this.errMsg, 'realName', {
            status: 'err',
            txt: _errArr[1]
          })
          return false
        }
        var checkName = true
        if ($this.regInfo.realName.ifValidate === 1) {
          let _res = window.$.httpAsync('/member/account/checkRealName' + '?t=' + new Date().getTime(), {
            realName: $this.user1.realName
          })

          if (_res.code === 0) {
            checkName = true
          } else {
            checkName = false
            $this.errMsg.realName = {
              status: 'err',
              txt: _res.msg
            }
          }
        }
        // 通过检查 归零
        if (checkName) {
          $this.errMsg.realName = {
            status: 'complete',
            txt: ''
          }
        }
        return checkName
      }]
      return this.checkCommon({_errArr, _key, _state}, this, 'user1')
    },
    // 登录密码
    checkPw1 () {
      let dataKey = 'user1' // checkAccount 字段 key 是多少
      var $this = this

      if (localStorage.place === '_h5') {
        let [_errArr, _key, _state] = [[
          '请输入密码为6-12位的字母与数字的组合',
          '密码不能与账号相同',
          '请输入密码为6-12位的字母与数字的组合',
          '确认密码错误，请重新输入'], 'password', () => {
          if ($this[dataKey].password.length < 6) {
            $this.$set($this.errMsg, 'password', {
              status: 'err',
              txt: _errArr[0]
            })
            return false
          }
          if ($this[dataKey].password === $this[dataKey].account) {
            $this.$set($this.errMsg, 'password', {
              status: 'err',
              txt: _errArr[1]
            })
            return false
          }

          if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test($this[dataKey].password)) {
            $this.$set($this.errMsg, 'password', {
              status: 'err',
              txt: _errArr[2]
            })
            return false
          }

          $this.errMsg.password = {
            status: 'complete',
            txt: ''
          }
          return true
        }]
        return $this.checkCommon({_errArr, _key, _state}, $this, dataKey)
      } else {
        let [_errArr, _key, _state] = [[
          '密码必须是6-12位英文或数字与字母组合',
          '密码不能与账号相同',
          '密码必须是6-12位英文或数字与字母组合',
          '确认密码错误，请重新输入'], 'password', () => {
          if ($this[dataKey].password.length < 6) {
            $this.$set($this.errMsg, 'password', {
              status: 'err',
              txt: _errArr[0]
            })
            return false
          }
          if ($this[dataKey].password === $this[dataKey].account) {
            $this.$set($this.errMsg, 'password', {
              status: 'err',
              txt: _errArr[1]
            })
            return false
          }

          if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test($this[dataKey].password)) {
            $this.$set($this.errMsg, 'password', {
              status: 'err',
              txt: _errArr[2]
            })
            return false
          }

          $this.errMsg.password = {
            status: 'complete',
            txt: ''
          }
          return true
        }]
        return $this.checkCommon({_errArr, _key, _state}, $this, dataKey)
      }
    },
    // 确认登录密码
    checkPw2 () { // check
      let dataKey = 'user1' // check 字段 key 是多少
      var $this = this
      if (localStorage.place === '_h5') {
        let [_errArr, _key, _state] = [[
          '确认密码错误，请重新输入'], 'password1', () => {
          if ($this[dataKey].password !== $this[dataKey].password1) {
            $this.$set($this.errMsg, 'password1', {
              status: 'err',
              txt: _errArr[0]
            })
            return false
          }
          $this.errMsg.password1 = {
            status: 'complete',
            txt: ''
          }
          return true
        }]
        return $this.checkCommon({_errArr, _key, _state}, $this, dataKey)
      } else {
        let [_errArr, _key, _state] = [[
          '确认密码错误，请重新输入'], 'password1', () => {
          if ($this[dataKey].password !== $this[dataKey].password1) {
            $this.$set($this.errMsg, 'password1', {
              status: 'err',
              txt: _errArr[0]
            })
            return false
          }
          $this.errMsg.password1 = {
            status: 'complete',
            txt: ''
          }
          return true
        }]
        return $this.checkCommon({_errArr, _key, _state}, $this, dataKey)
      }
    },
    checkClientPw1 () {
      let dataKey = 'user1' // checkAccount 字段 key 是多少
      var $this = this
      let [_errArr, _key, _state] = [[
        '密码必须是6-12位英文字母与数字的组合'], 'password', () => {
        if (!/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,12}$/.test($this[dataKey].password)) {
          $this.$set($this.errMsg, 'password', {
            status: 'err',
            txt: _errArr[0]
          })
          return false
        }
        return true
      }]
      return $this.checkCommon({_errArr, _key, _state}, $this, dataKey)
    },
    // 检验英文名字
    checkEnglishName () {
      var $this = this
      let [_errArr, _key, _state] = [['请输入您的英文姓名', '请输入您的英文姓名'], 'englishname', () => {
        if (!/^[0-9A-Za-z\s]+$/.test($this.user1[_key])) {
          $this.errMsg[_key] = {
            status: 'err',
            txt: _errArr[1]
          }
          return false
        }
        $this.errMsg.englishname = {
          status: 'complete',
          txt: ''
        }
        return true
      }]
      return this.checkCommon({_errArr, _key, _state}, this, 'user1')
    },
    /**
     * 昵称验证
     */
    filterNotCNname () {
      this.nickNameCheck = this.user1.nickname
      try {
        this.user1.nickname = this.nickNameCheck.replace(/[^\w \u4e00-\u9fa5]/ig, '')
        this.user1.nickname = this.nickNameCheck.replace(/^ /ig, '')
      } catch (e) {
      }
    },
    /**
     * 英文呢称验证
     */
    filterNotEngCNname () {
      this.englishname = this.user1.englishname
      try {
        this.user1.englishname = this.englishname.replace(/[^0-9a-zA-Z]/ig, '')
      } catch (e) {
      }
    },
    /**
     * 国家验证
     */
    filterNotContryCNname () {
      this.country = this.user1.country
      this.user1.country = this.country.replace(/[^\w \u4e00-\u9fa5]/ig, '').replace(/^ /ig, '')
    },
    /**
     * 清空密码输入错误的参数
     */
    pwdOnKeyUp (type) {
      if (type === 0) {
        this.user1.password = this.user1.password.replace(/[^0-9a-zA-Z]/ig, '')
      } else {
        this.user1.password1 = this.user1.password1.replace(/[^0-9a-zA-Z]/ig, '')
      }
    },
    //
    assertdrawMoneyPwd () {
      this.user1.drawMoneyPwd = this.user1.drawMoneyPwd.replace(/[^0-9]/ig, '')
    },
    assertQq () {
      this.user1.qq = this.user1.qq.replace(/[^0-9]/ig, '')
    },
    // 检验qq号码
    checkQq () {
      var $this = this
      let [_errArr, _key, _state] = [['QQ号为5-12位纯数字', 'QQ号为5-12位纯数字'], 'qq', () => {
        if (!/^[1-9][0-9]{4,}$/.test(this.user1[_key])) {
          $this.errMsg[_key] = {
            status: 'err',
            txt: _errArr[1]
          }
          return false
        }
        $this.errMsg[_key] = {
          status: 'complete',
          txt: ''
        }
        return true
      }]
      return this.checkCommon({_errArr, _key, _state}, this, 'user1')
    },
    // 检验昵称
    checkNickname () {
      let dataKey = 'user1' // checkAccount 字段 key 是多少
      var $this = this
      let [_errArr, _key, _state] = [[
        '请输入您的昵称',
        '请输入您的昵称'
      ], 'nickname', () => {
        if ($this.user1[_key] === '昵称') {
          $this.errMsg[_key] = {
            status: 'err',
            txt: _errArr[0]
          }
          return false
        }
        if (!/^[\sa-zA-Z0-9\u4e00-\u9fa5]+$/.test($this.user1[_key])) {
          $this.errMsg.nickname = {
            status: 'err',
            txt: _errArr[1]
          }
          return false
        }
        $this.errMsg.nickname = {
          status: 'complete',
          txt: ''
        }
        return true
      }]
      return this.checkCommon({_errArr, _key, _state}, this, 'user1')
    },
    // 检查取款密码
    drawMoney () {
      if (localStorage.place === '_h5') {
        if (!this.user1.drawMoneyPwd) {
          this.$set(this.errMsg, 'drawMoneyPwd', {
            status: 'err',
            txt: '请输入4位纯数字的取款密码'
          })
          return false
        }
        if (this.user1.drawMoneyPwd.length < 4) {
          this.$set(this.errMsg, 'drawMoneyPwd', {
            status: 'err',
            txt: '请输入4位取款密码'
          })
          return false
        }
        this.errMsg.drawMoneyPwd = {
          status: 'complete',
          txt: '取款时要用到的密码，非常重要，请务必牢记'
        }
        return true
      }
      // pc 逻辑
      if (!this.user1.drawMoneyPwd) {
        this.$set(this.errMsg, 'drawMoneyPwd', {
          status: 'err',
          txt: '请输入4位取款密码'
        })
        return false
      }
      if (this.user1.drawMoneyPwd.length < 4) {
        this.$set(this.errMsg, 'drawMoneyPwd', {
          status: 'err',
          txt: '请输入4位取款密码'
        })
        return false
      }
      this.errMsg.drawMoneyPwd = {
        status: 'complete',
        txt: '取款时要用到的密码，非常重要，请务必牢记'
      }
      return true
    },
    // 生日验证
    checkBirthday () {
      var $this = this
      if (localStorage.place === '_h5') {
        let [_errArr, _key, _state] = [['请选择您的生日', '生日格式输入错误'], 'birthday', () => {
          let a = dayjs($this.user1.birthday).format('YYYY/MM/DD')
          $this.user1.birthday = a
          if (a) {
          } else {
            $this.errMsg[_key] = {
              status: 'err',
              txt: _errArr[1]
            }
            return false
          }
          $this.errMsg.birthday = {
            status: 'complete',
            txt: ''
          }
          return true
        }]
        return this.checkCommon({_errArr, _key, _state}, this, 'user1')
      } else {
        let [_errArr, _key, _state] = [['请输入生日', '生日格式输入错误'], 'birthday', () => {
          let a = dayjs($this.user1.birthday).format('YYYY/MM/DD')
          $this.user1.birthday = a
          if (a) {
          } else {
            $this.errMsg[_key] = {
              status: 'err',
              txt: _errArr[1]
            }
            return false
          }
          $this.errMsg.birthday = {
            status: 'complete',
            txt: ''
          }
          return true
        }]
        return this.checkCommon({_errArr, _key, _state}, this, 'user1')
      }
    },
    checkPw (way) {
      // 密码 确认密码
      if (way === 1) {
        // 登录密码
        return this.checkPw1(this, 'user1')
      }
      if (way === 2) {
        // 确认登录密码
        return this.checkPw2(this, 'user1')
      }
    },
    showpassword (showpassword, value) {
      let $this = this
      // $this[showpassword] = !$this[showpassword]
      this.$set($this, showpassword, !$this[showpassword])
      console.info($this[showpassword], showpassword)
    },
    // 输入时校验
    checkNoType () {
      // 检查身份证号码
      if (this.user1.idPassportNoType * 1 === 0) {
        if (this.user1.idPassportNo.length <= 17) {
          this.user1.idPassportNo = this.user1.idPassportNo.replace(/[^0-9]/ig, '')
        } else {
          let lastLetter = String(this.user1.idPassportNo).slice(17)
          if (lastLetter !== 'X' && lastLetter !== 'x' && lastLetter !== '0' && lastLetter !== '1' && lastLetter !== '2' && lastLetter !== '3' && lastLetter !== '4' && lastLetter !== '5' && lastLetter !== '6' && lastLetter !== '7' && lastLetter !== '8' && lastLetter !== '9') {
            this.user1.idPassportNo = String(this.user1.idPassportNo).slice(0, 17)
          }
        }
      }
      // 检查护照号码
      if (this.user1.idPassportNoType * 1 === 1) {
        let firstLetter = String(this.user1.idPassportNo).slice(0, 1)
        let regLetter = /^[a-zA-Z]/
        if (!regLetter.test(firstLetter)) {
          this.user1.idPassportNo = ''
        }
      }
      this.user1.idPassportNo = this.user1.idPassportNo.replace(/\s+/g, '')
    },
    // 失去焦点后校验  检验身份证或护照
    checkIdPassportNo () {
      let $this = this
      let [_errArr, _key, _state] = [['请输入身份证或护照号', '身份证输入格式不正确', '护照输入格式不正确'], 'idPassportNo', () => {
        if ($this.user1.idPassportNoType * 1 === 0) {
          // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
          var reg = /(^\d{14,17}[Xx0-9]$)/
          if (!reg.test($this.user1[_key])) {
            $this.errMsg[_key] = {
              status: 'err',
              txt: _errArr[1]
            }
            return false
          }
        }
        if ($this.user1.idPassportNoType == '1') {
          // 护照 value = 1
          var re2 = /^[a-zA-Z0-9]{6,9}$/
          if (re2.test($this.user1[_key])) {
          } else {
            $this.errMsg[_key] = {
              status: 'err',
              txt: _errArr[2]
            }
            return false
          }
        }
        if ($this.regInfo[_key].ifShow === 1 && $this.regInfo[_key].ifValidate === 1) {
          let checkStatus = false
          window.$.ajax({
            'type': 'post',
            'url': '/member/account/checkIdCard' + '?t=' + new Date().getTime(),
            'dataType': 'json',
            'cache': false,
            'async': false,
            'contentType': 'application/json',
            'data': JSON.stringify({
              'idType': $this.user1.idPassportNoType,
              'cardId': $this.user1.idPassportNo,
              'idNumber': $this.user1.idPassportNo
            }),
            'success': function (_res) {
              if (_res.code !== 0) { // 非正常情况
                $this.errMsg.idPassportNo = {
                  status: 'err',
                  txt: _res.msg
                }
                return false
              }
              checkStatus = true
            }
          })
          if (checkStatus) {
            $this.errMsg.idPassportNo = {
              status: 'complete',
              txt: ''
            }
          }
          return checkStatus
        }
        // 默认情况 放过
        $this.errMsg.idPassportNo = {
          status: 'complete',
          txt: ''
        }
        return true
      }]
      return this.checkCommon({_errArr, _key, _state}, this, 'user1')
    },
    // 检验手机号
    checkPhone () {
      let $this = this

      if (localStorage.place === '_h5') {
        let [_errArr, _key, _state] = [['手机号为11位纯数字', '手机号为11位纯数字'], 'phone', () => {
          if (!/1[0-9]{10}/.test(this.user1[_key])) {
            $this.errMsg[_key] = {
              status: 'err',
              txt: _errArr[1]
            }
            return false
          }
          var checkRes = false
          if (this.regInfo[_key].ifValidate === 1) {
            window.$.ajax({
              'type': 'post',
              'url': '/member/account/checkPhone' + '?t=' + new Date().getTime(),
              'dataType': 'json',
              'cache': false,
              'async': false,
              'contentType': 'application/json',
              'data': JSON.stringify({
                phone: $this.user1[_key]
              }),
              'success': function (_res) {
                if (_res.code === 0) {
                  checkRes = true
                  $this.errMsg.phone = {
                    status: 'complete',
                    txt: ''
                  }
                } else {
                  $this.errMsg.phone = {
                    status: 'err',
                    txt: _res.msg
                  }
                }
              }
            })
            return checkRes
          }
          $this.errMsg.phone = {
            status: 'complete',
            txt: ''
          }
          return true
        }]
        return this.checkCommon({_errArr, _key, _state}, this, 'user1')
      } else {
        let [_errArr, _key, _state] = [['请输入手机号', '手机号格式输入错误'], 'phone', () => {
          if (!/1[0-9]{10}/.test(this.user1[_key])) {
            $this.errMsg[_key] = {
              status: 'err',
              txt: _errArr[1]
            }
            return false
          }
          var checkRes = false
          if (this.regInfo[_key].ifValidate === 1) {
            window.$.ajax({
              'type': 'post',
              'url': '/member/account/checkPhone' + '?t=' + new Date().getTime(),
              'dataType': 'json',
              'cache': false,
              'async': false,
              'contentType': 'application/json',
              'data': JSON.stringify({
                phone: $this.user1[_key]
              }),
              'success': function (_res) {
                if (_res.code === 0) {
                  checkRes = true
                  $this.errMsg.phone = {
                    status: 'complete',
                    txt: ''
                  }
                } else {
                  $this.errMsg.phone = {
                    status: 'err',
                    txt: _res.msg
                  }
                }
              }
            })
            return checkRes
          }
          $this.errMsg.phone = {
            status: 'complete',
            txt: ''
          }
          return true
        }]
        return this.checkCommon({_errArr, _key, _state}, this, 'user1')
      }
    },
    // 去除邮箱空格
    checkMail () {
      this.user1.email = this.user1.email.replace(/\s+/g, '')
    },
    // 检验有邮箱
    checkEmail () {
      let $this = this
      if (localStorage.place === '_h5') {
        let [_errArr, _key, _state] = [['邮箱格式不正确，格式为xxxx@xx.com', '邮箱格式不正确，格式为xxxx@xx.com'], 'email', () => {
          if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.user1[_key])) {
            $this.errMsg[_key] = {
              status: 'err',
              txt: _errArr[1]
            }
            return false
          }
          let checkName = true
          if ($this.regInfo[_key].ifValidate === 1) {
            let _res = window.$.httpAsync('/member/account/checkEmail', {
              email: $this.user1[_key]
            })
            if (_res.code !== 0) { // 非正常情况
              $this.errMsg.email = {
                status: 'err',
                txt: _res.msg
              }
              return false
            }
          }
          if (checkName) {
            $this.errMsg.email = {
              status: 'complete',
              txt: ''
            }
          }
          return true
        }]
        return this.checkCommon({_errArr, _key, _state}, this, 'user1')
      } else {
        let [_errArr, _key, _state] = [['请输入邮箱地址', '您输入的邮箱格式不正确'], 'email', () => {
          if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.user1[_key])) {
            $this.errMsg[_key] = {
              status: 'err',
              txt: _errArr[1]
            }
            return false
          }
          let checkName = true
          if ($this.regInfo[_key].ifValidate === 1) {
            let _res = window.$.httpAsync('/member/account/checkEmail', {
              email: $this.user1[_key]
            })
            if (_res.code !== 0) { // 非正常情况
              $this.errMsg.email = {
                status: 'err',
                txt: _res.msg
              }
              return false
            }
          }
          if (checkName) {
            $this.errMsg.email = {
              status: 'complete',
              txt: ''
            }
          }
          return true
        }]
        return this.checkCommon({_errArr, _key, _state}, this, 'user1')
      }
    },
    // 检验国家
    checkCountry () {
      let $this = this
      if (localStorage.place === '_h5') {
        let [_errArr, _key, _state] = [['请输入您的国家', '国家格式输入错误'], 'country', () => {
          if ($this.user1[_key] === '国家') {
            $this.errMsg[_key] = {
              status: 'err',
              txt: _errArr[0]
            }
            return false
          }
          if (!/^[\u4e00-\u9fa5]+$/.test(this.user1[_key])) {
            $this.errMsg[_key] = {
              status: 'err',
              txt: _errArr[1]
            }
            return false
          }
          $this.errMsg.country = {
            status: 'complete',
            txt: ''
          }
          return true
        }]
        return this.checkCommon({_errArr, _key, _state}, this, 'user1')
      } else {
        let [_errArr, _key, _state] = [['请输入国家', '国家格式输入错误'], 'country', () => {
          if ($this.user1[_key] === '国家') {
            $this.errMsg[_key] = {
              status: 'err',
              txt: _errArr[0]
            }
            return false
          }
          if (!/^[\u4e00-\u9fa5]+$/.test(this.user1[_key])) {
            $this.errMsg[_key] = {
              status: 'err',
              txt: _errArr[1]
            }
            return false
          }
          $this.errMsg.country = {
            status: 'complete',
            txt: ''
          }
          return true
        }]
        return this.checkCommon({_errArr, _key, _state}, this, 'user1')
      }
    },
    regChars () {
      // 介绍 特殊字符 屏蔽
      try {
        this.user1.parentName = this.user1.parentName.trim()
      } catch (e) {
      }

      try {
        this.user1.parentName = this.user1.parentName.replace(/[`~!@#$^&*()=|{}':;',\[\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]/g, '')
      } catch (e) {
      }

      try {
        this.user1.parentName = this.user1.parentName.replace(/[\u4e00-\u9fa5]/g, '')
      } catch (e) {
      }
    },
    // 检验邀请码
    checkParentName () {
      let $this = this
      // 使用推广码链接注册的用户
      try {
        this.user1.parentName = this.user1.parentName.trim()
      } catch (e) {
      }
      let [_errArr, _key, _state] = [['请输入介绍人', '介绍人输入错误'], 'parentName', () => {
        if ($this.Intr) { // 默认有值 跳过
          if ($this.user1[_key].length > 6) {
            $this.$set($this.errMsg, _key, {
              status: 'err',
              txt: _errArr[1]
            })
            return false
          }
        } else {
          if ($this.user1[_key].length > 6) {
            $this.$set($this.errMsg, _key, {
              status: 'err',
              txt: _errArr[1]
            })
            return false
          }
        }
        var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
        if (pattern.test($this.user1[_key])) {
          $this.$set($this.errMsg, _key, {
            status: 'err',
            txt: _errArr[1]
          })
          return false
        }
        var checkName = true
        if ($this.regInfo[_key].ifValidate === 1) {
          window.$.ajax({
            'type': 'post',
            'url': '/member/account/checkParentName' + '?t=' + new Date().getTime(),
            'dataType': 'json',
            'cache': false,
            'async': false,
            'contentType': 'application/json',
            'data': JSON.stringify({
              parentName: $this.user1[_key]
            }),
            'success': function (_res) {
              if (_res.code == 0) {
                checkName = true
              } else {
                checkName = false
                $this.$set($this.errMsg, _key, {
                  status: 'err',
                  txt: _res.msg
                })
              }
            }
          })
        }
        if (checkName) {
          // 如果需要校验 verify ajax todo
          $this.$set($this.errMsg, _key, {
            status: 'complete',
            txt: ''
          })
        }
        return checkName
      }]
      return this.checkCommon({_errArr, _key, _state}, this, 'user1')
    },
    // 检验注册验证码
    checkZhuceYm () {
      // ifValidate: 1 复杂验证码
      let $this = this
      if (this.regInfo.zhuceYm.ifValidate === 1) {
        if ($this.user1.zhuceYm === '') {
          $this.errMsg.zhuceYm = {
            status: 'err',
            txt: '请输入验证码'
          }
          return false
        }
        $this.errMsg.zhuceYm = {
          status: 'complete',
          txt: ''
        }
        return true
      }
      let [_errArr, _key, _state] = [['请输入4位验证码'], 'zhuceYm', () => {
        if (!$this.user1[_key] || $this.user1[_key].length !== 4) {
          $this.errMsg[_key] = {
            status: 'err',
            txt: _errArr[0]
          }
          return false
        }
        $this.errMsg[_key] = {
          status: 'complete',
          txt: ''
        }
        return true
      }]
      return this.checkCommon({_errArr, _key, _state}, this, 'user1', 'pass') // 跳过 空验证
    },
    saveAccount (regType) {
      if (window._frequency && new Date().getTime() - window._frequency < 1000) {
        return false
      }
      window._frequency = new Date().getTime()
      let $this = this
      let _actions = {
        accountAllVo: {
          drawMoneyPwd1: this.user1.drawMoneyPwd[0],
          drawMoneyPwd2: this.user1.drawMoneyPwd[1],
          drawMoneyPwd3: this.user1.drawMoneyPwd[2],
          drawMoneyPwd4: this.user1.drawMoneyPwd[3],
          moneyType: '1',
          currencyId: '1'
        },
        zhuceYm: this.user1.zhuceYm,
        type: 0
      }

      window._.each(this.regInfo, function (value, key) {
        if (value.ifShow && key !== 'drawMoneyPwd' && $this.user1[key]) {
          _actions.accountAllVo[key] = $this.user1[key]
        }
      })
      _actions.accountAllVo.qurenPassword = _actions.accountAllVo.password1
      if (_actions.accountAllVo.englishname) {
        _actions.accountAllVo.englishName = _actions.accountAllVo.englishname
        delete _actions.accountAllVo.englishname
      }
      /**
       "cardId":1233445, //身份证
       "idNumber":35235235 护照
       "idType" 0 1
       */
      if (_actions.accountAllVo.idPassportNo) { // 证明需要好
        _actions.accountAllVo.idType = $this.user1.idPassportNoType
        if (_actions.accountAllVo.idType * 1 === 1) {
          _actions.accountAllVo.idNumber = _actions.accountAllVo.idPassportNo
        } else {
          _actions.accountAllVo.cardId = _actions.accountAllVo.idPassportNo
        }
        delete _actions.accountAllVo.idPassportNo
      }
      delete _actions.accountAllVo.password1
      // console.info(_actions, '_actions')
      // 如果有预设 推广吗 就不提交
      /*      if (this.Intr) { OT-2770 屏蔽
       delete _actions.accountAllVo.parentName
       } */
      let passOptions = JSON.stringify(_actions)
      if (!passOptions.length) {
        window.layer.msgWarn('网络异常，请重新注册', function () {
          window.location.reload()
        })
        return ''
      }
      window.$.ajax({
        type: 'post',
        contentType: 'application/json',
        url: '/member/account/saveAccount',
        data: passOptions,
        dataType: 'json',
        success: function (res) {
          if (res && res.code === 10) {
            // 提交数据丢失 使用强刷模式 重新注册
            window.layer.msgWarn(res.msg, function () {
              window.location.reload()
            })
            return ''
          }
          if (res && res.code === 0) {
            if (regType === 'h5Reg') {
              // h5 注册完毕
              callBackH5($this.h5Reg)
              return ''
            }
            // todo 需要做区分 是否直接登录 或者是 需要激活
            window.layer.msgWarn(res.msg, function () {
              // pc 注册完毕
              window.router.push('/home')
              // 会调用登录后的弹窗 不要移动出去
              callBack()
            })
          } else {
            if (res.msg) {
              window.layer.msgWarn(res.msg, function () {
                if (res.msg.indexOf('开放') > -1 || res.msg.indexOf('冻结') > -1) {
                  if (regType === 'h5Reg') {
                    window.router.push('/wap/index')
                  } else {
                    window.store.dispatch('initData.action').then(_res => {})
                    window.router.push('/home')
                  }
                }
              })
            }
          }
          function callBack (cb) {
            window.store.dispatch('initData.action').then(_res => {
              if (_res.data.account && _res.data.account.account) {
                window.store.dispatch('user.updateSessionMoney', {api: 0})// 调用刷新余额接口
              }
              if (res.otherData.popupMessage) {
                window.store.state.user.popUpMessageList = res.otherData.popupMessage // 赋值为列表
                window.store.state.user.popUpMessage = res.otherData.popupMessage[0]
                window.store.state.user.showPopUpMessage = true
                localStorage.showPopUpMessage = true
              }
              if (cb) cb()
            })
          }
          function callBackH5 (cb) {
            window.store.dispatch('initH5Data.action', {versionFun: true}).then(_res => {
              if (res.otherData.popupMessage) {
                window.store.state.user.popUpMessageList = res.otherData.popupMessage // 赋值为列表
                window.store.state.user.popUpMessage = res.otherData.popupMessage[0]
                window.store.state.user.showPopUpMessage = true
                localStorage.showPopUpMessage = true
              }
              // 注册成功后清空已填写的内容
              setTimeout(() => {
                if ($this.user1) {
                  for (let i in $this.user1) {
                    $this.user1[i] = ''
                  }
                }
              }, 10)
              if (cb) cb()
            })
          }
        },
        error: function (err) {
          console.log(JSON.stringify(err))
          window.layer.msgWarn('请求异常，请稍后重试')
          //   window.indexMain.hideLoading()
        }
      })
    },
    gosub () {
      let $this = this
      let pass = false // 跳过
      var checkStep = { // 需要验证 判断
        2: { /// / 必然需要 验证 判断
          // 账号检验
          account: function ($this) {
            return $this.checkAccount()
          },
          // 登录密码
          password: function ($this) {
            return $this.checkPw(1, $this)
          },
          // 确认登录密码
          password1: function ($this) {
            return $this.checkPw(2, $this)
          },
          // --------------------------
          // 真实姓名
          'realName': function ($this) {
            return $this.checkRealName()
          },
          // 取款密码
          'drawMoneyPwd': function ($this) {
            return $this.drawMoney()
          },
          // 手机号
          'phone': function ($this) {
            return $this.checkPhone()
          },
          // 邮箱
          'email': function ($this) {
            return $this.checkEmail()
          },
          // 邀请码
          'parentName': function ($this) {
            return $this.checkParentName()
          },
          // qq
          'qq': function ($this) {
            return $this.checkQq()
          },
          // 昵称
          'nickname': function ($this) {
            return $this.checkNickname()
          },
          // 英文名字
          'englishname': function ($this) {
            return $this.checkEnglishName()
          },
          // 国家
          'country': function ($this) {
            return $this.checkCountry()
          },
          // 身份证护照
          'idPassportNo': function ($this) {
            return $this.checkIdPassportNo()
          },
          // 生日
          'birthday': function ($this) {
            return $this.checkBirthday()
          },
          // 注册验证码
          'zhuceYm': function ($this) {
            return $this.checkZhuceYm()
          },
          // 微信
          'wechat': function () {
            return $this.checkWechat()
          }
        }
      }
      window._.each(checkStep[2], function (value, key) {
        // 遍历 验证 每一个
        if ($this.regInfo[key] && $this.regInfo[key].ifShow && !value($this)) {
          // 验证通过
          return false
        }
      })
      // $this.errMsg = {}  pass  true  有东西没通过
      window._.each($this.errMsg, function (value, key) {
        if (value.status == 'err') {
          pass = true
        }
      })
      // $this.errMsg
      if (pass) {
        window.layer.msgWarn('请填写合法信息!')
        return
      }
      if (!$this.user1.pact) {
        window.layer.msgWarn('请勾选接受相关条款和隐私协议!')
        return false
      }
      this.saveAccount()
    }
  }
}
