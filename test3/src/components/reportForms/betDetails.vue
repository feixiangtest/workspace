<template>
  <div class="mainBox">
    <div class="bet-amount" v-if='reportData.length>0'>
      <table class="yo-table table-bg">
        <thead>
          <tr>
            <th>类型</th>
            <th>注单量</th>
            <th>有效投注额</th>
            <th>盈亏</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for='(item,index) in reportData' :key='index'>
            <td>{{item.typeName==='1'?'直属会员':'下级代理'}}</td>
            <td><span>{{item.bettingNum}}</span></td>
            <td>
               <span v-if='$route.query.accountName || item.bettingAmount<=0' >{{item.realBettingAmount.toFixed(2)}}</span>
               <span class="link-txt" @click="toLink(item)" v-else>{{item.realBettingAmount.toFixed(2)}}</span>
              <!-- <span class="link-txt" @click="toLink(item)">{{item.bettingAmount}}</span> -->
            </td>
            <td><span :class='item.profitLoss>=0 ? "":"warn-txt"'>{{item.profitLoss.toFixed(2)}}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
    <no-data v-else></no-data>
  </div>
</template>

<script>
  import * as types from '@/store/reportForms/type'
  import noData from '@/components/noData.vue' // 暂无数据
  export default {
    data () {
      return {
        reportData: []
      }
    },
    methods: {
      toLink (item) {
        let query = this.$route.query
        query.sumDataSource = item.sumDataSource
        query.typeName = item.typeName
        if (item.typeName === '1') {
          query.nextQueryPage = 5
          this.$router.push({
            path: '/m/userBetDetails',
            query: query
          })
        } else {
          query.nextQueryPage = 3
          this.$router.push({
            path: '/m/userBetDetails',
            query: query
          })
        }
      }
    },
    components: {
      noData
    },
    mounted () {
      this.$store.state.home.headerType = 9
      let query = this.$route.query
      this.$store.state.home.headTitle = query.platformGameCode.split('SX')[0].toUpperCase() + '视讯总投注'
      this.$store.dispatch(types.REPORTSLISTAGENT, query).then(res => {
        this.reportData = res.data || []
        try {
        } catch (err) {
        }
      })
    }
  }
</script>

