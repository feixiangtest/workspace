<template>
  <div class="headerMain clearfix">
    <div class="center headerContent clearfix">
      <!-- 头部左侧部分 -->
      <div class="floatLf langBox">
        <div class="logoIcon">
          <img src="resource/ot002/images/index.ico" alt="">
        </div>
        <div class="otherLink">
          <a href="javascript:void(0)" @click="freeLogin">免费试玩</a> |
          <a href="javascript:void(0)" @click="addFavorite()">添加收藏</a>
        </div>
      </div>
      <!-- 中间logo部分 -->
      <div class="floatLf logo pageLogo" @mouseout="showMenuCenter = false" @mouseover="showMenuCenter = true">
        <a href="javascript:void(0)" to="/" class="link-index"></a>
        <menu-center :showMenuCenter=showMenuCenter :changeShowMenuCenter=getShowMenuCenter></menu-center>
      </div>
      <!-- 右侧登录部分 -->
      <div class="floatLf login">
        <!--已登录-->
        <login-after v-if='isLogin'></login-after>
        <!-- 未登录 -->
        <login-before v-else></login-before>
      </div>
    </div>
  </div>
</template>

<script>
  import menuCenter from './menuCenter.vue'
  import loginBefore from './login/loginBefore.vue'
  import loginAfter from './login/loginAfter.vue'
  export default {
    data () {
      return {
        showMenuCenter: false, // 是否展示中间菜单
        showLangPanel: false, // 语言选择面板
        loginStatus: false // 登录状态，默认为未登录
      }
    },
    computed: {
      isLogin () {
        return this.$store.state.user.isLogin// 登录状态
      }
    },
    components: {
      menuCenter,
      loginBefore,
      loginAfter
    },
    methods: {
      freeLogin () {
        this.$store.dispatch('loginFree.action', {}).then(res => {
          if (res.status === window.common.statusConst.SUCCESS) {
            try {
              this.$store.state.site.nowPosition = 0
            } catch (e) {
            }
            window.store.dispatch('initData.action')
            // 重新获取首页信息
            window.layer.msgWarn('您已进入试玩模式，平台试玩金额与进入第三方后的试玩金额可能不一致，请尽情体验！！', () => {
              try {
                this.$store.state.home.gameNoticeFlag = true // 首页游戏公告显示
              } catch (e) {
              }
              this.$router.push('/home')
            })
          }
        })
      },
      getShowMenuCenter (val) {
        this.showMenuCenter = val
      },
      addFavorite () {
        var url = window.location.href
        var title = document.title
        var ua = navigator.userAgent.toLowerCase()
        if (ua.indexOf('360se') > -1) {
          alert('由于360浏览器功能限制，请按 Ctrl+D 手动收藏！')
        } else if (ua.indexOf('msie 8') > -1) {
          window.external.AddToFavoritesBar(url, title) // IE8
        } else if (document.all) {
          try {
            window.external.addFavorite(url, title)
          } catch (e) {
            alert('加入收藏失败，请使用Ctrl+D进行添加，或手动在浏览器里进行设置！')
          }
        } else if (window.sidebar) {
          window.sidebar.addPanel(title, url, '')
        } else {
          alert('加入收藏失败，请使用Ctrl+D进行添加，或手动在浏览器里进行设置！')
        }
      }
    },
    mounted () {
      // 点击空白文档，隐藏语言面板
      document.onclick = () => {
        this.showLangPanel = false
      }
      // 用于处理是否登录状态，每个站必须调用
      this.$isLoginStatus()
    }
  }
</script>


