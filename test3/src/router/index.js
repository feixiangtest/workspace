import App from '../App'
import indexRoutes from './indexRoutes'
import accountRoutes from './accountRoutes'
import cashRoutes from './cashRoutes'
import rebateRouters from './rebateRouters'
import _concat from 'lodash/concat'

export default [{
  path: '/',
  component: App,
  children: _concat([],
    indexRoutes.indexRoutes,
    accountRoutes.accountRoutes,
    cashRoutes.cashRoutes,
    rebateRouters.rebateRouters,
    [{
      path: '/*',
      redirect: '/m/login'
    }]
  )
}]
