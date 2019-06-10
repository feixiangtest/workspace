import * as types from './type'
import * as statusCode from '../../utils/status_const'
export const state = {
  agentMoney: 0
}
export const mutations = {
  [types.SAVESETBYAGENTMEMBER_MUTATION] (state, res) {
    if (res.code === statusCode.statusConst.SUCCESS) { // 返回数据成功
      try {

      } catch (error) {
      }
    }
  },
  [types.SAVESETBYAGENT_MUTATION] (state, res) {
    if (res.code === statusCode.statusConst.SUCCESS) { // 返回数据成功
      try {

      } catch (error) {
      }
    }
  },
  [types.AGENTMONEY_MUTATION] (state, res) {
    if (res.code === statusCode.statusConst.SUCCESS) { // 返回数据成功
      try {
        state.agentMoney = res.data.agentMoney
      } catch (error) {
      }
    }
  }
}
