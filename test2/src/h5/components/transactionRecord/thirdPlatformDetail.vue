<template>
<div>
  <div v-show='!showDetail'>

    <!-- 引导页 -->
    <div v-if="betedDetail.length > 0" style='position:absolute;top:0;left:0;right:0;bottom:0;z-index:10000;' v-show='showBetMask' @click='closeMask'>
      <div style='position:absolute;top:0;left:0;right:0;z-index:10001;height:80px;background:rgba(0,0,0,0.53);'></div>
      <div style='position:absolute;top:125px;left:0;right:0;bottom:0;z-index:10001;background:rgba(0,0,0,0.53);'>
        <div style='width:256px;height:58px;background:#b33945;margin:30px auto;border-radius:5px;line-height:58px;color:white;text-align:center;'>
          <div style='width: 0;height: 0;position:absolute;left:0;right:0;margin:-10px auto;border-left: 10px solid transparent;border-right: 10px solid transparent; border-bottom: 10px solid #b33945;'></div>
          点击进入可查看详细信息
        </div>
      </div>
    </div>

    <!-- 列表内容 -->
    <div class="more-list-box yo-cell-box yo-cell-row5">

        <!--列表头部-->
        <div class="bet-list-title cell-box" style='background:#f8f8f8;'>
          <div>时间</div>
          <div>单号</div>
          <div>类型</div>
          <div>下注</div>
          <div>盈亏</div>
        </div>

        <!--列表详情-->
        <div class="betting-more bet-list-style" v-if="showNoData===false">
          <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange">
            <div class="cell-box" v-for="(item, index) in betedDetail" :key="index" @click='showBetDetail(item)'>
              <div>
                <p>{{ String(item.betDateTime).substr(5,5)}}</p>
                <span>{{ String(item.betDateTime).substr(11)}}</span></div>
              <div> <span v-html="parseHtml(item.betCode)">{{ item.betCode }}</span></div>
              <div> <span v-html="parseHtml(item.gameType)"></span></div>
              <div>
                <span>{{item.betAmount | moneyFilter}}</span>
                <span></span>
              </div>
              <div>
                <span :class="{'red-txt':Number(item.payOut) > 0}">{{item.payOut | moneyFilter}}</span>
                <span></span>
              </div>
            </div>
            <div slot="top" class="mint-loadmore-top">
              <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">
                      <spinLoading v-show="topStatus === 'drop'" loadingText='松开刷新...'></spinLoading>
                  </span>
              <mt-spinner color="#585252" :type="3" v-show="topStatus === 'loading'"></mt-spinner>
            </div>
            <div slot="bottom" class="mint-loadmore-bottom" style="display: block">
              <mt-spinner color="#585252" :type="3" v-show="bottomStatus === 'loading'"></mt-spinner>
            </div>
          </mt-loadmore>
          <!-- 更多 -->
              <div class="yo-more magt10" id="yoMore" v-if='showMore'>
                  <span class="moreline"></span><span>{{moreText}}</span><span class="moreline"></span>
              </div>
        </div>

        <!-- 无内容时显示 -->
        <no-data-page v-if="showNoData"></no-data-page>

        <!-- 合计栏 有数据时显示 翻页栏不显示时，定位重新设置 -->
        <div class="betting-foot" style='position:fixed;bottom:0;width:100%;' v-show="showNoData===false">
          <div style='float:left;'>合计：{{totalBettingMoney | moneyFilter}}</div>
          <div style='float:right;' :class='{"red-txt":memberProfit>0}'>盈亏：{{memberProfit | moneyFilter}}</div>
        </div>

    </div>
  </div>

  <betDetail :showDetail='showDetail' ref="betDetailRef"></betDetail>

  </div>
</template>
<script>
  import * as types from '../../store/transactionRecord/type'
  import spinLoading from '../loading.vue'
  import noDataPage from '@/components/floatPage/noData' // 无数据
  import Vue from 'vue'
  import Loadmore from 'mint-ui/lib/loadmore' // 按需加载mint-ui的模块
  import Spinner from 'mint-ui/lib/spinner'
  import BetDetail from './betDetail.vue'
  let statusCode = window.common.statusConst // 按需加载mint-ui的模块
  Vue.component(Spinner.name, Spinner)
  Vue.component(Loadmore.name, Loadmore)
  export default {
    data () {
      return {
        showMore: true,
        showDetail: false,
        showNoData: '',
        showBetMask: false,
        pageNo: 1,
        moreText: '', // 更多文本文字
        pageSize: 20,
        maxPageSize: 20, // 最大分页数
        betedDetail: [], // 第三方详情列表
        totalPage: 1,
        topStatus: '',
        bottomStatus: '',
        allLoaded: false,
        totalBettingMoney: 0, // 总下注
        memberProfit: 0, // 总盈亏
        isload: true,
        userAgents: window.navigator.userAgent.indexOf('iPhone') // iphone和安卓分开处理
      }
    },
    computed: {
      imgUrl () {
        return this.$store.state.shareApi.fastDfsUrl
      }
    },
    components: {
      spinLoading,
      noDataPage,
      BetDetail
    },
    methods: {
      handleTopChange (status) {
        this.topStatus = status
      },
      handleBottomChange (status) {
        this.bottomStatus = status
      },
      loadTop () {
        // 加载更多数据
        this.pageNo = 1
        this.isload = true
        this.betedDetail = []
        this.loadData(0)
        this.allLoaded = false // 下拉加载后重置滑动加载
        this.$refs.loadmore.onTopLoaded()
      },
      loadBottom () {
        // 加载更多数据
        if (this.pageNo >= this.maxPageSize) {
          window.layer.msgWarn('您查询的数据过多，请到电脑端查看')
          this.$refs.loadmore.onBottomLoaded() // 刷新节点
          return
        }
        if (this.isload) {
          this.pageNo++
          this.loadData(1)
        } else {
          this.$refs.loadmore.onBottomLoaded() // 刷新节点
        }
      },
      tooLongBreak: function (content, len) {
        let awardArray = content.split('')
        let count = 0
        let awardStr = ''
        awardArray.forEach(item => {
          if (count > len - 1) {
            awardStr += '<br>'
            count = 0
          }
          count += 1
          awardStr += item
        })
        return awardStr
      },
      closeMask () {
        this.showBetMask = false
      },
      goBack () {
        this.$router.go(-1)
      },
      GoHome () {
        this.$router.push('/wap/index')
      },
      showBetDetail (item) {
        localStorage.setItem('betedDetailInfo', JSON.stringify(item)) // 将选中的投注记录存储到本地，然后跳转的时候，取出来显示
        this.$refs.betDetailRef.initData()
        this.showDetail = true
      },
      loadData (type) {
        let times = this.$route.query
        let param = {
          platform: times.selFlag,
          queryDate: times.startDate,
          endTime: times.endDate,
          pageNo: this.pageNo,
          pageSize: this.pageSize
        }
        // window.__DEBUG = false
        this.$store.dispatch(types.GET_BETTING_RECORD_ACTION, param).then(res => {
          if (res.status === statusCode.SUCCESS) {
            if (res.data.info.content.length === 0) {
              this.allLoaded = true // 若数据已全部获取完毕
            }
  
            let summary = res.data.info.summary
            if (summary) {
              this.totalBettingMoney = summary.betAmounts || 0
              this.memberProfit = summary.payOuts || 0
            }
          }
          if (Number(type) === 0) {
            this.betedDetail = res.data.info.content
            this.$refs.loadmore.onTopLoaded()
          } else if (Number(type) === 1) {
            this.betedDetail = this.betedDetail.concat(res.data.info.content)
            this.$refs.loadmore.onBottomLoaded()
          } else {
            this.betedDetail = this.betedDetail.concat(res.data.info.content)
            console.log(this.betedDetail, 'this.betedDetail')
          }
          if (this.betedDetail.length === 0) {
            this.showNoData = true
          } else {
            this.showNoData = false
          }
  
          // 计算是否有一页以上的内容
          let total = res.data.info.totalPageNum
          console.log(Number(total), this.pageNo)
          if (Number(total) <= this.pageNo) {
            if (Number(total) === 1) {
              this.showMore = false // 如果总条数不够一页，那么不允许下拉 也不显示没有更多了。
            } else {
              this.showMore = true
              this.moreText = '没有更多了'
              this.$nextTick(() => {
                window.$('#yoMore').addClass('gray-more')
              })
            }
            this.isload = false
            console.log(this.showMore, 'showMore')
          } else {
            this.moreText = '更多'
            this.$nextTick(() => {
              window.$('#yoMore').removeClass('gray-more')
            })
            this.isload = true
          }
        })
      },
      closeBetDetail () {
        this.showDetail = false
        this.$store.state.h5Home.headerType = 3
        this.$store.state.h5Home.headTitle = '投注记录'
        this.$store.state.h5Home.headRight = ''
      },
      parseHtml (html) {
        return this.tooLongBreak(html, 6)
      }
    },
    mounted () {
      this.$store.state.h5Home.headerType = 3
      this.$store.state.h5Home.headTitle = '投注记录'
      this.$store.state.h5Home.headLeft = 'icon-back'
      this.$store.state.h5Home.headRight = ''
      this.loadData()
      Vue.prototype.$closeBetDetail = this.closeBetDetail
    }
  }
</script>
