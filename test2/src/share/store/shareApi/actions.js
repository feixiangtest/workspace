import * as types from './type'

export const actions = {
  /** 初始化接口 */
  [types.INITDATA]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      /*
       *   会员中心 使用 本地 localStorage 的 数据
       *   location.pathname.indexOf("center")
       *
       *   localStorage 的 数据  是站点那边 保存进来的
       * */
      if (location.pathname.indexOf('center') >= 1) {
        let a = localStorage.queryIndex
        if (a && a.length > 20) {
          commit(types.INITDATA_DETAIL, JSON.parse(a))
          resolve(a)
          setTimeout(() => {
            delete localStorage.queryIndex
          }, 10)
          return ''
        }
      }
      window.$.http('/member/index/queryIndex', param, { type: 'POST', hideLoading: true }).then((res) => {
        commit(types.INITDATA_DETAIL, res)
        resolve(res)
      })
    }),
  // 更改取款密码
  [types.CHANGEDRAWPWD]: ({ commit }, param) => {
    return new Promise((resolve, reject) => {
      window.$.http('/member/account/modifyMemberDrawPwd', param, { type: 'POST' }).then(res => {
        console.log(res, 'SETDRAWPWDRes')
        if (res.status === window.common.statusConst.SUCCESS) {
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg) // 请求失败
      })
    })
  },
  // 更改登录密码
  [types.CHANGELOGINPWD]: ({ commit }, param) => {
    return new Promise((resolve, reject) => {
      window.$.http('/member/account/modifyMemberLoginPwd', param, { type: 'POST' }).then(res => {
        console.log(res, 'MODIFYMEMBERLOGINPWD')
        if (res.status === window.common.statusConst.SUCCESS) {
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg) // 请求失败
      })
    })
  },
  // 初始化历史消息数据
  [types.INITHISTORYMSG]: ({ commit }, param) => {
    return new Promise((resolve, reject) => {
      window.$.http('/member/message/getSystemMessage', param, { type: 'POST', hideLoading: true }).then(res => {
        if (res.status === window.common.statusConst.SUCCESS) {
          let messageList = []
          try {
            messageList = res.data.messageList
          } catch (e) {
          }
          window._.each(messageList, (a) => {
            a.gbkContent = a.gbkContent.replace(/\\n/ig, ' ')
          })
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg) // 请求失败
      })
    })
  },
  // 初始化最新消息数据
  [types.INITLASTESTMSG]: ({ commit }, param) => {
    return new Promise((resolve, reject) => {
      window.$.http('/member/message/getSystemMessage', param, { type: 'POST' }).then(res => {
        if (res.status === window.common.statusConst.SUCCESS) {
          let messageList = []
          try {
            messageList = res.data.messageList
          } catch (e) {
          }
          window._.each(messageList, (a) => {
            a.gbkContent = a.gbkContent.replace(/\\n/ig, ' ')
          })
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg) // 请求失败
      })
    })
  },
  // 初始化个人消息数据
  [types.INITPERSONALMSG]: ({ commit }, param) => {
    return new Promise((resolve, reject) => {
      window.$.http('/member/message/getMemberMessage', param, { type: 'POST' }).then(res => {
        if (res.status === window.common.statusConst.SUCCESS) {
          let messageList = []
          try {
            messageList = res.data.messageList
          } catch (e) {
          }
          window._.each(messageList, (a) => {
            if (a.gbkContent) a.gbkContent = a.gbkContent.replace(/\\n/ig, ' ')
          })
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg) // 请求失败
      })
    })
  },
  // 删除或者标记已读个人消息数据
  [types.UPDATEPERSONMSG]: ({ commit }, param) => {
    return new Promise((resolve, reject) => {
      window.$.http('/member/message/updateMsg', param, { type: 'POST', hideLoading: true }).then(res => {
        if (res.status === window.common.statusConst.SUCCESS) {
          let messageList = []
          try {
            messageList = res.data.messageList
          } catch (e) {
          }
          window._.each(messageList, (a) => {
            a.gbkContent = a.gbkContent.replace(/\\n/ig, ' ')
          })
          window.store.dispatch('pcMsgCount.action').then(res => {
          })
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg) // 请求失败
      })
    })
  },
  // 获取会员留言
  [types.MESSAGELIST]: ({ commit }, param) => {
    return new Promise((resolve, reject) => {
      window.$.http('/member/sysLeaveMessage/messageList', param, { type: 'POST', hideLoading: true }).then(res => {
        if (res.status === window.common.statusConst.SUCCESS) {
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg) // 请求失败
      })
    })
  },
  // 添加会员留言
  [types.ADDLEAVEMESSAGE]: ({ commit }, param) => {
    return new Promise((resolve, reject) => {
      window.$.http('/member/sysLeaveMessage/addLeaveMessage', param, { type: 'POST' }).then(res => {
        if (res.status === window.common.statusConst.SUCCESS) {
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg) // 请求失败
      })
    })
  },
  // 查看留言回复
  [types.GETREPLY]: ({ commit }, param) => {
    return new Promise((resolve, reject) => {
      window.$.http('/member/sysLeaveMessage/getReply', param).then(res => {
        if (res.status === window.common.statusConst.SUCCESS) {
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg) // 请求成功，但是返回状态码不正确
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg) // 请求失败
      })
    })
  },
  /** 忘记密码 */
  [types.FORGOT_PASSWORD_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/member/account/forgotPassword', param).then((res) => {
        if (res.status === window.common.statusConst.SUCCESS) {
          commit(types.FORGOT_PASSWORD_MUTATION, res)
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg)
        }
      })
    }),
  /** 获取维护公告 */
  [types.GET_MAINTAIN_NOTICE_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/member/message/getMaintainNotice', {}, { type: 'POST', hideLoading: true }).then(res => {
        if (res.status == window.common.statusConst.SUCCESS) {
          // firefox 有bug 不要改这里 为 ===
          commit(types.GET_MAINTAIN_NOTICE_MUTATION, res)
          resolve(res)
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg)
      })
    }),
  /**
   * 预览案件
   */
  [types.LOADARTICLE_ACTION]: ({ commit }, param) => {
    return new Promise((resolve, reject) => {
      window.$.http('/member/wiArticle/loadPreview', param, {
        type: 'POST'
      }).then((res) => {
        console.log(res, 'res')
        commit(types.IS_PREVIEW_MUTATION, 1)
        if (res.status === window.common.statusConst.SUCCESS) {
          commit(types.SECTIONLIST_MUTATION, res)
          commit(types.LOADARTICLE_MUTATION, res)
          resolve(res)
        } else {
          commit(types.SECTIONLIST_MUTATION, '')
          commit(types.LOADARTICLE_MUTATION, {})
          window.layer.msgWarn(res.msg)
          reject(res)
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg)
      })
    })
  },
  /**
   * 交易记录-投注记录-有些结果
   */
  [types.GETGAMERESULT_ACTION]: ({ commit }, param) => {
    return new Promise((resolve, reject) => {
      window.$.http('/member/bettingRecord/queryVideoInstantBettingDetail', param, {
        type: 'POST'
      }).then((res) => {
        if (res.status === window.common.statusConst.SUCCESS) {
          resolve(res)
        } else {
          resolve(res)
        }
      }).catch(err => {
        window.layer.msgWarn(err.msg)
      })
    })
  },
  /** 接口名称 查询银行列表 */
  [types.GETBANAKLIST_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/member/pay/getBankList', param).then((res) => {
        if (res.status === window.common.statusConst.SUCCESS) {
          commit(types.GETBANAKLIST_MUTATION, res)
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg)
        }
      })
    }),
  /** 接口名称 查询用户绑定的银行卡 */
  [types.GETBANKINFO_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/member/pay/getBankInfo', param).then((res) => {
        if (res.status === window.common.statusConst.SUCCESS) {
          commit(types.GETBANKINFO_MUTATION, res)
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg)
        }
      })
    }),
  /** 接口名称 查询用户是否设置取款密码 */
  [types.VALIDDRAWPASSWORD_ACTION]: ({ commit }, param) =>
    new Promise((resolve, reject) => {
      window.$.http('/member/drawMoney/validDrawPassword', param).then((res) => {
        if (res.status === window.common.statusConst.SUCCESS) {
          commit(types.VALIDDRAWPASSWORD_MUTATION, res)
          resolve(res)
        } else {
          reject(res)
          window.layer.msgWarn(res.msg)
        }
      })
    })
}
