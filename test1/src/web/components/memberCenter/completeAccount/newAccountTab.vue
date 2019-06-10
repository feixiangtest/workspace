<template>
  <dl class="secondForm2" >
          <!-- 第一步 -->
          <div v-if="bindPage.page1">
            <dd>
              <div class="formIput">
                <span class="itemTxt"><em class="red">*</em> 账号</span>
                <div class="specialbox">
                  <input class="typeinput input-one" type="text" placeholder="6-12位英文字母和数字的组合" maxlength="16"
                         v-model="creat.account"
                         @input="assertAccount()"
                         @blur="checkAccount()"
                  >
                </div>
                <AddErr :regDate="errMsg" message="account"></AddErr>
              </div>
            </dd>
            <dd>
              <div class="formIput">
                <span class="itemTxt"><em class="red">*</em> 密码</span>
                <div class="specialbox">
                  <input class="typeinput input-one" type="password" placeholder="6-12位英文字母或数字与字母组合"
                        @blur="checkPw(1)"
                        v-model="creat.password"
                  >
                </div>
                <AddErr :regDate="errMsg" message="password"></AddErr>
              </div>
            </dd>
            <dd>
              <div class="formIput">
                <span class="itemTxt"><em class="red">*</em> 确认密码</span>
                <div class="specialbox">
                  <input class="typeinput input-one" type="password" placeholder="同密码一致"
                        @blur="checkPw(2)"
                        v-model="creat.password1"
                  >
                </div>
                <AddErr :regDate="errMsg" message="password1"></AddErr>
              </div>
            </dd>
            <dd>
              <div class="formIput">
                <span class="itemTxt">&nbsp;&nbsp;货币</span>
                <!--<span class="paybankName lightGray"  @click="optclick(1)" >{{optValue}}</span>-->
                <span class="paybankName lightGray" >{{optValue}}</span>
                <span class="radio_span yo-arrri"><i class="yo-icon icon-arrows-right"></i></span>
              </div>
              <optCom :optDate="optMsg"  v-on:listenToChildEvent="showMsgOptcom"></optCom>
            </dd>
            <!--<dd>
              <div class="formIput">
                <span class="itemTxt"><em class="red">*</em> 验证码</span>
                <div class="specialbox">
                  <input class="typeinput input-one" type="text" placeholder="请点击" v-model="creat.code" maxlength="4"
                     @blur="checkCode()"
                     @click="clickYZM()"
                  >
                  <span class="Tspe"><img class="code imgEvents" :src=" '/api/wap/wapLogin/validCode?t=' + validCodeSrc" align="right"
                   @click="changeVCode()"
                  ></span>
                </div>
                <AddErr :regDate="errMsg" message="code"></AddErr>
              </div>
            </dd>-->
            <div class="yo-pad10 yo-pad-bot20">
              <button type="button" class="yo-anOne button " @click="submint(Tabs.tab1?'creat':'bind')">下一步</button>
            </div>
          </div>
          <!--1 end-->
          <!--第二步-->
          <div v-if="bindPage.page2">
            <dl>
              <div class="formIput" v-if="regInfo.realName && regInfo.realName.ifShow">
                <span class="itemTxt"><em class="red" v-if="regInfo.realName.ifRequired" >*</em> 真实姓名</span>
                <div class="specialbox">
                  <input type="text" name="" placeholder="请输入真实姓名！" class="typeinput input-one"
                        maxlength="16"
                        v-model="userInfo.realName"
                        @blur="checkRealName(1)"
                  >
                </div>
                <AddErr :regDate="errMsg" message="realName"/>
              </div>
            </dl>
            <!--昵称 -->
            <dl>
              <div class="formIput" v-if="regInfo.nickname && regInfo.nickname.ifShow">
                <span class="itemTxt"><em v-if="regInfo.nickname.ifRequired" class="red">*</em> 昵称</span>
                <div class="specialbox">
                  <input type="text" name="" placeholder="请输入昵称！" class="typeinput input-one"
                    maxlength="16"
                    v-model="userInfo.nickname"
                    @blur="checkNickname()"
                  >
                </div>
                <AddErr :regDate="errMsg" message="nickname"/>
              </div>
            </dl>
            <!--英文姓名-->
            <dl>
              <div class="formIput" v-if="regInfo.englishname && regInfo.englishname.ifShow">
                <span class="itemTxt"><em v-if="regInfo.englishname.ifRequired" class="red">*</em> 英文姓名</span>
                <div class="specialbox">
                  <input type="text" name="" placeholder="请输入英文姓名！" class="typeinput input-one" maxlength="20"
                    v-model="userInfo.englishname"
                    @blur="checkEnglishName()"
                  >
                </div>
                <AddErr :regDate="errMsg" message="englishname"/>
              </div>
            </dl>
            <!--生日-->
            <dl>
              <div class="formIput"  v-if="regInfo.birthday && regInfo.birthday.ifShow">
                <span class="itemTxt"><em v-if="regInfo.birthday.ifRequired" class="red">*</em> 生日</span>
                <div class="specialbox">
                  <input type="text" name="" placeholder="请输入生日！" class="typeinput input-one"
                     v-model="userInfo.birthday"
                     @blur="checkBirthday()"
                     @click="openPicker()"
                  >
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
              <AddErr :regDate="errMsg" message="birthday"/>
              </div>
            </dl>
            <!--国家-->
            <dl>
              <div class="formIput"  v-if="regInfo.country && regInfo.country.ifShow">
                <span class="itemTxt"><em v-if="regInfo.country.ifRequired" class="red">*</em> 国家</span>
                <div class="specialbox">
                  <input type="text" name="" placeholder="请输入国家！" class="typeinput input-one" maxlength="12"
                     v-model="userInfo.country"
                     @blur="checkCountry()"
                  >
                </div>
                <AddErr :regDate="errMsg" message="country"/>
              </div>
            </dl>
            <!--证件类型-->
            <dl>
              <div class="formIput"  v-if="regInfo.idPassportNoType && regInfo.idPassportNoType.ifShow">
                <span class="itemTxt"><em v-if="regInfo.idPassportNoType.ifRequired" class="red">*</em> 证件类型</span>
                <span class="paybankName lightGray"  @click="optclick(2)" >{{optValue1}}</span>
                <span class="radio_span yo-arrri"><i class="yo-icon icon-arrows-right"></i></span>
              </div>
              <optCom :optDate="optMsg1" attr-div="optCom"  v-on:listenToChildEvent="showMsgOptcom1"></optCom>
              <!--<em v-if="regInfo.idPassportNoType.ifRequired" class="red">*</em>-->
              <div class="formIput" v-if="regInfo.idPassportNoType && regInfo.idPassportNoType.ifShow">
                <span class="itemTxt"> 证件号码</span>
                <div class="specialbox">
                  <input type="text" name="" placeholder="请输入身份证或护照号！" class="typeinput input-one" maxlength="18"
                      onkeyup="value=value.replace(/[^a-zA-Z0-9]/ig,'')"
                      v-model="userInfo.idPassportNo"
                      @blur="checkIdPassportNo()"
                  >
                </div>
                <AddErr :regDate="errMsg" message="idPassportNo"/>
              </div>
            </dl>
            <!--电话 -->
             <dl>
              <div class="formIput" v-if="regInfo.phone && regInfo.phone.ifShow">
                <span class="itemTxt"><em class="red" v-if="regInfo.phone.ifRequired">*</em> 电话</span>
                <div class="specialbox">
                  <input type="number" name="" placeholder="请输入联系电话！" maxlength="11" class="typeinput input-one"
                    v-model="userInfo.phone"
                    @blur="checkPhone()"
                  >
                </div>
                <AddErr :regDate="errMsg" message="phone"/>
              </div>
            </dl>
            <!--QQ -->
             <dl>
              <div class="formIput" v-if="regInfo.qq && regInfo.qq.ifShow">
                <span class="itemTxt"><em class="red" v-if="regInfo.qq.ifRequired">*</em> QQ</span>
                <div class="specialbox">
                  <input type="text" name="" placeholder="请输入QQ!" maxlength="12" class="typeinput input-one" size="15"
                    onkeyup="value=value.replace(/[^0-9]/ig,'')"
                    v-model="userInfo.qq"
                    @blur="checkQq()"
                  >
                </div>
                <AddErr :regDate="errMsg" message="qq"/>
              </div>
            </dl>
            <!--邮箱-->
            <dl>
              <div class="formIput" v-if="regInfo.email && regInfo.email.ifShow">
                <span class="itemTxt"><em class="red" v-if="regInfo.email.ifRequired">*</em> 邮箱</span>
                <div class="specialbox">
                  <input type="text" name="" placeholder="请输入邮箱！" class="typeinput input-one" maxlength="16"
                    v-model="userInfo.email"
                    @blur="checkEmail()"
                  >
                </div>
                <AddErr :regDate="errMsg" message="email"/>
              </div>
            </dl>
            <!--取款密码-->
            <dl>
              <div class="formIput">
                <span class="itemTxt"><em class="red">*</em> 取款密码</span>
                <div class="specialbox">
                  <input type="tel" name="" placeholder="" maxlength="4" class="typeinput input-one"
                      v-model="userInfo.drawMoneyPwd"
                      @blur="drawMoney()">
                </div>
                <AddErr :regDate="errMsg" message="drawMoneyPwd"/>
              </div>
            </dl>
            <dl>
              <div class="formIput">
                <span class="itemTxt"><em class="red">*</em> 验证码</span>
                <div class="specialbox">
                  <input class="typeinput input-one" type="text" placeholder="请点击" v-model="creat.code" maxlength="4"
                     @blur="checkCode()"
                     @click="clickYZM()"
                  >
                  <span class="Tspe"><img class="code imgEvents" :src=" '/api/wap/wapLogin/validCode?t=' + validCodeSrc" align="right"
                   @click="changeVCode()"
                  ></span>
                </div>
                <AddErr :regDate="errMsg" message="code"></AddErr>
              </div>

            </dl>
            <div class="yo-pad10 yo-pad-bot20">
              <button type="button" class="yo-anOne button " id="bankSetBtn" @click="submint()">完成</button>
            </div>
          </div>
          <!--2 end-->
        </dl>
</template>
<script>
import moment from 'moment'
import bindmethod from '@/base/utils/bindmethod'
export default {
  data () {
    return {
      LoadingMsg: true, // 默认加载loading
      validCodeSrc: '', // 验证码
      Tabs: {},     // 切换
      bindPage: {    // 选项卡切换状态, 创建新账号页面的切换状态
        page1: true,
        page2: false,
        page3: false
      },
      creat: { // 创建新账号第一步的数据
        account: '',
        password: '',
        password1: '',
        code: ''
      },
      userInfo: {
        'currencyId': '1',   // 默认值币种
        'drawpwd': '',   // 取款密码
        'realName': '',
        'nickname': '',
        'englishname': '',
        'idPassportNoType': 0,
        'idPassportNo': '',
        'phone': '',
        'englishName': '',
        'birthday': '',
        'country': '',
        'qq': '',
        'email': '',
        'moneyDraw': '',  // 取款密码
        'drawMoneyPwd': '' // 取款密码
      },
      errMsg: {    // 输入框上的弹出ui传递的数据
        account: {},
        errName: 'complete'
      },
      regInfo: {}, // 绑定资料的字段数据
      birthday: '', // 生日数据,UI组件需要
      optMsg: {   // 下拉组件需要传递的值
        optsType: false,  // 点击组件改变状态值  展示或 关闭组件
        DataList: ['人民币']  // 需要展示的数据集
      },
      optMsg1: {  // 下拉组件需要传递的值   由于页面内有2个下拉组件所以写了2个数据
        optsType: false,
        DataList: ['身份证', '护照']
      },
      optValue: '', // 组件返回的选中值
      optValue1: '',
      switch: true  // 页面按钮开关,为了防止多次提交请求
    }
  },
  methods: {
    assertAccount () {
      this.creat.account = this.creat.account.replace(/[^0-9a-z]/ig, '')
      this.creat.account = this.creat.account.toLowerCase()
    },
    // 提交方法 包括绑定新旧微信号和完善资料view操作
    submint (type = 'creat') {
      var $this = this
      var {msgWarn} = bindmethod
      var creat = this.creat   // 账号密码验证码
      console.info('creat:', creat)
          // 绑定新账户点击提交事件区分
      if (this.bindPage.page1) {
            // 创建新账号
        if (this.creatCheck($this)) {
          console.log('第一页数据', creat)
          this.bindPage.page1 = false
          setTimeout(() => {
            this.bindPage.page2 = true
          }, 0)
        }
      } else if (this.bindPage.page2) {
        // 完善资料
        var userInfo = this.userInfo  // 用户资料信息
        var submint = document.getElementById('bankSetBtn')
        submint.innerHTML = '确认中...'
        let checkSTA = this.referData()
        if (checkSTA && this.switch) {
          this.switch = false
          this.httpRequest({
            url: '/api/wap/wapWeiXinLogin/perfectAccountInfo',
            actions: {
              'account': creat.account,
              'password': creat.password,
              'drawpwd': userInfo.drawMoneyPwd,
              'confirmPassword': creat.password1,
              'realName': userInfo.realName,
              'nickName': userInfo.nickname,
              'idPassportNoType': userInfo.idPassportNoType,
              'idPassportNo': userInfo.idPassportNo,
              'phone': userInfo.phone,
              'englishName': userInfo.englishname,
              'birthday': userInfo.birthday,
              'country': userInfo.country,
              'qq': userInfo.qq,
              'email': userInfo.email,
              'moneyDraw': userInfo.drawMoneyPwd,
              'currencyId': userInfo.currencyId,
              'validCode': creat.code
            },
            success: function (_res) {
              if (_res.status === '1') {
                if (_res.msg) {
                  let versionList = window.indexMain.versionFun('initData', 'homeVersionKey')
                  $this.$store.dispatch('initData.action', versionList) // 重新获取首页信息
                  console.error(_res)
                  msgWarn(_res.msg ? _res.msg : '网络开小差儿，请稍后重试', () => {
                    $this.$router.push('/wap/memberCenter/index')
                  })
                }
              } else if (_res.msg) {
                msgWarn(_res.msg ? _res.msg : '网络开小差儿，请稍后重试')
              }
              submint.innerHTML = '完成'
              $this.switch = true
            },
            error: function () {
              submint.innerHTML = '完成'
              $this.switch = true
            }
          }, true)
        } else {
          submint.innerHTML = '完成'
          this.switch = true
        }
      } else if (this.bindPage.page3) {
            // 注册成功todo
        if (this.referData()) {
          console.log('提交资料', creat)
          this.bindPage.page3 = true
          this.bindPage.page2 = false
        }
      }
      return false
    },
      // 验证数据方法 第一步
    creatCheck ($this) {
      var {msgWarn} = bindmethod
      let checkstart = this.checkAccounts('creat', createpw)
      console.log(checkstart, '检查')
      if (!checkstart) {
        return false
      }
      function createpw () {
        let password = $this.creat.password
        let password1 = $this.creat.password1
        // let code = $this.creat.code
        if (!password) {
          msgWarn('所需密码不能为空')
          return false
        }
        if (password1.length < 6 || password1.length > 10) {
          msgWarn('确认密码格式不正确!')
          return false
        }

        if (/^[0-9]{6,12}$/.test(password) || !/^[A-Za-z0-9]{6,12}$/.test(password)) {
          msgWarn('密码必须是6-12位英文字母或数字与字母组合')
          return false
        }
        if (password !== password1) {
          msgWarn('确认密码不正确!')
          return false
        }
        // var codes = code.replace(/\s/g, '')
        // if (codes.length === 0) {
        //   msgWarn('请输入验证码！')
        //   return false
        // }
        // if (codes.length !== 4) {
        //   msgWarn('请输入四位验证码')
        //   return false
        // }
        return true
      }
      return checkstart
    },
      // 完善提交资料 校验数据
    referData () {
      var {msgWarn} = bindmethod
      if (this.regInfo.realName && this.regInfo.realName.ifShow) {
        if (this.regInfo.realName.ifRequired && !this.userInfo.realName) {
          msgWarn('请输入真实姓名！')
          return false
        }
        if (this.userInfo.realName && (this.userInfo.realName.length < 1 || this.userInfo.realName.length > 12)) {
          msgWarn('真实姓名只能1-12位！！')
          return false
        }
          // TODO校验真实姓名
        var checkName = true
        if (this.userInfo.realName && this.regInfo.realName.ifValidate === 1) {
          this.httpRequest({
            url: '/api/wap/wapLogin/checkRealName',
            actions: {
              realName: this.userInfo.realName
            },
            success: function (_res) {
              if (_res.status === '1') {
              } else {
                msgWarn('姓名已注册, 请洽客服人员！')
                checkName = false
              }
            },
            error: function () {
              msgWarn('网络开小差儿，请稍后重试！')
              checkName = false
            }
          }, false)
        }
        if (!checkName) {
          return false
        }
      }
        // 昵称
      if (this.regInfo.nickname && this.regInfo.nickname.ifShow && this.regInfo.nickname.ifRequired) {
        if (!this.userInfo.nickname) {
          msgWarn('阁下昵称不能为空')
          return false
        }
      }
        // 英文名
      if (this.regInfo.englishname && this.regInfo.englishname.ifShow) {
        if (this.regInfo.englishname.ifRequired && !this.userInfo.englishname) {
          msgWarn('阁下英文姓名不能为空')
          return false
        }
        if (this.userInfo.englishname !== '' && !/^[A-Za-z0-9_\-\\.]+(\s*[A-Za-z0-9_\-\\.]+)*$/.test(this.userInfo.englishname)) {
          msgWarn('英文姓名格式输入错误！')
          return false
        }
      }

        // 生日
      if (this.regInfo.birthday && this.regInfo.birthday.ifShow) {
        if (this.regInfo.birthday.ifRequired && !this.userInfo.birthday) {
          msgWarn('阁下生日不能为空')
          return false
        }
        if (this.userInfo.birthday && !/[\d]{4}[\\/-]{1}[\d]{1,2}[\\/-]{1}[\d]{1,2}/g.test(this.userInfo.birthday)) {
          msgWarn('生日格式输入错误！')
          return false
        }
      }
        // 国家
      if (this.regInfo.country && this.regInfo.country.ifShow) {
        if (this.regInfo.country.ifRequired && !this.userInfo.country) {
          msgWarn('阁下国家不能为空')
          return false
        }
        if (this.userInfo.country && !/^[\u4e00-\u9fa5]+$/.test(this.userInfo.country)) {
          msgWarn('国家格式输入错误！')
          return false
        }
      }
        // 身份证/护照
      if (this.regInfo.idPassportNoType && this.regInfo.idPassportNoType.ifShow) {
        if (this.regInfo.idPassportNoType.ifRequired && !this.userInfo.idPassportNo) {
          msgWarn('请输入身份证或护照号！')
          return false
        }
        if (this.userInfo.idPassportNo && Number(this.userInfo.idPassportNoType) === 0) {
            // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
          var reg = /(^\d{14,17}[Xx0-9]$)/
          if (reg.test(this.userInfo.idPassportNo) === false) {
            msgWarn('身份证输入格式不正确！')
            return false
          }
        } else if (this.userInfo.idPassportNo && Number(this.userInfo.idPassportNoType) === 1) {
          if (!/^[\w]{6,12}$/.test(this.userInfo.idPassportNo)) {
            msgWarn('护照输入格式不正确！')
            return false
          }
        }
      }
        // 手机号码电话
      if (this.regInfo.phone && this.regInfo.phone.ifShow) {
        if (this.regInfo.phone.ifRequired && !this.userInfo.phone) {
          msgWarn('请输入手机号！')
          return false
        }
        if (this.userInfo.phone && !/^\d{7,12}$/.test(this.userInfo.phone)) {
          msgWarn('手机号格式输入错误！')
          return false
        }
          // TODO校验
        var checkPhone = true
        if (this.userInfo.phone && this.regInfo['phone'].ifValidate === 1) {
          console.info('校验 checkPhone')
          this.httpRequest({
            url: '/api/wap/wapLogin/checkPhone',
            actions: {
              phone: this.userInfo.phone
            },
            success: function (_res) {
              console.log(_res)
              if (_res.status !== '1') {
                msgWarn('此手机号已经有人使用了！')
                checkPhone = false
              }
            },
            error: function () {
              msgWarn('验证失败！')
              checkPhone = false
            }
          }, false)
        }
        if (!checkPhone) {
          return false
        }
      }
        // QQ
      if (this.regInfo.qq && this.regInfo.qq.ifShow) {
        if (this.regInfo.qq.ifRequired && !this.userInfo.qq) {
          msgWarn('请输入QQ!')
          return false
        }
        if (this.userInfo.qq && !/^[1-9][0-9]{4,}$/.test(this.userInfo.qq)) {
          msgWarn('QQ输入格式不正确！')
          return false
        }
      }
        // 邮箱
      if (this.regInfo.email && this.regInfo.email.ifShow) {
        if (this.regInfo.email.ifRequired && !this.userInfo.email) {
          msgWarn('请输入邮箱地址！')
          return false
        }
        if (this.userInfo.email && !/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.userInfo.email)) {
          msgWarn('您输入的邮箱格式不正确！')
          return false
        }
          // TODO校验
        var isEmail = true
        if (this.userInfo.email && this.regInfo['email'].ifValidate === 1) {
          console.info('校验的email')
          this.httpRequest({
            url: '/api/wap/wapLogin/checkEmail',
            actions: {
              email: this.userInfo.email
            },
            success: function (_res) {
              if (_res.status !== '1') {
                msgWarn('此邮箱已经有人使用了！')
                isEmail = false
              }
            },
            error: function () {
              msgWarn('验证失败！')
              isEmail = false
            }
          }, false)
        }
        if (!isEmail) {
          return false
        }
      }
        // 取款密码
      if (!this.userInfo.drawMoneyPwd) {
        msgWarn('请填写取款密码')
        return false
      }
      if (!/^[0-9]{4}$/.test(this.userInfo.drawMoneyPwd)) {
        msgWarn('取款密码必须是四位数字！')
        return false
      }

      var code = this.creat.code
      var codes = code.replace(/\s/g, '')
      if (codes.length === 0) {
        msgWarn('请输入验证码！')
        return false
      }
      return true
    },
      // 行内提示的校验  依赖于bindmethod.js 校验逻辑提示与method.js有所不同
    checkAccount (type = 'creat') {
      let {VerifyInof} = bindmethod
      VerifyInof().checkAccount(this, type)
    },
    checkCode () {
      let {VerifyInof} = bindmethod
      return VerifyInof().checkcode(this, 'creat')
    },
    clickYZM () {
      if (!this.validCodeSrc) {
        this.changeVCode()
      }
    },
    changeVCode () {
      this.validCodeSrc = '/validCode?t=' + new Date().getTime()
    },
    checkPw (way, type = 'creat') {
      let {VerifyInof} = bindmethod
      if (way === 1) {
        return VerifyInof().checkPw1(this, type)
      }
      if (way === 2) {
        return VerifyInof().checkPw2(this)
      }
    },
      // 验证是否为纯数字
    isNum (N) {
      var Ns = /^[A-Za-z0-9]{4,12}$/
      if (!Ns.test(N)) {
        return false
      } else {
        return true
      }
    },
      // 弹出提示框的校验
    checkAccounts (KeyType = 'creat', cbFun) {
      var {msgWarn} = bindmethod
      let _errAccount = [
        '所需账号不能为空',
        '账号为6-12个英文字母和数字的组合！',
        'test开头的是试玩会员，不允许作为正式账号！',
        '请输入正确的账号格式',
        '请输入正确的账号！格式：以英文+数字,长度6-12',
        '账号为6-12个英文字母和数字的组合！'
      ]
      let account = this[KeyType].account
        // 绑定新用户校验顺序
      if (/^[A-Za-z]+$/.test(account)) {
        msgWarn(_errAccount[1])
        return false
      }
      // 格式不正确
      if (account !== '' && account.length >= 6 && account.length <= 12) {} else {
        msgWarn(_errAccount[5])
        return false
      }

     // 是否开头字符是test
      let accountStr = account.substring(0, 4).toLowerCase()
      if (accountStr === 'test') {
        msgWarn(_errAccount[2])
        return false
      }
      var checkSign = false
      this.httpRequest({
        url: '/api/wap/wapLogin/checkAccount',
        actions: {
          account: account
        },
        success: function (_res) {
          if (_res.status === '1') {
            checkSign = true
          } else {
            msgWarn('账号已经存在')
            console.log(1)
            checkSign = false
          }
        },
        error: function () {
          msgWarn('网络开小差儿，请稍后重试！')
          checkSign = false
        }
      }, false)
      if (checkSign) {
        return cbFun()
      } else {
        return checkSign
      }
    },
      /*
      *  校验第二步的用户信息所用方法
      */
      // 真实姓名
    checkRealName () {
      var $this = this
      let [_errArr, _key, _state] = [['请输入真实姓名！', '真实姓名只能1-12位！', '姓名已注册，请洽客服人员！', '网络问题,验证失败！'], 'realName', () => {
        if (this.userInfo[_key] === '') {
          $this.$set($this.errMsg, 'realName', {
            status: true,
            txt: _errArr[0]
          })
          return false
        }
          //  this.userInfo.realName.replace(/[\u4e00-\u9fa5]/g,'').length === 0 中文
        if (this.userInfo[_key].length < 1 || this.userInfo[_key].length > 12) {
          $this.$set($this.errMsg, 'realName', {
            status: true,
            txt: _errArr[1]
          })
          return false
        }
        let checkName = true
        if (this.regInfo.realName.ifValidate === 1) {
          this.httpRequest({
            url: '/api/wap/wapLogin/checkRealName',
            actions: {
              realName: this.userInfo.realName
            },
            success: function (_res) {
              if (_res.status !== '1') {
                $this.$set($this.errMsg, 'realName', {
                  status: true,
                  txt: _errArr[2]
                })
                checkName = false
              }
            },
            error: function () {
              $this.$set($this.errMsg, 'realName', {
                status: true,
                txt: '网络开小差儿，请稍后重试！'
              })
              checkName = false
            }
          })
          return checkName
        }
        return true
      }]
      return this.checkCommon({_errArr, _key, _state}, this, 'userInfo')
    },
      // QQ
    checkQq () {
      let [_errArr, _key, _state] = [['请输入QQ!', 'QQ输入格式不正确！'], 'qq', () => {
        if (!/^[1-9][0-9]{4,}$/.test(this.userInfo[_key])) {
          this.errMsg[_key] = {
            status: true,
            txt: _errArr[1]
          }
          return false
        }
        return true
      }]
      return this.checkCommon({_errArr, _key, _state}, this, 'userInfo')
    },
      // 昵称
    checkNickname () {
      let [_errArr, _key, _state] = [['阁下国家不能为空'], 'nickname', () => {
        if (!this.userInfo.nickname) {
          this.$set(this.errMsg, 'nickname', {
            status: true,
            txt: _errArr[0]
          })
          return false
        }
        return true
      }]
      return this.checkCommon({_errArr, _key, _state}, this, 'userInfo')
    },
      // 取款密码
    drawMoney () {
      let [_errArr, _key, _state] = [['请填写取款密码!', '取款密码必须是四位数字！'], 'drawMoneyPwd', () => {
        if (!this.userInfo.drawMoneyPwd) {
          this.$set(this.errMsg, 'drawMoneyPwd', {
            status: true,
            txt: _errArr[0]
          })
          return false
        }
        if (!/^[0-9]{4}$/.test(this.userInfo.drawMoneyPwd)) {
          this.$set(this.errMsg, 'drawMoneyPwd', {
            status: true,
            txt: _errArr[1]
          })
          return false
        }
        return true
      }]
      return this.checkCommon({_errArr, _key, _state}, this, 'userInfo')
    },
      // 英文名
    checkEnglishName () {
      let $this = this
      let [_errArr, _key, _state] = [['阁下英文姓名不能为空!', '英文姓名格式输入错误！'], 'englishname', () => {
        if (!$this.userInfo[_key]) {
          $this.errMsg[_key] = {
            status: true,
            txt: _errArr[0]
          }
          return false
        }
        if ($this.userInfo[_key] !== '' && !/^[A-Za-z0-9_\-\\.]+(\s*[A-Za-z0-9_\-\\.]+)*$/.test($this.userInfo[_key])) {
          $this.errMsg[_key] = {
            status: true,
            txt: _errArr[1]
          }
          return false
        }
        return true
      }]
      return this.checkCommon({_errArr, _key, _state}, this, 'userInfo')
    },
      // 电话手机
    checkPhone () {
      let [_errArr, _key, _state] = [['请输入手机号！', '手机号格式输入错误！', '此手机号已经有人使用了！', '验证失败！'], 'phone', () => {
        if (!this.userInfo[_key]) {
          this.errMsg[_key] = {
            status: true,
            txt: _errArr[0]
          }
          return false
        }
        if (!/^\d{7,12}$/.test(this.userInfo[_key])) {
          this.errMsg[_key] = {
            status: true,
            txt: _errArr[1]
          }
          return false
        }
        let $this = this
        var checkPhone = true
          // DOTO校验
        if (this.regInfo[_key].ifValidate === 1) {
          this.httpRequest({
            url: '/api/wap/wapLogin/checkPhone',
            actions: {
              phone: this.userInfo.phone
            },
            success: function (_res) {
              console.log('检查手机合法性：', _res)
              if (_res.status !== '1') {
                $this.$set($this.errMsg, _key, {
                  status: true,
                  txt: _errArr[2]
                })
                checkPhone = false
              }
            },
            error: function () {
              $this.$set($this.errMsg, _key, {
                status: true,
                txt: '验证失败！'
              })
              checkPhone = false
            }
          })
        }
        if (checkPhone !== true) {
          return false
        }
        return true
      }]
      return this.checkCommon({_errArr, _key, _state}, this, 'userInfo')
    },
      // 邮箱
    checkEmail () {
      var {msgWarn} = bindmethod
      let [_errArr, _key, _state] = [
        ['请输入邮箱地址！', '您输入的邮箱格式不正确！', '此邮箱已经有人使用了！', '验证失败！'], 'email', () => {
          if (!this.userInfo[_key]) {
            this.errMsg[_key] = {
              status: true,
              txt: _errArr[0]
            }
            return false
          }
          if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.userInfo[_key])) {
            this.errMsg[_key] = {
              status: true,
              txt: _errArr[1]
            }
            return false
          }
          if (this.regInfo[_key].ifValidate === 1) {
            var isEmail = true
            let $this = this
            if (this.regInfo['email'].ifValidate === 1) {
              console.info('校验的email')
              this.httpRequest({
                url: '/api/wap/wapLogin/checkEmail',
                actions: {
                  email: this.userInfo.email
                },
                success: function (_res) {
                  if (_res.status !== '1') {
                    $this.$set($this.errMsg, _key, {
                      status: true,
                      txt: _errArr[2]
                    })
                    isEmail = false
                  }
                },
                error: function () {
                  msgWarn('验证失败！')
                  isEmail = false
                }
              })
            }
            if (isEmail !== true) {
              return false
            }
          }
          return true
        }]
      return this.checkCommon({_errArr, _key, _state}, this, 'userInfo')
    },
      // 获取生日
    getValue () {
      let $this = this
      var _data = ''
      if ($this.birthday) {
        _data = moment($this.birthday).format('YYYY-MM-DD')
        $this.userInfo.birthday = _data
        $this.birthday = _data
      }
        // add 验证
      $this.checkBirthday()
    },
      // 生日
    checkBirthday () {
      let [_errArr, _key, _state] = [['阁下生日不能为空！', '生日格式输入错误！'], 'birthday', () => {
        if (!this.userInfo.birthday) {
          this.errMsg[_key] = {
            status: true,
            txt: _errArr[0]
          }
          return false
        }
        if (/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/.test(this.userInfo.birthday) || /^[0-9]{4}\/[0-9]{2}\/[0-9]{2}$/.test(this.userInfo.birthday)) {
          this.errMsg[_key] = {
            status: true,
            txt: _errArr[1]
          }
          return false
        }
        return true
      }]
      return this.checkCommon({_errArr, _key, _state}, this, 'userInfo')
    },
      // 打开生日组件
    openPicker () {
      window.$('input, textarea').blur()// 控制软键盘消失
      if (!window.$(this.$refs.picker.$el).parent().is(window.$('body'))) {
        window.$('body').append(this.$refs.picker.$el)
        window.mountedRemoveDoms.push(window.$(this.$refs.picker.$el))
      }
      this.$refs.picker.open()
    },
      // 国家
    checkCountry () {
      let [_errArr, _key, _state] = [['阁下国家不能为空！', '国家格式输入错误！'], 'country', () => {
        if (!this.userInfo[_key]) {
          this.errMsg[_key] = {
            status: true,
            txt: _errArr[0]
          }
          return false
        }
        if (this.userInfo[_key] !== '' && !/^[\u4e00-\u9fa5]+$/.test(this.userInfo[_key])) {
          this.errMsg[_key] = {
            status: true,
            txt: _errArr[1]
          }
          return false
        }
        return true
      }]
      return this.checkCommon({_errArr, _key, _state}, this, 'userInfo')
    },
      // 身份证/护照
    checkIdPassportNo () {
      let $this = this
      let [_errArr, _key, _state] = [['请输入身份证或护照号！', '身份证输入格式不正确！', '护照输入格式不正确！'], 'idPassportNo', () => {
        var NumType = Number($this.userInfo.idPassportNoType || 0)
        var idNumber = $this.userInfo.idPassportNo
        if (!idNumber) {
          $this.errMsg[_key] = {
            status: true,
            txt: _errArr[0]
          }
          return false
        }
          // 身份证
        if (NumType === 0) {
            // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
          let reg = /(^\d{14,17}[Xx0-9]$)/.test(idNumber)
          console.log(reg, idNumber)
          if (!reg) {
            $this.errMsg[_key] = {
              status: true,
              txt: _errArr[1]
            }
            return false
          }
        }
          // 护照
        if (NumType === 1) {
          let reg = !/^[\w]{6,12}$/.test(idNumber)
          if (reg) {
            $this.errMsg[_key] = {
              status: true,
              txt: _errArr[2]
            }
            return false
          }
        }
        return true
      }]
      return this.checkCommon({_errArr, _key, _state}, this, 'userInfo')
    },
      /* 第二步所用方法  end */
      // 点击打开opt下拉框
    optclick (type) {
      if (type === 1) {
        this.optMsg.optsType = true
      } else {
        this.optMsg1.optsType = true
      }
      setTimeout(() => {
        window.$('input, textarea').blur()// 控制软键盘消失
        var $dom = window.$('[attr-div="optCom"]')
        // dom结构移至body下
        if ($dom[0] && !$dom.parent().is(window.$('body'))) {
          window.$('body').append($dom)
          window.mountedRemoveDoms.push($dom)
          $dom = null
        }
      }, 0)
    },
      // 接收opt组件回调
    showMsgOptcom (data, index) {
      this.optValue = data
      this.optMsg.optsType = false
      if (this.regInfo.listMoney[index]) {
        this.userInfo.currencyId = this.regInfo.listMoney[index].currencyId
      }
    },
    showMsgOptcom1 (data, index) {
      this.optValue1 = data
      this.optMsg1.optsType = false
      this.userInfo.idPassportNoType = index
        // 证件类型需要在更改后再进行一次check
      // this.checkIdPassportNo()
    },
    httpRequest (options) {
      let HttpRequest = bindmethod.HttpRequest
      return HttpRequest(options)
    }
  },
  mounted () {
    window.indexMain.mountedRemoveDoms() // 删除多余dom（防止自动刷新时，多余的dom不被删除）
    var $this = this
    let {VerifyInof} = bindmethod
    this.checkCommon = VerifyInof().checkCommon
       // 模拟请求 获取填写列表
    this.$store.dispatch('bingWechat', {}).then(res => {
      if (res.status === '1') {
        $this.regInfo = window._assignIn($this.regInfo, res.data)
        $this.regInfo = window._assignIn($this.regInfo, $this.regInfo.memberSetList)
        console.log($this.regInfo)
        if ($this.regInfo.listMoney.length !== 0) {
          $this.optMsg.DataList = []
          for (var item of $this.regInfo.listMoney) {
            $this.optMsg.DataList.push(item.currencyName)
          }
        }
        delete $this.regInfo.memberSetList
        if ($this.regInfo.parentName && $this.regInfo.parentName.ifShow) {
          $this.userInfo.parentName = $this.Intr ? $this.Intr : ''
        }
        if ($this.regInfo.idPassportNoType && $this.regInfo.idPassportNoType.ifShow) {
          $this.regInfo.idPassportNo = $this.regInfo.idPassportNoType
        }
        $this.LoadingMsg = false // 获取数据关闭loading
      }
    })
      // 渲染初始化拉下数据展示
    $this.optValue = this.optMsg.DataList[0]
    $this.optValue1 = this.optMsg1.DataList[0]
  }
}
</script>

