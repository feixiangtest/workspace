<template>
    <div class="contentBox onlineDeposit">
        
        <!--根据文案状态暂时不同的内容-->
        <payTab v-if="level === 0"></payTab>

        <!--支付页面，此处不使用动态路由-->
        <div class="modeOfPayment">

            <onlineDeposit id="onlineDeposit" v-if="level === 1"></onlineDeposit>

            <offlineDeposit id="bankTransfer" v-if="level === 2"></offlineDeposit>

        </div>
        
    </div>
</template>

<script>
  import * as types from '@m/store/payment/type'
  import payTab from './payTab.vue'
  // 线上入款路由
  import onlineDeposit from './onlineDeposit/onlineDeposit'
  // 线下入款路由
  import offlineDeposit from './offlineDeposit/offlineDeposit'
  export default {
    data () {
      return {
      }
    },
    components: {
      payTab,
      onlineDeposit,
      offlineDeposit
    },
    computed: {
      level () { // 当前的层级，0表示默认页，1表示在线支付页面，2表示线下入款页面
        return this.$store.state.payment.level
      }
    },
    mounted () {
      // 每次点击线上存款跳转的都是默认页
      this.$store.state.payment.level = 0
      this.init()
      this.$store.state.member.account = JSON.parse(window.localStorage.getItem('userInfo'))
    },
    methods: {
      // 初始化支付接口
      init () {
        if (!window.navigator.onLine) {
          window.layer.msgWarn('网络连接异常，请检查您的网络！')
        } else {
          let param = {
            'terminal': 'PC' // MOB代表手机，PC代表电脑端
          }
          this.$store.dispatch(types.GO_ONLINE_PAY_ACTION, param).then(res => {
          }).catch(res => {
            console.log(' INITPAYMENT store error')
          })
        }
      }
    }
  }
</script>
