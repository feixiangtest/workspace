<template>
    <div>
        <fieldset class="payFieldset" v-show="pageLoad && rechargeVoList && rechargeVoList.length > 0">
            <legend >请选择存款方式</legend>
            <!--非文字类型，调用的是payMent.js内配置好的格式-->
            <div>
                <!--顶部的logo，根据文案状态显示，如果在线文案关闭则不显示-->
                <dl class="clearfix paymentImg paylistStyle payImg">
                    <dd v-for="(payment,index) in rechargeVoList"
                        :key="'payList_' + index"
                        @click="choosePay(payment)">
                        <img :src="payment.picAddr">
                    </dd>
                </dl>
            </div>
        </fieldset>
        <div v-if="pageLoad && rechargeVoList.length < 1" style="text-align: center; margin-top: 20%;">
          未开通支付通道，请<a href="javascript:void(0);" class="btn btn-refresh btn-primary" @click="$openChatWin">联系客服</a>
        </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  import * as payMents from '@m/config/payMent'
  export default {
    data () {
      return {
        payMent: payMents, // 存款方式选择，写死的
        commonImgUrl: '/resource/core/images/payment/', // 图片统一前缀
        tips: false // 没有支付数据时显示
      }
    },
    methods: {
      // 大类选择当前支付，bankType为当前的选中支付key
      choosePay (payment) {
        if (window.common.isFree()) {
          window.layer.msgWarn('对不起，线上存款不对试玩账号开放！')
          return
        }
        // 自定义支付，直接使用地址跳出
        if (payment.custFlag === '1') {
          window.open(payment.netPrefix + payment.netAddr, '_blank')
          return
        }
        // 储存支付
        this.$store.state.payment.payType = payment
        // 线上支付
        if (payment.onlineFlag === '0') {
          this.$store.state.payment.level = 1
        } else {
          // 设置默认选中的线下入款参数
          if (payment.companyAccountChargeVoList && payment.companyAccountChargeVoList.length > 0) {
            this.$store.state.payment.offlineDeposit = payment.companyAccountChargeVoList[0]
          }
          // 线下入款层级
          this.$store.state.payment.level = 2
        }
      },
      // 在线支付选择支付
      chooseOnlinePay (bankKey, bankType) {
        if (window.common.isFree()) {
          window.layer.msgWarn('对不起，线上存款不对试玩账号开放！')
          return
        }
        // 将当前选中的支付存储
        this.$store.state.payment.payType = this.depositMap[bankKey]
        // 如果不等于线下入款
        if (bankKey.indexOf('offline') === -1) {
          // 储存当前支付的key
          this.$store.state.payment.bankkey = bankKey
          // 当前显示的层级
          this.$store.state.payment.level = 1
        } else { // 线下入款的处理
          // 获取到线下入款的存取款设定
          this.$store.state.payment.payType = this.depositMap.offlinePay
          // 存储当前的线下入款的类型
          this.$store.state.payment.bankType = bankType
          // 展示线下入款层级
          this.$store.state.payment.level = 2
          // 支付编码
          this.$store.state.payment.bankkey = 'bankPay'
        }
      },
      // 其他支付
      otherPay (url) {
        window.open(url, '_blank')
      }
    },
    mounted () {
    },
    computed: {
      ...mapState({
        pageLoad: state => state.payment.pageLoad,
        rechargeVoList: state => state.payment.rechargeVoList, // 支付列表数据
        payType: state => state.payment.payType, // 当前支付
        fastDfsUrl: state => state.shareApi.fastDfsUrl // 静态资源地址
      })
    },
    updated () {
      // 如果没有支付的数据则显示提示
      if (window.$('.paymentItem').length === 0 && window.$('.payImg').length === 0) {
        this.tips = true
      }
    }
  }
</script>
