import * as types from './type'
import moment from 'moment'

export const state = {
  historyList: [],
  allBetting: 0,
  alltotalResult: 0,
  detailReportList: [],
  totalList: []
}

export const mutations = {
  // 处理近七天的投注金额和盈亏
  [types.ACCOUNT_HISTORY_INITDETAIL] (state, res) {
    state.historyList = res.data.historyList

    // 计算总金额和总亏盈
    state.allBetting = 0
    state.alltotalResult = 0
    for (var i = 0; i < state.historyList.length; i++) {
      // 转换时间
      state.historyList[i]['dateTime'] = state.historyList[i].date
      state.historyList[i].date = moment(state.historyList[i].date).format('MM-DD')
      // 时间转换为星期
      var num = state.historyList[i].week
      switch (num - 1) {
        case 1: state.historyList[i].week = '星期一'; break
        case 2: state.historyList[i].week = '星期二'; break
        case 3: state.historyList[i].week = '星期三'; break
        case 4: state.historyList[i].week = '星期四'; break
        case 5: state.historyList[i].week = '星期五'; break
        case 6: state.historyList[i].week = '星期六'; break
        case 0: state.historyList[i].week = '星期天'; break
      }
      // 计算总条数和总页数
      state.allBetting += Number(state.historyList[i].totalBettingMoney)
      state.alltotalResult += Number(state.historyList[i].totalResultMoney)
    }
  },

  // 处理点击指定查询某一天的数据
  [types.BETTIONG_RECORDBYDATE_INITDETAIL] (state, res) {
    state.detailReportList = res.data
    state.totalList = res.data.total
    for (var i = 0; i < state.detailReportList.historyList.length; i++) {
      // 如果1分彩上千位，截取最后四位期数
      if (state.detailReportList.historyList[i].period.length === 15) {
        state.detailReportList.historyList[i].period = state.detailReportList.historyList[i].period.substr(state.detailReportList.historyList[i].period.length - 4, state.detailReportList.historyList[i].period.length)
      } else {
        state.detailReportList.historyList[i].period = state.detailReportList.historyList[i].period.substr(state.detailReportList.historyList[i].period.length - 3, state.detailReportList.historyList[i].period.length)
      }
      // 处理时间
      state.detailReportList.historyList[i]['bettingDateStr'] = res.data.historyList[i].bettingDate
      state.detailReportList.historyList[i]['bettingTime'] = moment(res.data.historyList[i].bettingDate).format('HH:mm:ss')
      state.detailReportList.historyList[i].bettingDate = moment(res.data.historyList[i].bettingDate).format('MM-DD')
    }
  }
}
