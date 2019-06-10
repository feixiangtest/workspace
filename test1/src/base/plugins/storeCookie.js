import Vue from 'vue'
import * as cookieUtil from '../utils/cookieUtil.js'
/**
 * url参数转换成json格式
 */
function urlToJson () {
  let search = location.search.length > 0 ? location.search.substring(1) : ''
  if (!search) return {}
  let args = {}
  let items = search.split('&')
  let item = null
  for (let i = 0; i < items.length; i++) {
    item = items[i].split('=')
    args[item[0]] = item[1]
  }
  return args
}
/**
 *  介绍人 逻辑
 */
function getIntr (obj) {
  if (obj.Intr && obj.Intr !== 'undefined') {
    // sessionStorage.Intr = obj.Intr
    cookieUtil.setCookie('IntrForParam', obj.Intr, 'd30')
    cookieUtil.setCookie('Intr', obj.Intr, 'd30')
  }
}
/**
 * 保存cookie 到浏览器
 * mountedAppId 挂载的节点ID值，如 app、payment
 */
export default function (mountedAppId) {
  let obj = urlToJson()
  console.info('$GET:', obj)
  getIntr(obj)
  let versionList = window.indexMain.versionFun('initData', 'homeVersionKey')
  console.info('versionList:', versionList)
  // 请求预览数据
  if (obj.isPreview) {
    window.store.dispatch('loadPriviewTest.action', obj).then(res => {
      if (res.status === '1') {
        if (res.data.articleVo.section.sectionType === 'mobAd') {
          window.store.state.home.gameNoticeFlag = true
        }
      }
    })
  }

  const p1 = window.store.dispatch('initData.action', versionList)
  Promise.all([p1]).then((result) => { // 所有请求响应成功之后执行
    window._HOSTNAME = location.origin // 保存域名
    mountedApp(mountedAppId) // 挂载节点
    // 有memberToken的代表是APP调用，为什么APP可能会调用：APP内容H5的支付系统成功支付之后会跳转H5的会员中心，此时APP监听之后但是未取消H5的请求
    let memberToken = localStorage.getItem('memberToken')
    if (mountedAppId === 'app' && !memberToken) { // APP不调用
      eachAllUrl() // 获取跳转彩票最快的域名
    }
  }).catch(e => {
    console.log('异常：', e)
  })
  function eachAllUrl () {
    window.$.ajax({ // 获取跳转彩票最快的域名
      url: '/api/wap/login3rd/loginGame',
      type: 'POST',
      dataType: 'json',
      cache: false,
      contentType: 'application/json',
      data: JSON.stringify({ type: 'loginapi', key: 'cp', isMobile: '1', domainList: 'domainList', loading: 'pass' }),
      success: (res) => {
        if (res.status === '1' && res.data && res.data.tourl) {
          let isHttps = !!res.data.isHttps
          let urlList = res.data.tourl.split(',')
          getFastUrl(urlList, isHttps)
          setInterval(function () {
            getFastUrl(urlList, isHttps)
          }, 3600000)
        }
      }
    })
  }
  // 获取彩票最快的域名
  function getFastUrl (urlList, isHttps) {
    let http = isHttps ? 'https://' : 'http://'
    let domain = ''
    let fastTimes = null
    for (let i = 0; i < urlList.length; i++) {
      domain = urlList[i] && urlList[i].trim()
      if (!domain) {
        continue
      }
      let startTimes = +new Date()
      window.$.ajax({ // jsonp格式请求，解决跨域问题
        type: 'GET',
        url: http + domain + '/test/testSpeed',
        dataType: 'jsonp',
        jsonp: 'callbackparam',
        success: () => {
          let times = +new Date() - startTimes
          if (!fastTimes || times < fastTimes) {
            fastTimes = times
            window.store.state.site.fastUrl = urlList[i]
          }
        }
      })
    }
  }
}

/**
 * 挂载节点
 * mountedAppId 挂载的节点ID值，如 app、payment
 */
function mountedApp (mountedAppId) {
  window.MainApp = new Vue({
    router: window.router,
    store: window.store,
    filter: window.lotteryFilter,
    methods: window.MainApp,
    watch: {
      $route: function () {
      }
    }
  }).$mount('#' + mountedAppId)
  /**
   * 项目模块之间的页面跳转，如：gpo跳转支付项目模块
   * @type {{_id, payKey, push}}
   * 说明：gpo_mobile工程分为两个大模块：gpo(h5)项目模块（src/web下）、支付模块（src/payment下），其中支付模块被gpo(h5)模块使用，
   * 也被gpo APP（主系统APP客户端，不在gpo_mobile工程）使用。
   * 为了gpo(h5)模块与支付模块无缝对接（性能最大优化），因此，跳转支付模块配置了两套路由，
   * 一套是支付模块自身的路由配置（src/payment/router下），以/pyt/开头，如：/pyt/payment，目前只有gpo APP（主系统APP客户端）内嵌跳转使用
   * 另一套是gpo(h5)模块跳转到支付模块的路由配置（src/web/router下），与gpo(h5)一样，以/wap/开头，如：/wap/payment
   */
  window.moduleRouter = ((mountedAppId) => {
    let _id = mountedAppId // 当前项目模块使用vue插件初始化绑定的id值，如 id="app"
    let h5Id = 'app' // gpo(h5)，vue构造器的元素ID（gpo入口）
    let clientPayId = 'payment' // 支付，vue构造器的元素ID（支付入口）
    let h5key = 'wap' // gpo(h5)模块的路由关键字，如：'/wap/index'中的'wap'
    let clientPayKey = 'pyt' // gpo APP（主系统APP客户端）跳转到支付模块的路由关键字，如：'/pyt/payment'中的'pyt'
    return {
      // 当前项目模块使用vue插件初始化绑定的id值，如 id="app"
      _id: _id,
      /**
       * 支付页面的路由关键字，比如：/pay/payment、/pyt/payment，
       * 其中’/pay/...‘是给gpo(h5)项目使用的，'/pyt/...'是给gpo APP（主系统APP客户端）使用的
       * -----------------------------并且请注意：所有支付系统的路由跳转，路由关键字必须使用变量，
       * 如 window.moduleRouter.push('/' + window.moduleRouter._payKey + '/payment')   否则gpo APP（主系统APP客户端）嵌入支付时，不能使用该路由
       */
      _payKey: _id === h5Id ? h5key : clientPayKey,
      /**
       * 路由跳转，适合所有跳转
       * @param routerUrl 路由url，请必须以'/wap/'或者'/pay/'开头，'/wap/'代表gpo项目模块，'/pay/'代表支付项目模块
       */
      push (routerUrl) {
        if (!routerUrl) { // 必须传递url
          alert('请传递url')
          return
        }
        let appId = '' // 目标路由所在的项目入口ID（vue构造器的元素ID）
        // 如果目标路由关键字是h5key或h5PayKey，代表需要gpo的入口（vue构造器的元素ID为'app'）
        if (routerUrl.indexOf(h5key + '/') === 0 || routerUrl.indexOf(h5key + '/') === 1) {
          appId = h5Id
        } else if (routerUrl.indexOf(clientPayKey + '/') === 0 || routerUrl.indexOf(clientPayKey + '/') === 1) { // 如果路由关键字是clientPayKey，代表需要支付的入口（vue构造器的元素ID为'payment'）
          appId = clientPayId
        }
        // 如果目标路由所在的项目入口ID 正好 是当前项目入口ID（是否是gpo模块页面跳转gpo模块页面，或者是否是支付模块页面跳转支付模块页面）
        if (_id === appId) {
          window.router.push(routerUrl) // 如果是，则该模块的路由功能已初始化，可直接跳转
        } else { // 如果是项目模块之间的切换
          // 使用location.href刷新页面，重新加载模块并跳转到指定路由   注：window.location.origin不能删除，否则gpo APP（主系统APP客户端）IOS监听不到
          // gpo APP（主系统APP客户端）内嵌支付系统时，支付系统跳转到gpo(h5)系统的路由，APP都会监听拦截并做相应的处理
          window.location.href = window.location.origin + routerUrl || '/'
        }
      }
    }
  })(mountedAppId)
}
