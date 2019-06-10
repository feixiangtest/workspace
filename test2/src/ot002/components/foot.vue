<template>
  <!--页脚-->
  <footer class="footer">
    <figure class="footerIcons"></figure>
    <div class="footerLink">
      <ul class="clearFix">
        <li v-for="(item,index) in articleListArr" :key="index" @click="jumpWenan(item.section.stationKey)">
          <span v-if="index !== 0">/</span><a href="javascript:void(0);">{{item.section.title}}</a>
        </li>
      </ul>
    </div>
    <div class="copyright">Copyright © 太阳城集团 Reserved</div>
  </footer>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'foot',
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
