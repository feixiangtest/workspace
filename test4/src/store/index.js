import Vue from 'vue'
import Vuex from 'vuex'
import site from './site'
import home from './home'
import accountHistory from './accountHistory'
import award from './award'
import bettingRecord from './bettingRecord'
import bettingLimit from './bettingLimit'
import chips from './chips'
import betZone from './betZone'

Vue.use(Vuex)

export default new Vuex.Store({
    // 將整理好的 modules 放到 vuex 中組合
  modules: {
    site,
    home,
    accountHistory,
    award,
    bettingRecord,
    bettingLimit,
    chips,
    betZone
  },
    // 关闭嚴格模式，因投注时，会直接异动state
  strict: false
})
