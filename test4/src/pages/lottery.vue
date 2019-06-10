<template>
  <div class="yoPage" id="pageTop">
    <div v-show="show" class="yoFlexbox">
      <headerCombination></headerCombination>
      <lotteryNavigation v-if="!isMmc"></lotteryNavigation>
      <lotteryMmcNavigation v-if="isMmc"></lotteryMmcNavigation>
      <lotteryContent></lotteryContent>
      <!-- 展示两侧菜单的时候点击非菜单部分返回主页面 -->
      <div class="mengceng leftMengceng" v-show="$store.state.site.nowPosition === maxPosition"
            @click="$store.state.site.nowPosition = 0"></div>
      <div class="mengceng rightMengceng" v-show="$store.state.site.nowPosition === minPosition"
            @click="$store.state.site.nowPosition = 0"></div>
      <!--<lotteryFooter></lotteryFooter>-->
      <!-- PK10系列-->
      <pk10Footer v-if=" lotteryType === 'pk10' && !isMmc "></pk10Footer>
      <!-- 时时彩系列 -->
      <sscFooter v-if=" lotteryType === 'ssc' "></sscFooter>
      <!-- 快乐十分系列 -->
      <klsfFooter v-if=" lotteryType === 'klsf' || lotteryType === 'gx10' "></klsfFooter>
      <!-- 十一选五系列 -->
      <syxwFooter v-if=" lotteryType === 'x5' "></syxwFooter>
      <!-- 快3系列 -->
      <ksFooter v-if=" lotteryType === 'k3' "></ksFooter>
      <!-- 快乐8系列 -->
      <kl8Footer v-if=" lotteryType === 'bjkl8' "></kl8Footer>
      <!-- PC蛋蛋系列 -->
      <pcddFooter v-if=" lotteryType === 'ddcp' "></pcddFooter>
      <!-- 六合彩系列 -->
      <lhcFooter v-if=" lotteryType === 'lhc' "></lhcFooter>
      <!-- 秒秒彩系列 -->
      <mmcFooter v-if="isMmc"></mmcFooter>
      <!--左侧导航栏 -->
      <drawer :open="openLeft" :docked="dockedLeft" @close="close()">
        <lotteryMenu />
      </drawer>
      <!--右侧信息栏 -->
      <drawer right :open="openR" :docked="dockedRight" @close="close(true)">
        <rightSideMenu />
      </drawer>
    </div>

    <div v-show="!show" class="yoBetDetail"> <!-- 显示投注详情 -->
      <!-- PK10系列-->
      <pk10betDetail v-if=" !show && ( lotteryType === 'pk10' && !isMmc ) "></pk10betDetail>
      <!-- 时时彩系列 -->
      <sscbetDetail v-if=" !show && ( lotteryType === 'ssc' )"></sscbetDetail>
      <!-- 快乐十分系列 -->
      <klsfbetDetail v-if=" !show && ( lotteryType === 'klsf' || lotteryType === 'gx10' ) "></klsfbetDetail>
      <!-- 十一选五系列 -->
      <syxwbetDetail v-if=" !show && ( lotteryType === 'x5' ) "></syxwbetDetail>
      <!-- 快3系列 -->
      <ksbetDetail v-if=" !show && ( lotteryType === 'k3' ) "></ksbetDetail>
      <!-- 快乐8系列 -->
      <kl8betDetail v-if=" !show && ( lotteryType === 'bjkl8' ) "></kl8betDetail>
      <!-- PC蛋蛋系列 -->
      <pcddbetDetail v-if=" !show && ( lotteryType === 'ddcp' ) "></pcddbetDetail>
      <!-- 六合彩系列 -->
      <lhcbetDetail v-if=" !show && ( lotteryType === 'lhc' ) "></lhcbetDetail>
      <!-- 秒秒彩-->
      <mmcbetDetail v-if=" !show && isMmc"></mmcbetDetail>
    </div>
    <!-- 自定义筹码 -->
    <yocouma v-if="$store.state.site.setChip"></yocouma>
    <kl8 v-if="kl8LuziShow"></kl8>
    <klsf v-if="klsfLuziShow"></klsf>
    <jstb v-if="ksLuziShow"></jstb>
    <lhc v-if="lhcLuziShow"></lhc>
    <ddcp v-if="pcddLuziShow"></ddcp>
    <bjsc v-if="pk10LuziShow"></bjsc>
    <ssc v-if="sscLuziShow"></ssc>
    <xw v-if="syxwLuziShow"></xw>
  </div>
</template>
<script>
  import kl8 from '../components/lottery/luzi/kl8'
  import klsf from '../components/lottery/luzi/klsf'
  import jstb from '../components/lottery/luzi/jstb'
  import lhc from '../components/lottery/luzi/lhc'
  import ddcp from '../components/lottery/luzi/ddcp'
  import bjsc from '../components/lottery/luzi/bjsc'
  import ssc from '../components/lottery/luzi/ssc'
  import xw from '../components/lottery/luzi/xw'
  import yocouma from 'components/lottery/rightSideMenu/yocouma.vue'
  import pk10betDetail from '../components/lottery/bettingDetail/pk10betDetail'
  import sscbetDetail from '../components/lottery/bettingDetail/sscbetDetail'
  import klsfbetDetail from '../components/lottery/bettingDetail/klsfbetDetail'
  import syxwbetDetail from '../components/lottery/bettingDetail/syxwbetDetail'
  import ksbetDetail from '../components/lottery/bettingDetail/ksbetDetail'
  import kl8betDetail from '../components/lottery/bettingDetail/kl8betDetail'
  import pcddbetDetail from '../components/lottery/bettingDetail/pcddbetDetail'
  import lhcbetDetail from '../components/lottery/bettingDetail/lhcbetDetail'
  import mmcbetDetail from '../components/lottery/bettingDetail/mmcbetDetail'

  import pk10Footer from '../components/lottery/betFoot/pk10Footer'
  import sscFooter from '../components/lottery/betFoot/sscFooter'
  import klsfFooter from '../components/lottery/betFoot/klsfFooter'
  import syxwFooter from '../components/lottery/betFoot/syxwFooter'
  import ksFooter from '../components/lottery/betFoot/ksFooter'
  import kl8Footer from '../components/lottery/betFoot/kl8Footer'
  import pcddFooter from '../components/lottery/betFoot/pcddFooter'
  import lhcFooter from '../components/lottery/betFoot/lhcFooter'
  import mmcFooter from '../components/lottery/betFoot/mmcFooter'

  import headerCombination from '../components/header/headerCombination'
  import lotteryNavigation from '../components/lottery/lotteryNavigation'
  import lotteryMmcNavigation from '../components/lottery/lotteryMmcNavigation'
  import lotteryContent from '../components/lottery/lotteryContent'
  // import lotteryFooter from '../components/lottery/lotteryFooter'
  import lotteryMenu from '../components/lottery/leftSideMenu/lotteryMenu'
  import rightSideMenu from '../components/lottery/rightSideMenu/rightSideMenu'
  // import * as touchUtil from 'utils/touchUtil'
  import * as lotteryPeriod from 'service/lotteryPeriod'

  export default {
    components: {
      kl8,
      klsf,
      jstb,
      lhc,
      ddcp,
      bjsc,
      ssc,
      xw,
      yocouma,
      lotteryContent,
      headerCombination,
      lotteryNavigation,
      lotteryMmcNavigation,
      // lotteryFooter,
      lotteryMenu,
      rightSideMenu,
      pk10betDetail,
      sscbetDetail,
      klsfbetDetail,
      syxwbetDetail,
      ksbetDetail,
      kl8betDetail,
      pcddbetDetail,
      lhcbetDetail,
      mmcbetDetail,
      pk10Footer,
      sscFooter,
      klsfFooter,
      syxwFooter,
      ksFooter,
      kl8Footer,
      pcddFooter,
      lhcFooter,
      mmcFooter
    },
    computed: {
      /** 长龙路子显示隐藏  */
      kl8LuziShow () {
        return this.$store.state.betZone.kl8LuziShow
      },
      klsfLuziShow () {
        return this.$store.state.betZone.klsfLuziShow
      },
      ksLuziShow () {
        return this.$store.state.betZone.ksLuziShow
      },
      lhcLuziShow () {
        return this.$store.state.betZone.lhcLuziShow
      },
      pcddLuziShow () {
        return this.$store.state.betZone.pcddLuziShow
      },
      pk10LuziShow () {
        return this.$store.state.betZone.pk10LuziShow
      },
      sscLuziShow () {
        return this.$store.state.betZone.sscLuziShow
      },
      syxwLuziShow () {
        return this.$store.state.betZone.syxwLuziShow
      },

        /**
       * 是否是秒秒彩
       */
      isMmc () {
        if (this.nowCode === 'mmc' || this.nowCode === 'mmsc') {
          lotteryPeriod.getStatus() // 更新下注状态
          return true
        } else {
          return false
        }
      },
        /**
       * 根据路由计算出彩票
       */
      nowCode () {
        let path = this.$route.fullPath.split('/')
        return path[2]
      },
      show () { // 判断是显示投注页面还是投注详情
        return this.$store.state.site.show
      },
      nowPosition () {
        return this.$store.state.site.nowPosition
      },
      // menuLeftZIndex () {
      //   return this.$store.state.site.menuLeftZIndex
      // },
      // menuRightZIndex () {
      //   return this.$store.state.site.menuRightZIndex
      // },
      openLeft () {
        return this.$store.state.home.MuseUI.open
      },
      openR () {
        return this.$store.state.home.MuseUI.openR
      },
      dockedLeft () {
        return this.$store.state.home.MuseUI.dockedLeft
      },
      dockedRight () {
        return this.$store.state.home.MuseUI.dockedRight
      },
      lotteryType () { // 增加彩票大类用于通用处理
        return this.$store.state.site.lotteryType
      }
    },
    data () {
      return {
        lastPosition: 0, // 移动后的初始位置
        minPosition: -275,
        maxPosition: 275,
        nowX: 0,
        allowMove: true // 两个手指操作屏幕不允许侧滑
      }
    },
    watch: {
      nowPosition: function (val) {
        if (val < 0) { // 向左拖动
          this.$store.state.site.menuLeftZIndex = -1
          this.$store.state.site.menuRightZIndex = 0
        } else { // 向右拖动
          this.$store.state.site.menuLeftZIndex = 0
          this.$store.state.site.menuRightZIndex = -1
        }

        if (val === 0 || val === this.minPosition || val === this.maxPosition) {
          this.lastPosition = val // 记录当前位置
        }
      }
    },
    methods: {
      onPanStart (data) {
        // set the first position
        this.nowX = data.center.x
        this.nowy = data.center.y
      },
      /**
       * 屏幕滑动 上下 + 左右 状态叠加
       * 计算 坐标 x y 移动 弧度angleTan 求得 角度angle
       * @param data
       * @returns {boolean}
       */
      onPanMove (data) {
        let [scrollAxis, tempDiff, offy] = [null, data.center.x - this.nowX, data.center.y - this.nowy]
        let [a, b] = [Math.abs(tempDiff), Math.abs(offy)]
        let angleTan = Math.atan(a / b)
        let angle = Math.floor(180 / (Math.PI / angleTan))
        scrollAxis = angle > 60 ? 'x' : 'y'
        if (scrollAxis === 'y' || angle < 25) return false
        this.nowX = data.center.x // 重新给当前x坐标赋值
        this.$store.state.site.nowPosition += tempDiff // 水平拖动
        // limit max and min position
        if (this.nowPosition > this.maxPosition) {
          this.$store.state.site.nowPosition = this.maxPosition
        }
        if (this.nowPosition < this.minPosition) {
          this.$store.state.site.nowPosition = this.minPosition
        }
      },
      close (type) {
        scrollTo(0, 0)
        if (type) { // 右側 需要加參數
          this.$store.state.home.MuseUI.openR = false
          this.$store.state.home.MuseUI.dockedRight = false
          window.$('body').css('position', 'static')
        } else {
          this.$store.state.home.MuseUI.open = !this.$store.state.home.MuseUI.open
          this.$store.state.home.MuseUI.dockedLeft = !this.$store.state.home.MuseUI.dockedLeft
          window.$('body').css('position', 'static')
        }
      }
      // onPanEnd (data) {
      //   // 判断是否展示侧滑菜单
      //   console.info('onPanEnd', this.nowPosition)
      //   if (this.nowPosition <= this.minPosition / 2) { // 展示右侧菜单
      //     this.$store.state.site.nowPosition = this.minPosition
      //   } else if (this.nowPosition >= this.maxPosition / 2) { // 展示左侧菜单
      //     this.$store.state.site.nowPosition = this.maxPosition
      //   } else {
      //     this.$store.state.site.nowPosition = 0
      //   }
      // }
    },
    mounted () {
      // 屏幕接触的时候记录起点坐标
      // document.querySelector('.menu-content').addEventListener('touchstart', ev => {
      //   if (ev.touches.length < 2) {
      //     this.startX = ev.touches[0].pageX
      //     this.startY = ev.touches[0].pageY
      //     let data = {center: {x: this.startX, y: this.startY}}
      //     this.onPanStart(data)
      //     this.allowMove = true
      //   } else {
      //     this.allowMove = false
      //   }
      //   // if (event.touches.length > 1) {
      //   //   event.preventDefault()
      //   // }
      //   // console.info('touchstart ....(', this.startX, ',' + this.startY + ')')
      // }, false)

      // 滑动的时候投注页面做水平滑动
      // document.querySelector('.menu-content').addEventListener('touchmove', ev => {
      //   if (this.allowMove) {
      //     let endX = ev.changedTouches[0].pageX
      //     let endY = ev.changedTouches[0].pageY
      //     let data = {center: {x: endX, y: endY}}
      //     this.onPanMove(data)
      //     // console.info('touchmove ....', data)
      //   }
      // })

      // 手指离开的时候计算投注页面水平移动距离
      // let lastTouchEnd = 0
      // document.querySelector('.menu-content').addEventListener('touchend', ev => {
      //   if (this.allowMove) {
      //     let endX = ev.changedTouches[0].pageX
      //     let endY = ev.changedTouches[0].pageY
      //     let direction = touchUtil.GetSlideDirection(this.startX, this.startY, endX, endY)
      //     // console.info('touchend ....', direction)
      //     // this.onPanEnd()
      //     if (direction === 3) { // 向左滑动
      //       if (this.$store.state.site.nowPosition <= 0) { // 在初始位置
      //         this.$store.state.site.nowPosition = this.minPosition // 向左滑动，展示右菜单
      //       } else {
      //         this.$store.state.site.nowPosition = 0 // 回到初始位置
      //       }
      //     } else if (direction === 4) { // 向右滑动
      //       if (this.$store.state.site.nowPosition >= 0) { // 在初始位置
      //         this.$store.state.site.nowPosition = this.maxPosition // 向右滑动，展示左菜单
      //       } else {
      //         this.$store.state.site.nowPosition = 0 // 回到初始位置
      //       }
      //     } else if (direction === 0) { // 没有移动
      //       this.$store.state.site.nowPosition = this.lastPosition // 回到之前记录的位置
      //     } else { // 上下滑动
      //       this.$store.state.site.nowPosition = this.lastPosition // 回到之前记录的位置
      //     }
      //   }
      //   // let now = (new Date()).getTime()
      //   // if (now - lastTouchEnd <= 300) {
      //   //   event.preventDefault()
      //   // }
      //   // lastTouchEnd = now
      // }, false)
    }
  }
</script>

