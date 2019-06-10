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
      luZiMapTXT: [
            {'code': 'zhAB', 'name': '总和大小'},
            {'code': 'zhCD', 'name': '总和单双'},
            {'code': 'lhh', 'name': '龙虎和'}
      ],
      selectLuzi: 'sscLuziShow'
    }
  },
  mounted () {
    if (this.nowTitle === '万位') {
      this.luZiMapTXT = [
        {'code': 'ww', 'name': '万位'},
        {'code': 'wAB', 'name': '大小'},
        {'code': 'wCD', 'name': '单双'}
      ]
    } else if (this.nowTitle === '仟位') {
      this.luZiMapTXT = [
        {'code': 'qw', 'name': '仟位'},
        {'code': 'qAB', 'name': '大小'},
        {'code': 'qCD', 'name': '单双'}
      ]
    } else if (this.nowTitle === '佰位') {
      this.luZiMapTXT = [
        {'code': 'bw', 'name': '佰位'},
        {'code': 'bAB', 'name': '大小'},
        {'code': 'bCD', 'name': '单双'}
      ]
    } else if (this.nowTitle === '拾位') {
      this.luZiMapTXT = [
        {'code': 'sw', 'name': '拾位'},
        {'code': 'sAB', 'name': '大小'},
        {'code': 'sCD', 'name': '单双'}
      ]
    } else if (this.nowTitle === '个位') {
      this.luZiMapTXT = [
        {'code': 'gw', 'name': '个位'},
        {'code': 'gAB', 'name': '大小'},
        {'code': 'gCD', 'name': '单双'}
      ]
    } else if (this.nowTitle === '整合') {
      this.luZiMapTXT = [
        {'code': 'zhAB', 'name': '总和大小'},
        {'code': 'zhCD', 'name': '总和单双'},
        {'code': 'lhh', 'name': '龙虎和'}
      ]
    } else {
      this.luZiMapTXT = []
    }
  },
  computed: {
    nowMode () {
      return this.$store.state.site.nowMode
    },
    /**
     * 当前游戏玩法名称
     */
    nowTitle () {
      return this.$store.state.site.nowTitle
    }
  }
}
</script>
