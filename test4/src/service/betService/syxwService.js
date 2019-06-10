import * as syxwfilter from '../../filter/syxwFilter'
import * as commonService from './commonService'

let match = syxwfilter.lianmaZhixuanMatch()
/**
 * 判断直选是否符合要求
 * @param {*直选中，选中的玩法} gitem
 * @param {*选中第一球的玩法} first
 * @param {*选中第二球的玩法} second
 * @param {*选中第三球的玩法} three
 */
export function isTrueByZhixuan (gitem, first, second, three) {
  if (gitem === null) {
    window.layer.msgWarn('当前您还没有选择投注项!')
    return false
  }
  // let min = match[gitem.project].qiu
  // let count = first.length + second.length + three.length
  if (!(first.length > 0 && second.length > 0) && gitem.typeId === 2110010) {
    window.layer.msgWarn('请在2球中至少各选择一个号码')
    return false
  } else if (!(first.length > 0 && second.length > 0 && three.length > 0) && gitem.typeId === 2110020) {
    window.layer.msgWarn('请在3球中至少各选择一个号码')
    return false
  }
  return true
}

/**
 *
 * @param {*连码选中的玩法} gitem
 * @param {*选中球的数组} list
 */
export function isTrueBylianma (gitem, list) {
  console.info('isTrueBylianma')
  if (gitem === null) {
    window.layer.msgWarn('当前您还没有选择投注项!')
    return false
  }
  let obj = match[gitem.project]
  if (list.length > obj.max || list.length < obj.min) {
    window.layer.msgWarn(`请在选择区至少选择${obj.min}个号码`)
    return false
  }
  return true
}

/**
 *连码，直选
 * @param {*连码，直选玩法} nowModel
 * @param {*子玩法玩法} gitem
 * @param {*连码球数组} list
 * @param {*第一球数组} first
 * @param {*第二球数组} second
 * @param {*第三球数组} three
 */
export function newDobetList (nowModel, gitem, list, first, second, three) {
  if (nowModel === 2100000) {
    let typeName = gitem.typeName + ' ' + gitem.project
    let obj = JSON.parse(JSON.stringify(gitem)) // 简单拷贝对象
    let project = ''

    for (let i = 0; i < list.length; i++) {
      project += list[i].project + ','
    }
    project = project.substr(0, project.lastIndexOf(','))
    let lianmaObj = match[gitem.project]
    // 连码封装组合，当选完后开始封装
    let lianmaCombination = commonService.combination(list, lianmaObj.min)
    if (lianmaCombination !== null) {
      obj.groupList = lianmaCombination
      obj.groupNum = lianmaCombination.length
    }
    obj['typeName'] = typeName
    obj['project'] = lianmaObj.flag + project
    obj['fullname'] = project
    console.info('obj:', obj)
    return [obj]
  } else if (nowModel === 2110000) {
    return newDobetzhixuanlist(gitem, first, second, three)
  }
}

function newDobetzhixuanlist (gitem, first, second, three) {
  let typeId = gitem.typeId
  let typeName = gitem.typeName
  if (typeId === 2110010) { // 表示前二直选
    let returnlist = []
    for (let i = 0; i < first.length; i++) {
      for (let j = 0; j < second.length; j++) {
        let obj = JSON.parse(JSON.stringify(gitem)) // 简单拷贝对象
        let project = ''
        project = first[i].project + ',' + second[j].project
        obj['typeName'] = typeName
        obj['project'] = project
        obj['fullname'] = typeName
        returnlist.push(obj)
      }
    }
    console.info('returnlist:', returnlist)
    return returnlist
  }
  if (typeId === 2110020) { // 表示前三直选
    let returnlist = []
    for (let i = 0; i < first.length; i++) {
      for (let j = 0; j < second.length; j++) {
        for (let k = 0; k < three.length; k++) {
          let obj = JSON.parse(JSON.stringify(gitem)) // 简单拷贝对象
          let project = ''
          project = first[i].project + ',' + second[j].project + ',' + three[k].project
          obj['typeName'] = typeName
          obj['project'] = project
          obj['fullname'] = typeName
          returnlist.push(obj)
        }
      }
    }
    console.info('returnlist:', returnlist)
    return returnlist
  }
}
