<template>
    <longshow :selectLuzi='selectLuzi' :luZiMapTXT="luZiMapTXT"></longshow>
</template>
<script>
import longshow from '../longshow'

export default {
  components: {
    longshow
  },
  data () {
    return {
      luZiMapTXT: [],
      selectLuzi: 'kl8LuziShow'
    }
  },
  mounted () { // 不依赖 init
    this.initLuziMapTxt(this.$store.state.site.nowMode)
  },
  methods: {
    initLuziMapTxt (nowMode) {
      if (nowMode !== 2150100) { // 非正码
        this.luZiMapTXT = [
          {'code': 'kl8dx', 'name': '总和大小'},
          {'code': 'kl8ds', 'name': '总和单双'},
          {'code': 'kl8wu', 'name': '五行'}
        ]
      } else { // 正码
        this.luZiMapTXT = []
      }
    }
  },
  computed: {
    nowMode () {
      return this.$store.state.site.nowMode
    }
  },
  watch: {
    nowMode: function (val) {
      this.initLuziMapTxt(val)
    }
  }
}
</script>
