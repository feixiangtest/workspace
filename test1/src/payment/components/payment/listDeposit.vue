<template>
    <div v-if="official && official.contextSim && official.auditingStatus" style="padding-bottom: 50px;padding-top:10px">
      <div class="payitembox2 yo-pad10" v-html="official.contextSim">
      </div>
    </div>
</template>

<script>
// import * as payMents from '@/base/config/payMent'
export default {
  data () {
    return {
      // payMent: payMents // 存款的数据体
    }
  },
  methods: {
    setScrollRefreshTime () {
      this.$store.state.home.scrollRefreshTime = new Date().getTime()
    }
  },
  computed: {
    nowBankType () {
      return this.$store.state.payment.bankType
    },
    official () {
      return this.$store.state.payment.official
    }
  }
}
</script>
