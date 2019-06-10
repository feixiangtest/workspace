<template>
<nav class="tabs tabs-icon-top tabs-dark clearfix" id="betfooter" betfootera="">
    <!--开奖结果打开则不显示路单按钮-->
    <div class="openLuzi" v-if="!this.$store.state.site.awardShow" @click="openLuzi()">
      <font>路</font>
      <font>单</font>
    </div>
    <div id="mainFootersc" class="totalleft19">
        <a class="btn cancelButton" id="clearPage" @click="reset()">重置</a>
    </div>
    <div id="mainFooterChips" class="totalleft19">
        <a class="btn delete" id="betInput" @click="chips()">筹码</a>
    </div>
    <div id="mainFooterje" class="total37">
        <input type="tel" class="mainFooterMoney" v-model="money" @input="changemoney($event)"></input>
    </div>
    <div id="mainFooterqd" class="totalright19">
        <a class="btn confirm open-betsubmit" id="resetBrder" style="float: right" @click="orderMethod()">确定</a>
    </div>
    <div id="chipDiv" class="bar bar_background" :class="hides ? 'chip_hide' : 'chip_show' ">
        <div class="bar_chip">
            <ul>
                <li :key="index" :id=" 'chips_' + index " v-for="(item, index ) in chipsList"  :class="['cm' + (index + 1)]" @click="chipsClick(index, item.val, $event)" v-if="item.selected === '1'">
                    <a>{{item.val | chipFilter(item.val)}}</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
</template>
<script>
import * as filter from '../../../filter/chipFilter'
import * as service from '../../../service/betService/commonService'
import * as syxwService from '../../../service/betService/syxwService'
export default {
  data () {
    return {
      logins: true, // 是否登录
      money: '',
      hides: true,
      doBetList: [],
      nowModel: ''
    }
  },
  watch: {
    lotteyrId () {
      this.reset()
    }
  },
  computed: {
    lotteyrId () {
      return this.$store.state.site.lotteryId
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
    },
    isLogin () {
      return this.$store.state.home.isLogin
    }
  },
  methods: {
    changemoney (event) { // 输入框填写金额
      let cash = event.currentTarget.value
      let value = cash.replace(/[^0-9]+/g, '')

      if (value.length > 8) { // 最大长度只能是8位
        this.money = Number(value.substr(0, 8))
      } else if (Number(value) === 0) {
        this.money = ''
      } else {
        this.money = Number(value)
      }
      // this.money = Number(event.currentTarget.value)
    },
    chips () { // 隐藏和显示筹码
      this.hides = !this.hides
    },
    reset () { // 重置筹码
      this.money = ''
      this.hides = true
      let chipsList = document.getElementsByTagName('li')
      for (let i = 0; i < chipsList.length; i++) {
        chipsList[i].classList.remove('chip_click')
      }
      this.$store.state.betZone.doBetList.splice(0, this.$store.state.betZone.doBetList.length)
      this.$store.state.betZone.zhixuan_first_select.splice(0, this.$store.state.betZone.zhixuan_first_select.length)
      this.$store.state.betZone.zhixuan_second_select.splice(0, this.$store.state.betZone.zhixuan_second_select.length)
      this.$store.state.betZone.zhixuan_three_select.splice(0, this.$store.state.betZone.zhixuan_three_select.length)
      this.$store.state.betZone.selectedList.splice(0, this.$store.state.betZone.selectedList.length)
      this.$store.state.betZone.isDisabled = false
    },
    chipsClick (index, money, event) { // 点击筹码，增加金额，并且筹码向上移动
      let chipsList = document.getElementsByTagName('li')
      for (let i = 0; i < chipsList.length; i++) {
        chipsList[i].classList.remove('chip_click')
      }
      event.currentTarget.classList.add('chip_click') // 提高筹码高度
      if (this.money === '') {
        this.money = Number(money)
      } else if ((Number(this.money) + Number(money)) > 100000000) {
        this.money = Number(this.money)
      } else {
        this.money = Number(this.money) + Number(money)
      }
    },
    chipClass (item) { // 显示筹码颜色
      return filter.chipClass(item)
    },
    openLuzi () { // 显示路子长龙
      this.$store.state.betZone.syxwLuziShow = true
    },
    orderMethod () { // 校验玩法
      // 先判断是否登录，如果未登录则会直接关闭页面
      window.lotteryMain.isLogin()
      if (this.isLogin) {
        this.nowModel = this.$store.state.site.nowMode
      // 判断直选
        if (this.nowModel === 2110000) {
          let isTrueZhixuan = syxwService.isTrueByZhixuan(this.$store.state.betZone.selectedRule, this.$store.state.betZone.zhixuan_first_select,
                    this.$store.state.betZone.zhixuan_second_select, this.$store.state.betZone.zhixuan_three_select)
          if (!isTrueZhixuan) return false
        }
      // 判断连码
        if (this.nowModel === 2100000) {
          let isTruelianma = syxwService.isTrueBylianma(this.$store.state.betZone.selectedRule, this.$store.state.betZone.selectedList)
          if (!isTruelianma) return false
        }
      // 拼接数据
        if (this.nowModel === 2100000 || this.nowModel === 2110000) {
          this.$store.state.betZone.doBetList = syxwService.newDobetList(this.nowModel, this.$store.state.betZone.selectedRule, this.$store.state.betZone.selectedList,
                        this.$store.state.betZone.zhixuan_first_select, this.$store.state.betZone.zhixuan_second_select, this.$store.state.betZone.zhixuan_three_select)
        } else {
          this.$store.state.betZone.doBetList = this.$store.state.betZone.selectedList
        }
        for (let i = 0; i < this.$store.state.betZone.doBetList.length; i++) { // 将金额放入到对象中 DOTO 放入期数
          this.$set(this.$store.state.betZone.doBetList[i], 'gold', this.money)
        }
        this.doBetList = this.$store.state.betZone.doBetList // 获取投注的列表
        let isCanBet = service.isCanBet(this.logins, this.doBetList, this.$store.state.betZone.bettingState)
        if (!isCanBet) return false

        this.$store.state.site.show = false
      }
      scrollTo(0, 0)
    }
  }
}
</script>
