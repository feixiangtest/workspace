let _config = {
  'protocol': location.protocol,
  'host': location.host,
  'Tap': false, // 控制页面长按开关
  'shareOpen': false // 控制左右滑动
}
export { _config }

export const outerlayerType = {
  'share': 0, // 分享
  'announcement': 1, // 公告
  'openGonggao': 2, // 首页最新消息公告
  'openPayExplain': 3, // 支付说明
  'openMgLtsTk': 4 // 打开MG擂台赛弹框
}

export const payExplainType = {
  'wechatTransfer': 0, // 微信转账说明——无银行
  'wechatBankTransfer': 101, // 微信转账说明——有银行
  'wechatCode': 1, // 微信扫码说明
  'alipayTransfer': 2, // 支付宝转账说明——无银行
  'alipayBankTransfer': 201, // 支付宝转账说明——有银行
  'alipayCode': 3, // 支付宝扫码说明
  'qqCode': 4, // 微信扫码说明
  'qqTransfer': 5 // 支付宝转账说明
}
