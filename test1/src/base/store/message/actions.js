import * as types from './type'
import * as statusCode from '../../utils/status_const'
export const actions = {
  [types.GAMEMESSAGE_ACTION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/wapIndex/getGameMessage',
        Requirement: param
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) {
          commit(types.GAMEMESSAGE_DETAIL, res)
          resolve(res)
        } else {
          window.layer.msgWarn(res.msg, function () {})
        }
      })
    }),
  [types.GAMEMESSAGE_UP]: ({commit}, param) => // 个人消息 阅读+删除
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/wapIndex/updateMsg',
        Requirement: param
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) {
          // commit(types.GAMEMESSAGE_DETAIL, res)
          resolve(res)
        } else {
          window.layer.msgWarn(res.msg, function () {})
        }
      })
    })
}
