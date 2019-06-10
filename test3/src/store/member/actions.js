import * as types from './type'
import * as statusCode from '../../utils/status_const'

export const actions = {
  /** 账号管理-会员页面 */
  [types.MEMBERLIST_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/member/memberList', param, { type: 'POST' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          commit(types.MEMBERLIST_MUTATION, res)
          resolve(res)
        } else {
          resolve(res)
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg)
      })
    }),
  /** 账号管理-代理-修改账号状态 */
  [types.CHANGEUSESTATUS_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/agent/changeUseStatus', param, {type: 'POST'}).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          resolve(res)
        } else {
          reject(res)
          if (res.msg) {
          //  window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
          }
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg)
      })
    }),
  // 获取会员数据
  [types.MEMBER_EDIT_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/member/h5EditMemberInit', param, { type: 'POST' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          // commit(types.MEMBER_EDIT_MUTATION, res)
          resolve(res)
        } else {
          reject(res)
          if (res.msg) {
          //  window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
          }
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg)
      })
    }),
  // 更改会员数据
  [types.UPDATE_MEMBER_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/member/updateMember', param, { type: 'POST' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          resolve(res)
        } else {
          reject(res)
          if (res.msg) {
            window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
          }
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg)
      })
    }),
  // add 查询
  [types.MEMBER_ADD_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/member/h5AddMemberInit', param, { type: 'POST' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          // commit(types.MEMBER_ADD_MUTATION, res)
          resolve(res)
        } else {
          reject(res)
          if (res.msg) {
            window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
          }
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg)
      })
    }),
  // save
  [types.MEMBER_SAVE_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/member/saveMember', param, { type: 'POST' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
        // commit(types.AGENT_ADD_MUTATION, res)
          resolve(res)
        } else {
          reject(res)
          if (res.msg) {
            window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
          }
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg)
      })
    }),
  /** 现金系统-查询会员接口 */
  [types.QUERYACCOUNT_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/mnyComRecord/queryAccount', param, { type: 'POST' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          commit(types.QUERYACCOUNT_MUTATION, res)
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg)
      })
    }),
  [types.QUERYACCOUNTBYAGENT_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/mnyComRecord/queryAccountByAgent', param, { type: 'POST' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          commit(types.QUERYACCOUNT_MUTATION, res)
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg)
      })
    }),
  [types.QUERYACCOUNTAGENTMEMBER_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/mnyComRecord/queryAccountByAgentMember', param, { type: 'POST' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          commit(types.QUERYACCOUNT_MUTATION, res)
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg)
      })
    })
}
