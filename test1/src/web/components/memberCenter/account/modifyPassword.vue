<template>
<div>
    <div class="header yo-home-nav">
        <div class="center">
            <div class="hea-menu hea-left">
                <a href="javascript:;" @click="goback()"><i class="yo-icon icon-arrows-left"></i></a>
            </div>
            <div class="header-text titile">
                <h1>修改{{cur === 'loginPwd' ? '登录' : '取款'}}密码</h1>
            </div>
            <div class="hea-user hea-right">
                <a href="javascript:;" @click="home()"><i class="yo-icon icon-home"></i></a>
            </div>
        </div>
    </div>
    <div class="tab-nav stripedMenu fixationNav">
        <ul class="navigation newRecordUl">
            <li :class="{'active' : cur === 'loginPwd'}" @click="change('loginPwd')"><a href="javascript:;">修改登录密码</a></li>
            <li :class="{'active' : cur === 'payPwd'}" @click="change('payPwd')"><a href="javascript:;">修改取款密码</a></li>
        </ul>
    </div>
    <div class="centerBox mainCenterTwo">
       <div v-if="cur === 'loginPwd'" class="depositMain onlineDraw">
            <dl class="secondForm">
                <dd>
                    <div class="formIput">
                        <span class="itemTxt">原密码</span>
                        <div class="specialbox">
                            <input v-model="loginObject.oldPassword" maxlength="12" class="typeinput input-one" type="password" placeholder="请输入原密码">
                        </div>
                    </div>
                </dd>
                <dd>
                    <div class="formIput">
                        <span class="itemTxt">新密码</span>
                        <div class="specialbox">
                            <input v-model="loginObject.newPassword" maxlength="12" class="typeinput input-one" type="password" placeholder="请输入新密码">
                        </div>
                    </div>
                </dd>
                <dd>
                    <div class="formIput">
                        <span class="itemTxt">确认密码</span>
                        <div class="specialbox">
                            <input v-model="loginObject.confirmPassword" maxlength="12" class="typeinput input-one" type="password" placeholder="请再次输入新密码">
                        </div>
                    </div>
                </dd>
            </dl>
            <p class="explain text1"><span class="red">注：新登录密码不能与原登录密码一致，须为6~12位英文或数字夹杂且符合0~9或a~z字符</span></p>
            <div class="yo-pad10 yo-pad-bot20"><button type="button" class="yo-anOne button " @click="loginPwd()">确认</button></div>
        </div>

        <div v-if="cur === 'payPwd'" class="depositMain onlineDraw">
            <dl class="secondForm">
                <dd>
                    <div class="formIput">
                        <span class="itemTxt">原取款密码</span>
                        <div class="specialbox">
                            <input v-model="payObject.oldPassword" @input="setOldPassword($event, payObject.oldPassword)" class="typeinput input-one" type="password" maxlength="4" placeholder="请输入原取款密码">
                        </div>
                    </div>
                </dd>
                <dd>
                    <div class="formIput">
                        <span class="itemTxt">新取款密码</span>
                        <div class="specialbox">
                            <input v-model="payObject.newPassword" @input="setNewPassword($event, payObject.newPassword)" class="typeinput input-one" type="password" maxlength="4" placeholder="请输入新取款密码">
                        </div>
                    </div>
                </dd>
                <dd>
                    <div class="formIput">
                        <span class="itemTxt">确认密码</span>
                        <div class="specialbox">
                            <input v-model="payObject.confirmPassword" @input="setConfirmPassword($event, payObject.confirmPassword)" class="typeinput input-one" type="password" maxlength="4" placeholder="请再次输入新密码">
                        </div>
                    </div>
                </dd>
            </dl>
            <p class="explain text1"><span class="red">注：新取款密码不能与原取款密码一致，取款密码为4位纯数字</span></p>
            <div class="yo-pad10 yo-pad-bot20"><button type="button" class="yo-anOne button " @click="payPwd()">确认</button></div>
        </div>

  </div>
</div>
</template>
<script>
import * as statusCode from '@/base/utils/status_const'
export default {
  data () {
    return {
      cur: 'loginPwd',
      loginObject: {// 登陆密码修改对象
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      payObject: { // 取款密码修改对象
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    change (param) {
      this.cur = param
    },
    goback () {
      this.$router.go(-1)
    },
    home () {
      this.$router.push('/wap/index')
    },
    /** 修改登陆密码 */
    loginPwd () {
      if (this.checkValidation()) {
        window.$.ajax({
          'type': 'post',
          'url': '/api/wap/member/modifyMemberLoginPwd' + '?t=' + new Date().getTime(),
          'dataType': 'json',
          'cache': false,
          'async': false,
          'contentType': 'application/json',
          'data': JSON.stringify(this.loginObject),
          'success': function (_res) {
            if (_res.status === statusCode.statusConst.SUCCESS) {
              window.layer.msgWarn('密码重置成功!', function () {
                window.router.push('/wap/memberCenter/index')
              })
            } else {
              window.layer.msgWarn(_res.msg, function () {})
            }
          }
        })
      }
    },
    /** 修改登陆密码校验数据 */
    checkValidation () {
      if (this.loginObject.oldPassword === '') {
        window.layer.msgWarn('原始密码不能为空', function () {})
        return false
      }
      if (this.loginObject.oldPassword.length < 6 || this.loginObject.oldPassword.length > 12) {
        window.layer.msgWarn('请输入正确的密码', function () {})
        return false
      }
      if (this.loginObject.newPassword === '') {
        window.layer.msgWarn('您的新密码为空', function () {})
        return false
      }
      if (this.loginObject.confirmPassword === '') {
        window.layer.msgWarn('请确认您的密码', function () {})
        return false
      }
      if (this.loginObject.newPassword !== this.loginObject.confirmPassword) {
        window.layer.msgWarn('您两次输入的新密码不一致，请确认!', function () {})
        return false
      }
      if (this.loginObject.oldPassword === this.loginObject.newPassword) {
        window.layer.msgWarn('新登录密码不能与原登录密码一致', function () {})
        return false
      }
      let boolNum = true
      let boolStr = true
      let boolStrUpcase = true
      let list = this.loginObject.newPassword.split('')
      for (let i = 0; i < list.length; i++) {
        let codeAt = list[i].charCodeAt()
        if (codeAt > 47 && codeAt < 58) {
          boolNum = false
        }
        if (codeAt > 96 && codeAt < 123) {
          boolStr = false
        }
        if (codeAt > 64 && codeAt < 91) {
          boolStrUpcase = false
        }
      }

      if (boolNum || (boolStr && boolStrUpcase)) {
        window.layer.msgWarn('须为6~12位英文或数字夹杂且符合0~9或a~z字符.', function () {})
        return false
      }
      return true
    },
    /** 修改取款密码 */
    payPwd () {
      if (this.checkPayValidation()) {
        window.$.ajax({
          'type': 'post',
          'url': '/api/wap/member/modifyMemberDrawPwd' + '?t=' + new Date().getTime(),
          'dataType': 'json',
          'cache': false,
          'async': false,
          'contentType': 'application/json',
          'data': JSON.stringify(this.payObject),
          'success': function (_res) {
            if (_res.status === statusCode.statusConst.SUCCESS) {
              window.layer.msgWarn('密码重置成功!', function () {
                window.router.push('/wap/memberCenter/index')
              })
            } else {
              window.layer.msgWarn(_res.msg, function () {})
            }
          }
        })
      }
    },
    setOldPassword (event, oldPassword) {
      let pass = event.currentTarget.value
      let value = pass.replace(/[^0-9]+/g, '')
      if (value.length > 4) { // 最大长度只能是4位
        this.payObject.oldPassword = value.substr(0, 4)
      } else if (value === '') {
        this.payObject.oldPassword = ''
      } else {
        this.payObject.oldPassword = value
      }
    },
    setNewPassword (event, newPassword) {
      let pass = event.currentTarget.value
      let value = pass.replace(/[^0-9]+/g, '')
      if (value.length > 4) { // 最大长度只能是4位
        this.payObject.newPassword = value.substr(0, 4)
      } else if (value === '') {
        this.payObject.newPassword = ''
      } else {
        this.payObject.newPassword = value
      }
    },
    setConfirmPassword (event, confirmPassword) {
      let pass = event.currentTarget.value
      let value = pass.replace(/[^0-9]+/g, '')
      if (value.length > 4) { // 最大长度只能是4位
        this.payObject.confirmPassword = value.substr(0, 4)
      } else if (value === '') {
        this.payObject.confirmPassword = ''
      } else {
        this.payObject.confirmPassword = value
      }
    },
    /** 校验取款密码 */
    checkPayValidation () {
      if (this.payObject.oldPassword === '') {
        window.layer.msgWarn('原始密码不能为空', function () {})
        return false
      }
      if (this.payObject.oldPassword.length !== 4) {
        window.layer.msgWarn('请输入4位密码', function () {})
        return false
      }
      if (this.payObject.newPassword === '') {
        window.layer.msgWarn('您的新密码为空', function () {})
        return false
      }
      if (this.payObject.confirmPassword === '') {
        window.layer.msgWarn('请确认您的密码', function () {})
        return false
      }
      if (this.payObject.oldPassword === this.payObject.newPassword) {
        window.layer.msgWarn('新取款密码不能与原取款密码一致', function () {})
        return false
      }
      if (this.payObject.newPassword !== this.payObject.confirmPassword) {
        window.layer.msgWarn('您两次输入的新密码不一致，请确认!', function () {})
        return false
      }
      let boolNum = false
      let list = this.payObject.newPassword.split('')
      for (let i = 0; i < list.length; i++) {
        let codeAt = list[i].charCodeAt()
        if (codeAt < 48 || codeAt > 57) {
          boolNum = true
        }
      }
      if (boolNum) {
        window.layer.msgWarn('取款密码为4位纯数字.', function () {})
        return false
      }
      return true
    }
  }
}
</script>
