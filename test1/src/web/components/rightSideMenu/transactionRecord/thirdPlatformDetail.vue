<template>
  <div style="height: 100%;">
    <div style="height: 100%;">
      <!--页面表头-->
      <div class="header yo-home-nav">
        <div class="center">
          <div class="hea-menu hea-left">
            <a href="javascript:;" @click="goBack()">
              <i class="yo-icon icon-arrows-left"></i>
            </a>
          </div>
          <div class="header-text titile">
            <h1>投注记录</h1>
          </div>
          <div class="hea-user hea-right">
          <div class="hea-user hea-right">
            <a href="javascript:;" @click="GoHome()">
              <i class="yo-icon icon-home"></i>
            </a>
          </div>
          </div>
        </div>
      </div>

      <dl class="recordList" style="height:44px">
        <!--列表头部-->
        <dd class="newRecordsTitle" style="top:44px">
          <ul id="titleBet">
              <li style="width:17%">时间</li>
              <li style="width:20%">单号</li>
              <li style="width:26%">类型</li>
              <li style="width:17%">下注</li>
              <li style="width:20%">盈亏</li>
          </ul>
        </dd>
      </dl>

      <!--列表详情-->
      <div class="centerBox mainCenterTwo newBettingBox" :class="innerHeight < 500 ? 'minBody': innerHeight > 600 ? 'maxBody' : userAgents > 0 ? 'iPhone':''">
          <div class="recordBox scrollIos">
            <dl class="recordList sporsList">
              <!--<dd class="newRecordsTitle">
                <ul id="titleBet" >
                  <li style="width:17%">时间</li>
                  <li style="width:20%">单号</li>
                  <li style="width:26%">类型</li>
                  <li style="width:17%">下注</li>
                  <li style="width:20%">盈亏</li>
                </ul>
              </dd>-->
              <dd v-for="(item, index) in betedDetail" :key="index" class="newRecordsBody">
                <ul :class="item.status == 1  ? 'historyLineThrough' : ''">
                  <li style="width:17%">
                    <span>{{ String(item.bettingDateStr).substr(5,5)}}</span>
                    <span>{{ String(item.bettingDateStr).substr(11)}}</span>
                  </li>
                  <li style="width:20%">
                    <!--word-wrap: break-word;word-break: normal 超出折行展示-->
                    <span v-html="parseHtml(item.recordId)">{{ item.recordId }}</span>
                  </li>
                  <li style="width:26%">
                    <!--word-wrap: break-word;word-break: normal 超出折行展示-->
                    <span v-html="parseHtml(item.project)"></span>
                  </li>
                  <li style="width:17%">
                    <span>{{item.money | moneyFilter}}</span>
                    <span></span>
                  </li>
                  <li style="width:20%">
                    <span :class="{'red':Number(item.profit) > 0}">{{item.profit | moneyFilter}}</span>
                    <span></span>
                  </li>
                </ul>
              </dd>
              <!--无记录时显示-->
              <div v-if="betedDetail.length === 0" class="notDataShow">
                <img :src="imgUrl+'/no-record.png'">
                <p>暂无记录</p>
              </div>
            </dl>
          </div>
      </div>
    </div>
    <!-- 合计栏 有数据时显示 翻页栏不显示时，定位重新设置 -->
    <div v-if="betedDetail.length > 0" class="yoFooter yoFootNav total" :class="totalPage < 2 ? 'onFooter' : ''">
      <div class="center">
        <div class="fotLeft fot">
          <span class="count">合计: {{totalBettingMoney | moneyFilter}}</span>
        </div>
        <div class="fotRight">
          <em class="profitAndLoss" :class="{'red':Number(memberProfit) > 0 }">盈亏：{{memberProfit | moneyFilter}}</em>
        </div>
      </div>
    </div>
    <!-- 翻页栏 超过一页时展示 -->
    <div class="yoFooter yoFootNav yoPaging" id="chat_history" v-if="totalPage > 1">
      <div class="center">
        <div class="fotLeft fot">
          <button class="detailedFoot btnGo" :disabled="pageNo === 1" @click="preNumber()">前一页</button>
        </div>
        <div class="fotTitle">
          <span>{{pageNo}}/{{totalPage}}</span>
        </div>
        <div class="fotRight fot">
          <button class="detailedFoot btnback" :disabled="pageNo === totalPage" @click="nextNumber()">后一页</button>
        </div>
      </div>
    </div>

  </div>
</template>
<script>

import * as types from '@/base/store/transactionRecord/type'
import * as statusCode from '@/base/utils/status_const'
import method from '@/base/utils/method'
// import moment from 'moment'

export default {
  data () {
    return {
      pageNo: 1,
      pageSize: 10,
      betedDetail: [], // 第三方详情列表
      totalPage: 1,
      totalBettingMoney: 0,
      memberProfit: 0,
      innerHeight: window.innerHeight, // 小于 500px 时单独设置
      userAgents: window.navigator.userAgent.indexOf('iPhone') // iphone和安卓分开处理
    }
  },
  computed: {
    imgUrl () {
      return this.$store.state.home.commonImgUrl
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    GoHome () {
      this.$router.push('/wap/index')
    },
    getBetingRecord (page, id) {
      let times = this.$route.query
      /*  参数
       *  platform：平台 code
       *  queryDate：起始时间
       *  endTime：截至时间
       *  pageNo：查询页
       *  pageSize：每页数据
       *  gameType：查询具体彩种时候的彩票 ID
       */
      let param = { platform: times.selFlag, queryDate: times.startDate, endTime: times.endDate, pageNo: page, pageSize: this.pageSize, gameType: id, loading: '' }
      // 将基础数清空 防止接口错误时数据残留
      this.betedDetail = []
      this.totalBettingMoney = 0
      this.memberProfit = 0
      this.totalPage = 0
      this.$store.dispatch(types.GET_BETTING_RECORD_ACTION, param).then(res => {
        if (res.status === statusCode.statusConst.SUCCESS) {
          if (res.data) {
            this.totalBettingMoney = res.data.totalMoney
            this.memberProfit = res.data.totalProfit
            this.totalPage = Math.ceil(res.data.totalRow / this.pageSize)
            if (Array.isArray(res.data.data) && res.data.data.length < 10) {
              this.betedDetail = res.data.data
            } else {
              this.betedDetail = res.data.data.slice(0, 10)
            }
          }
        }
      })
    },
    preNumber () { // 上一页
      if (this.pageNo > 1 && this.pageNo <= this.totalPage) {
        this.pageNo--
        this.getBetingRecord(this.pageNo, '0')
      }
    },
    nextNumber () { // 下一页
      if (this.pageNo > 0 && this.pageNo < this.totalPage) {
        this.pageNo++
        this.getBetingRecord(this.pageNo, '0')
      }
    },
    parseHtml (html) {
      let { tooLongBreak } = method
      return tooLongBreak(html, 6)
    }
  },
  mounted () {
    this.getBetingRecord(this.pageNo, '0')
  }
}
</script>
