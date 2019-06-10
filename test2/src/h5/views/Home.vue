<template>
  <div class="home">

    <public-header />

    <router-view/>

    <public-footer />
    
    <!--加载样式-->
    <!-- <loading></loading> -->

    <!-- 第一弹出的 大图 带跳过按钮 -->
    <div class="guidePage" style="display: none;">
      <div class="viewpager">
        <img src="@/assets/img/pagecopy.png">
      </div>
      <div class="skipButtom">
        <a href="javascript:void(0);" >跳过</a>
      </div>
    </div>

    

  </div>
</template>

<script>
import publicHeader from '@/components/header/header.vue'
import publicFooter from '@/components/footer/indexFoot.vue'
import loading from '@/components/loading'
export default {
  name: 'home',
  data () {
    return {
    }
  },
  computed: {

  },
  components: {
    publicHeader,
    publicFooter,
    loading
  },
  watch: {
    $route () {
      window.indexMain.ifRouteChange()
    }
  },
  mounted () {
    window.indexMain.ifRouteChange()
  }
}
</script>
