<template>
  <div class="main-box ">
    <div class="yo-form-item">
      <h5 class="title">平台</h5>
      <p class="con-txt select-item"><span @click="openPlaformModel()">{{currenPlatform}}</span><i class="yo-icon icon-pull"></i></p>
    </div>
    <div class="yo-form-item">
      <h5 class="title">时间选择</h5>
      <time-date :start='starTime' :end='endTime' :getSelectTime='getSelectTime' ref="timeRef" :enabledToday='enabledToday'  :disabledTomorrow='disabledTomorrow'></time-date>
    </div>
    <div class="public-title magt5">
      <h1 class="yow-content">快速选择日期</h1>
    </div>
    <div class="fast-sel-time magt5">
      <ul>
        <li class="btn btn-square" :class="buIdx === 0 ? 'btn-primary' : 'btn-disabled'" @click="switchDateType(0)">今日</li>
        <li class="btn btn-square" :class="buIdx === 1 ? 'btn-primary' : 'btn-disabled'" @click="switchDateType(1)">昨日</li>
        <li class="btn btn-square" :class="buIdx === 2 ? 'btn-primary' : 'btn-disabled'" @click="switchDateType(2)">本周</li>
        <li class="btn btn-square" :class="buIdx === 3 ? 'btn-primary' : 'btn-disabled'" @click="switchDateType(3)">上周</li>
        <li class="btn btn-square" :class="buIdx === 4 ? 'btn-primary' : 'btn-disabled'" @click="switchDateType(4)">本月</li>
      </ul>
    </div>
    <div class="public-footer common-footer">
      <div class="but-footer yow-content">
        <a href="javascript:void(0);" disabled="disabled" class="btn btn-primary btn-lg btn-block" @click="queryDetail()">查询</a>
      </div>
    </div>
    <!--提示信息 根据选择平台不同，使用的时间不同，提示不同信息  有美东标准时间为 -5，夏令时间为 -4；格林时间为 0；北京时间 8 -->
    <p class="platformTips red-txt" v-if='bjTimePlatforms.indexOf(curreCode.toUpperCase())>-1'>
      <span v-if='curreCode==="ab"'>温馨提示：{{currenPlatform}}游戏时间按北京时间计算，返水统计时间为前一天12:00至早上12:00</span>
      <span v-else>温馨提示：{{currenPlatform}}游戏时间按北京时间计算，返水统计时间为前一天08:00至早上08:00</span>
    </p>
    <p class="platformTips red-txt" v-if='greenTimePlatforms.indexOf(curreCode.toUpperCase())>-1'>
      温馨提示：{{currenPlatform}}游戏时间按格林时间计算，返水统计时间为前一天08:00至早上08:00
    </p>
    <!--平台选择弹框，选择后需要初始化时间列表，重新计算适用时间-->
    <div class="TipsWindown" attr-div="conversionModeList" v-show="showAlter">
      <div class="shadeIn">
        <div class="selBankBox time">
          <h1>
            <a href="javascript:;" @click="closePlaformModel()" class="left">取消</a> 选择平台
          </h1>
          <dl class="modelContent">
            <dt v-for="(item, index) in platformsData" :key="index">
                    <label class="mint-checklist-label" style="padding-left:0">
                      <span class="mint-checkbox">
                        {{item.displayName}}
                        <input type="checkbox" class="mint-checkbox-input"
                               :checked="item.displayName === currenPlatform" @click='choosePlatform(item)' />
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
  import * as types from '../../store/transactionRecord/type'
  import timeDate from '@/components/timeDate'
  import dayjs from 'dayjs'
  let statusCode = window.common.statusConst
  export default {
    data () {
      return {
        usaTimePlatforms: ['TY', 'CP', 'AG', 'IBC', 'BB', 'LEBO', 'CQ9', 'BG'], // 使用美东时间的平台列表
        bjTimePlatforms: ['OG', 'OPUS', 'AB', 'DS', 'PT', 'PP', 'NMG', 'CMD', 'MWG', 'VG', 'PNG', 'VGS'], // 使用北京时间的平台列表
        greenTimePlatforms: ['MG'], // 使用格林时间的平台列表
        showAlter: false, // 平台选择弹框显示和隐藏
        timeModelShow1: false, // 开始时间选择弹框显示和隐藏
        timeModelShow2: false, // 结束时间选择弹框显示和隐藏
        platformsData: [], // 平台列表数据
        timeArr: [], // 格式化后的时间选择列表数据 开始时间和结束时间共用
        timeList: [], // 未经格式化的 时间列表数据 做判断和参数传递使用
        currenPlatform: '', // 当前选择的彩种 默认传统彩
        currenPlatformUtc: -4, // 当前选择的彩种使用时间的时区 用来计算时间偏移量和控制提示信息的显示和隐藏
        starTime: '', // 当前选择的开始时间
        chooseDateSt: '', // 当前选择，未确认，可以取消的开始时间
        chooseIdxSt: '', // 当前选择，，未确认，可以取消的开始时间在时间列表中的索引，用来控制下拉列表的选中状态
        endTime: '', // 当前选择的结束时间
        chooseDateEn: '', // 当前选择，未确认，可以取消的结束时间
        chooseIdxEn: '', // 当前选择，，未确认，可以取消的结束时间在时间列表中的索引，用来控制下拉列表的选中状态
        startIdx: 6, // 当前选择的开始时间在时间列表中的索引，用来判断选择时间是否合法， 默认是当天
        endIdx: 6, // 当前选择的结束时间在时间列表中的索引，用来判断选择时间是否合法，默认是查询范围的最后一天
        buIdx: 0, // 点击按钮的索引
        defaultData: {},
        enabledToday: '',
        disabledTomorrow: '', // 要禁用的日期为美东时区的明天
        curreCode: '' // 平台code
      }
    },
    components: {
      timeDate
    },
    methods: {
      // 点击确定的时候，设置开始，结束时间
      getSelectTime (start, end) {
        this.starTime = start
        this.endTime = end
        this.saveData()
      },
      /**
       * 后台动态获取游戏平台
       */
      getPlaform () {
        let $this = this
        this.$store.dispatch(types.GETPLATFORM_RECORD_ACTION, {}).then(res => {
          if (res.status === statusCode.SUCCESS) {
            this.platformsData = res.data
            $this.currenPlatform = res.data[0].displayName
            $this.curreCode = res.data[0].platformCode.toLowerCase()
            res.data.forEach(function (v, k) {
              if (v.platformCode === 'cp') {
                $this.currenPlatform = v.displayName
                $this.curreCode = 'cp'
              }
            })
            this.switchDateType(0)
          }
        })
      },
      /**
       * 根据平台和日期类型选择时间
       */
      switchDateType (idx) {
        this.buIdx = idx
        let $this = this
        let dateType = 'today'
        switch (idx) {
          case 0:
            dateType = 'today'
            break
          case 1:
            dateType = 'yesterday'
            break
          case 2:
            dateType = 'thisWeek'
            break
          case 3:
            dateType = 'lastWeek'
            break
          case 4:
            dateType = 'thisMonth'
            break
        }
        this.$store.dispatch(types.SWITCH_DATE_TYPE_ACTION, {
          'platform': this.curreCode,
          'dateType': dateType
        }).then(res => {
          if (res.status === statusCode.SUCCESS) {
            $this.starTime = res.data.startDate
            $this.endTime = res.data.endDate
            $this.timeList = res.data.timeList
            $this.timeArr = res.data.timeArr
            $this.chooseDateSt = $this.starTime
            $this.chooseDateEn = $this.endTime
            this.disabledTomorrow = res.data.tomorrow
            this.enabledToday = res.data.today
            this.$refs.timeRef.setNewTime($this.starTime, $this.endTime)
            this.saveData()
          }
        })
      },
      openPlaformModel () { // 开启平台弹框
        this.showAlter = true
        window.$('#app').addClass('fixedApp') // 防止 safari 浏览器可以上下弹动，给body加一个calss
      },
      closePlaformModel () { // 关闭平台弹框
        this.showAlter = false
        window.$('#app').removeClass('fixedApp') // 恢复正常状态
      },
      closeTimeModel (type, choose) { // 关闭时间列表弹框 选择时间后，点击完成按钮的逻辑处理也放在改方法
        window.$('#app').removeClass('fixedApp')
        if (type === 'st') { // st 表示开始时间弹框
          this.timeModelShow1 = false
          if (choose === 'choose') { // choose 表示完成按钮
            this.starTime = this.chooseDateSt
            this.startIdx = this.chooseIdxSt
          } else { // 其他表示取消按钮
            this.chooseDateSt = this.starTime
            this.chooseIdxSt = this.startIdx
          }
        } else if (type === 'end') { // end 表示结束时间弹框
          this.timeModelShow2 = false
          if (choose === 'choose') {
            this.endTime = this.chooseDateEn
            this.endIdx = this.chooseIdxEn
          } else {
            this.chooseDateEn = this.endTime
            this.chooseIdxEn = this.endIdx
          }
        }
      },
      openTimeModel (type) { // 弹出时间列表弹框
        if (type === 0) { // type === 0 表示开始时间弹框
          this.timeModelShow1 = true
          window.$('#app').addClass('fixedApp')
        } else if (type === 1) { // type === 1 表示结束时间弹框
          this.timeModelShow2 = true
          window.$('#app').addClass('fixedApp')
        }
      },
      choosePlatform (item) { // 点击选择某一平台时调用的方法
        this.currenPlatform = item.displayName
        this.currenPlatformUtc = item.utc
        this.curreCode = item.platformCode.toLowerCase()
        this.switchDateType(this.buIdx)
        this.closePlaformModel()
      },
      chooseTime (a, time, idx) { // 点击选择时间时，只改变选择的视图效果，点击完成时才会该表参数
        if (a === 'st') {
          this.chooseDateSt = time
          this.chooseIdxSt = idx
        } else if (a === 'end') {
          this.chooseDateEn = time
          this.chooseIdxEn = idx
        }
      },
      /**
       *  快速选择按钮，0： 今日 1： 昨日  3： 本周  4： 上周
       *  时间列表长度固定为7，时间由近至远，由上到下，点击时重新计算生成时间列表，按 index 区截取日期
       */
      buttonChoose (idx) {
        this.buIdx = idx
        if (idx === 0) { // 今日，直接截取最后一个
          this.starTime = this.timeList[6]
          this.startIdx = 6
          this.endTime = this.timeList[6]
          this.endIdx = 6
        } else if (idx === 1) { // 昨日，直接截取倒数第二个
          this.starTime = this.timeList[5]
          this.startIdx = 5
          this.endTime = this.timeList[5]
          this.endIdx = 5
        } else if (idx === 2) { // 本周
          let nowDayOfWeek = this.getAreTime(this.currenPlatformUtc).day // 先计算今天是本周的第几天，然后再截取本周起始时间
          if (nowDayOfWeek === 0) { // 该获取本周第n天的方法默认星期天为第 0 天，即每周的第一天，需要特殊处理
            this.starTime = this.timeList[0]
            this.startIdx = 0
          } else {
            this.starTime = this.timeList[6 - nowDayOfWeek + 1]
            this.startIdx = 6 - nowDayOfWeek + 1
          }
          this.endTime = this.timeList[6]
          this.endIdx = 6
        } else if (idx === 3) { // 上周
          let nowDayOfWeek = this.getAreTime(this.currenPlatformUtc).day // 先计算今天是本周的第几天，然后再截取上周起始时间
          if (nowDayOfWeek !== 0) {
            this.starTime = this.timeList[0]
            this.startIdx = 0
            this.endTime = this.timeList[6 - nowDayOfWeek]
            this.endIdx = 6 - nowDayOfWeek
          } else {
            window.layer.msgWarn('上周暂无数据，请重新选择')
            this.starTime = this.timeList[6]
            this.startIdx = 6
            this.endTime = this.timeList[6]
            this.endIdx = 6
            this.buIdx = 0
          }
        }
        // 改变页面查询的起始时间
        this.chooseDateSt = this.starTime
        this.chooseDateEn = this.endTime
        this.saveData()
      },
      /**
       *  点击查询时调用的方法 根据 this.curreCode 判断跳转至彩票、体育还是第三方页面
       *  通过 url 传参 至具体页面时再截取参数 这是沿用原来的逻辑
       */
      queryDetail () {
        if (new Date(this.starTime).getTime() > new Date(this.endTime).getTime()) {
          window.layer.msgWarn('开始时间不能大于结束时间')
        } else {
          if (this.curreCode === 'cp') { // 传统彩页面
            this.$router.push({
              path: '/wap/lotteryBettingHistoryDetail',
              query: {
                'startDate': this.starTime,
                'endDate': this.endTime,
                'selFlag': this.curreCode
              }
            })
          } else if (this.curreCode === 'ty') { // 皇冠体育页面
            this.$router.push({
              path: '/wap/sportsHistoryDetail',
              query: {
                'startDate': this.starTime,
                'endDate': this.endTime,
                'selFlag': this.curreCode
              }
            })
          } else { // 第三方详情页面
            this.$router.push({
              path: '/wap/thirdPlatformDetail',
              query: {
                'startDate': this.starTime,
                'endDate': this.endTime,
                'selFlag': this.curreCode
              }
            })
          }
        }
      },
      /**
       *  按平台 UTC 计算当前各平台的时间
       */
      getAreTime (timeArea) {
        let d = new Date()
        let localTime = d.getTime() // 获取1970年1月1日后到此时时间之间的毫秒数
        let localOffset = d.getTimezoneOffset() * 60000 // 获取当地时间与格林尼治时间偏移值，转换成毫秒
        let utc = localTime + localOffset // 将当前时间与时区偏移量相加，得到国际标准时间， 毫秒
        let calctime = utc + (3600000 * timeArea) // timeArea为具体时区，美东标准时间为 -5，夏令时间为 -4；格林时间为 0；北京时间为 8
        return {
          day: new Date(calctime).getDay(),
          date: dayjs(new Date(calctime)).format('YYYY-MM-DD'),
          time: new Date(calctime)
        } // 日期格式转换
      },
      /**
       *  按 UTC 计算出各平台的时间当前时间后，额可以计算往前推 n 天的时间日期 但每次只能获取一天
       */
      getTimeList (date, index) {
        date.setDate(date.getDate() + index) // 当前时间往前(后)推index天
        let time = dayjs(date).format('YYYY-MM-DD') // 当前时间往前(后)推index天日期格式
        return time
      },
      /**
       *  初始花时间列表，每次选择平台时都会重新计算，调用此方法
       *  this.getAreTime(this.currenPlatformUtc) 该方法每次用到都必须重新调用
       *  即使再该方法内部也不能 将 this.getAreTime(this.currenPlatformUtc)保存起来重复使用
       *  for 循环生成时间列表，每次只能往前推一天 要反复调用 this.getTimeList
       */
      initTimeList () {
        this.starTime = this.getAreTime(this.currenPlatformUtc).date
        this.endTime = this.getAreTime(this.currenPlatformUtc).date
        this.chooseDateSt = this.starTime
        this.chooseDateEn = this.endTime
        this.buIdx = 0
        this.timeList = []
        this.timeArr = []
        for (let i = -6; i < 1; i++) {
          let dat = this.getTimeList(this.getAreTime(this.currenPlatformUtc).time, i)
          let arr = dat.split('-')
          this.timeList.push(dat)
          this.timeArr.push({
            y: arr[0] + '  年    ',
            m: arr[1] + '  月    ',
            d: arr[2] + '  日'
          })
        }
      },
      /**
       *  通过请求头获取服务器时间 与当前逻辑需求不符合 目前暂时没用到
       */
      getServerTime () {
        let xhr = null
        if (window.XMLHttpRequest) {
          xhr = new window.XMLHttpRequest()
        } else { // ie
          xhr = new window.ActiveObject('Microsoft')
        }
        // 通过get的方式请求当前文件
        xhr.open('get', '/')
        xhr.send(null)
        // 监听请求状态变化
        xhr.onreadystatechange = function () {
          let time = null
          let curDate = null
          if (xhr.readyState === 2) {
            // 获取响应头里的时间戳
            time = xhr.getResponseHeader('Date')
            // console.log(xhr.getAllResponseHeaders())
            curDate = new Date(time)
            console.log(time)
            return curDate
          }
        }
      },
      // 将所有查询数据保存在store里面，待会返回的时候还要继续用
      saveData () {
        this.$store.state.transactionRecord.saveTransData.platformsData = this.platformsData
        this.$store.state.transactionRecord.saveTransData.currenPlatform = this.currenPlatform
        this.$store.state.transactionRecord.saveTransData.curreCode = this.curreCode
        this.$store.state.transactionRecord.saveTransData.buIdx = this.buIdx
        this.$store.state.transactionRecord.saveTransData.startDate = this.starTime
        this.$store.state.transactionRecord.saveTransData.endTime = this.endTime
        this.$store.state.transactionRecord.saveTransData.disabledTomorrow = this.disabledTomorrow
      }
    },
    destroyed () {
      this.$store.state.h5Home.headerType = 4
    },
    mounted () {
      this.$store.state.h5Home.headerType = 5
      this.$store.state.h5Home.headTitle = '投注记录'
      this.$store.state.h5Home.headLeft = 'icon-back'
      this.$store.state.h5Home.headRight = ''
      this.$store.state.transactionRecord.openRecordBox = 0
      // 如果数据有保存，那么先取保存的数据
      if (this.$store.state.transactionRecord.saveTransData.currenPlatform) {
        this.platformsData = this.$store.state.transactionRecord.saveTransData.platformsData
        this.currenPlatform = this.$store.state.transactionRecord.saveTransData.currenPlatform
        this.curreCode = this.$store.state.transactionRecord.saveTransData.curreCode
        console.log(this.currenPlatform, this.curreCode, 'currecode')
        this.buIdx = this.$store.state.transactionRecord.saveTransData.buIdx
        this.starTime = this.$store.state.transactionRecord.saveTransData.startDate
        this.endTime = this.$store.state.transactionRecord.saveTransData.endTime
        this.disabledTomorrow = this.$store.state.transactionRecord.saveTransData.disabledTomorrow
        this.$refs.timeRef.setNewTime(this.starTime, this.endTime)
      } else {
        this.getPlaform()
      }
      // this.getPlaform()
    }
  }
</script>
