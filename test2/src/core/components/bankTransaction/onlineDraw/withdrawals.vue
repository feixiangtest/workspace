<template>
  <div class="changePassword">
    <form>
      <!-- 取款操作时的银行卡信息 -->
      <div class="formItem"><span class="formTile">银行信息：</span>
        <div class="formInline">
          <div class="el-input el-input--medium">
            <div class="itemContent"></div>
            <el-input v-model="bankInfo" size="medium" type="text" :disabled="true"></el-input>
          </div>
          <span><i class="yo-icon"></i></span></div>
      </div>
      <div class="formItem"><span class="formTile">银行账号：</span>
        <div class="formInline">
          <div class="el-input el-input--medium">
            <div class="itemContent"></div>
            <el-input v-model="bankNO" size="medium" type="text" :disabled="true"></el-input>
          </div>
          <span><i class="yo-icon"></i></span></div>
      </div>
      <div class="formItem"><span class="formTile">提款人：</span>
        <div class="formInline">
          <div class="el-input el-input--medium">
            <el-input v-model="onlineDraw.memberInfo.cardName" size="medium" type="text" :disabled="true"></el-input>
          </div>
          <span><i class="yo-icon"></i></span></div>
      </div>
      <div class="formItem"><span class="formTile">账户余额：</span>
        <div class="formInline">
          <div class="el-input el-input--medium">
            <el-input v-model="Number(onlineDraw.money).toFixed(2)" size="medium" type="text" :disabled="true"></el-input>
          </div>
          <span><i class="yo-icon"></i></span></div>
      </div>
      <div class="formItem"><span class="formTile"><span class="red-sign">*</span> 取款密码：</span>
        <div class="formInline">
          <div class="el-input el-input--medium">
            <input style="width: 292px;"
                   size="medium" type="password" class="el-input__inner"
                   maxlength="4"
                   placeholder="请输入取款密码"
                   v-model="drawMoneyPwd"
                   @keyup='toNumber("drawMoneyPwd")'
                   @click.stop='openKeyBoard("showDrawKey") '
                   readonly="readonly">
            <!-- 取款密码数字键盘 -->
            <key-board :inputData='confirmPwd' :keyNum='setDrawPwdCode' :clickNum='setDrawConfirmPwd' v-if='showDrawKey' :clear="clearNewDrawPwd"></key-board>
            <span class="pwErr" :class="pwErr.css" v-if="pwErr.err">{{pwErr.text}}</span>
          </div>
          <span><i class="yo-icon"></i></span>
        </div>
      </div>
      <div class="formItem"><span class="formTile"><span class="red-sign">*</span> 取款金额：</span>
        <div class="formInline">
          <div class="el-input el-input--medium">
            <input type="text" class="el-input__inner" v-model="drawMoney" @input="drawMoneyInput" maxlength="10">
            <span class="drawErr" v-if="drawErr.err">{{drawErr.text}}</span>
          </div>
          <div class="placelimt">
            {{ place }}
          </div>
        </div>
      </div>
      <div class="formItem"><span class="formTile"></span>
        <div class="formInline">
          <button type="button" class="el-button el-button--primary" @click="submit()"><span>确认</span></button>
          <button type="button" class="el-button el-button--primary" @click="clean()"><span>重置</span></button>
        </div>
      </div>
      <!-- 取款操作 温馨提示部分 -->
      <div class="formItem">
        <span class="formTile"></span>
        <div class="formInline">
          <table class="c3 warmPrompt">
            <tr>
              <td style="width: 80px;">温馨提示 ：</td>
              <td>提款前,您必须至少完成100%存款额的投注!</td>
            </tr>
            <tr>
              <td></td>
              <td>在使用过程中,如有任何疑问请随时联系在线客服</td>
            </tr>
            <tr class="orange">
              <td></td>
              <td>最低提款: {{ onlineDraw.quantitySet.drawLowOnline }}RMB</td>
            </tr>
            <tr class="orange">
              <td></td>
              <td>服务费用: 免费</td>
            </tr>
            <tr>
              <td></td>
              <td>处理时间: 3-10分钟<br>
                在公司有关部门审阅并核实后, 系统会把提款资金从您的游戏帐号转账到您的银行
              </td>
            </tr>
          </table>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
  import * as type from '@m/store/payment/type'
  import keyBoard from '@s/components/doc/keyBoard.vue' // 取款密码的键盘
  export default {
    data () {
      return {
        confirmPwd: '', // 初始化 提款密码
        showDrawKey: null, // 提款密码 不显示
        drawMoney: '', // 出款金额
        drawMoneyPwd: '', // 出款密码
        buttonMsg: '提交',
        drawErr: {
          css: '',
          err: '',
          text: ''
        },
        pwErr: {
          css: '',
          err: '',
          text: ''
        },
        isOpen: true // 用于限制点击过快处理
      }
    },
    components: { keyBoard },
    watch: {
      // 监听输入的密码数据，如果格式正确，就设置输入框后面的样式为correctStyle，反之errorStyle
      drawMoneyPwd (v) {
        // 检查取款密码
        let $this = this
        $this.pwErr.css = ''
        $this.pwErr.err = ''
        $this.pwErr.text = ''
        if ($this.drawMoneyPwd.length === 4) {
          // 不延时 页面会卡住 ajax请求是同步的
          setTimeout(() => {
            $this.checkpw()
          }, 8)
        }
      }
    },
    methods: {
      goback () {
        this.$router.go(-1)
      },
      checkpw () {
        // 检查取款密码
        let $this = this
        let _res = window.$.httpAsync('/member/drawMoney/checkDrawPassword', {
          'drawPwd': $this.drawMoneyPwd
        })
        $this.pwErr.err = true
        $this.pwErr.text = _res.msg
        $this.pwErr.css = 'pwok'
        if (_res.code === 1) {
          $this.pwErr.css = 'red'
        }
        return _res.code
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
      // 重置清空密码
      clearNewDrawPwd (v) {
        this.drawMoneyPwd = this.confirmPwd = ''
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
          this.drawMoneyPwd = this.confirmPwd.toString().replace(/[^\d]+/g, '').slice(0, 4)
        }
      },
      // 设定只能输入数字，并且不超过4位
      toNumber (v) {
        this[v] = this[v].toString().replace(/[^\d]+/g, '').slice(0, 4)
      },
      // 打开相对应的键盘
      openKeyBoard (v) {
        this.showDrawKey = false
        this.confirmPwd = ''
        this[v] = true
        // if (this.drawMoneyPwd) this.confirmPwd = this.drawMoneyPwd
      },
      clean () {
        this.drawMoney = ''
        this.drawMoneyPwd = ''
        this.clearNewDrawPwd()
      },
      // 初始化数据
      initDrawData () {
        this.$store.dispatch(type.INIT_DRAW_DATA_ACTION, { bankType: 0 })
      },
      /**
       * 出款输入框验证
       */
      drawMoneyInput () {
        this.drawErr.css = ''
        this.drawErr.err = ''
        this.drawErr.text = ''
        if (this.drawMoney === '' || this.drawMoney === null) {
          return
        }
        try {
          this.drawMoney = this.drawMoney.replace(/[^0-9]+/g, '')
        } catch (e) {
        }
        if (this.drawMoney < 0) {
          this.drawMoney = 0
        } else {
          if (this.drawMoney !== '') {
            this.drawMoney = Number(this.drawMoney)
          }
        }
        // 上线
        if (this.drawMoney > this.onlineDraw.quantitySet.drawUpOnline) {
          this.drawErr.err = true
          this.drawErr.text = '取款金额不能大于 ' + Number(this.onlineDraw.quantitySet.drawUpOnline).toFixed(2) + ' 元'
        }
        // 取款金额不能大于 xxx.00元
        if (this.drawMoney > this.onlineDraw.money) {
          this.drawErr.err = true
          this.drawErr.text = '余额不足'
        }
        // 下线
        if (this.drawMoney < this.onlineDraw.quantitySet.drawLowOnline) {
          this.drawErr.err = true
          this.drawErr.text = '取款金额不能小于 ' + Number(this.onlineDraw.quantitySet.drawLowOnline).toFixed(2) + ' 元'
        }
        if (this.drawErr.text) {
          return false
        }
        return true
      },
      submit () {
        // 这里同步 ajax 会卡前面的 判断
        if (this.checkpw() >= 1) {
          window.layer.msgWarn(this.pwErr.text)
          return false
        }
        this.drawMoneyInput()
        if (!this.drawMoney) {
          window.layer.msgWarn('最低提款金额为：' + this.onlineDraw.quantitySet.drawLowOnline + ' 元')
          this.drawErr.err = true
          this.drawErr.text = '最低提款金额为：' + this.onlineDraw.quantitySet.drawLowOnline + ' 元'
          return false
        }
        if (this.drawMoney < this.onlineDraw.quantitySet.drawLowOnline) {
          window.layer.msgWarn('最低提款金额为：' + this.onlineDraw.quantitySet.drawLowOnline + ' 元')
          return false
        }
        if (this.drawMoney > this.onlineDraw.quantitySet.drawUpOnline) {
          window.layer.msgWarn('最高提款金额为：' + this.onlineDraw.quantitySet.drawUpOnline + ' 元')
          return false
        }
        if (this.drawMoneyPwd.length !== 4) {
          window.layer.msgWarn('请输入4位取款密码！')
          return false
        }
        // 金额太小不允许提款
        if (this.drawMoney > this.onlineDraw.money) {
          window.layer.msgWarn('当前余额不足')
          return false
        }
        if (this.isOpen) {
          // 判断如果有手续费，需要提示给客户在做提款操作
          let sxh = this.onlineDraw.quantitySet.moneyDraw1
          if (sxh > 0) { // && this.type !== '2'
            let repeatTimeNumDraw = this.onlineDraw.quantitySet.repeatTimeNumDraw
            let freeTimesDraw = this.onlineDraw.quantitySet.freeTimesDraw
            var msg = '您好，由于您在' + repeatTimeNumDraw + '小时超出免收出款手续费' + freeTimesDraw + '次，本次出款将收取您取款手续费' + sxh + '元！'
            window.layer.confirm(msg, () => {
              this.submitRequest()
            })
          } else {
            this.submitRequest()
          }
        }
      },
      submitRequest () {
        let param = {
          drawPwd: this.drawMoneyPwd, // 取款密码
          currentTime: '',
          bankType: '0',
          cash: this.drawMoney // 取款金额
        }
        let $this = this
        // 提交取款申请
        this.$store.dispatch(type.DRAW_MONEY_ACTION, param).then(res => {
          if (res.status === '0') {
            let cueDrawCheck = this.onlineDraw.quantitySet.cueDrawCheck
            let moneyDrawCheck = this.onlineDraw.quantitySet.moneyDrawCheck
            let timeNumDrawCheck = this.onlineDraw.quantitySet.timeNumDrawCheck
            if (cueDrawCheck === 1 && this.drawMoney >= moneyDrawCheck) {
              let content = '您提款的金额达到' + moneyDrawCheck + '需要审核，将于' + timeNumDrawCheck + '小时内到账，请耐心等候！'
              window.layer.msgWarn(content, function () {
                $this.initDrawData()
              })
            } else {
              window.layer.msgWarn('已提交成功，请等待系统管理员稽核！', function () {
                $this.initDrawData()
              })
            }
            this.clean()
          }
          if (res.status === '1') {
            window.layer.msgWarn(res.msg, function () {
              $this.initDrawData()
              // window.router.push('/member/myAccount/baseConsole')
            })
          }
        }).catch(res => {
          console.log(' DRAW_MONEY_ACTION store error')
        })
        // 限制两秒才允许再次点击开奖结果
        this.isOpen = false
        setTimeout(() => {
          this.isOpen = true
          this.buttonMsg = '提交'
        }, 1500)
      }
    },
    computed: {
      onlineDraw () {
        return this.$store.state.payment.onlineDraw
      },
      bankInfo () {
        try {
          return this.onlineDraw.memberBankName +
            (this.onlineDraw.memberInfo.province ? `-` + this.onlineDraw.memberInfo.province + `-` : '') +
            (this.onlineDraw.memberInfo.city ? `-` + this.onlineDraw.memberInfo.city : ' ')
        } catch (e) {
          return ''
        }
      },
      bankNO () {
        return this.onlineDraw.memberInfo.bankAccount
      },
      type () {
        return this.$store.state.home.type
      },
      money () {
        if (this.$store.state.account && this.$store.state.account.money) {
          return this.$store.state.account.money
        }
        return null
      },
      place () {
        try {
          return '出款上限: ' + Number(this.onlineDraw.quantitySet.drawUpOnline).toFixed(2) + ' 元,  出款下限: ' + Number(this.onlineDraw.quantitySet.drawLowOnline).toFixed(2) + ' 元'
        } catch (e) {
          return ''
        }
      }
    },
    mounted () {
      document.onclick = () => { // 点击空白区域隐藏键盘
        if (this.showDrawKey) {
          this.showDrawKey = false
        }
      }
    }
  }
</script>
