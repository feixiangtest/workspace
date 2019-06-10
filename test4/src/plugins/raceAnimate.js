/**
 * 赛车动画js代码，必须依赖Jquery
 */
/**
 * 赛车动画组件，完成原理：跑道背景图从左往右快速滚动，汽车图片只相对于屏幕做微小的左右滚动
 * @param {Object} $doms 指的是整个赛车部分最大的dom对象
 */
let RaceWidget = function ($doms) {
  let __doms = $doms || window.$('body')
  let that = this
  let gameAward = [] // 开奖结果
  /**
   * 记录各个赛车当前动画的阶段，结构：
   * {
   *  1: 2, // 代表1号赛车正在执行第2阶段的动画
   *  2: -1, // 代表2号赛车已经执行完所有阶段的动画
   *  3: 0 // 代表3号赛车还没有开始执行动画
   * }
   */
  let runningCars = {}
  /**
   * 记录各阶段已完成赛车动画的赛车编号
   * {
   *  1: [1, 2, 3, 4, 5, 6] // 第一阶段已完成动画的赛车编号是：1,2,3,4,5,6
   *  2: [1, 2] // 第二阶段已完成动画的赛车编号是：1,2
   * }
   */
  let levelAnimated = {}
  // 是否动画中（包括赛车、挥旗、开奖等动画部分）
  let isAnimating = false
  let animateAreaSizes = [330, 380, 420, 500] // 整个动画区域的尺寸（宽）分水岭，不同尺寸有不同的比例计算
  // 窗口大小调整的监听事件
  window.$(window).resize(() => {
    if (isAnimating === false) {
      that.ready && that.ready() // 赛车动画就绪，会根据窗口调整位置
    }
  })
  /**
   * 显示红绿灯
   */
  function showTrafficLights () {
    __doms.find('.red-light,.yellow-light,.green-light').toggle(false)
    __doms.find('.runway-light').toggle(true)
  }
  // 初始化style样式
  function initStyle () {
    initStyleRunway() // 初始化跑道
    initStyleCar() // 初始化赛车大小及位置
    initStyleCarWheel() // 初始化赛车的轮子以及尾气部分
    initStyleLine() // 初始化起跑线与终点线
    initStyleLight() // 初始化红绿灯
  }
  // 初始化跑道
  function initStyleRunway () {
    __doms.find('.runway').css({'right': 0, 'left': ''})
  }
  // 初始化起跑线与终点线
  function initStyleLine () {
    __doms.find('.startLine').css({right: getStartLineDistance(), left: ''})
    __doms.find('.endLine').css({left: getEndLineDistance()})
  }
  // 初始化赛车大小及位置
  function initStyleCar () {
    // begin 计算各赛车的宽与高
    // 各车高与赛道高的比例
    let heightArr = [0.13, 0.13, 0.135, 0.14, 0.145, 0.15, 0.16, 0.165, 0.172, 0.18]
    // 各车宽与高的比例
    let whProport = 3.5
    let carAreaHeight = __doms.find('.carArea').height()
    for (let i = 0; i < heightArr.length; i++) {
      __doms.find('.carArea .car' + (i + 1)).css({height: carAreaHeight * heightArr[i], width: carAreaHeight * heightArr[i] * whProport})
    }
    // end 计算各赛车的宽与高

    // begin 计算赛车对应整个跑道区域的bottom位置
    let bottomArr = getAllCarBottom()
    for (let i = 0; i < bottomArr.length; i++) {
      __doms.find('.carArea .car' + (i + 1)).css({position: 'absolute', bottom: bottomArr[i]})
    }
    // end 计算赛车对应整个跑道区域的bottom位置
    initStyleCarPosition() // 初始化赛车的位置
  }
  // 初始化各赛车的位置
  function initStyleCarPosition () {
    let distance = getStartLineDistance() // 用于计算起始线到整个动画区域最右的距离
    let leftArr = getLeftByCarNum() // 计算每个车相对起始线再往左移动的距离
    for (let i = 0; i < leftArr.length; i++) {
      let $dom = __doms.find('.carArea .car' + (i + 1))
      $dom.css({right: distance - $dom.width() + leftArr[i], left: ''})
      $dom = null
    }
  }
  // 初始化赛车的轮子以及尾气部分
  function initStyleCarWheel () {
    // 轮胎位置与赛车长或宽的比例
    let wheelProports = [{ // 第一个轮胎
      left: 0.145,
      bottom: 0.0
    }, { // 第二个轮胎
      right: 0.067,
      bottom: 0.065
    }]
    // 前后轮胎的直径与赛车高的比例
    let whProports = [0.55, 0.51]
    let $cars = __doms.find('.carArea .car')
    // 遍历每个赛车元素
    $cars.each((i, carDom) => {
      handleCarImg(i, false) // 初始化赛车附加图
      let $car = window.$(carDom)
      let carW = $car.width()
      let carH = $car.height()
      let left = carW * wheelProports[0].left
      let right = carW * wheelProports[1].right
      let bottom1 = carH * wheelProports[0].bottom
      let bottom2 = carH * wheelProports[1].bottom
      $car.find('.wheel-flag1').css({left: left, bottom: bottom1, width: carH * whProports[0], height: carH * whProports[0]}) // 第一个轮胎动图
      $car.find('.wheel-flag2').css({right: right, bottom: bottom2, width: carH * whProports[1], height: carH * whProports[1]}) // 第二个轮胎动图
      $car.find('.wheel-flag1 .car-fast').css({width: carW - left, height: carH, bottom: -carH * 0.15, left: -carW * 0.05}) // 第一个风
      $car.find('.wheel-flag2 .car-fast').css({width: carW - left, height: carH * 0.5, bottom: -carH * 0.1, left: -carW * 0.06})
      $car.find('.car-after').css({width: carW * 0.3, height: carH * 0.3, right: -carW * 0.25, bottom: carH * 0.02}) // 尾气
    })
  }
  // 初始化红绿灯
  function initStyleLight () {
    let runwayH = __doms.find('.runway-light').height()
    let $trafficLights = __doms.find('.traffic-lights')
    let $lights = $trafficLights.find('.light')
    let whProport = 2.88 // 红绿灯宽高比例
    let height = runwayH * 0.35
    let width = height * whProport
    $trafficLights.css({height: height, width: width, top: (runwayH - height) / 2}) // 跑道居中
    let diameterProport = 0.62 // 实际灯直径与红绿灯图片高度的比例
    let lightDiameter = height * diameterProport // 灯的直径
    $lights.css({width: lightDiameter, height: lightDiameter, top: (height - lightDiameter) / 2}) // 定位每个灯的位置
    window.$.each($lights, (i, dom) => { // 定位每个灯的距右位置
      let left = (width - lightDiameter) / 2
      if (i === 0) {
        left -= lightDiameter + lightDiameter * 0.25
      } else if (i === 2) {
        left += lightDiameter + lightDiameter * 0.38
      } else {
        left += lightDiameter * 0.06 // 由于红绿灯图片的问题，进行简单的干扰
      }
      window.$(dom).css({left: left})
    })
  }
  // 用于计算起始线到整个动画区域最右的距离
  function getStartLineDistance () {
    let aw = __doms.find('.animate-area').width()
    let proport = aw > animateAreaSizes[0] ? 0.1 : 0.07
    return __doms.find('.carArea .car10').width() + aw * proport
  }
  // 用于计算终点线到整个动画区域最左的距离
  function getEndLineDistance () {
    let aw = __doms.find('.animate-area').width()
    let proport = aw > animateAreaSizes[0] ? 0.1 : 0.07
    return __doms.find('.carArea .car10').width() + aw * proport
  }
  // 根据起始线的偏离角度，计算每个车相对起始线再往左移动的距离，正数代表往左，负数代表往右
  function getLeftByCarNum () {
    let leftArr = []
    let $carArea = __doms.find('.carArea')
    let halfH = $carArea.height() / 2 // 起始线中点距离跑道底部的垂直距离
    let halfLineW = (__doms.find('.startLine').width() / 2 - 2) || 0 // 起始线的一半宽度(再减去2代表轧一点点线)
    let bottomArr = getAllCarBottom() // 计算赛车对应整个跑道区域的bottom位置
    for (let i = 0; i < bottomArr.length; i++) {
      leftArr.push((halfH - bottomArr[i]) * Math.tan(that.op.lineDegree * Math.PI / 180) - halfLineW) // cos、sin、tan的参数是弧度
    }
    return leftArr
  }
  // 计算赛车对应整个跑道区域的bottom位置
  function getAllCarBottom () {
    let aw = __doms.find('.animate-area').width()
    let carAreaHeight = __doms.find('.carArea').height() // 整个跑道区域的高度
    let bottomArr = [] // 各赛车对应跑道区域bottom位置的集合
    let sumH = 0
    // 各赛车与下一个赛车的距离，距离的计算是比例乘以赛道的高
    let btArr = [0.06, 0.065, 0.08, 0.09, 0.10, 0.115, 0.127, 0.138, 0.145, 0.13]
    for (let i = btArr.length - 1; i >= 0; i--) {
      if (i === btArr.length - 1) { // 最后一个赛车与赛道底部的距离
        let proport = aw < animateAreaSizes[0] ? 0.01 : 0.015
        sumH = carAreaHeight * proport
      } else {
        sumH += carAreaHeight * btArr[i]
      }
      bottomArr.unshift(sumH)
    }
    return bottomArr
  }
  // 初始化开奖区域的样式
  function initStyleWinnerArea () {
    let whProport = 3.4 // 奖号背景图的宽高比例
    let $winner = __doms.find('.winner-area')
    let wHeight = $winner.height()
    let wWidth = wHeight * whProport
    $winner.css({top: wHeight * 0.05})
    let sWidth = wWidth * 0.8
    let sHeight = wHeight * 0.8
    $winner.find('.shape').css({height: sHeight, width: sWidth})
    let rightVac = ($winner.width() - sWidth)// 中间距左
    let leftSecond = rightVac / 2
    __doms.find('.second-winner').css({top: wHeight * 0.15, left: leftSecond}) // 第二名背景区域
    __doms.find('.first-winner').css({top: wHeight * 0.25, left: leftSecond / 2}) // 第一名背景区域
    __doms.find('.third-winner').css({top: wHeight * 0.05, left: leftSecond + leftSecond / 2}) // 第三名背景区域
    let strokeWidth = Math.ceil(sHeight * 0.03)
    // 文字样式
    $winner.find('.winner-font').css({
      'font-size': sHeight * 0.35,
      '-webkit-text-stroke-width': strokeWidth,
      left: sHeight * 0.21,
      top: sHeight * 0.22,
      width: sHeight * 0.42,
      height: sHeight * 0.42
    })
    let carWhProport = 1.576 // 奖车的宽高比例
    let carH = sHeight * 1.3
    // 奖车样式
    $winner.find('.car-area').css({
      position: 'absolute',
      height: carH,
      width: carH * carWhProport,
      top: -sHeight * 0.11,
      left: sWidth * 0.6
    })
  }
  /**
   * 初始化其他数据
   */
  function initOther () {
    gameAward = []
    runningCars = {}
    levelAnimated = {}
  }
  // 开始跑道与背景动画
  function startRunway () {
    __doms.find('.runway').animate({left: 0}, that.op.runway.times, 'swing')
  }
  function startCar () {
    let carSum = that.op.carSum
    for (let i = 1; i <= carSum; i++) {
      runningCars[i] = 0 // 全部赛车初始化为未执行动画
    }
    initOpCar(gameAward) // 初始化各赛车各阶段的里程值
    for (let i = 1; i <= carSum; i++) {
      nextRunCarAnimate(i) // 开始赛车动画
    }
  }
  /**
   * 初始化car参数
   */
  function initOpCar () {
    if (!window.$.isArray(gameAward) || !gameAward.length) {
      return false
    }
    // 二维数组，计算出各个阶段各个赛车的排序情况，一维代表阶段，二维代表赛车排序
    let sortTwoArr = getCarSorted(gameAward, that.op.sumLevel, that.op.maxStep)
    that.op.levelTimes = that.op.runway.times / sortTwoArr.length // 每个阶段的时长
    that.op.car = {} // 重置
    // 根据各阶段赛车的排序情况，转换成各阶段赛车在固定时间内该跑的里程
    for (let i = 0; i < sortTwoArr.length; i++) {
      let length = sortTwoArr[i].length
      let step = that.getMileStepByLevel(i + 1, sortTwoArr.length) // 获取当前阶段的里程跨度
      let randomArray = getRandomArray(length, step, that.getStartByLevel(i + 1, sortTwoArr.length)) // 根据里程跨度与起始点计算得到当前阶段各赛车的里程（按名次从小到大排列）
      for (let j = 0; j < length; j++) {
        if (!that.op.car[sortTwoArr[i][j]]) {
          that.op.car[sortTwoArr[i][j]] = []
        }
        let carMileageArr = that.op.car[sortTwoArr[i][j]] // 获取该赛车各阶段的里程
        let carTotalMileage = sumArr(carMileageArr) // 该赛车已计算阶段的总里程
        // 注：每个赛车从第一阶段到当前阶段的总里程，就是randomArray里面相对应的值（根据当前阶段的名次来匹配），这样才能计算出当前阶段该跑多长的里程才能达到预期的名次顺序
        carMileageArr.push(randomArray[length - 1 - j] - carTotalMileage) // 该赛车增加下一阶段的里程，里程是正数代表是加速，负数代表是减速
      }
    }
    adjustCarMileage() // 各阶段的里程调节（不会影响每个阶段的排序），保证第一阶段是加速，最后一阶段也是加速
  }
  /**
   * 单个赛车的一个阶段的动画
   * @param {Number} carNumber 赛车编号
   * @param {Number} pxLength 需要跑的里程（单位：px）
   * @param {Number} times 该里程需要的时间（单位：ms）
   * @param {Number} curLevelNum 当前阶段
   */
  function carAnimate (carNumber, pxLength, times, curLevelNum) {
    let $car = __doms.find('.car' + carNumber)
    // 基本条件判断
    if (!$car || !$car[0] || !window.$.isNumeric(pxLength) || !window.$.isNumeric(times)) {
      return false
    }
    let pt = $car.position()
    if (pt) {
      pxLength = parseInt(pxLength, 10)
      times = parseInt(times, 10)
      let prop = {left: (pt.left || 0) - pxLength}
      $car.stop(true) // 停止该选择器的所有动画
      speedChanged(carNumber, pxLength) // 赛车速度变化的回调
      $car.animate(prop, times, 'linear', function () {
        carLevelAnimated(carNumber, curLevelNum) // 该赛车阶段性动画执行完成的回调
        if (runningCars[carNumber] >= that.op.sumLevel) {
          runningCars[carNumber] = -1 // 该赛车所有阶段动画都执行完毕
          carAllLevelAnimated(carNumber) // 该赛车所有阶段动画都执行完毕的回调函数
        } else {
          nextRunCarAnimate(carNumber) // 执行该赛车下一阶段动画
        }
      })
    }
  }
  /**
   * 执行赛车下一阶段动画
   * @param {Number} carNumber 赛车编号
   */
  function nextRunCarAnimate (carNumber) {
    // 判断该赛车是否还有其他阶段的动画未完成
    if (runningCars[carNumber] !== -1) {
      let curLevel = ++runningCars[carNumber]
      let times = that.op.levelTimes
      if (curLevel === that.op.sumLevel) { // 最后一个阶段
        times = times * 1 + (that.op.lastLevelAddTimes || 0) * 1
      }
      carAnimate(carNumber, that.op.car[carNumber][curLevel - 1], times, curLevel)
    }
  }
  /**
   * 该赛车所有阶段动画都执行完毕的回调函数
   * @param {Number} carNumber 赛车编号
   */
  function carAllLevelAnimated (carNumber) {
    handleCarImg(carNumber, false) // 操作赛车的附加图片（尾气等）
  }
  /**
   * 该赛车单个阶段动画执行完毕的回调函数
   * @param {Number} carNumber 赛车编号
   * @param {Number} curLevelNum 当前阶段
   */
  function carLevelAnimated (carNumber, curLevelNum) {
    if (curLevelNum <= 0) {
      return
    }
    if (!levelAnimated[curLevelNum]) {
      levelAnimated[curLevelNum] = []
    }
    levelAnimated[curLevelNum].push(carNumber)
    // 如果该阶段所有赛车动画都已经跑完
    if (levelAnimated[curLevelNum].length === that.op.carSum) {
      let carSortArr = getCarSortByLevel(curLevelNum)
      let isLast = that.op.car[carNumber].length === curLevelNum // 是否最后一个阶段
      if (isLast) { // 是否最后一个阶段
        raceAnimated() // 赛车部分动画全部完成的回调
      }
      // 发布排序情况
      if (typeof that.onCarSortChange === 'function') {
        that.onCarSortChange(carSortArr, isLast)
      }
    }
  }
  /**
   * 赛车部分动画全部完成的回调
   */
  function raceAnimated () {
    that.carAnimateStatus = -1 // 标识赛车部分动画全部完成
    if (typeof that.onRaceingEnd === 'function') {
      that.onRaceingEnd(gameAward)
    }
    setTimeout(that.waveFlag, 500) // 赛车完成之后开始挥旗部分
    setTimeout(() => {
      readyOpenAwardAnimate(gameAward.length) // 开奖动画就绪
    }, 1000) // 开始开奖动画部分
    setTimeout(openAwardAnimate, 1500) // 开始开奖动画部分
  }
  /**
   * 赛车速度变化之后的回调，比如加速时显示像风一样的图片，减速时隐藏
   * @param {Number} carNumber 赛车编号
   * @param {Number} pxLength 正数代表加速，负数代表减速
   */
  function speedChanged (carNumber, pxLength) {
    handleCarImg(carNumber, true, pxLength > 0) // 操作赛车的附加图片
  }
  /**
   * 操作赛车的附加图片，如：尾气、轮胎动图等
   * @param {Number} carNumber 赛车编号
   * @param {*} isRunning 是否奔驰中
   * @param {*} isAccelerate 是否加速中
   */
  function handleCarImg (carNumber, isRunning, isAccelerate) {
    let _isAc = isRunning && isAccelerate
    let fastArr = [] // 数组，用于随机显示像风一样的图片
    let wqArr = [] // 数组，用于随机显示赛车的尾气
    if (_isAc) {
      let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      fastArr = getRandomIndex(arr).slice(0, 3) // 随机排序数组
      wqArr = getRandomIndex(arr).slice(0, 5) // 随机排序数组
    }
    let $car = __doms.find('.car' + carNumber)
    $car.find('.car-wheel .wheel').toggle(!!isRunning) // 显示/隐藏轮胎的gif动图
    $car.find('.wheel-flag1 .car-fast').toggle(isRunning && isAccelerate && fastArr.indexOf(carNumber) !== -1)  // 显示/隐藏赛车前面像风一样的图片
    $car.find('.car-after').toggle(isRunning && isAccelerate && wqArr.indexOf(carNumber) !== -1) // 显示加速的尾气
    $car = null
  }
  /**
   * 根据传递的阶段获得当前阶段各赛车的排名情况
   * @param {Number} levelNumber 代表第几阶段
   * @returns {Array} 返回各赛车的排名情况
   * 结构：[3, 5, 1, 6, 7, 4, 10, 8, 2, 9] // 3号赛车排第一名，以此类推
   */
  function getCarSortByLevel (levelNumber) {
    let carObj = that.op.car
    let carSumMiles = [] // 当前阶段为止，各赛车的里程总数
    window.$.each(carObj, (key, mileageArr) => {
      carSumMiles.push({'key': key, 'value': sumArr(mileageArr.slice(0, levelNumber))})
    })
    carSumMiles.sort((a, b) => { return b['value'] - a['value'] }) // 根据数组元素中value字段值从大到小排序
    let carSortArr = [] // 排名结果
    for (let sumMileObj of carSumMiles) {
      carSortArr.push(sumMileObj['key'])
    }
    return carSortArr
  }
  /**
   * 随机获取每个不同名次车之间的距离，负数代表低于正常速度
   * @param {Number} count 数量
   * @param {Number} step 跨度
   * @param {Number} start 起点
   * 返回的结构：[-286, -208, -162, -91, -56, 59, 72, 150, 229, 269]
   */
  function getRandomArray (count, step, start) {
    step = step || 0 // 跨度
    start = start || 0 // 起点
    let randomArray = [] // count个不同跨度的随机数
    for (let i = 0; i < count; i++) {
      randomArray.push(Math.floor((Math.random() * step)) + (start + step * i))
    }
    return randomArray
  }
  /**
   * 计算出各个阶段各个赛车的排序情况
   * @param {Array} award 赛车最终的排序结果，最终的排序结果与计算出的最后一个阶段的排序结果保持一致
   * @param {Number} sumLevel 总阶段数，整个赛车分sumLevel个阶段，每个阶段同一个赛车有不同的速度，每个阶段的里程是一样的
   * @param {Number} maxStep 最大的跨度，如果maxStep = 2，即：如果该阶段的A赛车是第四名，则下个阶段的A赛车是第二名跟第六名之间，每个阶段的最大跨度是2
   * @returns {Array} 返回一个二维数组，一维代表阶段，二维代表赛车排序
   * 结构：[
   *    [5, 4, 1, 3, 6, 7, 9, 10, 8, 2], // 代表第一阶段5号车排名第一，4号车排名第二，以此类推
   *    [1, 5, 4, 6, 3, 10, 7, 9, 8, 2],
   *    [1, 5, 3, 4, 7, 6, 10, 2, 9, 8],
   *    [3, 5, 1, 6, 7, 4, 10, 8, 2, 9] // 代表最后一阶段（即最终结果）3号车排名第一，5号车排名第二，以此类推
   * ]
   */
  function getCarSorted (award, sumLevel, maxStep) {
    if (!window.$.isArray(award) || !award.length) {
      return false
    }
    let count = award.length // 赛车的个数
    sumLevel = sumLevel || 10 // 阶段数
    maxStep = parseInt(maxStep, 10) // 最大的跨度取整
    let arr = [[]] // 二维数组，arr[x]代表当前第(x+1)阶段跑完后，各个赛车的排序情况；arr[x][y]代表当前第(x+1)阶段跑完后第(y+1)个赛车的排序位置
    let ascArr = [] // 顺序排序的数组，count个，如：[1, 2, 3, ..., count]
    for (let i = 1; i <= count; i++) {
      ascArr.push(i)
    }
    // 从最后一个阶段往第一个阶段来做各阶段各个赛车的排序
    for (let i = sumLevel - 1; i >= 0; i--) {
      // 是否最后一个阶段
      if (i === sumLevel - 1) {
        arr[i] = award // 最后一个阶段的排序使用最终结果的数组
      } else { // 其他阶段
        arr[i] = getSortedArr([], arr[i + 1], maxStep) // 获取该阶段排序后的名次数组
      }
    }
    return arr
  }
  /**
   * 获取该阶段排序后的名次数组
   * @param {Array} sortedArr 该阶段已经排序的名次数组，数组的第一个代表第一名，以此类推
   * @param {Array} prevSortedArr 上一个阶段已经排序的名次数组，数组的第一个代表第一名，以此类推
   * @param {Array} maxStep 每个阶段超车或者落后的名次最大跨度，如果maxStep=2，即：如果该阶段的A赛车是第四名，则后一阶段的A赛车是第二名跟第六名之间，每个阶段的最大跨度是2
   * @returns {Array} sortedArr 返回该阶段排序后的名次数组
   * 结构如：[3, 5, 1, 6, 7, 4, 10, 8, 2, 9]
   */
  function getSortedArr (sortedArr, prevSortedArr, maxStep) {
    if (!window.$.isArray(sortedArr)) {
      sortedArr = []
    }
    if (!window.$.isArray(prevSortedArr) || !prevSortedArr.length || !window.$.isNumeric(maxStep)) { // 格式与非空判断
      return sortedArr
    }
    let sortedCount = sortedArr.length // 该阶段已经排序的名次
    if (sortedCount === prevSortedArr.length) { // 该阶段是否所有赛车都已经排序
      return sortedArr
    }
    maxStep = parseInt(maxStep, 10) // 转整数
    let sortNumber = sortedCount + 1 // 该阶段即将排序的名次
    // 新排序的名次赛车号码是从prevSortedArr数组的第beginNum项到第endNum项之间产生
    let beginNum = sortNumber - maxStep // 计算出最大跨度的起点
    let endNum = sortNumber + maxStep // 计算出最大跨度的终点
    // 如果prevSortedArr数组中第beginNum项赛车号码还未被排名，则本次直接排进去，因为下个名次该赛车号码是不在可选的范围内，保证每个赛车号码都能够排序
    if (beginNum > 0 && sortedArr.indexOf(prevSortedArr[beginNum - 1]) === -1) {
      sortedArr.push(prevSortedArr[beginNum - 1])
      return getSortedArr(sortedArr, prevSortedArr, maxStep) // 进行下一个排序
    } else {
      beginNum = beginNum < 1 ? 1 : beginNum // 最小项取1
      endNum = endNum > prevSortedArr.length ? prevSortedArr.length : endNum // 最大项取prevSortedArr.length
      let tArr = prevSortedArr.slice(beginNum - 1, endNum) // 获取prevSortedArr数组的第beginNum项到第endNum项
      let newTArr = [] // tArr中删除sortedArr中已经存在的赛车号码，得到newTArr
      for (let i = 0; i < tArr.length; i++) {
        if (sortedArr.indexOf(tArr[i]) === -1) {
          newTArr.push(tArr[i])
        }
      }
      if (!newTArr.length) {
        console.log('排序系统异常。。。')
      } else {
        let index = Math.floor(Math.random() * newTArr.length) // 随机取旧数组的下标
        sortedArr.push(newTArr[index])
        return getSortedArr(sortedArr, prevSortedArr, maxStep) // 进行下一个排序
      }
    }
  }
  // 各阶段的里程调节（不会影响每个阶段的排序），保证第一阶段是加速，最后一阶段也是加速
  function adjustCarMileage () {
    // let carObj = that.op.car
    // let firstLevelArr = [] // 第一阶段各赛车的里程
    // let lastLevelArr = [] // 最后一个阶段各赛车的里程
    // window.$.each(carObj, (key, mileageArr) => {
    //   firstLevelArr.push(mileageArr[0])
    //   lastLevelArr.push(mileageArr[mileageArr.length - 1])
    // })
    // let firstMinMile = getMin(firstLevelArr) // 获取第一阶段所有赛车中的最小里程
    // let lastMinMile = getMin(lastLevelArr) // 获取最后一个阶段所有赛车中的最小里程
    // let firstAddMile = (firstMinMile <= 0 ? Math.abs(firstMinMile) + 20 : 0) // 计算出第一阶段每个赛车需要增加的里程，保证是在加速
    // let lastAddMile = (lastMinMile <= 0 ? Math.abs(lastMinMile) + 20 : 0) // 计算出最后一个阶段每个赛车需要增加的里程，保证是在加速
    // window.$.each(carObj, (key, mileageArr) => {
    //   mileageArr[0] += firstAddMile // 第一阶段每个赛车增加里程
    //   mileageArr[mileageArr.length - 1] += lastAddMile // 最后一个阶段每个赛车增加里程
    // })

    /* begin 保证第几名赛车能够抵达终点线 */
    let _cht = 7 // 保证第7名的赛车能够抵达终点线
    let runMile = __doms.find('.carArea').width() - (getStartLineDistance() + getEndLineDistance()) // 赛车从起点线到终点线的实际屏幕距离（非跑道距离）
    let carObj = that.op.car
    let descMileArr = [] // 所有赛车总里程排序
    window.$.each(carObj, (key, mileageArr) => {
      descMileArr.push(sumArr(mileageArr))
    })
    descMileArr = descMileArr.sort((a, b) => { // 倒序排序
      return b - a
    })
    let fillMile = runMile - descMileArr[_cht - 1] // 第_cht名次的赛车想要到达终点，还需要填补的里程
    // 将该需要填补的里程平均分配到每个阶段的所有赛车，保证名次不变
    let avgLevelMile = fillMile / that.op.sumLevel
    window.$.each(carObj, (key, mileageArr) => {
      for (let i = 0; i < mileageArr.length; i++) {
        mileageArr[i] += avgLevelMile
      }
    })
    /* end 保证第几名赛车能够抵达终点线 */
  }
  // 数组求和
  function sumArr (numArr) {
    let sum = 0 // 该赛车已计算阶段的总里程
    for (let i = 0; i < numArr.length; i++) {
      sum += numArr[i]
    }
    return sum
  }
  // 获取数组中最小值
  // function getMin (numArr) {
  //   if (!window.$.isArray(numArr) || !numArr.length) {
  //     return false
  //   }
  //   let minNum = numArr[0]
  //   for (let i = 1; i < numArr.length; i++) {
  //     if (numArr[i] < minNum) {
  //       minNum = numArr[i]
  //     }
  //   }
  //   return minNum
  // }
  // 随机排序数组
  function getRandomIndex (oldArr, newArr) {
    if (!window.$.isArray(oldArr)) {
      return newArr
    }
    if (!window.$.isArray(newArr)) {
      newArr = []
    }
    if (newArr.length === 0) {
      oldArr = window.$.extend(true, [], oldArr) // 深拷贝对象，避免污染源数据
    }
    if (oldArr.length === 0) { // 旧数组为空时返回
      return newArr
    }
    var index = Math.floor(Math.random() * oldArr.length) // 随机取旧数组的下标
    newArr.push(oldArr[index]) // 当前元素放在新数组
    oldArr.splice(index, 1) // 删除当前元素
    return getRandomIndex(oldArr, newArr) // 递归调用
  }
  /* begin 赛车部分动画结束之后的开奖动画区域 */
  /**
   * 开奖动画
   */
  function openAwardAnimate () {
    // gameAward是开奖动画
    if (!window.$.isArray(gameAward) || !gameAward.length) {
      return false
    }
    readyOpenAwardAnimate(gameAward.length) // 开奖动画就绪
    let splitTimes = 200 // 每个排名的间隔开奖动画时间，单位：毫秒
    let rankingArr = ['first', 'second', 'third'] // 排名的选择器标识
    let leng = gameAward.length > 3 ? 3 : gameAward.length
    for (let i = 0; i < leng; i++) {
      setTimeout(() => {
        __doms.find('.' + rankingArr[i] + '-winner .shape').addClass('animate-shape').toggle(true)
        __doms.find('.' + rankingArr[i] + '-winner .winner-car').addClass('winner-car' + gameAward[i] + ' animate-car').toggle(true)
        __doms.find('.' + rankingArr[i] + '-winner .winner-font').text(gameAward[i])
        if (i === leng - 1) { // 开奖动画部分已完成
          isAnimating = false // 标识动画已完成
          if (typeof that.onOpenAwarded === 'function') {
            that.onOpenAwarded(gameAward) // 开奖动画部分完成的回调函数
          }
        }
      }, splitTimes * i)
    }
  }
  /**
   * 开奖动画就绪
   * @param {Number} carCount 赛车的数量
   */
  function readyOpenAwardAnimate (carCount) {
    toggleAnimatePart(3) // 赛车部分隐藏，开奖部分显示
    let rankingArr = ['first', 'second', 'third'] // 排名的选择器标识
    let leng = carCount > 3 ? 3 : carCount
    for (let i = 0; i < leng; i++) { // 初始化动画相应的样式，并隐藏元素
      __doms.find('.' + rankingArr[i] + '-winner .shape').removeClass('animate-shape').toggle(false)
      __doms.find('.' + rankingArr[i] + '-winner .winner-car').removeClass('animate-car').toggle(false)
    }
    carCount = carCount || 10
    for (let i = 1; i <= carCount; i++) {
      __doms.find('.winner-car').removeClass('winner-car' + i) // 删除开奖时赛车的图片样式
    }
  }
  /* end 赛车部分动画结束之后的开奖动画区域 */
  /**
   * 根据状态控制赛车部分、开奖部分等显示隐藏
   * @param {Number} number 1=需要显示赛车部分，3=需要显示开奖部分
   */
  function toggleAnimatePart (number) {
    let racePart = '.race-part'
    let awardPart = '.open-award-part'
    let partArr = [racePart, awardPart]
    let o = {}
    if (number === 1) {
      o[racePart] = true // 需要显示的元素对应选择器(其他则隐藏)
    } else if (number === 3) {
      o[awardPart] = true
      initStyleWinnerArea() // 初始化开奖区域的样式
    }
    for (let part of partArr) {
      __doms.find(part).toggle(!!o[part])
    }
  }
  // 在汽车结束前一段时间，隐藏赛车的相关效果图
  function timeOutHideCarDrawing () {
    __doms.find('.car-vague').toggle(true) // 赛车奔跑中，所有赛车阴影效果图显示
    let arr = getRandomIndex([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) // 随机排序数组
    for (let i = 1; i <= arr.length; i++) {
      setTimeout(() => {
        __doms.find('.car' + i + ' .car-vague').toggle(false) // 隐藏赛车的阴影效果图
      }, that.op.runway.times - 500 - i / 2 * 50) // 每个车不在同一时间隐藏
    }
  }
  window.$.extend(this, {
    // 参数
    op: {
      trafficLightsTimes: 3000, // 红绿灯总时长
      runway: { // 跑道
        times: 6000, // 跑道动画总时长，单位：ms
        width: 5500, // 跑道总长度，单位：px
        right: 0, // 跑道初始化的left，单位：px
        mileage: 0 // 赛车比赛时有效里程(需要初始化)，单位：px
      },
      /**
       * 每个车不同阶段的固定时间该跑的里程，固定时间是通过跑道动画总时长除以阶段数所得
       * 数据结构：{
       *  1: [320, -40, 50, 10, -30, -20], // key代表赛车的编号，数组内容代表各阶段相对于上一个阶段需要跑的里程
       *  2: [350, -10, 0, 20, 10, -30] // 如：350代表2号赛车起步之后第一个阶段在固定时间内需要跑350px，-10代表第二个阶段相对于第一个阶段跑完之后的位置在固定时间内再后退10px
       * }
       */
      car: {},
      lastLevelAddTimes: 0, // 所有赛车最后一阶段增加的动画时间
      carSum: 10, // 赛车总数量
      sumLevel: 4, // 总阶段数量
      levelTimes: 0, // 每个阶段的赛车动画时长
      maxStep: 2, // 默认最大的跨度是2，即：如果该阶段的A赛车是第四名，则下个阶段的A赛车是第二名跟第六名之间，每个阶段的最大跨度是2
      lineDegree: 12 // 起跑线与终点线偏离角度，单位：度
    },
    // 赛车部分的动画状态
    carAnimateStatus: 0, // 0=准备就绪，1=正在进行，-1=已完成
    /**
     * 挥动旗子动画
     */
    waveFlag: function () {
      let allClass = ['animate-flag', 'animate-flag2']
      let cName = __doms.find('.carArea').width() > animateAreaSizes[3] ? allClass[1] : allClass[0]
      __doms.find('.flag-part').toggle(true)
      __doms.find('.flag-gif').removeClass(allClass.join(' '))
      setTimeout(() => { // 下个轮询才添加，这样才会有动画效果
        __doms.find('.flag-gif').addClass(cName)
      }, 0)
      setTimeout(() => { // 几秒钟之后再隐藏
        __doms.find('.flag-part').toggle(false)
        __doms.find('.flag-gif').removeClass(allClass.join(' '))
      }, 2000)
    },
    /**
     * 赛车动画就绪
     */
    ready: function () {
      // 如果赛车部分动画正在进行，则不作为
      if (isAnimating === true) {
        return false
      }
      toggleAnimatePart(1) // 赛车部分显示，开奖部分隐藏
      initStyle() // 初始化赛车动画样式
      showTrafficLights() // 显示红绿灯
      initOther()
      this.carAnimateStatus = 0 // 标识准备就绪
    },
    /**
     * 开始赛车
     * @param {Array} award 开奖结果
     * @param {Boolean} isWaveFlag 开始前是否挥旗
     */
    run: function (award, isWaveFlag) {
      if (!window.$.isArray(award) || !award.length) {
        return false
      }
      // 如果赛车部分动画正在进行，则不作为
      if (isAnimating === true) {
        return false
      }
      // 就绪
      if (this.ready() === false) {
        return false
      }
      isAnimating = true // 标识动画中
      this.carAnimateStatus = 1 // 标识赛车部分正在执行
      let times = isWaveFlag ? 700 : 0
      if (isWaveFlag) {
        this.waveFlag()
      }
      setTimeout(() => {
        // 开始红绿灯动画
        this.trafficLightsAnimate(() => {
          gameAward = award // 开奖结果
          startRunway() // 开始跑道动画
          startCar(award) // 开始汽车动画
          timeOutHideCarDrawing() // 在汽车结束前一段时间，隐藏赛车的相关效果图
        })
      }, times)
    },
    /**
     * 获取动画状态，true=动画中（包括赛车、挥旗、开奖等动画部分）,false则反之
     */
    getAnimateStatus: function () {
      return isAnimating
    },
    /**
     * 根据阶段获取该阶段各赛车名次之间的里程跨度（通过该跨度来随机产生赛车之间的距离），跨度越大，赛车之间拉开的距离越大
     * @param {Number} level 当前阶段
     * @param {Number} sumLevel 总阶段数量
     */
    getMileStepByLevel: function (level, sumLevel) {
      let raceAreaWidth = __doms.find('.carArea').width()
      let proport
      if (raceAreaWidth < 400) {
        proport = level <= 1 ? 0.030 : (level >= sumLevel - 1 ? 0.04 : 0.038) // 与赛车区域的比例
      } else {
        proport = level <= 1 ? 0.028 : (level >= sumLevel - 1 ? 0.035 : 0.032) // 与赛车区域的比例
      }
      return raceAreaWidth * proport
    },
    /**
     * 根据阶段获取该阶段各赛车名次之间的里程跨度的起步数
     * @param {Number} level 当前阶段
     * @param {Number} sumLevel 总阶段数量
     */
    getStartByLevel: function (level, sumLevel) {
      let raceAreaWidth = __doms.find('.carArea').width()
      let proport = level <= 1 ? -0.05 : (level >= sumLevel - 1 ? 0.02 : -0.05) // 与赛车区域的比例
      return raceAreaWidth * proport
    },
    /**
     * 开始红绿灯动画
     * @param {Function} callback 动画结束的回调函数
     */
    trafficLightsAnimate: function (callback) {
      showTrafficLights() // 显示红绿灯
      let lightArr = ['.red-light', '.yellow-light', '.green-light'] // 所有灯的选择器
      let time = (this.op.trafficLightsTimes || 3000) / lightArr.length // 每个灯的间隔时间
      let curIndex = 0 // 当前亮灯的下标
      curIndex = toggleLight(lightArr, curIndex) // 控制第一个灯亮
      let interval = setInterval(() => { // 其它灯通过定时器来判断控制
        if (curIndex < lightArr.length) {
          curIndex = toggleLight(lightArr, curIndex) // 控制其它灯亮
        }
        if (curIndex >= lightArr.length) { // 如果是最后一个灯
          clearInterval(interval) // 清除定时器
          setTimeout(() => { // 延时执行，视觉上能够看到最后一个灯
            __doms.find('.runway-light').toggle(false) // 隐藏红绿灯
            if (typeof callback === 'function') { // 回调函数
              callback.call(this)
            }
          }, 500)
        }
      }, time)
      // 控制灯
      function toggleLight (lightArr, index) {
        for (let i = 0; i < lightArr.length; i++) {
          __doms.find(lightArr[i]).toggle(i === index)
        }
        return ++index
      }
    },
    /**
     * 赛车实时的排序回调函数，可监听
     * @param {Array} carSortArr 赛车排序
     * @param {Boolean} isLast 是否最终排序
     */
    onCarSortChange: function (carSortArr, isLast) {},
    /**
     * 赛车部分动画完成的回调函数，可监听
     * @param {Array} carSortArr 赛车排序
     */
    onRaceingEnd: function (carSortArr) {},
    /**
     * 开奖动画部分完成的回调函数
     * @param {Array} carSortArr 赛车排序
     */
    onOpenAwarded: function (carSortArr) {}
  })
}
export default RaceWidget
