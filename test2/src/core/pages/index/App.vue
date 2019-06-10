<template>
  <div id="app" style="height: 100%;width: 100%">
      <member-head></member-head>
    <router-view/>
  </div>
</template>

<script>
  import memberHead from '@/components/head.vue'
  export default {
    name: 'App',
    components: {
      memberHead
    },
    data () {
      return {
        // imgurl:require('@g/assets/logo.png')
      }
    }
  }
</script>
