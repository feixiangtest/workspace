import Vue from 'vue'
import Vuex from 'vuex'
import copy from '@s/store/copy'
import user from '@s/store/user'
import live from '@s/store/live'
import promotion from '@s/store/promotion'
// ot00x + core 可以公用 shareApi 接口
import shareApi from '@s/store/shareApi/index.js'
import thirdPartyJump from '@s/store/thirdPartyJump'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    copy,
    user,
    live,
    promotion,
    thirdPartyJump,
    shareApi
  }
})
