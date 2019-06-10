<template>
  <div>
    <div v-if='showPopLogin' class="zhezhao" @keyup.enter="validMemberInfo">
      <div class="newLoginBox">

        <div class="newLoginTitle">
            <span>会员登录</span>
            <a href="javascript:;"><i class="yo-pop-close" @click='closePopLogin'></i></a>
        </div>

        <div class="newLoginCent">
            <div class="logFromItem">
              <div class="loginInput ">
                <i class="input-ico acc"></i>
                <input maxlength="12" v-model="account"
                placeholder="请输入账号" @input="toLowerCaseStr()" @blur="getLoginFailTimes()">
              </div>
            </div>
            <div class="logFromItem">
              <div class="loginInput ">
                <i class="input-ico pswd"></i>
                <input type="password" maxlength="12" v-model='password' placeholder="请输入密码">
              </div>
            </div>
            <div class="logFromItem" v-if='showCheckCode'>
              <div class="loginInput input-yzm">
                  <i class="input-ico yzm"></i>
                  <input type="text" maxlength="4" class="" placeholder="请输入验证码" v-model='checkCode' >
              </div>
              <img class="codeImg" :src='validCodeSrc' ref='validCodeSrc' @click='clickYZM()'>
            </div>

            <p><a href="javascript:void(0)" class="logfetPswd" @click='forgetPassword'>忘记密码？</a></p>
            <button class="loginBut" style='width:100%' @click.stop='validMemberInfo' :disabled='disableLoginBtn'>登录</button>

            <p v-if="!isShowReg">还不是会员？<a href="javascript:void(0)" class="logRei" @click="reglink()">立即注册</a></p>
        </div>
        <div class="newLoginBot"></div>
      </div>
    </div>
    <!-- 游戏协议公告 -->
    <game-protocol :show-login-notice='showLoginNotice' :agree='agree' :disagree='disagree'></game-protocol>
  </div>
</template>

<script>
  /*
   vue 单独编译注释： import gameProtocol from '@s/components/doc/gameProtocol.vue' // 游戏协议提示框
   不要 import 引入 游戏协议组件
   游戏协议组件 已经全局注册
   * */
  export default {
    name: 'loginBefore',
    data () {
      return {
        account: '', // 登录账号
        password: '', // 登录密码
        checkCode: '', // 登录验证码
        showCheckCode: false, // 显示验证码
        showLoginNotice: false, // 显示登录游戏协议
        validCodeSrc: '', // 验证码时间戳
        disableLoginBtn: false, // 禁用登录anni8u
        yzmUrl: window.common.apiUrl.GETVALIDCODE // 验证码地址
      }
    },
    computed: {
      showPopLogin () {
        return this.$store.state.shareApi.showPopLogin
      },
      isShowReg () {
        return this.$store.state.shareApi.isShowReg// 是否显示注册入口
      }
    },
    methods: {
      closePopLogin () {
        this.account = ''
        this.password = ''
        this.checkCode = ''
        this.showCheckCode = false
        this.$store.state.shareApi.showPopLogin = false
      },
      // 将非数字等转换为空字符串，然后转为小写，过滤用
      toLowerCaseStr () {
        this.account = window.common.login.toLowerCaseStr(this.account)
      },
      // 更改验证码
      clickYZM () {
        this.validCodeSrc = '/member/code?t=' + new Date().getTime()
      },
      getLoginFailTimes () {
        if (this.account.length < 6) return
        let postData = {
          accountAllVo: {
            account: window.$.base64.encode(this.account),
            password: window.$.base64.encode(this.password.trim())
          },
          zhuceYm: this.checkCode
        }
        // 校验错误次数
        this.$store.dispatch('user.getLoginFailTimes', postData).then(res => {
          if (res.data > 2) {
            // 超过两次显示验证码弹框
            this.showCheckCode = true
          } else {
            this.checkCode = ''
            this.showCheckCode = false
          }
        })
      },
      // 点击登录按钮的时校验判断，获取验证码再登录
      validMemberInfo () {
        // 验证账号，密码，验证码
        if (!window.common.login.isAccount(this.account)) return
        if (!window.common.login.isPassWord(this.password)) return
        if (this.showCheckCode) {
          if (!window.common.login.isCheckCode(this.checkCode)) return
        }
        let postData = {
          accountAllVo: {
            account: window.$.base64.encode(this.account),
            password: window.$.base64.encode(this.password.trim())
          },
          zhuceYm: this.checkCode
        }
        if (this.disableLoginBtn) return
        this.disableLoginBtn = true
        // 校验输入信息是否正确
        this.$store.dispatch('user.validMemberInfo', postData).then(res => {
          this.showLoginNotice = true
          this.forbidSlide()
          this.$store.state.shareApi.showPopLogin = false
          this.disableLoginBtn = false
        }).catch(res => {
          if (res.msg === '验证码输入错误' || res.msg === '请输入验证码') {
            // 如果验证码错误，那么继续输验证码
            this.showCheckCode = true
          } else if (res.data > 2) {
            // 超过两次显示验证码弹框
            this.showCheckCode = true
          }
          this.clickYZM()
          this.disableLoginBtn = false
          window.layer.msgWarn(res.msg)
        })
      },
      // 登录请求
      loginMethod () {
        let postData = {
          accountAllVo: {
            account: window.$.base64.encode(this.account),
            password: window.$.base64.encode(this.password.trim())
          },
          zhuceYm: this.checkCode
        }
        this.$store.dispatch('user.login', postData).then(res => {
          this.closePopLogin()
          window.store.dispatch('user.moneyConversion', { api: 0 })// 调用刷新余额接口
        }).catch(res => {
          this.showCheckCode = (res.msg === '验证码输入错误' || res.msg === '请输入验证码')
          window.layer.msgWarn(res.msg)
        })
      },
      // 忘记密码,调用common中方法，
      forgetPassword () {
        window.common.forgetPWD()
      },
      agree () {
        this.loginMethod()
        this.showLoginNotice = false
        window.$('html').css('overflow', 'auto')
      },
      disagree () {
        this.showLoginNotice = false
        window.$('html').css('overflow', 'auto')
      },
      reglink () {
        // 请求是否开启注册功能
        let $this = this
        window.store.dispatch('user.register', {}).then(function (res) {
          if (res.data.regStatus) {
            window.layer.msgWarn('本平台暂未开放注册功能，请联系客服')
          } else {
            $this.closePopLogin()
            window.router.push('/register')
          }
        })
      },
      forbidSlide () {
        if (this.showLoginNotice === true) {
          window.$('html').css('overflow', 'hidden')
        } else {
          window.$('html').css('overflow', 'auto')
        }
      }
    },
    mounted () {
      this.clickYZM()
    }
  }
</script>



