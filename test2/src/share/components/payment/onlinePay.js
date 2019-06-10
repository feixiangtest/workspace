/**
 * 依赖关系：
 * 导入： 无
 * 导出： 有公用
 * 注意： h5和PC公用逻辑，请注意影响
 * webpack build: 影响 需 依赖build
 *
 * 支付公共逻辑处理体
 */
import { mapState } from 'vuex'
import * as cookieUtil from '@s/utils/cookieUtil'
export default {
  data () {
    return {
      cookieUtils: cookieUtil
    }
  },
  methods: {
    toNumber (v) {
      this[v] = this[v].toString().replace(/[^\d]+/g, '').slice(0, 14)
    },
    // 输入框有空格将会被清空
    noSpace (v) {
      this[v] = this[v].toString().replace(/\s+/g, '')
    },
    /** 金额输入框判断 */
    inputMoney (amount) {
      if (amount === '') {
        this.amount = null
        this.amountErrMsg = '请您输入充值金额'
        this.amountErrFlag = true
        return
      }
      // let value = amount.replace(/[^0-9]+/g, '')
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
      value = value.trim() // 去掉空格
      if (value !== '') { // 去掉前缀多出的0
        var nmArr = value.split('.')
        if (nmArr[0] !== '') {
          nmArr[0] = Number(nmArr[0])
        }
        value = nmArr.join('.')
      }
      this.amount = Number(value)
      // 小数点参数
      let point = parseFloat('0' + this.amountPoint)
      let depositListVo = this.payType.depositListVo
      // 优惠信息提示
      point = depositListVo.merchant.isOpenPointAmount * 1 === 0 || depositListVo.merchant.isOpenPointAmount === '' ? 0 : point
      // 将金额和小数点相加
      let money = parseFloat(this.amount) + point
      // 计算优惠金额
      let yhMoney = money * parseFloat(this.onlineCodeQuantitySet.percentageDiscount) / 100
      // 已经优惠次数
      let haveDiscountTimes = this.onlineCodeQuantitySet.haveDiscountTimes
      // 优惠次数 类型 0 -首次 1 -每次
      let discountTimes = this.onlineCodeQuantitySet.discountTimes
      // 稽核优惠标准
      let auditDiscountStandard = this.onlineCodeQuantitySet.auditDiscountStandard
      // 优惠系数 -次数
      let preRatioOnline = this.onlineCodeQuantitySet.preRatioOnline
      // 优惠上限
      let preUp = this.onlineCodeQuantitySet.preUp
      // 最低金额
      let minDepositOnline = this.payType.deposite.min
      // 最高金额
      let highDepositOnline = this.payType.deposite.max
      // 优惠
      if (preUp <= yhMoney) {
        yhMoney = preUp
      }
      if (discountTimes === 0 || discountTimes === '0') {
        // 判断如果后台设置的是首次存款才有优惠时的处理
        if (haveDiscountTimes === 0 || haveDiscountTimes === '0') {
          if (parseFloat(money) >= auditDiscountStandard) {
            yhMoney = money * parseFloat(depositListVo.percentageDiscount) / 100
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
            yhMoney = money * parseFloat(this.onlineCodeQuantitySet.percentageDiscount) / 100
            if (parseInt(money) > parseInt(highDepositOnline)) {
              yhMoney = (highDepositOnline * parseFloat(this.onlineCodeQuantitySet.percentageDiscount) / 100)
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
      // 优惠可能等于 0
      if (this.offer !== undefined) {
        if (this.offer === '') {
          return ''
        }
        // 小数点 开启 情况 money 已经计算
        if (money > highDepositOnline) {
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
      if (this.payType.typeCode === 1) {
        this.changeBank(this.bankKey)
      }
    },
    // 小数点优惠提示
    tipMoney () {
      if (this.payType.depositListVo) {
        // 小数点参数
        let point = parseFloat('0' + this.amountPoint)
        // 优惠信息提示
        point = this.payType.depositListVo.merchant.isOpenPointAmount === '0' ? 0 : point
        // 将金额和小数点相加
        let money = parseFloat(this.amount) + point
        // 计算优惠金额
        let yhMoney = money * parseFloat(this.onlineCodeQuantitySet.percentageDiscount) / 100
        // 格式化金额
        yhMoney = this.round2(yhMoney, 2)
        if (this.isFlag && this.payType.depositListVo.merchant.quota >= money && money >= this.payType.deposite.min) {
          this.offer = yhMoney
          this.isFlag = false
        }
      }
    },
    // 小数点功能函数
    initAmtPoint () {
      // 只有开启小数点时才做处理
      this.ifFlag = this.cookieUtils.isRefresh()
      if (this.ifFlag) { // 判断当前时间是否超过了10分钟，如果超过了创建新的小数点
        this.changeAmtPoint()
      } else {
        let val = this.cookieUtils.getCookie('val')// 小数点金额
        if (this.cookieUtils.isNullStr(val)) {
          this.changeAmtPoint()
        } else {
          this.putAmtPoint(val)
        }
      }
    },
    // 当前时间大于进入时间十分钟时重新生成小数点金额
    changeAmtPoint () {
      // 重新赋值小数点金额
      this.amountPoint = cookieUtil.randomPointText(this.initialMin, this.initialMax)
      this.cookieUtils.setCookie('val', this.amountPoint, 'd1000')
      this.tipMoney()
    },
    putAmtPoint (val) {
      this.amountPoint = val
      this.cookieUtils.setCookie('val', val, 'd1000')
      this.tipMoney()
    },
    /**
    * 数字格式化 2位
    * author: adaf
    */
    round2 (v, e) {
      let d = parseFloat(v)
      if (isNaN(d))d = 0.0
      return Math.floor(d * 100) / 100
    },
    changeQuickPrice (index, amount) {
      this.curQuickPrice = index
      this.amount = amount
      // 计算优惠
      this.inputMoney(amount)
    }
  },
  computed: {
    ...mapState({
      account: state => state.member.account,
      payType: state => state.payment.payType,
      bankkey: state => state.payment.bankkey,
      bankType: state => state.payment.bankType,
      official: state => state.payment.official,
      onlineCodeQuantitySet: state => state.payment.onlineCodeQuantitySet
    }),
    place () { // 充值金额（元） 提示语
      let {min, max} = this.payType.deposite
      if (min >= 0 && max >= 0) {
        return '请输入' + min + '-' + max + '元'
      }
      return null
    },
    /**
     * 计算是否显示优惠
     */
    discountFun () {
      if (this.onlineCodeQuantitySet) {
        // 判断是否首次优惠，如果是首次优惠则根据用户存款次数显示优惠框，否则不显示优惠框
        let discountTimes = this.onlineCodeQuantitySet.discountTimes
        // 用户已存款次数
        let haveDiscountTimes = this.onlineCodeQuantitySet.haveDiscountTimes
        // 用户每天的存款次数
        let haveDayDiscountTimes = this.onlineCodeQuantitySet.haveDayDiscountTimes
        // 代理后台设置的可优惠次数
        let preRatioOnline = this.onlineCodeQuantitySet.preRatioOnline
        // discountTimes: 0 首次，1 每次，2 不优惠，3 前N次，4 每天前N次（原有字段）
        if (discountTimes === 0 || discountTimes === '0') {
          console.log(haveDiscountTimes)
          // 判断如果后台设置的是首次存款才有优惠时的处理
          if (haveDiscountTimes !== '0') {
          // 隐藏优惠
            return false
          } else {
            return true
          }
        } else if (discountTimes === 1 || discountTimes === '1') { // 每次都优惠
          return true
        } else if (discountTimes === 2 || discountTimes === '2') { // 不优惠
          return false
        } else if (discountTimes === 3 || discountTimes === '3') { // 前N次
          // 非首次
          if (preRatioOnline < parseInt(haveDiscountTimes) + 1) {
          // 隐藏优惠
            return false
          } else {
            return true
          }
        } else if (discountTimes === 4 || discountTimes === '4') { // 每天前N次
          // 非首次
          if (preRatioOnline < parseInt(haveDayDiscountTimes) + 1) {
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
      if (this.onlineCodeQuantitySet) {
        // 0:不可放弃
        let preDepositStatusOnline = this.onlineCodeQuantitySet.preDepositStatusOnline
        if (preDepositStatusOnline === '0') {
          // 不可放弃优惠 默认选中优惠 不可选
          return true
        } else {
          return false
        }
      }
    },
    amountStatus () {
      // 点卡不做禁用设置
      if (this.payType.typeCode === 1) {
        return false
      }
      if (!this.amount) {
        return true
      } else {
        return false
      }
    }
  }
}
