<template> 
<div class="bet-list yoPageBody4 yoPagefix" v-show="this.$store.state.site.betListShow">
   <!-- disable-user-behavior  -->
    <betZone></betZone>
</div>  
</template>

<script>
import betZone from './betZone'
export default {
  components: {
    betZone
  },
  data () {
    return {
      // ifScroll: true // 是否可以上下滚动
    }
  },
  watch: {
    // nowTitle () { // 切换玩法的时候  初始化到顶部
    //   document.getElementById('play_area').scrollTop = 0
    // },
    // nowPosition (val) {
    //   if (val === 0) { // 在投注页面
    //     this.ifScroll = true
    //   } else { // 左菜单或者右菜单页面
    //     this.ifScroll = false
    //   }
    // },
    // lotteryId () { // 切换游戏的时候  初始化到顶部
    //   document.getElementById('play_area').scrollTop = 0
    // }
  },
  computed: {
    nowTitle () {
      return this.$store.state.site.nowTitle
    },
    nowPosition () {
      return this.$store.state.site.nowPosition
    },
    lotteryId () {
      return this.$store.state.site.lotteryId
    }
  },
  methods: {
  }
}
</script>

