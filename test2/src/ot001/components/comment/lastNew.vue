<template>
    <div class="news-wrap clearfix">
        <div class="news-title">最新公告 :</div>
        <div class="news-item" id="memberLatestAnnouncement">
                <news :scrollamount="3" :scrolldelay="100" :direction="`left`" ></news> 
        </div>
    </div>
</template>
<script>
import news from '@s/components/doc/news'
export default {
  name: 'lastNew',
  data () {
    return {}
  },
  components: {
    news
  },
  mounted () {}
}
</script>