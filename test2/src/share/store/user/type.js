/**
 * 依赖影响： pc  h5
 * 注意：非公用不要加，谨慎添加修改
 * @type {string}
 */
export const LOGIN = 'user.login'// 登录请求
export const LOGINOUT = 'user.loginOut'
export const SIGN = 'user.sign'
export const SAVEUSERINFO = 'user.saveUserInfo'
export const CLEARUSERINFO = 'user.clearUserInfo'
export const SHOWLOGIN = 'user.showLogin'
export const VALIDMEMBERINFO = 'user.validMemberInfo'// 校验输入信息是否正确
export const GETLOGINFAILTIMES = 'user.getLoginFailTimes'// 校验错误次数
export const UPDATESESSIONMONEY = 'user.updateSessionMoney' // 刷新余额
export const MONEYCONVERSION_ACTION = 'user.moneyConversion' // 刷新余额

// 注册
export const REG_GET = 'user.register'
export const REG_ACTION = 'reg.h5'
// 试玩
export const LOGIN_FREE_ACTION = 'loginFree.action'
export const LOGIN_FREE_MUTATION = 'loginFree.mutation'

// 会员登录弹框
export const POPUPMESSAGE_MUTATION = 'user.popUpMessage.mutation'

// 注册
export const CHECK_DRAWPW = 'user.drawPw'
