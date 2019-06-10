<template>
  <div class="mainBox">
    <!-- 用户资金模块 -->
    <div class="yow-content uesr-info">
      <div class="yow yow-relative info-box-one">
        <div class="circle"><i class="yo-icon icon-money"></i></div>
        <h4>我的返水</h4>
        <div class="sum">
          <span>可用返水</span>
          <p>{{userInfo.balance | moneyFilter}}</p>
        </div>
        <div class="sum">
          <span>昨日返水</span>
          <p>{{userInfo.yesterdayMoney | moneyFilter}}</p>
        </div>
      </div>
      <div class="yow yow-relative info-box-tow ">
        <div class="circle"><i class="yo-icon icon-day-add"></i></div>
        <h4>今日新增</h4>
        <div class="sum">
          <span>下级代理</span>
          <p>{{userInfo.agentNum}}</p>
        </div>
        <div class="sum">
          <span>直属会员</span>
          <p>{{userInfo.memberNum}}</p>
        </div>
      </div>
    </div>
    <!-- 数据图 -->
    <div class="yow-content inde-char">
      <h3 class="title-3"><i class="yo-icon icon-day-data"></i>&nbsp;今日数据</h3>
    </div>
    <data-charts :reportData='reportData' :reportRes='reportRes' :toPlatFormDetail='toPlatFormDetail'  :toBetDetail='toBetDetail'></data-charts>
  </div>
</template>

<script>
  import * as types from '../../store/home/type'
  import * as reportFormTypes from '@/store/reportForms/type'
  import * as statusCode from '../../utils/status_const'
  import dataCharts from '@/components/home/reportComponent.vue'
  export default {
    name: 'mainBox',
    props: {
      msg: String
    },
    data () {
      return {
        reportRes: {},
        reportData: [],
        pageText: '',
        param: {
          'pageGroupId': 1,
          'platformGameCode': '',
          'accountName': '',
          'typeName': 2,
          'quickType': 0,
          'nextQueryPage': 0,
          'caseType': '02',
          'dataType': 0,
          'page': 1,
          'limit': 20
        }
      }
    },
    components: {
      dataCharts
    },
    created () {
      this.initData()
    },
    mounted () {
      this.$store.dispatch(types.QUERYINDEX_ACTION).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {}
      })
      this.$store.state.home.headerType = 1
      delete localStorage['/m/account/agent/0']
      this.REPAIR()
    },
    methods: {
      REPAIR () {
        setTimeout(() => {
          this.$store.dispatch(types.REPAIR_ACTION, { 'loading': 'pass' }).then(res => {
            if (res.code === statusCode.statusConst.SUCCESS) {
              if (res.data && res.data.content) {
                window.layer.alert(res.data.content, () => {
                  this.NOTICE()
                }, res.data.announcementname, 'REPAIR')
                return ''
              }
              this.NOTICE()
            }
          })
        }, 100)
      },
      NOTICE () {
        // 依次弹出 维护公告 代理弹出公告
        setTimeout(() => {
          this.$store.dispatch(types.NOTICE_ACTION, { 'loading': 'pass' }).then(res => {
            if (res.code === statusCode.statusConst.SUCCESS) {
              // 弹出消息
              if (res.data.popupMessage && res.data.popupMessage.gbkContent) {
                window.layer.alert(res.data.popupMessage.gbkContent, () => {}, '公告', 'REPAIR')
                return ''
              }
            }
          })
        }, 200)
      },
      initData () {
        this.$store.dispatch(reportFormTypes.REPORTSLISTAGENT, this.param).then(res => {
          this.reportRes = res || {}
          this.reportData = res.data || []
        })
      },
      toPlatFormDetail (item) {
        sessionStorage.setItem('platFormReportQuery', JSON.stringify(this.param))
        this.param.nextQueryPage = 4
        this.param.platformGameCode = item.platformGameCode
        sessionStorage.setItem('platformDetails', JSON.stringify(item))
        console.log('跳转到详情')
        this.$router.push({
          path: '/m/platformDetails',
          query: this.param })
      },
      toBetDetail (item) {
        this.param.platformGameCode = item.platformChnName.replace('视讯', 'SX')
        this.param.nextQueryPage = 4
        console.log('跳转到总记录')
        this.$router.push({
          path: '/m/betDetails',
          query: this.param
        })
      }
    },
    computed: {
      userInfo () {
        return this.$store.state.home.userInfo
      }
    }
  }
</script>
