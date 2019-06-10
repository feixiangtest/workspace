<template>
  <div class="wrapper" pageId='game' >
    <!--公共的轮播图，公告-->
    <commonBanner></commonBanner>
    <div class="favoriteList liveSporBox">
      <!-- 游戏列表 -->
      <game-list :data="data" :dl-class="'indexFavorite'" :dd-class="'indexFavorite0'"
                 :img-div-class="'gameImg'" :no-status-icon="true" :img-url-prefix="staticDomain || ''"></game-list>
    </div>
    <!--底部分享、电脑版等公共菜单-->
    <fotMenu></fotMenu>
  </div>
</template>
<script>
  import commonBanner from '@/base/components/header/commonBanner'
  import gameList from '@/base/components/common/gameList'
  import fotMenu from '@/base/components/footer/fotMenu'
  // TOD 静态资源路径staticDomain 添加到img路径中
  export default {
    data () {
      return {
        staticDomain: this.$store.state.home.staticDomain // 非静态资源路径
      }
    },
    // 从父组件传入的值
    props: {
      data: Array // 游戏列表的数据
    },
    components: {
      commonBanner,
      gameList,
      fotMenu
    }
  }
</script>
