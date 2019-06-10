<template>
      <div class="reg-step1">
        <div class="yo-form-item">
          <label class="title" for="userName">账号 <span class="high-red red-star">*</span></label>
          <div class="con-cen">
            <input class="input-sty2" id='userName' type="text" placeholder="字母开头的6-12位字母或数字组合"
                 v-model="user1.account"
                 maxlength="12"
                 @input="assertAccount()"
                 @blur="checkAccount()" >
          </div>
        </div>
        <!--err 提示-->
        <regErr :regDate="errMsg" message="account"/>

        <div class="yo-form-item">
          <label class="title" for="psw">密码 <span class="high-red red-star">*</span></label>
          <div class="con-cen">
            <input class="input-sty2" id='psw' type="password" placeholder="6-12位字母与数字的组合" maxlength="12"
                 @blur="checkPw(1)"
                 v-model="user1.password"
                 @input="pwdOnKeyUp(0)">
          </div>
        </div>
        <!--err 提示-->
        <regErr :regDate="errMsg" message="password"/>

        <div class="yo-form-item">
          <label class="title" for="mPsw">确认密码 <span class="high-red red-star">*</span></label>
          <div class="con-cen">
            <input class="input-sty2" id='mPsw' type="password" placeholder="与密码一致"  maxlength="12"
                 @blur="checkPw(2)"
                 v-model="user1.password1"
                 @input="pwdOnKeyUp(1)">
          </div>
        </div>
        <!--err 提示-->
        <regErr :regDate="errMsg" message="password1"/>

        <div class="yo-form-item">
          <label class="title" for="wPsw">取款密码 <span class="high-red red-star">*</span></label>
          <div class="con-cen">
            <input id='wPsw' class="disc input-sty2" type="password" placeholder="请输入4位纯数字取款密码" oninput="value=value.replace(/[^\d]/g,'')" maxlength="4"
                 v-model="user1.drawMoneyPwd"
                 @blur="drawMoney()"
                 @input="assertdrawMoneyPwd()" >
          </div>
        </div>
        <!--err 提示 blurb 不校验  -->
        <regErr :regDate="errMsg" message="drawMoneyPwd"/>

  </div>
</template>
<script>
import verify from '@s/components/reg/verify.js' // 引入 校验 reg js 函数
import { mapState } from 'vuex'
export default {
  name: 'step1',
  mixins: [verify],
  computed: {
    ...mapState({
      regStep: state => state.user.regStep, // 注册是否分步
      memberSetList: state => state.user.memberSetList,
      regInfo: state => state.user.regInfo,
      errMsg: state => state.user.errMsg,
      user1: state => state.user.user1
    }),
    getLoginStatus () {
      return window.store.state.user.isLogin
    }
  }
}
</script>

