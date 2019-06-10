<template>
    <div>
      <form :method="payResult.post" name="yeepay" :action="payResult.posturl" id="cashOnlineDepositForm">
        <input type="hidden" name="send_url" :value="payResult.nodeAuthorizationURL" />
        <input type="hidden" name="domain" :value="payResult.domain"/>
        <div v-if="payResult.isOutreach === 1 || payResult.isOutreach === '1'">
          <input type="hidden" name="send_url" :value="payResult.nodeAuthorizationURL"/>
   				<input type="hidden" name="callbackurl" :value="payResult.callbackurl"/>

    			<input type="hidden" name="banktype" :value="payResult.banktype" />
    			<input type="hidden" name="bankkey" :value="payResult.bankkey" />
    			<input type="hidden" name="account" :value="payResult.account" />
    			<input type="hidden" name="merchantno" :value="payResult.merchantno" />
    			<input type="hidden" name="orderno" :value="payResult.orderno" />
    			<input type="hidden" name="amount" :value="payResult.amount" />
    			<input type="hidden" name="sign" :value="payResult.sign" />
    			<input type="hidden" name="method" :value="payResult.method" />
        </div>
        <div v-else>
            <input v-for="(value, key) in payResult" :key="key" v-if="key != 'domain'" type="hidden" :name="key" :value="value" />
        </div>
      </form>
    </div>
</template>

<script>
/** 1 编译
 *    webpack打包构建
 *  pc h5 公用
 */
import Vue from 'vue'
export default {
  data () {
    return {
      bSubmit: false,
      payResult: {}
    }
  },
  created () {
    window.$('#preApp').remove()
  },
  mounted () {
    let a = 1 // 防止重复提交
    Vue.set(this, 'payResult', JSON.parse(localStorage.payResult))
    // 直接赋值的方式 form 取不到值
    this.$nextTick(() => {
      if (this.payResult && this.payResult.posturl && a < 2) {
        var form = document.getElementById('cashOnlineDepositForm')
        form.action = this.payResult.posturl
        form.submit()
        delete localStorage.payResult
        a = 2
      }
    })
  }
}
</script>
