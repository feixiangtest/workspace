<template>
    <!-- 底部维护公告 -->
    <div class='maintainNotice' v-if='showBottomBar'>
        <div id="annoument_win" class="wet-pbet" style="overflow: hidden; display: block;">
            <div id="ann_title" class="titlewei4">
                <div class="titleText"><strong id="an_title">{{title}}</strong></div>
                <div class="STYLE1" style="cursor:pointer;float:right;line-height:20px; padding-right:10px; font-size:20px; color:#FFFFFF" @click="closeBottomBar()">x</div>
            </div>
            <div id="ann_container" class="condng">
                {{content}}
                <div style="clear:both"></div>
            </div>
            <div style="clear:both"></div>
        </div>
    </div>
</template>
<script>
export default {
  props: ['title', 'content'],
  data () {
    return {}
  },
  computed: {
    showBottomBar () {
      return this.$store.state.copy.showBottomBar
    }
  },
  methods: {
    closeBottomBar: function () {
      this.$store.state.copy.showBottomBar = false
    }
  },
  mounted () {
    window.$('#ann_container').html(window.$('#ann_container').html().trim())
  }
}
</script>

