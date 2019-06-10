import * as types from './type'
import * as statusCode from '../../utils/status_const'
export const state = {
  startDate: '', // 时间选择-开始默认值
  endDate: '', // 时间选择-结束默认值
  maxDate: '', // 时间选择-最大默认值
  minDate: '', // 时间选择-最小默认值
  accountType: [{ // 账号类型
    flex: 1,
    values: ['会员', '代理'],
    className: 'slot1',
    textAlign: 'center'
  }],
  picTitle: '类型', // 账号类型面板标题
  rate: 6, // 类型选择：6=会员，5=代理
  valDate: '会员', // 账号类型存储
  cashResultList: [], // 查询现金流结果
  routeQuery: {},
  tradeTypes: [], // 查询类别条件
  checkedAllKey: [] // 当前查询类别选中了所有的key
}
export const mutations = {

  // 现金流查询 初始化页
  [types.QUERYCASHSTREAMINIT_MUTATION] (state, res) {
    if (res.code === statusCode.statusConst.SUCCESS) {
      // 如果为空时才从后台拿默认值，否则获取路由上获取的参数
      if (state.startDate === '') {
        state.startDate = res.data.startDate
      }
      if (state.endDate === '') {
        state.startDate = res.data.endDate
      }
      state.endDate = res.data.endDate
      state.maxDate = res.data.maxDate
      state.minDate = res.data.minDate
    }
  },
  // 根据时间获取现金流事件
  // [types.QUERYREBATEBYTIME_MUTATION] (state, res) {

  // },
  // 现金流查询搜索及详情
  [types.QUERYCASHSTREAMLIST_MUTATION] (state, res) {
    if (res.code === statusCode.statusConst.SUCCESS) {
      state.cashResultList = res.data
    }
  }
}
