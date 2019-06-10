<template>
    <!-- 手机端提示框 -->
    <div id="mobilealert" v-if="showMobilealert">
        <div class="iealertMain">
            <a href="javascript:void(0);" @click="goToMobile()">访问手机端</a>
            <div id="iealertX">x</div>
        </div>
        <!-- <div style="width:100%;height:25px;">
            &nbsp;&nbsp;
        </div> -->
    </div>
</template>
<script>
export default {
  name: 'mobileAlert',
  data () {
    return {
      showMobilealert: false
    }
  },
  methods: {
    /**
    * 跳转手机端函数方法
    */
    goToMobile () {
      window.common.delCookie('toPcSite')
      localStorage.place = '_h5'
      setTimeout(() => {
        // 设置跳转手机端的cookie值
        window.location.href = `${window.location.origin}/wap/index?t=${new Date().getTime()}`
      }, 10)
    },
    showMobile () {
      let pageType = window.common.getCookie('toPcSite')
      if (pageType !== '' && pageType !== null) {
        this.showMobilealert = true
      }
    }
  },
  mounted () {
    this.showMobile()
  }
}
</script>
