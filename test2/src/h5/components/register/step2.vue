<template>
      <div class="reg-step2">
        <div class="yo-form-item"  v-if="regInfo.parentName && regInfo.parentName.ifShow">
          <label class="title" for="inviteCode">介绍人 <span class="high-red red-star" v-if="regInfo.parentName.ifRequired == 1">*</span></label>
          <div class="con-cen">
            <input class="input-sty2" id='inviteCode' type="text" maxlength="6"
                 :placeholder="regInfo.parentName.ifRequired?'请输入介绍人': '可填可不填'"
                 v-model="user1.parentName" disabled="true" v-if="Intr"
                 @input="regChars()"
                 @blur="checkParentName()">
            <input class="input-sty2" id='inviteCode' type="text" maxlength="6"
                   :placeholder="regInfo.parentName.ifRequired?'请输入介绍人': '可填可不填'"
                   v-model="user1.parentName" v-else
                   @input="regChars()"
                   @blur="checkParentName()">
          </div>
        </div>
        <!--err 提示-->
        <regErr :regDate="errMsg" message="parentName"/>

        <div class="yo-form-item" v-if="!!regInfo.realName && regInfo.realName.ifShow ==1">
          <label class="title">真实姓名<span class="high-red red-star" v-if="regInfo.realName.ifRequired == 1">*</span></label>
          <div class="con-cen">
            <input type="text" class="input-sty2" maxlength="20"
                 placeholder="与您的银行账户名称相同"
                 v-model="user1.realName"
                 @input="checkName()"
                 @blur="checkRealName()" >
          </div>
        </div>
        <!-- err 提示-->
        <regErr :regDate="errMsg" message="realName"/>

<!-- {{regInfo}} -->
        <div class="yo-form-item" v-if="!!regInfo.nickname && regInfo.nickname.ifShow == 1">
          <label class="title">昵称<span class="high-red red-star" v-if="regInfo.nickname.ifRequired == 1">*</span></label>
          <div class="con-cen">
            <input class="input-sty2" type="text" maxlength="20" placeholder="1-20位的任意字符"
                  v-model="user1.nickname"
                  @blur="checkNickname()"
                  @keyup="filterNotCNname()">
          </div>
        </div>
        <!-- err 提示-->
        <regErr :regDate="errMsg" message="nickname"/>

        <div class="yo-form-item"  v-if="!!regInfo.englishname && regInfo.englishname.ifShow == 1">
          <label class="title">英文姓名<span class="high-red red-star" v-if="regInfo.englishname.ifRequired == 1">*</span></label>
          <div class="con-cen">
            <input class="input-sty2" type="text" placeholder="请输入您的英文姓名"
                  v-model="user1.englishname" maxlength="20"
                  @blur="checkEnglishName()"
                  @keyup="filterNotEngCNname()" >
          </div>
        </div>
        <!-- err 提示-->
        <regErr :regDate="errMsg" message="englishname"/>

        <div class="yo-form-item"  v-if="!!regInfo.birthday && regInfo.birthday.ifShow == 1" style="position: relative">
          <label class="title" id="birthday">生日
            <span class="high-red red-star" v-if="regInfo.birthday.ifRequired == 1">*</span>
          </label>
          <div class="con-cen">
            <input class="input-sty2" type="text" name="" placeholder="请选择您的生日"
                 ref="birthday" readonly
                 v-model="user1.birthday">
            <!-- 生日的遮罩层，不能让生日输入框点击，否则出现软键盘 -->
            <span class="birthday-mask" @click="openPicker()"></span>
          </div>
        </div>
        <mt-datetime-picker
            ref="picker"
            type="date"
            :startDate="new Date(new Date().getFullYear() - 56, 0, 1)"
            :endDate="new Date()"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            @confirm="getValue"
            v-model="birthday">
        </mt-datetime-picker>
        <!-- err 提示-->
        <regErr :regDate="errMsg" message="birthday"/>

<!-- {{user1}} -->
        <div class="yo-form-item"  v-if="!!regInfo.country && regInfo.country.ifShow == 1">
          <label class="title">国家<span class="high-red red-star" v-if="regInfo.country.ifRequired == 1">*</span></label>
          <div class="con-cen">
            <input class="input-sty2" type="text" maxlength="12" placeholder="1-16位汉字"
                  v-model="user1.country"
                  @blur="checkCountry()"
                  oninput="this.value=this.value.replace(/[^\u4e00-\u9fa5]/g,'')"
                  @keyup="filterNotContryCNname()">
          </div>
        </div>
        <!-- err 提示-->
        <regErr :regDate="errMsg" message="country"/>

        <div class="yo-form-item"  v-if="!!regInfo.idPassportNo && regInfo.idPassportNo.ifShow == 1">
          <label class="title">证件类型<span class="high-red red-star" v-if="regInfo.idPassportNo.ifRequired == 1">*</span></label>
          <div class="con-cen">
            <select class="yo-select" v-model="user1.idPassportNoType" @change="changeCardType()">
              <option value="0">身份证</option>
              <option value="1">护照</option>
            </select>
          </div>
        </div>

        <div class="yo-form-item"  v-if="!!regInfo.idPassportNo && regInfo.idPassportNo.ifShow == 1">
          <label class="title">证件号码<span class="high-red red-star" v-if="regInfo.idPassportNo.ifRequired == 1">*</span></label>
          <div class="con-cen">
            <input class="input-sty2" type="text" :maxlength="this.user1.idPassportNoType * 1 === 0 ? '18' : '9'" :placeholder="placeHoderMsg"
                  v-model="user1.idPassportNo"
                  @input="checkNoType()"

                  @blur="checkIdPassportNo()">
          </div>
        </div>
        <!-- err 提示-->
        <regErr :regDate="errMsg" message="idPassportNo"/>

        <div class="yo-form-item" v-if="!!regInfo.phone && regInfo.phone.ifShow == 1">
          <label class="title">手机号<span class="high-red red-star" v-if="regInfo.phone.ifRequired == 1">*</span></label>
          <div class="con-cen">
            <input class="input-sty2" type="tel" maxlength="11" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入11位纯数字的手机号"
                  v-model="user1.phone"
                  @blur="checkPhone()">
          </div>
        </div>
        <!--err 提示 -->
        <regErr :regDate="errMsg" message="phone"/>



        <div class="yo-form-item"  v-if="!!regInfo.qq && regInfo.qq.ifShow == 1">
          <label class="title">QQ号<span class="high-red red-star" v-if="regInfo.qq.ifRequired == 1">*</span></label>
          <div class="con-cen">
            <input class="input-sty2" type="tel" maxlength="12" oninput="value=value.replace(/[^\d]/g,'')" placeholder="请输入5-12位纯数字的QQ号"
                 v-model="user1.qq"
                 @blur="checkQq()" @input="assertQq()"
            >
          </div>
        </div>
        <!--err 提示-->
        <regErr :regDate="errMsg" message="qq"/>

        <div class="yo-form-item"  v-if="!!regInfo.email && regInfo.email.ifShow == 1">
          <label class="title">邮箱<span class="high-red red-star" v-if="regInfo.email.ifRequired == 1">*</span></label>
          <div class="con-cen">
            <input class="input-sty2" type="text" maxlength="22" placeholder="请输入常用邮箱地址"
                 v-model="user1.email"
                 @blur="checkEmail()"
                 @input="checkMail()"
            >
          </div>
        </div>
        <!--err 提示-->
        <regErr :regDate="errMsg" message="email"/>

        <div class="yo-form-item"  v-if="!!regInfo.wechat && regInfo.wechat.ifShow == 1">
          <label class="title">微信号<span class="high-red red-star" v-if="regInfo.wechat.ifRequired == 1">*</span></label>
          <div class="con-cen">
            <input class="input-sty2" type="text" maxlength="20" placeholder="请输入您的微信账号"
                  v-model="user1.wechat"
                  oninput='value=value.replace(/[^0-9a-zA-Z_-]/ig, "")'
                  @blur="checkWechat()">
          </div>
        </div>
        <!--err 提示 -->
        <regErr :regDate="errMsg" message="wechat"/>

        <div class="yo-form-item">
          <label class="title" for="veryCode">验证码 <span class="high-red red-star">*</span></label>
          <div class="con-cen">
            <input class="input-sty2" id='veryCode' type="text" placeholder="请输入验证码"
                 v-model="user1.zhuceYm"
                 ref="validCodeInput"
                 oninput='value=value.replace(/[^0-9a-zA-Z]/g, "")'
                 @blur="checkZhuceYm()"
                 maxlength="4"
            >
            <img v-if="validCodeSrc" :src="validCodeSrc" ref="validCodeSrc" @click="clickYZM()">
          </div>
        </div>
        <!--err 提示-->
        <regErr :regDate="errMsg" message="zhuceYm"/>

        <div class="prompt">
         <label class="mint-checklist-label" style="padding-left:0">
            <span class="mint-checkbox">
              <input type="checkbox" class="mint-checkbox-input" v-model="pact">
              <span class="mint-checkbox-core mint-checkbox-core-yellow"></span>
            </span>&nbsp;我已届满合法博彩年龄，且同意各项<span @click="openAgreement">开户条约。</span>
          </label>
        </div>

      </div>
</template>
<script>
import dayjs from 'dayjs'
import Vue from 'vue'
import verify from '@s/components/reg/verify.js'
import DatetimePicker from 'mint-ui/lib/datetime-picker' // 按需加载mint-ui的模块
import { mapState } from 'vuex'
Vue.component(DatetimePicker.name, DatetimePicker)
export default {
  name: 'step2',
  data () {
    return {
      birthday: '',
      placeHoderMsg: '15或18位数字且第18位支持字母X'
    }
  },
  props: {
    validCodeSrc: {
      type: String
    }
  },
  mixins: [verify],
  methods: {
    changeCardType () {
      // 身份證
      if (this.user1.idPassportNoType * 1 === 0) {
        this.user1.idPassportNo = ''
        this.placeHoderMsg = '15或18位数字且第18位支持字母X'
      }
      // 護照
      if (this.user1.idPassportNoType * 1 === 1) {
        this.user1.idPassportNo = ''
        this.placeHoderMsg = '6-9位的字母和数字的组合'
      }
    },
    openAgreement (ev) {
      this.$store.state.h5Home.openAgreement = 1
      ev.preventDefault()
    },
    getValue () {
      let $this = this
      if ($this.birthday) {
        try {
          this.$store.state.user.user1.birthday = dayjs($this.birthday).format('YYYY/MM/DD')
        } catch (e) {
        }
      }
      setTimeout(() => {
        this.checkBirthday()
      }, 10)
    },
    clickYZM () {
      this.$emit('changeYZM')
      // this.validCodeSrc = '/member/code?t=' + new Date().getTime()
      // console.log(this.validCodeSrc)
    },
    openPicker () {
      this.$refs.picker.open()
    }
  },
  mounted () {
    // this.clickYZM()
    if (window.$('#birthday')[0]) {
      let _left = window.$('#birthday').position().left + window.$('#birthday').width()
      let _width = screen.width - _left
      window.$('.birthday-mask').css('left', _left + 'px')
      window.$('.birthday-mask').css('width', _width + 'px')
    }
    // 默认勾选中开户条约
    this.pact = true
    this.user1.idPassportNoType = 0
  },
  computed: {
    ...mapState({
      regStep: state => state.user.regStep, // 注册是否分步 false 不分步
      // memberSetList: state => state.user.memberSetList,
      regInfo: state => state.user.regInfo, // 后台传送的验证消息 是否显示  是否验证 是否必填
      errMsg: state => state.user.errMsg, // 验证用户输入失去焦点后的错误提示语
      user1: state => state.user.user1, // 用户注册信息 input输入框里的内容
      Intr: state => state.user.Intr // 域名或者 或者推广链接有绑定域名时为true
    }),
    pact: {
      get: function () {
        return this.$store.state.user.user1.pact
      },
      set: function (v) {
        this.$store.state.user.user1.pact = v
      }
    },
    getLoginStatus () {
      return window.store.state.user.isLogin
    }
  }
}
</script>
