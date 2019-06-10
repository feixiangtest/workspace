<!--彩票投注页面顶部时间和开奖结果-->
<template>
  <div class="yo-navName clearfix" id="navName">
    <div navname="1" style="font-size: 11px;">
        <a class="order ng-binding" style="top: 1px;text-align:center;background: Linear-gradient(#fcb559, #f58c05)" @click="toggleLeftSideMenu()">{{lotteryName}}<span class="yo-jiantou"></span></a>
    </div>
    <template v-if="lotteryId != 100 && isShow">
      <div navname="2" id="timeARE" v-if="$store.state.site.closedLottery">
          <span class="">距<b class="countDown ng-binding" style="margin-left: 1px">{{periodNumber}}</b><!--过滤器在commonFilter.js文件里--></span><b v-if="isOpenOrClosed" class="countDown" :style="seconds <= 10000 && lotteryId !== 100 ? 'color:#ea2b3b' : ''"><span style="color: black;font-weight: 100">封盘</span><span class="ng-binding">{{ endTimeView }}</span></b><b v-if="!isOpenOrClosed" class="countDown"><span style="color: black;font-weight: 100">开盘</span><span class="ng-binding">{{ endTimeView }}</span></b>
      </div>
      <div navname="2" id="timeARE" v-if="!$store.state.site.closedLottery"><span class="ng-binding">官方封盘</span></div>
    </template>
    <div navname="2" id="timeARE" class="machineSelect" v-if="!isShow"></div>
    <div class="machineSelect" ng-click="oneMore();" v-if="lotteryId == 100 && isShow">摇一摇机选</div>
    <div navname="3" style="font-size: 12px;">
        <a class="order" style="background: Linear-gradient(#e43228, #c70d05)" @click="AwardOpen(lotteryId)">{{ this.$store.state.site.awardShow ? '返回投注' : '开奖结果' }}<span class="yo-jiantou"></span></a>
    </div>
    <div style="display:none; width:0%;"> {{getStatus}}</div>
  </div>
</template>
<script>
import * as lotteryMap from '../../config/lotteryMap'
import * as lotteryDetail from '../../config/lotteryDetail'
import * as awardType from '../../store/award/type'
import * as lotteryPeriod from 'service/lotteryPeriod'
export default {
  data () {
    return {
      sysTime: null,   // 服务器时间
      endTimeView: null, // 封盘时间展示
      bjTime: '', // 北京时间
      periodNumber: 0, // 显示期数
      seconds: 0, // 秒数
      isOpen: true, // 用于开奖结果点击过快处理
      isOpenOrClosed: true,  // 判断是封盘倒计时，还是开盘倒计时   true 表示距离封盘倒计时， false表示距离开盘倒计时
      isTrue: true,
      initTimered: false, // 是否已经初始化倒计时，目的是初始化时避免重复执行倒计时
      isStartTimeUseToday: true, // 用于重庆幸运农场，index=0的时候，判断开始时间的日期是否用今天的日期还是昨天的日期
      // isLHCOpen: true, // 表示六合彩是否开启倒计时， true表示开启倒计时， false表示关盘
      isShow: false // 判断倒计时是否显示，false表示不显示
    }
  },
  computed: {
    lotteryId () {
      return this.$store.state.site.lotteryId
    },
    nowCode () {
      let path = this.$route.fullPath.split('/')
      return path[2]
    },
    lotteryName () {
      let name = this.$store.state.site.nowLotteryName
      if (name === '') { // 如果没有取到名字，从配置中根据彩票code获取
        let lotteryCode = this.nowCode
        return lotteryDetail.playType[lotteryCode].name
      } else {
        return name
      }
    },
    lotteryCode () {
      // 获取当前的彩种编号
      return lotteryMap.getLotteryType[this.nowCode]
    },
    currentPeriodNo () { // 当前游戏期数
      return this.$store.state.betZone.currentPeriodNo
    },
    /** 更新彩种状态 */
    getStatus () {
      if (this.$store.state.site.lotteryId) {
        lotteryPeriod.getStatus(this)
      }
    },
    isLogin () {
      return this.$store.state.home.isLogin
    },
    sTime () { // 服务器时间戳（接口返回时的时间戳，不是实时的服务器时间戳）
      return this.$store.state.betZone.serverTime.sTime
    }
  },
  watch: {
    lotteryId (newVal, oldVal) { // 监听彩种改变
      if (newVal * 1 !== oldVal * 1) { // 改变前后可能是数字或字符串类型
        this.timer()
      }
    },
    sTime (newVal, oldVal) { // 服务器时间戳
      if (!oldVal && !this.initTimered) { // 说明之前是没有获取到服务器时间戳的，并且还没有初始化倒计时
        this.timer() // 初始化倒计时
      }
    }
  },
  methods: {
    // 开始倒计时入口
    timer () {
      let sysTime = this.$store.state.betZone.serverTime.get() // 系统当前时间戳
      if (sysTime && this.lotteryId) {
        this.initTimered = true // 已初始化倒计时
        this.startTime = new Date().getTime()
        this.$store.state.betZone.sysTime = sysTime // 系统当前时间戳
        this.onLineCountDown()
        this.isShow = true
      }
    },
    /** 获取期数 */
    getPeriod (lotteryPeriodObj, lotteryId) {
      this.bjTime = lotteryPeriod.convertToBeiJingTime(this.sysTime)// 将服务器时间转换成北京时间戳,用于页面展示
      let bjTime = lotteryPeriod.convertToBeiJingTime(this.sysTime)
      let beforeToday = lotteryPeriod.convertToBeiJingTime(this.sysTime - 86400000) // 86400000表示一天的毫秒数
      let afterToday = lotteryPeriod.convertToBeiJingTime(this.sysTime + 86400000)
      let nowGame = lotteryMap.LotterySrc[lotteryId]
      if (!lotteryMap.OGCP[nowGame]) { // 表示不是自营彩
        if (nowGame === 'cqssc' || nowGame === 'xjssc' || nowGame === 'cqxync' || nowGame === 'xyft') {
          lotteryPeriodObj.initCQSSC(Number(this.lotteryId), beforeToday, bjTime, afterToday, this)
        } else if (nowGame === 'lhc') {
          this.$store.dispatch('period.action', { lotteryId: this.lotteryId }).then(res => {
            let period = res.data.periodList
            localStorage.setItem('lhcPeriod', JSON.stringify(period))
            lotteryPeriodObj.initLHC(Number(this.lotteryId), beforeToday, bjTime, afterToday, this, period)
          })
        } else if (nowGame === 'jxssc') {

        } else {
          lotteryPeriodObj.initCommon(Number(this.lotteryId), beforeToday, bjTime, afterToday, this)
        }
      } else {
        // 表示自营
        this.initSelftEmployed(Number(this.$store.state.site.lotteryId), this.bjTime, this)
      }
    },
    onLineCountDown () {
      this.sysTime = this.$store.state.betZone.sysTime
      this.initSelftEmployed = lotteryPeriod.initSelftEmployed
      this.getPeriod(lotteryPeriod, this.lotteryId)
    },
    AwardOpen (lotteryId) {
      scrollTo(0, 0)
      if (this.isOpen) {
      // 如果lotteryId没有，则根据url截取，找到对应的lotteryId
        if (!lotteryId) {
          let path = this.$route.fullPath.split('/')[2]
          lotteryId = lotteryMap.LotterySrcToId[path]
        }
        this.$store.state.site.awardShow = !this.$store.state.site.awardShow
        this.$store.state.site.betListShow = !this.$store.state.site.betListShow
        // console.info('this.$store.state.site.betListShow:', this.$store.state.site.betListShow)
        if (this.$store.state.site.awardShow === true) {
        // 默认创建前十期参数
          if (this.$store.state.award.lotteryAwardTop10.length === 0 || this.$store.state.betZone.currentPeriodNo !== this.$store.state.award.lotteryAwardTop10[0].period) { // 判断前十期中是否包含当期开奖结果，如果包含则只做展示  不向后端发送请求
            this.$store.dispatch(awardType.AWARD_OPENAWARD_LAST10, {lotteryId: lotteryId})
          }
          this.$store.state.site.lotteryType = this.lotteryCode
        } else {
          // 限制两秒才允许再次点击开奖结果
          this.isOpen = false
          setTimeout(() => {
            this.isOpen = true
          }, 1000)
        }
      }
    },
    toggleLeftSideMenu () { // 左侧菜单
      this.$store.state.home.MuseUI.open = true
      this.$store.state.home.MuseUI.dockedLeft = false
      this.$store.state.site.betListShow = true
      this.$store.state.site.awardShow = false
      window.$('body').css('position', 'fixed')
    }
  },
  created () {
    this.$set(this.$store.state.betZone, 'shakeStatus', false) // 关闭秒秒彩摇一摇功能
  },
  mounted () { // 不依赖init
    setTimeout(() => { // 主要用于先让watch: lotteryId执行，避免重复请求倒计时
      if (!this.initTimered) { // 倒计时是否未初始化
        this.timer()
      }
    }, 100)
  },
  // 组件销毁前事件
  beforeDestroy () {
    this.$store.state.site.betListShow = true // 初始化
    this.$store.state.site.awardShow = false // 初始化
  }
}
</script>
