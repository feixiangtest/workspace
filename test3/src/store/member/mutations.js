import * as types from './type'
import * as statusCode from '../../utils/status_const'

export const state = {
  chooseMember: null, // 查询条件选中的会员
  jumpUrl: '', // 记录会员选择跳转过来的url，用于返回
  mnyCodeQuantitySet: null, // 存款设定
  memberMoney: 0, // 会员金额
  memberEdit: {}, // 会员修改信息
  memberAdd: {},
  xtoken: '' // token
}

export const mutations = {
  [types.MEMBERLIST_MUTATION] (state, res) {
    if (res.code === statusCode.statusConst.SUCCESS) { // 返回数据成功
      try {

      } catch (error) {
      }
    }
  },
  [types.MEMBER_EDIT_MUTATION] (state, res) {
    if (res.data) {
      state.memberEdit = res.data
      state.memberEdit.rebateList.forEach((val) => {
        val.maxRebate = Number(val.maxRebate).toFixed(2)
      })
    }
  },
  [types.MEMBER_ADD_MUTATION] (state, res) {
    if (res.data) {
      // 新增 Limit 复用 rebate.js
      // res.data.upRebates.forEach(function (val, index) {
      //   val.maxRebateLimit = val.maxRebate
      //   val.minRebateLimit = val.minRebate
      // })
      state.memberAdd = res.data
    }
  },
  [types.QUERYACCOUNT_MUTATION] (state, res) {
    if (res.code === statusCode.statusConst.SUCCESS) { // 返回数据成功
      try {
        // 存款设定
        state.mnyCodeQuantitySet = res.data.mnyCodeQuantitySet
        state.memberMoney = res.data.memberMoney
        state.token = res.token
      } catch (error) {
      }
    }
  }
}
