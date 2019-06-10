<template>
  <div  class="layermbox layermbox0 layermshow" v-show="isShow && content" id='commonAlert' style='z-index:9999' @keyup.enter="hideAlert2" @click='getFocus'>
   <div class="laymshade"></div>
   <div class="layermmain">
      <div class="section">
          <div class="layermchild layerConfirm layermanim" :style="{'width':`${width}px`,'height':`${height}px`}">
              <a href="javascript:;" @click="hideAlert2"><i class="yo-pop-close"></i></a>
              <h3 style="" v-text="title"></h3>
              <div class="advertsCont noLineHeight" v-html="content">

              </div>
              <div class="layermbtn advertsBtn">
                <span type="1" @click="hideAlert2">确定</span>
              </div>
          </div>
      </div>
   </div>
  </div>
</template>

<script>
export default {
  name: 'commonAlert',
  props: ['isShow', 'title', 'width', 'height', 'content', 'hideAlert'],
  updated () {
    if (document.getElementById('commonAlert')) {
      document.getElementById('commonAlert').focus()
      document.onkeydown = (e) => {
        if (e.code === 'Escape') {
          this.hideAlert2()
        }
      }
    }
  },
  methods: {
    hideAlert2 () {
      console.log(this.isShow, this.hideAlert, 'hidealert2')
      // this.isShow = false
      window.$('html').css('overflow', 'auto')
      this.hideAlert() // 通过父组件关闭弹框
    },
    getFocus () {
      if (document.getElementById('commonAlert')) {
        document.getElementById('commonAlert').focus()
        document.onkeydown = (e) => {
          if (e.code === 'Escape') {
            this.hideAlert()
          }
        }
      }
    }
  }
}
</script>
