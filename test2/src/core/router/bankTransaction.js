import lineConversion from '@/components/bankTransaction/moneyConversion/lineConversion'
import onlinePages from '@/components/bankTransaction/onlinePayment/onlinePages'
import onlineWithdrawals from '@/components/bankTransaction/onlineDraw/onlineWithdrawals'

export default [
  {
    path: '/center/bankTransaction/lineConversion',
    component: lineConversion,
    name: 'lineConversion'
  },
  {
    path: '/center/bankTransaction/onlinePayment',
    component: onlinePages,
    name: 'onlinePayment'
  },
  {
    path: '/center/bankTransaction/onlineWithdrawals',
    component: onlineWithdrawals,
    name: 'onlineWithdrawals'
  }
]
