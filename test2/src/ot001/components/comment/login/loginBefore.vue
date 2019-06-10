<template>
  <div class="header-right">
    <form action="">
      <input class="btn-submit" type="button" value="登录" @click.stop='validMemberInfo' />
      <div class="login-wrap">
        <p class="login-unit login-unit-bg ">
          <input type="text" size="12" title="请填写 4-15 位大小写英数字" maxlength="12" class="login-input" id="hd_account" v-model="account" placeholder="请输入账号">
        </p>
        <p class="login-unit login-unit-bg login-unit-pwd">
          <input name="passwd" type="password" v-model='password' id="hd_passwd" class="login-input" style="width: 85px;" placeholder="密码">
          <a href="javascript:;" @click="forgetPassword" class="forget">忘记密码?</a>
        </p>
        <p class="login-unit" v-if="!isShowReg">
          <a href="javascript:;" class="logAnyBut" @click="reglink()">会员注册</a>
        </p>
        <p class="login-unit">
          <a href="javascript:;" class="logAnyBut" @click="freeLogin()">免费试玩</a>
        </p>
      </div>
    </form>
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

