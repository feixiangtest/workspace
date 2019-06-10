<template>
    <div class="pk10">
        <div :key="game + index" v-for="(game,index) in newlist" class="">
            <div class="item-stable item" @click="changeCurrentGame(index)">
                <span >
                  <i v-if="showIcon" class="icon ion-minus" :id="['iclass'+index]"></i>
                  <i v-if="showIcon" class="icon ion-plus" :id="['iclass_plus'+index]" style="display: none;"></i>
                {{game.name}}
                </span>
            </div>

            <div class="item-accordion" :id="['item'+index]">
                <div class="bet-li">
                   <!-- 秒秒彩的展示效果  betItemWidth 表示龙虎斗-->
                    <dl :key=" 'ssc_' + index " v-for="(gitem, index) in game.oddsList" class="" @click="selectBet(gitem, $event)"
                    :class="{ 'betItemWidth': nowMode == 2312500,
                              'on': $store.state.betZone.doBetList.indexOf(gitem) >= 0 ||
                                    $store.state.betZone.prelist.indexOf(gitem) >= 0 ||
                                    $store.state.betZone.midlist.indexOf(gitem) >= 0 ||
                                    $store.state.betZone.afterlist.indexOf(gitem) >= 0}">
                        <dt v-if="gitem.project.length < 5">
                            <span v-if="isNaN(gitem.project)" class="" style="line-height: 23px">{{gitem.project}}</span>
                            <span v-if="!isNaN(gitem.project)">
                                <span class=""><i style="line-height: 36px;" class="blueBalls" :class="['blueBs'+gitem.project]">{{gitem.project}}</i></span>
                            </span>
                        </dt>
                        <dt v-if="gitem.project.length > 5" style="padding:0 0;">
                            <span v-if="isNaN(gitem.project)" class="" style="line-height: 18px; font-size: 12px"
                                  v-html="$options.filters.addBr(gitem.project)">
                            </span>
                            <span v-if="!isNaN(gitem.project)">
                                <span class=""><i style="line-height: 36px;" class="blueBalls" :class="['blueBs'+gitem.project]">{{gitem.project}}</i></span>
                            </span>
                        </dt>
                        <dd><b class="assertive">{{gitem.odds | noBetFilter}}</b></dd>

                    </dl>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as filter from '../../../filter/betlistFilter'
export default {
  props: {
    lotteryId: String,
    gameList: Array,
    nowMode: Number,
    showIcon: Boolean
  },
  data () {
    return {
      newlist: []
    }
  },
  filters: {
    addBr (res) {
      if (res.indexOf('(') === 1) {
        var onePiece = res.split('(')
        var one1 = onePiece[0]
        var one2 = '(' + onePiece[1]
        return one1 + '<br>' + one2
      }
      return res
    }
  },
  /** 首次进入该页面会created 和 watch ，created是为了右侧菜单重新回到该页面时使用 */
  created () {
    this.listvaild()
    window.clearInterval(this.$store.state.betZone.timer)
  },
  watch: {
    gameList (curval, oldval) {
      this.listvaild()
    }
  },
  mounted () { // 不依赖 init 接口
    window.document.documentElement.style.fontSize = '100%' // 设置默认字体大小，否则秒秒彩开奖页面返回会影响字体样式
    document.getElementById('app').style.property = 'position: fixed; width: 100%; height: 100%;'
    this.resetData()
  },
  computed: {
    show () {
      return this.$store.state.site.show
    },
    /** 监听是否可以投注  */
    betState () {
      return this.$store.state.betZone.bettingState
    }
  },
  methods: {
    resetData () {
      this.$store.state.site.show = true// 关闭当前页面
      window.layer.closeAll()
      this.$store.state.betZone.doBetList = [] // 清空上一轮选择
      this.$store.state.betZone.prelist = [] // 清空上一轮选择
      this.$store.state.betZone.midlist = [] // 清空上一轮选择
      this.$store.state.betZone.afterlist = [] // 清空上一轮选择
    },
    listvaild () {
      console.info('watch gamelist')
      this.resetData()
      // 传入的gameList改变， 说明改变玩法或者改变彩票类型
      let rtypeId = this.$store.state.site.nowMode // 获取玩法
      let title = this.$store.state.site.nowTitle // 玩法名
      let newlist = []
      if (rtypeId === 2310000 && title !== '整合') {
        newlist = filter.sscFilter(title, rtypeId, this.gameList)
      } else if (rtypeId === 2310000 && title === '整合') {
        newlist = [...this.gameList] // 数组拷贝
        // 把数组最后一位移到第一位，先展示龙虎/总和
        newlist.unshift(newlist[5])
        newlist.splice(-1, 1)
        for (let i = 0; i < newlist.length; i++) {
          if (newlist[i] !== undefined && newlist[i].name !== '总和/龙虎' && newlist[i].oddsList[0].project !== '大') { // 把数字和大小单双质合重新排序显示
            newlist[i].oddsList.splice(6, 0, ...newlist[i].oddsList.splice(0, 10))
            // 数组互换位置（根据下标改变） 单双大小质合->大小单双质合
            newlist[i].oddsList.splice(0, 1, ...newlist[i].oddsList.splice(2, 1, newlist[i].oddsList[0]))
            newlist[i].oddsList.splice(1, 1, ...newlist[i].oddsList.splice(3, 1, newlist[i].oddsList[1]))
          }
        }
      } else {
        newlist = this.gameList
      }
      this.newlist = newlist
    },
    changeCurrentGame (index) {
      this.$emit('changeCurrentGame', index) // 子组件调用父组件的逻辑
    },
    selectBet (gitem, event) { // 选中球
      if (this.betState === 0) {
        return
      }
      if (this.nowMode === 2391000 || this.nowMode === 2392000) { // 组三， 组六
        if (this.$store.state.betZone.prelist.indexOf(gitem) >= 0 || this.$store.state.betZone.midlist.indexOf(gitem) >= 0 || this.$store.state.betZone.afterlist.indexOf(gitem) >= 0) {
          this.doDelete(gitem)
        } else {
          this.doAdd(gitem)
        }
      } else {
        if (this.$store.state.betZone.doBetList.indexOf(gitem) >= 0) { // 数组中已经存在，则删除
          let index = this.$store.state.betZone.doBetList.indexOf(gitem)
          this.$store.state.betZone.doBetList.splice(index, 1)
        } else {
          this.playMusic('chatAudio')
          this.$store.state.betZone.doBetList.push(gitem)
        }
      }
    },
    doDelete (gitem) {
      let typeId = gitem.typeId
      switch (typeId) {
        case 2391010:
        case 2392010:
          let i = this.$store.state.betZone.prelist.indexOf(gitem)
          this.$store.state.betZone.prelist.splice(i, 1)// 前三，前六数组
          break
        case 2391020:
        case 2392020:
          let j = this.$store.state.betZone.midlist.indexOf(gitem)
          this.$store.state.betZone.midlist.splice(j, 1) // 中三，中六数组
          break
        case 2391030:
        case 2392030:
          let k = this.$store.state.betZone.afterlist.indexOf(gitem)
          this.$store.state.betZone.afterlist.splice(k, 1)// 后三，后六数组
          break
      }
    },
    doAdd (gitem) {
      let typeId = gitem.typeId
      switch (typeId) {
        case 2391010:
        case 2392010:
          gitem.typeName = '(前三)'
          this.playMusic('chatAudio')
          this.$store.state.betZone.prelist.push(gitem) // 前三，前六数组
          break
        case 2391020:
        case 2392020:
          gitem.typeName = '(中三)'
          this.playMusic('chatAudio')
          this.$store.state.betZone.midlist.push(gitem) // 中三，中六数组
          break
        case 2391030:
        case 2392030:
          gitem.typeName = '(后三)'
          this.playMusic('chatAudio')
          this.$store.state.betZone.afterlist.push(gitem)// 后三，后六数组
          break
      }
    }
  }
}
</script>

