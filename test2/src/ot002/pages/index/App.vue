<template>
  <div id="app" style="position: relative">
    <nav-header v-if="!routePath"></nav-header>
    <!--站点弹出广告 begin-->
    <pop-up-ad></pop-up-ad>
    <!--站点弹出广告 end-->

    <!--前往手机端提示 begin-->
    <mobile-alert></mobile-alert>
    <!--前往手机端提示 end-->

    <!--会员登入弹出广告 begin-->
    <pop-up-message></pop-up-message>
    <!--会员登入弹出广告 end-->

    <router-view/>

  </div>
</template>

<script>
  // import * as types from '../../store/home/type.js'
  //  import * as shareApiTypes from '@s/store/shareApi/type.js'
  import navHeader from '../../components/header/index'
  import floatPage from '../../components/floatPage.vue'
  import popUpAd from '../../../share/components/copy/popUpAd.vue'
  import popUpMessage from '@s/components/copy/popUpMessage'
  import mobileAlert from '../../../share/components/copy/mobileAlert.vue'
  export default {
    name: 'App',
    data () {
      return {
        //   imgurl: require('@s/assets/logo.png')
      }
    },
    created () {
      /** 预览案件请求统一在此调用 begin */
      let _query = this.$route.query
      let _isPreview = _query.isPreview // 预览参数
      let _articleId = _query.articleId // 文案ID
      if (_isPreview && _articleId) {
        // 提交预览
        this.$store.commit('shareApi.isPreview.mutation', 1)
        // 预览请求
        this.$store.dispatch('shareApi.loadArticle.action', { isPreview: _isPreview, articleId: _articleId })
      } else {
        this.$store.commit('shareApi.isPreview.mutation', null)
      }
      /** 预览案件请求统一在此调用 end */
    },
    computed: {
      routePath () {
        return this.$route.path === '/thirdPartyJump'
      }
    },
    methods: {},
    components: {
      navHeader,
      floatPage,
      popUpAd,
      popUpMessage,
      mobileAlert
    },
    mounted () {
      this.$nextTick(() => {
        if (location.pathname === '/') {
          this.$router.push('/home')
        }
      })
    },
    watch: {
      $route: {
        handler: function (val) {
          this.$store.commit('shareApi.isPreview.mutation', null)
        },
        immediate: true,
        deep: true
      }
    }
  }
</script>
