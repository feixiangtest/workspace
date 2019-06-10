<template>
  <div class="quickNav">
      <ul>
          <li>
              <a class="promotion" @click="jumpUrl('promotion','优惠活动')" href="javascript:;">
                  <i class="yo-icon icon-promotion"></i>优惠活动
              </a>
          </li>
          <li>
              <a class="my-favorite" @click="jumpUrl('favorite','我的最爱')" href="javascript:;">
                  <i class="yo-icon icon-favorite"></i>我的最爱
              </a>
          </li>
          <li>
              <a class="lately-browse" @click="jumpUrl('clientDownload','客户端下载')" href="javascript:;">
                  <i class="yo-icon icon-download"></i>客户端下载
              </a>
          </li>
      </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    /**
     * 跳转
    */
    jumpUrl (url, title) { // 跳转函数
      if (url === 'favorite' && !this.isLogin) {
        this.$router.push('/wap/login')
        return
      }
      // 客户端下载
      if (url === 'clientDownload') {
        if (!this.$store.state.home.clientDownloadUrl) {
          window.layer.msgWarn('暂不支持客户端下载，请联系客服！')
        } else {
          window.open(this.$store.state.home.clientDownloadUrl, '_blank')
        }
        return
      }
      // 埋点
      window._dinWarmUp && window._dinWarmUp('send', 'event', 'Link', title, title)
      this.$store.state.home.path = url
      this.$store.state.home.title = title
      this.$router.push({path: '/wap/' + url})
    }
  },
  computed: {
    /**
     * 判断是否登陆
     */
    isLogin () {
      return this.$store.state.home.isLogin
    }
  }
}
</script>
