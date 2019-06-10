import * as types from './type'
export const state = {
  sectionListArr: [],
  promotionListArr: []
}

export const mutations = {
  /** 上传之后的优惠数据 */
  [types.GETPROMOTIONLIST_MUTATION] (state, res) {
    // 判断是否有数据
    if (res.data && res.data.wiArticle) {
      // 所有优惠活动数据
      let _wiArticle = res.data.wiArticle
      for (let i = 0; i < _wiArticle.length; i++) {
        // 当前优惠栏目数据
        let _section = _wiArticle[i].section
        // 当前优惠活动内容
        let _photoDocList = _wiArticle[i].photoDocList
        for (let j = 0; j < _photoDocList.length; j++) {
          // 合并栏目key和栏目名称到每个优惠活动中
          state.promotionListArr.push({ ..._photoDocList[j], ..._section })
        }
      }
    } else {
      // 重置预览优惠活动数据
      state.promotionListArr = []
      // 重置预览优惠活动数据
      state.promotionListObject = {}
    }
  },
  /** 获取所有栏目 */
  [types.SECTIONLIST_MUTATION] (state, res) {
    if (res && res.data.sectionList && res.data.sectionList.length) {
      state.sectionListArr = res.data.sectionList
    } else {
      state.sectionListArr = []
    }
  },
  /** 清空数据 */
  [types.CLEARDATA_MUTATION] (state) {
    state.sectionListArr = []
    state.promotionListArr = []
    state.promotionListObject = {}
  }
}
