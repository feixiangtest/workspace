<template>
  <div style="background: #fff; width: 100%; height: 100%;position: fixed;">
    <div class="header yo-home-nav">
        <div class="center">
            <div class="hea-menu hea-left">
                <a href="javascript:;" @click="goback()"><i class="yo-icon icon-arrows-left"></i></a>
            </div>
            <div class="header-text titile">
                <h1>忘记密码</h1>
            </div>
            <div class="hea-user hea-right">
                <!--<a href="javascript:;"><span>试玩</span><i class="yo-icon icon-account"></i></a>-->
            </div>
        </div>
    </div>
    <div class="centerBox mainCenter" >
       <div class="depositMain onlineDraw">
            <dl class="secondForm">
                <dd>
                    <div class="formIput">
                        <span class="itemTxt">会员账号</span>
                        <div class="specialbox">
                            <input class="typeinput input-one" type="text" v-model="account" @input="accountFun(account)">
                        </div>
                    </div>
                </dd>
                <dd>
                    <div class="formIput">
                        <span class="itemTxt">取款密码</span>
                        <div class="specialbox">
                            <input class="typeinput input-one" type="tel" v-model="drawMoneyPwd" @input="setDrawMoneyPwd($event, drawMoneyPwd)">
                        </div>
                    </div>
                </dd>
                <dd>
                    <div class="formIput">
                        <span class="itemTxt">验证码</span>
                        <div class="specialbox">
                            <input class="typeinput input-one" type="text" placeholder="请点击" @click="inputclick()" v-model="checkCode" maxlength="6">
                            <span class="Tspe" style="right:42px;"><img class="imgEvents" :src="'/api/wap/wapLogin/validCode?t=' + validCodeSrc" @click="changeVCode()"></span>
                        </div>
                    </div>
                </dd>
            </dl>
        </div>
        <div class="yo-pad10 yo-pad-bot20"><button type="button" class="yo-anOne button " @click="confirm()">确认</button></div>
        <div class="online-service-help">
          <div class="hint">
            <span>温馨提示：如您注册时没有填写邮箱，请联系在线客服</span>
          </div>
          <div>
            <div class="contactBtn" @click="openOnlineService">
              <div class="div-icon floatL">
                <img :src="commonImgUrl + '/common/onlineService.png'" class="img-icon"/>
              </div>
              <div class="div-font floatL"><span>在线客服</span></div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import * as types from '@/base/store/home/type'
import * as statusCode from '@/base/utils/status_const'

export default {
  data () {
    return {
      account: '',
      checkCode: '',
      drawMoneyPwd: '',
      validCodeSrc: ''
    }
  },
  methods: {
    accountFun (account) {
      this.account = account.replace(/[^0-9a-z]/ig, '')
    },
    goback () {
      this.$router.push('/wap/index')
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
    confirm () {
      if (this.account === '' || this.account === null || !this.account) {
        window.layer.msgWarn('账号不能为空！')
        return false
      }
      if (this.drawMoneyPwd === '') {
        window.layer.msgWarn('取款密码不能为空！')
        return false
      }
      if (this.checkCode === '') {
        window.layer.msgWarn('验证码不能为空！')
        return false
      }
      this.$store.dispatch(types.FORGOT_PASSWORD_ACTION, {'account': this.account, 'drawMoneyPwd': this.drawMoneyPwd, 'checkCode': this.checkCode}).then(res => {
        this.changeVCode()
        if (res.status === statusCode.statusConst.SUCCESS) {
          window.layer.msgWarn(res.msg, function () {
            window.layer.close()
            window.router.push('/wap/login')
          })
        }
      })
    },
    inputclick () {
      if (!this.validCodeSrc) {
        this.changeVCode()
      }
    },
    changeVCode () {
      this.validCodeSrc = '/validCode?t=' + Math.random()
    },
    // 打开在线客服
    openOnlineService () {
      if (this.onLineService && this.onLineService.junctionSim) {
        window.location.href = this.onLineService.junctionSim
      }
    }
  },
  computed: {
    onLineService () {
      return this.$store.state.home.onlineservice
    },
    commonImgUrl () {
      return this.$store.state.home.commonImgUrl
    }
  },
  mounted () {
    console.info('forget')
  }
}
</script>

