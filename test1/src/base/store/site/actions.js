import * as types from './type'
import * as statusCode from '@/base/utils/status_const'
export const actions = {
  /** 跳转第三方，根据参数获取对应的链接 */
  [types.THIRD_ACTION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/login3rd/loginGame',
        Requirement: param
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) {
          resolve(res)
        } else {
          var myReg = /\\n/gi
          res.msg = res.msg.replace(myReg, '')
          window.layer.msgWarn(res.msg + '', function () {
            window.indexMain.closeLtWindow() // 关闭当前窗口 DOTO  改方法没有移植过来
          })
        }
      })
    }),
  /** 跳转第三方 检查是否可用 */
  [types.THIRD_CHECK]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/login3rd/getGameStatus',
        Requirement: param
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) {
          resolve(res)
        } else {
          var myReg = /\\n/gi
          res.msg = res.msg.replace(myReg, '')
          window.layer.msgWarn(res.msg + '', function () {
            window.indexMain.closeLtWindow() // 关闭当前窗口 DOTO  改方法没有移植过来
          })
        }
      })
    }),
    /** 验证登录状态 */
  [types.ISLOGIN_ACTION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/wapLogin/getLoginStatus',
        Requirement: param
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) {
          resolve(res)
        } else {
          window.layer.msgWarn('网络超时或中断，请重新登录！！')
        }
      })
    })
}
