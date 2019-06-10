<template>
    <div page="online">
        <h2><span>请填写存款金额：</span></h2>

        <!-- 转账表单统一样式 -->
        <div class="changePassword">
            <form>
                <div class="formItem" v-if="payType.typeCode === bankCode">
                    <span class="formTile">入款订单号：</span>
                    <div class="formInline">
                        <el-input :placeholder="offlineDeposit.orderNo"
                            size="medium" type="text" :disabled="true">
                        </el-input>
                    </div>
                </div>

                <!--转账类型需要处理收款人-->
                <div class="formItem" v-if="payType.companyChargeType === 2">
                    <span class="formTile">
                      收款人<span v-if="!offlineDeposit.onlineBankAccount">{{getInfo.depositBankValue}}</span><span v-else>银行</span>账号：
                      </span>
                    <div class="formInline">
                        <el-input :placeholder="accountText" size="medium" type="text" :disabled="true"></el-input>
                    </div>
                </div>

                <!--
                云闪付入款名称默认为空，但是如果有设置，前端需要显示该字段；
                之前代码 v-if="this.payType.typeCode !== 25 && this.payType.typeCode !== 26"
                -->
                <div class="formItem" v-if="payType.incomeName">
                    <span class="formTile">
                        <span class="orange">*</span>
                        {{this.payType.incomeName}}：
                    </span>
                    <div class="formInline">
                        <el-input size="medium" type="text"
                            v-model="userCardName" maxlength="30"
                            :placeholder="'请输入'+payType.incomeName"
                            @keyup.native='noSpace("userCardName")'>
                        </el-input>
                    </div>
                </div>

                <div class="formItem">
                    <span class="formTile"><span class="orange">*</span> 入款金额：</span>
                    <div class="formInline">
                      <div class="el-input el-input--medium">
                        <input class="el-input__inner" type="text"
                            :placeholder="place" v-model="amount"
                            @input="inputMoney(amount)" maxlength="14"
                            :class="amountErrFlag?'error':''"/>
                        <span class="drawErr" v-if="amountErrFlag">
                            <i class="yo-plaintFull el-icon-plaintFull"></i>
                            <span class="orange">{{amountErrMsg}}</span>
                        </span>
                      </div>
                    </div>
                </div>

                <!--快选金额
                逻辑和 h5 一直
                item 数据不规范 有时非数字
                -->
                <div class="formItem" v-if="payType && payType.isShowFlag === '1'">
                  <ul class="formInline amountSum">
                    <li :class=" index === curQuickPrice ? 'cur' : '' "
                      v-for="(item,index) in payType.quickPrice.split(',')"
                      v-if="item > 0 && (item <= payType.deposite.max && item >= payType.deposite.min)"
                      :key="index" @click="changeQuickPrice(index,item)">
                        {{item}}
                      </li>
                  </ul>
                </div>

                <div class="formItem" v-show="discountFun">
                    <span class="formTile"><span class="orange">*</span> 申请优惠：</span>
                    <div class="formInline">
                        <el-select placeholder="申请优惠"
                            v-model="discount" :disabled="applyDiscount" @change="toDiscount()">
                            <el-option v-for="(item,indexs) in discountList"
                                :key="item.key"
                                :label="item.label"
                                :value="item.key">
                            </el-option>
                        </el-select>
                        <span>
                            <span class="inferior">
                                （优惠<font class="orange">{{offer}}</font>,
                                <font class="orange" v-if="this.companyCodeQuantitySet.statusCompCompany === 1">{{this.companyCodeQuantitySet.codeMultiple}}</font>
                                <font class="orange" v-else>0</font>倍打码）
                            </span>
                        </span>
                    </div>
                </div>

                <div class="formItem" v-if="payType.typeCode === bankCode">
                    <span class="formTile">入款时间：</span>
                    <div class="formInline formInline2">
                        <el-input  class="inputText-2" :placeholder="nowDate" size="small"
                            type="text" :disabled="true"></el-input>
                        <el-select class="selectSt-2" placeholder="时" size="small"
                            v-model="hourTime">
                            <el-option v-for="num in 24"
                                :key="num < 10 ? '0' + num : num"
                                :label="num < 10 ? '0' + num : num"
                                :value="num < 10 ? '0' + num : num">
                            </el-option>
                        </el-select>
                        <el-select class="selectSt-2" placeholder="分" size="small"
                            v-model="minuteTime">
                            <el-option v-for="num in 59"
                                :key="num < 10 ? '0' + num : num"
                                :label="num < 10 ? '0' + num : num"
                                :value="num < 10 ? '0' + num : num">
                            </el-option>
                        </el-select>
                        <span>
                            <span class="inferior">（可设置当地时间小时和分）</span>
                        </span>
                    </div>
                </div>

                <div class="formItem" v-if="payType.typeCode !== bankCode">
                    <span class="formTile">
                        <span class="orange">*</span> 入款时间：
                    </span>
                    <div class="formInline">
                        <el-input v-model="depositTime" size="medium" type="text" @focus="setDepositTime()"></el-input>
                        <span>
                            <span class="inferior">（例如 2018-10-06 07:27 北京时间）</span>
                        </span>
                    </div>
                </div>

                <div class="formItem" v-if="payType.typeCode === bankCode">
                    <span class="formTile">
                        <span class="orange">*</span> 入款银行：
                    </span>
                    <div class="formInline">
                        <el-select v-model="nowBankId" filterable>
                            <el-option v-for="(bankInfo,index) in allBankList"
                                :key="bankInfo.id"
                                :label="bankInfo.bankname"
                                :value="bankInfo.id"
                                @click="chooseBankInfo(bankInfo)">
                            </el-option>
                        </el-select>
                    </div>
                </div>

                <div class="formItem" v-if="payType.typeCode === bankCode">
                    <span class="formTile">
                        <span class="orange">*</span> 入款方式：
                    </span>
                    <div class="formInline">
                        <el-select size="small" v-model="depositType">
                            <el-option v-for="(deposit,indexs) in payMent.depositType"
                                :key="deposit.depositId"
                                :label="deposit.depositName"
                                :value="deposit.depositId">
                            </el-option>
                        </el-select>
                    </div>
                </div>

                <div class="formItem" v-if="this.depositType === 1 || this.depositType === 2 || this.depositType === 3">
                    <span class="formTile">
                        <span class="orange">*</span> 所属分行：
                    </span>
                    <div class="formInline">
                        <el-input v-model="userDepositSubbranch" size="medium" type="text" maxlength="30"
                        @keyup.native='noSpace("userDepositSubbranch")'></el-input>
                    </div>
                </div>

                <div class="formItem" v-if="payType.typeCode === bankCode">
                    <span class="formTile">备注：</span>
                    <div class="formInline">
                        <el-input v-model="remark" size="medium" type="text" maxlength="30"
                        @keyup.native='noSpace("remark")'></el-input>
                    </div>
                </div>
                <div class="formItem">
                    <span class="formTile"></span>
                    <div class="formInline">
                        <el-button type="primary" @click="submitPc()">{{buttonMsg}}</el-button>
                        <el-button type="primary" @click="empty()">重置</el-button>
                    </div>
                </div>
                <div class="formItem">
                    <span class="formTile"></span>
                    <div class="formInline">
                        <table class="warmPrompt">
                            <tr><td style="width: 66px;">温馨提示:</td></tr>
                            <tr><td></td><td>1、请准确填写转账金额与时间</td></tr>
                            <tr><td></td><td>2、每笔转账请提交一次，不要重复提交</td></tr>
                            <tr v-if="payType.typeCode === bankCode"><td></td><td>3、若您使用ATM存款，请填写ATM所属分行，会加快您的到账时间。</td></tr>
                        </table>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
  import * as type from '@m/store/payment/type'
  import * as cookieUtil from '@m/utils/cookieUtil'
  import * as payMents from '@m/config/payMent'
  import dayjs from 'dayjs'
  import payment from '@s/components/payment/offlinePay.js' // 抽出支付公共js函数
  import * as shareTypes from '@s/store/shareApi/type'
  export default {
    mixins: [payment],
    data () {
      return {
        payMent: payMents, // 存款方式选择，写死的
        nowDate: cookieUtil.getNowDayFormatDate(),
        hourTime: '00', // 小时默认值
        minuteTime: '00', // 分钟默认值
        nowBankId: 1, // 当前选中的银行id,默认为农业银行
        depositType: 0, // 入款方式，默认为网银转账
        remark: '', // 备注
        userDepositSubbranch: '', // 所属分行
        userCardName: '', // 入款人姓名
        bankName: '中国农业银行', // 默认选中银行
        amount: '', // 金额
        isOpen: true,
        buttonMsg: '确定',
        depositTime: '', // 入款时间
        discountList: [
          {
            label: '申请',
            key: true
          },
          {
            label: '不申请',
            key: false
          }
        ],
        bankCode: 16 // 银行入款编号
      }
    },
    methods: {
      chooseBankInfo (bankInfo) {
        this.bankName = bankInfo.bankName
      },
      // 重置
      empty () {
        this.userCardName = ''
        this.amount = null
        this.discount = '申请'
        if (this.bankType === 0) {
          this.hourTime = '00'
          this.minuteTime = '00'
        }
        this.nowBankId = 1
        this.depositType = 0
        this.remark = ''
        this.userDepositSubbranch = ''
        this.bankName = '中国农业银行'
        let curTime = new Date()
        this.depositTime = dayjs(curTime).format('YYYY-MM-DD HH:mm:ss')
      },
      setDepositTime (v) {
        let curTime = new Date()
        this.depositTime = dayjs(curTime).format('YYYY-MM-DD HH:mm:ss')
      },
      // 提交
      submitPc () {
        if (this.isOpen) {
          this.buttonMsg = '提交中...'
          // 云闪付不需要验证存款名
          if ((this.payType.typeCode !== 25 || this.payType.typeCode !== 26) && this.payType.incomeName) {
            // 验证存款名
            if (this.trimStr(this.userCardName) === '' || this.userCardName.length > 30) {
              this.buttonMsg = '确定'
              window.layer.msgWarn('请您输入' + this.payType.incomeName)
              return false
            }
            if (this.userCardName.indexOf('<') >= 0 || this.userCardName.indexOf('>') >= 0) {
              window.layer.msgWarn('汇款姓名格式不正确！')
              this.buttonMsg = '确定'
              return false
            }
          }
          // 最低金额
          let minDepositCompany = parseFloat(this.companyCodeQuantitySet.minDepositCompany)
          // 最高金额
          let highDepositCompany = parseFloat(this.companyCodeQuantitySet.highDepositCompany)
          if (!this.amount) {
            this.buttonMsg = '确定'
            window.layer.msgWarn('请您输入充值金额')
            return false
          }
          if (this.amount < minDepositCompany) {
            window.layer.msgWarn('最低金额' + minDepositCompany)
            this.buttonMsg = '确定'
            return false
          }
          this.amount = parseFloat(this.amount)
          if (this.amount > highDepositCompany) {
            this.buttonMsg = '确定'
            window.layer.msgWarn('最高金额' + highDepositCompany)
            return false
          }
          if (this.remark.indexOf('<') >= 0 || this.remark.indexOf('>') >= 0) {
            window.layer.msgWarn('汇款留言格式不正确！')
            this.buttonMsg = '确定'
            return false
          }
          // 存款方式为ATM存款等需要填写分行
          if (this.offlineDeposit.depositId === 1 || this.offlineDeposit.depositId === 2 || this.offlineDeposit.depositId === 3) {
            this.re = new RegExp('^[ ]+$')
            if (this.userDepositSubbranch === '') {
              this.buttonMsg = '确定'
              window.layer.msgWarn('所属分行不可为空！')
              return false
            } else {
              if (this.re.test(this.userDepositSubbranch)) {
                this.buttonMsg = '确定'
                window.layer.msgWarn('所属分行不可为空！')
                return false
              }
            }
            if (this.userDepositSubbranch.indexOf('<') >= 0 || this.userDepositSubbranch.indexOf('>') >= 0) {
              window.layer.msgWarn('所属分行格式不正确！')
              this.buttonMsg = '确定'
              return false
            }
          }
          let data = {}
          // 金额
          data.depositMoney = this.amount
          // 备注
          data.remark = this.remark
          // 订单号，后台生成
          data.orderno = this.offlineDeposit.orderNo
          // 存款名
          data.userCardName = this.userCardName
          // 当前支付的类型参数
          let payInfo = this.getInfo
          // 银行转账方式
          if (this.payType.companyChargeType === 0) {
          // 选择的存款方式id
            if (this.offlineBankInfo.depositId === undefined) {
              data.userDepositType = this.depositType
            } else {
              data.userDepositType = this.offlineBankInfo.depositId
            }
            // 选择的存款方式名称
            data.userDepositValue = this.offlineBankInfo.depositName
            // 当前使用的银行卡名称
            data.depositBankValue = this.offlineBankInfo.bankName
          } else {
            let _obj = {}
            // 1：扫码支付，2：好友转账
            if (this.payType.companyChargeType === 1) {
              _obj = payInfo.scan
            } else {
              _obj = payInfo.transfer
            }
            // 当前使用的银行卡名称
            data.depositBankValue = _obj.depositBankValue === undefined ? this.getInfo.depositBankValue : _obj.depositBankValue
            // 选择的存款方式名称
            data.userDepositValue = _obj.userDepositValue
            // 选择的存款方式id
            data.userDepositType = _obj.userDepositType
          }
          // 当前使用的银行卡key
          data.depositBank = this.nowBankId
          // 当前选择的厅主帐号ID 线下入款必填
          data.companyAccountId = this.offlineDeposit.companyAccountId
          // 当前选择的厅主帐号银行卡名称
          data.companyAccountValue = this.offlineDeposit.bankName
          // 当前选择的厅主银行卡帐号
          data.mbankaccount = this.offlineDeposit.mbankaccount
          // 当前选择的厅主银行卡帐号用户名
          data.chamberlain = this.offlineDeposit.chamberlain
          // 银行卡id 赋值 data
          if (this.payType.typeCode === 16) {
          // 当前的银行卡id
            data.bankId = this.offlineDeposit.bankId
          } else {
            data.bankId = 1
          }
          // 银行入款需要手动拼接时间
          if (this.payType.typeCode === this.bankCode) {
            let times = this.nowDate + ' ' + this.hourTime + ':' + this.minuteTime + ':00'
            data.writeTime = times
          } else {
            data.writeTime = this.depositTime
          }
          // 是否银行类型的标记
          data.isbank = '0'
          // 所属分行
          data.userDepositSubbranch = this.userDepositSubbranch
          // 是否申请优惠，1：申请，0：不申请
          data.abandon = this.discount ? 1 : 0
          // 统一 + typeCode
          data.typeCode = this.payType.typeCode
          // 验证银行卡信息
          if (data.depositBank === '' || data.companyAccountId === '' || data.userDepositType === '') {
            this.buttonMsg = '确定'
            window.layer.msgWarn('银行信息不能为空！')
            return false
          }
          this.buttonMsg = '确定'
          if (!window.navigator.onLine) {
            window.layer.msgWarn('网络连接异常，请检查您的网络！')
          } else {
            this.$store.dispatch(type.SAVE_COMPANY_DEPOSIT_ACTION, data).then(res => {
              if (res.status === '0') {
                window.layer.msgWarn('提交申请成功，财务将在1-3分钟内为您添加额度，请稍等！', function () {
                  window.router.push('/center/myAccount/baseConsole')
                })
              } else {
                window.layer.msgWarn('失败: ' + res.data.msg)
                return false
              }
            }).catch(res => {
              console.log(' INITPAYMENT store error')
            })
            // 限制两秒才允许再次点击
            this.isOpen = false
            setTimeout(() => {
              this.isOpen = true
            }, 1500)
          }
        }
      }
    },
    computed: {
      accountText () {
        let account = ''
        // 扫码类型
        if (this.payType.companyChargeType === 0) {
          account = this.offlineDeposit.chamberlain
        } else {
          // 好友转账
          if (this.offlineDeposit.onlineBankAccount) {
            account = this.offlineDeposit.onlineBankAccount
          } else {
            account = this.offlineDeposit.mbankaccount
          }
        }
        return account
      }
    },
    mounted () {
      this.setDepositTime()
      this.hourTime = dayjs().hour()
      this.minuteTime = dayjs().minute()
      if (dayjs().hour() < 10) {
        this.hourTime = '0' + dayjs().hour()
      }
      if (dayjs().minute() < 10) {
        this.minuteTime = '0' + dayjs().minute()
      }
      this.$store.dispatch(shareTypes.GETBANAKLIST_ACTION, {versionFun: true}).then(res => {
      // 线下入款银行卡数据
        this.$store.state.payment.allBankList = res.data.bankList
        if (res.data.bankList[0] !== undefined) {
          this.nowBankId = res.data.bankList[0].id
        }
      })
    }
  }
</script>
