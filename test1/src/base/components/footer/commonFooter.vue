<template>
<div class="yo-footer indexFot">
	<ul>
		<li v-if="!isLogin">
			<a href="javascript:;" @click="loginFree()">
				<i class="yo-icon icon-free"></i>
				<span>免费试玩</span>
			</a>
		</li>
		<li @click="login()" v-if="!isLogin">
			<a href="javascript:;">
				<i class="yo-icon icon-account"></i>
				<span>立即登录</span>
			</a>
		</li>
		<li @click="forgetPwd()" v-if="!isLogin">
			<a href="javascript:;">
				<i class="yo-icon icon-forget"></i>
				<span>忘记密码</span>
			</a>
		</li>
		<li v-if="isLogin" @click="payment()">
			<a href="javascript:;" >
				<i class="yo-icon icon-topup"></i>
				<span>快速充值</span>
			</a>
		</li>
		<li v-if="isLogin" @click="drawData()">
			<a href="javascript:;" >
				<i class="yo-icon icon-withdrawal"></i>
				<span>线上取款</span>
			</a>
		</li>
		<li v-if="isLogin" @click="transactionRecord()">
			<a href="javascript:;" >
				<i class="yo-icon icon-betrecord"></i>
				<span>下注记录</span>
			</a>
		</li>
		<li @click="openOnlineService()">
			<a :href="onLineService === undefined ? 'javascript:void(0)' : onLineService.junctionSim">
				<i class="yo-icon icon-service"></i>
				<span>在线客服</span>
			</a>
		</li>
	</ul>
</div>
</template>
<script>
import * as types from '@/base/store/home/type'
import * as statusCode from '@/base/utils/status_const'
import * as payment from '@/base/store/payment/type'
export default {
  data () {
    return {}
  },
  computed: {
    isLogin () {
      return this.$store.state.home.isLogin
    },
    onLineService () {
      return this.$store.state.home.onlineservice
    },
/** 后端传入值为0 和 1 */
    type () {
      return this.$store.state.home.type
    }
  },
  methods: {
    forgetPwd () {
      // 埋点
      window._dinWarmUp && window._dinWarmUp('send', 'event', 'Link', '忘记密码', '忘记密码')
      this.$router.push('/wap/forgetPassword')
    },
    login () {
      // 埋点
      window._dinWarmUp && window._dinWarmUp('send', 'event', 'Link', '立即登录', '立即登录')
      this.$router.push('/wap/login')
    },
    payment () {
      if (Number(this.type) === 1) {
        window.layer.msgWarn('对不起，充值功能不对试玩账号开放！')
        return false
      } else if (!window.navigator.onLine) {
        window.layer.msgWarn('网络连接中断，请检查您的网络！')
      } else {
        // 埋点
        window._dinWarmUp && window._dinWarmUp('send', 'event', 'Link', '快速充值', '快速充值')
        // 每次点击置空支付类型
        this.$store.state.payment.bankType = null
        window.moduleRouter.push('/' + window.moduleRouter._payKey + '/payment') // 跳转支付项目
      }
    },
    transactionRecord () {
      // 埋点
      window._dinWarmUp && window._dinWarmUp('send', 'event', 'Link', '下注记录', '下注记录')
      this.$router.push('/wap/transactionRecord')
    },
    drawData () {
      if (Number(this.type) === 1) {
        window.layer.msgWarn('对不起，取款功能不对试玩账号开放！')
        return false
      } else {
        // 埋点
        window._dinWarmUp && window._dinWarmUp('send', 'event', 'Link', '线上取款', '线上取款')
        this.$store.dispatch(payment.INIT_DRAW_DATA_ACTION, {bankType: 0, 'loading': 'pass'}).then(res => {
          // 如果没有登录需要
          if (res.status === '0') {
            if (res.msg === '为保证您的权益，请先绑定您的出款资讯！') {
              window.layer.msgWarn(res.msg, function () {
                window.router.push('/wap/memberCenter/bindBankcard')
              })
            } else {
              window.layer.msgWarn(res.msg)
            }
          } else {
            window.router.push('/wap/memberCenter/onlineDraw')
          }
        }).catch(res => {
          console.log(' INITPAYMENT store error')
        })
      }
    },
    loginFree () {
      // 埋点
      window._dinWarmUp && window._dinWarmUp('send', 'event', 'Link', '免费试玩', '免费试玩')
      this.$store.dispatch(types.LOGIN_FREE_ACTION, {}).then(res => {
        if (res.status === statusCode.statusConst.SUCCESS) {
          this.$store.state.site.nowPosition = 0
          let versionList = window.indexMain.versionFun('initData', 'homeVersionKey')
          window.store.dispatch('initData.action', versionList) // 重新获取首页信息
          window.layer.msgWarn('您已进入试玩模式，请尽情体验！！', () => {
            this.$store.state.home.gameNoticeFlag = true // 首页游戏公告显示
            this.$router.push('/wap/index')
          })
        }
      })
    },
    openOnlineService () {
      // 埋点
      window._dinWarmUp && window._dinWarmUp('send', 'event', 'Link', '在线客服', '在线客服')
    }
  }
}
</script>
