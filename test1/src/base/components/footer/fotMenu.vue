<template>
<div class="fotMenu">
  <div class="wrapper_in">
    <div class="topc">
      <a href="javascript:;" @click="goToPcFunc()">
          <i class="yo-icon icon-pc"></i>
          <span class="textbtn" >切换到电脑版</span>
      </a>
    </div>
    <div class="copyright">版权所有 Copyright © Reserved</div>
  </div>
</div>
</template>
<script>
import * as cookieUtil from '@/base/utils/cookieUtil'
export default {
  data () {
    return {
    }
  },
  methods: {
    /**
     * 跳转PC端函数方法
     */
    goToPcFunc () {
      // 设置跳转手机端的cookie值，默认半小时
      cookieUtil.setCookie('goToPc', '1', 's1800')
      window.location = '/PageChange?type=pc'
    }
  },
  mounted: function () {
  }
}
</script>

