<template>
<div>
    <div class="footer-logo-wrap">
        <a id="bblogo" href="javascript:;"></a>
        <a id="browser-logo"></a>
    </div>
    <div class="article-menu-wrap">
        <div class="article-menu">
            <ul>
                <li v-for="(item,index) in articleListArr" :key="index" @click="jumpWenan(item.section.stationKey)"><a href="javascript:void(0);">{{item.section.title}}</a>|</li>
                <li><a href="javascript:void(0);" @click=" toUrl('/alone/help/home')">常见问题</a></li>
            </ul>
        </div>
        <div class="copyright">Copyright © 传奇软件 Reserved</div>
    </div>
    <div class="footer-info">传奇软件所提供的产品和服务，是由澳门政府THE&nbsp;MACAO&nbsp;SPECIAL&nbsp;ADMINISTRATIVE&nbsp;REGION.授权和监管。选择我们，您将拥有可靠的资金保障和优质的服务。</div>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'comFoot',
  data () {
    return {}
  },
  computed: {
    ...mapState({
      articleListArr: state => state.shareApi.homeArticle // 上传之后的底部文案
    })
  },
  methods: {
    // 跳转到文案页面
    jumpWenan (key) {
      // 跳转到文案页面
      this.$router.push({ path: '/wenan', query: { 'curKey': key } })
    },
    toUrl (url) {
      window.open(url, '_blank')
    }
  }
}
</script>
