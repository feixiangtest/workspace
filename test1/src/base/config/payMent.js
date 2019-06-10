
export const depositType = [ // 线下入款隐含列表
  {
    depositId: 0,
    depositName: '网银转账'
  },
  {
    depositId: 1,
    depositName: 'ATM自动柜员机'
  },
  {
    depositId: 2,
    depositName: 'ATM现金入款'
  },
  {
    depositId: 3,
    depositName: '银行柜台'
  },
  {
    depositId: 4,
    depositName: '手机银行转账'
  },
  {
    depositId: 9,
    depositName: '微信转账'
  },
  {
    depositId: 10,
    depositName: '支付宝转账'
  },
  {
    depositId: 12,
    depositName: 'QQ转账'
  },
  {
    depositId: 14,
    depositName: '财付通转账'
  },
  {
    depositId: 15,
    depositName: '云闪付转账'
  },
  {
    depositId: 7,
    depositName: '其他'
  }
]
export const getInfo = { // 公司入款线下支付（除银行支付外）静态配置
  ali: { // 支付宝入款
    scan: { // 扫码支付
      depositBankValue: '支付宝', // 当前使用的银行卡名称
      userDepositValue: '支付宝扫码', // 选择的存款方式名称
      userDepositType: 5 // 选择的存款方式id
    },
    transfer: { // 好友转账
      cardName: '支付宝', // 转账机构
      depositBankValue: '支付宝', // 当前使用的银行卡名称
      userDepositValue: '支付宝好友转账', // 选择的存款方式名称
      userDepositType: 10 // 选择的存款方式id
    }
  },
  weixin: { // 微信入款
    scan: { // 扫码支付
      depositBankValue: '微信支付', // 当前使用的银行卡名称
      userDepositValue: '微信扫码', // 选择的存款方式名称
      userDepositType: 8 // 选择的存款方式id
    },
    transfer: { // 好友转账
      cardName: '微信', // 转账机构
      depositBankValue: '微信', // 当前使用的银行卡名称
      userDepositValue: '微信好友转账', // 选择的存款方式名称
      userDepositType: 9 // 选择的存款方式id
    }
  },
  qq: { // QQ入款
    scan: { // 扫码支付
      depositBankValue: 'QQ', // 当前使用的银行卡名称
      userDepositValue: 'QQ扫码', // 选择的存款方式名称
      userDepositType: 11 // 选择的存款方式id
    },
    transfer: { // 好友转账
      cardName: 'QQ', // 转账机构
      depositBankValue: 'QQ', // 当前使用的银行卡名称
      userDepositValue: 'QQ好友转账', // 选择的存款方式名称
      userDepositType: 12 // 选择的存款方式id
    }
  },
  cft: { // 财付通入款
    scan: { // 扫码支付
      depositBankValue: '财付通支付', // 当前使用的银行卡名称
      userDepositValue: '财付通扫码', // 选择的存款方式名称
      userDepositType: 13 // 选择的存款方式id
    },
    transfer: { // 好友转账
      cardName: '财付通', // 转账机构
      depositBankValue: '财付通', // 当前使用的银行卡名称
      userDepositValue: '财付通好友转账', // 选择的存款方式名称
      userDepositType: 14 // 选择的存款方式id
    }
  },
  ysf: { // 云闪付入款
    scan: { // 扫码支付
      depositBankValue: '云闪付支付', // 当前使用的银行卡名称
      userDepositValue: '云闪付扫码', // 选择的存款方式名称
      userDepositType: 16 // 选择的存款方式id
    },
    transfer: { // 好友转账
      cardName: '云闪付', // 转账机构
      depositBankValue: '云闪付', // 当前使用的银行卡名称
      userDepositValue: '云闪付好友转账', // 选择的存款方式名称
      userDepositType: 15 // 选择的存款方式id
    }
  }
}
