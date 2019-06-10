<template>
  <div style="position: relative;">
    <div class="banner" v-if="isPreview === 1">
      <mt-swipe :auto="4000" :show-indicators="false" v-if="previewList && previewList.section && previewList.section.stationKey && previewList.section.stationKey=='MOB_LBT' && previewList.photoDocList.length > 0">
        <template>
          <mt-swipe-item
            :id="'photoDocList_' + index" :key="'photoDocList_' + index"
            v-for="(item, index) in previewList.photoDocList">
            <img v-if="item.cpicSim" :src="staticDomain + item.cpicSim" @click="forward(item.junctionSim)" style="pointer-events: auto;"/>
          </mt-swipe-item>
        </template>
      </mt-swipe>
    </div>
    <div class="banner" v-if="isPreview !== 1">
      <mt-swipe :auto="4000" :show-indicators="false" v-if="mobPlayImg && mobPlayImg.length > 0">
        <mt-swipe-item :id="'photoDocList_' + index"
                       :key="'photoDocList_' + index" v-for="(item, index) in mobPlayImg">
          <img v-if="item.cpicSim" :src="staticDomain + item.cpicSim" @click="forward(item.junctionSim)" style="pointer-events: auto;"/>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="yo-gonggao">
      <i class="yo-icon icon-sound"></i>
      <marquee id="affiche" behavior="scroll" direction="left" scrollamount="1" scrolldelay="20" truespeed="20"
               @click="footHide()" v-if="this.announcementList.length >= 1">
        {{announcementList[0].gbkContent}}
      </marquee>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import Swipe from 'mint-ui/lib/swipe'
  import SwipeItem from 'mint-ui/lib/swipe-item'
  import * as index from '@/base/config/index'

  Vue.component(Swipe.name, Swipe)
  Vue.component(SwipeItem.name, SwipeItem)

  // TODO img 要区分静态资源文件staticDomain 和非静态资源文件 by vito
  export default {
    data () {
      return {
      }
    },
    computed: {
      previewList () {
        // 浏览登录loginlogo
        return this.$store.state.preView.popupAds.articleVo
      },
      isPreview () {
        return this.$store.state.preView.isPreview
      },
      staticDomain () {
        return this.$store.state.home.staticDomain
      },
      mobPlayImg () {
        return this.$store.state.home.mobPlayImg
      },
      announcementList () {
        return this.$store.state.home.announcementList
      },
      listArticleVo () {
        return this.$store.state.home.listArticleVo
      }
    },
    methods: {
      footHide () {
        if (navigator.onLine) {
          this.$store.state.site.openOuterlayer = true
          this.$store.state.site.outerlayerType = index.outerlayerType.openGonggao
        } else {
          window.layer.msgWarn('网络连接中断，请检查您的网络')
        }
      },
      forward (url) {
        if (url) {
          window.open(url, '_blank')
        }
      }
    },
    mounted () {
      // 事件 穿透 阻止 right 可以生效
      let $this = this
      window.$(document).on('touchend', '.opacity6', (e) => {
        $this.openGonggao = false
        $this.footHide()
        console.info('阻止 点击穿透')
        e.preventDefault()
      })
    }
  }
</script>
