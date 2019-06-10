<template>
    <div class="layermbox layermbox0 layermshow maintainNotice" v-show="isShow&&maintainShow ">
      <div class="laymshade"  @touchmove.prevent></div>
      <!-- 页面中的提示弹框 \ 手机版第一次弹出广告 -->
      <div class="layermmain" >
          <div class="section">
              <div class="layermchild  layermanim" >
                  <h4>{{maintainNotice.announcementName}}</h4>
                  <div class="layermcont" >
                    <div class="yo-tancen">
                        <div id='mobAdContent'>{{maintainNotice.content}}</div>
                    </div>
                  </div>
                  <div class="layermbtn">
                      <span id="layerMOkBtn" @click='toNextAd()'>确定</span>
                  </div>
              </div>
          </div>
        </div>
    </div>
</template>
<script>
    import {
      mapState
    } from 'vuex'
    export default {
      name: 'maintainNotice',
      components: {},
      data () {
        return {
          isShow: false // 默认不现实
        }
      },
      mounted () {
        // 已经弹出过了 不要在弹出了
        if (localStorage['maintainNotice.stop']) {
          this.isShow = false
          window.indexMain.openScroll()
        } else {
          if (this.maintainNotice && this.maintainNotice.content) {
            this.isShow = true
            window.indexMain.stopScroll()
          } else {
            this.isShow = false
            window.indexMain.openScroll()
          }
        }
      },
      watch: {
        maintainNotice () {
          if (this.maintainNotice && this.maintainNotice.content) {
            this.isShow = true
            window.indexMain.stopScroll()
          } else {
            this.isShow = false
            window.indexMain.openScroll()
          }
        }
      },
      computed: {
        ...mapState({
          maintainShow: state => state.h5Home.maintainShow, // 维护公告是否弹出
          maintainNotice: state => state.shareApi.maintainNotice // 数据
        })
      },
      methods: {
        // 点击 关闭
        toNextAd () {
          this.isShow = null
          localStorage['maintainNotice.stop'] = true
        }
      }
    }
</script>
