<template>
  <div id="app" style="position: relative;">
    <!--站点弹出广告 begin-->
    <pop-up-ad></pop-up-ad>
    <!--站点弹出广告 end-->

    <!--前往手机端提示 begin-->
    <mobile-alert></mobile-alert>
    <!--前往手机端提示 end-->

    <!--会员登入弹出广告 pop-up-message begin-->
    <pop-up-message></pop-up-message>
    <!--会员登入弹出广告 end-->

    <router-view/>
  </div>
</template>

<script>
// import * as shareApiTypes from '@s/store/shareApi/type.js'
/*
 vue 单独编译注释：
 import popUpAd from '../../../share/components/copy/popUpAd.vue'
 import mobileAlert from '../../../share/components/copy/mobileAlert.vue'
 import popUpMessage from '@s/components/copy/popUpMessage'
 *放过这个不会修改
 不要 import 引入
 * */
export default {
  name: 'App',
  data () {
    return {
      // imgurl: require('@s/assets/logo.png')
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
  components: {
  },
  watch: {
    $route: {
      handler: function (val) {
        this.$store.commit('shareApi.isPreview.mutation', null)
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
  },
  mounted () {
    this.$nextTick(() => {
      if (location.pathname === '/') {
        this.$router.push('/home')
      }
    })
  }
}
</script>

