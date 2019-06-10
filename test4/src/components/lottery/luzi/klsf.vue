<template>
    <longshow :selectLuzi='selectLuzi' :luZiMapTXT="luZiMapTXT" v-if="getLoad"></longshow>
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
        {'code': 'zhAB', 'name': '总和大小'},
        {'code': 'zhCD', 'name': '总和单双'},
        {'code': 'zwAB', 'name': '总尾大小'}
      ],
      selectLuzi: 'klsfLuziShow'
    }
  },
  computed: {
    nowMode () {
      return this.$store.state.site.nowMode
    },
    getLoad () {
      if (this.$store.state.betZone.bettList.length > 0) {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    if (this.$store.state.site.nowMode === 2591000) {
      this.luZiMapTXT = []
    } else {
      switch (this.$store.state.site.nowTitle) {
        case '双面盘':
          this.luZiMapTXT = [
            {'code': 'zhAB', 'name': '总和大小'},
            {'code': 'zhCD', 'name': '总和单双'},
            {'code': 'zwAB', 'name': '总尾大小'}
          ]
          break
        case '单球1~8':
          this.luZiMapTXT = [
            {'code': 'zhAB', 'name': '总和大小'},
            {'code': 'zhCD', 'name': '总和单双'},
            {'code': 'zwAB', 'name': '总尾大小'}
          ]
          break
        case '第一球':
          this.luZiMapTXT = [
            {'code': 'dyiq', 'name': '第一球'},
            {'code': 'dyiAB', 'name': '大小'},
            {'code': 'dyiCD', 'name': '单双'}
          ]
          break
        case '第二球':
          this.luZiMapTXT = [
            {'code': 'derq', 'name': '第二球'},
            {'code': 'derAB', 'name': '大小'},
            {'code': 'derCD', 'name': '单双'}
          ]
          break
        case '第三球':
          this.luZiMapTXT = [
            {'code': 'dsanq', 'name': '第三球'},
            {'code': 'dsanAB', 'name': '大小'},
            {'code': 'dsanCD', 'name': '单双'}
          ]
          break
        case '第四球':
          this.luZiMapTXT = [
            {'code': 'dsiq', 'name': '第四球'},
            {'code': 'dsiAB', 'name': '大小'},
            {'code': 'dsiCD', 'name': '单双'}
          ]
          break
        case '第五球':
          this.luZiMapTXT = [
            {'code': 'dwuq', 'name': '第五球'},
            {'code': 'dwuAB', 'name': '大小'},
            {'code': 'dwuCD', 'name': '单双'}
          ]
          break
        case '第六球':
          this.luZiMapTXT = [
            {'code': 'dliuq', 'name': '第六球'},
            {'code': 'dliuAB', 'name': '大小'},
            {'code': 'dliuCD', 'name': '单双'}
          ]
          break
        case '第七球':
          this.luZiMapTXT = [
            {'code': 'dqiq', 'name': '第七球'},
            {'code': 'dqiAB', 'name': '大小'},
            {'code': 'dqiCD', 'name': '单双'}
          ]
          break
        case '第八球':
          this.luZiMapTXT = [
            {'code': 'dbaq', 'name': '第八球'},
            {'code': 'dbaAB', 'name': '大小'},
            {'code': 'dbaCD', 'name': '单双'}
          ]
          break
      }
    }
  }
}
</script>
