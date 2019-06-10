<template>
  <div class="showBettingDetail floatPages">
    <div class="yoHeader">
        <div class="center">
            <div class="heaLeft" @click="close()">
                <i class="icon ion-ios-arrow-back"></i>
            </div>
            <div class="title headerItem">注单明细</div>
            <div class="heaRight"></div>
        </div>
    </div>

    <div class="scroll">
      <div class="container">
        <div class="list betName">
          <div class="list-heading">
            <h4 :style="parentToChild.bettingDetail.lotteryId === 100 || parentToChild.bettingDetail.lotteryId === 101 ? 'margin-top: 14px;' : ''">{{parentToChild.bettingDetail.lotteryName}}</h4>
            <p v-if="parentToChild.bettingDetail.lotteryId !== 100 && parentToChild.bettingDetail.lotteryId !== 101">第{{parentToChild.bettingDetail.period}}期</p>
          </div>
          <span v-if="parentToChild.bettingDetail.lotteryId === 24 && lotteryResult === '等待开奖'" @click = "cancelBetting()" class="undo"
           :class="{'unclick':getTimes().kaiPan === false || getTimes().seconds < 300000 || parentToChild.bettingDetail.status == 1}">
           撤单</span>
          <span class="lottery" :style="lotteryResult === '已中奖' ? 'color: #e93222;' : ''">{{lotteryResult}} </span>
        </div>
        <div class="list betTime">
          <h4>投注时间</h4>
          <span>{{parentToChild.bettingDetail.bettingDateStr}}</span>
        </div>
        <div class="list betContent">
          <h4>投注内容</h4>
          <div class="list-footer">
            <p>{{parentToChild.bettingDetail.project}}</p>
          </div>
        </div>
        <div class="list odds">
          <h4>赔率</h4>
          <span class="oddsNumber">{{parentToChild.bettingDetail.odds}}</span>
        </div>
        <div class="list betMoney">
          <h4>投注金额</h4>
          <span>¥{{parentToChild.bettingDetail.bettingMoney}}</span>
        </div>
        <div class="list split" v-if="parentToChild.bettingDetail.isBalance === '1'">
          <h4>派彩金额</h4>
          <span :class="payoutMoney === 0 ? 'zeroNumber' : 'splitNumber'">¥{{payoutMoney.toFixed(2)}}</span>
        </div>
        <div class="list lotteryNumber" v-if="parentToChild.bettingDetail.isBalance === '1'">
          <h4>开奖号码</h4>
          <div class="list-footer">
            <p v-html="openAward"></p>
          </div>
        </div>
        <div class="list betNumber">
          <h4>投注单号</h4>
          <span>{{parentToChild.bettingDetail.bettingCode}}</span>
        </div>
        <div class="list remarks">
          <h4>备注</h4>
          <span class="betCancel">{{remarks}}</span>
        </div>
      </div>
      <button @click="bettingAgain">再投一注 </button>
    </div>
  </div>
</template>

<script>
import * as lotteryMap from 'config/lotteryMap'
import * as lotteryDetail from 'config/lotteryDetail'
import * as statusCode from '../../../utils/status_const'
import * as types from '../../../store/bettingRecord/type'
// import * as type from '../../../store/home/type'
// import loading from '../../loading'

export default {
  data () {
    return {

    }
  },
  props: ['parentToChild'],
  mounted () { // 不依赖init
    // 禁用页面滚动
    this.hideOverflowY(true)
  },
  // 组件销毁前
  beforeDestroy () {
    this.close()
  },
  methods: {
    close () {
      this.$store.state.site.showBettingDetail = false
      this.hideOverflowY(false) // 解除页面滚动
    },
    // 禁用/解除页面滚动
    hideOverflowY (flag) {
      if (typeof flag === 'boolean') {
        let $dom = window.$('html,body')
        let className = 'hide-overflow-y'
        flag === true ? $dom.addClass(className) : $dom.removeClass(className)
      }
    },
    bettingAgain () {
      this.close()
      console.info('bettingAgain:', this.parentToChild.bettingDetail)
      this.$store.state.site.lotteryId = this.parentToChild.bettingDetail.lotteryId
      this.$store.state.site.nowPosition = 0
      let lotteryCode = lotteryMap.LotterySrc[this.parentToChild.bettingDetail.lotteryId]

      let shortName = lotteryMap.LotterySrc[this.parentToChild.bettingDetail.lotteryId] // 获取彩票类型的简写 如一分赛车(yfsc)
      let play = lotteryDetail.playType[shortName] // 获取指定玩法和其他信息
      console.info('play:', play)
      this.$store.state.site.lotteryPlayType = play // 将玩法存在site里面的playType

      for (let index in play.rtype) {
        if (play.rtype[index].type_id === this.parentToChild.bettingDetail.parentTypeId) {
          this.$store.state.site.nowTitle = play.rtype[index].name // 获取默认玩法的名字
          this.$store.state.site.nowMode = play.rtype[index].type_id// 获取默认玩法的type_id
          console.info('play.rtype[index]:', play.rtype[index])
          break
        }
      }
      localStorage.setItem(shortName.toUpperCase() + '_PLAYTYPE_H5', JSON.stringify(play))
      this.$store.state.site.nowLotteryName = ''
      this.$store.state.site.isBettingAgain = true
      this.$router.push('/lottery/' + lotteryCode)
      scrollTo(0, 0)
    },
    // 六合彩注单撤销
    cancelBetting (item) {
      let $this = this
      if (this.getTimes().kaiPan === false || this.getTimes().seconds < 300000 || this.parentToChild.bettingDetail.status === '1') {
        return false
      } else {
        window.layer.confirm('撤单后不可恢复，是否确认撤单？', function () {
          $this.hideOverflowY(false)
          let param = {lotteryId: $this.parentToChild.bettingDetail.lotteryId, bettingCode: $this.parentToChild.bettingDetail.bettingCode, period: $this.parentToChild.bettingDetail.periods}
          // this.$store.state.site.showBetLoading = true
          $this.$store.dispatch(types.BETTING_RECORD_CANCEL_ACTION, param).then(res => {
            if (res.status === statusCode.statusConst.SUCCESS) {
              window.layer.open({
                title: '温馨提示',
                shadeClose: !1,
                content: '撤单成功',
                btn: ['我知道了'],
                yes: function (index) {
                  window.layer.close(index)
                  $this.$store.state.site.isNormal = 'N'
                  res.data && res.data.balance && ($this.$store.state.home.balance = res.data.balance)
                  $this.searchData()
                  // $this.getBetRecordDetail($this.selectedB, item.period)
                  // $this.$store.dispatch(types.GET_BSLANCE_ACTION)
                }
              })
            } else {
              // this.$store.state.site.showBetLoading = false
              window.layer.msgWarn(res.msg)
            }
          })
          // $this.$store.state.site.nowPosition = 0
          // scrollTo(0, 0)
          // $store.state.bettingRecord.bettingRecordList = list
        }, function () {
        })
      }
    },
    searchData () {
      let param = { currentPage: 1, pageSize: 10, lotteryId: 24, bettingStatus: '4', periodCode: this.parentToChild.bettingDetail.periods }
      this.$store.dispatch(types.BETTING_RECORD_ACTION, param).then(res => {
        this.$store.state.site.showBettingDetail = false
        if (res.data.unbalanceList !== null && res.data.unbalanceList.length !== 0) {
          let currentPage = res.data.total.currentPage
          let totalPage = Math.ceil(Number(res.data.total.totalCount) / 10)
          let detailCancel = { currentPage: currentPage, totalPage: totalPage }
          this.$emit('detailCancel', detailCancel)
          // this.$store.dispatch(type.GET_BALANCE_ACTION)
        } else {
          window.layer.msgWarn(res.msg)
        }
        // this.$store.state.site.showBetLoading = false
      })
    },
    getTimes () {
      let period = {}
      this.$store.state.betZone.lotteryTimes.forEach((item) => {
        if (item.lotteryId === 24) {
          period = { kaiPan: item.isFengPan, seconds: item.seconds }
          return period
        }
      })
      return period
    }
  },
  computed: {
    // 备注
    remarks () {
      if (this.parentToChild.bettingDetail.status === '1') {
        if (this.parentToChild.bettingDetail.op === '4') {
          return '注单撤销'
        } else {
          return '注单取消'
        }
      }
      switch (this.parentToChild.bettingDetail.op) {
        case '1' : return '注单取消'
        case '2' : return '注单回结'
        case '3' :
          if (this.parentToChild.bettingDetail.isBalance === '0') { // 如果未结算
            return '注单重建'
          } else {
            return '注单重结'
          }
        case '4': return '注单撤销'
        default: return ''
      }
    },
    // 派彩金额
    payoutMoney () {
      if (this.parentToChild.bettingDetail.isWinning === 'Y') { // 已中奖
        return parseInt(this.parentToChild.bettingDetail.bettingMoney) + this.parentToChild.bettingDetail.memberResult
      } else {
        return 0
      }
    },
    // 开奖结果
    lotteryResult () {
      if (this.parentToChild.bettingDetail.isBalance === '0') {
        if (this.parentToChild.bettingDetail.op === '4') {
          return '已撤单'
        } else {
          return '等待开奖'
        }
      } else {
        if (this.parentToChild.bettingDetail.isWinning === 'Y') {
          return '已中奖'
        } else if (this.parentToChild.bettingDetail.isWinning === 'C') {
          return '已撤单'
        } else {
          return '未中奖'
        }
      }
    },
    // 开奖号码
    openAward () {
      // 为了保证一行最多20个字符，并且一个数字不被分成两行展示，所以做以下处理
      let awardArray = this.parentToChild.bettingDetail.award.split(',')
      let count = 0
      let awardStr = ''
      awardArray.forEach(item => {
        item += ','
        count += item.length
        if (count > 20) {
          awardStr += '<br>'
          count = 0
        }
        awardStr += item
      })
      awardStr = awardStr.substring(0, awardStr.length - 1) // 删除字符串最后一个逗号
      return awardStr
    }
  }
}
</script>
