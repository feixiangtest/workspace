<template>
  <div class="yo-register yo-md-reg" id="regDiv">
    <div class="yo-reg-center">
      <div class="yo-r-main">
        <fieldset>
          <legend class="r-zhzc">注册账号</legend>
          <div class="yo-rbox-cen">

            <div class="reg-box"  v-if="regInfo.parentName && regInfo.parentName.ifShow">
              <span class="joinus-label"><span class="red-sign" v-if="regInfo.parentName.ifRequired == 1">*</span>介绍人：</span>
              <input class="joinus-input" type="text" maxlength="6"
                     :placeholder="regInfo.parentName.ifRequired?'请输入介绍人': '可填可不填'"
                     v-model="user1.parentName" disabled="true"
                     @input="regChars()" v-if="Intr"
                     @blur="checkParentName()"
              >
              <input class="joinus-input" type="text" maxlength="6"
                     :placeholder="regInfo.parentName.ifRequired?'请输入介绍人': '可填可不填'"
                     v-model="user1.parentName"
                     @input="regChars()" v-else
                     @blur="checkParentName()"
              >
              <p class="t-tipmsg y-correct-msg" v-if="Intr"><span>   </span></p>
              <!--err 提示-->
              <AddErr v-show='!Intr' :regDate="errMsg" message="parentName"/>
            </div>

            <div class="reg-box">
              <span class="joinus-label"><span class="red-sign">*</span>登录账号：</span>
              <input class="joinus-input" type="text" maxlength="12" placeholder="字母开头的6-12位字母和数字组合或纯英文字母"
                     v-model="user1.account"
                     @input="assertAccount()"
                     @blur="checkAccount()"
              >
              <AddErr :regDate="errMsg" message="account"/>
            </div>
            <div class="reg-box">
              <span class="joinus-label"><span class="red-sign">*</span>登录密码：</span>
              <div class="yo-pass-box">
                <input class="joinus-input" maxlength="12" placeholder="6-12位字母与数字的组合"
                       :type="!passwordText?'password':'text'"
                       @blur="checkPw(1),checkPwSyn()"
                       v-model="user1.password"
                       @input="pwdOnKeyUp(0)"
                >
                <a class="yo-mm-xs" href="javascript:;" v-show="passwordText" @click="showpassword('passwordText')"></a>
                <a class="yo-mm-yc" href="javascript:;" v-show="!passwordText" @click="showpassword('passwordText')"></a>

              </div>
              <AddErr :regDate="errMsg" message="password"/>
            </div>
            <div class="reg-box">
              <span class="joinus-label"><span class="red-sign">*</span>确认密码：</span>
              <div class="yo-pass-box">
                <input class="joinus-input" maxlength="12" placeholder="重新输入密码"
                       :type="!passwordText2?'password':'text'"
                       @blur="checkPw(2)"
                       v-model="user1.password1"
                       @input="pwdOnKeyUp(1)"
                >
                <a class="yo-mm-yc" href="javascript:;" v-show="!passwordText2" @click="showpassword('passwordText2')"  ></a>
                <a class="yo-mm-xs" href="javascript:;" v-show="passwordText2" @click="showpassword('passwordText2')"  ></a>
              </div>
              <AddErr :regDate="errMsg" message="password1"/>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend class="r-hyzl">会员资料</legend>
          <div class="yo-rbox-cen">
            <div class="reg-box" v-if="regInfo.realName && regInfo.realName.ifShow">
              <span class="joinus-label"><span class="red-sign" v-if="regInfo.realName.ifRequired == 1" >*</span>真实姓名：</span>
              <input class="joinus-input" type="text"
                     maxlength="12"
                     placeholder="与您的银行账户名称相同"
                     v-model="user1.realName"
                     @blur="checkRealName()"
              >
              <AddErr :regDate="errMsg" message="realName"/>
            </div>
            <div class="reg-box" v-if="regInfo.nickname && regInfo.nickname.ifShow">
              <span class="joinus-label"><span class="red-sign" v-if="regInfo.nickname.ifRequired == 1" >*</span>昵称：</span>
              <input class="joinus-input" type="text" maxlength="20" placeholder="请输入昵称"
                     v-model="user1.nickname"
                     @blur="checkNickname()"
                     @keyup="filterNotCNname()"
              >
              <AddErr :regDate="errMsg" message="nickname"/>
            </div>
            <div class="reg-box" v-if="regInfo.englishname && regInfo.englishname.ifShow">
              <span class="joinus-label"><span class="red-sign" v-if="regInfo.englishname.ifRequired" >*</span>英文姓名：</span>
              <input class="joinus-input" type="text" maxlength="20" placeholder="请输入英文姓名"
                     v-model="user1.englishname"

                     @blur="checkEnglishName()"
                     @keyup="filterNotEngCNname()"
              >
              <AddErr :regDate="errMsg" message="englishname"/>
            </div>
            <div class="reg-box" v-if="regInfo.country && regInfo.country.ifShow">
              <span class="joinus-label"><span class="red-sign" v-if="regInfo.country.ifRequired">*</span> 国家：</span>
              <input class="joinus-input" type="text" maxlength="16" placeholder="请输入国家"
                     v-model="user1.country"
                     @blur="checkCountry()"
                     @keyup="filterNotContryCNname()"
              >
              <AddErr :regDate="errMsg" message="country"/>
            </div>
            <div class="reg-box reg-birthday" v-if="regInfo.birthday && regInfo.birthday.ifShow">
              <span class="joinus-label"><span class="red-sign" v-if="regInfo.birthday.ifRequired" >*</span>生日：</span>
              <el-date-picker
                v-model="user1.birthday"
                @blur="checkBirthday()"
                type="date"
                placeholder="请选择生日">
              </el-date-picker>
              <AddErr :regDate="errMsg" message="birthday"/>
            </div>
            <div class="reg-box yo-special" v-if="regInfo.idPassportNoType && regInfo.idPassportNoType.ifShow">
              <span class="joinus-label"><span class="red-sign" v-if="regInfo.idPassportNoType.ifRequired">*</span>证件号码：</span>
              <input class="joinus-input" type="text" maxlength="18" placeholder="请输入身份证或护照号"
                     v-model="user1.idPassportNo"
                     @input="checkNoType()"
                     @blur="checkIdPassportNo()"
              >
              <div class="spec-div radio-type">
                <label><input type="radio" name="idPassportNoType" value="0" v-model="user1.idPassportNoType" >身份证</label>
                <label><input type="radio" name="idPassportNoType" v-model="user1.idPassportNoType" value="1">护照</label>
              </div>
              <!-- err 提示-->
              <AddErr :regDate="errMsg" message="idPassportNo"/>
            </div>
            <div class="reg-box" v-if="regInfo.phone && regInfo.phone.ifShow">
              <span class="joinus-label"><span class="red-sign"  v-if="regInfo.phone.ifRequired == 1" >*</span>手机号码：</span>
              <input class="joinus-input" type="text" maxlength="11" placeholder="取回登入密码的唯一途径"
                     v-model="user1.phone"
                     @blur="checkPhone()"
              >
              <!--err 提示 -->
              <AddErr :regDate="errMsg" message="phone"/>
            </div>
            <div class="reg-box wechat1" v-if="regInfo.wechat && regInfo.wechat.ifShow">
              <span class="joinus-label"><span class="red-sign"  v-if="regInfo.wechat.ifRequired == 1" >*</span>微信号码：</span>
              <input class="joinus-input" type="text" maxlength="20" placeholder="请输入微信号"
                     v-model="user1.wechat"
                     @blur="checkWechat()"
              >
              <!--err 提示 -->
              <AddErr :regDate="errMsg" message="wechat"/>
            </div>
            <div class="reg-box">
              <span class="joinus-label"><span class="red-sign" >*</span>取款密码：</span>
              <div class="yo-pass-box">
                <input class="joinus-input yo-qkmm"
                       :type="!passwordText3?'password':'text'"
                       maxlength="4" placeholder="请输入4位纯数字取款密码"
                       v-model="confirmPwd"
                       @keyup='toNumber("confirmPwd")'
                       @click.stop='openKeyBoard("showDrawKey")'
                       readonly
                >
                <key-board :inputData='newValue' :keyNum='setNewCode' :clickNum='setDrawConfirmPwd' v-if='showDrawKey' :clear="clearNewDrawPwd"></key-board>
                <a class="yo-mm-yc" href="javascript:;" v-show="!passwordText3" @click.stop="showpassword('passwordText3')"  ></a>
                <a class="yo-mm-xs" href="javascript:;" v-show="passwordText3" @click.stop="showpassword('passwordText3')"  ></a>
              </div>
              <!--err 提示 blurb 不校验  -->
              <AddErr :regDate="errMsg" message="drawMoneyPwd"/>
            </div>
            <div class="reg-box" v-if="regInfo.qq && regInfo.qq.ifShow">
              <span class="joinus-label"><span class="red-sign" v-if="regInfo.qq.ifRequired">*</span>QQ：</span>
              <input class="joinus-input" type="text" maxlength="12" placeholder="5-12位纯数字"
                     v-model="user1.qq"
                     @blur="checkQq()" @input="assertQq()"
              >
              <!--err 提示-->
              <AddErr :regDate="errMsg" message="qq"/>
            </div>

            <div class="reg-box" v-if="regInfo.email && regInfo.email.ifShow">
              <span class="joinus-label"><span class="red-sign" v-if="regInfo.email.ifRequired">*</span>邮箱：</span>
              <input class="joinus-input" type="text" maxlength="22" placeholder="请输入常用邮箱地址"
                     v-model="user1.email"
                     @blur="checkEmail()"
              >
              <!--err 提示-->
              <AddErr :regDate="errMsg" message="email"/>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend class="r-aqjc">安全检查</legend>
          <div class="yo-rbox-cen">
            <div class="reg-box">
              <span class="joinus-label"><span class="red-sign">*</span>验证码：</span>
              <div class="yo-yzmbox">
                <input class="joinus-input" type="text" placeholder="请点击"
                       v-model="user1.zhuceYm"
                       ref="validCodeInput"
                       @click="clickYZM()"
                       @blur="checkZhuceYm()"
                       maxlength="4"
                >
                <img :src="validCodeSrc" ref="validCodeSrc" @click="clickYZM()">
              </div>
              <!--err 提示-->
              <AddErr :regDate="errMsg" message="zhuceYm"/>
            </div>
            <div class="reg-box yo-agreement">
              <span class="joinus-label"><input type="checkbox" name=""  v-model="user1.pact"></span>
              <h6>我确定所提供的信息都是准确的，我已经年满18周岁，我已经阅读并接受<a class="yo-c-link yo-tkxy" href="javascript:;"
                                                      @click="openAgree()">相关条款和隐私协议</a>。</h6>
            </div>
            <div class="reg-box submit-box">
              <a class="yo-sub-but" href="javascript:;" @click="gosub()">提交信息</a>
              <p>已有账号，<a class="yo-c-link" href="javascript:;" title="" @click="loginIn">直接登录</a></p>
            </div>
          </div>
        </fieldset>
      </div>
      <div class="yo-r-bot">
        <h6>备注：</h6>
        <ol>
          <li>标记有<span class="red-sign">*</span>者为必填项目。</li>
          <li>取款密码为取款金额时的凭证，请会员务必填写牢记。</li>
          <li>温馨提示：注册时如遇到同名或注册不了等其它问题请联系在线客服，我们会第一时间为您解决好！</li>
        </ol>
      </div>
    </div>
    <reg-agree :showCheck="showCheck" :agree='agree'></reg-agree>
  </div>
</template>

<script>
  // 协议提示框 取款密码的键盘 全局注册
  import verify from './verify' // 抽出 校验的js 函数
let regVue = {
    components: { },
    created () {
      let queryIndex = ''
      // 如果是已经登录不允许进入注册
      if (this.getLoginStatus) {
        window.router.push('/')
      }
      if (localStorage.queryIndex) {
        queryIndex = JSON.parse(localStorage.queryIndex)
      }
      if (queryIndex.data && queryIndex.data.regStatus) {
        window.router.push('/home')
        return ''
      }
    },
    data () {
      return {
        newValue: '', // 键盘值
        showCheck: false, // 显示 协议提示框
        validCodeSrc: '',
        modalOptions: '',
        Intr: window.common.getCookie('Intr') ? window.common.getCookie('Intr') : false,
        confirmPwd: '', // 初始化 提款密码
        showDrawKey: null, // 提款密码 不显示
        // warn 设定
        errMsg: {
          account: {
            status: 'warn', // 警告'warn' 错误 'err' 正确 'complete'
            warn: '账号为字母开头，6-12位的字母与数字组合！',
            err: ''
          },
          password: {
            status: 'warn', // 警告'warn' 错误 'err' 正确 'complete'
            warn: '密码为6-12位字母与数字的组合！',
            err: ''
          },
          password1: {
            status: 'warn',
            warn: '',
            err: ''
          },
          realName: {
            status: 'warn',
            warn: '必须与您的银行账户名称相同，否则不能出款！'
          },
          phone: {
            status: 'warn',
            warn: '取回登入密码的唯一途径，请务必真实！'
          },
          drawMoneyPwd: {
            status: 'warn',
            warn: '取款时要用到的密码，非常重要，请务必牢记！'
          },
          zhuceYm: {
            status: '',
            warn: ''
          },
          wechat: {
            status: '',
            warn: ''
          },
          errName: 'reg'
        },
        user1: { // 默认用户 数据 提交数据
          pact: true,
          parentName: '',
          idPassportNoType: 0, // 证件号码 input 默认值
          birthday: ''
        },
        regInfo: { // 注册字段 信息
          'account': {
            'ifShow': 1,
            'ifRequired': 1,
            'ifValidate': 1
          },
          'password': {
            'ifShow': 1,
            'ifRequired': 1,
            'ifValidate': 1
          },
          'password1': {
            'ifShow': 1,
            'ifRequired': 1,
            'ifValidate': 1
          },
          'drawMoneyPwd': {
            'ifShow': 1,
            'ifRequired': 1,
            'ifValidate': 1
          }
        },
        //    birthday: '',
        passwordText: false,
        passwordText2: false,
        passwordText3: false,
        pickerValue: ''
      }
    },
    computed: {
      getLoginStatus () {
        return window.store.state.user.isLogin
      }
    },
    methods: {
      // 登录
      loginIn () {
        window.store.state.shareApi.showPopLogin = true
      },
      checkPwSyn () {
        if (this.errMsg.password1 && this.errMsg.password1.status === 'err') {
          this.checkPw(2)
        }
      },
      agree () {
        this.showCheck = false
      },
      openAgree () {
        this.showCheck = true
      },
      // 打开相对应的键盘
      openKeyBoard (v) {
        this.newValue = ''
        this[v] = true
      },
      // 重置清空密码
      clearNewDrawPwd (v) {
        this.confirmPwd = ''
      },
      // 通过电脑键盘输入新密码
      setNewCode (ev) {
        if (!this.showDrawKey) return
        if (isNaN(ev.key)) return
        this.setDrawConfirmPwd(ev.key)
      },
      // 通过键盘设置确认密码
      setDrawConfirmPwd (n) {
        this.newValue += n.toString()
        if (this.newValue.length > 3) {
          this.toNumber('newValue')
          this.user1.drawMoneyPwd = this.confirmPwd = this.newValue
          this.showDrawKey = false
          // 输入校验
          this.validDrawMoneyPwd()
        }
      },
      // 设定只能输入数字，并且不超过4位
      toNumber (v) {
        this[v] = this[v].toString().replace(/[^\d]+/g, '').slice(0, 4)
        // 输入校验
        this.validDrawMoneyPwd()
      },
      // 不管是下拉键盘输入 或者 电脑键盘输入长度校验
      validDrawMoneyPwd () {
        if (this.confirmPwd.length > 3) {
          // this.showDrawKey = false
          // 检查提款密码
          this.drawMoney()
        }
      },
      /**
       *  根据 数据
       'ifShow': 1,
       'ifRequired': 1,
       'ifValidate': 1 初始化 警告'warn'
       */
      initErr () { //
        console.log('初始化 警告 warn ')
        window._.each(this.regInfo, (a, b) => {
          if (window._.isObject(a)) {
            this.$set(this.errMsg, b, window._.extend({
              status: '', // 警告'warn' 错误 'err' 正确 'complete'
              warn: '',
              err: ''
            }, this.errMsg[b] ? this.errMsg[b] : {}))
            /* if (a.ifShow == 1 && a.ifRequired != 1) {
             this.errMsg[b].status = 'warn'
             } */
          }
        })
      },
      clickYZM () {
        this.validCodeSrc = '/member/code?t=' + new Date().getTime()
      }
    },
    watch: {
      // 监听输入的密码数据，如果格式正确，就设置输入框后面的样式为correctStyle，反之errorStyle
      confirmPwd (v) {
        this.user1.drawMoneyPwd = this.confirmPwd
        // this.setStyle(v === this.newPwd && v.length === 4, 'confirmPwdClass')
      },
      // 监听登录状态，如果用弹框登录，就跳转到首页
      getLoginStatus (v) {
        if (v) {
          window.router.push('/')
        }
      }
    },
    mounted () {
      document.onclick = () => { // 点击空白区域隐藏键盘
        if (this.showDrawKey) {
          this.showDrawKey = false
          // 检查提款密码
          this.drawMoney()
        }
      }
      var $this = this
      var postActioin = {}

      // 对照关系
      var _a = {
        1: 'parentName',
        13: 'zhuceYm',
        3: 'realName',
        4: 'nickname',
        5: 'englishname',
        6: 'birthday',
        7: 'country',
        8: 'idPassportNoType',
        9: 'phone',
        //  10: 'drawMoneyPwd',
        11: 'qq',
        12: 'email',
        14: 'wechat'
      }
      let queryIndex = ''
      if (localStorage.queryIndex) {
        queryIndex = JSON.parse(localStorage.queryIndex)
      }
      if (queryIndex.data && queryIndex.data.regStatus) {
        window.router.push('/home')
        return ''
      }
      this.$store.dispatch('user.register', postActioin).then(res => {
        if (res.data.regStatus) {
          window.layer.msgWarn('本平台暂未开放注册功能，请联系客服！', function () {
            window.router.push('/home')
          })
          return
        }
        this.clickYZM()
        let memberSetList = {}
        window._.each(res.data.memberSetList, (a, b) => {
          memberSetList[_a[b]] = a
        })
        // 合并 注册 字段 ifShow , ifRequired ifValidate
        $this.regInfo = window._.extend($this.regInfo, memberSetList)
        //    $this.regInfo = window._.extend($this.regInfo, $this.regInfo.memberSetList)
        //    delete $this.regInfo.memberSetList
        // 证件类型 证件号  idPassportNo 借用 证件类型传递来的val
        if ($this.regInfo.idPassportNoType && $this.regInfo.idPassportNoType.ifShow) {
          $this.regInfo.idPassportNo = $this.regInfo.idPassportNoType
        }
        // parentName 推广码 赋值
        if (res.data.memberSetList[1].ifShow) {
          // url 带推广吗
          if (this.Intr) {
            this.$set(this.user1, 'parentName', this.Intr)
            this.Intr = true
            return ''
          }
          // res 有推广码的时候
          if (res.data.parentName) {
            this.$set(this.user1, 'parentName', res.data.parentName)
            this.Intr = true
          }
        }
        // 初始化 err 数据结构
        $this.initErr()
      })
    }
  }
  window._.extend(regVue.methods, verify.methods)
  export default regVue
</script>
