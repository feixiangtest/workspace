<template>
    <div class="tab-nav onlineMenu" style="padding:0;padding-bottom:5px">
        <ul class="payListUl" v-for="(item1, idx1) in payMentList" v-if="idx1 < 2 ? true : showMorePayType">
          <li v-for="(item2,index) in item1" class="payListLi" :class="{active: item2.active}" @click="goPay(item2, item2.depositType, item2.bankType, item2.id)">
            <img class="rightTop" :src="item2.cornerMark ? commonImgUrl + '/newPayment/' + corner[item2.cornerMark] + '.png' : ''" v-if = "item2.cornerMark">
            <img :src="item2.bankType == 1000 ? staticDomain + item2.pictureAddress : commonImgUrl + '/newPayment/' + item2.pictureAddress" ><br/>
            <span style="font-size:12px" v-html="nameFilter(item2.rechargeName)"></span>
          </li>
          <li v-if="idx1 == 1 && payMentList.length > 2" @click="showMore()" class="payListLi">
            <img :src="commonImgUrl + '/newPayment/more.png'" class="narrow" :class="showMorePayType ? 'ups':''"></br>
            <span style="font-size:12px">更多</span>
          </li>
        </ul>
    </div>
</template>

<script>
export default {
  data () {
    return {
      corner: ['', 'fast', 'safe', 'win', 'hot', 'fire', 'big'], // 角标对应图片
      showMorePayType: false,
      innerWidth: window.innerWidth
    }
  },
  methods: {
    goPay (item, type, code, id) { // 支付跳转函数
      for (let i = 0; i < this.payMentList.length; i++) {
        for (let j = 0; j < this.payMentList[i].length; j++) {
          this.payMentList[i][j].active = false
          if (code !== 1000 && code === this.payMentList[i][j].bankType) {
            this.payMentList[i][j].active = true
          }
          if (code === 1000 && id === this.payMentList[i][j].id) {
            this.payMentList[i][j].active = true
          }
        }
        this.$set(this.$store.state.payment.allPayMentList, i, this.payMentList[i])
      }
      this.$store.state.payment.percentageDiscount = item.percentageDiscount || 0
      if (code === 1000 || code === '1000') {
        this.$store.state.payment.bankType = 0
        this.$store.state.payment.bankkey = ''
        let param = { 'id': item.id }
        // APP传递token
        if (window.myNative && window.myNative.isApp && window.myNative.isApp()) {
          param.memberToken = window.myNative.getMemberToken()
        } else { // 兼容之前APP版本
          let mt = localStorage.getItem('memberToken')
          if (mt) {
            param.memberToken = mt
          }
        }
        window.router.push('/' + window.moduleRouter._payKey + '/payment')
        if (item.protocol && item.website) {
          window.indexMain.toggleLoading(true) // 显示loading，不能使用store.state.home.showLoading=true来显示，因为接口是同步
          setTimeout(() => { // 添加setTimeout主要为了能够显示loading
            let customPayUrl = ''
            window.$.ajax({
              url: '/api/wap/pay/checkCustomPayUrl',
              type: 'POST',
              cache: false,
              async: false, // 同步，主要是为了后面的window.open不被拦截，window.open必须是用户点击之后触发才不被拦截
              dataType: 'json',
              contentType: 'application/json',
              data: JSON.stringify(param),
              success: (res) => {
                if (res && res.status === '1' && res.data) {
                  customPayUrl = res.data
                }
              }
            })
            window.indexMain.toggleLoading(false) // 隐藏loading
            if (customPayUrl) {
              // 是否APP
              if (window.myNative && window.myNative.isApp && window.myNative.isApp()) {
                window.myNative.popToThirdApp && window.myNative.popToThirdApp(customPayUrl) // 打开自定义支付url
              } else { // H5
                window.open(customPayUrl) // 打开自定义支付url
              }
            }
          }, 0)
        }
      } else {
          // 文案处理
        this.$store.state.payment.percentageDiscount = item.percentageDiscount
        console.log(item.percentageDiscount)
        if (this.$store.state.payment.listDeposit) {
          this.$store.state.payment.official = this.$store.state.payment.listDeposit[item.code]
        } else {
          this.$store.state.payment.official = {}
        }
          //  清空当前的支付方式
        this.$store.state.payment.payType = {}
        this.$store.state.payment.isOnline = type

          // 线上线下分别处理
        if (type === 1 || type === '1') {
          this.goBank(code, item.code)
          this.$store.state.payment.iconName = item.incomeName // 线下支付昵称
          this.$store.state.payment.bankkey = 'bankPay' // 支付编码
          this.$store.state.payment.quickPayList = item.fastSelectMoneyList // 快选金额处理
          this.$store.state.payment.showQuiMoney = item.isShowFastSelectMoney // 是否显示快选金额
        } else {
          if (this.depositMap[item.bankKey]) { // 当前支付类型
            this.$store.state.payment.payType = this.depositMap[item.bankKey]
            this.$store.state.payment.bankType = this.$store.state.payment.payType.banktype
            // 多通道时用到
            if (this.depositMap[item.bankKey].merchantList) {
              this.$store.state.payment.merchantListItem = this.depositMap[item.bankKey].merchantList[0]
            }
          }
          this.$store.state.payment.isOutreach = item.isOutreach ? item.isOutreach : '0' // 是否外链
          this.$store.state.payment.bankkey = item.bankKey // 支付编码
          // 快选金额处理
          this.$store.state.payment.quickPayList = this.$store.state.payment.payType.merchant.fastSelectMoneyList
          window.router.push('/' + window.moduleRouter._payKey + '/payment/onlinePay?bankType=' + item.bankType)
        }
      }
      this.showMorePayType = false
    },
    goBank (banktype, code) { // 跳转线下支付
      if (!this.companyAccount) {
        return
      }
      // 存储当前的支付方式注释
      this.$store.state.payment.payType = this.depositMap.bankPay
      this.$store.state.payment.bankType = banktype

      // 多个支付账号存在时，默认选中第一个
      for (let i = 0; i < this.companyAccount.length; i++) {
        if (banktype === 16) {
          // isbank等于 0 的都是银行
          if (this.companyAccount[i].isbank === 0) {
            this.$store.state.payment.offlineDeposit = this.companyAccount[i]
            break
          }
        } else {
          if (banktype === this.companyAccount[i].bankId && this.companyAccount[i].isbank !== 0) {
            this.$store.state.payment.offlineDeposit = this.companyAccount[i]
            break
          }
        }
      }
      window.router.push('/' + window.moduleRouter._payKey + '/payment/bankPay?bankType=' + banktype)
    },
    showMore () { // 点击更多
      this.showMorePayType = !this.showMorePayType
    },
    nameFilter (names) { // 支付名称换行
      if (names) {
        let len = String(names).length
        let maxLen = len > 8 ? 8 : len
        if (len > 4) {
          return String(names).slice(0, 5) + '</br>' + String(names).slice(5, maxLen)
        } else {
          return names
        }
      } else {
        return ''
      }
    }
  },
  watch: {
    payMentList () { // 支付列表，包括默认和更多
      return this.$store.state.payment.allPayMentList
    }
  },
  computed: {
    payMentList () { // 支付列表，包括默认和更多
      return this.$store.state.payment.allPayMentList
    },
    companyAccount () { // 支付账户列表
      return this.$store.state.payment.companyAccount
    },
    listDeposit () { // 文案
      return this.$store.state.payment.listDeposit
    },
    depositMap () { // 支付数据体
      return this.$store.state.payment.depositMap
    },
    commonImgUrl () { // 公共图片路径
      return this.$store.state.home.commonImgUrl
    },
    staticDomain () {
      return this.$store.state.home.staticDomain
    }
  }
}
</script>
