<template>
    <div class="list" @click="closeShow()">
      <!-- PK10 系列 -->
      <pk10 v-if=" lotteryType === 'pk10' "
      :lotteryId = 'lotteryId'
      :gameList = 'gameList'
      :nowMode = 'nowMode'
      :showIcon = 'showIcon'
      @changeCurrentGame = "changeCurrentGame"></pk10><!--传参数给子组件， 传了一个方法给子组件 -->

      <!-- 时时彩 系列 -->
      <ssc v-if=" lotteryType === 'ssc' "
      :lotteryId = 'lotteryId'
      :gameList = 'gameList'
      :nowMode = 'nowMode'
      :showIcon = 'showIcon'
      @changeCurrentGame = "changeCurrentGame"></ssc>

      <!-- 快乐十分 系列 -->
      <klsf v-if=" lotteryType === 'klsf' || lotteryType === 'gx10' "
      :lotteryId = 'lotteryId'
      :gameList = 'gameList'
      :nowMode = 'nowMode'
      :showIcon = 'showIcon'
      :Height = 'Height'
      :showBetTitle = 'showBetTitle'
      @changeCurrentGame = "changeCurrentGame"></klsf>

      <!-- 十一选五 系列 -->
      <syxw v-if=" lotteryType === 'x5'"
      :lotteryId = 'lotteryId'
      :gameList = 'gameList'
      :nowMode = 'nowMode'
      :showIcon = 'showIcon'
      :Height = 'Height'
      :showBetTitle = 'showBetTitle'
      @changeCurrentGame = "changeCurrentGame"></syxw>

      <!-- 快3 系列 -->
      <ks v-if=" lotteryType === 'k3' "
      :lotteryId = 'lotteryId'
      :gameList = 'gameList'
      :nowMode = 'nowMode'
      :showIcon = 'showIcon'
      :Height = 'Height'
      @changeCurrentGame = "changeCurrentGame"></ks>

      <!-- 快乐8 系列 -->
      <kl8 v-if=" lotteryType === 'bjkl8' "
      :lotteryId = 'lotteryId'
      :gameList = 'gameList'
      :nowMode = 'nowMode'
      :showIcon = 'showIcon'
      :Height = 'Height'
      @changeCurrentGame = "changeCurrentGame"></kl8>

      <!-- PC蛋蛋 系列 -->
      <pcdd v-if=" lotteryType === 'ddcp' "
      :lotteryId = 'lotteryId'
      :gameList = 'gameList'
      :nowMode = 'nowMode'
      :showIcon = 'showIcon'
      :Height = 'Height'
      @changeCurrentGame = "changeCurrentGame"></pcdd>

      <!-- 六合彩 系列 -->
      <lhc v-if=" lotteryType === 'lhc' "
      :lotteryId = 'lotteryId'
      :gameList = 'gameList'
      :nowMode = 'nowMode'
      :showIcon = 'showIcon'
      :Height = 'Height'
      @changeCurrentGame = "changeCurrentGame"></lhc>

      <!-- 秒秒彩 -->
      <mmc v-if=" lotteryType === 'mmc' "
      :lotteryId = 'lotteryId'
      :gameList = 'gameList'
      :nowMode = 'nowMode'
      :showIcon = 'showIcon'
      :Height = 'Height'
      @changeCurrentGame = "changeCurrentGame"></mmc>


    </div>
</template>

<script>
import * as types from '../../store/betZone/type'
import * as statusCode from '../../utils/status_const'
import * as lotteryMap from '../../config/lotteryMap'
import * as lotteryDetail from '../../config/lotteryDetail'
import * as mapping from 'config/mappingDefaultId'
import pk10 from './betShow/pk10'
import ssc from './betShow/ssc'
import klsf from './betShow/klsf'
import syxw from './betShow/syxw'
import ks from './betShow/ks'
import kl8 from './betShow/kl8'
import pcdd from './betShow/pcdd'
import lhc from './betShow/lhc'
import mmc from './betShow/mmc'
export default {
  components: {
    pk10,
    ssc,
    klsf,
    syxw,
    ks,
    kl8,
    pcdd,
    lhc,
    mmc
  },
  data () {
    return {
      indexList: [] // 用于记录收缩效果的所有index，用于初始化
    }
  },
  mounted () { // 不通过主页或者左侧导航栏进入倍率
    console.info('betZone mounted')
    let short = this.nowCode
    let lotteryId = lotteryMap.LotterySrcToId[short]
    this.$store.state.site.lotteryId = lotteryId

    let shortName = lotteryMap.LotterySrc[lotteryId] // 获取彩票类型的简写 如一分赛车(yfsc)
    let play = lotteryDetail.playType[shortName] // 获取指定玩法和其他信息
    this.$store.state.site.lotteryPlayType = play // 将玩法存在site里面的playType
    if (!this.$store.state.site.isBettingAgain) { // 不是再投一注
      this.$store.state.site.nowTitle = play.rtype[0].name // 获取默认玩法的名字
      this.$store.state.site.nowMode = play.rtype[0].type_id// 获取默认玩法的type_id
    }
    this.$store.state.site.isBettingAgain = false

    /* 根据lotteyId 获取该id的彩种系列对应的defaultId by vito */
    let defaultId = mapping.mapp[lotteryId]
    let param = {
      lotteryId: lotteryId
    }

    if (this.$store.state.site.nowMode) {
      param['rtype'] = this.$store.state.site.nowMode
    }

    // 增加赔率的处理，优先拿localStorage内的数据存入store中展示，异步请求同时进行，如果localStorage内有数据的情况页面展示会快很多
    // 这里使用defaultId 判断localStorage是否有值 by vito
    let lotteryStr = lotteryMap.LotterySrc[defaultId]
    let showBetList = []
    showBetList = localStorage.getItem(lotteryStr.toUpperCase() + '_BETH5' + '_' + this.$store.state.site.nowMode)
    if (showBetList !== null && showBetList !== undefined) {
      this.$store.state.betZone.bettList = JSON.parse(showBetList)
      this.$store.state.site.showBetLoading = false // 表示投注页面不需要loading的动画
    } else {
      this.$store.state.site.showBetLoading = true // 表示投注页面需要loading的动画
      // 获取到彩票赔率版本号信息，因为彩票需要特殊处理
      // 这里将lotteryId 更换为defaultId by vito, 判断版本使用默认的id
      let versionList = window.lotteryMain.lotteryVersionFun('showBet', 'showBetVersionKey',
        defaultId, param['rtype'] !== null && param['rtype'] !== undefined ? param['rtype'] : null)
      param['list'] = versionList

      param['isAll'] = this.isAll
        // 获取玩法
      this.$store.dispatch(types.BET_ODDS, param).then(res => {
        if (res.status === statusCode.statusConst.FAILURE) {
          window.layer.msgWarn(res.msg)
          return false
        }
        this.$store.state.site.showBetLoading = false // 表示投注页面数据加载完成，取消loading效果
      }, res => {
        if (this.$store.state.site.showBetLoading) {
          this.$store.state.site.showBetLoading = false
          window.router.push('/home')
        }
      })
    }
  },
  computed: {

    nowCode () {
      let path = this.$route.fullPath.split('/')
      return path[2]
    },

    /**
     * 选中的玩法
    */
    nowMode () {
      return this.$store.state.site.nowMode
    },
    Height () {
      // 快乐十分 重庆幸运农场 cqxync
      if (this.nowCode === 'cqxync' && this.nowMode !== 2591000) { // 连码
        return '58px'
      } else if (this.nowMode === 2591000) {
        return 'auto'
      } else if (this.nowMode === 2100000) { // 广东十一选五 连码
        return '45px'
      }
    },
    showIcon () {
      // 广东十一选五 连码， 直选
      if (this.nowMode === 2100000 || this.nowMode === 2110000) {
        return false
      } else {
        return true
      }
    },
    showBetTitle () {
      // 广东十一选五 连码， 直选   广东快乐 连码
      if (this.nowMode === 2100000 || this.nowMode === 2110000 || this.nowMode === 2591000) {
        return true
      } else {
        return false
      }
    },
    /**
     * 获取游戏的玩法，并且展示玩法 DOTO 该方法会进入2次
    */
    gameList () {
      return this.$store.state.betZone.bettList
    },

    /**
     * 返回选中的彩票ID
    */
    lotteryId () {
      return this.$store.state.site.lotteryId + ''
    },
    lotteryType () { // 增加彩票大类用于通用处理
      return this.$store.state.site.lotteryType
    }

  },
  methods: {
    changeCurrentGame (index) {
      let t = document.getElementById('item' + index).style.display
      if (t !== 'none') {
        document.getElementById('item' + index).style.display = 'none'
        document.getElementById('iclass' + index).style.display = 'none'
        document.getElementById('iclass_plus' + index).style.display = 'inline-block'
        this.indexList.push(index)
      } else {
        document.getElementById('item' + index).style.display = 'block'
        document.getElementById('iclass' + index).style.display = 'inline-block'
        document.getElementById('iclass_plus' + index).style.display = 'none'
        this.indexList.splice(this.indexList.indexOf(index), 1)
      }
    },
    closeShow () { // 点击时关闭打开的小窗口
      window.lotteryMain.closeAward()
    },
    /**
     * 初始化，保证切换玩法的时候页面是展开的状态 API-1818
     */
    initData () {
      this.indexList.forEach(index => {
        document.getElementById('item' + index).style.display = 'block'
        document.getElementById('iclass' + index).style.display = 'inline-block'
        document.getElementById('iclass_plus' + index).style.display = 'none'
      })
      this.indexList = []
    }
  },
  watch: {
    nowMode () {
      this.initData()
    },
    lotteryId () {
      this.initData()
    }
  }
}
</script>

