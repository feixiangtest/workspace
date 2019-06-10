import * as types from './type'
import * as statusCode from '../../utils/status_const'

export const actions = {
  // 查询后台，投注限额
  [types.BETTING_LIMIT_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'web/lotteryDeatil',
        Requirement: {
          lotteryId: param.lotteryId
        }
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
          commit(types.BETTING_LIMIT_INITDETAIL, res)
          resolve(res)
        } else if (res.status === statusCode.statusConst.ISLOGIN) {
          window.layer.msgWarn(res.msg, function () {
            window.lotteryMain.closeLtWindow() // 关闭当前彩票窗口
          })
        } else {
          reject(res)
        }
      })
    }).catch(function (error) {
      console.info('err ' + JSON.stringify(error))
      if (error.msg) {
        window.layer.msgWarn(error.msg, function () {
          history.go(-1)
        })
      }
    })
}
