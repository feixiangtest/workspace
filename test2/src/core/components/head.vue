<template>
  <div id="memberHea" class="memberHea">
    <div class="heaTop">
      <div class="center">
        <span class="mdTime"><i class="el-icon-time"></i> 美东时间：{{date}}</span>
      </div>
    </div>
    <div class="heaCon">
      <div class="center memberCen clearfix">
        <div class="logo"><img :src="'../../../resource/'+station.durl+'/images/log-top.png'" alt=""></div>
        <div class="nav">
          <el-button plain @click="func()">线上存款</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as dateUtil from '@s/utils/dateUtils'
export default {
  name: 'memberHea',
  data () {
    return {
      date: '',
      station: JSON.parse(window.localStorage.getItem('station')) || {}
    }
  },
  methods: {
    func () {
      this.$router.push('/center/bankTransaction/onlinePayment')
    },
    usaTime () {
      setInterval(() => {
        this.date = dateUtil.usaTime()
      }, 1000)
    }
  },
  created () {
    this.usaTime()
  }
}
</script>
