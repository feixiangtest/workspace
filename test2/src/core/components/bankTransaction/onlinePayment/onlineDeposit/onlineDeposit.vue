<template>
    <div>
        <!-- 在线支付详情 -->
        <div class="publicBox">
            <div class="text-right">
                <el-button @click="goTop()">返回上一级</el-button>
            </div>

            <!--在线文案-->
            <div v-if="payType && payType.contextSim && payType.useStatus > 0">
                <div v-html="payType.contextSim"></div>
            </div>

            <div class="publicPayMain">
                <h2><span>填写存款金额：</span></h2>
                <div class="changePassword">
                    <form>
                        <div class="formItem">
                            <span class="formTile">存款账号：</span>
                            <div class="formInline">
                                <el-input :placeholder="account.account" size="medium" type="text" :disabled="true"></el-input>
                            </div>
                        </div>
                        <div class="formItem" v-if="this.payType.typeCode === 1">
                            <span class="formTile">
                              <span class="orange">*</span>支付金额：
                            </span>
                            <div class="formInline">
                                <el-input :placeholder="amount" size="medium" type="text" :disabled="true"></el-input>
                            </div>
                        </div>
                        <div class="formItem">
                            <span class="formTile">
                              <span class="orange">*</span>
                              {{this.payType.typeCode === 1 ? '卡面额值' : '存款金额'}}：
                            </span>
                            <div class="formInline">
                                <div class="el-input el-input--medium el-input-group el-input-group--append">
                                  <input autocomplete="off" class="el-input__inner"
                                    type="text" :placeholder="place"
                                    :class="amountErrFlag?'error':''"
                                     v-model="amount" maxlength="14"
                                     @input="inputMoney(amount)"
                                     :disabled="payType.depositListVo.merchant.isOpenAmountInput === '0'">
                                  <div class="el-input-group__append"
                                    v-if="this.payType.depositListVo.merchant !== undefined
                                    && this.payType.depositListVo.merchant.isOpenPointAmount === '1'">
                                    {{amountPoint}}
                                  </div>
                                </div>
                                <span v-if="amountErrFlag">
                                    <i class="yo-plaintFull el-icon-plaintFull"></i>
                                    <span class="orange">{{amountErrMsg}}</span>
                                </span>
                            </div>
                        </div>

                        <!--快选金额
                          逻辑和 h5 一直
                          item 数据不规范 有时非数字
                        -->
                        <div class="formItem" v-if="this.payType.isShowFlag === '1'">
                          <ul class="formInline amountSum">
                            <li :class=" index === curQuickPrice ? 'cur' : '' "
                              v-for="(item,index) in payType.quickPrice.split(',')"
                              v-if="item > 0 && (item <= payType.deposite.max && item >= payType.deposite.min)"
                              :key="index" @click="changeQuickPrice(index,item)">
                                {{item}}
                              </li>
                          </ul>
                        </div>

                        <div class="formItem" v-if="this.payType.typeCode === 1">
                            <div class="formInline">
                                <span>
                                    <span class="inferior">
                                        注意：卡面额值与实际充值卡的金额不一致时充值无效
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div class="formItem" v-show="discountFun">
                            <span class="formTile"><span class="orange">*</span> 申请优惠：</span>
                            <div class="formInline">
                                <el-select placeholder="申请优惠"
                                    v-model="discount" :disabled="applyDiscount">
                                    <el-option label="申请" value="1" key="申请"></el-option>
                                    <el-option label="不申请" value="0" key="不申请"></el-option>
                                </el-select>
                                <span>
                                    <span class="inferior">
                                        （优惠<font class="orange">{{offer}}</font>,
                                        <font class="orange" v-if="this.onlineCodeQuantitySet.statusCompOnline === 1">{{this.onlineCodeQuantitySet.codeMultiple}}</font>
                                        <font class="orange" v-else>0</font>倍打码）
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div class="formItem" v-if="this.payType.typeCode === 1">
                            <span class="formTile">
                              <span class="orange">*</span>卡面列号：
                            </span>
                            <div class="formInline">
                                <el-input size="medium" type="text" v-model="cardAccount" @keyup.native='noSpace("cardAccount")'>
                                </el-input>
                            </div>
                        </div>
                        <div class="formItem" v-if="this.payType.typeCode === 1">
                            <span class="formTile">
                              <span class="orange">*</span>卡密码：
                            </span>
                            <div class="formInline">
                                <el-input size="medium" type="text" v-model="cardPassword" @keyup.native='noSpace("cardPassword")'>
                                </el-input>
                            </div>
                        </div>
                        <div class="formItem"
                           v-if="this.payType.typeCode === 0 || this.payType.typeCode === 1">
                            <span class="formTile">
                              <span class="orange">*</span>选择{{this.payType.typeCode === 0?'银行':'通道'}}：
                            </span>
                            <div class="formInline">
                              <el-select v-model="bankKey" filterable
                                :placeholder="bankStr" :disabled="bankStr!=='请选择'" @change="changeBank(bankKey)">
                                <el-option
                                  v-for="item in this.payType.depositListVo.merchant.bankStatusList"
                                  :key="item.bankId"
                                  :label="item.bankName"
                                  :value="item.bankId">
                                </el-option>
                              </el-select>
                            </div>
                        </div>
                        <div class="formItem" style="padding-left: 160px;" v-if="this.payType.typeCode === 1 && this.feeMoney > 0">
                          <span style="color:red;font-weight:bold;">需要<span>{{payType.depositListVo.merchant.bankStatusList[currFeeIndex].feeRate}}</span>%的手续费。</span><br/>
                          <span style="color:red;font-weight:bold;">手续费金额：<span>{{feeMoney}}</span>元。</span>
                        </div>
                    </form>
                </div>

                <div class="text-center affirmBut">
                    <el-button type="primary" @click="payResult()" :disabled="amountStatus">确定</el-button>
                    <el-button type="primary" @click="reset()">重置</el-button>
                    <p class="">温馨提示：标记有 <span class="orange">*</span> 均为必填项目，请认真填写</p>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
import Vue from 'vue'
import * as types from '@m/store/payment/type'
import { mapState } from 'vuex'
import payment from '@s/components/payment/onlinePay.js' // 抽出支付公共js函数
import {Select} from 'element-ui'
Vue.use(Select)
export default {
  data () {
    return {
      amount: null, // 金额
      amountErrFlag: false, // 金额提示语状态
      amountErrMsg: '', // 金额提示语
      amountPoint: 0, // 小数点金额
      initialMin: 0.1, // 小数点金额最小值
      initialMax: 0.49, // 小数点金额最大值
      offer: 0, // 优惠金额
      ifFlag: false,
      discount: '申请', // 申请优惠，默认选中申请
      isOutreach: '', // 是否启用外链功能
      isOpen: true, // 用于限制点击过快处理
      cardAccount: '', // 点卡列号
      cardPassword: '', // 点卡密码
      bankKey: null, // 选中的银行编号
      bankName: '', // 选中的银行名称
      bankStr: '', // 选择通道的字符串
      curQuickPrice: null, // 当前选中的快选金额
      feeMoney: 0.00, // 手续费金额
      currFeeIndex: 0 // 当前选中的点卡序号
    }
  },
  mixins: [payment],
  methods: {
    changeBank (item) {
      for (let i = 0; i < this.payType.depositListVo.merchant.bankStatusList.length; i++) {
        let bank = this.payType.depositListVo.merchant.bankStatusList[i]
        if (bank.bankId === item) {
          this.currFeeIndex = i
          let feeRate = this.payType.depositListVo.merchant.bankStatusList[i].feeRate
          this.feeMoney = (feeRate * this.amount / 100).toFixed(2)
        }
      }
    },
    goTop () {
      this.$store.state.payment.level = 0
    },
    reset () {
      // 金额
      this.amount = null
      // 异常信息状态
      this.amountErrFlag = false
      // 优惠
      this.offer = 0
      // 清除卡面列号
      this.cardAccount = ''
      // 清除卡密码
      this.cardPassword = ''
      // 判断支付银行列表如果不为空则默认选中数据，否则使用默认的编码
      if (this.payType.depositListVo.merchant.bankStatusList && this.payType.depositListVo.merchant.bankStatusList.length !== 0) {
        this.bankName = this.payType.depositListVo.merchant.bankStatusList[0].bankName
        this.bankKey = this.payType.depositListVo.merchant.bankStatusList[0].bankId
        this.bankStr = '请选择'
      } else {
        this.bankStr = this.payType.typeCode === 0 ? '银行' : '通道'
        this.bankStr = '暂无' + this.bankStr + '类型可选择'
      }
      this.feeMoney = 0.00
    },
    /*
     * 提交订单接口
     */
    payResult () {
      if (this.isOpen) {
        if (this.amount === null || this.amount === '' || /^\d+\.?\d{0,2}$/.test(this.amount) === false) {
          window.layer.msgWarn('请您输入充值金额')
          return false
        }
        // 最低金额 this.payType.deposite.max
        let minDepositOnline = parseFloat(this.payType.deposite.min)
        // 最高金额
        let highDepositOnline = parseFloat(this.payType.deposite.max)
        this.amount = parseFloat(this.amount)
        let depositListVo = this.payType.depositListVo
        if (this.amount < minDepositOnline) {
          window.layer.msgWarn('最低金额' + minDepositOnline)
          return false
        }
        if (this.amount > highDepositOnline) {
          window.layer.msgWarn('最高金额' + highDepositOnline)
          return false
        }
        // 是否启用小数点
        if (depositListVo.merchant.isOpenPointAmount === '1') {
          if ((minDepositOnline - 0.0001) >= this.amount || this.amount >= (highDepositOnline - 0.5)) {
            window.layer.msgWarn('您输入的金额有误！')
            return false
          }
        }
        // 上传至接口的变量
        let uploadBankKey = null
        // 点卡和银行需要校验是否选择了支付方式
        if (this.payType.typeCode === 0 || this.payType.typeCode === 1) {
          uploadBankKey = this.bankKey
          if (!depositListVo.merchant.bankStatusList || depositListVo.merchant.bankStatusList.length === 0) {
            window.layer.msgWarn('支付渠道尚未设定，请联系客服！')
            return false
          }
          // 点卡需要判断卡面列号和密码是否输入
          if (this.payType.typeCode === 1) {
            uploadBankKey = this.payType.depositListVo.merchant.bankStatusList[this.currFeeIndex].bankKey
            if (this.cardAccount === '') {
              window.layer.msgWarn('请输入卡面列号！')
              return false
            }
            if (this.cardPassword === '') {
              window.layer.msgWarn('请输入卡密码！')
              return false
            }
          }
        } else {
          // 银行和点卡的bankKey为下拉框选中的，其他支付类型使用typeCode即可
          uploadBankKey = this.payType.typeCode
        }

        if (this.type === '2') {
          window.layer.msgWarn('线上充值不对测试账号开放！')
          return false
        }
        let param = {
          youhui: this.discount === '申请' ? 1 : 0, // 是否选择优惠
          amount: this.amount,
          amountPoint: depositListVo.merchant.isOpenPointAmount === '0' ? '' : this.amountPoint,
          bankkey: uploadBankKey,
          banktype: this.payType.typeCode,
          isOutreach: depositListVo.merchant.isOutreach,
          merchantId: depositListVo.merchant.id,
          cardAccount: this.cardAccount,
          cardPassword: this.cardPassword,
          cardAmount: this.amount
        }
        if (!window.navigator.onLine) {
          window.layer.msgWarn('网络连接异常，请检查您的网络！')
        } else {
          this.$store.dispatch(types.SAVE_PAY_RESULT_ACTION, param).then(res => {
            if (res.status === '0') {
              window.store.state.payment.payResult = res.data
              // 储存起来到payResult使用
              sessionStorage.setItem('payResult', JSON.stringify(res.data))
              setTimeout(() => {
                // 跳转成功后刷新当前页面
                window.location.reload()
              }, 1000)
              try { // IOS打包后 iPhone5c不能正常跳转第三方
                window.open('/center/payResult')
              } catch (error) {
                this.$router.push('/center/payResult')
              }
            } else {
              window.layer.msgWarn(res.msg, function () {
                window.location.reload()
              })
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
    ...mapState({
      mnyAgentRechargeList: state => state.payment.mnyAgentRechargeList, // 支付列表数据
      payType: state => state.payment.payType // 当前支付
    })
  },
  mounted () {
    // 判断支付银行列表如果不为空则默认选中数据，否则使用默认的编码
    if (this.payType.depositListVo.merchant.bankStatusList && this.payType.depositListVo.merchant.bankStatusList.length !== 0) {
      this.bankName = this.payType.depositListVo.merchant.bankStatusList[0].bankName
      this.bankKey = this.payType.depositListVo.merchant.bankStatusList[0].bankId
      this.bankStr = '请选择'
    } else {
      this.bankStr = this.payType.typeCode === 0 ? '银行' : '通道'
      this.bankStr = '暂无' + this.bankStr + '类型可选择'
    }
    // 初始化小数点
    this.initAmtPoint()
  }
}
</script>
