<template>
    <div class="login-box">

        <!-- 登录头部 -->
        <div class="header-content">
            <div class="head-left">
                <i class="yo-icon icon-back" @click="$router.push('/wap/index')"></i>
            </div>
            <div class="head-title">
                登录
            </div>
        </div>

        <!-- 登录logo -->
        <div class="login-logo">
            <img v-if="isPreview2 === 4" :src="loginLogo.fastDfsUrl + loginLogo.articleVo.photoDocList[0].cpicSim" alt="">
             <img v-if="mobLoginLogo && isPreview2 !== 4"  :src="fastDfsUrl + mobLoginLogo.cpicSim" alt="">
            <!-- <img v-else src="@/assets/img/logo.png" alt=""> -->
        </div>
        <div class="from-login">
            <div class="login-item">
                <i class="yo-icon icon-account"></i>
                <input type="text" maxlength="12" v-model="account"
                  placeholder="请输入账号" @input="toLowerCaseStr()" @blur="getLoginFailTimes()"  >
                <i class="yo-icon icon-close" @click='account = ""'></i>
            </div>

            <div class="login-item">
                <i class="yo-icon icon-pwd"></i>
                <input type="text" maxlength="12" v-model='password' placeholder="请输入密码" v-if='showPwd'>
                <input type="password" maxlength="12" v-model='password' placeholder="请输入密码" v-else @blur="checkPassword()" >
                <i class="yo-icon" :class="showPwdIcon" @click="showPwd = !showPwd"></i>
            </div>

            <div class="login-item" style='position:relative;' v-if='showCheckCode'>
                <i class="yo-icon icon-yzm"></i>
                <input type="text" v-model="checkCode" placeholder="请输入验证码" @blur="isCheckCode()" maxlength="4">
                <img class="code" :src='validCodeSrc' @click="clickYZM()">
            </div>
            <a href="javascript:void(0);" class="log-forget text-right" ><span @click='forgetPassword'>忘记密码？</span> </a>

            <!-- 统一错误提示语 -->
            <p class="errText log-forget text-center">
              {{errAccountMsg}}<br>
              {{errPwdMsg}}<br>
              <span v-if="showCheckCode">{{errCheckCodeMsg}}</span>
            </p>
        </div>

        <!-- login-disabled 禁用样式名称 -->
        <div class="login-but" @click.stop='validMemberInfo' :disabled='disableLoginBtn' :class="{ 'login-disabled':disableLoginBtn}">
            <span>{{buttonMsg}}</span>
        </div>

        <p class="login-tips text-center" v-if="!isShowReg">还没有账户？<a href="javascript:void(0);" @click='reglink()'>立即注册</a><i class="yo-icon icon-next"></i></p>
    </div>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'
import * as userTypes from '@s/store/user/type.js'
/**
 * 依赖关系：
 导入： 有公用
 导出： 无
 * 注意：谨慎 依赖-导入
 * webpack build: 可单独build，暂时不影响
 */
export default {
  name: 'loginBefore',
  data () {
    return {
      showPwd: false, // 是否显示密码
      buttonMsg: '登录',
      account: '', // 登录账号
      password: '', // 登录密码
      checkCode: '', // 登录验证码
      showCheckCode: false, // 显示验证码
      showLoginNotice: false, // 显示登录游戏协议
      validCodeSrc: '', // 验证码时间戳
      isOpen: true, // 用于限制点击过快处理
      showPwdIcon: 'icon-pwd-off',
      errAccountMsg: '', // 错误账号提示信息
      errPwdMsg: '', // 错误密码提示信息
      errCheckCodeMsg: ''// 错误的验证码提示信息
    }
  },
  created () {
    this.$store.state.h5Home.headerType = ''
  },
  components: {

  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin, // 是否已经登录
      isShowReg: state => state.h5Home.isShowReg, // 是否显示注册入口
      isPreview2: state => state.h5Home.isPreview2,
      loginLogo: state => state.h5Home.loginLogo,
      fastDfsUrl: state => state.h5Home.fastDfsUrl, // 上传资源路径
      mobLoginLogo: state => state.h5Home.mobLoginLogo// 头部logo
    }),
    disableLoginBtn () {
      let accountReg = /^[a-zA-Z][0-9A-Za-z]{5,11}$/
      if (!accountReg.test(this.account)) {
        return true
      }
      let pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
      if (!pwdReg.test(this.password)) {
        return true
      }
      if (this.showCheckCode) {
        if (this.checkCode.length === 0) {
          return true
        } else {
          return false
        }
      }
      return false
    }

  },
  watch: {
    // 监听密码不能输入空格
    password (val) {
      this.password = val.replace(/[^0-9a-zA-Z]/ig, '')
    },
    $route () {
      window.indexMain.ifRouteChange()
    },
    account (v) {
      if (v.length === 0) {
        this.showCheckCode = false
      }
    },
    isLogin (v) {
      if (v) {
        this.$router.push('/wap/index')
      }
    },
    showPwd () {
      if (this.showPwd) {
        this.showPwdIcon = 'icon-pwd-on'
      } else {
        this.showPwdIcon = 'icon-pwd-off'
      }
    }
  },
  methods: {
    // 下面是状态机传来的参数
    ...mapActions({
      getLoginFailTimesAction: userTypes.GETLOGINFAILTIMES, // 校验错误次数
      validMemberInfoAction: userTypes.VALIDMEMBERINFO, // 校验输入信息是否正确
      LOGIN: userTypes.LOGIN, // 登录请求
      updateMoneyAction: userTypes.UPDATESESSIONMONEY // 刷新余额
    }),
    isAccount (account) {
      if (account.length === 0) {
        this.errAccountMsg = '请输入账号'
        return false
      }
      let reg = /^[a-zA-Z][0-9A-Za-z]{5,11}$/
      if (!reg.test(account)) {
        this.errAccountMsg = '字母开头6-12位字母或数字组合'
        return false
      }
      this.errAccountMsg = ''
      return true
    },
    isPassWord (password) {
      if (password.length === 0) {
        this.errPwdMsg = '请输入密码'
        return false
      }
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
      if (!reg.test(password)) {
        this.errPwdMsg = '请输入密码为6-12位字母与数字组合'
        return false
      }
      this.errPwdMsg = ''
      return true
    },
    isCheckCode () {
      if (this.checkCode.length === 0) {
        this.errCheckCodeMsg = '请输入验证码'
        return false
      }
      this.errCheckCodeMsg = ''
      return true
    },
    closePopLogin () {
      this.account = ''
      this.password = ''
      this.checkCode = ''
      this.showCheckCode = false
    },
    // 将非数字等转换为空字符串，然后转为小写，过滤用
    toLowerCaseStr () {
      this.account = window.common.login.toLowerCaseStr(this.account)
    },
    // 更改验证码
    clickYZM () {
      this.validCodeSrc = '/member/code?t=' + new Date().getTime()
    },
    checkPassword () {
      this.isPassWord(this.password)
    },
    getLoginFailTimes () {
      if (!this.isAccount(this.account)) return
      if (this.account.length < 6) return
      let postData = {
        accountAllVo: {
          account: window.$.base64.encode(this.account),
          password: window.$.base64.encode(this.password.trim())
        },
        zhuceYm: this.checkCode
      }
      this.getLoginFailTimesAction(postData).then(res => {
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
      if (this.disableLoginBtn) return
      let postData = {
        accountAllVo: {
          account: window.$.base64.encode(this.account),
          password: window.$.base64.encode(this.password.trim())
        },
        zhuceYm: this.checkCode
      }
      if (this.isOpen) {
        // 限制两秒才允许再次点击
        this.isOpen = false
        this.buttonMsg = '登录中'
        this.validMemberInfoAction(postData).then(res => {
          this.showLoginNotice = true
          this.loginMethod()
        }).catch(res => {
          setTimeout(() => {
            this.isOpen = true
            this.buttonMsg = '登录'
          }, 1500)
          if (res.msg === '验证码输入错误' || res.msg === '请输入验证码') {
          // 如果验证码错误，那么继续输验证码
            this.checkCode = ''
            this.showCheckCode = true
          } else if (res.data > 2) {
          // 超过两次显示验证码弹框
            this.showCheckCode = true
          }
          this.clickYZM()
          window.layer.msgWarn(res.msg)
        })
      }
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
      this.LOGIN(postData).then(res => {
        this.buttonMsg = '登录'
        // 调用刷新余额接口
        setTimeout(() => {
          this.closePopLogin()
          this.$nextTick(() => {
            setTimeout(() => {
              window.store.dispatch('initH5Data.action', {versionFun: true})
            }, 30)
          })
        }, 10)
      }).catch(res => {
        this.showCheckCode = (res.msg === '验证码输入错误' || res.msg === '请输入验证码')
      })
    },
    // 忘记密码,调用common中方法，
    forgetPassword () {
      this.$router.push('/wap/forgetPwd')
      // window.common.forgetPWD()
    },
    agree () {
      this.loginMethod()
      this.showLoginNotice = false
    },
    disagree () {
      this.showLoginNotice = false
    },
    // 立即注册
    reglink () {
      var postActioin = { type: 'h5', versionFun: true, hideLoading: true }
      // 请求是否开启注册功能
      this.$store.dispatch('user.register', postActioin).then(res => {
        if (res.data.regStatus) {
          window.layer.msgWarn('本平台暂未开放注册功能，请联系客服')
        } else {
          this.$router.push('/wap/register')
        }
      })
    }
  },
  mounted () {
    this.clickYZM()
    window.indexMain.ifRouteChange()
  }
}
</script>

