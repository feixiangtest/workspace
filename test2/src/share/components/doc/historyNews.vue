<template>
  <div  class="layermbox layermbox0 layermshow" v-if="showHotNews">
      <div class="laymshade"></div>
      <div class="layermmain">
          <div class="section">
              <div class="layermchild layerConfirm layermanim" style="width:686px; height: 440px;">
                  <a href="javascript:;" @click="hotNewsHistory(false)"><i class="yo-pop-close"></i></a>
                  <h3 style="">历史讯息</h3>
                  <div class="advertsCont popNewsList">
                        <dl>
                          <dd v-for="(item,index) in hotNewsList" :key="index">
                            <span>{{item.createDateTime}}</span>
                            <p style="word-break: break-all;">{{item.gbkContent  | txtFilter}}</p>
                          </dd>
                        </dl>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
/**
*  gulp编译 historyNews.js'
 * 站点news 弹窗
 */
export default {
  props: ['showHotNews', 'hotNewsHistory'],
  data () {
    return {
      hotNewsList: ''
    }
  },
  created () {
    this.$store.dispatch('shareApi.initHistoryMsg', { msgType: 'hotHistory' }).then(res => {
      var _message = res.data.messageList
      this.hotNewsList = res.data.messageList
      if (_message && _message.length) {
        this.hotNewsList = _message.slice(0, 10)
      }
    })
  }
}
</script>



