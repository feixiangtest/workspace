<template>
    <div>
      <form :method="payResult.post" name="yeepay" :action="payResult.posturl" id="cashOnlineDepositForm">
        <input type="hidden" name="send_url" :value="payResult.nodeAuthorizationURL"/>
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
import { mapState } from 'vuex'
export default {
  data () {
    return {
      bSubmit: false,
      payResult: {}
    }
  },
  computed: {
    ...mapState({
      payResult: state => state.payment.payResult
    })
  },
  created () {
    this.payResult = JSON.parse(sessionStorage.getItem('payResult'))
  },
  mounted () {
    if (this.payResult.posturl !== undefined) {
      var form = document.getElementById('cashOnlineDepositForm')
      sessionStorage.removeItem('payResult')
      form.submit()
    }
  }
}
</script>
