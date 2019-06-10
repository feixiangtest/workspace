import * as types from './type'
// import * as statusCode from '../../utils/status_const'

export const state = {
  agentList: {},
  agentEdit: {},
  agentlevel: {},
  agentAdd: {} // 添加代理
}

export const mutations = {
  [types.AGENT_MUTATION] (state, res) {
    if (res.data && res.data.length) {
      state.agentList = res.data
      state.agentList.useStatus = state.agentList.useStatus === 0
      state.agentList.bettingStatus = state.agentList.bettingStatus === 0
    }
  },
  [types.AGENT_EDIT_MUTATION] (state, res) {
    if (res.data) {
      state.agentEdit = res.data
      state.agentEdit.rebateList.forEach((val, index) => {
        val.minRebate = Number(val.minRebate).toFixed(2)
        val.maxRebate = Number(val.maxRebate).toFixed(2)
      })
      state.agentEdit.useStatus = state.agentEdit.useStatus === 0
      state.agentEdit.bettingStatus = state.agentEdit.bettingStatus === 0
    }
  },
  [types.AGENT_LEVEL_MUTATION] (state, res) {
    if (res.data) {
      state.agentlevel = res.data
    }
  },
  [types.AGENT_ADD_MUTATION] (state, res) {
    if (res.data) {
      // 新增 Limit 复用 rebate.js
      res.data.upRebates.forEach(function (val, index) {
        val.maxRebateLimit = Number(val.maxRebate).toFixed(2)
        val.minRebateLimit = Number(val.minRebate).toFixed(2)
        val.maxRebate = ''
        val.minRebate = ''
      })
      state.agentAdd = res.data
    }
  }
}
