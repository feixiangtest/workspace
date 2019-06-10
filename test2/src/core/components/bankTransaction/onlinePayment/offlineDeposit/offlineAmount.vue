<template>
    <div page="offline">
        <div class="formItem">
            <span class="formTile"><span class="orange">*</span> 入款金额：</span>
            <div class="formInline">
              <div class="el-input el-input--medium">
                <input class="el-input__inner" type="text"
                    :placeholder="place" v-model="amount"
                    @input="inputMoney(amount)" maxlength="14"
                    :class="amountErrFlag?'error':''"/>
                <span class="drawErr" v-if="amountErrFlag">
                    <i class="yo-plaintFull el-icon-plaintFull"></i>
                    <span class="orange">{{amountErrMsg}}</span>
                </span>
              </div>
            </div>
        </div>
        <div class="formItem" v-show="discountFun">
            <span class="formTile"><span class="orange">*</span> 申请优惠：</span>
            <div class="formInline">
                <el-select placeholder="申请优惠"
                    v-model="discount" :disabled="applyDiscount" @change="toDiscount()">
                    <el-option label="申请" value="1" key="申请"></el-option>
                    <el-option label="不申请" value="0" key="不申请"></el-option>
                </el-select>
                <span>
                    <span class="inferior">
                        （优惠<font class="orange">{{offer}}</font>,<font class="orange">{{this.payType.codeMultiple}}</font>倍打码）
                    </span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        amount: null,
        amountErrFlag: false, // 金额提示语状态
        amountErrMsg: '', // 金额提示语
        offer: 0, // 优惠金额
        discount: '申请' // 申请优惠，默认选中申请
      }
    },
    watch: {
      amount () {
        this.$emit('toAmount', this.amount)
      }
    },
    methods: {
      /** 金额输入框判断 */
      inputMoney (amount) {
        if (amount === '' || amount === null) {
          this.amount = null
          this.amountErrMsg = '请您输入充值金额'
          this.amountErrFlag = true
          return
        }
        let value = amount.replace(/[^\d.]/g, '') // 清除"数字"和"."以外的字符
        if (value === '' || value === null) {
          this.amount = null
          this.amountErrMsg = '请您输入充值金额'
          this.amountErrFlag = true
          return
        }
        value = value.replace(/^\./g, '') // 验证第一个字符是数字而不是
        value = value.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
        value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
        value = (value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
        value = value.trim() // 去掉空格
        if (value !== '') { // 去掉前缀多出的0
          var nmArr = value.split('.')
          if (nmArr[0] !== '') {
            nmArr[0] = Number(nmArr[0])
          }
          value = nmArr.join('.')
        }
        this.amount = value
        // todo 是否存在 小数点情况？
        // 优惠信息提示
        let money = parseFloat(this.amount)
        // 计算优惠金额
        let yhMoney = money * parseFloat(this.payType.percentageDiscount) / 100
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
        let minDepositCompany = this.payType.deposite.min
        // 最高金额
        let highDepositCompany = this.payType.deposite.max
        // 优惠
        if (preUp <= yhMoney) {
          yhMoney = preUp
        }
        if (discountTimes === 0 || discountTimes === '0') {
        // 判断如果后台设置的是首次存款才有优惠时的处理
          if (haveDiscountTimes === 0 || haveDiscountTimes === '0') {
            if (parseFloat(money) >= auditDiscountStandard) {
              yhMoney = money * parseFloat(this.payType.percentageDiscount) / 100
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
              yhMoney = money * parseFloat(this.payType.percentageDiscount) / 100
              if (parseInt(money) > parseInt(highDepositCompany)) {
                yhMoney = (highDepositCompany * parseFloat(this.payType.percentageDiscount) / 100)
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
          this.offer = this.round2(yhMoney, 2)
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
       * 数字格式化 2位
       * author: adaf
       */
      round2 (v, e) {
        let d = parseFloat(v)
        if (isNaN(d))d = 0.0
        return Math.floor(d * 100) / 100
      }
    },
    computed: {
      ...mapState({
        payType: state => state.payment.payType,
        bankList: state => state.payment.bankList,
        listDeposit: state => state.payment.listDeposit,
        depositMap: state => state.payment.depositMap,
        bankType: state => state.payment.bankType,
        companyAccount: state => state.payment.companyAccount,
        offlineDeposit: state => state.payment.offlineDeposit
      }),
      place () { // 提示语
        let {min, max} = this.payType.deposite
        if (min >= 0 && max >= 0) {
          return '请输入' + min + '-' + max + '元'
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
        if (this.payType.quantitySet) {
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
      }
    }
  }
</script>
