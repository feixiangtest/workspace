import * as types from './type'

export const state = {
  totalMoney: 0,
  money: 0,
  apiFrom: {},
  accountMoney: {},
  account: {},
  isShow: true,
  msgNum: 0
}
export const mutations = {
  /** 额度转换初始化 */
  [types.MONEYCONVERSION_MUTATION] (state, res) {
  },
  /** 额度转换刷新余额 */
  [types.UPDATE_SESSION_MONEY_MUTATION] (state, res) {

  },
  /** 手-自动额度转换切换 */
  [types.CHANGE_TRANMONEY_STATUS_MUTATION] (state, res) {

  },
  /** 额度转换 */
  [types.CONVERSION_TO_THIRD_MUTATION] (state, res) {

  },
  /** 账户余额 */
  [types.BALANCEREFRESH_MUTATION] (state, res) {
    state.money = res.data.money
    state.totalMoney = res.data.totalmoney
    state.apiFrom = res.data.apiFrom
  },
  /** 平台类型 */
  [types.PLATFORM_MUTATION] (state, res) {
    state.apiFrom = res.data.apiFrom
    state.accountMoney = res.data.accountMoney
    state.totalMoney = res.data.totalmoney
    state.money = res.data.money
  },
  /** 右侧导航栏刷新结果--更新余额 */
  [types.REFREHSMONEY_MUTATION] (state, res) {
    // 更新home中的余额
    window.store.state.home.userInfo.money = res.data.account.money
  },
  /** 获取未读消息数**/
  [types.MESSAGENUMREFRESH_MUTACTION] (state, res) {
    // 更新home中的余额
    if (res.data.msgNum && res.data.msgNum > 0) {
      state.isShow = false
    } else {
      state.isShow = true
    }
    state.msgNum = res.data.msgNum
  },
  /** 游戏客户端获取账号信息 */
  [types.GAMECLIENT_ACCOUNTINFO_MUTACTION] (state, res) {

  },
  /** 游戏客户端获取账号对应的密码 */
  [types.GAMECLIENT_GETACCOUNTPWD_MUTACTION] (state, res) {

  },
  /** 游戏客户端修改账号密码 */
  [types.GAMECLIENT_UPDATEACCOUNTPWD_MUTACTION] (state, res) {

  }
}
