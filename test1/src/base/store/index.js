import Vue from 'vue'
import Vuex from 'vuex'
import site from './site'
import home from './home'
import payment from './payment'
import reg from './reg'
import transactionRecord from './transactionRecord'
import bindBankcard from './bindBankcard'
import message from './message'
import preView from './preView'
import memberCenter from './memberCenter'
import teamManage from './teamManage'
Vue.use(Vuex)

export default new Vuex.Store({
    // 將整理好的 modules 放到 vuex 中組合
  modules: {
    site,
    home,
    reg,
    payment,
    transactionRecord,
    bindBankcard,
    message,
    preView,
    teamManage,
    memberCenter
  },
    // 关闭嚴格模式，因投注时，会直接异动state
  strict: false
})
