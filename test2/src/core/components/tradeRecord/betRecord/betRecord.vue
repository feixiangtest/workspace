<template>
  <div class='contentBox'>
    <!--投注记录搜索-->
    <bet-search></bet-search>
    <!--投注记录列表-->
    <content-table :titleListData="titleList" :contentListData="contentList"></content-table>
    <!--提示信息 根据选择平台不同，使用的时间不同，提示不同信息  有美东标准时间为 -5，夏令时间为 -4；格林时间为 0；北京时间 8 -->
    <p style='color:red;' v-if='bjTimePlatforms.indexOf(curreCode.toUpperCase())>-1'>
      <span v-if='curreCode==="AB"'>温馨提示：{{curreCode}}视讯游戏时间按北京时间计算，返水统计时间为前一天12:00至早上12:00</span>
      <span v-else>温馨提示：{{curreCode}}视讯游戏时间按北京时间计算，返水统计时间为前一天08:00至早上08:00</span>
    </p>
    <p style='color:red;' v-if='greenTimePlatforms.indexOf(curreCode.toUpperCase())>-1'>
      温馨提示：{{curreCode}}视讯游戏时间按格林时间计算，返水统计时间为前一天08:00至早上08:00
    </p>
    <!--列表页脚-->
    <page-foot></page-foot>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import pageFoot from '@m/components/tradeRecord/pageFoot'
  import contentTable from '@m/components/tradeRecord/contentTable'
  import betSearch from '@m/components/tradeRecord/betRecord/betSearch'
  import * as tradeConfig from '@m/config/tradeRecord'
  export default {
    components: {
      betSearch,
      contentTable,
      pageFoot
    },
    data () {
      return {
        usaTimePlatforms: ['TY', 'CP', 'AG', 'IBC', 'BB', 'LEBO', 'CQ9', 'BG'], // 使用美东时间的平台列表
        bjTimePlatforms: ['OG', 'OPUS', 'AB', 'DS', 'PT', 'PP', 'NMG', 'CMD', 'MWG', 'VG', 'PNG', 'VGS'], // 使用北京时间的平台列表
        greenTimePlatforms: ['MG'], // 使用格林时间的平台列表
        // 投注记录的列表title
        titleList: tradeConfig.betTitleList
      }
    },
    computed: {
      ...mapState({
        // 获取制定平台投注记录
        contentList: state => state.tradeRecord.bettingRecordList,
        curreCode: state => state.tradeRecord.selectPlatform
      })
    }
  }
</script>
