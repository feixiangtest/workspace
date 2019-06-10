<template>
<div class="yoHea">
  <div class="yoHeader">
    <div class="center">
      <div class="heaLeft" @click="GoBack()">
          <i class="icon ion-ios-arrow-back"></i>
      </div>
      <div class="title title-center"  @click="titleEvent()">{{title}}<span class="triangle triangleDown"></span></div>
      <div class="heaRight" @click="toggleRightSideMenu()">
          <span id="lotteryMenu">菜单</span><i class="h-ues" > </i>
      </div>
    </div>
  </div>
  <div v-if="chanGameOpen"  @click="titleEvent()" style="width: 100vw; height: 100vh;position:absolute;z-index:999">
    <div id="chanGame" :class="isLhc()">
      <span :key="index" v-for="(item, index) in lotterMethod" @click="changeGame(item.type_id,item.name)" >
          <a :class="{'v-link-active': nowMode == item.type_id && title == item.name}" class="">{{item.name}}</a>
      </span>
    </div>
  </div>
</div>

</template>
<script>
import * as lotteryDetail from '../../config/lotteryDetail'
import * as types from '../../store/betZone/type'
import * as lotteryMap from '../../config/lotteryMap'
import * as mapping from 'config/mappingDefaultId'
// import * as statusCode from '../../utils/status_const'
export default {
  data () {
    return {
      chanGameOpen: false
      // nowMode: this.$store.state.site.nowMode
    }
  },
  computed: {
    // 截取路径，返回数组
    short () {
      return this.$route.fullPath.split('/')
    },
    // 显示选中的玩法名称
    title () {
      return this.$store.state.site.nowTitle
    },
    nowMode () {
      return this.$store.state.site.nowMode
    },
    /**
     * 获取特定彩票下的玩法列表
     */
    lotterMethod () {
      let code = this.short[2].toUpperCase() + '_PLAYTYPE_H5'

      if (this.$store.state.site.lotteryPlayType.rtype) {
        return this.$store.state.site.lotteryPlayType.rtype
      } else if (localStorage.getItem(code) !== null) { // 拿到对应的玩法比如 BJSC_PLAYTYPE
        return JSON.parse(localStorage.getItem(code))['rtype']
      } else {
        // 都没有，则进入,拿到默认第一个
        let lotteryPlayType = lotteryDetail.playType[this.short[2]] // 根据简写获取玩法
        localStorage.setItem(code, JSON.stringify(lotteryPlayType)) // 保存在localStorage

        return lotteryPlayType.rtype
      }
    },
    lotteryType () { // 增加彩票大类用于通用处理
      return this.$store.state.site.lotteryType
    }
  },
  methods: {
    GoBack () {
      // 切换时需要将开奖弹框关闭
      this.$store.state.site.awardShow = false
      this.$store.state.site.betListShow = true
      this.$router.push('/home')
      scrollTo(0, 0)
    },
    titleEvent () {
      this.chanGameOpen = !this.chanGameOpen
      window.lotteryMain.closeAward()
    },
    toggleRightSideMenu () { // 右侧菜单
      this.$store.state.home.MuseUI.openR = true
      this.$store.state.home.MuseUI.dockedRight = false
      this.$store.state.home.MuseUI.openRightCount++ // 显示右侧导航栏的次数
      window.$('body').css('position', 'fixed')
    },
    /**
     *改变游戏玩法， 传入玩法模式，玩法名称
     */
    changeGame (t, e) {
      scrollTo(0, 0)
      this.$store.state.site.nowMode = t
      this.$store.state.site.nowTitle = e
      localStorage.setItem('nowMode', t)
      localStorage.setItem('nowTitle', e)
      // 查询后台，获取赔率
      // 获取玩法
      let lotteryId = this.$store.state.site.lotteryId

      /* 根据lotteyId 获取该id的彩种系列对应的defaultId */
      let defaultId = mapping.mapp[lotteryId]
      let param = {
        lotteryId: lotteryId
      }
      if (t !== null) {
        param['rtype'] = t
      }

      // 增加赔率的处理，优先拿localStorage内的数据存入store中展示，异步请求同时进行，如果localStorage内有数据的情况页面展示会快很多
      // 这里将lotteryId 更改defaultId by vito
      let lotteryStr = lotteryMap.LotterySrc[defaultId]
      let showBetList = []
      showBetList = localStorage.getItem(lotteryStr.toUpperCase() + '_BETH5' + '_' + this.$store.state.site.nowMode)
      if (showBetList !== null && showBetList !== undefined) {
        this.$store.state.betZone.bettList = JSON.parse(showBetList)
        this.$store.state.site.showBetLoading = false // 表示投注页面不需要loading的动画
      } else {
        this.$store.state.site.showBetLoading = true // 表示投注页面需要loading的动画
        // 获取到彩票赔率版本号信息，因为彩票需要特殊处理
        // lotteryId 改成 defaultId  by vito
        let versionList = window.lotteryMain.lotteryVersionFun('showBet', 'showBetVersionKey',
        defaultId, t !== null ? t : '')
        param['list'] = versionList

        param['isAll'] = this.isAll

        this.$store.dispatch(types.BET_ODDS, param).then(res => {
          this.$store.state.site.showBetLoading = false // 表示投注页面数据加载完成，取消loading效果
        }, res => {
          if (this.$store.state.site.showBetLoading) {
            this.$store.state.site.showBetLoading = false
            window.router.push('/home')
          }
        })
      }
    },
    // toggleRightSideMenu () {
    //   if (this.$store.state.site.nowPosition === 0) {
    //     this.$store.state.site.nowPosition = -275
    //     this.$store.state.site.menuLeftZIndex = -1
    //     this.$store.state.site.menuRightZIndex = 0
    //   } else {
    //     this.$store.state.site.nowPosition = 0
    //   }
    // },
    isLhc () {
      if (this.$store.state.site.lotteryType === 'lhc') {
        return 'yo-navlhc'
      }
    }
  },
  /**
  * 页面初始化的时候，根据lotterMethod这个computed里面的内容拿到玩法的名字和玩法模式
  */
  created () { // 默认数据 不影响渲染
    if (!this.$store.state.site.nowTitle || !this.$store.state.site.nowMode) {
      this.$store.state.site.nowTitle = this.lotterMethod[0]['name']
      this.$store.state.site.nowMode = this.lotterMethod[0]['type_id']
    }
  }
}
</script>
