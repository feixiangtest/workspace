<template>
<div>
  <table class="yoMemTable2">
      <thead>
          <tr>
              <th>日期</th>
              <th>有效投注</th>
              <th>投注详情</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="(item,index) in efficacbetting" :key="index">
              <td>{{efficacbetList[item.betDay]}}</td>
              <td>{{efficacbetList[item.betAmount]}}</td>
              <td>
                <a href="javascript:;" @click="dialogPlatform(efficacbetList[item.betMap])">{{betButTxt}}</a>
              </td>
          </tr>
      </tbody>
  </table>
  <!-- 有效投注额==查看详情 -->
  <el-dialog title="有效投注额" :visible.sync="dialogVisible" center width="600px">
      <div class="efficacbetCon">
          <table class="yoMemTable2 ">
              <tbody >
                  <tr v-for="(item,key,index) in platformForDetails" :key="index">
                      <th width="50%">{{key}}</th>
                      <td>{{item |moneyFilter}}</td>
                  </tr>
              </tbody>
          </table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
  </el-dialog>

  </div>
</template>

<script>
  import { mapState } from 'vuex'
  // import * as memberTypes from '@m/store/member/type'
  export default {
    data () {
      return {
        dialogVisible: false,
        yesterdayMap: [], // 昨天第三方投注额详情
        weekMap: [], // 本周第三方投注额详情
        monthMap: [], // 本月第三方投注额详情
        platformForDetails: {},
        betButTxt: false,
        efficacbetting: [{
          betDay: 'yesterDateSummary',
          betAmount: 'yesterSummary',
          betMap: 'yesterdayMap'
        },
        {
          betDay: 'weekDateSummary',
          betAmount: 'weekSummary',
          betMap: 'weekMap'
        },
        {
          betDay: 'monthDateSummary',
          betAmount: 'monthSummary',
          betMap: 'monthMap'
        }]
      }
    },
    computed: {
      ...mapState({
        efficacbetList: state => state.member.efficacbetList // 获取有效投注额记录
      })
    },
    created () {
      this.getEfficacbet()
    },
    methods: {
      // 存放查看第三方投注的时间
      dialogPlatform (details) {
        this.dialogVisible = true
        this.platformForDetails = details
      },
      getEfficacbet () {
        if (this.$store.state.member.efficacbetList !== null) {
          this.betButTxt = '查看'
        }
      }
    },
    filters: {
      moneyFilter (money) { // 格式化金额格式
        if (money !== null && money !== undefined && !isNaN(money)) return Number(money).toFixed(2)
        else return 0
      }
    }
}
</script>
