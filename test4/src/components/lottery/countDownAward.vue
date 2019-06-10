<template>
  <span style="display:none" v-if="lotteryId !== 100">{{reFreshTime}}</span>
</template>
<script>
import * as lotteryMap from 'config/lotteryMap'
export default {
  data () {
    return {
      reFreshTime: 9 // 页面右侧倒计时
    }
  },
  computed: {
    // 获取最新开奖结果请求次数
    getAwardTime () {
      return this.$store.state.award.awardTimes
    },
     // 取当前期数
    getCurrentPeriodCode () {
      return this.$store.state.betZone.currentPeriodNo
    },
    // 取赛果前十的第一条
    getTenAwwardForFrist () {
      if (this.$store.state.award.lotteryAwardTop10.length > 0) {
        return this.$store.state.award.lotteryAwardTop10[0]
      } else {
        return []
      }
    },
    lotteryId () {
      this.reFreshTime = 9
      this.$store.state.award.awardTimes = 0
      if (this.$store.state.award.timer2 !== null) {
        window.clearInterval(this.$store.state.award.timer2)
      }
      this.$store.state.award.timer2 = setInterval(this.reFresh, 1000)
      return this.$store.state.site.lotteryId
    }
  },
  methods: {
    period (period, isShort, lotteryId) {
      if (!period) return ''
      if (lotteryId === '24' || lotteryId === '64') {
        if (period.length <= 14) {
      // 六合彩返回3位
          return period.substr(-3)
        } else {
          return period.substr(-4)
        }
      }
      if (period.length === 15) {
        return period.slice(3, 11) + '-' + period.slice(11, period.length)
      } else {
        return period.slice(-11, -3) + '-' + period.slice(-3)
      }
    },
    // 右侧倒计时
    reFresh () {
      if (this.reFreshTime >= 1) {
        this.reFreshTime--
      }
      if (this.reFreshTime === 0) {
        // 最新一期开奖结果
        let newPeriod = this.period(this.getTenAwwardForFrist.period, true, this.lotteryId)
        let nowPeriod = this.period(this.getCurrentPeriodCode.toString())
        // 有些彩票的格式不一致。要做特殊处理
        if (newPeriod.split('-').length > 1) {
          newPeriod = newPeriod.split('-')[1]
          nowPeriod = nowPeriod.split('-')[1]
        }
        // 判断lotteryID是否属于1,3,5分彩
        let number = 0
        let len = 0
        let getResultFlag = false
        let short = lotteryMap.LotterySrc[this.lotteryId + '']
        if (lotteryMap.OGCP[short]) {
          number = lotteryMap.OGCP[short]
          number === 1 ? len = 1440 : (number === 3 ? len = 480 : len = 288)
          getResultFlag = (parseInt(nowPeriod) - parseInt(newPeriod) !== 1) && (parseInt(nowPeriod) - parseInt(newPeriod) !== -len + 1)
        } else if (lotteryMap.periodLen[Number(this.lotteryId)]) {
          len = lotteryMap.periodLen[Number(this.lotteryId)]
          getResultFlag = (parseInt(nowPeriod) - parseInt(newPeriod) !== 1) && (parseInt(nowPeriod) - parseInt(newPeriod) !== -len + 1)
        } else {
          getResultFlag = (parseInt(nowPeriod) - parseInt(newPeriod) !== 1)
        }
        let mmcLotteryId = lotteryMap.LotterySrcToId && lotteryMap.LotterySrcToId['mmc']
        // 判断是否符合请求赛果接口的要求(当前期数减去最新开奖结果的期数大于1，或者当前期数小于最新已开奖期数)
        if (getResultFlag && this.getAwardTime < 20 && mmcLotteryId !== this.$store.state.site.lotteryId) { // 秒秒彩不做定时请求开奖结果
          this.$store.state.award.awardTimes++
        }
        this.reFreshTime--
      } else if (this.reFreshTime < 0) {
        this.reFreshTime = Math.floor(Math.random() * 10) + 10 // 随机生成10-20之前的随机数，减小并发的机率
      }
    }
  }
}
</script>
