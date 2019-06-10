<template>
  <div class="public-tab">
    <ul>
      <li :class="{active: openRecordBox === 0}" @click="changeTab(0)">投注记录</li>
      <li :class="{active: openRecordBox === 1}" @click="changeTab(1)">往来记录</li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    computed: {
      transactionRecordTitle () {
        return this.$store.state.transactionRecord.transactionRecordTitle
      },
      openRecordBox () {
        return this.$store.state.transactionRecord.openRecordBox
      }
    },
    created () {
      this.$store.state.h5Home.headerType = 3
      this.$store.state.h5Home.headTitle = '交易记录'
      this.$store.state.h5Home.headLeft = 'icon-back'
      this.$store.state.h5Home.headRight = ''
    },
    methods: {
      changeTab (openRecordBox) {
        if (openRecordBox === 0) {
          this.$router.push('/wap/transactionRecord')
        } else {
          this.$router.push('/wap/historyRecord')
        }
        this.$store.state.transactionRecord.openRecordBox = openRecordBox
      },
      goBack () {
        this.$router.push('/wap/memberCenter/index')
      },
      GoHome () {
        this.$router.push('/wap/index')
      }
    }
  }
</script>

