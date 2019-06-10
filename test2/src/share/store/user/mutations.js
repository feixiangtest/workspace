import * as types from './type'
import Vue from 'vue'
import * as cookieUtil from '@s/utils/cookieUtil'
export const state = {
  Intr: null, // 是否非编辑
  isLogin: false,
  type: '', // 玩家类型
  popUpMessage: '', // 会员登入弹窗消息
  popUpMessageList: [],
  showPopUpMessage: false,
  userInfo: {
    totalmoney: '',
    money: '',
    account: '',
    apiMoneyMap: {},
    msgCount: '',
    onlineservice: {} // 在线客服对象
  },
  // h5 ---------------------------------------------
  // warn 设定
  showCheck: true, // 显示 协议提示框
  errMsg: {
    account: {
      status: '', // 警告'warn' 错误 'err' 正确 'complete'
      warn: '账号为字母开头，6-12位的字母与数字组合！',
      err: ''
    },
    password: {
      status: '', // 警告'warn' 错误 'err' 正确 'complete'
      warn: '密码为6-12位字母与数字的组合！',
      err: ''
    },
    password1: {
      status: '',
      warn: '',
      err: ''
    },
    realName: {
      status: 'warn',
      warn: '必须与您的银行账户名称相同，否则不能出款！'
    },
    phone: {
      status: 'warn',
      warn: '取回登入密码的唯一途径，请务必真实！'
    },
    drawMoneyPwd: {
      status: 'warn',
      warn: '取款时要用到的密码，非常重要，请务必牢记！'
    },
    englishname: {
      status: '',
      warn: ''
    },
    country: {
      status: '',
      warn: ''
    },
    birthday: {
      status: '',
      warn: ''
    },
    qq: {
      status: '',
      warn: ''
    },
    nickname: {
      status: '',
      warn: ''
    },
    idPassportNoType: {
      status: '',
      warn: ''
    },
    zhuceYm: {
      status: '',
      warn: ''
    },
    wechat: {
      status: '',
      warn: ''
    },
    parentName: {
      status: '',
      warn: '',
      txt: ''
    },
    idPassportNo: {
      status: '',
      warn: '',
      txt: ''
    },
    email: {
      status: '',
      warn: '',
      txt: ''
    },
    errName: 'reg'
  },
  memberSetList: null, // h5 reg
  user1: { // 默认用户 数据 提交数据
    parentName: '',
    password: '',
    password1: '',
    account: '',
    drawMoneyPwd: '',
    realName: '',
    nickname: '',
    englishname: '',
    country: '',
    zhuceYm: '',
    phone: '',
    wechat: '',
    qq: '',
    email: '',
    pact: true,
    idPassportNoType: 0, // 证件号码 input 默认值
    idPassportNo: '',
    birthday: ''
  },
  regInfo: {},
  regStep: false, // 注册是否分步
  step01: [false, false],
  // h5 ---------------------------------------------
  totalDataform: {
    money: '',
    totalMoney: ''
  },
  thirdPlatformList: null,
  refreshText: '刷新余额',
  timer: 30,
  timesStatus: false // 是否显示倒时器
}

export const mutations = {
  [types.LOGIN] (state, res) {
    localStorage.userInfo = JSON.stringify(res.data)
    state.userInfo = { 'account': res.data.account, 'money': res.data.money, 'realName': res.data.realName }
    state.isLogin = true
    state.msgCount = res.data.msgCount
    localStorage.setItem('TRANSFER_STATUS', res.data.TRANSFER_STATUS)
    // 共享登录状态，1 为已登录，其它为未登录
    window.common.loginStatus = '1'
    try {
      if (localStorage.queryIndex) {
        let a = JSON.parse(localStorage.queryIndex)
        a.data.account = res.data
        localStorage.queryIndex = JSON.stringify(a)
      } else {
        let b = { data: {} }
        b.data.account = res.data
        localStorage.queryIndex = JSON.stringify(b)
      }
    } catch (error) {
      console.log(error)
    }
    // 登录的时候将第三方平台的数据存储起来
    if (res.data.API_FROM) {
      // 将第三方平台金额设置为0，存储在本地
      delete res.data.API_FROM.luoma
      let thirtyPlatformList = JSON.parse(JSON.stringify(res.data.API_FROM))
      for (let k in thirtyPlatformList) {
        thirtyPlatformList[k] = 0
      }
      localStorage.setItem('thirtyPlatformList', JSON.stringify(thirtyPlatformList))
      state.userInfo.apiMoneyMap = thirtyPlatformList
    }
  },
  [types.LOGINOUT] (state, res) {
    localStorage.showPopUpMessage = ''
    state.showPopUpMessage = false
    state.isLogin = false
    state.userInfo = {
      totalmoney: '',
      money: '',
      account: '',
      apiMoneyMap: {}
    }
    state.totalDataform = {
      money: '',
      totalMoney: ''
    }
    // 共享登录状态，1 为已登录，其它为未登录
    window.common.loginStatus = ''
    // 共享登录会员类型
    window.common.userType = ''
    window.localStorage.userInfo = ''
    window.localStorage.queryIndex = ''

    let _apiName = 'initData.action'
    let _index = '/home'
    if (localStorage.place === '_h5') {
      _apiName = 'initH5Data.action'
      _index = '/wap/index'
    }
    window.$('#preApp').remove()
    window.$('#preAppJS').remove()
    window.store.dispatch(_apiName, {versionFun: true}).then(re => {
      if (res && res.msg) { // 如果有消息提示
        window.layer.msgWarn(res.msg, function () {
          window.router.push(_index)
        })
      }
    })
  },
  // [types.CLEARUSERINFO](state) {
  //   state.userInfo = {}
  // },
  [types.SHOWLOGIN] (state) {
    state.isLogin = true
  },
  [types.REG_ACTION] (state, res) {
    state.regStep = false
    state.step01 = [false, false]
    // 对照关系
    var _a = {
      1: 'parentName',
      13: 'zhuceYm',
      3: 'realName',
      4: 'nickname',
      5: 'englishname',
      6: 'birthday',
      7: 'country',
      8: 'idPassportNo',
      9: 'phone',
      // 10: 'drawMoneyPwd',
      11: 'qq',
      12: 'email',
      14: 'wechat'
    }
    let regInfo = { // 注册字段 信息
      'account': {
        'ifShow': 1,
        'ifRequired': 1,
        'ifValidate': 1
      },
      'password': {
        'ifShow': 1,
        'ifRequired': 1,
        'ifValidate': 1
      },
      'password1': {
        'ifShow': 1,
        'ifRequired': 1,
        'ifValidate': 1
      },
      'zhuceYm': {
        'ifShow': 1,
        'ifRequired': 1,
        'ifValidate': 1
      },
      'drawMoneyPwd': {
        'ifShow': 1,
        'ifRequired': 1,
        'ifValidate': 1
      }
    }
    let memberSetList = {}
    window._.each(res.data.memberSetList, (a, b) => {
      memberSetList[_a[b]] = a
    })
    state.memberSetList = memberSetList
    // 合并 注册 字段 ifShow , ifRequired ifValidate
    state.regInfo = window._.extend(regInfo, memberSetList)
    state.regInfo.zhuceYm.ifValidate = 1
    state.regInfo.zhuceYm.ifRequired = 1
    // res.data.regStep = false
    // 判断是否 reg 分步
    if (res.data.regStep) {
      state.regStep = true
      state.step01 = [true, false]
    } else {
      state.regStep = false
      state.step01 = [true, true]
    }
    state.Intr = cookieUtil.getCookie('Intr') ? cookieUtil.getCookie('Intr') : false
    // res 有推广码的时候
    if (res.data.memberSetList[1].ifShow) {
      // url 带推广吗
      if (state.Intr) {
        Vue.set(state.user1, 'parentName', state.Intr)
        state.Intr = true
      } else if (res.data.parentName) {
        // res 有推广码的时候
        Vue.set(state.user1, 'parentName', res.data.parentName)
        state.Intr = true
      } else {
        // url没有推广码 域名也没绑定推广码的时候
        Vue.set(state.user1, 'parentName', '')
        state.Intr = false
      }
    }
  },
  // 将余额信息存储到用户信息
  [types.UPDATESESSIONMONEY] (state, res) {
    if (res.data.API_FROM) {
      // 将第三方平台金额设置为0，存储在本地
      delete res.data.API_FROM.luoma
      let thirtyPlatformList = JSON.parse(JSON.stringify(res.data.API_FROM))
      for (let k in thirtyPlatformList) {
        thirtyPlatformList[k] = 0
      }
      localStorage.setItem('thirtyPlatformList', JSON.stringify(thirtyPlatformList))
      state.thirdPlatformList = thirtyPlatformList || {}
      for (let i in state.thirdPlatformList) {
        state.thirdPlatformList[i] = res.data.accountBalance.apiMoneyMap[i]
      }
      state.userInfo.apiMoneyMap = state.thirdPlatformList
    }
    if (res.data.totalmoney) {
      state.userInfo.totalmoney = res.data.totalmoney
      state.totalDataform.totalMoney = res.data.totalmoney
    }
    if (res.data.money) {
      state.userInfo.money = res.data.money
      state.totalDataform.money = res.data.money
    }
  },
  [types.MONEYCONVERSION_ACTION] (state, res) {
    if (res.data.API_FROM) {
      // 将第三方平台金额设置为0，存储在本地
      delete res.data.API_FROM.luoma
      let thirtyPlatformList = JSON.parse(JSON.stringify(res.data.API_FROM))
      for (let k in thirtyPlatformList) {
        thirtyPlatformList[k] = 0
      }

      localStorage.setItem('thirtyPlatformList', JSON.stringify(thirtyPlatformList))
      state.thirdPlatformList = thirtyPlatformList || {}
      for (let i in state.thirdPlatformList) {
        state.thirdPlatformList[i] = res.data.accountBalance.apiMoneyMap[i]
      }
      state.userInfo.apiMoneyMap = state.thirdPlatformList
    }
    if (res.data.totalmoney) {
      state.userInfo.totalmoney = res.data.totalmoney
      state.totalDataform.totalMoney = res.data.totalmoney
    }
    if (res.data.platformMoney) {
      state.userInfo.money = res.data.platformMoney
      state.totalDataform.money = res.data.platformMoney
    }
  },
  /**
   * 试玩
   * @param {*} state
   * @param {*} res
   *  todo elmer  todo elmer 与 h5 没公用
   */
  [types.LOGIN_FREE_MUTATION] (state, res) {
    try {
      state.userInfo = { 'account': res.data.account, 'money': res.data.money }
    } catch (e) {
    }
    state.isLogin = true
    state.type = '1' // 试玩
  },
  /**
   * 会员登录消息
   * @param {*} state
   * @param {*} res
   */
  [types.POPUPMESSAGE_MUTATION] (state, data) {
    localStorage.showPopUpMessage = ''
    if (data && data[0]) {
      state.popUpMessageList = data // 设置消息列表
      state.popUpMessage = data[0]
      state.showPopUpMessage = true
    }
  }
}
