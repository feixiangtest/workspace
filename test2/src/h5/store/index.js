import Vue from 'vue'
import Vuex from 'vuex'
/**
 *  1 借用 PC store
 *  注意不要改到了pc的逻辑， 要互相兼容
 */
import copy from '@s/store/copy'
import user from '@s/store/user'
import promotion from '@s/store/promotion'
import thirdPartyJump from '@s/store/thirdPartyJump'
import shareApi from '@s/store/shareApi/index.js'
/**
 *  2 h5 单独store
 */
import transactionRecord from '@/store/transactionRecord'
import h5Home from '@/store/h5Home'
/**
 *  3. 会员中心 store
 *  注意不要改到了pc的逻辑， 要互相兼容
 */
import bankTransaction from '@m/store/bankTransaction'
import payment from '@m/store/payment'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    h5Home,
    copy,
    user,
    shareApi,
    promotion,
    thirdPartyJump,
    bankTransaction,
    transactionRecord,
    payment
  }
})
