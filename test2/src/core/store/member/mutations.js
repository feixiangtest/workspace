import * as types from './type'

export const state = {
  l2: '', // url 第2层 值
  menuTab: [], // 右侧 tab 数据
  activeTab: '', // 右侧 tab 数据 选中
  breadcrumb: ['', ''], // 右侧 面包
  efficacbetList: [], // 有效投注额表格
  account: '',
  msgCount: 0// 显示的消息数量
}
export const mutations = {

  /** 首页信息 */
  [types.INITDATA_DETAIL] (state, res) {
    if (res.data && res.data.account) {
      state.account = res.data.account
    }
    // 文案
    if (res.data && res.data.articleList) {
      state.articleList = res.data.articleList
    }
  },
  /** 有效投注额表格 */
  [types.GETEFFICACBETTING_MUTATION] (state, res) {
    if (res.data) {
      state.efficacbetList = res.data
    }
  },
  // 未读消息总条数 数据
  [types.H5MSGCOUNT_MUTATION] (state, res) {
    state.msgCount = res.data
  }
}
