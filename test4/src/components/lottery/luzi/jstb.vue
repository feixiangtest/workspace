<template>
    <longshow :selectLuzi='selectLuzi' :luZiMapTXT="luZiMapTXT"></longshow>
</template>
<script>
import longshow from '../longshow'

export default {
  components: {
    longshow
  },
  data () {
    return {
      luZiMapTXT: [
        {'code': 'zhdx', 'name': '总和大小'},
        {'code': 'zhds', 'name': '总和单双'}
      ],
      selectLuzi: 'ksLuziShow'
    }
  }
}
</script>
