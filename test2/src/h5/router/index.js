import App from '@/pages/index/App'
import indexRoutes from './indexRoutes'
import commonRoutes from './commonRoutes'
import insideRoutes from './insideRoutes'
import paymentRoutes from './paymentRoutes'

export default [{
  path: '/',
  component: App,
  children:
    [...indexRoutes.indexRoutes,
      ...commonRoutes.commonRoutes,
      ...insideRoutes.insideRoutes,
      ...paymentRoutes.paymentRouter,
      ...[{
        path: '/*',
        redirect: '/wap/index'
      }]
    ]
}]
