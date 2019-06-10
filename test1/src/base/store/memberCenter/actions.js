import * as types from './type'
import * as statusCode from '@/base/utils/status_const'

export const actions = {
  /* 额度转换页面初始化数据 */
  [types.MONEYCONVERSION_ACTION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/moneyConversion/moneyConversion',
        Requirement: param
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          commit(types.MONEYCONVERSION_MUTATION, res)
        } else {
          window.layer.msgWarn(res.msg, function () {})
        }
        resolve(res)
      }, function (res) {
        reject(res)
      })
    }),
  /* 额度转换刷新余额 */
  [types.UPDATE_SESSION_MONEY_ACTION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/moneyConversion/updateSessionMoney',
        Requirement: param
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          commit(types.UPDATE_SESSION_MONEY_MUTATION, res)
        } else {
          window.layer.msgWarn(res.msg, function () {})
        }
        resolve(res)
      }, function (res) {
        reject(res)
      })
    }),
  /* 手-自动额度切换 */
  [types.CHANGE_TRANMONEY_STATUS_ACTION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/moneyConversion/chgTranMoneyStatus',
        Requirement: param
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          commit(types.CHANGE_TRANMONEY_STATUS_MUTATION, res)
        } else {
          window.layer.msgWarn(res.msg, function () {})
        }
        resolve(res)
      }, function (res) {
        reject(res)
      })
    }),
  /* 额度转换 */
  [types.CONVERSION_TO_THIRD_ACTION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/moneyConversion/conversionToThird',
        Requirement: param
      }).then(function (res) {
        if (res !== undefined && res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          commit(types.CONVERSION_TO_THIRD_MUTATION, res)
        } else {
          if (res === undefined) {
            window.layer.msgWarn('金额转换失败', function () {})
          } else {
            window.layer.msgWarn(res.msg, function () {})
          }
        }
        resolve(res)
      }, function (res) {
        reject(res)
      })
    }),
  /* 获取余额 */
  [types.BALANCEREFRESH_ACTION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/moneyConversion/updateSessionMoney',
        Requirement: param
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          commit(types.BALANCEREFRESH_MUTATION, res)
        }
        resolve(res)
      }, function (res) {
        reject(res)
      })
    }),
  /* 获取平台信息 */
  [types.PLATFORM_ATION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/member/getPlatformMoney',
        Requirement: param
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          commit(types.PLATFORM_MUTATION, res)
        }
        resolve(res)
      }, function (res) {
        reject(res)
      })
    }),
  /* 右侧导航栏刷新余额 */
  [types.REFREHSMONEY_ATION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/member/refreshBlances',
        Requirement: param
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          commit(types.REFREHSMONEY_MUTATION, res)
        } else {
          if (res === undefined) {
            window.layer.msgWarn('余额刷新失败', function () {})
          } else {
            window.layer.msgWarn('余额刷新失败:' + res.msg, function () {})
          }
        }
        resolve(res)
      }, function (res) {
        reject(res)
      })
    }),
  [types.MESSAGENUMREFRESH_ACTION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/wapIndex/getMsgCount',
        Requirement: param
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          commit(types.MESSAGENUMREFRESH_MUTACTION, res)
        } else {
          if (res === undefined) {
            window.layer.msgWarn('获取未读消息失败', function () {})
          } else {
            window.layer.msgWarn('获取未读消息失败:' + res.msg, function () {})
          }
        }
        resolve(res)
      }, function (res) {
        reject(res)
      })
    }),
  /* 游戏客户端获取账号信息 */
  [types.GAMECLIENT_ACCOUNTINFO_ACTION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/member/thirdPlatformInfo',
        Requirement: param
      }).then(function (res) {
        if (res && res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          commit(types.GAMECLIENT_ACCOUNTINFO_MUTACTION, res)
        }
        resolve(res)
      }, function (res) {
        reject(res)
      })
    }),
  /* 游戏客户端获取账号对应的密码 */
  [types.GAMECLIENT_GETACCOUNTPWD_ACTION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/member/doShowPwd',
        Requirement: param
      }).then(function (res) {
        if (res && res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          commit(types.GAMECLIENT_GETACCOUNTPWD_MUTACTION, res)
        }
        resolve(res)
      }, function (res) {
        reject(res)
      })
    }),
  /* 游戏客户端修改账号密码 */
  [types.GAMECLIENT_UPDATEACCOUNTPWD_ACTION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/member/changePwd',
        Requirement: param
      }).then(function (res) {
        if (res && res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          commit(types.GAMECLIENT_UPDATEACCOUNTPWD_MUTACTION, res)
        }
        resolve(res)
      }, function (res) {
        reject(res)
      })
    })
}
