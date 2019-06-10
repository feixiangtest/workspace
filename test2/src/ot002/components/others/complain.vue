<template>
  <div id="complain">
      <div class="container">
        <div class="inner-banner">
          <figure class="about-banner"></figure>
        </div>
      </div>
      <div class="indexCont live-content-bg">
        <div class="contentBox" style="padding-top: 110px;">
            <complain-form></complain-form>
        </div>
      </div>
  </div>
</template>

<script>
import menuBar from '../header/menuBar'
/*
 complainForm.vue 单独编译注释：
 单独编译 不要 import 引入
 * */
export default {
  name: 'contactus',
  data () {
    return {
    }
  },
  components: {
    menuBar
  }
}
</script>
