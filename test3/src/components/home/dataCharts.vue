<template>
  <div class="data-charts">
        <div class="menu-tab sub-nav">
            <ul>
                <li>注单量</li>
                <li class="cur">下注金额</li>
                <li>有效投注额</li>
                <li>盈亏</li>
            </ul>
        </div>
        <div class="yow-relative chart-box ">
            <ve-ring class="yo-ring" :data="chartData" :settings="chartSettings" height="300px" :legend-visible="false"></ve-ring>
        </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VeRing from 'v-charts/lib/ring.common'
Vue.component(VeRing.name, VeRing)
export default {
  name: 'data-charts',
  data () {
    this.chartSettings = {
      roseType: 'radius',
      radius: ['8%', '50%']
    }
    return {
      chartData: {
        columns: ['平台', '下注金额'],
        rows: [
          { '平台': 'OG视讯' + 39 + '%', '下注金额': 39 },
          { '平台': 'BBIN视讯' + 15 + '%', '下注金额': 15 },
          { '平台': 'AB视讯' + 16 + '%', '下注金额': 16 },
          { '平台': 'AG视讯' + 30 + '%', '下注金额': 30 }
        ]
      }
    }
  },
  components: {
  }
}
</script>
