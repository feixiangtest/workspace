<template>
    <longshow :luZiMapTXT="luZiMapTXT" :selectLuzi='selectLuzi'></longshow>
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
            {'code': 'hhAB', 'name': '混合大小'},
            {'code': 'hhCD', 'name': '混合单双'}
      ],
      selectLuzi: 'pcddLuziShow'
    }
  }
}
</script>
