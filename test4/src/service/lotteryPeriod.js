import * as lotteryMap from 'config/lotteryMap'
import Vue from 'vue'
// 转换时间格式（倒计时）
export function formatSeconds (time, vueData) {
  // time = time * 1000
  var p = function (c) {
    c = c.toString()
    return c.length === 1 ? '0' + c : c
  }
  time = Math.max(time, 0)
  if (time) {
    time = Math.ceil(time / 1000) // 得到剩余秒数
    // var d = Math.floor(time / 3600 / 24) // 得到剩余天数
    // time = time - (3600 * 24 * d) // 除去天数后剩余的秒数
    // vueData.day = d // 将天数传到页面
    var h = Math.floor(time / 60 / 60) // 算出剩余小时（不会大于24小时）
    time = time % 3600 // 剩余小时数
    var m = Math.floor(time / 60) // 除去剩余小时后剩余分钟数
    var s = time % 60
    return p(h) + ':' + p(m) + ':' + p(s)
  } else {
    return '00:00:00'
  }
}

/** ************************************************ 获取自营彩的期数 ***********************************************************/
export function initSelftEmployed (lotteryId, bjTime, vueObject) {
  Vue.set(vueObject, 'isOpenOrClosed', true) // 表示永远开盘
  Vue.set(vueObject, 'isTrue', true)
  let nowGame = lotteryMap.LotterySrc[lotteryId]
  let number = lotteryMap.OGCP[nowGame]
  let species = lotteryMap.lotteryCountdownForSelfEmployed[number]
  // 第一期投注开始时间戳
  let fristTime = new Date(new Date(bjTime).Format('yyyy/MM/dd') + ' ' + species.fristBettingStartTime).getTime()
  /** 一期所用的时间 */
  let onePeriodTime = species.totalTime
  let periodNumber = Math.ceil((bjTime - fristTime) / (onePeriodTime * 1000))
  /** 当前的秒数 */
  let seconds = onePeriodTime * 1000 - (bjTime - fristTime) % (onePeriodTime * 1000)

  /** 期数 小于10 的 是 001模式， 小于 100的，是 010 模式 */
  vueObject.periodNumber = periodNumber < 10 ? ('00' + periodNumber) : (periodNumber < 100 ? '0' + periodNumber : periodNumber)
  vueObject.seconds = seconds
  /** 完整期数拼接，用于投注时候传给后端 */
  window.store.state.betZone.currentPeriodNo = '0' + lotteryId + new Date(bjTime).Format('yyyyMMdd') + vueObject.periodNumber
  /** 倒计时的定时器 */
  getSelftEmployedCountDownInterval(vueObject, species, number, bjTime)
}

/** 自营彩的倒计时 */
function getSelftEmployedCountDownInterval (vueObject, species, number, bjTime) {
  isCleanLotteryInterval(vueObject)
  fixServiceUseTime(vueObject)

  let start = new Date().getTime() // 定时器开始时间戳
  let begin = new Date().getTime() + vueObject.seconds // 倒计时加时间戳
  if (vueObject.$store.state.betZone.timer) {
    window.clearInterval(vueObject.$store.state.betZone.timer)
    vueObject.$store.state.betZone.timer = null
  }
  vueObject.$store.state.betZone.timer = window.setInterval(function () {
    Vue.set(vueObject, 'seconds', Math.max(0, begin - new Date().getTime()))
    Vue.set(vueObject, 'endTimeView', formatSeconds(vueObject.seconds, vueObject))

    if (vueObject.seconds <= 500) { // 从新计算
      // 每一期结束之后重新计算
      vueObject.timer()
      return
    }
    let end = new Date().getTime()
    if (Math.abs(end - start) >= 10000) { // 如果上一秒和下一秒大于等于 10秒，则重新调整个逻辑
      vueObject.timer()
      return
    }
    start = new Date().getTime()
  }, 1000)
}

/** ************************************************ 自营彩 end  ***************************************************************/

/** ************************************************ 重庆时时彩的期数, 新疆时时彩 重庆幸运农场 start ******************************/
export function timeRange (today, betStartTime, lastEndTime, bjTime) {
  let firstTime = new Date(today + ' ' + betStartTime).getTime()
  let lastTime = new Date(today + ' ' + lastEndTime).getTime()
  if (bjTime >= firstTime && bjTime <= lastTime) {
    return true
  }
  return false
}

export function crossTimeRange (today, afterToday, yesterday, betStartTime, lastEndTime, bjTime, vueObject) {
  let lastTime = ''
  let firstTime = new Date(today + ' ' + betStartTime).getTime()
  let tempyesterday = new Date(yesterday).Format('yyyy/MM/dd')
  if (bjTime >= firstTime) {
    lastTime = new Date(afterToday + ' ' + lastEndTime).getTime()
    vueObject.isStartTimeUseToday = true // 表示重庆幸运农场，时间段在 23:51:30 到 00:01:30 这段时间内，判断 betStartTime 的日期是用今天的 还是用第二天， false表示用第二天， true 表示用今天的日期
  } else {
    firstTime = new Date(tempyesterday + ' ' + betStartTime).getTime()
    lastTime = new Date(today + ' ' + lastEndTime).getTime()
    vueObject.isStartTimeUseToday = false
  }
  if (bjTime >= firstTime && bjTime <= lastTime) {
    return true
  }
  return false
}

/** 如果之前有定时器，删除 */
export function isCleanLotteryInterval (vueObject) {
  if (vueObject.$store.state.betZone.timer) {
    window.clearInterval(vueObject.$store.state.betZone.timer)
    vueObject.$store.state.betZone.timer = null
  }
}
/** 修正业务逻辑所需要的时间差 */
export function fixServiceUseTime (vueObject) {
  let endTime = new Date().getTime()
  vueObject.seconds -= (endTime - vueObject.startTime)
  Vue.set(vueObject, 'endTimeView', formatSeconds(vueObject.seconds, vueObject)) // 切换彩种的时候可以比较平滑
}

export function initCQSSC (lotteryId, beforeToday, bjTime, afterToday, vueObject) {
  let speciesList = lotteryMap.lotteryBetRule[Number(lotteryId)]
  let today = new Date(bjTime).Format('yyyy/MM/dd')
  let tomorrow = new Date(afterToday).Format('yyyy/MM/dd')
  let yesterday = new Date(beforeToday).Format('yyyy/MM/dd')
  let index = 0
  for (let i = 0; i < speciesList.length; i++) {
    if ((lotteryId === 13 && i === 0) || (lotteryId === 8 && i === 1)) { // 因为重庆幸运农场 i===0 的时候  时间是 23:51:30 到次日 02:01:00, 幸运飞艇
      if (crossTimeRange(today, tomorrow, yesterday, speciesList[i].fristBettingStartTime, speciesList[i].lastEndTime, bjTime, vueObject)) {
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
  /** index不等于3，表示 所在的时间段是可以投注的， 等于3 表示该时间内是封盘的 */
  if ((index !== 3 && lotteryId === 2) || (index !== 2 && lotteryId === 11) || (index !== 2 && lotteryId === 13) || (index !== 2 && lotteryId === 8)) { // 重庆时时彩, 新疆时时彩, 重庆幸运农场
    serviceSSC(index, lotteryId, today, speciesList, bjTime, vueObject, beforeToday, afterToday)
  } else {
    /**
     * 重庆时时彩，1：54:30 到 9点50
     * 新疆时时彩，1：58:00 到 10点
     * 重庆幸运农场，2：01:00 到 09:51:30
     * 这段时间都是不进行投注， 获取lastEndTime(9点50) 这个时间戳， 进行倒计时
     * */
    let fristTime = new Date(today + ' ' + speciesList[index].lastEndTime).getTime()
    let seconds = Math.abs(bjTime - fristTime)
    vueObject.seconds = seconds
    if (lotteryId === 2) { // 重庆时时彩在停止投注期间，下一期为 24
      vueObject.periodNumber = '024'
    } else if (lotteryId === 11 || lotteryId === 8) { // 新疆时时彩, 幸运飞艇
      vueObject.periodNumber = '001'
    } else if (lotteryId === 13) { // 重庆幸运农场在停止投注期间，下一期为 14
      vueObject.periodNumber = '014'
    }
    /** 完整期数拼接，用于投注时候传给后端 */
    let lotteryCode = lotteryId < 10 ? ('00' + lotteryId) : (lotteryId < 100 ? '0' + lotteryId : lotteryId)
    window.store.state.betZone.currentPeriodNo = lotteryCode + new Date(bjTime).Format('yyyyMMdd') + vueObject.periodNumber
    Vue.set(vueObject, 'isOpenOrClosed', false)
    Vue.set(vueObject, 'isTrue', false)
    // window.store.state.betZone.bettingState = 0 // 改成不可以投注
  }
  getCQSSCCountDownInterval(lotteryId, vueObject, speciesList, bjTime, index, beforeToday, afterToday)
}

function getCQSSCCountDownInterval (lotteryId, vueObject, speciesList, bjTime, index, beforeToday, afterToday) {
  isCleanLotteryInterval(vueObject)
  fixServiceUseTime(vueObject)

  let start = new Date().getTime() // 定时器开始时间戳
  let begin = new Date().getTime() + vueObject.seconds // 倒计时加时间戳
  if (vueObject.$store.state.betZone.timer) {
    window.clearInterval(vueObject.$store.state.betZone.timer)
    vueObject.$store.state.betZone.timer = null
  }
  vueObject.$store.state.betZone.timer = window.setInterval(function () {
    Vue.set(vueObject, 'seconds', Math.max(0, begin - new Date().getTime()))
    Vue.set(vueObject, 'endTimeView', formatSeconds(vueObject.seconds, vueObject))

    /** 倒计时变 0 后的 逻辑 */
    if (vueObject.seconds <= 0) {
      serviceSSCInterval(index, lotteryId, vueObject, speciesList, bjTime, beforeToday, afterToday)
      Vue.set(vueObject, 'endTimeView', '00:00:00')
      begin = new Date().getTime() + vueObject.seconds + 10
    }
    let end = new Date().getTime()
    if (Math.abs(end - start) >= 10000) { // 如果上一秒和下一秒大于等于 10秒，则重新调整个逻辑
      vueObject.timer()
      return
    }
    start = new Date().getTime()
  }, 1000)
}

/**
 *
 * @param {*} index             speciesList  下标
 * @param {*} lotteryId         彩种ID
 * @param {*} today             当前天数 yyyy/MM/dd
 * @param {*} speciesList       lotteryMap.lotteryBetRule 匹配彩种开盘和封盘规则
 * @param {*} bjTime            系统时间对应的北京时间
 * @param {*} vueObject         vue对象
 * @param {*} beforeToday       昨天的日期 yyMMdd
 * @param {*} afterToday        明天的日期 yyMMdd
 */
function serviceSSC (index, lotteryId, today, speciesList, bjTime, vueObject, beforeToday, afterToday) {
  // 配置文件中第index时间段对应的投注开始时间戳
  let fristTime = new Date(today + ' ' + speciesList[index].fristBettingStartTime).getTime()
  if (((lotteryId === 13 && index === 0) || (lotteryId === 8 && index === 1)) && !vueObject.isStartTimeUseToday) { // 重庆幸运农场，index=0 并且isStartTimeUseToday = false
    let yesterday = new Date(beforeToday).Format('yyyy/MM/dd')
    fristTime = new Date(yesterday + ' ' + speciesList[index].fristBettingStartTime).getTime()
  }
  /** 一期所用的时间 */
  let onePeriodTime = speciesList[index].totalTime
  /** 计算当前期数, 如果index等于0，则期数直接取，如果不等于0，期数有 index-1 的len值加上运算后的数字 */
  let periodNumber = index === 0 ? Math.ceil((bjTime - fristTime) / (onePeriodTime * 1000)) : speciesList[index - 1].len + Math.ceil((bjTime - fristTime) / (onePeriodTime * 1000))
  /** 当前的秒数 */
  let temp = (onePeriodTime) * 1000 - (bjTime - fristTime) % (onePeriodTime * 1000)
  let seconds = 0
  if (temp >= speciesList[index].offTime * 1000) {
    seconds = temp - speciesList[index].offTime * 1000
    Vue.set(vueObject, 'isOpenOrClosed', true)
    Vue.set(vueObject, 'isTrue', true)
    // window.store.state.betZone.bettingState = 1 // 改成可以投注
  } else {
    // 封盘状态， 则期数要+1.为开盘做准备(比如 001期30秒封盘倒计时的时候， 页面展示002 的期数)
    periodNumber++
    seconds = temp
    Vue.set(vueObject, 'isOpenOrClosed', false)
    Vue.set(vueObject, 'isTrue', false)
    // window.store.state.betZone.bettingState = 0 // 改成不可以投注
  }
  /** 期数 小于10 的 是 001模式， 小于 100的，是 010 模式 */
  vueObject.periodNumber = periodNumber < 10 ? ('00' + periodNumber) : (periodNumber < 100 ? '0' + periodNumber : periodNumber)
  vueObject.seconds = seconds
    /** 完整期数拼接，用于投注时候传给后端 */
  let lotteryCode = lotteryId < 10 ? ('00' + lotteryId) : (lotteryId < 100 ? '0' + lotteryId : lotteryId)

  // 幸运飞艇,剩余时间小于4分钟，并且在132期,并且不是封盘时间，那么该时间段处于 132期的投注时间，如果是封盘状态，并且时间小于4分，那么是处于131到132的30秒封盘时间
  if (lotteryId === 8 && ((temp < 240000 && periodNumber === 132 && vueObject.isOpenOrClosed) || periodNumber > 132)) {
    Vue.set(window.store.state.betZone, 'currentPeriodNo', lotteryCode + new Date(beforeToday).Format('yyyyMMdd') + vueObject.periodNumber)
    Vue.set(vueObject, 'bjTime', beforeToday)// 页面展示的日期也是昨天
  } else if (lotteryId === 11 && index === 1) { // 新疆时时彩晚上00：00:00 - 02:00:00 时间段，用的时间是前一天时间, 页面展示的日期也是昨天
    Vue.set(window.store.state.betZone, 'currentPeriodNo', lotteryCode + new Date(beforeToday).Format('yyyyMMdd') + vueObject.periodNumber)
    Vue.set(vueObject, 'bjTime', beforeToday)// 页面展示的日期也是昨天
  } else if (lotteryId === 13 && (temp > 90000 && (periodNumber === 1 || periodNumber === 98))) { // 重庆幸运农场第一期需要特殊处理 001期 23:51:30 - 00:01:00  如果temp > 90000  表示未过了12点，期数拼接用第二天的日期，过了12点则用当天的日期
    periodNumber = 1
    /** 期数 重新赋值 */
    vueObject.periodNumber = periodNumber < 10 ? ('00' + periodNumber) : (periodNumber < 100 ? '0' + periodNumber : periodNumber)
    Vue.set(window.store.state.betZone, 'currentPeriodNo', lotteryCode + new Date(afterToday).Format('yyyyMMdd') + vueObject.periodNumber)
    Vue.set(vueObject, 'bjTime', afterToday)// 页面展示的日期是第二天的日期
  } else if (lotteryId === 2 && periodNumber === 121) { // 表示到120的倒计时了
    periodNumber = 1
    /** 期数 重新赋值 */
    vueObject.periodNumber = periodNumber < 10 ? ('00' + periodNumber) : (periodNumber < 100 ? '0' + periodNumber : periodNumber)
    window.store.state.countDown.currentPeriodNo = lotteryCode + new Date(afterToday).Format('yyyyMMdd') + vueObject.periodNumber
    Vue.set(vueObject, 'bjTime', afterToday) // 页面展示的日期是第二天的日期
  } else {
    Vue.set(window.store.state.betZone, 'currentPeriodNo', lotteryCode + new Date(bjTime).Format('yyyyMMdd') + vueObject.periodNumber)
  }
}

/**
 *
 * @param {*} index                speciesList  下标
 * @param {*} lotteryId            彩种ID
 * @param {*} vueObject            vue对象
 * @param {*} speciesList          lotteryMap.lotteryBetRule 匹配彩种开盘和封盘规则
 * @param {*} bjTime               系统时间对应的北京时间
 * @param {*} beforeToday          昨天的日期 yyMMdd
 * @param {*} afterToday           明天的日期 yyMMdd
 */
function serviceSSCInterval (index, lotteryId, vueObject, speciesList, bjTime, beforeToday, afterToday) {
    /** 因为true 是距离封盘倒计时，因为这里时间小于等于 0， 则转成用封盘时间 */
  if (vueObject.isOpenOrClosed) {
    Vue.set(vueObject, 'isOpenOrClosed', false)
    Vue.set(vueObject, 'isTrue', false)
    /** 重置开奖次数 */
    window.store.state.award.awardTimes = 0
    // window.store.state.betZone.bettingState = 0 // 改成不可以投注
    /** 期数加一 */
    let periodNumber = Number(vueObject.periodNumber) + 1
    if (periodNumber === 121 && lotteryId === 2) {
    /**
     * 重庆时时彩 121表示是晚上21:59:30了，进行开盘倒计时， 期数变成001  日期变成第二天时间，
     */
      periodNumber = 1
      let number = periodNumber < 10 ? ('00' + periodNumber) : (periodNumber < 100 ? '0' + periodNumber : periodNumber)
      Vue.set(vueObject, 'periodNumber', number)
        /** 完整期数拼接，用于投注时候传给后端 */
      let lotteryCode = lotteryId < 10 ? ('00' + lotteryId) : (lotteryId < 100 ? '0' + lotteryId : lotteryId)
      Vue.set(window.store.state.betZone, 'currentPeriodNo', lotteryCode + new Date(afterToday).Format('yyyyMMdd') + vueObject.periodNumber)
    } else if (periodNumber >= 86 && lotteryId === 11) {
        /*
        * 新疆时时彩 85表示是晚上23:59:30 之后, 00:00:00之前，进行开盘倒计时， 期数变成085， 拼接期数还是用当前天数， 如果 86 则表示已经到了00:08:00之后了，拼接期数用前一天时间
         1. 如果是一直没刷新页面，当期数变成086的时候，beforeToday拿到的数值是前2天的时间（例如： 10月 1 号 的前一天是 9月30号， 如果过了12点变成 10月2号，beforeToday 会是9月30号）
            所以在 vueObject.isOpenOrClosed = false 的判断里面会重新执行timer()
         2. 如果页面有重新刷新过，则beforeToday拿的时间是准确的
        */
      let number = periodNumber < 10 ? ('00' + periodNumber) : (periodNumber < 100 ? '0' + periodNumber : periodNumber)
      Vue.set(vueObject, 'periodNumber', number)
        /** 完整期数拼接，用于投注时候传给后端 */
      let lotteryCode = lotteryId < 10 ? ('00' + lotteryId) : (lotteryId < 100 ? '0' + lotteryId : lotteryId)
      Vue.set(window.store.state.betZone, 'currentPeriodNo', lotteryCode + new Date(beforeToday).Format('yyyyMMdd') + vueObject.periodNumber)
    } else if (lotteryId === 13 && (periodNumber === 2 || periodNumber === 14 || periodNumber === 98)) {
      /**
       * 1. 重庆幸运农场等于14则表示到了02:01:00， 30秒封盘倒计时不计算， 直接重新调用逻辑， 用当前时间和早上 9点51开盘时间进行开盘倒计时
       * 2. 等于2 表示第一期进入30秒的封盘倒计时了， 因为不确定是在12点之前选择该彩种还是12点之后选择，因此重新调用timer
       * 3. 等于98 表示需要从 001 开始，只需要从新调用逻辑就可以
       */
      vueObject.timer()
      return
    } else if (lotteryId === 8 && periodNumber > 133 && periodNumber <= 180) { // 表示要用前一天的时间
      let number = periodNumber < 10 ? ('00' + periodNumber) : (periodNumber < 100 ? '0' + periodNumber : periodNumber)
      Vue.set(vueObject, 'periodNumber', number)
        /** 完整期数拼接，用于投注时候传给后端 */
      let lotteryCode = lotteryId < 10 ? ('00' + lotteryId) : (lotteryId < 100 ? '0' + lotteryId : lotteryId)
      Vue.set(window.store.state.betZone, 'currentPeriodNo', lotteryCode + new Date(beforeToday).Format('yyyyMMdd') + vueObject.periodNumber)
    } else if (lotteryId === 8 && periodNumber >= 181) {
      /**
     * 幸运飞艇 121表示是晚上04:04:00了，进行开盘倒计时， 期数变成001  日期变成第二天时间，
     */
      vueObject.timer()
      return
    } else {
      let number = periodNumber < 10 ? ('00' + periodNumber) : (periodNumber < 100 ? '0' + periodNumber : periodNumber)
      Vue.set(vueObject, 'periodNumber', number)
        /** 完整期数拼接，用于投注时候传给后端 */
      let lotteryCode = lotteryId < 10 ? ('00' + lotteryId) : (lotteryId < 100 ? '0' + lotteryId : lotteryId)
      Vue.set(window.store.state.betZone, 'currentPeriodNo', lotteryCode + new Date(bjTime).Format('yyyyMMdd') + vueObject.periodNumber)
    }

    /** 时间标变成封盘倒计时 */
    Vue.set(vueObject, 'seconds', speciesList[index].offTime * 1000)
  } else {
      /**
       *  如果新疆时时彩 86期开盘了， 防止 currentPeriodNo 拼接不正确，需要重新调用方法
       * 1. 如果一直没刷页面， 页面的展示日期还是正确的 比如 时间从 10月1号 跳到 10月2号， 因为页面没刷过， 用sysTime 转化的时间还是 10月1号
       * 2. 如果页面有刷新， serviceSSC() 方法有判断
       */
    if ((Number(vueObject.periodNumber) === 86 && lotteryId === 11) || (Number(vueObject.periodNumber) === 1 && lotteryId === 8)) {
      vueObject.timer()
      return
    }
    /** 因为false 是距离开盘倒计时， 因为这里时间小于0，说明 要进行开盘了，所以用开盘时间 */
    Vue.set(vueObject, 'isOpenOrClosed', true)
    Vue.set(vueObject, 'isTrue', true)

    /** 时间标变成开盘倒计时 */
    Vue.set(vueObject, 'seconds', speciesList[index].betTime * 1000)
  }
    /** 重庆时时彩3个阶段，每个阶段的投注时间不同，所以在不同临界点要重新调用逻辑 期数变成24的时候，说明23期投注时间结束了，30秒的倒计时不需要放进来，所以删除 vueObject.isOpenOrClosed == true 的 判断 */
  if (lotteryId === 2) {
    if ((index === 0 && Number(vueObject.periodNumber) >= 24) || (index === 1 && Number(vueObject.periodNumber) >= 97 && vueObject.isOpenOrClosed) ||
          (index === 2 && Number(vueObject.periodNumber) >= 1 && vueObject.isOpenOrClosed) || index === 3) {
      vueObject.timer()
    }
  } else if (lotteryId === 11) { // 新疆时时彩大于等于97则表示到了01:58:00， 2分钟封盘倒计时不计算， 直接重新调用逻辑， 用当前时间和早上 10点开盘时间进行开盘倒计时
    if (Number(vueObject.periodNumber) >= 97) {
      vueObject.timer()
    }
  } else if (lotteryId === 8) {
    if (Number(vueObject.periodNumber) >= 181) {
      vueObject.timer()
    }
  }
}
/** ********************************************** 重庆时时彩  新疆时时彩 重庆幸运农场 end ******************************************/

/** ********************************************** 大部分传统菜 start *************************************************************/

export function initCommon (lotteryId, beforeToday, bjTime, afterToday, vueObject) {
  let species = lotteryMap.lotteryBetRule[Number(lotteryId)]
  let today = new Date(bjTime).Format('yyyy/MM/dd')
  let periodNumber = 0
  if (timeRange(today, species.fristBettingStartTime, species.lastEndTime, bjTime)) {
    /** 在有期数的范围内 */
    // 第一期投注开始时间戳
    let fristTime = new Date(new Date(bjTime).Format('yyyy/MM/dd') + ' ' + species.fristBettingStartTime).getTime()
    /** 一期所用的时间 */
    let onePeriodTime = species.totalTime
    periodNumber = Math.ceil((bjTime - fristTime) / (onePeriodTime * 1000))
    /** 当前的秒数 */
    let temp = onePeriodTime * 1000 - (bjTime - fristTime) % (onePeriodTime * 1000)
    let seconds = 0
    if (temp >= species.offTime * 1000) {
      seconds = temp - species.offTime * 1000
      Vue.set(vueObject, 'isOpenOrClosed', true)
      Vue.set(vueObject, 'isTrue', true)
      // window.store.state.betZone.bettingState = 1 // 改成可以投注
    } else {
      // 封盘状态， 则期数要+1.为开盘做准备(比如 001期30秒封盘倒计时的时候， 页面展示002 的期数)
      periodNumber++
      seconds = temp
      Vue.set(vueObject, 'isOpenOrClosed', false)
      Vue.set(vueObject, 'isTrue', false)
      // window.store.state.betZone.bettingState = 0 // 改成不可以投注
    }
    if (lotteryId === 6 || lotteryId === 15 || lotteryId === 9 || lotteryId === 16 || lotteryId === 18) { // 北京赛车，北京快8，幸运28，广西快乐十分，北京快3
      getPeriods(lotteryId).then(res => {
        if (res.data.periodList[0]) {
          localStorage.setItem('period_' + lotteryId, res.data.periodList[0].periodCode)
          vueObject.periodNumber = (Number(res.data.periodList[0].periodCode) + periodNumber - 1)// 第一期拿到，periodNumber 是距离今天的期数，要减一
        }
        // res.data.periodList[0] ? vueObject.periodNumber = (Number(res.data.periodList[0].periodCode) + periodNumber - 1) : '' // 第一期拿到，periodNumber 是距离今天的期数，要减一
        window.store.state.betZone.currentPeriodNo = vueObject.periodNumber
      })
    } else {
      /** 期数 小于10 的 是 001模式， 小于 100的，是 010 模式 */
      vueObject.periodNumber = periodNumber < 10 ? ('00' + periodNumber) : (periodNumber < 100 ? '0' + periodNumber : periodNumber)
      /** 完整期数拼接，用于投注时候传给后端 */
      let lotteryCode = lotteryId < 10 ? ('00' + lotteryId) : (lotteryId < 100 ? '0' + lotteryId : lotteryId)
      window.store.state.betZone.currentPeriodNo = lotteryCode + new Date(bjTime).Format('yyyyMMdd') + vueObject.periodNumber
    }
    Vue.set(vueObject, 'seconds', seconds)
  } else {
    Vue.set(vueObject, 'isOpenOrClosed', false) // 判断是关盘还是封盘，用于页面展示 ‘距离封盘时间’ ‘距离开盘时间’
    Vue.set(vueObject, 'isTrue', false)// 判断是否可以下注
    /** 说明该时间段不能投注 */
    if (lotteryId === 6 || lotteryId === 15 || lotteryId === 9 || lotteryId === 16 || lotteryId === 18) { // 北京赛车，北京快8，幸运28，广西快乐十分，北京快3
      getPeriods(lotteryId).then(res => {
        if (res.data.periodList[0]) {
          localStorage.setItem('period_' + lotteryId, res.data.periodList[0].periodCode)
          vueObject.periodNumber = (Number(res.data.periodList[0].periodCode) + periodNumber)// 第一期拿到，periodNumber 是距离今天的期数，这里不用减一
          window.store.state.betZone.currentPeriodNo = vueObject.periodNumber
        }
        // res.data.periodList[0] ? vueObject.periodNumber = (Number(res.data.periodList[0].periodCode) + periodNumber) : '' // 第一期拿到，periodNumber 是距离今天的期数，这里不用减一
      })
    } else {
      vueObject.periodNumber = '001'
      /** 完整期数拼接，用于投注时候传给后端 */
      let lotteryCode = lotteryId < 10 ? ('00' + lotteryId) : (lotteryId < 100 ? '0' + lotteryId : lotteryId)
      window.store.state.betZone.currentPeriodNo = lotteryCode + new Date(bjTime).Format('yyyyMMdd') + vueObject.periodNumber
    }

    let fristTime = new Date(today + ' ' + species.fristBettingStartTime).getTime()
    let seconds = Math.abs(bjTime - fristTime)
    Vue.set(vueObject, 'seconds', seconds)
  }
  getCommonInterval(lotteryId, vueObject, bjTime, beforeToday, afterToday, periodNumber, species)
}

/**
 *
 * @param {*} lotteryId         彩种ID
 * @param {*} vueObject         vue对象
 * @param {*} bjTime            北京时间戳
 * @param {*} beforeToday       昨天日期  yyyyMMdd
 * @param {*} afterToday        明天日期  yyyyMMdd
 * @param {*} periodNumber      今天日期的第几期 比如 期数是 652113 对应 今天期数第10期
 * @param {*} species           lotteryMap.lotteryBetRule 匹配彩种开盘和封盘规则
 */
function getCommonInterval (lotteryId, vueObject, bjTime, beforeToday, afterToday, periodNumber, species) {
  isCleanLotteryInterval(vueObject)
  fixServiceUseTime(vueObject)
  let start = new Date().getTime() // 定时器开始时间戳
  let begin = new Date().getTime() + vueObject.seconds // 倒计时加时间戳
  if (vueObject.$store.state.betZone.timer) {
    window.clearInterval(vueObject.$store.state.betZone.timer)
    vueObject.$store.state.betZone.timer = null
  }
  vueObject.$store.state.betZone.timer = window.setInterval(function () {
    Vue.set(vueObject, 'seconds', Math.max(0, begin - new Date().getTime()))
    Vue.set(vueObject, 'endTimeView', formatSeconds(vueObject.seconds, vueObject))

    /** 保存 上一秒和下一秒的时间差 */
    if (vueObject.seconds <= 0) {
      serviceCommonInterval(lotteryId, vueObject, bjTime, beforeToday, afterToday, periodNumber, species)
      Vue.set(vueObject, 'endTimeView', '00:00:00')
      begin = new Date().getTime() + vueObject.seconds + 10
    }
    let end = new Date().getTime()
    if (Math.abs(end - start) >= 10000) { // 如果上一秒和下一秒大于等于 10秒，则重新调整个逻辑
      vueObject.timer()
      return
    }
    start = new Date().getTime()
  }, 1000)
}

function serviceCommonInterval (lotteryId, vueObject, bjTime, beforeToday, afterToday, periodNumber, species) {
  /** 因为true 是距离封盘倒计时，因为这里时间小于等于 0， 则转成用封盘时间 */
  if (vueObject.isOpenOrClosed) {
    Vue.set(vueObject, 'isOpenOrClosed', false)
    Vue.set(vueObject, 'isTrue', false)
    /** 重置开奖次数 */
    window.store.state.award.awardTimes = 0
    periodNumber++
    /** 期数加一 */
    if (lotteryId === 6 || lotteryId === 15 || lotteryId === 9 || lotteryId === 16 || lotteryId === 18) { // 北京赛车，北京快8，幸运28，广西快乐十分，北京快3
      Vue.set(vueObject, 'periodNumber', Number(vueObject.periodNumber) + 1)
      Vue.set(window.store.state.betZone, 'currentPeriodNo', vueObject.periodNumber)// 改变投注的期数信息
    } else {
      /** 期数 小于10 的 是 001模式， 小于 100的，是 010 模式 */
      let temp = Number(vueObject.periodNumber) + 1
      let newNumber = temp < 10 ? ('00' + temp) : (temp < 100 ? '0' + temp : temp)
      Vue.set(vueObject, 'periodNumber', newNumber)
      /** 完整期数拼接，用于投注时候传给后端 */
      let lotteryCode = lotteryId < 10 ? ('00' + lotteryId) : (lotteryId < 100 ? '0' + lotteryId : lotteryId)
      Vue.set(window.store.state.betZone, 'currentPeriodNo', lotteryCode + new Date(bjTime).Format('yyyyMMdd') + vueObject.periodNumber)// 改变投注的期数信息
    }
    if (periodNumber > species.len) { // 表示已经到了今天的最后一期， 重新调用逻辑， 计算现在距离第二天早上开盘时间
      vueObject.timer()
      return
    }
    /** 时间标变成封盘倒计时 */
    Vue.set(vueObject, 'seconds', species.offTime * 1000)
  } else {
    Vue.set(vueObject, 'isOpenOrClosed', true)
    Vue.set(vueObject, 'isTrue', true)
    /** 时间标变成开盘倒计时 */
    Vue.set(vueObject, 'seconds', species.betTime * 1000)
  }
}

/**
 *
 * @param {*} lotteryId 北京赛车，北京快8，幸运28，广西快乐十分 ID  获取期数
 */
function getPeriods (lotteryId) {
  return window.store.dispatch('period.action', { lotteryId: lotteryId })
}
/** **********************************************  大部分传统菜 end ***************************************************************/

/** **********************************************  六合彩 start  *****************************************************************/
export function initLHC (lotteryId, beforeToday, bjTime, afterToday, vueObject, periodList) {
  if (periodList.length === 0) { // 表示查询不到六合彩信息，直接关盘
    Vue.set(vueObject, 'isOpenOrClosed', false)
    Vue.set(vueObject, 'isTrue', false)
    window.store.state.site.closedLottery = false
    return
  }
  let obj = periodList[0]
  let betDate = new Date(obj.betDate.replace(/-/g, '/') + ' 00:00:00').getTime() // 开始投注的日期 2017-09-29
  let betEndDate = new Date(obj.betEndDate.replace(/-/g, '/') + ' 00:00:00').getTime() // 结束投注的日期 2017-10-03
  let startTime = new Date(new Date(betDate).Format('yyyy/MM/dd') + ' ' + obj.bettingStartDate).getTime() // 开始投注的日期 2017-09-29 16:21:35
  let endTime = new Date(new Date(betEndDate).Format('yyyy/MM/dd') + ' ' + obj.bettingEndDate).getTime() // 结束投注的日期 2017-10-03 21:30:30
  let overTime = new Date(new Date(betEndDate).Format('yyyy/MM/dd') + ' ' + '22:00:00').getTime() // 投注时间结束后 有 30分钟的倒计时
  // 页面展示时间
  vueObject.bjTime = betDate
  let seconds = 0
  vueObject.periodNumber = obj.period // 期数
  if (startTime > bjTime) { // 表示还没有开盘
    seconds = Math.abs(bjTime - startTime)
    Vue.set(vueObject, 'isOpenOrClosed', false)
    Vue.set(vueObject, 'isTrue', false)
  } else if (bjTime >= startTime && bjTime <= endTime) { // 表示在投注期间
    seconds = Math.abs(bjTime - endTime)
    Vue.set(vueObject, 'isOpenOrClosed', true)
    Vue.set(vueObject, 'isTrue', true)
  } else if (bjTime > endTime && bjTime < overTime) { // 表示当前时间大于 投注结束， 小于 22:00:00
    seconds = Math.abs(bjTime - overTime)
    Vue.set(vueObject, 'isOpenOrClosed', false)
    Vue.set(vueObject, 'isTrue', false)
    // window.store.state.betZone.bettingState = 0 // 改成不可以投注
  }
  // 如果obj.open === false 表示被封盘
  // if (!obj.open) {
  //   Vue.set(vueObject, 'isOpenOrClosed', false)// 表示关盘状态
  //   Vue.set(vueObject, 'isTrue', false)// 表示不给投注
  // }

  Vue.set(vueObject, 'seconds', seconds)
  window.store.state.betZone.currentPeriodNo = obj.period
  lhcInterval(vueObject)
}

function lhcInterval (vueObject) {
  isCleanLotteryInterval(vueObject)
  fixServiceUseTime(vueObject)
  let start = new Date().getTime() // 定时器开始时间戳
  let begin = new Date().getTime() + vueObject.seconds // 倒计时加时间戳
  if (vueObject.$store.state.betZone.timer) {
    window.clearInterval(vueObject.$store.state.betZone.timer)
    vueObject.$store.state.betZone.timer = null
  }
  vueObject.$store.state.betZone.timer = window.setInterval(function () {
    Vue.set(vueObject, 'seconds', Math.max(0, begin - new Date().getTime()))
    Vue.set(vueObject, 'endTimeView', formatSeconds(vueObject.seconds, vueObject))
    if (vueObject.seconds <= 0) {
      /** 重置开奖次数 */
      window.store.state.award.awardTimes = 0
      vueObject.timer()
    }
    let end = new Date().getTime()
    if (Math.abs(end - start) >= 10000) { // 如果上一秒和下一秒大于等于 10秒，则重新调整个逻辑
      vueObject.timer()
      return
    }
    start = new Date().getTime()
  }, 1000)
}
/** **********************************************  六合彩 end    *****************************************************************/

export function convertToBeiJingTime (time) {
  var timezone = new Date(time).getTimezoneOffset()
  var timeZoneOffset = new Date(time).getTime() + (480 + timezone) * 60 * 1000
  return timeZoneOffset
}

export function getStatus (vueObject) {
  let lotteryId = window.store.state.site.lotteryId * 1
  // 是否即开彩系列
  if (lotteryId === 100 || lotteryId === 101) {
    let st = window.store.state.betZone.mmcBettingClosed[lotteryId] === true ? 0 : 1 // 是否已关闭下注
    Vue.set(window.store.state.betZone, 'bettingState', st)
    return
  }
  if (!vueObject) {
    return
  }
  let list = window.store.state.site.lotteryStatusList
  for (let i = 0; i < list.length; i++) {
    if (Number(lotteryId) === list[i].id) {
      if (!list[i].success) {
        Vue.set(window.store.state.site, 'closedLottery', false)
        Vue.set(window.store.state.betZone, 'bettingState', 0)
      } else {
        Vue.set(window.store.state.site, 'closedLottery', true)
        if (vueObject.isTrue) {
          Vue.set(window.store.state.betZone, 'bettingState', 1)
        } else {
          Vue.set(window.store.state.betZone, 'bettingState', 0)
        }
      }
    }
  }
}

// 判断终端是安卓还是ios
// export function getClientType () {
//   var u = navigator.userAgent
//   var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
//   var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
//   if (isAndroid) {
//     return true
//   }
//   if (isiOS) {
//     return false
//   }
// }
/** ****************************************************** 公共工具函数 end ********************************************************/
