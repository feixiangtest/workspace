import * as types from './type'
import * as statusCode from '../../utils/status_const'
import * as lotteryPeriod from 'service/lotteryPeriod'
export const actions = {
  // 查询后台，获取投注页面对应玩法的赔率 vito
  [types.BET_ODDS]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'h5/showBet',
        // Action: 'h5/showBetAll',
        Requirement: param
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          commit(types.BET_ODDS_DETAIL, res)
          if (res.data.periodList !== null) {
            commit(types.GETPERIOD_LIST_MUTATION, res.data.periodList) // 期数信息
          }
          resolve(res)
        } else if (res.status === statusCode.statusConst.CLOSEGAMESTAUS) { // 游戏未开启
          window.layer.msgWarn(res.msg)
          reject(res)
        } else if (res.status === statusCode.statusConst.CLOSEGAME) {
          window.layer.alert(res.msg, function () {
            window.lotteryMain.jumpFirstLottery() // 获取到第一个投注状态是开启的游戏存储并跳转
          })
          reject(res)
        } else if (res.status === statusCode.statusConst.ISLOGIN) {
          window.layer.msgWarn(res.msg, function () {
            window.lotteryMain.closeLtWindow() // 关闭当前彩票窗口
          })
          reject(res)
        } else {
          reject(res)
        }
      })
    }),
  // 常规彩票下注功能
  [types.BETTING_ACTION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'common/betting',
        Requirement: param
      }).then(function (res) {
        console.info(res)
        if (res.status === statusCode.statusConst.CLOSEGAME) { // 游戏关闭
          window.layer.alert(res.msg, function () {
            window.lotteryMain.jumpFirstLottery() // 获取到第一个投注状态是开启的游戏存储并跳转
          })
        } else {
          resolve(res)
        }
      }, function (res) {
        reject(res)
      })
    }),
  // 秒秒彩下注
  [types.MMC_BETTING_ACTION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'common/betting',
        Requirement: param
      }).then(function (res) {
        if (res.status === statusCode.statusConst.CLOSEGAME) {
          window.layer.alert(res.msg, function () {
            window.lotteryMain.jumpFirstLottery() // 获取到第一个投注状态是开启的游戏存储并跳转
          })
        } else {
          if (res.status === statusCode.statusConst.PERIODCLOSED) { // 关盘
            window.store.state.betZone.mmcBettingClosed[param.lotteryId] = true // 标记下注关闭，关闭之后不能下注，需要重新刷新才能再次下注
            window.lotteryMain.clearDoBetList() // 清空下注信息
            lotteryPeriod.getStatus() // 更新下注状态
          }
          resolve(res)
        }
      }, function (res) {
        reject(res)
      })
    }),
  // 模拟开奖
  [types.SIMULATE_ACTION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'common/simulate',
        Requirement: param
      }).then(function (res) {
        if (param.lotteryId && param.lotteryId * 1 === 100) { // 秒秒彩
          commit(types.SIMULATE_MUTATION, res)
          resolve(res)
        } else {
          if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
            commit(types.SIMULATE_MUTATION, res)
            resolve(res)
          } else if (res.status === statusCode.statusConst.MMCSIMULATESTATUS) { // 模拟开奖到95期提醒
            window.layer.msgWarn(res.msg, function () {
              commit(types.SIMULATE_MUTATION, res)
              resolve(res)
            })
          } else if (res.status === statusCode.statusConst.ISLOGIN) { // 未登录
            window.layer.msgWarn(res.msg, function () {
              window.lotteryMain.closeLtWindow() // 关闭当前彩票窗口
            })
            reject(res)
          } else if (res.status === statusCode.statusConst.FAILURE || res.status === statusCode.statusConst.MMCSIMULATE100STATUS) { // 错误或者模拟开奖到100期
            window.layer.msgWarn(res.msg)
            reject(res)
          } else if (res.status === statusCode.statusConst.PERIODCLOSED) { // 关盘
            window.store.state.betZone.mmcBettingClosed[param.lotteryId] = true // 标记下注关闭，关闭之后不能下注，需要重新刷新才能再次下注
            window.lotteryMain.clearDoBetList() // 清空下注信息
            lotteryPeriod.getStatus() // 更新下注状态
            reject(res)
          } else {
            window.layer.msgWarn(res.msg)
            reject(res)
          }
        }
      }, function (res) {
        reject(res)
      })
    }),
    // 校验登录状态
  [types.CHECK_LOGIN_TOKEN_ACTION]: ({commit}) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'common/checkLoginToken'
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) { // 下注成功
          commit(types.CHECK_LOGIN_TOKEN_MUTATION, res)
          resolve(res)
        } else {
          resolve(res)
        }
      }, function (res) {
        reject(res)
      })
    }),

    // 获取当年生肖
  [types.CURRENT_ZODIAC_ACTION]: ({commit}) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'common/getChineseZodiac'
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          commit(types.CURRENT_ZODIAC_MUTATION, res)
          resolve(res)
        } else {
          resolve(res)
        }
      }, function (res) {
        reject(res)
      })
    }),
  // 获取彩票倒计时
  // [types.GET_LOTTERY_TIMES_ACTION]: ({ commit }, params) =>
  //   new Promise((resolve, reject) => {
  //     window._fetch({
  //       Action: 'common/getLotteryTimes',
  //       Requirement: params
  //     }).then(function (res) {
  //       if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
  //         commit(types.GET_LOTTERY_TIMES_MUTATION, res)
  //         resolve(res)
  //       } else {
  //         resolve(res)
  //       }
  //     }, function (res) {
  //       reject(res)
  //     })
  //   }),
  // 获取期数（只获取第一期和最后一期）,约定：periodDate参数为版本号，如果后端判断期数没有更改，则返回空数组；有更改则返回新数据，并且返回最新的版本号
  [types.PERIOD_ACTION]: ({ commit }, params) => {
    if (params.lotteryId) { // 获取当前彩票传给后台的版本号
      let pv = window.lotteryMain.periodsStorage.getVersion(params.lotteryId)
      if (pv) {
        params['periodDate'] = pv // 添加参数：版本号
      }
    }
    return new Promise((resolve, reject) => {
      window._fetch({
        Action: 'common/getPeriods',
        Requirement: params
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          if (res.data) {
            let pd = res.data['periodDate']
            let pl = res.data['periodList']
            if (pd) { // 有返回版本号，更新版本号
              window.lotteryMain.periodsStorage.setVersion(params.lotteryId, pd)
            }
            if (params['periodDate'] || pd) { // 有传版本号，或者有返回版本号
              if (pl && pl.length) { // 已返回值，更新到localStorage
                window.lotteryMain.periodsStorage.set(params.lotteryId, pl)
              } else if (params['periodDate']) { // 没有返回值，但是有传入版本号,沿用前端缓存的值
                pl = window.lotteryMain.periodsStorage.get(params.lotteryId) || []
              }
            }
            res.data['periodList'] = pl || []
          }
          resolve(res)
        } else {
          resolve(res)
        }
      }, function (res) {
        reject(res)
      })
    })
  },
  // 获取彩票状态
  [types.GET_LOTTERY_STATES_ACTION]: ({ commit }, params) =>
  new Promise((resolve, reject) => {
    window._fetch({
      Action: 'common/getLotteryTimes',
      Requirement: params
    }).then(function (res) {
      if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
        commit(types.GET_LOTTERY_STATES_MUTATION, res)
        resolve(res)
      } else if (res.status === statusCode.statusConst.ISLOGIN) {
        window.layer.msgWarn(res.msg, function () {
          window.lotteryMain.closeLtWindow() // 关闭当前彩票窗口
        })
      } else {
        resolve(res)
      }
    }, function (res) {
      reject(res)
    })
  }),
  // 获取秒秒彩游戏状态
  [types.GET_GAME_STATUS_ACTION]: ({ commit }, params) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'common/getGameStatus',
        Requirement: params
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          commit(types.GET_GAME_STATUS_MUTATION, res)
          resolve(res)
        } else if (res.status === statusCode.statusConst.ISLOGIN) {
          window.layer.msgWarn(res.msg, function () {
            window.lotteryMain.closeLtWindow() // 关闭当前彩票窗口
          })
        } else {
          resolve(res)
        }
      }, function (res) {
        reject(res)
      })
    }),
  // 秒秒彩种，获取当前用户今日模拟开奖数据
  [types.TODAY_SIMULATE_RESULT_ACTION]: ({ commit }, params) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'common/todaySimulateResult',
        Requirement: params || {}
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          commit(types.TODAY_SIMULATE_RESULT_MUTATION, res)
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
