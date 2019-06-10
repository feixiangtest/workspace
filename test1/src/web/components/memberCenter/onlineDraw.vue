<template>
    <div>
        <div class="header yo-home-nav">
            <div class="center">
            <div class="hea-menu hea-left">
                <a href="javascript:;" @click="goback()"><i class="yo-icon icon-arrows-left"></i></a>
            </div>
            <div class="header-text titile">
                <h1>提款</h1>
            </div>
            <div class="hea-user hea-right">
                <a href="javascript:;" @click="GoHome()"><i class="yo-icon icon-home"></i></a>
            </div>
            </div>
        </div>
        <div class="centerBox mainCenter" v-if="this.onlineDraw.memberInfo">
            <div class="depositMain onlineDraw">
                <dl class="rechargebox">
                    <dd>
                      <div class="item-input">
                        <span class="itemTxt">银行</span>
                        <div class="itemContent">{{this.onlineDraw.memberBankName}}</div>
                      </div>
                    </dd>
                    <dd>
                      <div class="item-input">
                        <span class="itemTxt">卡号</span>
                        <div class="itemContent">{{this.onlineDraw.memberInfo.bankAccount}}</div>
                      </div>
                    </dd>
                    <dd>
                        <div class="item-input">
                            <span class="itemTxt">提现金额</span>
                            <div class="specialbox specialbox2">
                                <input class="typeinput input-one input-content" v-model="drawMoney" type="tel" :placeholder="place" @input="drawMoneyInput">
                                <div class="all-take-out" @click="allTakeOut()">全部提现</div>
                                <span class="remaining-sum-text">当前余额：{{this.onlineDraw.money}}元</span>
                            </div>
                        </div>
                    </dd>
                    <dd>
                        <div class="item-input">
                            <span class="itemTxt">取款密码</span>
                            <div class="specialbox specialbox2">
                                <input class="typeinput input-one input-content" v-model="drawMoneyPwd" type="password" placeholder="请输入取款密码" maxlength="4">
                            </div>
                        </div>
                    </dd>
                </dl>
                <div class="yo-pad10 yo-pad-bot20"><button type="button" class="yo-anOne button" @click="submit()">{{this.buttonMsg}}</button></div>
            </div>
        </div>
    </div>
</template>

<script>
import * as type from '@/base/store/payment/type'
export default {
  data () {
    return {
      drawMoney: '', // 出款金额
      drawMoneyPwd: '', // 出款密码
      buttonMsg: '提交',
      isOpen: true // 用于限制点击过快处理
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    GoHome () {
      this.$router.push('/wap/index')
    },
    // 初始化数据
    initDrawData () {
      // 非空时不做重复初始化
      if (window.$.isEmptyObject(this.$store.state.payment.onlineDraw)) {
        this.$store.dispatch(type.INIT_DRAW_DATA_ACTION, {bankType: 0}).then(res => {
          if (res.status === '0') {
            window.layer.msgWarn(res.msg, function () {
              window.router.push('/wap/memberCenter/bindBankcard')
            })
          }
        }).catch(res => {
          console.log(' INITPAYMENT store error')
        })
      }
    },
    // 全部提现功能
    allTakeOut () {
      // 如果余额大于最大可提现金额，直接取最大可提现金额，否则取余额
      if (this.onlineDraw.money > this.onlineDraw.quantitySet.drawUpOnline) {
        this.drawMoney = this.onlineDraw.quantitySet.drawUpOnline
      } else {
        this.drawMoney = parseInt(this.onlineDraw.money)
      }
      // 金额太小不允许提款
      if (this.drawMoney < this.onlineDraw.quantitySet.drawLowOnline) {
        window.layer.msgWarn('您的余额小于最低提款金额，去多多盈利再来提款吧！')
        return false
      }
    },
    /**
     * 出款输入框验证
     */
    drawMoneyInput () {
      if (this.drawMoney === '' || this.drawMoney === null) {
        return
      }
      this.drawMoney = this.drawMoney.replace(/[^0-9]+/g, '')
      if (this.drawMoney < 0) {
        this.drawMoney = 0
      } else {
        if (this.drawMoney !== '') {
          this.drawMoney = Number(this.drawMoney)
        }
        if (this.drawMoney > this.onlineDraw.quantitySet.drawUpOnline) {
          this.drawMoney = this.onlineDraw.quantitySet.drawUpOnline
        }
      }
    },
    moneyInput () {
      // 金额太小不允许提款
      if (this.drawMoney < this.onlineDraw.quantitySet.drawLowOnline) {
        window.layer.msgWarn('您的余额小于最低提款金额，去多多盈利再来提款吧！')
        return false
      }
    },
    submit () {
      if (this.drawMoney > this.onlineDraw.quantitySet.drawUpOnline) {
        window.layer.msgWarn('最高提款金额为：' + this.onlineDraw.quantitySet.drawUpOnline)
        return false
      }
      if (this.drawMoney < this.onlineDraw.quantitySet.drawLowOnline) {
        window.layer.msgWarn('最低提款金额为：' + this.onlineDraw.quantitySet.drawLowOnline)
        return false
      }
      if (this.drawMoneyPwd === '' || this.drawMoneyPwd === null) {
        window.layer.msgWarn('密码不可以为空！')
        return false
      }
      if (this.isOpen) {
        this.buttonMsg = '提交中'
        // 判断如果有手续费，需要提示给客户在做提款操作
        let sxh = this.onlineDraw.quantitySet.moneyDraw1
        if (sxh > 0 && this.type !== '2') {
          let repeatTimeNumDraw = this.onlineDraw.quantitySet.repeatTimeNumDraw
          let freeTimesDraw = this.onlineDraw.quantitySet.freeTimesDraw
          var msg = '您好，由于您在' + repeatTimeNumDraw + '小时超出免收出款手续费' + freeTimesDraw + '次，本次出款将收取您取款手续费' + sxh + '元！'
          window.layer.confirm(msg, () => {
            this.submitRequest()
          })
        } else {
          this.submitRequest()
        }
      }
    },
    submitRequest () {
      let param = {
        drawPwd: this.drawMoneyPwd, // 取款密码
        currentTime: '',
        bankType: '0',
        cash: this.drawMoney // 取款金额
      }
      // 提交取款申请
      this.$store.dispatch(type.DRAW_MONEY_ACTION, param).then(res => {
        if (res.status === '1') {
          let cueDrawCheck = this.onlineDraw.quantitySet.cueDrawCheck
          let moneyDrawCheck = this.onlineDraw.quantitySet.moneyDrawCheck
          let timeNumDrawCheck = this.onlineDraw.quantitySet.timeNumDrawCheck
          if (Number(cueDrawCheck) === 1 && this.drawMoney >= moneyDrawCheck && this.type !== '2') {
            let content = '您提款的金额超过' + moneyDrawCheck + '需要审核，将于' + timeNumDrawCheck + '小时内到账，请耐心等候！'
            window.layer.msgWarn(content, function () {
              window.router.push('/wap/memberCenter/index')
            })
          } else {
            window.layer.msgWarn(res.msg, function () {
              window.router.push('/wap/memberCenter/index')
            })
          }
        }
      }).catch(res => {
        console.log(' DRAW_MONEY_ACTION store error')
      })
      // 限制两秒才允许再次点击开奖结果
      this.isOpen = false
      setTimeout(() => {
        this.isOpen = true
        this.buttonMsg = '提交'
      }, 1500)
    }
  },
  computed: {
    onlineDraw () {
      return this.$store.state.payment.onlineDraw
    },
    type () {
      return this.$store.state.home.type
    },
    place () {
      if (this.drawMoney === '' || this.drawMoney === null) {
        return '请输入' + this.onlineDraw.quantitySet.drawLowOnline + '-' + this.onlineDraw.quantitySet.drawUpOnline + '元'
      } else {
        return ''
      }
    }
  },
  created () {
    this.initDrawData()
  }
}
</script>
