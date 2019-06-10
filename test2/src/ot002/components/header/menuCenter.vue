<template>
			<div class="logo-down" v-show="showMenuCenter">
				<div class="logo-down-menu">
					<ul class="clearfix">
						<li>
							<a href="javascript:;" @click="jumpUrl('/home',true)">
								<figure class="sy"></figure>
								<span>首页</span>
							</a>
						</li>
						<li>
							<a href="javascript:;" @click="toUrl('/center/myAccount/baseConsole')">
								<figure class="hy"></figure>
								<span>会员中心</span>
							</a>
						</li>
						<li>
							<a href="javascript:;" @click="$openChatWin">
								<figure class="kf"></figure>
								<span>在线客服</span>
							</a>
						</li>
						<li>
							<a href="javascript:;" @click="toUrl('/center/bankTransaction/onlinePayment')">
								<figure class="ck"></figure>
								<span>线上存款</span>
							</a>
						</li>
						<li>
							<a href="javascript:;" @click="toUrl('/center/bankTransaction/onlineWithdrawals',1,'线上取款')">
								<figure class="qk"></figure>
								<span>线上取款</span>
							</a>
						</li>
						<li>
							<a href="javascript:;" @click="toUrl('/center/bankTransaction/lineConversion')">
								<figure class="zh"></figure>
								<span>额度转换</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
</template>
<script>
  import { mapState } from 'vuex'
  export default {
    props: ['showMenuCenter', 'changeShowMenuCenter'],
    computed: {
      ...mapState({
        isLogin: state => state.user.isLogin // 登录状态
      })
    },
    methods: {
      jumpUrl (url, flag) {
        if (!this.isLogin && !flag) {
          window.store.state.shareApi.showPopLogin = true
          return false
        }
        this.$router.push({
          path: url
        })
      },
      toUrl (url, type, title) {
      // 试玩账号从首页链接进取款时也会弹框提示
        if (type === 1) {
          if (window.common.isFree()) {
            window.layer.msgWarn('对不起，' + title + '不对试玩账号开放！')
            return
          }
        }
        window.open(url, '_blank')
      }
    }
  }
</script>
