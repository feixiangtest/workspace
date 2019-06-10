<template>
  <div class="header yo-home-nav">
    <div class="center">
      <div class="hea-menu hea-left" @click="toggleLeftSideMenu()">
        <a href="javascript:;"><i class="yo-icon icon-menu"></i></a>
      </div>
      <div class="header-text titile">
        <h1 v-if="title">{{title}} <span v-if="$store.state.home.isOffLine">(未连接)</span></h1>
        <img v-if="onTopLogoSim && isPreview === 3" :src="staticDomain + onTopLogoSim">
        <img v-if="mobHeadLogo && mobHeadLogo[0] && isPreview !== 3 && (title === '' || title === '注册')" :src="staticDomain + mobHeadLogo[0].cpicSim">
      </div>
      <div class="hea-user hea-right">
        <a href="javascript:;">
          <div class="userICO"  @click="toggleRightSideMenu()" ><i class="yo-icon icon-account"></i></div>
          <span class="sxzhuc" v-if="this.path === 'index' &&  !isLogin" @click="GoRegister()">注册</span>
          <!-- v-if="this.path === 'index' && isLogin && type === '1'"-->
          <a href="javascript:;" v-if="$route.path.indexOf('/wap/eGame/') > -1"
            @click="$store.state.home.electricSearch=true"><i class="yo-icon icon-search" ></i></a>
          <span class="sxzhuc" @click="logout()" v-if="this.path === 'index' && isLogin && type === '1'" >退出</span>
				</a>
      </div>
    </div>
  </div>
</template>
<script>
import * as statusCode from '@/base/utils/status_const'

export default {
  data () {
    return {
      reg: false
    }
  },
  methods: {
    GoRegister () {
      this.$router.push('/wap/register')
    },
    toggleLeftSideMenu () { // 左侧菜单
      this.$store.state.home.MuseUI.open = true
      this.$store.state.home.MuseUI.dockedLeft = false
    },
    toggleRightSideMenu () { // 右侧菜单
      this.$store.state.home.MuseUI.openR = true
      this.$store.state.home.MuseUI.dockedRight = false
    },
    logout () {
      this.$store.dispatch('logout.action', {}).then(res => {
        this.$store.state.site.nowPosition = 0
        if (res.status === statusCode.statusConst.FAILURE) {
          window.layer.wsgWarn('退出失败', function () {
            window.layer.close()
          })
        } else {
          // 退出成功，返回首页 by aby
          this.delFavorite()
          this.$router.push({path: '/wap/index'})
        }
      })
    },
    delFavorite () { // 首页数组，视讯数组，体育数组 找到对应的id 改变为未收藏状态
      // 首页或者是视讯
      for (let i = 0; i < this.$store.state.home.liveGameList.length; i++) {
        this.$set(this.$store.state.home.liveGameList[i], 'isFavofite', false)
      }
      // 以TY结尾的表示是体育
      for (let i = 0; i < this.$store.state.home.sportList.length; i++) {
        this.$set(this.$store.state.home.sportList[i], 'isFavofite', false)
      }
      // 体育，视讯都有可能在首页展示，因此首页列表永远进行循环查询
      for (let i = 0; i < this.$store.state.home.gameList.length; i++) {
        this.$set(this.$store.state.home.gameList[i], 'isFavofite', false)
      }
      // 电子游戏
      for (let key of this.$store.state.home.eGamekeys) {
        let arr = this.$store.state.home[key + 'GameData'] || []
        for (let item of arr) {
          this.$set(item, 'isFavofite', false)
        }
      }
    }
  },
  computed: {
      /** 后端传入值为0 和 1 */
    type () {
      return this.$store.state.home.type
    },
    onTopLogoSim () {
        // 顶部log
      return this.$store.state.preView.topLogo.mobHeadLogoCpicSim
    },
    mobHeadLogo () {
        // 顶部log
      return this.$store.state.home.mobHeadLogo
    },
    isPreview () {
      return this.$store.state.preView.isPreview
    },
    title () {
      return this.$store.state.home.title
    },
    path () {
      return this.$store.state.home.path
    },
    isLogin () {
      return this.$store.state.home.isLogin
    },
    staticDomain () {
      return this.$store.state.home.staticDomain
    }
  }
}
</script>
