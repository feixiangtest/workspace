<template>
  <div class="wrapper">
    <!--公共的轮播图，公告-->
    <commonBanner></commonBanner>
    <!--快速导航-->
    <quickNav></quickNav>
    <div class="indexGame" style="margin-top:10px;">
      <!-- 游戏列表 -->
      <game-list :data="homeGameList" :dl-class="'homeGame'" :dd-class="'gameList'"
                 :img-div-class="'gameImg'" :img-url-prefix="staticDomain || ''"></game-list>
    </div>
    <!--底部分享、电脑版等公共菜单-->
    <fotMenu></fotMenu>
  </div>
</template>

<script>
import commonBanner from '@/base/components/header/commonBanner'
import gameList from '@/base/components/common/gameList'
import fotMenu from '@/base/components/footer/fotMenu'
import quickNav from '@/web/components/home/quickNav'
// import * as statusCode from 'utils/status_const'
// TODO img 需要区分静态资源路径和非静态资源路径 staticdomain, 登陆后的公告有瑕疵，等版本号控制弄好后就不在这样获取 by vito
export default {
  data () {
    return {
      firstMain: localStorage.getItem('firstMain'),
      currentIndex: 0
    }
  },
  props: {
    message: String
  },
  components: {
    commonBanner,
    gameList,
    fotMenu,
    quickNav
  },
  computed: {
    staticDomain () {
      return this.$store.state.home.staticDomain
    },
    /** 后端传入值为0 和 1,2 */
    type () {
      return this.$store.state.home.type
    },
    /**
     * 获取首页列表
     */
    homeGameList () {
      return this.$store.state.home.gameList
    }
  },
  mounted () {
    // 设置标题
    window.indexMain.setTitle()
  }
}
</script>
