<template>
	<div>
		<div class="header">
					<div class="center">
							<com-header></com-header>
							<div class="neiBanner aboutBanner"></div>
							<last-new></last-new>
					</div>
			</div>
		<div class="center clearfix aboutMain">
			<div class="floatLf">
				<div class="abSidebar">
					<ul class="sidemenu">
						<li><router-link to="/">网站首页</router-link></li>
						<li><a href="javascript:;" @click="$jumpLive('ag')">AG视讯</a></li>
						<li><a href="javascript:;" @click="$jumpLive('og')">OG视讯</a></li>
						<li><a href="javascript:;" @click="$jumpLive('bb')">BB视讯</a></li>
						<li><a href="javascript:;" @click="$jumpLive('ab')">AB视讯</a></li>
						<li><a href="javascript:void(0);" @click="$openChatWin">在线客服</a></li>
						<li><router-link to="/promotion">优惠活动</router-link></li>
					</ul>
					<div class="sidemenuFooter"></div>
				</div>
			</div>

			<div class="aboutCont floatRi">
				<wenan-main></wenan-main>
			</div>
		</div>
		<div id="indexFoot">
			<div class="footer">
				<div class="center">
					<com-footer></com-footer>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import comHeader from '../comment/comHeader'
import lastNew from '../comment/lastNew'
import comFooter from '../comment/comFoot'
import wenanMain from './main'
export default {
  name: 'wenan',
  components: {
    comHeader,
    lastNew,
    comFooter,
    wenanMain
  },
  data () {
    return {}
  },
  mounted () {
    this.reStyle()
  },
  methods: {
    reStyle: function () {
      window.$('body').removeClass('indexBody')
      window.$('html').addClass('bannerHtml')
    }
  }
}
</script>
