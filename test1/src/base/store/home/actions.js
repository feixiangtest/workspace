import * as types from './type'
import * as statusCode from '../../utils/status_const'

export const actions = {
  /**
   * 电子游戏查询
   */
  [types.QUERY_GAME_LIST_ACTION]: ({commit}, param) =>
  new Promise((resolve, reject) => {
    window._fetch({
      Action: 'api/wap/electron/queryGameList',
      Requirement: param
    }).then(function (res) {
      if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
        commit(types.QUERY_GAME_LIST_MUTATION, res)
        resolve(res)
      } else if (res.status === statusCode.statusConst.ISLOGIN) {
        window.layer.msgWarn(res.msg, function () {
          window.indexMain.closeLtWindow() // 关闭当前窗口
        })
      } else {
        window.layer.msgWarn(res.msg)
        reject(res)
      }
    }, function (res) {
      reject(res)
    })
  }),
  /** 首页信息 */
  [types.INITDATA]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      let memberToken
      // APP传递token
      if (window.myNative && window.myNative.isApp && window.myNative.isApp()) {
        memberToken = window.myNative.getMemberToken()
      } else { // 兼容之前APP版本
        let mt = localStorage.getItem('memberToken')
        if (mt) {
          memberToken = mt
        }
      }
      let op = {
        'list': param
      }
      if (memberToken) {
        op['loginToken'] = memberToken
      }
      window._fetch({
        Action: 'api/wap/wapIndex/queryIndexModel',
        Requirement: op
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) {
          commit(types.INITDATA_DETAIL, res)
          resolve(res)
        } else {
          window.layer.msgWarn(res.msg, function () {})
        }
      })
    }),
  /** 登录 */
  [types.LOGIN_ACTION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/wapLogin/login',
        Requirement: param
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) {
          commit(types.LOGIN_MUTATION, res)
        } else {
          window.layer.msgWarn(res.msg, function () {})
        }
        resolve(res)
      }, function (res) {
        reject(res)
      })
    }),
  /** 登出 */
  [types.LOGOUT_ACTION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/wapLogin/logout',
        Requirement: {}
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) {
          commit(types.LOGOUT_DETAIL, res)
        }
        resolve(res)
      })
    }),
  /** 优惠活动查询 */
  [types.PROMOTION_ACTION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/wapIndex/preferential',
        Requirement: param
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) {
          commit(types.PROMOTION_DETAIL, res)
        } else {
          window.layer.msgWarn(res.msg, function () {})
        }
        resolve(res)
      })
    }),

  /** 我的最爱列表 */
  [types.FAVORITE_LIST_ACTION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/wapFavorite/queryFavorite',
        Requirement: {}
      }).then(res => {
        console.info('queryFavorite:', res)
        if (res.status === statusCode.statusConst.SUCCESS) {
          commit(types.FAVORITE_LIST_DETAIL, res)
          resolve(res)
        } else if (res.status === statusCode.statusConst.FAILURE) {
          window.router.push('/wap/login')
        }
      })
    }),
  /** 添加我的最爱, 删除我的最爱 一个接口 */
  [types.FAVORITE_ACTION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/wapFavorite/saveFavorite',
        Requirement: param
      }).then(function (res) {
        resolve(res)
      })
    }),
  /** 保存最近浏览 */
  [types.RENT_ACTION]: ({commit}, param) =>
   new Promise((resolve, reject) => {
     window._fetch({
       Action: 'api/wap/wapRecent/saveRecent',
       Requirement: param
     }).then(function (res) {
       resolve(res)
     })
   }),
  /** 最近浏览列表 */
  [types.RENT_LIST_ACTION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/wapRecent/queryRecent',
        Requirement: {

        }
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) {
          commit(types.RENT_LIST_DETAIL, res)
          resolve(res)
        } else if (res.status === statusCode.statusConst.FAILURE) {
          window.router.push('/wap/login')
        }
      })
    }),
  /** 忘记密码 */
  [types.FORGOT_PASSWORD_ACTION]: ({commit}, param) =>
  new Promise((resolve, reject) => {
    window._fetch({
      Action: 'api/wap/wapLogin/forgotPassword',
      Requirement: param
    }).then(function (res) {
      if (res.status === statusCode.statusConst.SUCCESS) {
        commit(types.FORGOT_PASSWORD_MUTATION, res)
      } else {
        window.layer.msgWarn(res.msg, function () {})
      }
      resolve(res)
    }, function (res) {
      reject(res)
    })
  }),
  /** 第三方电子游戏登录 */
  [types.LOGIN_GAME_ACTION]: ({commit}, param) =>
    new Promise((resolve, reject) => {
      window._fetch({
        Action: 'api/wap/electron/loginEleGame',
        Requirement: param
      }).then(function (res) {
        if (res.status === statusCode.statusConst.SUCCESS) {
          commit(types.LOGIN_GAME_MUTATION, res)
        } else {
          var myReg = /\\n/gi
          res.msg = res.msg.replace(myReg, '')
          window.layer.msgWarn(res.msg, function () {})
        }
        resolve(res)
      }, function (res) {
        reject(res)
      })
    }),
  /** 试玩 */
  [types.LOGIN_FREE_ACTION]: ({commit}, param) =>
  new Promise((resolve, reject) => {
    window._fetch({
      Action: 'api/wap/wapLogin/freePlay',
      Requirement: param
    }).then(function (res) {
      if (res.status === statusCode.statusConst.SUCCESS) {
        commit(types.LOGIN_FREE_MUTATION, res)
      } else {
        window.layer.msgWarn(res.msg, function () {})
      }
      resolve(res)
    }, function (res) {
      reject(res)
    })
  }),
  /** 第三方活动登录 */
  [types.LOGIN_ACTIVITY_ACTION]: ({commit}, param) =>
  new Promise((resolve, reject) => {
    window._fetch({
      Action: 'api/wap/tpsActivity/activity',
      Requirement: param
    }).then(function (res) {
      if (res.status === statusCode.statusConst.SUCCESS) {
        commit(types.LOGIN_ACTIVITY_MUTATION, res)
      } else {
        window.layer.msgWarn(res.msg, function () {})
      }
      resolve(res)
    }, function (res) {
      reject(res)
    })
  })
}
