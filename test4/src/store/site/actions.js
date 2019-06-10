import * as types from './type'

export const actions = {
  // 会员登出
  [types.LOGOUT_ACTION]: ({ commit }, params) =>
  new Promise((resolve, reject) => {
    window._fetch({
      Action: 'common/logout',
      Requirement: params
    }).then(function (res) {
      resolve(res)
    }, function (res) {
      reject(res)
    })
  })
}
