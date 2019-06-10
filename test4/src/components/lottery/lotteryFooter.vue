<template>
<nav class="tabs tabs-icon-top tabs-dark clearfix" id="betfooter" betfootera="">
    <div id="mainFootersc" class="totalleft19">
        <a class="btn cancelButton" id="clearPage" @click="reset()">重置</a>
    </div>
    <div id="mainFooterChips" class="totalleft19">
        <a class="btn delete" id="betInput" @click="chips()">筹码</a>
    </div>
    <div id="mainFooterje" class="total37">
        <input type="tel" class="mainFooterMoney" :value="moneyFilter" @input="changemoney($event)"></input>
    </div>
    <div id="mainFooterqd" class="totalright19">
        <a class="btn confirm open-betsubmit" id="resetBrder" style="float: right" @click="orderMethod()">确定</a>
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
// import * as lotteryMap from '../../config/lotteryMap'

// 筹码过滤器
Vue.filter('chipFilter', function (number) {
  switch (Number(number)) {
    case 10000: return '1万'
    case 50000: return '5万'
    case 100000: return '10万'
    default: return number
  }
})
export default {
  data () {
    return {
      logins: true, // 是否登录
      betEndTime: 1, // 投注是否截止， 1表示可以投注， 0 表示封盘

      money: 0,
      hides: true,
      doBetList: [],
      nowModel: '',
      lotteryId: ''
    }
  },
  computed: {

    moneyFilter () { // 双向绑定金额
      if (this.money === 0) {
        return ''
      }
      return this.money
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
    changemoney (event) { // 输入框填写金额
      this.money = Number(event.currentTarget.value)
    },
    chips () { // 隐藏和显示筹码
      this.hides = !this.hides
    },
    reset () { // 重置筹码
      this.money = 0
      this.hides = true
      let chipsList = document.getElementsByTagName('li')
      for (let i = 0; i < chipsList.length; i++) {
        chipsList[i].classList.remove('chip_click')
      }
    },
    chipsClick (index, money, event) { // 点击筹码，增加金额，并且筹码向上移动
      let chipsList = document.getElementsByTagName('li')
      for (let i = 0; i < chipsList.length; i++) {
        chipsList[i].classList.remove('chip_click')
      }
      event.currentTarget.classList.add('chip_click') // 提高筹码高度
      this.money += Number(money)
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
    /**
     *检验玩法， PK10 没有玩法可以校验
     */
    orderMethod () { // 校验玩法
      this.doBetList = this.$store.state.betZone.doBetList // 获取投注的列表
      if (this.doBetList.length <= 0) {
        window.layer.msgWarn('请先投注!')
        return
      }
      for (let i = 0; i < this.$store.state.betZone.doBetList.length; i++) { // 将金额放入到对象中 DOTO 放入期数
        this.$store.state.betZone.doBetList[i]['gold'] = this.money
      }
      this.nowModel = this.$store.state.site.nowMode // 获取玩法
      this.lotteryId = this.$store.state.site.lotteryId // 选中的彩票类型
      if (!this.logins) { // TODO登录状态
        window.layer.msgWarn('请先进行登录')
        // window.close()
        return
      }
      if (this.betEndTime <= 0) { // TODO判断是否能投注
        window.layer.msgWarn('当前期数投注已截止，请进行下期投注!')
          // window.location.reload()
        return
      }
      this.$store.state.site.show = false
      scrollTo(0, 0)
    },
    sscMethods (rtype, list) {
      if (list.length < 1) {
        window.layer.msgWarn('当前您还没有选择投注项')
        return false
      }
      let resultlist = this.sscfilterNumbers(list)
      let msg = ''
      let msg2 = ''
      if (rtype === 2391000) { // 组三
        msg = '三'
        msg2 = '挑选5~10个号码'
      } else if (rtype === 2392000) { // 组六
        msg = '六'
        msg2 = '挑选4~8个号码'
      }
      if (resultlist[0] > 0 && resultlist[0] < 5) {
        window.layer.msgWarn(`请在前${msg}：${msg2}`)
        return false
      } else if (resultlist[1] > 0 && resultlist[1] < 5) {
        window.layer.msgWarn(`请在中${msg}：${msg2}`)
        return false
      } else if (resultlist[2] > 0 && resultlist[2] < 5) {
        window.layer.msgWarn(`请在后${msg}：${msg2}`)
        return false
      }
      return true
    },
    sscfilterNumbers (betlist) {
      let preNumber = 0// 前
      let midNumber = 0 // 中
      let afterNumber = 0 // 后
      for (let i = 0; i < betlist.length; i++) {
        switch (Number(betlist[i].parent)) {
          case 2391010 : preNumber++; break // 组三前
          case 2391020 : midNumber++; break // 组三中
          case 2391030 : afterNumber++; break // 组三后
          case 2392010 : preNumber++; break // 组六前
          case 2392020 : midNumber++; break // 组六中
          case 2392030 : afterNumber++; break // 组六后
        }
      }
      return [preNumber, midNumber, afterNumber]
    }
  }
}
</script>
