import * as types from './type'
import * as statusCode from '../../utils/status_const'

export const actions = {
  // 现金流查询初始化
  [types.QUERYCASHSTREAMINIT_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/currentRecord/h5MoneyRecordInit', param, { type: 'POST' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          commit(types.QUERYCASHSTREAMINIT_MUTATION, res)
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg)
      })
    }),
  // 根据时间获取现金流事件
  // [types.QUERYREBATEBYTIME_ACTION]: ({commit}, param) =>
  //   new Promise((resolve, reject) => {
  //     window.$.http('/rebate/getEventByTime', param, {type: 'POST'}).then(res => {
  //       if (res.code === statusCode.statusConst.SUCCESS) {
  //         commit(types.QUERYREBATEBYTIME_MUTATION, res)
  //       }
  //       resolve(res)
  //     }).catch(err => {
  //       window.layer.msgWarn(err.msg)
  //     })
  //   }),
  // 现金流查询操作
  [types.QUERYCASHSTREAMLIST_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/api/currentRecord/queryMoneyRecordList', param, { type: 'POST' }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          commit(types.QUERYCASHSTREAMLIST_MUTATION, res)
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
