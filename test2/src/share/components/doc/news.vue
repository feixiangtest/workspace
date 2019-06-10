<template>
  <div>
      <marquee id="memberLatestAnnouncement" :scrollamount="scrollamount" :scrolldelay="scrolldelay"
      :direction="direction"  @click="hotNewsHistory(true)" onmouseout="this.start();" onmouseover="this.stop();"
      v-html="$store.state.shareApi.announcementList" :title="$store.state.shareApi.announcementList | txtFilter"></marquee>
      <history-news :showHotNews="showHotNews" :hotNewsHistory="hotNewsHistory"></history-news>
  </div>
</template>
<script>
/**
 *  webpack打包构建
 *  historyNews gulp编译 站点
 */
export default {
  components: { },
  props: ['scrollamount', 'scrolldelay', 'direction'],
  data () {
    return {
      showHotNews: false
    }
  },
  methods: {
    hotNewsHistory (val) {
      this.showHotNews = val
    }
  }
}
</script>



