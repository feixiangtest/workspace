<template>
  <div  class="layermbox layermbox0 layermshow">
      <div class="laymshade" @touchmove.prevent></div>

      <!-- 点击跑马灯时弹出的最新公告-->
      <div class="layermmain">
        <div class="section">
            <div class="layermchild  layermanim">
                <a class="lay-close-but" href="javascript:;" @click="hotNewsHistory(false)"><i class="yo-icon icon-close"></i></a>
                <h2 class="not-title"><i class="yo-icon icon-notice"></i> 最新消息</h2>
                <div class="layermcont" style="max-height: 240px;"> <!-- OT-4795 -->
                  <div class="yo-tancen" style="min-height: 194px;"> <!-- OT-4791 -->
                      <div v-html="hotNewsList"></div>
                  </div>
                </div>
            </div>
        </div>
      </div>

  </div>
</template>
<script>
 import * as types from '@s/store/shareApi/type.js'
import { mapState } from 'vuex'
export default {
   props: ['hotNewsHistory'],
   data () {
     return {
     }
   },
   mounted () {
     this.$store.dispatch(types.INITHISTORYMSG, { msgType: 'hotHistory' }).then(res => {})
   },
   computed: {
     ...mapState({
       hotNewsList: state => state.h5Home.announcementList // 最新消息
     })
   }
}
</script>
