<template>
  <div class="login-before">
    <div class="form-box clearfix">
      <div>
        <input type="button" name="submit" class="submit_btn reglink" value="贵宾注册" v-if="!isShowReg" @click="reglink()" >
        <input type="button" name="submit" class="submit_btn" value="登录" @click.stop='$store.state.shareApi.showPopLogin = true'>
      </div>
    </div>
    <!-- 验证码弹框，传入的参数分别是（是否显示弹框，弹框取消的方法，弹框内验证码登录的方法） -->
    <check-code-tg :showCheckCode='showCheckCode' :closeCheckCode='closeCheckCode' :yzmLogin='yzmLogin'></check-code-tg>
    <!-- 游戏协议公告 -->
    <game-protocol :showLoginNotice='showLoginNotice' :agree='agree' :disagree='disagree'></game-protocol>

  </div>
</template>
<script>
import loginBefore from '@s/components/loginBefore'
var _loginBefore = window._.extend({}, loginBefore)
export default _loginBefore
</script>

