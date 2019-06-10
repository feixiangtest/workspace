<template>
    <longshow :luZiMapTXT="luZiMapTXT" :selectLuzi='selectLuzi' v-if="getLoad"></longshow>
</template>
<script>
import longshow from '../longshow'

export default {
  props: {
    loadDone: Boolean
  },
  components: {
    longshow
  },
  data () {
    return {
      luZiMapTXT: [
            {'code': 'gjAB', 'name': '冠军大小'},
            {'code': 'gjCD', 'name': '冠军单双'},
            {'code': 'gyhAB', 'name': '冠亚和大小'},
            {'code': 'gyh', 'name': '冠亚和'},
            {'code': 'gyhCD', 'name': '冠亚和单双'}
      ],
      selectLuzi: 'pk10LuziShow'
    }
  },
  computed: {
    nowMode () {
      return this.$store.state.site.nowMode
    },
    getLoad () {
      if (this.$store.state.betZone.bettList.length > 0) {
        return true
      } else {
        return false
      }
    }
  },
  mounted () {
    if (this.$store.state.site.nowMode === 2710000) {
      this.luZiMapTXT = []
    } else {
      this.luZiMapTXT = [
        {'code': 'gjAB', 'name': '冠军大小'},
        {'code': 'gjCD', 'name': '冠军单双'},
        {'code': 'gyhAB', 'name': '冠亚和大小'},
        {'code': 'gyh', 'name': '冠亚和'},
        {'code': 'gyhCD', 'name': '冠亚和单双'}
      ]
    }
  }
}
</script>
