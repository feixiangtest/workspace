<template>
  <div style="height: 100%;">
    <div style="height: 100%;" v-show="!showDetail">
        <div class="header yo-home-nav">
            <div class="center">
                <div class="hea-menu hea-left">
                    <a href="javascript:;" @click="goBack(0)">
                        <i class="yo-icon icon-arrows-left"></i>
                    </a>
                </div>
                <div class="header-text titile">
                    <h1>投注记录</h1>
                </div>
                <div class="hea-user hea-right">
                    <a href="javascript:;" @click="openLotteryTypes()">
                        <i style="font-size: 17px;">类型</i>
                    </a>
                </div>
            </div>
        </div>
        <dl class="recordList" style="height:44px">
            <!--列表头部-->
            <dd class="newRecordsTitle" style="top:44px">
                <ul id="titleBet">
                    <li style="width:17%">时间</li>
                    <li style="width:20%">单号</li>
                    <li style="width:26%">内容</li>
                    <li style="width:17%">下注</li>
                    <li style="width:20%">盈亏</li>
                </ul>
            </dd>
        </dl>
        <div class="centerBox mainCenterTwo newBettingBox" :class="innerHeight < 500 ? 'minBody': innerHeight > 600 ? 'maxBody' : userAgents > 0 ? 'iPhone':''">
            <div class="recordBox scrollIos">
                <dl class="recordList sporsList">
                    <!--<dd class="newRecordsTitle">
                        <ul id="titleBet">
                            <li style="width:17%">时间</li>
                            <li style="width:20%">单号</li>
                            <li style="width:26%">内容</li>
                            <li style="width:17%">下注</li>
                            <li style="width:20%">盈亏</li>
                        </ul>
                    </dd>-->
                    <dd @click="toCurrentRecordPage(item)" v-for="(item, index) in betedDetail" :key="index" class="newRecordsBody">
                        <ul :class="item.status == 1  ? 'historyLineThrough' : ''">
                            <li style="width:17%">
                                <span>{{ item.bettingDateStr.substr(5,5)}}</span>
                                <span>{{ item.bettingDateStr.substr(11)}}</span>
                            </li>
                            <li style="width:20%">
                                <span>{{ item.bettingCode | max6Filter}}</span>
                                <span></span>
                            </li>
                            <li style="width:26%">
                                <span>{{ item.lotteryName | max6Filter}}</span>
                                <span>{{ item.remark | max6Filter}}</span>
                            </li>
                            <li style="width:17%">
                                <span>{{ Number(item.money).toFixed(0)}}</span>
                                <span></span>
                            </li>
                            <li style="width:20%">
                                <span :class="{'red':Number(item.profit) > 0}">{{item.profit | moneyFilter}}</span>
                                <span></span>
                            </li>
                        </ul>
                    </dd>
                    <div v-if="betedDetail.length === 0" class="notDataShow">
                        <img :src="imgUrl+'/no-record.png'">
                        <p>暂无记录</p>
                    </div>
                </dl>
            </div>
        </div>
    </div>
    <div v-if="showDetail">
      <div class="header yo-home-nav">
          <div class="center">
              <div class="hea-menu hea-left">
                  <a href="javascript:;" @click="goBack(1)"><i class="yo-icon icon-arrows-left"></i></a>
              </div>
              <div class="header-text titile">
                  <h1>消息详情</h1>
              </div>
              <div class="hea-user hea-right">
              </div>
          </div>
      </div>
      <div class="centerBox mainCenter">
          <div class="depositMain onlineDraw">
              <dl class="secondForm">
                  <dd>
                      <div class="formIput">
                          <span class="itemTxt">注单号码</span>
                          <span class="itemNeir">{{ detailData.bettingCode }}</span>
                      </div>
                  </dd>
                  <dd>
                      <div class="formIput">
                          <span class="itemTxt">下注时间</span>
                          <span class="itemNeir">{{ detailData.bettingDateStr }}</span>
                      </div>
                  </dd>
                  <dd>
                      <div class="formIput">
                          <span class="itemTxt">方式</span>
                          <span class="itemNeir">{{ detailData.plate }}</span>
                      </div>
                  </dd>
                  <dd>
                      <div class="formIput">
                          <span class="itemTxt">内容</span>
                          <span class="itemNeir">
                            <strong v-html="detailData.project"></strong>
                          </span>
                      </div>
                  </dd>
                  <dd>
                      <div class="formIput">
                          <span class="itemTxt">下注金额</span>
                          <span class="itemNeir">{{ detailData.money | moneyFilter }}</span>
                      </div>
                  </dd>
                  <dd>
                      <div class="formIput">
                          <span class="itemTxt">输赢情况</span>
                          <span class="itemNeir">输赢：<span v-if="(Number(detailData.abFlag) === 0 || Number(detailData.abFlag) === 1) && Number(detailData.op) !== 1" style="color: #8080C0;">
                              {{detailData.profit | moneyFilter}}</span>
                            <span v-if="(Number(detailData.abFlag) === 0 || Number(detailData.abFlag) === 1) && Number(detailData.op) === 1" style="color: #ff0000;">{{detailData.profit | moneyFilter}}</span>
                            <span v-if="Number(detailData.abFlag) === 2 && Number(detailData.op) !== 1" style="color: green;">{{detailData.profit | moneyFilter}}</span>
                            <span v-if="(Number(detailData.abFlag) === 3 || Number(detailData.abFlag) === 4) && Number(detailData.op) !== 1" style="color: #F00;">{{detailData.profit | moneyFilter}}</span>
                            <span v-if="(Number(detailData.abFlag) === 3 || Number(detailData.abFlag) === 4) && Number(detailData.op) === 1" style="color: #8080C0;">{{detailData.profit | moneyFilter}}</span>
                            <br />退水：<span v-if="detailData.returnRatio > 0"><em v-if="detailData.returnRatio > 0">+</em>{{detailData.returnRatio | moneyFilter}}</span><br />总和：<span >
                                    <em v-if="(detailData.profit + detailData.returnRatio) > 0">+</em>{{(detailData.profit + detailData.returnRatio) | moneyFilter}}
                                </span>
                          </span>
                      </div>
                  </dd>
                  <dd>
                      <div class="formIput">
                          <span class="itemTxt">赛果</span>
                          <span class="itemNeir" v-if="Number(detailData.abFlag) === 0">输</span>
                          <span class="itemNeir" v-if="Number(detailData.abFlag) === 1">输一半</span>
                          <span class="itemNeir" v-if="Number(detailData.abFlag) === 2">和</span>
                          <span class="itemNeir" v-if="Number(detailData.abFlag) === 3">赢一半</span>
                          <span class="itemNeir" v-if="Number(detailData.abFlag) === 4">赢</span>
                      </div>
                  </dd>
                  <!--<dd>
                     <div class="formIput">
                        <span class="itemTxt">备注</span>
                        <span class="itemNeir">{{detailData.op === '1'?'注单取消' : detailData.op === '2' ? '注单取消重建':''}}</span>
                     </div>
                  </dd>-->
              </dl>
          </div>
      </div>
    </div>
    <!-- 彩种列表 -->
    <div v-if="showLotteryTypes" class="LotteryTypes TipsWindown" id="lotteryBettingHistory">
        <div class="shadeIn">
            <div class="selBankBox time">
                <h1>
                    <a @click="searchDetailReportByLottery('0')" class="allButton">全部</a>
                    <a @click="closeLotteryTypes" class="cancelButton">取消</a>
                </h1>
                <dl class="modelContent">
                    <dt :key="item + i" v-for="(item,i) in sportList" @click="searchDetailReportByLottery(item.code)" :class="selectedLotteryId === item.code ? 'isSelected' : ''">
                        <span>{{item.type}}</span>
                    </dt>
                </dl>
            </div>
        </div>
    </div>
     <!-- 合计栏 有数据时显示 翻页栏不显示时，定位重新设置 -->
    <div v-if="betedDetail.length > 0 && !showDetail" class="yoFooter yoFootNav total" :class="totalPage < 2 ? 'onFooter' : ''">
        <div class="center">
            <div class="fotLeft fot">
                <span class="count">合计: {{totalBettingMoney | moneyFilter}}</span>
            </div>
            <div class="fotRight fot">
                <em class="profitAndLoss" :class="{'red':Number(memberProfit) > 0 }">盈亏：{{memberProfit | moneyFilter}}</em>
            </div>
        </div>
    </div>
    <!-- 翻页栏 超过一页时展示 -->
    <div class="yoFooter yoFootNav yoPaging" id="chat_history" v-if="totalPage > 1 && !showDetail">
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

export default {
  data () {
    return {
      showDetail: false, // 展示详情
      detailData: {}, // 当前查看详情对应数据对象
      pageNo: 1,
      betedDetail: [], // 投注记录列表
      sportList: [], // 体育类型列表
      pageSize: 10,
      showLotteryTypes: false,
      selectedLotteryId: '0',
      totalPage: 1,
      totalBettingMoney: 0,
      memberProfit: 0,
      innerHeight: window.innerHeight,
      userAgents: window.navigator.userAgent.indexOf('iPhone') // iphone和安卓分开处理
    }
  },
  computed: {
    imgUrl () {
      return this.$store.state.home.commonImgUrl
    }
  },
  methods: {
    toCurrentRecordPage (data) {
      this.showDetail = true // 展示详情
      this.detailData = data // 详情数据
    },
    openLotteryTypes () {
      this.showLotteryTypes = true
      let height = 0
      if (this.selectedLotteryId) { // 选择有具体彩种
        for (let index in this.sportList) {
          if (this.selectedLotteryId === this.sportList[index].code) {
            height = 42 * index - 84
            break
          }
        }
      }
      // 滚动到指定彩种
      this.$nextTick(() => {
        document.getElementsByClassName('modelContent')[0].scrollTop = height
      })
    },
    closeLotteryTypes () {
      this.showLotteryTypes = false
    },
    goBack (type) {
      if (type === 0) { // type = 0 表示回退页面
        this.$router.go(-1)
      } else if (type === 1) { // type = 1 表示隐藏详情页面
        this.showDetail = false
        this.detailData = []
      }
    },
    getSportList (code) { // 请求具体彩种列表
      let times = this.$route.query
      // code ty表示体育，请求体育列表 cp表示彩票，请求彩票列表 第三方没有列表
      this.$store.dispatch(types.GET_GETGAMETYPE_RECORD_ACTION, { code: times.selFlag }).then(res => {
        if (Array.isArray(res.data)) {
          this.sportList = res.data
        //   this.selectedLotteryId = res.data[0].code
        }
      })
    },
    // 查询具体体育类型的交易记录类型
    searchDetailReportByLottery (lotteryId) {
      this.pageNo = 1
      this.selectedLotteryId = lotteryId
      this.showLotteryTypes = false
      this.getBetingRecord(this.pageNo, lotteryId)
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
      this.totalPage = 1
      this.$store.dispatch(types.GET_BETTING_RECORD_ACTION, param).then(res => {
        if (res.status === statusCode.statusConst.SUCCESS) {
          if (res.data) {
            console.log(res)
            this.totalBettingMoney = res.data.totalMoney
            this.memberProfit = res.data.totalProfit
            this.totalPage = Math.ceil(res.data.totalRow / this.pageSize) // 页码计算上取整
            if (Array.isArray(res.data.data) && res.data.data.length < 10) {
              this.betedDetail = res.data.data
            } else {
              this.betedDetail = res.data.data.slice(0, 10) // 每页最多10条数据，如果接口异常，返回多条，截取前10条
            }
          }
        }
      })
    },
    preNumber () { // 上一页
      if (this.pageNo > 1 && this.pageNo <= this.totalPage) {
        this.pageNo--
        this.getBetingRecord(this.pageNo, this.selectedLotteryId)
      }
    },
    nextNumber () { // 下一页
      if (this.pageNo > 0 && this.pageNo < this.totalPage) {
        this.pageNo++
        this.getBetingRecord(this.pageNo, this.selectedLotteryId)
      }
    }
  },
  mounted () {
    this.getBetingRecord(this.pageNo, '0')
    this.getSportList()
  }
}
</script>
