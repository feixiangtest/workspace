<template>
  <div id="reg-page">
    <div class="header yo-home-nav2">
      <div class="center">
        <div class="hea-menu hea-left">
          <a href="javascript:;" class="deepred" @click="GoHome()">首页</a>
        </div>
        <div class="header-text titile">
          <img v-if="mobHeadLogo[0] && mobHeadLogo[0].cpicSim" :src="staticDomain + mobHeadLogo[0].cpicSim">
        </div>
        <div class="hea-user hea-right">
          <a href="javascript:;" class="deepred" @click="GoLogin()">登录</a>
        </div>
      </div>
    </div>
    <div class="wrapper">
      <div>
        <div class="progressbar">
          <ul>
            <li class="one buz" :class="{ org : step.step1 || step.step2 || step.step3, hui: !step.step1}">
              <span>1</span>
              <p>设置登录账号</p>
            </li>
            <li class="hui tiao t1" :class="{ org : step.step2 || step.step3 }"></li>
            <li class="tow buz" :class="{ org : step.step2 || step.step3, hui: !step.step2}"><span>2</span>
              <p>填写个人资料</p></li>
            <li class="hui tiao t2" :class="{ org : step.step3}"></li>
            <li class="three buz" :class="{ org : step.step3 , hui: !step.step3}"><span>3</span>
              <p>注册成功</p>
            </li>
          </ul>
        </div>
        <div class="yo-register">
          <!-- 第一步 -->
          <div class="reg-main" v-if="step.step1">
            <div class="yo-reg-list">
              <div class="inpu-box">
                <p><span class="red">*</span> 账号</p>
                <input type="text" placeholder="字母开头的6-12位字母或数字组合"
                      v-model="user1.account"
                      maxlength="12"
                      @input="assertAccount()"
                      @blur="checkAccount()"
                >
                <!--err 提示-->
                <AddErr :regDate="errMsg" message="account"/>
              </div>
              <!--  -->
              <div class="inpu-box">
                <p><span class="red">*</span> 密码</p>
                <input :type="!passwordText?'password':'text'"
                      @blur="checkPw(1)"
                      v-model="user1.password"
                      maxlength="12"
                      @input="pwdOnKeyUp(0)"
                      placeholder="6-12位英文字母与数字的组合">
                <div v-show="passwordText" @click="showpassword('passwordText')" class="passwordTextClick">
                  <!-- <img class="passwordText imgEvents" :src="commonImgUrl + '/common/in-seeing.png'" align="right"> -->
                  <i class="yo-icon imgEvents icon-see passwordText"></i>
                </div>
                <div v-show="!passwordText" @click="showpassword('passwordText')" class="passwordTextClick">
                  <!-- <img class="passwordText imgEvents" :src="commonImgUrl + '/common/in-see.png'" align="right"> -->
                   <i class="yo-icon imgEvents icon-seeing passwordText"></i>
                </div>
                <!--err 提示-->
                <AddErr :regDate="errMsg" message="password"/>
              </div>
              <!-- ---- -->
              <div class="inpu-box">
                <p><span class="red">*</span> 确认密码</p>
                <input :type="!passwordText2?'password':'text'"
                      @blur="checkPw(2)"
                      v-model="user1.password1"
                      maxlength="12"
                      @input="pwdOnKeyUp(1)"
                      placeholder="与填写密码一致">
                <div v-show="passwordText2" @click="showpassword('passwordText2')" class="passwordTextClick">
                  <!-- <img class="passwordText imgEvents" :src="commonImgUrl + '/common/in-seeing.png'" align="right"> -->
                  <i class="yo-icon imgEvents icon-see passwordText"></i>
                </div>
                <div v-show="!passwordText2" @click="showpassword('passwordText2')" class="passwordTextClick">
                  <i class="yo-icon imgEvents icon-seeing passwordText"></i>
                </div>
                <!--err 提示-->
                <AddErr :regDate="errMsg" message="password1"/>
              </div>
              <!-- ---- -->
              <h6 class="gxxy">
                <label class="item item-checkbox">
                  <div class="checkbox checkbox-input-hidden">
                    <input type="checkbox" v-model="user1.pact">
                    <i class="checkbox-icon"></i>
                  </div>
                  <div class="item-content disable-pointer-events"></div>
                </label>
                <span>我已届满合法博彩年龄，且同意各项<a class="ckxy" href="javascript:;" title="" @click="modalShow()">开户条约</a>。</span>
              </h6>
            </div>
            <div class="yo-pad10 yo-pad-bot20">
              <button class="yo-anOne button" type="button" @click="goNext(1)">下一步</button>
            </div>
          </div>
          <!-- 第二步 -->
          <div class="reg-main" v-if="step.step2 && !againSendMail">
            <div class="yo-reg-list">
              <div class="inpu-box" v-if="regInfo.realName && regInfo.realName.ifShow">
                <p><span class="red" v-if="regInfo.realName.ifRequired == 1">*</span> 真实姓名</p>
                <input type="text" name="" placeholder="与您的银行账户名称相同" maxlength="20"
                      v-model="user1.realName"
                      @blur="checkRealName()"
                >
                <!--err 提示-->
                <AddErr :regDate="errMsg" message="realName"/>
              </div>

              <!-- ---- -->
              <div class="inpu-box">
                <p><span class="red">*</span> 取款密码</p>
                <input type="tel" name="" placeholder="请输入4位纯数字取款密码" maxlength="4"
                      v-model="user1.drawMoneyPwd"
                      @blur="drawMoney()"
                      @input="assertdrawMoneyPwd()">
                <!--err 提示 blurb 不校验  -->
                <AddErr :regDate="errMsg" message="drawMoneyPwd1"/>
              </div>

              <!-- ---- -->
              <div class="inpu-box" v-if="regInfo.phone && regInfo.phone.ifShow">
                <p><span class="red" v-if="regInfo.phone.ifRequired == 1">*</span> 手机号码</p>
                <input type="text" name="" placeholder="请输入您的手机号码" maxlength="11"
                      v-model="user1.phone"
                      @blur="checkPhone()"
                >
                <!--err 提示 -->
                <AddErr :regDate="errMsg" message="phone"/>
              </div>
              <!-- ---- -->
              <div class="inpu-box" v-if="regInfo.email && regInfo.email.ifShow">
                <p><span class="red" v-if="regInfo.email.ifRequired == 1">*</span> 邮箱</p>
                <input type="text" name="" placeholder="填写常用信箱，请正确填写"
                      v-model="user1.email"
                      @blur="checkEmail()"
                >
                <!--err 提示 -->
                <AddErr :regDate="errMsg" message="email"/>
              </div>
              <!-- ---- -->
              <div class="yo-pad10" style="font-size:12px;text-align:center;"
                  v-if="regInfo.email && regInfo.email.ifShow && regInfo.confirmEmail.ifShow && regInfo.confirmEmail.ifRequired && regInfo.confirmEmail.ifValidate ">
                没收到确定邮件？[<a href="javascript:void(0);" class="red" @click="sendMailShow()">重发确认邮件</a>]
              </div>
              <div class="inpu-box" v-if="regInfo.parentName && regInfo.parentName.ifShow">
                <p><span class="red" v-if="regInfo.parentName.ifRequired == 1">*</span>
                  介绍人</p>
                <input type="text" name="" :placeholder="regInfo.parentName.ifRequired?'必须填写': '可填可不填'"
                      v-model="user1.parentName" :disabled="Intr"
                      @blur="checkParentName()"
                >
                <!--err 提示-->
                <AddErr :regDate="errMsg" message="parentName"/>
              </div>

              <div class="inpu-box" v-if="regInfo.qq && regInfo.qq.ifShow">
                <p><span class="red" v-if="regInfo.qq.ifRequired">*</span> QQ</p>
                <input type="text" name="" placeholder="输入您常用QQ"
                      v-model="user1.qq" maxlength="12"
                      @blur="checkQq()" @input="assertQq()"
                >
                <!--err 提示-->
                <AddErr :regDate="errMsg" message="qq"/>
              </div>
              <!--  -->
              <div class="inpu-box" v-if="regInfo.nickname && regInfo.nickname.ifShow">
                <p><span class="red" v-if="regInfo.nickname.ifRequired == 1">*</span> 昵称</p>
                <input type="text" name="" placeholder="请输入昵称！"
                      v-model="user1.nickname" maxlength="20"
                      @blur="checkNickname()"
                      @keyup="filterNotCNname()"
                >
                <!--err 提示-->
                <AddErr :regDate="errMsg" message="nickname"/>
              </div>
              <!--   -->
              <div class="inpu-box" v-if="regInfo.englishname && regInfo.englishname.ifShow">
                <p><span class="red" v-if="regInfo.englishname.ifRequired">*</span> 英文姓名</p>
                <input type="text" name="" placeholder="请输入英文姓名！"
                      v-model="user1.englishname" maxlength="20"
                      @blur="checkEnglishName()"
                      @keyup="filterNotEngCNname()"
                >
                <!--err 提示-->
                <AddErr :regDate="errMsg" message="englishname"/>
              </div>

              <!--   -->
              <div class="inpu-box" v-if="regInfo.country && regInfo.country.ifShow">
                <p><span class="red" v-if="regInfo.country.ifRequired">*</span> 国家</p>
                <input type="text" name="" placeholder="请输入国家！"
                      v-model="user1.country"
                      @blur="checkCountry()"
                      @keyup="filterNotContryCNname()"
                >
                <!--err 提示-->
                <AddErr :regDate="errMsg" message="country"/>
              </div>

              <!--   -->
              <div class="inpu-box" v-if="regInfo.idPassportNoType && regInfo.idPassportNoType.ifShow">
                <p><span class="red" v-if="regInfo.idPassportNoType.ifRequired">*</span> 证件类型</p>
                <select class="yo-select" v-model="user1.idPassportNoType">
                  <option value="0">身份证</option>
                  <option value="1">护照</option>
                </select>
              </div>
              <div class="inpu-box" v-if="regInfo.idPassportNoType && regInfo.idPassportNoType.ifShow">
                <p>证件号码</p>
                <input type="text" name="" placeholder="请输入身份证或护照号！" maxlength="18"
                      v-model="user1.idPassportNo"
                      @input="checkNoType()"
                      @blur="checkIdPassportNo()"
                >
                <!-- err 提示-->
                <AddErr :regDate="errMsg" message="idPassportNo"/>
              </div>
              <!-- -->
              <div class="inpu-box" v-if="regInfo.birthday && regInfo.birthday.ifShow">
                <p><span class="red" v-if="regInfo.birthday.ifRequired">*</span> 生日</p>
                <input type="text" name="" placeholder="请输入生日！"
                      ref="birthday"
                      v-model="user1.birthday"
                      @change="checkBirthday"
                >
                <!-- 生日的遮罩层，不能让生日输入框点击，否则出现软键盘 -->
                <span class="birthday-mask" @click="openPicker()"></span>
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
                <AddErr :regDate="errMsg" message="birthday"/>
              </div>
              <!--  -->
              <div class="inpu-box" v-if="regInfo.zhuceYm">
                <p><span class="red">*</span> 验证码</p>
                <input type="text" name="" placeholder="请点击"
                      v-model="user1.zhuceYm"
                      ref="validCodeInput"
                      @click="clickYZM()"
                      @blur="checkZhuceYm()"
                      maxlength="6"
                >
                <img class="code imgEvents" :src=" '/api/wap/wapLogin/validCode?t=' + validCodeSrc" align="right" ref="validCodeSrc"
                    @click="changeVCode1()"
                >
                <!-- err 提示 -->
                <AddErr :regDate="errMsg" message="zhuceYm"/>
              </div>
              <!--  -->
            </div>
            <div class="yo-pad10 yo-pad-bot20" style="height:180px;">
              <button class="yo-anOne button" type="button" @click="goNext(2)">下一步</button>
            </div>
          </div>
          <!-- 第三步 -->
          <div class="reg-main" v-if="step.step3">
            <div class="reg-suctips">
              <img class="img-succeed" :src="commonImgUrl + '/common/check-ok.png'">
              <h1>恭喜您！注册成功！</h1>
              <p>您还可以<a class="blue" href="javascript:;" @click="goBind()">绑定银行卡</a>，以方便您随时取款！</p>
            </div>
            <div class="yo-anniu-one yo-pad10">
              <a class="button firstc" href="javascript:;" @click="GoHome()">开始游戏</a>
              <a class="button lastc" href="javascript:;" @click="GoPay()">立即存款</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="floatPages hide" :class="modalOptions" v-if="step.step1">
      <div class=" header yo-home-nav floatheader">
        <div class="center">
          <div class="header-text titile">
            <h1>开户协议</h1>
          </div>
        </div>
      </div>
      <div class="centerBox mainCenter shadeIn floatPagesCent">
        <div class="yo-pad10">
          <div class="lottery-wf f14">
            <p>立即开通本公司账户，享受最优惠的各项红利!</p>
            <ul style="padding-left: 25px;padding-top:10px;">
              <li style="list-style-type: disc; cursor: default;">本公司只接受合法博彩年龄的客户申请。同时我们保留要求客户提供其年龄证明的权利。</li>
              <li style="list-style-type: disc; cursor: default;">在本公司进行注册时所提供的全部信息必须在各个方面都是准确和完整的。在使用借记卡或信用卡时，持卡人的姓名必须与在网站上注册时的一致。</li>
              <li style="list-style-type: disc; cursor: default;">在开户后进行一次有效存款，恭喜您成为本公司有效会员!</li>
              <li style="list-style-type: disc; cursor: default;">存款免手续费，开户最低入款金额100人民币，最高单次入款金额50000人民币。</li>
              <li style="list-style-type: disc; cursor: default;">成为本公司有效会员后，客户有责任以电邮、联系在线客服、在本公司网站上留言等方式，随时向本公司提供最新的个人资料。</li>
              <li style="list-style-type: disc; cursor: default;">经本公司发现会员有重复申请账号行为时，有权将这些账户视为一个联合账户。我们保留取消、收回会员所有优惠红利，以及优惠红利所产生的盈利之权利。每位玩家、每一住址、每一电子邮箱、每一电话号码、相同支付卡/信用卡号码，以及共享计算机环境 (例如:网吧、其他公共用计算机等)只能够拥有一个会员账号，各项优惠只适用于每位客户在本公司唯一的账户。</li>
              <li style="list-style-type: disc; cursor: default;">本公司是提供互联网投注服务的机构。请会员在注册前参考当地政府的法律，在博彩不被允许的地区，如有会员在本公司注册、下注，为会员个人行为，本公司不负责、承担任何相关责任。</li>
              <li style="list-style-type: disc; cursor: default;">无论是个人或是团体，如有任何威胁、滥用本公司优惠的行为，本公司保留权利取消、收回由优惠产生的红利，并保留权利追讨最高50%手续费。</li>
              <li style="list-style-type: disc; cursor: default;">所有本公司的优惠是特别为玩家而设，在玩家注册信息有争议时，为确保双方利益、杜绝身份盗用行为，本公司保留权利要求客户向我们提供充足有效的文件， 并以各种方式辨别客户是否符合资格享有我们的任何优惠。</li>
              <li style="list-style-type: disc; cursor: default;">客户一经注册开户，将被视为接受所有颁布在本公司网站上的规则与条例。 </li>
            </ul>
            <p style="color:#FF0000;">本公司是使用东方集团所提供的在线娱乐软件，若发现您在同系统的娱乐城上开设多个会员账户，并进行套利下注；本公司有权取消您的会员账号并将所有下注盈利取消！ </p>
          </div>
          <div class="yo-pad10"><button type="button" class="yo-anOne button" @click="modalHide">确定</button></div>
          <div style="height: 4rem"> </div>
        </div>
      </div>
    </div>

    <div class="floatPages hide sendEmail" :class="modalOptions" v-if="step.step2 && againSendMail">
      <div class=" header yo-home-nav floatheader">
        <div class="center">
          <div class="hea-menu hea-left">
            <a href="javascript:;" @click="sendMailHide">
              <i class="yo-icon icon-arrows-left"></i>
            </a>
          </div>
          <div class="header-text titile">
            <h1>重发确认邮件</h1>
          </div>
        </div>
      </div>
      <div class="centerBox mainCenter shadeIn floatPagesCent">
        <div class="depositMain onlineDraw">
          <dl class="rechargebox">
            <dd>
              <div class="item-input">
                <span class="itemTxt">账号</span>
                <div class="specialbox">
                  <input class="typeinput input-one" type="text" placeholder="请输入账号" v-model="sendEmail.account">
                </div>
              </div>
            </dd>
            <dd>
              <div class="item-input">
                <span class="itemTxt">密码</span>
                <div class="specialbox">
                  <input class="typeinput input-one" type="password" placeholder="请输入密码" v-model="sendEmail.password">
                </div>
              </div>
            </dd>
            <dd>
              <div class="item-input">
                <span class="itemTxt">邮箱</span>
                <div class="specialbox">
                  <input class="typeinput input-one" type="text" placeholder="请输入邮箱" v-model="sendEmail.email">
                </div>
              </div>
            </dd>
          </dl>
        </div>
        <div class="yo-pad10  emailDiv">
          <a class="yo-anOne button" href="javascript:;" @click="confirmEmail">确认</a>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import method from '@/base/utils/method'
  import Modal from '@/base/utils/modal'
  import { sms } from '@/base/config/errSms'
  import Toast from 'mint-ui/lib/toast' // 按需加载mint-ui的模块
  import moment from 'moment'
  import * as payMents from '@/base/config/payMent'
  import * as cookieUtil from '@/base/utils/cookieUtil'

  export default {
    data () {
      return {
        payment: payMents,
        validCodeSrc: '',
        modalOptions: '',
        Intr: cookieUtil.getCookie('IntrForParam'),
        step: {
          step1: true,
          step2: false,
          step3: false
        },
        errMsg: {
          account: {},
          errName: 'reg'
        },
        user1: { // 用户 数据
          pact: true,
          idPassportNoType: '0',
          birthday: '' // 默认数据
        },
        againSendMail: false,
        sendEmail: {
          account: '',
          password: '',
          email: ''
        },
        regInfo: {
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
          }
        },
        birthday: '',
        passwordText: false,
        passwordText2: false,
        pickerValue: '',
        headerData: {},
        st: new Date().getTime()
      }
    },
    components: {},
    computed: {
      onTopLogoSim () {
        // 顶部log
        return this.$store.state.preView.topLogo.mobHeadLogoCpicSim
      },
      staticDomain () {
        return this.$store.state.home.staticDomain
      },
      mobHeadLogo () {
        // 顶部log
        return this.$store.state.home.mobHeadLogo
      },
      showBirthday: function () {
        var _data = '123' // todo 绑定英航卡还没有
        return _data
      },
      getIntr: function () {
        return this.Intr
      },
      commonImgUrl () {
        return this.$store.state.home.commonImgUrl
      }
    },
    mounted () {
      window.indexMain.mountedRemoveDoms() // 删除多余dom（防止自动刷新时，多余的dom不被删除）
      let {Negate, verify} = method
      this.checkCommon = verify().checkCommon
      let $this = this
      var postActioin = {}
      if (this.$store.state.home.userInfo && this.$store.state.home.userInfo.account) {
        window.router.push('/wap/index')
      }
      this.Negate = Negate
      // 模拟请求 获取玩法
      if (this.Intr) {
        this.$set(this.user1, 'parentName', this.Intr)
      } else {
        this.Intr = null
      }
      localStorage.register ? (postActioin.loading = 'pass') : localStorage.register = '1'
      // 设置 再次加载不使用loading 效果 产品要求
      this.$store.dispatch('register', postActioin).then(res => {
        if (res.status === '1') {
          if (!res.data.regStatus) {
            window.layer.msgWarn('注册功能暂不开放！', function () {
              window.router.push('/wap/home')
            })
          } else {
            $this.headerData = res.data.made
            $this.regInfo = window._assignIn($this.regInfo, res.data)
            $this.regInfo = window._assignIn($this.regInfo, $this.regInfo.memberSetList)
            delete $this.regInfo.memberSetList
            if ($this.regInfo.idPassportNoType && $this.regInfo.idPassportNoType.ifShow) {
              $this.regInfo.idPassportNo = $this.regInfo.idPassportNoType
            }
            if (!this.Intr && res.data.parentName && res.data.memberSetList.parentName.ifShow) {
              this.$set(this.user1, 'parentName', res.data.parentName)
              this.Intr = true
            }
          }
        }
      })
      this.watch()
      this.modal = new Modal()
      this.modal.init(this)
    },
    methods: {
      sendMailShow () {
        this.againSendMail = true
        this.modalShow()
      },
      sendMailHide () {
        this.againSendMail = false
        this.modalHide()
      },
      modalShow () {
        window.$('input, textarea').blur()
        this.modal.show(this)
      },
      modalHide () {
        window.$('input, textarea').blur()
        this.modal.hide(this)
      },
      watch () {
        this.$watch('user1.birthday', newVal => {
          if (newVal) {
            this.$refs.birthday.placeholder = ''
          }
        })
        this.$watch('step.step2', newVal => {
          setTimeout(() => {
            var validCodeInput = window.$(this.$refs.validCodeInput)
            var validCodeSrc = window.$(this.$refs.validCodeSrc)
            validCodeSrc.css('top', validCodeInput.position().top + 1)
          }, 0)
        })
      },
      changeVCode1 () {
        let timestamp = new Date().getTime()
        this.validCodeSrc = '?t=' + timestamp
      },
      ajaxVerify (options, $this) {
        let {verify} = method
        let verifyfn = verify()
        return verifyfn.ajaxVerify(options, $this)
      },
      confirmEmail () {
        let $this = this
        window.layer.confirm('是否确定重发确认邮件?', () => {
          this.$store.dispatch('ConfirmEmail', this.sendEmail).then(res => {
            console.info(res, 'send')
            if (res && res.status === '1') {
              window.layer.msgWarn(res.msg, function () {
                $this.againSendMail = false
                $this.GoHome()
              })
            } else {
              // 失败操作
            }
          })
        })
      },
      goBind () {
        window.router.push('/wap/memberCenter/bindBankcard')
      },
      getValue () {
        let $this = this
        var _data = ''
        if ($this.birthday) {
          _data = moment($this.birthday).format('YYYY/MM/DD')
          $this.user1.birthday = _data
        }
        // add 验证
        $this.checkBirthday()
      },
      checkNoType () {
        // 检查护照号码
        this.user1.idPassportNo = this.user1.idPassportNo.replace(/[^a-zA-Z0-9]/ig, '')
      },
      checkBirthday () {
        let [_errArr, _key, _state] = [['请输入生日！', '生日格式输入错误！'], 'birthday', () => {
          if (moment(this.user1.birthday)._isValid && this.user1.birthday.length === 10) {
          } else {
            this.errMsg[_key] = {
              status: true,
              txt: _errArr[1]
            }
            return false
          }
          return true
        }]
        return this.checkCommon({_errArr, _key, _state}, this, 'user1')
      },
      openPicker () {
        window.$('input, textarea').blur()// 控制软键盘消失
        if (!window.$(this.$refs.picker.$el).parent().is(window.$('body'))) {
          window.$('body').append(this.$refs.picker.$el)
          window.mountedRemoveDoms.push(window.$(this.$refs.picker.$el))
        }
        this.$refs.picker.open()
      },
      GoHome () {
        this.$router.push('/wap/index')
      },
      GoLogin () {
        this.$router.push('/wap/login')
      },
      GoPay () {
        window.moduleRouter.push('/' + window.moduleRouter._payKey + '/payment')
      },
      checkAccount ($this) {
        let {verify} = method
        let verifyfn = verify()
        return verifyfn.checkAccount(this, 'user1')
      },
      assertAccount ($this) {
        try {
          this.user1.account = this.user1.account.replace(/[^0-9a-z]/ig, '')
        } catch (e) { }
        try {
          this.user1.account = this.user1.account.toLowerCase()
        } catch (e) { }
      },
      assertdrawMoneyPwd ($this) {
        this.user1.drawMoneyPwd = this.user1.drawMoneyPwd.replace(/[^0-9]/ig, '')
      },
      assertQq ($this) {
        this.user1.qq = this.user1.qq.replace(/[^0-9]/ig, '')
      },
      checkPw (way) {
        let {verify} = method
        if (way === 1) {
          return verify().checkPw1(this, 'user1')
        }
        if (way === 2) {
          return verify().checkPw2(this, 'user1')
        }
      },
      showpassword (showpassword, value) {
        let $this = this
        // $this[showpassword] = !$this[showpassword]
        this.$set($this, showpassword, !$this[showpassword])
        console.info($this[showpassword], showpassword)
      },
      checkRealName () {
        try {
          this.user1.realName = this.user1.realName.replace(/ +/g, '')
        } catch (e) { }
        let [_errArr, _key, _state] = [['请输入真实姓名！', '真实姓名只能1-20位！'], 'realName', () => {
          if (this.user1[_key] === '真实姓名') {
            this.$set(this.errMsg, 'realName', {
              status: true,
              txt: _errArr[0]
            })
            return false
          }
          //  this.user1.realName.replace(/[\u4e00-\u9fa5]/g,'').length === 0 中文
          if (this.user1[_key].length < 1 || this.user1[_key].length > 20) {
            this.$set(this.errMsg, 'realName', {
              status: true,
              txt: _errArr[1]
            })
            return false
          }
          var checkName = false
          let $this = this
          if (this.regInfo.realName.ifValidate === 1) {
            window.$.ajax({
              'type': 'post',
              'url': '/api/wap/wapLogin/checkRealName' + '?t=' + new Date().getTime(),
              'dataType': 'json',
              'cache': false,
              'async': false,
              'contentType': 'application/json',
              'data': JSON.stringify({
                realName: this.user1.realName
              }),
              'success': function (_res) {
                if (_res.status === '1') {
                  checkName = true
                } else {
                  $this.$set($this.errMsg, 'realName', {
                    txt: '您注册的真实姓名已被使用，请联系客服'
                  })
                }
              }
            })
            return checkName
          }
          return true
        }]
        return this.checkCommon({_errArr, _key, _state}, this, 'user1')
      },
      checkQq () {
        let [_errArr, _key, _state] = [['请输入QQ!!', 'QQ输入格式不正确！'], 'qq', () => {
          if (!/^[1-9][0-9]{4,}$/.test(this.user1[_key])) {
            this.errMsg[_key] = {
              status: true,
              txt: _errArr[1]
            }
            return false
          }
          return true
        }]
        return this.checkCommon({_errArr, _key, _state}, this, 'user1')
      },
      checkNickname () {
        let [_errArr, _key, _state] = [[
          '请输入昵称！',
          '昵称格式输入错误！'
        ], 'nickname', () => {
          if (this.user1[_key] === '昵称') {
            this.errMsg[_key] = {
              status: true,
              txt: _errArr[0]
            }
            return false
          }
          if (!/^[\sa-zA-Z0-9\u4e00-\u9fa5]+$/.test(this.user1[_key])) {
            this.errMsg.nickname = {
              status: true,
              txt: _errArr[1]
            }
            console.info(this.errMsg)
            return false
          }
          return true
        }]
        return this.checkCommon({_errArr, _key, _state}, this, 'user1')
      },
      drawMoney () {
        this.$set(this.errMsg, 'drawMoneyPwd1', {
          status: false,
          txt: ''
        })
        if (!this.user1.drawMoneyPwd) {
          this.$set(this.errMsg, 'drawMoneyPwd1', {
            status: true,
            txt: '请填写取款密码！'
          })
          return false
        }
        if (this.user1.drawMoneyPwd.length !== 4) {
          this.$set(this.errMsg, 'drawMoneyPwd1', {
            status: true,
            txt: '请输入4位取款密码！'
          })
          return false
        }
        return true
      },
      checkEnglishName () {
        let [_errArr, _key, _state] = [['请输入英文姓名！', '英文姓名格式输入错误！'], 'englishname', () => {
          if (!/^[0-9A-Za-z\s]+$/.test(this.user1[_key])) {
            this.errMsg[_key] = {
              status: true,
              txt: _errArr[1]
            }
            return false
          }
          return true
        }]
        return this.checkCommon({_errArr, _key, _state}, this, 'user1')
      },
      checkPhone () {
        let [_errArr, _key, _state] = [['请输入手机号！', '手机号格式输入错误！'], 'phone', () => {
          if (!/1[0-9]{10}/.test(this.user1[_key])) {
            this.errMsg[_key] = {
              status: true,
              txt: _errArr[1]
            }
            return false
          }
          let $this = this
          var checkRes = false
          if (this.regInfo[_key].ifValidate === 1) {
            console.info('校验 checkPhone')
            window.$.ajax({
              'type': 'post',
              'url': '/api/wap/wapLogin/checkPhone' + '?t=' + new Date().getTime(),
              'dataType': 'json',
              'cache': false,
              'async': false,
              'contentType': 'application/json',
              'data': JSON.stringify({
                phone: this.user1[_key]
              }),
              'success': function (_res) {
                if (_res.status === '1') {
                  checkRes = true
                } else {
                  if (_res.msg === '手机号已经被注册') {
                    $this.$set($this.errMsg, _key, {
                      txt: _res.msg
                    })
                  } else {
                    $this.$set($this.errMsg, _key, {
                      txt: '请输入正确的手机格式'
                    })
                  }
                }
              }
            })
            return checkRes
          }
          return true
        }]
        return this.checkCommon({_errArr, _key, _state}, this, 'user1')
      },
      checkEmail () {
        let [_errArr, _key, _state] = [['请输入邮箱地址！', '您输入的邮箱格式不正确！'], 'email', () => {
          let $this = this
          if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.user1[_key])) {
            this.errMsg[_key] = {
              status: true,
              txt: _errArr[1]
            }
            return false
          }
          if (this.regInfo[_key].ifValidate === 1) {
            console.info('校验的email')
            return $this.ajaxVerify({
              url: '/api/wap/wapLogin/checkEmail',
              actions: {
                email: $this.user1[_key]
              },
              failed: function ($$this) {
                $$this.$set($$this.errMsg, _key, {
                  txt: '该邮箱已被使用'
                })
              }
            }, this)
          }
          return true
        }]
        return this.checkCommon({_errArr, _key, _state}, this, 'user1')
      },
      checkCountry () {
        let [_errArr, _key, _state] = [['请输入国家！', '国家格式输入错误！'], 'country', () => {
          if (this.user1[_key] === '国家') {
            this.errMsg[_key] = {
              status: true,
              txt: _errArr[0]
            }
            return false
          }
          if (!/^[\u4e00-\u9fa5]+$/.test(this.user1[_key])) {
            this.errMsg[_key] = {
              status: true,
              txt: _errArr[1]
            }
            return false
          }
          return true
        }]
        return this.checkCommon({_errArr, _key, _state}, this, 'user1')
      },
      checkIdPassportNo ($this) {
        let [_errArr, _key, _state] = [['请输入身份证或护照号！', '身份证输入格式不正确！', '护照输入格式不正确！'], 'idPassportNo', () => {
          if (this.user1.idPassportNoType * 1 === 0) {
            // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
            var reg = /(^\d{14,17}[Xx0-9]$)/
            if (!reg.test(this.user1[_key])) {
              this.errMsg[_key] = {
                status: true,
                txt: _errArr[1]
              }
              return false
            }
          }
          if (this.user1.idPassportNoType === '1') {
            // 护照 value = 1
            var re1 = /^[a-zA-Z]{5,17}$/
            var re2 = /^[a-zA-Z0-9]{5,17}$/

            if (re1.test(this.user1[_key]) || re2.test(this.user1[_key])) {
            } else {
              this.errMsg[_key] = {
                status: true,
                txt: _errArr[2]
              }
              return false
            }
          }
          // ajax 验证
          if (this.regInfo[_key].ifRequired === 1) {
            let checkStatus = 'true'
            let $this = this
            window.$.ajax({
              'type': 'post',
              'url': '/api/wap/wapLogin/checkIdCard' + '?t=' + new Date().getTime(),
              'dataType': 'json',
              'cache': false,
              'async': false,
              'contentType': 'application/json',
              'data': JSON.stringify({
                'idType': this.user1.idPassportNoType,
                'cardId': this.user1.idPassportNo,
                'idNumber': this.user1.idPassportNo
              }),
              'success': function (_res) {
                if (_res.status === '1') {
                } else {
                  checkStatus = false
                  $this.$set($this.errMsg, _key, {
                    txt: _res.msg
                  })
                }
              }
            })
            return checkStatus
          }

          return true
        }]
        return this.checkCommon({_errArr, _key, _state}, this, 'user1')
      },
      checkParentName () {
        // 使用推广码链接注册的用户
        try { this.user1.parentName = this.user1.parentName.trim() } catch (e) { }
        let [_errArr, _key, _state] = [['请您填写介绍人', '请输入正确的介绍人格式'], 'parentName', () => {
          if (this.Intr) { // 默认有值 跳过
            if (this.user1[_key].length < 6 || this.user1[_key].length > 15) {
              this.$set(this.errMsg, _key, {
                //  status: true,
                txt: _errArr[1]
              })
              return false
            }
          } else {
            if (this.user1[_key].length < 6 || this.user1[_key].length > 15) {
              this.$set(this.errMsg, _key, {
                status: true,
                txt: _errArr[1]
              })
              return false
            }
          }

          let $this = this
          var checkName = false
          if (this.regInfo[_key].ifValidate === 1) {
            window.$.ajax({
              'type': 'post',
              'url': '/api/wap/wapLogin/checkParentName' + '?t=' + new Date().getTime(),
              'dataType': 'json',
              'cache': false,
              'async': false,
              'contentType': 'application/json',
              'data': JSON.stringify({
                parentName: this.user1[_key]
              }),
              'success': function (_res) {
                console.info(_res)
                if (_res.status === '1') {
                  checkName = true
                } else {
                  $this.$set($this.errMsg, _key, {
                    status: true,
                    txt: _res.msg
                  })
                }
              }
            })
            return checkName
          }
          // 如果需要校验 verify ajax todo
          return true
        }]
        return this.checkCommon({_errArr, _key, _state}, this, 'user1')
      },
      goNext (step) {
        let $this = this
        let pass = false
        let errAlert = sms.register
        var checkStep = {  // 需要验证 判断
          1: { // 必然需要
            account: function ($this) { return $this.checkAccount() },
            password: function ($this) { return $this.checkPw(1, $this) },
            password1: function ($this) { return $this.checkPw(2, $this) }
          },
          2: {
            'realName': function ($this) { return $this.checkRealName() },
            'drawMoneyPwd1': function ($this) { return $this.drawMoney() },
            'phone': function ($this) { return $this.checkPhone() },
            'email': function ($this) { return $this.checkEmail() },
            'parentName': function ($this) { return $this.checkParentName() },
            'qq': function ($this) { return $this.checkQq() },
            'nickname': function ($this) { return $this.checkNickname() },
            'englishname': function ($this) { return $this.checkEnglishName() },
            'country': function ($this) { return $this.checkCountry() },
            'idPassportNo': function ($this) { return $this.checkIdPassportNo() },
            'birthday': function ($this) { return $this.checkBirthday() },
            'zhuceYm': function ($this) { return $this.checkZhuceYm() }
          }
        }
        $this.errMsg = {}
        if (step === 1 || step === 2) {
          window._each(checkStep[step], function (value, key) {
            console.info(key, '----', $this.regInfo[key])
            if ($this.regInfo[key] && $this.regInfo[key].ifShow && !value($this)) {
              var alertWord = errAlert[$this.errMsg[key].txt] ? errAlert[$this.errMsg[key].txt] : $this.errMsg[key].txt
              if (alertWord && alertWord === '请输入正确的账号格式') {
                $this.errMsg[key].txt = '请输入正确的账号格式'
              }
              switch (key) {
                case 'account':
                  $this.errMsg[key].status = true
                  break
                case 'drawMoneyPwd1':
                  $this.errMsg[key].status = true
                  break
              }
              // 账号存在问题
              Toast({
                message: alertWord,
                position: 'bottom',
                duration: 3000
              })
              pass = false
              return false
            }
            pass = true
          })
        }

        // $this.errMsg = {}
        let {msgWarn} = method
        if (pass) {
          if (!$this.user1.pact) {
            msgWarn('请勾选接受相关条款和隐私协议!')
            return false
          }
          if (step === 2) {
            console.info('step2')
            window.indexMain.pointerEvents(window.$('.reg-main')) // 防止穿透
            return $this.saveAccount(step)
          }
          $this.step['step' + step] = false
          $this.step['step' + (step + 1)] = true
          $this.$set($this, 'errMsg', {}) // 消除所有的错误
          // 如果介绍人存在 需要主动 调用 介绍人存不存在
          if (step === 1 && $this.Intr) {
            if ($this.user1.parentName.length >= 6 && $this.user1.parentName.length <= 15) {
              checkStep[2].parentName($this)
            }
          }
          window.indexMain.pointerEvents(window.$('.reg-main')) // 防止穿透
        } else {
          console.info('验证 failed', name)
        }
      },
      clickYZM () {
        if (!this.validCodeSrc) {
          this.changeVCode1()
        }
      },
      checkZhuceYm () {
        // 删除必须4位验证码的校验
        return true
      },
      saveAccount () {
        if (window._frequency && new Date().getTime() - window._frequency < 1000) {
          return false
        }
        window._frequency = new Date().getTime()
        let $this = this
        let _actions = {
          accountAllVo: {
            drawMoneyPwd1: this.user1.drawMoneyPwd[0],
            drawMoneyPwd2: this.user1.drawMoneyPwd[1],
            drawMoneyPwd3: this.user1.drawMoneyPwd[2],
            drawMoneyPwd4: this.user1.drawMoneyPwd[3],
            moneyType: '1',
            currencyId: '1'
          },
          zhuceYm: this.user1.zhuceYm
        }
        // let sentRastime = ''
        window._each(this.regInfo, function (value, key) {
          if (value.ifShow && key !== 'drawMoneyPwd1' && $this.user1[key]) {
            _actions.accountAllVo[key] = $this.user1[key]
          }
        })
        _actions.accountAllVo.qurenPassword = _actions.accountAllVo.password1
        if (_actions.accountAllVo.englishname) {
          _actions.accountAllVo.englishName = _actions.accountAllVo.englishname
          delete _actions.accountAllVo.englishname
        }
        /**
         *    "cardId":1233445, //身份证
         "idNumber":35235235 护照
         "idType" 0 1
         */
        if (_actions.accountAllVo.idPassportNo) { // 证明需要好
          _actions.accountAllVo.idType = $this.user1.idPassportNoType
          if (_actions.accountAllVo.idType * 1 === 1) {
            _actions.accountAllVo.idNumber = _actions.accountAllVo.idPassportNo
          } else {
            _actions.accountAllVo.cardId = _actions.accountAllVo.idPassportNo
          }
          delete _actions.accountAllVo.idPassportNo
        }
        delete _actions.accountAllVo.password1
        /** this.$store.dispatch('saveAccount', _actions, { 'content-type': 'application/json' }).then(res => {
          if (res && res.status === '1') {
            // todo 需要做区分 是否直接登录 或者是 需要激活
            if (res.msg === '注册成功') {
              $this.step['step2'] = false
              $this.step['step3'] = true
              let versionList = window.indexMain.versionFun('initData', 'homeVersionKey')
              $this.$store.dispatch('initData.action', versionList) // 重新获取首页信息
              $this.$store.state.home.gameNoticeFlag = true // 首页游戏公告显示
            } else {
              window.layer.msgWarn(res.msg, function () {
                if (res.msg === '您已完成注册，还需审核，请您耐心等待！') {
                  $this.$store.state.home.gameNoticeFlag = true // 首页游戏公告显示
                  window.router.push('/wap/index')
                }
              })
            }
            return
          }
          if (res && res.msg === '验证码输入错误！！') {
            Toast({
              message: res.msg,
              position: 'bottom',
              duration: 3000
            })
          } else window.layer.msgWarn(res.msg)
          $this.$set($this.user1, 'zhuceYm', '')
          $this.changeVCode1()
        }) **/
        let endTime = new Date().getTime()
        let rastime = window.j(endTime - $this.st)
        window.indexMain.showLoading()
        $this.headerData.ccc = 654321 // 无实际作用，只是做为日志打印与其他参数做对比 GPO-5356
        this.setMadeInParams(_actions, $this.headerData, rastime) // 将$this.headerData数据作为参数传给后台，主要用于与header头传过去的$this.headerData数据做对比（后台都有打印日志），无其他实际作用 GPO-5356
        console.info(_actions, '_actions')
        let passOptions = JSON.stringify(_actions)
        if (!passOptions.length) {
          window.layer.msgWarn('网络异常，请重新注册', function () {
            window.location.reload()
          })
          return ''
        }
        window.$.ajax({
          beforeSend: function (request) {
            request.setRequestHeader('Accept-UUID', window.m($this.headerData.t, $this.headerData.r))
            request.setRequestHeader('t', $this.headerData.t)
            request.setRequestHeader('r', $this.headerData.r)
            request.setRequestHeader('u', $this.headerData.u)
            request.setRequestHeader('rt', rastime)
            /** begin 无实际作用，只是做为日志打印与其他头部参数做对比 GPO-5356 */
            request.setRequestHeader('ccc', $this.headerData.ccc)
            request.setRequestHeader('gt', 123456)
            /** end 无实际作用，只是做为日志打印与其他头部参数做对比 GPO-5356 */
          },
          type: 'post',
          contentType: 'application/json',
          url: `/api/wap/wapLogin/saveAccount?t=${$this.headerData.t}&r=${$this.headerData.r}&u=${$this.headerData.u}&rt=${rastime}&Accept-UUID=${window.m($this.headerData.t, $this.headerData.r)}`,
          data: passOptions,
          dataType: 'json',
          success: function (res) {
            window.indexMain.hideLoading()
            if (res && res.status === '10') {
                  // 提交数据丢失 使用强刷模式 重新注册
              window.layer.msgWarn(res.msg, function () {
                window.location.reload()
              })
              return ''
            }
            if (res && res.status === '1') {
              // todo 需要做区分 是否直接登录 或者是 需要激活
              if (res.msg === '注册成功') {
                $this.step['step2'] = false
                $this.step['step3'] = true
                let versionList = window.indexMain.versionFun('initData', 'homeVersionKey')
                $this.$store.dispatch('initData.action', versionList) // 重新获取首页信息
                $this.$store.state.home.gameNoticeFlag = true // 首页游戏公告显示
              } else {
                window.layer.msgWarn(res.msg, function () {
                  if (res.msg === '您已完成注册，还需审核，请您耐心等待！') {
                    $this.$store.state.home.gameNoticeFlag = true // 首页游戏公告显示
                    window.router.push('/wap/index')
                  }
                })
              }
              return
            }
            if (res && res.msg === '验证码输入错误！！') {
              Toast({
                message: res.msg,
                position: 'bottom',
                duration: 3000
              })
            } else window.layer.msgWarn(res.msg)
            $this.$set($this.user1, 'zhuceYm', '')
            $this.changeVCode1()
          },
          error: function (err) {
            console.log(JSON.stringify(err))
            window.layer.msgWarn('请求异常，请稍后重试！')
            window.indexMain.hideLoading()
          }
        })
      },
      // 将$this.headerData数据加入到参数中
      setMadeInParams (_actions, headerData, rt) {
        if (typeof _actions !== 'object') {
          return
        }
        _actions['Accept-UUID'] = window.m(headerData.t, headerData.r)
        _actions['t'] = headerData.t
        _actions['r'] = headerData.r
        _actions['u'] = headerData.u
        _actions['ccc'] = headerData.ccc
        _actions['rt'] = rt
      },
      touchit () {
        console.info(this.user1)
      },
      /**
       * 昵称验证
       */
      filterNotCNname () {
        this.nickNameCheck = this.user1.nickname
        this.user1.nickname = this.nickNameCheck.replace(/[^\w \u4e00-\u9fa5]/ig, '').replace(/^ /ig, '')
      },
      /**
       * 英文呢称验证
       */
      filterNotEngCNname () {
        this.englishname = this.user1.englishname
        this.user1.englishname = this.englishname.replace(/[^0-9a-zA-Z ]/ig, '')
      },
      /**
       * 国家验证
       */
      filterNotContryCNname () {
        this.country = this.user1.country
        this.user1.country = this.country.replace(/[^\w \u4e00-\u9fa5]/ig, '').replace(/^ /ig, '')
      },
      /**
       * 清空密码输入错误的参数
       */
      pwdOnKeyUp (type) {
        if (type === 0) {
          this.user1.password = this.user1.password.replace(/[^0-9a-zA-Z]/ig, '')
        } else {
          this.user1.password1 = this.user1.password1.replace(/[^0-9a-zA-Z]/ig, '')
        }
      }
    }
  }
</script>
