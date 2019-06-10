<template>
    <div class="member-selection yo-cell-box yo-cell-row4">

        <div class="cell-box cell-title">
          <div>{{Number($route.query.typeName)===2?'代理':'会员'}}</div>
          <div>注单量</div>
          <div>有效投注额</div>
          <div>盈亏</div>
        </div>

        <div class="member-selection-list" v-if='reportData.length>0'>
            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false"
                ref="loadmore" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange">

                <div class="cell-box cell-item" v-for='(item,index) in reportData' :key='index'>
                    <div>{{item.account}}</div>
                    <div>{{item.bettingNum}}</div>
                    <div>{{item.realBettingAmount.toFixed(2)}}</div>
                    <div :class='item.profitLoss>=0 ? "":"warn-txt"'>{{item.profitLoss.toFixed(2)}}</div>
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
        <no-data v-else></no-data>
    </div>
</template>

<script>
    import * as types from '@/store/reportForms/type'
    import * as statusCode from '../../utils/status_const'
    import Vue from 'vue'
    import {
      Radio,
      Loadmore,
      MessageBox
    } from 'mint-ui'
    import Spinner from 'mint-ui/lib/spinner' // 按需加载mint-ui的模块
    import noData from '@/components/noData.vue'
    Vue.component(Spinner.name, Spinner)
    Vue.component(Loadmore.name, Loadmore)
    Vue.component(Radio.name, Radio) // 暂无数据
    export default {
      data () {
        return {
          reportData: [],
          allLoaded: false,
          topStatus: '', // 顶部状态
          bottomStatus: '', // 底部状态
          pageNo: 1,
          pageSize: 20,
          isload: true // 是否还有下一页
        }
      },
      components: {
        MessageBox,
        noData
      },
      methods: {
        initData (type) {
          let query = this.$route.query
          query.page = this.pageNo
          // 向下拉不需要拼命加载中
          if (this.pageNo > 1) {
            query.loading = 'pass'
          } else {
            query.loading = ''
          }
          this.$store.dispatch(types.REPORTSLISTAGENT, query).then(res => {
            if (res.code === statusCode.statusConst.SUCCESS) {
              if (res.data.length === 0) {
                this.allLoaded = true // 若数据已全部获取完毕
                this.$refs.loadmore.onTopLoaded()
                this.$refs.loadmore.onBottomLoaded()
                return // 归零 key
              }
              this.pageNo++
              this.reportData = this.reportData.concat(res.data)
            }
            if (Number(type) === 0) {
              this.reportData = res.data || []
              this.$refs.loadmore.onTopLoaded()
            } else if (Number(type) === 1) {
              this.$refs.loadmore.onBottomLoaded()
            }
          })
        },
        loadTop () {
          // 上拉刷新
          this.memberData = []
          this.pageNo = 1
          this.initData(0)
          this.isload = true
          this.allLoaded = false // 下拉加载后重置滑动加载
          this.$refs.loadmore.onTopLoaded()
        },
        loadBottom () {
          console.log('shangla')
          // 加载更多数据
          if (this.pageNo >= 21) {
            window.layer.msgWarn('您查询的数据过多，请使用查询条件进行搜索')
            this.$refs.loadmore.onBottomLoaded() // 刷新节点
            return
          }
          console.log(this.isload, 'isload')
          if (this.isload) {
            this.initData(1)
            return
          }
          this.$refs.loadmore.onBottomLoaded() // 刷新节点
        },
        handleTopChange (status) {
          this.topStatus = status
        },
        handleBottomChange (status) {
          this.bottomStatus = status
        }
      },
      mounted () {
        this.$store.state.home.headerType = 6
        let query = this.$route.query
        this.$store.state.home.headTitle = query.platformGameCode.split('SX')[0] + '视讯总投注'
        this.initData()
      }
    }
</script>
