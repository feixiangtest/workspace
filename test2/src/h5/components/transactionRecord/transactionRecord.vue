<template>
  <div class="more-list-box">
    <transactionRecordHeader></transactionRecordHeader>
    <div class="centerBox mainCenterTwo ">
      <lotteryHistoryList></lotteryHistoryList>
    </div>
  </div>
</template>

<script>
  import transactionRecordHeader from './transactionRecordHeader'
  import lotteryHistoryList from './lotteryHistoryList'
  export default {
    // 引入投注记录头部和内容组件
    components: {
      transactionRecordHeader,
      lotteryHistoryList
    },
    // 设置打开的是投注记录页面还是往来记录页面标识
    created () {
      this.$store.state.transactionRecord.openRecordBox = 0
    }
  }
</script>

