<template>
    <div class="public-footer common-footer" v-if="showFoot">     
        <!-- 内容页页脚 -->
        <div class="but-footer yow-content">
            <a href="javascript:void(0);" class="btn btn-primary btn-lg btn-block">{{footBtn}}</a>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      footBtn: state => state.h5Home.footBtn, // 底部内容
      showFoot: state => state.h5Home.showFoot // 显示
    })
  }
}
</script>