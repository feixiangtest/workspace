import * as types from './type'
import * as statusCode from '../../utils/status_const'

export const actions = {
  /**
   * 交易记录
   */
  [types.BETTING_RECORD_ACTION]: ({commit}, param) =>
  new Promise((resolve, reject) => {
    window._fetch({
      Action: 'api/wap/member/bettingRecord',
      Requirement: param
    }).then(function (res) {
      if (!res) return resolve()
      if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
        resolve(res)
        commit(types.BETTING_RECORD_MUTATION, res)
      } else if (res.status === statusCode.statusConst.ISLOGIN) {
        window.layer.msgWarn(res.msg, function () {
          window.indexMain.closeLtWindow() // 关闭当前窗口
        })
      } else {
        window.layer.msgWarn(res.msg)
        resolve(res)
      }
    }, function (res) {
      reject(res)
    })
  }),
  /**
   * 往来记录
   */
  [types.CURRENT_RECORD_ACTION]: ({commit}, param) =>
  new Promise((resolve, reject) => {
    window._fetch({
      Action: 'api/wap/member/currentRecord',
      Requirement: param
    }).then(function (res) {
      if (!res) return resolve()
      if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
        resolve(res)
        commit(types.CURRENT_RECORD_MUTATION, res)
      } else if (res.status === statusCode.statusConst.ISLOGIN) {
        window.layer.msgWarn(res.msg, function () {
          window.indexMain.closeLtWindow() // 关闭当前窗口
        })
      } else {
        window.layer.msgWarn(res.msg)
        resolve(res)
      }
    }, function (res) {
      reject(res)
    })
  }),
  /**
   * 获取游戏平台
   */
  [types.GETPLATFORM_RECORD_ACTION]: ({commit}, param) =>
  new Promise((resolve, reject) => {
    window._fetch({
      Action: 'api/wap/member/getPlatform',
      Requirement: param
    }).then(function (res) {
      if (!res) return resolve()
      if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
        resolve(res)
        // commit(types.GETPLATFORM_RECORD_ACTION, res)
      } else if (res.status === statusCode.statusConst.ISLOGIN) {
        window.layer.msgWarn(res.msg, function () {
          window.indexMain.closeLtWindow() // 关闭当前窗口
        })
      } else {
        window.layer.msgWarn(res.msg)
        resolve(res)
      }
    }, function (res) {
      reject(res)
    })
  }),
  /**
   * 彩票、体育和第三方详细信息
   */
  [types.GET_BETTING_RECORD_ACTION]: ({commit}, param) =>
  new Promise((resolve, reject) => {
    window._fetch({
      Action: 'api/wap/member/getBettingRecord',
      Requirement: param
    }).then(function (res) {
      if (!res) return resolve()
      if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
        resolve(res)
        // commit(types.GET_BETTING_RECORD_ACTION, res)
      } else if (res.status === statusCode.statusConst.ISLOGIN) {
        window.layer.msgWarn(res.msg, function () {
          window.indexMain.closeLtWindow() // 关闭当前窗口
        })
      } else {
        window.layer.msgWarn(res.msg)
        resolve(res)
      }
    }, function (res) {
      reject(res)
    })
  }),
  /**
   * 获取彩票或体育列表
   */
  [types.GET_GETGAMETYPE_RECORD_ACTION]: ({commit}, param) =>
  new Promise((resolve, reject) => {
    window._fetch({
      Action: 'api/wap/member/getGameType',
      Requirement: param
    }).then(function (res) {
      if (!res) return resolve()
      if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
        resolve(res)
        // commit(types.GET_THIRDPLAFROM_RECORD_ACTION, res)
      } else if (res.status === statusCode.statusConst.ISLOGIN) {
        window.layer.msgWarn(res.msg, function () {
          window.indexMain.closeLtWindow() // 关闭当前窗口
        })
      } else {
        window.layer.msgWarn(res.msg)
        resolve(res)
      }
    }, function (res) {
      reject(res)
    })
  })
}
