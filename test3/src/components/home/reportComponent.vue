<template>
  <div>
    <div v-if='reportData.length>0'>
      <div class="yow-content nullBg">
        <div class="menu-tab sub-nav">
          <ul>
            <li v-for='item in itemList' :key='item' @click='choozeGraph(item)' :class='{cur:selectItem === item}'>{{item}}</li>
          </ul>
        </div>
        <div class="yow-relative chart-box " style="height:auto;" v-if='selectItem==="盈亏"'>
          <ve-bar class="yo-ring yo-ve-bar" :data="profitLossData" :settings="profitLosSetting" :xAxis="xAxis"></ve-bar>
        </div>
        <div class="yow-relative chart-box " v-else>
          <ve-ring class="yo-ring" :extend="chartExtend" :data="chartData" :tooltip="tooltip" :settings="chartSettings" height="300px" :legend-visible="false"></ve-ring>
        </div>
        <div class="sum-title"><i class="yo-icon icon-betiing"></i>
          <span v-show='selectItem === "注单量"'>注单量：{{total_bettingNum}} </span>
          <span v-show='selectItem === "下注金额"'>下注金额：{{total_bettingAmount.toFixed(2)}} </span>
          <span v-show='selectItem === "有效投注额"'>有效投注额：{{total_realBettingAmount.toFixed(2)}} </span>
          <span v-show='selectItem === "盈亏"'>盈亏：{{total_profitLoss.toFixed(2)}} </span>
        </div>
      </div>
      <div class="bet-amount">
        <table class="bet-sum-table">
          <thead>
            <tr>
              <th width="35%">平台</th>
              <th width="25%">有效投注额</th>
              <th width="25%">盈亏</th>
              <th width="8%">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for='(item,index) in reportData' :key='index'>
              <td>
                <img :src="'/agentStatic/img/platformLogo/logo-'+ item.platformGameCode.toLowerCase() + '.png'"> {{item.platformChnName}}
              </td>
              <td>
                <span v-if='$route.query.accountName ||item.bettingAmount<=0'>{{item.realBettingAmount.toFixed(2)}}</span>
                <span class="link-txt" @click="toBetDetail(item)" v-else>{{item.realBettingAmount.toFixed(2)}}</span>
              </td>
              <td><span :class='item.profitLoss>=0 ? "":"warn-txt"'>{{item.profitLoss.toFixed(2)}}</span></td>
              <td @click="toPlatFormDetail(item)"><i class="yo-icon icon-next"></i></td>
            </tr>
            <tr>
              <td>总计：</td>
              <td><span>{{total_realBettingAmount.toFixed(2)}}</span></td>
              <td><span :class='total_profitLoss>=0 ? "":"warn-txt"'>{{total_profitLoss.toFixed(2)}}</span></td>
              <td @click="toTotalPlatFormDetail()"><i class="yo-icon icon-next"></i></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <no-data v-else></no-data>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VeRing from 'v-charts/lib/ring.common'
  import VeBar from 'v-charts/lib/bar.common'
  import Picker from '@/components/common/picker.vue'
  import noData from '@/components/noData.vue' // 暂无数据
  Vue.component(VeRing.name, VeRing)
  Vue.component(VeBar.name, VeBar)
  export default {
    name: 'multiPlatform',
    props: ['reportRes', 'reportData', 'toBetDetail', 'toPlatFormDetail'],
    data () {
      return {
        itemList: ['注单量', '下注金额', '有效投注额', '盈亏'], // tab切换列表
        selectItem: '下注金额', // 默认为注单量
        chartSettings: {
          // roseType: 'radius',
          radius: ['8%', '40%'],
          label: {
            'fontSize': '12'
          }
        },
        tooltip: {
          formatter (e) {
            // return e.name + '：' + e.value + '%'
            return e.name.replace('讯', '讯：')
          }
        },
        chartExtend: {
          tooltip: {
            // backgroundColor: 'green',
            extraCssText: 'left:0px;right:0px;width:35vw;margin:auto;text-align:center;white-space: normal;'
          }
        },
        profitLosSetting: {
          xAxisType: ['KMB', 'KMB'],
          itemStyle: {
            normal: {
              color: ['#FD6B71'], // 设置柱子颜色
              label: {
                show: true, // 柱子上显示值
                textStyle: {
                  color: '#333' // 值得颜色
                },
                formatter (e) {
                  return parseInt(e.value) === 0 ? '       ' + e.value : e.value
                }
              }
            }
          }
        },
        xAxis: { // x轴
          axisTick: { // 刻度
            show: true // 不显示刻度线
          },
          axisLabel: {
            textStyle: {
              color: '#878787' // 坐标值的具体的颜色
            }
          },
          splitLine: {
            show: true, // 去除网格分割线
            lineStyle: {
              color: ['#eee'] // 分割线的颜色
            }
          }
        },
        chartData: {}, // 报表数据（前三个tab的数据）
        profitLossData: {}, // 盈亏数据
        bettingNum: {}, // 注单量
        bettingAmount: {}, // 下注金额
        realBettingAmount: {}, // 有效投注额
        profitLoss: {}, // 盈亏
        // 总金额
        total_bettingNum: 0, // 总注单量
        total_bettingAmount: 0, // 总下注金额
        total_realBettingAmount: 0, // 总有效投注额
        total_profitLoss: 0, // 总盈亏
        iconList: []
      }
    },
    mounted () {
      // 计算每一项的数据
      this.handleData()
      this.chartData = JSON.parse(JSON.stringify(this.bettingAmount))
      this.profitLossData = JSON.parse(JSON.stringify(this.profitLoss))
    },
    watch: {
      // 每次更新数据，重新计算图标
      reportData () {
        this.handleData()
        this.chartData = JSON.parse(JSON.stringify(this.bettingAmount))
        this.profitLossData = JSON.parse(JSON.stringify(this.profitLoss))
      }
    },
    methods: {
      handleData () {
        if (this.reportData.length === 0) return
        this.countGraph('bettingNum', '注单量')
        this.countGraph('bettingAmount', '下注金额')
        this.countGraph('realBettingAmount', '有效投注额')
        this.countGraph('profitLoss', '盈亏')
      },
      countGraph (item, itemName) {
        // 计算某一个类型数据的数组，比如投注金额的数组
        let numArr = this.reportData.map(res => {
          return res[item]
        })
        // 将数组相加算总数，然后拼接一个total_，作为总计显示在页面上
        let amount = numArr.reduce((x, y) => x + y)
        this['total_' + item] = amount // 总金额赋值
        // 计算是否全部为0
        let isAllZero = (() => {
          for (let i = 0; i < numArr.length; i++) {
            if (numArr[i] !== 0) {
              return false
            }
          }
          return true
        })()
        let rows = this.reportData.map((res, index) => {
          // let num = (numArr[index] / amount * 100) // 每一个占比
          let num = this.getPercentWithPrecision(numArr, index, 2) // 每一个占比
          if (item === 'profitLoss') { // 如果是盈亏那么是一套柱形报表数据
            return {
              [item]: res.platformChnName,
              [itemName]: numArr[index].toFixed(2)
            }
          } else { // 如果不是盈亏就是饼状比例数据
            if (isAllZero) { // 全为0那么就是平均值
              num = 100 / numArr.length.toFixed(2) // 平均值,比如五个就是20%
            } else {
              if (num === 0) { // 如果不全为0,就把其中为0的忽略掉
                return ''
              }
            }
            return {
              [item]: res.platformChnName + num.toFixed(2) + '%',
              [itemName]: num.toFixed(2)
            }
          }
        })
        this[item] = {
          columns: [item, itemName],
          rows: rows
        }
      },
      // 总计详情数据
      toTotalPlatFormDetail () {
        let totalItem = {
          platformChnName: '总计',
          bettingNum: this.total_bettingNum,
          bettingAmount: this.total_bettingAmount,
          realBettingAmount: this.total_realBettingAmount,
          profitLoss: this.total_profitLoss
        }
  
        this.toPlatFormDetail(totalItem)
      },
      choozeGraph (item) {
        this.selectItem = item
        console.log('切换tab，改变图表')
        switch (item) {
          case '注单量':
          {
            this.chartData.columns = this.bettingNum.columns
            this.chartData.rows = this.bettingNum.rows
            break
          }
          case '下注金额':
          {
            this.chartData.columns = this.bettingAmount.columns
            this.chartData.rows = this.bettingAmount.rows
            break
          }
          case '有效投注额':
          {
            this.chartData.columns = this.realBettingAmount.columns
            this.chartData.rows = this.realBettingAmount.rows
            break
          }
          case '盈亏':
          {
            this.chartData.columns = this.profitLoss.columns
            this.chartData.rows = this.profitLoss.rows
            break
          }
        }
      },
      getPercentWithPrecision (valueList, idx, precision) {
        if (!valueList[idx]) {
          return 0
        }
        var sum = valueList.reduce(function (acc, val) {
          return acc + (isNaN(val) ? 0 : val)
        }, 0)
        if (sum === 0) {
          return 0
        }
        var digits = Math.pow(10, precision)
        var votesPerQuota = valueList.map(function (val) {
          return (isNaN(val) ? 0 : val) / sum * digits * 100
        })
        var targetSeats = digits * 100
        var seats = votesPerQuota.map(function (votes) {
          // Assign automatic seats.
          return Math.floor(votes)
        })
        var currentSum = seats.reduce(function (acc, val) {
          return acc + val
        }, 0)
        var remainder = votesPerQuota.map(function (votes, idx) {
          return votes - seats[idx]
        })
        // Has remainding votes.
        while (currentSum < targetSeats) {
          // Find next largest remainder.
          var max = Number.NEGATIVE_INFINITY
          var maxId = null
          for (var i = 0, len = remainder.length; i < len; ++i) {
            if (remainder[i] > max) {
              max = remainder[i]
              maxId = i
            }
          }
          // Add a vote to max remainder.
          ++seats[maxId]
          remainder[maxId] = 0
          ++currentSum
        }
        return seats[idx] / digits
      }
    },
    components: {
      Picker,
      noData
    }
  }
</script>

