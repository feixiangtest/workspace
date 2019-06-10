<template>
<div v-if='showChangePwd' class="zhezhao" style='z-index:9999'>
       <div class="changPassWord ">
            <div class="newLoginTitle">
                <span>修改登录密码</span>
            </div>
            <form>
                <div class="formItem">
                    <span class="formTile">旧密码：</span>
                    <div class="formInline">
                        <!-- 内容为空或输入错误的input框颜色 -->
                        <el-input v-model="oldPassword" maxlength="12" placeholder="请输入旧密码" size="medium" type="password"
                            @keyup.native='noSpace("oldPassword")'></el-input>
                        <span><i :class='oldPwdClass'></i></span>
                    </div>
                </div>
                <div class="formItem">
                    <span class="formTile">新密码：</span>
                    <div class="formInline">
                        <el-input v-model="newPassword" maxlength="12" placeholder="请输入新密码" size="medium" type="password"
                            @keyup.native='noSpace("newPassword")' ></el-input>
                        <span><i :class="newPwdClass"></i></span>
                    </div>
                </div>
                <div class="formItem">
                    <span class="formTile">密码强度：</span>
                    <div class="formInline">
                        <div class="securityLevel">
                            <span class="hasColor" v-for='(item,index) in passwordLevel' :key='index'></span>
                            <span v-for='(item,index) in (4-passwordLevel)' :key='index-100'></span>
                        </div>
                    </div>
                </div>
                <div class="formItem">
                    <span class="formTile">确认密码：</span>
                    <div class="formInline">
                        <el-input v-model="confirmPassword" maxlength="12" placeholder="请输入确认密码" size="medium" type="password"
                            @keyup.native='noSpace("confirmPassword")'></el-input>
                        <span><i :class="confirmPwdClass"></i></span>
                    </div>
                </div>
                <div class="formItem">
                    <span class="formTile"></span>
                    <div class="formInline">
                        <el-button type="primary" @click.stop='changeLoginPwd' :disabled="disableBtn">确认</el-button>
                    </div>
                </div>
                <div class="formItem">
                    <span class="formTile"></span>
                    <div class="formInline">
                        <p class="errMsg">密码规则：须是<span class="orange">6-12位英文字母和数字的组合</span></p>
                    </div>
                </div>
            </form>
        </div>
    </div>
    
</template>
<script>
// 设定正确，与错误样式变量
import * as member from '@m/utils/member.js'
const CORRECTSTYLE = ['yo-correctFull', 'el-icon-correctFull']
const ERRORSTYLE = ['yo-plaintFull', 'el-icon-plaintFull']
export default {
  data () {
    return {
      accountName: '', // 用户名
      oldPassword: '', // 旧密码
      newPassword: '', // 新密码
      confirmPassword: '', // 确认密码
      oldPwdClass: [], // 旧密码框后面icon样式
      newPwdClass: [], // 新密码框后面icon样式
      confirmPwdClass: [], // 确认密码框后面icon样式
      disableBtn: true, // 确认按钮开启禁用状态
      isSuccess: false
    }
  },
  watch: {
    // 监听输入的密码数据，如果格式正确，就设置输入框后面的样式为correctStyle，反之errorStyle
    oldPassword (v) {
      this.setStyle(v.length >= 6, 'oldPwdClass')
      this.openDisableBtn()
    },
    newPassword (v) {
      this.setStyle(v.length >= 6, 'newPwdClass')
      if (this.confirmPassword) this.setStyle(v === this.confirmPassword && v.length >= 6, 'confirmPwdClass')
      this.openDisableBtn()
    },
    confirmPassword (v) {
      this.setStyle(v === this.newPassword && v.length >= 6, 'confirmPwdClass')
      this.openDisableBtn()
    }
  },

  computed: {
    showChangePwd () {
      return this.$store.state.shareApi.showChangePwd
    },
    passwordLevel () {
      let level = 0
      level = member.default.isSimplePwd(this.newPassword)
      return level > 4 ? 4 : level < 0 ? 0 : level
    }
  },
  methods: {
    // 输入框有空格将会被清空
    noSpace (v) {
      this[v] = this[v].toString().replace(/\s+/g, '')
    },
    // 判断输入框是否为空，如为空则确认按钮置灰
    openDisableBtn () {
      if (this.oldPassword.length !== 0 && this.newPassword.length !== 0 && this.confirmPassword.length !== 0) {
        this.disableBtn = false
      } else {
        this.disableBtn = true
      }
    },
    // 清除输入信息
    clearInfo () {
      this.oldPassword = ''
      this.newPassword = ''
      this.confirmPassword = ''
      this.oldPwdClass = []
      this.newPwdClass = []
      this.confirmPwdClass = []
    },
    setStyle (isTrue, k) {
      if (this.isSuccess) return
      isTrue ? this[k] = CORRECTSTYLE : this[k] = ERRORSTYLE
    },
    checkPassword (v, pwdName) {
      if (!v) {
        window.layer.msgWarn(pwdName + '密码不能为空')
      }
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
      if (!reg.test(v)) {
        window.layer.msgWarn('请输入6-12位英文字母和数字的组合！')
        return false
      }
      return true
    },
    // 验证新密码和旧密码是否一致
    checkNewPassword (pwd1, pwd2) {
      if (pwd1 === pwd2) {
        window.layer.msgWarn('新密码不能和旧密码一致，请重新设置')
        return false
      }
      return true
    },
    // 验证确认密码
    checkConfirmPassword (pwd1, pwd2) {
      if (pwd1 !== pwd2) {
        window.layer.msgWarn('确认密码和新密码不一致，请重新设置')
        return false
      }
      return true
    },
    // 修改密码
    changeLoginPwd () {
      // enter 按钮 按下 执行
      // 如果是 禁止的 不执行
      if (this.disableBtn) {
        return ''
      }
      if (!this.checkPassword(this.oldPassword, '旧')) return
      if (!this.checkPassword(this.newPassword, '新')) return
      if (!this.checkNewPassword(this.oldPassword, this.newPassword)) return
      if (!this.checkConfirmPassword(this.newPassword, this.confirmPassword)) return
      this.disableBtn = true // 请求期间禁用确认按钮

      if (window.common.isFree()) {
        window.layer.msgWarn('对不起，登入密码不对试玩账号开放！')
        return ''
      }
      this.$store.dispatch('shareApi.changeLoginPwd', {
        confirmPassword: this.confirmPassword,
        newPassword: this.newPassword,
        oldPassword: this.oldPassword
      }).then(res => {
        this.disableBtn = false// 解禁按钮可点击
        this.isSuccess = true
        this.clearInfo()
        // 去掉第一次登陆修改密码拦截标识
        localStorage.removeItem('setFirstPwd')
        window.layer.msgWarn('修改成功', () => {
          this.isSuccess = false
          // 修改成功后将修改密码时间储存
          let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
          userInfo.updatePwdTime = new Date().getTime()
          // queryIndex内的数据也需变化
          let queryIndex = JSON.parse(window.localStorage.getItem('queryIndex'))
          if (queryIndex && queryIndex.data) {
            queryIndex.data.account.updatePwdTime = userInfo.updatePwdTime
            window.localStorage.setItem('queryIndex', JSON.stringify(queryIndex))
          }
          window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
          this.$store.state.shareApi.showChangePwd = false
        })
      }).catch(rej => {
        this.disableBtn = false// 解禁按钮可点击
        this.oldPwdClass = ERRORSTYLE
      })
    }
  }
}
</script>

