<template>
  <transition name="mu-ripple">
    <div class="mu-circle-ripple" :style="styles"></div>
  </transition>
</template>

<script>
import {merge} from '../utils'
export default {
  props: {
    mergeStyle: {
      type: Object,
      default () {
        return {}
      }
    },
    color: {
      type: String,
      default: ''
    },
    opacity: {
      type: Number
    }
  },
  computed: {
    styles () {
      return merge({}, {color: this.color, opacity: this.opacity}, this.mergeStyle)
    }
  }
}
</script>
