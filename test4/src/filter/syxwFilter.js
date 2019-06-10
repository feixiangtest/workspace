/**
 * 十一选五 连码， 直选 对应的最大选中，最小选中值
 */
export function lianmaZhixuanMatch () {
  return {
    '任选二中二': {'max': 2, 'min': 2, flag: 'RX2'},
    '任选三中三': {'max': 3, 'min': 3, flag: 'RX3'},
    '任选四中四': {'max': 4, 'min': 4, flag: 'RX4'},
    '任选五中五': {'max': 5, 'min': 5, flag: 'RX5'},
    '任选六中五': {'max': 6, 'min': 6, flag: 'RX6'},
    '任选七中五': {'max': 7, 'min': 7, flag: 'RX7'},
    '任选八中五': {'max': 8, 'min': 8, flag: 'RX8'},
    '前二组选': {'max': 5, 'min': 2, flag: 'ZX2'},
    '前三组选': {'max': 5, 'min': 3, flag: 'ZX3'},
    '前二直选': {'qiu': 2},
    '前三直选': {'qiu': 3}
  }
}

/**
 * 直选， 根据选中球， 以及3个数组，判断是否该球可以选中
 * @param {*选中球的对象} gitem
 */
export function zhixuanadd (gitem, first, second, three) {
  let ballNumber = gitem.project // 球的号码
  let index = gitem.typeName // gitem 属于 第一球，第二球，还是第三球
  let flag = true
  if (index === 1) { // gitem 属于第一球， 判断 第二球 和第三球 是否已经选中相同的ballNumber
    for (let i = 0; i < second.length; i++) {
      if (ballNumber === second[i].project) {
        flag = false
        break
      }
    }
    for (let i = 0; i < three.length; i++) {
      if (ballNumber === three[i].project) {
        flag = false
        break
      }
    }
  } else if (index === 2) { // gitem 属于第二球， 判断 第一球 和第三球 是否已经选中相同的ballNumber
    for (let i = 0; i < first.length; i++) {
      if (ballNumber === first[i].project) {
        flag = false
        break
      }
    }
    for (let i = 0; i < three.length; i++) {
      if (ballNumber === three[i].project) {
        flag = false
        break
      }
    }
  } else if (index === 3) { // gitem 属于第三球， 判断 第一球 和第二球 是否已经选中相同的ballNumber
    for (let i = 0; i < first.length; i++) {
      if (ballNumber === first[i].project) {
        flag = false
        break
      }
    }
    for (let i = 0; i < second.length; i++) {
      if (ballNumber === second[i].project) {
        flag = false
        break
      }
    }
  }
  if (flag) {
    switch (index) {
      case 1:
        first.push(gitem)
        break
      case 2:
        second.push(gitem)
        break
      case 3:
        three.push(gitem)
        break
    }
  }
}

/**
 * 直选，根据选中球， 以及3个数组，判断该球在哪个数组中删除
 * @param {*} gitem
 * @param {*} first
 * @param {*} second
 * @param {*} three
 */
export function zhixuandelete (gitem, first, second, three) {
  switch (gitem.typeName) {
    case 1:
      let i = first.indexOf(gitem)
      first.splice(i, 1)
      break
    case 2:
      let j = second.indexOf(gitem)
      second.splice(j, 1)
      break
    case 3:
      let k = three.indexOf(gitem)
      three.splice(k, 1)
      break
  }
}

/**
 * 判断直选玩法中第一球选中后， 第二球和第三球是否是disable状态
 * @param {*} gitem
 * @param {*} first
 */
export function firstBallDisabled (gitem, first) {
  for (let i = 0; i < first.length; i++) {
    if (first[i].project === gitem.project) {
      return true
    }
  }
}

/**
 * 判断直选玩法中第二球后， 第一球和第三球是否是disable状态
 * @param {*} gitem
 * @param {*} first
 */
export function secondBallDisabled (gitem, second) {
  for (let i = 0; i < second.length; i++) {
    if (second[i].project === gitem.project) {
      return true
    }
  }
}

/**
 * 判断直选玩法中第三球后， 第一球和第二球是否是disable状态
 * @param {*} gitem
 * @param {*} first
 */
export function threeBallDisabled (gitem, three) {
  for (let i = 0; i < three.length; i++) {
    if (three[i].project === gitem.project) {
      return true
    }
  }
}
