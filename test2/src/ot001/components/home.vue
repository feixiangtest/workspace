<template>
  <!--中间-->
  <div>
    <div class="header">
      <div class="center">
        <com-header></com-header>
        <div class="ad-flash-wrap clearfix">
            <div class="ad-flash">
                <object id="" width="479" height="185" data="/resource/ot001/images/flash/banner-flash.swf"
                        type="application/x-shockwave-flash">
                    <param name="wmode" value="transparent">
                    <param name="src" value="/resource/ot001/images/flash/banner-flash.swf">
                    <param name="swfversion" value="8.0.35.0">
                    <param name="expressinstall" value="Scripts/expressInstall.swf">
                    <!--[if !IE]>-->
                    <object type="application/x-shockwave-flash" data="/resource/ot001/images/flash/banner-flash.swf" width="479"
                            height="185">
                        <!--<![endif]-->
                        <param name="quality" value="high">
                        <param name="wmode" value="transparent">
                        <param name="swfversion" value="8.0.35.0">
                        <param name="expressinstall" value="Scripts/expressInstall.swf">
                        <img src="/resource/ot001/images/banner-flash.png" alt="">
                    </object>
                </object>
            </div>
        </div>
        <last-new></last-new>
      </div>
    </div>
    <div class="indexContent">
        <div class="center clearfix">
            <a href="javascript:void(0);" v-for="(item,index) in newLiveList" :key="index" @click="goTO(item.key)">
              <img :src="item.key_index" alt="">
              <h2>
                <img :src="item.key_index_logo" alt="">
                {{item.key}}视讯
              </h2>
            </a>
        </div>
    </div>
    <index-foot></index-foot>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import * as types from '@s/store/live/type.js'
import comHeader from './comment/comHeader'
import lastNew from './comment/lastNew'
import indexFoot from './comment/indexFoot'

export default {
  name: 'home',
  components: {
    comHeader,
    lastNew,
    indexFoot
  },
  data () {
    return {
      newLiveList: [] // 根据后端获取的真人视讯信息组装的站点真人视讯相关信息（如：图片url； 真人视讯名称；跳转第三链接）
    }
  },
  mounted () {
    this.reStyle()
    this.initLiveList()
  },
  methods: {
    reStyle: function () {
      window.$('body').addClass('indexBody')
      window.$('html').removeClass('bannerHtml')
    },
    ...mapActions({
      initLiveListAction: types.INITLIVEDATALIST_ACTION
    }),
    initLiveList: function () {
      this.initLiveListAction().then(res => {
        this.liveList = res.data
        for (let key in res.data) {
          this.newLiveList.push({
            key: key, // 后端获取的key值
            key_index: '/resource/ot001/images/index-' + key + '.jpg', // 根据key值设定各视讯的图片路径
            key_index_logo: '/resource/ot001/images/platformLogo/logo-' + key + '.png' // 根据key值设定各视讯logo图的路径
          })
        }
      })
    },
    goTO: function (key) {
      this.$jumpLive(key)
    }
  }
}
</script>

