<template>
  <longshow :selectLuzi='selectLuzi' :luZiMapTXT="luZiMapTXT" v-if="getLoad">
  </longshow>
</template>
<script>
import longshow from '../longshow'

export default {
  props: {
    loadDone: Boolean
  },
  components: {
    longshow
  },
  data () {
    return {
      luZiMapTXT: [
        { 'code': 'tbh', 'name': '特别号' },
        { 'code': 'cd', 'name': '单双' },
        { 'code': 'ab', 'name': '大小' }
      ],
      selectLuzi: 'lhcLuziShow'
    }
  },
  computed: {
    nowMode () {
      return this.$store.state.site.nowMode
    },
    getLoad () {
      if (this.$store.state.betZone.bettList.length > 0 && Number(this.$store.state.site.lotteryId) !== 24) {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    if (this.$store.state.site.nowMode === 2400000 || this.$store.state.site.nowMode === 2410000) {
      this.luZiMapTXT = [
        { 'code': 'tbh', 'name': '特别号' },
        { 'code': 'cd', 'name': '单双' },
        { 'code': 'ab', 'name': '大小' }
      ]
    } else {
      this.luZiMapTXT = []
    }
  }
}
</script>
