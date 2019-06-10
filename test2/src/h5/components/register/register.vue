<template>
  <div id="pageReg">
      <div class="common-main main-box" v-if="memberSetList && !openAgreement">
        <div class="reg-header" v-if="regStep">
          <div class="item">
            <span class="circle" :class="{circle2: step01[0] || step01[1]}">1</span>
            <div class="text text2">设置登录账号</div>
            <div class="line">
              <div class="line-trans"></div>
              <div class="line-gray"></div>
            </div>
          </div>
          <div class="item">
            <span class="circle" :class="{circle2: step01[1]}">2</span>
            <div class="text" :class="{text2: step01[1]}">填写个人资料</div>
            <div class="line">
              <div class="line-gray"></div>
              <div class="line-gray"></div>
            </div>
          </div>
          <div class="item">
            <span class="circle">3</span>
            <div class="text">注册成功</div>
            <div class="line">
              <div class="line-gray"></div>
              <div class="line-trans"></div>
            </div>
          </div>
        </div>
            <!-- {{step01}} -->
        <div class="reg-box" id="regbox">
          <!-- step 1 -->
           <!-- {{ step01 }} -->
          <step1 v-if="step01[0]" />
          <!-- step 2 <step2 /> -->
          <step2 :validCodeSrc='validCodeSrc' @changeYZM="clickYZM()" v-if="step01[1]" />
        </div>
        <!-- 多步注册 -->
        <div class="btn-wrap" v-if="regStep && step01[0]">
          <a class="btn one-btn" @click="step01Fn(0)">下一步</a>
        </div>

        <div class="btn-wrap" v-if="regStep &&step01[1]">
          <div class="btn one-btn">
            <div class="left" @click="step01Fn(-1)">上一步</div>
            <div class="right" @click="step01Fn(1)">下一步</div>
          </div>
        </div>
        <!-- 单步注册 -->
        <div class="btn-wrap" v-if="!regStep && step01[0]">
          <a class="btn one-btn" @click="step01Fn(2)">确定</a>
        </div>
        <!-- 协议 -->
      </div>
      <agreement v-if="openAgreement" />
    </div>
</template>
<script>
import { mapState } from 'vuex'
import verify from '@s/components/reg/verify.js' // pc+h5 校验的js 函数
import initData from '@/plugins/vueTpl/initData'
import step1 from './step1.vue'
import step2 from './step2.vue'
import agreement from './agreement.vue'
export default {
  name: 'register',
  data () {
    return {
      newValue: '', // 键盘值
      showCheck: false, // 显示 协议提示框
      validCodeSrc: '',
      modalOptions: '',
      confirmPwd: '', // 初始化 提款密码
      showDrawKey: null, // 提款密码 不显示
      passwordText: false,
      passwordText2: false,
      passwordText3: false,
      pickerValue: ''
    }
  },
  // extends: initData
  mixins: [initData, verify],
  components: {
    agreement,
    step1,
    step2
  },
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
      window.router.push('/wap/index')
      return ''
    }
  },
  methods: {
    clickYZM () {
      this.user1.zhuceYm = ''
      this.validCodeSrc = '/member/code?t=' + new Date().getTime()
    },
    step01Fn (step) {
      // 分布 注册 第一步 验证
      // this.$store.state.user.step01 = [false, false]
      window.$('#regbox').css('overflow', '')
      if (step === -1) {
        this.step01 = [true, false]
        return
      }
      // 限制重复执行
      if (window._frequencyStep && new Date().getTime() - window._frequencyStep < 1500) {
        window._frequencyStep = new Date().getTime()
        return false
      }
      window._frequencyStep = new Date().getTime()
      this.$nextTick(() => {
        if (window.$('#regbox').height() - 55 - 44 < screen.availHeight) {
          // 安卓机 640 高度 不兼容 开户条约看不见
          if (screen.availHeight < 641) {
            window.$('.prompt').css('marginBottom', '5rem')
          } else {
            window.$('.prompt').css('marginBottom', '2rem')
          }
        }
      })
      let pass = true // 默认通过
      let $this = this
      var checkStep = { // 需要验证 判断
        0: {
          // 账号
          'account': function ($this) {
            console.log('调用 checkAccount')
            return $this.checkAccount()
          },
          // 登录密码
          'password': function ($this) {
            return $this.checkPw(1, $this)
          },
          // 确认登录密码
          'password1': function ($this) {
            return $this.checkPw(2, $this)
          },
          // 取款密码
          'drawMoneyPwd': function ($this) {
            return $this.drawMoney()
          }
        },
        1: { /// / 必然需要 验证 判断
          // 邀请码
          'parentName': function ($this) {
            return $this.checkParentName()
          },
          // 真实姓名
          'realName': function ($this) {
            return $this.checkRealName()
          },
          // --------------------------
          // 昵称
          'nickname': function ($this) {
            return $this.checkNickname()
          },
          // 英文名字
          'englishname': function ($this) {
            return $this.checkEnglishName()
          },
          // 生日
          'birthday': function ($this) {
            return $this.checkBirthday()
          },
          // 国家
          'country': function ($this) {
            return $this.checkCountry()
          },
          // 身份证或护照号码
          'idPassportNo': function ($this) {
            return $this.checkIdPassportNo()
          },
          // 手机号
          'phone': function ($this) {
            return $this.checkPhone()
          },
          // qq
          'qq': function ($this) {
            return $this.checkQq()
          },
          // 邮箱
          'email': function ($this) {
            return $this.checkEmail()
          },
          // 微信号
          'wechat': function () {
            return $this.checkWechat()
          },
          // 验证码
          'zhuceYm': function ($this) {
            return $this.checkZhuceYm()
          }
        }
      }
      let checkObj = {}
      if (step === 0) {
        checkObj = checkStep[0]
      }
      if (step === 1) {
        checkObj = checkStep[1]
      }
      if (step === 2) {
        checkObj = window._.extend({}, checkStep[0], checkStep[1])
      }
      window._.each(checkObj, function (value, key) {
        if (!pass) {
          // 验证不通过 return
          return false
        }
        console.log('验证step ' + step + key)
        // 遍历 验证 每一个
        // parentName 单独处理
        if (key === 'parentName' && $this.regInfo[key].ifShow) {
          if ($this.regInfo[key].ifValidate || $this.regInfo[key].ifRequired) { // 是否验证
            // 存在 value($this) 返回 true 不存在 value($this) 返回false
            if (value($this)) {
              pass = true
            } else {
              pass = false
              window.layer.msgWarn($this.errMsg[key].txt)
            }
          } else { // 不用验证
            pass = true
          }
        } else {
          if ($this.regInfo[key] && $this.regInfo[key].ifShow && $this.regInfo[key].ifRequired) {
            // 验证通过
            if (value($this)) {
              pass = true
            } else {
              pass = false
              console.log('验证不通过', key)
              window.layer.msgWarn($this.errMsg[key].txt)
            }
          }
        }
      })
      if (!pass) return ''
      // end pass
      if (step === 0) {
        this.step01 = [false, true]
        return
      }
      if (!this.user1.pact) {
        window.layer.msgWarn('请勾选接受相关条款和隐私协议!')
        return false
      }
      if (step === 1 || step === 2) {
        setTimeout(() => {
          this.clickYZM()
        }, 500)
        this.saveAccount('h5Reg')
      }
    },
    h5Reg (err) {
      if (err) return console.log(err)
      window.__regOk = true
      this.$router.push('/wap/regSuccess') //
    },
    fixInput () {
      // 虚拟键盘 弹出盖住
      this.$nextTick(() => {
        window.$('#regbox').css('overflow', '')
        window.$('#pageReg input').blur(function () {
          window.$('#regbox').css('overflow', '')
        })
        window.$('#pageReg input').click(function () {
          let h = Math.ceil(window.$('#regbox').height())
          let phoneH = screen.height - 56
          if (h > phoneH) h = phoneH
          window.$('#regbox').css('height', h)
          window.$('#regbox').css('overflow', 'auto')
          var target = this
          setTimeout(function () {
            window.$('#regbox').css('height', Math.ceil(window.$('#regbox').height()))
            var distance = window.$(target).offset().top - window.$('#regbox').offset().top - window.$('#regbox').height() / 2
            // 算出当前节点input 在 高度
            distance = window.$('#regbox').scrollTop() + distance
            if (distance > 0) {
              window.$('#regbox').scrollTop(distance)
            } else {
              window.$('#regbox').attr('style', '')
            }
          }, 400)
        })
        window.$(document).off('focusout').on('focusout', 'input, textarea', (event) => {
          setTimeout(() => {
            if (localStorage.availHeight && screen.availHeight < localStorage.availHeight) {
              window.$('#regbox').css('overflow', '')
            }
          }, 10)
        })
      })
    },
    initData () {
      if (!this.$store.state.user.memberSetList) {
        var postActioin = { type: 'h5', versionFun: true }
        // 请求基本资料数据
        this.$store.dispatch('user.register', postActioin).then(res => {
          if (res.data.regStatus) {
            return window.layer.msgWarn('本平台暂未开放注册功能，请联系客服！', function () {
              window.router.push('/wap/index')
            })
          }
        })
      }
    }
  },
  beforeDestroy () {
  // 返回时清空输入错误时的提示语
    for (let i in this.errMsg) {
      if (this.errMsg[i].txt) {
        this.errMsg[i].txt = ''
      }
    }
    // 返回时清空填写的内容
    for (let i in this.user1) {
      this.user1[i] = ''
    }
  },
  mounted () {
    this.clickYZM()
    window._frequencyStep = new Date().getTime()
    this.$store.state.h5Home.headerType = 3
    this.$store.state.h5Home.headTitle = '注册'
    this.$store.state.h5Home.headLeft = 'icon-back'
    this.$store.state.h5Home.headback = false
  },
  computed: {
    ...mapState({
      regStep: state => state.user.regStep, // 注册是否分步
      memberSetList: state => state.user.memberSetList,
      regInfo: state => state.user.regInfo, // 后台传送的验证消息 是否显示  是否验证 是否必填
      step01: state => state.user.step01, // [true, false]  [true, true] 获取是分步注册还是单步注册样式
      errMsg: state => state.user.errMsg, // 验证用户输入失去焦点后的错误提示语
      user1: state => state.user.user1 // 用户注册信息 input输入框里的内容
    }),
    step01: { // [true, false]  [true, true] 获取是分步注册还是单步注册样式
      get: function () {
        return this.$store.state.user.step01
      },
      set: function (v) {
        this.$store.state.user.step01 = v
      }
    },
    openAgreement: { // true false  打开用户协议
      get: function () {
        return this.$store.state.h5Home.openAgreement
      },
      set: function (v) {
        this.$store.state.h5Home.openAgreement = v
      }
    },
    getLoginStatus () { // 获取用户登录状态
      return window.store.state.user.isLogin
    }
  }
}
</script>

