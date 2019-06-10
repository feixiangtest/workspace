<template>
    <div class="depositMain onlinePmentClass"  v-if="this.payType && this.nowBankType !== 0">
        <div v-if="multiChannelStatus == 1">
          <ul class="payWayList">
            <li v-for='(merchant, index) in this.payType.merchantList' @click="selectChannel(merchant, index)" :key='index' :class="{active:channelIndex === index}">{{merchant.h5ChannelName}}{{index + 1}}</li>
          </ul>
          <p>
          温馨提示：<br />
          单笔支付{{this.minOnlinePay}}-{{this.maxOnlinePay}}元，若该通道无法充值请选择其他通道
          </p>
        </div>
        <dl class="rechargebox">
            <dd v-if="this.multiChannelStatus == 1">
                <div class="item-input">
                    <span class="itemTxt">充值金额</span>
                    <div class="specialbox">
                        <input class="typeinput input-one" type="tel" :placeholder="place" v-model="amount" maxlength="10" @input="inputMoney(amount)" 
                               :disabled="this.payType.merchantList !== undefined && !this.payType.merchantList[channelIndex].isInputMoneyStatus && this.$store.state.payment.isOutreach == 0">
                        <span class="Tspe" v-if="this.payType.merchantList !== undefined && this.isSupportDecimal === 1">{{amountPoint}}</span>
                    </div>
                </div>
                <p class="depTips red" v-if="amountErrFlag">{{this.amountErrMsg}}</p>
                <p class="depTips PaleOrange" v-if="this.payType.merchantList !== undefined && this.isSupportDecimal === 1">为了更快速到账，存款时，自动生成<em>0{{amountPoint}}</em>元</p>
            </dd>
            <dd v-if="this.multiChannelStatus == 0">
                <div class="item-input">
                    <span class="itemTxt">充值金额</span>
                    <div class="specialbox">
                        <input class="typeinput input-one" type="tel" :placeholder="place" v-model="amount" maxlength="10" @input="inputMoney(amount)" 
                               :disabled="this.payType.merchant !== undefined && !this.payType.merchant.isInputMoneyStatus && this.$store.state.payment.isOutreach == 0">
                        <span class="Tspe" v-if="this.payType.merchant !== undefined && this.payType.merchant.isSupportDecimal === 1">{{amountPoint}}</span>
                    </div>
                </div>
                <p class="depTips red" v-if="amountErrFlag">{{this.amountErrMsg}}</p>
                <p class="depTips PaleOrange" v-if="this.payType.merchant !== undefined && this.payType.merchant.isSupportDecimal === 1">为了更快速到账，存款时，自动生成<em>0{{amountPoint}}</em>元</p>
            </dd>
          <!-- 快选 -->
            <dd v-if="this.multiChannelStatus == 0 && this.payType.merchant !== undefined && this.payType.merchant.isShowFastSelectMoney && this.$store.state.payment.isOutreach == 0">
              <div class="item-input quickElect">
                <span v-for="(item, index) in goldList" :key="index" :class="{ 'active': goldActive[index] }" @click="getGlod(index)">{{ item }}</span>
              </div>
            </dd>
            <dd v-if="this.multiChannelStatus == 1 && this.payType.merchantList[channelIndex] !== undefined && this.payType.merchantList[channelIndex].isShowFastSelectMoney && this.$store.state.payment.isOutreach == 0">
              <div class="item-input quickElect">
                <span v-for="(item, index) in goldList" :key="index" :class="{ 'active': goldActive[index] }" @click="getGlod(index)">{{ item }}</span>
              </div>
            </dd>
            <dd v-show="discountFun">
                <div class="item-input">
                    <span class="itemTxt">申请优惠</span>
                    <select class="typeselect select-one" v-model="discount" :disabled="applyDiscount" style="padding-left: 0px;">
                        <option value="1">申请</option>
                        <option value="0">不申请</option>
                    </select>
                    <p class="depTips red">优惠<em>{{offer}}</em>，<em>{{this.payType.codeMultiple}}</em>倍打码</p>
                </div>
            </dd>
        </dl>
        <!--只有网银需要选择bank-->
        <onlineBank v-if="nowBankType === 3"></onlineBank>

        <!--在线文案-->
        <listDeposit></listDeposit>

        <!--确定按钮-->
        <div class="yo-pad10 sureBtn"><button type="button" class="yo-anOne button" @click="payResult()" :class=" amount ? 'canClick': 'notClick'" :disabled="!amount">确定</button></div>
    </div>
</template>

<script>
import quickElect from '@/payment/components/payment/payBody/quickElect'
import onlineBank from '@/payment/components/payment/onlineDeposit/onlineBank'
import listDeposit from '@/payment/components/payment/listDeposit'
import * as cookieUtil from '@/base/utils/cookieUtil'
import * as type from '@/base/store/payment/type'
export default {
  components: {
    onlineBank,
    listDeposit,
    quickElect
  },
  data () {
    return {
      isSupportDecimal: 0, // 多通道时 是否显示小数点
      channelIndex: 0, // 选择通道索引
      minOnlinePay: 0, // 最低充值金额限额
      maxOnlinePay: 0, // 最高充值金额限额
      amount: null, // 金额
      amountErrFlag: false, // 金额提示语状态
      amountErrMsg: '', // 金额提示语
      amountPoint: 0, // 小数点金额
      initialMin: 0.1, // 小数点金额最小值
      initialMax: 0.49, // 小数点金额最大值
      offer: 0, // 优惠金额
      ifFlag: false,
      discount: 1, // 申请优惠，默认选中申请
      isOutreach: '', // 是否启用外链功能
      isOpen: true, // 用于限制点击过快处理
      goldActive: { // 快选金额选中状态
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false
      }
    }
  },
  watch: {
    // 監聽route link 傳進來的參數
    '$route': function (route) {
      this.amountErrFlag = false
      this.initAmtPoint()
      this.amount = null
      this.offer = 0
      this.ifFlag = false
      this.discount = 1
    },
    channelIndex () {
      this.amountErrFlag = false
      this.initAmtPoint()
      this.amount = null
      this.offer = 0
      this.ifFlag = false
      this.discount = 1
    },
    nowBankType () {
      this.channelIndex = 0
      if (this.payType.merchantList && this.payType.merchantList[0]) {
        this.$store.state.payment.merchantListItem = this.payType.merchantList[0]
      }
    }
  },
  methods: {
    // 选择通道
    selectChannel (item, index) {
      this.$store.state.payment.quickPayList = item.fastSelectMoneyList
      this.$store.state.payment.merchantId = item.id
      this.$store.state.payment.merchantListItem = item
      this.isSupportDecimal = item.isSupportDecimal
      this.minOnlinePay = Math.ceil(item.minquota)
      this.maxOnlinePay = Math.ceil(item.quota)
      this.channelIndex = index
    },
    /** 金额输入框判断 */
    inputMoney (amount) {
      if (amount === '') {
        return
      }
      // multiChannelStatus

      let value = amount.replace(/[^0-9]+/g, '')
      this.amount = Number(value)
      // 小数点参数
      let point = parseFloat('0' + this.amountPoint)
      // 优惠信息提示
      point = this.payType.merchant.isSupportDecimal === 0 || this.payType.merchant.isSupportDecimal === '' || !this.payType.merchant.isSupportDecimal ? 0 : point
      // 将金额和小数点相加
      let money = parseFloat(this.amount) + point
      // 计算优惠金额
      let yhMoney = money * parseFloat(this.$store.state.payment.percentageDiscount) / 100
      // 已经优惠次数
      let haveDiscountTimes = this.payType.haveDiscountTimes
      // 优惠次数 类型 0 -首次 1 -每次
      let discountTimes = this.payType.discountTimes
      // 稽核优惠标准
      let auditDiscountStandard = this.payType.auditDiscountStandard
      // 优惠系数 -次数
      let preRatioOnline = this.payType.quantitySet.preRatioOnline
      // 优惠上限
      let preUp = this.payType.preUp
      let minDepositOnline
      let highDepositOnline
      if (this.multiChannelStatus * 1 === 0) {
        // 最低金额
        minDepositOnline = this.payType.quantitySet.minDepositOnline
        // 最高金额
        highDepositOnline = this.payType.quantitySet.highDepositOnline
      }
      if (this.multiChannelStatus * 1 === 1) {
        // 最低金额
        minDepositOnline = Math.ceil(this.$store.state.payment.merchantListItem.minquota)
        // 最高金额
        highDepositOnline = Math.ceil(this.$store.state.payment.merchantListItem.quota)
      }
      // 优惠
      if (preUp <= yhMoney) {
        yhMoney = preUp
      }
      if (discountTimes === 0 || discountTimes === '0') {
        // 判断如果后台设置的是首次存款才有优惠时的处理
        if (haveDiscountTimes === 0 || haveDiscountTimes === '0') {
          if (parseFloat(money) >= auditDiscountStandard) {
            yhMoney = money * parseFloat(this.$store.state.payment.percentageDiscount) / 100
          } else {
            yhMoney = 0
          }
        } else {
          yhMoney = 0
        }
      } else if (discountTimes === 1 || discountTimes === '1') {
        // 每次都有优惠
        if (parseFloat(money) >= auditDiscountStandard) {
          // 次数小于优惠系数
          if (preRatioOnline >= parseInt(haveDiscountTimes) + 1) {
            yhMoney = money * parseFloat(this.$store.state.payment.percentageDiscount) / 100
            if (parseInt(money) > parseInt(highDepositOnline)) {
              yhMoney = (highDepositOnline * parseFloat(this.$store.state.payment.percentageDiscount) / 100)
            }
          } else {
            yhMoney = 0
          }
        } else {
          yhMoney = 0
        }
      }
      if (preUp <= yhMoney) {
        yhMoney = preUp
      }
      if (yhMoney >= 0) {
        this.offer = this.round2(yhMoney)
      }
      // 判断是否符合最大最小金额标准
      // console.log(this.offer)
      if (this.offer !== undefined) {
        if (this.offer === '') {
          return ''
        }
        let amount = this.amount
        let isDecimal = parseFloat(!this.payType.merchant.isSupportDecimal ? 0.0001 : -0.5)
        isDecimal = parseFloat(parseFloat(highDepositOnline) + parseFloat(isDecimal))
        if (this.multiChannelStatus === 0) {
          if (parseFloat(amount) > isDecimal) {
            this.amountErrMsg = '最高金额' + highDepositOnline
            this.amountErrFlag = true
          } else if (parseFloat(amount) < parseFloat(minDepositOnline)) {
            this.amountErrMsg = '最低金额' + minDepositOnline
            this.amountErrFlag = true
          } else {
            this.amountErrFlag = false
            this.amountErrMsg = ''
          }
        }
        if (this.multiChannelStatus === 1) {
          if (parseFloat(amount) > this.maxOnlinePay) {
            this.amountErrMsg = '最高金额' + this.maxOnlinePay
            this.amountErrFlag = true
          } else if (parseFloat(amount) < parseFloat(this.minOnlinePay)) {
            this.amountErrMsg = '最低金额' + this.minOnlinePay
            this.amountErrFlag = true
          } else {
            this.amountErrFlag = false
            this.amountErrMsg = ''
          }
        }
      }
    },
    // 小数点功能函数
    initAmtPoint () {
      // 只有开启小数点时才做处理
      let $this = this
      this.ifFlag = cookieUtil.isRefresh()
      if (this.ifFlag) { // 判断当前时间是否超过了10分钟，如果超过了创建新的小数点
        this.changeAmtPoint()
      } else {
        let val = cookieUtil.getCookie('val')// 小数点金额
        if (cookieUtil.isNullStr(val)) {
          this.changeAmtPoint()
        } else {
          this.putAmtPoint(val)
        }
      }
      window._each(this.goldActive, (val, key) => {
        $this.goldActive[key] = false
      })
    },
    // 当前时间大于进入时间十分钟时重新生成小数点金额
    changeAmtPoint () {
      // 重新赋值小数点金额
      this.amountPoint = cookieUtil.randomPointText(this.initialMin, this.initialMax)
      cookieUtil.setCookie('val', this.amountPoint, 'd1000')
      this.tipMoney()
    },
    putAmtPoint (val) {
      this.amountPoint = val
      cookieUtil.setCookie('val', val, 'd1000')
      this.tipMoney()
    },
    // 小数点优惠提示
    tipMoney () {
      if (this.payType.merchant !== undefined) {
        // 小数点参数
        let point = parseFloat('0' + this.amountPoint)
        // 优惠信息提示
        point = !this.payType.merchant.isSupportDecimal ? 0 : point
        // 将金额和小数点相加
        let money = parseFloat(this.amount) + point
        // 计算优惠金额
        let yhMoney = money * parseFloat(this.$store.state.payment.percentageDiscount) / 100
        // 格式化金额
        yhMoney = this.round2(yhMoney)
        if (this.isFlag && this.payType.merchant.quota >= money && money >= this.payType.quantitySet.minDepositOnline) {
          this.offer = yhMoney
          this.isFlag = false
        }
      }
    },
    /**
    * 数字格式化 2位
    * author: adaf
    */
    round2 (v) {
      let d = parseFloat(v)
      if (isNaN(d)) d = 0.0
      d = Math.floor(d * 100) / 100 // 强制截取2位小数
      return d.toFixed(2) // 保留2位小数
    },
    /*
     * 提交订单接口
     */
    payResult () {
      if (this.isOpen) {
        if (this.amount === null || this.amount === '' || /^\d+\.?\d{0,2}$/.test(this.amount) === false) {
          window.layer.msgWarn('请您输入充值金额！')
          return false
        }
        let minDepositOnline
        let highDepositOnline
        if (this.multiChannelStatus === 0) {
          // 最低金额
          minDepositOnline = parseFloat(this.payType.quantitySet.minDepositOnline)
        // 最高金额
          highDepositOnline = parseFloat(this.payType.quantitySet.highDepositOnline)
        }

        if (this.multiChannelStatus === 1) {
          // 最低金额
          minDepositOnline = Math.ceil(this.$store.state.payment.merchantListItem.minquota)
          // 最高金额
          highDepositOnline = Math.ceil(this.$store.state.payment.merchantListItem.quota)
        }

        this.amount = parseFloat(this.amount)
        // 是否启用小数点
        if (this.payType.merchant.isSupportDecimal === 1) {
          if ((minDepositOnline - 0.0001) >= this.amount || this.amount >= (highDepositOnline - 0.5)) {
            window.layer.msgWarn('您输入的金额有误！')
            return false
          }
        }
        if (this.isSupportDecimal === 1) {
          if ((minDepositOnline - 0.0001) >= this.amount || this.amount >= (highDepositOnline - 0.5)) {
            window.layer.msgWarn('您输入的金额有误！')
            return false
          }
        }

        if (this.amount > highDepositOnline || this.amount < minDepositOnline) {
          window.layer.msgWarn('您输入的金额有误！')
          return false
        }
        if (this.type === '2') {
          window.layer.msgWarn('线上充值不对测试账号开放！')
          return false
        }
        let merchantId = null

        if (this.multiChannelStatus * 1 === 0) {
          merchantId = this.payType.merchant.id
        }
        if (this.multiChannelStatus * 1 === 1) {
          merchantId = this.getStoreMerchantId
        }

        let param = {
          multiChannelStatus: this.multiChannelStatus,
          youhui: this.discount, // 是否选择优惠
          amount: this.amount,
          amountPoint: !this.payType.merchant.isSupportDecimal ? 0 : this.amountPoint,
          bankkey: this.bankkey,
          banktype: this.nowBankType,
          isOutreach: this.payType.merchant.isOutreach,
          merchantId: merchantId
        }
        // APP传递token
        if (window.myNative && window.myNative.isApp && window.myNative.isApp()) {
          param.memberToken = window.myNative.getMemberToken()
        } else { // 兼容之前APP版本
          let mt = localStorage.getItem('memberToken')
          if (mt) {
            param.memberToken = mt
          }
        }
        if (!window.navigator.onLine) {
          window.layer.msgWarn('网络连接中断，请检查您的网络！')
        } else {
          this.$store.dispatch(type.SAVE_PAY_RESULT_ACTION, param).then(res => {
            if (res.status === '1') {
              window.store.state.payment.payResult = res.data
              window.indexMain.showLoading() // payResult文件很大，第一次加载时会有点慢
              this.$router.push('/' + window.moduleRouter._payKey + '/payResult')
            } else {
              return false
            }
          }).catch(res => {
            console.log(' INITPAYMENT store error')
          })
          // 限制两秒才允许再次点击
          this.isOpen = false
          setTimeout(() => {
            this.isOpen = true
          }, 1500)
        }
      }
    },
    // 点击快选金额
    getGlod (index) {
      let $this = this
      window._each(this.goldActive, (val, key) => {
        $this.goldActive[key] = false
        if (key * 1 === index) $this.goldActive[key] = true
      })
      this.amount = this.goldList[index]
      this.inputMoney(this.amount + '')
    }
  },
  computed: {
    getStoreMerchantId () {
      return this.$store.state.payment.merchantId
    },
    nowBankType () {
      if (this.$store.state.payment.bankType * 1 === 3) {
        this.$store.state.payment.merchantListItem = this.payType.merchantList[0]
      }
      return this.$store.state.payment.bankType
    },
    multiChannelStatus () { // 是否开启多通道  0 表示单通道  1表示多通道  提交时需要传给后端
      return this.$store.state.payment.multiChannelStatus
    },
    payType () { // 当前选中的支付
      if (this.$store.state.payment.payType && this.$store.state.payment.payType.merchantList && this.$store.state.payment.payType.merchantList[0]) {
        this.minOnlinePay = Math.ceil(this.$store.state.payment.payType.merchantList[0].minquota)
        this.maxOnlinePay = Math.ceil(this.$store.state.payment.payType.merchantList[0].quota)
        this.isSupportDecimal = this.$store.state.payment.payType.merchantList[0].isSupportDecimal
        this.$store.state.payment.merchantId = this.$store.state.payment.payType.merchantList[0].id
      }
      return this.$store.state.payment.payType
    },
    bankkey () { // 当前选中的支付bankkey
      return this.$store.state.payment.bankkey
    },
    type () {
      return this.$store.state.home.type
    },
    /**
     * 计算是否显示优惠
     */
    discountFun () {
      // 判断是否首次优惠，如果是首次优惠则根据用户存款次数显示优惠框，否则不显示优惠框
      let discountTimes = this.payType.discountTimes
      // 用户已存款次数
      let haveDiscountTimes = this.payType.haveDiscountTimes
      if (discountTimes === 0 || discountTimes === '0') {
        console.log(haveDiscountTimes)
        // 判断如果后台设置的是首次存款才有优惠时的处理
        if (haveDiscountTimes !== '0') {
          // 隐藏优惠
          return false
        } else {
          return true
        }
      } else if (discountTimes === 1 || discountTimes === '1') {
        // 代理后台设置的可优惠次数
        let preRatioOnline = this.payType.quantitySet.preRatioOnline
        // 非首次
        if (preRatioOnline < parseInt(haveDiscountTimes) + 1) {
          // 隐藏优惠
          return false
        } else {
          return true
        }
      }
    },
    place () { // 提示语
      if (this.payType.merchant !== undefined && !this.payType.merchant.isInputMoneyStatus && !this.goldList.length && this.$store.state.payment.isOutreach === '0') {
        return '无可用快选金额，请联系客服！'
      }
      if (this.payType.merchant !== undefined && !this.payType.merchant.isInputMoneyStatus && this.goldList && this.goldList.length) {
        return '请选择下方快选金额'
      }
      if (this.payType.quantitySet !== null && this.payType.quantitySet !== undefined && this.multiChannelStatus === 0) {
        return '请输入' + this.payType.quantitySet.minDepositOnline + '-' + this.payType.quantitySet.highDepositOnline + '元'
      }
      if (this.multiChannelStatus * 1 === 1) {
        return '请输入' + this.minOnlinePay + '-' + this.maxOnlinePay + '元'
      }
      return null
    },
    goldList () { // 快选金额列表
      let newList = []
      let $this = this
      window._each(this.$store.state.payment.quickPayList, (val, key) => {
        if ($this.multiChannelStatus * 1 === 0 && val >= $this.payType.quantitySet.minDepositOnline && val <= $this.payType.quantitySet.highDepositOnline) {
          newList.push(val)
        }
        // debugger
        console.log($this.multiChannelStatus, 'multiChannelStatus')
        console.log($this.$store.state.payment, 'merchantListItem')
        if ($this.multiChannelStatus * 1 === 1 && val >= $this.$store.state.payment.merchantListItem.minquota && val <= $this.$store.state.payment.merchantListItem.quota) {
          newList.push(val)
        }
      })
      return newList
    },
    /**
     * 用于判断是否可以放弃优惠
     */
    applyDiscount () {
      // 0:不可放弃
      let preDepositStatusOnline = this.payType.preDepositStatusOnline
      if (preDepositStatusOnline === '0') {
        // 不可放弃优惠 默认选中优惠 不可选
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    this.initAmtPoint()
    window.indexMain.closeFixed('.onlinePmentClass input', '.yo-pad10.sureBtn') // input聚焦时，取消底部确定按钮Fixed定位
  }
}
</script>
