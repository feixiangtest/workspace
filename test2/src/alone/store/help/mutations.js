import * as types from './type'

export const state = {
  menus: [], // 初始化的菜单数据，index.html有使用
  activeId: '', // 选中的问题文章id
  breadcrumb: [], // 头部面包屑内容
  searchResult: [], // 查询返回的内容
  searchData: ''// 查询字段
}
export const mutations = {
  /** 根据导航ID获取帮助中心文案 */
  [types.GETNAVIGATIONMENU] (state, res) {
    state.menus = res.data
  },
  /** 根据导航ID获取帮助中心文案 */
  [types.SEARCHARTICLE] (state, res) {
    state.searchResult = res.data || []
  }
}
