<template>
	<div class="mainBox">

		<div class="notice-detail-box">
			<div class="title">
				{{announceDetail.title}}
				<div class="time">
					{{announceDetail.time}}
				</div>
			</div>
			<div class="content">
				{{announceDetail.content}}
			</div>
		</div>
	</div>
</template>
<script>
	import { mapState } from 'vuex'
	export default {
	  name: 'userCenter',
	  data () {
	    return {
	      // titile: '', // 标题
	      // time: '', // 时间
	      // content: '' // 内容
	    }
	  },
	  computed: {
	    ...mapState({
	      announceDetail: state => state.announcement.announceDetail
	    })
	  },
	  methods: {
	    initData () {
	      // let text = this.$route.query
	      // this.titile = text.titile
	      // this.time = text.time
	      // this.content = text.content
	    }
	  },
	  components: {
	  },
	  mounted () {
	    this.$store.state.home.headerType = 6
	    this.$store.state.home.headTitle = '公告管理'
	    this.initData()
	  }
	}
</script>