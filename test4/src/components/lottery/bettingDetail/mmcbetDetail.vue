<template>
  <div class="yoPage">
    <!--header-->
    <div class="yoHeader">
      <div class="center">
          <div class="heaLeft" @click="cancel()">
              <i class="icon ion-ios-arrow-back"></i>
          </div>
          <div class="title">下注明细</div>
          <div class="heaRight">
            <button class="betHeadmachin" @click="machineSelect" v-if="$store.state.site.nowMode !== 2391000 && $store.state.site.nowMode !== 2392000">机选</button>
          </div>
      </div>
    </div>
    <!--內容-->
    <div class="view-container yo-detail-con" style="padding-bottom:157px; overflow:auto;" >
      <div class='contentHeader'>
        <span style="margin-left: -45px">金额 <input type="tel" class="topInput" v-model="money" @input="inputMoney($event)"></span>
        <span style="padding-right: 10px;">共<b class="assertive">{{ betlist.length }}</b>笔注单</span>
        <span>合计￥<b class="assertive">{{ total }}</b></span>
      </div>
      <div class="">
      <table class="table table-bordered table-bet mb0">
        <tbody>
          <tr :key=" 'bet_' + index " v-for="(item, index) in betlist">
            <td>
              <p>{{ titile }}</p>
            </td>
            <td style="padding-left: 0px;padding-right: 0px;">
                <p>
                  <span>{{item.typeName}}-</span>
                  <span >{{item.project}}</span>
                </p>
                <p>
                  <b class="assertive">@{{ item.odds }}</b>
                </p>
            </td>
            <td>
              <input type="text" class="input2" :odds-id="item.oddsId" :value=" item.gold === 0 ? '' : item.gold " @input="betMoney($event, index)" @click="recordIndex(index)">
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
    <div id="mmcFix">
      <div id="betOption">
        <div class="range-area">
            <div class="txtshow">
                <span class="pull-left">连续开奖 : <span style="width: 31px">{{ postData.betTime }}次</span> </span>
                <span class="pull-right"> 最多连开  : 99次</span>
            </div>
            <div class="list">
                <div class="item range range-positive betNum">
                    <i class="i-minu" @click="betTimeChange(-1)"></i>
                    <input type="range"  id="vlume" v-model="postData.betTime" @input="vlumeChange" max="99" min="1">
                    <i class="i-add" @click="betTimeChange(1)"></i>
                </div>
            </div>
            <a id="winStop" :class="{'active': postData.winStop}" @click="winM()"> 中奖即停 </a>
        </div>

        <div id="betFooterA" class="foot-cen at-once">
            <a class="f-cm-a f-chip" href="javascript:;" @click="submitBets3S()" v-if="allowClick">马上开奖</a>
            <a class="f-cm-a f-chip" href="javascript:;" v-if="!allowClick">马上开奖</a>
        </div>
    </div>
    </div>
</div>
</template>

<script>
import * as betZoneType from '../../../store/betZone/type'
import * as statusCode from '../../../utils/status_const'
import * as commonService from '../../../service/betService/commonService'
import * as filter from '../../../filter/betlistFilter'
export default {
  components: {
  },
  data () {
    return {
      money: this.$store.state.betZone.doBetList.length > 0 ? this.$store.state.betZone.doBetList[0].gold : '',
      goldIndex: -1, // 下注金额下标
      postData: {
        betTime: 1,
        winStop: false
      },
      allowClick: true // 是否允许点击，避免重复提交
    }
  },
  methods: {
    submitBets3S () { // 开奖
      if (!this.allowClick) { // 正在提交中
        return
      }
      let flag = false
      this.$store.state.betZone.doBetList.forEach(function (item, key) {
        if (item.gold === undefined || item.gold === null || item.gold === '' || item.gold === 0) {
          flag = true
        }
      })
      if (flag) {
        window.layer.msgWarn('下注金额不能为空!')
      } else {
        this.$store.state.betZone.postData = this.postData
        this.mmcBetting()
        // this.$store.dispatch(betZoneType.CHECK_LOGIN_TOKEN_ACTION).then(res => {
        //   if (res.status === statusCode.statusConst.SUCCESS) { // 判断是否获取成功数据
        //     this.mmcBetting()
        //   } else {
        //     window.layer.msgWarn('未获取到用户认证信息或用户信息失效')
        //     this.allowClick = true
        //   }
        // })
      }
    },
    mmcBetting () { // 开奖
      let list = this.$store.state.betZone.doBetList
      if (list === null || list.length === 0) {
        window.layer.msgWarn('请选择投注')
        return
      }
      let token = new Date().getTime()
      let bettingList = []
      list.forEach(function (item, key) { // 组装下注参数
        let obj = {'project': item.project, 'typeId': item.typeId, 'odds': item.odds, 'oddsId': item.oddsId, 'gold': item.gold, 'fullname': item.project}
        bettingList.push(obj)
      })
      this.allowClick = false
      let param = {'period': '1', 'lotteryId': this.lotteryId, 'token': token, 'bettingList': bettingList, parentTypeId: this.$store.state.site.nowMode}
      this.$store.dispatch(betZoneType.MMC_BETTING_ACTION, param).then(res => {
        this.allowClick = true
        if (res.status === statusCode.statusConst.FAILURE || res.status === statusCode.statusConst.CLOSEGAMESTAUS || res.status === statusCode.statusConst.CLOSEGAME) { // 失败了提示错误
          let oddsId = (res.data && res.data.oddsId) || '' // 校验不通过的字段类型ID
          window.layer.msgWarn(res.msg, () => {
            if (oddsId) {
              window.$('[odds-id="' + oddsId + '"]').focus() // 聚焦到校验不通过的字段输入框内
            }
          })
        } else if (res.status === statusCode.statusConst.PERIODCLOSED) { // 关盘
          this.$store.state.site.show = true
          window.layer.msgWarn(res.msg)
        } else if (res.status === statusCode.statusConst.ODDSTAUS) { // 赔率发生变动
          window.layer.msgWarn('系统赔率变动，本次游戏不产生扣款，请重新开始游戏', function () {
            localStorage.clear()
            window.location.reload()
          })
        } else if (res.status === statusCode.statusConst.SUCCESS) { // 成功
          this.$store.state.betZone.mmcBetResult = res
          let routerUrl
          switch (this.lotteryId * 1) {
            case 100: // 东方秒秒彩
              routerUrl = '/lottery/mmc/Bet'
              break
            case 101: // 秒秒赛车
              routerUrl = '/lottery/mmsc/Bet'
              break
          }
          if (routerUrl) {
            this.$store.state.betZone.isSimulate = false
            this.$router.push(routerUrl)
          }
        }
      }).catch(res => {
        this.allowClick = true
      })
    },
    machineSelect () { // 机选
      if (window.store.state.betZone.mmcBettingClosed[this.lotteryId]) { // 已关闭投注
        return
      }
      let rtypeId = this.$store.state.site.nowMode // 获取玩法
      let title = this.$store.state.site.nowTitle // 玩法名
      let newlist = []
      if (rtypeId === 2310000 && title !== '整合') {
        newlist = filter.sscFilter(title, rtypeId, this.$store.state.betZone.bettList)
      } else {
        newlist = this.$store.state.betZone.bettList
      }

      let j = 0
      let len = 0
      for (let i = 0; i < newlist.length; i++) { // 保证能循环获取到机选赔率
        len += newlist[i].oddsList.length
      }
      for (let i = 0; i < len * 3; i++) {
        if (this.$store.state.betZone.doBetList.length !== len) {
          let gameLen = Math.round(Math.random() * (newlist.length - 1)) // 随机得到秒秒彩bettList的下标
          let itemLen = Math.round(Math.random() * (newlist[gameLen].oddsList.length - 1)) // 随机得到秒秒彩bettList的下标
          let list = newlist[gameLen].oddsList[itemLen]
          if (list && window._indexOf(this.$store.state.betZone.doBetList, list) < 0) {
            this.playMusic('chatAudio')
            if (this.money > 0) {
              list.gold = this.money
            } else {
              list.gold = this.$store.state.betZone.mmcChipMoney !== 0 ? this.$store.state.betZone.mmcChipMoney : ''
            }
            this.$store.state.betZone.doBetList.push(list)
            j++
            if (j === 3) { // 最多机选三个
              break
            }
          }
        } else {
          window.layer.msgWarn('玩法注数已达上限')
        }
      }
    },
    vlumeChange () {
      if (this.postData.betTime > 99) {
        this.postData.betTime = 99
      } else if (this.postData.betTime < 1) {
        this.postData.betTime = 1
      }
      document.getElementById('vlume').style.backgroundSize = this.postData.betTime > 95 ? this.postData.betTime - 2 + '% 35%' : this.postData.betTime + '% 35%'
      let $that = this
      setTimeout(function () {
        document.getElementById('vlume').style.backgroundSize = $that.postData.betTime > 95 ? $that.postData.betTime - 2 + '% 35%' : $that.postData.betTime + '% 35%'
      }, 10)
    },
    winM () {
      this.postData.winStop = !this.postData.winStop
    },
    betTimeChange (num) {
      if (this.postData.betTime === 1 && num === -1) {
        return
      } else if (this.postData.betTime === 99 && num === 1) {
        return
      } else {
        this.postData.betTime = Number(this.postData.betTime) + Number(num)
        if (this.postData.betTime > 99) {
          this.postData.betTime = 99
        } else if (this.postData.betTime < 1) {
          this.postData.betTime = 1
        }
      }
      if (this.postData.betTime === 99) {
        document.getElementById('vlume').style.backgroundSize = '98% 35%'
      } else {
        document.getElementById('vlume').style.backgroundSize = this.postData.betTime + '% 35%'
      }
    },
    recordIndex (index) {
      // 记录要单独修改的记录下标
      this.$store.state.betZone.index = index
      this.goldIndex = index
    },
    betMoney (event, index) {
      let money = 0
      let cash = event.currentTarget.value
      let value = cash.replace(/[^0-9]+/g, '')

      if (value.length > 8) { // 最大长度只能是8位
        money = Number(value.substr(0, 8))
      } else if (Number(value) === 0) {
        money = ''
      } else {
        money = Number(value)
      }
      event.currentTarget.value = money
      this.$store.state.betZone.doBetList[index].gold = Number(money)
      this.$store.state.betZone.flag = !this.$store.state.betZone.flag // 触发total()
    },
    inputMoney (event) {
      let cash = event.currentTarget.value
      let value = cash.replace(/[^0-9]+/g, '')

      if (value.length > 8) { // 最大长度只能是8位
        this.money = Number(value.substr(0, 8))
      } else if (Number(value) === 0) {
        this.money = ''
      } else {
        this.money = Number(value)
      }
      let val = this.money
      this.$store.state.betZone.doBetList.forEach(function (item, key) {
        item.gold = Number(val)
      })
      this.$store.state.betZone.flag = !this.$store.state.betZone.flag // 触发total()
    },
    /**
     * 返回投注页面
     */
    cancel () {
      this.$set(this.$store.state.site, 'show', true)
      this.$set(this.$store.state.betZone, 'shakeStatus', true) // 开启摇一摇
    },
    /**
     * 删除投注列表中的某一个对象
     */
    deleteBet (index) {
      if (this.$store.state.betZone.index === index) {
        this.$store.state.betZone.index = ''
      }
      let obj = this.$store.state.betZone.doBetList[index]
      this.$store.state.betZone.doBetList.splice(index, 1) // 删除数组
      this.doDelete(obj.typeId) // 组三，组六 进行处理
      let doc = document.getElementsByClassName('input2')
      if (doc.length === 1) {
        this.$store.state.site.show = true
        this.$set(this.$store.state.betZone, 'shakeStatus', true) // 开启摇一摇
      }
    },
    /**
     * 如果是组三，组六  还需要清空 this.$store.state.betZone.[prelist,midlist,afterlist] 的值
     */
    doDelete (typeId) {
      switch (typeId) {
        case 2391010:
        case 2392010:
          this.$store.state.betZone.prelist.splice(0, this.$store.state.betZone.prelist.length)// 前三，前六数组
          break
        case 2391020:
        case 2392020:
          this.$store.state.betZone.midlist.splice(0, this.$store.state.betZone.midlist.length)// 中三，中六数组
          break
        case 2391030:
        case 2392030:
          this.$store.state.betZone.afterlist.splice(0, this.$store.state.betZone.afterlist.length)// 后三，后六数组
          break
      }
    },
    /**
     * 根据下注页面里面的确定按钮赋值进入对象中，这里再取出来
     */
    singleMoney (index) {
      console.info('singleMoney')
      return this.$store.state.betZone.doBetList[index].gold
    }
  },
  created () {
    this.$set(this.$store.state.betZone, 'shakeStatus', false)
  },
  computed: {
    /**
     * 获取投注选中的数组
     * */
    betlist () {
      return this.$store.state.betZone.doBetList.sort((a, b) => a.oddsId - b.oddsId)
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
      this.$store.state.betZone.flag = !this.$store.state.betZone.flag
      let list = this.$store.state.betZone.doBetList
      let money = 0
      for (let i = 0; i < list.length; i++) {
        if (list[i].gold !== undefined) {
          money += Number(list[i].gold)
        }
      }
      return isNaN(money) ? 0 : money
    },
    lotteryId () {
      return this.$store.state.site.lotteryId
    }
  }
}
</script>
