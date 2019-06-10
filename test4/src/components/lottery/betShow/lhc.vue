<template>
    <div class="pk10">
        <div :key="game + index" v-for="(game,index) in list" class="" v-if="!lhcLuziShow">
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
                <!-- 2490040 : 连肖连尾, 连肖连尾的'选择号码'宽度需要做特别处理 -->
                <div :class="classBetLi(index)">
                 <!-- 香港六合彩  DOTO 球的颜色规则没做-->
                    <dl :key="'lhc_' + i " v-for="(gitem, i) in game.oddsList" @click="selectBet(gitem, $event)"
                    :class="classObject(gitem, index)" >
                        <dt :class="{'zhengMa':index === 0 && nowMode === 2430010}">
                            <span v-if="isNaN(gitem.project)">{{projectOrTypeName(gitem)}}</span>
                            <span v-if="nowMode === 2470000 && index === 0">{{gitem.typeName}}</span>
                            <span v-if="!isNaN(gitem.project) && nowMode === 2460000" style="line-height:42px">
                                <i style="padding-top: 2px;" class="bColor" :class="getColor(gitem.project)">{{gitem.project}}</i>
                            </span>
                            <span v-if="nowMode === 2470000 && index !== 0" style="line-height:42px">
                                <i style="padding-top: 2px;" class="bColor" :class="getColor(gitem.project)">{{gitem.project}}</i>
                            </span>
                            <i style="padding-top: 2px;" v-if="!isNaN(gitem.project) && nowMode !== 2460000 && nowMode !== 2470000" class="bColor" :class="getColor(gitem.project)">{{gitem.project}}</i>
                        </dt>
                        <!--2410050：合肖   2490040 : 连肖连尾-->
                        <dd v-if="nowMode === 2410050 || nowMode === 2490040 ">
                          <b class="assertive" style="color:#000;font-size:11px;">{{gitem.num}}</b>
                        </dd>
                        <dd v-else>
                          <b class="assertive" style="color:#000;font-weight:bold;" :style="(nowMode === 2460000 || nowMode === 2470000) && index === 0 ? 'font-size:10px;':''">
                            <b v-if="nowMode === 2460000 && index === 0">{{gitem.project}}</b>
                            {{gitem.odds | noBetFilter}}
                          </b>
                        </dd>
                    </dl>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
         <!-- 路子长龙信息 -->
        <!--<lhc v-if="luziShow"></lhc>-->
    </div>
</template>
<script>
// import lhc from '../luzi/lhc'
import * as filter from '../../../filter/lhcFilter'
import * as betlistFilter from '../../../filter/betlistFilter'
import * as types from 'store/betZone/type'
export default {
  props: {
    lotteryId: String,
    gameList: Array,
    nowMode: Number,
    showIcon: Boolean,
    showBetTitle: Boolean
  },
  components: {
//  lhc
  },
  data () {
    return {
      selectedRule: [], // 选择的类型，比如“四全中”、“三全中”
      selectedBall: [], // 已经选择的球号
      isLianXiao: true, // 是否是连肖，用于'连肖连尾'
      isInit: true, // 第一次进六合彩界面
      selectIndex: 0 // 正码特的类型，默认为正码一
    }
  },
  watch: {
    /** 期数改变，清空选中的数据 **/
    currentNo () {
      this.resertData()
      this.$store.state.site.show = true// 关闭当前页面
      window.layer.closeAll()
    },
    /**
     * 监听当前游戏玩法是否改变，改变的话需要清空已经选择的球号
     */
    nowMode: function (val) {
      this.resertData()
      this.selectedRule = [] // 清空连码的选择类型
      // console.info('nowMode change:', val)
    },
    /**
     * 监听选择类型，如果选择类型改变，需要清空已选择的球号
     */
    selectedRule: function (val) {
      this.selectedBall.splice(0, this.selectedBall.length) // 清空已经选择的球号
    }
  },
  computed: {
    /** 监听当前期数 */
    currentNo () {
      return this.$store.state.betZone.currentPeriodNo
    },
    /** 监听是否可以投注 */
    betState () {
      return this.$store.state.betZone.bettingState
    },
    /** 长龙路子显示隐藏  */
    lhcLuziShow () {
      return this.$store.state.betZone.lhcLuziShow
    },
    list () {
      let rtypeId = this.$store.state.site.nowMode // 获取玩法
      let newlist = []
      filter.updateCurrentZodiac(this.$store.state.betZone.currentZodiac)
      rtypeId !== 2430010 && (this.selectIndex = 0) // 初始化正码特玩法
      if (rtypeId === 2460000 || rtypeId === 2470000) { // 连码和自选不中
        newlist = betlistFilter.lhclianmaFilter(this.gameList)
        this.selectedRule = newlist[0].oddsList[0]// 连码初始化默认勾选“四全中” 自选不中默认选择五不中
        this.$store.state.betZone.lianMaRule = newlist[0].oddsList[0]
      } else if (rtypeId === 2490040) { // 连肖连尾,默认取连肖
        if (this.gameList[0].oddsList[0].typeId !== 2490041) { // 如果不是连肖连尾赔率，直接返回
          return
        }

        if (!this.selectedRule.typeId) { // 初始化
          this.selectedRule['typeId'] = 0 // 选择类型，默认二肖连
        }
        if (this.selectedRule.typeId < 4) { // 连肖
          newlist = filter.lhcLianXiaoFilter(this.gameList, this.selectedRule)
        } else { // 连尾
          newlist = filter.lhcLianWeiFilter(this.gameList, this.selectedRule)
        }

        if (this.isInit) { // 初始化
          this.selectedRule = []// 初始化默认 不勾选类型
          this.isInit = false // 切换为'非初始化'
        }
      } else if (rtypeId === 2410050) { // 合肖
        newlist = filter.lhcHeXiaoFilter(this.gameList, this.$store.state.betZone.currentZodiac)
        this.selectedRule = newlist[0].oddsList[0]// 合肖初始化默认勾选“中”
      } else if (rtypeId === 2430010) { // 正码特
        newlist = filter.zhengmateFilter(this.gameList)
        this.selectedRule = newlist[0].oddsList[this.selectIndex] // 切换类型，默认玩法为正码一
      } else {
        newlist = this.gameList
      }
      return newlist
    }
  },
  methods: {
    /**
     * 重置数据
     */
    resertData () {
      this.selectedBall.splice(0, this.selectedBall.length) // 清空已经选择的球号
      this.isInit = true
      this.$store.state.betZone.selectedRule = []
      this.isLianXiao = true
    },
    getColor (number) {
      return filter.colorFilter(number)
    },
    changeCurrentGame (index) {
      this.$emit('changeCurrentGame', index) // 子组件调用父组件的逻辑
    },
    selectBet (gitem, event) {
      // console.info(gitem)
      if (this.betState === 0) {
        return
      }
      let rtypeId = this.$store.state.site.nowMode // 获取玩法
      if (rtypeId === 2460000) { // 连码
        let index = this.list[0].oddsList.indexOf(gitem)
        if (index >= 0) { // 判断选择的是否是类型，比如“四全中”
          this.selectedRule = gitem // 切换类型
        } else { // 选择的是球号
          // 判断该球号是否已经选择，1、如果已经选择则取消选择；2、未选择则勾选
          let index = this.selectedBall.indexOf(gitem)
          if (index >= 0) {
            this.selectedBall.splice(index, 1) // 从已选择的球号数组中去除该球号
          } else if (this.selectedBall.length < 10) { // 控制所选球号数量不超过10个
            this.playMusic('chatAudio')
            this.selectedBall.push(gitem) // 把该球添加到已选择的球号数组
          } else {
            return
          }
        }
      } else if (rtypeId === 2470000) { // 自选不中
        let index = this.list[0].oddsList.indexOf(gitem)
        if (index >= 0) { // 判断选择的是否是类型，比如“五不中”
          this.selectedRule = gitem // 切换类型
        } else { // 选择的是球号
          // 判断该球号是否已经选择，1、如果已经选择则取消选择；2、未选择则勾选
          let index = this.selectedBall.indexOf(gitem)
          console.log(gitem)
          if (index >= 0) {
            this.selectedBall.splice(index, 1) // 从已选择的球号数组中去除该球号
          } else if ((this.selectedRule.typeId === 2470010 || this.selectedRule.typeId === 2470020 || this.selectedRule.typeId === 2470030) && this.selectedBall.length < 10) { // 5-7不中最多选择10个号码
            this.playMusic('chatAudio')
            this.selectedBall.push(gitem) // 把该球添加到已选择的球号数组
          } else if (this.selectedRule.typeId === 2470040 && this.selectedBall.length < 11) { // 8不中最多选择11个号码
            this.playMusic('chatAudio')
            this.selectedBall.push(gitem) // 把该球添加到已选择的球号数组
          } else if (this.selectedRule.typeId === 2470050 && this.selectedBall.length < 12) { // 9不中最多选择12个号码
            this.playMusic('chatAudio')
            this.selectedBall.push(gitem) // 把该球添加到已选择的球号数组
          } else if ((this.selectedRule.typeId === 2470060 || this.selectedRule.typeId === 2470070) && this.selectedBall.length < 13) { // 10、11不中最多选择13个号码
            this.playMusic('chatAudio')
            this.selectedBall.push(gitem) // 把该球添加到已选择的球号数组
          } else if (this.selectedRule.typeId === 2470080 && this.selectedBall.length < 14) { // 12不中最多选择14个号码
            this.playMusic('chatAudio')
            this.selectedBall.push(gitem) // 把该球添加到已选择的球号数组
          } else {
            return
          }
        }
      } else if (rtypeId === 2490040) { // 连肖连尾
        let index = this.list[0].oddsList.indexOf(gitem)
        if (index >= 0) { // 判断选择的是否是类型，比如“二肖连”
          this.selectedRule = gitem // 切换类型
        } else { // 选择的是号码
          // 判断该球号是否已经选择，1、如果已经选择则取消选择；2、未选择则勾选
          let index = this.selectedBall.indexOf(gitem)
          if (index >= 0) {
            this.selectedBall.splice(index, 1) // 从已选择的球号数组中去除该球号
          } else if (this.selectedBall.length < 6) { // 控制所选球号数量不超过6个
            this.selectedBall.push(gitem) // 把该球添加到已选择的球号数组
            this.playMusic('chatAudio')
          } else {
            return
          }
        }
      } else if (rtypeId === 2410050) { // 合肖
        let index = this.list[0].oddsList.indexOf(gitem)
        if (index >= 0) { // 判断选择的是否是类型，比如“中”
          this.selectedRule = gitem // 切换类型
        } else { // 选择的是号码
          // 判断该球号是否已经选择，1、如果已经选择则取消选择；2、未选择则勾选
          let index = this.selectedBall.indexOf(gitem)
          if (index >= 0) {
            this.selectedBall.splice(index, 1) // 从已选择的球号数组中去除该球号
          } else if (this.selectedRule.typeId === 0 && this.selectedBall.length < 11) { // '中'，控制所选球号数量不超过11个
            this.selectedBall.push(gitem) // 把该球添加到已选择的球号数组
            this.playMusic('chatAudio')
          } else if (this.selectedRule.typeId === 1 && this.selectedBall.length < 10) { // '不中'，控制所选球号数量不超过10个
            this.selectedBall.push(gitem) // 把该球添加到已选择的球号数组
            this.playMusic('chatAudio')
          } else {
            return
          }
        }
      } else if (rtypeId === 2430010) { // 正码特
        let index = this.list[0].oddsList.indexOf(gitem)
        if (index >= 0) { // 判断选择的是否是类型，比如“正码一”
          // this.selectedRule = gitem // 切换类型
          let rType = Number('24300' + gitem.typeId + '0')
          this.selectIndex = gitem.typeId - 1 // 改变 selectedRule 切换类型
          if (localStorage['YFLHC_BET_' + rType]) {
            this.$store.state.betZone.bettList = JSON.parse(localStorage['YFLHC_BET_' + rType])
          } else {
            let ltId = this.$store.state.site.lotteryId
            let list = { bettList: null, periodList: null, specialOdds: null }
            this.$store.dispatch(types.BET_ODDS, {list: list, lotteryId: ltId, rtype: rType}).then(res => {
              if (res && res.data && res.data.bettList) {
                this.$store.state.betZone.bettList = res.data.bettList
                localStorage['YFLHC_BET_' + rType] = JSON.stringify(res.data.bettList)
              }
            })
          }
        } else {
           // 判断该球号是否已经选择，1、如果已经选择则取消选择；2、未选择则勾选
          let index = this.selectedBall.indexOf(gitem)
          console.log(this.selectedRule)
          if (index >= 0) {
            this.selectedBall.splice(index, 1) // 从已选择的球号数组中去除该球号
          } else if (this.selectedRule.typeId) { // 已经选择了具体正码类型 如‘正码一’
            this.selectedBall.push(gitem) // 把该球添加到已选择的球号数组
            this.playMusic('chatAudio')
          } else {
            return
          }
        }
      } else { // 其它玩法
        let index = this.selectedBall.indexOf(gitem)
        if (index >= 0) { // 点击的球号已经在选择球号数组中
          this.selectedBall.splice(index, 1) // 将该球号从已选择球号数组中移除
        } else { // 点击的球号不在选择球号数组中
          this.selectedBall.push(gitem) // 将该球号添加到已选择球号数组
          this.playMusic('chatAudio')
        }
      }

      if (rtypeId === 2460000 || rtypeId === 2470000) { // 连码、自选不中需要用数组来存储多个选择类型
        this.$store.state.betZone.selectedRule = []
        this.list[0].oddsList.forEach(item => {
          if (item.typeId === this.selectedRule.typeId) {
            this.$store.state.betZone.selectedRule.push(item)
          }
        })
      } else {
        this.$store.state.betZone.selectedRule = this.selectedRule // 将选择类型存到store中
      }
      // console.info('selectedRule:', this.$store.state.betZone.selectedRule)
      this.$store.state.betZone.selectedList = this.selectedBall // 将选择的球号存到store中
      // console.info('selectBet:', this.selectedBall)
    },
    /**
     * 连肖连尾、合肖的'选择号码'宽度需要做特别处理
     */
    classBetLi (index) {
      if ((this.nowMode === 2490040 || this.nowMode === 2410050) && index !== 0) { // 连肖连尾 或者 合肖，并且不是选择类型
        return 'lhc-bet-li'
      } else if ((this.nowMode === 2460000) && index === 0) { // 连码
        return 'lhc-bet-li'
      } else {
        return 'bet-li'
      }
    },
    /**
     * 计算选择类型和选择号码的样式
     */
    classObject (gitem, index) {
      if ((isNaN(this.selectedRule) && gitem.typeId === this.selectedRule.typeId) || // 已经选择的类型
          this.selectedBall.indexOf(gitem) >= 0) { // 已经选择的号码
        return 'on' // 被选中样式
      } else if (((this.nowMode === 2460000 && this.selectedBall.length === 10) || // 连码 并且 选择的号码个数等于10
                  (this.nowMode === 2490040 && this.selectedBall.length === 6) || // 连肖连尾 并且 选择的号码个数等于6
                  (this.nowMode === 2410050 &&
                      ((this.selectedBall.length === 11 && this.selectedRule.typeId === 0) || (this.selectedBall.length === 10 && this.selectedRule.typeId === 1))
                 )) && // 合肖
                  index > 0 && this.selectedBall.indexOf(gitem) < 0) { // 选择号码 并且 该号码不在已经选择的号码中
        return 'bet_disabled' // 不能被点击样式
      } else if (this.nowMode === 2470000 && index > 0 && this.selectedBall.indexOf(gitem) < 0) { // 自选不中类型
        if ((this.selectedRule.typeId === 2470010 || this.selectedRule.typeId === 2470020 || this.selectedRule.typeId === 2470030) && this.selectedBall.length === 10) {
          return 'bet_disabled' // 五、六、七不中
        } else if (this.selectedRule.typeId === 2470040 && this.selectedBall.length === 11) {
          return 'bet_disabled' // 八不中
        } else if (this.selectedRule.typeId === 2470050 && this.selectedBall.length === 12) {
          return 'bet_disabled' // 九不中
        } else if ((this.selectedRule.typeId === 2470060 || this.selectedRule.typeId === 2470070) && this.selectedBall.length === 13) {
          return 'bet_disabled' // 十、十一不中
        } else if (this.selectedRule.typeId === 2470080 && this.selectedBall.length === 14) {
          return 'bet_disabled' // 十二不中
        }
      }
    },
    /**
     * 判断是取对象的project还是typeName
     */
    projectOrTypeName (gitem) {
      if (this.nowMode === 2460000 || this.nowMode === 2470000) { // 连码
        return gitem.typeName
      } else {
        return gitem.project
      }
    }
  },
  mounted () { // 不依赖 init 接口
    if (!localStorage.getItem('currentZodiac')) {
      this.$store.dispatch(types.CURRENT_ZODIAC_ACTION) // 获取当年生肖
    } else {
      this.$store.state.betZone.currentZodiac = JSON.parse(localStorage.getItem('currentZodiac'))// 当年生肖
    }
  }
}
</script>

