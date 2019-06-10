// 所有彩种玩法的配置文件
export const playType = {
  'bjsc': [ // 北京赛车，一分赛车，三分赛车玩法类型
    {
      name: '两面盘',
      type_id: 2700000,
      active: true
    },
    {
      name: '单号1~10',
      type_id: 2710000,
      active: false
    },
    {
      name: '冠亚军组合',
      type_id: 2720000,
      active: false
    }
  ],
  'cqssc': [ // 重庆时时彩， 江西时时彩, 天津时时彩, 新疆时时彩, 一分时时彩, 三分时时彩, 五分时时彩, 秒秒彩
    {
      name: '整合',
      type_id: 2310000,
      active: true
    },
    {
      name: '万位',
      type_id: 2310000,
      active: false
    },
    {
      name: '仟位',
      type_id: 2310000,
      active: false
    },
    {
      name: '佰位',
      type_id: 2310000,
      active: false
    },
    {
      name: '拾位',
      type_id: 2310000,
      active: false
    },
    {
      name: '个位',
      type_id: 2310000,
      active: false
    },
    {
      name: '和尾数',
      type_id: 2330000,
      active: false
    },
    {
      name: '龙虎斗',
      type_id: 2312500,
      active: false
    },
    {
      name: '棋牌',
      type_id: 2312001,
      active: false
    },
    {
      name: '和数',
      type_id: 2320000,
      active: false
    },
    {
      name: '一字',
      type_id: 2340000,
      active: false
    },
    {
      name: '组选三',
      type_id: 2391000,
      active: false
    },
    {
      name: '组选六',
      type_id: 2392000,
      active: false
    },
    {
      name: '跨度',
      type_id: 2393000,
      active: false
    }
  ],
  'gdklsf': [ // 广东快乐十分, 重庆幸运农场, 湖南快乐十分, 一分快乐十分, 三分快乐十分, 五分快乐十分
    {
      name: '双面盘',
      type_id: 2,
      active: true
    },
    {
      name: '单球1~8',
      type_id: 1,
      active: false
    },
    {
      name: '第一球',
      type_id: 2520000,
      active: false
    },
    {
      name: '第二球',
      type_id: 2530000,
      active: false
    },
    {
      name: '第三球',
      type_id: 2540000,
      active: false
    },
    {
      name: '第四球',
      type_id: 2550000,
      active: false
    },
    {
      name: '第五球',
      type_id: 2560000,
      active: false
    },
    {
      name: '第六球',
      type_id: 2570000,
      active: false
    },
    {
      name: '第七球',
      type_id: 2580000,
      active: false
    },
    {
      name: '第八球',
      type_id: 2590000,
      active: false
    },
    {
      name: '连码',
      type_id: 2591000,
      active: false
    }
  ],
  'gxklsf': [// 广西快乐十分
    {
      name: '双面盘',
      type_id: 2,
      active: true
    },
    {
      name: '单球1~5',
      type_id: 1,
      active: false
    },
    {
      name: '第一球',
      type_id: 2020000,
      active: false
    },
    {
      name: '第二球',
      type_id: 2030000,
      active: false
    },
    {
      name: '第三球',
      type_id: 2040000,
      active: false
    },
    {
      name: '第四球',
      type_id: 2050000,
      active: false
    },
    {
      name: '第五球',
      type_id: 2060000,
      active: false
    }
  ],
  'gd11x5': [// 广东十一选五, 江苏十一选五
    {
      name: '两面',
      type_id: 2010000,
      active: true
    }, {
      name: '单号',
      type_id: 2090000,
      active: false
    }, {
      name: '连码',
      type_id: 2100000,
      active: false
    }, {
      name: '直选',
      type_id: 2110000,
      active: false
    }
  ],
  'jstb': [// 江苏骰宝, 一分快3, 三分快3, 五分快3, 广西快3
    {
      name: '大小骰宝',
      type_id: 2800000,
      active: true
    }
  ],
  'bjkl8': [// 北京快8
    {
      name: '整合',
      type_id: 2140000,
      active: true
    },
    {
      name: '正码',
      type_id: 2150100,
      active: false
    }
  ],
  'ddcp': [// 幸运28
    {
      name: '幸运28',
      type_id: 2900000,
      active: true
    }
  ],
  'lhc': [// 香港六合彩, 一分六合彩, 三分六合彩, 五分六合彩
    {
      name: '特别号',
      type_id: 2410000,
      active: true
    }, {
      name: '单双大小',
      type_id: 2400000,
      active: false
    }, {
      name: '正肖七色波',
      type_id: 2490060,
      active: false
    }, {
      name: '合肖',
      type_id: 2410050,
      active: false
    }, {
      name: '生肖色波头尾数',
      type_id: 2410020,
      active: false
    }, {
      name: '正码',
      type_id: 2440000,
      active: false
    }, {
      name: '正码特',
      type_id: 2430010,
      active: false
    }, {
      name: '正码1-6',
      type_id: 2450000,
      active: false
    }, {
      name: '连肖连尾',
      type_id: 2490040,
      active: false
    }, {
      name: '一肖总肖尾数',
      type_id: 2490010,
      active: false
    }, {
      name: '半波半半波',
      type_id: 2410060,
      active: false
    }, {
      name: '自选不中',
      type_id: 2470000,
      active: false
    }, {
      name: '连码',
      type_id: 2460000,
      active: false
    }
  ]

}
