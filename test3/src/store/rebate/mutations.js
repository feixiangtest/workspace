import * as types from './type'
import * as statusCode from '../../utils/status_const'
export const state = {
  startDate: '', // 时间选择-开始默认值
  endDate: '', // 时间选择-结束默认值
  minDate: '', // 时间选择-最小默认值
  maxDate: '', // 时间选择-最大默认值
  rebateResultList: [], // 查询结果数据存储
  deTailItemIndex: '' // 详细数据索引
}
export const mutations = {

  // 返水查询 初始化页
  [types.QUERYREBATELINIT_MUTATION] (state, res) {
    if (res.code === statusCode.statusConst.SUCCESS) {
      state.startDate = res.data.startTime
      state.endDate = res.data.endTime
      state.maxDate = res.data.endTime
      state.minDate = res.data.minTime
      try {
        let rebateParam = JSON.parse(sessionStorage.getItem('rebateParam'))
        console.log(rebateParam)
        state.startDate = rebateParam.startTime
        state.endDate = rebateParam.endTime
      } catch (err) {
        console.log(err, 'err')
      }
    }
  },
  // 根据时间获取返水事件
  [types.QUERYREBATEBYTIME_MUTATION] (state, res) {

  },
  // 返水查询搜索及详情
  [types.QUERYREBATE_MUTATION] (state, res) {
    if (res.code === statusCode.statusConst.SUCCESS) {
      console.log(res)
      state.rebateResultList = res.data
    }
  }
}
