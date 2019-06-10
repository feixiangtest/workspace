import * as lotteryMap from 'config/lotteryMap'
import Vue from 'vue'

/**
 * 根据大类找出对应的小类彩种
 * @param {*} bjTime         转化北京时间后的 系统时间
 * @param {*} vueObject      vue对象
 * @param {*} lotteryList    彩票列表
 */
export function lotterySwitch (bjTime, vueObject, lotteryList, afterToday, beforeToday) {
  let today = new Date(bjTime).Format('yyyy/MM/dd')
  let tomorrow = new Date(afterToday).Format('yyyy/MM/dd')
  let list = []
  lotteryList.forEach(function (element) {
    if (element.lotteryId === 100 || element.lotteryId === 101) {
      return
    }
    let shortName = lotteryMap.LotterySrc[element.lotteryId]
    // 香港六合彩
    if (element.lotteryId === 24) {
      // 香港六合彩 手机端当前彩种必须是香港六合彩或者左侧导航栏必须是打开的（主要目的减少六合彩期数的接口请求）
      if (window.store.state.site.lotteryId * 1 === 24 || window.store.state.home.MuseUI.open) {
        if (navigator.onLine) {
          window.store.dispatch('period.action', { lotteryId: element.lotteryId }).then(res => {
            let lhcObj = res.data.periodList
            let obj = LHC(lhcObj, bjTime)
            list.push(obj)
          })
        } else {
          list.push({
            'seconds': -8999,                   // 倒计时秒数, 断网的话定格在 -8999  下面的倒计时会先减去 1000，则 该字段会一直定格在 -9999
            'periodNumber': -1,                 // 期数，-1 表示不需要考虑期数
            'isOpenOrClose': false,             // 正常情况下，该时段是倒计时还是封盘，true表示永远开盘倒计时
            'isFengPan': false,                 // 手动封盘，true表示正常倒计时， false表示被手动封盘了
            'len': -1,                          // len表示一天期数， -1表示不需要考虑
            'lotteryId': element.lotteryId,
            'begin': 0
          })
        }
      }
    } else if (lotteryMap.OGCP[shortName]) { // 一三五分彩
      let obj = privateSelft(lotteryMap.OGCP[shortName], bjTime, today, element.lotteryId)
      list.push(obj)
    } else {
        /** 重庆时时彩， 新疆时时彩， 重庆幸运农场，幸运飞艇 **/
      if (element.lotteryId === 2 || element.lotteryId === 11 || element.lotteryId === 13 || element.lotteryId === 8) {
        let obj = SSC(lotteryMap.lotteryBetRule[element.lotteryId], bjTime, today, element.lotteryId, tomorrow, beforeToday, vueObject)
        list.push(obj)
      } else {
        let obj = common(lotteryMap.lotteryBetRule[element.lotteryId], bjTime, today, element.lotteryId)
        list.push(obj)
      }
    }
  })
  lotteryInterval(list, vueObject)
}
/**
 * 获取差额
 * @param {*} lotteryTypeNumber 表示属于 一三五分彩种类
 */
function privateSelft (lotteryTypeNumber, bjTime, today, lotteryId) {
  let species = lotteryMap.lotteryCountdownForSelfEmployed[lotteryTypeNumber]
  // 开始时间
  let fristTime = new Date(new Date(bjTime).Format('yyyy/MM/dd') + ' ' + species.fristBettingStartTime).getTime()
  /** 一期所用的时间 */
  let onePeriodTime = species.totalTime
  /** 当前的秒数 */
  let seconds = onePeriodTime * 1000 - (bjTime - fristTime) % (onePeriodTime * 1000)
  return {
    'seconds': seconds,                 // 倒计时秒数
    'periodNumber': -1,                 // 期数，-1 表示不需要考虑期数
    'isOpenOrClose': true,              // 正常情况下，该时段是倒计时还是封盘，true表示永远开盘倒计时
    'isFengPan': true,
    'len': -1,                          // len表示一天期数， -1表示不需要考虑
    'lotteryId': lotteryId,
    'begin': 0
  }
}

function SSC (speciesList, bjTime, today, lotteryId, tomorrow, beforeToday, vueObject) {
  let index = 0
  for (let i = 0; i < speciesList.length; i++) {
    if ((lotteryId === 13 && i === 0) || (lotteryId === 8 && i === 1)) {
      if (crossTimeRange(today, tomorrow, beforeToday, speciesList[i].fristBettingStartTime, speciesList[i].lastEndTime, bjTime, vueObject)) {
        index = i
        break
      }
    } else {
      if (timeRange(today, speciesList[i].fristBettingStartTime, speciesList[i].lastEndTime, bjTime)) {
        index = i
        break
      }
    }
  }
  let periodNumber = 0
  let seconds = 0
  let isOpenOrClose = true
  /** index不等于3，表示 所在的时间段是可以投注的， 等于3 表示该时间内是封盘的 */
  if ((index !== 3 && lotteryId === 2) || (index !== 2 && lotteryId === 11) || (index !== 2 && lotteryId === 13) || (lotteryId === 8 && index !== 2)) { // 重庆时时彩, 新疆时时彩, 重庆幸运农场
     // 配置文件中第index时间段对应的投注开始时间戳
    let fristTime = new Date(today + ' ' + speciesList[index].fristBettingStartTime).getTime()
    if (((lotteryId === 13 && index === 0) || (lotteryId === 8 && index === 1)) && !vueObject.isStartTimeUseToday) { // 用于重庆幸运农场，index=0的时候，判断开始时间的日期是否用今天的日期还是昨天的日期
      let yesterday = new Date(beforeToday).Format('yyyy/MM/dd')
      fristTime = new Date(yesterday + ' ' + speciesList[index].fristBettingStartTime).getTime()
    }
     /** 一期所用的时间 */
    let onePeriodTime = speciesList[index].totalTime
     /** 计算当前期数, 如果index等于0，则期数直接取，如果不等于0，期数有 index-1 的len值加上运算后的数字 */
    periodNumber = index === 0 ? Math.ceil((bjTime - fristTime) / (onePeriodTime * 1000)) : speciesList[index - 1].len + Math.ceil((bjTime - fristTime) / (onePeriodTime * 1000))
     /** 当前的秒数 */
    let temp = (onePeriodTime) * 1000 - (bjTime - fristTime) % (onePeriodTime * 1000)
    if (temp >= speciesList[index].offTime * 1000) {
      seconds = temp - speciesList[index].offTime * 1000
      isOpenOrClose = true
    } else {
    // 封盘状态， 则期数要+1.为开盘做准备(比如 001期30秒封盘倒计时的时候， 页面展示002 的期数)
      periodNumber++
      seconds = temp
      isOpenOrClose = false
    }
  } else {
    // 封盘时间
    let fristTime = new Date(today + ' ' + speciesList[index].lastEndTime).getTime()
    seconds = Math.abs(bjTime - fristTime)
    if (lotteryId === 2) { // 表示重庆时时彩在00:02:00 - 09:50:00这段时间，期数是23
      periodNumber = 23
    } else if (lotteryId === 3 || lotteryId === 8) { // 表示新疆时时彩在00:02:00 - 10:00:00这段时间，期数是1
      periodNumber = 1
    } else if (lotteryId === 13) { // 表示重庆幸运农场在00:02:00 - 09:51:30这段时间，期数是13
      periodNumber = 13
    }
    isOpenOrClose = false
  }

  return {
    'seconds': seconds,                 // 倒计时秒数
    'periodNumber': periodNumber,       // 期数，重庆时时彩 3个阶段，每个阶段的投注时间不一样
    'isOpenOrClose': isOpenOrClose,     // 正常情况下，该时段是倒计时还是封盘
    'isFengPan': true,
    'lotteryId': lotteryId,
    'begin': 0
  }
}

function common (species, bjTime, today, lotteryId) {
  let periodNumber = 0
  let isOpenOrClose = true
  let seconds = 0
  // todo 偶尔不存在 js log 日志服务器 发现错误 临时处理
  if (!species) return {}
  if (timeRange(today, species.fristBettingStartTime, species.lastEndTime, bjTime)) {
    // 开始时间
    let fristTime = new Date(new Date(bjTime).Format('yyyy/MM/dd') + ' ' + species.fristBettingStartTime).getTime()
    /** 一期所用的时间 */
    let onePeriodTime = species.totalTime
    periodNumber = Math.ceil((bjTime - fristTime) / (onePeriodTime * 1000))
    /** 当前的秒数 */
    let temp = onePeriodTime * 1000 - (bjTime - fristTime) % (onePeriodTime * 1000)
    if (temp >= species.offTime * 1000) {
      seconds = temp - species.offTime * 1000
      isOpenOrClose = true
    } else {
      // 封盘状态， 则期数要+1.为开盘做准备(比如 001期30秒封盘倒计时的时候， 页面展示002 的期数)
      periodNumber++
      seconds = temp
      isOpenOrClose = false
    }
  } else {
    periodNumber = 1
    let fristTime = new Date(today + ' ' + species.fristBettingStartTime).getTime()
    seconds = Math.abs(bjTime - fristTime)
    isOpenOrClose = false
  }
  return {
    'seconds': seconds,                 // 倒计时秒数
    'periodNumber': periodNumber,       // 期数，重庆时时彩 3个阶段，每个阶段的投注时间不一样
    'isOpenOrClose': isOpenOrClose,     // 正常情况下，该时段是倒计时还是封盘 true 表示在倒计时, false表示封盘
    'isFengPan': true,  // 手动封盘，true表示正常倒计时， false表示被手动封盘了
    'lotteryId': lotteryId,
    'begin': 0
  }
}

function LHC (lhcObj, bjTime) {
  if (!lhcObj[0]) {
    return {
      'seconds': -8999,                      // 倒计时秒数
      'periodNumber': -1,                 // 期数，-1 表示不需要考虑期数
      'isOpenOrClose': false,             // 正常情况下，该时段是倒计时还是封盘，true表示开盘倒计时
      'isFengPan': false,                 // 手动封盘，true表示正常倒计时， false表示被手动封盘了
      'len': -1,                          // len表示一天期数， -1表示不需要考虑
      'lotteryId': 24,
      'begin': 0
    }
  } else {
    let obj = lhcObj[0]
    let betDate = new Date(obj.betDate.replace(/-/g, '/') + ' 00:00:00').getTime() // 开始投注的日期 2017-09-29
    let betEndDate = new Date(obj.betEndDate.replace(/-/g, '/') + ' 00:00:00').getTime() // 结束投注的日期 2017-10-03
    let startTime = new Date(new Date(betDate).Format('yyyy/MM/dd') + ' ' + obj.bettingStartDate).getTime() // 开始投注的日期 2017-09-29 16:21:35
    let endTime = new Date(new Date(betEndDate).Format('yyyy/MM/dd') + ' ' + obj.bettingEndDate).getTime() // 结束投注的日期 2017-10-03 21:30:30
    let overTime = new Date(new Date(betEndDate).Format('yyyy/MM/dd') + ' ' + '22:00:00').getTime() // 投注时间结束后 有 30分钟的倒计时

    let seconds = 0
    let isOpenOrClosed = true
    let isFengPan = true
    if (startTime > bjTime) { // 表示还没有开盘
      seconds = Math.abs(bjTime - startTime)
      isOpenOrClosed = false
    } else if (bjTime >= startTime && bjTime <= endTime) { // 表示在投注期间
      seconds = Math.abs(bjTime - endTime)
      isOpenOrClosed = true // 如果在开盘期间bettingState =0 表示也是封盘状态
    } else if (bjTime > endTime && bjTime < overTime) { // 表示当前时间大于 投注结束， 小于 22:00:00
      seconds = Math.abs(bjTime - overTime)
      isOpenOrClosed = false
      isFengPan = false
    }

    return {
      'seconds': seconds,                      // 倒计时秒数
      'periodNumber': -1,                 // 期数，-1 表示不需要考虑期数
      'isOpenOrClose': isOpenOrClosed,             // 正常情况下，该时段是倒计时还是封盘，true表示永远开盘倒计时
      'isFengPan': isFengPan,                 // 手动封盘，true表示正常倒计时， false表示被手动封盘了
      'len': -1,                          // len表示一天期数， -1表示不需要考虑
      'lotteryId': lhcObj[0].lotteryId,
      'begin': new Date().getTime() + seconds
    }
  }
}

function lotteryInterval (lotteryList, vueObject) {
  if (window.store.state.betZone.navigateTimer) {
    window.clearInterval(window.store.state.betZone.navigateTimer)
    window.store.state.betZone.navigateTimer = null
  }
  fixServiceUseTime(lotteryList, vueObject)
  let start = new Date().getTime() // 定时器开始时间戳
  for (let k = 0; k < lotteryList.length; k++) {
    Vue.set(lotteryList[k], 'begin', new Date().getTime() + lotteryList[k].seconds)
  }
  window.store.state.betZone.navigateTimer = window.setInterval(function () {
    window.store.state.site.timeCount++
    if (window.store.state.site.timeCount >= 500) {
      Vue.set(window.store.state.site, 'timeCount', 0)
      vueObject.timer()
      return
    }
    for (let i = 0; i < lotteryList.length; i++) {
      lotteryList[i].lotteryId !== 24
      ? Vue.set(lotteryList[i], 'seconds', Math.max(0, lotteryList[i].begin - new Date().getTime())) : Vue.set(lotteryList[i], 'seconds', lotteryList[i].begin - new Date().getTime())
      if (lotteryList[i].seconds <= 500) {
        // 判断是否是一三五分彩
        let short = lotteryMap.LotterySrc[lotteryList[i].lotteryId]
        let ruleNumber = lotteryMap.OGCP[short]
        let lotteryId = lotteryList[i].lotteryId
        if (lotteryId === 24) { // 香港六合彩
          IntervalServiceLHC(lotteryList[i], vueObject)
        } else if (ruleNumber) { // 一三五分彩
          IntervalServiceOneTwoThree(lotteryList[i], lotteryMap.lotteryCountdownForSelfEmployed[ruleNumber])
        } else {
          if (lotteryId !== 2 && lotteryId !== 11 && lotteryId !== 13) {
            IntervalServiceCommon(lotteryList[i], lotteryMap.lotteryBetRule[lotteryId], vueObject)
          } else {
            IntervalServiceOther(lotteryList[i], lotteryMap.lotteryBetRule[lotteryId], vueObject)
          }
        }
        Vue.set(lotteryList[i], 'begin', new Date().getTime() + lotteryList[i].seconds + 5)
      }
    }
    let end = new Date().getTime()
    if (Math.abs(end - start) >= 10000) { // 如果上一秒和下一秒大于等于 10秒，则重新调整个逻辑
      vueObject.timer()
      return
    }
    start = new Date().getTime()
    Vue.set(vueObject, 'timerList', lotteryList)
    Vue.set(window.store.state.betZone, 'lotteryTimes', vueObject.timerList)
  }, 1000)
}

function IntervalServiceOneTwoThree (lotteryObject, species) {
  if (lotteryObject.isOpenOrClose) { // 一三五分彩没有封盘时间，所以设置为0
    lotteryObject.isOpenOrClose = false
    lotteryObject.seconds = species.offTime * 1000
  } else {
    lotteryObject.isOpenOrClose = true
    lotteryObject.seconds = (species.betTime - 1) * 1000
  }
}

function IntervalServiceCommon (lotteryObject, species, vueObject) {
  if (lotteryObject.periodNumber <= species.len) {
    if (lotteryObject.isOpenOrClose) { // 从倒计时变成封盘
      lotteryObject.isOpenOrClose = false
      lotteryObject.seconds = species.offTime * 1000
    } else {
      lotteryObject.isOpenOrClose = true
      lotteryObject.seconds = species.betTime * 1000
      lotteryObject.periodNumber++
    }
  } else {
    // 表示大于最大的期数,进行逻辑重调
    vueObject.timer()
  }
}

/** 重庆时时彩， 新疆时时彩， 重庆幸运农场 */
function IntervalServiceOther (lotteryObject, speciesList, vueObject) {
  if (lotteryObject.lotteryId === 2) { // 重庆时时彩
    if (lotteryObject.periodNumber === 24 || lotteryObject.periodNumber >= 121) { // 24表示到凌晨01:54:30,进入封盘时间， 121 表示 期数要重新算
      vueObject.timer() // 重新算逻辑
    } else {
      if (lotteryObject.isOpenOrClose) {
        lotteryObject.isOpenOrClose = false
        lotteryObject.seconds = speciesList[0].offTime * 1000  // 因为offTime 的间隔时间一致，所以取0下标的就可以
      } else {
        lotteryObject.isOpenOrClose = true
        lotteryObject.periodNumber++
        lotteryObject.periodNumber <= 23 ? lotteryObject.seconds = (speciesList[0].betTime * 1000)
                                    : (lotteryObject.periodNumber <= 96 ? lotteryObject.seconds = (speciesList[1].betTime * 1000)
                                         : lotteryObject.seconds = (speciesList[2].betTime * 1000))
      }
    }
  }

  if (lotteryObject.lotteryId === 11) { // 新疆时时彩
    if (lotteryObject.periodNumber === 85 || lotteryObject.periodNumber >= 97) {
      vueObject.timer() // 重新算逻辑
    } else {
      if (lotteryObject.isOpenOrClose) {
        lotteryObject.isOpenOrClose = false
        lotteryObject.seconds = speciesList[0].offTime * 1000 // 因为offTime 的间隔时间一致，所以取0下标的就可以
      } else {
        lotteryObject.isOpenOrClose = true
        lotteryObject.periodNumber++
        lotteryObject.seconds = speciesList[0].betTime * 1000 // 因为betTime 的间隔时间一致，所以取0下标的就可以
      }
    }
  }

  if (lotteryObject.lotteryId === 13) { // 重庆幸运农场
    if (lotteryObject.periodNumber === 14 || lotteryObject.periodNumber >= 98) {
      vueObject.timer() // 重新算逻辑
    } else {
      if (lotteryObject.isOpenOrClose) {
        lotteryObject.isOpenOrClose = false
        lotteryObject.seconds = speciesList[0].offTime * 1000 // 因为offTime 的间隔时间一致，所以取0下标的就可以
      } else {
        lotteryObject.isOpenOrClose = true
        lotteryObject.periodNumber++
        lotteryObject.seconds = speciesList[0].betTime * 1000 // 因为betTime 的间隔时间一致，所以取0下标的就可以
      }
    }
  }
}

function IntervalServiceLHC (obj, vueObject) {
  if (obj.seconds <= -9999) { // 表示查询不到有最新的六合彩信息，所以时间永远定格在 -9999
    obj.seconds = -9999
  } else if (obj.seconds <= 0) {
      /** 重置开奖次数 */
    vueObject.timer()
  }
}

function timeRange (today, betStartTime, lastEndTime, bjTime) {
  let firstTime = new Date(today + ' ' + betStartTime).getTime()
  let lastTime = new Date(today + ' ' + lastEndTime).getTime()
  if (bjTime >= firstTime && bjTime <= lastTime) {
    return true
  }
  return false
}

function crossTimeRange (today, afterToday, yesterday, betStartTime, lastEndTime, bjTime, vueObject) {
  let lastTime = ''
  let firstTime = new Date(today + ' ' + betStartTime).getTime()
  if (bjTime >= firstTime) {
    lastTime = new Date(afterToday + ' ' + lastEndTime).getTime()
    vueObject.isStartTimeUseToday = true // 表示重庆幸运农场，时间段在 23:51:30 到 00:01:30 这段时间内，判断 betStartTime 的日期是用今天的 还是用第二天， false表示用第二天， true 表示用今天的日期
  } else {
    firstTime = new Date(yesterday + ' ' + betStartTime).getTime()
    lastTime = new Date(today + ' ' + lastEndTime).getTime()
    vueObject.isStartTimeUseToday = false
  }
  if (bjTime >= firstTime && bjTime <= lastTime) {
    return true
  }
  return false
}

/** 修正业务逻辑所需要的时间差 */
function fixServiceUseTime (list, vueObject) {
  for (let i = 0; i < list.length; i++) {
    let endTime = new Date().getTime()
    list[i].seconds -= (endTime - vueObject.startTime)
  }
}

/** 判断该彩种是否从游戏尚未开启改变成可以进入游戏投注 */
export function getLotteryStatus (res) {
  if (res.data && res.data.times) {
    Vue.set(window.store.state.site, 'lotteryStatusList', res.data.times)
    // 如果彩票的bettingStatus === 1,则查找该彩票现在的状态是否改变了
    for (let index in window.store.state.home.lotteryList) { // 循环所有彩票列表
      window.store.state.home.lotteryList[index].lotteryType.forEach(lottery => {
        if (lottery.bettingStatus === 1) {
          for (let k = 0; k < res.data.times.length; k++) {
            if (res.data.times[k].id === lottery.lotteryId) {
              res.data.times[k].success ? Vue.set(lottery, 'bettingStatus', 0) : Vue.set(lottery, 'bettingStatus', 1)
            }
          }
        }
      })
    }
  }
}

/** 获取所有彩票的状态,用于左侧导航栏  因为 lotteryTimes 和 this.timerList 是数组引用， 改变lotteryTimes，timerList 也会跟着变 */
export function menulotteryTimes () {
  let list = window.store.state.site.lotteryStatusList
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < window.store.state.betZone.lotteryTimes.length; j++) {
      if (list[i].id === window.store.state.betZone.lotteryTimes[j].lotteryId) {
        Vue.set(window.store.state.betZone.lotteryTimes[j], 'isFengPan', list[i].success)
      }
    }
  }
}
