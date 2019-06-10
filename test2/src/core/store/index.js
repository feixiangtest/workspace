import Vue from 'vue'
import Vuex from 'vuex'
import member from './member'
// 会员相关的 可以公用 接口
import shareApi from '@s/store/shareApi/index.js'
import user from '@s/store/user/index.js'
import thirdPartyJump from '@s/store/thirdPartyJump'
import tradeRecord from './tradeRecord'
import bankTransaction from './bankTransaction'
import payment from './payment'

Vue.use(Vuex)

export default new Vuex.Store({
  // 將整理好的 modules 放到 vuex 中組合
  modules: {
    member, shareApi, tradeRecord, bankTransaction, payment, user, thirdPartyJump
  },
  // 关闭嚴格模式，因投注时，会直接异动state
  strict: false
})
