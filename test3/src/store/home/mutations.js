import * as types from './type'
import * as statusCode from '../../utils/status_const'
export const state = {
  title: '', // 标题
  path: '', // 当前路径
  folderUrl: '', // 动态文件夹参数
  mobAgtHeadLogo: '', // logo 头部
  mobAgtLoginLogo: '', // logo 登陆页面
  previewLoginLogo: '', // 预览 url
  previewHeadLogo: '',
  fastDfsUrl: '', // 文案类 资源 地址
  MuseUI: {
    open: false, // 左側
    dockedLeft: true
  },
  slots: [{ // agent add 账号类型
    flex: 1,
    values: ['代理', '会员'],
    className: 'slot1',
    textAlign: 'center'
  }],
  hideMenuList: [], // 要隐藏的菜单列表
  userInfo: {
    agentNum: 0, // 今日新增代理数量
    memberNum: 0, // 会员数量
    balance: 0, // 余额
    yesterdayMoney: 0 // 昨日返水
  },
  onlineService: {}, // 在线客服
  isLogined: null, // 登录状态，0未登录，1已登录
  headerType: 1, // 头部类型
  headTitle: '', // 头部标题
  showLoading: true, // loading图
  otherData: {}, // 权限控制
  isLegendCode: false
}
export const mutations = {
  [types.PREVIEW_MUTATION] (state, res) {
    // 每次登录之后将之前选中的会员数据清空
    if (res.data.fastDfsUrl) {
      state.fastDfsUrl = res.data.fastDfsUrl
    }
    if (res.data.article && res.data.article[0]) {
      if (res.data.article[0].type === 'mobLoginLogo') {
        state.previewLoginLogo = res.data.article[0]
      }
      if (res.data.article[0].type === 'mobAgtHeadLogo') {
        state.previewHeadLogo = res.data.article[0]
      }
    }
  },
  [types.LOGIN_MUTATION] (state, res) {
    // 每次登录之后将之前选中的会员数据清空
    window.store.state.member.chooseMember = null
    window.store.state.member.mnyCodeQuantitySet = null
    window.store.state.member.memberMoney = 0
    window.store.state.member.xtoken = ''
  },
  [types.LOGINTOW_MUTATION] (state, res) {
    state.isLegendCode = true
  },
  [types.LOGOUT_MUTATION] (state) {
    // 每次登出之后将之前选中的会员数据清空
    window.store.state.member.chooseMember = null
    window.store.state.member.mnyCodeQuantitySet = null
    window.store.state.member.memberMoney = 0
    window.store.state.member.xtoken = ''
    state.isLogined = 0
    state.otherData = {}
  },
  [types.QUERYINDEX_MUTATION] (state, res) {
    if (res.code === statusCode.statusConst.SUCCESS) { // 返回数据成功
      try {
        state.userInfo = {
          agentNum: res.data.agentNum,
          memberNum: res.data.memberNum,
          balance: res.data.balance,
          yesterdayMoney: res.data.yesterdayMoney
        }
      } catch (error) {
        // this.$store.state.site.openOuterlayer = true // 首页游戏公告显示
      }
    }
  },
  [types.INITDATA_MUTATION] (state, res) {
    state.isLogined = res.data.isLogined
    state.onlineService = res.data.onlineService
    if (res.data.fastDfsUrl) {
      state.fastDfsUrl = res.data.fastDfsUrl
    }
    if (res.data.mobAgtHeadLogo) {
      state.mobAgtHeadLogo = res.data.mobAgtHeadLogo
    }
    if (res.data.mobAgtLoginLogo) {
      state.mobAgtLoginLogo = res.data.mobAgtLoginLogo
    }
    // 未登录状态直接跳出
    if (res.data.isLogined === 0) {
      state.otherData = {}
      window.router.push('/m/login')
    } else {
      res.otherData.forEach((val, index) => {
        state.otherData[val] = index
      })
      // 如果已经是登录状态了并且是在登录页面直接跳转到首页
      if (location.href.indexOf('/m/login') > 0) {
        window.router.push('/m/index')
      }
    }
  }
}
