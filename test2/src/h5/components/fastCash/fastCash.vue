<template>
    <div class="common-main main-box" v-if="onlineDraw.memberInfo">
        <div class="yo-form-item bank-info">
            <h5 class="title">银行卡</h5>
            <div>
                <div class="bank-name">{{onlineDraw.memberBankName}}</div>
                <div class="bank-code" v-if="onlineDraw.memberInfo.bankAccount">**** **** **** {{onlineDraw.memberInfo.bankAccount.slice(-4)}}</div>
            </div>
        </div>
        <div class="yo-form-content">
            <h6 class="form-title grey-txt">提现金额</h6>
            <div class="feed-in-sum">
                <i class="yo-icon icon-mony"></i> <!-- 金额输入框最大长度为14 OT-4721 -->
                <input type="tel" oninput="value=value.replace(/[^\d]/g,'');if(value.length>9)value=value.slice(0,14)"
                       v-model="withDrawMoney" :placeholder="placeHoderTips"
                       style="width: calc(100% - (50px));">
            </div>
        </div>
        <div class="yo-form-item bg-transparent">
            <h5 class="title tips-txt">账户余额¥{{ onlineDraw.money | moneyFilter }}</h5>
            <h5 class="title tips-txt con-txt" @click="withDrawAll()">全部提现</h5>
        </div>
        <div class="public-footer common-footer">
          <div class="but-footer yow-content">
              <a href="javascript:void(0);" class="btn btn-primary btn-lg btn-block" @click="handleSubmit()">提现</a>
          </div>
      </div>
    </div>
</template>

<script>
import * as type from '@m/store/payment/type'
export default {
  data () {
    return {
      status: false,
      memberBankName: '', // 银卡名称
      bankAccount: '', // 银行卡号
      withDrawMoney: '' // 取款金额
    }
  },
  computed: {
    placeHoderTips () {
      if (this.onlineDraw.quantitySet.drawLowOnline) {
        return `请输入${this.onlineDraw.quantitySet.drawLowOnline}-${this.onlineDraw.quantitySet.drawUpOnline}元`
      } else {
        return ``
      }
    },
    onlineDraw () {
      return this.$store.state.payment.onlineDraw
    }
  },
  watch: {
    withDrawMoney (val) {
      let firstInput = String(val).slice(0, 1)
      if (firstInput === '0') {
        this.withDrawMoney = ''
      }
      if (val > this.onlineDraw.quantitySet.drawUpOnline) {
        this.withDrawMoney = Math.floor(this.onlineDraw.quantitySet.drawUpOnline)
      }
    }
  },
  methods: {
    // 点全部体现
    withDrawAll () {
      this.withDrawMoney = Math.floor(this.onlineDraw.money)
      this.checkMoney()
    },
    checkMoney () {
      // 用户没钱
      if (!this.withDrawMoney) {
        window.layer.msgWarn('您的余额小于最低提款金额，去多多盈利再来提款吧！')
        return false
      }
      // 钱 < 最小提现
      if (this.withDrawMoney < this.onlineDraw.quantitySet.drawLowOnline) {
        window.layer.msgWarn('您的余额小于最低提款金额，去多多盈利再来提款吧！')
        return false
      }
    },
    handleSubmit () {
      if (this.withDrawMoney > this.onlineDraw.money) {
        window.layer.msgWarn('当前余额不足')
        return false
      }
      if (this.withDrawMoney.length === 0) {
        window.layer.msgWarn(`最低提款限额为:${this.onlineDraw.quantitySet.drawLowOnline}元`)
        return false
      } else {
        if (this.withDrawMoney < this.onlineDraw.quantitySet.drawLowOnline) {
          window.layer.msgWarn(`最低提款限额为:${this.onlineDraw.quantitySet.drawLowOnline}元`)
          return false
        }
        if (this.onlineDraw.quantitySet.moneyDraw1 === 0) {
          sessionStorage.setItem('withDrawMoney', this.withDrawMoney)
          this.$router.push('/wap/common/cashPassword')
        }
        if (this.onlineDraw.quantitySet.moneyDraw1 > 0) {
          window.layer.confirm(`您好，由于您在${this.onlineDraw.quantitySet.repeatTimeNumDraw}小时内超出免收出款手续费${this.onlineDraw.quantitySet.freeTimesDraw}次，本次取款将收取您取款手续费${this.onlineDraw.quantitySet.moneyDraw1}元`, () => {
            sessionStorage.setItem('withDrawMoney', this.withDrawMoney)
            this.$router.push('/wap/common/cashPassword')
          }, () => {
            this.$router.push('/wap/basicsInfo')
          })
        }

        if (this.onlineDraw.quantitySet.moneyDraw1 > 0 && this.withDrawMoney < this.onlineDraw.quantitySet.moneyDraw1) {
          window.layer.msgWarn(`取款金额不足以抵扣手续费，请重新输入！`, () => {

          })
        }
      }
    },
    initDrawData () {
      // 非空时不做重复初始化
      if (window.$.isEmptyObject(this.$store.state.payment.onlineDraw)) {
        this.$store.dispatch(type.INIT_DRAW_DATA_ACTION, { bankType: 0 }).then(res => {
          sessionStorage.setItem('quantitySet', JSON.stringify(res.data.quantitySet))
          if (res.status === '1') {
            if (this.type === 1) {
              window.layer.msgWarn('对不起，快速取款功能不对试玩账号开放！')
            } else {
              window.layer.msgWarn('为保证您的权益，请先绑定您的出款资讯', () => {
                // sessionStorage.setItem('switchPages', '/wap/common/fastCash') // 改为重新请求接口获取数据
                this.$authJumpUrl('wap/addCard', {
                  needLogin: true,
                  forbidTryUser: true,
                  text: '快速取款功能'
                })
              })
            }
          }
        }).catch(res => {
          console.log('INITPAYMENT store error')
        })
      }
    }
  },
  mounted () {
    this.initDrawData()
    this.$store.state.h5Home.headerType = 3
    this.$store.state.h5Home.headTitle = '快速取款'
    this.$store.state.h5Home.headLeft = 'icon-back'
    this.$store.state.h5Home.headRight = 'icon-online'
    this.$store.state.h5Home.showFoot = false
  }
}
</script>
