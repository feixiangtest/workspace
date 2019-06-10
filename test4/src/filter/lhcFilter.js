/** ****************************************************** 公共方法和变量 start ********************************************************/
const projectArray = ['二肖连', '三肖连', '四肖连', '五肖连', '二尾碰', '三尾碰', '四尾碰', '五尾碰']
const speNum = ['正码一', '正码二', '正码三', '正码四', '正码五', '正码六']
const animals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']
let currentZodiac = JSON.parse(localStorage.getItem('currentZodiac'))// 当年生肖

/**
 * 更新全局变量：当年生肖
 * @param {*当前生肖} zodiac
 */
export function updateCurrentZodiac (zodiac) {
  currentZodiac = zodiac
}

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
 * 根据年份获取生肖的号码
 */
function getNumbersOfZodiac (zodiac) {
  console.info('currentZodiac:', currentZodiac)
  let nums = getAllNumbersOfZodiac(currentZodiac)
  let index = findIndex(zodiac)
  let s = nums[index]
  if (s && s !== '') {
    return s.substring(0, s.length - 1)
  }
  return ''
}

/**
 * 获取生肖的排序号
 * @param {生肖} zodiac
 */
function findIndex (zodiac) {
  let index = 0
  for (let z in animals) {
    if (animals[z] === zodiac) {
      index = z
      break
    }
  }
  return index
}

/**
 * 获取尾数
 * @param {尾号} num
 */
function getMantissa (num) {
  num = parseInt(num)
  switch (num) {
    case 0:
      return '10,20,30,40'
    case 1:
      return '01,11,21,31,41'
    case 2:
      return '02,12,22,32,42'
    case 3:
      return '03,13,23,33,43'
    case 4:
      return '04,14,24,34,44'
    case 5:
      return '05,15,25,35,45'
    case 6:
      return '06,16,26,36,46'
    case 7:
      return '07,17,27,37,47'
    case 8:
      return '08,18,28,38,48'
    case 9:
      return '09,19,29,39,49'
  }
}
/** ****************************************************** 公共方法和变量 end ********************************************************/

/** ****************************************************** 号码颜色匹配 start ********************************************************/
/**
 *
 * @param {*根据数字匹配颜色} number
 */
export function colorFilter (number) {
  let i = Number(number)
  switch (i) {
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
      return 'bColorR'
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
      return 'bColorB'
    default:
      return 'bColorG'
  }
}
/** ****************************************************** 号码颜色匹配 end ********************************************************/

/** ****************************************************** 根据不同玩法，组装展示数据 start ********************************************************/
/**
 * 六合彩 连肖
 * @param {*后台传过来的原始数组} list
 * @param {*选择类型} selectedRule
 */
export function lhcLianXiaoFilter (list, selectedRule) {
  console.info('list:', list)
  console.log('hhh')
  let oddsArray = [] // 赔率
  switch (selectedRule.typeId) { // 判断连码中的选择类型
    case 0: // 二肖连
      list[0].oddsList.forEach(function (item) { // 循环取出赔率
        if (item.typeId === 2490041) { // 二肖连赔率
          let zodiac = item.project // 生肖
          oddsArray[zodiac] = item // 根据生肖保存赔率到数组中
        }
      })
      break
    case 1: // 三肖连
      list[0].oddsList.forEach(function (item) { // 循环取出赔率
        if (item.typeId === 2490042) { // 三肖连赔率
          let zodiac = item.project // 生肖
          oddsArray[zodiac] = item // 根据生肖保存赔率到数组中
        }
      })
      break
    case 2: // 四肖连
      list[0].oddsList.forEach(function (item) { // 循环取出赔率
        if (item.typeId === 2490043) { // 四肖连赔率
          let zodiac = item.project // 生肖
          oddsArray[zodiac] = item // 根据生肖保存赔率到数组中
        }
      })
      break
    case 3: // 五肖连
      list[0].oddsList.forEach(function (item) { // 循环取出赔率
        if (item.typeId === 2490044) { // 五肖连赔率
          let zodiac = item.project // 生肖
          oddsArray[zodiac] = item // 根据生肖保存赔率到数组中
        }
      })
      break
    default:
      console.error('请选择类型！')
      return false
  }
  console.info('oddsArray', oddsArray)

  let newList = [{name: '选择类型'}, {name: '选择号码'}]
  /* 组装 选择类型 */
  let oddsList = []
  projectArray.forEach((item, index) => {
    oddsList.push({project: item})
    oddsList[index].typeId = index
  })
  newList[0].oddsList = oddsList

  /* 组装 选择号码 */
  let oddsList2 = []
  animals.forEach((item, index) => {
    oddsList2.push({project: item})
    oddsList2[index].num = getNumbersOfZodiac(item)
    oddsList2[index].odds = oddsArray[item].odds // 赔率
  })
  newList[1].oddsList = oddsList2

  return newList
}
/**
 * 六合彩 正码特
 * @param {*后台传过来的原始数组} list
 */
export function zhengmateFilter (list) {
  let newList = [{name: '选择正码'}]
  /* 组装 选择类型 */
  let oddsList = []
  speNum.forEach((item, index) => {
    oddsList.push({project: item})
    oddsList[index].typeId = index + 1
  })
  newList[0].oddsList = oddsList

  /* 组装 选择号码 */
  list.forEach((item, index) => {
    newList[index + 1] = item
    index === 0 && (newList[1].name = '选择号码')
    // index === 1 && (newList[2].name = '大小单双')
  })
  return newList
}

/**
 * 六合彩 连尾
 * @param {*后台传过来的原始数组} list
 * @param {*选择类型} selectedRule
 */
export function lhcLianWeiFilter (list, selectedRule) {
  let oddsArray = [] // 赔率
  switch (selectedRule.typeId) { // 判断连码中的选择类型
    case 4: // 二尾碰
      list[0].oddsList.forEach(function (item) { // 循环取出赔率
        if (item.typeId === 2490051) { // 二尾碰赔率
          let num = item.project // 尾数
          oddsArray[num] = item // 根据尾数保存赔率到数组中
        }
      })
      break
    case 5: // 三尾碰
      list[0].oddsList.forEach(function (item) { // 循环取出赔率
        if (item.typeId === 2490052) { // 三尾碰赔率
          let num = item.project // 尾数
          oddsArray[num] = item // 根据尾数保存赔率到数组中
        }
      })
      break
    case 6: // 四尾碰
      list[0].oddsList.forEach(function (item) { // 循环取出赔率
        if (item.typeId === 2490053) { // 四尾碰赔率
          let num = item.project // 尾数
          oddsArray[num] = item // 根据尾数保存赔率到数组中
        }
      })
      break
    case 7: // 五尾碰
      list[0].oddsList.forEach(function (item) { // 循环取出赔率
        if (item.typeId === 2490054) { // 五尾碰赔率
          let num = item.project // 尾数
          oddsArray[num] = item // 根据尾数保存赔率到数组中
        }
      })
      break
    default:
      console.error('请选择类型！')
      return false
  }
  console.info('oddsArray', oddsArray)

  // console.info('list:', list)
  let newList = [{name: '选择类型'}, {name: '选择号码'}]
  /* 组装 选择类型 */
  let oddsList = []
  projectArray.forEach((item, index) => {
    oddsList.push({project: item})
    oddsList[index].typeId = index
  })
  newList[0].oddsList = oddsList

  /* 组装 选择号码 */
  let oddsList2 = []
  const lianWeiArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  lianWeiArray.forEach((item, index) => {
    oddsList2.push({project: item})
    oddsList2[index].num = getMantissa(item)
    oddsList2[index].odds = oddsArray[item].odds // 赔率
  })
  newList[1].oddsList = oddsList2
  return newList
}

/**
 * 六合彩 合肖
 * @param {*后台传过来的原始数组} list
 * @param {*当年生肖} zodiac
 */
export function lhcHeXiaoFilter (list, zodiac) {
  console.info('list:', list)
  currentZodiac = zodiac // 设置当年生肖
  let newList = [{name: '选择类型'}, {name: '选择号码'}]
  let typeArray = ['中', '不中']
  /* 组装 选择类型 */
  let oddsList = []
  typeArray.forEach((item, index) => {
    oddsList.push({project: item})
    oddsList[index].typeId = index
  })
  newList[0].oddsList = oddsList

  /* 组装 选择号码 */
  let oddsList2 = []
  animals.forEach((item, index) => {
    oddsList2.push({project: item})
    oddsList2[index].num = getNumbersOfZodiac(item)
  })
  newList[1].oddsList = oddsList2

  return newList
}
/** ****************************************************** 根据不同玩法，组装展示数据 end ********************************************************/
