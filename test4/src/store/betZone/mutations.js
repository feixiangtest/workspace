import * as types from './type'

export const state = {
  bettList: [], // 赔率
  specialOdds: '', // 特殊赔率，组三， 组六
  doBetList: [], // 下注选中的球对象
  periodList: [], // 赔率列表，从当前时间的那一期到当天最后一期
  ffcPeriodList: {}, // ffc期数信息列表
  flag: true, // 下注详情 合计 这里需要一个标志进行触发computed
  index: '', // 获取选中的下注的列，单独改变该注单的金额
  prelist: [], // 时时彩前三，前六
  midlist: [], // 时时彩中三，中六
  afterlist: [], // 时时彩后三，后六
  postData: [], // 秒秒彩下注情况（次数。是否开奖即停）
  currentPeriodNo: '', // 当前期数
  bettingState: 1,  // 是否可投注，默认为可以，判断该彩票该时间段是否可以下注
  selectedRule: null,   // 十一选五 连码，直选选中的玩法
  selectedList: [],  // 十一选五 连码保存球号的数组
  zhixuan_first_select: [], // 十一选五 直选保存第一球球号的数组
  zhixuan_second_select: [], // 十一选五 直选保存第二球球号的数组
  zhixuan_three_select: [], // 十一选五 直选保存第三球球号的数组
  bet_disabled: true, // 用于十一选五连码，当下注详情删除记录时判断球是否可以下注
  isDisabled: true, // 十一选五连码，快乐十分，用于判断球是否disabled,用于footer重置按钮
  pcddSelect: {}, // PCDD 特码选择
  tema_array: [], // PCDD 特码三个球放在该数组中
  currentZodiac: '', // 当年生肖
  lotteryTimes: [], // 彩票倒计时
  fristPeriod: '', // 第一期期数
  lastPeriod: '', // 最后一期
  timer: null, // 彩票倒计时定时器对象
  lotteryStates: {}, // 当前彩种的状态
  shakeStatus: false, // 摇一摇状态
  klsf_lianma_select: false, // 快乐十分连码是否允许再次选中

  sysDateTime: 0, // 系统当前时间
  navigateTimer: null, // 右侧菜单栏用到的倒计时
  isPause: false, // 秒秒彩连续开奖暂停状态
  awardTimes: 0, // 秒秒彩连续开奖当前开奖次数
  isSimulate: false, // 是否为模拟开奖
  statusTimer: null, // 彩票状态的倒计时， 1分钟取一次
  mmcBetResult: {}, // 秒秒彩开奖信息
  mmcChipMoney: 0, // 秒秒彩机选默认筹码金额
  mmcBettingClosed: { // 即开彩系列 投注是否关闭
    100: false,
    101: false
  },
  kl8LuziShow: false, // 快乐8 路子长龙的显示和隐藏
  klsfLuziShow: false, // 快乐十分 路子长龙的显示和隐藏
  ksLuziShow: false, // 快3 路子长龙的显示和隐藏
  lhcLuziShow: false, // 六合彩 路子长龙的显示和隐藏
  pcddLuziShow: false, // pc蛋蛋 路子长龙的显示和隐藏
  pk10LuziShow: false, // pk10 路子长龙的显示和隐藏
  sscLuziShow: false, // 时时彩 路子长龙的显示和隐藏
  syxwLuziShow: false, // 十一选5 路子长龙的显示和隐藏
  lianMaRule: null, // 连码选择类型
  todaySimulateResult: [], // 秒秒彩种，当前用户今日模拟开奖数据
  serverTime: { // 服务器时间对象
    sTime: 0, // 接口返回的服务端时间戳（不能用于实时的服务器时间）
    cTime: 0, // 接口返回时的客户端时间戳
    get: function () { // 获取实时的服务器时间戳
      if (this.sTime === 0 || this.cTime === 0) {
        return false
      }
      return this.sTime + (+new Date() - this.cTime)
    },
    set: function (sTime, cTime) { // 设置sTime、cTime
      if (!sTime || !cTime) {
        return
      }
      if (!this.sTime || !this.cTime) { // 没有赋值过
        this.sTime = sTime
        this.cTime = cTime
      } else { // 已经赋值过，取他们之间时差最小的（误差最小，即：服务器响应慢导致的时间误差）
        // 如果条件成立，说明本次取服务器时间响应比较快，误差比较小；条件不成立，说明之前的误差比较小，沿用之前
        if (sTime - this.sTime > cTime - this.cTime) {
          this.sTime = sTime
          this.cTime = cTime
        }
      }
    }
  }
}

export const mutations = {
    /**
     *将后台获取到的展示彩票赔率放入到state, vito
     * @param {*} state
     * @param {*} data
     */
  [types.BET_ODDS_DETAIL] (state, res) {
    // 版本控制代码
    if (res.list !== null && res.list !== undefined) {
      // 因为赔率玩法需要各个彩票单独存储版本号，所以增加此字符
      let lotteryStr = '_' + res.data.lotteryId + '_' + res.data.rtype
      // 每次都将最新的版本号信息存入localStorage
      localStorage.setItem('showBet' + lotteryStr, JSON.stringify(res.list))

      /** 版本号数据处理 by karl */
      state = window.lotteryMain.lotteryVersion(state, res)

      // localStorage.setItem('showBetAll', JSON.stringify(res.list))
      // /** 版本号数据处理 by karl */
      // state = window.lotteryMain.lotteryVersionAll(state, res)
    }
  },
  /**
   * 下注成功
   * @param {*} state
   * @param {*} res
   */
  [types.MMC_BETTING_MUTATION] (state, res) {
  },

  [types.SIMULATE_MUTATION] (state, res) {
  },

  // 获取彩票状态
  [types.GET_LOTTERY_STATES_MUTATION] (state, res) {
    if (res && res.data) {
      if (res.data.curr) { // 获取服务器时间戳
        // 加上50ms降低误差
        state.serverTime.set(res.data.curr * 1 + 50, +new Date())
      }
      if (res.data.dateTime) {
        state.sysDateTime = res.data.dateTime // 服务器时间
      }
    }
    if (res.data.times !== null && res.data.times.length > 0) {
      state.lotteryStates.success = res.data.times[0].success
      state.lotteryStates.endtimes = res.data.times[0].endtimes
    }
  },

  // 将期号存入state中
  [types.BETTING_GET_PERIODNO] (state, res) {
    state.currentPeriodNo = res
  },
  // 设置是否可投注状态
  [types.BETTING_GET_BETTING_STATES] (state, res) {
    state.bettingState = res
  },
  // 设置赔率列表
  [types.GETPERIOD_LIST_MUTATION] (state, periods) {
    state.periodList = periods
    // if (periods.length > 0) {
    //   localStorage.setItem('periodList_' + lotteryMap.LotterySrc[periods[0].lotteryId], JSON.stringify(periods))
    // }
    // 等后端版本号校验完成以后需要添加logcalstorage保存periodList
  },
  // 自营彩种期数信息
  [types.FFC_PERIOD_LIST_MUTATION] (state, res) {
    state.ffcPeriodList['periods_' + res.type] = res.result
    localStorage.setItem('periods_' + res.type, JSON.stringify(res.result))
  },
  // 校验登录状态
  [types.CHECK_LOGIN_TOKEN_MUTATION] (state, res) {
  },

  // 将当年生肖存入state和localStore中
  [types.CURRENT_ZODIAC_MUTATION] (state, res) {
    state.currentZodiac = res.data.animal
    localStorage.setItem('currentZodiac', JSON.stringify(res.data.animal))
  },
  // 获取彩票倒计时
  // [types.GET_LOTTERY_TIMES_MUTATION] (state, res) {
  //   state.lotteryTimes = res.data.times
  // },
  // 获取期数（只获取第一期和最后一起）
  // [types.PERIOD_MUTATION] (state, res) {
  //   if (res.data.periodList.length > 0) {
  //     state.fristPeriod = res.data.periodList[0].periodCode
  //     state.lastPeriod = res.data.periodList[1].periodCode
  //   }
  // },
  // 获取秒秒彩游戏状态
  [types.GET_GAME_STATUS_MUTATION] (state, res) {
  },
  // 秒秒彩种，获取当前用户今日模拟开奖数据
  [types.TODAY_SIMULATE_RESULT_MUTATION] (state, res) {
    let rst = (res.data && res.data.awardList) || []
    if (!rst || !rst.length) {
      rst = []
    }
    state.todaySimulateResult = rst
  }
}
