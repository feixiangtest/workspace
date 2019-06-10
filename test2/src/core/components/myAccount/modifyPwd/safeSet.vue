<template>
  <div class='contentBox' id="safeSet">
    <div class="subNav">
      <ul style='user-select: none;'>
        <li :class="{cur:curPwdTab==='loginPwd'}" @click="changsTab('loginPwd')">修改登录密码</li>
        <li :class="{cur:curPwdTab==='moneyPwd'}" @click="changsTab('moneyPwd')"  class="moneyPwd">修改取款密码</li>
      </ul>
    </div>
    <set-login-pwd v-if="curPwdTab==='loginPwd'"></set-login-pwd>
    <set-draw-pwd v-if="curPwdTab==='moneyPwd'"></set-draw-pwd>
  </div>
</template>
<script>
import * as types from '@m/store/payment/type'
import setLoginPwd from './setLoginPwd.vue' // 修改登录密码组件
import setDrawPwd from './setDrawPwd.vue'// 修改取款密码组件
export default {
  data () {
    return {
      curPwdTab: 'loginPwd' // 当前展示的tab页，默认为登录密码页
    }
  },
  components: {
    setLoginPwd,
    setDrawPwd
  },
  methods: {
    changsTab (type) {
      if (window.common.isFree()) {
        window.layer.msgWarn(`对不起，安全设置不对试玩账号开放！`)
        return
      }
      if (type === 'moneyPwd') {
        // 非空时不做重复初始化
        this.$store.dispatch(types.VALID_DRAW_PASSWORD_ACTION, null).then(res => {
          if (res.msg) {
            window.layer.msgWarn(res.msg, () => {
              this.$store.state.payment.showBindInfo = true
              this.$router.push({ name: 'onlineWithdrawals' })
            })
          }
        }).catch(res => {
          console.log('INITPAYMENT store error')
        })
      }
      // 如果是点击修改取款密码并且没有修改密码，则不允许跳转
      let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
      if (type === 'moneyPwd' && userInfo.updatePwdTime === '') {
        window.layer.msgWarn('为了保障您的账户安全，首次登录时需要修改您的登录密码')
        return
      }

      this.curPwdTab = type
    }
  },
  computed: {
    account () {
      return this.$store.state.member.account
    }
  }
}
</script>
