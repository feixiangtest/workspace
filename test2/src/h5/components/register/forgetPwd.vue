<template>
    <div class="common-main main-box">
        <div class="yo-form-item">
            <h5 class="title">账号</h5>
            <div class="con-cen">
                <input type="text" class="input-sty1" placeholder="字母开头的6-12位字母或数字的组合" maxlength="12"
                       v-model="account" @input="accountFun(account)" @blur="verifyAccount()">
            </div>
        </div>
        <!--err 提示 用户名  -->
        <div class="tips error_msg2"> {{msgWarnAcc}} </div>

        <div class="yo-form-item magt10">
            <h5 class="title">取款密码</h5>
            <div class="con-cen">
                <input type="tel" class="input-sty1" placeholder="4位纯数字" maxlength="4"
                       v-model="drawMoneyPwd" @input="setDrawMoneyPwd($event, drawMoneyPwd)" @blur="verifyDrawMoney()" >
            </div>
        </div>
        <!--err 提示 取款密码  -->
        <div class="tips error_msg2"> {{msgWarnPwd}} </div>

        <div class="yo-form-item magt10">
            <h5 class="title">验证码</h5>
            <div class="con-cen">
                <input type="text" class="input-sty1" placeholder="输入验证码内容" maxlength="4"
                       v-model="validCode" @input="code(validCode)" @click="inputclick()" @blur="verifyValidCode()">
                <img class="codeImg" :src="validCodeSrc" ref="validCodeSrc" @click="clickYZM()">
            </div>
        </div>
        <!--err 提示 验证码  -->
        <div class="tips error_msg2"> {{msgWarnCode}} </div>
        
        <div class="yow-content magt10">
            <p class="weak-txt grey-txt">
                温馨提示：系统会将重置后的密码发送到您的邮箱，如您注册时未填写邮箱，请联系在线客服
            </p>
        </div>

        <div class="public-footer common-footer">
            <div class="but-footer yow-content">
                <a href="javascript:void(0);" class="btn btn-lg btn-block" :class="confirmStatus ? 'btn-disabled' : 'btn-primary'"
                   :disabled="confirmStatus" @click="confirm()">确定</a>
            </div>
        </div>

    </div>
</template>

<script>
import { mapActions } from 'vuex'
import * as types from '@s/store/shareApi/type.js'
export default {
  data () {
    return {
      account: '', // 账号
      drawMoneyPwd: '', // 取款密码
      validCode: '', // 验证码
      validCodeSrc: '',
      // warn 设定
      errMsg: {
        zhuceYm: {
          status: '',
          warn: ''
        },
        errName: 'reg'
      },
      msgWarnAcc: '', // 账号错误提示
      msgWarnPwd: '', // 取款密码错误提示
      msgWarnCode: '', // 验证码错误提示
      confirmStatus: true // 提交状态
    }
  },
  mounted () {
    this.$store.state.h5Home.headerType = 3
    this.$store.state.h5Home.headTitle = '忘记密码'
    this.$store.state.h5Home.headLeft = 'icon-back'
    this.$store.state.h5Home.headRight = 'icon-online'
    this.clickYZM()
  },
  watch: {
    account (val) {
      if (val !== '' && val.length >= 6) {
        this.msgWarnAcc = ''
        this.monitorStatus()
      }
    },
    drawMoneyPwd (val) {
      if (val !== '' && val.length === 4) {
        this.msgWarnPwd = ''
        this.monitorStatus()
      }
    },
    validCode (val) {
      if (val !== '') {
        this.msgWarnCode = ''
        this.monitorStatus()
      }
    }
  },
  methods: {
    ...mapActions({
      forgotPasswordAction: types.FORGOT_PASSWORD_ACTION // 忘记密码
    }),
    // 按钮的置灰状态监听
    monitorStatus () {
      if (this.account.length >= 6 && this.drawMoneyPwd.length === 4 && this.validCode !== '') {
        this.confirmStatus = false
      } else {
        this.confirmStatus = true
      }
    },
    // 用户名提示语
    verifyAccount () {
      if (this.account === '' || this.account === null || !this.account) {
        this.msgWarnAcc = '请输入账号'
        return false
      }
      this.account = this.account.replace(/[^0-9a-zA-Z]/ig, '')
      if (!isNaN(this.account.slice(0, 1))) {
        this.msgWarnAcc = '账号首位必须为英文字母'
        return false
      } else {
        let reg1 = /^[a-zA-Z]{6,12}$/
        let reg2 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
        if (!reg1.test(this.account) && !reg2.test(this.account)) {
          this.msgWarnAcc = '字母开头6-12位字母或数字组合'
          return false
        }
      }
    },
    // 取款密码提示语
    verifyDrawMoney () {
      if (this.drawMoneyPwd === '') {
        this.msgWarnPwd = '请输入取款密码'
        return false
      }
      if (this.drawMoneyPwd.length < 4) {
        this.msgWarnPwd = '取款密码为4位纯数字'
        return false
      }
    },
    // 验证码提示语
    verifyValidCode () {
      if (this.validCode === '') {
        this.msgWarnCode = '请输入验证码'
        return false
      }
    },
    // 账号输入规则限制
    accountFun (account) {
      // this.account = account.replace(/[^0-9a-z]/ig, '')
      this.account = window.common.login.toLowerCaseStr(this.account)
      if (!this.confirmStatus) this.monitorStatus()
    },
    // 取款密码 输入规则限制
    setDrawMoneyPwd (event, drawMoneyPwd) {
      let pass = event.currentTarget.value
      let value = pass.replace(/[^0-9]+/g, '')
      if (value.length > 4) { // 最大长度只能是4位
        this.drawMoneyPwd = value.substr(0, 4)
      } else if (value === '') {
        this.drawMoneyPwd = ''
      } else {
        this.drawMoneyPwd = value
      }
      if (!this.confirmStatus) this.monitorStatus()
    },
    // 验证码输入监听
    code (val) {
      this.validCode = val.replace(/[^0-9a-zA-Z]/ig, '')
      if (!this.confirmStatus) this.monitorStatus()
    },
    // 获取验证码
    inputclick () {
      if (!this.validCodeSrc) {
        this.clickYZM()
      }
    },
    clickYZM () {
      this.validCodeSrc = '/member/code?t=' + new Date().getTime()
    },
    // 提交
    confirm () {
      // 判断是否开启置灰，如开启 则跳出
      if (this.confirmStatus) {
        return
      }
      this.$store.dispatch('forgotPassword.action', { 'account': this.account, 'drawMoneyPwd': this.drawMoneyPwd, 'validCode': this.validCode }).then(res => {
        if (res.status === window.common.statusConst.SUCCESS) {
          window.layer.msgWarn(res.msg, function () {
            window.router.push('/wap/login')
          })
        }
      }, res => {
        this.clickYZM()
      })
    }
  },
  computed: {
    showForget () {
      return window.store.state.shareApi.showForget
    },
    commonImgUrl () {
      return this.$store.state.home.commonImgUrl
    }
  }
}
</script>
