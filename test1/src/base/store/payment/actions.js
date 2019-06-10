import * as types from './type'
import * as statusCode from '@/base/utils/status_const'

export const actions = {
    /** 获取支付数据接口 */
  // [types.QUERY_GO_PAY_ACTION]: ({commit}, param) =>
  //   new Promise((resolve, reject) => {
  //     window._fetch({
  //       Action: 'api/wap/pay/goPay',
  //       Requirement: {
  //         banktype: param.banktype
  //       }
  //     }).then(function (res) {
  //       if (res.status === statusCode.statusConst.SUCCESS) {
  //         console.info(res)
  //         commit(types.QUERY_GO_PAY_MUTATION, res)
  //         resolve(res)
  //       } else {
  //         window.layer.msgWarn(res.msg, function () {})
  //       }
  //     })
  //   }),
  /**
   * 在线支付提交接口
   */
  [types.SAVE_PAY_RESULT_ACTION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/pay/payResult',
        Requirement: param
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) {
          commit(types.SAVE_PAY_RESULT_MUTATION, res)
          resolve(res)
        } else {
          window.layer.msgWarn(res.msg, function () {
            window.location.reload()
          })
        }
      })
    }),
  /**
   * 公司入款提交接口
   */
  [types.SAVE_COMPANY_DEPOSIT_ACTION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/pay/companyDeposit',
        Requirement: param
      }).then(function (res) {
//      alert(JSON.stringify(res))
        if (res.status === statusCode.statusConst.SUCCESS) {
          // commit(types.SAVE_COMPANY_DEPOSIT_MUTATION, res)
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
  [types.INIT_DRAW_DATA_ACTION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/drawMoney/initDrawData',
        Requirement: param
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) {
          commit(types.INIT_DRAW_DATA_MUTATION, res)
          resolve(res)
        } else {
          resolve(res)
        }
      })
    }),
  /**
   * 取款密码校验
   */
  [types.CHECK_DRAW_PASSWORD_ACTION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/drawMoney/checkDrawPassword',
        Requirement: param
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) {
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
  [types.DRAW_MONEY_ACTION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/drawMoney/drawMoney',
        Requirement: param
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) {
          // commit(types.DRAW_MONEY_MUTATION, res)
          resolve(res)
        } else {
          window.layer.msgWarn(res.msg)
        }
      })
    }),
  /**
   * 存款跳转验证方法
   */
  // [types.VERIF_GO_PAY_ACTION]: ({commit}, param) =>
  //   new Promise((resolve, reject) => {
  //     window._fetch({
  //       Action: 'api/wap/pay/verifGoPay',
  //       Requirement: param
  //     }).then(function (res) {
  //       if (res.status === statusCode.statusConst.SUCCESS) {
  //         commit(types.VERIF_GO_PAY_MUTATION, res)
  //         resolve(res)
  //       } else {
  //         window.layer.msgWarn(res.msg)
  //       }
  //     })
  //   }),
  /**
   * 新需求，需要获取所有支付参数用于切换
   */
  [types.GO_ONLINE_PAY_ACTION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/pay/initDeposit',
        Requirement: param
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) {
          commit(types.GO_ONLINE_PAY_MUTATION1, res)
          resolve(res)
        } else {
          window.layer.msgWarn(res.msg)
        }
      })
    }),
     /**
      * 自定义支付验证方法
      */
  [types.GO_SELDEFINED_ACTION]: ({commit}, param) =>
      new Promise((resolve, reject) => {
        window._fetch({
          Action: 'api/wap/pay/checkCustomPayUrl',
          Requirement: param
        }).then(function (res) {
          if (res.status === statusCode.statusConst.SUCCESS) {
            resolve(res)
          } else {
            window.layer.msgWarn(res.msg)
          }
        })
      })
}
