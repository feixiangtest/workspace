import App from '../App'
import HomeRoutes from './homeRoutes'
import MemberCenterRoutes from './memberCenterRoutes'
import IndexRoutes from './indexRoutes'
import TransactionRecord from './transactionRecord'
import PaymentRoutes from './paymentRoutes'
import TeamManageRoutes from './teamManageRoutes'
import _concat from 'lodash/concat'

export default [{
  path: '/',
  component: App,
  children: _concat([],
    HomeRoutes.homeRouter,
    MemberCenterRoutes.memberCenterRoutes,
    IndexRoutes.indexRoutes,
    TransactionRecord.transactionRecordRoutes,
    PaymentRoutes.paymentRouter,
    TeamManageRoutes.teamManageRoutes,
    [{
      path: '/*',
      redirect: '/wap/index'
    }]
  )
}]
