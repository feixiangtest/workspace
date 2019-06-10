/*
 * @Author: Elmer
 * @Date: 2018-09-03 10:12:25
 * @Last Modified by: Elmer
 * @Last Modified time: 2018-10-09 06:14:34
 * // window.common对象添加接口地址扩展
 * todo  删除 pc 对这里的引用
 *       h5 还有引用
 *       这里需要优化 删除
 */

;(function () {
    // api接口地址列表
  window.common.apiUrl = {

  }
        // 设置接口域名地址
  var setDomainUrl = function (url) {
    this.domainUrl = url || ''
    for (var i in this.apiUrl) {
      this.apiUrl[i] = this.domainUrl + this.apiUrl[i]
    }
  }
        // 设置会员中心地址
  var setMemberUrl = function (url) {
    this.memberUrl = url
  }
  window.common.setDomainUrl = setDomainUrl
  window.common.setMemberUrl = setMemberUrl
}());
