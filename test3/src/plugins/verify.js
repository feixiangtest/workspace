/**
 * 验证
 */
let errTxt = {
  checkPw: ['密码须是6-12位字母和数字的组合']
}

let a = {
  account (value) {
    if (!value) return false
    let val = 'd' + value
    if (!(/^d[0-9a-z]{5,12}$/).test(val)) {
      // 增加代理时账号验证
      return false
    }
    return true
  },
  checkPw (val) {
    if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/.test(val)) {
      return false
    }
    return true
  }
}
a.checkPw.errTxt = errTxt.checkPw
a.account.errTxt = '请填写6-11位的小写字母、数字或两个的组合'
export default a
