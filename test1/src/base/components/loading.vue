<template>
  <!-- 如果是去后端拿数据，则进行load, 样式用的是index.html -->
  <div class="mengceng leftMengceng" style="background:none">
    <!--<div id="loading" class="lds-css ng-scope">
      <div class="yo-jiazai">
        <div class="lds-ellipsis">
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
        </div>
        <span style="position: relative;top:-40px;left:108px;font-size:16px;color:#FFFFFF">加载中...</span>
      </div>
    </div>-->
  </div>
</template>
<script>
import Indicator from 'mint-ui/lib/indicator' // 按需加载mint-ui的模块
export default {
  data () {
    return {
    }
  },
  mounted () {
    Indicator.open({
      text: '正在加载..',
      spinnerType: 'fading-circle'
    })
  },
  destroyed () {
    Indicator.close()
  }
}
</script>
