import * as types from './type'
import Vue from 'vue'
export const state = {
  gameActiveIndex: 0, // 选中的游戏tab，要保存数据使用
  headback: false,
  headerType: '', // 头部导航-类型
  headTitle: '', // 头部导航-中间标题
  headLeft: '', // 头部导航-左边内容
  headRight: '', // 头部导航-右边内容
  isfloatPage: false, // 是否显示浮动页
  promotion: '', // 优惠活动 详细内容
  h5img: '/resource/h5/img',
  showFoot: true,
  footBtn: '确定', // 底部内容
  floatPageType: Number, // 浮动页显示类型
  modifyWhichPsw: '', // 个人设置页面用 修改登录密码还是取款密码
  forceUpdatePwd: false, // 是否强制修改登录密码
  forceUpdatePwdMsg: '', // 强制修改登录密码的提示语
  openAgreement: false, // 注册页打开开户协议
  isExplain: false, // 操作说明
  loginLogo: {}, // 手机登录页logo
  topLogo: {}, // 手机顶部导航logo
  popupAds: {}, // 手机弹出广告 轮播图
  mobPromotion: {}, // 手机优惠活动
  guideMap: {}, // 手机首页引导图
  isPreview2: 0,
  homeGameList: {}, // 游戏数据
  mobPlayImg: [],
  // shareApi 复制过来的
  account: {},
  isLogin: false,
  articleList: {},
  homeArticle: [], // 底部所有文案
  onlineservice: {}, // 在线客服
  // linksFloatimg: [], // 浮动图,
  announcementList: '', // 最新消息
  sectionListArr: [], // 优惠活动栏目
  mobHeadLogo: false, // 站点logo图
  mobLoginLogo: false, // 登录页面logo
  mobAd: [], // 弹窗广告
  playimg: [], // 轮播图
  staticDomain: '',
  fastDfsUrl: '', // 静态图片服务器
  // station: '',
  type: '', // 用于首页区分判断, 2表示测试会员，1表示是试玩，0表示正常(包括正常用户和非登陆情况)
  showPopLogin: false, // 登录弹框
  showChangePwd: false, // 修改密码弹框
  showForget: false, // 忘记密码显示隐藏
  maintainShow: true, // 维护公告
  loadArticle: '', // 文案数据
  isShowReg: '', // 是否显示注册入口
  mobIndexWapDirectionsList: [], // 引导图
  curSysMsgType: 1, // 最新消息
  mssagesData: {}, // 消息列表参数
  currMsgList: {},
  currMsgCount: '',
  msgCount: '' // 未读消息条数
}
export const mutations = {
/** 首页信息 */
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
      try {
        window.store.state.shareApi.articleList = res.data.articleListH5
      } catch (e) {
      }
      // 存储站点信息
      // window.localStorage.station = JSON.stringify(res.data.station)
      // window.store.dispatch('user.updateSessionMoney', { api: 0 })// 调用刷新余额接口
      state.homeGameList = window.indexMain.handleGameData(res.data.homeGameList) // 获取游戏数据并组装
      if (res.data.account && res.data.account.account) {
        state.msgCount = res.data.account.msgCount // 未读消息条数
        window.store.state.user.isLogin = true // 登录状态
        window.store.state.user.userInfo = res.data.account // 用户信息
        window.store.state.user.userInfo.userType = res.data.type // 用户类型
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
      // 获取所有文案 h5 articleListH5 和 pc articleList 名字不一样
      if (res.data.articleListH5) {
        state.articleList = res.data.articleListH5
        // 底部文案
        state.homeArticle = res.data.articleListH5.homeArticle
        // 在线客服
        state.onlineservice = res.data.articleListH5.onlineservice
        // 左右浮动图
        // state.linksFloatimg = res.data.articleList.linksFloatimg
        // 弹窗公告
        state.mobAd = res.data.articleListH5.mobAd || []
        // 轮播图
        try {
          state.mobPlayImg = res.data.articleListH5.mobPlayImg
        } catch (e) {
          state.mobPlayImg = ''
        }
        // 首页logo 可能不存在 补充 try catch
        try {
          state.mobHeadLogo = res.data.articleListH5.mobHeadLogo
        } catch (e) {
          state.mobHeadLogo = ''
        }
        // 登录logo
        try {
          state.mobLoginLogo = res.data.articleListH5.mobLoginLogo
        } catch (e) {
          state.mobLoginLogo = ''
        }
        // 引导页
        try {
          state.mobIndexWapDirectionsList = res.data.articleListH5.mobIndexWapDirectionsList || []
        } catch (e) {
          state.mobIndexWapDirectionsList = []
        }
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
      // 更改网站title
      if (res.data.station) {
        document.title = res.data.station.title
      }
      state.staticDomain = res.data.staticDomain
      state.fastDfsUrl = res.data.fastDfsUrl
      // 判断是否开放了注册功能
      if (res.data.regStatus) {
        state.isShowReg = true
      } else {
        state.isShowReg = false
      }
    }
    // 初始化完成后调用维护公告接口获取维护公告
    window.store.dispatch('getMaintainNotice.action')
  },
  [types.INITSYSMESSAGE_MUTATION] (state, res) {
    if (res.data) {
      state.mssagesData = res.data
    }
  },
  // 未读消息总条数 数据
  [types.H5MSGCOUNT_MUTATION] (state, res) {
    state.msgCount = res.data
  }
}
