import * as types from './type'
import * as statusCode from '../../utils/status_const'
export const actions = {
  // 查询后台，获取投注页面右侧开奖结果 vito
  [types.AWARD_OPENAWARD]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      let lotteryId = param.lotteryId
      window._fetch({
        Action: 'common/openAward',
        Requirement: {
          lotteryId: lotteryId,
          noAward: true, // 不包含开奖结果
          col: '23' // 手机端路子默认显示23列  pc端显示32列
        }
      }).then(function (res) {
        console.info('res:', res)
        if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          commit(types.AWARD_OPENAWARD_DETAIL, res)
          resolve(res)
        } else {
          reject(res)
        }
      })
    }),
  // 只获取前10期开奖结果
  [types.AWARD_OPENAWARD_LAST10]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      let lotteryId = param.lotteryId
      window._fetch({
        Action: 'h5/getAward',
        Requirement: {
          lotteryId: lotteryId
        }
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          commit(types.AWARD_OPENAWARD_LAST10_DETAIL, res)
          resolve(res)
        } else {
          reject(res)
        }
      })
    }),
     // 获取开奖结果
  [types.AWARD_LOTTERY_ACTION]: ({ commit }, awardParams) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'common/awardLotteryList',
        Requirement: {
          lotteryId: awardParams.lotteryId,
          date: awardParams.date,
          pageSize: awardParams.pageSize,
          currentPage: awardParams.currentPage,
          lastAwardDate: awardParams.lastAwardDate
        }
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          res.data.lotteryId = awardParams.lotteryId
          commit(types.AWARD_LOTTERY_MUTATION_INITDETAIL, res)
          resolve(res)
        } else if (res.status === statusCode.statusConst.ISLOGIN) {
          window.layer.msgWarn(res.msg, function () {
            window.lotteryMain.closeLtWindow() // 关闭当前彩票窗口
          })
          reject(res)
        } else if (res.status === statusCode.statusConst.FAILURE) {
          window.layer.msgWarn(res.msg)
          reject(res)
        } else {
          reject(res)
        }
      })
    })
}
