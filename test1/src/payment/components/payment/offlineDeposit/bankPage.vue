<template>
  <div class="paymentMain">
    <div v-if=" isOnline && isOnline == 1" id="paymentRecharge">
      <!--银行入款-->
      <bankPay v-if="nowBankType === 16"></bankPay>
      <!--其他线下入款（支付宝、微信、QQ、财付通、云闪付）支付信息-->
      <publicSubmit v-if="nowBankType !== 16"></publicSubmit>
    </div>
  </div>
</template>

<script>
  import bankPay from '@/payment/components/payment/offlineDeposit/bankPay'
  import publicSubmit from '@/payment/components/payment/offlineDeposit/publicSubmit'
  export default {
    components: {
      bankPay,
      publicSubmit
    },
    computed: {
      nowBankType () {
        return this.$store.state.payment.bankType
      },
      isOnline () {
        return this.$store.state.payment.isOnline
      }
    },
    mounted () {
      window.$(document).off('contextmenu.gpo')
    }
  }
</script>


