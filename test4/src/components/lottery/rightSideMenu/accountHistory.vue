<template>
  <div class="yoPage">
    <div class="yoHeader">
      <div class="center">
          <div class="heaLeft" @click="goBack()">
              <i class="icon ion-ios-arrow-back"></i>
          </div>
          <div class="title">账户历史</div>
      </div>
    </div>
    <div class="yoPageBody">
      <div class="yoScroll yoHistory">
        <div class="account-history-nav">
          <span>亏盈</span>
          <span>投注金额</span>
          <span>日期</span>
        </div>
        <ul class="account-history-minute" :key="index" v-for="(item, index) in historyList">
          <li @click="detail(item.dateTime,item)" class="item-nums">
            <span class="currentnum ng-binding">{{item.date}}&nbsp;{{item.week}}</span>
            <span class="ng-binding">{{item.totalBettingMoney}}</span>
            <span>
              <p :class="item.totalResultMoney < 0 ? 'red' : 'wine'" class="ng-binding">{{item.totalResultMoney.toFixed(2)}}</p>
            </span>
          </li>
        </ul>
        <ul class="account-history-minute">
          <li>
            <span>合计</span>
            <span>{{allBetting}}</span>
            <span>
              <em :class="alltotalResult < 0 ? 'red' : 'wine'">{{alltotalResult.toFixed(2)}}</em>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <loading></loading>
  </div>
</template>
<script>
import * as type from '../../../store/accountHistory/type'
import loading from '../../loading'
export default {
  data () {
    return {
      allBetting: 0, // 合计金额
      alltotalResult: 0, // 亏盈金额
      currentPage: 1, // 页码
      pageSize: 10 // 最大显示数
    }
  },
  methods: {
    // 返回
    goBack () {
      this.$store.state.site.nowPosition = 0
      this.$router.go(-1)
      scrollTo(0, 0)
    },
    // 查询某一天的投注情况
    detail (param, res) {
      // 如果当天没投注则返回
      if (res.totalBettingMoney <= 0) {
        return false
      }
      // 跳转至某一天的投注详情页面
      window.router.push({path: '/detailReport', query: {date: param, currentPage: this.currentPage, pageSize: this.pageSize, lotteryId: this.$route.query.lotteryId}})
    }
  },
  computed: {
    // 初始化近七天的投注金额和盈亏
    historyList () {
      return this.$store.state.accountHistory.historyList
    },
    showBetLoading () {
      return this.$store.state.site.showBetLoading
    }
  },
  components: {
    loading
  },
  mounted () { // 不依赖 init 接口
    this.$store.state.site.showBetLoading = true
    // 如果state没值的话，则去拿最新数据
    this.$store.dispatch(type.ACCOUNT_HISTORY_ACTION).then(res => {
          // 为合计金额赋值
      this.allBetting = this.$store.state.accountHistory.allBetting
          // 为亏盈金额赋值
      this.alltotalResult = this.$store.state.accountHistory.alltotalResult
      this.$store.state.site.showBetLoading = false
    })
  }
}
</script>
