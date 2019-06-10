<template>
  <div class="appMain">
    <router-view/>
    <loading loadingText='加载中...' v-if="showLoading"></loading>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import loading from '../../components/loading'
  import * as cookieUtil from '@s/utils/cookieUtil'
export default {
    data () {
      return {
        cookieUtils: cookieUtil
      }
    },
    components: {
      loading
    },
    computed: {
      ...mapState({
        showLoading: state => state.shareApi.showLoading, // 用户信息
        showPopLogin: state => state.shareApi.showPopLogin // 是否显示注册入口
      })
    },
    created () {
      /** 预览案件请求统一在此调用 begin */
      let _query = this.$route.query
      let _isPreview = _query.isPreview // 预览参数
      let _articleId = _query.articleId // 文案ID
      let _d = _query.d
      if (_isPreview && _articleId) {
        // 预览请求
        this.$store.dispatch('shareApi.loadArticle.action', {
          articleId: _articleId,
          sourceType: 'mobile'
        }).then(res => {
          switch (Number(_isPreview)) {
            case 1: // 手机版优惠活动
              if (_d === 'preferential') { // 手机版优惠活动
                this.$store.state.h5Home.mobPromotion = res.data.articleVo.photoDocList
                this.$store.state.h5Home.isPreview2 = 1
                window.router.push('/wap/promotion')
              } else {
                this.$store.state.h5Home.isPreview2 = 11
                this.$store.state.h5Home.popupAds = res.data
                console.log('弹出广告 + 轮播图', this.$store.state.h5Home.popupAds)
              }
              console.log('lunbotu', res.data)
              break
            case 2: // 手机首页引导图
              this.$store.state.h5Home.guideMap = res.data
              this.$store.state.h5Home.isPreview2 = 2
              console.log('手机首页引导图', this.$store.state.h5Home.guideMap)
              break
            case 3: // 手机端顶部LOGO
              this.$store.state.h5Home.topLogo = res.data // 顶部logo
              this.$store.state.h5Home.isPreview2 = 3
              console.log('手机端顶部LOGO', this.$store.state.h5Home.topLogo)
              break
            case 4: // 手机端登陆界面LOGO
              this.$store.state.h5Home.loginLogo = res.data
              console.log('手机端登陆界面LOGO', this.$store.state.h5Home.loginLogo)
              this.$store.state.h5Home.isPreview2 = 4
              break
            default:
              this.$store.state.h5Home.isPreview2 = 0
          }
        })
      } else {
        this.$store.state.h5Home.isPreview2 = 0
      }
      if (_d === 'preferential') { // 手机版优惠活动
        window.router.push('/wap/promotion')
      }
      /** 预览案件请求统一在此调用 end */
      // 归零数据
      window.indexMain.reset()
    },
    mounted () {
      // this.laodPriviewTest()
      // 如果有url有推荐码截取推荐码 并跳转到注册页
      let intrArr = window.location.search.split('=')
      this.$nextTick(() => {
        window.$('#preApp').remove()
        if (intrArr[0] === '?Intr') {
          let Intr = !intrArr[1] ? '' : intrArr[1]
          this.cookieUtils.setCookie('Intr', Intr, 'd30')
          window.router.push('/wap/register')
          return ''
        }
      })
    },
    watch: {
      showPopLogin (v) { // 监听是否需要登录
        if (v) {
          this.$store.state.shareApi.showPopLogin = false
          window.router.push('/wap/login')
        }
      }
    }
  }
</script>
