<template>
  <!--弹窗层-->
  <div class="mmsc-award" :style="boxStyle">
    <!--内容区域-->
    <div class="content-area">
      <!--赛车动画区域-->
      <race-animate class="mmsc-race-animate" ref="raceAnimate" 
        @onCarSortChange="onCarSortChange"
        @onRaceingEnd="onRaceingEnd"
        @onOpenAwarded="onOpenAwarded"></race-animate>
      <!--开奖区域-->
      <div class="award-area">
        <div class="award-result">
          <!--本次开奖-->
          <div class="cur-title">本次开奖</div>
          <div class="current-result">
            <div class="result-no bjsc">
              <div class="ball-single ball-block ball-single_1">
                <i class="ball-border-bottom bottom-color"><i class="ball-border-top top-color"></i></i>
                <span class="ball-num">1</span>
              </div>
              <div class="ball-single ball-block ball-single_2">
                <i class="ball-border-bottom bottom-color"><i class="ball-border-top top-color"></i></i>
                <span class="ball-num">2</span>
              </div>
              <div class="ball-single ball-block ball-single_3">
                <i class="ball-border-bottom bottom-color"><i class="ball-border-top top-color"></i></i>
                <span class="ball-num">3</span>
              </div>
              <div class="ball-single ball-block ball-single_4">
                <i class="ball-border-bottom bottom-color"><i class="ball-border-top top-color"></i></i>
                <span class="ball-num">4</span>
              </div>
              <div class="ball-single ball-block ball-single_5">
                <i class="ball-border-bottom bottom-color"><i class="ball-border-top top-color"></i></i>
                <span class="ball-num">5</span>
              </div>
              <div class="ball-single ball-block ball-single_6">
                <i class="ball-border-bottom bottom-color"><i class="ball-border-top top-color"></i></i>
                <span class="ball-num">6</span>
              </div>
              <div class="ball-single ball-block ball-single_7">
                <i class="ball-border-bottom bottom-color"><i class="ball-border-top top-color"></i></i>
                <span class="ball-num">7</span>
              </div>
              <div class="ball-single ball-block ball-single_8">
                <i class="ball-border-bottom bottom-color"><i class="ball-border-top top-color"></i></i>
                <span class="ball-num">8</span>
              </div>
              <div class="ball-single ball-block ball-single_9">
                <i class="ball-border-bottom bottom-color"><i class="ball-border-top top-color"></i></i>
                <span class="ball-num">9</span>
              </div>
              <div class="ball-single ball-block ball-single_10">
                <i class="ball-border-bottom bottom-color"><i class="ball-border-top top-color"></i></i>
                <span class="ball-num">10</span>
              </div>
            </div>
          </div>
          <!--开奖记录表格-->
          <div class="award-record-area">
            <!--头部-->
            <div class="din-header">
              <div class="header-bg"></div>
            </div>
            <!--begin 表格 非模拟开奖-->
            <div class="din-table" v-if="!postData.simulate">
              <!--表格身体-->
              <div class="ymmc-tbody din-tbody">
                <table>
                  <tr v-for="(item, index) in awardRecord" :key="index" :class="{'win-bg': item.awardMoney > 0}">
                    <td width="20%"><div class="times-dv"><em>第{{item.currAwardTimes}}次</em></div></td>
                    <td width="50%"><div class="other-dv"><em>{{item.awardNum}}</em></div></td>
                    <td>
                      <div class="other-dv" v-if="item.awardMoney > 0">
                        <em>{{paserMoney(item.awardMoney) * 1 > 0 ? paserMoney(item.awardMoney) : ''}}<em>￥</em></em>
                        <div class="trophy-tr"></div>
                      </div>
                      <div v-if="item.awardMoney <= 0">未中奖</div>
                    </td>
                  </tr>
                </table>
              </div>
              <!--表格底部-->
              <table class="tfoot-bg">
                <tfoot>
                  <tr>
                    <td width="23%" class="total-title">共计中奖</td> <!--宽度设置主要是与开奖内容保持同一列，23%是苹果5尺寸的最小宽度比例-->
                    <td width="47%"></td>
                    <td class="total-money"><em :class="{'win-color': postData.totalAwardMoney > 0}">{{paserMoney(postData.totalAwardMoney)}}￥</em></td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <!--end 表格 非模拟开奖-->
            <!--begin 表格 模拟开奖-->
            <div class="din-table" v-if="postData.simulate">
              <!--表格身体-->
              <div class="ymmc-tbody din-tbody">
                <table>
                  <tr v-for="(item, index) in awardRecord.concat(todaySimulateResult)" :key="index">
                    <td><em>第{{item.currAwardTimes}}次</em></td>
                    <td><em>{{item.awardNum}}</em></td>
                  </tr>
                </table>
              </div>
            </div>
            <!--end 表格 模拟开奖-->
          </div>
          <div class="simulate-title" v-if="postData.simulate">
            <span>提示：模拟开奖结果，仅供号码走势分析！每日可免费游戏100次。</span>
          </div>
          <!--begin 按钮区域-->
          <div class="din-footer">
            <!--非模拟开奖，正式开奖-->
            <div v-if="!postData.simulate" class="button-style">
              <!--连续开奖 暂停游戏-->
              <div class="one-btn" v-if="postData.betTime > 1" v-show="!openAwardEnd && !postData.stopGameRun">
                <div class="btn" @click="stopGame(true)">暂停游戏</div>
              </div>
              <!--连续开奖 继续游戏-->
              <div class="two-btn" v-if="postData.betTime > 1" v-show="!openAwardEnd && postData.stopGameRun && !isRaceing">
                <div class="btn-left" @click="goBack">返回投注</div>
                <div class="btn-right" @click="stopGame(false)">继续游戏</div>
              </div>
              <!--连续开奖 开奖完成-->
              <div class="one-btn" v-if="postData.betTime > 1" v-show="openAwardEnd && !isRaceing">
                <div class="btn" @click="goBack">返回投注</div>
              </div>
              <!--单次开奖-->
              <div class="two-btn" v-if="postData.betTime === 1" v-show="openAwardEnd && !isRaceing">
                <div class="btn-left" @click="goBack">返回投注</div>
                <div class="btn-right" @click="bettingChannel(true)">再开一次</div>
              </div>
            </div>
            <!--模拟开奖-->
            <div v-if="postData.simulate" class="button-style">
              <div class="two-btn" v-show="openAwardEnd && !isRaceing">
                <div class="btn-left" @click="toLink('/lottery/mmsc', true)">返回开奖结果</div>
                <div class="btn-right" v-if="postData.currAwardTimes < 100" @click="bettingChannel(true)">再次模拟</div>
              </div>
            </div>
          </div>
          <!--end  按钮区域-->
        </div>
      </div>
      <!--中奖后的撒花等动画区域-->
      <div class="winning-area" v-if="!postData.simulate">
        <!--中奖盒子-->
        <div class="winning-box">
          <!--光芒背景-->
          <div class="shine-bg rotating"></div>
          <!--奖杯背景-->
          <div class="trophy-bg"></div>
        </div>
        <!--撒花-->
        <canvas id="canvas"></canvas>
      </div>
    </div>
  </div>
</template>
<script>
import * as type from 'store/betZone/type'
import * as statusCode from 'utils/status_const'
import sprinkleCanvas from '../../plugins/sprinkleCanvas'
import raceAnimate from 'components/common/raceAnimate'
export default {
  data () {
    return {
      boxStyle: '',
      postData: {
        betTime: 1, // 连续开奖次数
        winStop: false, // 中奖后暂停
        currAwardTimes: 0, // 当前开奖次数
        stopGameRun: false, // 是否暂停游戏
        totalAwardMoney: 0, // 累计中奖金额
        simulate: false // 是否模拟游戏
      },
      __doms: null,
      isRaceing: false, // 是否正在开奖动画中
      awardRecord: [], // 已显示到界面的开奖结果
      futureAwardRecord: [], // 即将需要显示到界面的开奖结果（动画完成时显示，显示后删除该数据）
      openAwardEnd: false // 是否开奖结束(包括单次开奖与连续开奖)
    }
  },
  components: {
    raceAnimate
  },
  created () {
    if (!this.judgeStatus()) {
      this.goBack()
      return
    }
    this.postData.simulate = this.$store.state.betZone.isSimulate // 是否模拟游戏
    this.postData.winStop = this.$store.state.betZone.postData.winStop // 中奖后暂停
    this.postData.betTime = this.$store.state.betZone.postData.betTime // 连续开奖次数
    this.postData.betTime = (this.postData.betTime && this.postData.betTime * 1) || 1
    this.initBoxStyle()
  },
  computed: {
    /**
     * 彩种ID
     */
    lotteryId () {
      return this.$store.state.site.lotteryId
    },
    /**
     * 是否停止游戏
     */
    isPause () {
      return this.$store.state.betZone.isPause
    },
    /**
     * 秒秒彩种，当前用户今日模拟开奖数据
     */
    todaySimulateResult () {
      let data = this.$store.state.betZone.todaySimulateResult || []
      let arr = []
      for (let i = 0; i < data.length; i++) {
        arr.push({
          currAwardTimes: data.length - i,
          awardNum: (data[i].number && data[i].number.replace(/,/g, ' ')) || ''
        })
      }
      if (this.postData.simulate) { // 模拟开奖
        this.postData.currAwardTimes = arr.length
      }
      return arr
    }
  },
  watch: {
    // 是否暂停游戏
    isPause (val) {
      this.postData.stopGameRun = val
    },
    // 监听总开奖次数
    'postData.currAwardTimes' (val) {
      if (val >= 100 && this.postData && this.postData.simulate) { // 模拟开奖
        this.openAwardEnd = true // 模拟开奖达到上限时，默认开奖结束
      }
    }
  },
  methods: {
    /**
     * 状态判断
     */
    judgeStatus () {
      let simulate = this.$store.state.betZone.isSimulate // 是否模拟游戏
      // 无下注数据则直接返回，防止刷新url时还停留在此页面
      if (!this.$store.state.betZone.doBetList.length && !simulate) {
        return false
      }
      return true
    },
    initStyle () {
      this.initStyleBall() // 初始化开奖球
    },
    // 初始化开奖球
    initStyleBall () {
      let $content = this.__doms.find('.result-no')
      let $balls = this.__doms.find('.ball-single')
      let ballH = $balls.height()
      let ballW = $balls.width()
      let marginT = ($content.width() - 10 * ballW) / 20
      $balls.css({'line-height': ballH + 'px', 'margin': '0 ' + marginT + 'px'})
      this.__doms.find('.ball-single:first').css({'margin-left': marginT >= 2 ? marginT - 2 : 0 + 'px'})
      this.__doms.find('.ball-single:last').css({'margin-right': marginT >= 2 ? marginT - 2 : 0 + 'px'})
      $balls.find('.ball-border-top').css({bottom: ballH * 0.55 + 'px'})
    },
    /**
     * 隐藏开奖弹窗
     */
    goBack () {
      this.$router.push('/lottery/mmsc')
      this.$store.state.site.show = true // 显示投注页面
    },
    paserMoney (num) {
      return (parseInt(num * 10000) / 10000).toFixed(2)
    },
    initBoxStyle () {
      this.boxStyle = 'height: ' + document.documentElement.clientHeight + 'px;'
    },
    /**
     * 投注通道，在投注前做些相关事情
     * @param {isForce} 是否强制下次开奖
     * @param {isDelayed} 如果本次调用判断可以进行投注，则是否延时投注（主要是连续投注时，不延时投注会导致上一次动画与下一次动画衔接太紧密）
     */
    bettingChannel (isForce, isDelayed) {
      // 正式开奖，非模拟开奖
      if (!this.postData.simulate) {
        let betTime = this.postData.betTime
        if (betTime > 1) { // 连续开奖
           // 开奖次数大于等于总开奖次数，投注结束（连续开奖不考虑isForce参数）
          if (this.postData.currAwardTimes >= this.postData.betTime) {
            this.openAwardEnd = true // 投注结束
          } else if ((this.postData.winStop && this.postData.totalAwardMoney > 0)) { // 中奖后暂停游戏，转换成单次开奖的逻辑
            this.openAwardEnd = true // 投注结束
            this.postData.betTime = 1 // 转换成单次开奖
          } else if (!this.postData.stopGameRun) { // 非停止游戏的情况下 投注
            setTimeout(this.betting, isDelayed === true ? 1000 : 0)
          }
        } else { // 单次开奖
          // 已开奖次数小于总开奖次数（单次开奖需要考虑isForce参数）
          if (isForce === true || this.postData.currAwardTimes < this.postData.betTime) {
            setTimeout(this.betting, isDelayed === true ? 1000 : 0) // 投注
          } else { // 投注结束
            this.openAwardEnd = true
          }
        }
      } else { // 模拟开奖
        if (isForce) {
          setTimeout(this.betting, isDelayed === true ? 1000 : 0)
        } else {
          this.openAwardEnd = true
        }
      }
    },
    /**
     * 正式投注接口
     */
    betting () {
      this.raceReady() // 开奖动画就绪
      this.isRaceing = true // 开奖动画中
      this.mmcBetting({}, (data) => { // 成功的回调函数
        if (!data) {
          return
        }
        let award = this.unshiftRecord(data) // 插入数据
        this.raceRun(award) // 开始开奖动画
      }, () => { // 失败的回调函数
        this.isRaceing = false
        this.goBack() // 隐藏开奖弹窗
      })
    },
    // 往前插入数据
    unshiftRecord (data) {
      let award = data.awardNumber && data.awardNumber.split(',') // 开奖结果
      if (!this.postData.simulate) { // 正式开奖
        this.futureAwardRecord.unshift({ // 往前插入数据
          currAwardTimes: this.postData.currAwardTimes + 1, // 当前开奖次数
          awardNum: award.join(' '), // 开奖结果
          awardMoney: data.awardMoney, // 中奖金额
          period: data.periodNo || data.awardTime // 期数
        })
      } else { // 模拟开奖
        this.futureAwardRecord.unshift({ // 往前插入数据
          currAwardTimes: data.times || 0, // 当前开奖次数
          awardNum: award.join(' '), // 开奖结果
          period: data.periodNo || data.awardDate // 期数(模拟开奖可能没有返回期数，只能用时间来填充)
        })
      }
      return award
    },
    /**
     * 开奖动画就绪
     * @param {Array} award 开奖结果
     */
    raceReady () {
      this.$refs.raceAnimate.$emit('waveFlag')
      this.$refs.raceAnimate.$emit('raceReady')
    },
    /**
     * 运行开奖动画
     * @param {Array} award 开奖结果
     * @param {Boolean} isWaveFlag 开始前是否挥旗
     */
    raceRun (award, isWaveFlag) {
      this.$refs.raceAnimate.$emit('raceRun', award, isWaveFlag)
    },
    /**
     * 监听赛车排序变化事件
     * @param {Array} carSortArr 赛车排序
     * @param {Boolean} isLast 是否最终排序
     */
    onCarSortChange (carSortArr, isLast) {
      let times = isLast ? 0 : 500
      setTimeout(() => { // 延时排序，看起来阶段性不那么强
        let $doms = this.__doms.find('.ball-single')
        $doms.removeClass('ball-single_1 ball-single_2 ball-single_3 ball-single_4 ball-single_5 ball-single_6 ball-single_7 ball-single_8 ball-single_9 ball-single_10')
        $doms.each(function (index) {
          if (index < carSortArr.length) {
            window.$(this).addClass('ball-single_' + carSortArr[index])
            window.$(this).find('.ball-num').html(carSortArr[index])
          }
        })
        $doms = null
      }, times)
    },
    /**
     * 单次游戏 赛车动画部分 结束的回调函数
     * @param {Array} carSortArr 赛车排序
     */
    onRaceingEnd (carSortArr) {
    },
    /**
     * 单次游戏 开奖动画部分 结束的回调函数
     */
    onOpenAwarded () {
      this.pushAwardRecord() // 添加数据，显示开奖结果到开奖列表
      if (!this.postData.simulate) { // 正式开奖
        let awardMoney = this.awardRecord && this.awardRecord[0] && this.awardRecord[0].awardMoney
        awardMoney = (awardMoney || 0) * 1
        if (awardMoney > 0) { // 本次中奖
          this.winningAnimate(this.againChannel) // 开始奖杯动画
        } else {
          this.againChannel()
        }
      } else {
        this.againChannel()
      }
    },
    againChannel () {
      this.isRaceing = false // 开奖动画结束
      this.bettingChannel(false, true) // 如果判断需要投注，则延时投注
    },
    /**
     * 给awardRecord插入数据
     */
    pushAwardRecord () {
      this.awardRecord.unshift(...this.futureAwardRecord)
      this.futureAwardRecord = [] // 清空
      if (!this.postData.simulate) { // 正式开奖
        let totalMoney = 0
        for (let o of this.awardRecord) {
          totalMoney = totalMoney * 1 + (o.awardMoney || 0) * 1
        }
        this.postData.currAwardTimes = this.awardRecord.length // 实际开奖次数
        this.postData.totalAwardMoney = totalMoney // 总中奖金额
      } else { // 模拟开奖
        this.postData.currAwardTimes = this.awardRecord.length ? this.awardRecord[0].currAwardTimes : 1
      }
    },
    /**
     * 是否暂停游戏
     * @param {Boolean} flag true代表即将要暂停游戏，false反之
     */
    stopGame (flag) {
      this.postData.stopGameRun = !!flag
      this.$store.state.betZone.isPause = !!flag
      if (!flag) {
        this.bettingChannel() // 继续游戏
      }
    },
    // 路由跳转
    toLink (link, showAward) {
      this.$router.push(link)
      if (showAward) { // 显示开奖结果
        this.$store.state.site.betListShow = false
        this.$store.state.site.awardShow = true
      }
    },
    /**
     * 即开彩系列下注函数
     * @param {Object} op 自定义的其他参数
     * @param {Function} successFun 成功的回调函数
     * @param {Function} failFun 失败的回调函数（不是error，是status=200但是有其他限制时的回调，如：未登陆）
     */
    mmcBetting (op, successFun, failFun) {
      let param = null
      let url = ''
      if (!this.postData.simulate) { // 正式开奖
        let list = this.$store.state.betZone.doBetList
        let bettingList = []
        list.forEach(function (item, key) { // 组装下注参数
          let obj = {'project': item.project, 'typeId': item.typeId, 'odds': item.odds, 'gold': item.gold, 'fullname': item.project}
          bettingList.push(obj)
        })
        param = {'period': '1', 'lotteryId': this.lotteryId, 'token': new Date().getTime(), 'bettingList': bettingList}
        url = type.MMC_BETTING_ACTION
      } else { // 模拟开奖
        param = {'lotteryId': this.lotteryId}
        url = type.SIMULATE_ACTION
      }
      if (op && !window.$.isEmptyObject(op)) { // 继承自定义参数
        param = window.$.extend(true, {}, op, param)
      }
      this.$store.dispatch(url, param).then(res => {
        if (res.status === statusCode.statusConst.FAILURE || res.status === statusCode.statusConst.CLOSEGAMESTAUS || res.status === statusCode.statusConst.CLOSEGAME) { // 失败了提示错误
          window.layer.msgWarn(res.msg)
          if (typeof failFun === 'function') {
            failFun(res)
          }
        } else if (res.status === statusCode.statusConst.PERIODCLOSED) { // 关盘
          window.layer.msgWarn(res.msg)
          this.$store.state.countDown.bettingState = 0 // 关闭投注
          if (typeof failFun === 'function') {
            failFun(res)
          }
        } else if (res.status === statusCode.statusConst.ODDSTAUS) { // 赔率发生变动
          window.layer.msgWarn('系统赔率变动，本次游戏不产生扣款，请重新开始游戏', () => {
            localStorage.clear()
            this.goBack()
          })
        } else if (res.status === statusCode.statusConst.SUCCESS) { // 成功
          if (typeof successFun === 'function') {
            successFun(res.data)
          }
        }
      }, res => {
        if (typeof failFun === 'function') {
          failFun(res)
        }
      })
    },
    // 初始化撒花画布的宽高
    initCanvas () {
      let $pBox = this.__doms.find('.winning-area')
      let canvas = document.getElementById('canvas')
      canvas.width = $pBox.width()
      canvas.height = window.innerHeight // $pBox.height()
    },
    /**
     * 中奖之后的奖杯动画
     * @param {Function} callback 奖杯动画完成之后的回调函数
     */
    winningAnimate (callback) {
      let $wa = this.__doms.find('.winning-area').toggle(true) // 显示奖杯
      this.initCanvas() // 初始化画布高宽
      let timer = 2000 // 控制奖杯显示时间
      let startTime = +new Date()
      sprinkleCanvas.render(() => { // 开始撒花动画
        let timestamp = +new Date() - startTime
        setTimeout(() => {
          $wa.toggle(false) // 隐藏奖杯区域
          $wa = null
          if (typeof callback === 'function') {
            callback()
          }
        }, timestamp >= timer ? 0 : timer - timestamp)
      })
    },
    /**
     * 获取用户当天的模拟开奖历史纪录
     */
    getTodaySimulateHistory () {
      if (this.postData.simulate) { // 模拟开奖
        this.$store.dispatch(type.TODAY_SIMULATE_RESULT_ACTION, {'lotteryId': this.lotteryId}) // 获取模拟开奖数据
      }
    }
  },
  mounted () {
    // 状态判断
    if (!this.judgeStatus()) {
      this.goBack()
      return
    }
    this.__doms = window.$(this.$el) // 当前页面对象
    // 窗口大小调整的监听事件
    window.$(window).resize(() => {
      if (!this.isRaceing) { // 赛车动画执行中不作为
        this.initBoxStyle()
        this.initStyle()
      }
    })
    this.initStyle() // 初始化样式
    if (!this.postData.simulate) { // 正式开奖
      let awardObj = this.$store.state.betZone.mmcBetResult // 获取开奖结果
      awardObj = awardObj && awardObj.data
      if (!awardObj) {
        this.goBack()
      } else {
        setTimeout(() => {
          let award = this.unshiftRecord(awardObj) // 插入数据
          if (award) {
            this.raceReady() // 开奖动画就绪
            this.isRaceing = true // 开奖动画中
            this.raceRun(award) // 开始开奖动画
          } else {
            this.goBack()
          }
        }, 0)
      }
    } else { // 模拟开奖
      this.getTodaySimulateHistory() // 获取模拟开奖记录
      this.bettingChannel(true) // 如果是模拟开奖则强制调用
    }
  },
  // 组件销毁前事件
  beforeDestroy () {
    this.$store.state.betZone.isSimulate = false
  }
}
</script>

