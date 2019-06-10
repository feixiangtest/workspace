import * as types from './type'

let statusCode = window.common.statusConst

export const actions = {
  /**
   * 在线支付提交接口
   */
  [types.SAVE_PAY_RESULT_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      let url = '/member/pay/payResult'
      window.$.http(url, param, { type: 'POST' }).then((res) => {
        if (res.status === statusCode.SUCCESS) {
          commit(types.SAVE_PAY_RESULT_MUTATION, res)
          resolve(res)
        } else {
          resolve(res)
        }
      })
    }),
  /**
   * 公司入款提交接口
   */
  [types.SAVE_COMPANY_DEPOSIT_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      let url = '/member/pay/companyDeposit'
      window.$.http(url, param, { type: 'POST' }).then((res) => {
        if (res.status === statusCode.SUCCESS) {
          resolve(res)
        } else {
          window.layer.msgWarn(res.msg, function () {
            window.location.reload()
          })
        }
      })
    }),
  /**
   * 提款初始化
   */
  [types.INIT_DRAW_DATA_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      let url = '/member/drawMoney/initDrawData'
      window.$.http(url, param, { type: 'POST', hideLoading: true }).then((res) => {
        commit(types.INIT_DRAW_DATA_MUTATION, res)
        resolve(res)
      })
    }),
  /**
   * 取款密码初始化方法
   */
  [types.VALID_DRAW_PASSWORD_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      let url = '/member/drawMoney/validDrawPassword'
      window.$.http(url, param, { type: 'POST' }).then((res) => {
        resolve(res)
      })
    }),
  /**
   * 取款密码校验
   */
  [types.CHECK_DRAW_PASSWORD_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: '/member/drawMoney/checkDrawPassword',
        Requirement: param
      }).then(function (res) {
        if (res.status === statusCode.SUCCESS) {
          // commit(types.CHECK_DRAW_PASSWORD_MUTATION, res)
          resolve(res)
        } else {
          window.layer.msgWarn(res.msg)
        }
      })
    }),
  /**
   * 取款提交
   */
  [types.DRAW_MONEY_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      let url = '/member/drawMoney/drawMoney'
      window.$.http(url, param, { type: 'POST' }).then((res) => {
        if (res.status === statusCode.SUCCESS) {
          // commit(types.DRAW_MONEY_MUTATION, res)
          resolve(res)
        } else {
          window.layer.msgWarn(res.msg)
        }
      })
    }),
  /**
   * 新需求，需要获取所有支付参数用于切换
   */
  [types.GO_ONLINE_PAY_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      let url = '/member/pay/initRechargePage'
      window.$.http(url, param, { type: 'POST' }).then((res) => {
        if (res.status === statusCode.SUCCESS) {
          commit(types.GO_ONLINE_PAY_MUTATION1, res)
          resolve(res)
        } else {
          window.layer.msgWarn(res.msg)
        }
      })
    }),
  /* 绑定银行卡接口 */
  [types.SAVE_BINDINFO]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      let url = '/member/pay/saveMemberInfo'
      window.$.http(url, param, { type: 'POST' }).then((res) => {
        if (res.status === statusCode.SUCCESS) {
          commit(types.SAVE_BINDINFO, res)
          resolve(res)
        } else {
          window.layer.msgWarn(res.msg, function () {})
        }
      })
    }),

  /* 获取银行卡列表 */
  [types.GET_BANKCARD]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      let url = '/member/pay/getBankList'
      window.$.http(url, param, { type: 'POST' }).then((res) => {
        if (res.status === statusCode.SUCCESS) {
          resolve(res)
        } else {
          window.layer.msgWarn(res.msg, function () {})
        }
      })
    })
}
