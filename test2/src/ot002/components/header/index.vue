<template>
  <header class="header">
    <!--最新消息区域-->
    <news></news>
    <!--logo菜单区域-->
    <logo-section></logo-section>
    <menu-bar v-if="routerPath" class="heaFixedBox"></menu-bar>
  </header>
</template>

<script>
  import news from './news'
  import logoSection from './logoSection'
  import menuBar from './menuBar'

  export default {
    components: {
      news,
      logoSection,
      menuBar
    },
    data () {
      return {
      }
    },
    computed: {
      routerPath () {
        return this.$route.path !== '/home' // 是否是首页
      }
    }
  }
</script>
