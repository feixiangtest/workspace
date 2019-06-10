<template>
    <!--公共的金额和优惠活动组件-->
    <div>
        <dd>
            <div class="item-input">
                <span class="itemTxt"><i class="red">*</i>充值金额</span>
                <div class="specialbox">
                    <input v-if="!inputMoneyFlag" class="typeinput input-one" type="tel" :placeholder="place" v-model="amount" maxlength="13" @input="inputMoney(amount)">
                    <input v-if="inputMoneyFlag" class="typeinput input-one" type="text" :placeholder="place" v-model="amount" maxlength="13" @input="inputMoney(amount)">
                </div>
            </div>
            <p class="depTips red" v-if="amountErrFlag">{{this.amountErrMsg}}</p>
        </dd>
        <!-- 快选 -->
        <dd v-if="showQuiMoney">
          <div class="item-input quickElect">
            <span v-for="(item, index) in goldList" :key="index" :class="{ 'active': goldActive[index] }" @click="getGlod(index)">{{ item }}</span>
          </div>
        </dd>
        <dd v-show="discountFun">
            <div class="item-input">
                <span class="itemTxt">&nbsp;&nbsp;申请优惠</span>
                <select class="typeselect select-one" v-model="discount" :disabled="applyDiscount" @change="toDiscount()">
                    <option value="1">申请</option>
                    <option value="0">不申请</option>
                </select>
                <p class="depTips red">优惠<em>{{offer}}</em>，<em>{{this.payType.codeMultiple}}</em>倍打码</p>
            </div>
        </dd>
    </div>
</template>

<script>
import quickElect from '@/payment/components/payment/payBody/quickElect'
export default {
  components: {
    quickElect
  },
  data () {
    return {
      amount: null,
      amountErrFlag: false, // 金额提示语状态
      amountErrMsg: '', // 金额提示语
      offer: 0, // 优惠金额
      discount: 1, // 申请优惠，默认选中申请
      goldActive: { // 快选金额选中状态
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false
      },
      inputMoneyFlag: null
    }
  },
  created () {
    this.inputMoneyFlag = window.indexMain.isIos
  },
  methods: {
    /** 金额输入框判断 */
    inputMoney (amount) {
      let value = amount.replace(/[^\d.]/g, '') // 清除"数字"和"."以外的字符
      value = value.replace(/^\./g, '') // 验证第一个字符是数字而不是
      value = value.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
      value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
      value = value.trim() // 去掉空格
      value = value.match(/^\d*(\.?\d{0,2})/g)[0] // 小数点后限制两位数字
      if (value !== '') { // 去掉前缀多出的0
        var nmArr = value.split('.')
        if (nmArr[0] !== '') {
          nmArr[0] = Number(nmArr[0])
        }
        value = nmArr.join('.')
      }
      this.amount = value
      // 优惠信息提示
      let money = parseFloat(this.amount)
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
      // 最低金额
      let minDepositCompany = this.payType.quantitySet.minDepositCompany
      // 最高金额
      let highDepositCompany = this.payType.quantitySet.highDepositCompany
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
            if (parseInt(money) > parseInt(highDepositCompany)) {
              yhMoney = (highDepositCompany * parseFloat(this.$store.state.payment.percentageDiscount) / 100)
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
      if (this.offer !== undefined) {
        if (this.offer === '') {
          return ''
        }
      }
      if (parseFloat(this.amount) > highDepositCompany) {
        this.amountErrMsg = '最高金额' + highDepositCompany
        this.amountErrFlag = true
      } else if (parseFloat(this.amount) < parseFloat(minDepositCompany)) {
        this.amountErrMsg = '最低金额' + minDepositCompany
        this.amountErrFlag = true
      } else {
        this.amountErrFlag = false
        this.amountErrMsg = ''
      }
      // 向父组件传输金额
      this.$emit('toAmount', this.amount)
    },
    /**
     * 0：不申请优惠，1：申请优惠
     */
    toDiscount () { // 向父组件传输是否选中优惠
      this.$emit('toDiscount', this.discount)
    },
    /**
     * 数字格式化 截取2位
     * author: adaf
     */
    round2 (v) {
      let d = parseFloat(v)
      if (isNaN(d)) d = 0.0
      d = Math.floor(d * 100) / 100 // 强制截取2位小数
      return d.toFixed(2) // 保留2位小数
    },
    // 点击快选金额
    getGlod (index) {
      let $this = this
      window._each(this.goldActive, (val, key) => {
        $this.goldActive[key] = false
        if (key * 1 === index) $this.goldActive[key] = true
      })
      this.amount = this.goldList[index]
      this.inputMoney(this.amount + '') // 手动触发input事件
    }
  },
  computed: {
    place () { // 提示语
      if (this.payType.quantitySet !== null && this.payType.quantitySet !== undefined) {
        return '请输入' + this.payType.quantitySet.minDepositCompany + '-' + this.payType.quantitySet.highDepositCompany + '元'
      }
      return null
    },
    payType () { // 当前选中的支付
      return this.$store.state.payment.payType
    },
    quickAmount () { // 快选金额
      return this.$store.state.payment.quickPayList
    },
    /**
     * 计算是否显示优惠
     */
    discountFun () {
      // 判断是否首次优惠，如果是首次优惠则根据用户存款次数显示优惠框，否则不显示优惠框
      let discountTimes = this.payType.discountTimes
      // 用户已存款次数
      let haveDiscountTimes = this.payType.haveDiscountTimes
      // 代理后台设置的可优惠次数
      let preRatioOnline = this.payType.quantitySet.preRatioOnline
      if (discountTimes === 0 || discountTimes === '0') {
        // 判断如果后台设置的是首次存款才有优惠时的处理
        if (haveDiscountTimes !== '0') {
          // 隐藏优惠
          return false
        } else {
          return true
        }
      } else if (discountTimes === 1 || discountTimes === '1') {
        // 非首次
        if (preRatioOnline < parseInt(haveDiscountTimes) + 1) {
          // 隐藏优惠
          return false
        } else {
          return true
        }
      }
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
    },
    goldList () { // 快选金额列表
      let newList = []
      let $this = this
      window._each(this.$store.state.payment.quickPayList, (val, key) => {
        if (val >= $this.payType.quantitySet.minDepositCompany && val <= $this.payType.quantitySet.highDepositCompany) {
          newList.push(val)
        }
      })
      return newList
    },
    showQuiMoney () { // 是否显示快选金额
      return this.$store.state.payment.showQuiMoney
    }
  },
  watch: {
    goldList () {
      let $this = this
      window._each(this.goldActive, (val, key) => {
        $this.goldActive[key] = false
      })
    },
    payType () { // 切换支付时，金额初始化
      this.amount = ''
      this.$emit('toAmount', this.amount)
    }
  },
  mounted () {
  }
}
</script>
