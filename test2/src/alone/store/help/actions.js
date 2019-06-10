import * as types from './type'
let statusCode = window.common.statusConst
export const actions = {
  /** 根据导航ID获取帮助中心文案 */
  [types.GETCONTENTBYID]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/member/help/getContentById', param).then((res) => {
        if (res.status === statusCode.SUCCESS) { // 返回数据成功
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg, function () { })
        }
      })
    }),
  // 获取帮助中心导航
  [types.GETNAVIGATIONMENU]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/member/help/getNavigationMenu', param).then((res) => {
        if (res.status === statusCode.SUCCESS) { // 返回数据成功
          commit(types.GETNAVIGATIONMENU, res)
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg, function () { })
        }
      })
    }),
  // 搜索帮助中心文案
  [types.SEARCHARTICLE]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/member/help/searchArticle', param).then((res) => {
        if (res.status === statusCode.SUCCESS) { // 返回数据成功
          commit(types.SEARCHARTICLE, res)
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg, function () { })
        }
      })
    })
}
