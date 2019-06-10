<template>
  <div class="depositMain onlineDraw">
    <div class="payitembox">
      <dl class="paytype din-form">
        <dd>
          <div class="item-input din-line">
            <span class="din-title">用户名</span>
            <div class="din-content">
              <span v-if="userInfo.weixinIco">{{ userInfo.weiXinNickName}}</span>
              <span v-if="!userInfo.weixinIco">{{ userInfo.account}}</span>
            </div>
          </div>
        </dd>
        <dd>
          <div class="item-input din-line">
            <span class="din-title">客户端账号</span>
            <div class="din-content">
              <span>{{account}}</span>
            </div>
          </div>
        </dd>
        <dd>
          <div class="item-input din-line">
            <span class="din-title">新密码</span>
            <div class="din-content">
              <input type="password" class="din-input"
                     @blur="checkPwd(1)"
                     v-model="editInfo.password"
                     maxlength="12"
                     placeholder="请输入6-12位英文与数字的组合"><!--err 提示-->
              <AddErr :regDate="errMsg" message="password"/>
            </div>
          </div>
        </dd>
        <dd>
          <div class="item-input din-line">
            <span class="din-title">确认密码</span>
            <div class="din-content">
              <input type="password" class="din-input"
                     @blur="checkPwd(2)"
                     v-model="editInfo.password1"
                     maxlength="12"
                     placeholder="请与密码填写一致"><!--err 提示-->
              <AddErr :regDate="errMsg" message="password1"/>
            </div>
          </div>
        </dd>
      </dl>
    </div>
    <div class="yo-pad10 yo-pad-bot20">
      <button class="yo-anOne button " type="button" @click="updatePwd">提交</button>
    </div>
  </div>
</template>

<script>
  import * as memberCenterType from '@/base/store/memberCenter/type'
  import * as statusCode from '@/base/utils/status_const'
  import method from '@/base/utils/method'
  export default {
    props: {
      activeObj: Object,
      account: String
    },
    data () {
      return {
        errMsg: {
          account: {},
          errName: 'reg'
        },
        editInfo: {
          password: '',
          password1: ''
        }
      }
    },
    mounted () {
      let {verify} = method
      this.checkCommon = verify().checkCommon
    },
    methods: {
      checkPwd (way) {
        let {verify} = method
        if (way === 1) {
          return verify().checkClientPw1(this, 'editInfo')
        } else if (way === 2) {
          return verify().checkPw2(this, 'editInfo')
        }
      },
      updatePwd () {
        if (!this.checkPwd(1)) {
          return
        }
        if (!this.checkPwd(2)) {
          return
        }
        const m = {
          'mgGame': 'mg',
          'ptGame': 'pt'
        }
        let params = {
          platform: m[this.activeId] || '',
          password: this.editInfo.password,
          qurenPasswrod: this.editInfo.password1
        }
        this.$store.dispatch(memberCenterType.GAMECLIENT_UPDATEACCOUNTPWD_ACTION, params).then(res => {
          if (res && res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
            window.layer.alert('密码修改成功！', () => {
              this.tiggerPwdChange(this.editInfo.password)
            })
          } else {
            window.layer.alert((res && res.msg) || '密码修改失败！')
          }
        }).catch(res => {
          window.layer.alert('密码修改失败！')
        })
      },
      tiggerPwdChange (newPwd) {
        this.$emit('pwdChange', {
          type: this.activeId,
          newPwd: newPwd
        })
      }
    },
    computed: {
      commonImgUrl () {
        return this.$store.state.home.commonImgUrl
      },
      userInfo () {
        return this.$store.state.home.userInfo || {}
      },
      activeId () {
        return this.activeObj['id']
      }
    }
  }
</script>
