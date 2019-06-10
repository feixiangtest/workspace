<template>
  <div class="public-header">

    <!-- 首页头部 -->
    <div class="index-header" v-if="headerType === 1">
        <div class="head-left" @click="toggleLeftSideMenu()">
            <i class="yo-icon icon-menu"></i>
        </div>
        <div class="head-title" v-if="!previewHeadLogo.type">
            <img class="logo" :src="fastDfsUrl + mobAgtHeadLogo.cpicSim" v-if="mobAgtHeadLogo && mobAgtHeadLogo.cpicSim">
            <img class="logo" src="../../assets/img/logo.png" v-else>
        </div>
        <div class="head-title"  v-else>
          <img class="logo" :src="fastDfsUrl + previewHeadLogo.cpicSim">
        </div>
        <div class="head-right">
          <i class="yo-icon icon-online" @click="openOnlineService()"></i>
        </div>
    </div>

    <!-- 基本资料头部 -->
    <div class="index-header basicInfo-header" v-if="headerType === 2">
        <div class="head-left" @click="toggleLeftSideMenu()">
            <i class="yo-icon icon-menu"></i>
        </div>
        <div class="head-title">
            {{headTitle}}
        </div>
        <div class="head-right" @click="onlineService()">
          <i class="yo-icon icon-online"></i>
        </div>
    </div>

    <!-- 报表页面头部 -->
    <div class="index-header content-header" v-if="headerType === 3">
        <div class="head-left" @click="toggleLeftSideMenu()">
            <i class="yo-icon icon-menu"></i>
        </div>
        <div class="head-title">
          <div @click="showQuickDate = true">
            <span>快选日期:&nbsp;</span>
            <span>{{date}}</span>
            <i class="yo-icon icon-page-down"></i>
          </div>
        </div>
        <div class="head-right" @click='$router.push({path:"/m/reportSearch",query:$route.query})'>
          <i class="yo-icon icon-search"></i>
        </div>
        <!-- 现金流系统-头部时间选择 -->
        <picker :isShowTab.sync='showQuickDate' :slots='quickDateList' @getSelectData='selectDateList' :title='dateTitle'></picker>

    </div>

    <!-- 子账号头部 -->
    <div class="index-header content-header" v-if="headerType === 4">
        <div class="head-left" @click="toggleLeftSideMenu()">
            <i class="yo-icon icon-menu"></i>
        </div>
        <div class="head-title">
          <div class="search-box">
            <i class="yo-icon icon-search"></i>
            <input type="text" placeholder="请输入子账号查询">
          </div>
        </div>
        <div class="head-right">
            <i class="yo-icon icon-day-add"></i>
        </div>
    </div>

    <!-- 一级页面头部 -->
    <div class="index-header first-header" v-if="headerType === 5">
        <div class="head-left" @click="toggleLeftSideMenu()">
            <i class="yo-icon icon-menu"></i>
        </div>
        <div class="head-title">
            {{headTitle}}
        </div>
        <div class="head-right"></div>
    </div>

    <!-- 子级、内容页面头部 -->
    <div class="index-header content-header" v-if="headerType === 6">
        <div class="head-left" @click="Goback()">
            <i class="yo-icon icon-back"></i>
        </div>
        <div class="head-title">
            {{headTitle}}
        </div>
        <div class="head-right"></div>
    </div>

    <!-- 会员头部 -->
    <div class="index-header content-header" v-if="headerType === 7">
        <div class="head-left" @click="toggleLeftSideMenu()">
            <i class="yo-icon icon-menu"></i>
        </div>
        <div class="head-title">
          {{headTitle}}
        </div>
        <div class="head-right" @click='addFn' v-if="addShowBtn">
            <i class="yo-icon icon-day-add"></i>
        </div>
    </div>

    <!-- 现金流查询头部 -->
    <div class="index-header content-header" v-if="headerType === 8">
        <div class="head-left" @click="toggleLeftSideMenu()">
            <i class="yo-icon icon-menu"></i>
        </div>
        <div class="head-title">
          {{headTitle}}
        </div>
        <div class="head-right" @click="toQueryCash()">
            <i class="yo-icon icon-search"></i>
        </div>
    </div>
    <div class="index-header content-header" v-if="headerType === 9">
        <div class="head-left" @click="toPlatFormReport()">
            <i class="yo-icon icon-back"></i>
        </div>
        <div class="head-title">
            {{headTitle}}
        </div>
        <div class="head-right"></div>
    </div>
    <!-- 返水查询头部 -->
    <div class="index-header content-header" v-if="headerType === 10">
        <div class="head-left" @click="toggleLeftSideMenu()">
            <i class="yo-icon icon-menu"></i>
        </div>
        <div class="head-title">
          {{headTitle}}
        </div>
        <div class="head-right" @click="toRebates()">
            <i class="yo-icon icon-search"></i>
        </div>
    </div>

    <!-- 谷歌安全码绑定头部 -->
    <div class="index-header content-header" v-if="headerType === 11">
        <div class="head-left" @click="toggleLeftSideMenu()">
            <i class="yo-icon icon-menu"></i>
        </div>
        <div class="head-title">
          {{headTitle}}
        </div>
        <div class="head-right" @click="download()">
            <i class="yo-icon icon-download"></i>
        </div>
    </div>

  </div>
</template>
<script>
import { mapState } from 'vuex'
import Picker from '@/components/common/picker.vue'
export default {
  props: {
    daydate: String // 现金流头部操作
  },
  data () {
    return {
      showQuickDate: false, // 现金流系统-头部时间选择-显示隐藏
      addShowBtn: false// 添加按钮是否显示
    }
  },
  computed: {
    ...mapState({
      quickDateList: state => state.reportForms.quickDateList, // 快选时间列表
      fastDfsUrl: state => state.home.fastDfsUrl,
      mobAgtHeadLogo: state => state.home.mobAgtHeadLogo,
      previewHeadLogo: state => state.home.previewHeadLogo,
      dateTitle: state => state.reportForms.dateTitle, // 快选时间标题
      date: state => state.reportForms.date, // 选中的时间
      addShow () {
        let type = window._addFn.type
        // 添加会员没有权限，直接跳出
        if (type === 'addMember') {
          return true
        }
        let a = this.$store.state.home.otherData['account:agent:saveAgentDirect']
        if (a && type === 'addAgent') {
          return true
        }
        return false
      }
    }),
    headerType () {
      return this.$store.state.home.headerType // 头部类型
    },
    headTitle () {
      // 只有代理和会员需要判断权限
      if (this.headerType === 7) {
        this.addShowBtn = false
        let type = window._addFn.type
        // 添加会员没有权限，直接跳出
        if (type === 'addMember') {
          this.addShowBtn = true
        }
        let a = this.$store.state.home.otherData['account:agent:saveAgentDirect']
        if (a && type === 'addAgent') {
          this.addShowBtn = true
        }
      }
      return this.$store.state.home.headTitle // 头部类型
    }
  },
  components: {
    Picker
  },
  methods: {
    // 在线客服
    openOnlineService () {
      window.indexMain.openOnlineService()
    },
    toPlatFormReport () {
      window.indexMain.gpoScrollTop()
      this.$router.go(-1)
      // let query = JSON.parse(sessionStorage.getItem('platFormReportQuery'))
      // console.log(query, 'query')
      // this.$router.push({
      //   path: 'platFormReport',
      //   query: query
      // })
    },
    addFn () {
      // 头部运行全局的 函数
      // 代理添加
      let type = window._addFn.type
      switch (type) {
        case 'addAgent':
          this.$router.push('/m/account/agentAdd/init')
          window._addFn = {}
          break
        case 'addMember':
          this.$router.push('/m/account/membershipAdd')
          window._addFn = {}
          break
      }
    },
    // 左侧菜单
    toggleLeftSideMenu () {
      this.$store.state.home.MuseUI.open = true
      this.$store.state.home.MuseUI.dockedLeft = false
    },
    // 获取选择的日期
    selectDateList (e) {
      this.$store.state.reportForms.date = e[0]
      this.$store.state.reportForms.isClick = true
    },
    // 去现金流查询页面
    toQueryCash () {
      let item = window.router.history.current.query
      this.$router.push({
        path: '/m/cash/queryCashStream',
        query: {
          'accountName': item.accountName,
          'bettingCode': item.bettingCode,
          'rate': item.rate,
          'pickDateStartVal': item.pickDateStartVal,
          'pickDateEndVal': item.pickDateEndVal
        }
      })
    },
    // 去返水查询
    toRebates () {
      this.$router.push({ path: '/m/queryRebates' })
    },
    Goback () {
      // 区分是否 在退出之前是否 存在 需要执行的函数
      window.indexMain.gpoScrollTop()
      let { name, params } = this.$route
      let query = this.$route.query
      let stop = true
      switch (name) {
        case 'agentDeep':
        case 'memberDeep':
        case 'agent':
          stop = false
          if (query.back) {
            this.$router.push({ // 回到之前
              path: query.back,
              query: window.routerOjb[query.back]
            })
            return ''
          }
          stop = true
          break
        case 'membershipAddOne':
          // 从代理跳过来的agentAdd/3049 到添加会员
          window.layer.confirm('是否放弃本次编辑', () => {
            if (query.back) {
              this.$router.push({// 回到之前
                path: query.back,
                query: window.routerOjb[query.back]
              })
              return ''
            }
            // 分一种情况 直接回 /m/account/membership/0
            let _path = '/m/account/membership/0'
            if (params.id) _path = '/m/account/agent/0'
            this.$router.push({
              path: _path,
              query: {
                'searchVal': query.searchVal
              }
            })
          })
          return ''
        case 'agentAdd':
          window.layer.confirm('是否放弃本次编辑', () => {
            if (query.back) {
              this.$router.push({// 回到之前
                path: query.back,
                query: window.routerOjb[query.back]
              })
              return ''
            }
            this.$router.go(-1)
          })
          return ''
        case 'agentEdit':
        case 'agentSave':
        case 'membershipAdd':
        case 'membershipEdit':
        case 'membership':
          window.layer.confirm('是否放弃本次编辑', () => {
            this.$router.go(-1)
          })
          return ''
        case 'announceDetail':
          stop = false
          this.$store.state.announcement.noticeType = query.noticeType
          this.$router.go(-1)
          break
        default:
          stop = true
          break
      }
      if (stop) this.$router.go(-1)
    },
    // 在线客服
    onlineService () {
      window.indexMain.openOnlineService()
    },
    // 下载APP
    download () {
      window.open(this.$store.state.user.downloadUrl, '_blank')
    }
  },
  mounted () {
    // console.log(this.$store.state.reportForms.date)
    // 回到页面顶端
    window.indexMain.gpoScrollTop()
    let routeName = this.$route.name
    if (routeName === 'agentAdd' || routeName === 'agentEdit' ||
    routeName === 'agentSave' || routeName === 'membershipAdd' ||
    routeName === 'membershipAddOne' || routeName === 'membershipEdit') {
      window.$('body').addClass('claer-fixed-box')
    } else {
      window.$('body').removeClass('claer-fixed-box')
    }
  }
}
</script>
