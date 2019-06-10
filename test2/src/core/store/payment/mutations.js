import * as types from './type'

export const state = {
  bankType: null, // 支付类型
  cdnUrl: '', // CDN 域名
  bankkey: '', // 支付编码
  payType: {}, // 当前选中的支付参数
  noData: false, // 没有支付数据：true，有支付数据：false
  allBankList: [], // 线下入款银行卡数据
  companyAccount: [], // 线下入款帐号信息
  payResult: {}, // 提交支付封装参数
  offlineDeposit: {}, // 当前选中的线下入款参数
  onlineDraw: {}, // 出款的参数
  official: {}, // 当前文案
  quickPayList: [], // 快选金额
  isOnline: null, // 线上还是线下的区分
  iconName: null, // 支付宝、微信等的昵称
  showQuiMoney: 0, // 线下支付是否显示默认金额，默认不展示
  isOutreach: '0', // 是否外链支付，0：非外链；1：外链支付
  level: 0, // 层级，默认为0，为支付首页，1代表线上支付付款页，2代表线下入款付款页
  nowBankKey: '', // 当前选中银行
  showScan: false, // 扫码是否显示
  showTransfer: false, // 转账是否显示
  showBindInfo: false, // 是否默认显示出款咨询绑定
  pageLoad: false, // 支付列表是否已经加载
  rechargeVoList: [], // 支付列表数据
  companyCodeQuantitySet: [], // 线下存取款设定
  onlineCodeQuantitySet: [], // 线上存取款设定
  offlineBankInfo: [], // 当前选中的线下银行部分参数
  isSetBankCard: ''
}
export const mutations = {
  [types.INIT_DRAW_DATA_MUTATION] (state, res) {
    state.onlineDraw = res.data
    // h5 操作
    if (localStorage.place === '_h5') {
      // 1 未绑定银行卡
      if (res.status === '1') {
        localStorage.setItem('isSetBankCard', '1')
      }
      // 0 已绑定
      if (res.status === '0') {
        localStorage.setItem('isSetBankCard', '0')
      }
    }
  },
  [types.SAVE_BINDINFO] (state, res) {
  },
  [types.SAVE_PAY_RESULT_MUTATION] (state, res) {
    state.payResult = res.data
  },
  /**
   * 查询所有支付数据体
   * 新的逻辑
   */
  [types.GO_ONLINE_PAY_MUTATION1] (state, res) {
    if (res.data.cdnUrl) state.cdnUrl = res.data.cdnUrl
    // 线下入款银行卡数据
    // state.allBankList = res.data.allBankList
    // 新的支付列表数据
    // 处理数据 线上(0) 线下(1)公司 区分充值金额
    window._.each(res.data.rechargeVoList, (val, key) => {
      let [min, max] = [-1, -1]
      //  线上(0)
      if (val.onlineFlag === '0') {
        // 使用 里面{ }的值 quantitySet
        min = val.depositListVo.quantitySet.minDepositOnline
        max = val.depositListVo.quantitySet.highDepositOnline
      }
      if (val.onlineFlag === '1') {
        // 公司 用外面的res onlineFlag
        if (res.data.onlineCodeQuantitySet) {
          min = res.data.companyCodeQuantitySet.minDepositCompany
          max = res.data.companyCodeQuantitySet.highDepositCompany
        }
      }
      if (min >= 0 && max >= 0) {
        val.deposite = {
          min, max
        }
      } else {
        val.deposite = {
          max: false,
          min: false
        }
      }
    })
    // 新的支付列表数据
    state.rechargeVoList = res.data.rechargeVoList
    // 线上存取款设定
    state.onlineCodeQuantitySet = res.data.onlineCodeQuantitySet
    // 线下存取款设定
    state.companyCodeQuantitySet = res.data.companyCodeQuantitySet
    // load 完成
    state.pageLoad = true
  }
}
