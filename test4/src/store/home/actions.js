import * as types from './type'
import * as statusCode from '../../utils/status_const'

export const actions = {
  // 查询后台，获取首页/左侧导航条的彩票数据 vito
  [types.LOTTERY_ACTION]: ({ commit }, versionList) =>
    new Promise((resolve, reject) => {
      // let version = localStorage.lotteryVersion ? localStorage.lotteryVersion : '111'
      window._fetch({
        Action: 'h5/getInitData',
        Requirement: {
          list: versionList
        }
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          commit(types.HOME_MUTATION_INITDETAIL, res)
          resolve(res)
        } else if (res.status === statusCode.statusConst.ISLOGIN) {
          window.layer.msgWarn(res.msg, function () {
            window.lotteryMain.closeLtWindow() // 关闭当前彩票窗口
          })
          reject(res)
        } else {
          window.layer.msgWarn(res.msg)
          reject(res)
        }
      }, function (res) {
        reject(res)
      })
    }),
  // 查询后台，获取最新彩票输赢状况
  [types.LOSE_AND_WIN_ACTION]: ({ commit }) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'common/betMoneyResult'
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          commit(types.LOSE_AND_WIN_INITDETAIL, res)
          resolve(res)
        } else if (res.status === statusCode.statusConst.ISLOGIN) {
          window.layer.msgWarn(res.msg, function () {
            window.lotteryMain.closeLtWindow() // 关闭当前彩票窗口
          })
          reject(res)
        } else {
          reject(res)
        }
      }, function (res) {
        reject(res)
      })
    }),

  // 查询后台，获取最新余额（一般用于刷新页面时去查询）
  [types.GET_BALANCE_ACTION]: ({ commit }) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'common/getBalance'
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          commit(types.GET_BALANCE_INITDETAIL, res)
          resolve(res)
        } else if (res.status === statusCode.statusConst.ISLOGIN) {
          window.layer.msgWarn(res.msg, function () {
            window.lotteryMain.closeLtWindow() // 关闭当前彩票窗口
          })
          reject(res)
        } else if (res.status === statusCode.statusConst.FAILURE) { // 后台状态返回0时报错
          window.layer.msgWarn('余额未刷新成功，请稍后重试！')
          reject(res)
        } else { // 状态为2代表正在查询中，不允许再次查询，不做任何操作
          reject(res)
        }
      }, function (res) {
        reject(res)
      })
    }),
      // 查询后台，获取最新余额并且把gpo平台金额拉取过来（会非常慢，一般用于用户手动点击余额去查询）
  [types.GET_GPO_CP_BALANCE_ACTION]: ({ commit }) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'common/getGpoCPBalance'
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          commit(types.GET_BALANCE_INITDETAIL, res)
          resolve(res)
        } else if (res.status === statusCode.statusConst.ISLOGIN) {
          window.layer.msgWarn(res.msg, function () {
            window.lotteryMain.closeLtWindow() // 关闭当前彩票窗口
          })
          reject(res)
        } else if (res.status === statusCode.statusConst.FAILURE) { // 后台状态返回0时报错
          window.layer.msgWarn('余额未刷新成功，请稍后重试！')
          reject(res)
        } else { // 状态为2代表正在查询中，不允许再次查询，不做任何操作
          reject(res)
        }
      }, function (res) {
        reject(res)
      })
    })

}
