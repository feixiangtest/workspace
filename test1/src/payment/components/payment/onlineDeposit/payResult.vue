<template>
  <div>
    <form :method="payResult.post" name="yeepay" :action="fUrl" id="cashOnlineDepositForm">
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
        <oldResult :payResult="payResult" v-if="payResult.paySystemId && payResult.paySystemId < 243 || payResult.paySystemId === 318 || payResult.paySystemId === 518 || payResult.paySystemId !== 202"></oldResult>
        <!--从paySystemId大于等于243 开始form表单自动拼接提交-->
        <div v-if="payResult.paySystemId && payResult.paySystemId > 243 && payResult.paySystemId !== 318 && payResult.paySystemId !== 518 || payResult.paySystemId === 202">
          <input v-for="(value, key) in payResult" :key="key" v-if="key != 'domain'" type="hidden" :name="key" :value="value" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import * as payMents from '@/base/config/payMent'
  import oldResult from '@/payment/components/payment/onlineDeposit/oldResult'
  export default {
    data () {
      return {
        payMent: payMents, // 存款的数据体
        bSubmit: false,
        fUrl: '//', // ios  不兼容 依然提示 不安全
        forwardUrl: '' // 请求的url，如果不是https跳http的场景，则直接使用支付的域名跳转，如果是这种场景，则通过发送约定接口，nginx重定向到支付域名，GPO-5096
      }
    },
    components: {
      oldResult
    },
    computed: {
      payResult () {
        return this.$store.state.payment.payResult
      }
    },
    methods: {
      // 处理url，如果满足条件则改变forwardUrl。通过发送约定接口，nginx重定向到支付域名，主要解决浏览器安全机制拦截问题，GPO-5096
      // 不满足条件则按原有方式跳转
      customForwardUrl () {
        let posturl = this.forwardUrl
        // 如果不满足条件（当前是IOS并且Safari浏览器，并且当前域名协议是https，跳转的支付域名协议是http），则不作为
        if (!(window.indexMain.isIos && navigator.userAgent.includes('Safari') && location.protocol === 'https:' && posturl.includes('http:'))) {
          return
        }
        // 如果不是调用gpo_payment系统的接口，则不作为
        if (!posturl.includes('payment_platform/form')) {
          return
        }
        let url
        let index = posturl.indexOf('//')
        if (index > -1 && index < 8) { // 尽量规避匹配错误的url
          url = posturl.substr(index + 2) // 取url‘//’后面的字符串
        }
        if (url) {
          // 调用与nginx约定的接口'/paymentForward'（该接口gpo_api实际没有），通过nginx转发到真正的url
          this.forwardUrl = '/paymentForward?domain=' + url // 如：https://www.try1024.com/paymentForward?domain=pay.xibalrienzhifu5.com/payment_platform/form/toForm
        }
      }
    },
    mounted () {
      window.indexMain.hideLoading() // 加载完之后隐藏loading
      this.forwardUrl = this.payResult.posturl
      if (this.forwardUrl) {
        this.customForwardUrl() // 处理forwardUrl，如果满足条件则改变forwardUrl
        this.fUrl = this.forwardUrl
        this.$nextTick(() => {
          setTimeout(() => {
            var form = document.getElementById('cashOnlineDepositForm')
            form.submit()
          }, 20)
        })
      } else { // 非正常进入该页面
        window.moduleRouter.push('/' + window.moduleRouter._payKey + '/payment') // 跳转支付项目
      }
    }
  }
</script>
