<template>
  <div class="voucherCenter">

    <public-header />

    <router-view/>

    <common-footer />
    
  </div>
</template>

<script>
import publicHeader from '@/components/header/header.vue'
import commonFooter from '@/components/footer/commonFoot.vue'
export default {
  name: 'voucherCenter',
  data () {
    return {
    }
  },
  computed: {
  },
  components: {
    publicHeader,
    commonFooter
  },
  watch: {
    $route () {
      window.indexMain.ifRouteChange()
    }
  },
  mounted () {
    window.indexMain.ifRouteChange()
  }
}
</script>
