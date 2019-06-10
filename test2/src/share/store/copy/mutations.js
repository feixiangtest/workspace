import * as types from './type'
export const state = {
  showLeftBar: true, // 左侧栏显示
  showRightBar: true,
  showBottomBar: true,
  showModal: false, // 蒙版
  showLoginNotice: false,
  showLoginLogo: false// 登录并同意游戏协议之后出现的登录logo
}
export const mutations = {
  /** 关闭浮窗 */
  [types.CLOSELEFTBAR] (state) {
    state.showLeftBar = false
  },
  [types.CLOSERIGHTBAR] (state) {
    state.showRightBar = false
  },
  [types.CLOSEBOTTOMTBAR] (state) {
    state.showBottomBar = false
  },
  [types.OPENMODAL] (state) {
    document.documentElement.style.overflow = 'hidden'
    state.showModal = true
  },
  [types.CLOSEMODAL] (state) {
    document.documentElement.style.overflow = 'auto'
    state.showModal = false
  },
  [types.OPENLOGINNOTICE] (state) {
    state.showLoginNotice = true
    document.documentElement.style.overflow = 'hidden'
    state.showModal = true
  },
  [types.CLOSELOGINNOTICE] (state) {
    state.showLoginNotice = false
    document.documentElement.style.overflow = 'auto'
    state.showModal = false
  },
  [types.OPENLOGINLOGO] (state) {
    state.showLoginLogo = true
  },
  [types.CLOSELOGINLOGO] (state) {
    state.showLoginLogo = false
  }

}
