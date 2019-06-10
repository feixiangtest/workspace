<template>
    <div class="pk10">
        <div :key="game + index" v-for="(game,index) in list" v-if="!klsfLuziShow">
            <!-- 判断是否需要大的分类(比如 冠亚和，冠军，亚军 的分类) -->
            <div v-if="index===0 && showBetTitle">
            </div>
            <div class="item-stable item" @click="changeCurrentGame(index)" v-else>
                <span >
                  <i v-if="showIcon" class="icon ion-minus" :id="['iclass'+index]"></i>
                  <i v-if="showIcon" class="icon ion-plus" :id="['iclass_plus'+index]" style="display: none;"></i>
                {{game.name}}
                </span>
            </div>

            <div class="item-accordion" :id="['item'+index]">
                <div class="bet-li">
                  <!-- 快乐十分的展示效果  nowMode 表示连码-->
                    <dl :key=" 'klsf_' + i " v-for="(gitem, i) in game.oddsList" @click="selectBet(gitem, $event)"
                    :class="{'on':gitem === selectedRule || selectedBall.indexOf(gitem) >= 0,
                    'bet_disabled':nowMode === 2591000 && index>0 && selectedBall.indexOf(gitem) < 0 && lianmaSelect,
                    'yo-lianma-dl':nowMode === 2591000 && index === 1}">
                        <dt style="line-height:23px;">
                            <span v-if="isNaN(gitem.project)">{{gitem.project}}</span>
                            <span v-if="!isNaN(gitem.project) && (lotteryId==='13' || lotteryId==='73' || lotteryId==='74')"> <!-- 13 是 重庆幸运农场 -->
                                <i class="ball-c fruit" :class="['fruit'+gitem.project]"></i>
                            </span>
                            <span v-if="!isNaN(gitem.project) && lotteryId!=='13' && lotteryId!=='73' && lotteryId!=='74'">
                                <span><i style="line-height: 36px;" class="blueBalls" :class="['blueBs'+gitem.project]">{{gitem.project}}</i></span>
                            </span>
                        </dt>
                        <dd v-if="nowMode!= 2591000"><b class="assertive">{{gitem.odds | noBetFilter}}</b></dd>
                        <dd v-else-if="index===0"><b class="assertive">{{gitem.odds | noBetFilter}}</b></dd>

                    </dl>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
         <!-- 路子长龙信息 -->
        <!--<klsf v-if="luziShow"></klsf>-->
    </div>
</template>
<script>
// import klsf from '../luzi/klsf'
import * as filter from '../../../filter/betlistFilter'
export default {
  props: {
    lotteryId: String,
    gameList: Array,
    nowMode: Number,
    showIcon: Boolean,
    Height: String,
    showBetTitle: Boolean
  },
  components: {
//  klsf
  },
  data () {
    return {
      selectedRule: null, // 连码选择的类型，比如“选二任选”
      selectedBall: [] // 已经选择的球号
    }
  },
  watch: {
    currentNo () {
      this.selectedBall = []
      this.$store.state.betZone.klsf_lianma_select = false
      this.$store.state.betZone.selectedList = []
      this.$store.state.betZone.doBetList = []
      this.$store.state.site.show = true// 关闭当前页面
      window.layer.closeAll()
    },
    betDisabled () {
      if (!this.$store.state.betZone.isDisabled) {
        this.$store.state.betZone.klsf_lianma_select = false
        this.$store.state.betZone.selectedList = []
        this.$store.state.betZone.doBetList = []
        this.$store.state.betZone.isDisabled = true
      }
    }
  },
  computed: {
    list () {
      let rtypeId = this.$store.state.site.nowMode // 获取玩法
      let newlist = []
      if (this.lotteryId !== '16' && rtypeId !== 2 && rtypeId !== 1 && rtypeId !== 2591000) { // 不等于广西快乐十分
        newlist = filter.klsfFilter(this.gameList)
      } else if (rtypeId === 2591000) { // 连码
        newlist = filter.klsflianmaFilter(this.gameList)
        this.selectedRule = newlist[0].oddsList[0]// 连码初始化默认勾选“选二任选”
        this.$store.state.betZone.selectedRule = newlist[0].oddsList[0] // 将选择的类型存到store中
      } else if (window._indexOf([2020000, 2030000, 2040000, 2050000, 2060000], rtypeId) >= 0) { // 广西快乐十分第一球
        newlist = this.gameList
        for (let i = 0; i < newlist.length; i++) {
          if (newlist[i].oddsList.length > 21 && window._indexOf(['第一球', '第二球', '第三球', '第四球', '第五球'], newlist[i].name) >= 0 && newlist[i].oddsList[21].project !== '红') {
            newlist[i].oddsList.splice(30, 1, ...newlist[i].oddsList.splice(31, 1, newlist[i].oddsList[30]))
            let list = [...newlist][i].oddsList.splice(21, 8)
            for (let j = 0; j < list.length; j++) {
              newlist[i].oddsList.push(list[j])
            }
          }
        }
      } else {
        newlist = this.gameList
      }
      this.selectedBall = [] // 清空已经选择的球号
      this.$store.state.betZone.selectedList = [] // 清空已经选择的球号
      this.$store.state.betZone.klsf_lianma_select = false // 所选球号数设置为没满
      return newlist
    },
    /** footer 判断连码或者直选清空 */
    betDisabled () {
      console.info('betDisabled 2')
      return this.$store.state.betZone.isDisabled
    },
    /** 长龙路子显示隐藏  */
    klsfLuziShow () {
      return this.$store.state.betZone.klsfLuziShow
    },
    /** 监听当前期数 */
    currentNo () {
      console.info('currentNo 3')
      return this.$store.state.betZone.currentPeriodNo
    },
    /** 监听是否可以投注 */
    betState () {
      console.info('betState 4')
      return this.$store.state.betZone.bettingState
    },
    lianmaSelect () {
      console.info('lianmaSelect 5')
      return this.$store.state.betZone.klsf_lianma_select
    }
  },
  methods: {
    changeCurrentGame (index) {
      this.$emit('changeCurrentGame', index) // 子组件调用父组件的逻辑
    },
    selectBet (gitem, event) {
      console.info(gitem)
      if (this.betState === 0) {
        return
      }
      let rtypeId = this.$store.state.site.nowMode // 获取玩法
      if (rtypeId === 2591000) { // 如果是连码
        let index = this.gameList[0].oddsList.indexOf(gitem)
        if (index >= 0) { // 判断选择的是否是连码中的类型，比如“选二任选”
          this.selectedRule = gitem // 切换类型
          // 对所选球号个数做处理
          if (gitem.typeId === 2591070 || gitem.typeId === 2591080) { // “选四任选”或“选五任选”
            if (this.selectedBall.length > 6) { // 选择的球数大于6
              this.selectedBall.splice(6, this.selectedBall.length)
            }
          } else if (this.selectedBall.length < 8) { // 其它类型，并且所选的球数小于8
            this.$store.state.betZone.klsf_lianma_select = false
          }
        } else { // 选择的是球号
          // 判断该球号是否已经选择，1、如果已经选择则取消选择；2、未选择则勾选
          if (this.selectedBall.indexOf(gitem) >= 0) {
            let index = this.selectedBall.indexOf(gitem)
            this.selectedBall.splice(index, 1)
            this.$store.state.betZone.klsf_lianma_select = false
          } else {
            let typeId = this.selectedRule.typeId
            console.info(typeId)
            if ((typeId === 2591070 || typeId === 2591080) && this.selectedBall.length < 6) { // 如果连码的类型是“选四任选”或“选五任选”，则控制选择的球数不能超过6个
              this.selectedBall.push(gitem)
              if (this.selectedBall.length === 6) {
                this.$store.state.betZone.klsf_lianma_select = true
              }
            }
            if (!(typeId === 2591070 || typeId === 2591080) && this.selectedBall.length < 8) { // 如果连码的类型不是“选四任选”或“选五任选”，则控制选择的球数不能超过8个
              this.selectedBall.push(gitem)
              if (this.selectedBall.length === 8) {
                this.$store.state.betZone.klsf_lianma_select = true
              }
            }
            this.playMusic('chatAudio')
          }
        }
      } else { // 非“连码”类型
        let index = this.selectedBall.indexOf(gitem)
        if (index < 0) { // 该球没有选择，则设置为已选择
          this.playMusic('chatAudio')
          this.selectedBall.push(gitem)
        } else { // 该球已经选择，则取消选择
          this.selectedBall.splice(index, 1)
        }
      }
      this.$store.state.betZone.selectedList = this.selectedBall // 将选择的球号存到store中
      this.$store.state.betZone.selectedRule = this.selectedRule // 将选择的类型存到store中
    }
  }
}
</script>

