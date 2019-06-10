<template>
    <div class="loginBody" style="width: 100%; height: 100%;height: 100vh;">
        <div class="header yo-home-nav">
            <div class="center">
                <div class="hea-menu hea-left">
                    <a href="javascript:;" @click="GoHome()"><span>首页</span></a>
                </div>
                <div class="header-text titile">
                  <img v-if="mobHeadLogo && mobHeadLogo[0]" :src="staticDomain + mobHeadLogo[0].cpicSim">
                </div>
                <div class="hea-user hea-right">
                    <a href="javascript:;" @click="loginFree()"><i class="yo-icon icon-account"></i><span>试玩</span></a>
                </div>
            </div>
        </div>
        <div class="wrapper">
          <div class="yo-main">
              <div class="logo">
                  <img v-if="onloginLogo && isPreview == 4" :src="staticDomain + onloginLogo">
                  <img v-if="isPreview != 4 && mobLoginLogo && mobLoginLogo[0]" :src="staticDomain + mobLoginLogo[0].cpicSim">
              </div>
              <div class="yo-login">
                  <div class="getSpace">
                      <div class="yo-in-box ">
                          <i class="yo-icon icon-menber-myaccount"></i>
                          <input type="text" placeholder="请输入账号" class="userName" maxlength="12" v-model="account" @input="toLowerCaseStr($event)" @blur="validCheckCode()">
                          <i class="yo-icon icon-remove imgEvents " @click="account = '' , password = '', bankAccount = '', realName = ''"></i>
                      </div>
                      <div class="yo-in-box">
                          <i class="yo-icon icon-password"></i>
                          <input v-if="showPassword" type="text" v-model='password' placeholder="请输入密码" maxlength="12"/>
                          <input v-else type="password" v-model='password' placeholder="请输入密码" maxlength="12"/>
                          <i class="yo-icon imgEvents eyes" :class="showPassword ? 'icon-see' : 'icon-seeing'" @click="showPassword = !showPassword"></i>
                      </div>
                      <div class="yo-in-box" v-if="specialLoginStatus && failTimes == 4">
                          <img :src="stationCode && stationCode == 'a04' ? commonImgUrl + '/common/realNamea04.svg':commonImgUrl + '/common/realName.svg'" class="iconImg"/></i>
                          <input class="spcInpt" type="text" v-model="realName" placeholder="请输入真实姓名" maxlength="20">
                          <i class="yo-icon icon-remove imgEvents " @click="realName = ''"></i>
                      </div>
                      <div class="yo-in-box" v-if="specialLoginStatus && failTimes > 4">
                          <img :src="stationCode && stationCode == 'a04' ? commonImgUrl + '/common/bankNuma04.svg':commonImgUrl + '/common/bankNum.svg'" class="iconImg"/></i>
                          <input class="spcInpt" type="tel" v-model="bankAccount" placeholder="请输入银行卡号" maxlength="20" pattern="[0-9]*" @blur="checkBank()" @input="inputCard()">
                          <i class="yo-icon icon-remove imgEvents " @click="bankAccount = ''"></i>
                      </div>
                      <div class="yo-in-box" v-if="failTimes > 2">
                          <i class="yo-icon icon-verification-code"></i>
                          <input type="text" v-model="checkCode" placeholder="请输入验证码" maxlength="12" @click="inputclick()">
                          <img  class="yzms imgEvents" :src="'/api/wap/wapLogin/validCode?t=' + validCodeSrc" @click="changeVCode()">
                      </div>
                  </div>
                  <p v-if="specialLoginStatus && failTimes == 4" style="margin:25px auto;color:#E83B50;font-size:12px" class="red">若未绑定真实姓名，请先联系客服！</p>
                  <p v-if="specialLoginStatus && failTimes > 4" style="margin:25px auto;color:#E83B50;font-size:12px" class="red">若未绑定银行卡，请先联系客服！</p>
                  <a class="yo-but" style="margin:25px auto" @click="login()">立即登录</a>
                  <div class="yo-fuzhu">
                      <ul>
                          <li><a class="ljzc" href="javascript:;" title="" @click="gotoRegister()"><i class="yo-icon icon-register"></i>立即注册</a></li>
                          <li><a class="wjmm" href="javascript:;" title="" @click="forgetPassword()"><i class="yo-icon icon-query"></i>忘记密码</a></li>
                          <li><a class="zxkf" :href="onLineService === undefined ? 'javascript:void(0)' : onLineService.junctionSim" title=""><i class="yo-icon icon-service"></i>在线客服</a></li>
                      </ul>
                  </div>
              </div>
          </div>
          <footer class="thirdparty" v-show="this.shopaddr !== ''">
              <fieldset>
                  <legend align="center">第三方登录</legend>
                  <a class="wechat activated" href="javascript:;" @click="goToWechat()"><i class="yo-icon icon-wechat"></i></a>
              </fieldset>
          </footer>
      </div>
    </div>
</template>

<script>
import * as types from '@/base/store/home/type'
import * as statusCode from '@/base/utils/status_const'
import * as index from '@/base/config/index'
export default {
  data () {
    return {
      validCodeSrc: '',
      account: 'karl01', // 登录账号
      password: 'qwe123', // 登录密码
      checkCode: '', // 登录验证码
      showPassword: false, // 显示隐藏密码
      showCheckCode: false, // 显示验证码
      indexs: index,
      // showRealName: false, // 显示银行卡
      failTimes: 0, // 登录错误次数
      specialLoginStatus: 0, // 是否开通特殊d登录验证
      // showBankNum: false, // 显示银行卡号
      bankAccount: '', // 银行卡
      realName: '' // 真实姓名
    }
  },
  components: {

  },
  computed: {
    onloginLogo () {
      // 浏览登录loginlogo
      if (this.$store.state.preView.loginLogo.mobLogoCpicSim) {
        return this.$store.state.preView.loginLogo.mobLogoCpicSim
      } else {
        return window.store.state.home.mobHeadLogo
      }
    },
    onLineService () {
      return this.$store.state.home.onlineservice
    },
    shopaddr () { // 微信登录
      return this.$store.state.home.shopaddr
    },
    sessionId () { // 微信sessionId登录
      return this.$store.state.home.sessionId
    },
    staticDomain () {
      return this.$store.state.home.staticDomain
    },
    mobHeadLogo () {
        // 顶部log
      return this.$store.state.home.mobHeadLogo
    },
    mobLoginLogo () {
      // 登录页面logo
      return this.$store.state.home.mobLoginLogo
    },
    isPreview () {
      return this.$store.state.preView.isPreview
    },
    mobAd () {
      return this.$store.state.home.mobAd
    },
    stationCode () {
      // this.$store.state.home.stationCode = ''
      return this.$store.state.home.stationCode
    },
    /** 获取登陆成功后游戏广告 */
    gameNoticeItem () {
      let item = {}
      if (this.isPreview === 1) {
        let list = this.$store.state.preView.popupAds.articleVo
        if (list.section && list.section.sectionType === 'mobAd') {
          item = list.photoDocList[0]
        }
      } else {
        if (this.mobAd !== undefined) {
          for (let i = 0; i < this.mobAd.length; i++) {
            item = this.mobAd[0]
          }
        }
      }
      return item
    },
    commonImgUrl () {
      return this.$store.state.home.commonImgUrl
    }
  },
  mounted () {
    if (this.$store.state.home.isLogin) {
      this.GoHome()
    }
    // if (localStorage.getItem('showCheckCode') === 'showCheckCode') { // 判断是否需要显示验证码
    //   this.showCheckCode = true
    // }
    // if (localStorage['showRealName']) {
    //   this.showRealName = JSON.parse(localStorage['showRealName'])
    // }
    // if (localStorage['showBankNum']) {
    //   this.showBankNum = JSON.parse(localStorage['showBankNum'])
    // }
  },
  methods: {
    GoHome () {
      this.$router.push('/wap/index')
    },
    loginFree () {
      this.$store.dispatch(types.LOGIN_FREE_ACTION, {}).then(res => {
        if (res.status === statusCode.statusConst.SUCCESS) {
          this.$store.state.site.nowPosition = 0
          let versionList = window.indexMain.versionFun('initData', 'homeVersionKey')
          this.$store.dispatch('initData.action', versionList) // 重新获取首页信息
          window.layer.msgWarn('您已进入试玩模式，请尽情体验！！', () => {
            // this.$store.state.home.gameNoticeFlag = true // 首页游戏公告显示 试玩不需要显示公告
            this.$router.push('/wap/index')
            this.$store.state.home.userInfo.money = res.data.money
          })
        }
      })
    },
    validCheckCode () {
      window.$.ajax({
        'type': 'post',
        'url': '/api/wap/wapLogin/getLoginFailTimes' + '?t=' + new Date().getTime(),
        'dataType': 'json',
        'async': false,
        'contentType': 'application/json',
        'data': JSON.stringify({
          accountAllVo: {'account': this.account}
        }),
        'success': (_res) => {
          if (_res.status === statusCode.statusConst.SUCCESS) {
            this.failTimes = _res.data.failTimes
            this.specialLoginStatus = _res.data.specialLoginStatus
          }
        }
      })
    },
    checkBank () {
      if (!/[0-9]{10,}$/.test(this.bankAccount)) {
        window.layer.msgWarn('银行卡号输入错误！')
        return false
      }
    },
    inputCard () {
      this.bankAccount = this.bankAccount.replace(/[^\d]/g, '') // 清除"数字"和"."以外的字符
    },
    login () {
      if (!this.account) {
        window.layer.msgWarn('用户名未填写！')
        return
      }
      if (!this.password) {
        window.layer.msgWarn('密码未填写！')
        return
      }
      if (this.password.length < 6) {
        window.layer.msgWarn('密码长度不能少于6个字')
        return
      }
      if (this.failTimes > 2) {
        if (!this.checkCode) {
          window.layer.msgWarn('验证码未填写！')
          return
        }
      }
      if (this.specialLoginStatus && this.failTimes === 4) {
        if (!this.realName) {
          window.layer.msgWarn('真实姓名未填写！')
          return
        }
      }
      if (this.specialLoginStatus && this.failTimes > 4) {
        if (!this.bankAccount) {
          window.layer.msgWarn('银行卡号未填写！')
          return
        } else if (!/[0-9]{10,}$/.test(this.bankAccount)) {
          window.layer.msgWarn('银行卡号输入错误！')
          return false
        }
      }
      this.$store.dispatch(
        types.LOGIN_ACTION, {
          'accountAllVo': {
            'account': this.account,
            'password': window._md.hex_md5(this.password.trim()),
            'realName': this.realName,
            'bankAccount': this.bankAccount
          },
          'zhuceYm': this.checkCode
        }).then(res => {
          this.changeVCode()
          if (res.status === statusCode.statusConst.SUCCESS) {
          // 如果游戏公告没有的情况下不显示弹出框
            if (this.mobAd) {
              this.$store.state.site.openOuterlayer = true // 首页游戏公告显示
              this.$store.state.site.outerlayerType = this.indexs.outerlayerType.announcement
            }
            this.$router.push('/wap/index')
            let versionList = window.indexMain.versionFun('initData', 'homeVersionKey')
            this.$store.dispatch('initData.action', versionList) // 重新获取首页信息
            localStorage.removeItem('showCheckCode') // 登录成功，移除验证码
          } else {
            this.failTimes = res.data.failTimes
            this.specialLoginStatus = res.data.specialLoginStatus
            // if (res.data > 2) { // 显示验证码
            //   this.showCheckCode = true
            //   localStorage.setItem('showCheckCode', 'showCheckCode')
            // }
            // if (res.data === 4) {
            //   this.showRealName = true
            //   this.showBankNum = false
            // } else if (res.data > 4) {
            //   this.showRealName = false
            //   this.showBankNum = true
            // }
            // localStorage['showRealName'] = this.showRealName
            // localStorage['showBankNum'] = this.showBankNum
          }
        })
    },
    forgetPassword () {
      this.$router.push('/wap/forgetPassword')
    },
    inputclick () {
      if (!this.validCodeSrc) {
        this.changeVCode()
      }
    },
    changeVCode () {
      let timestamp = new Date().getTime()
      this.validCodeSrc = '/validCode?t=' + timestamp
    },
    passwordInput (event) {
      this.password = event.currentTarget.value
    },
    toLowerCaseStr () {
      let account = event.currentTarget.value
      let value = account.replace(/[^0-9a-zA-Z]+/g, '')
      if (value === '') {
        this.account = ''
      } else {
        this.account = value
      }
      this.account = this.account.toLowerCase()
    },
    gotoRegister () {
      this.$router.push('/wap/register')
    },
    goToWechat () {
      let ua = navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) === 'micromessenger') {
                // 微信内置浏览器使用公众号模式
        window.location.href = 'https://' + this.shopaddr + '/weixin/waploginjump?state=' + this.sessionId + '&referer=' + encodeURIComponent(document.URL)
      } else {
                // 普通手机浏览器使用开放平台网页授权模式
        window.location.href = 'https://' + this.shopaddr + '/weixin/loginjump?state=' + this.sessionId + '&referer=' + encodeURIComponent(document.URL)
      }
    }
  }
}
</script>
