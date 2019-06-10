<template>
	<div class="content-item nullBg" @click="turnToDetail()">
		<div class="title">
			{{title}}
			<span class="arrow">
				<i class="yo-icon icon-next"></i>
			</span>
		</div>
		<div class="content">
			{{content}}
			<div class="time">{{time}}</div>
		</div>
	</div>
</template>

<script>
	export default {
	  name: 'contentItem',
	  props: {
	    title: {
	      type: String
	    },
	    content: {
	      type: String
	    },
	    time: {
	      type: String
	    },
	    detailPage: {
	      type: String
	    }
	
	  },
	  methods: {
	    turnToDetail () {
	      this.$router.push(this.detailPage)
	    }
	  }
	}
</script>

<style>

</style>