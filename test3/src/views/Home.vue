<template>
  <div class="home">
    <public-header />

    <router-view :key="key" />

    <!--左侧导航栏 -->
    <drawer :open="openLeft" :docked="dockedLeft" @close="toggle(true)">
        <left-menu />
    </drawer>

    <!--蒙层-->
    <loading v-if="showLoading"></loading>

  </div>
</template>

<script>
import publicHeader from '@/components/header/header.vue'
import leftMenu from '@/components/menu/menu.vue'
import loading from '@/components/loading'
export default {
  name: 'home',
  data () {
    return {
    }
  },
  computed: {
    key () {
      return this.$route.path + Math.random()
    },
    openLeft () {
      return this.$store.state.home.MuseUI.open
    },
    dockedLeft () {
      return this.$store.state.home.MuseUI.dockedLeft
    },
    showLoading () {
      return this.$store.state.home.showLoading
    }
  },
  components: {
    publicHeader,
    leftMenu,
    loading: loading
  },
  methods: {
    toggle (type) {
      if (type) {
        this.$store.state.home.MuseUI.open = !this.$store.state.home.MuseUI.open
        this.$store.state.home.MuseUI.dockedLeft = !this.$store.state.home.MuseUI.dockedLeft
      }
    }
  },
  watch: {
    $route () {
      window.indexMain.closeMuseUI()
      window.indexMain.gpoScrollTop()
      let routeName = this.$route.name
      if (routeName === 'agentAdd' || routeName === 'agentEdit' ||
      routeName === 'agentSave' || routeName === 'membershipAdd' ||
      routeName === 'membershipAddOne' || routeName === 'membershipEdit') {
        window.$('body').addClass('claer-fixed-box')
      } else {
        window.$('body').removeClass('claer-fixed-box')
      }
    }
  }
}
</script>
