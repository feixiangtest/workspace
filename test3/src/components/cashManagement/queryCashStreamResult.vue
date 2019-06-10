<template>
  <div class="cash-list-box">

      <!-- 表头 -->
      <div v-if="data === true" class="child-title cash-title">
        <div>账号</div>
        <div>交易类型</div>
        <div>金额</div>
        <div>交易日期</div>
      </div>

      <!-- 内容列表 -->
      <div v-if="data === true" class="cash-list-content">
          <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"
                @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange">

              <div class="child-item" v-for="(item,key) in cashResultList" :key="key" @click="goToDetailPage(item)">
                <div>{{item.account}}</div>
                <div v-html="item.tradeTypeName" style="display: -webkit-box;"></div>
                <div>{{item.tradeLimit | moneyFilter}}</div>
                <div class="time">{{item.createDateTime}}</div>
              </div>

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

      <!-- 页面总计 -->
      <div v-if="data === true" class="child-item total-item">
        <div>总计</div>
        <div>{{totalTradeLimit | moneyFilter}}</div>
      </div>

      <no-data v-if="data === false"></no-data>

      <float-page :isfloatPage='isfloatPage' :floatPageType='floatPageType' :floatTitle='floatTitle' :cashDetail='cashDetail'></float-page>
  </div>

</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import { Loadmore } from 'mint-ui'
import Spinner from 'mint-ui/lib/spinner' // 按需加载mint-ui的模块
import * as types from '@/store/queryCashStream/type'
import * as statusCode from '@/utils/status_const'
import noData from '@/components/noData.vue' // 暂无数据
import floatPage from '@/components/floatPage/floatPage' // 详情
Vue.component(Spinner.name, Spinner)
Vue.component(Loadmore.name, Loadmore)
export default {
  name: 'queryCashStreamResult',
  data () {
    return {
      pageNo: 1, // 分页
      pageSize: 20, // 每页数
      totalTradeLimit: null, // 页面小计
      allLoaded: false, // 加载
      topStatus: '', // 上滑状态
      bottomStatus: '', // 下滑状态
      cashResultList: [], // 现金流查询列表
      data: true,
      isload: true, // 是否允许分页
      floatTitle: '', // 浮动单页标题
      cashDetail: {} //
    }
  },
  computed: {
    ...mapState({
      isfloatPage: state => state.user.isfloatPage, // 显示浮动单页
      floatPageType: state => state.user.floatPageType // 显示类型
    })
  },
  components: {
    noData,
    floatPage
  },
  methods: {
    // back () {
    //   this.$router.go(-1)// 返回上一层
    // },
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
      this.initData(0)
      this.allLoaded = false // 下拉加载后重置滑动加载
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      // 加载更多数据
      if (this.pageNo > this.pageSize) {
        window.layer.msgWarn('您查询的数据过多，请到电脑端查看')
        this.$refs.loadmore.onBottomLoaded() // 刷新节点
        return
      }
      if (this.isload) {
        this.initData(1)
      } else {
        this.$refs.loadmore.onBottomLoaded() // 刷新节点
      }
    },
    tradeTypeName (data = []) {
      if (!data.length) return []
      data.forEach((d) => {
        d.tradeType = d.tradeType * 1
        if (d.tradeType === 23 || d.tradeType === 31 || d.tradeType === 152) {
          d.tradeTypeName = d.tradeTypeName + '(<label style="color: purple;">' + d.priject2 + '</label>' + d.temp + '<label style="color:green;">' + d.priject3 + '</label>)'
        } else if (d.tradeType === 32 || d.tradeType === 36 || d.tradeType === 37 || d.tradeType === 28 || d.tradeType === 19 || d.tradeType === 155) {
          d.tradeTypeName = d.tradeTypeName + '(<label style="color:green;">' + d.priject2 + '</label>)'
        } else if (d.tradeType === 33 || d.tradeType === 147) {
          d.tradeTypeName = d.tradeTypeName + '(<label style="color:purple;">' + d.priject2 + '</label>' + d.temp + ')'
        } else if (d.tradeType === 48 || d.tradeType === 49) {
          d.tradeTypeName = d.tradeTypeName + d.lotteryName
        }
      })
      return data
    },
    initData (type) {
      // 请求数据接口
      let times = this.$route.query
      let tradeTypes = ''
      if (sessionStorage.tradeTypes !== undefined) {
        let listItem = Array(sessionStorage.tradeTypes)
        tradeTypes = listItem.join(',')
        if (tradeTypes[0] === ',') {
          tradeTypes = tradeTypes.slice(1)
        }
      }
      let param = {
        page: this.pageNo,
        'limit': this.pageSize,
        'tradeTypes': tradeTypes, // '31, 38, 34'
        'rate': times.rate, // 6:会员5：代理
        'startDate': times.startDate,
        'lastDate': times.lastDate,
        'accountName': times.accountName,
        'bettingCode': times.bettingCode,
        'loading': type >= 1 ? 'pass' : ''
      }
      this.$store.dispatch(types.QUERYCASHSTREAMLIST_ACTION, param).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          if (res.data.length === 0) {
            this.allLoaded = true // 若数据已全部获取完毕
          } else {
            this.pageNo++
          }
          /**
           * 会员余额存入的交易类型显示稽核是否 于 pc 版本保持一直
           * this.cashResultList 数据需要加工
           * @type {*|null}
           */

          res.data = this.tradeTypeName(res.data)
          this.totalTradeLimit = res.otherData.totalTradeLimit
          if (Number(type) === 0) {
            this.cashResultList = res.data
            this.$refs.loadmore.onTopLoaded()
          } else if (Number(type) === 1) {
            this.cashResultList = this.cashResultList.concat(res.data)
            this.$refs.loadmore.onBottomLoaded()
          } else {
            this.cashResultList = this.cashResultList.concat(res.data)
          }

          if (this.cashResultList !== undefined || this.cashResultList !== null) {
            if (this.cashResultList.length >= 1) {
              this.data = true
            } else {
              this.data = false
            }
          } else {
            this.data = false
          }
        }
      })
    },
    goToDetailPage (item) {
      this.floatTitle = '详情'
      this.$store.state.user.isfloatPage = true
      this.$store.state.user.floatPageType = 3
      this.cashDetail = item
    }
  },
  mounted () {
    this.$store.state.user.isfloatPage = false
    this.$store.state.home.headerType = 8
    this.$store.state.home.headTitle = '现金流查询'
    this.initData()
  }
}
</script>

<style>

</style>
