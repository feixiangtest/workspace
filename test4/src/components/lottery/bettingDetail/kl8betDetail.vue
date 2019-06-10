<template>
<div class="yoPage yoPage1">
    <!--header-->
    <div class="yoHeader">
      <div class="center">
          <div class="heaLeft" @click="cancel()">
              <i class="icon ion-ios-arrow-back"></i>
          </div>
          <div class="title">下注明细</div>
      </div>
    </div>

    <!--內容-->
    <div class="yo-detail-con">
      <div class='contentHeader'>
        <span class="contentspan">共<b class="assertive">{{ betAmount }}</b>笔注单</span>
        <span class="contentspan">合计￥<b class="assertive">{{ total }}</b></span>
      </div>
      <div class="" >
      <table class="table table-bordered table-bet mb0">
        <tbody>
        <tr :key=" 'bet_' + index " v-for="(item, index) in list">
          <td>
            <p>{{ titile }}</p>
            <p>
              <span style="color:blue;">{{currentPeriodNo| period(currentPeriodNo,true,nowLotteryId)}}</span>期
            </p>
          </td>
          <td style="padding-left: 0px;padding-right: 0px;">
              <p>
                <span v-if="nowMode === 2150100">{{item.typeName}}-</span><span>{{item.project}}</span>
              </p>
              <p>
                <b class="assertive">{{ item.odds }}</b>
              </p>
          </td>
          <td>
            <input type="text" class="input2" maxlength="8" v-model="item.gold" @input="updateValue(item, $event)" @click="recordIndex(index)">
          </td>
          <td>
            <a href="javascript:;" @click="deleteBet(index)">
              取消
            </a>
          </td>
        </tr>

        </tbody>
    </table>
    </div>
    </div>

    <!-- 底部 -->
    <betFooter></betFooter>
</div>
</template>

<script>
import betFooter from '../betFooter'
import * as commonService from '../../../service/betService/commonService'
export default {
  components: {
    betFooter
  },
  data () {
    return {
      list: this.mylist()
    }
  },
  methods: {
    mylist () {
      // this.$store.state.betZone.doBetList = this.$store.state.betZone.doBetList.sort((a, b) => a.project.charCodeAt() - b.project.charCodeAt()) // 比较ascii值排序
      this.$store.state.betZone.doBetList = this.$store.state.betZone.doBetList.sort((a, b) => a.oddsId - b.oddsId) // 比较ascii值排序
      return this.$store.state.betZone.doBetList
    },
    recordIndex (index) {
      // 记录要单独修改的记录下标
      console.info(index)
      this.$store.state.betZone.index = index
    },
    cancel () {
      this.$store.state.betZone.doBetList.splice(0, this.$store.state.betZone.doBetList.length) // 清空已经选择的球号
      this.$store.state.site.show = true
    },
    /**
     * 删除投注列表中的某一个对象
     */
    deleteBet (index) {
      if (this.$store.state.betZone.index === index) {
        this.$store.state.betZone.index = ''
      }
      this.$store.state.betZone.doBetList.splice(index, 1) // 删除数组
      if (this.$store.state.betZone.doBetList.length === 0) { // 如果删除了所有注单则回退
        this.$store.state.site.show = true // 回退
      }
    },
    /**
     * 触发total()，更新总价
     */
    updateValue (item, event) {
      let cash = event.currentTarget.value
      let value = cash.replace(/[^0-9]+/g, '')

      if (value.length > 8) { // 最大长度只能是8位
        item.gold = Number(value.substr(0, 8))
      } else if (Number(value) === 0) {
        item.gold = ''
      } else {
        item.gold = Number(value)
      }
      this.$store.state.betZone.flag = !this.$store.state.betZone.flag // 触发total()
    }
  },
  computed: {
    /**
     * 获取投注选中的数组
     * */
    betlist () {
      return this.$store.state.betZone.doBetList
    },
    /**
     * 注单数
     */
    betAmount () {
      return this.$store.state.betZone.doBetList.length
    },
    /**
     * 显示彩票名称
     */
    titile () {
      let name = this.$store.state.site.nowLotteryName
      if (name === undefined || name === '') { // 如果没有取到名字，从配置中根据彩票code获取
        return commonService.lotteryName(this.nowLotteryId)
      } else {
        return name
      }
    },
    /**
     * 显示合计数
     */
    total () {
      this.$store.state.betZone.flag = !this.$store.state.betZone.flag // 触发total()
      let list = this.$store.state.betZone.doBetList
      let money = 0
      for (let i = 0; i < list.length; i++) {
        money += Number(list[i].gold)
      }
      return money
    },
    /**
     * 当前玩法
     * 整合: 2140000
     * 正码: 2150100
     */
    nowMode () {
      return this.$store.state.site.nowMode
    },
    /**
     * 当前期数
     */
    currentPeriodNo () {
      return this.$store.state.betZone.currentPeriodNo
    },
    /**
     * 当前彩票id
     */
    nowLotteryId () {
      return this.$store.state.site.lotteryId
    }
  },
  mounted () {
  }
}
</script>

