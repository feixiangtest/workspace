import * as types from './type'

export const state = {
  initdPlatform: '', // 初始化选中的平台
  platformKey: '', // 选择的平台key值
  platformList: [], // 已经开放的第三方平台
  pageNo: 1, // 默认显示第一页
  pageSize: 10, // 默认展示10条
  platformDateType: [],
  bettingRecordList: [],
  currentRecordList: [],
  dateTime: [window.common.getBeforeDate(0), window.common.getNowDate()], // 查询时间
  totalRecord: 0,
  selectPlatform: ''// 选中的平台
}
export const mutations = {

  /** 已经开放的第三方平台 */
  [types.GETPLATFORMLIST_MUTATION] (state, res) {
    if (res.data && res.data.length) {
      state.initdPlatform = res.data[0]
      state.platformKey = res.data[0].platformCode.toLowerCase()
      state.platformList = res.data
    } else {
      state.platformList = []
    }
  },
  /** 选中的平台key值 */
  [types.SUBMITPLATFORM_MUTATION] (state, data) {
    state.platformKey = data
  },
  /** 提交页数 */
  [types.PAGENO_MUTATION] (state, data) {
    state.pageNo = data
  },
  /** 提交一页显示多少页 */
  [types.PAGESIZE_MUTATION] (state, data) {
    state.pageSize = data
  },
  /** 指定平台注单记录 */
  [types.GETBETTINGRECORD_MUTATION] (state, res) {
    if (res.data && res.data.info.content.length) {
      state.totalRecord = res.data.info.totalCount
      state.bettingRecordList = res.data.info.content
      let lastTotalLine = { awardResult: '总计', betAmount: res.data.info.summary.betAmounts, payOut: res.data.info.summary.payOuts } // 添加一条总计
      state.bettingRecordList.push(lastTotalLine)
    } else {
      state.bettingRecordList = []
      state.totalRecord = 0
    }
  },
  /** 往来记录 */
  [types.CURRENTRECORD_MUTATION] (state, res) {
    if (res.data) {
      state.totalRecord = res.data.totalCount
      state.currentRecordList = res.data.result
      if (res.otherData && res.data.result.length > 0) {
        let lastTotalLine = { createDateTimeStr: '总计', tradeLimit: res.otherData.tradelimit, existingLimit: res.otherData.existinglimit } // 添加一条总计
        state.currentRecordList.push(lastTotalLine)
      }
    } else {
      state.totalRecord = 0
      state.currentRecordList = []
    }
  },
  /** 往来记录 */
  [types.SWITCHDATETYPE] (state, res) {
    if (res.data) {
      state.dateTime = [res.data.startDate, res.data.startDate]
    } else {
      state.dateTime = [window.common.getBeforeDate(0), window.common.getNowDate()]
    }
  },
  /** 路由异动时，清除数据 */
  [types.RESETDATA_MUTATION] (state) {
    state.initdPlatform = ''
    state.platformKey = ''
    state.platformList = []
    state.pageNo = 1
    state.pageSize = 10
    state.platformDateType = []
    state.bettingRecordList = []
    state.currentRecordList = []
    state.totalRecord = 0
  }
}
