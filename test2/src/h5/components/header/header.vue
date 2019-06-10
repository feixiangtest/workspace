<template>
    <div class="public-header">
        <!-- 首页类型通用头部-有背景-固定高度44px -->
        <div class="index-header hea-default-col" v-if="headerType === 1">
            <div class="header-content">
                <div class="head-left">
                    <!-- <span class="trial-game" v-if='userInfo.account'>{{userInfo.account}}</span>
                    <a href="javascript:void(0);" class="trial-game" @click="freeLogin" v-else>试玩</a> -->
                    <a href="javascript:void(0);" class="trial-game" @click="freeLogin" v-if='!userInfo.account'>试玩</a>
                </div>
                <div class="head-title">
                    <img class="logo" v-if="isPreview2 === 3" :src="topLogo.fastDfsUrl + topLogo.articleVo.photoDocList[0].cpicSim" alt="">
                    <img class="logo" v-if="mobHeadLogo && isPreview2 !== 3"  :src="fastDfsUrl + mobHeadLogo.cpicSim" alt="">
                </div>
                <div class="head-right" @click="$openChatWin('h5home')">
                    <i class="yo-icon icon-online"> </i>
                </div>
            </div>
        </div>

        <!-- 无背景头部-固定高度44px -->
        <div class="header-content" v-if="headerType === 2" >
            <div class="head-left" :class="{colorBlack:headTitle === '银行卡'}">
                <i class="yo-icon" :class="headLeft" @click='turnBack()'></i>
            </div>
            <div class="head-title" :class="{colorBlack:headTitle === '银行卡'}">
                {{headTitle}}
            </div>
            <div class="head-right">
                <i class="yo-icon" :class="headRight" @click="$openChatWin('h5home')"></i>
            </div>
        </div>

        <!-- 内容页头部-有背景-固定高度44px -->
        <div class="common-header hea-default-col" v-if="headerType === 3">
            <div class="header-content">
                <div class="head-left" @click="Goback()">
                    <i class="yo-icon" :class="headLeft"  v-if="!headback"></i>
                </div>
                <div class="head-title">
                    {{headTitle}}
                </div>
                <div class="head-right" @click="$openChatWin('h5home')">
                    <i class="yo-icon" :class="headRight"></i>
                </div>
            </div>
        </div>
         <!-- 往来记录头部 -->
        <div class="common-header hea-default-col" v-if="headerType === 4" >
            <div class="header-content">
                <div class="head-left" @click="closeDetail()">
                    <i class="yo-icon" :class="headLeft"  v-if="!headback"></i>
                </div>
                <div class="head-title">
                    {{headTitle}}
                </div>
                <div class="head-right">
                    <i class="yo-icon" :class="headRight"></i>
                </div>
            </div>
        </div>
        <!-- 交易记录只供投注记录，和往来记录用 -->
        <div class="common-header hea-default-col" v-if="headerType === 5" >
            <div class="header-content">
                <div class="head-left" @click="backUrl()">
                    <i class="yo-icon" :class="headLeft"></i>
                </div>
                <div class="head-title">
                    {{headTitle}}
                </div>
                <div class="head-right">
                    <i class="yo-icon" :class="headRight"></i>
                </div>
            </div>
        </div>
        <!-- 投注详情 -->
        <div class="common-header hea-default-col" v-if="headerType === 6">
            <div class="header-content">
                <div class="head-left" @click="$closeBetDetail()">
                    <i class="yo-icon" :class="headLeft"  v-if="!headback"></i>
                </div>
                <div class="head-title">
                    {{headTitle}}
                </div>
                <div class="head-right" @click="$openChatWin('h5home')">
                    <i class="yo-icon" :class="headRight"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {

    }
  },

  methods: {
    //   交易记录的头部返回按钮
    backUrl () {
      // 先获取页面时从哪里进来的，然后再跳转回去，目的是解决交易记录和投注记录来回切换，下面两个是清空交易记录和投注记录保存的筛选条件
      this.$router.push('/wap/' + sessionStorage.getItem('originToTransection'))
      this.$store.state.transactionRecord.saveTransData = {}
      this.$store.state.transactionRecord.saveHistoryData = {}
    },
    closeDetail () {
      if (!this.$store.state.transactionRecord.showDetail) {
        this.$store.dispatch('h5MsgCount.action', {hideLoading: true}).then(res => {})
        this.Goback()
      } else {
        this.$store.state.transactionRecord.showDetail = false
      }
    },
    freeLogin () {
      this.$store.dispatch('loginFree.action', {}).then(res => {
        if (res.status === window.common.statusConst.SUCCESS) {
          try {
            this.$store.state.site.nowPosition = 0
          } catch (e) {
          }
          window.store.dispatch('initH5Data.action', {versionFun: true}).then(res => {})
          // 重新获取首页信息
          window.layer.msgWarn('您已进入试玩模式，平台试玩金额与进入第三方后的试玩金额可能不一致，请尽情体验！！', () => {
            try {
              this.$store.state.home.gameNoticeFlag = true // 首页游戏公告显示
            } catch (e) {
            }
            // this.$router.push('/wap/index')
          })
        }
      })
    },
    turnBack () {
      window.indexMain.gpoScrollTop()
      let { name } = this.$route
      if (name === 'cardList') {
        if (localStorage.getItem('isSetBankCard') === '0') {
          this.$router.push('/wap/basicsInfo')
        } else {
          this.$router.go(-1)
        }
      } else {
        this.$router.go(-1)
      }
    },
    Goback () {
      window.indexMain.gpoScrollTop()
      let { name } = this.$route
      // let query = this.$route.query
      let stop = true
      if (name === 'register') {
        if (window.store.state.h5Home.openAgreement) {
          stop = false
          window.store.state.h5Home.openAgreement = false
        }
      } else if (name === 'payment' || name === 'onlinePay' || name === 'offlinePay' || name === 'custDeposit' || name === 'fastCash') {
        stop = false
        this.$router.push('/wap/basicsInfo')
      } else {
        stop = true
      }
      if (stop) this.$router.go(-1)
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo, // 用户信息
      headerType: state => state.h5Home.headerType, // 头部类型
      headTitle: state => state.h5Home.headTitle, // 头部标题
      headLeft: state => state.h5Home.headLeft, // 头部左侧内容
      headback: state => state.h5Home.headback, // 头部back
      headRight: state => state.h5Home.headRight, // 头部右侧内容
      isPreview2: state => state.h5Home.isPreview2,
      topLogo: state => state.h5Home.topLogo,
      fastDfsUrl: state => state.h5Home.fastDfsUrl, // 上传资源路径
      mobHeadLogo: state => state.h5Home.mobHeadLogo// 头部logo
    })
  }
}
</script>

