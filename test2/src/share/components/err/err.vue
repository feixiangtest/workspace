<template>
  <p class="t-tipmsg" :class="aclass" v-if="regDate[message]">
    <span v-if="!aclass">
      <i v-if="regDate[message].status == 'err'" class="yo-plaintFull el-icon-plaintFull"></i>
      <i v-if="regDate[message].status == 'complete'" class="yo-correctFull el-icon-correctFull"></i>
    </span>
    <span v-if="regDate[message].status == 'warn'">    {{ regDate[message].warn }}  </span>
    <span v-if="regDate[message].status == 'err'">    {{ regDate[message].txt }}  </span>
    <span v-if="regDate[message].status == 'complete'">    {{ regDate[message].txt }}  </span>
  </p>
</template>
<script>
  /** 1 编译
   *    webpack打包构建
   */
  export default {
    data () {
      return {
        errName: 'complete',
        //  错误组件  1. 注册 2. 会员中心
        errType: ''
      }
    },
    props: {
      regDate: {
        type: Object,
        default: function () {
          return {}
        }
      },
      message: {
        type: String,
        default: function () {
          return ''
        }
      }
    },
    computed: {
      aclass () {
        /**
         *  状态 使用 class
         *  会员注册状态 {{complete: {aclass: string}, reg: {aclass: string}}}
         *  会员中心 提款 错误 提示 状态 center 归零 aclass: ''
         */
        let errList = {
          complete: {
            aclass: 'y-correct-msg'
          },
          warn: {
            aclass: 'y-warn-msg'
          },
          err: {
            aclass: 'y-error-msg'
          },
          center: { // 会员中心的 err 样式 使用
            aclass: ''
          }
        }
        var a = ''
        try {
          a = errList[this.regDate[this.message].status].aclass
        } catch (e) {
        }
        if (this.errType === 'center') a = ''
        return a
      }
    },
    mounted () {
      if (this.regDate.center) {
        this.errType = 'center'
      }
    }
  }
</script>
