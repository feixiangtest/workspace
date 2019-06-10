<template>
    <div class="miaomiaocai">
        <div class="yo-mmc-cen">
          <div class="yo-mmckaij">
            <h1>
              <!-- <img src="images/title-xzcg.png"> -->
              <img :src="'//sytl3.com'+imgUrl+'/mmc/title-mnkj.png'" v-if="$store.state.betZone.isSimulate">
              <img :src="'//sytl3.com'+imgUrl+'/mmc/title-xzcg.png'" v-if="!$store.state.betZone.isSimulate">
            </h1>
            <div class="yo-mmc-time">
              <h4 v-if="$store.state.betZone.isSimulate">本次开奖</h4>
              <h4 v-if="!$store.state.betZone.isSimulate">第{{ $store.state.betZone.awardTimes | numFilter }}次</h4>
              <ul id="lottery-numbers-board">
                <li class="num">
                  <span></span>
                  <label></label>
                </li>
                <li class="num">
                  <span></span>
                  <label></label>
                </li>
                <li class="num">
                  <span></span>
                  <label></label>
                </li>
                <li class="num">
                  <span></span>
                  <label></label>
                </li>
                <li class="num">
                  <span></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="yo-mmckjjj">
          <h2 v-if="$store.state.betZone.isSimulate">模拟奖号</h2>
          <h2 v-if="!$store.state.betZone.isSimulate">本次开奖</h2>
          <div class="kjjg">
            <!-- 金币动画 -->
            <div class="jinbidonghua">
                <div class="wrap">
                  <div id="dice" class="dice" style="cursor: pointer; left: -2px; top: 2px;"></div>
                </div>
            </div>
            <ul v-if="!$store.state.betZone.isSimulate" class="mmc-draw-message">
              <li class="yzj" v-for="(item, index) in awardResult" :key="index">
                <p class="yo-left"><span>第{{ item.awardTimes | numFilter }}次&nbsp;&nbsp;
                  <em>{{ item.awardNumber }}</em></span>&nbsp;&nbsp;<em v-if="item.awardWin">已中奖</em><em v-if="!item.awardWin">未中奖</em>
                </p>
                <div v-if="item.awardWin">
                  <p class="yo-right money">{{ item.awardMoney | awardMoneyFilter }}</p>
                  <img class="jb" :src="'//sytl3.com'+imgUrl+'/mmc/jinbi.png'">
                </div>
              </li>
            </ul>
            <ul v-if="$store.state.betZone.isSimulate" class="mmc-draw-message">
              <li v-for="(val, index) in simulateResult" :key="index"><p class="yo-left"><span>开奖结果&nbsp;&nbsp;<em>{{ val }}</em></span></p></li>
            </ul>
            <div class="clear"></div>
          </div>
          <div class="kjjg-tow" v-if="!$store.state.betZone.isSimulate">
            <ul>
              <li><p class="yo-left">奖金：</p><p class="yo-right money">{{ bonus | awardMoneyFilter }}</p></li>
            </ul>
          </div>
          <p class="tips" v-if="$store.state.betZone.isSimulate">注：模拟开奖结果，仅供您路珠走势参考分析！</p>
        </div>
        <div class="yo-mmc-but" v-if="$store.state.betZone.isSimulate" v-show="!isBegin" :class="$store.state.betZone.isSimulate ? 'isSimulate' : ''">
            <a class="but-yellow but-again" href="javascript:;" @click="playAgain">再次模拟</a>
            <a class="but-blue but-back" href="javascript:;" @click="backMmc(true)">返回开奖结果</a>
        </div>
        <div class="yo-mmc-but" v-if="!$store.state.betZone.isSimulate" v-show="!isBegin">
            <a class="but-blue but-back" href="javascript:;" @click="backMmc(false)">返回投注界面</a>
            <a class="but-yellow but-again" href="javascript:;" @click="openAgain">{{ currentWords }}</a>
        </div>
        <div class="yo-mmc-but" v-if="!$store.state.betZone.isSimulate" v-show="isBegin">
          <a class="but-yellow but-stop" href="javascript:;" @click="timeOut">暂停</a>
        </div>
    </div>
  </div>
</template>

<script>
import * as type from '../../store/betZone/type'
import * as statusCode from '../../utils/status_const'
import * as homeType from '../../store/home/type'
import * as mapping from 'config/mappingDefaultId'
let $ = window.$
export default {
  components: {
    // mmcBet
  },
  filters: {
    numFilter (num) {
      if (num < 10) {
        return '0' + num
      } else {
        return num
      }
    },
    awardMoneyFilter (num) {
      return (parseInt(num * 10000) / 10000).toFixed(2)
    }
  },
  computed: {
    currentWords () {
      let postData = this.$store.state.betZone.postData
      let num = Number(postData.betTime) - Number(this.$store.state.betZone.awardTimes)
      if (num > 0) {
        return '继续开奖'
      } else {
        return '再开一次'
      }
    },
    imgUrl () {
      return this.$store.state.home.commonImgUrl
    }
  },
  data () {
    return {
      isBegin: false,
      keepAnimat: true, // 保持动画
      bonus: 0, // 奖金
      simulateResult: [], // 模拟开奖结果
      awardResult: [], // 正式开奖结果
      currAwardWin: false // 本次开奖是否中奖
    }
  },
  created () {
    document.getElementById('app').style.property = ''
  },
  mounted () { // 不依赖 init 接口
    let width = window.innerWidth
    if (width < 370) { // 解决iphone5、Galaxy S5样式问题
      $('.yo-mmc-time ul li').css('margin', '0 4px')
      $('.yo-mmc-time ul li label').css('left', '49px')
    }
    window.document.documentElement.style.fontSize = '40px' // 单独设置秒秒彩字体样式，否则和赔率页面有冲突
    setTimeout(() => { // 延时200毫秒执行，避免浏览器前进或后退造成影响
      if (this.$route.query.playType === 'simulate') { // 模拟开奖
        this.$store.state.betZone.isSimulate = true
        this.simulateAward()
      } else { // 下注
        this.$store.state.betZone.isPause = false
        this.$store.state.betZone.isSimulate = false
        this.$store.state.betZone.awardTimes = 0
        this.isBegin = true
        // 首次开奖在上个页面，便于校验赔率，限额，游戏等
        if (this.$store.state.betZone.doBetList.length > 0) {
          this.bettingSuccess(this.$store.state.betZone.mmcBetResult)
        } else {
          this.$router.push('/lottery/mmc')
        }
      }
    }, 200)
  },
  methods: {
    numRand (item, speed = 1500) { // 开奖动画
      $('.num').css('backgroundPositionY', 0)
      let u = 46
      let result = item.awardNumber
      let numArr = (result + '').split('')
      var $this = this
      $('.num').each(function (index) {
        var $num = $(this)
        setTimeout(function () {
          $num.animate({backgroundPositionY: (u * 90) - (u * numArr[index])}, speed + index, 'swing', function () {
            if (index === 4) {
              if ($this.$store.state.betZone.isSimulate) {
                $this.simulateResult.splice(0, 0, result) // 模拟展示开奖结果
              } else { // 秒秒彩开奖结果
                if (item.awardWin) {
                  $this.jinbidonghua() // 中奖金币动画
                  $this.bonus += Number(item.awardMoney)
                }
                $this.awardResult.splice(0, 0, item)
              }
            }
          })
        }, index * 200)
      })
    },
    playAgain () { // 再次模拟
      this.simulateAward()
    },
    openAgain () { // 再开一次
      this.$store.state.betZone.isPause = false
      this.betting()
    },
    /**
     * 返回投注页面
     * @param {Boolean} showAward 是否显示开奖结果
     */
    backMmc (showAward) {
      this.$router.push('/lottery/mmc')
      if (showAward) { // 显示开奖结果
        this.$store.state.site.betListShow = false
        this.$store.state.site.awardShow = true
      }
    },
    timeOut () {
      this.$store.state.betZone.isPause = true
    },
    betting () { // 开奖
      this.isBegin = true
      var $this = this
      let list = this.$store.state.betZone.doBetList
      if (list === null || list.length === 0) {
        window.layer.msgWarn('请选择投注', function () {
          $this.$router.push('/lottery/mmc')
        })
        return
      }
      let token = new Date().getTime()
      let bettingList = []
      list.forEach(function (item, key) { // 组装下注参数
        let obj = {'project': item.project, 'typeId': item.typeId, 'odds': item.odds, 'gold': item.gold, 'fullname': item.project}
        bettingList.push(obj)
      })
      /* 根据lotteyId 获取该id的彩种系列对应的defaultId by vito */
      let defaultId = mapping.mapp[100]
      let param = {'period': '1', 'lotteryId': 100, 'token': token, 'bettingList': bettingList, parentTypeId: this.$store.state.site.nowMode}
      this.$store.dispatch(type.MMC_BETTING_ACTION, param).then(res => {
        if (res.status === statusCode.statusConst.FAILURE || res.status === statusCode.statusConst.CLOSEGAMESTAUS || res.status === statusCode.statusConst.CLOSEGAME) { // 失败了提示错误
          window.layer.msgWarn(res.msg)
          $this.isBegin = false
          $this.keepAnimat = false
        } else if (res.status === statusCode.statusConst.PERIODCLOSED) { // 关盘
          this.$store.state.site.show = true
          $this.isBegin = false
          $this.keepAnimat = false
          window.layer.msgWarn(res.msg)
        } else if (res.status === statusCode.statusConst.ODDSTAUS) { // 赔率发生变动
          $this.isBegin = false
          $this.keepAnimat = false
          window.layer.msgWarn('系统赔率变动，本次游戏不产生扣款，请重新开始游戏', function () {
            let param2 = {
              lotteryId: $this.$store.state.site.lotteryId
            }
            if ($this.$store.state.site.nowMode !== null) {
              param2['rtype'] = $this.$store.state.site.nowMode
            }
            // 获取到彩票赔率版本号信息，因为彩票需要特殊处理
            // 这里将lotteryId 改成 defaultId , 用于判断localStorage是否存在赔率 by vito
            let versionList = window.lotteryMain.lotteryVersionFun('showBet', 'showBetVersionKey',
            defaultId, $this.$store.state.site.nowMode !== null ? $this.$store.state.site.nowMode : '')
            param2['list'] = versionList
            // 获取玩法
            $this.$store.dispatch(type.BET_ODDS, param2)
            $this.$router.push('/lottery/mmc')
          })
        } else if (res.status === statusCode.statusConst.SUCCESS) { // 成功
          $this.keepAnimat = false
          this.bettingSuccess(res)
        }
      })
    },
    bettingSuccess (res) {
      let $this = this
      $this.$store.state.betZone.awardTimes += 1
      let times = $this.$store.state.betZone.awardTimes
      let item = {}
      if (res.data.awardMoney === null || res.data.awardMoney === 0 || res.data.awardMoney === '') { // 未中奖
        item = {'awardTimes': times, 'awardNumber': res.data.awardNumber.split(',').join(''), 'awardWin': false, 'awardMoney': 0}
        $this.currAwardWin = false
      } else { // 中奖
        item = {'awardTimes': times, 'awardNumber': res.data.awardNumber.split(',').join(''), 'awardWin': true, 'awardMoney': res.data.awardMoney}
        $this.currAwardWin = true
      }
      $this.numRand(item)

      // 将开奖信息添加到开奖结果
      $this.setAwardResult(res)
      // 刷新余额
      this.$store.dispatch(homeType.GET_BALANCE_ACTION)

      setTimeout(function () { // 延时7秒执行下一次加载，渲染页面开奖动画
        $this.isBegin = false
        if (Number($this.$store.state.betZone.postData.betTime) > Number($this.$store.state.betZone.awardTimes)) { // 当前开奖次数小于用户自定义开奖次数，继续开奖
          if ((!$this.$store.state.betZone.postData.winStop || !$this.currAwardWin) && !$this.$store.state.betZone.isPause) { // 非中奖即停或者当前没有中奖并且不是暂停状态，继续开奖
            $this.$store.state.betZone.isPause = false
            $this.betting()
          } else {
            $this.$store.state.betZone.isPause = true
          }
        }
      }, 3000)
    },
    simulateAward () { // 模拟开奖
      this.isBegin = true
      // this.setNumRand('00000')
      let param = {'lotteryId': '100'}
      var $this = this
      this.$store.dispatch(type.SIMULATE_ACTION, param).then(res => {
        if (res.status === statusCode.statusConst.FAILURE || res.status === statusCode.statusConst.MMCSIMULATE100STATUS) { // 失败了提示错误
          window.layer.msgWarn(res.msg)
          $this.keepAnimat = false
          this.isBegin = false
        } else if (res.status === statusCode.statusConst.PERIODCLOSED) { // 关盘
          this.$store.state.site.show = true
          $this.isBegin = false
          $this.keepAnimat = false
          window.layer.msgWarn(res.msg)
        } else if (res.status === statusCode.statusConst.SUCCESS || res.status === statusCode.statusConst.MMCSIMULATESTATUS) { // 成功
          $this.keepAnimat = false
          let item = {awardNumber: res.data.awardNumber.split(',').join('')}
          $this.numRand(item)

          // 将开奖信息添加到开奖结果
          $this.setAwardResult(res)

          setTimeout(function () { // 渲染页面加载动画
            $this.isBegin = false
            if (res.status === statusCode.statusConst.MMCSIMULATESTATUS) { // 当前95期
              window.layer.msgWarn(res.msg)
            }
          }, 3000)
        }
      })
    },
    setAwardResult (res) { // 组装开奖结果
      let awardResult = {}
      let awardNumbers = res.data.awardNumber.split(',')
      let num = 0
      for (let i = 0; i < awardNumbers.length; i++) {
        num += Number(awardNumbers[i])
      }
      awardResult.numberSum = num// 总和
      awardResult.number = awardNumbers// 处理彩球
      if (res.data.awardDate === null || res.data.awardDate === '' || res.data.awardDate === undefined) {
        awardResult.awardTime = res.data.awadTime// 处理开奖时间
      } else {
        awardResult.awardTime = res.data.awardDate// 处理开奖时间
      }
      this.$store.state.award.lotteryAwardTop10.splice(0, 0, awardResult) // 将开奖信息添加到开奖结果
      this.$store.state.award.lotteryAwardTop10.pop() // 删除最后一个元素保证最多只显示10期
    },
    setNumRand (num, speed = 5000) { // 后台请求数据返回之前保证开奖动画不停
      $('.num').css('backgroundPositionY', 0)
      let u = 46
      let result = num
      let numArr = (result + '').split('')
      var $this = this
      $('.num').each(function (index) {
        var $num = $(this)
        setTimeout(function () {
          $num.animate({backgroundPositionY: (u * 60) - (u * numArr[index])}, Number(speed) + Number(index), 'swing', function () {
            if (index === 4 && $this.keepAnimat) {
              $this.setNumRand(num)
            }
          })
        }, index * 200)
      })
    },
    jinbidonghua () {
      let dice = $('#dice')
      dice.animate({left: '+0px'}, 100, function () {
        dice.addClass('dice_0')
      }).delay(40).animate({top: '-0px'}, 100, function () {
        dice.removeClass('dice_0').addClass('dice_1')
      }).delay(40).animate({opacity: 'show'}, 600, function () {
        dice.removeClass('dice_1').addClass('dice_2')
      }).delay(40).animate({opacity: 'show'}, 600, function () {
        dice.removeClass('dice_2').addClass('dice_3')
      }).delay(40).animate({opacity: 'show'}, 600, function () {
        dice.removeClass('dice_2').addClass('dice_3')
      }).delay(40).animate({opacity: 'show'}, 600, function () {
        dice.removeClass('dice_3').addClass('dice_4')
      }).delay(40).animate({opacity: 'show'}, 600, function () {
        dice.removeClass('dice_4').addClass('dice_5')
      }).delay(40).animate({opacity: 'show'}, 600, function () {
        dice.removeClass('dice_5').addClass('dice_6')
      }).delay(40).animate({opacity: 'show'}, 600, function () {
        dice.removeClass('dice_6').addClass('dice_7')
      }).delay(40).animate({opacity: 'show'}, 600, function () {
        dice.removeClass('dice_7').addClass('dice_8')
      }).delay(40).animate({opacity: 'show'}, 600, function () {
        dice.removeClass('dice_8').addClass('dice_9')
      }).delay(40).animate({opacity: 'show'}, 600, function () {
        dice.removeClass('dice_9').addClass('dice_10')
      }).delay(40).animate({opacity: 'show'}, 600, function () {
        dice.removeClass('dice_9').addClass('dice_10')
      }).delay(40).animate({opacity: 'show'}, 600, function () {
        dice.removeClass('dice_10').addClass('dice_11')
      }).delay(40).animate({opacity: 'show'}, 600, function () {
        dice.removeClass('dice_11').addClass('dice_12')
      }).delay(40).animate({opacity: 'show'}, 600, function () {
        dice.removeClass('dice_12').addClass('dice_13')
      }).delay(40).animate({opacity: 'show'}, 600, function () {
        dice.removeClass('dice_13').addClass('dice_14')
      }).delay(40).animate({opacity: 'show'}, 600, function () {
        dice.removeClass('dice_14').addClass('dice_15')
      }).delay(40).animate({opacity: 'show'}, 600, function () {
        dice.removeClass('dice_15').addClass('dice_16')
      }).delay(40).animate({opacity: 'show'}, 600, function () {
        dice.removeClass('dice_16').addClass('dice_17')
      }).delay(40).animate({opacity: 'show'}, 600, function () {
        dice.removeClass('dice_17').addClass('dice_18')
      }).delay(40).animate({opacity: 'show'}, 600, function () {
        dice.removeClass('dice_18').addClass('dice_19')
      }).delay(40).animate({opacity: 'show'}, 600, function () {
        dice.removeClass('dice_19').addClass('dice_20')
      }).delay(40).animate({opacity: 'show'}, 600, function () {
        dice.removeClass('dice_20').addClass('dice_21')
      }).delay(40).animate({opacity: 'show'}, 600, function () {
        dice.removeClass('dice_21').addClass('dice_22')
      }).delay(40).animate({opacity: 'show'}, 600, function () {
        dice.removeClass('dice_22').addClass('dice_23')
      }).delay(40).animate({opacity: 'show'}, 600, function () {
        dice.removeClass('dice_23').addClass('dice_24')
      }).delay(40).animate({opacity: 'show'}, 600, function () {
        dice.removeClass('dice_24').addClass('dice_25')
      }).delay(30).animate({opacity: 'show'}, 600, function () {
        dice.removeClass('dice_25').addClass('dice_26')
      }).delay(30).animate({opacity: 'show'}, 600, function () {
        dice.removeClass('dice_26').addClass('dice_27')
      }).delay(30).animate({opacity: 'show'}, 600, function () {
        dice.removeClass('dice_27').addClass('dice_28')
      }).delay(30).animate({opacity: 'show'}, 600, function () {
        dice.removeClass('dice_28').addClass('dice_29')
      }).delay(30).animate({opacity: 'show'}, 600, function () {
        dice.removeClass('dice_29').addClass('dice_30')
      }).delay(30).animate({opacity: 'show'}, 600, function () {
        dice.removeClass('dice_30').addClass('dice_31')
      }).delay(50).animate({left: '-0px', top: '0px'}, 100, function () {
        dice.removeClass('dice_31')
        dice.css('cursor', 'pointer')
      })
    }
  }
}
</script>
