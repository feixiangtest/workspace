<template>
    <div class="pk10">
        <div :key="game + index" v-for="(game,index) in gameList" class="" v-if="!ksLuziShow">
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
                  <!-- 快3展示效果 -->
                    <dl :key="'ks_' + j " v-for="(gitem, j) in game.oddsList" class="" @click="selectBet(gitem, $event)"
                      :class="{'on':selectedList.indexOf(gitem) >= 0}">
                        <dt>
                           <span v-if="isNaN(gitem.project)" class="">{{gitem.project}}</span>
                            <span v-if="!isNaN(gitem.project)" style="line-height:23px">
                              <span v-if="game.name === '总和大小，单双'">
                                <i :class="['ball-'+gitem.project]"></i>
                              </span>
                              <span v-if="game.name === '三军'">
                                <i :class="['ball-'+gitem.project]"></i>
                              </span>
                              <span v-if="game.name === '围骰/全骰'">
                                <i :class="['ball-'+(gitem.project/111)]"></i><i :class="['ball-'+(gitem.project/111)]"></i><i :class="['ball-'+(gitem.project/111)]"></i>
                              </span>
                              <span v-if="game.name === '点数'">
                                <i>{{gitem.project}}</i>
                              </span>
                              <span v-if="game.name === '长牌'">
                                <i :class="['ball-'+(Math.floor(gitem.project/10))]"></i><i :class="['ball-'+(gitem.project%10)]"></i>
                              </span>
                              <span v-if="game.name === '短牌'">
                                <i :class="['ball-'+(gitem.project/11)]"></i><i :class="['ball-'+(gitem.project/11)]"></i>
                              </span>
                            </span>
                           </span>
                        </dt>
                        <dd><b class="assertive">{{gitem.odds | noBetFilter}}</b></dd>
                    </dl>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
        <!-- 路子长龙 -->
        <!--<jstb v-if="luziShow"></jstb>-->
    </div>
</template>
<script>
// import jstb from '../luzi/jstb'
export default {
  props: {
    lotteryId: String,
    gameList: Array,
    nowMode: Number,
    showIcon: Boolean,
    showBetTitle: Boolean
  },
  components: {
//  jstb
  },
  data () {
    return {
      selectedList: []
    }
  },
  watch: {
    currentNo () {
      this.selectedList = []
      this.$store.state.betZone.doBetList = []
      this.$store.state.site.show = true// 关闭当前页面
      window.layer.closeAll()
    }
  },
  computed: {
     /** 监听当前期数 */
    currentNo () {
      return this.$store.state.betZone.currentPeriodNo
    },
    /** 长龙路子显示隐藏  */
    ksLuziShow () {
      return this.$store.state.betZone.ksLuziShow
    },
    /** 监听是否可以投注 */
    betState () {
      return this.$store.state.betZone.bettingState
    }
  },
  methods: {
    changeCurrentGame (index) {
      this.$emit('changeCurrentGame', index) // 子组件调用父组件的逻辑
    },
    selectBet (gitem, event) {
      console.log(gitem)
      if (this.betState === 0) {
        return
      }
      if (this.selectedList.indexOf(gitem) >= 0) {
        let index = this.selectedList.indexOf(gitem)
        this.selectedList.splice(index, 1)
      } else {
        this.playMusic('chatAudio')
        this.selectedList.push(gitem)
      }
      this.$store.state.betZone.doBetList = this.selectedList
    }
  }
}
</script>

