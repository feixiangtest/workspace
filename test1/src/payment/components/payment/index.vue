<template>
  <div class="yo-page-body">
    <!--如果APP内嵌支付页面，则头部需要隐藏-->
    <div class="header yo-home-nav" v-if="!(isApp || !token)">
        <div class="center">
            <div class="hea-menu hea-left">
                <a href="javascript:;" @click="goback()"><i class="yo-icon icon-arrows-left"></i></a>
            </div>
            <div class="header-text titile">
                <h1>快速充值</h1>
            </div>
            <div class="hea-user hea-right">
                <a href="javascript:;" @click="GoHome()"><i class="yo-icon icon-home"></i></a>
            </div>
        </div>
    </div>
    <div class="wrapper" id="payScroll" style="padding-bottom: 70px;" :style="isApp ? 'padding-top: 0' : ''" v-if="payMentList && payMentList.length">
      <!--支付标签页面-->
      <payTab></payTab>
      <!--支付页面-->
      <router-view></router-view>
    </div>
    <div class="noPayment" v-if="noData">
        <img :src="commonImgUrl + '/newPayment/noData.png'"/>
        <div>未开放支付通道，请联系客服</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import payTab from './payTab'
import * as index from '@/base/config/index'
import * as type from '@/base/store/payment/type'
// import * as payMents from '@/base/config/payMent'
import Swipe from 'mint-ui/lib/swipe'
import SwipeItem from 'mint-ui/lib/swipe-item'
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

export default {
  data () {
    return {
      indexs: index,
      isFirstOne: true,
      token: true, // app嵌入H5支付页面时需要隐藏快速充值的头部
      isApp: !!(window.myNative && window.myNative.isApp && window.myNative.isApp()) // 是否app嵌入H5支付页面时需要隐藏快速充值的头部
    }
  },
  watch: {
    '$route': function (route) {
      var query = route.query
      console.info(query, '$route')
    }
  },
  components: {
    payTab
  },
  beforeMount () {
    this.init()
  },
  methods: {
    goback () {
      // 判断是否原生APP，并触发原生APP提供的方法
      if (window.myNative && window.myNative.popToAccount && window.myNative.popToAccount()) {
        return // 如果触发成功，则阻止后续H5的代码执行
      }
      window.moduleRouter.push('/wap/memberCenter/index')
    },
    GoHome () {
      // 判断是否原生APP，并触发原生APP提供的方法
      if (window.myNative && window.myNative.popToHome && window.myNative.popToHome()) {
        return // 如果触发成功，则阻止后续H5的代码执行
      }
      window.moduleRouter.push('/wap/index')
    },
    init () {
      if (!window.navigator.onLine) {
        window.layer.msgWarn('网络连接中断，请检查您的网络！')
      } else {
         // 获取到当前的URL参数
        let param = {
          banktype: this.nowBankType
        }
        let obj = this.urlToJson()
        // 是否APP内嵌支付H5
        if (this.isApp) {
          param.memberToken = window.myNative.getMemberToken()
        } else { // 兼容前一个APP版本
          let mt = (obj && obj.memberToken) || localStorage.getItem('memberToken')
          if (mt) {
            param.memberToken = mt
            this.token = false
            localStorage.setItem('memberToken', mt)
          }
        }
        this.$store.dispatch(type.GO_ONLINE_PAY_ACTION, param).then(res => {
        }).catch(res => {
          console.log(' INITPAYMENT store error')
        })
      }
    },
    urlToJson () {
      let search = location.search.length > 0 ? location.search.substring(1) : ''
      if (!search) return {}
      let args = {}
      let items = search.split('&')
      let item = null
      for (let i = 0; i < items.length; i++) {
        item = items[i].split('=')
        args[item[0]] = item[1]
      }
      return args
    }
  },
  computed: {
    payMentList () { // 支付列表，包括默认和更多
      return this.$store.state.payment.allPayMentList
    },
    commonImgUrl () { // 公共图片路径
      return this.$store.state.home.commonImgUrl
    },
    noData () {
      return this.$store.state.payment.noData
    },
    nowBankType () {
      return this.$store.state.payment.bankType
    }
  }
}
</script>
