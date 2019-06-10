<template>
<div class="yo-left-menu">
    <h1 class="yo-title">导航</h1>
    <ul class="sideMenu sideMenuMaxScreen">
        <li>
            <a href="javascript:;" @click="jumpUrl('index')">
                <i class="yo-icon icon-home"></i>首页
            </a>
        </li>
        <li>
            <a href="javascript:;" @click="jumpUrl('live', '真人视讯')">
                <i class="yo-icon icon-live"></i>真人视讯
            </a>
        </li>
        <li>
            <a href="javascript:;" @click="jumpUrl('sports', '体育')">
                <i class="yo-icon icon-sports"></i>体育赛事
            </a>
        </li>
        <li>
            <a href="javascript:;" @click="toElectron()">
                <i class="yo-icon icon-solt"></i>电子游戏
            </a>
        </li>
        <li>
            <a href="javascript:;" @click="toLottery()">
                <i class="yo-icon icon-lottery"></i>彩票游戏
            </a>
        </li>
        <li>
            <a href="javascript:;" @click="jumpUrl('chessGame', '棋牌游戏')">
                <i class="yo-icon icon-chessgame"></i>棋牌游戏
            </a>
        </li>
        <li>
          <a href="javascript:;" @click="jumpUrl('fishingGame', '捕鱼游戏')">
            <i class="yo-icon icon-fishing"></i>捕鱼游戏
          </a>
        </li>
        <li>
            <a href="javascript:;" @click="jumpUrl('promotion', '优惠活动')">
                <i class="yo-icon icon-gift"></i>优惠活动
            </a>
        </li>
        <li>
            <a href="javascript:;" @click="jumpUrl('favorite', '我的最爱')">
                <i class="yo-icon icon-favorite2"></i>我的最爱
            </a>
        </li>
        <li>
            <a href="javascript:;" @click="jumpUrl('browse', '最近浏览')">
                <i class="yo-icon icon-times"></i>最近浏览
            </a>
        </li>
    </ul>
</div>
</template>

<script>
import method from '@/base/utils/method'
export default {
  computed: {
    isLogin () {
      return this.$store.state.home.isLogin
    }
  },
  methods: {
    jumpUrl (url, title) { // 跳转函数
      // 选中后默认将侧边栏关闭
      window.indexMain.closeMuseUI()
      if ((url === 'favorite' || url === 'browse') && !this.isLogin) {
        this.$router.push('/wap/login')
        return
      }
      this.$store.state.home.path = url
      if (title) {
        this.$store.state.home.title = title
      } else {
        this.$store.state.home.title = ''
      }
      this.$store.state.site.nowPosition = 0
      this.$router.push({path: '/wap/' + url})
    },
    toElectron () {
      window.indexMain.closeMuseUI()
      this.$store.state.home.title = '电子'
      // 解决点击电子游戏时，需要手动刷新才能显示搜索按钮的问题
      this.$store.state.site.nowPosition = 0
      this.$router.push('/wap/eGame')
      this.$store.state.home.path = 'eGame'
    },
    toLottery () {
      window.indexMain.closeMuseUI()
      var left = (document.body.clientWidth - 1000) / 2
      var params = 'height=680,width=970,top=0,left=' + left +
        ',toolbar=no,menubar=no,scrollbars=no, resizable=yes,location=yes, status=yes'
      // this.$store.dispatch('rent.action', {'modelId': 31941})// 加入到最近浏览列表
      let {parseThird} = method
      if (!parseThird(this, {key: 'cp'}, true)) {
        return false
      }
      // 左右导航完全关闭之后再打开新窗口
      setTimeout(function () {
        window.open(window._HOSTNAME + '/wap/thirdPartyJump?type=loginapi&key=cp&isMobile=1&domainList=' + window.store.state.site.fastUrl, '彩票', params)
      }, 330)
    }
  }
}
</script>
