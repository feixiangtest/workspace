import baseConsole from '@/components/myAccount/baseConsole'
import safeSet from '@/components/myAccount/modifyPwd/safeSet'
import gameClient from '@/components/myAccount/gameClient'

export default [
  {
    path: '/center/myAccount/baseConsole',
    component: baseConsole,
    name: 'baseConsole'
  },
  {
    path: '/center/myAccount/safeSet',
    component: safeSet,
    name: 'safeSet'
  },
  {
    path: '/center/myAccount/gameClient',
    component: gameClient,
    name: 'gameClient'
  }
]
