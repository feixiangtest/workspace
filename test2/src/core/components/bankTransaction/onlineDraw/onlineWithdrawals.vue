<template>
  <div class="onlineWithdrawals" v-if="loadType">
    <div class="c2" v-if="loadType == 'withdrawals' ">
      <el-button @click="routerPush('/center/myAccount/safeSet')">修改取款密码</el-button>
    </div>
    <withdrawals v-if="loadType == 'withdrawals' " ></withdrawals>
    <bind-info v-if="loadType == 'bindInfo' " @my-event="reload"> </bind-info>
  </div>

</template>

<script>
  import * as type from '@m/store/payment/type'
  import withdrawals from './withdrawals'
  import bindInfo from './bindInfo'
  export default {
    data () {
      return {
        loadType: null,
        drawMoney: '', // 出款金额
        drawMoneyPwd: '', // 出款密码
        buttonMsg: '提交',
        isOpen: true // 用于限制点击过快处理
      }
    },
    components: {
      withdrawals, bindInfo
    },
    methods: {
      reload () {
        this.initDrawData()
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
      // 初始化数据
      initDrawData () {
        // 非空时不做重复初始化
        this.$store.dispatch(type.INIT_DRAW_DATA_ACTION, { bankType: 0 }).then(res => {
          if (res.msg && res.msg.indexOf('为保证您的出款权') >= 0) {
            this.loadType = 'bindInfo'
            window.layer.msgWarn(res.msg)
            return ''
          }
          if (res.msg && res.msg.indexOf('不完整') >= 0) {
            this.loadType = ''
            window.layer.msgWarn(res.msg)
            return ''
          }
          this.loadType = 'withdrawals'
        }).catch(res => {
          console.log('INITPAYMENT store error')
        })
      }
    },
    mounted () {
      if (this.$store.state.payment.showBindInfo) {
        this.loadType = 'bindInfo'
      } else {
        this.initDrawData()
      }
    }
  }
</script>
