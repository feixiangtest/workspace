<template>
<div class="yo-left-menu">
    <header>
        <h1 class="title">导航</h1>
    </header>
    <div id="lottery-side">
        <div class="scroll">
            <div class="side-nav">
	            <ul class="list">
                    <li :key="item.lotteryName +'_' + index" v-for="(item, index) in lotteryList">
                        <a class="item item-icon-right " @click="toggleGroup(item.lotteryTypeName, item)">
                            <i class="icon icon-accessory" :class=" cur == item.lotteryTypeName?'ion-chevron-down':'ion-chevron-right' " style=""></i>{{item.name}}
                        </a>
                        <div :key="lotteryitem.lotteryId +'_' + index" class="itemChild" v-for="(lotteryitem,index) in item.lotteryType" :class=" cur == item.lotteryTypeName?'':'hide' " style="">
                          <p @click="lotteryInfo(lotteryitem)">
                            <a href="javascript:void(0)">
                                {{lotteryitem.lotteryName}}
                                <span v-for="(time, lotteryIndex) in $store.state.betZone.lotteryTimes" :key="lotteryIndex" v-if="time.lotteryId == lotteryitem.lotteryId && time.lotteryId != 100">
                                  <span v-if="time.seconds > 0 && time.isOpenOrClose && time.isFengPan" :style="time.seconds <= 10000 ? 'color:#ea2b3b' : ''">{{ time.seconds | timeFilter }}</span>
                                  <span v-if="!time.isOpenOrClose || !time.isFengPan" >
                                      官方封盘
                                  </span>
                                </span>
                            </a>
                          </p>
                        </div>
                    </li>
	            </ul>
            </div>
            <div style="height: 398px"></div>
            <div style="display:none"> {{menulotteryTimes}}</div> <!-- 计算游戏是关盘还是开启 -->
        </div>
    </div>
</div>
</template>
<script>
import * as types from '../../../store/betZone/type'
import * as lotteryMap from '../../../config/lotteryMap'
import * as lotteryDetail from '../../../config/lotteryDetail'
import * as lotteryPeriod from 'service/lotteryPeriod'
import * as lotteryMenuPeriod from 'service/lotteryMenuPeriod'
import * as mapping from 'config/mappingDefaultId'
export default {
  data () {
    return {
      cur: '',
      lotteryArr: [], // 选中大类下的彩种数组
      timerList: [],
      startTime: 0,
      initTimered: false, // 是否已经初始化倒计时，目的是初始化时避免重复执行倒计时
      isStartTimeUseToday: true
    }
  },
  computed: {
    menulotteryTimes () {
      lotteryMenuPeriod.menulotteryTimes()
    },
    lotteryList () { // 获取可以展示的彩票（大类和小类）
      return this.$store.state.home.lotteryList
    },
    nowPosition () {
      return this.$store.state.site.nowPosition
    },
    openL () { // 是否显示左侧导航栏
      return this.$store.state.home.MuseUI.open
    },
    lotteryId () {
      return this.$store.state.site.lotteryId
    },
    sTime () { // 服务器时间戳（接口返回时的时间戳，不是实时的服务器时间戳）
      return this.$store.state.betZone.serverTime.sTime
    }
  },
  watch: {
    nowPosition (val) {
      if (val === 275) { // 切换到左侧菜单的时候才请求倒计时
        // this.timer()
      } else { // 清除倒计时，避免其他页面请求
        // window.clearInterval(this.interval)
        // this.interval = null
      }
    },
    lotteryId (newVal, oldVal) {
      if (newVal * 1 !== oldVal * 1 && this.initTimered && newVal * 1 === 24) { // 切换到香港六合彩时
        this.timer() // 再次调用倒计时，主要用于更新六合彩倒计时
      }
    },
    openL (val) {
      if (val && this.initTimered && this.lotteryId * 1 !== 24) { // 显示左侧导航栏时，也调用倒计时，主要用于更新六合彩倒计时
        this.timer() // 再次调用倒计时，主要用于更新六合彩倒计时
      }
    },
    sTime (newVal, oldVal) { // 服务器时间戳
      if (!oldVal && !this.initTimered) { // 说明之前是没有获取到服务器时间戳的，并且还没有初始化倒计时
        this.timer() // 初始化倒计时
      }
    }
  },
  methods: {
    /** 倒计时 */
    timer () {
      this.startTime = new Date().getTime()
      let bjTime = this.$store.state.betZone.serverTime.get() // 系统当前时间戳
      if (bjTime) {
        this.initTimered = true // 已初始化倒计时
        let afterToday = lotteryPeriod.convertToBeiJingTime(bjTime + 86400000)
        let beforeToday = lotteryPeriod.convertToBeiJingTime(bjTime - 86400000)
        lotteryMenuPeriod.lotterySwitch(lotteryPeriod.convertToBeiJingTime(bjTime), this, this.$store.state.site.childLottery, afterToday, beforeToday)
      }
    },
    // 大类展开和收起功能
    toggleGroup (lotteryTypeName, item) {
      if (this.cur === lotteryTypeName) {
        this.cur = ''
      } else {
        this.cur = lotteryTypeName
      }
    },
    // 跳转功能
    toLink (lotteryId) {
      let lotteryCode = lotteryMap.LotterySrc[lotteryId]
      return '/lottery/' + lotteryCode
    },
    // 初始化投注页面玩法
    lotteryInfo (lotteryitem) {
      window.$('body').css('position', 'static')
      scrollTo(0, 0)
      // 当后台将投注状态关闭时需要弹出提示
      if (lotteryitem.bettingStatus === 1) {
        window.layer.msgWarn('对不起！当前游戏尚未开启，请您选择其它游戏进行投注！')
        window.lotteryMain.closeMuseUI()
        return false
      }
      // 存储彩票ID
      this.$store.state.site.lotteryId = lotteryitem.lotteryId
      // 存储游戏名称
      this.$store.state.site.nowLotteryName = lotteryitem.lotteryName
      let shortName = lotteryMap.LotterySrc[lotteryitem.lotteryId] // 获取彩票类型的简写 如一分赛车(yfsc)
      let play = lotteryDetail.playType[shortName] // 获取指定玩法和其他信息
      this.$store.state.site.lotteryPlayType = play // 将玩法存在site里面的playType
      this.$store.state.site.nowTitle = play.rtype[0].name // 获取默认玩法的名字
      this.$store.state.site.nowMode = play.rtype[0].type_id// 获取默认玩法的type_id
      localStorage.setItem(shortName.toUpperCase() + '_PLAYTYPE_H5', JSON.stringify(play)) // 保存游戏玩法 YFSC_PLAYTYPE

      /* 根据lotteyId 获取该id的彩种系列对应的defaultId by vito */
      let defaultId = mapping.mapp[lotteryitem.lotteryId]
      let param = {
        lotteryId: lotteryitem.lotteryId
      }
      if (play.rtype[0].type_id !== null) {
        param['rtype'] = play.rtype[0].type_id
      }

      // 增加赔率的处理，优先拿localStorage内的数据存入store中展示，异步请求同时进行，如果localStorage内有数据的情况页面展示会快很多
      // 这里使用defaultId 判断localStorage是否有值 by vito
      let lotteryStr = lotteryMap.LotterySrc[defaultId]
      let showBetList = []
      showBetList = localStorage.getItem(lotteryStr.toUpperCase() + '_BETH5' + '_' + this.$store.state.site.nowMode)
      if (showBetList !== null && showBetList !== undefined) { // localStorage中存在要打开彩票的赔率
        this.$store.state.betZone.bettList = JSON.parse(showBetList)
        this.$store.state.site.showBetLoading = false // 表示投注页面不需要loading的动画
      } else { // localStorage中不存在要打开彩票的赔率，需要从后端获取
        if (!navigator.onLine) { // 离线状态
          window.layer.alert('目前处于离线状态')
          return false
        }
        this.$store.state.site.showBetLoading = true // 表示投注页面需要loading的动画
          // 获取到彩票赔率版本号信息，因为彩票需要特殊处理
          // 这里将lotteryId 更换为defaultId
        let versionList = window.lotteryMain.lotteryVersionFun('showBet', 'showBetVersionKey',
          defaultId, param['rtype'] !== null ? param['rtype'] : '')
        param['list'] = versionList
        param['isAll'] = this.isAll
          // 获取玩法
        this.$store.dispatch(types.BET_ODDS, param).then(res => {
          this.$store.state.site.showBetLoading = false // 表示投注页面数据加载完成，取消loading效果
        }, res => {
          if (this.$store.state.site.showBetLoading) {
            this.$store.state.site.showBetLoading = false
            window.router.push('/home')
          }
        })
      }
      let lotteryCode = lotteryMap.LotterySrc[lotteryitem.lotteryId]
      this.$store.state.site.nowPosition = 0
      this.$router.push('/lottery/' + lotteryCode)
      window.lotteryMain.closeMuseUI()
    },
    // 模拟选中某彩种
    activeNode (lotteryId) {
      let arr = this.getLotteryById(lotteryId)
      if (arr && arr.length >= 2) {
        this.lotteryInfo(arr[0]) // 初始化玩法
        this.toggleGroup(arr[1]['lotteryTypeName'], arr[1]) // 大类展开和收起功能
      }
    },
    // 添加浏览器前进/后退监听事件，处理通过前进/后退切换彩种的情况
    addPopstateListener () {
      let nameSpace = 'popstate.lottery'
      window.$(window).off(nameSpace).on(nameSpace, event => {
        // 判断前进/后退之后，当前页面是否是在某个彩种页面
        if (location.href.indexOf('lottery') > -1) {
          // 根据路由获取lotteryItem
          let lotteryId = this.getLotteryIdByRoute(this.$route.path)
          // 模拟选择彩种
          lotteryId && this.activeNode(lotteryId)
        } else {
          // 非某个彩种页面就注销（重新进入某个彩种页面时，经过mounted钩子函数会重新注册 浏览器前进/后退监听事件）
          window.$(window).off(nameSpace)
        }
      })
    },
    // 根据路由获取对应的游戏lotteryId，如：routePath='/lottery/bjkl8'，则返回北京快乐8的lotteryId
    getLotteryIdByRoute (routePath) {
      if (routePath && routePath.indexOf('lottery') > -1) {
        let paths = routePath.split('/')
        let type = paths[paths.length - 1]
        for (let i in lotteryMap.LotterySrc) {
          if (lotteryMap.LotterySrc[i] === type) {
            return i
          }
        }
      }
    },
    // 根据lotteryId获取对应的游戏种类对象，如：lotteryId='2'，则返回重庆时时彩的对象（lotteryItem）
    getLotteryById (lotteryId) {
      if (!lotteryId) {
        return
      }
      for (let i in this.lotteryList) { // 遍历对象
        let lotteryTypes = this.lotteryList[i]['lotteryType']
        if (lotteryTypes instanceof Array) {
          for (let item of lotteryTypes) {
            if (item['lotteryId'] * 1 === lotteryId * 1 && typeof (lotteryId * 1) === 'number') {
              return [item, this.lotteryList[i]] // 返回结构：[子，父]
            }
          }
        }
      }
    }
  },
  mounted () {
    this.addPopstateListener() // 浏览器前进/后退监听事件
    window.lotteryMain.apiInit.$on(() => {
      if (!this.initTimered) { // 未初始化倒计时
        this.timer()
      }
    }) // 依赖初始化数据，添加监听
  }
}
</script>

