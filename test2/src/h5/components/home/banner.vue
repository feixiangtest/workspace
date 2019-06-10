<template>
<div>
  <!-- 如果是预览 -->
    <div class="banner-box yow-content" v-if='isPreview2===11'>
        <mt-swipe :auto="3000" v-if="previewList && previewList.section && previewList.section.stationKey && previewList.section.stationKey=='MOB_LBT' && previewList.photoDocList.length > 0">
            <mt-swipe-item v-for="(item,index) in previewList.photoDocList" :key='index' >
                 <img v-if="item.cpicSim" :src="fastDfsUrl+ item.cpicSim" alt=""   @click="$open(item.junctionSim,item.hrefTargetSim)">
            </mt-swipe-item>
        </mt-swipe>
          <img :src="commonImgUrl + '/replacePic.png'" alt="" v-else>
    </div>
      <!-- 若不是预览，显示正常的轮播 -->
    <div class="banner-box yow-content" v-if='isPreview2!==11'>
        <mt-swipe :auto="3000" v-if="mobPlayImg && mobPlayImg.length > 0">
            <mt-swipe-item v-for="(item,index) in mobPlayImg" :key='index' >
                 <img :src="fastDfsUrl+ item.cpicSim" alt=""   @click="$open(item.junctionSim,item.hrefTargetSim)">
            </mt-swipe-item>
        </mt-swipe>
         <img :src="commonImgUrl + '/replacePic.png'" alt="" v-else>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import { Swipe, SwipeItem } from 'mint-ui'
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

export default {
  data () {
    return {
      // error_img: ''
    }
  },
  created () {
    // this.error_img = require('@/assets/img/home/hot-game.png')
  },
  methods: {
    // loadImg (imgSrc) {
    //   return 'this.onload=null;this.src=' + '"' + imgSrc + '";'
    // },
    // errorImg () {
    //   return 'this.onload=null;this.src=' + this.error_img
    // },
    // showclick (v) {
    //   console.log(v, 'v')
    // }
  },
  computed: {
    ...mapState({
      commonImgUrl: state => state.h5Home.h5img, // H5静态地址
      isPreview2: state => state.h5Home.isPreview2, // 是否是预览
      mobPlayImg: state => state.h5Home.mobPlayImg, // 上传之后的轮播图
      fastDfsUrl: state => state.h5Home.fastDfsUrl, // 静态资源地址
      previewList: state => state.h5Home.popupAds.articleVo // 预览资源列表
    })
  }
}
</script>



