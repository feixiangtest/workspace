<template>
  <publicG :data="dataList"></publicG>
</template>
<script>
import publicG from './publicG'
export default {
  data () {
    return {
      dataList: []
    }
  },
  components: {
    publicG
  },
  computed: {
    // 当前游戏类型
    routeName () {
      return this.$route.name
    }
  },
  methods: {
    // 设置数据
    setData () {
      switch (this.routeName) {
        case 'live': // 真人视讯
          this.dataList = this.$store.state.home.liveGameList || []
          break
        case 'sports': // 体育
          this.dataList = this.$store.state.home.sportList || []
          break
        case 'eGame': // 电子游戏
          this.dataList = this.$store.state.home.eGamesList || []
          break
        case 'chessGame': // 棋牌游戏
          this.dataList = this.$store.state.home.qpList || []
          break
        case 'fishingGame': // 捕鱼游戏
          this.dataList = this.$store.state.home.byGamesList || []
          break
        default: // 匹配不到
          this.dataList = []
      }
      // 判断断网情况
      window.indexMain.isOnLine()
      // 设置标题
      window.indexMain.setTitle()
    }
  },
  watch: {
    // 切换类型的监听
    routeName () {
      this.setData()
    }
  },
  mounted () {
    this.setData()
  }
}
</script>
