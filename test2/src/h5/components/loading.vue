<template>
  <!-- 如果是去后端拿数据，则进行load, 样式用的是index.html -->
  <div class="load-mengceng">
    <div class="load-box">
      <div class="loading-animate">
          <svg class="lds-typing" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="10 20 80 53" preserveAspectRatio="xMidYMid" style="background: none;">
              <circle cx="27.5" cy="62.5" r="5" fill="#E25B63" class="">
                <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="62.5;37.5;62.5;62.5" keyTimes="0;0.25;0.5;1" dur="1s" begin="-0.5s" class=""></animate>
              </circle>
              <circle cx="42.5" cy="62.5" r="5" fill="#F37E60" class="">
                <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="62.5;37.5;62.5;62.5" keyTimes="0;0.25;0.5;1" dur="1s" begin="-0.375s" class=""></animate>
              </circle>
              <circle cx="57.5" cy="53.1978" r="5" fill="#F8B16A" class="">
                <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="62.5;37.5;62.5;62.5" keyTimes="0;0.25;0.5;1" dur="1s" begin="-0.25s" class=""></animate>
              </circle>
              <circle cx="72.5" cy="40.2066" r="5" fill="#ABBD7F" class="">
                <animate attributeName="cy" calcMode="spline" keySplines="0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5" repeatCount="indefinite" values="62.5;37.5;62.5;62.5" keyTimes="0;0.25;0.5;1" dur="1s" begin="-0.125s" class=""></animate>
              </circle>
          </svg>
      </div>
      <div class="loading-text">
        {{loadingText}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['loadingText'],
  data () {
    return {
    }
  },
  mounted () {
    window.indexMain.stopScroll()
  },
  destroyed () {
    window.indexMain.openScroll()
  }
}
</script>
