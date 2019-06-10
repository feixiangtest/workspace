import {
  mapState, mapActions
} from 'vuex'
import * as userTypes from '@s/store/user/type.js'
// checkCodeTg 验证码弹框 在全局注册
import gameProtocol from '@s/components/doc/gameProtocol.vue' // 游戏协议提示框
let loginBefore = {
  name: 'loginBefore',
  data () {
    return {
      account: '', // 登录账号
      password: '', // 登录密码
      checkCode: '', // 登录验证码
      showCheckCode: false, // 显示验证码
      showLoginNotice: false // 显示登录游戏协议
    }
  },
  computed: {
    ...mapState({
      isShowReg: state => state.shareApi.isShowReg // 是否显示注册入口
    })
  },
  components: {
    gameProtocol // 游戏协议组件
  },
  methods: {
    // 下面是状态机传来的参数
    ...mapActions({
      validMemberInfoAction: userTypes.VALIDMEMBERINFO, // 校验输入信息是否正确
      loginAction: userTypes.LOGIN, // 登录请求
      updateMoneyAction: userTypes.UPDATESESSIONMONEY // 刷新余额
    }),

    // 将非数字等转换为空字符串，然后转为小写，过滤用
    toLowerCaseStr () {
      this.account = window.common.login.toLowerCaseStr(this.account)
    },
    // 关闭验证码弹框
    closeCheckCode () {
      this.showCheckCode = false
    },
    // 验证码登录
    yzmLogin (value) {
      this.checkCode = value
      this.validMemberInfo()
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
      this.validMemberInfoAction(postData).then(res => {
        this.showCheckCode = false
        this.showLoginNotice = true
        this.forbidSlide()
      }).catch(res => {
        if (res.msg === '验证码输入错误' || res.msg === '请输入验证码') {
          // 如果验证码错误，那么继续让用户停留在验证码这里，继续输验证码
          this.showCheckCode = true
        } else {
          this.showCheckCode = false
        }
        this.checkCode = ''
        if (res.msg === '验证码输入错误') return window.layer.msgWarn(res.msg)
        // 如果验证码弹框不弹出来，那么展示提示框
        if (!this.showCheckCode) { // 如果验证码弹框不弹出来，那么展示提示框
          window.layer.msgWarn(res.msg)
        }
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
      this.loginAction(postData).then(res => {
        window.store.dispatch('user.moneyConversion', { api: 0 })// 调用刷新余额接口
        window.router.push('/home')
      }).catch(res => {
        this.showCheckCode = (res.msg === '验证码输入错误' || res.msg === '请输入验证码')
      })
    },
    // 忘记密码,调用common中方法，
    forgetPassword () {
      window.common.forgetPWD()
    },
    reglink () {
      // 请求是否开启注册功能
      this.$store.dispatch('user.register', {}).then(res => {
        if (res.data.regStatus) {
          window.layer.msgWarn('本平台暂未开放注册功能，请联系客服')
        } else {
          this.$router.push('/register')
        }
      })
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
    // 免费试玩试玩
    freeLogin () {
      this.$store.dispatch('loginFree.action', {}).then(res => {
        if (res.status === window.common.statusConst.SUCCESS) {
          try {
            this.$store.state.site.nowPosition = 0
          } catch (e) {
          }
          window.store.dispatch('initData.action').then(res => {

          })
          // 重新获取首页信息
          window.layer.msgWarn('您已进入试玩模式，平台试玩金额与进入第三方后的试玩金额可能不一致，请尽情体验！！', () => {
            try {
              this.$store.state.home.gameNoticeFlag = true // 首页游戏公告显示
            } catch (e) {
            }
            this.$router.push('/home')
          })
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
  }
}
export default loginBefore
