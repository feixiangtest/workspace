<template>
    <div class="yo-balance tab ">
        <div class="closeLuzi" @click="closeLuzi()"><font>关</font><font>闭</font></div>
        <div class="yo-bal-nav" style="border: 1px solid #e83b50;">
            <ul class="tabHd" >
                <li :class="curs=='luzi' ? 'cur' : ''" @click="curs = 'luzi'" v-if="luZiMapTXT.length > 0">路子</li>
                <li :class="luZiMapTXT.length==0 ? 'curChang' : '' || curs=='changlong' ? 'cur' : ''"  @click="curs = 'changlong'" >长龙</li>
            </ul>
        </div>
        <div class="tabBd">
            <div class="tabitem" v-if="curs=='luzi'">
                <div class="tab">
                    <!--路子图标题-->
                    <div class="yo-b-menu">
                        <ul class="tabHd" >
                            <!--class = cur -->
                            <!--<li :class="item.name===currName ? 'cur':''" v-for="(item, index) in luZiMapTXT" :key="index" @click="currName = item.name">{{item.name}}</li>-->

                        </ul>
                    </div>
                    <div class="tabBd">
                        <div class="tabitem" style="width: 98%;margin: 0 auto;">
                            <div class="balanceFigure danshuang" v-for="(luzi, index) in luZiMapTXT" :key="index">
                                <!--这个ul是为了兼容边框 -->
                                <ul class="titl">
                                    <li>{{luzi.name}}</li>
                                </ul>
                                <ul class="baOne" v-for="(one, ulIndex) in 6" :key="ulIndex">
                                    <li :class="luziMap == null ? '' : luziMap[luzi.code] == undefined ? '' : luziMap[luzi.code][ulIndex][liIndex] == undefined ? ''
                                            : luziMap[luzi.code][ulIndex][liIndex].name == '' ? ''
                                            : luziMap[luzi.code][ulIndex][liIndex].name*1 != luziMap[luzi.code][ulIndex][liIndex].name
                                            ? luziMap[luzi.code][ulIndex][liIndex].name : 'luzi-number'" v-for="(two, liIndex) in 23" :key="liIndex">
                                        <span>{{ luziMap == null ? '' : luziMap[luzi.code] == undefined ? '' : luziMap[luzi.code][ulIndex][liIndex] == undefined ? ''
                                            : luziMap[luzi.code][ulIndex][liIndex].name == '豹子' ? 'X'
                                            : luziMap[luzi.code][ulIndex][liIndex].name == '尾大' ?  '大'
                                            : luziMap[luzi.code][ulIndex][liIndex].name == '尾小' ? '小'
                                            : luziMap[luzi.code][ulIndex][liIndex].name }}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--长龙图数据-->
            <div class="tabitem" v-if="curs == 'changlong' || luZiMapTXT.length===0" >
                <div class="baseTable ">
                    <table>
                        <tbody>
                        <tr v-for="(item, index) in changlongMap" :key="index" v-if="item.sortId > 1">
                            <td style='width: 33.33%;'>{{ item.name }}</td>
                            <td style='width: 33.33%;'>{{item.project }}</td>
                            <td class="qi" style='width: 33.33%;'>{{  item.sortId  }}期</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import * as awardTypes from 'store/award/type'
export default {
  data () {
    return {
      curs: 'luzi',
      currName: ''
    }
  },
  props: ['luZiMapTXT', 'selectLuzi'],
  methods: {
    // 关闭路单页面，路单组件会销毁
    closeLuzi () {
      this.$store.state.betZone[this.selectLuzi] = false
    }
  },
  computed: {
    changlongMap () { // 长龙信息
      let map = []
      let changlong = this.$store.state.award.changlongMap
      for (let i in changlong) { // 拆分长龙数据
        map.push({'name': i.split('-')[0], 'project': i.split('-')[1], 'sortId': changlong[i]})
      }
      return map
    },
    luziMap () { // 路子信息
      return this.$store.state.award.luziMap
    },
    nowTitle () { // 当前游戏玩法
      return this.$store.state.site.nowTitle
    },
     /**
    * 当前游戏id
    */
    lotteryId () {
      return this.$store.state.site.lotteryId
    }
  },
  watch: {
    nowTitle: function () { // 保证切换玩法后默认显示第一个路子的信息
      if (this.luZiMapTXT.length > 0) {
        this.currName = this.luZiMapTXT[0].name
      }
    },
    lotteryId: function (val) { // 原来仅监测大类彩种和彩种玩法的变化，现在增加监测小类彩种的变化，变化时，恢复路子的默认值
      this.closeLuzi() // 关闭路单页面（路单组件会销毁）
    }
  },
  mounted () { // 不依赖init
    this.$nextTick(function () {
      if (this.luZiMapTXT.length > 0) {
        this.currName = this.luZiMapTXT[0].name
      } else {
        this.curs = 'changlong'
      }
    })
    // 初始化路子长龙数据，另外如果此时lotteryId是空，那么lotteryId有值时会触发watch:lotteryId的变化，也会重新初始化路子长龙数据
    if (this.lotteryId) {
      this.$store.dispatch(awardTypes.AWARD_OPENAWARD, {'lotteryId': this.lotteryId})
    }
  },
  // 组件注销前
  beforeDestroy () {
    this.closeLuzi() // 关闭路单页面
  }
}
</script>
