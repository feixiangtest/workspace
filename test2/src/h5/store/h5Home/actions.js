import * as types from './type'
window.common.statusConst = {
  'SUCCESS': '0', // 数据返回成功
  'FAILURE': '1', // 返回失败
  'VERSION': '9', // 版本号一致
  'ISLOGIN': '5', // 未登录或者IP不一致
  'COMPLETEACCOUNT': '2' // 微信帐号完善资料状态，当返回这个值时必须完善资料后才可跳转其他
}
let statusConst = window.common.statusConst
export const actions = {
  /** 初始化接口 */
  [types.INITDATA]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      /// member/index/h5QueryIndex
      window.$.http('/member/index/h5QueryIndex', param, { type: 'POST', hideLoading: true }).then((res) => {
        commit(types.INITDATA_DETAIL, res)
        resolve(res)
      })
    }),
  /** 初始化消息记录接口 */
  [types.INITSYSMESSAGE]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/member/message/initSysmessage', param, { type: 'POST', hideLoading: true }).then((res) => {
        if (res.status === statusConst.SUCCESS) {
          commit(types.INITSYSMESSAGE_MUTATION, res)
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg) // 请求失败
      })
    }),
  // 删除或者标记已读个人消息数据
  [types.H5UPDATEPERSONMSG]: ({ commit }, param) => {
    return new Promise((resolve, reject) => {
      window.$.http('/member/message/h5updateMsg', param, { type: 'POST', hideLoading: true }).then(res => {
        if (res.status === window.common.statusConst.SUCCESS) {
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg) // 请求失败
      })
    })
  },
  // 获取未读消息总条数 数据
  [types.H5MSGCOUNT]: ({ commit }, param) => {
    return new Promise((resolve, reject) => {
      window.$.http('/member/index/msgCount', param, {
        type: 'POST',
        hideLoading: true
      }).then(res => {
        if (res.status === window.common.statusConst.SUCCESS) {
          commit(types.H5MSGCOUNT_MUTATION, res)
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg) // 请求失败
      })
    })
  }
}
