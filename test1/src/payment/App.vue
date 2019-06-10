<template>
  <ionside>
      <router-view></router-view>
      <loading v-if="$store.state.home.showLoading"></loading>
  </ionside>
</template>
<script>
import loading from '@/base/components/loading'
import method from '@/base/utils/method'// 中文标题
export default {
  name: 'app',
  data () {
    return {
      /**
       * 实时监听键盘是否打开，OPPO自带浏览器无法监听
       * 各组件监听方法如：
       * this.$root.$children[0].$watch('iskeyBoardOpen', (newVal) => {
       *   console.log('------' + newVal)
       * })
       * */
      iskeyBoardOpen: false,
      // 键盘监听类型, 'resize'（resize事件）、'focus'（焦点事件）
      listenKeyBoardType: ''
    }
  },
  mounted () {
    // OG单独放开标题和关键字等参数
    if (this.platform) {
      // 设置标题头
      window.document.title = this.station.title
      // 设置关键字
      document.querySelector('meta[name="keywords"]').setAttribute('content', this.station.keywords)
      // 设置简介
      document.querySelector('meta[name="description"]').setAttribute('content', this.station.description)
    } else {
      document.title = window.location.host
    }
    let ua = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(ua)) { // ios双击禁用缩放
      let lastTouchEnd = 0
      document.documentElement.addEventListener('touchend', function (event) {
        let now = (new Date()).getTime()
        if (now - lastTouchEnd <= 300) {
          event.preventDefault()
        }
        lastTouchEnd = now
      }, false)
    }
    // 浏览器前进后退处理
    window.onpopstate = () => {
    }
    window.indexMain.initGpoCurrentScreen()
    try { document.getElementById('new_loading').remove() } catch (e) { }
    let {query: Intr, name} = this.$route
    if (sessionStorage.Intr === 'undefined') delete sessionStorage.Intr
    if (Intr && Intr.Intr && Intr !== 'undefined') {
      console.info('匹配 Intr ', this.$route)
      if (name !== 'register') {
        window.moduleRouter.push('/wap/register')
      }
    } // 介绍人跳转逻辑
    // 监听键盘
    this.listenKeyboard = method.listenKeyboard
    this.listenKeyboard(this)
    this.setContextmenu() // 禁用长按弹出复制菜单
  },
  methods: {
    toggle (type) {
      if (type) { // 右側 需要加參數
        this.$store.state.home.MuseUI.openR = !this.$store.state.home.MuseUI.openR
        this.$store.state.home.MuseUI.dockedRight = !this.$store.state.home.MuseUI.dockedRight
      } else {
        this.$store.state.home.MuseUI.open = !this.$store.state.home.MuseUI.open
        this.$store.state.home.MuseUI.dockedLeft = !this.$store.state.home.MuseUI.dockedLeft
      }
    },
    // 设置禁用长按弹出复制菜单
    setContextmenu () {
      let {name: path} = this.$route
      if (path !== 'bankPay') { // 非 公司入款 -- 银行入款页面禁用
        window.$(document).off('contextmenu.gpo').on('contextmenu.gpo', 'body', this.contextmenu)// 禁用长按弹出复制菜单
      } else { // 公司入款 -- 银行入款页面不做禁用
        window.$(document).off('contextmenu.gpo')
      }
    },
    contextmenu (e) {
      e.preventDefault()
    }

  },
  computed: {
    openLeft () {
      return this.$store.state.home.MuseUI.open
    },
    openR () {
      return this.$store.state.home.MuseUI.openR
    },
    dockedLeft () {
      return this.$store.state.home.MuseUI.dockedLeft
    },
    dockedRight () {
      return this.$store.state.home.MuseUI.dockedRight
    },
    platform () {
      return this.$store.state.home.platform
    },
    station () {
      return this.$store.state.home.station
    }
  },
  checkIntr: function () {
  },
  components: {
    loading,
    'ionside': {
      template: `
        <div class="pane">
          <slot> </slot>
        </div>
      `
    }
  },
  watch: {
    $route () {
      window.indexMain.closeMuseUI()
      let {name: path} = this.$route
      this.setContextmenu() // 禁用长按弹出复制菜单
      if (screen.height < 569) return false
      if (path === 'index' || path === 'live' || path === 'sports') {

      } else {
        window.$('.footMove').remove()
      }
    }
  }
}
</script>

<style lang='less'>
  @anyUrl: 'CDNURL_VARIABLE/static/RESOURCE_VERSION/local'; // RESOURCE_VERSION该字符串是会在打包时替换，必须不能放在less文件中
  @import '../base/assets/less/app.less';
</style>
<!--<style lang='less'>
  @folderV: 'RESOURCE_VERSION';
  @import '../base/assets/less/skin_default/index.less'; // 默认皮肤——注：除本地环境外，其它环境这里一定不能放开任何一个皮肤
  // @import '../base/assets/less/skin_op/a04/index.less'; // a04皮肤——注：除本地环境外，其它环境这里一定不能放开任何一个皮肤
</style>-->

