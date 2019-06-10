<template>
    <div id="floatPage">
        <!-- 蒙版 -->
        <div class="mask" v-show='showModal'>
        </div>
        <!-- 左侧浮窗 -->
        <float floatDivName='left' :top='170' left='0' v-if="showLeftBar">
            <div class="leftBarBox" slot='scrollContent'>
                <span @click="closeLeftBar"><img :src="leftPicture" /></span>
            </div>
        </float>
        <!-- 右侧浮窗 -->
        <float floatDivName="right" :top='170' right='0' v-if='showRightBar'>
            <div class="rightBarBox" slot='scrollContent'>
                <span @click="closeRightBar"> <img :src="rightPicture"></span>
            </div>
        </float>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import * as types from '@s/store/copy/type.js'
import float from '@s/components/copy/float.vue'

/*
 vue 单独编译注释：
 第一次登录的通知框 import firstNotice from '@s/components/copy/firstNotice.vue'
 import loginNotice from '@s/components/copy/loginNotice.vue' 登录游戏的广告
 不要 import 引入
 * */
export default {
  data () {
    return {
      showLeftBar: true,
      showRightBar: true
    }
  },
  computed: {
    ...mapState({
      showModal: state => state.copy.showModal
    })
  },
  methods: {
    ...mapMutations({
      closeModal: types.CLOSEMODAL // 关闭蒙层
    }),
    closeLeftBar () {
      this.showLeftBar = false
    },
    closeRightBar () {
      this.showRightBar = false
    }
  },
  components: {
    float // 侧边浮动栏
  }
}
</script>

