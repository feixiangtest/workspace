<template>
  <div id="detailRe" class="yoPage">
    <div class="yoHeader">
        <div class="center">
            <div class="heaLeft" @click="goBack()">
                <i class="icon ion-ios-arrow-back"></i>
            </div>
            <div class="title headerItem"  @click="titleEvent()">详细报表<span class="triangle triangleDown"></span></div>
            <div class="heaRight" @click="openLotteryTypes()">
                <span style="font-size: 17px;">彩种</span>
            </div>
        </div>
    </div>
    <!-- 选项卡：选择是否中奖的状态 -->
    <div v-if="isShowTable" style="position: fixed; z-index: 12; top: 44px; width: 100%;">
      <div class="query-conditions">
        <span @click="searchDetailReportByFlag(null)" :class="isWinning===null ? 'selected' : ''">全部</span>
        <span @click="searchDetailReportByFlag('Y')" :class="isWinning==='Y' ? 'selected' : ''">已中奖</span>
        <span @click="searchDetailReportByFlag('N')" :class="isWinning==='N' ? 'selected' : ''">未中奖</span>
      </div>
    </div>
    <!--导航栏开始-->
    <div class="yoHeaNav">
      <div class="forthwith-receipts-nav">
        <span style="width:19%">时间</span>
        <span style="width:25%">类型</span>
        <span style="width:26%">玩法</span>
        <span style="width:13%">下注</span>
        <span style="width:16%">盈亏</span>
      </div>
    </div>
    <!--导航栏结束-->
    <div class="yoPageBody3" id="recordContent" :class="totalPage > 1 && historyList.length > 0 ? 'hasCount' : ''">
      <div class="yoScroll">
        <!--详细信息-->
            <ul class="forthwith-receipts-minute yo-receipts">
              <li @click="bettingRecordDetail(detailReport)" :key="index" v-for="(detailReport, index) in historyList" :class="detailReport.status == 1  ? 'historyLineThrough' : ''">
                <span style="width:19%">{{detailReport.bettingDate}}
                  <i>{{detailReport.bettingTime}}</i>
                </span>
                <span v-if="detailReport.lottery < 100" style="width:25%">{{detailReport.lotteryName}}
                  <i class="blue">{{detailReport.period}}期</i>
                </span>
                <span v-else style="width:25%">{{detailReport.lotteryName}}
                  <i class="blue">{{detailReport.bettingCode}}</i>
                </span>
                <span style="width:26%">{{detailReport.remark | subContent(5)}}
                  <p>
                    <i style="display:inline-block; *display:inline; *zoom:1;">@
                      <em class="red" style="float">
                        {{detailReport.odds}}
                      </em>
                      <em v-if=" detailReport.op == 1 ">取消</em>
                      <em v-if=" detailReport.op == 2 ">回结</em>
                      <em v-if=" detailReport.op == 3 ">重结</em>
                      <em v-if=' detailReport.op == 0 && detailReport.isBalance == "1" && detailReport.updateUser != "system" && lotteryId != 100 '>结算</em>
                    </i>
                  </p>
                </span>
                <span style="width:13%">{{detailReport.bettingMoney}}</span>
                <span style="width:16%">
                  <p :class="detailReport.memberResult > 0 ? 'green' : 'red'">{{detailReport.memberResult.toFixed(2)}}</p>
                </span>
              </li>
              <div v-if="historyList.length === 0" style="width:116px;padding-top: 90px; margin: auto;}">
                <img :src="imgUrl+'/rightSideMenu/no-record.png'">
                <p style="text-align: center; color: #b1b1b1; margin-top: 6px;">暂无记录</p>
              </div>
            </ul>
        </div>
    </div>
    <!-- 彩种列表 -->
		<div v-show="showLotteryTypes" class="LotteryTypes">
			<div class="shadeIn">
				<div class="selLotteryType">
					<div>
						<span class="allButton" @click="searchDetailReportByLottery(null)">全部</span>
						<span @click="closeLotteryTypes" class="cancelButton">取消</span>
					</div>
					<dl id="lotteryList">
						<dt :key="item + i" v-for="(item,i) in lotteryList" @click="searchDetailReportByLottery(item.lotteryId)" :class="selectedLotteryId === item.lotteryId ? 'isSelected' : ''">
								<span>{{item.lotteryName}}</span>
						</dt>
					</dl>
				</div>
			</div>
		</div>
    <!-- 合计栏 -->
    <div v-if="historyList.length > 0" class="yoFooter yoFootNav total" :class="totalPage < 2 ? 'onFooter' : ''">
      <div class="center">
        <div class="fotLeft">
          <span class="count">合计: {{totalBettingMoney.toFixed(2)}}</span>
        </div>
        <div class="fotRight">
          <em class="profitAndLoss" :class="totalMemberResult > 0 ? 'green' : 'red'">盈亏：{{totalMemberResult.toFixed(2)}}</em>
        </div>
      </div>
    </div>
    <!-- 翻页栏 -->
    <div class="yoFooter yoFootNav yoPaging" id="chat_history" v-if="totalPage > 1">
      <div class="center">
        <div class="fotLeft">
          <button class="detailedFoot btnGo" :disabled="currentPage === 1" @click="preNumber()">前一页</button>
        </div>
        <div class="fotTitle">
          <span>{{currentPage}}/{{totalPage}}</span>
        </div>
        <div class="fotRight">
          <button class="detailedFoot btnback" :disabled="currentPage === totalPage" @click="nextNumber()">后一页</button>
        </div>
      </div>
    </div>

    <loading></loading>
    <!-- 注单详情 -->
		<bettingDetail v-if="$store.state.site.showBettingDetail" v-bind:parentToChild="{bettingDetail:bettingDetailObject}"></bettingDetail>

    <!-- 页面引导图 -->
		<guideMap v-if="historyList.length > 0" v-bind:parentToChild="{localStorageName:'detailReportGuidFlag'}"></guideMap>
  </div>
</template>
<script>
import * as type from '../../../store/accountHistory/type'
import loading from '../../loading'
import bettingDetail from 'components/lottery/rightSideMenu/bettingDetail'
import guideMap from 'components/lottery/rightSideMenu/guideMap'
export default {
  data () {
    return {
      totalBettingMoney: 0, // 总下注金额
      totalCount: 0, // 总条数
      totalMemberResult: 0, // 亏盈情况
      currentPage: 1, // 页码
      pageSize: 10, // 每页显示条数
      totalPage: 1, // 总页码
      date: '', // 时间
      historyList: [],
      selectedLotteryId: null,
      bettingDetailObject: null, // 需要展示的注单详情对象
      isShowTable: false, // 是否展示选项卡（选择是否中奖的状态）
      isWinning: null, // 查询条件（null: 全部， Y：已中奖， N：未中奖）
      showLotteryTypes: false // 是否展示彩种
    }
  },
  methods: {
    // 返回
    goBack () {
      this.$router.go(-1)
      scrollTo(0, 0)
    },
    // 上一页
    preNumber () {
      // 如果页码为1，则不能上一页
      if (this.currentPage <= 1) {
        return
      }
      this.currentPage = Number(this.currentPage) - 1
      this.detailReportList(this.currentPage, this.date)
    },
    // 下一页
    nextNumber () {
      // 跳转下一页时判断页码不能大于最大页码
      if (this.currentPage >= this.totalPage) {
        return
      }
      this.currentPage = Number(this.currentPage) + 1
      this.detailReportList(this.currentPage, this.date)
    },
    // 账户历史-->点击指定某一天
    detailReportList (currentPage, date) {
      this.$store.state.site.showBetLoading = true
      this.$store.dispatch(type.BETTIONG_RECORDBYDATE_ACTION, { currentPage: currentPage,
        pageSize: 10,
        date: date,
        lotteryId: this.selectedLotteryId,
        isWinning: this.isWinning }).then(res => {
          // 总下注金额
          this.totalBettingMoney = res.data.total.totalBettingMoney
          // 亏盈情况
          this.totalMemberResult = res.data.total.totalMemberResult

          // 获取最大页码，判断是否还能点击下一页
          this.currentPage = res.data.total.currentPage
          this.pageSize = this.$route.query.pageSize
          this.totalPage = Math.ceil(res.data.total.totalCount / this.pageSize)
          this.historyList = this.$store.state.accountHistory.detailReportList.historyList
          this.$store.state.site.showBetLoading = false

          // 记录列表滚动回顶部
          this.$nextTick(() => {
            document.getElementById('recordContent').scrollTop = 0
          })
        })
    },
     // 打开彩种列表
    openLotteryTypes () {
      this.showLotteryTypes = true
      let height = 0
      if (this.selectedLotteryId) { // 选择有具体彩种
        for (let index in this.lotteryList) {
          if (this.selectedLotteryId === this.lotteryList[index].lotteryId) {
            height = 42 * index - 84
            break
          }
        }
      }
      // 滚动到指定彩种
      this.$nextTick(() => {
        document.getElementById('lotteryList').scrollTop = height
      })
    },
    // 关闭彩种列表
    closeLotteryTypes () {
      this.showLotteryTypes = false
    },
    // 注单详情
    bettingRecordDetail (item) {
      console.info(item)
      this.bettingDetailObject = item
      this.bettingDetailObject.project = this.bettingDetailObject.remark
      this.bettingDetailObject.lotteryId = parseInt(this.bettingDetailObject.lottery)
      this.$store.state.site.showBettingDetail = true
    },
    // 根据彩种id查询账户历史
    searchDetailReportByLottery (lotteryId) {
      this.selectedLotteryId = lotteryId
      this.detailReportList(1, this.date)
      this.showLotteryTypes = false
    },
    // 根据是否中奖的状态查询账户历史
    searchDetailReportByFlag (flag) {
      this.isWinning = flag
      this.detailReportList(1, this.date)
      this.isShowTable = false
    },
    titleEvent () {
      this.isShowTable = !this.isShowTable
    }
  },
  computed: {
    showBetLoading () {
      return this.$store.state.site.showBetLoading
    },
    lotteryId () {
      return this.$store.state.site.lotteryId
    },
    lotteryList () {
      let list = []
      for (let index in this.$store.state.home.lotteryList) {
        this.$store.state.home.lotteryList[index].lotteryType.forEach(lottery => {
          list.push(lottery)
        })
      }
      console.info('list:', list)
      return list
    },
    imgUrl () {
      return this.$store.state.home.commonImgUrl
    }
  },
  components: {
    loading,
    bettingDetail,
    guideMap
  },
  mounted () { // 不依赖 init 接口 没有依赖数据
    this.date = this.$route.query.date
    this.detailReportList(1, this.date)
  }
}
</script>

