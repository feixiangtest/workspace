import * as types from './type'
import * as statusCode from '@/base/utils/status_const'

export const actions = {
  [types.REG_GET]: ({commit}, param = {}) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/wapLogin/register', // 获取注册显示的字段
        Requirement: param
      }).then(function (res) {
        if (!res) return resolve()
        if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          resolve(res)
        } else if (res.status === statusCode.statusConst.ISLOGIN) {
          window.layer.msgWarn(res.msg, function () {
            window.indexMain.closeLtWindow() // 关闭当前彩票窗口
          })
        } else {
          console.info(res, 1)
          window.layer.msgWarn(res.msg)
          reject(res)
        }
      })
    }),
  [types.WECHAT_GET]: ({commit}, param = {}) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/wapWeiXinLogin/register', // 获取注册显示的字段
        Requirement: param
      }).then(function (res) {
        if (!res) return resolve()
        if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          resolve(res)
        } else if (res.status === statusCode.statusConst.ISLOGIN) {
          window.layer.msgWarn(res.msg, function () {
            window.indexMain.closeLtWindow() // 关闭当前彩票窗口
          })
        } else {
          console.info(res, 1)
          window.layer.msgWarn(res.msg)
          reject(res)
        }
      })
    }),
  [types.REG_EMAIL]: ({commit}, param) =>
    new Promise((resolve, reject) => { // 注册发送邮件
      window._fetch({
        Action: 'api/wap/wapLogin/resendEmail',
        Requirement: param
      }).then(function (res) {
        if (!res) return resolve()
        if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          resolve(res)
        } else if (res.status === statusCode.statusConst.ISLOGIN) {
          window.layer.msgWarn(res.msg, function () {
            window.indexMain.closeLtWindow() // 关闭当前彩票窗口
          })
        } else {
          console.info(res, 1)
          window.layer.msgWarn(res.msg)
          reject(res)
        }
      })
    }),
  [types.REG_SAVE]: ({commit}, param) =>
    new Promise((resolve, reject) => { // 注册接口
      window._fetch({
        Action: 'api/wap/wapLogin/saveAccount',
        Requirement: param
      }).then(function (res) {
        if (!res) return resolve()
        if (res.status === statusCode.statusConst.ISLOGIN) {
          window.layer.msgWarn(res.msg, function () {
            window.indexMain.closeLtWindow() // 关闭当前彩票窗口
          })
          reject(res)
        }
        resolve(res)
      })
    })
}
/**
 *  添加 测试 ip
 */
