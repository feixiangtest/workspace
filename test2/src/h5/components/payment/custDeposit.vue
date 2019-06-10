<template>
    <div class="yo-form-content magt10" v-if="payType">
        <div style="height:200px;line-height: 170px;margin: 0px auto;text-align: center;" v-if="rechargeVoList[0].id === payType.id">
          请<span @click="payCust()" style="color:blue">点击这里</span>完成充值
        </div>
        <div style="height:200px;line-height: 170px;margin: 0px auto;text-align: center;" v-else>
          请在新开页面完成支付，点击上方可切换充值方式
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  methods: {
    payCust () {
      let url = this.payType.netPrefix + this.payType.netAddr
      try { // IOS打包后 iPhone5c不能正常跳转第三方
        window.open(url)
      } catch (error) {
        window.location.href = url
      }
    }
  },
  computed: {
    ...mapState({
      rechargeVoList: state => state.payment.rechargeVoList, // 支付列表数据
      payType: state => state.payment.payType // 当前支付
    })
  }
}
</script>
