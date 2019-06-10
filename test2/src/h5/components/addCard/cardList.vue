<template>
    <div class="details-main main-box" >
    <!-- 没有绑卡 -->
     <div class="card-box" v-if="isSetBankCard === '1'">
         <img src="../../assets/img/default/no-cardbg.png" alt="">
         <div class="text-tips" style="width:80%;margin-left:35px;">
           便捷提款 <br>
           立即绑定银行卡
         </div>
         <div class="add-card">
             <button tag='button' class="btn" @click="turnToAddCard()">添加银行卡</button>
         </div>
     </div>
     <!-- 已经绑卡 -->
     <div class="card-box" style="padding-top:30px; padding-bottom:30px;overflow: hidden;" v-if="isSetBankCard === '0'">
         <h3>{{memberBankName}}</h3>
         <span>储蓄卡</span>
         <p>* * * *   * * * *   * * * *   {{bankAccount}}</p>
         <img src="../../assets/img/default/card.png" alt="">
         <div class="img-mask"></div>
     </div>


    </div>
</template>
<script>
export default {
  name: 'cardList',
  data () {
    return {
      isSetBankCard: '',
      memberBankName: '',
      bankAccount: ''
    }
  },
  computed: {
  },
  methods: {
    turnToAddCard () {
      sessionStorage.setItem('switchPages', '/wap/basicsInfo')
      this.$router.push('/wap/addCard')
    },
    initDrawData () {
      this.$store.dispatch('initDrawData.action', {bankType: 0}).then(res => {
        // 1 未绑定银行卡
        if (res.status === '1') {
        }
        this.isSetBankCard = localStorage.getItem('isSetBankCard')
        // 0 已绑定
        if (res.status === '0') {
          this.memberBankName = res.data.memberBankName
          this.bankAccount = res.data.memberInfo.bankAccount.slice(-4)
        }
      })
    }
  },
  created () {
    this.initDrawData()
  },
  mounted () {
    this.$store.state.h5Home.headerType = 2
    this.$store.state.h5Home.headTitle = '银行卡'
    this.$store.state.h5Home.headLeft = 'icon-back'
    this.$store.state.h5Home.headback = false
  }
}
</script>
