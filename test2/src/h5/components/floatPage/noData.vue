<template>
    <div class="nodata-content" :class="floatClass">
        <!-- 无内容时显示 -->
        <img src="@/assets/img/default/no-content.png" alt="">
        <div class="text grey-txt">暂无内容</div>
    </div>
</template>
<script>
export default {
  props: {
    floatClass: ''
  }
}
</script>

