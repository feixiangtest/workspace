let account = () => {
  return import('./../views/Home.vue')
}
let basicInfo = () => {
  return import('./../components/accountManagement/basicInfo/basicInfo.vue')
}
let securityCode = () => {
  return import('./../components/accountManagement/basicInfo/securityCode.vue')
}
let agent = () => {
  return import('./../components/accountManagement/agent/agentList.vue')
}
let agentAdd = () => {
  return import('./../components/accountManagement/agent/agentAdd.vue')
}
let agentEdit = () => {
  return import('./../components/accountManagement/agent/agentEdit.vue')
}
let membership = () => {
  return import('./../components/accountManagement/membership/index.vue')
}
let membershipAdd = () => {
  return import('./../components/accountManagement/membership/membershipAdd.vue')
}
let membershipEdit = () => {
  return import('./../components/accountManagement/membership/membershipEdit.vue')
}
let agentSave = () => {
  return import('./../components/accountManagement/agent/agentSave.vue')
}
let agentDeep = () => {
  return import('./../components/accountManagement/agent/agentDeep.vue')
}
export default {
  accountRoutes: {
    path: '/m/account',
    component: account,
    name: 'account',
    children: [
      {
        path: 'basicInfo',
        component: basicInfo,
        name: 'basicInfo'
      },
      {
        path: 'securityCode',
        component: securityCode,
        name: 'securityCode'
      },
      {
        path: 'agent/:id',
        component: agent,
        name: 'agent'
      },
      {
        path: 'agentDeep/:agentLevel/:id', // 代理层级 一层 一层点下去
        component: agentDeep,
        name: 'agentDeep'
      },
      {
        path: 'agentAdd/:id',
        component: agentAdd,
        name: 'agentAdd'
      },
      {
        path: 'agentEdit/:id',
        component: agentEdit,
        name: 'agentEdit'
      },
      {
        path: 'membership/:id',
        component: membership,
        name: 'membership'
      },
      {
        path: 'memberDeep/:id', // 代理ID 为空查登录用户下级
        component: membership,
        name: 'memberDeep'
      },
      {
        path: 'membershipAdd',
        component: membershipAdd,
        name: 'membershipAdd'
      },
      {
        path: 'membershipAdd/:id',
        component: membershipAdd,
        name: 'membershipAddOne'
      },
      {
        path: 'membershipEdit/:id',
        component: membershipEdit,
        name: 'membershipEdit'
      },
      {
        path: 'agentSave/:id',
        component: agentSave,
        name: 'agentSave'
      }
    ]
  }
}
