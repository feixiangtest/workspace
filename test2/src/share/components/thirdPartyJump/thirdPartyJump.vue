<template>
  <div id="thirdparty">

  </div>
</template>
<script>
/** new Router({ 直接引用 不适合
 * vue 单独编译注释：
 * */
import * as types from '@s/store/thirdPartyJump/type'
export default {
  beforeCreate () {
    /**
     * 监控到了异常
     err: Cannot read property 'addProcessCode' of undefined
     stack: TypeError: Cannot read property 'addProcessCode' of undefined
     at o.beforeCreate (
     */
  },
  mounted () {
    var key = this.$route.query.key
    window.thirdPartyJump.addProcessCode(key)
    this.$nextTick(function () {
      let param = this.$route.query
      param['hideLoading'] = true
      console.log(param, '游戏loginStatus')
      this.$store.dispatch(types.THIRD_ACTION, param).then(res => {
        // 响应回来的数据做跳转
        window.thirdPartyJump.afterRequestLoginGame(res, param)
      })
    })
  }
}
</script>

