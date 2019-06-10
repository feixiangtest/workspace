<template>
    <!-- 首页第一次登陆的文案 -->
    <div class="popupNotice" v-if="hpad">
        <span class="close" @click="hpad===''"></span>
        <p>
            {{hpad}}
        </p>
    </div>
</template>
<script>
export default {
  props: ['firstNoticeContent'],
  data () {
    return {}
  },
  computed: {
    hpad () {
      return this.$store.state.shareApi.hpad
    }
  },
  methods: {
  }
}
</script>

