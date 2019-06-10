<template>
  <div class="inside-pages home">

    <public-header />

    <router-view/>  

    <!-- 手机端操作说明 -->
    <div class="game-explain" v-if='isExplain' id="explainBox">
        <i class="yo-icon icon-close" @click="closeExplain()"></i>
        <mt-swipe :auto="0" :continuous="false">
            <mt-swipe-item>
                <img src="@/assets/img/explain/exp1.jpg" alt="">
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="@/assets/img/explain/exp2.jpg" alt="">
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="@/assets/img/explain/exp3.jpg" alt="">
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="@/assets/img/explain/exp4.jpg" alt="">
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="@/assets/img/explain/exp5.jpg" alt="">
            </mt-swipe-item>
            <mt-swipe-item>
                <img src="@/assets/img/explain/exp6.jpg" alt="">
            </mt-swipe-item>
        </mt-swipe>
    </div> 

  </div>
</template>

<script>
import publicHeader from '@/components/header/header.vue'
import { mapState } from 'vuex'
export default {
  name: 'insidePage',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      isExplain: state => state.h5Home.isExplain
    })
  },
  components: {
    publicHeader
  },
  watch: {
    $route () {
      window.indexMain.ifRouteChange()
    }
  },
  mounted () {
    window.indexMain.ifRouteChange()
  },
  methods: {
    closeExplain () {
      this.$store.state.h5Home.isExplain = false
    }
  }
}
</script>