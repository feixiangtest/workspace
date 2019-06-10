<template>
<nav class="tabs tabs-icon-top tabs-dark clearfix" id="betfooter" betfootera="">
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
import * as sscService from '../../../service/betService/sscService'
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
    lotteyrId () {
      return this.$store.state.site.lotteryId
    },
    lotteryCode () {
      // 获取彩票游戏的简写如bjsc
      let path = this.$route.fullPath.split('/')
      return path[2]
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
      this.$set(this.$store.state.betZone, 'mmcChipMoney', this.money)
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
      window.lotteryMain.clearDoBetList() // 清除下注信息
      this.$set(this.$store.state.betZone, 'prelist', [])
      this.$set(this.$store.state.betZone, 'midlist', [])
      this.$set(this.$store.state.betZone, 'afterlist', [])
      this.$set(this.$store.state.betZone, 'mmcChipMoney', 0)
    },
    chipsClick (index, item, event) { // 点击筹码，增加金额，并且筹码向上移动
      let chipsList = document.getElementsByTagName('li')
      for (let i = 0; i < chipsList.length; i++) {
        chipsList[i].classList.remove('chip_click')
      }
      event.currentTarget.classList.add('chip_click') // 提高筹码高度
      if (this.money === '') {
        this.money = Number(item)
      } else if ((Number(this.money) + Number(item)) > 100000000) {
        this.money = Number(this.money)
      } else {
        this.money = Number(this.money) + Number(item)
      }
      this.$set(this.$store.state.betZone, 'mmcChipMoney', this.money)
    },
    chipClass (item) { // 显示筹码颜色
      return filter.chipClass(item)
    },
    orderMethod () { // 校验玩法
      // 先判断是否登录，如果未登录则会直接关闭页面
      window.lotteryMain.isLogin()
      if (this.isLogin) {
        this.nowModel = this.$store.state.site.nowMode
      // 判断组三，组六是否满足
        let isSureByZuSanZuLiu =
            sscService.isSureByZuSanZuLiu(this.nowModel, this.$store.state.betZone.prelist, this.$store.state.betZone.midlist, this.$store.state.betZone.afterlist)

        if (!isSureByZuSanZuLiu) return false

       // 拼接组三，组六数据
        if (this.nowModel === 2391000 || this.nowModel === 2392000) {
        // 获取赔率
        /** 秒秒彩用的是一分时时彩的赔率，所以这里获取赔率的时候，拿的是一分时时彩的 */
          let oddsObject = JSON.parse(localStorage.getItem('YFSSC_BETH5_' + this.nowModel + '_SPECIAL'))
          this.$store.state.betZone.doBetList = sscService.newDobetList(this.nowModel, oddsObject, this.$store.state.betZone.prelist, this.$store.state.betZone.midlist, this.$store.state.betZone.afterlist)
        }
        this.doBetList = this.$store.state.betZone.doBetList // 获取投注的列表
        for (let i = 0; i < this.$store.state.betZone.doBetList.length; i++) { // 将金额放入到对象中 DOTO 放入期数
          // this.$store.state.betZone.doBetList[i]['gold'] = this.money
          this.$set(this.$store.state.betZone.doBetList[i], 'gold', this.money)
        }
        let isCanBet = service.isCanBet(this.logins, this.doBetList, 1)
        if (!isCanBet) return false

        this.$store.state.site.show = false
      }
      scrollTo(0, 0)
    }
  }
}
</script>
