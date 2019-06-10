import * as types from './type'
// import * as statusCode from '../../utils/status_const'

export const state = {
  userInfo: {
    account: '',
    agentNum: '', // 下级代理总数
    memberNum: '', // 下级会员总数
    balance: '', // 余额
    money: '', // 返水金额
    loginTime: '' // 最后登录时间
  },
  agentNo: '', // 推广码
  atRebates: {}, // 返点比例
  isfloatPage: false,
  floatPageType: Number, // 浮动页显示内容
  legendCode: '', // 安全码绑定状态
  bindCode: true, // 安全码是否绑定
  downloadUrl: '' // app下载地址
}

export const mutations = {
  [types.USERINFO_MUTATION] (state, res) {
    if (res.data) {
      state.userInfo = res.data
      state.atRebates = res.data.atRebates
      state.legendCode = res.data.legendCode
      // 0=未绑定，1=已绑定
      if (state.legendCode === '1') {
        state.bindCode = false
      }
    }
  },
  [types.UPDATEPWD_MUTATION] (state, res) {

  },
  [types.UPDATEAGENTNO_MUTATION] (state, res) {

  }
}
