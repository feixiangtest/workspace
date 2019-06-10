<template>
<div class="mu-circle-wrapper active" :style="{'width': size + 'px', 'height': size + 'px'}">
  <div class="mu-circle-spinner active" :class="{'mu-circle-secondary': secondary}" :style="spinnerStyle">
      <div class="mu-circle-clipper left">
          <div class="mu-circle" :style="{'border-width': borderWidth + 'px'}"></div>
      </div>
      <div class="mu-circle-gap-patch">
          <div class="mu-circle"></div>
      </div>
      <div class="mu-circle-clipper right">
          <div class="mu-circle" :style="{'border-width': borderWidth + 'px'}"></div>
      </div>
  </div>
</div>
</template>

<script>
import {getColor} from '../utils'
export default {
  name: 'circle',
  props: {
    size: {
      type: Number,
      default: 24
    },
    color: {
      type: String,
      default: ''
    },
    borderWidth: {
      type: Number,
      default: 3
    },
    secondary: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    spinnerStyle () {
      return {
        'border-color': getColor(this.color)
      }
    }
  }
}
</script>
