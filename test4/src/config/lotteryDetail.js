// 所有彩种玩法的配置文件 和 lotteryPlayType.js 相结合，拿到完整数据
// 屏蔽彩种，后续需要再开放， 屏蔽后 找不到对应的玩法，默认该彩种不存在
import * as type from './lotteryPlayType'
export const playType = {
  'bjsc': {
    name: '北京赛车',
    id: '6',
    rtype: type.playType['bjsc']
  },
  'mmsc': {
    name: '秒秒赛车',
    id: '101',
    rtype: type.playType['bjsc']
  },
  'yfsc': {
    name: '一分赛车',
    id: '44',
    rtype: type.playType['bjsc']
  },
  'sfsc': {
    name: '三分赛车',
    id: '45',
    rtype: type.playType['bjsc']
  },
  'xyft': {
    name: '幸运飞艇',
    id: '8',
    rtype: type.playType['bjsc']
  },
  'mmc': {
    name: '秒秒彩',
    id: '100',
    rtype: type.playType['cqssc']
  },
  'cqssc': {
    name: '重庆时时彩',
    id: '2',
    rtype: type.playType['cqssc']
  },
  'jxssc': {
    name: '江西时时彩',
    id: '4',
    rtype: type.playType['cqssc']
  },
  'tjssc': {
    name: '天津时时彩',
    id: '3',
    rtype: type.playType['cqssc']
  },
  'xjssc': {
    name: '新疆时时彩',
    id: '11',
    rtype: type.playType['cqssc']
  },
  'yfssc': {
    name: '一分时时彩',
    id: '40',
    rtype: type.playType['cqssc']
  },
  'sfssc': {
    name: '三分时时彩',
    id: '42',
    rtype: type.playType['cqssc']
  },
  'wfssc': {
    name: '五分时时彩',
    id: '43',
    rtype: type.playType['cqssc']
  },
  'gdklsf': {
    name: '广东快乐十分',
    id: '5',
    rtype: type.playType['gdklsf']
  },
  'cqxync': {
    name: '重庆幸运农场',
    id: '13',
    rtype: type.playType['gdklsf']
  },
  'hnklsf': {
    name: '湖南快乐十分',
    id: '10',
    rtype: type.playType['gdklsf']
  },
  'yfxync': {
    name: '一分幸运农场',
    id: '73',
    rtype: type.playType['gdklsf']
  },
  'sfxync': {
    name: '三分幸运农场',
    id: '74',
    rtype: type.playType['gdklsf']
  },
  'xync1': {
    name: '一分快乐十分',
    id: '47',
    rtype: type.playType['gdklsf']
  },
  'xync3': {
    name: '三分快乐十分',
    id: '48',
    rtype: type.playType['gdklsf']
  },
  'xync5': {
    name: '五分快乐十分',
    id: '49',
    rtype: type.playType['gdklsf']
  },
  'gxklsf': {
    name: '广西快乐十分',
    id: '16',
    rtype: type.playType['gxklsf']
  },
  'gd11x5': {
    name: '广东十一选五',
    id: '17',
    rtype: type.playType['gd11x5']
  },
  // 'js11x5': {
  //   name: '江苏十一选五',
  //   id: '18',
  //   rtype: type.playType['gd11x5']
  // },
  'yf11x5': {
    name: '一分十一选五',
    id: '57',
    rtype: type.playType['gd11x5']
  },
  'sf11x5': {
    name: '三分十一选五',
    id: '58',
    rtype: type.playType['gd11x5']
  },
  // 'df5115': {
  //   name: '东方11选5',
  //   id: '59',
  //   rtype: type.playType['gdklsf']
  // },
  'jstb': {
    name: '江苏骰宝',
    id: '7',
    rtype: type.playType['jstb']
  },
  'bjk3': {
    name: '北京快3',
    id: '18',
    rtype: type.playType['jstb']
  },
  'ks1': {
    name: '一分快3',
    id: '50',
    rtype: type.playType['jstb']
  },
  'ks3': {
    name: '三分快3',
    id: '51',
    rtype: type.playType['jstb']
  },
  'ks5': {
    name: '五分快3',
    id: '52',
    rtype: type.playType['jstb']
  },
  'gxks': {
    name: '广西快3',
    id: '14',
    rtype: type.playType['jstb']
  },
  'bjkl8': {
    name: '北京快8',
    id: '15',
    rtype: type.playType['bjkl8']
  },
  // 'df1kl8': {
  //   name: '东方快乐8',
  //   id: '53',
  //   rtype: type.playType['bjkl8']
  // },
  // 'df3kl8': {
  //   name: '东方快乐8',
  //   id: '54',
  //   rtype: type.playType['bjkl8']
  // },
  'ddcp': {
    name: '幸运28',
    id: '9',
    rtype: type.playType['ddcp']
  },
  // 'df1xy28': {
  //   name: '东方幸运28',
  //   id: '55',
  //   rtype: type.playType['ddcp']
  // },
  // 'df3xy28': {
  //   name: '东方幸运28',
  //   id: '56',
  //   rtype: type.playType['ddcp']
  // },
  'lhc': {
    name: '香港六合彩',
    id: '24',
    rtype: type.playType['lhc']
  },
  'yflhc': {
    name: '一分六合彩',
    id: '64',
    rtype: type.playType['lhc']
  },
  'sflhc': {
    name: '三分六合彩',
    id: '65',
    rtype: type.playType['lhc']
  },
  'wflhc': {
    name: '五分六合彩',
    id: '66',
    rtype: type.playType['lhc']
  }
}
