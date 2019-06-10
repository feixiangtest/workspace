<template>
  <div class="tableForm clearfix">
    <game-type :getBettingRecordAction='getBettingRecordAction'></game-type>
    <el-form :inline="true" class="demo-form-inline floatLf">
      <el-form-item label="投注日期：">
        <el-date-picker v-model="dateTime" size="small" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00']" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getBettingRecordAction(1)" :disabled="!(platformKey && dateTime && dateTime.length === 2)">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import gameType from '@m/components/tradeRecord/betRecord/gameType'
  import * as tradeRecordTypes from '@m/store/tradeRecord/type'
  export default {
    components: {
      gameType
    },
    data () {
      return {
        dateTime: [window.common.getBeforeDate(0), window.common.getNowDate()], // 查询时间
        params: {}
      }
    },
    beforeCreate () {
      this.$store.state.tradeRecord.pageNo = 1 // 事先将页码设置为1
      this.$store.state.tradeRecord.pageSize = 10 // 事先将页码设置为1
    },
    created () {
      // 重置数据
      this.$store.commit(tradeRecordTypes.RESETDATA_MUTATION)
      this.$store.dispatch(tradeRecordTypes.GETPLATFORMLIST_ACTION).then(res => {
        if (res.data && res.data.length) {
          this.$store.dispatch(tradeRecordTypes.SWITCHDATETYPE, {'platform': this.platformKey, 'dateType': 'today'}).then(res => {
            if (res.data) {
              // 刚进入页面时查询制定平台数据
              this.getBettingRecordAction()
            }
          })
        } else {
          window.layer.msgWarn('暂未获取到游戏类型!', function () {})
        }
      }).catch(e => {
        window.layer.msgWarn('获取游戏类型失败!', function () {})
        console.log(e)
      })
    },
    computed: {
      ...mapState({
        // 获取当前页数
        pageNo: state => state.tradeRecord.pageNo,
        // 获取当前每页显示条数
        pageSize: state => state.tradeRecord.pageSize,
        // 选取日期
        dateTimeValue: state => state.tradeRecord.dateTime,
        // 获取选中的平台key
        platformKey: state => state.tradeRecord.platformKey
      })
    },
    methods: {
      // 获取指定平台注单记录
      getBettingRecordAction (page) {
        // OT-4477点击搜索，默认查询第一页，重置页码后，判断当前页和重置前是否相等，不相等不需要重新调用接口
        if (page) {
          if (this.pageNo !== page) {
            // 监听页码发生变化会调用查询接口
            this.$store.state.tradeRecord.pageNo = page
            return
          }
        }
        this.params = {
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          platform: this.platformKey,
          queryDate: this.dateTime[0],
          endTime: this.dateTime[1]
        }
        this.$store.dispatch(tradeRecordTypes.GETBETTINGRECORD_ACTION, this.params).then().catch(e => {
        // 打印一下错误
          console.log(e)
        })
      }
    },
    // 监听点击页数和显示页数 & 路由异动时重置数据
    watch: {
      pageNo: {
        handler: function (val) {
          console.log('pageNo=' + val)
          this.getBettingRecordAction()
        },
        deep: true
      },
      pageSize: {
        handler: function (val) {
          console.log('pageSize=' + val)
          this.getBettingRecordAction()
        },
        deep: true
      },
      dateTimeValue: {
        handler: function (val) {
          this.dateTime = val
        },
        deep: true
      }
    }
  }
</script>
