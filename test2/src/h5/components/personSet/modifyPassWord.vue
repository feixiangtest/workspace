<template>
    <div class="common-main main-box">
        <template v-if="modifyWhichPsw === 1">
            <div class="form-item"> 
                <label for="oldLoginPsw">旧密码</label>
                <input id='oldLoginPsw' class="disc" v-model="oldLoginPsw" maxlength='12' type="password" placeholder="请输入旧密码"  @input="pwdInput()" @blur="checkEmpty(oldLoginPsw, 'oldLoginPsw')">
            </div>
            <div class="tips error_msg2"> {{oldLoginPwdErr}} </div>
            <div class="form-item"> 
                <label for="newLoginPsw">新密码</label>
                <input id='newLoginPsw' class="disc" v-model="newLoginPsw" maxlength='12' type="password" placeholder="请输入新密码" @input="newPwdInput()" @blur="checkEmpty(newLoginPsw, 'newLoginPsw')">
            </div>
            <div class="tips error_msg2"> {{newLoginPwdErr}} </div>
            <div class="form-item"> 
                <label for="comfirmNewLoginPsw">确认密码</label>
                <input id='comfirmNewLoginPsw' class="disc" v-model="comfirmNewLoginPsw" maxlength='12' type="password" placeholder="请再次输入新密码" @input='confirmPwd()' @blur="checkEmpty(comfirmNewLoginPsw, 'comfirmNewLoginPsw')">
            </div>
            <div class="tips error_msg2"> {{confirmPwdErr}} </div>
            <p class="weak-txt grey-txt magt10 yow-content">注：新登录密码不能与旧登录密码一致，须为6~12位英文或数字夹杂且符合0~9或a~z字。</p>
        </template>
        
        <template v-if="modifyWhichPsw === 2">
            <div class="form-item"> 
                <label for="oldDrawpsw">旧取款密码</label>
                <input id='oldDrawpsw' class="disc" v-model="oldDrawpsw" maxlength='4' type="tel" placeholder="请输入旧密码" @input="oldDrawpswIpt()" @blur="checkEmpty(oldDrawpsw, 'oldDrawpsw')">
            </div>
            <div class="tips error_msg2"> {{oldDrawpswdErr}} </div>
            <div class="form-item"> 
                <label for="newDrawpsw">新取款密码</label>
                <input id='newDrawpsw' class="disc" v-model="newDrawpsw" maxlength='4' type="tel" placeholder="请输入新密码" @input="newDrawpswIpt()" @blur="checkEmpty(newDrawpsw, 'newDrawpsw')">
            </div>
            <div class="tips error_msg2"> {{newDrawpswErr}} </div>
            <div class="form-item"> 
                <label for="comfirmNewDrawpsw">确认密码</label>
                <input id='comfirmNewDrawpsw' class="disc" v-model="comfirmNewDrawpsw" maxlength='4' type="tel" placeholder="请输入确认密码" @input="comfirmNewDrawpswIpt()" @blur="checkEmpty(comfirmNewDrawpsw, 'comfirmNewDrawpsw')">
            </div>
            <div class="tips error_msg2"> {{comfirmNewDrawpswErr}} </div>
            <p class="weak-txt grey-txt magt10 yow-content">
            注：新取款密码不能与旧取款密码一致，取款密码为4位纯数字。
            </p>
        </template>
        
        <div class="btn-wrap">
            <button class="btn one-btn" v-if="isChangeBtnColor" :class="{btnBgColor:isChangeBtnColor}" @click="submit()" disabled>确定</button>
            <button class="btn one-btn" v-else :class="{btnBgColor:isChangeBtnColor}" @click="submit()">确定</button>
            <!-- 是输入信息后变橘色 去掉btnBgColor-->
        </div>
      </div>
</template>
<script>
import { mapActions } from 'vuex'
import * as types from '@s/store/shareApi/type.js'
export default {
  name: 'modifyPassWord',
  data () {
    return {
      accountName: '', // 用户名
      oldLoginPsw: '', // 原登录密码
      newLoginPsw: '', // 新登录密码
      comfirmNewLoginPsw: '', // 确认原新登录密码
      oldDrawpsw: '', // 原取款密码
      newDrawpsw: '', // 新取款密码
      comfirmNewDrawpsw: '', // 确认新取款密码,
      oldLoginPwdErr: '', // 原密码相关错误提示
      newLoginPwdErr: '', // 新密码相关错误提示
      confirmPwdErr: '', // 确认密码相关错误提示
      oldDrawpswdErr: '', // 原取款密码相关错误提示
      newDrawpswErr: '', // 新取款密码相关错误提示
      comfirmNewDrawpswErr: '', // 确认取款密码相关错误提示
      isChangeBtnColor: true
    }
  },
  computed: {
    modifyWhichPsw () {
      if (this.$store.state.h5Home.modifyWhichPsw) {
        return this.$store.state.h5Home.modifyWhichPsw
      } else {
        return JSON.parse(sessionStorage.getItem('modifyWhichPsw'))
      }
    }
  },
  watch: {
    oldDrawpswdErr (v) {
      if (v) this.drawBtnFlag = false
    }
  },
  methods: {
    ...mapActions({
      changeLoginPwdAction: types.CHANGELOGINPWD, // 修改登录密码接口
      changeDrawPwdAction: types.CHANGEDRAWPWD // 修改密码接口
    }),
    submit () {
      // 修改登录密码
      if (this.modifyWhichPsw === 1) {
        if (!this.checkEmpty(this.oldLoginPsw, 'oldLoginPsw') || !this.checkEmpty(this.newLoginPsw, 'newLoginPsw') || !this.checkEmpty(this.comfirmNewLoginPsw, 'comfirmNewLoginPsw') || !this.pwdInput() || !this.newPwdInput() || !this.confirmPwd()) {
          return false
        }

        this.changeLoginPwdAction({
          confirmPassword: this.comfirmNewLoginPsw,
          newPassword: this.newLoginPsw,
          oldPassword: this.oldLoginPsw
        }).then(res => {
          window.store.state.h5Home.forceUpdatePwd = false // 去掉第一次登陆修改密码拦截标识  是否强制修改登录密码
          window.layer.msgWarn('密码重置成功', () => {
            // 修改成功后将修改密码时间储存
            this.clearInfo()
            let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
            userInfo.updatePwdTime = new Date().getTime()
            // queryIndex内的数据也需变化
            let queryIndex = JSON.parse(window.localStorage.getItem('queryIndex'))
            if (queryIndex && queryIndex.data) {
              queryIndex.data.account.updatePwdTime = userInfo.updatePwdTime
              window.localStorage.setItem('queryIndex', JSON.stringify(queryIndex))
            }
            window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
            this.$router.go(-1)
          })
        })
      }
      // 修改取款密码
      if (this.modifyWhichPsw === 2) {
        if (!this.checkEmpty(this.oldDrawpsw, 'oldDrawpsw') || !this.checkEmpty(this.newDrawpsw, 'newDrawpsw') || !this.checkEmpty(this.comfirmNewDrawpsw, 'comfirmNewDrawpsw') || !this.oldDrawpswIpt() || !this.newDrawpswIpt() || !this.comfirmNewDrawpswIpt()) {
          return false
        }

        this.changeDrawPwdAction({
          confirmPassword: this.comfirmNewDrawpsw,
          newPassword: this.newDrawpsw,
          oldPassword: this.oldDrawpsw
        }).then(res => {
          window.layer.msgWarn('修改取款密码成功', () => {
            this.$router.push('/wap/personSet')
            this.clearInfo()
          })
        })
      }
    },
    clearInfo () {
      this.oldLoginPsw = '' // 原登录密码
      this.newLoginPsw = '' // 新登录密码
      this.comfirmNewLoginPsw = '' // 确认原新登录密码
      this.oldDrawpsw = '' // 原取款密码
      this.newDrawpsw = '' // 新取款密码
      this.comfirmNewDrawpsw = '' // 确认新取款密码
    },
    // 输入框有空格将会被清空
    noSpace (v) {
      this[v] = this[v].toString().replace(/\s+/g, '')
    },
    // 校验旧密码@input事件
    pwdInput () {
      this.oldLoginPsw = this.oldLoginPsw.replace(/\s+/g, '')
      if (this.oldLoginPsw) {
        this.oldLoginPwdErr = ''
      }
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
      if (!reg.test(this.oldLoginPsw)) {
        this.oldLoginPwdErr = '旧密码为6-12位字母与数字组合'
        return false
      }
      if (this.oldLoginPsw === this.newLoginPsw && !this.newLoginPwdErr) {
        this.newLoginPwdErr = '新密码不能和旧密码一致，请重新设置'
        return false
      }
      return true
    },
    // 校验新密码@input事件
    newPwdInput () {
      this.newLoginPsw = this.newLoginPsw.replace(/\s+/g, '')
      if (this.newLoginPsw) {
        this.newLoginPwdErr = ''
      }
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
      if (!reg.test(this.newLoginPsw)) {
        this.newLoginPwdErr = '新密码必须为6-12位字母与数字组合'
        return false
      }
      if (this.oldLoginPsw === this.newLoginPsw) {
        this.newLoginPwdErr = '新密码不能和旧密码一致，请重新设置'
        return false
      }
      if (this.comfirmNewLoginPsw) {
        if (this.comfirmNewLoginPsw !== this.newLoginPsw) {
          this.confirmPwdErr = '确认密码和新密码不一致，请重新设置'
          return false
        }
      }
      return true
    },
    // 校验确认密码@input事件
    confirmPwd () {
      this.comfirmNewLoginPsw = this.comfirmNewLoginPsw.replace(/\s+/g, '')
      if (this.comfirmNewLoginPsw) {
        this.confirmPwdErr = ''
      }
      if (this.comfirmNewLoginPsw !== this.newLoginPsw) {
        this.confirmPwdErr = '确认密码和新密码不一致，请重新设置'
        return false
      }
      return true
    },
    // 校验旧取款密码@input事件
    oldDrawpswIpt () {
      if (this.oldDrawpsw || this.oldDrawpsw.length === 4) {
        this.oldDrawpswdErr = ''
      }
      this.oldDrawpsw = this.oldDrawpsw.replace(/[^0-9]+/g, '')
      if (this.oldDrawpsw.length < 4) {
        this.oldDrawpswdErr = '取款密码为4位纯数字'
        return false
      }
      if (this.oldDrawpsw === this.newDrawpsw) {
        this.newDrawpswErr = '新密码不能和旧密码一致，请重新设置'
        return false
      } else {
        this.newDrawpswErr = ''
      }
      return true
    },
    // 校验新取款密码@input事件
    newDrawpswIpt () {
      if (this.newDrawpsw) {
        this.newDrawpswErr = ''
      }
      this.newDrawpsw = this.newDrawpsw.replace(/[^0-9]+/g, '')
      if (this.newDrawpsw.length < 4) {
        this.newDrawpswErr = '取款密码为4位纯数字'
        return false
      }
      if (this.oldDrawpsw === this.newDrawpsw) {
        this.newDrawpswErr = '新密码不能和旧密码一致，请重新设置'
        return false
      }
      if (this.comfirmNewDrawpsw) {
        if (this.comfirmNewDrawpsw !== this.newDrawpsw) {
          this.comfirmNewDrawpswErr = '确认密码和新取款密码不一致，请重新设置'
          return false
        }
      }
      return true
    },
    // 校验确认取款密码@input事件
    comfirmNewDrawpswIpt () {
      if (this.comfirmNewDrawpsw) {
        this.comfirmNewDrawpswErr = ''
      }
      this.comfirmNewDrawpsw = this.comfirmNewDrawpsw.replace(/[^0-9]+/g, '')
      if (this.comfirmNewDrawpsw.length < 4) {
        this.comfirmNewDrawpswErr = '取款密码为4位纯数字'
        return false
      }
      if (this.comfirmNewDrawpsw !== this.newDrawpsw) {
        this.comfirmNewDrawpswErr = '确认密码和新取款密码不一致，请重新设置'
        return false
      }
      return true
    },
    // 判断input为空
    checkEmpty (val, type) {
      if (!val) {
        if (type === 'oldLoginPsw') this.oldLoginPwdErr = '请输入旧密码'
        if (type === 'newLoginPsw') this.newLoginPwdErr = '请输入新密码'
        if (type === 'comfirmNewLoginPsw') this.confirmPwdErr = '请确认您的密码'
        if (type === 'oldDrawpsw') this.oldDrawpswdErr = '请输入旧密码'
        if (type === 'newDrawpsw') this.newDrawpswErr = '请输入新密码'
        if (type === 'comfirmNewDrawpsw') this.comfirmNewDrawpswErr = '请输入确认密码'
        return false
      }
      return true
    }
  },
  mounted () {
    if (this.$route.query.isModifyLoginPwd) {
      this.$store.state.h5Home.modifyWhichPsw = 1
    }
    if (this.modifyWhichPsw === 1) {
      this.$store.state.h5Home.headTitle = '修改登录密码'
    }
    if (this.modifyWhichPsw === 2) {
      this.$store.state.h5Home.headTitle = '修改取款密码'
    }

    this.$store.state.h5Home.headerType = 3
    this.$store.state.h5Home.headLeft = 'icon-back'
  },
  // 页面重新渲染的时候判断页面上存不存在验证错误信息，存在则置灰按钮
  updated: function () {
    this.$nextTick(function () {
      if (this.modifyWhichPsw === 1) {
        if (this.oldLoginPsw.length >= 6 && this.newLoginPsw.length >= 6 && this.comfirmNewLoginPsw.length >= 6 && !this.oldLoginPwdErr && !this.newLoginPwdErr && !this.confirmPwdErr) {
          this.isChangeBtnColor = false
        } else {
          this.isChangeBtnColor = true
        }
      }
      if (this.modifyWhichPsw === 2) {
        if (this.oldDrawpsw.length === 4 && this.newDrawpsw.length === 4 && this.comfirmNewDrawpsw.length === 4 && !this.oldDrawpswdErr && !this.newDrawpswErr && !this.comfirmNewDrawpswErr) {
          this.isChangeBtnColor = false
        } else {
          this.isChangeBtnColor = true
        }
      }
    })
  }
}
</script>

