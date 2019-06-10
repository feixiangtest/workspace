<template>
  <div class="inside-pages home" id="payment">
    <!--公共头部-->
    <public-header/>
    <div class="common-main main-box" v-if="this.rechargeVoList !== undefined && this.rechargeVoList.length !== 0">
      <!--选择支付方式-->
      <div class="yo-form-box">
        <!--选择头部-->
        <payHeader/>
        <!--根据路由跳转支付页面-->
        <router-view/>
        <!--在线存款文案-->
        <listDeposit></listDeposit>
      </div>
    </div>
    <div v-if="showNoData" class="nodata-content">
      <!-- 无内容时显示 -->
      <img src="@/assets/img/default/no-content.png" alt="">
      <div class="text grey-txt">未开放支付通道</div>
      <a href="javascript:void(0);" class="btn btn-refresh btn-primary" @click="$openChatWin">联系客服</a>
    </div>
  </div>
</template>

<script>
  import publicHeader from '@/components/header/header.vue'
  import payHeader from '@/components/payment/payHeader.vue'
  import listDeposit from '@/components/payment/listDeposit.vue'
  import * as type from '@m/store/payment/type'
  import {
    mapState
  } from 'vuex'
  export default {
    name: 'payment',
    data () {
      return {
        showNoData: false
      }
    },
    computed: {
      ...mapState({
        rechargeVoList: state => state.payment.rechargeVoList // 支付列表数据
      })
    },
    components: {
      publicHeader,
      payHeader,
      listDeposit
    },
    watch: {
      $route () {
        window.indexMain.ifRouteChange()
      }
    },
    mounted () {
      // 查询支付列表
      this.initPayList()
      // 初始化头部
      this.$store.state.h5Home.headback = false
      this.$store.state.h5Home.headerType = 3
      this.$store.state.h5Home.headTitle = '立即充值'
      this.$store.state.h5Home.headLeft = 'icon-back'
      this.$store.state.h5Home.headRight = 'icon-online'
      // 初始化头部背景
      window.indexMain.ifRouteChange()
    },
    methods: {
      initPayList () {
        let param = {
          'terminal': 'MOB', // MOB代表手机，PC代表电脑端
          'versionFun': true
        }
        let $this = this
        this.$store.dispatch(type.GO_ONLINE_PAY_ACTION, param).then(res => {
          // 支付列表
          let list = res.data.rechargeVoList
          // 默认选中第一个
          if (list && list.length > 0) {
            // 充值页面展示会员上次提交成功的充值页面，可下拉选择其他充值方式
            let payInfo = JSON.parse(localStorage.getItem('payInfo'))
            if (payInfo && payInfo !== 'undefined') {
              // 如上次的充值方式以关闭，则展示排序为首位的充值页面
              let flag = false
              for (let i = 0; i < list.length; i++) {
                if (payInfo.typeCode === list[i].typeCode) {
                  payInfo = list[i]
                  flag = true
                }
              }
              if (flag) {
                window.store.state.payment.payType = payInfo
              } else {
                payInfo = list[0]
                window.store.state.payment.payType = list[0]
              }
            } else {
              payInfo = list[0]
              window.store.state.payment.payType = list[0]
            }
            // 线上支付，跳转至线上支付路由
            // 自定义支付
            if (payInfo.custFlag === '1') {
              this.$router.push('/wap/payment/custDeposit')
            } else {
              if (payInfo.onlineFlag === '0') {
                this.$router.push('/wap/payment/onlinePay')
              } else {
                // 设置默认选中的线下入款参数
                if (payInfo.companyAccountChargeVoList && payInfo.companyAccountChargeVoList.length > 0) {
                  $this.$store.state.payment.offlineDeposit = payInfo.companyAccountChargeVoList[0]
                }
                this.$router.push('/wap/payment/offlinePay')
              }
            }
          } else {
            this.showNoData = true
          }
        })
      }
    }
  }
</script>
