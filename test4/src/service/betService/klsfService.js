/**
 * 判断连码是否符合要求
 * @param {*连码中，选择类型} selectedRule
 * @param {*选择的球号数组} selectedList
 */
export function isTrueByLianMa (selectedRule, selectedList) {
  if (selectedRule === null) {
    window.layer.msgWarn('请选择类型!')
    return false
  }
  // 根据不同选择类型，对所选球号个数做检验
  switch (selectedRule.typeId) {
    case 2591010: // 选二任选
      if (selectedList.length < 2) {
        window.layer.msgWarn('请在 选二任选 项至少挑选两个号码!')
        return false
      }
      break
    case 2591020: // 选二连组
      if (selectedList.length < 2) {
        window.layer.msgWarn('请在 选二连组 项至少挑选两个号码!')
        return false
      }
      break
    case 2591030: // 选二连直
      if (selectedList.length < 2) {
        window.layer.msgWarn('请在 选二连直 项至少挑选两个号码!')
        return false
      }
      break
    case 2591040: // 选三任选
      if (selectedList.length < 3) {
        window.layer.msgWarn('请在 选三任选 项至少挑选三个号码!')
        return false
      }
      break
    case 2591050: // 选三前组
      if (selectedList.length < 3) {
        window.layer.msgWarn('请在 选三前组 项至少挑选三个号码!')
        return false
      }
      break
    case 2591060: // 选三前直
      if (selectedList.length < 3) {
        window.layer.msgWarn('请在 选三前直 项至少挑选三个号码!')
        return false
      }
      break
    case 2591070: // 选四任选
      if (selectedList.length < 4) {
        window.layer.msgWarn('请在 选四任选 项至少挑选四个号码!')
        return false
      }
      break
    case 2591080: // 选五任选
      if (selectedList.length < 5) {
        window.layer.msgWarn('请在 选五任选 项至少挑选五个号码!')
        return false
      }
      break
    default:
      window.layer.msgWarn('没匹配到选择类型!')
      return false
  }
  return true
}

/**
 * 连码 生成下注明细注单
 * @param {*选择类型} gitem
 * @param {*连码球数组} list
 */
export function newDobetList (selectedRule, selectedList) {
  let newlist = []
  let CNConverNum = {
    '2591010': 2,
    '2591020': 2,
    '2591030': 2,
    '2591040': 3,
    '2591050': 3,
    '2591060': 3,
    '2591070': 4,
    '2591080': 5
  }

  let item = { // 连码 只需生成一条注单
    'typeName': selectedRule.typeName,
    'project': '',
    'odds': selectedRule.odds,
    'fullname': selectedRule.typeName,
    'otypeName': '',
    'typeId': selectedRule.typeId
  }
  let lianmaCombination = ''   // 连码封装组合，当选完后开始封装,
  if (selectedRule.typeId === 2591030 || selectedRule.typeId === 2591060) {
    // 排列
    lianmaCombination = combinationA(selectedList, CNConverNum[selectedRule.typeId])
  } else {
    // 组合
    lianmaCombination = combination(selectedList, CNConverNum[selectedRule.typeId])
  }

  if (lianmaCombination) {
    item.groupList = lianmaCombination
    item.groupNum = lianmaCombination.length
  }

  selectedList.forEach(function (num, index) { // 生成投注号码数组
    if (index < selectedList.length - 1) {
      item['project'] += zeroAddOne(num.project) + ','
      item['otypeName'] += zeroAddOne(num.project) + ','
    } else { // 末尾不插入逗号
      item['project'] += zeroAddOne(num.project)
      item['otypeName'] += zeroAddOne(num.project)
    }
  })

  newlist.push(item)
  return newlist
}

/** 处理时间位数，少一位增加0 */
export function zeroAddOne (date) {
  if (date >= 1 && date <= 9) {
    date = '0' + date
  }
  return date
}

// 计算连码组合
export function combination (selectNumList, selLen) {
  let r = [];
  (function f (t, a, n) {
    if (n === 0) return r.push(t)
    for (let i = 0, l = a.length; i <= l - n; i++) {
      f(t.concat(zeroAddOne(a[i].project)), a.slice(i + 1), n - 1)
    }
  })([], selectNumList, selLen)
  return r
}

// 排列
export function combinationA (selectNumList, selLen) {
  let r = [];
  (function f (t, a, n) {
    if (n === 0) return r.push(t)
    for (let i = 0, l = a.length; i < l; i++) {
      f(t.concat(zeroAddOne(a[i].project)), a.slice(0, i).concat(a.slice(i + 1)), n - 1)
    }
  })([], selectNumList, selLen)
  return r
}
