<template>
  <div id="lotteryBettingHistory">
    <!--投注记录列表页-->
    <div v-show="!showDetail">
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
            <a class="heaRight" @click="openLotteryTypes()">
              <i style="font-size: 17px;">彩种</i>
            </a>
          </div>
        </div>
      </div>
      <dl class="recordList" style="height:44px">
        <!--列表头部-->
        <dd class="newRecordsTitle" style="top:44px">
          <ul id="titleBet">
            <li style="width:17%">时间</li>
            <li style="width:24%">类型</li>
            <li style="width:26%">玩法</li>
            <li style="width:15%">下注</li>
            <li style="width:18%">盈亏</li>
          </ul>
        </dd>
      </dl>
      <!--通过 innerHeight 判断 iPhone 5s 单独设置高-->
      <div class="centerBox mainCenterTwo newBettingBox" :class="innerHeight < 500 ? 'minBody': innerHeight > 600 ? 'maxBody' : userAgents > 0 ? 'iPhone':''">
        <!--<mt-loadmore>-->
        <div class="recordBox scrollIos">
          <dl class="recordList">
            <!--列表主体-->
            <dd @click="toCurrentRecordPage(item)" v-for="(item, index) in bettingRecordData" :key="index" class="newRecordsBody">
              <ul :class="item.status == 1  ? 'historyLineThrough' : ''">
                <li class="gray first" style="width:17%">
                  <span>{{ item.bettingDateStr.substr(5,5)}}</span>
                  <span>{{ item.bettingDateStr.substr(11)}}</span>
                </li>
                <li class="gray third" style="width:24%">
                  <span>{{ item.lotteryName | max6Filter }}</span>
                  <span class="blue" v-if="item.lotteryId!==100 && item.lotteryId!==101">{{ item.period.substr(-3) + '期' | max6Filter }}</span>
                  <span class="blue" v-if="item.lotteryId===100 || item.lotteryId===101">{{ item.bettingCode }}</span>
                </li>
                <li style="width:26%">
                  <span>{{ item.project | max6Filter}}</span>
                  <span >@<em class="red">{{ item.odds }}</em></span>
                </li>
                <li style="width:15%">
                  <span>{{ Number(item.money).toFixed(0) }}</span>
                  <span></span>
                </li>
                <li style="width:18%">
                  <span :class="{'red':Number(item.profit) > 0}">{{item.profit | moneyFilter}}</span>
                  <span></span>
                </li>
              </ul>
            </dd>
            <!--无数据时显示-->
            <div v-if="bettingRecordData.length === 0" class="notDataShow">
              <img :src="imgUrl+'/no-record.png'">
              <p>暂无记录</p>
            </div>
          </dl>
        </div>
        <!--</mt-loadmore>-->
      </div>
    </div>
    <!--投注详情页-->
    <div v-if="showDetail">
      <div class="header yo-home-nav">
        <div class="center">
          <div class="hea-menu hea-left">
            <a href="javascript:;" @click="goBack(1)">
              <i class="yo-icon icon-arrows-left"></i>
            </a>
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
                <span class="itemTxt longText">{{ detailData.lotteryName }}<br>
                  <span style="text-align:center" v-if="detailData.lotteryId!==100 && detailData.lotteryId!==101">{{'第' + detailData.period.substr(-3) + '期'}}</span>
                </span>
                <span class="itemNeir" :class="{'red':detailData.win === '已中奖'}">{{detailData.win}}</span>
              </div>
            </dd>
            <dd>
              <div class="formIput">
                <span class="itemTxt">投注时间</span>
                <span class="itemNeir">{{ detailData.bettingDateStr }}</span>
              </div>
            </dd>
            <dd>
              <div class="formIput">
                <span class="itemTxt">投注内容</span>
                <span class="itemNeir">{{ detailData.project }}</span>
              </div>
            </dd>
            <dd>
              <div class="formIput">
                <span class="itemTxt">赔率</span>
                <span class="itemNeir red">{{ detailData.odds}}</span>
              </div>
            </dd>
            <dd>
              <div class="formIput">
                <span class="itemTxt">投注金额</span>
                <span class="itemNeir">¥{{ detailData.money | moneyFilter}}</span>
              </div>
            </dd>
            <dd>
              <div class="formIput">
                <span class="itemTxt">派彩金额</span>
                <span class="itemNeir" :class="{'green':detailData.winMoney > 0}">¥{{detailData.winMoney | moneyFilter}}</span>
              </div>
            </dd>
            <dd>
              <div class="formIput">
                <span class="itemTxt">开奖号码</span>
                <span class="itemNeir" v-html="parseHtml(detailData.awardNum)"></span>
                <!--<span class="itemNeir">{{detailData.awardNum | max20Num}}</span>-->
              </div>
            </dd>
            <dd>
              <div class="formIput">
                <span class="itemTxt">投注单号</span>
                <span class="itemNeir">{{ detailData.bettingCode }}</span>
              </div>
            </dd>
            <dd>
              <div class="formIput">
                <span class="itemTxt">备注</span>
                <span class="itemNeir">{{
                  detailData.status === '1' ?
                    '注单取消' : detailData.op === '1' ?
                    '注单取消' : detailData.op === '2' ?
                      '注单回结' : ''}}</span>
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <!-- 彩种列表 -->
    <div v-show="showLotteryTypes" class="LotteryTypes TipsWindown" id="lotteryBettingHistory">
      <div class="shadeIn">
        <div class="selBankBox time">
          <h1>
            <a @click="searchDetailReportByLottery('0')" class="allButton">全部</a>
            <a @click="closeLotteryTypes" class="cancelButton">取消</a>
          </h1>
          <dl class="modelContent">
            <dt :key="item + i" v-for="(item,i) in lotteryList" @click="searchDetailReportByLottery(item.code)" :class="selectedLotteryId === item.code ? 'isSelected' : ''">
              <span>{{item.type}}</span>
            </dt>
          </dl>
        </div>
      </div>
    </div>

    <!-- 合计栏 有数据时显示 翻页栏不显示时，定位重新设置 -->
    <div v-show="bettingRecordData.length > 0 && !showDetail" class="yoFooter yoFootNav total" :class="totalPage < 2 ? 'onFooter' : ''">
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
    <div class="yoFooter yoFootNav yoPaging" id="chat_history" v-show="totalPage > 1 && !showDetail">
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
  export default {
    data () {
      return {
        showDetail: false, // 展示详情
        detailData: {}, // 当前查看详情对应数据对象
        bettingRecordData: [], // 投注记录列表详情数据
        pageNo: 1, // 当前页码
        showLotteryTypes: false, // 彩种弹框显示
        selectedLotteryId: '0', // 选择的彩种id
        totalPage: 1, // 总页数 根据返回的总条数除以 pageSize
        totalBettingMoney: 0, // 合计金额
        memberProfit: 0, // 会员盈亏
        pageSize: 10, // 每页显示条数
        lotteryList: [], // 彩种列表数据
        innerHeight: window.innerHeight, // 窗口高度 对iphone5特别设置高
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
        this.detailData = data // 当前该条数据的详情数据
      },
      goBack (type) { // type = 1 表示在当前页面退回平台选择页面 type = 0 表示隐藏详情页面，显示投注列表页面
        if (type === 0) {
          this.$router.go(-1)
        } else if (type === 1) {
          this.showDetail = false
          this.detailData = []
        }
      },
      openLotteryTypes () { // 打开彩种弹框列表
        this.showLotteryTypes = true
        let height = 0
        if (this.selectedLotteryId) {
          for (let index in this.lotteryList) {
            if (this.selectedLotteryId === this.lotteryList[index].code) {
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
        let param = { platform: times.selFlag, queryDate: times.startDate, endTime: times.endDate, pageNo: page, pageSize: this.pageSize, gameType: id }
        // 将基础数清空 防止接口错误时数据残留
        this.bettingRecordData = []
        this.totalBettingMoney = 0
        this.memberProfit = 0
        this.totalPage = 1
        this.$store.dispatch(types.GET_BETTING_RECORD_ACTION, param).then(res => {
          if (res.status === statusCode.statusConst.SUCCESS) {
            if (res.data) {
              this.totalBettingMoney = res.data.totalMoney
              this.memberProfit = res.data.totalProfit
              this.totalPage = Math.ceil(res.data.totalRow / this.pageSize) // 页码计算上取整
              if (Array.isArray(res.data.data) && res.data.data.length < 10) {
                this.bettingRecordData = res.data.data
              } else {
                this.bettingRecordData = res.data.data.slice(0, 10) // 每页最多10条数据，如果接口异常，返回多条，截取前10条
              }
            }
          }
        })
      },
      getLotteryList () { // 后端获取具体彩种列表
        let times = this.$route.query // 路由获取参数
        this.$store.dispatch(types.GET_GETGAMETYPE_RECORD_ACTION, {code: times.selFlag}).then(res => {
          if (Array.isArray(res.data)) {
            this.lotteryList = res.data
            // this.selectedLotteryId = res.data[0].code
          }
        })
      },
      // 点击具体彩种时，根据彩种查询数据 弹框消失
      searchDetailReportByLottery (lotteryId) {
        this.pageNo = 1
        this.selectedLotteryId = lotteryId
        this.showLotteryTypes = false
        this.getBetingRecord(this.pageNo, lotteryId)
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
      },
      parseHtml (html) {
        let { max20Num } = method
        return max20Num(html, 20)
      }
    },
    mounted () {
      this.getBetingRecord(1, '0')
      this.getLotteryList()
    }
  }
</script>
