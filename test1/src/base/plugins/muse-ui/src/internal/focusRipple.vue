<template>
  <div class="mu-focus-ripple-wrapper">
    <div ref="innerCircle" :style="style" class="mu-focus-ripple"></div>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: ''
    },
    opacity: {
      type: Number
    }
  },
  computed: {
    style () {
      return {
        color: this.color,
        opacity: this.opacity
      }
    }
  },
  methods: {
    setRippleSize () {
      const el = this.$refs.innerCircle
      const height = el.offsetHeight
      const width = el.offsetWidth
      const size = Math.max(height, width)

      let oldTop = 0

      if (el.style.top.indexOf('px', el.style.top.length - 2) !== -1) {
        oldTop = parseInt(el.style.top)
      }

      el.style.height = `${size}px`
      el.style.top = `${(height / 2) - (size / 2) + oldTop}px`
    }
  },
  mounted () {
    this.setRippleSize()
  },
  updated () {
    this.setRippleSize()
  }
}
</script>
