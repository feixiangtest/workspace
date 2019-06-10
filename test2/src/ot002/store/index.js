import Vue from 'vue'
import Vuex from 'vuex'

import copy from '@s/store/copy'
import user from '@s/store/user'
import promotion from '@s/store/promotion'
import thirdPartyJump from '@s/store/thirdPartyJump'

// ot00x + core 可以公用 shareApi 接口
import shareApi from '@s/store/shareApi/index.js'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    //  home,
    copy,
    user,
    shareApi,
    promotion,
    thirdPartyJump
  }
})
