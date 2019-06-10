<template>
  <div id="indexPage">
    <router-view/>

    <float></float>
    <!-- 登录弹框 -->
    <pop-login-box></pop-login-box>

    <!-- 登录弹框 -->
    <change-pwd></change-pwd>
    <!-- 忘记密码弹框 forget password.js -->
    <forget-password></forget-password>

    <div id="ele-float-top-wrap" class="goTop">
        <div id="ele-float-top">
            <div id="ele-float-top-up" class="ele-float-top-btn"></div>
        </div>
    </div>
    <bottom-copy :title="maintainNotice.announcementName"
       :content='maintainNotice.content'
       v-if="maintainNotice && maintainNotice.announcementName"></bottom-copy>
  </div>
</template>

<script>
/*
 vue 单独编译注释：
 import bottomCopy from '@s/components/copy/bottomCopy.vue'
 import popLogin from '@s/components/doc/popLoginBox.vue' // 登录弹框
 import floatPage from '@s/components/copy/float'
 使用同样名字 <pop-login-box>
 使用同样名字 <float></float>
 * */
import changePwd from '@s/components/doc/changePwd.vue' // 登录弹框

export default {
  name: 'index',
  components: {
    changePwd
  },
  data () {
    return {
      msg: '欢迎来到传奇软件！'
    }
  },
  computed: {
    maintainNotice () {
      return this.$store.state.shareApi.maintainNotice
    }
  },
  mounted () {
    let $ = window.$
    let goTop = $('.goTop') // 回到顶部按钮
    $(window).bind('scroll', function () {
      if ($(window).scrollTop() >= 200) {
        $('#ele-float-top-wrap').fadeIn(300)
      } else {
        $('#ele-float-top-wrap').fadeOut(300)
      }
    })
    goTop.click(function () {
      $('html,body').animate({
        scrollTop: 0
      }, 500)
    })
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
