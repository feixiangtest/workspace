<template>
  <div class="yoCenterCon">
    <div :id="['page-'+lotteryType]" :title="this.$store.state.site.nowTitle" class="yotou22">
      <!-- <lotteryNavigation v-if="!isMmc"></lotteryNavigation>
      <lotteryMmcNavigation v-if="isMmc"></lotteryMmcNavigation> -->
      <playArea></playArea>
      <awardOpen></awardOpen>
      <countDownAward></countDownAward>
    </div>
    <loading></loading>
  </div>
</template>
<script>
import playArea from './playArea'
// import lotteryNavigation from './lotteryNavigation'
// import lotteryMmcNavigation from './lotteryMmcNavigation'
import awardOpen from './awardOpen'
import countDownAward from './countDownAward'
import loading from '../loading'
import * as lotteryMap from 'config/lotteryMap'
export default {
  components: {
    // lotteryNavigation,
    // lotteryMmcNavigation,
    playArea,
    awardOpen,
    loading,
    countDownAward
  },
  data () {
    return {
    }
  },
  computed: {
    /**
     * 是否是秒秒彩
     */
    // isMmc () {
    //   if (this.nowCode === 'mmc') {
    //     return true
    //   } else {
    //     return false
    //   }
    // },
    /**
     * 根据路由计算出彩票
     */
    nowCode () {
      let path = this.$route.fullPath.split('/')
      return path[2]
    },
    /**
     * 彩票大类
     */
    lotteryType () {
      let nowLotteryType = ''
      nowLotteryType = lotteryMap.getLotteryType[this.nowCode]
      this.$store.state.site.lotteryType = nowLotteryType
      return nowLotteryType
    },
    showBetLoading () {
      return this.$store.state.site.showBetLoading
    },
    awardShow () {
      return this.$store.state.site.awardShow
    }
  },
  watch: {
    awardShow (val) {
      if (typeof val === 'boolean') {
        this.$store.state.site.betListShow = !val
      }
    }
  }
}
</script>

