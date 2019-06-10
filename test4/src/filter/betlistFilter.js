
/**
 * title 时时彩玩法的名称
 * rtype 玩法的rtype_id
 * list 原始数组
 */
export function sscFilter (title, rtype, list) {
  let newlist = []
  newlist = titlelist(title, list, newlist)
  let obj = longhulist(list)
  newlist.push(obj)
  return newlist
}

function titlelist (title, list, newlist) { // 返回对应的赔率（比如是万位，则找到name ==‘万位’ 的 0-9）
  let obj = {
    name: '球号'
  }
  let sencondObj = {
    name: '两面'
  }
  for (let i = 0; i < list.length; i++) {
    if (list[i].name === title) {
      obj['oddsList'] = list[i].oddsList.slice(0, 10)
      newlist.push(obj)
      sencondObj['oddsList'] = list[i].oddsList.slice(10, 16)
      newlist.push(sencondObj)
      return newlist
    }
  }
}

function longhulist (list) { // 返回龙虎斗的陪率
  for (let i = 0; i < list.length; i++) {
    if (list[i].name === '总和/龙虎') {
      return list[i]
    }
  }
}

/**
 * 快乐十分 赔率数组重新组合
 *  list 原始数组(第一球 到 第八球 的赔率数组 重新组合)
 */
export function klsfFilter (list) {
  let newlist = []
  newlist = klsftitle(list, newlist)
  return newlist
}
function klsftitle (list, newlist) {
  let obj = {
    name: '球号'
  }
  let sencondObj = {
    name: '两面'
  }
  for (let i = 0; i < list.length; i++) {
    obj['oddsList'] = list[i].oddsList.slice(0, 20)
    newlist.push(obj)
    sencondObj['oddsList'] = list[i].oddsList.slice(20, 35)
    newlist.push(sencondObj)
    return newlist
  }
}
/**
 * 快乐十分 连码
 */
export function klsflianmaFilter (list) {
  let newlist = list
  let obj = {
    name: '选择'
  }
  let oddslist = []
  for (let i = 0; i < 20; i++) {
    oddslist.push({
      project: i + 1
    })
  }
  obj['oddsList'] = oddslist
  newlist.push(obj)
  return newlist
}
/**
 * 十一选五连码
 */
export function syxwlianmaFilter (list) {
  let newlist = list
  let obj = {
    name: '选择'
  }
  let oddslist = []
  for (let i = 0; i < 11; i++) {
    oddslist.push({
      project: i + 1
    })
  }
  obj['oddsList'] = oddslist
  newlist.push(obj)
  return newlist
}

/**
 * 十一选五 直选
 * @param {*} list
 */
export function syxwzhixuanFilter (list) {
  let newlist = []
  newlist.push(list[0])
  newlist[0].oddsList.push(list[1].oddsList[0])

  for (let k = 0; k < 3; k++) {
    let oddsList = []
    for (let i = 0; i < 11; i++) {
      oddsList.push({
        project: i + 1,
        typeName: k + 1
      })
    }
    let obj = {
      name: '第' + (k + 1) + '球'
    }
    obj['oddsList'] = oddsList
    newlist.push(obj)
  }
  return newlist
}

/**
 * 对PCDD 数组重新排列  混合 --> 波色 --> 豹子 --> 特码 -->  特码三包
 * @param {*后台传过来的原始数组} list
 */
export function pcddFilter (list) {
  let newlist = []
  for (let i = 0; i < list.length; i++) {
    if (list[i].name === '特码') {
      newlist[3] = list[i]
    } else if (list[i].name === '特码包三') {
      newlist[4] = list[i]
    } else if (list[i].name === '混合') {
      newlist[0] = list[i]
    } else if (list[i].name === '波色') {
      newlist[1] = list[i]
    } else if (list[i].name === '豹子') {
      newlist[2] = list[i]
    }
  }
  return newlist
}

/**
 * 六合彩 连码 自选不中
 */
export function lhclianmaFilter (list) {
  let newlist = Object.assign([], list) // 复制对象
  let obj = {
    name: '选择号码'
  }
  let oddslist = []
  for (let i = 0; i < 49; i++) {
    oddslist.push({
      project: padNumber(i + 1)
    })
  }
  obj['oddsList'] = oddslist
  newlist.push(obj)
  return newlist
}

/**
 * 返回两位数字，一位数字前补0
 * @param {需要补0的数字} num
 */
function padNumber (num) {
  let str = '0' + num
  return str.substring(str.length - 2, str.length)
}
