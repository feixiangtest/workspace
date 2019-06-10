import Vue from 'vue'
import Vuex from 'vuex'
import help from './help'
import home from './home'
import user from '@s/store/user'
import shareApi from '@s/store/shareApi/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  // 將整理好的 modules 放到 vuex 中組合
  modules: {
    help,
    home,
    user,
    shareApi
  },
  // 关闭嚴格模式，因投注时，会直接异动state
  strict: false
})
