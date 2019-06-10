<template>
  <div class="yow-content magt10" v-if="payType && payType.contextSim && payType.useStatus > 0">
    <p class="grey-cont yow grey-txt recharge-text-box" v-html="payType.contextSim">
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    payType () {
      return this.$store.state.payment.payType // 当前支付
    }
  }
}
</script>
