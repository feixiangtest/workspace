/*
 * @Author: Elmer
 * @Date: 2018-09-03 10:12:25
 * @Last Modified by: Elmer
 * @Last Modified time: 2019-01-14 22:46:35
 */
// window.common对象添加会员中心模块逻辑
export default {
  // 判断密码强度等级
  isSimplePwd (s) {
    // 如果密码长度不足6位，那么不符合规则，0等级
    if (s.length < 6) {
      return 0
    }
    let ls = 0
    // 如果密码包含小写字母，加一级强度
    if (s.match(/([a-z])+/)) {
      ls++
    }
    // 如果密码包含数字，加一级强度
    if (s.match(/([0-9])+/)) {
      ls++
    }
    // 如果密码包含大写字母，加一级强度
    if (s.match(/([A-Z])+/)) {
      ls++
    }
    // 如果密码以大小写字母或者数字开头，再加一级
    if (s.match(/[^a-zA-Z0-9]+/)) {
      ls++
    }
    return ls
  },
  myAccount: {
    // breadcrumb: ['我的账户', '基本资讯'],
    breadcrumb: ['我的账户', {
      'baseConsole': '基本资讯',
      'safeSet': '安全设置',
      'gameClient': '游戏客户端'
    }],
    menuTab: [{
      title: '基本资讯',
      routeId: 'baseConsole'
    },
    {
      title: '安全设置',
      routeId: 'safeSet'
    },
    {
      title: '游戏客户端',
      routeId: 'gameClient'
    }
    ]
  },
  bankTransaction: {
    breadcrumb: ['银行交易', {
      'lineConversion': '额度转换',
      'onlinePayment': '线上存款',
      'onlineWithdrawals': '线上取款'
    }],
    menuTab: [{
      title: '额度转换',
      routeId: 'lineConversion'
    },
    {
      title: '线上存款',
      routeId: 'onlinePayment'
    },
    {
      title: '线上取款',
      routeId: 'onlineWithdrawals'
    }
    ]
  },
  personInfo: {
    breadcrumb: ['个人信息', {
      'personMsg': '个人消息',
      'memberMsg': '会员留言'
    }],
    menuTab: [{
      title: '个人消息',
      routeId: 'personMsg'
    },
    {
      title: '会员留言',
      routeId: 'memberMsg'
    }
    ]
  },
  tradeRecord: {
    breadcrumb: ['交易记录', {
      'betRecord': '投注记录',
      'currentRecord': '往来记录'
    }],
    menuTab: [{
      title: '投注记录',
      routeId: 'betRecord'
    },
    {
      title: '往来记录',
      routeId: 'currentRecord'
    }
    ]
  },
  lastestInfo: {
    breadcrumb: ['最新消息', {
      'lastestMsg': '最新消息',
      'historyMsg': '历史消息'
    }],
    menuTab: [{
      title: '最新消息',
      routeId: 'lastestMsg'
    },
    {
      title: '历史消息',
      routeId: 'historyMsg'
    }
    ]
  }
}
