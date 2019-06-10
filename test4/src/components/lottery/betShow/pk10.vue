<template>
  <div class="pk10">
    <div :key="game + index" v-for="(game,index) in list" v-if="!pk10LuziShow">

      <div class="item-stable item" @click="changeCurrentGame(index)">
                <span>
                  <i v-if="showIcon" class="icon ion-minus" :id="['iclass'+index]"></i>
                  <i v-if="showIcon" class="icon ion-plus" :id="['iclass_plus'+index]" style="display: none;"></i>
                {{game.name}}
                </span>
      </div>

      <div class="item-accordion" :id="['item'+index]">
        <div class="bet-li">
          <!-- PK10的展示效果 -->
          <dl :key=" 'bjsc_' + gitem.oddsId " v-for="gitem in game.oddsList"
              :class="{'on':doBetList.indexOf(gitem) >= 0}" @click="selectBet(gitem, $event)">
            <dt>
              <span v-if="isNaN(gitem.project)" class="">{{gitem.project}}</span>
              <span v-if="!isNaN(gitem.project)">
                <span class="">
                  <!--非冠亚军组合-->
                  <i v-if="nowMode!=2720000" class="ball-c ball-c-xs" :class="'ball-c'+gitem.project">{{ gitem.project}}</i>
                  <!--冠亚军组合-->
                  <i v-if="nowMode==2720000" class="ball-c ball-c-xs" :class="{'ball-c2':gitem.project%3==1,
                    'ball-c3':gitem.project%3==2 && gitem.project!=14,
                    'ball-c4':gitem.project%3==0,
                    'ball-c1':gitem.project==14}">{{ gitem.project}}</i>
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
    <!--<bjsc :loadDone="loadDone" v-if="loadDone && pk10LuziShow"></bjsc>-->
  </div>
</template>
<script>
// import bjsc from '../luzi/bjsc'

  export default {
    props: {
      lotteryId: String,
      gameList: Array,
      nowMode: Number,
      showIcon: Boolean
    },
    components: {
//    bjsc
    },
    data () {
      return {
        doBetList: []
      }
    },
    computed: {
      list () {
        console.log(this.gameList)
        return this.gameList
      },
      /** 监听当前期数 */
      currentNo () {
        return this.$store.state.betZone.currentPeriodNo
      },
      /** 监听是否可以投注  */
      betState () {
        return this.$store.state.betZone.bettingState
      },
      /** 长龙路子显示隐藏  */
      pk10LuziShow () {
        return this.$store.state.betZone.pk10LuziShow
      },
      loadDone () {
        console.log(this.lotteryId)
        if (this.gameList.length > 1 && this.lotteryId !== '101') {
          return true
        }
        return false
      }
    },
    methods: {
      changeCurrentGame (index) {
        this.$emit('changeCurrentGame', index) // 子组件调用父组件的逻辑
      },
      selectBet (gitem, event) { // 获取选中球的内容
        console.info(gitem)
        if (this.betState === 0) {
          return
        }
        if (this.doBetList.indexOf(gitem) >= 0) {
          let index = this.doBetList.indexOf(gitem)
          this.doBetList.splice(index, 1)
        } else {
          this.playMusic('chatAudio')
          this.doBetList.push(gitem)
        }
        this.$store.state.betZone.doBetList = this.doBetList
      }
    },
    watch: {
      /** 期数改变，清空选中的数据 **/
      currentNo () {
        this.doBetList = []
        this.$store.state.betZone.doBetList = []
        this.$store.state.site.show = true// 关闭当前页面
        window.layer.closeAll()
      },
      gameList (curval, oldval) {
        /** 清空之前的投注信息 start**/
        this.$store.state.betZone.doBetList = []
        this.doBetList = []
        /** 清空之前的投注信息 end**/
      }
    }
  }
</script>

