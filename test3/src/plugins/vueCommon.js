/**
 *  公用的 vue 函数
 * @type {{checkPw(): (boolean|*)}}
 */
import verify from '@/plugins/verify.js'
let a = {
  // 验证密码 pass  跳过空
  checkPw (pass = false) {
    if (!pass && !this.info.pwd) return true
    let txt = verify.checkPw.errTxt[0]
    let res = verify.checkPw(this.info.pwd)
    if (!res) {
      window.layer.msgWarn(txt)
    }
    return res
  }
}

export default a
