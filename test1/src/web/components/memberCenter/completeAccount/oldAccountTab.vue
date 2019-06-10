<template>
  <dl class="secondForm">
        <dd>
        <div class="formIput">
            <span class="itemTxt">&nbsp;&nbsp;账号</span>
            <div class="specialbox">
            <input class="typeinput input-one" type="text" placeholder="6-12位英文字母和数字的组合" maxlength="16"
                    v-model="bind.account"
            >
            </div>
            <!-- <AddErr :regDate="errMsg" message="bind_account"></AddErr> -->
        </div>
        </dd>
        <dd>
        <div class="formIput">
            <span class="itemTxt">&nbsp;&nbsp;密码</span>
            <div class="specialbox">
            <input class="typeinput input-one" type="password" placeholder="6-12位英文字母或数字与字母组合"
                    v-model="bind.password"
            >
            </div>
            <!-- <AddErr :regDate="errMsg" message="bind_password"></AddErr> -->
        </div>
        </dd>
        <dd>
        <div class="formIput">
            <span class="itemTxt"><em class="red">*</em> 取款密码</span>
            <div class="specialbox">
            <input class="typeinput input-one" type="tel" placeholder="只能输入数字"
                    maxlength="4"
                    v-model="bind.confirm"
            >
            </div>
            <!-- <AddErr :regDate="errMsg" message="bind_confirm"></AddErr> -->
        </div>
        </dd>
        <div class="yo-pad10 yo-pad-bot20">
        <button type="button" class="yo-anOne button " @click="submint('bind')">绑定</button>
        </div>
   </dl>
</template>
<script>
import bindmethod from '@/base/utils/bindmethod'
export default {
  data () {
    return {
      bind: {    // 绑定旧账号的数据合集
        account: '',
        password: '',
        confirm: ''
      }
    }
  },
  methods: {
    // 提交方法 包括绑定新旧微信号和完善资料view操作
    submint (type) {
      console.info('2222')
      var $this = this
      var {msgWarn} = bindmethod
      let bind = this.bind
      // 校验完毕进行数据绑定
      if ($this.bindCheck($this)) {
            // 绑定旧账户
        this.LoadingMsg = true
        this.httpRequest({
          url: '/api/wap/wapWeiXinLogin/weixinBind',
          actions: {
            'account': bind.account,
            'password': bind.password,
            'drawpwd': bind.confirm
          },
          success: function (_res) {
            if (_res.status === '1') {
              if (_res.msg) {
                let versionList = window.indexMain.versionFun('initData', 'homeVersionKey')
                $this.$store.dispatch('initData.action', versionList) // 重新获取首页信息
                console.error(_res)
                console.log(window.store.state.home.userInfo)
                msgWarn(_res.msg ? _res.msg : '网络开小差儿，请稍后重试', () => {
                  $this.$router.push('/wap/memberCenter/index')
                })
              }
            } else if (_res.msg) {
              msgWarn(_res.msg ? _res.msg : '网络开小差儿，请稍后重试')
              return false
            }
          }
        }, false)
        this.LoadingMsg = false
      }
      return false
    },
    // 验证数据方法 第二步
    bindCheck ($this) {
      let {msgWarn} = bindmethod
      let checkstart = $this.checkAccounts('bind', pw)
      function pw () {
        let password = $this.bind.password
        let moneyDraw = $this.bind.confirm
        console.info('password:', password)
        console.info('moneyDraw:', moneyDraw)
        if (!password) {
          msgWarn('所需密码不能为空')
          return false
        }
        if (/^[0-9]{6,12}$/.test(password) || !/^[A-Za-z0-9]{6,12}$/.test(password)) {
          msgWarn('请输入正确的密码！格式：6-12位英文字母或数字与字母组合')
          return false
        }
        var confirm = moneyDraw.replace(/\s/g, '')
        if (!confirm) {
          msgWarn('请填写取款密码')
          return false
        }
        if (!/^[0-9]{4}$/.test(confirm)) {
          msgWarn('取款密码为纯数字！')
          return false
        }
        if (confirm.length < 4 || confirm.length > 4) {
          msgWarn('取款密码必须是四位数')
          return false
        }
        return true
      }
      return checkstart
    },
    checkAccounts (KeyType, cbFun) {
      var {msgWarn} = bindmethod
      let _errAccount = [
        '所需账号不能为空',
        '账号为6-12个英文字母和数字的组合！',
        'test开头的是试玩会员，不允许作为正式账号！',
        '请输入正确的账号格式',
        '请输入正确的账号！格式：以英文+数字,长度6-12',
        '账号需在6-12位之间'
      ]
      let account = this[KeyType].account
       // 绑定旧用户的校验顺序
      if (account === '') {
        msgWarn(_errAccount[0])
        return false
      }
      if (!this.isNum(account) || !/^[a-zA-Z][a-zA-Z0-9]+$/.test(account)) {
        msgWarn(_errAccount[4])
        return false
      }
      if (account.length < 6 || account.length > 12) {
        msgWarn(_errAccount[5])
        return false
      }
      let accountStr = account.substring(0, 4).toLowerCase()
      if (accountStr === 'test') {
        msgWarn(_errAccount[2])
        return false
      }
      return cbFun()
    },
     // 验证是否为纯数字
    isNum (N) {
      var Ns = /^[A-Za-z0-9]{4,12}$/
      if (!Ns.test(N)) {
        return false
      } else {
        return true
      }
    },
    httpRequest (options) {
      let HttpRequest = bindmethod.HttpRequest
      return HttpRequest(options)
    }
  }
}
</script>

