<template>
    <div class="common-main main-box">
        <div class="yo-form-item set-item">
            <h5 class="title">账号</h5>
             <p class="con-txt"><span>{{userInfo.account}}</span>
             </p>
        </div>
        <div class="yo-form-item set-item">
            <h5 class="title">真实姓名</h5>
             <p class="con-txt"><span>{{userInfo.realName}}</span></p>
        </div>
        <div class="yo-form-item set-item" @click="modifyPassWord(1)">
            <h5 class="title">修改登录密码</h5>
             <i class="yo-icon icon-next right-arrow" ></i>
        </div>
        <div class="yo-form-item set-item" @click="modifyPassWord(2)">
            <h5 class="title">修改取款密码</h5>
             <i class="yo-icon icon-next right-arrow"></i>
        </div>
      </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@s/store/shareApi/type.js'
export default {
  name: 'personSet',
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo, // 用户信息
      type: state => parseInt(state.user.userInfo.userType) // 登录类型  2表示测试会员，1表示是试玩，0表示正常(包括正常用户和非登陆情况)
    })
  },
  methods: {
    ...mapActions({
      validDrawPasswordAction: types.VALIDDRAWPASSWORD_ACTION // 查询用户是否设置取款密码
    }),
    modifyPassWord (index) {
      // 1 修改登录密码 2 修改取款密码
      if (index === 1) {
        if (this.type === 1) {
          window.layer.msgWarn('对不起，试玩账号不能修改登录密码')
        } else {
          this.$store.state.h5Home.modifyWhichPsw = 1
          sessionStorage.setItem('modifyWhichPsw', 1)
          this.$router.push('/wap/modifyPassWord')
        }
      } else if (index === 2) {
        if (this.type === 1) {
          window.layer.msgWarn('对不起，试玩账号不能修改取款密码')
        } else {
          this.validDrawPasswordAction({}).then(res => {
            if (res.msg) {
              window.layer.msgWarn(res.msg, function () {
                sessionStorage.setItem('switchPages', '/wap/personSet')
                window.router.push('/wap/addCard')
              })
            } else {
              sessionStorage.setItem('modifyWhichPsw', 2)
              window.router.push('/wap/modifyPassWord')
            }
          })
          this.$store.state.h5Home.modifyWhichPsw = 2
        }
      }
    }
  },
  mounted () {
    window.store.dispatch('initH5Data.action', {versionFun: true})
    this.$store.state.h5Home.headerType = 3
    this.$store.state.h5Home.headTitle = '个人设置'
    this.$store.state.h5Home.headLeft = 'icon-back'
    this.$store.state.h5Home.headback = false
  }
}
</script>

