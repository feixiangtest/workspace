<template>
  <div class="mainBox queryCash">
      <dl class="public-list clearfix">
        <!--添加下级代理新增-->
        <dd class="common-item" @click="showTabFn()">
          <h5 class="title">类型</h5>
          <p class="con-txt">
            <span style="color:#000;">{{valDate}}</span>
            <i class="yo-icon icon-next"></i>
          </p>
        </dd>
        <!-- 时间选择 -->
        <dd class="common-item">
          <h5 class="title">开始时间</h5>
          <div class="con-txt subText">
              <div class="date-time-box" @click="showTimeTabFn(1,'date')">
                  <input type="text" v-model="startDate" class="input-day" readonly/>
                  <i class="zz-icon-down"></i>
              </div>
          </div>
        </dd>
        <dd class="common-item">
          <h5 class="title">结束时间</h5>
          <div class="con-txt subText">
            <div class="date-time-box" @click="showTimeTabFn(2,'date')">
                <input type="text" v-model="endDate" class="input-day" readonly/>
                <i class="zz-icon-down"></i>
            </div>
          </div>
        </dd>
        <!--end-->
        <dd class="common-item">
          <h5 class="title">账号查询</h5>
          <p class="con-txt">
            <input type="text" v-model="accountName" @input="assertVal('accountName')" class="input-type2" placeholder="请输入查询的账号">
          </p>
        </dd>
        <dd class="common-item">
          <h5 class="title">单号查询</h5>
          <p class="con-txt">
            <input type="text" v-model="bettingCode" @input="assertVal('bettingCode')" class="input-type2" placeholder="请输入单号">
          </p>
        </dd>
        <dd class="common-item" @click="queryTypeFn()">
          <h5 class="title">查询类别</h5>
          <p class="con-txt">
            <i class="yo-icon icon-next"></i>
          </p>
        </dd>
      </dl>
      <div class="btn-box btn-block text-center">
          <a @click="makeSureSubmit()" href="javascript:void(0)"  class="btn btn-lg btn-primary">确定</a>
      </div>

      <!-- 查询类别 -->
      <div class="query-type-tab" v-if='isSHowTabBar'>
        <div class="query-box">
          <div class="title">
            <div class="float-l select-all" @click="selectAll()">
                <div class="svg-box-check" v-if="isSelectAll">
                  <svgItems :showIsChecked='true'></svgItems>
                </div>
                <div class="svg-box-check" v-else>
                  <svgItems :noChecked='true'></svgItems>
                </div>
                全选
            </div>
            <div class="float-r">
              <span class="cancle" @click="cancleSelect">取消</span>
              <span class="sure" @click="sureSelect">确定</span>
            </div>
          </div>

          <!--会员查询条件-->
          <div v-if="memberRate === 6" class="select-item">
            <div class="item" v-for="(item,index) in memberTypeList"
              :key="'item_' + index" @click="selectQueryType(item.key, 1)"
              :class="{active:selectIndex === item.key}">
              {{item.title}}
            </div>
          </div>
          <div v-else class="select-item">
            <div class="item" v-for="(item,index) in agentTypeList"
              :key="'itemAgent_' + index" @click="selectQueryType(item.key, 1)"
              :class="{active:selectIndex === item.key}">
              {{item.title}}
            </div>
          </div>

          <!-- 入款 -->
          <div class="query-box-item">
            <!-- 全选按钮 -->
            <a class="mint-cell">
              <div class="mint-cell-wrapper">
                <div class="mint-cell-title">
                  <label class="mint-checklist-label">
                    <span class="mint-checkbox is-right">
                      <input type="checkbox" class="mint-checkbox-input"
                      :value="selectIndex" @change="chooseAll()"
                      :checked="checkedAll.indexOf(selectIndex) !== -1">
                      <span class="mint-checkbox-core"></span>
                    </span>
                    <span class="mint-checkbox-label">全选</span>
                  </label>
                </div>
              </div>
            </a>
            <!-- 类别-列表 -->
            <a class="mint-cell" v-for="(current,index) in this.currentList"
              :key="index">
              <div class="mint-cell-wrapper">
                <div class="mint-cell-title">
                  <label class="mint-checklist-label">
                    <span class="mint-checkbox is-right">
                      <input type="checkbox" class="mint-checkbox-input"
                       :value="current.value" @change="checkon(current.value)"
                       :checked="listItem.indexOf(current.value) !== -1">
                      <span class="mint-checkbox-core"></span>
                    </span>
                    <span class="mint-checkbox-label">{{current.label}}</span>
                  </label>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <!-- 年月日选择面板 -->
      <mt-datetime-picker type="date" ref='date' :startDate='minDate' :endDate='maxDate'
          year-format="{value}年" month-format="{value}月" date-format="{value}日" @confirm="handleChangeDate">
      </mt-datetime-picker>
      <!-- 时分选择面板 -->
      <!-- <mt-datetime-picker type="time" ref='time' hour-format="{value}时" minute-format="{value}分" @confirm="handleChangeTime">
      </mt-datetime-picker> -->

      <!-- 会员类型选择 -->
      <picker :isShowTab.sync='isShowTab' :slots='accountType' @getSelectData='selectAccountType' :title='picTitle'></picker>

  </div>
</template>
<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import { DatetimePicker, Checklist } from 'mint-ui'

import Picker from '@/components/common/picker.vue'
import svgItems from '@/components/common/svgItems.vue'
import * as types from '@/store/queryCashStream/type'
// 查询类别-固定数据
import tradeType from '@/utils/tradeType.js'

Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Checklist.name, Checklist)

export default {
  name: 'queryCashStream',
  data () {
    return {
      isShowTab: false, // 会员类型选择
      channel: '', // 1=开始时间，2=结束时间
      memberTypeList: [ // 会员的查询类别条件
        {
          title: '入款',
          key: 'comeInType'
        },
        {
          title: '出款',
          key: 'comeOutType'
        },
        {
          title: '人工存入',
          key: 'personDeposit'
        },
        {
          title: '额度转换',
          key: 'moneyConversionType'
        }
      ],
      agentTypeList: [ // 代理的查询类别条件
        {
          title: '收入',
          key: 'checkInList'
        },
        {
          title: '支出',
          key: 'checkOutList'
        }
      ],
      // pickTimeStartVal: '00:00', // time选择默认-最小
      // pickTimeEndVal: '23:59', // time选择默认-最大
      checkedAll: [], // 查询单类别-全选按钮
      oldCheckedAll: [], // 旧的选中按钮
      allOption: [ // 单类别-查询值
        {
          'label': '全选',
          'value': 'all'
        }
      ],
      isSelectAll: false, // 顶部的全选是否勾选
      isSHowTabBar: false, // 显示隐藏查询类别面板
      selectIndex: 'comeInType', // 类别列表显示隐藏
      accountName: '', // 账号查询
      bettingCode: '', // 订单号查询
      listItem: [], // 已选中的所有查询类型
      oldListItem: [], // 只有点确定时才将数据储存
      currentItem: [], // 当前页的查询类型
      currentList: tradeType.comeInType, // 当前选中的查询项，默认选中入款
      tradeType: tradeType // 类别列表
    }
  },
  components: {
    Picker,
    svgItems
  },
  computed: {
    ...mapState({
      accountType: state => state.queryCashStream.accountType, // 账号类型
      picTitle: state => state.queryCashStream.picTitle, // 选择账号类型-面板标题
      memberRate: state => state.queryCashStream.rate, // 选择账号类型-面板标题
      valDate: state => state.queryCashStream.valDate, // 选择账号类型-默认值
      startDate: state => state.queryCashStream.startDate, // 开始时间值
      endDate: state => state.queryCashStream.endDate, // 结束时间值
      queryTradeTypes: state => state.queryCashStream.tradeTypes, // 查询条件
      checkedAllKey: state => state.queryCashStream.checkedAllKey // 切换时储存选中所有情况的key
    }),
    minDate () { // 时间插件最小值
      let s = this.$store.state.queryCashStream.minDate
      s = s.replace(/-/g, '/')
      let date = new Date(s)
      return date
    },
    maxDate () { // 时间插件最大值
      let s = this.$store.state.queryCashStream.maxDate
      s = s.replace(/-/g, '/')
      let date = new Date(s)
      return date
    }
  },
  mounted () {
    this.$store.state.home.headerType = 5
    this.$store.state.home.headTitle = '现金流查询'
    // 获取路由存储的值
    let times = this.$route.query
    //  如果路由对象不为空，将路由传的数据设置为默认值
    if (JSON.stringify(times) !== '{}') {
      this.accountName = times.accountName
      this.$set(this.$store.state.queryCashStream, 'rate', parseInt(times.rate))
      if (sessionStorage.listItem !== undefined && sessionStorage.listItem !== '') {
        this.listItem = sessionStorage.listItem.split(';')
      }
      if (sessionStorage.checkedAll !== undefined && sessionStorage.checkedAll !== '') {
        this.checkedAll = sessionStorage.checkedAll.split(',')
      }
      this.checkSelectAll()
      // 判断路由中的会员类型
      if (parseInt(times.rate) === 6) {
        this.$set(this.$store.state.queryCashStream, 'valDate', '会员')
        // 会员默认展示入款列表
        this.$set(this, 'currentList', this.tradeType.comeInType)
      } else {
        this.$set(this.$store.state.queryCashStream, 'valDate', '代理')
        // 会员默认展示收入列表
        this.$set(this, 'currentList', this.tradeType.checkInList)
      }
      this.bettingCode = times.bettingCode
      this.$set(this.$store.state.queryCashStream, 'startDate', times.pickDateStartVal)
      this.$set(this.$store.state.queryCashStream, 'endDate', times.pickDateEndVal)
    } else {
      // 如果没有查询条件默认查询会员入款列表
      this.currentList = this.tradeType.comeInType
    }
    this.getCashStreamDataInit()
  },
  methods: {
    // 现金流查询数据初始化
    getCashStreamDataInit () {
      this.$store.dispatch(types.QUERYCASHSTREAMINIT_ACTION, { 'loading': 'pass' }).then(res => {})
    },
    // 点击 切换账号类型
    showTabFn () {
      this.isShowTab = true
    },
    // 获取选择账号类型的数据
    selectAccountType (e) {
      // 切换了类型之后将数据清空
      if (this.valDate !== e[0]) {
        this.listItem = []
        this.checkedAll = []
        this.checkSelectAll()
      }
      this.$store.state.queryCashStream.valDate = e[0]
      if (e[0] === '会员') {
        this.$store.state.queryCashStream.rate = 6
        // 如果是会员，类别查询显示‘入款’
        this.selectIndex = 'selectIndex'
      }
      if (e[0] === '代理') {
        this.$store.state.queryCashStream.rate = 5
        // 如果是代理，类别查询显示‘收入’
        this.selectIndex = 'checkInList'
      }
    },
    // 打开选择时间日期面板
    showTimeTabFn (channel, item) {
      // 1=开始时间，2=结束时间
      this.channel = channel
      this.$refs[item].open()
      window.$('html').addClass('fixPage')
      window.indexMain.pointerEvents(window.$('html'))
    },
    // 选择日期
    handleChangeDate (e) {
      if (this.channel === 1) {
        this.$store.state.queryCashStream.startDate = this.formatDate(e)
      }
      if (this.channel === 2) {
        this.$store.state.queryCashStream.endDate = this.formatDate(e)
      }
      setTimeout(() => {
        window.$('html').removeClass('fixPage')
      }, 0)
    },
    // 格式化获取的时间
    formatDate (date) {
      const y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      let d = date.getDate()
      d = d < 10 ? '0' + d : d
      return y + '-' + m + '-' + d
    },
    // 查询多类别-全选
    selectAll () {
      this.isSelectAll = !this.isSelectAll
      // 清空所有选中的查询类型
      this.listItem = []
      // 清空当前页签选中的查询类型
      this.currentItem = []
      // 清空所有查询大类的值
      this.checkedAll = []
      if (this.isSelectAll) {
        // 当前页的数据需存储至currentItem中
        for (let i = 0; i < this.currentList.length; i++) {
          this.currentItem = this.currentItem.concat(this.currentList[i].value)
        }
        let list = []
        // 如果是会员获取会员的列表
        if (this.memberRate === 6) {
          list = this.memberTypeList
        } else {
          list = this.agentTypeList
        }
        // 全选将所有的数据存储至listItem中
        for (let i = 0; i < list.length; i++) {
          // 选中list中的key
          this.checkedAll = this.checkedAll.concat(list[i].key)
          let object = this.tradeType[list[i].key]
          for (let j = 0; j < object.length; j++) {
            this.listItem = this.listItem.concat(object[j].value)
          }
        }
      }
    },
    /*
     * 查询单类别-全选
     * selectIndex: 会员{
     * comeInType=入款, comeOutType=出款,
     * personDeposit=人工存入, moneyConversionType=额度转换},
     * 代理{checkInList=收入，checkOutList=支出}
     */
    chooseAll () {
      this.currentItem = []
      // 获得数组的下标
      let index = this.checkedAll.indexOf(this.selectIndex)
      // 如果已存在则删除，否则加入进数组
      if (index !== -1) {
        this.checkedAll.splice(index, 1)
        // 将当前所有分类条件储存
        for (let i = 0; i < this.currentList.length; i++) {
          // 清除所有的查询条件
          this.spliceList('listItem', this.currentList[i].value)
          // 清除当前页的查询条件
          this.spliceList('currentItem', this.currentList[i].value)
        }
      } else {
        this.checkedAll = this.checkedAll.concat(this.selectIndex)
        // 将当前所有分类条件储存
        for (let i = 0; i < this.currentList.length; i++) {
          this.currentItem = this.currentItem.concat(this.currentList[i].value)
          let listIndex = this.listItem.indexOf(this.currentList[i].value)
          // 不存在时在将条件存储至数组
          if (listIndex === -1) {
            this.listItem = this.listItem.concat(this.currentList[i].value)
          }
        }
      }
      // 检测是否需要选中全选
      this.checkSelectAll()
    },
    // 查询类别-多选
    checkon (value) {
      // 获得数组的下标
      let index = this.listItem.indexOf(value)
      // 如果已存在则删除，否则加入进数组
      if (index !== -1) {
        // 所有的查询条件
        this.listItem.splice(index, 1)
        // 清除当前页的查询条件
        this.spliceList('currentItem', value)
      } else {
        // 所有的查询条件
        this.listItem = this.listItem.concat(value)
        // 当前页的查询条件
        this.currentItem = this.currentItem.concat(value)
      }
      // 如果多选项选择了全部项，触发全选按钮被选择，否则移除
      if (this.currentItem.length === this.currentList.length) {
        this.checkedAll = this.checkedAll.concat(this.selectIndex)
      } else {
        // 获的数组的下标，存在则删除
        let checkAllIndex = this.checkedAll.indexOf(this.selectIndex)
        if (checkAllIndex !== -1) {
          this.checkedAll.splice(checkAllIndex, 1)
        }
      }
      // 检测是否需要选中全选
      this.checkSelectAll()
    },
    // 清除查询条件
    spliceList (key, value) {
      let index = this[key].indexOf(value)
      if (index !== -1) {
        this[key].splice(index, 1)
      }
    },
    checkSelectAll () {
      // 当前所有选中的状态
      let arrLength = 0
      if (this.memberRate === 6) {
        arrLength = this.memberTypeList.length
      } else {
        arrLength = this.agentTypeList.length
      }
      // 长度一致表示全部选中了
      if (this.checkedAll.length === arrLength) {
        this.isSelectAll = true
      } else {
        // 全选按钮修改为不选中
        this.isSelectAll = false
      }
    },
    assertVal (name) {
      try {
        this[name] = this[name].replace(/[^0-9a-z]/ig, '')
      } catch (e) { }
      try {
        this[name] = this[name].toLowerCase()
      } catch (e) { }
    },
    // 打开查询类别面板
    queryTypeFn () {
      // 将旧的listItem储存，只有点击确定时替换，点取消时需要使用oldListItem覆盖listItem
      this.oldListItem = this.listItem
      this.oldCheckedAll = this.checkedAll
      // 默认选中入款或代理收入
      if (this.memberRate === 6) {
        this.selectQueryType('comeInType', 0)
      } else {
        this.selectQueryType('checkInList', 0)
      }
      this.isSHowTabBar = true
      window.$('html').addClass('fixPage')
      window.indexMain.pointerEvents(window.$('html'))
    },
    /*
     * 选择查询类别
     * key：当前选中的列表
     * time：0默认清空，1选中数据
     */
    selectQueryType (key, time) {
      window.$('html').addClass('fixPage')
      window.indexMain.pointerEvents(window.$('html'))
      // 存储当前查询条件key
      this.selectIndex = key
      // 获取到当前查询类别的查询条件
      this.currentList = this.tradeType[key]
      // 切换类别时将当前选中的条件清空并重新处理
      this.currentItem = []
      // 如果当前查询类别已经勾选全选则将数据动态储存回当前选中的条件
      for (let i = 0; i < this.currentList.length; i++) {
        let value = this.currentList[i].value
        // 如果在全局选中条件中存在则放入当前页的选中条件中用于显示
        let index = this.listItem.indexOf(value)
        if (index !== -1) {
          this.currentItem = this.currentItem.concat(value)
        }
      }
    },
    // 查询类别-点击确定按钮
    sureSelect () {
      this.isSHowTabBar = false
      setTimeout(() => {
        window.$('html').removeClass('fixPage')
      }, 0)
    },
    // 查询类别-点击取消按钮
    cancleSelect () {
      this.listItem = this.oldListItem
      this.checkedAll = this.oldCheckedAll
      this.isSHowTabBar = false
      this.checkSelectAll()
      setTimeout(() => {
        window.$('html').removeClass('fixPage')
      }, 0)
    },
    // 点击确定按钮开始查询
    makeSureSubmit () {
      let startDate = this.startDate + ' 00:00:00'
      let lastDate = this.endDate + ' 23:59:59'
      if (startDate > lastDate) {
        window.layer.msgWarn('开始时间必须小于等于结束时间')
        return
      }

      // 将部分查询条件放置sessionStorage
      sessionStorage.checkedAll = this.checkedAll
      // 因为listItem内的数据是,分割，存储后变成字符串无法切割，固做循环处理
      let listStr = ''
      for (let i = 0; i < this.listItem.length; i++) {
        if (i === 0) {
          listStr = this.listItem[i]
        } else {
          listStr = listStr + ';' + this.listItem[i]
        }
      }
      sessionStorage.listItem = listStr
      sessionStorage.tradeTypes = this.listItem

      this.$router.push({
        path: '/m/cash/queryCashStreamResult',
        query: {
          'rate': this.$store.state.queryCashStream.rate,
          'startDate': startDate,
          'lastDate': lastDate,
          'accountName': this.accountName,
          'bettingCode': this.bettingCode,
          'pickDateStartVal': this.startDate,
          'pickDateEndVal': this.endDate
        }
      })
    }
  }
}
</script>
