/**
 * 与原生APP交互 payne
 */
export default function () {
  let myNative = {}
  /**
   * 是否APP
   * @returns {Boolean} 返回true代表是APP
   */
  myNative.isApp = function () {
    // APP机型，'ios' 或者 'android'
    let deviceType = window.AppInvokeModel && window.AppInvokeModel.getDeviceType && window.AppInvokeModel.getDeviceType()
    // 判断是否是原生APP内嵌H5代码
    return (deviceType === 'ios' || deviceType === 'android') && window.AppInvokeModel
  }
  /**
   * 获取登录APP需要的token
   * @returns {any} 返回memberToken
   */
  myNative.getMemberToken = function () {
    // 判断是否是原生APP内嵌H5代码
    if (window.myNative.isApp()) {
      return window.AppInvokeModel.getMemberToken && window.AppInvokeModel.getMemberToken() // 不能使用 || ''此种情况，因为memberToken有可能就是传入空字符串
    }
  }
  /**
   * 支付系统跳转首页
   * @returns {Boolean} 返回true代表跳转成功，一般用于如果是能够APP的接口，则阻止后续H5的代码执行
   */
  myNative.popToHome = function () {
    // 判断是否是原生APP内嵌H5代码
    if (window.myNative.isApp()) {
      window.AppInvokeModel.popToHome && window.AppInvokeModel.popToHome()
      return true
    }
  }
  /**
   * 支付系统跳转登录页
   * @returns {Boolean} 返回true代表跳转成功，一般用于如果是能够APP的接口，则阻止后续H5的代码执行
   */
  myNative.popToLogin = function () {
    // 判断是否是原生APP内嵌H5代码
    if (window.myNative.isApp()) {
      window.AppInvokeModel.resetToLogin && window.AppInvokeModel.resetToLogin()
      return true
    }
  }
  /**
   * 支付系统跳转账户中心
   * @returns {Boolean} 返回true代表跳转成功，一般用于如果是能够APP的接口，则阻止后续H5的代码执行
   */
  myNative.popToAccount = function () {
    // 判断是否是原生APP内嵌H5代码
    if (window.myNative.isApp()) {
      window.AppInvokeModel.resetToAccount && window.AppInvokeModel.resetToAccount()
      return true
    }
  }
  /**
   * 调用原生app打开对应的URL(如支付宝，微信)
   * @param {String} url
   * @returns {Boolean} 返回true代表跳转成功，一般用于如果是能够APP的接口，则阻止后续H5的代码执行
   */
  myNative.popToThirdApp = function (url) {
    // 判断是否是原生APP内嵌H5代码
    if (window.myNative.isApp()) {
      window.AppInvokeModel.weakUpThirdApp && window.AppInvokeModel.weakUpThirdApp(url)
      return true
    }
  }
  window.myNative = myNative
}
