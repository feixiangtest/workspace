<!--
<template  v-if="errName == 'complete'">
  <p :class="aclass" v-if="regDate[message] && regDate[message].status" >{{ regDate[message].txt }}</p>
</template>
 v-if="errName == 'base' "
-->
<template>
  <div :class="aclass" v-if="regDate[message] && regDate[message].status">
    {{ regDate[message].txt }}
  </div>
</template>
<script>
  export default {
    data () {
      return {
        errName: 'complete',
        aclass: 'tips error_msg'
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
          // aclass: 'depTips red'
          aclass: 'tips error_msg'
        },
        reg: {
          aclass: 'tips error_msg'
        }
      }
      this.errName = this.regDate.errName
      try { this.aclass = errList[this.errName].aclass } catch (e) {}
    },
    methods: {}
  }
</script>
