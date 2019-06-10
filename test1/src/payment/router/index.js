import App from '../App'
import PaymentRoutes from './paymentRoutes'
import _concat from 'lodash/concat'

/**
 * -----------------------------并且请注意：所有支付系统的路由跳转，路由关键字必须使用变量，
 * 如 window.moduleRouter.push('/' + window.moduleRouter._payKey + '/payment')   否则gpo APP（主系统APP客户端）嵌入支付时，不能使用该路由
 */
export default [{
  path: '/',
  component: App,
  children: _concat([],
    PaymentRoutes.paymentRouter,
    [{
      path: '/*',
      redirect: '/pyt/payment'
    }]
  )
}]
