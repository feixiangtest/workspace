import betRecord from '@/components/tradeRecord/betRecord/betRecord'
import currentRecord from '@/components/tradeRecord/currentRecord/currentRecord'

export default [
  {
    path: '/center/tradeRecord/betRecord',
    component: betRecord,
    name: 'betRecord'
  },
  {
    path: '/center/tradeRecord/currentRecord',
    component: currentRecord,
    name: 'currentRecord'
  }
]
