import * as types from './type'

export const state = {
  multiChannelStatus: null, // 是否开启多通道  0 表示单通道  1表示多通道 提交时需要传给后端
  merchantListItem: null,
  merchantId: null,
  bankType: null, // 支付类型
  bankkey: '', // 支付编码
  payType: {}, // 当前选中的支付参数
  allPayMentList: [], // 所有支付的列表, 二维数组
  noData: false, // 没有支付数据：true，有支付数据：false
  listDeposit: {}, // 在线文案集合
  bankList: [], // 线下入款银行卡数据
  companyAccount: [], // 线下入款帐号信息
  payResult: {}, // 提交支付封装参数
  offlineDeposit: {}, // 当前选中的线下入款参数
  onlineDraw: {}, // 出款的参数
  depositMap: {}, // 第三方支付参数Map集合
  official: {}, // 当前文案
  quickPayList: [], // 快选金额
  isOnline: null, // 线上还是线下的区分
  iconName: null, // 支付宝、微信等的昵称
  showQuiMoney: 0, // 线下支付是否显示默认金额，默认不展示
  isOutreach: '0', // 是否外链支付，0：非外链；1：外链支付
  percentageDiscount: 0 // 优惠倍数
}
export const mutations = {
  [types.INIT_DRAW_DATA_MUTATION] (state, res) {
    state.onlineDraw = res.data
  },
  [types.SAVE_PAY_RESULT_MUTATION] (state, res) {
    state.payResult = res.data
  },
  /**
   * 查询所有支付数据体
   * 新的逻辑
   */
  [types.GO_ONLINE_PAY_MUTATION1] (state, res) {
    // 所有支付参数
    state.depositMap = res.data.depositMap
    // 手机端在线存款文案
    state.listDeposit = res.data.documentsMap
    // 是否开启多通道  0 表示单通道  1表示多通道  提交时需要传给后端
    state.multiChannelStatus = res.data.multiChannelStatus
    // 支付列表
    let list = res.data.mnyInitPayInfoList
    let len = list.length // 支付列表长度
    // 线下入款厅主帐号信息
    let _companyAccount = []
    function payItemSplit (gameList, r) { // 切分图标每行显示 5/4个，分行显示
      let list = []
      let o = []
      for (let i = 0; i < gameList.length; i++) {
        if (i !== 0 && o.length) {
          if (!list.length && i % r === 0) {
            list.push(o)
            o = []
          } else if (list.length >= 1 && i % r === r - 1) {
            if (gameList.length === r * 2 && i % r === 0) { // 正好等于两行的时候不需要显示跟多按钮
              list.push(o)
              o = []
            } else if (gameList.length > r * 2 && i % r === r - 1) { // 大于两行才需要显示更多按钮
              list.push(o)
              o = []
            }
          }
        }
        o.push(gameList[i])
      }
      if (o.length) {
        list.push(o)
      }
      return list
    }
    if (list && len) {
      list[0].active = true
      if (window.innerWidth <= 320) {
        state.allPayMentList = payItemSplit(list, 4)
      } else if (window.innerWidth > 320) {
        state.allPayMentList = payItemSplit(list, 5)
      }
      state.bankType = list[0].bankType
      state.payType = res.data.depositMap[list[0].bankKey]
      console.log('payType---:', state.payType)
      state.bankType = list[0].bankType
      console.log('bankType:0---', state.bankType)
       /// 增加多通道时添加的数据

      state.official = res.data.documentsMap[list[0].code]
      state.isOnline = list[0].depositType
      state.percentageDiscount = list[0].percentageDiscount || 0
      list[0].incomeName && (state.iconName = list[0].incomeName)
      // 公司入款银行列表
      state.bankList = res.data.bankList
      // 线下支付 转账如果存在银行账户的情况下 多拆分一条数据
      window._each(res.data.companyAccount, (val, key) => {
        var one1 = ''
        if (val.mbankaccount && val.onlineBankAccount && val.onlineBankName) {
          one1 = JSON.parse(JSON.stringify(val))
          delete val.onlineBankAccount
          delete val.onlineBankName
          one1.indexNumber = 'a' + key
          _companyAccount.push(one1)
          _companyAccount.push(val)
        } else {
          _companyAccount.push(val)
        }
      })
      state.companyAccount = _companyAccount
      if (list[0].bankType === 1000 || list[0].bankType === '1000') {
        state.bankType = 0
        state.bankkey = ''
        window.router.push('/' + window.moduleRouter._payKey + '/payment')
      } else {
        if (list[0].bankKey !== 'bankPay') { // 如果列表第一位是线上支付，直接取具体数据
          // 多通道时用到
          if (state.payType.merchantList && state.payType.merchantList[0]) {
            state.merchantListItem = state.payType.merchantList[0]
            state.merchantId = state.payType.merchantList[0].id
            state.quickPayList = state.payType.merchantList[0].fastSelectMoneyList
          }
          // debugger
          if (state.multiChannelStatus === 0) {
            state.quickPayList = res.data.depositMap[list[0].bankKey].merchant.fastSelectMoneyList
          }

          if (state.multiChannelStatus === 1) {
            state.quickPayList = res.data.depositMap[list[0].bankKey].merchantList.fastSelectMoneyList
          }
          state.bankkey = list[0].bankKey
          state.isOutreach = list[0].isOutreach ? list[0].isOutreach : '0'
          window.router.push('/' + window.moduleRouter._payKey + '/payment/onlinePay?bankType=' + state.bankType)
        } else {
          // 线下支付多个支付账号存在时，默认选中第一个  isbank等于 0 的都是银行
          for (let i = 0; i < _companyAccount.length; i++) {
            if (list[0].bankType === 16) {
              if (_companyAccount[i].isbank === 0) {
                state.offlineDeposit = _companyAccount[i]
                break
              }
            } else {
              if (list[0].bankType === _companyAccount[i].bankId && _companyAccount[i].isbank !== 0) {
                state.offlineDeposit = _companyAccount[i]
                break
              }
            }
          }
          state.bankkey = 'bankPay'
          state.showQuiMoney = list[0].isShowFastSelectMoney
          list[0].fastSelectMoneyList && (state.quickPayList = list[0].fastSelectMoneyList)
          window.router.push('/' + window.moduleRouter._payKey + '/payment/bankPay?bankType=' + state.bankType)
        }
      }
    } else {
      state.allPayMentList = []
      state.noData = true
    }
  }
}
