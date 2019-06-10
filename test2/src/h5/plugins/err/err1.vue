<template>
  <div :class="aclass" v-if="regDate[message] && regDate[message].status == 'err' ">
    {{ regDate[message].txt }}
    <!-- -{{regDate[message].status}} -->
  </div>
</template>
<script>
  export default {
    data () {
      return {
        errName: 'complete',
        aclass: 'tips error_msg2'
      }
    },
    props: {
      regDate: {
        type: Object,
        default: function () {
          return {}
        }
      },
      message: {
        type: String,
        default: function () {
          return ''
        }
      }
    },
    computed: {},
    mounted () {
      let errList = {
        complete: {
          aclass: 'tips error_msg2'
        },
        reg: {
          aclass: 'tips error_msg2'
        }
      }
      this.errName = this.regDate.errName
      try { this.aclass = errList[this.errName].aclass } catch (e) {}
    },
    methods: {}
  }
</script>

