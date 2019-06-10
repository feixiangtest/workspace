import * as types from './type'
import Vue from 'vue'

export const state = {
  userBankInfo: {}, // 获取用户绑定银行卡信息
  account: {},
  isLogin: false,
  articleList: {},
  homeArticle: [], // 底部所有文案
  onlineservice: {}, // 在线客服
  linksFloatimg: [], // 浮动图,
  announcementList: '', // 最新消息
  sectionListArr: [], // 优惠活动栏目
  hpad: [], // 弹窗广告
  playimg: [], // 轮播图
  staticDomain: '',
  fastDfsUrl: '', // 静态图片服务器
  station: '',
  type: '', // 用于首页区分判断, 2表示测试会员，1表示是试玩，0表示正常(包括正常用户和非登陆情况)
  showPopLogin: false, // 登录弹框
  showChangePwd: false, // 修改密码弹框
  showForget: false, // 忘记密码显示隐藏
  maintainNotice: {}, // 维护公告
  isPreview: null, // 是否预览
  loadArticle: '', // 文案数据
  newDurl: '', // 新皮肤地址
  pageMark: '', // 是否显示页签，1显示，其他不显示
  showLoading: false, // 是否展示loading
  reqGetMaintainNotice: true,
  isShowReg: '', // 是否显示注册入口
  reqMoneyConversation: true,
  mobIndexWapDirectionsList: [] // 引导图
}
export const mutations = {

  /** 首页信息 pc 在使用这里 h5 并没有 */
  [types.INITDATA_DETAIL] (state, res) {
    state.isLogin = false
    delete window.localStorage.userInfo
    // 共享登录状态，1 为已登录，其它为未登录
    window.common.loginStatus = ''
    if (!res.data) {
      // 接口异常了 上报下
      if (!res.msg) res.msg = '初始化接口异常'
      window.layer.msgWarn(res.msg)
    }
    if (res.data) {
      // 如果用户数据存在，就显示登录后的状态以及用户信息，然后请求刷新余额接口
      try {
        window.localStorage.queryIndex = JSON.stringify(res)
      } catch (e) {
      }
      state.type = res.data.type// 登录类型
      // 存储站点信息
      window.localStorage.station = JSON.stringify(res.data.station)
      // window.store.dispatch('user.updateSessionMoney', { api: 0 })// 调用刷新余额接口
      if (res.data.account && res.data.account.account) {
        window.store.state.user.isLogin = true // 登录状态
        window.store.state.user.userInfo.account = res.data.account.account // 用户信息
        window.store.state.user.userInfo.realName = res.data.account.realName // 用户信息
        Vue.set(window.store.state.user, 'msgCount', res.data.account.msgCount) // 显示的消息数量
        // if (res.data.account.money) window.store.state.user.userInfo.totalmoney = res.data.account.money // 用户余额
        if (res.data.account.money) window.store.state.user.userInfo.totalmoney = 0 // 用户余额
        window.localStorage.userInfo = JSON.stringify(res.data.account)
        // 共享登录状态，1 为已登录，其它为未登录
        window.common.loginStatus = '1'
        // 共享登录会员类型
        window.common.userType = res.data.type
      } else {
        Vue.set(window.store.state.user, 'isLogin', false)
      }
      // 获取所有文案
      if (res.data.articleList) {
        state.articleList = res.data.articleList
        // 底部文案
        state.homeArticle = res.data.articleList.homeArticle
        // 在线客服
        state.onlineservice = res.data.articleList.onlineservice
        // 左右浮动图
        state.linksFloatimg = res.data.articleList.linksFloatimg
        // 弹窗公告
        state.hpad = res.data.articleList.hpad
        // 轮播图
        state.playimg = res.data.articleList.playimg
        // 引导页
        // state.mobIndexWapDirectionsList = state.articleList.mobIndexWapDirectionsList
        state.mobIndexWapDirectionsList = [{
          'id': 330795,
          'type': 'mobWapDirections',
          'titleSim': '1',
          'cpicSim': '/uploads/images/interim/haitian/c5368b3b-977c-4f5c-a738-3606f8e22b82.png',
          'contextSim': '',
          'junctionSim': '',
          'nowSort': 1
        }]
      }
      // 获取最新消息
      if (res.data.announcementList) {
        // 设定最新消息
        try {
          state.announcementList = res.data.announcementList[0].gbkContent// 这个获取的数据不对，用历史消息那个来算
          // 过滤 \n 字符串
          state.announcementList = state.announcementList.replace(/\\n/ig, ' ')
        } catch (e) {
        }
      }
      // 设置标题与标题图标
      if (res.data.station) {
        document.title = res.data.station.title
        let link = document.createElement('link')
        link.type = 'image/x-icon'
        link.rel = 'shortcut icon'
        link.href = `/resource/${res.data.station.durl}/images/favicon.ico`
        // logMonit msg: Uncaught TypeError: Cannot read property 'tagName' of null
        try {
          document.getElementsByTagName('head')[0].appendChild(link)
        } catch (e) {
        }
        state.newDurl = res.data.station.newDurl // 新皮肤字段
      }
      state.staticDomain = res.data.staticDomain
      state.fastDfsUrl = res.data.fastDfsUrl
      state.station = res.data.staticDomain
      // 初始化完成后调用维护公告接口获取维护公告
      if (state.reqGetMaintainNotice) {
        window.store.dispatch('getMaintainNotice.action')
      }
      if (res.data.account && res.data.account.account) {
        // console.log('会员端初始化indexquery回调成功调用的更新余额')
        if (state.reqMoneyConversation) {
          window.store.dispatch('user.moneyConversion', { api: 0 })// 调用刷新余额接口
        }
      }
      // 判断是否开放了注册功能
      if (res.data.regStatus) {
        state.isShowReg = true
      } else {
        state.isShowReg = false
      }
    }
  },
  /**
   * 忘记密码
   * @param {*} state
   * @param {*} res
   */
  [types.FORGOT_PASSWORD_MUTATION] (state, res) {

  },
  /**
   * 获取维护公告
   * @param {*} state
   * @param {*} res
   */
  [types.GET_MAINTAIN_NOTICE_MUTATION] (state, res) {
    if (res.data.content && res.data.announcementName) {
      let resM5 = res.data.content + res.data.announcementName
      if (resM5 && resM5 == localStorage.maintainNotice) {
        return ''
      }
      delete localStorage['maintainNotice.stop']
      localStorage.maintainNotice = resM5
      state.maintainNotice = res.data
    }
  },
  /**
   *预览标识
   * @param {*} state
   * @param {*} res
   */
  [types.IS_PREVIEW_MUTATION] (state, data) {
    state.isPreview = data
  },
  /**
   * 预览的案件
   * @param {*} state
   * @param {*} res
   */
  [types.LOADARTICLE_MUTATION] (state, res) {
    // 判断是否有数据
    if (res.data && res.data.articleVo) {
      // 案件数据
      state.loadArticle = res.data.articleVo
      console.log(res.data, 'res.data')
      try {
        if (res.data.articleVo.articleDoc && res.data.articleVo.articleDoc.pageMark) {
          state.pageMark = res.data.articleVo.articleDoc.pageMark
        }
      } catch (err) {
        console.log(err)
      }
    } else {
      // 重置数据
      state.loadArticle = ''
    }
  },
  /**
   * 获取所有栏目
   * @param {*} state
   * @param {*} res
   */
  [types.SECTIONLIST_MUTATION] (state, res) {
    if (res && res.data.sectionList && res.data.sectionList.length) {
      state.sectionListArr = res.data.sectionList
    } else {
      state.sectionListArr = []
    }
  },
  /**
   * 获取所有银行列表
   * @param {*} state
   * @param {*} res
   */
  [types.GETBANAKLIST_MUTATION] (state, res) {
  },
  /**
   * 获取用户绑定的银行卡
   * @param {*} state
   * @param {*} res
   */
  [types.GETBANKINFO_MUTATION] (state, res) {
    if (res && res.data) {
      state.userBankInfo = res.data
    }
  },
  /**
   * 获取用户是否设置取款密码
   * @param {*} state
   * @param {*} res
   */
  [types.VALIDDRAWPASSWORD_MUTATION] (state, res) {
  }
}
