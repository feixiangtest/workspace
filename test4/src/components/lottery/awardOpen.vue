<template>
<div id="awardOpenTop10" class="id6 award-number" v-if="awardShow">
    <div id="moreAward1">
        <!--顶部按钮-->
        <div class="btn yo-top10-btn" v-if="lotteryMap.awardType[nowCode] && lotteryMap.awardType[nowCode].Type">
            <span v-for="(item,index) in lotteryMap.awardType[nowCode].Type" :key="'type_'+index" @click="chosseAwardShowType(item.name,item.showType)"
            :class="initTypeName === item.name ? 'btn1':'btn0'" class="minSpan" :style="item.name.length===3?'width:50px !important':item.name.length===4?'width:70px !important':''">
              {{item.name}}
            </span>
        </div>
        <div class="numtitle2">
            <table style="width:100%;" id="awardOpenDetail" class="Award_top10" border="0" cellspacing="0" cellpadding="0">
              <tr v-if="nowCode !== 'k3' && nowCode !== 'ddcp'">
                <td v-if="nowLotteryId !== '100' && nowLotteryId !== '101'">
                  期数
                </td>
                <td v-if="nowLotteryId === '100' || nowLotteryId === '101'">
                  开奖时间
                </td>
                <td v-for="(rank,index) in injectAward" class="awardOpenTop" :key="'injectAward_'+index">
                  {{rank}}
                </td>
                <td v-if="nowCode ==='bjkl8' && initTypeName === '号码'" style="width: 80%;">
                </td>
              </tr>
              <tr v-for="(award,index) in lotteryAwardTopList.lotteryAwardTop10" :key="award+'_'+index" style="background: #E6E4E5" :class="index==0?'award-first-tr':''">
                <td v-if="nowLotteryId !== '100' && nowLotteryId !== '101'">
                  第{{award.period | period(award.period,true,nowLotteryId)}}期
                </td>
                <td v-if="nowLotteryId === '100' || nowLotteryId === '101'">
                  <label class="ng-binding yo-mmckjjg">{{formatDate(award.awardTime, nowLotteryId === '101')}}</label>
                </td>
                <td v-if="lotteryMap.awardType[nowCode] && lotteryMap.awardType[nowCode].titleAwardArr && nowCode !=='bjkl8'" v-html="getAwardHtml('',nowCode,initTypeShowType,award.numberSum,index,nowLotteryId,null,award.zodiacYear)">
                </td>
                <td style="font-weight: bold;" v-for="(item,index) in award.number" :key="item+'_'+index" class="chipi" v-html="getAwardHtml(item,nowCode,initTypeShowType,award.number,index,nowLotteryId,award.numberSum,award.zodiacYear)">
                </td>
                <td v-if="nowCode === 'k3'">
                    <label style="color: #AF06E6;">{{award.numberSum}}</label>
                </td>
                <td v-if="nowCode === 'k3'" v-html="klHtml(award)">
                </td>
                <td v-if="nowCode === 'k3' && (award.number[0] === award.number[1] && award.number[1] === award.number[2])">
                  <font color='#CC0000'><b>豹子</b></font>
                </td>
                <td v-else-if="nowCode === 'k3' && award.numberSum % 2 === 0">
                  <font color='#FF6699'><b>双</b></font>
                </td>
                <td v-else-if="nowCode === 'k3' && award.numberSum % 2 != 0">
                  <font color='#FF6600'><b>单</b></font>
                </td>
              </tr>
            </table>
        </div>
    </div>
</div>
</template>
<script>
import * as lotteryMap from '../../config/lotteryMap'
import * as awardService from '../../service/awardService'// 彩票开奖公共方法
export default {
  data () {
    return {
      awardBtnName: '',
      awardShowType: '',
      lotteryMap: lotteryMap,
      meunScroll: ''
    }
  },
  methods: {
    chosseAwardShowType (t, showType) {
      this.awardShowType = showType
      this.awardBtnName = t
    },
    /**
    * 动态获取开奖html
    * value:球的值
    * lotteryIdStr:彩票的字符串值
    * awardArr:彩球的类型
    * sumNum:球的数组
    * number:序号
    * lotteryId:彩票Id
    * totalSum:总和
    */
    getAwardHtml (value, lotteryIdStr, awardArr, sumNum, number, lotteryId, totalSum, zodiacYear) {
      return awardService.getAwardHtml(value, lotteryIdStr, awardArr, sumNum, number, lotteryId, totalSum, zodiacYear)
    },
    klHtml (award) {
      let html = ''
      var dxStr = ''
      if (award.number[0] === award.number[1] && award.number[1] === award.number[2]) {
        dxStr = "<font color='red'><b>豹子</b></font>"
      } else if (award.numberSum >= 4 && award.numberSum <= 10) {
        dxStr = "<font color='#2400fc'><b>小</b></font>"
        dxStr = "<font color='#2400fc'><b>小</b></font>"
      } else if (award.numberSum >= 11 && award.numberSum <= 17) {
        dxStr = "<font color='#e61300'><b>大</b></font>"
      }
      html += dxStr
      return html
    },
    /**
     * 转换时间
     * @param {String} timeStr 'yyyy-mm-dd hh:dd:ss'格式的时间字符串
     * @param {Boolean} isLast10 是否返回最后10位字符，即返回：月日时分秒
     */
    formatDate (timeStr, isLast10) {
      let newTimeStr = timeStr
      if (isLast10) {
        newTimeStr = newTimeStr.replace(/ /g, '') // 去掉空格
        newTimeStr = newTimeStr.replace(/-/g, '') // 去掉'-'
        newTimeStr = newTimeStr.replace(/:/g, '') // 去掉'-'
        if (newTimeStr.length >= 10) {
          newTimeStr = newTimeStr.substr(newTimeStr.length - 10)
        }
      }
      return newTimeStr
    }
  },
  computed: {
    initTypeName () { // 初始化默认选中的展示方法
      this.awardShowType = this.initTypeShowType
      if (this.awardBtnName === '') {
          // 初始化默认选中数据
        if (this.lotteryMap.awardType[this.nowCode] && this.lotteryMap.awardType[this.nowCode].Type) {
          return this.lotteryMap.awardType[this.nowCode].Type[0].name // 展示样式
        }
      } else {
        return this.awardBtnName
      }
    },
    initTypeShowType () {
      if (this.awardShowType === '') {
          // 初始化默认选中数据
        if (this.lotteryMap.awardType[this.nowCode] && this.lotteryMap.awardType[this.nowCode].Type) {
          return this.lotteryMap.awardType[this.nowCode].Type[0].showType // 展示样式
        }
      } else {
        return this.awardShowType
      }
    },
    nowLotteryId () { // 获取到现在的彩票ID
      let path = this.$route.fullPath.split('/')
      return lotteryMap.LotterySrcToId[path[2]] + ''
    },
    nowCode () { // 获取到现在彩票的大类编码
      if (!this.$store.state.site.lotteryType) {
        let path = this.$route.fullPath.split('/')
        if (path.length === 3) {
          path.splice(0, 1)
        }
        return lotteryMap.getLotteryType[path[1]]
      }
      return this.$store.state.site.lotteryType
    },
    injectAward () { // 开奖初始化，用于判断是使用特殊的头部标识
      let code = this.nowCode
      if (code === 'k3' || code === 'ddcp') { // 快3没有头部，跳出
        return
      }
      if (lotteryMap.awardType[this.nowCode].awardArr !== null && this.awardBtnName === lotteryMap.awardType[this.nowCode].awardArr) {
        return lotteryMap.awardType[this.nowCode].titleAwardArr
      } else {
        return lotteryMap.awardType[this.nowCode].titleAwardArrDefault
      }
    },
    lotteryAwardTopList () { // 返回开奖结果数据
      this.lotteryAwardList = this.$store.state.award
      return this.lotteryAwardList
    },
    awardShow () {
      if (this.$store.state.site.awardShow === true) {
        this.awardBtnName = ''
        this.awardShowType = ''
      }
      return this.$store.state.site.awardShow
    }
  }
}
</script>

