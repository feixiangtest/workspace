<template>
<div class="yo-right-menu"> 
    <user></user>
    <div class="side-nav" id="lottery-right">
      <ul class="yo-ri-list" :class="innerHeight < 540 ? 'small' : ''">
        <li>
            <a href="javascript:void(0);" class="item item-icon-left">
              <i class="pull-left icon yo-ico-cpsy"></i>
              <span>彩票输赢：<em class="ashen">{{bettingMoneyToday !== undefined ? bettingMoneyToday.toFixed(2):'0.00'}}</em></span>
              <i class="ico yo-ico-sx" v-if="isLogin" :class="refresh ? 'lodingpic' : ''" @click="getBettingMoneyToday()"></i></a>
        </li>
        <li>
            <a class="item item-icon-left" @click="GoAwardPage()" href="javascript:void(0);"><i class="pull-left icon yo-ico-kjjg"></i><span>开奖结果</span></a>
        </li>
        <li>
            <a class="item item-icon-left" @click="GoAccountHistory()" href="javascript:void(0);"><i class="pull-left icon yo-ico-zhls"></i><span>账户历史</span></a>
        </li>
        <li>
            <a v-if="nowCode !== 'mmc' && nowCode !== 'mmsc'" class="item item-icon-left" @click="GotodayBettingRecord()" href="javascript:void(0);"><i class="pull-left icon yo-ico-jszd"></i><span>即时注单</span></a>
        </li>
          <li>
            <a v-if="isLogin && this.$route.fullPath.indexOf('lottery')!==-1" class="item item-icon-left " @click="goBettingLimit(nowCode)" href="javascript:void(0);"><i class="pull-left icon yo-ico-tzxe"></i><span>投注限额</span></a>
        <li>
            <a class="item item-icon-left" @click="GogameRule()" href="javascript:void(0);"><i class="pull-left icon yo-ico-yxgz"></i><span>游戏规则</span></a>
        </li>
        <li>
            <a class="item item-icon-left" ng-click="chipMethod()" ng-if="isLogin" @click="GoYocouma()" href="javascript:void(0);"><i class="pull-left icon yo-ico-zdycm"></i><span>自定义筹码</span></a>
        </li>
        <li>
            <a class="item item-icon-left" href="javascript:void(0);"><i class="pull-left icon yo-ico-sysz"></i><span id="musicText" class="ng-binding">声音设置</span>
              <i class="icon" id="musicType"></i>
              <label class="toggle toggle-positive openMusicLab " >
                  <input type="checkbox" @click="openMusic()" :checked="isOpenMusic">
                  <div class="track">
                      <div class="handle"></div>
                  </div>
              </label>
            </a>
        </li>
      </ul>
    </div>
</div>
</template>
<script>
import * as type from '../../../store/home/type'
import user from '../../lottery/rightSideMenu/user'
import * as lotteryMap from '../../../config/lotteryMap'

export default {
  components: {
    user
  },
  data () {
    return {
      isYocouma: false,
      isOpenMusic: localStorage.getItem('isOpenMusic'),
      isOpen: true,
      refresh: false, // 刷新彩票输赢
      innerHeight: window.innerHeight
    }
  },
  methods: {
    // 跳转至开奖结果页面
    GoAwardPage () {
      if (!navigator.onLine) { // 离线状态
        window.layer.alert('目前处于离线状态')
        return false
      }
      // 先判断是否登录，如果未登录则会直接关闭页面
      this.$router.push('/awardPage')
      window.lotteryMain.closeMuseUI()
      window.$('body').css('position', 'static')
      scrollTo(0, 0)
    },
    // 跳转至账户历史页面
    GoAccountHistory () {
      if (!navigator.onLine) { // 离线状态
        window.layer.alert('目前处于离线状态')
        return false
      }
      // 先判断是否登录，如果未登录则会直接关闭页面
      window.lotteryMain.isLogin()
      if (this.isLogin) {
        if (this.$store.state.site.awardShow) {
          this.$store.state.site.awardShow = false
        }
        setTimeout(() => {
          this.$router.push('/accountHistory')
        }, 50)
      }
      window.lotteryMain.closeMuseUI()
      window.$('body').css('position', 'static')
      scrollTo(0, 0)
    },
    // 跳转至即时注单页面
    GotodayBettingRecord () {
      if (!navigator.onLine) { // 离线状态
        window.layer.alert('目前处于离线状态')
        return false
      }
      // 先判断是否登录，如果未登录则会直接关闭页面
      window.lotteryMain.isLogin()
      if (this.isLogin) {
        let path = this.$route.fullPath.split('/')
        console.info(path)
        // CP-2930 点击即时注单，隐藏开奖结果，显示投注信息
        this.$store.state.site.awardShow = false
        this.$store.state.site.betListShow = true
        if (path[1] === 'lottery') { // 当前页面是投注页面
          this.$router.push({path: '/todayBettingRecord', query: {lotteryId: this.lotteryId}})
        } else {
          this.$router.push('/todayBettingRecord')
        }
      }
      window.lotteryMain.closeMuseUI()
      window.$('body').css('position', 'static')
      scrollTo(0, 0)
    },
    // 跳转到投注限额页面
    goBettingLimit (nowCode) {
      if (!navigator.onLine) { // 离线状态
        window.layer.alert('目前处于离线状态')
        return false
      }
      // 先判断是否登录，如果未登录则会直接关闭页面
      window.lotteryMain.isLogin()
      if (this.isLogin) {
        let path = this.$route.fullPath.split('/')
        if (path[1] === 'lottery') { // 当前页面是投注页面
          this.$router.push({path: '/bettingLimit', query: {lotteryId: this.lotteryId}})
        } else {
          this.$router.push('/bettingLimit')
        }
      }
      console.log(nowCode)
      window.lotteryMain.closeMuseUI()
      window.$('body').css('position', 'static')
      scrollTo(0, 0)
    },
    // 跳转至游戏规则页面
    GogameRule () {
      let path = this.$route.path
      let params = path.split('/')
      // 判断是否为从首页跳入游戏规则
      if (params.length > 2) {
        // 如果先进入游戏，则截取游戏code传入规则页面
        this.$router.push({path: '/gameRule', query: {lotteryCode: params[2]}})
      } else {
        // 否则显示第一个游戏
        this.$router.push({path: '/gameRule', query: {lotteryCode: 'mmc'}})
      }
      window.lotteryMain.closeMuseUI()
      window.$('body').css('position', 'static')
      scrollTo(0, 0)
    },
    // 跳转至筹码设置页面
    GoYocouma () {
      // this.$router.push('/yocouma')
      // 先判断是否登录，如果未登录则会直接关闭页面
      window.lotteryMain.isLogin()
      if (this.isLogin) {
        this.$set(this.$store.state.site, 'setChip', true)
        this.$store.state.home.MuseUI.openR = false
        this.$store.state.home.MuseUI.dockedRight = true
      }
      window.lotteryMain.closeMuseUI()
    },
    // 打开或者关闭游戏声音
    openMusic () {
      if (this.isOpenMusic === null) {
        localStorage.setItem('isOpenMusic', 'true')
        this.isOpenMusic = 'true'
      } else {
        localStorage.removeItem('isOpenMusic')
        this.isOpenMusic = null
      }
    },
    // 点击刷新今日彩票输赢
    getBettingMoneyToday () {
      if (!navigator.onLine) { // 离线状态
        window.layer.alert('目前处于离线状态')
        return false
      }
      if (!this.isLogin) { // 未登录
        return false
      }
      if (this.isOpen) {
        this.isOpen = false
        this.refresh = true

        this.$store.dispatch(type.LOSE_AND_WIN_ACTION)
        setTimeout(() => {
          console.info('setTimeout:')
          this.isOpen = true
          this.refresh = false
        }, 2000)
      }
    }
  },
  watch: {
    // 监听右侧导航栏显示/隐藏
    openR (val) { // 由于rightSideMenu.vue组件在多个地方有引用，因此初始化刷新余额与输赢的接口，不能放在mounted中请求，会导致重复请求
      // 显示 并且是第一次显示右侧导航 并且已登录
      if (val && this.$store.state.home.MuseUI.openRightCount <= 1 && this.isLogin) {
        // 说明还从来没有查询过今日彩票输赢
        if (!this.bettingMoneyToday && this.bettingMoneyToday + '' !== '0') {
          this.getBettingMoneyToday()
        }
      }
    }
  },
  computed: {
    // 获取彩票金额
    bettingMoneyToday () {
      return this.$store.state.home.bettingMoneyToday.money
    },
    lotteryCode () {
      // 获取当前的彩种编号
      return lotteryMap.getLotteryType[this.nowCode]
    },
    lotteryId () {
      return this.$store.state.site.lotteryId
    },
    nowCode () {
      let path = this.$route.fullPath.split('/')
      return path[2]
    },
    isLogin () {
      return this.$store.state.home.isLogin
    },
    // 是否打开右侧导航栏
    openR () {
      return this.$store.state.home.MuseUI.openR
    }
  }
}
</script>

