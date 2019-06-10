<template>
  <!-- 转账表单统一样式 -->
  <div class="changePassword">
    <form>
      <div class="formItem" >
        <span class="formTile"><span class="orange">*</span>真实姓名：</span>
        <div class="formInline">
          <el-input :placeholder="realName"  v-if="realName"
                    size="medium" type="text" :disabled="true" maxlength="20" >
          </el-input>
          <el-input  v-if="!realName" onkeyup="this.value=this.value.replace(/\s+/g,'')"
                     v-model="bindInfo.realName" size="medium" type="text" maxlength="20"
                     @blur="checkRealName()">
          </el-input>
          <AddErr :regDate="errMsg" message="realName" v-if="!realName" />
        </div>
      </div>

      <div class="formItem" id="bindPW">
        <span class="formTile"><span class="orange">*</span>取款密码：</span>
        <div class="formInline">
          <input style="width: 292px;" v-if="!disabledDrawMoneyPwd"
                 size="medium" type="password" class="el-input__inner"
                 maxlength="4"
                 placeholder="请输入取款密码"
                 v-model="bindInfo.drawMoneyPwd"
                 @click.stop='openKeyBoard("showDrawKey") '
                 @focus='openKeyBoard("showDrawKey")'
                 readonly="readonly"
          >
          <el-input v-if="disabledDrawMoneyPwd"
                     size="medium" type="text" maxlength="4"
                    placeholder="****"
                    disabled="disabled"
                     @blur="checkRealName()">
          </el-input>
          <key-board :inputData='confirmPwd' :keyNum='setDrawPwdCode' :clickNum='setDrawConfirmPwd' v-if='showDrawKey' :clear="clearNewDrawPwd"></key-board>
        </div>
        <!--err 提示 blurb 不校验  -->
        <AddErr :regDate="errMsg" message="drawMoneyPwd"/>
      </div>

      <div class="formItem bankAccount" style="position: relative">
        <span class="formTile"><span class="orange">*</span>银行账号：</span>
        <div class="formInline">
          <el-input size="medium" type="text"
                    :disabled="disabledBankAccount"
                    maxlength="20" @blur="check_bankAccount()"
                    v-model="bankAccountNO"
                    onkeyup="this.value=this.value.replace(/[^\d]/g,'')"
          ></el-input>
          <AddErr :regDate="errMsg" message="bankAccount" v-if="!disabledBankAccount"/>
        </div>
      </div>

      <div class="formItem">
        <span class="formTile"><span class="orange">*</span>出款银行：</span>
        <div class="formInline">
          <el-select filterable v-model="nowBankId" :disabled='isDisableBank' size="small" class="checkBank" @focus='closeKeyBoard("showDrawKey")' >
            <el-option v-for="val in bankList"
                       :key="val.id"
                       :label="val.bankname"
                       :value="val.id">
            </el-option>
          </el-select>
          <AddErr :regDate="errMsg" message="nowBankId"/>
        </div>
      </div>

      <div class="formItem">
        <span class="formTile"><span class="orange">*</span>开户行省：</span>
        <div class="formInline">
          <el-input size="medium" type="text"
                    @change="checkZH('prov')"
                    placeholder="请输入开户行省"
                    maxlength="20"
                    @blur="check_province()"
                    v-model="bindInfo.prov"
          ></el-input>
          <AddErr :regDate="errMsg" message="prov"/>
        </div>
      </div>

      <div class="formItem">
        <span class="formTile"><span class="orange">*</span>开户行市：</span>
        <div class="formInline">
          <el-input size="medium" type="text"
                    @change="checkZH('city')"
                    maxlength="20"
                    @blur="check_city()"
                    v-model="bindInfo.city"
                    placeholder="请输入开户行市"
          ></el-input>
          <AddErr :regDate="errMsg" message="city"/>
        </div>
      </div>
      <div class="formItem">
        <span class="formTile"></span>
        <div class="formInline">
          <el-button type="primary" @click="submit()">确定</el-button>
          <el-button type="primary" @click="clean()">重置</el-button>
        </div>
      </div>
      <div class="formItem">
        <span class="formTile"></span>
        <div class="formInline">
          <table class="warmPrompt">
            <tr>
              <td style="width: 66px;">温馨提示:</td>
              <td>标记有&nbsp;<span class="orange">*</span>&nbsp;均为必填项目，请认真填写。</td>
            </tr>
          </table>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
  /**
   *  后台创建账号的 没有提款密码 和姓名
   *  自行注册 有 有提款密码 和姓名
   */
  import * as types from '@s/store/shareApi/type'
  import { mapState, mapActions } from 'vuex'
  import keyBoard from '@s/components/doc/keyBoard.vue' // 取款密码的键盘
  export default {
    data () {
      return {
        isDisableBank: false, // 是否允许选择银行
        tempValue: null, // 截取临时10位数据
        itemArr: [], // 匹配银行
        timer: '',
        bankAccountNO: '',
        confirmPwd: '', // 初始化 提款密码
        showDrawKey: null, // 提款密码 不显示
        drawMoney: '', // 出款金额
        drawMoneyPwd: '', // 出款密码
        realName: '', // 是否 设置了姓名
        remark: '提交',
        bankList: [],
        disabledBankAccount: false, // 银行卡是否已经存在
        disabledBankCity: false,
        disabledBankProv: false,
        disabledDrawMoneyPwd: false, // 取款密码 设定
        // 绑定信息
        bindInfo: {
          bankId: '',
          bankAccount: '',
          prov: '',
          city: '',
          drawMoneyPwd: '',
          realName: ''
        },
        errMsg: { // 输入框上的弹出ui传递的数据
          center: true,
          drawMoneyPwd: {
            status: '', // 警告'warn' 错误 'err' 正确 'complete'
            warn: '',
            txt: ''
          },
          realName: {
            status: '', // 警告'warn' 错误 'err' 正确 'complete'
            warn: '',
            txt: '请输入真实姓名！'
          },
          bankAccount: {
            status: '', // 警告'warn' 错误 'err' 正确 'complete'
            warn: '',
            txt: ''
          },
          prov: {
            status: '', // 警告'warn' 错误 'err' 正确 'complete'
            warn: '',
            txt: ''
          },
          city: {
            status: '', // 警告'warn' 错误 'err' 正确 'complete'
            warn: '',
            txt: ''
          },
          nowBankId: {
            status: '', // 警告'warn' 错误 'err' 正确 'complete'
            warn: '',
            txt: ''
          }
        },
        nowBankId: '',
        // 银行数据
        isOpen: true // 用于限制点击过快处理
      }
    },
    components: { keyBoard },
    methods: {
      checkZH (key) {
        var a = this.bindInfo[key].replace(/[^\u4e00-\u9fa5]/g, '')
        this.bindInfo[key] = a
      },
      clean () {
        var $this = this
        var bankAccount = this.disabledBankAccount

        var _City = this.disabledBankCity
        var _Prov = this.disabledBankProv

        window._.each(this.bindInfo, (a, b) => {
          if (bankAccount && b === 'bankAccount') {
            // 如果银行卡 存在 就不要 归零 bankAccount 的值
            return
          }
          if (_City && b === 'city') {
            // 如果city 存在 就不要 归零 city 的值
            return
          }
          if (_Prov && b === 'prov') {
            // 如果prov 存在 就不要 归零 prov 的值
            return
          }
          $this.bindInfo[b] = ''
        })

        window._.each(this.errMsg, (a, b) => {
          if (bankAccount && b === 'bankAccount') {
            // 如果银行卡 存在 就不要 归零 bankAccount 的值
            return
          }
          if (_City && b === 'city') {
            // 如果city 存在 就不要 归零 city 的值
            return
          }
          if (_Prov && b === 'prov') {
            // 如果prov 存在 就不要 归零 prov 的值
            return
          }
          $this.errMsg[b] = {
            status: '', // 警告'warn' 错误 'err' 正确 'complete'
            warn: '',
            txt: ''
          }
        })
        this.nowBankId = ''
        this.drawMoneyPwd = ''
        this.clearNewDrawPwd()
        this.errMsg.nowBankId = {
          status: '', // 警告'warn' 错误 'err' 正确 'complete'
          warn: '',
          txt: ''
        }
        console.log(this.errMsg)
      },
      // 重置清空密码
      clearNewDrawPwd (v) {
        this.bindInfo.drawMoneyPwd = this.confirmPwd = ''
      },
      // 通过电脑键盘输入密码
      setDrawPwdCode (ev) {
        if (isNaN(ev.key)) return
        if (this.showDrawKey) {
          this.setDrawConfirmPwd(ev.key)
        }
      },
      // 通过键盘设置密码
      setDrawConfirmPwd (n) {
        this.confirmPwd += n.toString()
        if (this.confirmPwd.length > 3) {
          this.showDrawKey = false
          this.bindInfo.drawMoneyPwd = this.confirmPwd.toString().replace(/[^\d]+/g, '').slice(0, 4)
          // 检查提款密码
          this.drawMoneyFN()
        }
        // this.bindInfo.drawMoneyPwd = this.confirmPwd.toString().replace(/[^\d]+/g, '').slice(0, 4)
      },
      // 打开相对应的键盘
      openKeyBoard (v) {
        this.showDrawKey = false
        this.confirmPwd = ''
        this[v] = true
        //
      },
      // 关闭相对应的键盘
      closeKeyBoard (v) {
        this[v] = false
        if (this.showDrawKey) {

        }
      },
      routerPush (url) {
        setTimeout(() => {
          window.$('.moneyPwd').click()
        }, 300)
        this.$router.push(url)
        this.$nextTick(() => {
          window.$('.moneyPwd').click()
        })
      },
      delay () {
        setTimeout(() => {
          this.check_bank()
        }, 0)
      },
      check_bank () {
        // 空验证 失去焦点 校验不了
        if (!this.nowBankId) {
          this.$set(this.errMsg, 'nowBankId', {
            status: 'err',
            txt: '出款银行不能为空！'
          })
          return false
        }
        this.$set(this.errMsg, 'nowBankId', {
          status: 'complete',
          txt: ''
        })
      },
      check_bankAccount () {
        if (this.disabledBankAccount) {
          this.errMsg.bankAccount.status = 'complete'
          this.errMsg.bankAccount.txt = ''
          return true
        }
        if (this.onlineDraw.memberInfo && this.onlineDraw.memberInfo.bankAccount) {
          this.errMsg.bankAccount.status = 'complete'
          return true
        }
        try {
          this.bindInfo.bankAccount = this.bindInfo.bankAccount.replace(/[^\d]/g, '')
        } catch (e) {
        }
        var bankAccount = this.bindInfo.bankAccount
        // 空验证
        if (!bankAccount) {
          this.$set(this.errMsg, 'bankAccount', {
            status: 'err',
            txt: '银行账号不能为空！'
          })
          return false
        }

        if (!/[0-9]{10,}$/.test(bankAccount)) {
          this.$set(this.errMsg, 'bankAccount', {
            status: 'err',
            txt: '银行账号格式不正确！'
          })
          return false
        }
        let checkName = true
        let _res = window.$.httpAsync('/member/drawMoney/checkBankAccount', {
          bankAccount: bankAccount
        })

        if (_res.code === 0) {
          checkName = true
        } else {
          checkName = false
          this.errMsg.bankAccount = {
            status: 'err',
            txt: _res.msg
          }
        }
        if (checkName) {
          this.$set(this.errMsg, 'bankAccount', {
            status: 'complete',
            txt: ''
          })
        }
        return checkName
      },
      // 验证省
      check_province () {
        var prov = this.bindInfo.prov
        if (prov) {
          if (!/^[\u4e00-\u9fa5]{1,}$/.test(prov)) {
            this.$set(this.errMsg, 'prov', {
              status: 'err',
              txt: '省份格式不正确！'
            })
            return false
          }
        } else {
          this.$set(this.errMsg, 'prov', {
            status: 'err',
            txt: '省份不能为空!'
          })
          return false
        }
        this.$set(this.errMsg, 'prov', {
          status: 'complete',
          txt: ''
        })
      },
      // 验证市
      check_city () {
        var city = this.bindInfo.city
        if (city) {
          if (!/^[\u4e00-\u9fa5]{1,}$/.test(city)) {
            this.$set(this.errMsg, 'city', {
              status: 'err',
              txt: '城市格式不正确！'
            })
            return false
          }
        } else {
          this.$set(this.errMsg, 'city', {
            status: 'err',
            txt: '城市不能为空'
          })
          return false
        }
        this.$set(this.errMsg, 'city', {
          status: 'complete',
          txt: ''
        })
      },
      drawMoneyFN () {
        if (this.disabledDrawMoneyPwd) return
        if (!this.bindInfo.drawMoneyPwd) {
          this.$set(this.errMsg, 'drawMoneyPwd', {
            status: 'err',
            txt: '请填写取款密码！'
          })
          return false
        }
        if (this.bindInfo.drawMoneyPwd.length < 4) {
          this.$set(this.errMsg, 'drawMoneyPwd', {
            status: 'err',
            txt: '请输入4位取款密码！'
          })
          return false
        }
        this.errMsg.drawMoneyPwd = {
          status: 'complete',
          txt: '取款时要用到的密码，非常重要，请务必牢记！'
        }
        return true
      },
      checkRealName () {
        try {
          this.bindInfo.realName = this.bindInfo.realName.replace(/ +/g, '')
        } catch (e) { }
        // 空判断
        if (this.bindInfo.realName === '真实姓名' || !this.bindInfo.realName) {
          this.$set(this.errMsg, 'realName', {
            status: 'err',
            txt: '请输入真实姓名！'
          })
          return false
        }
        if (this.bindInfo.realName.length < 1 || this.bindInfo.realName.length > 20) {
          this.$set(this.errMsg, 'realName', {
            status: 'err',
            txt: '真实姓名只能1-20位！'
          })
          return false
        }

        var checkName = true
        // 通过检查 归零
        if (checkName) {
          this.errMsg.realName = {
            status: 'complete',
            txt: ''
          }
        }
      },
      submit () {
        this.check_bank()
        this.check_bankAccount()
        this.check_province()
        this.check_city()
        // 检查提款密码
        this.drawMoneyFN()
        // 存在 用户名
        if (this.realName) {

        } else {
          // 不存在用户名, 需要输入用户名
          this.checkRealName()
          if (this.errMsg.realName.status !== 'complete') { // 没有校验 ok
            // window.layer.msgWarn(this.errMsg.realName.txt)
            return
          }
        }

        if (this.errMsg.bankAccount.status !== 'complete') {
        //  window.layer.msgWarn(this.bankAccount.err)
          return
        }
        if (this.errMsg.nowBankId.status !== 'complete') {
          // window.layer.msgWarn(this.bankAccount.err)
          return
        }
        if (this.errMsg.prov.status !== 'complete') {
          //   window.layer.msgWarn(this.bankAccount.err)
          return
        }
        if (this.errMsg.city.status !== 'complete') {
        //  window.layer.msgWarn(this.bankAccount.err)
          return
        }
        // 赋值  银行卡 id
        this.bindInfo.bankId = this.nowBankId

        this.bindInfo.bankId = this.nowBankId

        // 如果存在  real name 赋值 bindInfo.realName post to  api
        if (this.realName) {
          this.bindInfo.realName = this.realName
        }
        if (this.disabledDrawMoneyPwd) {
          delete this.bindInfo.drawMoneyPwd
        }
        console.log(this.bindInfo)
        this.$store.dispatch('saveBank', this.bindInfo).then(res => {
          if (res.status === '0') {
            // 如果是从修改取款密码跳过来的，再跳到安全设置页面
            if (this.$store.state.payment.showBindInfo) {
              window.layer.msgWarn('银行卡绑定成功!', () => {
                this.$store.state.payment.showBindInfo = false
                window.router.push('/center/myAccount/safeSet')
              })
            } else {
              this.$emit('my-event', {})
              window.layer.msgWarn('银行卡绑定成功!', () => {
              // window.router.push('/center/myAccount/baseConsole')
              })
            }
          } else if (res.msg) {
            window.layer.msgWarn('失败：' + res.msg)
          }
        })
      },
      // 根据输入的前十位10号匹配出银行名称
      getBankName (newVal) {
        this.tempValue = newVal.slice(0, 10) // 截取卡号前10位
        this.timer = setTimeout(() => { // 防止一直请求计算
          for (let i = this.tempValue.length; i >= 6; i--) { // 10到6 位的匹配查找数据
            let currentVal = this.tempValue.slice(0, i) // 10 到6位的数据
            this.bankList.forEach((item) => { // 根据银行卡列表this.bankList匹配循环查找
              if (item.binCode) { // binCode 后台传过来的数据有的没有binCode 如果有binCode的参与查找，如果没有就不参与查找
                let binCodeArr = item.binCode.split(',') // 字符串截取成数组 一个一个的判断 是否与前端输入的有匹配
                for (let m = 0; m < binCodeArr.length; m++) {
                  if (binCodeArr[m] === currentVal) {
                    this.itemArr.push(item)
                    console.log(item)
                  }
                }
              }
            })
            console.log(this.itemArr)
            // 匹配时如果匹配到多个值，则不自动带出
            if (this.itemArr.length === 1) {
              this.nowBankId = this.itemArr[0].id
            } else {
              this.nowBankId = ''
            }
            if (this.itemArr.length > 0) {
              break
            }
          }
        }, 100)
      },
      ...mapActions({
        initBankList: types.GETBANAKLIST_ACTION // 初始化银行信息列表
      })
    },
    watch: {
      nowBankId (v) {
        if (v) {
          this.delay()
        }
      },
      bankAccountNO (newVal, oldVal) {
        this.bindInfo.bankAccount = newVal
        // console.log(v1, v2)
        if (this.timer) {
          clearTimeout(this.timer)
        }
        if (newVal.length < 10) {
          this.selectedBank = ''
          this.bankId = ''
          this.itemArr = []
          this.tempValue = null
        } else if (newVal.length === 10 && !this.isDisableBank) { // isDisableBank 如果后端已经设置银行卡名称则不根据卡号匹配银行名称
          // 根据输入的前十位10号匹配出银行名称
          this.getBankName(newVal)
        }
      }
    },
    mounted () {
      var $this = this
      document.onclick = () => { // 点击空白区域隐藏键盘
        if (this.showDrawKey) {
          this.showDrawKey = false
          // 检查提款密码
          this.drawMoneyFN()
        }
      }
      //
      /* init render
      *  onlineDraw 返回数据 来渲染页面
      * */
      console.log(this.onlineDraw, '----------')
      if (!this.onlineDraw) return ''
      // 存在 用户的信息
      let memberInfo = this.onlineDraw.memberInfo
      if (memberInfo) {
        // 存在 银行
        if (memberInfo.bankId) {
          this.isDisableBank = true
          this.nowBankId = memberInfo.bankId
        }
        if (memberInfo.bankAccount) {
          this.disabledBankAccount = true
          this.bankAccountNO = memberInfo.bankAccount
        }
        // this.bindInfo.bankAccount = memberInfo.bankAccount
        // if (this.bindInfo.bankAccount) {
        // this.disabledBankAccount = true
        // this.bindInfo.bankAccount = memberInfo.bankAccount
        // }
        // 如果存在 drawMoneyPwd
        if (memberInfo.drawMoneyPwd) {
          this.disabledDrawMoneyPwd = true
        }
        this.bindInfo.prov = memberInfo.province ? memberInfo.province : ''
        this.bindInfo.city = memberInfo.city ? memberInfo.city : ''

        if (this.bindInfo.prov) {
          this.disabledBankProv = true
        }
        if (this.bindInfo.city) {
          this.disabledBankCity = true
        }
        if (memberInfo.cardName) {
          this.realName = memberInfo.cardName
          delete this.errMsg.realName
        }
      }

      // 请求 获取银行列表
      this.$store.dispatch('shareApi.getBankList.action', {versionFun: true}).then(res => {
        $this.bankList = res.data.bankList
      })
    },
    computed: {
      onlineDraw () {
        return this.$store.state.payment.onlineDraw
      },
      ...mapState({
        bankListStore: state => state.shareApi.bankList // 获取银行卡列表
      })
    }
  }
</script>
