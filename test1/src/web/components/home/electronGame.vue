<template>
  <div class="egame">
    <gameHeader></gameHeader>
    <div class="wrapper indexCenter3" style="padding-top: 93px;">
      <div v-show="!$store.state.home.electricSearch" class="favoriteList" style="padding-bottom: .8rem;">
        <!-- 游戏列表 -->
        <game-list :data="showGames" :dd-class="'indexFavorite0'" :game-click="loginMgGame" :img-div-class="'gameImg'" :no-status-icon="true" :img-url-prefix="commonImgUrl + '/electric/' + gameId + '_electronic/'"></game-list>
      </div>
      <div v-if="$store.state.home.electricSearch" class="floatPages">
        <div class=" header yo-home-nav floatheader">
          <div class="center">
            <div class="hea-menu hea-left">
              <a href="javascript:;" @click="$store.state.home.electricSearch=false">
                <i class="yo-icon icon-arrows-left"></i>
              </a>
            </div>
            <div class="header-text titile">
              <h1>搜索</h1>
            </div>
            <div class="hea-user hea-right">
            </div>
          </div>
        </div>
        <div class="centerBox mainCenter shadeIn floatPagesCent" style="background: rgb(255, 255, 255);">
          <div class="searchBox">
            <ul class="searchNav1">
              <li v-for="(item, index) in typeMap" :class="active === index ? 'active' : ''" :key="index" @click="chooseType(item, index)">
                <a href="javascript:">{{ item.name }}</a>
              </li>
            </ul>
          </div>
          <div class="searchBoxInput">
            <i class="yo-icon icon-search"></i><input type="text" placeholder="游戏名称" v-model="gameName"></div>
          <div class="yo-pad10 yo-pad-bot20" style="margin-bottom: 20px;">
            <button type="button" class="yo-anOne button " @click="searchGame()">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import gameHeader from '@/base/components/header/gameHeader'
import gameList from '@/base/components/common/gameList'
import * as types from '@/base/store/home/type'
import * as statusCode from '@/base/utils/status_const'
import method from '@/base/utils/method'
export default {
  components: {
    gameHeader,
    gameList
  },
  data () {
    return {
      active: 0, // 选中分类
      gameName: '', // 游戏名
      typeKey: '',
      typeMap: [],
      showGames: [], // 显示的游戏（只显示过滤后的）
      games: [], // 当前类型的所有游戏
      keywords: ['GameData', 'CategoryList'], // 关键字
      gameId: '' // 游戏ID
    }
  },
  methods: {
    rent (item) { // 添加收藏
      this.$store.dispatch('rent.action', { 'modelId': item.Id, 'accountId': item.accountId })
    },
    chooseType (item, index) { // 选择游戏分类
      if (item) {
        this.active = index
        this.typeKey = item.key || ''
      }
    },
    searchGame () { // 搜索游戏
      this.showGames = []
      this.games.forEach(game => {
        if (this.gameName) { // 根据名称筛选
          if (game.modelName.indexOf(this.gameName) >= 0) {
            this.showGames.push(game)
          }
        } else if (this.typeKey) { // 根据游戏类型筛选
          if (this.typeKey.indexOf(game.categoryCode) >= 0) {
            this.showGames.push(game)
          }
        } else {
          this.showGames.push(game)
        }
      })
      this.$store.state.home.electricSearch = false
    },
    goLogin ($this) {
      let { goLogin } = method
      return goLogin($this)
    },
    loginMgGame (item) {
      if (window._config.Tap) { // 长按 会默认触发 一个click , 重新设置初始值 window._config.Tap
        window._config.Tap = false
        return
      }
      if (this.goLogin(this)) return true
      this.rent(item)
      // BBIN的圣诞节游戏活动，单独处理(下线后删除) by payne 2018/12/18
      if (this.gameId === 'bb' && (item.modelUrl === 'OG' || item.modelUrl === 'OP')) {
        let url
        if (item.modelUrl === 'OG') {
          url = 'https://777.oriental888.info/infe/events/xmas/'
        } else {
          url = 'https://777.bbthwd.com/infe/events/xmas/'
        }
        window.open(url)
        return true
      }
      window.openElectronGame(this.gameId, item.modelUrl) // 打开电子游戏
    },
    setGameData () {
      if (!this.$store.state.home.eGamekeys.includes(this.gameType)) { // 没有匹配到电子游戏数据
        this.$router.push('/wap/eGame') // 回到电子游戏列表页面
        return
      }
      this.gameId = this.gameType
      window.$('.egameNav .navigation').scrollLeft('41')
      window.indexMain.isOnLine()
      window.indexMain.setTitle() // 设置标题
      let gameData = this.$store.state.home[this.gameId + this.keywords[0]]
      // store中有数据，从store中取，避免多次加载
      if (gameData && gameData.length) {
        this.showGames = gameData
        this.games = gameData
        this.typeMap = this.$store.state.home[this.gameId + this.keywords[1]] || []
        this.chooseType(this.typeMap[0], 0) // 默认选择第一个
        this.gameName = '' // 游戏名称清空
      } else { // 没有数据
        this.queryData() // 查询数据
      }
    },
    // 查询数据
    queryData () {
      this.$store.dispatch(types.QUERY_GAME_LIST_ACTION, { gameType: this.gameId }).then(res => {
        if (res.status === statusCode.statusConst.SUCCESS && res.data) {
          let dataKey = this.gameId + this.keywords[0]
          let data = res.data[dataKey]
          if (data) { // 游戏列表
            this.$store.state.home[dataKey] = data
            this.games = data
            this.showGames = data
          }
          let conditionKey = this.gameId + this.keywords[1]
          let typeMap = res.data[conditionKey]
          if (typeMap) { // 保存接口返回的搜索条件数据
            typeMap.unshift({
              name: '全部',
              key: ''
            })
            this.$store.state.home[conditionKey] = typeMap
            this.typeMap = typeMap
            this.chooseType(this.typeMap[0], 0) // 默认选择第一个
            this.gameName = '' // 游戏名称清空
          }
        }
      })
    }
  },
  mounted () {
    this.setGameData()
  },
  watch: {
    // 切换类型的监听
    gameType () {
      this.setGameData()
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.home.isLogin
    },
    commonImgUrl () {
      return this.$store.state.home.commonImgUrl
    },
    // 当前电子游戏类型
    gameType () {
      return this.$route.params.id || ''
    }
  }
}
</script>
