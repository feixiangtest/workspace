<template>
    <!-- 会员同意协议之后的登录logo -->
        <div class="loginLogoBox" v-if='showLoginLogo'>
            <div class="imgBox">
                <img :src="loginAdvertisePic">
            </div>
            <div class="botBox">
                <button type="button" id="cboxClose" @click='closeLogoBox'></button>
            </div>
        </div>
</template>
<script>
export default {
  props: ['loginAdvertisePic'],
  data () {
    return {}
  },
  computed: {
    showLoginLogo () {
      return this.$store.state.copy.showLoginLogo
    }
  },
  methods: {
    closeLoginLogo () {
      this.$store.state.copy.showLoginLogo = false
    }
  }
}
</script>

