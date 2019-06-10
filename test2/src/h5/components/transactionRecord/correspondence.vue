<template>
    <div class="more-list-box">

        <div class="history-more" v-if="!noData" >
            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" 
                         :auto-fill="false" ref="loadmore" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange">
                
                <dl class="record-list" >
                    <!-- 往来记录条目 -->
                    <dd class="yow-content" @click="toCurrentRecordPage(item)" v-for="(item, index) in historyRecordData" :key="index">
                        <div class="list-tit">
                            <h3 class="recordTitle" v-if="item.objectVo.strObj === ''">{{item.tradeType | numShowFilter}}</h3>
                            <span v-if="item.objectVo.strObj !== ''">{{item.tradeType | numShowFilter}}-{{item.objectVo.strObj}}</span>
                            <span class="item-note item-time">{{ item.createDateTimeStr | contentFilter(10) }}</span>
                        </div>
                        <p>
                        <span> 交易额度：{{item.tradeLimit | moneyFilter}}</span>
                        -注单明细：{{item.bettingCode}}
                        </p>
                    </dd>
                </dl>

                <div class="yo-more magt10" id="yoMore" v-if="showMore">
                    <span class="moreline"></span><span>{{moreText}}</span><span class="moreline"></span>
                </div>

                <!-- 上拉加载，下拉刷新 -->
                <div slot="top" class="mint-loadmore-top">
                    <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">
                        <i class="yo-icon icon-load-top"></i>
                        <em>松开刷新....</em>
                    </span>
                    <mt-spinner color="#585252" :type="3" v-show="topStatus === 'loading'"></mt-spinner>
                </div>
                <div slot="bottom" class="mint-loadmore-bottom" style="display: block">
                    <mt-spinner color="#585252" :type="3" v-show="bottomStatus === 'loading'"></mt-spinner>
                </div>
            </mt-loadmore>

        </div>

        <!-- 无数据 -->
        <no-data-page v-if="noData"></no-data-page>

        <!-- 往来记录-漂浮详情页 -->
        <float-page :isfloatPage='isfloatPage' :floatPageType='floatPageType' :floatTitle='floatTitle' :historyDetail='historyDetail' :floatBgcolor='floatBgcolor'></float-page>
    </div>
</template>

<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import Loadmore from 'mint-ui/lib/loadmore' // 按需加载mint-ui的模块
  import Spinner from 'mint-ui/lib/spinner' // 按需加载mint-ui的模块
  import * as types from '../../store/transactionRecord/type'
  import noDataPage from '@/components/floatPage/noData' // 无数据
  import floatPage from '@/components/floatPage/publicDetails' // 浮动单页-详情
  Vue.component(Spinner.name, Spinner)
  Vue.component(Loadmore.name, Loadmore)
  export default {
    data () {
      return {
        topStatus: '', // 上滑状态
        bottomStatus: '', // 下滑状态
        allLoaded: false, // 下拉加载后重置滑动加载
        historyRecordData: [], // 往来记录列表
        historyDetail: {}, // 当前查看详情对应数据对象
        msg: '', // 返水冲销单独的msg
        pageNo: 1, // 分页
        pageSize: 20, // 显示条数
        moreText: '', // 更多文字
        noData: '', // 暂无数据显示
        floatTitle: '', // 浮动详情页标题
        floatBgcolor: 'bgcolor-main', // 浮动详情页背景色
        showMore: false // 是否显示更多和没有更多提示
      }
    },
    computed: {
      ...mapState({
        isfloatPage: state => state.h5Home.isfloatPage, // 显示浮动单页
        floatPageType: state => state.h5Home.floatPageType // 显示类型
      })
    },
    filters: {
      numShowFilter (v) { // 转换交易类型
        return window.common.const.tradeType[v]
      },
      contentFilter (content, len) {
        return content.substr(0, len)
      }
    },
    components: {
      noDataPage,
      floatPage
    },
    methods: {
      // 点击显示详情
      toCurrentRecordPage (data) {
        window.indexMain.gpoScrollTop()
        this.floatTitle = '往来记录详情'
        this.$store.state.h5Home.isfloatPage = true
        this.$store.state.h5Home.floatPageType = 3
        this.historyDetail = data
      },
      handleTopChange (status) {
        this.topStatus = status
      },
      handleBottomChange (status) {
        this.bottomStatus = status
      },
      loadTop () {
        // 加载更多数据
        this.pageNo = 1
        this.historyRecordData = []
        this.loadData(0)
        this.allLoaded = false // 下拉加载后重置滑动加载
      },
      loadBottom () {
        // 加载更多数据
        if (this.pageNo >= this.pageSize) {
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
      /**
       * @augments type 0:下拉刷新  1：上拉加载
       *
       */
      loadData (type) {
        let query = this.$route.query
        let param = {
          categoryId: query.categoryId,
          pageSize: this.pageSize,
          queryDate: query.queryDate,
          endTime: query.endTime,
          pageNo: this.pageNo
        }
        // window.__DEBUG = false

        this.$store.dispatch(types.CURRENT_RECORD_ACTION, param).then(res => {
          // 数据是否存在
          if (res.data !== undefined && res.data !== null) {
            if (res.data.result.length === 0) {
              this.allLoaded = true // 若数据已全部获取完毕
            }
            if (res.data.result.length >= 1) {
              this.noData = false
            } else {
              this.noData = true
            }
          } else {
            this.noData = true
            return
          }
          // 判断滑动状态，0下拉，1上滑
          if (Number(type) === 0) {
            this.historyRecordData = res.data.result
            this.$refs.loadmore.onTopLoaded()
          } else if (Number(type) === 1) {
            this.historyRecordData = this.historyRecordData.concat(res.data.result)
            this.$refs.loadmore.onBottomLoaded()
          } else {
            this.historyRecordData = this.historyRecordData.concat(res.data.result)
          }

          // 计算是否有一页以上的内容
          let total = res.data.totalPageCount
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
          } else {
            this.showMore = true
            this.moreText = '更多'
            this.$nextTick(() => {
              window.$('#yoMore').removeClass('gray-more')
            })
            this.isload = true
          }
        })
      }
    },
    mounted () {
      this.$store.state.h5Home.headerType = 4
      this.$store.state.h5Home.headTitle = '往来记录'
      this.$store.state.h5Home.headLeft = 'icon-back'
      this.$store.state.h5Home.headRight = ''
      this.historyRecordData = []
      this.loadData()
    }
  }
</script>


