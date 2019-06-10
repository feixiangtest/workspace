<template>
    <div class="details-main main-box">
        <!-- 游戏客户端 -->
        <div class="yo-form-item">
            <h5 class="title title-img">
              <span class="platform-icon">
                <img src="@/assets/img/conversion/icon-ag.png">
              </span>
              AG平台
          </h5>
        </div>
        <div class="yo-form-item">
            <h5 class="title">手机端操作说明</h5>
            <a href="javascript:void(0);" class="btn btn-square btn-bule" @click="openExplain()">查看</a>
        </div>
        <div class="yo-form-item">
            <h5 class="title">手机端下载地址</h5>
            <a href="javascript:void(0); " class="btn btn-square btn-bule" @click="toDownload()">前往</a>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { Swipe, SwipeItem } from 'mint-ui'
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
export default {
  data () {
    return {
    }
  },
  mounted () {
    this.$store.state.h5Home.headerType = 3
    this.$store.state.h5Home.headTitle = '游戏客户端'
    this.$store.state.h5Home.headLeft = 'icon-back'
    this.$store.state.h5Home.headRight = ''
  },
  methods: {
    toDownload () {
      window.open('http://agmbet.com/')
    },
    openExplain () {
      this.$store.state.h5Home.isExplain = true
      let h = window.screen.availHeight
      window.$('#explainBox').css('height', h)
    }
  }
}
</script>
