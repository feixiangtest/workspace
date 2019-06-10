<template>
  <div class="yoPage yoPageooooo" id="awarTop">
    <div class="yoHeader">
      <div class="center">
          <div class="heaLeft" @click="goBack()">
              <i class="icon ion-ios-arrow-back"></i><span>返回</span>
          </div>
          <div class="title">开奖结果</div>
      </div>
    </div>
    <!--nav-->
    <div id="id3" class="yoHeaNav">
      <div class="selectArea" style="z-index:5;">
        <!-- 彩种下拉框 -->
        <div class="seleBox">
          <select id="IDname" v-model="selected" @change="changeSelect(selected)">
            <option v-for="(item, index) in lotteryList" v-if="conver(item.lotteryId) != undefined" v-bind:value="conver(item.lotteryId)" :key="'lotteryName_'+index">{{ item.lotteryName }}</option>
      　　</select>
      　　<select id="Date-list" @change="selectNewDate" v-model="selectedTime">
            <option v-for="(item,index) in this.searchDate" v-bind:value="item" :key="'lotteryDate_'+index">{{ item }}</option>
          </select>
        </div>
        <!--顶部按钮-->
        <div class="yoNavBtn" v-if="awardType && awardType.Type">
          <span v-for="(item,index) in awardType.Type" @click="chosseAwardShowType(item.name,item.showType)" :key="index+'_type'"
            :class="awardBtnName === item.name ? 'btn1':'btn0'" class="minSpan" :style="item.name.length===3?'width:50px !important':item.name.length===4?'width:61px !important':''">
            {{item.name}}
          </span>
        </div>
      </div>
    </div>
    <div class="yoAward" id="id3" :class="'yo' + nowCode"
    :style="{top: awardType && awardType.Type ? '122px':'80px',
                'max-height': awardType && awardType.Type ? 'calc(100% - 122px)': 'calc(100% - 74px)'}" >
          <!---->
        <div :id="['page-'+nowCode]" class="yoAwardPage">
          <div id="awardOpen" class="yoPageBody2 page-infinite-wrapper" v-if="this.$store.state.site.awardDivShow"
          v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <div id="moreAward1">
              <div v-if="this.$store.state.award.awardTen.length === 0 || this.$store.state.award.awardTen === null" style="line-height: 2.1rem;">
                暂无开奖结果
              </div>
              <div v-else class="numtitle">
                  <table style="width:100%;" id="awardOpenDetail" border="0" cellspacing="0" cellpadding="0" >
                    <tr>
                      <td :colspan="nowCode === 'k3'?'6':nowCode === 'ddcp'?'4':''" v-if="selectedLtId != '100' && selectedLtId != '101'" :style="nowCode === 'k3' || nowCode === 'ddcp' ? 'text-align:left;padding-left:14%;':''">
                        期数
                      </td>
                      <td v-if="selectedLtId == '100' || selectedLtId == '101'">
                        开奖时间
                      </td>
                      <td v-for="(rank,index) in injectAward" class="awardOpenTop" :key="index+'_injectAward'">
                        {{rank}}
                      </td>
                      <td v-if="nowCode ==='bjkl8' && awardBtnName === '号码'" style="width: 80%;">
                      </td>
                    </tr>
                    <tr v-for="(award,index) in this.$store.state.award.awardTen" :key="index+'_awardTen'" style="background: #E6E4E5" :class="index==0?'award-first-tr':''">
                      <td v-if="selectedLtId != '100' && selectedLtId != '101'" :style="nowCode ==='bjkl8'?'width:70px':''">
                        第<label class="ng-binding">{{award.period | period(award.period,true,nowLotteryId)}}</label>期
                      </td>
                      <td v-if="selectedLtId == '100' || selectedLtId == '101'">
                        <label class="ng-binding yo-mmckjjg">{{formatDate(award.awardDate, selectedLtId == '101')}}</label>
                      </td>
                      <td v-if="awardType && awardType.titleAwardArr && nowCode !=='bjkl8'" v-html="getAwardHtml('',nowCode,awardShowType,award.numberSum,index,lotteryMap.LotterySrcToId[selected],null, award.zodiacYear)">
                      </td>
                      <td style="padding: 2% 0%;font-weight: bold;" v-for="(item,index) in award.number" :key="index+'_number'" class="chipi" v-html="getAwardHtml(item,nowCode,awardShowType,award.number,index,lotteryMap.LotterySrcToId[selected],award.numberSum,award.zodiacYear)">
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
      </div>
    </div>
  <loadings></loadings>
</div>
</template>
<script>
import Vue from 'vue'
import * as lotteryMap from '../../../config/lotteryMap'
import * as type from '../../../store/home/type'
import * as statusCode from '../../../utils/status_const'
import * as lotteryAward from '../../../store/award/type'
import InfiniteScroll from 'mint-ui/lib/infinite-scroll' // 按需加载mint-ui的模块
import loadings from '../../loading'
import * as awardService from '../../../service/awardService'// 彩票开奖公共方法

Vue.use(InfiniteScroll)

export default {
  data () {
    return {
      pageSize: 20,
      selected: '',
      selectedLtId: '', // 当前选择的彩种ID
      searchDate: awardService.getBetweenDays(30),
      selectedTime: awardService.GetDateStr(0),
      awardBtnName: '',
      awardShowType: '',
      lotteryMap: lotteryMap,
      isLoadMore: false, // 是否开启加载更多
      loading: false, // 展示加载动画
      maxPage: 0, // 最大页码
      currentPage: 0, // 当前页码
      awardData: {}, // 开奖结果
      awardType: [],
      isChange: false // 游戏下拉框或者日期改变的时候不允许执行loadMore渲染页面数据,避免IOS滑动加载时数据没渲染然后切换日期或游戏造成数据不正确
    }
  },
  created () {
    // 判断是否从彩票页面跳转过来
    this.selected = window.lotteryMain.getLotterySrc(this.nowLotteryId)
    if (!this.selected) { // 当直接进入时默认查询北京赛车
      this.selected = 'bjsc'
    }
    this.changeSelect(this.selected)
  },
  methods: {
    changeSelect (selectedLottery) { // 更换游戏时操作
      if (selectedLottery === 'mmc' || selectedLottery === 'mmsc') {
        window.lotteryMain.isLogin()
        if (!window.store.state.home.isLogin) {
          this.$store.state.award.awardTen = []
          return false
        }
      }
      this.currentPage = 1
      this.maxPage = 0
      this.awardType = this.getAwardTypeTitle()
      this.awardBtnName = ''// 初始化
      this.awardShowType = ''
      this.awardBtnName = this.initTypeName()
      this.awardShowType = this.initTypeShowType()
      this.searchAwardData(selectedLottery)
    },
    selectNewDate (searchDate) { // 切换时间
      this.selectedTime = searchDate.target.value
      this.changeSelect()
    },
    goBack () { // 返回
      this.$router.go(-1)
      scrollTo(0, 0)
      this.$store.state.site.awardShow = false
      this.$store.state.site.betListShow = true
      this.$store.state.site.nowPosition = 0
    },
    conver (selected) { // 根据字符串获取到彩票Id
      return lotteryMap.LotterySrc[selected]
    },
    readCpName (lotteryList) { // 获取到彩票名称
      var lotteryArray = []
      for (var key in lotteryList) {
        var lotteryObj = lotteryList[key].lotteryType
        for (let i = 0; i < lotteryObj.length; i++) {
          lotteryArray.push(lotteryObj[i])
        }
      }
      return lotteryArray
    },
    chosseAwardShowType (t, showType) { // 按玩法展示
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
    loadMore () { // 分页加载
      if (!this.selectedTime) {
        this.selectedTime = awardService.GetDateStr(0)
        return false
      }
      if (this.nowCode === 'mmc') {
        window.lotteryMain.isLogin()
        if (!window.store.state.home.isLogin) {
          return false
        }
      }
      if (this.isLoadMore && this.maxPage !== -1 && this.loading === false && this.$store.state.award.awardTen.length > 0) {
        // 如果等于最大页数了直接跳出
        if (this.maxPage !== 0 && this.maxPage <= this.currentPage) {
          return
        }
        this.$store.state.site.showBetLoading = true
        this.loading = true
        // 到后端拿数据
        let page = this.currentPage + 1
        this.isChange = false // 正常加载允许拼装
        this.$store.dispatch(lotteryAward.AWARD_LOTTERY_ACTION, {'lotteryId': lotteryMap.LotterySrcToId[this.selected], 'date': this.selectedTime, 'pageSize': this.pageSize, 'currentPage': page, 'lastAwardDate': this.$store.state.award.awardTen[0].awardDate}).then(res => {
          if (!this.isChange) {
            if (res.status === statusCode.statusConst.SUCCESS) { // 成功
              if (res.data.historyList.result.length === 0) { // 如果返回没有数据，则不允许继续滑动加载
                this.maxPage = -1
              } else {
                this.maxPage = res.data.historyList.totalPages
                this.currentPage++
                for (let i = 0; i < res.data.historyList.result.length; i++) {
                  let object = {
                    'numberSum': res.data.historyList.result[i].numberSum, // 总和
                    'number': res.data.historyList.result[i].number.split(','), // 处理彩球
                    'period': res.data.historyList.result[i].period, // 处理期数
                    'awardDate': res.data.historyList.result[i].awardDate, // 处理时间
                    'zodiacYear': res.data.historyList.result[i].zodiacYear // 开奖结果的当年生肖
                  }
                  if (window._indexOf(this.$store.state.award.awardTen, object) < 0) {
                    this.$store.state.award.awardTen.push(object)
                  }
                }
              }
            }
          }
          this.loading = false
        }).finally(res => {
          this.$store.state.site.showBetLoading = false
        })
      } else {
        this.$store.state.site.showBetLoading = false
        this.loading = false
      }
    },
    searchAwardData () {
      if (!this.selectedTime) return false // selectedTime 可能没有值 searchAwardData 会重复出发this.$store.dispatch
      if (this.nowCode === 'mmc') {
        window.lotteryMain.isLogin()
        if (!window.store.state.home.isLogin) {
          return false
        }
      }
      this.$store.state.site.showBetLoading = true
      // 到后端拿数据
      this.$store.state.award.awardTen = []
      // alert(JSON.stringify({'lotteryId': lotteryMap.LotterySrcToId[this.selected], 'date': this.selectedTime}))
      this.$store.dispatch(lotteryAward.AWARD_LOTTERY_ACTION, {'lotteryId': lotteryMap.LotterySrcToId[this.selected], 'date': this.selectedTime, 'pageSize': this.pageSize, 'currentPage': '1', 'lastAwardDate': ''}).then(res => {
        if (res.status === statusCode.statusConst.SUCCESS) { // 成功
          this.isLoadMore = true
          this.maxPage = res.data.historyList.totalPages
          // this.loadMore()  //初始化10条的时候填满空位
          for (let i = 0; i < res.data.historyList.result.length; i++) {
            let object = {
              'numberSum': res.data.historyList.result[i].numberSum, // 总和
              'number': res.data.historyList.result[i].number.split(','), // 处理彩球
              'period': res.data.historyList.result[i].period, // 处理期数
              'awardDate': res.data.historyList.result[i].awardDate, // 处理时间
              'zodiacYear': res.data.historyList.result[i].zodiacYear // 开奖结果的当年生肖
            }
            if (window._indexOf(this.$store.state.award.awardTen, object) < 0) {
              this.$store.state.award.awardTen.push(object)
            }
          }
        }
        this.isChange = true // 切换游戏或日期时，如果上一次数据还没加载回来，不允许拼装数据
      }).finally(res => {
        this.$store.state.site.showBetLoading = false
      })
    },
    getAwardTypeTitle () { // 动态获取头部标签
      return lotteryMap.awardType[this.nowCode]
    },
    initTypeName () {
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
      if (!this.awardShowType) {
          // 初始化默认选中数据
        if (this.lotteryMap.awardType[this.nowCode] && this.lotteryMap.awardType[this.nowCode].Type) {
          return this.lotteryMap.awardType[this.nowCode].Type[0].showType // 展示样式
        }
      } else {
        return this.awardShowType
      }
    },
    klHtml (award) {
      let html = ''
      var dxStr = ''
      if (award.number[0] === award.number[1] && award.number[1] === award.number[2]) {
        dxStr = "<font color='red'><b>豹子</b></font>"
      } else if (award.numberSum >= 4 && award.numberSum <= 10) {
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
    lotteryList () { // 获取到游戏名称的下拉框
      if (this.$store.state.home.lotteryList.length > 0) { // state有数据
        // this.$store.state.home.lotteryList = this.readCpName(this.$store.state.home.lotteryList)
        return this.readCpName(this.$store.state.home.lotteryList)
      } else if (localStorage.getItem('lotteryList') !== null) { // localStoragelimit有彩票列表
        // this.$store.state.home.lotteryList = this.readCpName(JSON.parse(localStorage.getItem('lotteryList')))
        return this.readCpName(JSON.parse(localStorage.getItem('lotteryList')))
      } else {
        this.$store.dispatch(type.LOTTERY_ACTION, {}).then(res => {
          if (res.status === statusCode.statusConst.FAILURE) { // 失败了提示错误
            window.layer.msgWarn(res.msg)
          } else if (res.status === statusCode.statusConst.SUCCESS) { // 成功
            // this.$store.state.home.lotteryList = this.readCpName(this.$store.state.home.lotteryList)
            return this.readCpName(this.$store.state.home.lotteryList)
          }
        })
      }
    },
    nowLotteryId () { // 获取到现在的彩票ID
      // let path = this.$store.state.site.lotteryId
      // if (!path) { // 当lotteryId为空时，返回北京赛车
      //   return '6'
      // } else {
      //   return path
      // }
      let path = this.$store.state.site.historyPath // 获取进入该路径前的上一个路径
      let arr = path.split('/')
      let lotteryId = lotteryMap.LotterySrcToId[arr[arr.length - 1]] // 根据缩写 获取lotteryId
      if (!lotteryId) { // 当path为空时 或者从主页进入时，返回北京赛车
        return '6'
      } else {
        console.log(lotteryId + '')
        return lotteryId + ''
      }
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
    lotteryAwardTopList () { // 返回开奖结果
      this.lotteryAwardList = this.$store.state.award
      return this.lotteryAwardList
    },
    nowCode () { // 获取大类统一的显示规则编码
      return lotteryMap.getLotteryType[this.selected]
    },
    showBetLoading () {
      return this.$store.state.site.showBetLoading
    }
  },
  components: {
    loadings
  },
  watch: {
    selected (val) {
      this.selectedLtId = lotteryMap.LotterySrcToId[this.selected]
    }
  },
  mounted () {
    // var $this = this
  }
}
</script>
