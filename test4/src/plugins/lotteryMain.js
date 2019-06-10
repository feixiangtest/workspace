/**
 * 彩票全局公共方法 by karl
 */
import * as lotteryMap from '../config/lotteryMap'
import * as version from '../config/lotteryVersion'

export default function () {
  let lotteryMain = window.lotteryMain

  lotteryMain = {}// 初始化

  // 关闭左右侧栏
  lotteryMain.closeMuseUI = function () {
    window.store.state.home.MuseUI.open = false
    window.store.state.home.MuseUI.openR = false
    window.store.state.home.MuseUI.dockedLeft = false
    window.store.state.home.MuseUI.dockedRight = false
  }

  lotteryMain.setLotteryId = function (lotteryId) { // 全局setLotteryId方法
    window.store.state.site.lotteryId = lotteryId
  }

  lotteryMain.getLotterySrc = function (lotteryId) { // 根据彩票ID获得简写
    return lotteryMap.LotterySrc[lotteryId]
  }

  /**
  * 版本号业务处理，主要用于组装参数发送到后台
  * title:存localStorage数据的标题，，用于通用处理
  * type:配置项内的数组，用于通用处理,只需要传入不同的值即可以获取到对应的版本号key
  */
  lotteryMain.versionFun = function (title, type) {
    // 每个方法在localStorage内都有版本号，根据传过来的title去取值
    let lotteryVersion = JSON.parse(window.localStorage.getItem(title))
    let versionlist = {}
    if (lotteryVersion !== null) {
      /* 版本号处理 begin */
      versionlist = {}
      // 循环配置项内的首页版本号的key用于循环处理
      for (let i = 0; i < version[type].length; i++) {
        // 获取对应的数据，如果没有，则需要将版本号置空传到后台
        let obj = window.localStorage.getItem(version[type][i])
        // 除了判断版本key是否存在，还得判断数据是否存在，如果数据不存在或者版本号被清空了，将版本号的value赋值为空重新获取数据填充
        let objs = '' + version[type][i]
        objs = {
          [version[type][i]]: {
            key: version[type][i],
            value: obj === null || lotteryVersion[version[type][i]] === undefined ? '' : lotteryVersion[version[type][i]].value
          }
        }
        Object.assign(versionlist, versionlist, objs)
      }
      /* 版本号处理 end */
    } else {
      // 如果为获取到lotteryVersion直接循环赋空值用于后台重新传输版本号
      for (let i = 0; i < version[type].length; i++) {
        let obj = {[version[type][i]]: null}
        Object.assign(versionlist, versionlist, obj)
      }
    }
    return versionlist
  }

  /**
   * 通用版本号用于mutations获取到后台数据统一处理方法
   */
  lotteryMain.commonVersion = function (state, res, type) {
    for (let i = 0; i < version[type].length; i++) { // 循环配置项内版本控制的key
      if (res.list[version[type][i]] !== null && res.list[version[type][i]] !== undefined) {
        if (res.list[version[type][i]].status === '1') { // 状态值为1时直接查询localStorage内的参数
          state[version[type][i]] = JSON.parse(localStorage.getItem([version[type][i]]))
        } else { // 代表后台重新发送了数据，从res中取值并存储到localStorage中
          localStorage.setItem([version[type][i]], JSON.stringify(res.data[version[type][i]]))// 将数据存储
          state[version[type][i]] = res.data[version[type][i]]
        }
      }
    }
    return state
  }

  /**
  * 版本号彩票业务处理
  * title:存localStorage标题，用于通用处理
  * type:配置项内的数组，用于通用处理,只需要传入不同的值即可以获取到对应的版本号key
  * lotteryId:彩票id
  * rtypeId:彩票特殊玩法需要带rtypeId
  */
  lotteryMain.lotteryVersionFun = function (title, type, lotteryId, rtypeId) {
    // 因为赔率玩法需要各个彩票单独存储版本号，所以增加此字符
    let lotteryStr = title + '_' + lotteryId + '_' + rtypeId
    let lotteryVersion = JSON.parse(window.localStorage.getItem(lotteryStr))
    let versionlist = {}
    if (lotteryVersion !== null) {
      /* 版本号处理 begin */
      versionlist = {}
      // 循环配置项内的首页版本号的key用于循环处理
      for (let i = 0; i < version[type].length; i++) {
        let obj = null
        switch (i) {
          case 0:// 赔率localStorage设置
            obj = localStorage.getItem(lotteryMap.LotterySrc[lotteryId].toUpperCase() + '_BETH5' + '_' + rtypeId)
            break
          case 1:// 期数localStorage设置
              // state[version.homeVersionKey[i]] = localStorage.getItem(lotteryStr.toUpperCase() + '_BETH5' + '_' + rtypeId)
            break
          case 2:// 特殊赔率localStorage设置
            obj = localStorage.getItem(lotteryMap.LotterySrc[lotteryId].toUpperCase() + '_BETH5' + '_' + rtypeId + '_SPECIAL')
            break
        }
        // 除了判断版本key是否存在，还得判断数据是否存在，如果数据不存在或者版本号被清空了，将版本号的value赋值为空重新获取数据填充
        let objs = '' + version[type][i]
        objs = {
          [version[type][i]]: {
            key: version[type][i],
            value: obj === null || lotteryVersion[version[type][i]] === undefined ? '' : lotteryVersion[version[type][i]].value
          }
        }
        Object.assign(versionlist, versionlist, objs)
      }
      /* 版本号处理 end */
    } else {
      // 如果为获取到lotteryVersion直接循环赋空值用于后台重新传输版本号
      for (let i = 0; i < version[type].length; i++) {
        let obj = {[version[type][i]]: null}
        Object.assign(versionlist, versionlist, obj)
      }
    }
    return versionlist
  }
  /**
   * 彩票专用版本号用于mutations获取到后台数据统一处理方法
   */
  lotteryMain.lotteryVersion = function (state, res) {
    // 因为赔率玩法需要各个彩票单独存储版本号，所以增加此字符
    let lotteryStr = lotteryMap.LotterySrc[res.data.lotteryId]
    let rtypeId = res.data.rtype
    for (let i = 0; i < version.showBetVersionKey.length; i++) { // 循环配置项内版本控制的key
      if (res.list[version.showBetVersionKey[i]] !== null && res.list[version.showBetVersionKey[i]] !== undefined) {
        // 状态值为1时直接查询localStorage内的参数
        if (res.list[version.showBetVersionKey[i]].status === '1') {
          switch (i) {
            case 0:// 赔率localStorage设置
              state[version.showBetVersionKey[i]] = JSON.parse(localStorage.getItem(lotteryStr.toUpperCase() + '_BETH5' + '_' + rtypeId))
              break
            case 1:// 期数localStorage设置
              // state[version.showBetVersionKey[i]] = localStorage.getItem(lotteryStr.toUpperCase() + '_BETH5' + '_' + rtypeId)
              break
            case 2:// 特殊赔率localStorage设置
              state[version.showBetVersionKey[i]] = JSON.parse(localStorage.getItem(lotteryStr.toUpperCase() + '_BETH5' + '_' + rtypeId + '_SPECIAL'))
              break
          }
        } else { // 代表后台重新发送了数据，从res中取值并存储到localStorage中
          switch (i) {
            case 0:// 赔率localStorage设置
              localStorage.setItem(lotteryStr.toUpperCase() + '_BETH5' + '_' + rtypeId, JSON.stringify(res.data[version.showBetVersionKey[i]]))// 将数据存储
              break
            case 1:// 期数localStorage设置
              // state[version.showBetVersionKey[i]] = localStorage.getItem(lotteryStr.toUpperCase() + '_BETH5' + '_' + rtypeId)
              break
            case 2:// 特殊赔率localStorage设置
              if (rtypeId === '2391000' || rtypeId === '2392000') {
                localStorage.setItem(lotteryStr.toUpperCase() + '_BETH5' + '_' + rtypeId + '_SPECIAL', JSON.stringify(res.data[version.showBetVersionKey[i]]))// 将数据存储
              }
              break
          }
          state[version.showBetVersionKey[i]] = res.data[version.showBetVersionKey[i]]
        }
      }
    }
    return state
  }

  /**
   * 彩票专用版本号用于mutations获取到后台数据统一处理方法
   * 新加方法，用于一次获取到当前大类下的所有游戏的玩法赔率并保存起来
   */
  lotteryMain.lotteryVersionAll = function (state, res) {
    // 因为赔率玩法需要各个彩票单独存储版本号，所以增加此字符
    let lotteryStr = lotteryMap.LotterySrc[res.data.lotteryId]
    let rtypeId = res.data.rtype
    for (let i = 0; i < version.showBetVersionKey.length; i++) { // 循环配置项内版本控制的key
      if (res.list[version.showBetVersionKey[i]] !== null && res.list[version.showBetVersionKey[i]] !== undefined) {
        // 状态值为1时直接查询localStorage内的参数
        if (res.list[version.showBetVersionKey[i]].status === '1') {
          switch (i) {
            case 0:// 赔率localStorage设置
              state[version.showBetVersionKey[i]] = JSON.parse(localStorage.getItem(lotteryStr.toUpperCase() + '_BETH5' + '_' + rtypeId))
              break
            case 1:// 期数localStorage设置
              // state[version.showBetVersionKey[i]] = localStorage.getItem(lotteryStr.toUpperCase() + '_BETH5' + '_' + rtypeId)
              break
            case 2:// 特殊赔率localStorage设置
              state[version.showBetVersionKey[i]] = JSON.parse(localStorage.getItem(lotteryStr.toUpperCase() + '_BETH5' + '_' + rtypeId + '_SPECIAL'))
              break
          }
        } else { // 代表后台重新发送了数据，从res中取值并存储到localStorage中
          switch (i) {
            case 0:// 赔率localStorage设置
              for (var key of Object.keys(res.data.bettList)) {
                if (key.substr(key.length - 7, key.length) === '2390000') {
                  let list = res.data.bettList[key]
                  let betList = [{'lotteryId': list[0].lotteryId, 'name': list[0].name, 'oddsList': Array.from([list[0].oddsList[0]]), 'parent': list[0].parent, 'plateId': list[0].plateId},
                               {'lotteryId': list[1].lotteryId, 'name': list[1].name, 'oddsList': Array.from([list[1].oddsList[0]]), 'parent': list[1].parent, 'plateId': list[1].plateId},
                               {'lotteryId': list[2].lotteryId, 'name': list[2].name, 'oddsList': Array.from([list[2].oddsList[0]]), 'parent': list[2].parent, 'plateId': list[2].plateId}]

                  localStorage.setItem(key, JSON.stringify(betList))// localstorage 格式  BJSC_BET_2001710
                } else {
                  localStorage.setItem(key, JSON.stringify(res.data.bettList[key]))// 将数据存储
                }
              }
              break
            case 1:// 期数localStorage设置
              // state[version.showBetVersionKey[i]] = localStorage.getItem(lotteryStr.toUpperCase() + '_BETH5' + '_' + rtypeId)
              break
            case 2:// 特殊赔率localStorage设置
              if (rtypeId === '2391000' || rtypeId === '2392000') {
                localStorage.setItem(lotteryStr.toUpperCase() + '_BETH5' + '_' + rtypeId + '_SPECIAL', JSON.stringify(res.data[version.showBetVersionKey[i]]))// 将数据存储
              }
              break
          }
          if (i === 0) {
            state.bettList = res.data.bettList[lotteryStr.toUpperCase() + '_BETH5' + '_' + rtypeId]
          } else {
            state[version.showBetVersionKey[i]] = res.data[version.showBetVersionKey[i]]
          }
        }
      }
    }
    return state
  }

  lotteryMain.closeAward = function () {
    // 跳转了页面初始化彩票开奖前十期
    window.store.state.site.awardShow = false
  }

  /**
   * 关闭当前彩票窗口
   */
  lotteryMain.closeLtWindow = function () {
     /* --------------- 关闭当前窗口（需做根据不同浏览器使用不同的关闭方法） start --------------------------------------------- */
    if (navigator.userAgent.indexOf('MSIE') > 0) { // IE
      if (navigator.userAgent.indexOf('MSIE 6.0') > 0) { // IE6
        window.opener = null
        window.close()
      } else { // IE6+
        window.open('', '_top')
        window.top.close()
      }
    } else if (navigator.userAgent.indexOf('Firefox') > 0 || navigator.userAgent.indexOf('Presto') > 0) { // FF和Opera
      // window.location.href = 'about:blank'
      window.close()// 火狐默认状态非window.open的页面window.close是无效的
    } else {
      window.opener = null
      window.open('', '_self', '')
      window.close()
    }
    /* --------------- 关闭当前窗口（需做根据不同浏览器使用不同的关闭方法） end --------------------------------------------- */
    // window.location.href = 'about:blank'
    // open(location, '_self').close()
  }

  /**
   * 用于统一判断是否登录
   */
  lotteryMain.isLogin = function () {
    let flag = true
    if (!window.store.state.home.isLogin) {
      window.layer.open({
        className: 'layerConfirm',
        title: '温馨提示',
        shadeClose: !1,
        content: '您尚未登录，请先登录后再进行游戏',
        btn: ['我知道了'],
        yes: function (index, layero) {
          window.layer.close(index)
        }
      })
    }
    return flag
  }
  // 专用于dom节点挂载不依赖于初始化数据的处理
  lotteryMain.apiInit = (function () {
    let isInited = false // 标识是否已经初始化接口返回完成
    return {
      /**
       * 返回初始化的状态，是否已经完成初始化
       * @returns {Boolean} true=已完成初始化
       */
      getInitStatus: function () {
        return isInited
      },
      // 初始化接口返回之后调用，触发监听事件
      $emit: function () {
        isInited = true
        window.MainApp.$root.$emit('apiInit')
      },
      /**
       * 依赖初始化接口返回的数据处调用，监听事件
       * @param {Function} callback 监听触发的函数
       */
      $on: function (callback) {
        if (typeof callback !== 'function') {
          return
        }
        // 是否初始化接口返回完成
        if (isInited) {
          callback()
        } else {
          window.MainApp && window.MainApp.$root.$on('apiInit', callback)
        }
      }
    }
  })()
  // localStorage期数管理，存储getPeriods接口主要数据
  lotteryMain.periodsStorage = (function () {
    let prefix = 'GET_PERIODS_'
    let periodKeys = prefix + 'KEYS'
    return {
      /**
       * 根据彩票ID获取localStorage存储的期数数据
       * @param {String|Number} lotteryId 彩票ID
       */
      get: function (lotteryId) {
        if (!lotteryId) {
          return
        }
        let val = localStorage.getItem(prefix + lotteryId)
        if (val) {
          try {
            val = JSON.parse(val)
          } catch (e) { // 如果key有格式问题，不是json格式
            val = []
          }
          return val
        }
      },
      /**
       * 根据彩票ID设置localStorage存储的期数数据
       * @param {String|Number} lotteryId 彩票ID
       * @param {Array} value 值
       */
      set: function (lotteryId, value) {
        if (!lotteryId || !value || !value.length) {
          return
        }
        let newV = value
        if (typeof value === 'object') {
          newV = JSON.stringify(newV)
        }
        localStorage.setItem(prefix + lotteryId, newV)
      },
      /**
       * 根据彩票ID获取数据的版本号
       * @param {String|Number} lotteryId 彩票ID
       */
      getVersion: function (lotteryId) {
        if (!lotteryId) {
          return
        }
        lotteryId += '' // 转字符串
        let keys = localStorage.getItem(periodKeys)
        if (keys) {
          try {
            keys = JSON.parse(keys)
          } catch (e) { // 如果key有格式问题，不是json格式
            keys = {}
          }
          return keys[lotteryId] || '' // 添加版本号的参数
        }
      },
      /**
       * 根据彩票ID设置数据的版本号
       * @param {String|Number} lotteryId 彩票ID
       * @param {String} value 值
       */
      setVersion: function (lotteryId, value) {
        if (!lotteryId) {
          return
        }
        lotteryId += '' // 转字符串
        let keys = localStorage.getItem(periodKeys)
        if (!keys) {
          keys = '{}'
        }
        try {
          keys = JSON.parse(keys)
        } catch (e) { // 如果key有格式问题，不是json格式
          keys = {}
        }
        if (keys[lotteryId] !== value) {
          keys[lotteryId] = value
          localStorage.setItem(periodKeys, JSON.stringify(keys)) // 保存版本号
        }
      }
    }
  })()
  /**
   * 获取到第一个投注状态是开启的游戏存储并跳转
   */
  lotteryMain.jumpFirstLottery = function () {
    // 将彩票列表获取出来
    let lotteryList = JSON.parse(localStorage.getItem('lotteryList'))
    // 彩票的数据
    let lotteryObj = {}
    // 用于判断是否跳出循环
    let lotteryFlag = false
    // 是否是即开彩系列
    let isMmc = (window.store.state.site.lotteryId * 1 === 100 || window.store.state.site.lotteryId * 1 === 101)
    // 循环彩票大类列表
    for (let lotteryKey of Object.keys(lotteryList)) {
      if (lotteryFlag) {
        break
      }
      // 即开彩暂时不能使用bettingStatus来判断是否开启，因此如果即开彩其中一种已封盘则不推荐其他即开彩系列
      if (lotteryKey === 'MMC' && isMmc) {
        continue
      }
      // 获取到第一个投注状态是开启的游戏存储并跳转
      for (let i = 0; i < lotteryList[lotteryKey].lotteryType.length; i++) {
        let obj = lotteryList[lotteryKey].lotteryType[i]
        if (obj.bettingStatus === 0 && window.store.state.site.lotteryId !== obj.lotteryId) {
          lotteryObj = obj
          lotteryFlag = true
          break
        }
      }
    }
    // 获取到彩票的
    let game = lotteryMap.LotterySrc[lotteryObj.lotteryId]
    window.router.push('/lottery/' + game)
    window.location.reload()
  }
  /**
   * 清除下注数据
   */
  lotteryMain.clearDoBetList = function () {
    let betList = window.store.state.betZone.doBetList
    for (let o of betList) {
      o.gold = '' // 清空下注金额
    }
    betList.splice(0, betList.length) // 清空下注内容
  }

  window.lotteryMain = lotteryMain
}
