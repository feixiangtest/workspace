<template>
  <div id="app" style="width: 100%; height: 100%;">
    <router-view/>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import preview from '@/utils/preview'
export default {
  mixins: [preview],
  computed: {
    ...mapState({
      hideMenuList: state => state.home.hideMenuList
    })
  },
  watch: {
    // 监控是否有限制权限访问的菜单列表，如果有那么访问此路径的时候，就不让他访问
    hideMenuList () {
      if (window.store.state.home.hideMenuList.indexOf(this.$route.name) !== -1) {
        window.layer.msgWarn('您没有权限进入此页面', () => {
          window.router.push('/m/index')
        })
      }
    }
  },
  mounted () {
    window.$('html').on('click', '.v-modal', function () {
      window.$('html').removeClass('fixPage')
    })
  },
  methods: {
    getPath () {
    }
  }
}
</script>
