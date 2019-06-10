<template>
  <longshow :selectLuzi='selectLuzi' :luZiMapTXT="luZiMapTXT" :cssName="cssName"></longshow>
</template>
<script>
  import longshow from '../longshow'

  export default {
    components: {
      longshow
    },
    data () {
      return {
        cssName: '',
        luZiMapTXT: [],
        selectLuzi: 'syxwLuziShow'
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
    },
    methods: {
      initLuziMapTxt (title) {
        if (title === '两面') {
          this.luZiMapTXT = [
            {'code': 'zhAB', 'name': '总和大小'},
            {'code': 'zhCD', 'name': '总和单双'},
            {'code': 'lhh', 'name': '龙虎'}
          ]
          this.cssName = 'nav-tabs'
        } else {
          this.luZiMapTXT = []
        }
      }
    },
    watch: {
      nowTitle: function (title) {
        this.initLuziMapTxt(title)
      }
    },
    mounted () { // 不依赖 init
      this.initLuziMapTxt(this.$store.state.site.nowTitle)
    }
  }
</script>
