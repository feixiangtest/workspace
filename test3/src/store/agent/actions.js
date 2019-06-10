import * as types from './type'
import * as statusCode from '../../utils/status_const'

export const actions = {
  /** agent 基本信息 */
  [types.AGENT_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http(param.url, param.param, { type: 'POST' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          commit(types.AGENT_MUTATION, res)
          resolve(res)
        } else {
          reject(res)
          if (res.msg && param.param.searchVal) {
            window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
          }
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg)
      })
    }),
  // 获取代理数据
  [types.AGENT_EDIT_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/agent/h5EditAgentInit', param, { type: 'POST' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          commit(types.AGENT_EDIT_MUTATION, res)
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
  // UPDATE
  [types.AGENT_UPDATE_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/agent/updateAgent', param, { type: 'POST' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          // commit(types.AGENT_EDIT_MUTATION, res)
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
  // 添加 查询 接口
  [types.AGENT_ADD_INIT]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/agent/h5AddAgentInit', param, { type: 'POST' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          commit(types.AGENT_ADD_MUTATION, res)
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
  // 添加
  [types.AGENT_ADD_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      // 代理-直属添加确定
      window.$.http(`/api/agent/${param._id ? 'saveAgent' : 'saveAgentDirect'}`, param, { type: 'POST' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          commit(types.AGENT_ADD_MUTATION, res)
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
  // 存取
  [types.AGENT_SAVE_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/agent/updateAgentBalance', param, { type: 'POST' }).then(res => {
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
  // level
  [types.AGENT_LEVEL_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/agent/h5AgentPageInit\n', param, { type: 'POST' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          commit(types.AGENT_LEVEL_MUTATION, res)
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
    })
}
