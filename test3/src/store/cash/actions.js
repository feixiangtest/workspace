import * as types from './type'
import * as statusCode from '../../utils/status_const'

export const actions = {
  /** 现金系统-会员余额存入 */
  [types.SAVESETBYAGENTMEMBER_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/mnyComRecord/saveSetByAgentMember', param, { type: 'POST' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          commit(types.SAVESETBYAGENTMEMBER_MUTATION, res)
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg)
      })
    }),
  /** 现金系统-代理返水转出 */
  [types.SAVESETBYAGENT_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/mnyComRecord/saveSetByAgent', param, { type: 'POST' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          commit(types.SAVESETBYAGENT_MUTATION, res)
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg)
      })
    }),
  /** 现金系统-代理返水转出 */
  [types.AGENTMONEY_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/mnyComRecord/agentMoney', param, { type: 'POST' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          commit(types.AGENTMONEY_MUTATION, res)
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
