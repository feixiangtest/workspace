<template>
      <div class="tableForm clearfix">

          <el-form :inline="true" :model="formInline" class="demo-form-inline floatLf">
            <!-- 交易类型 -->
            <label class="el-form-item__label">交易类别：</label>
            <div class="platformSelet">
                <el-select v-model="formInline.flag" size="small">
                    <el-option v-for="(item,index) in transactionType"
                        :key="index"
                        :label="item.title"
                        :value="item.option" >
                    </el-option>
                </el-select>
            </div>

            <!-- 选择查询日期 -->
            <el-form-item label="日期：">
              <el-date-picker v-model="dateTime" size="small" :picker-options="maxDateTime"
                    type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期"
                    :default-time="['00:00:00']" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="getHistoryRecordAction" :disabled="!(dateTime && dateTime.length === 2)">搜索</el-button>
            </el-form-item>

          </el-form>
      </div>
</template>

<script>
import { mapState } from 'vuex'
import { transactionType } from '@m/config/tradeRecord'
import * as tradeRecordTypes from '@m/store/tradeRecord/type'
export default {
  data () {
    return {
      transactionType: transactionType, // 交易类型
      // 时间选择，默认选择今天
      dateTime: [window.common.getAreaDate('lastDay', 0), window.common.getAreaDate('lastDay', 0)],
      // 最大时间选择，限制上月，本月
      maxDateTime: {
        disabledDate (time) {
          var timezone = 4 // 目标时区时间，美东时区
          var offsetGMT = new Date().getTimezoneOffset() // 本地时间和格林威治的时间差，单位为分钟
          var nowDate = new Date().getTime() // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
          var now = new Date(nowDate + offsetGMT * 60 * 1000 - timezone * 60 * 60 * 1000)// 设置为美东时间
          let lastMonths = new Date(now.getFullYear(), now.getMonth() + -1, 1) // 取上个月的整月
          return time.getTime() > Date.now() || time.getTime() < lastMonths
        }
      },
      formInline: {
        flag: '',
        selDate: '0'
      },
      params: {} // 查询参数
    }
  },
  created () {
    // 重置数据
    this.$store.commit(tradeRecordTypes.RESETDATA_MUTATION)
  },
  computed: {
    ...mapState({
      // 获取当前页数
      pageNo: state => state.tradeRecord.pageNo,
      // 获取当前每页显示条数
      pageSize: state => state.tradeRecord.pageSize
    })
  },
  mounted () {
    // 刚进入页面时查询制定平台数据
    this.getHistoryRecordAction()
  },
  methods: {
    // 查询数据接口
    getHistoryRecordAction () {
      this.params = {
        pageNo: this.pageNo, // 分页
        pageSize: this.pageSize, // 分页条数
        categoryId: this.formInline.flag, // 查询类别
        queryDate: this.dateTime[0], // 开始时间
        endTime: this.dateTime[1] // 结束时间
      }
      this.$store.dispatch(tradeRecordTypes.CURRENTRECORD_ACTION, this.params).then().catch(e => {
        // 打印一下错误
        console.log(e)
      })
    }
  },
  // 监听点击页数和显示页数
  watch: {
    pageNo: {
      handler: function (val) {
        this.getHistoryRecordAction()
      },
      deep: true
    },
    pageSize: {
      handler: function (val) {
        this.getHistoryRecordAction()
      },
      deep: true
    }
  }
}
</script>
