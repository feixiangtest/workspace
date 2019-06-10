/** 处理js跨域问题
 * Created by google
 * 这里指加工 字符串
 */

class wrapFn {
  init (str = null, name = null, type = 'js') {
    if (!name) return false
    if (type == 'js') {
      return `reactLd['${name}'] = function(){
              ${str}
      }
      localStorage.setItem('${name}', reactLd['${name}'])
      `
    }
    /**
     *  CSS to js 使用 cssMD5 作为 key , 对比key 可以排除 旧的数据
     */
    return `reactLd['${name}'] ='${str}'
            localStorage.setItem('${name}', reactLd['${name}'] ) 
            localStorage.setItem('app.css', 1)
            `
  }
}
module.exports = wrapFn
