<template>
  <div id="checkYZM" v-if='showCheckCode' @keyup.enter="yzmLogin(checkCode)">
    <div class="mask"> </div>
    <div id="tc_loginVerfiCode_div">
      <div class="yzmHeaderMsg">
        <p>
          {{yzmMsg}}
        </p>
      </div>
      <div class="lvc-yo-cen">
        <h4>登录异常:</h4>
        <!-- <p>登录的账号或密码多次输入错误！</p> -->
        <div class="lvc-y-c-yzm">
          <input type="text" v-model="checkCode" placeholder="请输入验证码" maxlength="4" @click='clickYZM()'>
          <!-- <img id="hd_vPic" :src="yzmUrl+ validCodeSrc" class="tc_code" @click="changeVCode()"> -->
          <img id="hd_vPic" class="tc_code" :src='validCodeSrc' ref='validCodeSrc' @click='clickYZM()'>
        </div>
      </div>
      <div class="lvc-yo-foot">
        <a class="quxiao" href="javascript:void(0);" @click='closeCheckCode'>取消</a>
        <a class="queren" href="javascript:void(0);" @click='yzmLogin(checkCode),clearn()'>确认</a>
      </div>
    </div>
  </div>
</template>

<script>
/*
 vue 单独编译注释：
 单独编译 不要 import 引入
 * */
export default {
  name: 'advice',
  props: ['showCheckCode', 'closeCheckCode', 'yzmLogin'],
  data () {
    return {
      yzmMsg: window.common.const.LOGINTITLE,
      validCodeSrc: '',
      yzmUrl: '/member/account/validCode?t=',
      checkCode: ''
    }
  },
  watch: {
    showCheckCode () {
      this.checkCode = ''
    }
  },
  methods: {
    clearn () {
      this.checkCode = ''
      this.clickYZM()
    },
    clickYZM () {
      this.validCodeSrc = '/member/code?t=' + new Date().getTime()
    }
  },
  mounted () {
    this.clickYZM()
  }
}
</script>
