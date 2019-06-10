// 采用异步加载的模式，进入页面时加载当前组件
let home = () => {
  let folderUrl = window.indexMain.isCustomComponents('pages/home.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'pages/home.vue')
  } else {
    return import('./../pages/home.vue')
  }
}

let main = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/home/main.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/home/main.vue')
  } else {
    return import('./../components/home/main.vue')
  }
}

let ordinaryGame = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/home/ordinaryGame/index.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/home/ordinaryGame/index.vue')
  } else {
    return import('./../components/home/ordinaryGame/index.vue')
  }
}

let blendGame = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/home/blendGame.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/home/blendGame.vue')
  } else {
    return import('./../components/home/blendGame.vue')
  }
}

let promotion = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/home/promotion.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/home/promotion.vue')
  } else {
    return import('./../components/home/promotion.vue')
  }
}

let electronGame = () => {
  let folderUrl = window.indexMain.isCustomComponents('components/home/electronGame.vue')
  if (folderUrl) {
    return import('./../' + folderUrl + 'components/home/electronGame.vue')
  } else {
    return import('./../components/home/electronGame.vue')
  }
}
export default {
  indexRoutes: {
    path: '/wap',
    component: home,
    name: 'home',
    children: [
      {
        path: 'promotion',
        component: promotion,
        name: 'promotion'
      },
      {
        path: 'favorite',
        component: blendGame,
        name: 'favorite'
      },
      {
        path: 'browse',
        component: blendGame,
        name: 'browse'
      },
      {
        path: 'index',
        component: main,
        name: 'index'
      },
      {
        path: 'sports',
        component: ordinaryGame,
        name: 'sports'
      },
      {
        path: 'live',
        component: ordinaryGame,
        name: 'live'
      },
      {
        path: 'chessGame',
        component: ordinaryGame,
        name: 'chessGame'
      },
      {
        path: 'fishingGame',
        component: ordinaryGame,
        name: 'fishingGame'
      },
      {
        path: 'eGame',
        component: ordinaryGame,
        name: 'eGame'
      },
      {
        path: 'eGame/:id',
        component: electronGame,
        name: 'electronGame'
      }
    ]
  }

}
