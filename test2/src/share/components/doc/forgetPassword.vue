<template>
  <div class="forgetBody zhezhao" v-if="showForget">
      <div class="newLoginBox">
          <div class="newLoginTitle">
              <span>忘记密码</span>
              <a href="javascript:;" @click="closeForget()"><i class="yo-pop-close"></i></a>
          </div>
          <div class="newLoginCent">
              <p class="textsz14">方法一、联系<a href="javascript:void(0)" @click="$openChatWin" class="logRei">在线客服</a>获取新密码</p>
              <p class="textsz14">方法二、通过邮箱获取密码</p>
              <div class="logFromItem">
                <div class="loginInput ">
                  <i class="input-ico acc"></i>
                  <input type="text" autocomplete="off" maxlength="12"
                  tabindex="1" v-model="account" @input="accountFun(account)" placeholder="请输入账号" >
                </div>
              </div>
              <div class="logFromItem">
                <div class="loginInput ">
                  <i class="input-ico pswd"></i>
                  <input type="password" autocomplete="off" maxlength="4"
                  tabindex="2" v-model="drawMoneyPwd" @input="setDrawMoneyPwd($event, drawMoneyPwd)"
                   placeholder="请输入取款密码">
                </div>
              </div>
              <div class="logFromItem">
                <div class="loginInput input-yzm">
                    <i class="input-ico yzm"></i>
                    <input type="text" autocomplete="off" tabindex="3" @click="inputclick()" v-model="validCode"
                    maxlength="4" placeholder="请输入验证码">
                </div>
                <img class="codeImg" :src="validCodeSrc" ref="validCodeSrc" @click="clickYZM()">
              </div>
              <p>会员账号及取款密码核对正确后,系统即自动发送邮件至会员资料内所设置之E-MAIL信箱!! </p>
              <a class="loginBut" id="js-btn-submit" href="javascript:void(0)" tabindex="4" @click="confirm()">确认送出</a>
          </div>
          <div class="newLoginBot"></div>
      </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        account: '',
        validCode: '',
        drawMoneyPwd: '',
        validCodeSrc: '',
        // warn 设定
        errMsg: {
          zhuceYm: {
            status: '',
            warn: ''
          },
          errName: 'reg'
        }
      }
    },
    methods: {
      closeForget () {
        this.account = ''
        this.drawMoneyPwd = ''
        this.validCode = ''
        this.$store.state.shareApi.showForget = false
      },
      accountFun (account) {
        this.account = account.replace(/[^0-9a-z]/ig, '')
      },
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
      },
      confirm () { // 提交
        if (this.account === '' || this.account === null || !this.account) {
          window.layer.msgWarn('账号不能为空！')
          return false
        }
        if (this.drawMoneyPwd === '') {
          window.layer.msgWarn('取款密码不能为空！')
          return false
        }
        if (this.validCode === '') {
          window.layer.msgWarn('验证码不能为空！')
          return false
        }
        this.$store.dispatch('forgotPassword.action', { 'account': this.account, 'drawMoneyPwd': this.drawMoneyPwd, 'validCode': this.validCode }).then(res => {
          if (res.status === window.common.statusConst.SUCCESS) {
            window.layer.msgWarn(res.msg, function () {
              window.layer.close()
            })
          }
        }, res => {
          this.clickYZM()
        })
      },
      inputclick () {
        if (!this.validCodeSrc) {
          this.clickYZM()
        }
      },
      clickYZM () {
        this.validCodeSrc = '/member/code?t=' + new Date().getTime()
      }
    },
    computed: {
      showForget () {
        return window.store.state.shareApi.showForget
      },
      commonImgUrl () {
        return this.$store.state.home.commonImgUrl
      }
    },
    mounted () {
      this.clickYZM()
    }
  }
</script>



