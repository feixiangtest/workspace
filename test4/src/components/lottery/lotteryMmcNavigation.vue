<!--彩票投注页面顶部时间和开奖结果-->
<template>
  <div class="yo-navName yo-navMmc clearfix" id="navName">
    <div navname="1" style="font-size: 12px;" ng-click="OnEvent();">
        <a class="order ng-binding" style="top: 1px;text-align:center;background: Linear-gradient(#fcb559, #f58c05)" @click="toggleLeftSideMenu()">{{lotteryName}}<span class="yo-jiantou"></span></a>
    </div>
    <div navname="2" @click="shakeMachineSelect" id="timeARE" class="shake"
      v-if="!this.$store.state.site.awardShow && $store.state.site.nowMode !== 2391000 && $store.state.site.nowMode !== 2392000">
        <!-- 下一期的东西 -->
        <b class="assertive"><span style="color: black;font-weight: 100; margin-left: 10%;">摇一摇机选</span></b>
    </div>
    <div navname="2" id="timeARE"
      v-if="!this.$store.state.site.awardShow && ($store.state.site.nowMode === 2391000 || $store.state.site.nowMode === 2392000)">
    </div>
    <div navname="2" ng-click="OnEvent();" id="timeARE" v-if="this.$store.state.site.awardShow">
        <div class="simulateBtn" @click="submitBets('simulate')">模拟开奖</div>
    </div>
    <div navname="3" style="font-size: 12px;">
        <a class="order" style="background: Linear-gradient(#e43228, #c70d05)" @click="AwardOpen(lotteryId)">{{ this.$store.state.site.awardShow ? '返回投注' : '开奖结果' }}<span class="yo-jiantou"></span></a>
    </div>
  </div>
</template>
<script>
import * as lotteryMap from '../../config/lotteryMap'
import * as awardType from '../../store/award/type'
// import * as betZoneType from '../../store/betZone/type'
import * as statusCode from '../../utils/status_const'
import * as filter from '../../filter/betlistFilter'
let lotteryList = [{codeName: '北京赛车', code: 'bjsc'}, {codeName: '秒秒赛车', code: 'mmsc'}, {codeName: '三分赛车', code: 'sfsc'}, {codeName: '一分赛车', code: 'yfsc'},
{codeName: '三分时时彩', code: 'sfssc'}, {codeName: '五分时时彩', code: 'wfssc'}, {codeName: '一分时时彩', code: 'yfssc'},
{codeName: '天津时时彩', code: 'tjssc'}, {codeName: '新疆时时彩', code: 'xjssc'}, {codeName: '重庆时时彩', code: 'cqssc'},
{codeName: '江西时时彩', code: 'jxssc'}, {codeName: '五分快乐十分', code: 'xync5'}, {codeName: '一分快乐十分', code: 'xync1'},
{codeName: '三分快乐十分', code: 'xync3'}, {codeName: '湖南快乐十分', code: 'hnklsf'}, {codeName: '重庆幸运农场', code: 'cqxync'},
{codeName: '广西快乐十分', code: 'gxklsf'}, {codeName: '广东快乐十分', code: 'gdklsf'}, {codeName: '广东十一选五', code: 'gd11x5'},
{codeName: '五分快3', code: 'ks5'}, {codeName: '江苏骰宝', code: 'jstb'}, {codeName: '一分快3', code: 'ks1'},
{codeName: '三分快3', code: 'ks3'}, {codeName: '广西快3', code: 'gxks'}, {codeName: '北京快8', code: 'bjkl8'},
{codeName: '幸运28', code: 'ddcp'}, {codeName: '香港六合彩', code: 'lhc'}, {codeName: '一分六合彩', code: 'yflhc'},
{codeName: '三分六合彩', code: 'sflhc'}, {codeName: '五分六合彩', code: 'wflhc'},
{codeName: '江苏十一选五', code: 'js11x5'}, {codeName: '东方幸运28', code: 'df3xy28'}, {codeName: '东方秒秒彩', code: 'mmc'}
]
export default {
  data () {
    return {
      awardTop10List: null, // 彩票开奖前十期
      isOpen: true // 用于开奖结果点击过快处理，
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
      if (name === '') {
        let lotteryCode = this.nowCode
        for (let i in lotteryList) {
          if (lotteryCode === lotteryList[i].code) {
            this.$store.state.site.nowLotteryName = lotteryList[i].codeName
            return this.$store.state.site.nowLotteryName
          }
        }
      } else {
        return name
      }
    },
    isLogin () {
      return this.$store.state.home.isLogin
    }
  },
  methods: {
    AwardOpen (lotteryId) {
      scrollTo(0, 0)
      if (this.nowCode === 'mmc' || this.nowCode === 'mmsc') {
        window.lotteryMain.isLogin()
        if (!window.store.state.home.isLogin) {
          return false
        }
      }
      if (this.isOpen) {
      // 如果lotteryId没有，则根据url截取，找到对应的lotteryId
        if (!lotteryId) {
          let path = this.$route.fullPath.split('/')[2]
          lotteryId = lotteryMap.LotterySrcToId[path]
        }
        this.$store.state.site.awardShow = !this.$store.state.site.awardShow
        this.$store.state.site.betListShow = !this.$store.state.site.betListShow
        if (this.$store.state.site.awardShow) { // 显示开奖结果并且集合中没有数据才去后端取数据
          // 默认创建前十期参数
          this.$store.dispatch(awardType.AWARD_OPENAWARD_LAST10, {lotteryId: lotteryId}).then(res => {
            if (res.status === statusCode.statusConst.SUCCESS) { // 判断是否获取成功数据
              let awardList = res.data || []
              for (let i = 0; i < awardList.length; i++) {
                this.$store.state.award.lotteryAwardTop10[i] = []// 初始化
                this.$store.state.award.lotteryAwardTop10[i].numberSum = awardList[i].numberSum// 总和
                this.$store.state.award.lotteryAwardTop10[i].number = awardList[i].number.split(',')// 处理彩球
                this.$store.state.award.lotteryAwardTop10[i].period = awardList[i].period// 处理期数
                this.$store.state.award.lotteryAwardTop10[i].awardTime = awardList[i].awadTime// 处理开奖时间
                this.$set(this.$store.state.award.lotteryAwardTop10, i, this.$store.state.award.lotteryAwardTop10[i])
              }
            }
          })
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
    },
    shakeMachineSelect () {
      // 先判断是否登录，如果未登录则会直接关闭页面
      window.lotteryMain.isLogin()
      if (this.isLogin) {
        if (window.store.state.betZone.mmcBettingClosed[this.lotteryId]) { // 已关闭投注
          return
        }
        let rtypeId = this.$store.state.site.nowMode // 获取玩法
        let title = this.$store.state.site.nowTitle // 玩法名
        let newlist = []
        if (rtypeId === 2310000 && title !== '整合') {
          newlist = filter.sscFilter(title, rtypeId, this.$store.state.betZone.bettList)
        } else {
          newlist = this.$store.state.betZone.bettList
        }

        let j = 0
        let len = 0
        for (let i = 0; i < newlist.length; i++) { // 保证能循环获取到机选赔率
          len += newlist[i].oddsList.length
        }
        for (let i = 0; i < len * 3; i++) {
          if (this.$store.state.betZone.doBetList.length !== len) {
            let gameLen = Math.round(Math.random() * (newlist.length - 1)) // 随机得到秒秒彩bettList的下标
            let itemLen = Math.round(Math.random() * (newlist[gameLen].oddsList.length - 1)) // 随机得到秒秒彩bettList的下标
            let list = newlist[gameLen].oddsList[itemLen]
            if (list && window._indexOf(this.$store.state.betZone.doBetList, list) < 0) {
              this.playMusic('chatAudio')
              list.gold = this.$store.state.betZone.mmcChipMoney !== 0 ? this.$store.state.betZone.mmcChipMoney : ''
              this.$store.state.betZone.doBetList.push(list)
              j++
              if (j === 3) { // 最多机选三个
                break
              }
            }
          } else {
            window.layer.msgWarn('玩法注数已达上限')
          }
        }
        this.playMusic('chatAudio')
        this.$store.state.site.show = false
      }
    },
    submitBets (type) { // simulate
      // 先判断是否登录，如果未登录则会直接关闭页面
      window.lotteryMain.isLogin()
      if (this.isLogin) {
        // 埋点
        window._dinWarmUp && window._dinWarmUp('send', 'event', 'Link', '模拟开奖', '模拟开奖')
        let routerUrl
        switch (this.lotteryId * 1) {
          case 100:
            routerUrl = '/lottery/mmc/Bet'
            break
          case 101:
            routerUrl = '/lottery/mmsc/Bet'
            break
        }
        if (routerUrl) {
          this.$store.state.betZone.isSimulate = true
          this.$router.push({path: routerUrl, query: { 'playType': type }})
        }
        // this.$store.dispatch(betZoneType.CHECK_LOGIN_TOKEN_ACTION).then(res => {
        //   if (res.status === statusCode.statusConst.SUCCESS) { // 判断是否获取成功数据
        //     if (this.$store.state.site.lotteryId === 100) {
        //       this.$router.push({path: '/lottery/mmc/Bet', query: { 'playType': type }})
        //     }
        //     if (this.$store.state.site.lotteryId === 101) {
        //       this.$router.push({path: '/lottery/mmsc/Bet', query: { 'playType': type }})
        //     }
        //   } else {
        //     window.layer.msgWarn('未获取到用户认证信息或用户信息失效')
        //   }
        // })
      }
    },
    shake () {
      if (window.DeviceMotionEvent) {
        if (this.$store.state.site.isAddListen) { // 判断为true 表示已经addEventListener过一次了
          return
        }
        const speed = 15 // 用来判定的加速度阈值，太大了则很难触发
        let x, y, lastX, lastY
        x = y = lastX = lastY = 0

        window.addEventListener('devicemotion', (event) => {
          this.$store.state.site.isAddListen = true
          if (!this.$store.state.betZone.shakeStatus) { // 阻止摇一摇事件
            return
          }
          let acceleration = event.accelerationIncludingGravity
          x = acceleration.x
          y = acceleration.y
          if (Math.abs(x - lastX) > speed || Math.abs(y - lastY) > speed) {
            // 用户设备摇动了，触发响应操作
            // 此处的判断依据是用户设备的加速度大于我们设置的阈值
            x = y = lastX = lastY = 0
            if (this.$store.state.site.nowMode !== 2391000 && this.$store.state.site.nowMode !== 2392000) { // 组三组六不支持机选
              this.$set(this.$store.state.betZone, 'shakeStatus', false)
              this.shakeMachineSelect()
            }
          }
          lastX = x
          lastY = y
        }, false)
      } else {
        window.layer.msgWarn('对不起，该手机不支持摇一摇')
      }
    }
  },
  mounted () { // 可以先运行 不依赖 init
    this.$set(this.$store.state.betZone, 'shakeStatus', true)
    this.shake()
  },
  // 组件销毁前事件
  beforeDestroy () {
    this.$store.state.site.betListShow = true // 初始化
    this.$store.state.site.awardShow = false // 初始化
  }
}
</script>
