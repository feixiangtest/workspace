<template>
  <div class="topNav">
    <div class="center news clearfix">
      <span class="newsTitle">最新消息 / NEWS：</span>
      <div class="newsContent">
        <news :scrollamount="3" :scrolldelay="100" :direction="`left`" ></news> 
      </div>
    </div>
  </div>
</template>

<script>
import news from '@s/components/doc/news'
export default {
  components: {
    news
  },
  data () {
    return {
    }
  }
}
</script>
