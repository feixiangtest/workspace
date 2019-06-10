<template>
<div class="wrapper" >
  <div class="favoriteList">
      <dl class="indexFavorite">
          <dd class="indexFavorite0"
              :key="'favoriteList_' + index" v-for="(item, index) in data" v-if="item.Id !== 0">
              <!--非电子游戏类型-->
              <p v-if="!eGamekeys.includes(getKey(item))" @click="otherGameGo(item)">
                  <a v-finger:long-tap="longTap.bind(this, item)">
                      <i v-if="item.isFavofite" class="yo-icon" :class="{'icon-love': item.isFavofite}"></i>
                      <div class="gameImg">
                        <img :src="(staticDomain||'') + item.modelImgUrl">
                      </div>
                      <span>{{item.modelName}}</span>
                  </a>
              </p>
              <!--电子游戏类型-->
              <p v-if="eGamekeys.includes(getKey(item))" @click="thirdGameGo(item)">
                  <a  v-finger:long-tap="longTap.bind(this, item)">
                      <i v-if="item.isFavofite" class="yo-icon" :class="{'icon-love': item.isFavofite}"></i>
                      <div class="gameImg">
                        <img :src="getEGameImgUrl(item)">
                      </div>
                      <span>{{item.modelName}}</span>
                  </a>
              </p>
          </dd>
          <!--最近浏览-->
          <dd v-if="routeName === 'browse' && !data.length" style="text-align: center;border: none;width:100%">
              <template v-if="!isLogin">您还未登录!</template>
              <template v-if="isLogin">您还未访问任何模块!<br/>访问任何游戏后该游戏将会出现在当前页面!</template>
          </dd>
          <!--我的最爱-->
          <dd v-if="routeName === 'favorite' && !data.length" style="text-align: center;border: none;width:100%">
            您还未添加任何收藏! <br> 按住您喜欢的游戏图标2秒，即可收藏到我的最爱哦~
          </dd>
      </dl>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      staticDomain: this.$store.state.home.staticDomain // 非静态资源路径
    }
  },
  created () {
    this.queryData()
  },
  watch: {
    routeName () {
      this.queryData()
    }
  },
  computed: {
    recentsList () {
      return this.$store.state.home.recentsList
    },
    favoriteList () {
      return this.$store.state.home.favoriteList
    },
    data () {
      if (this.routeName === 'browse') { // 最近浏览
        return this.recentsList
      } else if (this.routeName === 'favorite') { // 我的最爱
        return this.favoriteList
      }
      return []
    },
    isLogin () {
      return this.$store.state.home.isLogin
    },
    commonImgUrl () {
      return this.$store.state.home.commonImgUrl
    },
    eGamekeys () {
      return this.$store.state.home.eGamekeys
    },
    routeName () {
      return this.$route.name
    }
  },
  mounted () {
    // 判断断网情况
    window.indexMain.isOnLine()
    // 设置标题
    window.indexMain.setTitle()
  },
  methods: {
    // 查询数据
    queryData () {
      if (this.routeName === 'browse') { // 最近浏览
        window.store.dispatch('rentList.action', {})
      } else if (this.routeName === 'favorite') { // 我的最爱
        window.store.dispatch('favoriteList.action', {})
      }
    },
    // 获取电子游戏大类的key
    getKey (item) {
      if (item && item.platformCode && item.platformCode.length > 2) {
        return item.platformCode.toLowerCase().slice(0, item.platformCode.length - 2)
      }
      return ''
    },
    // 游戏跳转，除电子游戏之外
    otherGameGo (item) {
      window.indexMain.gameClick(this, item)
    },
    // 游戏长按事件
    longTap (item, event) {
      window.indexMain.longTap(this, item, event, () => {
        if (this.routeName === 'favorite') { // 我的最爱
          window.$.each(this.favoriteList, (i, o) => {
            if (o.Id === item.Id) {
              this.favoriteList.splice(i, 1)
              return false
            }
          })
        }
      })
    },
     /** 第三方电子游戏跳转到第三方登陆 */
    thirdGameGo (item) {
      let key = this.getKey(item)
      if (window._config.Tap) { // 长按 会默认触发 一个click , 重新设置初始值 window._config.Tap
        window._config.Tap = false
        return
      }
      if (window._frequency && new Date().getTime() - window._frequency < 1000) {
        return false
      }
      window._frequency = new Date().getTime()
      this.$store.dispatch('rent.action', { 'modelId': item.Id })
      window.openElectronGame(key, item.modelUrl) // 打开电子游戏
    },
    // 获取电子游戏类型的图片url
    getEGameImgUrl (item) {
      return this.commonImgUrl + '/electric/' + this.getKey(item) + '_electronic/' + this.getImgSuffix(item.modelImgUrl)
    },
    // 动态判断是否加后缀
    getImgSuffix (url) {
      if (url && url.match(/(\.jpg$)|(\.png$)|(\.gif$)|(\.bmp$)/)) {
        return url
      } else {
        return url + '.png'
      }
    }
  }
}
</script>
