<template>
  <div id="index">
    <router-view/>
    <float-page></float-page>
    <!-- 登录弹框 -->
    <pop-login-box></pop-login-box>
    <!-- 登录弹框 -->
    <change-pwd></change-pwd>
    <!-- 忘记密码弹框 -->
    <forget-box></forget-box>
    <foot/>
    <!--寰宇浏览器悬浮-->
    <aside class="bbininfo-wrap">
      <div class="btn-bbininfo bbin-downpic bbin-jump">
        <div id="bbininfo-btn-close" class="bbininfo-close"></div>
        <div id="bbininfo-slidebox">
          <a class="bbininfo-box bbin-toppic bbininfo-slide-active" href="https://www.ub66.com/" target="_blank">
            <img class="default-style" src="/resource/ot002/images/brcorner_zh-cn_150043383207.png" alt="">
          </a><br>
        </div>
      </div>
    </aside>
    <!--返回顶部-->
    <aside class="goTop" style="display: none;"></aside>
    <bottom-copy :title="maintainNotice.announcementName" :content='maintainNotice.content' v-if="maintainNotice && maintainNotice.announcementName"></bottom-copy>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Foot from '@/components/foot'
import bottomCopy from '@s/components/copy/bottomCopy.vue'
import floatPage from '@s/components/copy/float'
// import popLogin from '@s/components/doc/popLoginBox.vue' // 登录弹框import popLogin from '@s/components/doc/popLoginBox.vue' // 登录弹框
import changePwd from '@s/components/doc/changePwd.vue' // 修改密码弹框
import forgetBox from '@s/components/doc/forgetPassword.vue' // 忘记密码弹框
export default {
  name: 'index',
  components: {
    Foot,
    floatPage,
    // popLogin,
    bottomCopy, // 底部文案
    forgetBox,
    changePwd
  },
  data () {
    return {}
  },
  computed: {
    ...mapState({
      maintainNotice: state => state.shareApi.maintainNotice
    })
  },
  mounted () {
    let $ = window.$
    var thisWrap = $('.bbininfo-wrap') // 寰宇浏览器悬浮动画
    thisWrap.hover(function () {
      thisWrap.css({ 'right': '0px' })
    }, function () {
      thisWrap.css({ 'right': '-256px' })
      setTimeout(function () {
        thisWrap.css({ 'animation': 'bbinactive 1s' })
      }, 1200)
    })
    $('#bbininfo-btn-close').click(function () {
      thisWrap.remove()
    })
    let goTop = $('.goTop') // 回到顶部按钮
    let sc = $(document) // 得到document文档对象。
    let win = $(window) // 得到窗口对象
    win.scroll(function () {
      if (sc.scrollTop() >= 138) {
        goTop.fadeIn(500)
      } else {
        goTop.fadeOut(500)
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
<style scoped>
</style>