import * as types from './type'
export const actions = {
/* 额度转换页面初始化数据 */
  [types.MONEYCONVERSION_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      let url = '/member/moneyConversion/moneyConversion'
      window.$.http(url, param, { type: 'POST', hideLoading: true }).then((res) => {
        if (res.status === window.common.statusConst.SUCCESS) { // 返回数据成功
          commit(types.MONEYCONVERSION_ACTION, res)
          resolve(res)
        } else {
          reject(res)
          if (res.msg && res.msg.indexOf('试玩') > -1) {
          } else {
            window.layer.msgWarn(res.msg, function () {
            })
          }
        }
      })
    }),
  // 刷新余额
  [types.UPDATESESSIONMONEY]: ({ commit }, param) => {
    return new Promise((resolve, reject) => {
      let url = '/member/moneyConversion/updateSessionMoney?t=' + new Date().getTime()
      window.$.http(url, param, { type: 'POST', hideLoading: true }).then(res => {
        if (res.status === window.common.statusConst.SUCCESS) {
          commit(types.UPDATESESSIONMONEY, res)
          resolve(res)
        } else {
          if (res.msg) window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
        }
      }).catch(err => {
        if (err.msg) window.layer.msgWarn(err.msg) // 请求失败
      })
    })
  },
  // 请求后台校验错误次数
  [types.GETLOGINFAILTIMES]: ({ commit }, param) => {
    return new Promise((resolve, reject) => {
      window.$.http('/member/account/getLoginFailTimes', param, { type: 'POST', hideLoading: true }).then(res => {
        if (res.status === window.common.statusConst.SUCCESS) {
          resolve(res)
        } else {
          reject(res)
          if (res.msg) window.layer.msgWarn(res.msg)
        }
      }).catch(err => {
        if (err.msg) window.layer.msgWarn(err.msg)
      })
    })
  },
  // 请求后台校验输入的账号和密码
  [types.VALIDMEMBERINFO]: ({ commit }, param) => {
    return new Promise((resolve, reject) => {
      window.$.http('/member/account/validMemberInfo', param, { type: 'POST', hideLoading: true }).then(res => {
        if (res.status === window.common.statusConst.SUCCESS) {
          resolve(res)
        } else {
          reject(res)
          // window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
        }
      }).catch(err => {
        if (err.msg) window.layer.msgWarn(err.msg)
      })
    })
  },
  [types.LOGIN]: ({ commit }, param) => {
    return new Promise((resolve, reject) => {
      window.$.http('/member/account/login', param, { type: 'POST' }).then(res => {
        if (res.status === window.common.statusConst.SUCCESS) {
          commit(types.LOGIN, res)
          // 提交会员登入弹窗消息
          commit(types.POPUPMESSAGE_MUTATION, res.data.popupMessage)
          resolve(res)
        } else {
          if (res.code === 4) { // 如果用户已登录，刷新页面
            window.layer.msgWarn(res.msg, () => {
              location.reload()
            })
          } else {
            reject(res)
            if (err.msg) window.layer.msgWarn(err.msg) // 请求成功，但是返回状态码不正确
          }
        }
      }).catch(err => {
        if (err.msg) window.layer.msgWarn(err.msg)
      })
    })
  },
  [types.LOGINOUT]: ({ commit }) => {
    return new Promise((resolve, reject) => {
      window.$.http('/member/account/logout', {}, { type: 'POST', hideLoading: true }).then(res => {
        if (res.status === window.common.statusConst.SUCCESS) {
          commit(types.LOGINOUT, res)
          resolve(res)
        }
      }).catch(err => {
        if (err.msg) window.layer.msgWarn(err.msg)
      })
    })
  },
  // 获取注册显示的字段
  [types.REG_GET]: ({ commit }, param) => {
    return new Promise((resolve, reject) => {
      window.$.http('/member/account/queryAddMemberSet', param, { type: 'POST' }).then(res => {
        let { type } = param
        if (res.code === window.common.statusConst.SUCCESS * 1) { // 返回数据成功
          if (type === 'h5') commit(types.REG_ACTION, res)
          resolve(res)
          return
        } else {
          window.layer.msgWarn(res.msg, function () {
            if (type !== 'h5') {
              window.router.push('/home')
            } else {
              window.router.push('/index')
            }
          })
        }
        reject(res)
      }).catch(err => {
        if (err.msg) window.layer.msgWarn(err.msg)
      })
    })
  },
  /** 试玩 */
  [types.LOGIN_FREE_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      if (window.store.state.user && window.store.state.user.isLogin) {
        return ''
      }
      window.$.http('/member/account/freePlay', {}, { type: 'POST' }).then(res => {
        if (res.status === window.common.statusConst.SUCCESS) {
          commit(types.LOGIN_FREE_MUTATION, res)
          resolve(res)
        } else {
          if (res.msg) window.layer.msgWarn(res.msg)
        }
      }).catch(res => {
        if (res.msg) window.layer.msgWarn(res.msg)
      })
    })
  // 校验取款密码
}
