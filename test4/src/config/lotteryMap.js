/** 所有彩票的配置项，如果有新增了彩票，需要对应的将所有的数据增加至lotteryMap中 by karl */
// 简写和彩票ID
 export const LotterySrcToId = {
   'lhc': '24', // 六合彩 lotteryId
   'cqssc': '2', // 重庆时时彩
   'bjsc': '6',  // 北京赛车
   'gdklsf': '5', // 广东快乐十分
   'jstb': '7',  // 江苏骰宝
   'bjk3': '18',  // 北京快3
   'jxssc': '4',  // 江西时时彩
   'tjssc': '3', // 天津时时彩
   'ddcp': '9',  // 幸运28
   'hnklsf': '10', // 湖南快乐十分
   'xjssc': '11', // 新疆时时彩
  //  'canada': '12', // 加拿大
   'cqxync': '13', // 重庆幸运农场
   'gxks': '14', // 广西快3
   'bjkl8': '15', // 北京快乐8
   'gxklsf': '16', // 广西快乐十分
   'gd11x5': '17', // 广东11选5
   'yfsc': '44', // 东方1分 赛车(一分赛车)
   'xync1': '47', // 东方1分快乐十分(一分快乐十分)
   'ks1': '50',    // 东方1分 骰宝(一分快3)
  //  'df1xy28': '55', // 东方1分 幸运28
   'yf11x5': '57', // 一分11选5
   'yflhc': '64', // 东方1分 东方六合彩(一分六合彩)
   'yfssc': '40', // 东方1分 东方时时彩（一分时时彩）
  //  'df1kl8': '53', // 东方1分 东方快乐8
   'ks3': '51', // 东方3 东方骰宝(三分快3)
   'xync3': '48', // 东方3 东方幸运农场(三分快乐十分)
  //  'df3xy28': '56', // 东方3 东方幸运28
   'sf11x5': '58', // 三分11选5
   'sflhc': '65', // 东方3 东方3东方六合彩(三分六合彩)
   'sfssc': '42', // 东方3 东方时时彩(三分时时彩)
   'sfsc': '45', // 东方3 东方赛车(三分赛车)
   'xyft': '8', // 幸运飞艇 北京赛车(幸运飞艇)
  //  'df3kl8': '54', // 东方3 东方快乐8
   'ks5': '52', // 东方5 东方骰宝(五分快3)
   'xync5': '49', // 东方5 东方幸运农场(五分快乐十分)
  //  'df5115': '59', // 东方5 东方11选5
   'wflhc': '66', // 东方5 东方六合彩(五分六合彩)
  //  'df5sc': '67', // 东方5 东方赛车
   'wfssc': '43', // 东方5 东方时时彩(五分时时彩)
  //  'df5klsf': '62', // 东方5 东方快乐十分
  //  'df5kl8': '68', // 东方5东方快乐8 (数据库暂时没有赔率)
   'yfxync': '73', // 东方一东方幸运农场(一分幸运农场)
   'sfxync': '74', // 东方三分东方幸运农场(三分幸运农场)
   'mmc': '100', // 秒秒彩
   'mmsc': '101'  // 秒秒赛车
  //  'js11x5': '18' // 江苏十一选
 }

 // 用来判断是否自营彩(一三五分彩)
 export const OGCP = {
   'yfsc': 1, // 东方1分 赛车(一分赛车)
   'yfklsf': 1, // 东方1分快乐十分(一分快乐十分)
   'xync1': 1,
   'ks1': 1,    // 东方1分 骰宝(一分快3)
   'df1xy28': 1, // 东方1分 幸运28
   'yf11x5': 1, // 一分11选5
   'yflhc': 1, // 东方1分 东方六合彩(一分六合彩)
   'yfssc': 1, // 东方1分 东方时时彩（一分时时彩）
   'df1kl8': 1, // 东方1分 东方快乐8
   'ks3': 3, // 东方3 东方骰宝(三分快3)
   'xync3': 3, // 东方3 东方幸运农场(三分快乐十分)
   'df3xy28': 3, // 东方3 东方幸运28
   'sf11x5': 3, // 三分11选5
   'sflhc': 3, // 东方3 东方3东方六合彩(三分六合彩)
   'sfssc': 3, // 东方3 东方时时彩(三分时时彩)
   'sfsc': 3, // 东方3 东方赛车(三分赛车)
   'df3kl8': 3, // 东方3 东方快乐8
   'ks5': 5, // 东方5 东方骰宝(五分快3)
   'xync5': 5, // 东方5 东方幸运农场(五分快乐十分)
   'df5115': 5, // 东方5 东方11选5
   'wflhc': 5, // 东方5 东方六合彩(五分六合彩)
   'df5sc': 5, // 东方5 东方赛车
   'wfssc': 5, // 东方5 东方时时彩(五分时时彩)
   'df5klsf': 5, // 东方5 东方快乐十分
   'df5kl8': 5, // 东方5东方快乐8 (数据库暂时没有赔率)
   'yfxync': 1, // 东方一东方幸运农场(一分幸运农场)
   'sfxync': 3 // 东方三分东方幸运农场(三分幸运农场)
   // 'mmc': 'OGCP' // 秒秒彩
 }

// 彩票ID 和简写对应
 export const LotterySrc = {
   '24': 'lhc', // 六合彩 lotteryId
   '2': 'cqssc', // 重庆时时彩
   '6': 'bjsc',  // 北京赛车
   '5': 'gdklsf', // 广东快乐十分
   '7': 'jstb',  // 江苏骰宝
   '18': 'bjk3',  // 北京快3
   '4': 'jxssc',  // 江西时时彩
   '3': 'tjssc', // 天津时时彩
   '9': 'ddcp',  // 幸运28
   '10': 'hnklsf', // 湖南快乐十分
   '11': 'xjssc', // 新疆时时彩
  //  '12': 'canada', // 加拿大
   '13': 'cqxync', // 重庆幸运农场
   '14': 'gxks', // 广西快3
   '15': 'bjkl8', // 北京快乐8
   '16': 'gxklsf', // 广西快乐十分
   '17': 'gd11x5', // 广东11选5
   '44': 'yfsc', // 东方1分 赛车(一分赛车)
   '47': 'xync1', // 东方1分快乐十分(一分快乐十分)
   '50': 'ks1',    // 东方1分 骰宝(一分快3)
  //  '55': 'df1xy28', // 东方1分 幸运28
   '57': 'yf11x5', // 一分11选5
   '64': 'yflhc', // 东方1分 东方六合彩(一分六合彩)
   '40': 'yfssc', // 东方1分 东方时时彩（一分时时彩）
  //  '53': 'df1kl8', // 东方1分 东方快乐8
   '51': 'ks3', // 东方3 东方骰宝(三分快3)
   '48': 'xync3', // 东方3 东方幸运农场(三分快乐十分)
  //  '56': 'df3xy28', // 东方3 东方幸运28
   '58': 'sf11x5', // 三分11选5
   '65': 'sflhc', // 东方3 东方3东方六合彩(三分六合彩)
   '42': 'sfssc', // 东方3 东方时时彩(三分时时彩)
   '45': 'sfsc', // 东方3 东方赛车(三分赛车)
   '8': 'xyft', // 幸运飞艇 北京赛车(幸运飞艇)
  //  '54': 'df3kl8', // 东方3 东方快乐8
   '52': 'ks5', // 东方5 东方骰宝(五分快3)
   '49': 'xync5', // 东方5 东方幸运农场(五分快乐十分)
  //  '59': 'df5115', // 东方5 东方11选5
   '66': 'wflhc', // 东方5 东方六合彩(五分六合彩)
  //  '67': 'df5sc', // 东方5 东方赛车
   '43': 'wfssc', // 东方5 东方时时彩(五分时时彩)
  //  '62': 'df5klsf', // 东方5 东方快乐十分
  //  '68': 'df5kl8', // 东方5东方快乐8
   '73': 'yfxync', // 东方一东方幸运农场(一分幸运农场)
   '74': 'sfxync', // 东方三分东方幸运农场
   '100': 'mmc', // 秒秒彩
   '101': 'mmsc'  // 秒秒赛车
  //  '18': 'js11x5' // 江苏十一选
 }

 export const XYNCType = {'xync5': true, 'xync1': true, 'xync3': true, 'hnklsf': true, 'cqxync': true, 'gxklsf': true, 'gdklsf': true, 'yfxync': true, 'sfxync': true}
 export const k3Type = {'ks1': true, 'ks5': true, 'jstb': true, 'ks3': true, 'gxks': true, 'bjk3': true}
 export const x5Type = {'gd11x5': true, 'js11x5': true, 'df5115': true, 'yf11x5': true, 'sf11x5': true}
 export const sscType = {'cqssc': true, 'jxssc': true, 'tjssc': true, 'xjssc': true, 'yfssc': true, 'sfssc': true, 'wfssc': true}
 export const pk10Type = {'bjsc': true, 'sfsc': true, 'ysc': true, 'xyft': true, 'mmsc': true}
 export const lhcType = {'lhc': true, 'yflhc': true, 'sflhc': true, 'wflhc': true}
 export const jscType = {'mmc': true}

 // 通过彩票名获取彩票大类，如果有新增了彩票需要来这边增加好对应的大类值
 export const getLotteryType = {
   'sfxync': 'klsf',
   'yfxync': 'klsf',
   'xync5': 'klsf',
   'xync1': 'klsf',
   'xync3': 'klsf',
   'hnklsf': 'klsf',
   'cqxync': 'klsf',
   'gdklsf': 'klsf',
   'gxklsf': 'gx10',
   'ks1': 'k3',
   'ks5': 'k3',
   'jstb': 'k3',
   'bjk3': 'k3',
   'ks3': 'k3',
   'gxks': 'k3',
   'gd11x5': 'x5',
   'js11x5': 'x5',
   'df5115': 'x5',
   'yf11x5': 'x5',
   'sf11x5': 'x5',
   'bjsc': 'pk10',
   'sfsc': 'pk10',
   'xyft': 'pk10',
   'yfsc': 'pk10',
   'lhc': 'lhc',
   'yflhc': 'lhc',
   'wflhc': 'lhc',
   'sflhc': 'lhc',
   'jsc': 'mmc',
   'cqssc': 'ssc',
   'jxssc': 'ssc',
   'tjssc': 'ssc',
   'xjssc': 'ssc',
   'yfssc': 'ssc',
   'sfssc': 'ssc',
   'wfssc': 'ssc',
   'ddcp': 'ddcp',
   'mmc': 'mmc',
   'mmsc': 'pk10',
   'bjkl8': 'bjkl8' // 北京快乐8
 }

// 所有彩种开奖类型处理
 export const awardType = {
   'pk10': {// 北京赛车
     showAwardType: 'number',
     awardArr: null, // 用于统一判断是否有单独的处理
     idList: {
       6: true, // 北京赛车
       44: true, // 一分赛车
       45: true // 三分赛车
     },
     titleAwardArrDefault: ['冠', '亚', '季', '四', '五', '六', '七', '八', '九', '十'],
     Type: [
       {
         name: '号码',
         active: true,
         showType: 'number'
       },
       {
         name: '大小',
         active: false,
         showType: 'sizeBjsc'
       },
       {
         name: '单双',
         active: false,
         showType: 'firstsd'
       }
     ]
   },
   'ssc': {// 时时彩
     showAwardType: 'number',
     titleAwardArrDefault: ['总', '万', '仟', '佰', '拾', '个'],
     idList: {
       2: true, // 重庆时时彩
       40: true, // 一分时时彩
       42: true, // 三分时时彩
       3: true, // 天津时时彩
       11: true, // 新疆时时彩
       43: true, // 五分时时彩
       4: true // 江西时时彩
     },
     awardArr: '棋牌', // 用于统一判断是否有单独的处理
     Type: [
       {
         name: '号码',
         active: true,
         showType: 'number'
       },
       {
         name: '大小',
         active: false,
         showType: 'sizeCqssc'
       },
       {
         name: '单双',
         active: false,
         showType: 'firstsd'
       },
       {
         name: '质合',
         active: false,
         showType: 'combine'
       },
       {
         name: '棋牌',
         active: false,
         showType: 'chess'
       }
     ],
     titleAwardArr: ['总', '百家乐', '三公', '龙虎', '牛牛', '梭哈']
   },
   'mmc': {// 秒秒彩
     showAwardType: 'number',
     titleAwardArrDefault: ['总', '万', '仟', '佰', '拾', '个'],
     awardArr: '棋牌', // 用于统一判断是否有单独的处理
     idList: {
       100: true // 秒秒彩
     },
     Type: [
       {
         name: '号码',
         active: true,
         showType: 'number'
       },
       {
         name: '大小',
         active: false,
         showType: 'sizeCqssc'
       },
       {
         name: '单双',
         active: false,
         showType: 'firstsd'
       },
       {
         name: '质合',
         active: false,
         showType: 'combine'
       },
       {
         name: '棋牌',
         active: false,
         showType: 'chess'
       }
     ],
     titleAwardArr: ['总', '百家乐', '三公', '龙虎', '牛牛', '梭哈']
   },
   'klsf': {// 幸运农场、快乐十分
     showAwardType: 'number',
     titleAwardArrDefault: ['总', '一', '二', '三', '四', '五', '六', '七', '八'],
     awardArr: '总', // 用于统一判断是否有单独的处理
     idList: {
       5: true, // 广东快乐十分
       47: true, // 一分快乐十分
       48: true, // 三分快乐十分
       10: true, // 湖南快乐十分
       16: true, // 广西快乐十分
       13: true, // 重庆幸运农场
       49: true, // 五分快乐十分
       73: true, // 一分幸运农场
       74: true // 三分幸运农场
     },
     Type: [
       {
         name: '号码',
         active: true,
         showType: 'number'
       },
       {
         name: '大小',
         active: false,
         showType: 'sizeGdklsf'
       },
       {
         name: '单双',
         active: false,
         showType: 'firstsd'
       },
       {
         name: '中发白',
         active: false,
         showType: 'zfb'
       },
       {
         name: '方位',
         active: false,
         showType: 'fw'
       },
       {
         name: '总',
         active: false,
         showType: 'zong'
       }
     ],
     titleAwardArr: ['总', '大小', '单双', '尾大小', '龙虎']
   },
   'bjkl8': {
     showAwardType: 'number',
     titleAwardArrDefault: [],
     awardArr: '总和', // 用于统一判断是否有单独的处理
     idList: {
       15: true // 北京快乐8
     },
     Type: [
       {
         name: '号码',
         active: true,
         showType: 'number'
       },
       {
         name: '总和',
         active: false,
         showType: 'zonghe'
       }
     ],
     titleAwardArr: ['总和', '总大小', '总单双', '大小单双', '前后', '单双', '五行']
   },
   'lhc': {
     showAwardType: 'number',
     awardArr: null, // 用于统一判断是否有单独的处理
     titleAwardArrDefault: ['正一', '正二', '正三', '正四', '正五', '正六', '特码'],
     idList: {
       24: true, // 香港六合彩
       64: true, // 一分六合彩
       65: true, // 三分六合彩
       66: true // 五分六合彩
     },
     Type: [
       {
         name: '号码',
         active: true,
         showType: 'number'
       },
       {
         name: '生肖',
         active: false,
         showType: 'zodiac'
       },
       {
         name: '大小',
         active: false,
         showType: 'sizeLhc'
       },
       {
         name: '单双',
         active: false,
         showType: 'firstsdLhc'
       }
     ]
   },
   'x5': {
     showAwardType: 'number',
     titleAwardArrDefault: ['总', '一', '二', '三', '四', '五'],
     awardArr: '总', // 用于统一判断是否有单独的处理
     idList: {
       17: true, // 广东十一选五
       57: true, // 一分十一选五
       58: true // 三分十一选五
     },
     Type: [
       {
         name: '号码',
         active: true,
         showType: 'number'
       },
       {
         name: '大小',
         active: false,
         showType: 'AB'
       },
       {
         name: '单双',
         active: false,
         showType: 'CD'
       },
       {
         name: '总',
         active: false,
         showType: 'zong'
       }
     ],
     titleAwardArr: ['总', '大小', '单双', '尾大小', '龙虎']
   },
   'gx10': {// 广西快乐十分
     showAwardType: 'number',
     titleAwardArrDefault: ['总', '一', '二', '三', '四', '五'],
     awardArr: '总', // 用于统一判断是否有单独的处理
     Type: [
       {
         name: '号码',
         active: true,
         showType: 'number'
       },
       {
         name: '大小',
         active: false,
         showType: 'AB'
       },
       {
         name: '单双',
         active: false,
         showType: 'CD'
       },
       {
         name: '福禄寿喜',
         active: false,
         showType: 'FLSX'
       },
       {
         name: '波色',
         active: false,
         showType: 'BS'
       },
       {
         name: '总',
         active: false,
         showType: 'zong'
       }

     ],
     titleAwardArr: ['总', '大小', '单双', '尾大小', '龙虎']
   }

 }

  /**
  * 传统彩期数规则
  * @fristBettingStartTime：第一期投注开始时间
  * @betTime：投注时长
  * @offTime：封盘时长/下棋开盘剩余时间
  * @lastEndTime：最后一期投注结束时间 (有封盘时间的不需要理会)
  * @len：一天的期数长度
  * @totalTime： 投注时间 + 封盘时间
  */
 export const lotteryBetRule = {
   9: {'fristBettingStartTime': '09:00:00', 'betTime': 240, 'offTime': 60, 'totalTime': 300, 'lastEndTime': '23:54:00', 'len': 179}, // 幸运28（期数需要从其他渠道获取，不能自然的计算）
   15: {'fristBettingStartTime': '09:00:00', 'betTime': 240, 'offTime': 60, 'totalTime': 300, 'lastEndTime': '23:54:00', 'len': 179}, // 北京快8（期数需要从其他渠道获取，不能自然的计算）
   16: {'fristBettingStartTime': '08:56:00', 'betTime': 780, 'offTime': 120, 'totalTime': 900, 'lastEndTime': '21:24:00', 'len': 50}, // 广西快乐十分（期数需要从其他渠道获取，不能自然的计算）
   10: {'fristBettingStartTime': '09:00:00', 'betTime': 540, 'offTime': 60, 'totalTime': 600, 'lastEndTime': '22:59:00', 'len': 84}, // 湖南快乐十分
   6: {'fristBettingStartTime': '09:02:30', 'betTime': 270, 'offTime': 30, 'totalTime': 300, 'lastEndTime': '23:57:00', 'len': 179}, // 北京赛车（期数需要从其他渠道获取，不能自然的计算）
   14: {'fristBettingStartTime': '09:26:00', 'betTime': 540, 'offTime': 60, 'totalTime': 600, 'lastEndTime': '22:25:00', 'len': 78}, // 广西快3（期数需要从其他渠道获取，不能自然的计算）
   7: {'fristBettingStartTime': '08:28:00', 'betTime': 540, 'offTime': 60, 'totalTime': 600, 'lastEndTime': '22:07:00', 'len': 82}, // 江苏骰宝
   18: {'fristBettingStartTime': '09:00:00', 'betTime': 540, 'offTime': 60, 'totalTime': 600, 'lastEndTime': '23:50:00', 'len': 89}, // 北京快3
   5: {'fristBettingStartTime': '08:58:00', 'betTime': 540, 'offTime': 60, 'totalTime': 600, 'lastEndTime': '22:57:00', 'len': 84}, // 广东快乐十分
   17: {'fristBettingStartTime': '09:00:00', 'betTime': 480, 'offTime': 120, 'totalTime': 600, 'lastEndTime': '22:58:00', 'len': 84}, // 广东十一选五
   3: {'fristBettingStartTime': '08:59:00', 'betTime': 540, 'offTime': 60, 'totalTime': 600, 'lastEndTime': '22:58:00', 'len': 84}, // 天津时时彩
   4: {'fristBettingStartTime': '08:58:00', 'betTime': 540, 'offTime': 60, 'totalTime': 600, 'lastEndTime': '23:08:00', 'len': 84}, // 江西时时彩

   /** 01:58:00 表示最后一期的投注时间结束， 00:02:00 倒计时不算进去， 直接放在距离第二天早上开盘倒计时里面 */
   11: [{'fristBettingStartTime': '10:00:00', 'betTime': 480, 'offTime': 120, 'lastEndTime': '23:59:59', 'totalTime': 600, 'len': 84},
      {'fristBettingStartTime': '00:00:00', 'betTime': 480, 'offTime': 120, 'lastEndTime': '01:58:00', 'totalTime': 600},
      {'fristBettingStartTime': '01:58:00', 'lastEndTime': '10:00:00'}], // 新疆时时彩

   /** 01:54:30 表示最后一次的投注时间结束， 00:00:30 倒计时不算进去， 直接放在距离第二天早上开盘倒计时里面 */
   2: [{'fristBettingStartTime': '00:00:00', 'betTime': 270, 'offTime': 30, 'lastEndTime': '01:54:30', 'totalTime': 300, 'len': 23},
      {'fristBettingStartTime': '09:50:00', 'betTime': 570, 'offTime': 30, 'lastEndTime': '22:00:00', 'totalTime': 600, 'len': 96},
      {'fristBettingStartTime': '22:00:00', 'betTime': 270, 'offTime': 30, 'lastEndTime': '23:59:59', 'totalTime': 300},
      {'fristBettingStartTime': '01:54:30', 'lastEndTime': '09:50:00'}], // 重庆时时彩

   13: [{'fristBettingStartTime': '23:51:30', 'betTime': 570, 'offTime': 30, 'lastEndTime': '02:01:00', 'totalTime': 600, 'len': 13},
       {'fristBettingStartTime': '09:51:30', 'betTime': 570, 'offTime': 30, 'lastEndTime': '23:51:30', 'totalTime': 600},
       {'fristBettingStartTime': '02:01:00', 'lastEndTime': '09:51:30'}], // 重庆幸运农场

   8: [{'fristBettingStartTime': '13:04:30', 'betTime': 270, 'offTime': 30, 'lastEndTime': '23:59:00', 'totalTime': 300, 'len': 131},
       {'fristBettingStartTime': '23:59:30', 'betTime': 270, 'offTime': 30, 'lastEndTime': '04:04:00', 'totalTime': 300},
       {'fristBettingStartTime': '04:04:00', 'lastEndTime': '13:04:30'}] // 幸运飞艇
 }

 /**  自营一三五分彩 */
 export const lotteryCountdownForSelfEmployed = {
   1: {'fristBettingStartTime': '00:00:00', 'betTime': 60, 'offTime': 0, 'totalTime': 60}, // 一分彩
   3: {'fristBettingStartTime': '00:00:00', 'betTime': 180, 'offTime': 0, 'totalTime': 180}, // 三分彩
   5: {'fristBettingStartTime': '00:00:00', 'betTime': 300, 'offTime': 0, 'totalTime': 300} // 五分彩
 }

 export const periodLen = {
   16: 50,
   10: 84,
   2: 120,
   14: 78,
   7: 82,
   5: 84,
   17: 84,
   3: 84,
   11: 96,
   13: 97
 }
