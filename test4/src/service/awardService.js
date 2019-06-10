// 获取从今天开始往前移的指定天数内日期
export function getBetweenDays (betweenDays) {
  for (var a = [], i = 0; i >= -betweenDays; i--) {
    a.push(GetDateStr(i))
  }
  return a
}
  // 拼装日期格式
export function GetDateStr (AddDayCount) {
  var dd = new Date()
  dd.setDate(dd.getDate() + AddDayCount)// 获取AddDayCount天后的日期
  var y = dd.getFullYear()
  var m = dd.getMonth() + 1// 获取当前月份的日期
  var d = dd.getDate()
  if (m < 10) { m = '0' + m }
  if (d < 10) { d = '0' + d }
  return y + '-' + m + '-' + d
}
  // 开奖结果页面处理公共方法，自动计算各种玩法的开奖结果
export function outputAwardResult (openNum, playType) {
  var sum = parseInt(openNum.perRank[0])
  if (playType === '大小') {
    if (sum > 30) {
      return '<font color="#e61300">大</font>'
    } else if (sum === 30) {
      return '<font  color="#FFCC00">和</font>'
    } else if (sum < 30) {
      return '<font  color="#2400fc">小</font>'
    }
  } else if (playType === '单双') {
    if (sum % 2 === 0) {
      return '<font  color="#2400fc">双</font>'
    } else {
      return '<font  color="#e61300">单</font>'
    }
  } else if (playType === '尾大小') {
    if (parseInt(openNum.perRank[0].substr(openNum.perRank[0].length - 1, 1)) >= 5) {
      return '<font  color="#2400fc">尾大</font>'
    } else if (parseInt(openNum.perRank[0].substr(openNum.perRank[0].length - 1, 1)) <= 4) {
      return '<font  color="#009024">尾小</font>'
    }
  } else if (playType === '龙虎') {
    if (parseInt(openNum.perRank[1]) > parseInt(openNum.perRank[5])) {
      return '<font  color="red">龙</font>'
    } else if (parseInt(openNum.perRank[1]) < parseInt(openNum.perRank[5])) {
      return '<font  color="#b448d8">虎</font>'
    }
  }
}
  // ssc梭哈玩法結果計算
export function getPokerRes (countRep, countAdj) {
  switch (countRep) {
    case 10:
      return "<font color='red'>豹子</font>"
    case 6:
      return "<font color='green'>四张</font>"
    case 4:
      return "<font color='green'>葫芦</font>"
    case 3:
      return "<font color='green'>三张</font>"
    case 2:
      return "<font color='green'>两对</font>"
    case 1:
      return "<font color='green'>一对</font>"
    default:
      switch (countAdj) {
        case 4:
          return "<font color='black'>顺子</font>"
        case 1:
        case 2:
        case 3:
          return "<font color='blue'>杂牌</font>"
        default:
          return "<font color='blue'>五离</font>"
      }
  }
}
  // ssc三公玩法结果计算
export function getHhMaleRes (banker, player) {
  var resBak = "<font color='blue'>左闲</font>"
  var resPla = "<font color='red'>右闲</font>"
  var resDraw = "<font color='green'>和</font>"
  if (banker > player) { return resBak } else if (banker === player) { return resDraw } else { return resPla }
}
  // ssc百家乐玩法结果计算
export function getBacRes (banker, player) {
  var resBak = "<font color='red'>庄</font>"
  var resPla = "<font color='blue'>闲</font>"
  var resDraw = "<font color='green'>和</font>"
  if (banker > player) { return resBak } else if (banker === player) { return resDraw } else { return resPla }
}

  // 龙虎玩结果计算
export function getDraTigRes (banker, player) {
  var resBak = "<font color='red'>龙</font>"
  var resPla = "<font color='blue'>虎</font>"
  var resDraw = "<font color='green'>和</font>"
  if (banker > player) { return resBak } else if (banker === player) { return resDraw } else { return resPla }
}
  // 牛牛
export function cattle (VueNumArr) {
  for (var i = 0; i <= 2; i++) {
    for (var j = i + 1; j <= 3; j++) {
      for (var k = j + 1; k <= 4; k++) {
        if ((VueNumArr[i] + VueNumArr[j] + VueNumArr[k]) % 10 === 0) {
          return getCattleRes(VueNumArr, i, j, k)
        }
      }
    }
  }
  return "<font color='green'>无点</font>"
}
  // 百家乐结果计算
export function getCattleRes (VueNumArr, i, j, k) {
  var resNum = 0
  for (var m = 0; m < VueNumArr.length; m++) {
    if (m !== j && m !== k && m !== i) {
      resNum += VueNumArr[m]
    }
  }
  resNum %= 10
  var addCol = resNum > 5 ? "<font color='red'>牛" + resNum + '</font>' : "<font color='blue'>牛" + resNum + '</font>'
  return resNum === 0 ? "<font color='red'>牛牛</font>" : addCol
}

export function bac (VueNumArr) {
  let banker = (parseInt(VueNumArr[0] + VueNumArr[1])) % 10 // 庄家
  let player = (parseInt(VueNumArr[3] + VueNumArr[4])) % 10 // 闲家
  let player3 = 0
  let banker3 = 0
  if ((banker >= 8 || player >= 8) || (banker >= 6 && player >= 6)) { // 有一个天生赢家或者两个都大等于6(庄闲都不补)
    return getBacRes(banker, player)
  }
  player3 = (VueNumArr[2] + VueNumArr[4]) % 10// 第五张
  banker3 = (VueNumArr[2] + VueNumArr[0]) % 10 // 第六张
  if (player >= 6) { // 闲不补，庄补
    banker = (banker + player3) % 10
    return getBacRes(banker, player)
  } else {  // 闲补
    player = (player + player3) % 10
    if (banker <= 2) {
      banker = (banker + banker3) % 10
      return getBacRes(banker, player)
    }
    switch (banker) {
      case 3:
        if (player3 !== 8) {
          banker = (banker + banker3) % 10
        }
        break
      case 4:
        if (player3 !== 0 && player3 !== 1 && player3 !== 8 && player3 !== 9) {
          banker = (banker + banker3) % 10
        }
        break
      case 5:
        if (player3 !== 0 && player3 !== 1 && player3 !== 8 && player3 !== 9 && player3 !== 2 && player3 !== 3) {
          banker = (banker + banker3) % 10
        }
        break
      case 6:
        if (player3 !== 0 && player3 !== 1 && player3 !== 8 && player3 !== 9 &&
                        player3 !== 2 && player3 !== 3 && player3 !== 4 && player3 !== 5) {
          banker = (banker + banker3) % 10
        }
        break
      default:
        break
    }
    return getBacRes(banker, player)
  }
}

  /**
     * 龙虎
     * @param VueNumArr
     */
export function draTig (VueNumArr) {
  return getDraTigRes(VueNumArr[0], VueNumArr[4])
}

  /**
     * 三公
     * @param VueNumArr
     */
export function thMale (VueNumArr) {
  let left = (VueNumArr[0] + VueNumArr[1] + VueNumArr[2]) % 10
  let right = (VueNumArr[3] + VueNumArr[4] + VueNumArr[2]) % 10
  if (left === 0) { left = 10 }
  if (right === 0) { right = 10 }
  return getHhMaleRes(left, right)
}

  /**
   * 梭哈
   * @param VueNumArr
   */
export function poker (VueNumArr) {
  var countRep = 0  // 计算重复
  var countAdj = 0 // 计算相邻
  for (var i = 0; i < VueNumArr.length - 1; i++) {
    for (var j = i + 1; j < VueNumArr.length; j++) {
      if (VueNumArr[i] === VueNumArr[j]) { countRep++ } else {
        if ((VueNumArr[i] + 1) % 10 === VueNumArr[j] || (VueNumArr[j] + 1) % 10 === VueNumArr[i]) { countAdj++ }
      }
    }
  }
  return getPokerRes(countRep, countAdj)
}

export function getPeriod (period, isShort, l3) { // 期号格式化
  if (!period) return ''
  if (isShort === 'lhc' || l3 === '24') {
    if (period.length <= 14) {
          // 六合彩返回3位
      return period.substr(-3)
    } else {
      return period.substr(-4)
    }
  }
  if (period.length >= 14) {
    if (isShort) {
      return period.substr(11, period.length - 11)
    } else return period.substr(3, 8) + '-' + period.substr(11, 3)
  } else {
    return period
  }
}

export function getKl8Period (openNum, playType) {
  var sum = parseInt(openNum.perRank[0])
  if (playType === '总大小') {
    if (sum >= 801) {
      return '大'
    } else {
      return '小'
    }
  } else if (playType === '总单双') {
    if (sum % 2 === 1) {
      return '单'
    } else {
      return '双'
    }
  } else if (playType === '大小单双') {
    if (sum >= 801) {
      if (sum % 2 === 1) {
        return '大单'
      } else {
        return '大双'
      }
    } else {
      if (sum % 2 === 1) {
        return '小单'
      } else {
        return '小双'
      }
    }
  } else if (playType === '前后') {
    var sumNum = 0
    var qianduo = 0
    var danduo = 0
    var houduo = 0
    var shuangduo = 0
    for (var k = 0; k < openNum.perRank.length; k++) {
      sumNum = parseInt(openNum.perRank[k]) + sumNum
      if (parseInt(openNum.perRank[k]) > 40) {
        houduo++
      } else {
        qianduo = qianduo + 1
      }
      if (parseInt(openNum.perRank[k]) % 2 === 0) {
        shuangduo = shuangduo + 1
      } else {
        danduo = danduo + 1
      }
    }
    return qianduo > houduo ? '前' : qianduo === houduo ? '和' : '后'
  } else if (playType === '五行') {
    if (sum < 210) {
      return '--'
    } if (sum < 696) {
      return '金'
    } else if (sum < 764) {
      return '木'
    } else if (sum < 856) {
      return '水'
    } else if (sum < 924) {
      return '火'
    } else if (sum < 1410) {
      return '土'
    } else {
      return '--'
    }
  }
}

export function getLHCPeriodForSX (openNum) {
  // var animals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']
  // var index = (openNum - 1) % 12
  // var current = (12 + getZodiacIndex('鸡') - index) % 12
  // return animals[current]
  return getZodiacByNumber(openNum)
}

export function getZodiacIndex (zodiac) {
  if (!zodiac) { // zodiac no data
    zodiac = '鸡'
  }
  var animalsIndex = {
    '鼠': 0,
    '牛': 1,
    '虎': 2,
    '兔': 3,
    '龙': 4,
    '蛇': 5,
    '马': 6,
    '羊': 7,
    '猴': 8,
    '鸡': 9,
    '狗': 10,
    '猪': 11
  }
  return animalsIndex[zodiac]
}
  // 广东 快乐十分中发白
export function getZFB (num) {
  var text = ''
  switch (num) {
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
      text = "<font color='#CD6090'>中</font>"
      break
    case 8:
    case 9:
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
      text = "<font color='blue'>发</font>"
      break
    case 15:
    case 16:
    case 17:
    case 18:
    case 19:
    case 20:
      text = "<font color='#43CD80'>白</font>"
      break
  }
  return text
}
    // 广东 快乐十分方位
export function getFW (num) {
  var text = ''
  switch (num) {
    case 1:
    case 5:
    case 9:
    case 13:
    case 17:
      text = "<font color='#CD661D'>东</font>"
      break
    case 2:
    case 6:
    case 10:
    case 14:
    case 18:
      text = "<font color='#3A5FCD'>南</font>"
      break
    case 3:
    case 7:
    case 11:
    case 15:
    case 19:
      text = "<font color='#9932CC'>西</font>"
      break
    case 4:
    case 8:
    case 12:
    case 16:
    case 20:
      text = "<font color='#CD6090'>北</font>"
      break
  }
  return text
}

export function getZongSize (numArr) {
  var text = ''
  var total = 0
  for (let i = 0; i < numArr.length; i++) {
    total += numArr[i]
  }
  if (total <= 83) {
    text = "<font color='#2400fc'>小</font>"
  } else if (total === 84) {
    text = "<font color='#FFCC00'>和</font>"
  } else if (total > 84) {
    text = "<font color='#e61300'>大</font>"
  }
  return text
}
export function getZongFirstsd (numArr) {
  var text = ''
  var total = 0
  for (let i = 0; i < numArr.length; i++) {
    total += numArr[i]
  }
  if (total % 2 === 0) {
    text = "<font color='#2400fc'>双</font>"
  } else {
    text = "<font color='#e61300'>单</font>"
  }
  return text
}
export function getZongWeiDaXiao (numArr) {
  var text = ''
  var total = 0
  for (let i = 0; i < numArr.length; i++) {
    total += numArr[i]
  }
  if ((total % 10) >= 5) {
    text = "<font color='#e61300'>尾大</font>"
  } else {
    text = "<font color='#2400fc'>尾小</font>"
  }
  return text
}

export function getZongLonghu (numArr) {
  var text = ''
  var num1 = parseInt(numArr[0])
  var num8 = parseInt(numArr[7])
  if (num1 > num8) {
    text = "<font color='#b448d8'>龙</font>"
  } else {
    text = "<font color='red'>虎</font>"
  }
  return text
}

  /**
   * 用于各种彩票的显示方式 by karl
   * num:参数
   * showType:彩球展示方法
   * index:第几位
   * title:标题玩法
   * numArr:当是百家乐时其他处理
   * lotteryId:当前彩票id
   * zodiacYear:开奖结果的当年生肖
   */
export function getNumShowType (num, showType, index, numArr, title, lotteryId, zodiacYear) {
  num = parseInt(num)
  let text = num
  if (showType === 'num') {
    text = num
  } else if (showType === 'sizeBjsc') {
    if (num <= 5) {
      text = "<i class='ball-c ball-c-xs pk10-ball-small'>小</i>"
    } else {
      text = "<i class='ball-c ball-c-xs pk10-ball-big'>大</i>"
    }
  } else if (showType === 'sizeCqssc') {
    if (num <= 4) {
      text = "<font color='#009024'>小</font>"
    } else {
      text = "<font color='#2400fc'>大</font>"
    }
  } else if (showType === 'sizeGdklsf') {
    if (num <= 10) {
      text = "<font color='#2400fc'>小</font>"
                // 修改颜色   text = "<font color='#2400C8'>小</font>";
                // #2400C8
    } else {
      text = "<font color='#e61300'>大</font>"
                // 修改颜色  text = "<font color='#2400fc'>大</font>";
    }
  } else if (showType === 'sizeLhc') {
    if (num === 49) {
      text = "<font color='#008000'>和</font>"
    } else if (num > 24) {
      text = "<font color='#e61300'>大</font>"
    } else if (num < 25) {
      text = "<font color='#2400fc'>小</font>"
    }
  } else if (showType === 'firstsd') {
    if (num === 49) {
      text = '和局'
    }
    if (num % 2 === 0) {
      text = "<i class='ball-c ball-c-xs pk10-ball-both'>双</i>"
    } else {
      text = "<i class='ball-c ball-c-xs pk10-ball-single'>单</i>"
    }
  } else if (showType === 'firstsdLhc') {
    if (num === 49) {
      text = "<font color='#008000'>和</font>"
    } else if (num % 2 === 0) {
      text = "<font color='#2400fc'>双</font>"
    } else {
      text = "<font class='red'>单</font>"
                // 修改颜色  text = "<font color='#2400fc'>单</font>";
    }
  } else if (showType === 'combine') {
    if (num === 0 || num === 4 || num === 6 || num === 8 || num === 9) {
      text = "<font color='red'>合</font>"
    } else {
      text = "<font color='#b448d8'>质</font>"
    }
  } else if (showType === 'chess') {
    if (title === '百家乐') {
      text = bac(numArr) // 百家乐
    } else if (title === '三公') {
      text = thMale(numArr) // 三公
    } else if (title === '龙虎') {
      text = draTig(numArr) // 龙虎
    } else if (title === '牛牛') {
      text = cattle(numArr) // 牛牛
    } else if (title === '梭哈') {
      text = poker(numArr) // 梭哈
    }
  } else if (showType === 'zfb') {
    text = getZFB(num)
  } else if (showType === 'fw') {
    text = getFW(num)
  } else if (showType === 'zong') {
    if (title === '大小') {
      text = getZongSize(numArr)
    } else if (title === '单双') {
      text = getZongFirstsd(numArr)
    } else if (title === '尾大小') {
      text = getZongWeiDaXiao(numArr)
    } else if (title === '龙虎') {
      text = getZongLonghu(numArr)
    }
  } else if (showType === 'zodiac') {
    text = getZodiac(num, index, lotteryId, zodiacYear)
  }
  return text
}

export function getcolor (index) { // 获得彩球class
  if (index * 1 === 0 || index * 1 === 27 || index * 1 === 13 || index * 1 === 14) {
    return 'ball-c1'
  } else if (index % 3 === 0) {
    return 'ball-c4'
  } else if (index % 3 === 1) {
    return 'ball-c2'
  } else {
    return 'ball-c3'
  }
}
export function getInteger (index) {
  let array = []
  for (let i = 0; i < index.length; i++) {
    array.push(parseInt(index[i]))
  }
  return array
}
  /**
  * 动态获取开奖html
  * numArr:球的值
  * lotteryStr:彩票的值
  * VueArr:彩球的类型
  * sumNum:球的集合
  * number:序号
  * lotteryId:彩票Id
  * totalSum:总和
  * zodiacYear:六合彩开奖结果的当年生肖
  */
export function getAwardHtml (numArr, lotteryStr, showType, sumNum, number, lotteryId, totalSum, zodiacYear) {
  if (!lotteryStr) return ''
  let VueDataHtml = ''
  switch (lotteryStr) {
    case 'pk10':// pk10大类参数
      if (showType === 'number') {
        VueDataHtml += '<i class="ball-c pk10-ball-c' + numArr + '">' + numArr + '</i>'
      } else {
        VueDataHtml += getNumShowType(numArr, showType)
      }
      return VueDataHtml
    case 'ssc':// 时时彩大类参数
      if (!numArr) { // 只有选中总时进入处理
        if (showType === 'sizeCqssc') {
          var sizeHtml = ''
          if (sumNum >= 0 && sumNum <= 22) {
            sizeHtml = "<font color='#009024'><b>(小)</b></font>"
          } else {
            sizeHtml = "<font color='#2400fc'><b>(大)</b></font>"
          }
          VueDataHtml += '<span class="sscSum" ><i class="ball-blue">' + sumNum + '</i>' + sizeHtml + '</span>'
        } else {
          VueDataHtml += '<span class="sscSum"><i class="ball-blue">' + sumNum + '</i></span>'
        }
        return VueDataHtml
      }
        // 其他的处理
      var _chessTitleAwardArr = ['百家乐', '三公', '龙虎', '牛牛', '梭哈']
      if (showType === 'chess') {
        VueDataHtml += generSscNumHtml(numArr, showType, number, getInteger(sumNum), _chessTitleAwardArr[number])
      } else {
        VueDataHtml += generSscNumHtml(numArr, showType)
      }
      return VueDataHtml
    case 'mmc':// 秒秒彩大类参数
      if (!numArr) { // 只有总时进入处理
        if (showType === 'sizeCqssc') {
          var mmcHtml = ''
          if (sumNum >= 0 && sumNum <= 22) {
            mmcHtml = "<font color='#009024'><b>(小)</b></font>"
          } else {
            mmcHtml = "<font color='#2400fc'><b>(大)</b></font>"
          }
          VueDataHtml += '<span class="sscSum" ><i class="ball-blue">' + sumNum + '</i>' + mmcHtml + '</span>'
        } else {
          VueDataHtml += '<span class="sscSum"><i class="ball-blue">' + sumNum + '</i></span>'
        }
        return VueDataHtml
      }
        // 其他的处理
      var _chessMmcTitleAwardArr = ['百家乐', '三公', '龙虎', '牛牛', '梭哈']
      if (showType === 'chess') {
        VueDataHtml += generSscNumHtml(numArr, showType, number, getInteger(sumNum), _chessMmcTitleAwardArr[number])
      } else {
        VueDataHtml += generSscNumHtml(numArr, showType)
      }
      return VueDataHtml
    case 'klsf':// 快乐十分
      let ballClass = 'ball-blue'
      if (lotteryId === '13' || lotteryId === '73' || lotteryId === '74') { // 如果是幸运农场需要单独处理
        ballClass = 'ball-red'
      }
      if (!numArr) { // 只有总时进入处理
          // 转换成字符串,判断长度..
        if (sumNum >= 100) {
          VueDataHtml += '<span class="gdklsfTitleAward2"><i class="' + ballClass + ' font-little" style="font-size:10px">' + sumNum + '</i></span>'
        } else {
          VueDataHtml += '<span class="gdklsfTitleAward2"><i class="' + ballClass + '" >' + sumNum + '</i></span>'
        }
        return VueDataHtml
      }
      var _zongTitleAwardArr = ['大小', '单双', '尾大小', '龙虎']
      if (showType === 'zong') {
        if (number < 4) {
          VueDataHtml += generGdklsfNumHtml(numArr, showType, number, getInteger(sumNum), _zongTitleAwardArr[number])
        }
      } else {
        VueDataHtml += generGdklsfNumHtml(numArr, showType, null, null, null, lotteryId)
      }
      return VueDataHtml
    case 'k3':// 快3
      VueDataHtml += '<i class="ball-' + numArr + '"></i>'
      return VueDataHtml
    case 'x5':// 十一选5
      if (!numArr) { // 只有总时进入处理
        VueDataHtml += '<span><i class="ball-blue" >' + sumNum + '</i></span>'
      } else {
        var zongTitleAwardArr = ['大小', '单双', '尾大小', '龙虎']
        VueDataHtml += generX5NumHtml(numArr, showType, number, getInteger(sumNum), zongTitleAwardArr[number])
      }
      return VueDataHtml
    case 'ddcp':// 幸运28
      VueDataHtml += '<i class="ball-c ball-c-xs ball-c1">' + numArr + '</i>'
      if (number === 2) { // 当最后时增加单独总和处理
        VueDataHtml += '<span style="width: 60%;display: block;float: right;"><i style="float:left;margin-left:5px;">=</i><i class="ball-c ball-c-xs ' + getcolor(totalSum) + '">' + totalSum + '</i></span>'
      }
      return VueDataHtml
    case 'lhc':// 六合彩
      VueDataHtml += generLhcNumHtml(numArr, showType, number, getInteger(sumNum), null, lotteryId, null, zodiacYear)
      return VueDataHtml
    case 'bjkl8':// 北京快乐8
      if (showType === 'number') {
        if (number === 0) {
          var sumArr = [...sumNum].sort((a, b) => a - b)
          for (var i = 0; i < sumNum.length; i++) {
            VueDataHtml += generBjkl8NumHtml(numArr, showType, number, sumArr[i], null, i)
          }
        } else {
          return
        }
      } else {
        var qianduo = 0
        var danduo = 0
        var houduo = 0
        var shuangduo = 0

        if (number === 0) { // 总和
          VueDataHtml += '<span class="kl8TitleAward2"><font color="#2400fc">' + totalSum + '</font></span>'
        } else if (number === 1) { // 总大小
          VueDataHtml += '<span class="kl8TitleAward2">' +
                                (Number(totalSum) > 810 ? '<font color="red">大</font>' : Number(totalSum) === 810 ? '<font color="#2400fc">和</font>' : '<font color="#2400fc">小</font>') +
                             //   '<font color="red">' + (sumNum > 810 ? "大" : sumNum == 810 ? "和" : "小") + '</font>' +
                             '</span>'
        } else if (number === 2) { // 总单双
          VueDataHtml += '<span class="kl8TitleAward2">' +
                                 (Number(totalSum) % 2 === 0 ? '<font color="#2400fc">双</font>' : '<font color="red">单</font>') +

                             '</span>'
        } else if (number === 3) { // 大小单双
          var shownum = Number(totalSum) > 810 ? '大' : Number(totalSum) === 810 ? '--' : '小'
          if (Number(totalSum) !== 810) {
            shownum += (Number(totalSum) % 2 === 0 ? '双' : '单')
          }
          VueDataHtml += '<span class="kl8TitleAward2"><font colors="' + shownum + '">' + shownum + '</font></span>'
        } else if (number === 4) { // 前后
          for (var j = 0; j < sumNum.length; j++) {
            if (sumNum[j] > 40) {
              houduo++
            } else {
              qianduo++
            }
            if (sumNum[j] % 2 === 0) {
              shuangduo++
            } else {
              danduo++
            }
          }
          VueDataHtml += '<span class="kl8TitleAward2"><font colors="' + (qianduo > houduo ? '前' : qianduo === houduo ? '和' : '后') + '">' + (qianduo > houduo ? '前' : qianduo === houduo ? '和' : '后') + '</font></span>'
        } else if (number === 5) { // 单双
          for (var z = 0; z < sumNum.length; z++) {
            if (sumNum[z] > 40) {
              houduo++
            } else {
              qianduo++
            }
            if (sumNum[z] % 2 === 0) {
              shuangduo++
            } else {
              danduo++
            }
          }
          VueDataHtml += '<span class="kl8TitleAward2"><font colors="' + (danduo > shuangduo ? '单' : danduo === shuangduo ? '和' : '双') + '">' + (danduo > shuangduo ? '单' : danduo === shuangduo ? '和' : '双') + '</font></span>'
        } else if (number === 6) { // 五行
          if (totalSum < 210) { shownum = '--' }
          if (totalSum < 696) {
            shownum = '金'
          } else if (totalSum < 764) { shownum = '木' } else if (totalSum < 856) { shownum = '水' } else if (totalSum < 924) { shownum = '火' } else if (totalSum < 1410) { shownum = '土' } else { shownum = '--' }
          VueDataHtml += '<span class="kl8TitleAward2"><font color="' + shownum + '">' + shownum + '</font></span>'
        }
      }
      return VueDataHtml
    case 'gx10':
      if (!numArr) { // 只有总时进入处理
        VueDataHtml += '<span class="klsfSum" ><i class="ball-blue"  >' + sumNum + '</i></span>'
      } else {
        if (showType === 'zong') {
          var zongTitleAwardArrs = ['大小', '单双', '尾大小', '龙虎']
          VueDataHtml += generGxklsfNumHtml(numArr, showType, number, getInteger(sumNum), zongTitleAwardArrs[number], lotteryId, totalSum)
        } else {
          VueDataHtml = generGxklsfNumHtml(numArr, showType)
        }
      }
      return VueDataHtml
  }
}

  /**
    * 动态获取开奖html
    * numArr:号码
    * showType:球的类型
    * index:序号
    * sumNum:总和
    * number:序号
    */
export function generSscNumHtml (num, showType, index, sumNum, title) { // 时时彩彩球
  let html = ''
  if (showType === 'number') {
    html += '<span class="cqsscTitleAward2"><i class="ball-blue"  >' +
                getNumShowType(num, showType, index, sumNum, title) + '</i></span>'
            // var html = '<i class="blueBalls blueBs' + Vue + '" style="line-height: 36px;">' + Vue + '</i>';
  } else {
    html += '<span class="cqsscTitleAward2">' +
                getNumShowType(num, showType, index, sumNum, title) + '</span>'
  }
  return html
}

  /**
    * 动态获取开奖html
    * numArr:球的值
    * lotteryStr:彩票的值
    * VueArr:彩球的类型
    * sumNum:总和
    * number:序号
    * lotteryId:彩票Id
    */
export function generGdklsfNumHtml (num, showType, index, sumNum, title, lotteryId) { // 广东快乐十分彩球
  let html = ''
  if (showType === 'number') {
    if (lotteryId === '13' || lotteryId === '73' || lotteryId === '74') {       // ball-c fruit fruit12
                    //  console.info(num,'num--'); // 传入参数
      if (num > 21) {
        html += '<i class="ball-red fl" >' + getNumShowType(num, showType, index, sumNum, title) + '</i>'
      } else {
        html += '<i class="ball-c fruit fruit' + getNumShowType(num, showType, index, sumNum, title) + '" >' + '' + '</i>'
      }
    } else {
        // 转换成字符串,判断长度..
      if (sumNum >= 100) {
        html += '<span class="gdklsfTitleAward2"><i class="ball-blue font-little" style="font-size:10px" >' + num + '</i></span>'
      } else {
        html += '<span class="gdklsfTitleAward2"><i class="ball-blue" >' + num + '</i></span>'
      }
    }
  } else {
    html += '<span class="gdklsfTitleAward2">' + getNumShowType(num, showType, index, sumNum, title) + '</span>'
  }
  return html
}
export function x5Numdaxiao (num) {
  num = parseInt(num)
  if (num < 6) {
    return "<font color='#2400fc'>小</font>"
  } else if (num < 11) {
    return "<font color='#e61300'>大</font>"
  } else {
    return "<font color='green'>和</font>"
  }
}
export function x5Numdanshuang (num) {
  num = parseInt(num)
  if (num === 11) {
    return "<font color='green'>和</font>"
  } else if (num % 2 === 0) {
    return "<font color='#2400fc'>双</font>"
  } else {
    return "<font color='#e61300'>单</font>"
  }
}
export function x5Zongdaxiao (num, title, sumNum) {
  let html = ''
  let sum = sumNum[0] + sumNum[1] + sumNum[2] + sumNum[3] + sumNum[4]
  if (title === '大小') {
    html += '<span>' + (sum > 30 ? "<font color='#e61300'>大</font>" : sum === 30 ? "<font color='#FFCC00'>和</font>" : "<font color='#2400fc'>小</font>") + '</span>'
  } else if (title === '单双') {
    html += '<span>' + (sum % 2 === 0 ? "<font color='#2400fc'>双</font>" : "<font color='#e61300'>单</font>") + '</font></span>'
  } else if (title === '尾大小') {
    html += '<span>' + ((sum % 10) > 4 ? "<font color='#2400fc'>尾大</font>" : "<font color='#009024'>尾小</font>") + '</span>'
  } else if (title === '龙虎') {
    html += '<span>' + (sumNum[0] > sumNum[4] ? "<font color='red'>龙</font>" : "<font color='#b448d8'>虎</font>") + '</span>'
  }
  return html
}
  /**
    * 动态获取开奖html
    * numArr:球的值
    * lotteryStr:彩票的值
    * VueArr:彩球的类型
    * sumNum:总和数组
    * number:序号
    * lotteryId:彩票Id
    * totalNum:总和
    */
export function generX5NumHtml (num, showType, index, sumNum, title, lotteryId, totalNum) { // 十一选五彩球
  let html = ''
  var text = ''
  if (showType === 'zong') {
    html = x5Zongdaxiao(num, title, sumNum)
  } else {
    if (showType === 'number') {
      text = "<i class='ball-blue'>" + getNumShowType(num, showType, index, sumNum, title) + '</i>'
    } else if (showType === 'AB') {
      text = x5Numdaxiao(num)
    } else if (showType === 'CD') {
      text = x5Numdanshuang(num)
    }
    html += '<span>' + text + '</span>'
  }

  return html
}
export function lhcClass (num) {
  var nums = parseInt(num)
  var cls = 'bColorR'

  switch (nums) {
    case 1:
    case 2:
    case 7:
    case 8:
    case 12:
    case 13:
    case 18:
    case 19:
    case 23:
    case 24:
    case 29:
    case 30:
    case 34:
    case 35:
    case 40:
    case 45:
    case 46:
      cls = 'bColorR'
      break
    case 3:
    case 4:
    case 9:
    case 10:
    case 14:
    case 15:
    case 20:
    case 25:
    case 26:
    case 31:
    case 36:
    case 37:
    case 41:
    case 42:
    case 47:
    case 48:
      cls = 'bColorB'
      break
    case '+':
      cls = 'bColorEm'
      break
    default:
      cls = 'bColorG'
      break
  }
  return cls
}
export function getZodiacOfNumbers (number, lotteryId, zodiacYear) {
  return getZodiacByNumber(number, zodiacYear)
}
export function generLhcNumHtml (num, showType, index, sumNum, title, lotteryId, totalNum, zodiacYear) { // 六合彩彩球
  var colorAm = {
     //   鼠虎兔龙蛇猴在生肖中绿色字体，牛马羊鸡狗猪在生肖中为红色字体
    '牛': 'red',
    '兔': 'blue',
    '蛇': 'blue',
    '羊': 'red',
    '鸡': 'red',
    '猪': 'red',
    '虎': 'blue',
    '龙': 'blue',
    '马': 'red',
    '猴': 'blue',
    '狗': 'red',
    '鼠': 'blue'
  }
  var VueDataHtml = ''
  if (showType === 'number') {
    if (index === 6) {
      VueDataHtml += '<span class="lhcTitleAward morewidth">'
      VueDataHtml += '+'
    } else {
      VueDataHtml += '<span class="lhcTitleAward">'
    }

    VueDataHtml += '<i class="' + lhcClass(num) + ' lhball' + index + '" >'
    VueDataHtml += +getNumShowType(num, showType, null, null, null, lotteryId, zodiacYear)
    VueDataHtml += '</i>'

    if (index === 6) {
      VueDataHtml += getZodiacOfNumbers(num, lotteryId, zodiacYear)
    }

    VueDataHtml += '</span>'
  } else {
    VueDataHtml += '<span class="lhcTitleAward ' + colorAm[getNumShowType(num, showType, index, null, null, lotteryId, zodiacYear)] + '">' + getNumShowType(num, showType, index, null, null, lotteryId, zodiacYear) + '</span>'
  }
  return VueDataHtml
}

export function getZodiac (num, history, lotteryId, zodiacYear) {
  return getZodiacOfNumbers(num + '', lotteryId, zodiacYear)
}

export function generBjkl8NumHtml (num, showType, index, numArr, title, $index) {
  var html = ''
  if (showType === 'number') {
    if (getNumShowType(numArr, showType, index, numArr, title) < 41) {
      var __num = getNumShowType(numArr, showType, index, numArr, title) < 10 ? ('0' + getNumShowType(numArr, showType, index, numArr, title)) : getNumShowType(numArr, showType, index, numArr, title)
      if ($index * 1 === 10) {
        html += '<br>'
      }
      html += '<span class="kl8TitleAward"><i class="babyblueball-sm">' + __num + '</i></span>'
    } else {
      if ($index * 1 === 10) {
        html += '<br>'
      }
      html += '<span class="kl8TitleAward"><i class="blueball-sm">' + getNumShowType(numArr, showType, index, numArr, title) + '</i></span>'
    }
  } else {
    html += '<span class="kl8TitleAward">' + getNumShowType(num, showType, index, numArr, title) + '</span>'
  }
  return html
}

export function gxklsfNumbs (num) {
  if (num % 3 === 1) {
    return "<font color='#CD6090'>红</font>"
  } else if (num % 3 === 2) {
    return "<font color='blue'>蓝</font>"
  } else {
    return "<font color='#43CD80'>绿</font>"
  }
}
export function gxklsfNumflsx (num) {
  if (num === 21) {
    return "<font color='#FFCC00'>和</font>"
  } else if (num < 6) {
    return "<font color='#CD661D'>福</font>"
  } else if (num < 11) {
    return "<font color='#3A5FCD'>禄</font>"
  } else if (num < 16) {
    return "<font color='#3A5FCD'>寿</font>"
  } else if (num < 21) {
    return "<font color='#9932CC'>喜</font>"
  }
}
export function gxklsfNumdaxiao (num) {
  if (num < 11) {
    return "<font colors='小'>小</font>"
  } else if (num < 21) {
    return "<font colors='大'>大</font>"
  } else {
    return "<font colors='和'>和</font>"
  }
}
export function gxklsfNumdanshuang (num) {
  if (num === 21) {
    return "<font colors='和'>和</font>"
  } else if (num % 2 === 0) {
    return "<font colors='双'>双</font>"
  } else {
    return "<font colors='单'>单</font>"
  }
}
export function gxklsfZongdaxiao (num, showType, index, numArr, title, lotteryId, totalNum) {
  totalNum = parseInt(totalNum)
  var VueDataHtml = ''
  if (index === 0) {
    VueDataHtml += '<span class="gxklsfTitleAward2">' + (totalNum > 55 ? "<font colors='大'>大</font>" : totalNum === 55 ? "<font colors='和'>和</font>" : "<font colors='小'>小</font>") + '</span>'
  } else if (index === 1) {
    VueDataHtml += '<span class="gxklsfTitleAward2">' + (totalNum % 2 === 0 ? "<font colors='双'>双</font>" : "<font colors='单'>单</font>") + '</font></span>'
  } else if (index === 2) {
    VueDataHtml += '<span class="gxklsfTitleAward2">' + ((totalNum % 10) > 4 ? "<font colors='尾大'>尾大</font>" : "<font colors='尾小'>尾小</font>") + '</span>'
  } else if (index === 3) {
    VueDataHtml += '<span class="gxklsfTitleAward2">' + (numArr[0] > numArr[4] ? "<font color='red'>龙</font>" : "<font color='#b448d8'>虎</font>") + '</span>'
  }
  return VueDataHtml
}
export function generGxklsfNumHtml (num, showType, index, numArr, title, lotteryId, totalNum) {
  num = parseInt(num)

  var text = ''
  var VueDataHtml = ''
  if (showType === 'number') {
    text = "<i class='" + (num % 3 === 1 ? 'ball-red' : num % 3 === 2 ? 'ball-blue  ' : 'ball-green ') + " '>" + getNumShowType(num, showType, index, numArr, title) + '</i>'
  } else if (showType === 'AB') {
    text = gxklsfNumdaxiao(num)
  } else if (showType === 'CD') {
    text = gxklsfNumdanshuang(num)
  } else if (showType === 'FLSX') {
    text = gxklsfNumflsx(num)
  } else if (showType === 'BS') {
    text = gxklsfNumbs(num)
  } else if (showType === 'zong') {
    text = gxklsfZongdaxiao(num, showType, index, numArr, title, lotteryId, totalNum)
    return text
  }
  VueDataHtml += '<span class="gxklsfTitleAward2">' + text + '</span>'
  return VueDataHtml
}

/** ****************************************************** 公共方法和变量 start ********************************************************/
const animals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']

/**
 * 根据生肖获取所有号码
 */
function getAllNumbersOfZodiac (zodiac) {
  let result = ['', '', '', '', '', '', '', '', '', '', '', '']
  let tYearIndex = 0// 当年生肖的索引
  let curIndex = 0
  for (let i = 0; i < animals.length; i++) {
    if (zodiac === animals[i]) {
      tYearIndex = i + 1
      break
    }
  }
  for (let i = 1; i <= 49; i++) {
    curIndex = (12 - (i % 12) + 1 + tYearIndex) % 12
    if (curIndex === 0) {
      curIndex = 12
    }
    let j = i
    if (i < 10) {
      j = '0' + i
    }
    result[curIndex - 1] = result[curIndex - 1] + j + ','
  }
  return result
}

/**
 * 根据号码获取对应生肖
 * @param {号码} num
 */
export function getZodiacByNumber (num, zodiacYear) {
  if (!zodiacYear) {
    console.error('没有获取到开奖结果的当年生肖！', zodiacYear)
  }
  if (parseInt(num) < 10 && num.length === 1) {
    num = '0' + num
  }
  let numArray = getAllNumbersOfZodiac(zodiacYear)
  for (let i in numArray) {
    if (numArray[i].indexOf(num) >= 0) {
      return animals[i]
    }
  }
}
/** ****************************************************** 公共方法和变量 end ********************************************************/
