import * as types from './type'
let statusConst = window.common.statusConst
export const actions = {
  /** 跳转第三方，根据参数获取对应的链接 */
  [types.THIRD_ACTION]: ({ commit }, param) => {
    return new Promise((resolve, reject) => {
      window.$.http('/member/tpsPlatformLogin/loginGame', param, {
        type: 'POST'
      }).then((res) => {
        if (res.status === statusConst.SUCCESS) {
          resolve(res)
        } else {
          var myReg = /\\n/gi
          res.msg = res.msg.replace(myReg, '')
          window.layer.msgWarn(res.msg + '', function () {
            window.common.closeLtWindow() // 关闭当前窗口
          })
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg)
      })
    })
  },
  /** 跳转第三方 检查是否可用 */
  [types.THIRD_CHECK]: ({ commit }, param) => {
    return new Promise((resolve, reject) => {
      window.$.http('/member/tpsPlatformLogin/getGameStatus', param, {
        type: 'POST'
      }).then((res) => {
        if (res.status === statusConst.SUCCESS) {
          resolve(res)
        } else {
          var myReg = /\\n/gi
          res.msg = res.msg.replace(myReg, '')
          window.layer.msgWarn(res.msg + '', function () {
            window.common.closeLtWindow() // 关闭当前窗口
          })
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg)
      })
    })
  }
}
