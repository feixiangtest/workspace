<template>
	<main>
		<div class="inner-banner">
			<figure class="live-banner"></figure>
		</div>
		<div class="page-content-wrap live-content-bg">
			<div class="contentBox">
				<div class="live-content">
					<div class="live-tab-wrap">
						<div class="live-tab-box">
							<ul>
								<li v-for="(item,index) in liveList" :key="index" :class="item.class" :style="item.key === 'og'?'top: 0;display: block;':''">
									<div class="live-button">
										<a href="javascript:;" @click="$jumpLive(item.key)" v-if="item.key">游戏规则</a>
										<a href="javascript:;" @click="$jumpLive(item.key)" v-if="item.key">进入游戏</a>
									</div>
								</li>
							</ul>
						</div>
						<div class="live-tab-title">
							<ul class="clearfix">
								<li v-for="(item,index) in liveList" :key="index" :class="['title-'+item.class, index ===0 ?'cur':'']" :style="item.key === 'og'?'margin-left: -2px;':''"></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>
<script>
import menuBar from './header/menuBar'
export default {
  name: 'live',
  data () {
    return {
      liveList: [
        {
          key: 'og',
          platform: 'OG平台',
          class: 'og'
        },
        {
          key: 'ag',
          platform: 'AG平台',
          class: 'ag'
        },
        {
          key: 'bb',
          platform: 'BB平台',
          class: 'bbin'
        },
        {
          key: 'ab',
          platform: 'ALLBET平台',
          class: 'ab'
        },
        {
          key: 'bg',
          platform: 'BG平台',
          class: 'bg'
        },
        {
          key: '',
          platform: '',
          class: 'vgs'
        }
      ]
    }
  },
  components: {
    menuBar
  },
  mounted () {
    let $ = window.$
    let tabBox = $('.live-tab-box>ul>li')
    let boxBtn = $('.live-tab-box>ul>li .live-button')
    $('.live-tab-title>ul>li').each(function (index) {
      $(this).hover(function () {
        $(this).addClass('cur').siblings().removeClass('cur')
        $('.live-first-pic').hide()
        tabBox.siblings().stop().animate({
          'top': 500,
          'opacity': 0.5
        }, 300)
        boxBtn.stop().animate({
          'top': 500,
          'opacity': 0.5
        }, 300)
        tabBox.eq(index).stop().show().animate({
          'top': 0,
          'opacity': 1
        }, 300)
        boxBtn.eq(index).stop().animate({
          'top': 308,
          'opacity': 1
        }, 600)
      })
    })
  }
}
</script>

<style>
</style>
