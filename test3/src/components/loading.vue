<template>
  <!-- 如果是去后端拿数据，则进行load, 样式用的是index.html -->
  <div class="load-mengceng">
    <div class="load-box">
      <div class="loading-animate">
          <svg class="lds-balls" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
              <circle cx="65.1362" cy="64.8638" r="10" fill="#FEB364">
                  <animate attributeName="cx" values="80;50" keyTimes="0;1" dur="0.4s" repeatCount="indefinite"></animate>
                  <animate attributeName="cy" values="50;80" keyTimes="0;1" dur="0.4s" repeatCount="indefinite"></animate>
                  <animate attributeName="fill" values="#FEB364;#00B39B" keyTimes="0;1" dur="0.4s" repeatCount="indefinite"></animate>
              </circle>
              <circle cx="35.1362" cy="65.1362" r="10" fill="#00B39B">
                  <animate attributeName="cx" values="50;20" keyTimes="0;1" dur="0.4s" repeatCount="indefinite"></animate>
                  <animate attributeName="cy" values="80;50" keyTimes="0;1" dur="0.4s" repeatCount="indefinite"></animate>
                  <animate attributeName="fill" values="#00B39B;#1F4C59" keyTimes="0;1" dur="0.4s" repeatCount="indefinite"></animate>
              </circle>
              <circle cx="34.8638" cy="35.1362" r="10" fill="#1F4C59">
                  <animate attributeName="cx" values="20;50" keyTimes="0;1" dur="0.4s" repeatCount="indefinite"></animate>
                  <animate attributeName="cy" values="50;20" keyTimes="0;1" dur="0.4s" repeatCount="indefinite"></animate>
                  <animate attributeName="fill" values="#1F4C59;#F45451" keyTimes="0;1" dur="0.4s" repeatCount="indefinite"></animate>
              </circle>
              <circle cx="64.8638" cy="34.8638" r="10" fill="#F45451">
                  <animate attributeName="cx" values="50;80" keyTimes="0;1" dur="0.4s" repeatCount="indefinite"></animate>
                  <animate attributeName="cy" values="20;50" keyTimes="0;1" dur="0.4s" repeatCount="indefinite"></animate>
                  <animate attributeName="fill" values="#F45451;#FEB364" keyTimes="0;1" dur="0.4s" repeatCount="indefinite"></animate>
              </circle>
          </svg>
          <!-- <img class="loading-gif" src="../assets/img/loding-min.gif"/> -->
      </div>
      <div class="loading-text">
        拼命加载中...
      </div>
    </div>
  </div>

</template>
<script>
// import Indicator from 'mint-ui/lib/indicator' // 按需加载mint-ui的模块
export default {
  data () {
    return {
      // isLoading: true
    }
  },
  mounted () {
    // Indicator.open({
    //   text: '正在加载..',
    //   spinnerType: 'fading-circle'
    // })
  },
  destroyed () {
    // Indicator.close()
    // this.isLoading = true
  }
}
</script>
