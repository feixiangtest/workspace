// import * as types from './type'

// 存放一些彩票的信息
export const state = {
  nowMode: '', // 彩种选中的玩法
  nowTitle: '', // 玩法名称
  awardDivShow: true,
  awardShow: false, // 控制投注页面的 开奖结果按钮是否显示十期开奖结果
  betListShow: true, // 如果开奖结果显示，那么投注内容区隐藏
  nowLotteryName: '', // 彩票名称，用于投注页面的左边显示
  lotteryId: '', // 存储选中彩票的ID，用于后续的开奖结果等功能查询使用
  lotteryPlayType: [], // 彩票的玩法
  show: true, // 从下注到下注详情的一个标志,2给页面切换
  lotteryType: '', // 彩票大类
  historyPath: '', // 获取from path 路径,可用于追踪上一个路径是什么
  isAddListen: false, // 秒秒彩监听 devicemotion， 只添加一次， 下次判断为true 则不需要再 addEventListener
  addListenVisibility: false, // 倒计时锁屏监听visibility， 只添加一次， 下次判断为true 则不需要再 addEventListener
  setChip: false, // 展示自定义筹码
  childLottery: [], // 获取所有彩票
  isAll: 0, // 用于判断是一次查询所有彩票数据还是单个大类查询
  showBetLoading: true, // 彩票投注页面是否需要loading  true表示需要， false表示不需要
  allowBack: false, // 判断是否允许浏览器前进后退（秒秒彩连续开奖未结束之前不允许）
  lotteryStatusList: [], // 所有彩票类的状态
  lotteryIdList: [], // 所有彩票ID数组
  closedLottery: true, // 投注页面的倒计时，判断是否是关闭
  timeCount: 0, // 计数器，用于导航栏上，500次重新调一次定时器
  showBettingDetail: false, // 是否展示注单明细
  isNormal: 'Y'
}

export const mutations = {

}
