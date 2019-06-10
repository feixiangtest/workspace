<template>
<nav class="tabs tabs-icon-top tabs-dark clearfix" id="betfooter" betfootera="">
    <div id="mainFootersc" class="totalleft19">
        <a class="btn cancelButton" id="clearPage" @click="reset()">清空</a>
    </div>
    <div id="mainFooterChips" class="totalleft19">
        <a class="btn delete" id="betInput" @click="chips()">筹码</a>
    </div>
    <div id="mainFooterje" class="total37">
        <input type="tel" class="mainFooterMoney" v-model="money" @input="addmoney($event)" ></input>
    </div>
    <div id="mainFooterqd" class="totalright19">
        <a class="btn confirm open-betsubmit" id="resetBrder" style="float: right" @click="submitOrder()" v-if="allowClick">确定</a>
        <a class="btn confirm open-betsubmit" id="resetBrder" style="float: right" v-if="!allowClick">确定</a>
    </div>
    <div id="chipDiv" class="bar bar_background" :class="hides ? 'chip_hide' : 'chip_show' ">
        <div class="bar_chip">
            <ul>
                <li :key="index" :id=" 'chips_' + index " v-for="(item, index ) in chipsList"  :class="['cm' + (index + 1)]" @click="chipsClick(index, item.val, $event)" v-if="item.selected === '1'">
                    <a>{{item.val | chipFilter}}</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
</template>
<script>
import Vue from 'vue'
import * as types from '../../store/betZone/type'
import * as statusCode from '../../utils/status_const'
import * as type from '../../store/home/type'
// 筹码过滤器
Vue.filter('chipFilter', function (number) {
  switch (Number(number)) {
    case 10000: return '1万'
    case 20000: return '2万'
    case 30000: return '3万'
    case 40000: return '4万'
    case 50000: return '5万'
    case 60000: return '6万'
    case 70000: return '7万'
    case 80000: return '8万'
    case 90000: return '9万'
    case 100000: return '10万'
    default: return number
  }
})
export default {
  data () {
    return {
      allowClick: true, // 是否允许点击，避免重复提交
      money: this.$store.state.betZone.doBetList.length > 0 ? this.$store.state.betZone.doBetList[0].gold : '',
      hides: true,
      currentperiod: 0,
      lianmaArr: [
        2100000, // 十一选五连码
        2591000
      ]// 连码集合
    }
  },
  computed: {
    nowCode () {
      let path = this.$route.fullPath.split('/')
      return path[2]
    },
    /**
     * 当前游戏玩法
     */
    nowMode () {
      return this.$store.state.site.nowMode
    },
    chipsList () { // 获取筹码设置
      if (this.$store.state.home.userChips.length > 0) {
        return this.$store.state.home.userChips
      } else {
        if (localStorage.getItem('userChips') !== null) {
          let chips = JSON.parse(localStorage.getItem('userChips'))
          return chips.slice(0, chips.length)
        }
      }
    }
  },
  methods: {
    trlist () {
      // 获取投注详情的tr,更新显示的金额
      let trlist = document.getElementsByClassName('input2')
      for (let k = 0; k < trlist.length; k++) {
        if (this.money === 0) {
          trlist[k].value = ''
        } else {
          trlist[k].value = this.money
        }
      }
    },
    // 给投注列表的gold 重新赋值
    betlist () {
      let list = this.$store.state.betZone.doBetList
      for (let i = 0; i < list.length; i++) {
        list[i].gold = this.money
      }
    },
    addmoney (event) { // 重新设置金额
      let cash = event.currentTarget.value
      let value = cash.replace(/[^0-9]+/g, '')

      if (value.length > 8) { // 最大长度只能是8位
        this.money = Number(value.substr(0, 8))
      } else if (Number(value) === 0) {
        this.money = ''
      } else {
        this.money = Number(value)
      }
      this.betlist()
      this.trlist()
      this.$store.state.betZone.flag = !this.$store.state.betZone.flag // 改变值，触发一下 使得 投注详情页面的total() 可以触发
    },
    chips () { // 隐藏和显示筹码
      this.hides = !this.hides
    },
    reset () { // 清空筹码
      this.$store.state.betZone.index = '' // 选中的下标也清除
      this.money = ''
      this.hides = true
      let chipsList = document.getElementsByTagName('li')
      for (let i = 0; i < chipsList.length; i++) {
        chipsList[i].classList.remove('chip_click')
      }
      this.betlist()
      this.trlist()
      this.$store.state.betZone.flag = !this.$store.state.betZone.flag // 改变值，触发一下 使得 投注详情页面的total() 可以触发
    },
    chipsClick (index, money, event) { // 点击筹码，增加金额，并且筹码向上移动
      let chipsList = document.getElementsByTagName('li')
      for (let i = 0; i < chipsList.length; i++) {
        chipsList[i].classList.remove('chip_click')
      }
      event.currentTarget.classList.add('chip_click') // 提高筹码高度
      if (this.$store.state.betZone.index === '') { // 表示为空， 所有的列表都会更改
        // 超过8位不需要增加
        if (Number(this.money) + Number(money) < 100000000) {
          this.money = Number(this.money) + Number(money)
        }
        this.trlist()
        this.betlist()
      } else {
         // 获取指定下标
        let i = this.$store.state.betZone.index
        let obj = document.getElementsByClassName('input2')[i]
        if ((Number(obj.value) + Number(money)) < 100000000) {
          obj.value = Number(obj.value) + Number(money)
          this.$store.state.betZone.doBetList[i].gold = obj.value
        }
        // this.$store.state.betZone.doBetList[i].gold = Number(money)
        // obj.value = this.$store.state.betZone.doBetList[i].gold
      }
      this.$store.state.betZone.flag = !this.$store.state.betZone.flag
    },
    chipClass (item) { // 显示筹码颜色
      let number = Number(item)
      switch (number) {
        case 10: return 'cm1'
        case 50: return 'cm2'
        case 100: return 'cm3'
        case 500: return 'cm4'
        case 1000: return 'cm5'
        case 5000: return 'cm6'
        case 10000: return 'cm7'
        case 50000: return 'cm8'
        case 100000: return 'cm9'
      }
    },
    submitOrder () { // 提交注单到后台
      if (!navigator.onLine) { // 离线状态
        window.layer.alert('目前处于离线状态')
        return false
      }

      console.info('进入页面的时候期数:', this.currentperiod)
      // 连码时的处理
      let lianmaObj = {}
      // 因为连码的特殊处理，所以增加doBetList参数用于封装
      let doBetList = []
      for (let i = 0; i < this.$store.state.betZone.doBetList.length; i++) {
        // 连码需要重新数据组装
        if (this.lianmaArr.indexOf(this.nowMode) >= 0) {
          Object.assign(lianmaObj, this.$store.state.betZone.doBetList[i])
          // 当前玩法为连码时的处理,快乐十分需要跟其他的分开处理
          for (let j = 0; j < this.$store.state.betZone.doBetList[i].groupList.length; j++) {
            if (this.nowMode !== 2591000) {
              lianmaObj.project = this.$store.state.betZone.doBetList[i].project.substr(0, 3) + this.$store.state.betZone.doBetList[i].groupList[j].join('_')
              lianmaObj.fullname = this.$store.state.betZone.doBetList[i].groupList[j].join('_')
            } else {
              lianmaObj.project = this.$store.state.betZone.doBetList[i].groupList[j].join(',')
            }
            doBetList[j] = {}
            Object.assign(doBetList[j], lianmaObj)
          }
        } else {
          // 当fullname没有特殊处理时获取project
          if (this.$store.state.betZone.doBetList[i].fullname === undefined) {
            this.$store.state.betZone.doBetList[i].fullname = this.$store.state.betZone.doBetList[i].project
          }
          doBetList[i] = {}
          Object.assign(doBetList[i], this.$store.state.betZone.doBetList[i])
        }
      }
      let date = Date.parse(new Date())
      let param = {
        // period: this.$store.state.betZone.currentPeriodNo.replace(/-/g, ''),
        period: this.$store.state.betZone.currentPeriodNo,
        lotteryId: this.$store.state.site.lotteryId,
        token: date,
        bettingList: doBetList,
        parentTypeId: this.$store.state.site.nowMode
      }
      if (!param.period) {
        window.layer.msgWarn('期数尚未加载完成, 请稍后再试')
        return false
      }
      // 投注金额未0 不提交
      for (let i = 0; i < param.bettingList.length; i++) {
        if (!param.bettingList[i].gold) {
          window.layer.msgWarn('下注金额不能为空！')
          return false
        }
      }
      /* 六合彩 连码需要特殊处理 allen */
      if (this.$store.state.site.nowMode === 2460000) { // 六合彩大类 连码
        // 循环选择类型，拼接sign
        param.sign = ''
        this.$store.state.betZone.selectedRule.forEach(rule => {
          param.sign += rule.project + ',' + rule.odds + ' '
        })
      }
      /* 六合彩 连码需要特殊处理 allen */
      if (this.$store.state.site.nowMode === 2470000) { // 六合彩大类 自选不中
        // 循环选择类型，拼接sign
        param.sign = ''
        this.$store.state.betZone.selectedRule.forEach(rule => {
          param.sign += rule.project + ',' + rule.odds
        })
      }
      /* 六合彩 连肖连尾需要特殊处理 allen */
      if (this.$store.state.site.nowMode === 2490040) { // 六合彩大类 连肖连尾
        param.sign = ''
        this.$store.state.betZone.selectedList.forEach(item => {
          param.sign += item.project + ',' + item.odds + ' '
        })
        param.sign = param.sign.substring(0, param.sign.length - 1) // 删除最后一个空格
      }
      /* 六合彩合肖、连肖连尾需要传递当前缓存生肖 */
      if (this.$store.state.site.nowMode === 2410050 || this.$store.state.site.nowMode === 2490040 || this.$store.state.site.nowMode === 2490020 || this.$store.state.site.nowMode === 2490010) {
        param.currentZodiac = this.$store.state.betZone.currentZodiac
      }
      /**
       * CP-2933 彩票投注提示修改
       */
      this.allowClick = false
      document.getElementsByTagName('body')[0].style.overflow = 'hidden' // 背景固定，不让滑动
      window.layer.open({
        shadeClose: !1,
        className: 'bttingTips',
        content: '<img src="' + window.store.state.home.commonImgUrl + '/loaderc.gif"/>正在投注，请稍候...'
      })
      this.$store.dispatch(types.BETTING_ACTION, param).then(res => {
        this.allowClick = true
        window.layer.closeAll()
        document.getElementsByTagName('body')[0].style.overflow = '' // 背景固定，不让滑动
        if (statusCode.statusConst.PERIODCLOSED === res.status || res.status === statusCode.statusConst.CLOSEGAMESTAUS) { // 某一期关闭 // 游戏投注未开启
          window.layer.msgWarn(res.msg)
            // 关闭投注
          this.$store.state.betZone.bettingState = 0
          // 关盘
          for (let j = 0; j < this.$store.state.betZone.lotteryTimes.length; j++) {
            if (Number(this.$store.state.site.lotteryId) === this.$store.state.betZone.lotteryTimes[j].lotteryId) {
              Vue.set(this.$store.state.betZone.lotteryTimes[j], 'isFengPan', false)
              Vue.set(this.$store.state.site, 'closedLottery', false)
            }
          }
        } else if (statusCode.statusConst.SUCCESS === res.status) {
           // 刷新余额
          this.$store.dispatch(type.GET_BALANCE_ACTION)
          // window.layer.msgWarn('投注成功')
           /**
            * CP-2933 彩票投注提示修改
            */
          let $that = this
          let smallClass = window.innerWidth === 320 ? ' smallTip' : ''
          document.getElementsByTagName('body')[0].style.overflow = 'hidden' // 背景固定，不让滑动
          window.layer.open({
            className: 'betTips' + smallClass,
            title: '温馨提示',
            shadeClose: !1,
            content: '投注成功',
            btn: ['继续投注', '查看注单'],
            yes: function (index) {
              window.layer.close(index)
              window.clearTimeout(tipsTimeout)
              document.getElementsByTagName('body')[0].style.overflow = ''  // 恢复滑动
            },
            no: function (index) {
              window.layer.close(index)
              document.getElementsByTagName('body')[0].style.overflow = ''  // 恢复滑动
              window.clearTimeout(tipsTimeout)
              // 跳转投注详情
              $that.$router.push({ path: '/todayBettingRecord', query: { lotteryId: $that.$store.state.site.lotteryId } })
            }
          })
          let tipsTimeout = setTimeout(function () {
            window.layer.closeAll()
            document.getElementsByTagName('body')[0].style.overflow = ''  // 恢复滑动
          }, 5000)
        } else if (statusCode.statusConst.ZODIACCHANGED === res.status) {
            // 六合彩合肖下注时，后台生肖有变更，下注失败
          window.layer.msgWarn(res.msg, function () {
            window.layer.close()
            localStorage.clear()
            window.location.reload()
          })
          this.$store.dispatch(types.CURRENT_ZODIAC_ACTION)
        } else {
          if (statusCode.statusConst.ODDSTAUS === res.status) {
            window.layer.msgWarn(res.msg, function () {
              window.layer.close()
              localStorage.clear()
              window.location.reload()
            })
          } else {
            console.info('vito add')
            window.layer.msgWarn(res.msg, function () { window.layer.close() })
          }
        }
        this.resetState()
      }, res => {
        this.allowClick = true
        document.getElementsByTagName('body')[0].style.overflow = ''
      })
      scrollTo(0, 0)
    },
    resetState () {
       // 重置state数据
      this.$store.state.site.show = true
      // window.layer.closeAll()
      this.$store.state.betZone.index = ''
      this.$store.state.betZone.bet_disabled = false
      this.$store.state.betZone.prelist.splice(0, this.$store.state.betZone.prelist.length)
      this.$store.state.betZone.midlist.splice(0, this.$store.state.betZone.midlist.length)
      this.$store.state.betZone.afterlist.splice(0, this.$store.state.betZone.afterlist.length)
      this.$store.state.betZone.selectedList.splice(0, this.$store.state.betZone.selectedList.length)
      this.$store.state.betZone.zhixuan_first_select.splice(0, this.$store.state.betZone.zhixuan_first_select.length)
      this.$store.state.betZone.zhixuan_second_select.splice(0, this.$store.state.betZone.zhixuan_second_select.length)
      this.$store.state.betZone.zhixuan_three_select.splice(0, this.$store.state.betZone.zhixuan_three_select.length)
      this.$store.state.betZone.doBetList.splice(0, this.$store.state.betZone.doBetList.length)
      this.$store.state.betZone.pcddSelect = {} // PCDD 特码选择
      this.$store.state.betZone.tema_array.splice(0, 3)
      this.$store.state.betZone.tema_array.push(0)
      this.$store.state.betZone.tema_array.push(1)
      this.$store.state.betZone.tema_array.push(2) // PCDD 特码三个球放在该数组中
      this.$store.state.betZone.klsf_lianma_select = false
    }
  },
  mounted () { // 不依赖 init 接口, 依赖其他接口数据 , 不需要处理
    // 进入下注明细的时候拿到 下注时候的期数
    this.currentperiod = this.$store.state.betZone.currentPeriodNo
  }
}
</script>
