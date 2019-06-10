<template>
	<div>
		<input type='text' />
        <button @click="search">搜索</button>
	</div>
</template>
<script>
	export default {
	  data () {
	    return {

	    }
	  },
	  methods: {
	    search () {
	      this.$store.state.help.mainType = 2
	    }
	  }
	}
</script>

