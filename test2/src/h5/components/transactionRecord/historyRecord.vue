<template>
  <div class="more-list-box">
 
      <!-- 交易记录的两个tab header -->
      <transactionRecordHeader></transactionRecordHeader>

      <div class="">
          <div class="yo-form-item" @click="showTabFn()">
            <h5 class="title">交易类型</h5>
            <p class="con-txt select-item">
              <span >{{typeTitle}}</span>
              <i class="yo-icon icon-pull"></i>
            </p>
          </div>
          <div class="yo-form-item">
            <h5 class="title">时间选择</h5>
            <time-date :start='starTime' :end='endTime' :getSelectTime='getSelectTime' ref="timeRef" :minStartDate='minStartDate' :maxEndDate='maxEndDate'></time-date>
          </div>
      </div>

      <div class="public-footer common-footer">
          <div class="but-footer yow-content">
              <a href="javascript:void(0);" disabled="disabled" class="btn btn-primary btn-lg btn-block" @click="queryDetail()">查询</a>
          </div>
      </div>

      <!-- 会员类型选择 -->
      <div class="TipsWindown" attr-div="conversionModeList" v-show="showSelectType">
        <div class="shadeIn">
          <div class="selBankBox time">
            <h1>
              <a href="javascript:;" @click="selectTypeModel()" class="left">取消</a>
              交易类型
            </h1>
            <dl class="modelContent">
              <dt v-for="(item, index) in typeList" :key="index">
                <label class="mint-checklist-label" style="padding-left:0">
                  <span class="mint-checkbox">
                    {{item.title}}
                    <input type="checkbox" name="typeListName" class="mint-checkbox-input" :checked="selectTypeVal === item.val"
                            @click='checkedOne(item)' />
                    <span class="mint-checkbox-core"></span>
                  </span>
                </label>
              </dt>
            </dl>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
  import transactionRecordHeader from './transactionRecordHeader'
  import timeDate from '@/components/timeDate'
  import * as types from '../../store/transactionRecord/type'
  let statusCode = window.common.statusConst
  export default {
    data () {
      return {
        typeTitle: '全部', // 交易类型-默认显示
        selectTypeVal: '', // 当前选择类型的值
        showSelectType: false, // 会员类型选择显示与否
        pickTime: [], // 时间插件-取值
        typeList: [
          { // 会员类型列表
            title: '全部',
            val: '',
            id: '0'
          }, { // 会员类型列表
            title: '入款',
            val: 'Trade_Type_MNYCOM',
            id: '1'
          }, {
            title: '出款',
            val: 'Trade_Type_MNYDRAW',
            id: '2'
          }, {
            title: '人工存入',
            val: 'Trade_Type_DEPOSIT',
            id: '3'
          }, {
            title: '额度转换',
            val: 'Trade_Type_MONEYCONVERSION',
            id: '4'
          }],
        typeListIds: [],
        // 初始化全选按钮, 默认不选
        isCheckedAll: true,
        minStartDate: this.getAreaTime('lastMonthFirstDay'), // 最早可选日期为上月第一天
        maxEndDate: this.getAreaTime(), // 最后可选日期为今天
        starTime: '', // 当前选择的开始时间
        endTime: '' // 当前选择的结束时间
      }
    },
    components: {
      transactionRecordHeader,
      timeDate
    },

    methods: {
      initData () {
        this.$store.dispatch(types.SWITCH_DATE_TYPE_ACTION, {
          'platform': 'ag',
          'dateType': 'today'
        }).then(res => {
          if (res.status === statusCode.SUCCESS) {
            this.starTime = res.data.startDate
            this.endTime = res.data.endDate
          }
        })
      },
      getSelectTime (start, end) {
        this.starTime = start
        this.endTime = end
        this.saveData()
      },
      // 获取区间日期，第一个参数为月份的第一天，还是最后一天（firstDay,lastDay)，第二个参数是传入的月份为当前月份所要减去的数字,传0就是当月，传-1就是上月
      getAreaTime: function (t) {
        var timezone = 4 // 目标时区时间，美东时区
        var offsetGMT = new Date().getTimezoneOffset() // 本地时间和格林威治的时间差，单位为分钟
        var nowDate = new Date().getTime() // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
        var now = new Date(nowDate + offsetGMT * 60 * 1000 - timezone * 60 * 60 * 1000)// 设置为美东时间
        var lastMonthFirstDay = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        return t === 'lastMonthFirstDay' ? lastMonthFirstDay : now.getTime()
        // return monthFirstDay.getTime()
      },
      // 打开交易类型
      showTabFn () {
        this.showSelectType = true
        if (this.typeTitle === '全部') {
          this.typeListIds = []
          this.typeList.forEach(function (typeList) {
            this.typeListIds.push(typeList.id)
          }, this)
          this.typeTitle = '全部'
        }
      },
      // 选择需要查询的交易类型
      selectTypeModel () {
        this.showSelectType = false
      },
      // 获取当前选择的交易类型
      checkedOne (item) {
        this.isCheckedAll = false
        this.typeListIds = []
        this.typeListIds = item.id
        this.typeTitle = item.title
        this.selectTypeVal = item.val
        this.showSelectType = false
        this.saveData()
      },
      // 选择全部类型
      checkedAll () {
        this.typeListIds = []
        this.typeList.forEach(function (typeList) {
          this.typeListIds.push(typeList.id)
        }, this)
        this.typeTitle = '全部'
        this.showSelectType = false
      },
      // 保存筛选条件
      saveData () {
        this.$store.state.transactionRecord.saveHistoryData.selectTypeVal = this.selectTypeVal
        this.$store.state.transactionRecord.saveHistoryData.typeTitle = this.typeTitle
        this.$store.state.transactionRecord.saveHistoryData.starTime = this.starTime
        this.$store.state.transactionRecord.saveHistoryData.endTime = this.endTime
      },
      // 跳转查询页
      queryDetail () {
        this.$router.push({
          path: '/wap/correspondence',
          query: {
            'categoryId': this.selectTypeVal,
            'queryDate': this.starTime,
            'endTime': this.endTime
          }
        })
      }
    },
    destroyed () {
      this.$store.state.h5Home.headerType = 4
    },
    mounted () {
      this.$store.state.h5Home.headerType = 5
      this.$store.state.h5Home.headTitle = '往来记录'
      this.$store.state.h5Home.headLeft = 'icon-back'
      this.$store.state.h5Home.headRight = ''
      this.$store.state.transactionRecord.openRecordBox = 1
      if (this.$store.state.transactionRecord.saveHistoryData.starTime) {
        this.selectTypeVal = this.$store.state.transactionRecord.saveHistoryData.selectTypeVal
        this.typeTitle = this.$store.state.transactionRecord.saveHistoryData.typeTitle
        this.starTime = this.$store.state.transactionRecord.saveHistoryData.starTime
        this.endTime = this.$store.state.transactionRecord.saveHistoryData.endTime
        this.$refs.timeRef.setNewTime(this.starTime, this.endTime)
      } else {
        this.initData()
      }
    }
  }
</script>


