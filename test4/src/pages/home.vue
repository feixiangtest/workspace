<template>
  <div class="yoPage">
    <!--header-->
    <div class="yoHeader">
      <div class="center">
        <div class="heaLeft" @click="toGpoHome()">
            <i class="h-home"> </i>
        </div>
        <div class="title title-center">彩票游戏</div>
        <div class="heaRight" @click="toggleRightSideMenu()">
            <i class="h-ues"> </i>
        </div>
      </div>
    </div>

    <!--內容-->
    <div class="yoPageBody">
      <div class="yoScroll">
        <div id="lypic">
          <img :src="storageImg['ly_v1.jpg'] || commonImgUrl + '/home/ly_v1.jpg'" @load="imgLoad('/static/lt_h5_v3/local/img/home/ly_v1.jpg', $event)">
          <!--<img :src="commonImgUrl + '/home/ly_v1.jpg'">-->
        </div>
        <div :key="item.lotteryName +'_' + index" v-for="(item, index) in lotteryList">
          <div class="ly-title" @click="toggleGroup(item)">
            <span class="ng-binding">
              {{item.name}}
            </span>
            <span class="yo-ico-xl">
              <i class="icon icon-accessory" :class=" item.show === true ? 'ion-chevron-up':'ion-chevron-down' "></i>
            </span>
          </div>
          <div class="ly-div" :class="item.show === true ? '':'hide'">
            <a herf="javascript:void(0)" @click="toLink(lotteryitem,$event)" :key="lotteryitem.lotteryId +'_' + index" v-for="(lotteryitem,index) in item.lotteryType" @touchstart="handleTouchStart(lotteryitem)" @touchend="end()" @touchcancel="end()" :class="isMouseOver.indexOf(lotteryitem) >= 0 ? 'activeted':''">
              <!--img标签必须加上crossOrigin="Anonymous"设置图片允许跨域，否则当图片为跨域加载的时候，imgCanvas.toDataURL('image/png')会报错-->
              <!--<img :src="lotteryitem.lotteryPicture">-->
              <img :src="storageImg[lotteryitem.lotteryPicture.split('/').slice(-1)[0]] || lotteryitem.lotteryPicture" @load="imgLoad(lotteryitem.lotteryPicture,$event)" crossOrigin="Anonymous">
              <p class="ng-binding">{{lotteryitem.lotteryName}}</p>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- 蒙层 -->
    <div class="homeMengceng" v-show="$store.state.site.nowPosition === minPosition" @click="$store.state.site.nowPosition = 0">
    </div>

    <!--菜單-->
    <drawer right :open="openR" :docked="dockedRight" @close="closeRightSideMenu()">
      <rightSideMenu />
    </drawer>

    <!-- 自定义筹码 -->
    <yocouma v-if="$store.state.site.setChip"></yocouma>

  </div>
</template>

<script>
import yocouma from 'components/lottery/rightSideMenu/yocouma.vue'
import * as lotteryMap from '../config/lotteryMap'
import rightSideMenu from '../components/lottery/rightSideMenu/rightSideMenu'
// import * as types from '../store/betZone/type'
import * as lotteryDetail from '../config/lotteryDetail'
// import * as touchUtil from 'utils/touchUtil'
import * as statusCode from 'utils/status_const'
import * as sideType from 'store/site/type'

export default {
  components: {
    rightSideMenu,
    yocouma
  },
  computed: {
    nowPosition () {
      return this.$store.state.site.nowPosition
    },
    lotteryList () { // 获取可以展示的彩票（大类和小类）
      return this.$store.state.home.lotteryList
    },
    commonImgUrl () {
      return this.$store.state.home.commonImgUrl
    },
    openR () {
      return this.$store.state.home.MuseUI.openR
    },
    dockedRight () {
      return this.$store.state.home.MuseUI.dockedRight
    }
  },
  watch: {
  },
  data () {
    return {
      minPosition: -275,
      maxPosition: 0,
      nowX: 0,
      isMouseOver: [],
      lastPosition: 0, // 上次位置
      allowMove: true, // 两个手指操作屏幕不允许侧滑
      storageImg: this.getLocal() || {} // localStorage图片库
    }
  },
  methods: {
    toLink (lotteryitem, event) {
      window.scrollTo(0, 0)
      // 当后台将投注状态关闭时需要弹出提示
      console.log(window.$(event).children())
      if (lotteryitem.bettingStatus === 1) {
        window.layer.msgWarn('对不起！当前游戏尚未开启，请您选择其它游戏进行投注！')
        return false
      }
      this.$store.state.site.show = true// 默认将投注页面关闭
      event.target.classList.add('activeted')

      let lotteryCode = lotteryMap.LotterySrc[lotteryitem.lotteryId]

      // 存储彩票ID
      this.$store.state.site.lotteryId = lotteryitem.lotteryId
      this.$store.state.site.nowLotteryName = lotteryitem.lotteryName
      // this.$store.state.site.nowPosition = 0
      let shortName = lotteryMap.LotterySrc[lotteryitem.lotteryId] // 获取彩票类型的简写 如一分赛车(yfsc)
      var play = lotteryDetail.playType[shortName] // 获取指定玩法和其他信息
      this.$store.state.site.lotteryPlayType = play // 将玩法存在site里面的playType
      this.$store.state.site.nowTitle = play.rtype[0].name // 获取默认玩法的名字
      this.$store.state.site.nowMode = play.rtype[0].type_id// 获取默认玩法的type_id
      localStorage.setItem(shortName.toUpperCase() + '_PLAYTYPE_H5', JSON.stringify(play))

      this.$router.push('/lottery/' + lotteryCode)
    },
    GoBack () {
      this.$router.push('/home')
      scrollTo(0, 0)
    },
    toggleRightSideMenu () { // 右侧菜单
      this.$store.state.home.MuseUI.openR = true
      this.$store.state.home.MuseUI.dockedRight = false
      this.$store.state.home.MuseUI.openRightCount++ // 显示右侧导航栏的次数
      window.$('body').css('position', 'fixed')
    },
    closeRightSideMenu () {
       // 右側 需要加參數
      this.$store.state.home.MuseUI.openR = false
      this.$store.state.home.MuseUI.dockedRight = false
      window.$('body').css('position', 'static')
    },
    Gologin () {
      this.$router.push('/login')
    },
    GoforgetPw () {
      this.$router.push('/forgetPw')
    },
    /**
     * 拖动开始
     */
    onPanStart (data) {
      this.nowX = data.center.x
      this.nowy = data.center.y
    },
    // 大类展开和收起功能
    toggleGroup (item) {
      // 关闭展示
      this.$store.state.home.lotteryList[item.lotteryTypeName].show = !this.$store.state.home.lotteryList[item.lotteryTypeName].show
    },
    handleTouchStart (item) {
      this.isMouseOver.push(item)
    },
    end () {
      this.isMouseOver.splice(0, 1)
    },
    /**
     * 跳转到主系统首页
     */
    toGpoHome () {
      if (!navigator.onLine) { // 离线状态
        window.layer.alert('目前处于离线状态')
        return false
      }

      try {
        // 获取设备类型
        var type = window.AppInvokeModel.getDeviceType()
        console.info('设备类型：', type)
        if (type === 'ios' || type === 'android') {
          window.AppInvokeModel.popToUp()
          return
        }
      } catch (e) {
        console.info(e)
      }

      this.$store.state.home.memberUrl = this.$store.state.home.memberUrl + '/wap/index'
      if (this.$store.state.home.isLogin) { // 已登录状态
        this.$store.dispatch(sideType.LOGOUT_ACTION, {}).then(res => { // 请求后端，退出游戏
          if (res.status === statusCode.statusConst.FAILURE) { // 失败了提示错误
            window.layer.msgWarn('退出彩票游戏失败')
          } else if (res.status === statusCode.statusConst.SUCCESS) { // 退出成功
            // 跳转到主系统首页
            if (this.$store.state.home.memberUrl.indexOf('http') >= 0) {
              window.location.href = this.$store.state.home.memberUrl
            } else {
              window.location.href = 'http://' + this.$store.state.home.memberUrl
            }
          }
        })
      } else { // 未登录状态
        // 跳转到主系统首页
        if (this.$store.state.home.memberUrl.indexOf('http') >= 0) {
          window.location.href = this.$store.state.home.memberUrl
        } else {
          window.location.href = 'http://' + this.$store.state.home.memberUrl
        }
      }
    },
    getLocal () {
      let a = {}
      try {
        a = JSON.parse(localStorage.getItem('storageImg'))
      } catch (e) {
      }
      return a // localStorage图片库
    },
    /**
     * 图片加载事件 加载完成后转成base64
     * 将base64图片存储到localStorage，下次访问时在localStorage取
     */
    imgLoad (url, event) {
      let el = event.path ? event.path[0] : event.originalTarget
      let name = url.split('/').slice(-1)[0]
      let imgCanvas = document.createElement('canvas')
      let imgContext = imgCanvas.getContext('2d')
      // 确保canvas尺寸和图片一致
      imgCanvas.width = el.width
      imgCanvas.height = el.height
      // 在canvas中绘制图片
      imgContext.drawImage(el, 0, 0, el.width, el.height)
      // 将图片保存为base64
      this.storageImg[name] = imgCanvas.toDataURL('image/png')
      // 将JSON保存到本地存储中
      try {
        localStorage.setItem('storageImg', JSON.stringify(this.storageImg))
      } catch (e) {
        console.log('Storage failed: ' + e)
      }
    }
  },
  mounted () {
    // let $this = this
    // window.$(document).on('touchend', '.opacity6', (e) => {
    //   $this.toggleRightSideMenu()
    //   console.info('阻止 点击穿透')
    //   // e.preventDefault()
    // })
  }
}
</script>
