import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import cash from './cash' // 现金模块
import rebate from './rebate' // 报表
import queryCashStream from './queryCashStream' // 现金流查询
import reportForms from './reportForms' // 返水
import user from './user' // 用户
import agent from './agent' // 代理
import childAccount from './childAccount' // 子账号
import member from './member' // 会员模块
import announcement from './announcement' // 公告

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home,
    rebate,
    queryCashStream,
    reportForms,
    user,
    agent,
    childAccount,
    cash,
    member,
    announcement
  }
})
