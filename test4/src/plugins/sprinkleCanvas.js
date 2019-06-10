let canvas, context, width, height, particle, colors, timer, isAnimated, callback
// 改变画布
function updateDraw () {
  context.clearRect(0, 0, width, height)
  drawScreen()
  timer = window.requestAnimationFrame(updateDraw) // 动画定时器，一般每1s中执行60次
  if (isAnimated === true) {
    window.cancelAnimationFrame(timer) // 取消动画定时器
  }
}
function drawScreen () {
  context.globalAlpha = 1
  let count = 0
  for (var i = 0; i < particle.length; i++) {
    if (!particle[i].isEnd) {
      count++
      particle[i].draw()
    }
  }
  if (count === 0) { // 所有动画结束
    isAnimated = true
    window.cancelAnimationFrame(timer) // 取消动画定时器
    if (typeof callback === 'function') { // 调用回调
      callback()
    }
  }
}
function randomRange (min, max) {
  return min + Math.random() * (max - min)
}
function convertToRadians (degree) {
  return degree * (Math.PI / 180)
}
export default {
  canvasId: 'canvas', // 画布的ID
  // 初始化
  /**
   * @param {String} canvasId canvas标签的ID
   */
  init: function (canvasId) {
    if (canvasId) {
      this.canvasId = canvasId
    }
    timer = null // requestAnimationFrame定时器
    isAnimated = false // 是否撒花动画完成
    canvas = document.getElementById(this.canvasId) // canvas对象
    context = canvas.getContext('2d')
    width = (canvas.offsetWidth || window.innerWidth) + 10 // 花瓣活动区域的宽度
    height = (canvas.offsetHeight || window.innerHeight) * 1.1 // 花瓣活动区域的高度
    particle = [] // 所有花瓣对象
    colors = [ // 花瓣机选的颜色
      '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
      '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50',
      '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
      '#FF5722', '#795548'
    ]
    for (var i = 0; i < 240; i++) {
      particle.push({
        x: width / 2, // 所有花瓣初始化的位置（宽）
        y: height / 3, // 所有花瓣初始化的位置（高）
        boxW: randomRange(3, 7), // 花瓣的宽
        boxH: randomRange(7, 12), // 花瓣的高
        velX: randomRange(-7, 7), // 花瓣往外扩散的初始值，负数代表往里，正数代表往外
        velY: randomRange(-15, -5), // 花瓣下落的初始值，值越小代表下落越快
        angle: convertToRadians(randomRange(0, 360)), // 旋转的角度
        anglespin: randomRange(-0.2, 0.2), // 旋转的幅度
        color: colors[Math.floor(Math.random() * colors.length)], // 花瓣的颜色
        isEnd: false, // 当前花瓣是否动画结束
        draw: function () { // 画布的函数
          context.save() // 保存当前状态
          context.translate(this.x, this.y) // 移动到的位置
          context.rotate(this.angle) // 旋转
          context.fillStyle = this.color
          context.fillRect(this.boxW / 2 * -1, this.boxH / 2 * -1, this.boxW, this.boxH) // 花瓣的位置与长宽
          context.fill()
          context.restore() // 返回保存的画布状态
          this.angle += this.anglespin
          this.velY *= 0.999
          this.velY += 0.4 // 调整下落速度以及撒花的高度，数值越大，高度越低，下落速度越快
          this.x += this.velX
          this.y += this.velY
          // 当花超过顶部时
          if (this.y < 0) {
            this.velY *= -0.1
            this.velX *= 0.9
          }
          // 当花低于底部时
          if (this.y >= height) {
            this.isEnd = true
            context.clearRect(0, 0, width, height) // 清除当前花
          } else if (this.x >= width || this.x <= 0) { // 当花超过宽度时
            this.isEnd = true
            context.clearRect(0, 0, width, height) // 清除当前花
          }
        }
      })
    }
  },
  /**
   * 渲染
   * @param {Function} endCallback 动画结束之后的回调函数
   */
  render: function (endCallback) {
    callback = endCallback
    this.init()
    updateDraw()
  }
}
