<template>
  <div class="yoContain">
    <router-view></router-view>
    <MusicComponent></MusicComponent>
  </div>
</template>

<script>
import * as lotteryDetail from 'config/lotteryDetail'
import * as types from 'store/betZone/type'
import * as lotteryMap from 'config/lotteryMap'
import * as mapping from 'config/mappingDefaultId'
export default {
  name: 'app',
  mounted () {
    var ua = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(ua)) { // ios双击禁用缩放
      var lastTouchEnd = 0
      document.documentElement.addEventListener('touchend', function (event) {
        let now = (new Date()).getTime()
        if (now - lastTouchEnd <= 300) {
          event.preventDefault()
        }
        lastTouchEnd = now
      }, false)
    }
    // 浏览器前进后退处理
    window.onpopstate = () => {
      this.$store.state.site.show = true// 关闭当前页面
      window.layer.closeAll()
      // this.$store.state.site.nowPosition = 0
      if (!window.store.state.site.allowBack && !window.store.state.betZone.isSimulate && !window.store.state.betZone.isPause &&
       this.$store.state.betZone.doBetList.length > 0 && Number(window.store.state.betZone.postData.betTime) > Number(window.store.state.betZone.awardTimes)) {
        window.layer.confirm('开奖进行中，是否要中断开奖', function () {
          window.store.state.betZone.isPause = true
        }, function () {}
        )
        history.go(1)
      } else {
        this.$store.state.betZone.prelist.splice(0, this.$store.state.betZone.prelist.length)
        this.$store.state.betZone.midlist.splice(0, this.$store.state.betZone.midlist.length)
        this.$store.state.betZone.afterlist.splice(0, this.$store.state.betZone.afterlist.length)
        this.$store.state.betZone.doBetList.splice(0, this.$store.state.betZone.doBetList.length)
        let path = this.$route.fullPath.split('/')[2]
        this.$store.state.site.awardShow = false

        if (lotteryDetail.playType[path]) {
          let lotteryId = Number(lotteryDetail.playType[path].id)
          // 存储彩票ID
          this.$store.state.site.lotteryId = lotteryId
          // 存储游戏名称
          let lotteryList = this.$store.state.home.lotteryList
          for (let i in lotteryList) {
            for (let j in lotteryList[i].lotteryType) {
              if (Number(lotteryList[i].lotteryType[j].lotteryId) === Number(lotteryDetail.playType[path].id)) {
                this.$store.state.site.nowLotteryName = lotteryList[i].lotteryType[j].lotteryName
                break
              }
            }
          }

          let shortName = lotteryMap.LotterySrc[lotteryId] // 获取彩票类型的简写 如一分赛车(yfsc)
          let play = lotteryDetail.playType[shortName] // 获取指定玩法和其他信息
          this.$store.state.site.lotteryPlayType = play // 将玩法存在site里面的playType
          this.$store.state.site.nowTitle = play.rtype[0].name // 获取默认玩法的名字
          this.$store.state.site.nowMode = play.rtype[0].type_id// 获取默认玩法的type_id
          localStorage.setItem(shortName.toUpperCase() + '_PLAYTYPE_H5', JSON.stringify(play)) // 保存游戏玩法 YFSC_PLAYTYPE

          /* 根据lotteyId 获取该id的彩种系列对应的defaultId */
          let defaultId = mapping.mapp[lotteryId]
          let param = {
            lotteryId: lotteryId
          }
          if (play.rtype[0].type_id !== null) {
            param['rtype'] = play.rtype[0].type_id
          }
          // 获取到彩票赔率版本号信息，因为彩票需要特殊处理
          // 这里将lotteryId 改成defaultId 用于查询系列对应的赔率是否存在 by vito
          let versionList = window.lotteryMain.lotteryVersionFun('showBet', 'showBetVersionKey',
            defaultId, param['rtype'] !== null ? param['rtype'] : '')
          param['list'] = versionList
          // 获取玩法
          if (lotteryId === 100) {
            this.$store.dispatch(types.BET_ODDS, param)
          }
        }
      }
    }
    // 聚焦失焦事件
    window.$(document).off('focusout.lottery focusin.lottery').on('focusout.lottery focusin.lottery', 'input, textarea', event => {
      // 如果聚焦
      if (event.type === 'focusin') {
        window.$('#betfooter').css({position: 'absolute', bottom: '0'})
      } else { // 失焦
        window.$('#betfooter').css({position: 'fixed', bottom: '0'})
      }
    })
  }
}
</script>
<style lang='less'>
  @import './assets/less/app.less';
</style>

