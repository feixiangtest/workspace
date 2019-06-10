<template>
    <div class="pk10">
        <div :key="game + index" v-for="(game,index) in gameList" class="" v-if="!kl8LuziShow">
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
                  <!-- 快乐8展示效果 -->
                    <dl :key=" 'ks8_' + i " v-for="(gitem, i) in game.oddsList" class="" @click="selectBet(gitem, $event)"
                    :class="{'on':selectedBall.indexOf(gitem) >= 0}" >
                        <dt>
                            <span v-if="isNaN(gitem.project)" class="">{{gitem.project}}</span>
                            <span v-if="!isNaN(gitem.project)" style="line-height:23px">
                                <span class="">
                                  <i class="babyblueball-sm" :class="{'babyblueball_1':gitem.project<=40,'babyblueball_2':gitem.project >40 && gitem.project<=80}">{{gitem.project}}</i>
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
        <!--<kl8 v-if="luziShow"></kl8>-->
    </div>
</template>
<script>
// import kl8 from '../luzi/kl8'
export default {
  props: {
    lotteryId: String,
    gameList: Array,
    nowMode: Number,
    showIcon: Boolean,
    showBetTitle: Boolean
  },
  components: {
//  kl8
  },
  data () {
    return {
      selectedBall: [] // 已经选择的球号
    }
  },
  computed: {
    /** 监听当前期数 */
    currentNo () {
      return this.$store.state.betZone.currentPeriodNo
    },
    /** 长龙路子显示隐藏  */
    kl8LuziShow () {
      return this.$store.state.betZone.kl8LuziShow
    },
    /** 监听是否可以投注 */
    betState () {
      return this.$store.state.betZone.bettingState
    }
  },
  watch: {
    /**
     * 监听当前游戏玩法是否改变，改变的话需要清空已经选择的球号
     */
    nowMode: function (val) {
      this.selectedBall.splice(0, this.selectedBall.length) // 清空已经选择的球号
      // console.info('nowMode change', val)
    },
     /** 期数改变，清空选中的数据 **/
    currentNo () {
      console.info('currentNo')
      this.doBetList = []
      this.$store.state.betZone.doBetList = []
      this.$store.state.site.show = true// 关闭当前页面
      window.layer.closeAll()
    }
  },
  methods: {
    changeCurrentGame (index) {
      this.$emit('changeCurrentGame', index) // 子组件调用父组件的逻辑
    },
    selectBet (gitem, event) {
      if (this.betState === 0) {
        return
      }
      let index = this.selectedBall.indexOf(gitem)
      if (index >= 0) {
        this.selectedBall.splice(index, 1)
      } else {
        this.selectedBall.push(gitem)
        this.playMusic('chatAudio')
      }
      this.$store.state.betZone.doBetList = this.selectedBall // 将选择的球号存到store中
      // console.info('selectBet:', this.selectedBall)
    }
  }
}
</script>

