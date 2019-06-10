import * as types from './type'

let statusCode = window.common.statusConst

/**
 *
 gop_mobile 改为现在 window.$.http

 new Promise((resolve, reject) => {
 let url = ''
  window.$.http(url, { }, {type: 'POST'}).then((res) => {
    commit(types.xxxxx, res)
    resolve(res) 替换这里  放gop_mobile里面的旧代码
  })
})
 */
//
export const actions = {
  /* 额度转换页面初始化数据 */
  [types.MONEYCONVERSION_ACTION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      let url = '/member/moneyConversion/moneyConversion'
      window.$.http(url, param, {type: 'POST', hideLoading: true}).then((res) => {
        if (res.status === statusCode.SUCCESS) { // 返回数据成功
          // commit(types.MONEYCONVERSION_MUTATION, res)
          resolve(res)
        } else {
          reject(res)
          if (res.msg && res.msg.indexOf('试玩') > -1) {

          } else {
            window.layer.msgWarn(res.msg, function () {
            })
          }
        }
      })
    }),
  /* 将金额转到第三方 */
  [types.CONVERSIONTOTHIRD]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/member/moneyConversion/conversionToThird', param, {type: 'POST'}).then((res) => {
        if (res.status === statusCode.SUCCESS) { // 返回数据成功
          // commit(types.MONEYCONVERSION_MUTATION, res)
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg, function () {
          })
        }
      })
    }),
  /* 切换自动手动 */
  [types.CHGTRANMONEYSTATUS]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/member/moneyConversion/chgTranMoneyStatus', param, {type: 'POST', hideLoading: true}).then((res) => {
        if (res.status === statusCode.SUCCESS) { // 返回数据成功
          // commit(types.MONEYCONVERSION_MUTATION, res)
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg, function () {
          })
        }
      })
    }),
  /* 额度转换刷新余额 */
  [types.UPDATE_SESSION_MONEY_ACTION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      let url = 'member/moneyConversion/updateSessionMoney?t=' + new Date().getTime()
      window.$.http(url, param, {type: 'POST', hideLoading: true}).then((res) => {
        if (res.status * 1 == statusCode.statusConst.SUCCESS) { // 返回数据成功
          // firfox 有bug  res.status*1 不要修改
          // commit(types.UPDATE_SESSION_MONEY_MUTATION, res)
        } else {
          if (res.msg) {
            window.layer.msgWarn(res.msg, function () {
            })
          }
        }
        resolve(res)
      })
    })
}
