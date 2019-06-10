import * as types from './type'
import * as statusCode from '../../utils/status_const'
import { nodeCdnUrl } from '../../config/customComponents'
export const state = {
  showLoading: false, // 异步加载显示加载效果
  versionUrl: 'RESOURCE_VERSION',
  commonImgUrl: 'CDNURL_VARIABLE/static/RESOURCE_VERSION/local/img', // 统一的公共图片路径，如果需要更改版本号只需要修改这里即可
  commonCustomImgUrl: '', // 站点自定义皮肤的统一的公共图片路径，如果需要更改版本号只需要修改这里即可
  title: '', // 标题
  path: '', // 当前路径
  MuseUI: {
    open: false, // 左側
    openR: false, // 右側
    dockedLeft: true,
    dockedRight: true
  }, // 新組件 保存數據
  electricSearch: false, // 显示电子搜索栏
  isLogin: false,
  announcementList: [],
  gameList: [], // 首页列表
  eGamesList: [], // 电子游戏界面数据列表
  eGamesTypeList: [], // 电子游戏所有类型数据列表，是eGamesList的子集
  eGameIds: [], // 电子游戏大类的ID集合
  eGamekeys: [], // 电子游戏类型的modelType集合，如：AGEL、MGEL
  liveGameList: [], // 视讯列表
  sportList: [], // 体育列表
  cpList: [], // 彩票列表
  qpList: [], // 棋牌列表
  byGamesList: [], // 捕鱼列表
  favoriteList: [], // 我的最爱列表
  recentsList: [], // 最近浏览
  mobIndexWapDirectionsList: [], // 引导图
  mobIndexIsShow: true, // 用于底部菜单是否显示
  type: '', // 用于首页区分判断, 2表示测试会员，1表示是试玩，0表示正常(包括正常用户和非登陆情况)
  userInfo: {}, // 登录后保存用户信息
  listArticleVo: [], // 各种文案列表
  templist: [], // photoDocList用于该数组的组装
  promotionList: [], // 优惠活动列表
  mobHeadLogo: false, // 站点logo图
  mobLoginLogo: false, // 登录页面logo
  mobAd: {}, // 登录后弹出广告
  mobPlayImg: {}, // 轮播图
  gameNoticeFlag: false, // 公告弹出标志，默认false不弹出， 登陆成功后true弹出， 点击页面在变成false
  staticDomain: '', // 静态资源路径
  shopaddr: '', // 微信登陆中间件
  onlineservice: {}, // 在线客服对象
  sessionId: '', // sessionId,用于微信登录
  scrollRefreshTime: 0, // scroll刷新时间
  bsScorll: '', // BSScorll滚动插件对象
  isOffLine: false, // 判断是否连着网,false表示联网中，true表示断网
  isOpenAc: 'N', // 是否展示第三方活动图
  tpsActivityAlias: '', // 第三方游戏别名
  hasActivityAlias: 'N', // 是否有第三方别名（默认都显示别名，但是如果没有别名，活动应显示我要参加）
  showMgXYZLbox: true, // 首页显示MG活动图标
  showPPggzjbox: true, // 首页显示PP活动图标
  clientDownloadUrl: '', // gpo客户端下载的地址
  folderUrl: '', // 动态文件夹参数
  platform: false, // 平台标识，默认为false，OP
  stationCode: '', // 站点名称，如：a04
  station: {} // 站点参数
}
export const mutations = {
  /** 首页信息 */
  [types.INITDATA_DETAIL] (state, res) {
    // 每次都将最新的版本号信息存入localStorage
    state.isOpenAc = res.data.isOpenAc
    if (res.data.account.tpsActivityAlias !== undefined) {
      state.tpsActivityAlias = res.data.account.tpsActivityAlias
    }
    if (res.data.account.hasActivityAlias !== undefined) {
      state.hasActivityAlias = res.data.account.hasActivityAlias
    }
    localStorage.setItem('initData', JSON.stringify(res.list))
    state = window.indexMain.commonVersion(state, res, 'homeVersionKey') // 取缓存
    let eGamesList = state.homeGameList.eGamesList
    let eGameIds = []
    for (let e of eGamesList) {
      if (e && e.modelUrl) { // 电子游戏大类
        eGameIds.push(e.Id)
      }
    }
    state.eGameIds = eGameIds
    window.indexMain.updateModelUrl(eGamesList) // 找到电子游戏大类，替换其路由路径
    let eGamekeys = []
    let eGamesTypeList = []
    for (let e of eGamesList) { // 电子游戏大类
      if (e.eGameKey) {
        eGamesTypeList.push(e)
        eGamekeys.push(e.eGameKey)
      }
    }
    state.eGamesList = eGamesList
    state.eGamesTypeList = eGamesTypeList
    state.eGamekeys = eGamekeys
    window.indexMain.updateModelUrl(state.homeGameList.gameList) // 找到电子游戏大类，替换其路由路径
    state.gameList = state.homeGameList.gameList
    state.liveGameList = state.homeGameList.liveGameList
    state.mobIndexWapDirectionsList = state.articleList.mobIndexWapDirectionsList
    state.sportList = state.homeGameList.sportList
    state.cpList = state.homeGameList.cpList
    state.qpList = state.homeGameList.qpList
    state.byGamesList = state.homeGameList.byGamesList
    state.userInfo = res.data.account
    state.listArticleVo = res.data.listArticleVo
    state.type = res.data.type
    state.isLogin = res.data.account.account !== ''
    state.mobHeadLogo = state.articleList.mobHeadLogo
    state.mobHeadLogoCpicSim = res.data.mobHeadLogoCpicSim
    try {
      if (state.mobHeadLogo[0]) {}
    } catch (e) {
      state.mobHeadLogo = []
    }
    try {
      if (state.mobHeadLogoCpicSim[0]) {}
    } catch (e) {
      state.mobHeadLogoCpicSim = []
    }
    state.mobPlayImg = state.articleList.mobPlayImg
    state.mobAd = state.articleList.mobAd
    state.mobLoginLogo = state.articleList.mobLoginLogo
    try {
      if (state.mobLoginLogo[0]) {}
    } catch (e) {
      state.mobLoginLogo = []
    }
    state.staticDomain = res.data.staticDomain
    state.shopaddr = res.data.shopaddr
    state.onlineservice = state.articleList.onlineservice
    state.sessionId = res.data.sessionId
    // 平台标识
    state.platform = res.data.platform
    /* 自定义皮肤与组件信息 begin */
    // 站点名称
    state.stationCode = res.data.stationCode
    // 站点参数
    state.station = res.data.station
    let skinFlag = 'default'
    let skinKey = 'index.css'
    if (typeof state.platform === 'boolean' && state.stationCode) {
      skinFlag = (state.platform ? 'og' : 'op')
      skinKey = state.stationCode + '/' + skinKey
      // 设置获取到的文件夹名
      state.folderUrl = skinFlag + '/' + state.stationCode
      // 站点自定义皮肤的统一的公共图片路径
      state.commonCustomImgUrl = 'CDNURL_VARIABLE/static/RESOURCE_VERSION/local/skin_' + state.folderUrl
    }
    let cdnUrl = nodeCdnUrl || ''
    // 如果最后一个字符串为'/'，则删除该'/'
    if (nodeCdnUrl && nodeCdnUrl.charAt(nodeCdnUrl.length - 1) === '/') {
      cdnUrl = nodeCdnUrl.substr(0, nodeCdnUrl.length - 1)
    }
    // 新增皮肤样式
    window.indexMain.loadSkinCss(cdnUrl + '/static/' + state.versionUrl + '/css/skin_' + skinFlag + '/', 'rev-manifest.json', skinKey, true)
    /* 自定义皮肤与组件信息 end */

    /* 首页客户端下载地址信息 begin */
    let wiAppUrlObj = state.articleList.wiAppUrl
    if (wiAppUrlObj.type === 'downloadPage') { // 下载页地址
      state.clientDownloadUrl = wiAppUrlObj.pageUrl
    } else if (wiAppUrlObj.type === 'downloadFile') { // 下载包地址
      state.clientDownloadUrl = window.indexMain.isIos ? wiAppUrlObj.iosUrl : wiAppUrlObj.androidUrl
    }
    /* 首页客户端下载地址信息 end */
    if (res.data.isTempWeiXin && res.data.isTempWeiXin === 'Y') {
      window.layer.msgWarn('为了您的资金安全，请您完善资料信息！！', function () {
        window.router.push('/wap/memberCenter/completeAccount')
      })
      return false // Y需要强制跳转完善页面  N不管
    }
  },
  /**
   * 登录
   * @param {*} state
   * @param {*} res
   */
  [types.LOGIN_MUTATION] (state, res) {
    if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
      try {
        state.userInfo = {'account': res.data.account, 'money': res.data.money}
      } catch (error) {
          // this.$store.state.site.openOuterlayer = true // 首页游戏公告显示
      }
      state.isLogin = true
    }
  },
  /** 登出 */
  [types.LOGOUT_DETAIL] (state, res) {
    state.userInfo = {}
    state.isLogin = false
    state.type = '0' // 1表示是试玩， 0表示正常(包括正常用户和非登陆情况)
  },
  /** 我的最爱列表 */
  [types.FAVORITE_LIST_DETAIL] (state, res) {
    let data = (res && res.data) || []
    window.indexMain.updateModelUrl(data) // 找到电子游戏大类，替换其路由路径
    state.favoriteList = data
  },
  /** 我的最近浏览列表 */
  [types.RENT_LIST_DETAIL] (state, res) {
    let data = (res && res.data) || []
    window.indexMain.updateModelUrl(data) // 找到电子游戏大类，替换其路由路径
    state.recentsList = data
  },
  /** 优惠活动列表 */
  [types.PROMOTION_DETAIL] (state, res) {
    if (res.list[0] != null) {
      state.templist = state.templist.concat(res.list[0].photoDocList)
      state.promotionList = res.list
      state.promotionList[0].photoDocList = state.templist
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
   * MG电子登录
   * @param {*} state
   * @param {*} res
   */
  // [types.LOGIN_MG_GAME_MUTATION] (state, res) {
  // },
  /**
   * MG电子登录
   * @param {*} state
   * @param {*} res
   */
  // [types.LOGIN_PT_GAME_MUTATION] (state, res) {
  // },
  /**
   * NMG电子登录
   * @param {*} state
   * @param {*} res
   */
  // [types.LOGIN_NMG_GAME_MUTATION] (state, res) {
  // },
  /**
   * PP电子登录
   * @param {*} state
   * @param {*} res
   */
  // [types.LOGIN_PP_GAME_MUTATION] (state, res) {
  // },
  /**
   * 试玩
   * @param {*} state
   * @param {*} res
   */
  [types.LOGIN_FREE_MUTATION] (state, res) {
    if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
      try { state.userInfo = {'account': res.data.account, 'money': res.data.money} } catch (e) { }
      state.isLogin = true
      state.type = '1' // 试玩
    }
  },
  /**
   * 所有电子游戏 加载数据
   * @param {*} state
   * @param {*} res
   */
  [types.QUERY_GAME_LIST_MUTATION] (state, res) {
  },
  /**
   * 第三方活动登录
   * @param {*} state
   * @param {*} res
   */
  [types.LOGIN_ACTIVITY_MUTATION] (state, res) {
    if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
    }
  }
}
