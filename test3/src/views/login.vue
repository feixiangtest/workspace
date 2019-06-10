<template>
    <div class="login">
        <div class="yow-content login-head">
            <i class="yo-icon icon-online" @click="openOnlineService()"></i>
        </div>
        <div class="login-banner">
            <div class="login-logo" v-if="!previewLoginLogo.type">
                <img :src="fastDfsUrl + mobAgtLoginLogo.cpicSim" v-if="mobAgtLoginLogo && mobAgtLoginLogo.cpicSim">
                <img src="../assets/img/login-logo.png" v-else>
            </div>
            <div class="login-logo"  v-else>
              <img :src="fastDfsUrl + previewLoginLogo.cpicSim">
            </div>
        </div>
        <div class="login-info">
            <div class="login-item">
                <i class="yo-icon icon-account"></i>
                <input type="text" placeholder="请输入账号" maxlength="12" v-model="account" @input="assertAccount()">
            </div>
            <div class="login-item">
                <i class="yo-icon icon-passworde"></i>
                <input type="password" placeholder="请输入密码" v-model="password" maxlength="12">
            </div>
            <div class="login-item">
                <i class="yo-icon icon-code"></i>
                <input type="text" v-model="loginCode" placeholder="请输入验证码" maxlength="4" @keyup.enter="login()">
                <img class="code" :src="'/code'+validCodeSrc" @click="changeVCode()">
            </div>
            <div class="login-but">
                <span class="btn btn-primary btn-block btn-lg" @click="login()">{{buttonMsg}}</span>
            </div>
        </div>

        <div v-if="isLegendCode">
          <div class="laymshade"></div>
          <div class="layermmain">
            <div class="section">
              <div class="layermchild layerConfirm legendCode layermanim">
                <h3 style="">安全码</h3>
                <div class="layermcont">
                  <div class="legend-input">
                    <input type="text" v-model="legendCode" maxlength="6" placeholder="请输入安全码" @input="cleanInput()">
                  </div>
                </div>
                <div class="layermbtn">
                  <span type="1" @click="subLegendCode()">确定</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--蒙层-->
        <loading v-if="showLoading"></loading>

    </div>
</template>

<script>
import { mapState } from 'vuex'
import utils from '@/plugins/utils.js'
import * as types from '@/store/home/type'
import * as statusCode from '@/utils/status_const'
import loading from '@/components/loading'
let Base64 = require('js-base64').Base64
export default {
  components: {
    loading: loading
  },
  mounted () {
    this.isOpen = true
    window.$('body').addClass('login-body')
    // 如果是登录状态重新请求一次确认是否已登录
    if (this.isLogined === 1) {
      this.initData()
    }
    // window.indexMain.closeFixed('.login-item input', '.yo-pad10.sureBtn') // input聚焦时，取消底部确定按钮Fixed定位
  },
  data () {
    return {
      validCodeSrc: '',
      account: '', // 登录帐号
      password: '', // 登录密码
      loginCode: '', // 登录验证码
      isOpen: true, // 用于限制点击过快处理
      buttonMsg: '登录',
      legendCode: '', // 安全码
      isFlag: true // 用于限制点击过快处理
    }
  },
  computed: {
    ...mapState({
      isLegendCode: state => state.home.isLegendCode,
      fastDfsUrl: state => state.home.fastDfsUrl,
      previewLoginLogo: state => state.home.previewLoginLogo,
      mobAgtLoginLogo: state => state.home.mobAgtLoginLogo
    }),
    onlineService () {
      return this.$store.state.home.onlineService
    },
    isLogined () {
      return this.$store.state.home.isLogined
    },
    showLoading () {
      return this.$store.state.home.showLoading
    }
  },
  methods: {
    // 在线客服
    openOnlineService () {
      window.indexMain.openOnlineService()
    },
    // 刷新验证码
    changeVCode () {
      let timestamp = new Date().getTime()
      this.validCodeSrc = '?t=' + timestamp
    },
    assertAccount ($this) {
      try {
        this.account = this.account.replace(/[^0-9a-z]/ig, '')
      } catch (e) { }
      try {
        this.account = this.account.toLowerCase()
      } catch (e) { }
    },
    // 登录
    login () {
      if (!this.account) {
        window.layer.msgWarn('请输入用户名！')
        return
      }
      if (!this.password) {
        window.layer.msgWarn('请输入密码！')
        return
      }
      if (this.password.length < 6) {
        window.layer.msgWarn('密码长度不能少于6个字')
        return
      }
      if (!this.loginCode) {
        window.layer.msgWarn('请输入验证码！')
        return
      }
      this.account = utils.toLowerCase(utils.space(this.account))
      this.password = utils.toLowerCase(utils.space(this.password))
      // this.showCheckCode = utils.toLowerCase(utils.space(this.showCheckCode))
      if (this.isOpen) {
        // 限制两秒才允许再次点击
        this.isOpen = false
        this.buttonMsg = '登录中'
        // BASE64转码
        let enAccount = Base64.encode(this.account)
        let enPassword = Base64.encode(this.password)

        let param = {
          'account': enAccount,
          'password': enPassword,
          'validCode': this.loginCode
        }
        this.$store.dispatch(types.LOGIN_ACTION, param).then(res => {
          if (res.code === statusCode.statusConst.SUCCESS) {
            localStorage.storeAccount = this.account
            // 登录结束后调用初始化方法
            this.initData()
            this.$router.push('/m/index')
            window.$('body').removeClass('login-body')
          }
        })
        setTimeout(() => {
          this.isOpen = true
          this.buttonMsg = '登录'
        }, 1500)
      }
    },
    subLegendCode () {
      if (this.legendCode === '' || this.legendCode === null) {
        window.layer.msgWarn('请输入6位数的安全码！')
        return
      }
      this.legendCode = utils.toLowerCase(utils.space(this.legendCode))
      // BASE64转码
      let enAccount = Base64.encode(this.account)
      let enPassword = Base64.encode(this.password)
      let param = {
        'account': enAccount,
        'password': enPassword,
        'validCode': this.loginCode,
        'legendCode': this.legendCode
      }
      this.$store.dispatch(types.LOGINTOW_ACTION, param).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          // 登录结束后调用初始化方法
          this.initData()
          this.$router.push('/m/index')
          this.$store.state.home.isLegendCode = false
          window.$('body').removeClass('login-body')
        }
      })
    },
    cleanInput () {
      if (this.legendCode === '' || this.legendCode === null) {
        return
      }
      this.legendCode = this.legendCode.replace(/[^0-9]+/g, '')
    },
    initData () {
      if (this.isFlag) {
        // 限制两秒才允许再次点击
        this.isFlag = false
        this.$store.dispatch('initData.action', {}).then(res => {
        })
        setTimeout(() => {
          this.isFlag = true
        }, 1500)
      }
    }
  }
}
</script>

