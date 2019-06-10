<template>
	<div id="betRecord" class="yoPage">
    <div class="yoHeader">
        <div class="center">
            <div class="heaLeft" @click="goBack()">
                <i class="icon ion-ios-arrow-back"></i>
            </div>
            <div class="title headerItem" @click="showMenu()">即时注单<span v-if="selectedLotteryId === 24" class="triangle triangleDown"></span></div>
            <div class="heaRight" @click="openLotteryTypes()">
                <span style="font-size: 17px;">彩种</span>
            </div>
        </div>
    </div>

    <!-- 选项卡：选择是否中奖的状态 -->
    <div v-if="isShowTable" style="position: fixed; z-index: 12; top: 44px; width: 100%;">
      <div class="query-conditions">
        <span :class="isNormal==='Y' ? 'selected' : ''" @click="undo(1)">正常注单</span>
        <span :class="isNormal==='N' ? 'selected' : ''" @click="undo(2)">撤销注单</span>
      </div>
    </div>

    <!--导航栏开始-->
    <div class="yoHeaNav">
      <div class="forthwith-receipts-nav">
          <span style="width:19%">时间</span>
          <span style="width:25%">类型</span>
          <span style="width:35%">玩法</span>
          <span style="width:18%">下注</span>
      </div>
    </div>
      <!--导航栏结束-->
		<div class="yoPageBody3" :class="totalPage > 1 && bettingRecordList.length > 0 ? 'hasCount' : ''">
			<div id="recordContent" class="yoScroll" >
          <!--详细信息-->
          <ul class="forthwith-receipts-minute" :key="index" v-for="(item , index) in bettingRecordList" :class="item.status == 1  ? 'bettingLineThrough' : ''">
            <li @click="bettingRecordDetail(item)" style="background: white;">
              <span style="width:20%">
                <p style="margin:0px auto;padding-left:15px;" align="center">
                  {{item.bettingTime1}}
                </p>
                {{item.bettingTime2}}
              </span>
              <span v-if="item.lotteryId < 100" style="width:25%">
                {{item.lotteryName}}
                <i class="blue">
                  {{item.period}} 期
                </i>
              </span>
              <span v-if="item.lotteryId >= 100" style="width:25%">
                {{item.lotteryName}}
                <i class="blue">{{item.bettingCode}}</i>
              </span>
              <span style="width:35%">
                {{item.project | subContent(10)}}
                <p>
                  <u class="red">@{{item.odds}}</u>
                </p>
              </span>
              <span style="width:20%">
                <div class="red">{{item.money | moneyFilter}}</div>
              </span>
            </li>
          </ul>
          <div v-if="bettingRecordList.length === 0" style="width:116px;padding-top: 34%; margin: auto;}">
            <img :src="imgUrl+'/rightSideMenu/no-record.png'">
            <p style="text-align: center; color: rgb(199, 199, 199); margin-top: 6px;">暂无记录</p>
          </div>
			</div>
		</div>
		<!-- 彩种列表 -->
		<div v-show="showLotteryTypes" class="LotteryTypes">
			<div class="shadeIn">
				<div class="selLotteryType">
					<div>
						<span @click="searchData" class="allButton">全部</span>
						<span @click="closeLotteryTypes" class="cancelButton">取消</span>
					</div>
					<dl id="lotteryList">
						<dt :key="item + i" v-for="(item,i) in lotteryList" @click="searchData(item)" :class="selectedLotteryId === item.lotteryId ? 'isSelected' : ''">
								<span>{{item.lotteryName}}</span>
						</dt>
					</dl>
				</div>
			</div>
		</div>
    <!-- 合计栏 -->
		<div v-if="bettingRecordList.length > 0" class="yoFooter yoFootNav total" :class="totalPage < 2 ? 'onFooter' : ''">
      <div class="center">
        <div class="fotLeft">
          <span class="count">合计: {{totalList.totalMoney.toFixed(2)}}</span>
        </div>
        <div class="fotRight"></div>
      </div>
		</div>
    <!-- 翻页栏 -->
    <div class="yoFooter yoFootNav yoPaging" id="chat_history" v-if="totalPage > 1 && bettingRecordList.length > 0">
      <div class="center ">
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
		<bettingDetail  v-on:detailCancel="detailFun" v-if="$store.state.site.showBettingDetail" v-bind:parentToChild="{bettingDetail:bettingDetailObject}"></bettingDetail>

		<!-- 页面引导图 -->
		<guideMap v-if="bettingRecordList.length > 0" v-bind:parentToChild="{localStorageName:'todayBettingRecordGuidFlag'}"></guideMap>
	</div>
</template>
<script>
import * as type from '../../../store/bettingRecord/type'
import loading from '../../loading'
import bettingDetail from 'components/lottery/rightSideMenu/bettingDetail'
import guideMap from 'components/lottery/rightSideMenu/guideMap'
export default {
  data () {
    return {
      currentPage: 1, // 页码
      pageSize: 10, // 页面大小
      totalPage: 1, // 总页码
      bettingDetailObject: null, // 需要展示的注单详情对象
      selectedLotteryId: null,
      showLotteryTypes: false, // 是否展示彩种
      // isNormal: 'Y', // 按钮选中状态
      isShowTable: false // 是否展示正常注单按钮
    }
  },
  methods: {
// 返回
    goBack () {
      this.$store.state.site.nowPosition = 0
      this.$router.go(-1)
      scrollTo(0, 0)
      this.$store.state.site.isNormal = 'Y' // 回退后再进来默认查询正常注单
    },
// 上一页
    preNumber () {
      // 如果页码为1，则不能上一页
      if (this.currentPage <= 1) {
        return
      }
      this.currentPage = parseInt(this.currentPage) - 1
      if (this.selectedLotteryId === 24 && this.$store.state.site.isNormal === 'N') {
        this.searchData({ lotteryId: 24 }, 2)
      } else {
        this.searchData()
      }
    },
    // 下一页
    nextNumber () {
// 跳转下一页时判断页码不能大于最大页码
      if (this.currentPage >= this.totalPage) {
        return
      }
      this.currentPage = parseInt(this.currentPage) + 1
      if (this.selectedLotteryId === 24 && this.$store.state.site.isNormal === 'N') {
        this.searchData({ lotteryId: 24 }, 2)
      } else {
        this.searchData()
      }
    },
    searchData (lottery, parm) {
      this.isShowTable = false
      this.closeLotteryTypes()
      console.info(lottery)
      let lotteryId = null
      if (this.$route.query.lotteryId) {
        lotteryId = parseInt(this.$route.query.lotteryId)
      }
      if (lottery) {
        lotteryId = lottery.lotteryId
        this.$route.query.lotteryId = lottery.lotteryId
        if (!parm || parm !== 2) {
          this.currentPage = 1
          this.$store.state.site.isNormal = 'Y'
        }
      }
      this.selectedLotteryId = lotteryId
      let params = { currentPage: this.currentPage, pageSize: this.pageSize, lotteryId: lotteryId }
      if (parm === 2) {
        params.bettingStatus = '4'
      }
      console.info('this.selectedLotteryId:', this.selectedLotteryId)
      this.$store.state.site.showBetLoading = true
      this.$store.dispatch(type.BETTING_RECORD_ACTION, params).then(res => {
        if (res.data.unbalanceList && res.data.unbalanceList.length) {
          this.currentPage = res.data.total.currentPage
          this.totalPage = Math.ceil(Number(this.$store.state.bettingRecord.totalList.totalCount) / this.pageSize)
        }
        this.$store.state.site.showBetLoading = false

        // 记录列表滚动回顶部
        this.$nextTick(() => {
          document.getElementById('recordContent').scrollTop = 0
        })
      })
    },
    // 监听子组件返回数据
    detailFun (detailCancel) {
      this.currentPage = detailCancel.currentPage
      this.totalPage = detailCancel.totalPage
      this.$store.state.site.isNormal = 'N'
      this.selectedLotteryId = 24
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
       // 禁止背景滑动
      window.$('.yoPage #recordContent').css('position', 'fixed')
      // 滚动到指定彩种
      this.$nextTick(() => {
        document.getElementById('lotteryList').scrollTop = height
      })
    },
    // 关闭彩种列表
    closeLotteryTypes () {
      this.showLotteryTypes = false
      // 彩种列表关闭，页面恢复背景滑动
      window.$('.yoPage #recordContent').css('position', 'static')
    },
    // 即时注单详情
    bettingRecordDetail (item) {
      console.info(item)
      this.bettingDetailObject = item
      this.bettingDetailObject.bettingMoney = item.money
      this.$store.state.site.showBettingDetail = true
    },
    // 按钮展示和收缩
    showMenu () {
      if (this.selectedLotteryId === 24) {
        this.isShowTable = !this.isShowTable
      } else {
        return false
      }
    },
    undo (codes) {
      this.isShowTable = false
      if (codes === 1) {
        this.$store.state.site.isNormal = 'Y'
        this.searchData({lotteryId: 24}, 1)
      } else if (codes === 2) {
        this.$store.state.site.isNormal = 'N'
        this.currentPage = 1
        this.searchData({ lotteryId: 24 }, 2)
      }
    }
  },
  components: {
    loading,
    bettingDetail,
    guideMap
  },
  computed: {
    bettingRecordList () {
      return this.$store.state.bettingRecord.bettingRecordList
    },
    showBetLoading () {
      return this.$store.state.site.showBetLoading
    },
    totalList () {
      return this.$store.state.bettingRecord.totalList
    },
    lotteryList () {
      let list = []
      for (let index in this.$store.state.home.lotteryList) {
        this.$store.state.home.lotteryList[index].lotteryType.forEach(lottery => {
          if (lottery.lotteryId !== 100 && lottery.lotteryId !== 101) {
            list.push(lottery)
          }
        })
      }
      console.info('list:', list)
      return list
    },
    isNormal () {
      return this.$store.state.site.isNormal
    },
    imgUrl () {
      return this.$store.state.home.commonImgUrl
    }
  },
  mounted () { // 不依赖 init 接口
    this.searchData()
  }
}
</script>

