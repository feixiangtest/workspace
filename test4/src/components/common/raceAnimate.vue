<template>
  <div>
    <!--整个动画区域-->
    <div class="animate-area">
      <!--赛车部分-->
      <div class="race-part" style="display: block;">
        <!--跑道区域-->
        <div class="runway way-cd way-mt">
          <!--终点线-->
          <div class="endLine"></div>
          <!--起点线-->
          <div class="startLine"></div>
        </div>
        <!--赛车区域-->
        <div class="carArea way-mt">
          <div class="car1 car">
            <img :src="imgUrl + '/raceAnimate/car1.png'" width="100%">
            <div class="car-vague">
              <img :src="imgUrl + '/raceAnimate/carVague1.png'" width="125%">
            </div>
            <div class="car-wheel wheel-flag1">
              <img class="wheel" :src="imgUrl + '/raceAnimate/wheel.gif'" width="100%">
              <img class="car-fast" :src="imgUrl + '/raceAnimate/light1.png'">
            </div>
            <div class="car-wheel wheel-flag2">
              <img class="wheel" :src="imgUrl + '/raceAnimate/wheel.gif'" width="100%">
              <img class="car-fast" :src="imgUrl + '/raceAnimate/light2.png'">
            </div>
            <div class="car-after"><img :src="imgUrl + '/raceAnimate/flame.png'" width="100%"></div>
          </div>
          <div class="car2 car">
            <img :src="imgUrl + '/raceAnimate/car2.png'" width="100%">
            <div class="car-vague">
              <img :src="imgUrl + '/raceAnimate/carVague2.png'" width="125%">
            </div>
            <div class="car-wheel wheel-flag1">
              <img class="wheel" :src="imgUrl + '/raceAnimate/wheel.gif'" width="100%">
              <img class="car-fast" :src="imgUrl + '/raceAnimate/light1.png'">
            </div>
            <div class="car-wheel wheel-flag2">
              <img class="wheel" :src="imgUrl + '/raceAnimate/wheel.gif'" width="100%">
              <img class="car-fast" :src="imgUrl + '/raceAnimate/light2.png'">
            </div>
            <div class="car-after"><img :src="imgUrl + '/raceAnimate/flame.png'" width="100%"></div>
          </div>
          <div class="car3 car">
            <img :src="imgUrl + '/raceAnimate/car3.png'" width="100%">
            <div class="car-vague">
              <img :src="imgUrl + '/raceAnimate/carVague5.png'" width="125%">
            </div>
            <div class="car-wheel wheel-flag1">
              <img class="wheel" :src="imgUrl + '/raceAnimate/wheel.gif'" width="100%">
              <img class="car-fast" :src="imgUrl + '/raceAnimate/light1.png'">
            </div>
            <div class="car-wheel wheel-flag2">
              <img class="wheel" :src="imgUrl + '/raceAnimate/wheel.gif'" width="100%">
              <img class="car-fast" :src="imgUrl + '/raceAnimate/light2.png'">
            </div>
            <div class="car-after"><img :src="imgUrl + '/raceAnimate/flame.png'" width="100%"></div>
          </div>
          <div class="car4 car">
            <img :src="imgUrl + '/raceAnimate/car4.png'" width="100%">
            <div class="car-vague">
              <img :src="imgUrl + '/raceAnimate/carVague9.png'" width="125%">
            </div>
            <div class="car-wheel wheel-flag1">
              <img class="wheel" :src="imgUrl + '/raceAnimate/wheel.gif'" width="100%">
              <img class="car-fast" :src="imgUrl + '/raceAnimate/light1.png'">
            </div>
            <div class="car-wheel wheel-flag2">
              <img class="wheel" :src="imgUrl + '/raceAnimate/wheel.gif'" width="100%">
              <img class="car-fast" :src="imgUrl + '/raceAnimate/light2.png'">
            </div>
            <div class="car-after"><img :src="imgUrl + '/raceAnimate/flame.png'" width="100%"></div>
          </div>
          <div class="car5 car">
            <img :src="imgUrl + '/raceAnimate/car5.png'" width="100%">
            <div class="car-vague">
              <img :src="imgUrl + '/raceAnimate/carVague5.png'" width="125%">
            </div>
            <div class="car-wheel wheel-flag1">
              <img class="wheel" :src="imgUrl + '/raceAnimate/wheel.gif'" width="100%">
              <img class="car-fast" :src="imgUrl + '/raceAnimate/light1.png'">
            </div>
            <div class="car-wheel wheel-flag2">
              <img class="wheel" :src="imgUrl + '/raceAnimate/wheel.gif'" width="100%">
              <img class="car-fast" :src="imgUrl + '/raceAnimate/light2.png'">
            </div>
            <div class="car-after"><img :src="imgUrl + '/raceAnimate/flame.png'" width="100%"></div>
          </div>
          <div class="car6 car">
            <img :src="imgUrl + '/raceAnimate/car6.png'" width="100%">
            <div class="car-vague">
              <img :src="imgUrl + '/raceAnimate/carVague6.png'" width="125%">
            </div>
            <div class="car-wheel wheel-flag1">
              <img class="wheel" :src="imgUrl + '/raceAnimate/wheel.gif'" width="100%">
              <img class="car-fast" :src="imgUrl + '/raceAnimate/light1.png'">
            </div>
            <div class="car-wheel wheel-flag2">
              <img class="wheel" :src="imgUrl + '/raceAnimate/wheel.gif'" width="100%">
              <img class="car-fast" :src="imgUrl + '/raceAnimate/light2.png'">
            </div>
            <div class="car-after"><img :src="imgUrl + '/raceAnimate/flame.png'" width="100%"></div>
          </div>
          <div class="car7 car">
            <img :src="imgUrl + '/raceAnimate/car7.png'" width="100%">
            <div class="car-vague">
              <img :src="imgUrl + '/raceAnimate/carVague5.png'" width="125%">
            </div>
            <div class="car-wheel wheel-flag1">
              <img class="wheel" :src="imgUrl + '/raceAnimate/wheel.gif'" width="100%">
              <img class="car-fast" :src="imgUrl + '/raceAnimate/light1.png'">
            </div>
            <div class="car-wheel wheel-flag2">
              <img class="wheel" :src="imgUrl + '/raceAnimate/wheel.gif'" width="100%">
              <img class="car-fast" :src="imgUrl + '/raceAnimate/light2.png'">
            </div>
            <div class="car-after"><img :src="imgUrl + '/raceAnimate/flame.png'" width="100%"></div>
          </div>
          <div class="car8 car">
            <img :src="imgUrl + '/raceAnimate/car8.png'" width="100%">
            <div class="car-vague">
              <img :src="imgUrl + '/raceAnimate/carVague8.png'" width="125%">
            </div>
            <div class="car-wheel wheel-flag1">
              <img class="wheel" :src="imgUrl + '/raceAnimate/wheel.gif'" width="100%">
              <img class="car-fast" :src="imgUrl + '/raceAnimate/light1.png'">
            </div>
            <div class="car-wheel wheel-flag2">
              <img class="wheel" :src="imgUrl + '/raceAnimate/wheel.gif'" width="100%">
              <img class="car-fast" :src="imgUrl + '/raceAnimate/light2.png'">
            </div>
            <div class="car-after"><img :src="imgUrl + '/raceAnimate/flame.png'" width="100%"></div>
          </div>
          <div class="car9 car">
            <img :src="imgUrl + '/raceAnimate/car9.png'" width="100%">
            <div class="car-vague">
              <img :src="imgUrl + '/raceAnimate/carVague9.png'" width="125%">
            </div>
            <div class="car-wheel wheel-flag1">
              <img class="wheel" :src="imgUrl + '/raceAnimate/wheel.gif'" width="100%">
              <img class="car-fast" :src="imgUrl + '/raceAnimate/light1.png'">
            </div>
            <div class="car-wheel wheel-flag2">
              <img class="wheel" :src="imgUrl + '/raceAnimate/wheel.gif'" width="100%">
              <img class="car-fast" :src="imgUrl + '/raceAnimate/light2.png'">
            </div>
            <div class="car-after"><img :src="imgUrl + '/raceAnimate/flame.png'" width="100%"></div>
          </div>
          <div class="car10 car">
            <img :src="imgUrl + '/raceAnimate/car10.png'" width="100%">
            <div class="car-vague">
              <img :src="imgUrl + '/raceAnimate/carVague10.png'" width="125%">
            </div>
            <div class="car-wheel wheel-flag1">
              <img class="wheel" :src="imgUrl + '/raceAnimate/wheel.gif'" width="100%">
              <img class="car-fast" :src="imgUrl + '/raceAnimate/light1.png'">
            </div>
            <div class="car-wheel wheel-flag2">
              <img class="wheel" :src="imgUrl + '/raceAnimate/wheel.gif'" width="100%">
              <img class="car-fast" :src="imgUrl + '/raceAnimate/light2.png'">
            </div>
            <div class="car-after"><img :src="imgUrl + '/raceAnimate/flame.png'" width="100%"></div>
          </div>
        </div>
        <!--红绿灯区域-->
        <div class="runway-light">
          <div class="traffic-lights">
            <div class="red-light light">
              <!--<img :src="imgUrl + '/raceAnimate/red2.png'" width="100%" height="100%">-->
              <img :src="imgUrl + '/raceAnimate/red1.png'" width="100%" height="100%">
            </div>
            <div class="yellow-light light">
              <!--<img :src="imgUrl + '/raceAnimate/yellow2.png'" width="100%" height="100%">-->
              <img :src="imgUrl + '/raceAnimate/yellow1.png'" width="100%" height="100%">
            </div>
            <div class="green-light light">
              <!--<img :src="imgUrl + '/raceAnimate/green2.png'" width="100%" height="100%">-->
              <img :src="imgUrl + '/raceAnimate/green1.png'" width="100%" height="100%">
            </div>
          </div>
        </div>
      </div>
      <!--挥旗部分-->
      <div class="flag-part" style="display: none;">
        <img class="flag-gif" :src="imgUrl + '/raceAnimate/flag.gif'" width="300%">
      </div>
      <!--赛车部分动画结束之后的开奖动画区域-->
      <div class="open-award-part" style="display: none;">
        <img :src="imgUrl + '/raceAnimate/rankingBg.png'" width="100%" height="100%">
        <!--第一名-->
        <div class="first-winner winner-area">
          <div class="shape animate-shape">
            <img class="shape-img" :src="imgUrl + '/raceAnimate/shape.png'" width="100%" height="100%">
            <span class="winner-font"></span>
          </div>
          <div class="car-area">
            <div class="winner-car animate-car"></div>
          </div>
        </div>
        <!--第二名-->
        <div class="second-winner winner-area">
          <div class="shape animate-shape">
            <img class="shape-img" :src="imgUrl + '/raceAnimate/shape.png'" width="100%" height="100%">
            <span class="winner-font"></span>
          </div>
          <div class="car-area">
            <div class="winner-car animate-car"></div>
          </div>
        </div>
        <!--第三名-->
        <div class="third-winner winner-area">
          <div class="shape animate-shape">
            <img class="shape-img" :src="imgUrl + '/raceAnimate/shape.png'" width="100%" height="100%">
            <span class="winner-font"></span>
          </div>
          <div class="car-area">
            <div class="winner-car animate-car"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import velocity from 'velocity-animate'
import RaceWidget from '../../plugins/raceAnimate.js'
export default {
  data () {
    return {
      __doms: null,
      raceWidget: null, // 赛车动画组件的对象
      isRaceing: false // 是否正在开奖动画中
    }
  },
  mounted () {
    this.__doms = window.$(this.$el) // 当前页面对象
    this.ready() // 初始化赛车动画组件对象,并且就绪
    // 子组件绑定事件
    this.$nextTick(() => {
      this.$on('waveFlag', this.waveFlag) // 挥动旗子
      this.$on('raceReady', this.ready) // 赛车动画就绪
      this.$on('raceRun', this.run) // 开始赛车，award是开奖结果，Array类型
    })
    this.getRaceWidget().onCarSortChange = this.onCarSortChange // 监听赛车实时排名情况
    this.getRaceWidget().onRaceingEnd = this.onRaceingEnd // 监听 赛车动画部分 结束的回调函数
    this.getRaceWidget().onOpenAwarded = this.onOpenAwarded // 监听 开奖动画部分 结束的回调函数
  },
  computed: {
    lotteryId () {
      return this.$store.state.site.lotteryId
    },
    imgUrl () {
      return this.$store.state.home.commonImgUrl
    }
  },
  methods: {
    /**
     * 获取赛车动画组件对象
     */
    getRaceWidget () {
      this.raceWidget = this.raceWidget || new RaceWidget(this.__doms)
      window.raceWidget = this.raceWidget
      return this.raceWidget
    },
    /**
     * 监听赛车实时排名情况
     */
    onCarSortChange () {
      this.$emit('onCarSortChange', ...arguments) // 发布监听事件
    },
    /**
     * 监听 赛车动画部分 结束的回调函数
     */
    onRaceingEnd () {
      this.$emit('onRaceingEnd', ...arguments) // 发布监听事件
    },
    /**
     * 监听 开奖动画部分 结束的回调函数
     */
    onOpenAwarded () {
      this.isRaceing = false // 动画完成
      this.$emit('onOpenAwarded', ...arguments) // 发布监听事件
    },
    /**
     * 挥动旗子
     */
    waveFlag () {
      console.log('挥旗')
      this.getRaceWidget().waveFlag()
    },
    /**
     * 赛车动画准备就绪
     */
    ready () {
      // 动画未进行中
      if (!this.isRaceing) {
        console.log('赛车ready')
        this.getRaceWidget().ready()
      }
    },
    /**
     * 赛车动画开始
     * @param {Array} data 开奖结果
     * @param {Boolean} isWaveFlag 开始前是否挥旗
     */
    run (data, isWaveFlag) {
      // 动画未进行中
      if (!this.isRaceing) {
        console.log('赛车开始')
        this.getRaceWidget().run(data, isWaveFlag)
      }
    }
  }
}
</script>
<style lang="less" scoped>
  @import '../../assets/less/plugin/raceAnimate.less';
</style>

