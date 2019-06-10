import * as types from './type'
import * as statusCode from '../../utils/status_const'

export const state = {
  loginLogo: {},    // 登录logo
  topLogo: {},    // 顶部logo
  popupAds: {}, // 弹出广告 轮播图
  promotions: {},  // 优惠活动
  guideMap: {},   // 首页引导图
  isPreview: 0 // 是否显示预览，默认为0
}

export const mutations = {
  /**
 * 获取浏览数据
 * @param {*} state
 * @param {*} res
 */
  [types.GET_PREVIEW_MUTATION] (state, res) {
    if (res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
      // 设置预览为显示
      switch (Number(res.data.isPreview)) {
        case 4:  // 手机端登陆界面LOGO
          state.loginLogo = res.data
          console.log('手机端登陆界面LOGO', state.loginLogo)
          state.isPreview = 4
          break
        case 1:  // 手机版优惠活动
          if (res.data.d && res.data.d === 'preferential') {
            state.isPreview = 5
            state.promotions = res.data
            window.router.push('/wap/promotion')
            console.log('手机版优惠活动', state.promotions)
          } else { // 弹出广告 + 轮播图
            state.isPreview = 1
            state.popupAds = res.data
            console.log('弹出广告 + 轮播图', state.popupAds)
          }
          break
        case 2:  // 手机首页引导图
          state.guideMap = res.data
          state.isPreview = 2
          console.log('手机首页引导图', state.guideMap)
          break
        case 3:  // 手机端顶部LOGO
          state.topLogo = res.data // 顶部logo
          state.isPreview = 3
          console.log('手机端顶部LOGO', state.topLogo)
          break
        default:
          state.isPreview = 0
      }
    }
  }
}
