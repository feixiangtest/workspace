<template>
    <div id="livePage">
        <div class="header">
            <div class="center">
                <com-header></com-header>
                <div class="banner-wrap"></div>
                <last-new></last-new>
            </div>
        </div>
        <div class="liveContent">
            <div class="center clearfix">
                <div class="casino-hall">
                    <ul>
                        <li v-for="(item,index) in newLiveList" :key="index" @mouseenter="hoverEnter($event)" @mouseleave="hoverLeave($event)">
                            <a href="javascript:void(0);" @click="goTO(item.key)">
                                <div class="casino-hall-img">
                                    <div class="casino-t" style="display: none; height: 110px; padding-top: 0px; margin-top: 0px; padding-bottom: 0px; margin-bottom: 0px;">
                                        <span class="casino-a-img"><img :src="item.key_live_logo"></span>
                                    </div>
                                    <div>
                                        <img :src="item.key_live" class="img-responsive">
                                    </div>
                                    <div class="casino-t casino-b" style="display: none; height: 109px; padding-top: 0px; margin-top: 0px; padding-bottom: 0px; margin-bottom: 0px;"><span class="casino-a-text">进入游戏</span></div>
                                </div>
                            </a>
                            <div class="casino-mc" style="display: block;">
                                <span>{{item.name}}</span>
                                  <small><label>{{item.onlineNum}}</label>人在玩</small>
                            </div>
                            <div class="casino-mc-btn" style="display: none;">
                                <a href="javascript:void(0);" @click="goTO(item.key)">进入游戏</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="indexFoot">
          <div class="footer">
            <div class="center">
              <com-footer></com-footer>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import * as types from '@s/store/live/type.js'
import comHeader from './comment/comHeader'
import lastNew from './comment/lastNew'
import comFooter from './comment/comFoot'
export default {
  name: 'live',
  components: {
    comHeader,
    lastNew,
    comFooter
  },
  data () {
    return {
      liveList: {},
      newLiveList: [] // 根据后端获取的真人视讯信息组装的站点真人视讯相关信息（如：图片url； 真人视讯名称；跳转第三链接）
    }
  },
  mounted () {
    this.reStyle()
    this.initLiveList()
  },
  methods: {
    ...mapActions({
      initLiveListAction: types.INITLIVEDATALIST_ACTION
    }),
    initLiveList: function () {
      this.initLiveListAction().then(res => {
        this.liveList = res.data
        for (let key in res.data) {
          this.newLiveList.push({
            key: key, // 后端获取的key值
            name: res.data[key], // 后端获取的视讯名称
            key_live: '/resource/ot001/images/live/live_' + key + '.png', // 根据key值设定各视讯的图片路径
            key_live_logo:
              '/resource/ot001/images/live/live_' + key + '_logo.png', // 根据key值设定各视讯logo图的路径
            onlineNum: this.getNumRandom()
          })
        }
      })
    },
    goTO: function (key) {
      // 视讯 跳转
      this.$jumpLive(key)
    },
    reStyle: function () {
      window.$('body').removeClass('indexBody')
      window.$('html').addClass('bannerHtml')
    },
    // 随机生成各视讯的在线人数
    getNumRandom: function () {
      var rnd = Math.floor(Math.random() * (3999 - 1000) + 1000)
      return rnd
    },
    hoverEnter: function (event) {
      // 图片动画效果
      let curentDom = event.currentTarget
      window.$(curentDom).find('.casino-b').stop().slideUp()
      window.$(curentDom).find('.casino-t').stop().slideDown()
      window.$(curentDom).find('.casino-mc').stop().hide()
      window.$(curentDom).find('.casino-mc-btn').stop().show()
    },
    hoverLeave: function (event) {
      // 图片动画效果
      let curentDom = event.currentTarget
      window.$(curentDom).find('.casino-b').stop().slideDown()
      window.$(curentDom).find('.casino-t').stop().slideUp()
      window.$(curentDom).find('.casino-mc').stop().show()
      window.$(curentDom).find('.casino-mc-btn').stop().hide()
    }
  }
}
</script>
<style scoped>
html {
  background: #0b132a url(/resource/ot001/images/top-bg2.jpg) center top no-repeat;
}
</style>

