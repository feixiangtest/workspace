<template>
    <div class="yo-page-body" >
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
  data () {
    return {
    }
  },
  computed: {
  },
  components: {
    transactionRecordHeader,
    lotteryHistoryList
  },
  methods: {
  },
  created () {
    this.$store.state.transactionRecord.openRecordBox = 0
  }
}
</script>

