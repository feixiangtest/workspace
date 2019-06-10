<template>
  <div id="completeAccount" style=" height:100%; width: 100%;">
    <div class="header yo-home-nav">
      <div class="center">
        <div class="hea-menu hea-left">
          <a href="javascript:;" @click="Goback()"><i class="yo-icon icon-arrows-left"></i></a>
        </div>
        <div class="header-text titile">
          <h1>完善资料</h1>
        </div>
        <div class="hea-user hea-right">
          <a href="javascript:;" @click="GoHome()"><i class="yo-icon icon-home"></i></a>
        </div>
      </div>
    </div>
    <div class="wrapper indexCenter2">
        <div class="tab-nav onlineMenu">
          <ul class="firstStage">
            <li :class="{ active: Tabs && Tabs.tab1 }" @click="TabSwitch('tab1')">
              <a href="javascript:;">创建新账号</a>
            </li>
            <li :class="{ active: Tabs && Tabs.tab2 }" @click="TabSwitch('tab2')">
              <a href="javascript:;">绑定旧账号</a>
            </li>
          </ul>
        </div>
        <div class="accountMain">
          <newAccountTab v-show="Tabs && Tabs.tab1"></newAccountTab>
          <oldAccountTab v-show="Tabs && Tabs.tab2"></oldAccountTab>
        </div>
    </div>
  </div>
</template>
<script>
import newAccountTab from './newAccountTab'
import oldAccountTab from './oldAccountTab'
import * as types from '@/base/store/site/type'
export default {
  components: {
    newAccountTab,
    oldAccountTab
  },
  data () {
    return {
      Tabs: {
        tab1: true,
        tab2: false
      }     // 切换
    }
  },
  mounted () {
    this.isLogin()
  },
  methods: {
    // 返回到首页
    GoHome () {
      let versionList = window.indexMain.versionFun('initData', 'homeVersionKey')
       // 重新获取首页信息
      this.$store.dispatch('initData.action', versionList).then(res => {
        if (res.data.isTempWeiXin && res.data.isTempWeiXin === 'Y') {
          window.layer.msgWarn('为了您的资金安全，请您完善资料信息！！')
          return false // Y需要强制跳转完善页面  N不管
        } else {
          window.router.push('/wap/index')
        }
      }).catch(res => {
      })
    },
      // 返回上一页
    Goback () {
      let versionList = window.indexMain.versionFun('initData', 'homeVersionKey')
       // 重新获取首页信息
      this.$store.dispatch('initData.action', versionList).then(res => {
        if (res.data.isTempWeiXin && res.data.isTempWeiXin === 'Y') {
          window.layer.msgWarn('为了您的资金安全，请您完善资料信息！！')
          return false // Y需要强制跳转完善页面  N不管
        } else {
          window.router.go(-1)
        }
      }).catch(res => {
      })
    },
    TabSwitch (target) {
      let $this = this
      window._each($this.Tabs, function (value, key) {
        $this.Tabs[key] = false
      })
      $this.Tabs[target] = true
    },
    /**
     * 验证是否登录接口
     */
    isLogin () {
      this.$store.dispatch(types.ISLOGIN_ACTION, {}).then(res => {

      }).catch(res => {
      })
    }
  }
}
</script>
