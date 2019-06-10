import * as types from './type'
import * as statusCode from '../../utils/status_const'

export const actions = {
  /** (新接口)代理H5首页--代理维修公告 */
  [types.REPAIR_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/notice/sysMessageManage/getRepairNotice', param, { type: 'POST' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          if (res.data && res.data.content) {
            let resM5 = res.data.content + res.data.beginTime + res.data.endTime + res.data.id
            if (localStorage.getRepairNotice === resM5) res.data = {} // 判断本地消息 和之前的是否一致
            localStorage.getRepairNotice = resM5 // 更新数据
          }
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg)
      })
    }),
  /** (新接口)代理H5首页--代理弹出公告 */
  [types.NOTICE_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/notice/sysMessageManage/getAgentNotice', param, { type: 'POST' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          if (res.data && res.data.popupMessage && res.data.popupMessage.gbkContent) {
            let resM5 = res.data.popupMessage.gbkContent + res.data.popupMessage.createDateTime + res.data.popupMessage.lastUpdateTime
            if (localStorage.getAgentNotice === resM5) res.data = {} // 判断本地消息 和之前的是否一致
            localStorage.getAgentNotice = resM5 // 更新数据
            resolve(res)
          }
        } else {
          reject(res)
          window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg)
      })
    }),
  /** 登录 */
  [types.LOGIN_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/h5Login', param, { type: 'POST' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          commit(types.LOGIN_MUTATION, res)
          resolve(res)
        } else {
          if (res.msg.indexOf('安全码未正确填写') !== -1) {
            commit(types.LOGINTOW_MUTATION, res)
          } else {
            reject(res)
            window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
          }
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg)
      })
    }),
  /** 登录 */
  [types.LOGINTOW_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/h5Login', param, { type: 'POST' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          commit(types.LOGIN_MUTATION, res)
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg)
      })
    }),
  /** 登出 */
  [types.LOGOUT_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/h5Logout', param, { type: 'POST' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          commit(types.LOGOUT_MUTATION, res)
        }
        resolve(res)
      }).catch(err => {
        window.layer.msgWarn(err.msg)
      })
    }),
  /** 首页接口 */
  [types.QUERYINDEX_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/queryIndex', param, { type: 'POST' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          commit(types.QUERYINDEX_MUTATION, res)
        }
        resolve(res)
      }).catch(err => {
        window.layer.msgWarn(err.msg)
      })
    }),
  /** 初始化接口 */
  [types.INITDATA_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/baseInit', param, { type: 'POST' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          commit(types.INITDATA_MUTATION, res)
        }
        resolve(res)
      }).catch(err => {
        if (err.msg) window.layer.msgWarn(err.msg)
      })
    }),
  /** 菜单栏接口 */
  [types.MENU_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/h5menu', param, { type: 'GET' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          // commit(types.INITDATA_MUTATION, res)
          resolve(res)
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg)
      })
    }),
  /** logo 接口 */
  [types.PREVIEW_LOGO]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/wiSectionDeposit/loadPreview', param, { type: 'GET' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          commit(types.PREVIEW_MUTATION, res)
          resolve(res)
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg)
      })
    })
}
