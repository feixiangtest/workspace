<template>
  <div class="mainBox yow">
    <data-charts :reportData='reportData' :reportRes='reportRes' :toPlatFormDetail='toPlatFormDetail' :toBetDetail='toBetDetail'></data-charts>
  </div>
</template>

<script>
  import Vue from 'vue'
  import * as types from '@/store/reportForms/type'
  import VeRing from 'v-charts/lib/ring.common'
  import Picker from '@/components/common/picker.vue'
  import dataCharts from '@/components/home/reportComponent.vue'
  import {
    mapState
  } from 'vuex'
  Vue.component(VeRing.name, VeRing)
  export default {
    name: 'multiPlatform',
    data () {
      return {
        reportRes: {}, // 所有数据
        reportData: [], // 列表数据
        totalBetting: 0, // 总投注额
        totalProfitLoss: 0, // 总盈亏
        iconList: [], // 平台图标列表
        pageText: '', // 显示是否有数据字段
        quickTypeCode: {
          '今日': 0,
          '昨日': 1,
          '本周': 2,
          '上周': 3,
          '本月': 4,
          '上月': 5
        }
      }
    },
    computed: {
      ...mapState({
        date: state => state.reportForms.date, // 快选时间
        isClick: state => state.reportForms.isClick // 判断是否是切换日期引起的日期变化
      })
    },
    created () {
      this.initData()
    },
    watch: {
      // 如果更改日期，那么重新请求数据
      date (v) {
        if (!this.isClick) return // 由于刷新页面的时候也会触发date变化，所以用这个属性来判断点击切换日期变化的情况
        let query = this.$route.query
        query['quickType'] = this.quickTypeCode[this.date]// 将文字转化为要传的数字编号
        this.pageText = ''
        this.$store.dispatch(types.REPORTSLISTAGENT, query).then(res => {
          this.reportRes = res || {}
          this.reportData = res.data || []
        }).catch(rej => {
          this.reportRes = rej || {}
          this.reportData = rej.data || []
          this.pageText = '暂无数据'
        })
      }
    },
    beforeRouteEnter (to, from, next) {
      // 如果是从报表详情，平台详情跳转进来的话那么保留sessionStorage,否则删除
      if (from.name === 'betDetails' || from.name === 'platformDetails') {
  
      } else {
        sessionStorage.removeItem('quickType')
      }
      next()
    },
    methods: {
      // 初始化查询的数据
      initData () {
        this.$store.state.home.headerType = 3 // 设置头部
        let query = this.$route.query
        // 如果路由参数为空那么提示跳转到查询页
        if (JSON.stringify(query) === '{}') {
          window.layer.msgWarn('请输入查询参数', () => {
            this.$router.push('/m/reportSearch')
          })
          return
        }
        let quickDateList = ['今日', '昨日', '本周', '上周', '本月', '上月']
        // 如果本地有存有快选数据，那么就用本地存储的值
        if (sessionStorage.getItem('quickType')) {
          query.quickType = sessionStorage.getItem('quickType')
        }
        this.$store.state.reportForms.date = query.quickType ? quickDateList[query.quickType] : '今日' // 设置传入的日期
        // 请求报表数据
        this.$store.dispatch(types.REPORTSLISTAGENT, query).then(res => {
          this.reportRes = res || {}
          this.reportData = res.data || []
          console.log('数据走完了，没问题')
        }).catch(rej => {
          this.reportRes = rej || {}
          this.reportData = rej.data || []
          this.pageText = '暂无数据'
        })
      },
      // 跳转到平台详情页面
      toPlatFormDetail (item) {
        let query = this.$route.query
        query.quickType = this.quickTypeCode[this.date]
        sessionStorage.setItem('quickType', query['quickType'])
        sessionStorage.setItem('platFormReportQuery', JSON.stringify(query))
        query.platformGameCode = item.platformGameCode
        query.sumDataSource = item.sumDataSource
        sessionStorage.setItem('platformDetails', JSON.stringify(item))
        console.log('跳转到详情')
        this.$router.push({
          path: '/m/platformDetails',
          query: query })
      },
      // 进入详情页面
      toBetDetail (item) {
        let query = this.$route.query
        query.quickType = this.quickTypeCode[this.date]
        sessionStorage.setItem('quickType', query['quickType'])// 跳转的时候记录当前选中的日期，因为在返回的时候需要显示当前时间，而不是url传入的
        sessionStorage.setItem('platFormReportQuery', JSON.stringify(query))
        query.platformGameCode = item.platformGameCode
        query.sumDataSource = item.sumDataSource
        console.log('跳转到总记录')
        if (Number(this.$route.query.typeName) === 1) {
          query.nextQueryPage = 5
          this.$router.push({
            path: '/m/userBetDetails',
            query: query
          })
        } else {
          query.nextQueryPage = 4
          this.$router.push({
            path: '/m/betDetails',
            query: query
          })
        }
      }
    },
    components: {
      Picker,
      dataCharts
    }
  }
</script>

