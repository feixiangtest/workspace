/**
 * 返回角度
 * @param  {x轴移动距离} dx
 * @param  {y轴移动距离} sizdye
 */
function GetSlideAngle (dx, dy) {
  return Math.atan2(dy, dx) * 180 / Math.PI
}

  /**
 * 根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
 * @param  {起点X坐标} startX
 * @param  {起点Y坐标} startY
 * @param  {终点X坐标} endX
 * @param  {终点Y坐标} endY
 */
export function GetSlideDirection (startX, startY, endX, endY) {
  let dy = startY - endY
  let dx = endX - startX

  let result = 0
  if (Math.abs(dx) < 40 && Math.abs(dy) < 40) { // 如果滑动距离太短
    return result
  }

  let angle = GetSlideAngle(dx, dy) // 移动角度
  // 判断移动方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
  if (angle >= -45 && angle < 45) {
    result = 4
  } else if (angle >= 45 && angle < 135) {
    result = 1
  } else if (angle >= -135 && angle < -45) {
    result = 2
  } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
    result = 3
  }

  return result
}
