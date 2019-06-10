import * as types from './type'
let statusConst = window.common.statusConst
export const actions = {
  /**
   * 获取上传之后的优惠活动
   */
  [types.GETPROMOTIONLIST_ACTION]: ({ commit }, param) => {
    return new Promise((resolve, reject) => {
      window.$.http('/member/wiArticle/preferential', param, {
        type: 'POST'
      }).then((res) => {
        if (res.status === statusConst.SUCCESS) {
          if (res.data !== null) {
            commit(types.SECTIONLIST_MUTATION, res)
            commit(types.GETPROMOTIONLIST_MUTATION, res)
          }
          resolve(res)
        } else {
          window.layer.msgWarn(res.msg)
          reject(res)
        }
      }).catch(err => {
        alert(err.msg)
      })
    })
  }
}
