<template>
    <div>
        <div class="yo-form-item" @click="openBankList()">
            <h5 class="title">选择银行</h5>
            <div class="con-cen" style="justify-content: flex-end">
                <span>{{bankName}}</span>
                <i class="yo-icon icon-next"></i>
            </div>
        </div>
        <div class="yo-mask-layer" v-if="showBankList">
            <div class="mask-box"></div>
            <div class="layer-pay-box">
                <div class="pay-box-titile">
                    <span class="Cancel" @click="showBankList=false">完成</span>
                    <h5>选择银行</h5>
                    <span class="sure"></span>
                </div>
                <div class="pay-box-content">
                    <dl>
                        <dd v-for="(bank,index) in payType.depositListVo.merchant.bankStatusList"
                            :key="index" @click="changeBank(bank)">
                            <h2>
                                <i class="yo-icon"></i>&nbsp;&nbsp;{{bank.bankName}}&nbsp;&nbsp;
                                <i class="yo-icon"></i>
                            </h2>
                            <label class="mint-checklist-label">
                                <span class="mint-checkbox is-right">
                                <input type="radio" class="mint-checkbox-input" name="radio"
                                    :checked="bankKey === bank.bankKey">
                                <span class="mint-checkbox-core"></span>
                                </span>
                            </label>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import payment from '@s/components/payment/onlinePay.js' // 抽出支付公共js函数
export default {
  data () {
    return {
      showBankList: false,
      allowClick: true,
      bankName: '',
      bankKey: ''
    }
  },
  mixins: [payment],
  methods: {
    changeBank (bank) {
      this.bankName = bank.bankName
      this.bankKey = bank.bankKey
      this.$store.state.payment.bankkey = bank.bankKey
    },
    openBankList () {
      if (!this.allowClick) {
        return
      }
      if (this.payType.depositListVo.merchant.bankStatusList.length > 0) {
        this.showBankList = true
      } else {
        window.layer.msgWarn('没有可选择的银行，请联系客服！')
      }
    }
  },
  computed: {
    ...mapState({
      mnyAgentRechargeList: state => state.payment.mnyAgentRechargeList, // 支付列表数据
      payType: state => state.payment.payType // 当前支付
    })
  },
  created () {
    let depositListVo = this.payType.depositListVo
    if (depositListVo.merchant.bankStatusList !== undefined && depositListVo.merchant.bankStatusList.length > 0) {
      this.bankName = depositListVo.merchant.bankStatusList[0].bankName
      this.bankKey = depositListVo.merchant.bankStatusList[0].bankKey
      this.$store.state.payment.bankkey = depositListVo.merchant.bankStatusList[0].bankKey
    } else {
      this.bankName = '暂无银行类型可选择'
      this.allowClick = false
    }
  }
}
</script>
