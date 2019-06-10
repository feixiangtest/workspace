<template>
  <!--中间-->
  <div class="container">
    <!--轮播图区域-->
    <banner></banner>
    <!--菜单栏区域-->
    <menu-bar></menu-bar>
    <div class="indexCont">
      <div class="contentBox">
        <figure class="contentTitle"></figure>
        <div class="contentMenu">
          <ul class="clearfix">
            <li class="og">
              <a href="javascript:;" @click="$jumpLive('og')">
                <p>用心了解您的需求，力求创新，力求为您营造一个有活力，多元化，极具创新的博彩娱乐平台。</p>
              </a>
            </li>
            <li class="ag">
              <a href="javascript:;" @click="$jumpLive('ag')">
                <p>亚洲最具代表的网络博彩娱乐集团，致力于线上博弈游戏软件研发并提供整合平台服务。</p>
              </a>
            </li>
            <li class="bbin">
              <a href="javascript:;" @click="$jumpLive('bb')">
                <p>亚洲知名以及充满活力的最佳供应商，是亚洲知名以及成长迅速的领导者，提供超群的真人博彩平台。</p>
              </a>
            </li>
            <li class="ab">
              <a href="javascript:;" @click="$jumpLive('ab')">
                <p>受玩家欢迎并且工人最佳的真人视讯平台之一，GEO-TRUST国际工人，做玩家放心游戏平台。</p>
              </a>
            </li>
            <div class="move">
              <span @click="live()">
              </span>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menuBar from './header/menuBar'
import banner from './header/banner'
export default {
  name: 'home',
  components: {
    menuBar,
    banner
  },
  data () {
    return {
      showPopLogin: false // 显示登录弹出层
    }
  },
  mounted () {
    var $ = window.$
    $('.page-content-box .content-menu>ul>li').hover(
      function () {
        $(this)
          .find('p')
          .stop()
          .fadeIn(700)
      },
      function () {
        $(this)
          .find('p')
          .hide()
      }
    )
  },
  methods: {
    closePopLogin () {
      this.showPopLogin = false
    },
    closeForget () {
      this.showForget = false
    },
    // 跳转视讯页面
    live () {
      this.$router.push('/live')
    }
  }
}
</script>

