<template>
    <div v-if="payType.depositListVo">
        <div class="yo-form-content magt10">
            <h6 class="form-title grey-txt">
                充值金额（元）&nbsp;&nbsp;<span class="high-red red-star">*</span>
            </h6>
            <div class="feed-in-sum">
                <i class="yo-icon icon-mony"></i> <!-- 金额输入框最大长度为14 OT-4721 -->
                <input type="text" :placeholder="place" maxlength="14" 
                    :disabled="payType.depositListVo.merchant.isOpenAmountInput === '0'"
                    v-model="amount" @input="inputMoney(amount)">
                <span class="fix-txt grey-txt"
                     v-if="this.payType.depositListVo !== undefined && this.payType.depositListVo.merchant.isOpenPointAmount === '1'">
                    {{amountPoint}}
                </span>
            </div>
            <p class="form-title red-txt"
                v-if="amountErrFlag">
                {{amountErrMsg}}
            </p>
            <p class="form-title grey-txt"
                v-if="this.payType.depositListVo !== undefined && this.payType.depositListVo.merchant.isOpenPointAmount === '1'">
                为了更快速到账，存款时，自动生成0{{amountPoint}}元
            </p>
          <!--v-if="item && payType.deposite && (item <= payType.deposite.max && item >= payType.deposite.min)"-->
            <div class="fast-Select-sum" v-if="payType.isShowFlag === '1' && payType.deposite && payType.deposite.max">
                <ul>
                    <li class="btn btn-default" :class=" index === curQuickPrice ? 'cur' : '' "
                        v-for="(item,index) in payType.quickPrice.split(',')" :key="index"
                         v-if="item > 0 && (item <= payType.deposite.max && item >= payType.deposite.min)"
                        @click="changeQuickPrice(index,item)">
                        {{item}}元
                    </li>
                </ul>
            </div>
        </div>

        <!-- 线上支付 -->
        <div class="magt10">
            <div class="yo-form-item" v-if="discountFun">
                <h5 class="title">申请优惠</h5>
                <div class="con-cen">
                    <label class="mint-switch">
                        <input type="checkbox" class="mint-switch-input"
                        v-model="discount" :disabled="applyDiscount">
                        <span class="mint-switch-core"></span>
                        <div class="mint-switch-label"></div>
                    </label> &nbsp;&nbsp;
                    <span class="weak-txt grey-txt">
                        优惠<font class="orange">{{offer}}</font>,
                        <font v-if="this.onlineCodeQuantitySet.statusCompOnline === 1">{{this.onlineCodeQuantitySet.codeMultiple}}</font>
                        <font v-else>0</font>倍打码
                    </span>
                </div>
            </div>

            <!--银行使用-->
            <onlineBankList v-if="this.payType.typeCode === 3"
                ref="mychild" :amount='amount'></onlineBankList>
        </div>

        <!-- 提交 -->
        <div class="public-footer common-footer">
            <div class="but-footer yow-content">
                <a href="javascript:void(0);"
                class="btn btn-lg btn-block"
                :disabled="amountStatus" @click="payResult()"
                :class="amountStatus ? 'btn-disabled' : 'btn-primary'">
                    提交
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import payment from '@s/components/payment/onlinePay.js' // 抽出支付公共js函数
import onlineBankList from './onlineBankList'
export default {
  components: {
    onlineBankList
  },
  data () {
    return {
      status: true,
      curQuickPrice: null, // 当前选中的快选金额
      amount: null, // 支付金额
      amountErrFlag: false, // 金额提示语状态
      amountErrMsg: '', // 金额提示语
      amountPoint: 0, // 小数点金额
      initialMin: 0.1, // 小数点金额最小值
      initialMax: 0.49, // 小数点金额最大值
      offer: 0, // 优惠金额
      ifFlag: false,
      discount: '申请', // 申请优惠，默认选中申请
      isOutreach: '', // 是否启用外链功能
      isOpen: true // 用于限制点击过快处理
    }
  },
  mixins: [payment],
  mounted () {
    this.$store.state.h5Home.headerType = 3
    this.$store.state.h5Home.headTitle = '立即充值'
    this.$store.state.h5Home.headLeft = 'icon-back'
    this.$store.state.h5Home.headRight = 'icon-online'
    this.initAmtPoint()
  },
  methods: {
    /*
     * 提交订单接口
     */
    payResult () {
      // 提交前校验
      if (this.amountStatus) {
        return
      }
      if (this.isOpen) {
        let depositListVo = this.payType.depositListVo
        if (this.amount === null || this.amount === '' || /^\d+\.?\d{0,2}$/.test(this.amount) === false) {
          window.layer.msgWarn('请您输入充值金额')
          return false
        }
        // 最低金额
        let minDepositOnline = parseFloat(this.payType.deposite.min)
        // 最高金额
        let highDepositOnline = parseFloat(this.payType.deposite.max)
        this.amount = parseFloat(this.amount)
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

        // 银行需要校验是否选择了支付方式
        if (this.payType.typeCode === 3) {
          if (!depositListVo.merchant.bankStatusList || depositListVo.merchant.bankStatusList.length === 0) {
            window.layer.msgWarn('支付银行尚未设定，请联系客服！')
            return false
          }
        }

        if (this.type === '2') {
          window.layer.msgWarn('线上充值不对测试账号开放！')
          return false
        }

        let param = {
          youhui: this.discount === '申请' ? 1 : 0, // 是否选择优惠
          amount: this.amount,
          amountPoint: depositListVo.merchant.isOpenPointAmount === '0' ? '' : this.amountPoint,
          bankkey: this.$store.state.payment.bankkey,
          banktype: this.payType.typeCode,
          isOutreach: depositListVo.merchant.isOutreach,
          merchantId: depositListVo.merchant.id
        }
        if (!window.navigator.onLine) {
          window.layer.msgWarn('网络连接异常，请检查您的网络！')
        } else {
          let _res = window.$.httpAsync('/member/pay/payResult' + '?t=' + new Date().getTime(), param)
          if (_res.code === 0) {
            try {
              localStorage.setItem('payInfo', JSON.stringify(this.payType))
            } catch (e) {
            }
            window.store.state.payment.payResult = _res.data
            // 储存起来到payResult使用
            console.log(_res.data, 'data')
            localStorage.setItem('payResult', JSON.stringify(_res.data))
            var left = (document.body.clientWidth - 1000) / 2
            var params = 'height=680,width=970,top=0,left=' + left + ',toolbar=no,menubar=no,scrollbars=no' + ',resizable=yes,location=yes, status=yes'
            window.open('/wap/payResult', '支付页面', params)
            return true
          } else {
            window.layer.msgWarn(_res.msg)
            return false
          }
        }
        // 限制两秒才允许再次点击
        this.isOpen = false
        setTimeout(() => {
          this.isOpen = true
        }, 1500)
      }
    }
  },
  computed: {
    ...mapState({
      payType: state => state.payment.payType // 当前支付
    })
  },
  watch: {
    payType (v) {
      this.amount = null
      this.amountErrFlag = false
      this.amountErrMsg = ''
      this.offer = 0
    }
  }
}
</script>
