/** ****************************************************** 公共方法和变量 start ********************************************************/
/**
 * 排列组合(经典算法，百度可查)
 * @param  {数组} arr
 * @param  {每组个数} size
 */
function groupSplit (arr, size) {
  let r = [] // result

  function _ (t, a, n) { // tempArr, arr, num
    if (n === 0) {
      r[r.length] = t
      return
    }
    for (let i = 0, l = a.length - n; i <= l; i++) {
      let b = t.slice()
      b.push(a[i])
      _(b, a.slice(i + 1), n - 1)
    }
  }
  _([], arr, size)
  return r
}

/**
 * 获取最小赔率
 */
function getMixOdd (array) {
  let mixOdd = array[0].odds
  array.forEach(item => {
    if (item.odds < mixOdd) {
      mixOdd = item.odds
    }
  })
  return mixOdd
}
/** ****************************************************** 公共方法和变量 end ********************************************************/

/** ****************************************************** 合肖 start ********************************************************/
/**
 * 判断合肖是否符合要求
 * @param {*选择类型} selectedRule
 * @param {*选择的球号数组} selectedList
 */
export function isTrueByHeXiao (selectedRule, selectedList) {
  if (selectedRule === null) {
    window.layer.msgWarn('请选择类型!')
    return false
  }

  if (selectedList.length < 1) {
    window.layer.msgWarn('请选择生肖!')
    return false
  }

  return true
}

/**
 * 合肖 生成注单
 * @param {*选择类型} gitem
 * @param {*选择号码} list
 * @param {*后端传来的赔率} bettList
 */
export function heXiaoDobetList (selectedRule, selectedList, bettList) {
  /* 处理选择的生肖 */
  let numbers = '' // 存放选择的生肖组
  selectedList.forEach(item => { // 循环取出生肖
    numbers += item.project + '_'
  })
  numbers = numbers.substring(0, numbers.length - 1) // 删除最后一个下划线'_'

  /* 计算赔率 */
  let oddsArray = [] // 存放相应类型的赔率
  let typeId
  switch (selectedRule.typeId) { // 判断连码中的选择类型
    case 0: // 中
      typeId = 2410051
      bettList[0].oddsList.forEach(function (item) { // 循环取出后端传来的赔率
        if (item.typeId === 2410051) { // 中 赔率
          oddsArray.push(item) // 保存赔率到数组中
        }
      })
      break
    case 1: // 不中
      typeId = 2410052
      bettList[0].oddsList.forEach(function (item) { // 循环取出后端传来的赔率
        if (item.typeId === 2410052) { // 不中 赔率
          oddsArray.push(item) // 保存赔率到数组中
        }
      })
      break
    default:
      console.error('请选择类型！')
      return false
  }
  let selectedOdds = oddsArray[selectedList.length - 1] // 最终赔率

  // 组装注单
  let item = {
    'typeName': selectedOdds.typeName, // 游戏玩法-具体选择类型
    'project': selectedOdds.project + ' ' + numbers, // 选择的生肖
    'odds': selectedOdds.odds, // 赔率
    'typeId': typeId
  }

  let newlist = [] // 最终生成的新注单
  newlist.push(item)
  return newlist
}
/** ****************************************************** 合肖 end ********************************************************/

/** ****************************************************** 连肖连尾 start ********************************************************/
/**
 * 判断连肖连尾是否符合要求
 * @param {*选择类型} selectedRule
 * @param {*选择号码} selectedList
 */
export function isTrueByLianXiaoLianWei (selectedRule, selectedList) {
  if (!selectedRule || selectedRule.typeId === undefined) {
    window.layer.msgWarn('请选择类型!')
    return false
  }
  // 根据不同选择类型，对所选球号数做检验
  switch (selectedRule.typeId) {
    case 0: // 二肖连
      if (selectedList.length < 2) {
        window.layer.msgWarn('请至少选择2个生肖!')
        return false
      }
      break
    case 1: // 三肖连
      if (selectedList.length < 3) {
        window.layer.msgWarn('请至少选择3个生肖!')
        return false
      }
      break
    case 2: // 四肖连
      if (selectedList.length < 4) {
        window.layer.msgWarn('请至少选择4个生肖!')
        return false
      }
      break
    case 3: // 五肖连
      if (selectedList.length < 5) {
        window.layer.msgWarn('请至少选择5个生肖!')
        return false
      }
      break
    case 4: // 二尾碰
      if (selectedList.length < 2) {
        window.layer.msgWarn('请至少选择2个号码!')
        return false
      }
      break
    case 5: // 三尾碰
      if (selectedList.length < 3) {
        window.layer.msgWarn('请至少选择3个号码!')
        return false
      }
      break
    case 6: // 四尾碰
      if (selectedList.length < 4) {
        window.layer.msgWarn('请至少选择4个号码!')
        return false
      }
      break
    case 7: // 五尾碰
      if (selectedList.length < 5) {
        window.layer.msgWarn('请至少选择5个号码!')
        return false
      }
      break
    default:
      window.layer.msgWarn('没找到选择类型!')
      return false
  }
  return true
}

/**
 * 连肖连尾 生成注单
 * @param {*选择类型} gitem
 * @param {*选择号码} list
 * @param {*后端传来的赔率} bettList
 */
export function lianMaLianXiaoDobetList (selectedRule, selectedList, bettList) {
  let newlist = [] // 最终生成的新注单
  let numberArray = [] // 所选择的球号数组
  selectedList.forEach(function (item) { // 循环取出号数
    numberArray.push(item.project)
  })

  numberArray.sort((a, b) => { // 升序排序
    return a - b
  })

  switch (selectedRule.typeId) { // 判断连码中的选择类型
    case 0: // 二肖连
      newlist = createLianXiaoDobet(numberArray, 2, selectedRule, bettList, 2490041)
      break
    case 1: // 三肖连
      newlist = createLianXiaoDobet(numberArray, 3, selectedRule, bettList, 2490042)
      break
    case 2: // 四肖连
      newlist = createLianXiaoDobet(numberArray, 4, selectedRule, bettList, 2490043)
      break
    case 3: // 五肖连
      newlist = createLianXiaoDobet(numberArray, 5, selectedRule, bettList, 2490044)
      break
    case 4: // 二尾碰
      newlist = createLianWeiDobet(numberArray, 2, selectedRule, bettList, 2490051)
      break
    case 5: // 三尾碰
      newlist = createLianWeiDobet(numberArray, 3, selectedRule, bettList, 2490052)
      break
    case 6: // 四尾碰
      newlist = createLianWeiDobet(numberArray, 4, selectedRule, bettList, 2490053)
      break
    case 7: // 五尾碰
      newlist = createLianWeiDobet(numberArray, 5, selectedRule, bettList, 2490054)
      break
    default:
      console.error('请选择类型！')
      return false
  }
  return newlist
}

/**
 * 连肖连尾 根据不同分组生成 连肖 注单
 * @param  {数组} numberArray
 * @param  {每组个数} size
 * @param  {选择类型} selectedRule
 * @param {*后端传来的赔率} bettList
 * @param {*玩法id} typeId
 */
function createLianXiaoDobet (numberArray, size, selectedRule, bettList, typeId) {
  const animalFullFight = { // 生肖全拼
    '鼠': 'SHU',
    '牛': 'NIU',
    '虎': 'HU',
    '兔': 'TU',
    '龙': 'LONG',
    '蛇': 'SHE',
    '马': 'MA',
    '羊': 'YANG',
    '猴': 'HOU',
    '鸡': 'JI',
    '狗': 'GOU',
    '猪': 'ZHU'
  }

  let oddsArray = []
  bettList[0].oddsList.forEach(function (item) { // 循环取出赔率
    if (item.typeId === typeId) {
      let num = item.project // 生肖
      oddsArray[num] = item // 根据生肖保存赔率到数组中
    }
  })

  let newList = []
  groupSplit(numberArray, size).forEach(itemArray => { // 分组，以size个号码为一组。然后循环组装注单
    // 拼接组装号码
    let project = '' // 组合号码
    let oddsArray2 = [] // 组合尾数赔率
    let label = ''
    itemArray.forEach(num => {
      project += num + '_'
      oddsArray2.push(oddsArray[num])
      label += animalFullFight[num] + ','
    })
    project = project.substring(0, project.length - 1) // 去除最后一个字符
    label = label.substring(0, label.length - 1) + '-' + project.replace(/_/g, ',')

    // 组装注单
    let item = {
      'typeName': selectedRule.project,
      'project': project,
      'odds': getMixOdd(oddsArray2), // 取组合生肖的最小赔率
      'typeId': typeId,
      'label': label
    }
    newList.push(item)
  })
  return newList
}

/**
 * 连肖连尾 根据不同分组生成 连尾 注单
 * @param  {数组} numberArray
 * @param  {每组个数} size
 * @param  {选择类型} selectedRule
 * @param {*后端传来的赔率} bettList
 * @param {*玩法id} typeId
 */
function createLianWeiDobet (numberArray, size, selectedRule, bettList, typeId) {
  let oddsArray = []
  bettList[0].oddsList.forEach(function (item) { // 循环取出赔率
    if (item.typeId === typeId) {
      let num = item.project // 尾数
      oddsArray[num] = item // 根据尾数保存赔率到数组中
    }
  })

  let newList = []
  groupSplit(numberArray, size).forEach(itemArray => { // 分组，以size个号码为一组。然后循环组装注单
    // 拼接组装号码
    let oddsArray2 = [] // 组合尾数赔率
    let project = '' // 组合号码
    itemArray.forEach(num => {
      project += num + '_'
      oddsArray2.push(oddsArray[num])
    })
    project = project.substring(0, project.length - 1) // 去除最后一个字符
    let label = project.replace(/_/g, ',') + '-' + project.replace(/_/g, ',')

    // 组装注单
    let item = {
      'typeName': selectedRule.project,
      'project': project,
      'odds': getMixOdd(oddsArray2), // 取组合尾数的最小赔率
      'typeId': typeId,
      'label': label
    }
    newList.push(item)
  })
  return newList
}
/** ****************************************************** 连肖连尾 end ********************************************************/

/** ****************************************************** 连码、自选不中 start ********************************************************/
/**
 * 判断连码是否符合要求
 * @param {*连码中，选择类型} lianMaRule
 * @param {*选择的球号数组} selectedList
 */
export function isTrueByLianMa (lianMaRule, selectedList) {
  let selectedRule = lianMaRule[0]
  if (!selectedRule) {
    window.layer.msgWarn('请选择类型!')
    return false
  }
  // 根据不同选择类型，对所选球号数做检验
  switch (selectedRule.typeId) {
    case 2460010: // 四全中
      if (selectedList.length < 4) {
        window.layer.msgWarn('请至少选择4个号码!')
        return false
      }
      break
    case 2460020: // 三全中
    case 2460030: // 中二、中三
      if (selectedList.length < 3) {
        window.layer.msgWarn('请至少选择3个号码!')
        return false
      }
      break
    case 2460040: // 二全中
    case 2460050: // 中特、中二
    case 2460060: // 特串
      if (selectedList.length < 2) {
        window.layer.msgWarn('请至少选择2个号码!')
        return false
      }
      break
    /** 自选不中部分的判断  */
    case 2470010: // 五不中
      if (selectedList.length < 5) {
        window.layer.msgWarn('请至少选择5个号码!')
        return false
      }
      break
    case 2470020: // 六不中
      if (selectedList.length < 6) {
        window.layer.msgWarn('请至少选择6个号码!')
        return false
      }
      break
    case 2470030: // 七不中
      if (selectedList.length < 7) {
        window.layer.msgWarn('请至少选择7个号码!')
        return false
      }
      break
    case 2470040: // 八不中
      if (selectedList.length < 8) {
        window.layer.msgWarn('请至少选择8个号码!')
        return false
      }
      break
    case 2470050: // 九不中
      if (selectedList.length < 9) {
        window.layer.msgWarn('请至少选择9个号码!')
        return false
      }
      break
    case 2470060: // 十不中
      if (selectedList.length < 10) {
        window.layer.msgWarn('请至少选择10个号码!')
        return false
      }
      break
    case 2470070: // 十一不中
      if (selectedList.length < 11) {
        window.layer.msgWarn('请至少选择11个号码!')
        return false
      }
      break
    case 2470080: // 十二不中
      if (selectedList.length < 12) {
        window.layer.msgWarn('请至少选择12个号码!')
        return false
      }
      break
    default:
      window.layer.msgWarn('没找到选择类型!')
      return false
  }
  return true
}

/**
 * 连码 生成注单
 * @param {*选择类型} gitem
 * @param {*连码球数组} list
 */
export function lianMaDobetList (selectedRule, selectedList) {
  let newlist = []
  let numberArray = [] // 所选择的球号数组
  selectedList.forEach(function (item) { // 循环取出号数
    numberArray.push(item.project)
  })

  numberArray.sort((a, b) => { // 升序排序
    return a - b
  })

  switch (selectedRule[0].typeId) { // 判断连码中的选择类型
    case 2460010: // 四全中
      newlist = createLianMaDobet(numberArray, 4, selectedRule)
      break
    case 2460020: // 三全中
    case 2460030: // 中二、中三
      newlist = createLianMaDobet(numberArray, 3, selectedRule)
      break
    case 2460040: // 二全中
    case 2460050: // 中特、中二
    case 2460060: // 特串
      newlist = createLianMaDobet(numberArray, 2, selectedRule)
      break
      /** 自选不中的玩法逻辑处理 */
    case 2470010: // 五不中
      newlist = createLianMaDobet(numberArray, 5, selectedRule)
      break
    case 2470020: // 六不中
      newlist = createLianMaDobet(numberArray, 6, selectedRule)
      break
    case 2470030: // 七不中
      newlist = createLianMaDobet(numberArray, 7, selectedRule)
      break
    case 2470040: // 八不中
      newlist = createLianMaDobet(numberArray, 8, selectedRule)
      break
    case 2470050: // 九不中
      newlist = createLianMaDobet(numberArray, 9, selectedRule)
      break
    case 2470060: // 十不中
      newlist = createLianMaDobet(numberArray, 10, selectedRule)
      break
    case 2470070: // 十一不中
      newlist = createLianMaDobet(numberArray, 11, selectedRule)
      break
    case 2470080: // 十二不中
      newlist = createLianMaDobet(numberArray, 12, selectedRule)
      break
    default:
      console.error('请选择类型！')
      return false
  }
  return newlist
}

/**
 * 连码 根据不同分组生成注单
 * @param  {数组} numberArray
 * @param  {每组个数} size
 * @param  {选择类型} lianMaRule
 */
function createLianMaDobet (numberArray, size, lianMaRule) {
  let selectedRule
  if (lianMaRule.length > 1) {
    lianMaRule.sort((a, b) => { // 升序排序
      return a.odds - b.odds
    })
  }
  selectedRule = lianMaRule[0]

  let newList = []
  groupSplit(numberArray, size).forEach(itemArray => { // 分组，以size个号码为一组。然后循环组装注单
    // 拼接组装号码
    let project = '' // 组合号码
    itemArray.forEach(num => {
      project += num + '_'
    })
    project = project.substring(0, project.length - 1) // 去除最后一个字符
    let odds = selectedRule.odds // 后端传来的对应赔率
    let label = project.replace(/_/g, ',') + '-' + odds

    // 组装注单
    let item = {
      'typeName': selectedRule.typeName,
      'project': project,
      'odds': selectedRule.odds,
      'typeId': selectedRule.typeId,
      'label': label
    }
    newList.push(item)
  })
  return newList
}
/** ****************************************************** 连码 end ********************************************************/
