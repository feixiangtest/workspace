<template>
      <div class="BalanceSelector1" @click.stop v-show='showBalanceBox'>
          <ul @mouseout="changeShowBalance(false)" @mouseover="changeShowBalance(true)">
              <li class="firstRow"><a @click='updateMoney' class="RefreshBalance">刷新余额</a></li>
              <li>
                  <div style="z-index: 2968;">
                      <span class="BalanceLabel">现金余额：</span>
                      <span class="WithdrawableValue" v-if='onLoading'>加载中...</span>
                      <span id="luomaMoney" class="WithdrawableValue" v-else>{{userInfo.money | moneyFilter}}</span>

                  </div>
              </li>
              <li v-for='(item,key,index) in userInfo.apiMoneyMap' :key='index'>
                  <div style="z-index: 2968;">
                      <span class="BalanceLabel">{{key.toUpperCase()}}余额：</span>
                       <span class="WithdrawableValue" v-if='onLoading'>加载中...</span>
                       <span id="ogMoney" class="WithdrawableValue" v-else>{{item | moneyFilter}}</span>
                  </div>
              </li>
          </ul>
      </div>
</template>

<script>
/* 单独编译
* */
export default {
  props: ['showBalanceBox', 'userInfo', 'changeShowBalance', 'changeToOnLoading'],
  data () {
    return {
      onLoading: false
    }
  },
  filters: {
    moneyFilter (money) {
      return isNaN(money) ? 0.00 : Number(money).toFixed(2) // 格式化金钱格式
    }
  },
  methods: {
    updateMoney () { // 刷新余额
      this.changeToOnLoading(true)
      this.onLoading = true
      this.$store.dispatch('user.updateSessionMoney', {
        api: '1'
      }).then(res => {
        this.onLoading = false
        this.changeToOnLoading(false)
      }).catch(rej => {
        this.onLoading = false
        this.changeToOnLoading(false)
      })
    }
  }
}
</script>
