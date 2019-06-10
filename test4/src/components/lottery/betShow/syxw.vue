<template>
    <div class="pk10">
        <div :key="game + index" v-for="(game,index) in list" class="" v-if="!syxwLuziShow">
            <!-- 判断是否需要大的分类(比如 冠亚和，冠军，亚军 的分类) -->
            <div v-if="index===0 && showBetTitle">
            </div>
            <div class="item-stable item" @click="nowMode !== 2100000 && changeCurrentGame(index)" v-else-if="nowMode !== 2110000">
                <span >
                  <i v-if="showIcon" class="icon ion-minus" :id="['iclass'+index]"></i>
                  <i v-if="showIcon" class="icon ion-plus" :id="['iclass_plus'+index]" style="display: none;"></i>
                {{game.name}}
                </span>
            </div>
            <!-- 直选判断 -->
            <div v-show="index === 0 || (selectedRule !== null && selectedRule.typeId === 2110010 && index !== 3) ||
            (selectedRule !== null && selectedRule.typeId === 2110020)" class="item-stable item"  v-else>
                <span >
                  <i v-if="showIcon" class="icon ion-minus" :id="['iclass'+index]"></i>
                  <i v-if="showIcon" class="icon ion-plus" :id="['iclass_plus'+index]" style="display: none;"></i>
                {{game.name}}
                </span>
            </div>

            <!-- 除了直选，其他的玩法都走这里 -->
            <div class="item-accordion" :id="['item'+index]"  v-if="nowMode != 2110000">
                <div :class="classBetLi(index)">
                  <!-- 十一选五的展示效果 nowMode 2100000表示连码 -->
                    <dl :key="'syxw_' + k" v-for="(gitem, k) in game.oddsList" class="" @click="selectBet(gitem, $event)"
                    :class="{'on': selectedRule === gitem || selectedList.indexOf(gitem) >=0,
                             'bet_disabled':nowMode== 2100000 && index==1 && disabled,
                             'bet_abled': nowMode== 2100000 && index==1 && selectedList.indexOf(gitem) >=0, //如果满足该条件，会把 bet_disabled 的样式覆盖
                             'betItemHeightType':nowMode== 2100000 && index==1 }">
                        <dt style="line-height:23px">
                            <span v-if="isNaN(gitem.project)" class="">{{gitem.project}}</span>
                            <span v-if="!isNaN(gitem.project)">
                                <span class=""><i style="line-height: 36px;" class="blueBalls" :class="['blueBs'+gitem.project]">{{gitem.project}}</i></span>
                            </span>
                        </dt>
                        <dd v-if="!showBetTitle"><b class="assertive">{{gitem.odds | noBetFilter}}</b></dd>
                        <dd v-else-if="index===0"><b class="assertive">{{gitem.odds | noBetFilter}}</b></dd>
                    </dl>
                    <div class="clearfix"></div>
                </div>
            </div>

            <!-- 直选走这里 -->
            <!--
              index === 0 表示第一个永远显示
              selectedRule !== null && selectedRule.typeId === 2110010 && index !== 3 表示选中的是 前二直选
              selectedRule !== null && selectedRule.typeId === 2110020 表示选中的是 前三直选
            -->
            <div v-show="index === 0 || (selectedRule !== null && selectedRule.typeId === 2110010 && index !== 3) ||
            (selectedRule !== null && selectedRule.typeId === 2110020)"
             class="item-accordion" :id="['item'+index]"  v-if="nowMode == 2110000">
                <div class="bet-li">
                  <!-- 十一选五的展示效果 nowMode   2110000 表示直选-->
                    <dl :key="'syxw_' + k" v-for="(gitem, k) in game.oddsList" class="" @click="selectBetzhixuan(gitem, $event)"
                    :class="{'on': selectedRule === gitem || zhixuan_first_select.indexOf(gitem) >=0 || zhixuan_second_select.indexOf(gitem) >=0
                                    || zhixuan_three_select.indexOf(gitem) >=0,
                             'bet_disabled': (index == 2 || index == 3) && firstBallDisabled(gitem) ||
                                             (index == 1 || index == 3) && secondBallDisabled(gitem) ||
                                             (index == 1 || index == 2) && threeBallDisabled(gitem),
                             'betItemHeight':nowMode== 2110000 && index!=0}">
                        <dt style="line-height:23px">
                            <span v-if="isNaN(gitem.project)" class="">{{gitem.project}}</span>
                            <span v-if="!isNaN(gitem.project)">
                                <span class=""><i style="line-height: 36px;" class="blueBalls" :class="['blueBs'+gitem.project]">{{gitem.project}}</i></span>
                            </span>
                        </dt>
                        <dd v-if="!showBetTitle"><b class="assertive">{{gitem.odds | noBetFilter}}</b></dd>
                        <dd v-else-if="index===0"><b class="assertive">{{gitem.odds | noBetFilter}}</b></dd>
                    </dl>
                    <div class="clearfix"></div>
                </div>
            </div>
            <!--用于连码 当下注详情删除记录时判断球是否可以下注 -->
            <div style="display:none" >{{isDisabed}}</div>
        </div>
        <!-- 路子长龙 -->
        <!--<xw v-if="luziShow"></xw>-->
    </div>
</template>
<script>
import * as filter from '../../../filter/betlistFilter'
import * as syxwfilter from '../../../filter/syxwFilter'
// import xw from '../luzi/xw'
let match = syxwfilter.lianmaZhixuanMatch()
export default {
  props: {
    lotteryId: String,
    gameList: Array,
    nowMode: Number,
    showIcon: Boolean,
    showBetTitle: Boolean
  },
  components: {
//  xw
  },
  data () {
    return {
      disabled: true,
      selectedRule: null, // 用于连码，直选里面的子玩法，该字段控制用户只能选择一种子玩法
      selectedList: [], // 用于保存选中的球(直选不用该变量)
      zhixuan_first_select: [], // 直选第一个球的数组
      zhixuan_second_select: [], // 直选第二个球的数组
      zhixuan_three_select: [] // 直选第三个球的数组
    }
  },
  watch: {
    currentNo () {
      this.resetData()
      this.$store.state.site.show = true// 关闭当前页面
      window.layer.closeAll()
    },
    betDisabled () {
      if (!this.$store.state.betZone.isDisabled) {
        this.resetData()
      }
    }
  },
  computed: {
    isDisabed () {
      if (!this.$store.state.betZone.bet_disabled) {
        console.info('isDisabed')
        this.disabled = false
        // 重置回true
        this.$store.state.betZone.bet_disabled = true
      }
    },
    /** footer 判断连码或者直选清空 */
    betDisabled () {
      return this.$store.state.betZone.isDisabled
    },
    /** 长龙路子显示隐藏  */
    syxwLuziShow () {
      return this.$store.state.betZone.syxwLuziShow
    },
    /** 监听当前期数 */
    currentNo () {
      return this.$store.state.betZone.currentPeriodNo
    },
    /** 监听是否可以投注 */
    betState () {
      return this.$store.state.betZone.bettingState
    },
    list () {
      console.info(this.gameList)
      /** 切换玩法，重新进入后初始化数据 **/
      this.resetData(1)
       /** 切换玩法，重新进入后初始化数据  end**/
      let rtypeId = this.nowMode // 获取玩法
      let newlist = []
      if (rtypeId === 2100000) { // 连码
        newlist = filter.syxwlianmaFilter(this.gameList)
        this.selectedRule = newlist[0].oddsList[0]// 连码初始化默认勾选“选二任选”
        this.$store.state.betZone.selectedRule = newlist[0].oddsList[0] // 将选择的类型存到store中
        this.disabled = false
      } else if (rtypeId === 2110000) { // 直选
        newlist = filter.syxwzhixuanFilter(this.gameList)
        this.selectedRule = newlist[0].oddsList[0]
        this.$store.state.betZone.selectedRule = newlist[0].oddsList[0] // 将选择的类型存到store中
      } else {
        newlist = this.gameList
      }
      return newlist
    }
  },
  methods: {
    /** 清空数据 */
    resetData (flag) {
      if (flag === 1) {
        this.selectedRule = null
        this.$store.state.betZone.selectedRule = null
      }
      this.$store.state.betZone.isDisabled = true
      // this.disabled = true
      this.selectedList = []
      this.zhixuan_first_select = []
      this.zhixuan_second_select = []
      this.zhixuan_three_select = []
      this.$store.state.betZone.selectedList = []
      this.$store.state.betZone.zhixuan_first_select = []
      this.$store.state.betZone.zhixuan_second_select = []
      this.$store.state.betZone.zhixuan_three_select = []
      this.$store.state.betZone.doBetList = []
      this.$store.state.site.show = true// 关闭当前页面
      window.layer.closeAll()
      this.disabled = false
    },
    changeCurrentGame (index) {
      this.$emit('changeCurrentGame', index) // 子组件调用父组件的逻辑
    },
    // 直选调用的逻辑，
    selectBetzhixuan (gitem, event) {
      console.info('gitem:', gitem)
      if (this.betState === 0) {
        return
      }
      if (gitem.typeId === 2110010 || gitem.typeId === 2110020) {
        this.selectedByzhilian(gitem)
      } else if (this.zhixuan_first_select.indexOf(gitem) >= 0 || this.zhixuan_second_select.indexOf(gitem) >= 0 ||
      this.zhixuan_three_select.indexOf(gitem) >= 0) {
        // 表示在数组中已存在，则移除选中的状态
        syxwfilter.zhixuandelete(gitem, this.zhixuan_first_select, this.zhixuan_second_select, this.zhixuan_three_select)
      } else {
        // 判断可以添加到数组中的逻辑
        syxwfilter.zhixuanadd(gitem, this.zhixuan_first_select, this.zhixuan_second_select, this.zhixuan_three_select)
      }
      // 上面逻辑判断完后， 重新赋值
      this.$store.state.betZone.zhixuan_first_select = this.zhixuan_first_select
      this.$store.state.betZone.zhixuan_second_select = this.zhixuan_second_select
      this.$store.state.betZone.zhixuan_three_select = this.zhixuan_three_select
    },
    selectedByzhilian (gitem) { // 直选
      if (this.selectedRule !== gitem) { // 选中，并且之前的不相等
        this.selectedRule = gitem
        this.$store.state.betZone.selectedRule = this.selectedRule
      // 清空以前选中的球
        this.zhixuan_first_select = []
        this.zhixuan_second_select = []
        this.zhixuan_three_select = []
      }
    },
    // 判断直选玩法中第一球选中后， 第二球和第三球是否是disable状态
    firstBallDisabled (gitem) {
      return syxwfilter.firstBallDisabled(gitem, this.zhixuan_first_select)
    },
    // 判断直选玩法中第二球后， 第一球和第三球是否是disable状态
    secondBallDisabled (gitem) {
      return syxwfilter.secondBallDisabled(gitem, this.zhixuan_second_select)
    },
    // 判断直选玩法中第三球后， 第一球和第二球是否是disable状态
    threeBallDisabled (gitem) {
      return syxwfilter.threeBallDisabled(gitem, this.zhixuan_three_select)
    },
    /** 通用的选择**/
    selectBet (gitem, event) {
      console.log('通用:', gitem)
      if (this.betState === 0) {
        return
      }
      if (gitem.typeId === 2100010) {
        this.selectedBylianma(gitem)
      } else if (this.selectedList.indexOf(gitem) >= 0) { // 表示在数组中已存在，则移除选中的状态
         // 数字
        let index = this.selectedList.indexOf(gitem)
        this.selectedList.splice(index, 1)
        this.disabled = false
      } else { // 选中状态
        if (!gitem.typeId && this.disabled) { // 连码，直选的号码没有typeId
          return
        }
        if (this.selectedRule !== null) { // 连码选中了子玩法才可以选择球
          this.canSelectBallCount(gitem)
        } else { // 不是连码的普通玩法
          this.playMusic('chatAudio')
          this.selectedList.push(gitem)
        }
      }
      // 逻辑完了后，重新赋值
      this.$store.state.betZone.selectedList = this.selectedList
    },
    selectedBylianma (gitem) { // 连码
      if (this.selectedRule !== gitem) { // 选中，并且之前的不相等
        this.selectedRule = gitem
        this.disabled = false
        this.$store.state.betZone.selectedRule = this.selectedRule
        this.selectedList = [] // 以前选中的球都清空
      }
    },
    canSelectBallCount (gitem) { // 根据选中的字玩法，判断能选择多少个球
      let obj = match[this.selectedRule.project]
      if (this.selectedList.length < obj.max) {
        this.selectedList.push(gitem)
      }
      if (this.selectedList.length === obj.max) {
        this.disabled = true
      }
    },
    /**
     * 连码的'选择号码'宽度需要做特别处理
     */
    classBetLi (index) {
      if ((this.nowMode === 2100000) && index === 0) { // 连码
        return 'lhc-bet-li'
      } else {
        return 'bet-li'
      }
    }
  }
}
</script>

