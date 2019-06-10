import {LotterySrc} from 'config/lotteryMap'
import { playType } from 'config/lotteryDetail'
import * as lotteryMenuPeriod from 'service/lotteryMenuPeriod'
import * as type from '../store/home/type'
import Vue from 'vue'

/**
 * 保存cookie 到浏览器
 */
export default function () {
  let token = ''
  let obj = urlToJson()
  console.info('gitInitData:', obj)
  if (obj.loginToken) {
    token = obj.loginToken
    localStorage.setItem('cookie', token)
  } else {
    let loginToken = localStorage.getItem('cookie')
    token = loginToken
  }
  window.document.cookie = 'LoginSession=' + token
   // 查看是否有lotteryId传过来
  if (obj.lotteryId) {
    let lotteryId = obj.lotteryId
    let nowGame = LotterySrc[obj.lotteryId]
     /** 玩法不存在 则表示项目列表里面没有该游戏的投注信息 */
    if (!playType[nowGame]) { // 玩法不存在，则将 lotteryId 指向北京赛车(默认)
      lotteryId = 6
      nowGame = LotterySrc[lotteryId]
    }
    // 获取当前游戏的ID  比如北京赛车 ltteryId ='6'
    window.store.state.home.lotteryId = Number(lotteryId)
    // 获取当前游戏的缩写  比如北京赛车 nowGame ='bjsc'
    // window.store.state.site.nowGame = nowGame
    // 获取当前游戏的第一个玩法 nowMode = 2700000
    window.store.state.site.nowMode = playType[nowGame] ? playType[nowGame]['rtype'][0].type_id : ''
    // 获取当前游戏的第一个玩法 nowTitle = '两面盘'
    window.store.state.site.nowTitle = playType[nowGame] ? playType[nowGame]['rtype'][0].name : ''
    getLotteryType()
    window.router.push('/lottery/' + nowGame)
  } else {
    getLotteryType()
  }
}

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
 * 获取彩票列表
 */
function getLotteryType () {
  // 获取到首页版本号信息
  let versionList = window.lotteryMain.versionFun('getInitData', 'homeVersionKey')
 // localStorage中的userChips数据结构发生变化，但老用户的localStorage还是原来的数据
 // 将versionList['userChips']['value'] 置空，接口会返回新结构的数据，覆盖掉手机用户localStorage中的userChips
  if (localStorage.getItem('userChips')) {
    let chips = JSON.parse(localStorage.getItem('userChips'))[0]
    if (chips instanceof Object === false) {
      versionList['userChips']['value'] = ''
    }
  }

  window.OGLoad.addNum(99, 100, 30, (op) => {
    window.OGLoad.business(op)
    if (op.current >= 100) {
      mountedApp()
      window.store.dispatch(type.LOTTERY_ACTION, versionList).then(res => {
        // 保存所有的彩票
        for (let index in window.store.state.home.lotteryList) { // 循环所有彩票列表
          window.store.state.home.lotteryList[index].lotteryType.forEach(lottery => {
            if (lottery.lotteryId !== 100) {
              window.store.state.site.childLottery.push(lottery)
              window.store.state.site.lotteryIdList.push(lottery.lotteryId)
            }
          })
        }
        // 获取所有的彩种状态
        let lotteryJoinId = window.store.state.site.lotteryIdList.join(',')
        window.store.dispatch('getLotteryStates.action', {'lotteryIds': lotteryJoinId}).then(res => {
          lotteryMenuPeriod.getLotteryStatus(res)
        }).then(resp => {
          // 将loading取消，挂载节点
          // document.getElementById('bootstrapCss').href = ''
          // document.getElementById('loading').style.display = 'none'
        })
        window.lotteryMain.apiInit.$emit() // 通知监听事件，初始化数据已加载完成
        /** 定时器，一分钟获取一次彩种信息
         * getLotteryStatus改变是否能进入该彩种
         * menulotteryTimes改变menu倒计时显示
         */
        if (!window.store.state.betZone.statusTimer) {
          window.store.state.betZone.statusTimer = window.setInterval(function () {
            window.store.dispatch('getLotteryStates.action', {'lotteryIds': lotteryJoinId}).then(res => {
              lotteryMenuPeriod.getLotteryStatus(res)
              lotteryMenuPeriod.menulotteryTimes(res)
            })
          }, 60000)
        }
      })
    }
  })
}

/**
 * 挂载节点
 */
function mountedApp () {
  window.MainApp = new Vue({
    router: window.router,
    store: window.store,
    filter: window.lotteryFilter,
    methods: window.MainApp,
    watch: {
      $route: function () {
      }
    },
    data: {
      eventMain: new Vue()
    }
  }).$mount('#app')
}
