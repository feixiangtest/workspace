<template>
    <div  class="layermbox layermbox0 layermshow" v-show="isShow&&mobAd&&mobAd.length>0">
      <div class="laymshade"  @touchmove.prevent></div>
      <!-- 页面中的提示弹框 \ 手机版第一次弹出广告 -->
      <div class="layermmain" >
          <div class="section">
              <div class="layermchild  layermanim" v-if='mobAd[modAdIndex]'>
                  <h4>{{mobAd[modAdIndex].titleSim}}</h4>
                  <div class="layermcont">
                    <div class="yo-tancen">
                        <div v-html="mobAd[modAdIndex].contextSim" id='mobAdContent'></div>
                    </div>
                  </div>
                  <div class="layermbtn">
                      <span type="1" id="layerMOkBtn" @click='toNextAd()'>确定</span>
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
      name: 'popUpAd',
      components: {},
      data () {
        return {
          isShow: true, // 是否展示首页广告
          modAdIndex: 0 // 第几条游戏弹框
        }
      },
      mounted () {
        // 如果首页广告已经弹过，那么下面就不弹
        if (localStorage.getItem('mobAdFirstPop') === '1') {
          this.isShow = false
          this.$store.state.h5Home.mobAd = []
        }
        if (this.isShow && this.mobAd && this.mobAd.length > 0) {
          window.indexMain.stopScroll()
        } else {
          window.indexMain.openScroll()
        }
        if (this.isShow) {
          this.$store.state.h5Home.maintainShow = false
        }
      },
      computed: {
        ...mapState({
          mobAd: state => state.h5Home.mobAd // 静态资源地址
        })
      },
      methods: {
        // 点击显示下一个广告
        toNextAd () {
          this.modAdIndex++
          if (this.modAdIndex >= this.mobAd.length) {
            localStorage.setItem('mobAdFirstPop', 1)
            this.isShow = false
            // 当前弹窗关闭了
            this.$store.state.h5Home.maintainShow = true
            this.$store.state.h5Home.mobAd = []
            window.indexMain.openScroll()
          }
        }

      }
    }
</script>
