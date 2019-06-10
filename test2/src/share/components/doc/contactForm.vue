<template>
  <div v-if="contact">
    <hr class="bkLine">
    <div class="contactUsForm">
      <div class="contactFormItem">
        <span>名字：</span>
        <input class="inputCont" type="text" maxlength="30"  v-model="name.value" placeholder="请输入名字" @blur="checkName(name)"/>
        <p class="warnMsg" v-show='name.show'>{{name.tip}}</p>
      </div>
      <div class="contactFormItem">
        <span>联络电话：</span>
        <input class="inputCont" type="number" v-model='phone.value' id="customer_phone" placeholder="请输入联络电话" @blur="checkContacts(phone)">
        <p class="warnMsg allemptyMsg" v-show='phone.show'>{{phone.tip}}</p>
      </div>
      <div class="contactFormItem">
        <span>QQ/skype：</span>
        <input class="inputCont" type="text" maxlength="30" v-model='qqOrSkype.value' id="customer_im" placeholder="请输入QQ或Skype" @blur="checkContacts(qqOrSkype)">
        <p class="warnMsg allemptyMsg" v-show='qqOrSkype.show'>{{qqOrSkype.tip}}</p>
      </div>
      <div class="contactFormItem">
        <span>电邮信箱：</span>
        <input class="inputCont" type="text" maxlength="30" v-model='email.value'  placeholder="请输入电邮信箱" @blur="checkContacts(email)">
        <p class="warnMsg allemptyMsg" v-show='email.show'>{{email.tip}}</p>
      </div>
      <div class="contactFormItem h170">
        <span>联络事项：</span>
        <textarea class="floatLf" cols="42" rows="10" wrap="logical" v-model='content.value'  name="customer_text" id="customer_text" maxlength="200" placeholder="请输入的内容不超过200个字符"></textarea>
      </div>
      <div class="subButton">
        <input type="button" value="送出" @click="newSaveContact">
        <input type="button" class="clearAll" value="清除" @click="clearContact()">
      </div>
    </div>
  </div>
</template>

<script>
  /*
   *vue 单独编译注释：
   *单独编译 不要 import 引入
   * */
  export default {
    name: 'contact',
    props: ['contact'],
    data () {
      return {
        name: window.common.const.contactData.name,
        phone: window.common.const.contactData.phone,
        qqOrSkype: window.common.const.contactData.qqOrSkype,
        email: window.common.const.contactData.email,
        content: window.common.const.contactData.content
      }
    },
    computed: {
    },
    methods: {
      checkName (item) {
        if (item.value === '') {
          item.valid = true
          item.show = false
          item.tip = ''
          return true
        } else {
          return this.validInput(item)
        }
      },
      // 检查三个联系方式是否都为空
      checkContacts (item) {
        if (this.phone.value === '' && this.qqOrSkype.value === '' && this.email.value === '') {
          this.phone.show = true
          this.qqOrSkype.show = true
          this.email.show = true
          this.phone.tip = '请输入电话、QQ或Skype、电邮信箱中的一种'
          this.qqOrSkype.tip = '请输入电话、QQ或Skype、电邮信箱中的一种'
          this.email.tip = '请输入电话、QQ或Skype、电邮信箱中的一种'
          console.log(item, 'allEmpty', 'false')
          return false
        }
        if (item.value === '') {
          item.valid = true
          item.show = false
          item.tip = ''
          console.log(item, 'itemEmpty', 'false')
          return true
        } else {
          this.phone.show = false
          this.qqOrSkype.show = false
          this.email.show = false
          this.phone.tip = ''
          this.qqOrSkype.tip = ''
          this.email.tip = ''
          return this.validInput(item)
        }
      },
      // 统一用此方法校验
      validInput (item) {
        let _regular = window.common.const.regular
        // let _arr = _regular.common
        if ((_regular[item.name].regular.test(item.value))) {
          item.valid = true
          item.show = false
          item.tip = ''
          return true
        } else {
          item.valid = false
          item.show = true
          item.tip = _regular[item.name].warn
          return false
        }
      },
      // 提交表单
      newSaveContact () {
        // 判断是否校验通过
        if (!this.checkName(this.name)) {
          console.log('name')
          window.layer.msgWarn('请正确填写联络信息！!', function () {})
          return
        }
        if (!this.checkContacts(this.phone)) {
          console.log('phone')
          window.layer.msgWarn('请正确填写联络信息！!', function () {})
          return
        }
        if (!this.checkContacts(this.qqOrSkype)) {
          window.layer.msgWarn('请正确填写联络信息！!', function () {})
          return
        }
        if (!this.checkContacts(this.email)) {
          window.layer.msgWarn('请正确填写联络信息！!', function () {})
          return
        }
        var msg = '是否确定送出'
        if (confirm(msg) === true) {
          let _params = {
            name: this.name.value,
            telePhone: this.phone.value,
            qqSkype: this.qqOrSkype.value,
            email: this.email.value,
            business: this.content.value
          }
          window.common.saveContact(_params)
        } else {
          return false
        }
      },
      // 重置数据，网上说用此方法Object.assign(this.$data, this.$options.data())可以重置，但是试验无法重置
      clearContact () {
        this.name = { value: '', valid: false, name: 'name', tip: '' }
        this.phone = { value: '', valid: false, name: 'phone', tip: '' }
        this.qqOrSkype = { value: '', valid: false, name: 'qqOrSkype', tip: '' }
        this.email = { value: '', valid: false, name: 'email', tip: '' }
        this.content = { value: '', valid: false, name: 'content', tip: '' }
      }
    }
  }
</script>

