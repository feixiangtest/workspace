<template>

    <div>
        <h2 class="yo-headline2">选择支付银行</h2>
        <div class="payitembox" style="margin-top:7px">
            <dl class="paytype" >
                <dd @click="openBankFun()">
                    <h6 class="banktitle">支付银行：</h6>
                    <span class="radio_span yo-arrri"><i class="yo-icon icon-arrows-right"></i></span>
                    <span class="paybankName">{{this.bankName}}</span>
                </dd>
            </dl>
        </div>
        <div class="wrapper2" pageId='live' style="margin-bottom: -44px;">
            <div attr-div="bankList" v-show="openBank" class="TipsWindown">
              <div class="shadeIn">
                  <div class="selBankBox">
                      <h1>您所使用的银行卡<a href="javascript:;" @click="closeBank()">完成</a></h1>
                      <dl>
                          <dt v-if='multiChannelStatus==0' v-for="(bankInfo,index) in payType.merchant.bankStatusList" :key="index" @click="setBank(bankInfo)">
                              <span>{{bankInfo.bankName}}</span>
                              <i class="yo-icon icon-radio" :class="bankKey === bankInfo.bankKey ? 'icon-radio-yes':'icon-radio-no'"></i>
                          </dt>
                          <dt v-if='multiChannelStatus==1' v-for="(bankInfo,index) in merchantListItem.bankStatusList" :key="index" @click="setBank(bankInfo)">
                              <span>{{bankInfo.bankName}}</span>
                              <i class="yo-icon icon-radio" :class="bankKey === bankInfo.bankKey ? 'icon-radio-yes':'icon-radio-no'"></i>
                          </dt>
                      </dl>
                  </div>
              </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
  data () {
    return {
      openBank: false,
      bankName: '',
      bankKey: ''
    }
  },
  methods: {
    setBank (bankInfo) {
      this.bankName = bankInfo.bankName
      this.bankKey = bankInfo.bankKey
    },
    closeBank () {
      this.openBank = false
      window.indexMain.appHiddenOverflow(false)
      this.$store.state.payment.bankkey = this.bankKey
    },
    openBankFun () {
      if (this.multiChannelStatus === 0) {
        if (this.payType.merchant.bankStatusList.length > 0) {
          this.openBank = true
          window.indexMain.appHiddenOverflow(true)
          let $dom = window.$('[attr-div="bankList"]')
        // dom结构移至body下
          if ($dom[0] && !$dom.parent().is(window.$('body'))) {
            window.$('body').append($dom)
            window.mountedRemoveDoms.push($dom)
            $dom = null
          }
        } else {
          window.layer.msgWarn('没有可选择的银行，请联系客服！')
        }
      }
      if (this.multiChannelStatus === 1) {
        if (this.merchantListItem.bankStatusList.length > 0) {
          this.openBank = true
          window.indexMain.appHiddenOverflow(true)
          let $dom = window.$('[attr-div="bankList"]')
        // dom结构移至body下
          if ($dom[0] && !$dom.parent().is(window.$('body'))) {
            window.$('body').append($dom)
            window.mountedRemoveDoms.push($dom)
            $dom = null
          }
        } else {
          window.layer.msgWarn('没有可选择的银行，请联系客服！')
        }
      }
    }
  },
  computed: {
    depositMap () { // 所有支付参数
      return this.$store.state.payment.depositMap
    },
    multiChannelStatus () { // 是否开启多通道  0 表示单通道  1表示多通道  提交时需要传给后端
      return this.$store.state.payment.multiChannelStatus
    },
    bankkey () { // 当前支付的数据
      return this.$store.state.payment.bankkey
    },
    payType () { // 当前选中的支付
      return this.$store.state.payment.payType
    },
    merchantListItem () {
      return this.$store.state.payment.merchantListItem
    }
  },
  mounted () {
    window.indexMain.mountedRemoveDoms() // 删除多余dom（防止自动刷新时，多余的dom不被删除）
  },
  created () {
    setTimeout(() => {
      if (this.payType.merchant.bankStatusList !== undefined && this.payType.merchant.bankStatusList.length > 0 && this.multiChannelStatus === 0) {
        this.bankName = this.payType.merchant.bankStatusList[0].bankName
        this.bankKey = this.payType.merchant.bankStatusList[0].bankKey
        this.$store.state.payment.bankkey = this.payType.merchant.bankStatusList[0].bankKey
      }
      if (this.payType.merchantList[0].bankStatusList !== undefined && this.payType.merchantList[0].bankStatusList.length > 0 && this.multiChannelStatus === 1) {
        this.$store.state.payment.merchantId = this.depositMap[this.bankkey].merchantList[0].id
        this.bankName = this.depositMap[this.bankkey].merchantList[0].bankStatusList[0].bankName
        this.bankKey = this.depositMap[this.bankkey].merchantList[0].bankStatusList[0].bankKey
        this.$store.state.payment.bankkey = this.depositMap[this.bankkey].merchantList[0].bankStatusList[0].bankKey
      }
    }, 300)
  }
}
</script>
