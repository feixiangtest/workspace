<template>
    <div class="common-main main-box" v-if="loadDone">
    	<div class="reg-header" v-if="regStep">
        <div class="item">
          <span class="circle circle2">1</span>
          <div class="text text2">设置登录账号</div>
          <div class="line">
            <div class="line-trans"></div>
            <div class="line-gray"></div>
          </div>
        </div>
        <div class="item">
          <span class="circle circle2">2</span>
          <div class="text text2">填写个人资料</div>
          <div class="line">
            <div class="line-gray"></div>
            <div class="line-gray"></div>
          </div>
        </div>
        <div class="item">
          <span class="circle circle2">3</span>
          <div class="text text2">注册成功</div>
          <div class="line">
            <div class="line-gray"></div>
            <div class="line-trans"></div>
          </div>
        </div>
      </div>
      <div class="reg-box reg-box2">
        <img src="../../assets/img/default/register-success.svg" alt="">

        <div class="text">
            <h3>恭喜您，注册成功！</h3>
            <p>您还可以<a href="javascript:void(0)" @click="toAddCard()">绑定银行卡</a>，以方便您随时取款！</p>
        </div>
      </div>
      <div class="btn-wrap">
        <div class="btn one-btn">
           <router-link to='/wap/index' tag="div" class="left">开始游戏</router-link>
            <router-link to='/wap/payment/offlinePay' tag="div" class="right">立即存款</router-link>
        </div>
      </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'regSuccess',
  data () {
    return {
      loadDone: false
    }
  },
  created () {
    if (window.__regOk) {
      this.loadDone = true
      delete window.__regOk
    } else {
      this.loadDone = false
      window.router.push('/wap/index')
    }
  },
  computed: {
    ...mapState({
      getLoginStatus: state => state.user.getLoginStatus,
      regStep: state => state.user.regStep // 注册是否分步
    })
  },
  mounted () {
    this.$store.state.h5Home.headerType = 3
    this.$store.state.h5Home.headTitle = '注册'
    this.$store.state.h5Home.headLeft = 'icon-back'
    this.$store.state.h5Home.headback = true
  },
  destroyed () {
    this.$store.state.h5Home.headback = false
  },
  methods: {
    toAddCard () {
      sessionStorage.setItem('switchPages', '/wap/index')
      window.router.push('/wap/addCard')
    }
  }
}
</script>

