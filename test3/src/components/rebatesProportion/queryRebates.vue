<template>
  <div class="mainBox">
    <div class="list-part">
      <dl class="public-list clearfix">
        <!--添加下级代理新增-->
        <dd class="common-item">
          <h5 class="title">开始时间</h5>
          <div class="con-txt subText">
            <div class="date-time-box" @click="showTimeTabFn(1,'date')">
              <input type="text" v-model="pickDateStartVal" class="input-day" readonly/>
              <i class="zz-icon-down"></i>
            </div>
          </div>
        </dd>
        <dd class="common-item">
          <h5 class="title">结束时间</h5>
          <div class="con-txt subText">
            <div class="date-time-box" @click="showTimeTabFn(2,'date')">
              <input type="text" v-model="pickDateEndVal" class="input-day" readonly/>
              <i class="zz-icon-down"></i>
            </div>
          </div>
        </dd>
        <dd class="common-item">
          <h5 class="title">返水事件</h5>
          <p>
            <select class="yo-select" v-model="memberType" @change="getSelectDatas">
              <option :value="val.id" v-for="(val,index) in selectAllList" :key="index">{{ val.eventName }}</option>
            </select>
          </p>
        </dd>
        <!--end-->
      </dl>
    </div>
    <div class="btn-box btn-block text-center">
      <a href="javascript:void(0)" class="btn btn-lg btn-primary" @click="makeSureSubmit()">确定</a>
    </div>
    <mt-datetime-picker type="date" ref='date' :startDate='minDate' :endDate='maxDate' year-format="{value}年" month-format="{value}月" date-format="{value}日" @confirm="handleChangeDate">
    </mt-datetime-picker>

  </div>
</template>
<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import {
    DatetimePicker
  } from 'mint-ui'
  import Picker from '@/components/common/picker.vue'
  import * as types from '@/store/rebate/type'
  import * as statusCode from '@/utils/status_const'
  Vue.component(DatetimePicker.name, DatetimePicker)
  export default {
    name: 'queryCashStream',
    data () {
      return {
        // 返水事件选择
        isShowTab: false,
        title: '',
        selectMap: {},
        // picker组件相关
        slots: [],
        allList: [{
          eventName: '全部',
          id: 0
        }],
        slotsList: [],
        selectAllList: [],
        selectedlist: [],
        memberType: '',
        isSHowTabBar: false,
        // 日期相关
        channel: '',
        agentAccount: ''
      }
    },
    computed: {
      ...mapState({
        pickDateStartVal: state => state.rebate.startDate, // 开始时间值
        pickDateEndVal: state => state.rebate.endDate // 结束时间值
      }),
      minDate () { // 时间插件最小值
        let s = this.$store.state.rebate.minDate
        s = s.replace(/-/g, '/')
        let date = new Date(s)
        return date
      },
      maxDate () { // 时间插件最大值
        let s = this.$store.state.rebate.maxDate
        s = s.replace(/-/g, '/')
        let date = new Date(s)
        return date
      }
    },
    mounted () {
      this.$store.state.home.headerType = 5
      this.$store.state.home.headTitle = '代理返水查询'
      window.$('html').removeClass('fixPage')
      window.$('html').removeClass('pickBug')
      this.queryRabateInit()
    },
    methods: {
      // 初始化数据
      queryRabateInit () {
        let param = {
          'pageGroupId': 1,
          'loading': 'pass'
        }
        this.$store.dispatch(types.QUERYREBATELINIT_ACTION, param).then(res => {
          if (res.code === statusCode.statusConst.SUCCESS) {
            this.agentAccount = res.data.agentAccount
            this.getEventByTime()
          }
        })
      },
      // 获取返水事件列表
      getEventByTime () {
        let _selectedlist = {}
        try { _selectedlist = JSON.parse(sessionStorage.getItem('selectedlist')) } catch (e) { }
        let $this = this
        let param = {
          'startTime': this.pickDateStartVal,
          'endTime': this.pickDateEndVal,
          'loading': 'pass'
        }
        this.$store.dispatch(types.QUERYREBATEBYTIME_ACTION, param).then(res => {
          if (res.code === statusCode.statusConst.SUCCESS) {
            this.slotsList = res.data
            this.selectAllList = this.allList.concat(this.slotsList)
            this.selectAllList.forEach((val) => {
              $this.selectMap[val.id] = val
            })
            // 如果本地数据 和ajax 数据 == 直接使用
            if (_selectedlist && $this.selectMap[_selectedlist.id] && $this.selectMap[_selectedlist.id].eventName) {
              $this.memberType = _selectedlist.id
            } else {
              $this.memberType = 0
            }
          }
        })
      },
      // 选择日期后返回日期
      handleChangeDate (e) {
        if (this.channel === 1) {
          this.$store.state.rebate.startDate = this.formatDate(e)
        }
        if (this.channel === 2) {
          this.$store.state.rebate.endDate = this.formatDate(e)
        }
        this.getEventByTime()
        setTimeout(() => {
          window.$('html').removeClass('fixPage')
        }, 0)
      },
      // 点击确认按钮开始搜索
      makeSureSubmit () {
        if (this.pickDateStartVal > this.pickDateEndVal) {
          window.layer.msgWarn('开始时间必须小于等于结束时间')
          return
        }
        let param = {
          'page': 1,
          'limit': 20,
          'eventId': this.selectedlist.id || 0,
          'agentLevel': 0,
          'agentAccount': this.agentAccount,
          'startTime': this.pickDateStartVal,
          'endTime': this.pickDateEndVal
        }
        sessionStorage.setItem('rebateParam', JSON.stringify(param))
        this.$store.dispatch(types.QUERYREBATE_ACTION, param).then(res => {
          if (res.code === statusCode.statusConst.SUCCESS) {
            console.log(res)
            this.$router.push('/m/rebatesProportion')
          }
        })
      },
      // 点击显示选择的tab
      showTabFn () {
        this.isShowTab = true
        this.title = '返水事件'
        this.slots = [{
          values: this.selectAllList,
          textAlign: 'center'
        }]
      },
      // 获取选择的数据
      getSelectDatas () {
        this.selectedlist = this.selectMap[this.memberType]
        sessionStorage.setItem('selectedlist', JSON.stringify(this.selectedlist))
      },
      showTimeTabFn (channel) {
        this.channel = channel
        this.$refs['date'].open()
        window.$('html').addClass('fixPage')
        window.indexMain.pointerEvents(window.$('html'))
      },
      // 格式化获取的时间
      formatDate (date) {
        const y = date.getFullYear()
        let m = date.getMonth() + 1
        m = m < 10 ? '0' + m : m
        let d = date.getDate()
        d = d < 10 ? '0' + d : d
        return y + '-' + m + '-' + d
      }
    },
    components: {
      Picker
    }
  }
</script>
