<template>
<div class="mu-paper" :class="paperClass">
  <slot></slot>
</div>
</template>

<script>
export default {
  name: 'mu-paper',
  props: {
    circle: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: true
    },
    zDepth: {
      type: Number,
      default: 1
    }
  },
  computed: {
    paperClass () {
      var arr = []
      if (this.circle) arr.push('mu-paper-circle')
      if (this.rounded) arr.push('mu-paper-round')
      arr.push('mu-paper-' + this.zDepth)
      return arr
    }
  }
}
</script>
