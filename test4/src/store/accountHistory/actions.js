import * as types from './type'
import * as statusCode from '../../utils/status_const'

export const actions = {
  // 查询后台，获取近7天的账户历史注单 Ezreal
  [types.ACCOUNT_HISTORY_ACTION]: ({ commit }) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'common/betRecord'
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          commit(types.ACCOUNT_HISTORY_INITDETAIL, res)
          resolve(res)
        } else if (res.status === statusCode.statusConst.ISLOGIN) {
          window.layer.msgWarn(res.msg, function () {
            window.lotteryMain.closeLtWindow() // 关闭当前彩票窗口
          })
        } else {
          reject(res)
        }
      })
    }),

  // 账户历史-->点击指定某一天 Ezreal
  [types.BETTIONG_RECORDBYDATE_ACTION]: ({ commit }, BettingParams) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'h5/bettingRecordByDate',
        Requirement: {
          date: BettingParams.date,
          currentPage: BettingParams.currentPage,
          pageSize: BettingParams.pageSize,
          lotteryId: BettingParams.lotteryId,
          isWinning: BettingParams.isWinning
        }
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          commit(types.BETTIONG_RECORDBYDATE_INITDETAIL, res)
          resolve(res)
        } else if (res.status === statusCode.statusConst.ISLOGIN) {
          window.layer.msgWarn(res.msg, function () {
            window.lotteryMain.closeLtWindow() // 关闭当前彩票窗口
          })
        } else {
          reject(res)
        }
      })
    })

}
