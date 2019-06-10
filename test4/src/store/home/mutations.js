import * as types from './type'

export const state = {
  historyListLen: 0, // 返回开奖结果长度，如果为0则表示不能滑动继续加载
  lotteryList: '', // 彩票列表
  balance: '', // 用户金额
  bettingMoneyToday: {}, // 今日输赢
  userChips: [], // 用户筹码
  userInfo: {},
  MuseUI: {
    open: false, // 左側
    openR: false, // 右側
    dockedLeft: true,
    dockedRight: true,
    openRightCount: 0 // 打开右侧导航栏的总次数
  }, // 新組件 保存数据
  isLogin: true, // 用于存储是否登录状态，默认是登录的,false：未登录，true：已登录
  memberUrl: '', // 用于如果因为兼容性问题导致无法关闭窗口直接跳转的域}
  isSessionExpired: false, // 用户session是否过期
  commonImgUrl: '/static/lt_h5_v3/local/img', // 统一的公共图片路径，如果需要更改版本号只需要修改这里即可
  commonMusicUrl: '/static/lt_h5_v3/local/music' // 统一的公共音频路径，如果需要更改版本号只需要修改这里即可
}
export const mutations = {
    /**
     *将后台获取到的展示彩票放入到state, localStorage中 vito
     * @param {*} state
     * @param {*} data
     */
  [types.HOME_MUTATION_INITDETAIL] (state, res) {
    // 每次都将最新的版本号信息存入localStorage
    localStorage.setItem('getInitData', JSON.stringify(res.list))
    state.memberUrl = res.data.domain
    if (state.memberUrl) {
      localStorage.setItem('memberUrl', state.memberUrl) // 设置到本地缓存，防止提示超时后不点击确定而是刷新页面，这个时候memberURL就需要通过本地缓存获取
    }

    // 登录状态下
    if (res.data.islogin === '1' || res.data.islogin === null || res.data.islogin === undefined) {
      state.isLogin = true
      /** 版本号数据处理 by karl */
      state = window.lotteryMain.commonVersion(state, res, 'homeVersionKey')

      state.userInfo = res.data.userInfo

      let prefix = state.userInfo.prefix
      // 截取账号前缀
      if (prefix) {
        state.userInfo.account = state.userInfo.account.substring(prefix, state.userInfo.account.length)
      }
      // 屏蔽部分彩票
      // state.lotteryList = hideLottery(state.lotteryList)
    } else { // 未登录处理
      state.isLogin = false
      if (res.list.lotteryList !== null && res.list.lotteryList !== undefined) {
        if (res.list.lotteryList.status === '1') { // 状态值为1时直接查询localStorage内的参数
          state.lotteryList = JSON.parse(localStorage.getItem('lotteryList'))
          state.customizationList = []
          state.userChips = JSON.parse(localStorage.getItem('userChips'))
        } else { // 代表后台重新发送了数据，从res中取值并存储到localStorage中
          localStorage.setItem('lotteryList', JSON.stringify(res.data.lotteryList))
          localStorage.setItem('userChips', JSON.stringify(res.data.userChips))
          state.userChips = res.data.userChips
          state.lotteryList = res.data.lotteryList
          state.customizationList = []
        }
      }
    }
  },

  // 将当日最新彩票输赢状况放入state
  [types.LOSE_AND_WIN_INITDETAIL] (state, res) {
    state.bettingMoneyToday = res.data.bettingMoneyToday
  },

  // 将最新余额放入state
  [types.GET_BALANCE_INITDETAIL] (state, res) {
    state.balance = res.data.balance
  }

}

/**
 * API-254 暂时前端屏蔽：五分快乐十分、一/三/五分六合彩、五分时时彩、五分快3 add by allen
 * @param {后端传来的彩票} lotteryList
 */
// function hideLottery (lotteryList) {
//   for (let i in lotteryList) {
//     for (let j = 0; j < lotteryList[i].lotteryType.length; j++) {
//       if ([43, 49, 52, 64, 65, 66].indexOf(lotteryList[i].lotteryType[j].lotteryId) >= 0) {
//         lotteryList[i].lotteryType.splice(j, 1)
//         j-- // 因彩票数组整体向前移动一位，所以需要向前移动一位开始循环
//       }
//     }
//   }
//   return lotteryList
// }
