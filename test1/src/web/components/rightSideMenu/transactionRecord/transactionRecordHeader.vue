<template>
    <div>
        <div class="header yo-home-nav">
            <div class="center">
                <div class="hea-menu hea-left">
                    <a href="javascript:;" @click="goBack()"><i class="yo-icon icon-arrows-left"></i></a>
                </div>
                <div class="header-text titile">
                    <h1>交易记录</h1>
                </div>
                <div class="hea-user hea-right">
                    <a href="javascript:;" @click="GoHome()"><i class="yo-icon icon-home"></i></a>
                </div>
            </div>
        </div>
        <div class="tab-nav stripedMenu fixationNav">
            <ul class="navigation newRecordUl">
                <li :class="{active: openRecordBox === 0}" @click="changeTab(0)"><a href="javascript:;">投注记录</a></li>
                <li :class="{active: openRecordBox === 1}" @click="changeTab(1)"><a href="javascript:;">往来记录</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    transactionRecordTitle () {
      return this.$store.state.transactionRecord.transactionRecordTitle
    },
    openRecordBox () {
      return this.$store.state.transactionRecord.openRecordBox
    }
  },
  methods: {
    changeTab (openRecordBox) {
      if (openRecordBox === 0) {
        // this.$store.state.transactionRecord.transactionRecordTitle = '彩票-历史交易'
        this.$router.push('/wap/transactionRecord')
      } else {
        this.$router.push('/wap/transactionRecord/historyRecord')
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

