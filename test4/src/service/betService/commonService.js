import * as lotteryMap from '../../config/lotteryMap'
import * as lotteryDetail from '../../config/lotteryDetail'
/**
 *
 * @param {*判断是否在登录状况} isLogin
 */
export function isCanBet (isLogin, doBetList, betEndTime) {
  console.info(doBetList.length)
  if (doBetList.length === 0) {
    window.layer.msgWarn('请先投注!')
    return false
  }
  if (!isLogin) { // TODO登录状态
    window.layer.msgWarn('请先进行登录')
        // window.close()
    return false
  }
  if (betEndTime <= 0) { // TODO判断是否能投注
    window.layer.msgWarn('当前期数投注已截止，请进行下期投注!')
          // window.location.reload()
    return false
  }
  return true
}
// 计算连码组合
export function combination (selectNumList, selLen) {
  let r = [];
  (function f (t, a, n) {
    if (n === 0) return r.push(t)
    for (let i = 0, l = a.length; i <= l - n; i++) {
      f(t.concat(a[i].project), a.slice(i + 1), n - 1)
    }
  })([], selectNumList, selLen)
  return r
}
/** 用于根据lotteryId获取到彩票的名称 */
export function lotteryName (lotteryId) {
  let lotteryCode = lotteryMap.LotterySrc[lotteryId]
  let lotteryName = lotteryDetail.playType[lotteryCode].name
  return lotteryName
}
