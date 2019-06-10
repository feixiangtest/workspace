import * as types from './type'
import * as statusCode from '../../utils/status_const'

export const actions = {
  // 设置筹码
  [types.CHIPS_ACTION_SETCHIPS]: ({commit}, chipsParams) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'common/settingMemberChips',
        Requirement: chipsParams
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          commit(types.CHIPS_SAVE_MUTATION, res, chipsParams)

          resolve(res)
        } else {
          reject(res)
        }
      })
    })
}
