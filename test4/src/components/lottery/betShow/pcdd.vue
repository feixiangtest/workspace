<template>
    <div class="pk10">
        <div :key="game + index" v-for="(game,index) in list" class="" v-if="!pcddLuziShow">
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
                  <!-- PC蛋蛋 -->
                    <dl :key="'ddcp_' + i" v-for="(gitem, i) in game.oddsList" @click="selectBet(gitem, $event)"
                    :class="{'pull-left':index==4, 'on':dobetList.indexOf(gitem) >=0 || $store.state.betZone.pcddSelect === gitem}">
                        <dt>
                            <span v-if="isNaN(gitem.project)" class="">{{gitem.project}}</span>
                            <span v-if="!isNaN(gitem.project)" style="line-height:23px">
                                <span class=""><i class="ball-c ball-c-xs" :class="{
                                'ball-c2':gitem.project%3==1 && gitem.project!=14 && gitem.project!=0 && gitem.project!=13 && gitem.project!=27,
                                'ball-c3':gitem.project%3==2 && gitem.project!=14 && gitem.project!=0 && gitem.project!=13 && gitem.project!=27,
                                'ball-c4':gitem.project%3==0 && gitem.project!=14 && gitem.project!=0 && gitem.project!=13 && gitem.project!=27,
                                'ball-c1':gitem.project==14 || gitem.project==0 || gitem.project==13 || gitem.project==27}">{{gitem.project}}</i></span>
                            </span>
                        </dt>
                        <dd><b class="assertive">{{gitem.odds | noBetFilter}}</b></dd>
                    </dl>
                    <!-- 特码包三 -->
                    <div v-if="index === 4" class=" pull-left">
                        <div class="yo-tema-all">
                            <div class="yo-qiu-item pull-left" @click="toggle('special_first')">
                                <div class="qiu-titlt"><span class="son-qiu ball-c " :class="{
                                    'ball-c2':tema_first[0]%3==1 && tema_first[0]!=14 && tema_first[0]!=0 && tema_first[0]!=13 && tema_first[0]!=27,
                                    'ball-c3':tema_first[0]%3==2 && tema_first[0]!=14 && tema_first[0]!=0 && tema_first[0]!=13 && tema_first[0]!=27,
                                    'ball-c4':tema_first[0]%3==0 && tema_first[0]!=14 && tema_first[0]!=0 && tema_first[0]!=13 && tema_first[0]!=27,
                                    'ball-c1':tema_first[0]==14 || tema_first[0]==0 || tema_first[0]==13 || tema_first[0]==27
                                }">{{tema_first[0]}}</span></div>
                                <div class="yo-hi-xiala" v-show="special_first">
                                    <ul :key="'tema1_' + k" v-for="(item, k) in numberlist()">
                                        <li v-if="item !== tema_first[1] && item !== tema_first[2] "
                                            :class="{'cur':tema_first[0] === item}" @click="selectBall('first', item)">
                                            <span >{{item}}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="yo-qiu-item pull-left" @click="toggle('special_second')">
                                <div class="qiu-titlt"><span class="son-qiu ball-c " :class="{
                                    'ball-c2':tema_first[1]%3==1 && tema_first[1]!=14 && tema_first[1]!=0 && tema_first[1]!=13 && tema_first[1]!=27,
                                    'ball-c3':tema_first[1]%3==2 && tema_first[1]!=14 && tema_first[1]!=0 && tema_first[1]!=13 && tema_first[1]!=27,
                                    'ball-c4':tema_first[1]%3==0 && tema_first[1]!=14 && tema_first[1]!=0 && tema_first[1]!=13 && tema_first[1]!=27,
                                    'ball-c1':tema_first[1]==14 || tema_first[1]==0 || tema_first[1]==13 || tema_first[1]==27
                                }">{{tema_first[1]}}</span></div>
                                <div class="yo-hi-xiala" v-show="special_second">
                                    <ul :key="'tema2_' + k" v-for="(item, k) in numberlist()">
                                        <li v-if="item !== tema_first[0] && item !== tema_first[2] "
                                            :class="{'cur':tema_first[1] === item}" @click="selectBall('second', item)">
                                            <span >{{item}}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="yo-qiu-item pull-left" @click="toggle('special_thirth')">
                                <div class="qiu-titlt"><span class="son-qiu ball-c " :class="{
                                    'ball-c2':tema_first[2]%3==1 && tema_first[2]!=14 && tema_first[2]!=0 && tema_first[2]!=13 && tema_first[2]!=27,
                                    'ball-c3':tema_first[2]%3==2 && tema_first[2]!=14 && tema_first[2]!=0 && tema_first[2]!=13 && tema_first[2]!=27,
                                    'ball-c4':tema_first[2]%3==0 && tema_first[2]!=14 && tema_first[2]!=0 && tema_first[2]!=13 && tema_first[2]!=27,
                                    'ball-c1':tema_first[2]==14 || tema_first[2]==0 || tema_first[2]==13 || tema_first[2]==27
                                }">{{tema_first[2]}}</span></div>
                                <div class="yo-hi-xiala" v-show="special_thirth">
                                    <ul :key="'tema3_' + k" v-for="(item, k) in numberlist()">
                                        <li v-if="item !== tema_first[0] && item !== tema_first[1] "
                                            :class="{'cur':tema_first[2] === item}" @click="selectBall('thirth', item)">
                                            <span >{{item}}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
        <!-- 路子长龙 -->
        <!--<ddcp v-if="luziShow"></ddcp>-->
    </div>
</template>
<script>
// import ddcp from '../luzi/ddcp'
import * as filter from '../../../filter/betlistFilter'
export default {
  props: {
    lotteryId: String,
    gameList: Array,
    nowMode: Number,
    showIcon: Boolean,
    showBetTitle: Boolean
  },
  components: {
//  ddcp
  },
  data () {
    return {
      dobetList: [],
      tema_first: [0, 1, 2], // 保存特码
      special_first: false,
      special_second: false,
      special_thirth: false
    }
  },
  watch: {
    currentNo () {
      this.dobetList = []
      this.tema_first = [0, 1, 2]
      this.special_first = false
      this.special_second = false
      this.special_thirth = false
      this.$store.state.betZone.pcddSelect = {}
      this.$store.state.betZone.doBetList = []
      this.$store.state.site.show = true// 关闭当前页面
      window.layer.closeAll()
    }
  },
  computed: {
    list () {
      return this.listvalid()
    },
    /** 监听当前期数 */
    currentNo () {
      return this.$store.state.betZone.currentPeriodNo
    },
    /** 长龙路子显示隐藏  */
    pcddLuziShow () {
      return this.$store.state.betZone.pcddLuziShow
    },
    /** 监听是否可以投注 */
    betState () {
      return this.$store.state.betZone.bettingState
    }
  },
  methods: {
    listvalid () {
      console.info('list:')
      let newlist = filter.pcddFilter(this.gameList)
      this.tema_first = [0, 1, 2]
      return newlist
    },
    /** 特码28个球数组 */
    numberlist () {
      let list = []
      for (let i = 0; i < 28; i++) {
        list.push(i)
      }
      return list
    },
    /**
     *position 判断特码第几个球
     *param 球号码
    */
    selectBall (position, param) {
      if (position === 'first') this.tema_first[0] = param
      if (position === 'second') this.tema_first[1] = param
      if (position === 'thirth') this.tema_first[2] = param
      // 数据组装
      let project = this.tema_first[0] + ' ' + this.tema_first[1] + ' ' + this.tema_first[2]
      for (let i = 0; i < this.dobetList.length; i++) {
        if (this.dobetList[i].typeName === '特码包三') {
          this.dobetList[i].project = project
          break
        }
      }
      this.$store.state.betZone.tema_array = this.tema_first
      this.$store.state.betZone.doBetList = this.dobetList
    },
    toggle (key) {
      let val = this[key]
      if (typeof val === 'boolean') {
        this[key] = !val
      }
    },
    changeCurrentGame (index) {
      this.$emit('changeCurrentGame', index) // 子组件调用父组件的逻辑
    },
    selectBet (gitem, event) {
      if (this.betState === 0) {
        return
      }
      if (gitem.typeName === '特码包三') { // 特码三包
        console.log(gitem)
        let haveGitem = false
        let gitemIndex = 0
        for (let i = 0; i < this.dobetList.length; i++) {
          if (this.dobetList[i].typeName === '特码包三') {
            haveGitem = true
            gitemIndex = i
            break
          }
        }
        haveGitem === true ? this.temaDelete(gitemIndex) : this.temaAdd(gitem)
        this.$store.state.betZone.tema_array = this.tema_first
      } else if (this.dobetList.indexOf(gitem) >= 0) {
        let index = this.dobetList.indexOf(gitem)
        this.dobetList.splice(index, 1)
      } else {
        this.playMusic('chatAudio')
        this.dobetList.push(gitem)
      }
      this.$store.state.betZone.doBetList = this.dobetList
    },
    temaAdd (gitem) {
      this.$store.state.betZone.pcddSelect = gitem
      let temp = {}
      Object.assign(temp, gitem) // 拷贝object 对原来的object 无影响
      let obj = ''
      for (let i = 0; i < this.tema_first.length; i++) {
        obj += this.tema_first[i] + ' '
      }
      obj = obj.trim()
      temp['project'] = obj
      this.dobetList.push(temp)
    },
    temaDelete (index) {
      this.$store.state.betZone.pcddSelect = {}
      this.dobetList.splice(index, 1)
    }
  }
}
</script>

