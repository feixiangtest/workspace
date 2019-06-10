/*
 * @Author: Elmer
 * @Date: 2018-09-03 10:12:25
 * @Last Modified by: Elmer
 * @Last Modified time: 2018-12-17 02:30:52
 */
// window.common对象添加登录模块逻辑
;(function () {
  // api接口地址列表
  if (!window.common) window.common = {}
  window.common.login = {
    isAccount: function (account) {
      if (!account) {
        window.layer.msgWarn('用户名格式不正确！')
        return false
      } else if (account.length < 6) {
        window.layer.msgWarn('用户名格式不正确')
        return false
      }
      return true
    },
    isPassWord: function (password) {
      if (!password) {
        window.layer.msgWarn('密码格式不正确！')
        return false
      } else if (password.length < 6) {
        window.layer.msgWarn('密码格式不正确')
        return false
      }
      return true
    },
    isCheckCode: function (checkCode) {
      if (!checkCode) {
        window.layer.msgWarn('验证码不能为空！')
        return false
      }
      return true
    },
    toLowerCaseStr: function (account) {
      var newAccount = account.replace(/[^0-9a-zA-Z]+/g, '')
      return newAccount.toLowerCase()
    }

  }
}())
