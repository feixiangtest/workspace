/**
 * 依赖关系：
 * 导入： 无
 * 导出： 有公用
 * 注意： h5和PC公用逻辑，请注意影响
 * webpack build: 影响 需 依赖build
 * 线下入款支付公共逻辑处理体
 */
import { mapState } from 'vuex'
import * as type from '@m/store/payment/type'
import * as dateUtils from '@s/utils/dateUtils'
import * as payMents from '@m/config/payMent'
let { getInfo } = payMents
export default {
  data () {
    return {
      status: true,
      curQuickPrice: null, // 当前选中的快选金额
      amount: null, // 支付金额
      amountErrFlag: false, // 金额提示语状态
      amountErrMsg: '', // 金额提示语
      offer: 0, // 优惠金额
      ifFlag: false,
      discount: true, // 申请优惠，默认选中申请
      isOutreach: '', // 是否启用外链功能
      isOpen: true, // 用于限制点击过快处理
      remark: '', // 备注
      nowBankId: 1, // 当前选中的银行id,默认为农业银行
      depositId: 0, // 入款方式，默认为网银转账
      userDepositSubbranch: '', // 所属分行
      userCardName: '', // 入款人姓名
      bankName: '', // 银行名称
      bankKey: 0, // 银行key
      depositName: '网银转账', // 存款方式
      buttonMsg: '提交',
      depositArr: [1, 2, 3], // 此三种存款类型需要显示所属分行
      getInfo: getInfo[this.getKeys(this.$store.state.payment.payType.typeCode)],
      payInfo: {}, // 当前选中的支付静态
      refreshFlag: false,
      refreshTime: '',
      imgNum: null,
      wirteTime: dateUtils.getNowFormatDate()
    }
  },
  methods: {
    /**
      * 刷新图片功能
      */
    refreshImg (index) {
      this.imgNum = index
      if (this.refreshFlag === true) {
        return
      }
      this.refreshFlag = true
      this.refreshTime = new Date().getTime()
      setTimeout(() => {
        this.refreshFlag = false
        this.imgNum = null
      }, 1000)
    },
    getKeys (bankId) { // 按key值区分转账和扫码
      if (bankId === 17 || bankId === 18) {
        return 'ali'
      } else if (bankId === 19 || bankId === 20) {
        return 'weixin'
      } else if (bankId === 21 || bankId === 22) {
        return 'qq'
      } else if (bankId === 23 || bankId === 24) {
        return 'cft'
      } else if (bankId === 25 || bankId === 26) {
        return 'ysf'
      } else {
        return 'bank'
      }
    },
    changeQuickPrice (index, amount) {
      this.curQuickPrice = index
      this.amount = amount
      // 计算优惠
      this.inputMoney(amount)
    },
    toNumber (v) {
      this[v] = this[v].toString().replace(/[^\d]+/g, '').slice(0, 14)
    },
    // 输入框有空格将会被清空
    noSpace (v) {
      this[v] = this[v].toString().replace(/\s+/g, '')
    },
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
      // 优惠信息提示
      let money = parseFloat(this.amount)
      let companySet = this.companyCodeQuantitySet
      // 计算优惠金额
      let yhMoney = money * parseFloat(companySet.percentageDiscount) / 100
      // 已经优惠次数
      let haveDiscountTimes = companySet.haveDiscountTimes
      // 优惠次数 类型 0 -首次 1 -每次
      let discountTimes = companySet.discountTimes
      // 稽核优惠标准
      let auditDiscountStandard = companySet.auditDiscountStandard
      // 优惠系数 -次数
      let preRatioOnline = companySet.preRatioOnline
      // 优惠上限
      let preUp = companySet.preUp
      // 最低金额
      let minDepositCompany = companySet.minDepositCompany
      // 最高金额
      let highDepositCompany = companySet.highDepositCompany
      // 优惠
      if (preUp <= yhMoney) {
        yhMoney = preUp
      }
      if (discountTimes === 0 || discountTimes === '0') {
      // 判断如果后台设置的是首次存款才有优惠时的处理
        if (haveDiscountTimes === 0 || haveDiscountTimes === '0') {
          if (parseFloat(money) >= auditDiscountStandard) {
            yhMoney = money * parseFloat(companySet.percentageDiscount) / 100
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
            yhMoney = money * parseFloat(companySet.percentageDiscount) / 100
            if (parseInt(money) > parseInt(highDepositCompany)) {
              yhMoney = (highDepositCompany * parseFloat(companySet.percentageDiscount) / 100)
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
    },
    // 去掉首尾空格
    trimStr (str) {
      return str.replace(/(^\s*)|(\s*$)/g, '')
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
    // 切换选中银行
    changeBank (bankInfo) {
      this.$store.state.payment.offlineDeposit = bankInfo
    },
    // 提交
    submit () {
      if (this.amountStatus) {
        return
      }
      if (this.isOpen) {
        this.buttonMsg = '提交中...'
        // 最低金额
        let minDepositCompany = parseFloat(this.companyCodeQuantitySet.minDepositCompany)
        // 最高金额
        let highDepositCompany = parseFloat(this.companyCodeQuantitySet.highDepositCompany)
        if (!this.amount) {
          this.buttonMsg = '提交'
          window.layer.msgWarn('请您输入充值金额')
          return false
        }
        if (this.amount < minDepositCompany) {
          window.layer.msgWarn('最低金额' + minDepositCompany)
          this.buttonMsg = '提交'
          return false
        }
        this.amount = parseFloat(this.amount)
        if (this.amount > highDepositCompany) {
          this.buttonMsg = '提交'
          window.layer.msgWarn('最高金额' + highDepositCompany)
          return false
        }
        /**
         * 云闪付不需要验证存款名
         * 支付逻辑有改动：
         incomeName 有值 就必须传参回去
         没有值 忽略
         */
        if (this.payType.typeCode !== 25 || this.payType.typeCode !== 26) {
          // 验证存款名
          if (this.payType.incomeName && this.trimStr(this.userCardName) === '' || this.userCardName.length > 30) {
            this.buttonMsg = '提交'
            window.layer.msgWarn('请您输入' + this.payType.incomeName)
            return false
          }
          if (this.userCardName.indexOf('<') >= 0 || this.userCardName.indexOf('>') >= 0) {
            window.layer.msgWarn(this.payType.incomeName + '格式不正确！')
            this.buttonMsg = '提交'
            return false
          }
        }
        if (this.remark.indexOf('<') >= 0 || this.remark.indexOf('>') >= 0) {
          window.layer.msgWarn('汇款留言格式不正确！')
          this.buttonMsg = '提交'
          return false
        }
        // 银行才需要验证
        if (this.payType.typeCode === 16) {
          // 存款方式为ATM存款等需要填写分行
          if (this.depositArr.indexOf(this.offlineBankInfo.depositId) > -1) {
            this.re = new RegExp('^[ ]+$')
            if (this.offlineBankInfo.userDepositSubbranch === '') {
              this.buttonMsg = '提交'
              window.layer.msgWarn('所属分行不可为空！')
              return false
            } else {
              if (this.re.test(this.offlineBankInfo.userDepositSubbranch)) {
                this.buttonMsg = '提交'
                window.layer.msgWarn('所属分行不可为空！')
                return false
              }
            }
            if (this.offlineBankInfo.userDepositSubbranch.indexOf('<') >= 0 || this.offlineBankInfo.userDepositSubbranch.indexOf('>') >= 0) {
              window.layer.msgWarn('所属分行格式不正确！')
              this.buttonMsg = '提交'
              return false
            }
          }
        }
        let data = {}
        // 金额
        data.depositMoney = this.amount
        // 备注
        data.remark = this.remark
        // 订单号，后台生成
        data.orderno = this.offlineDeposit.orderNo
        // 存款名
        data.userCardName = this.userCardName
        // 银行转账方式
        if (this.payType.companyChargeType === 0) {
          // 选择的存款方式id
          if (this.offlineBankInfo.depositId === undefined) {
            data.userDepositType = this.depositType
          } else {
            data.userDepositType = this.offlineBankInfo.depositId
          }
          // 选择的存款方式名称
          data.userDepositValue = this.offlineBankInfo.depositName
          // 当前使用的银行卡名称
          data.depositBankValue = this.offlineBankInfo.bankName
        } else {
          // 当前使用的银行卡名称
          data.depositBankValue = this.payType.typeName
          // 选择的存款方式名称
          data.userDepositValue = this.payType.rechargeName
          // 选择的存款方式id
          data.userDepositType = 1 // todo 线下入款除开银行存款时不应该传此值，但是后台目前必填，临时传1
        }
        // 当前使用的银行卡key
        data.depositBank = this.offlineBankInfo.bankKey
        // 当前选择的厅主帐号ID
        data.companyAccountId = this.offlineDeposit.companyAccountId
        // 当前选择的厅主帐号银行卡名称
        data.companyAccountValue = this.offlineDeposit.bankName
        // 当前选择的厅主银行卡帐号
        data.mbankaccount = this.offlineDeposit.mbankaccount
        // 当前选择的厅主银行卡帐号用户名
        data.chamberlain = this.offlineDeposit.chamberlain
        // 银行卡id 赋值 data
        if (this.payType.typeCode === 16) {
          // 当前的银行卡id
          data.bankId = this.offlineDeposit.bankId
        }
        // 统一 + typeCode
        data.typeCode = this.payType.typeCode
        data.writeTime = this.wirteTime
        // 是否银行类型的标记
        data.isbank = '0'
        // 所属分行
        data.userDepositSubbranch = this.offlineBankInfo.userDepositSubbranch
        // 是否申请优惠，1：申请，0：不申请
        data.abandon = this.discount ? 1 : 0
        // 验证银行卡信息
        if (data.depositBank === '' || data.companyAccountId === '' || data.userDepositType === '') {
          this.buttonMsg = '确定'
          window.layer.msgWarn('银行信息不能为空！')
          return false
        }
        this.buttonMsg = '确定'
        if (!window.navigator.onLine) {
          window.layer.msgWarn('网络连接异常，请检查您的网络！')
        } else {
          this.$store.dispatch(type.SAVE_COMPANY_DEPOSIT_ACTION, data).then(res => {
            if (res.status === '0') {
              // 用于下次刷新时显示提交成功的支付方式
              localStorage.setItem('payInfo', JSON.stringify(this.payType))
              window.layer.msgWarn('提交申请成功，财务将在1-3分钟内为您添加额度，请稍等！', function () {
                window.router.push('/wap/basicsInfo')
              })
            } else {
              window.layer.msgWarn('失败: ' + res.data.msg)
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
    }
  },
  computed: {
    ...mapState({
      account: state => state.member.account,
      payType: state => state.payment.payType,
      bankkey: state => state.payment.bankkey,
      bankType: state => state.payment.bankType,
      official: state => state.payment.official,
      companyCodeQuantitySet: state => state.payment.companyCodeQuantitySet,
      rechargeVoList: state => state.payment.rechargeVoList, // 支付列表数据
      offlineDeposit: state => state.payment.offlineDeposit,
      allBankList: state => state.payment.allBankList,
      offlineBankInfo: state => state.payment.offlineBankInfo
    }),
    place () { // 提示语
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
      if (this.companyCodeQuantitySet) {
        // 判断是否首次优惠，如果是首次优惠则根据用户存款次数显示优惠框，否则不显示优惠框
        let discountTimes = this.companyCodeQuantitySet.discountTimes
        // 用户已存款次数
        let haveDiscountTimes = this.companyCodeQuantitySet.haveDiscountTimes
        // 用户每天的存款次数
        let haveDayDiscountTimes = this.companyCodeQuantitySet.haveDayDiscountTimes
        // 代理后台设置的可优惠次数
        let preRatioOnline = this.companyCodeQuantitySet.preRatioOnline
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
      if (this.companyCodeQuantitySet) {
        // 0:不可放弃
        let preDepositStatusOnline = this.companyCodeQuantitySet.preDepositStatusOnline
        if (preDepositStatusOnline === '0') {
          // 不可放弃优惠 默认选中优惠 不可选
          return true
        } else {
          return false
        }
      }
    },
    amountStatus () {
      if (!this.amount) {
        return true
      } else {
        return false
      }
    }
  }
}
