<template>
  <div id="bannerBox" class="banner">
    <el-carousel>
        <el-carousel-item v-for="(item,index) in bannerList" :key='index'>
            <div class="bannerImg" :style=" 'background-image:url(' +fastDfsUrl+ item.cpicSim + ')'" @click="$open(item.junctionSim,item.hrefTargetSim)"></div>
        </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    // 获取数据
    bannerList () {
      if (this.isPreview && this.loadArticle && this.loadArticle.section.stationKey === 'SY_LBT') {
        return this.loadArticle.photoDocList
      } else {
        return this.articleArr
      }
    },
    ...mapState({
      isPreview: state => state.shareApi.isPreview === 1, // 是否是预览
      staticDomain: state => state.shareApi.staticDomain, // 静态资源地址
      articleArr: state => state.shareApi.playimg, // 上传之后的轮播图
      fastDfsUrl: state => state.shareApi.fastDfsUrl, // 静态资源地址
      loadArticle: state => state.shareApi.loadArticle // 预览时轮播图
    })
  }
}
</script>


