let register = () => {
  let folderUrl = window.indexMain.isCustomComponents('pages/register.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'pages/register.vue')
  } else {
    return import('./../pages/register.vue')
  }
}
let login = () => {
  let folderUrl = window.indexMain.isCustomComponents('pages/login.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'pages/login.vue')
  } else {
    return import('./../pages/login.vue')
  }
}
let forgetPassword = () => {
  let folderUrl = window.indexMain.isCustomComponents('pages/forgetPassword.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'pages/forgetPassword.vue')
  } else {
    return import('./../pages/forgetPassword.vue')
  }
}
let thirdPartyJump = () => {
  let folderUrl = window.indexMain.isCustomComponents('pages/thirdPartyJump.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'pages/thirdPartyJump.vue')
  } else {
    return import('./../pages/thirdPartyJump.vue')
  }
}
export default {
  homeRouter: [
    {
      path: '/wap/register',
      component: register,
      name: 'register'
    },
    {
      path: '/wap/login',
      component: login,
      name: 'login'
    },
    {
      path: '/wap/forgetPassword',
      component: forgetPassword,
      name: 'forgetPassword'
    },
    {
      path: '/wap/thirdPartyJump',
      component: thirdPartyJump,
      name: 'thirdPartyJump'
    }
  ]
}
