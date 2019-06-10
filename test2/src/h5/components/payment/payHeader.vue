<template>
    <div class="payHeader">
        <div class="yo-form-item" @click="showPayList(0)">
            <h5 class="title">充值方式</h5>
            <p class="con-txt con-head">
                <img v-if="payType.picAddr" :src="payType.picAddr"
                                    class="pay-header-logo"/>&nbsp;
                <span>{{payType.rechargeName}}</span>&nbsp;
                <img v-if="payType.smlBtn" :src="cdnUrl + '/public/sml/' + [payType.smlBtn] + '.svg'"
                                    class="pay-header-smlBtn">&nbsp;
                <i class="yo-icon icon-next"></i>
            </p>
        </div>
        <div class="yo-mask-layer" v-if="showPay">
            <div class="mask-box"></div>
            <div class="layer-pay-box">
                <div class="pay-box-titile">
                    <span class="Cancel"  @click="showPayList(1)">取消</span>
                    <h5>选择支付方式</h5>
                    <span class="sure"></span>
                </div>
                <div class="pay-box-content">
                    <dl>
                        <dd v-for="(payment,index) in rechargeVoList"
                            :key="index" @click="changePayment(payment)">
                            <h2>
                                <img :src="payment.picAddr"
                                    class="pay-header-logo"/>{{payment.rechargeName}}&nbsp;&nbsp;
                                <img v-if="payment.smlBtn"
                                     :src="cdnUrl + '/public/sml/' + [payment.smlBtn] + '.svg'"
                                    class="pay-header-smlBtn">
                            </h2>
                            <label class="mint-checklist-label">
                                <span class="mint-checkbox is-right">
                                <input type="radio" class="mint-checkbox-input" name="radio"
                                    :checked="payType.id === payment.id">
                                <span class="mint-checkbox-core"></span>
                                </span>
                            </label>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      corner: ['', 'fast', 'safety', 'Stable', 'hot', 'fire', 'big'], // 角标对应图片
      status: true,
      showPay: false,
      isOpen: true // 用于限制点击过快处理
    }
  },
  methods: {
    showPayList (openType) {
      if (openType === 1) {
        window.indexMain.appHiddenOverflow(false, 'payment')
        this.showPay = false
      } else {
        window.indexMain.appHiddenOverflow(true, 'payment')
        this.showPay = true
        window.$('input, textarea').blur()// 控制软键盘消失
      }
    },
    // 选择支付
    changePayment (payment) {
      if (this.isOpen) {
        // 限制1秒才允许再次点击
        this.isOpen = false
        // 储存支付 加工
        if (!payment.deposite) {
          payment.deposite = {
            max: false,
            min: false
          }
          console.log('储存支付 加工')
        }
        this.$store.state.payment.payType = payment
        // 自定义支付
        if (payment.custFlag === '1') {
          this.$router.push('/wap/payment/custDeposit')
          // 自定义支付非首位直接打开新窗口
          if (this.rechargeVoList[0].id !== payment.id) {
            let url = payment.netPrefix + payment.netAddr
            try { // IOS打包后 iPhone5c不能正常跳转第三方
              window.open(url)
            } catch (error) {
              window.location.href = url
            }
          }
        } else {
        // 线上支付，跳转至线上支付路由
          if (payment.onlineFlag === '0') {
            this.$router.push('/wap/payment/onlinePay')
          } else {
          // 设置默认选中的线下入款参数
            if (payment.companyAccountChargeVoList && payment.companyAccountChargeVoList.length > 0) {
              this.$store.state.payment.offlineDeposit = payment.companyAccountChargeVoList[0]
            }
            this.$router.push('/wap/payment/offlinePay')
          }
        }
        // 关闭弹窗
        this.showPayList(1)
        setTimeout(() => {
          this.isOpen = true
        }, 1000)
      }
    }
  },
  computed: {
    ...mapState({
      rechargeVoList: state => state.payment.rechargeVoList, // 支付列表数据
      payType: state => state.payment.payType, // 当前支付
      cdnUrl: state => state.payment.cdnUrl, // 公共CDN
      h5img: state => state.h5Home.h5img, // 公共图片
      fastDfsUrl: state => state.shareApi.fastDfsUrl // 静态资源地址
    })
  }
}
</script>
