/**
 *判断组三，组六是否满足选择条件
 * @param {*组三，组六数组} list
 */
export function isSureByZuSanZuLiu (nowModel, prelist, midlist, afterlist) {
  if (nowModel === 2391000) { // 组三
    if (prelist.length === 0 && midlist.length === 0 && afterlist.length === 0) {
      window.layer.msgWarn('请选择投注')
      return false
    }
    if (prelist.length > 0 && prelist.length < 5) {
      window.layer.msgWarn('请在前三：挑选5~10个号码')
      return false
    }
    if (midlist.length > 0 && midlist.length < 5) {
      window.layer.msgWarn('请在中三：挑选5~10个号码')
      return false
    }
    if (afterlist.length > 0 && afterlist.length < 5) {
      window.layer.msgWarn('请在后三：挑选5~10个号码')
      return false
    }
    return true
  } else if (nowModel === 2392000) { // 组六
    if (prelist.length === 0 && midlist.length === 0 && afterlist.length === 0) {
      window.layer.msgWarn('请选择投注')
      return false
    }
    if ((prelist.length > 0 && prelist.length < 4) || prelist.length > 8) {
      window.layer.msgWarn('请在前三：挑选4~8个号码')
      return false
    }
    if ((midlist.length > 0 && midlist.length < 4) || midlist.length > 8) {
      window.layer.msgWarn('请在中三：挑选4~8个号码')
      return false
    }
    if ((afterlist.length > 0 && afterlist.length < 4) || afterlist.length > 8) {
      window.layer.msgWarn('请在后三：挑选4~8个号码')
      return false
    }
    return true
  } else {
    return true
  }
}

/**
 * 穿入前三，中三，后三的数据 进行重新组装
 * @param {*} prelist
 * @param {*} midlist
 * @param {*} afterlist
 */
export function newDobetList (nowModel, oddsObject, prelist, midlist, afterlist) {
  console.info('prelist:', prelist)
  console.info('midlist:', midlist)
  console.info('afterlist:', afterlist)
  let newlist = []
  let first = objectBylist(nowModel, prelist, nowModel === 2391000 ? oddsObject['2391010'] : oddsObject['2392010'])
  let second = objectBylist(nowModel, midlist, nowModel === 2391000 ? oddsObject['2391020'] : oddsObject['2392020'])
  let three = objectBylist(nowModel, afterlist, nowModel === 2391000 ? oddsObject['2391030'] : oddsObject['2392030'])
  if (prelist.length > 0) {
    newlist.push(first)
  }
  if (midlist.length > 0) {
    newlist.push(second)
  }
  if (afterlist.length > 0) {
    newlist.push(three)
  }
  return newlist
}

function objectBylist (nowModel, list, oddsList) {
  console.info('objectBylist')
  console.info(oddsList)
  let odds = 0
  for (let k = 0; k < oddsList.length; k++) {
    if (oddsList[k].project === list.length + '') {
      odds = oddsList[k].odds
      break
    }
  }
  if (list.length === 0) {
    return {}
  } else {
    let project = ''
    for (let i = 0; i < list.length; i++) {
      project += list[i].project + ','
    }
    project = project.substr(0, project.lastIndexOf(','))
    return {
      project: project,
      odds: odds,
      typeId: list[0].typeId,
      typeName: list[0].typeName + (nowModel === 2391000 ? '组选三' : '组选六')
    }
  }
}
