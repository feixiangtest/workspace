<template>
    <div class="con-txt select-item" id="div_date1">
        <span id="date1" @click="openTimeBox" ></span>
        <i class="yo-icon icon-pull"></i>
    </div>
</template>

<script>
import * as types from '../store/transactionRecord/type'
let statusCode = window.common.statusConst
export default {
  // 父组件传入的开始，结束时间，获取选择的时间，可选最早时间，可选最晚时间
  props: ['start', 'end', 'getSelectTime', 'disabledTomorrow', 'enabledToday'],
  data () {
    return {
      dateRange: '',
      minStartDate: this.getAreaTime('lastMonthFirstDay'), // 最早可选日期为上月第一天
      maxEndDate: this.getAreaTime('today', -8), // 最后可选日期为北京时区的今天
      disabledDay: '', // 默认要禁用的日期
      enabledDay: ''// 要开启的日期
    }
  },
  mounted () {
    this.initData()// 初始化日期
  },
  methods: {
    initData () {
      this.$store.dispatch(types.SWITCH_DATE_TYPE_ACTION, {
        'platform': 'ag',
        'dateType': 'today'
      }).then(res => {
        if (res.status === statusCode.SUCCESS) {
          var offsetGMT = new Date().getTimezoneOffset() // 本地时间和格林威治的时间差，单位为分钟
          // this.maxEndDate = new Date(new Date(res.data.tomorrow).getTime() + 12 * 60 * 60 * 1000).getTime()
          this.maxEndDate = new Date(new Date(res.data.tomorrow).getTime() + offsetGMT * 60 * 1000).getTime()
          this.initTime(res.data.startDate, res.data.endDate)
          this.disabledDay = res.data.tomorrow
          this.enabledDay = res.data.today
        }
      })
    },
    getAreaTime: function (t, tz = -8) {
      var timezone = tz // 默认时区时间，北京时区
      var offsetGMT = new Date().getTimezoneOffset() // 本地时间和格林威治的时间差，单位为分钟
      var nowDate = new Date().getTime() // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
      var now = new Date(nowDate + offsetGMT * 60 * 1000 - timezone * 60 * 60 * 1000) // 设置为美东时间
      var lastMonthFirstDay = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      return t === 'lastMonthFirstDay' ? lastMonthFirstDay : now.getTime()
    },
    initTime (start, end) {
      window.PickerDateRange = window.pickerDateRange
      this.dateRange = new window.PickerDateRange('date1', {
        stopToday: false, // 是否禁用之前的日期
        success: this.handleTime, // 点击确定的时候的回调
        isTodayValid: true,
        startDate: this.start || start, // 开始日期
        endDate: this.end || end, // 结束日期
        minStartDate: this.minStartDate, // 最早可选日期，不传就是没有限制
        maxEndDate: this.maxEndDate, // 最晚可选日期，不传就是没有限制
        needCompare: false,
        defaultText: ' 至 ',
        autoSubmit: false,
        inputTrigger: 'input_trigger1',
        theme: 'ta'
      })
    },
    // 手动设定时间
    setNewTime (start, end) {
      if (typeof this.dateRange.setNewDate === 'function') {
        this.dateRange.setNewDate(start, end)
      }
    },
    enableDate (tomorrow, today) {
      if (typeof this.dateRange.enableDate === 'function') {
        this.dateRange.enableDate(tomorrow, today)
      }
    },
    // 点击确定的时候，获取选中的时间，并传给父组件
    handleTime (param) {
      this.getSelectTime(param.startDate, param.endDate)
    },
    openTimeBox () {
      setTimeout(() => {
        window.$('.ta_calendar').css({'left': '0', 'top': '0', 'bottom': '0', 'width': '100%'})
        let disabledDay = this.disabledTomorrow || this.disabledDay// 如果父组件有传明天的日期，就用父组件的，如果没传就用默认的
        let enabledDay = this.enabledToday || this.enabledDay// 如果父组件有传明天的日期，就用父组件的，如果没传就用默认的
        console.log(this.disabledTomorrow, 'this.disabledTomorrow', this.disabledDay)
        if (disabledDay) {
          this.enableDate(disabledDay, enabledDay)
        }
      }, 10)
    }
  }
}
</script>

