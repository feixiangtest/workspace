<template>
  <div id="indexvue">
    <div class="center clearfix">
      <member-menu></member-menu>
      <div id="memberContent">
        <div class="mainContent">
          <!-- 右边head  公用部分 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>{{ breadcrumb[0] }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ breadcrumb[1][activeTab] }}</el-breadcrumb-item>
          </el-breadcrumb>

          <header-nav  :menuChange='changeTab' ></header-nav>
          <!-- 右边head  公用部分 -->
          <!-- 右边内容 -->
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import memberMenu from '@/components/menu.vue'
  import headerNav from '@/components/layout/headerNav.vue'
  import * as member from '@m/utils/member'
  import {
    mapState
  } from 'vuex'

export default {
    name: 'indexvue',
    components: {
      memberMenu, headerNav
    },
    data () {
      return {
        member: member
      }
    },
    computed: {
      ...mapState({
        menuTab: state => state.member.menuTab, // 右侧 tab 数据
        activeTab: state => state.member.activeTab, // 右侧 tab 数据 选中
        breadcrumb: state => state.member.breadcrumb // 右侧 面包
      })
    },
    methods: {
      changeTab: function (index, detail) {
        let l2 = this.$router.l2
        if (window.common.isFree()) {
          if (index === 'onlineWithdrawals' || index === 'safeSet') {
            window.layer.msgWarn(`对不起，${detail.title}不对试玩账号开放！`)
            return ''
          }
        }
        // 没有修改密码，则不允许跳转
        if (localStorage.getItem('setFirstPwd')) {
          window.layer.msgWarn('为了保障您的账户安全，首次登录时需要修改您的登录密码')
          return
        }
        this.$router.push(`/center/${l2}/` + index) // url 第二层 + index  = 确定 跳转 url
        // tab 切换 数据不会重新传入
        this.$store.state.member.activeTab = index
      },
      initLeft: function (urlID) {
        // 初始化 右侧 头部 文字 和 tab 文字
        let l2 = this.$router.l2
        this.$store.state.member.l2 = l2
        this.$store.state.member.menuTab = this.member.default[l2].menuTab

        this.$store.state.member.breadcrumb = this.member.default[l2].breadcrumb
        this.$store.state.member.activeTab = this.$router.l3
      }
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出响应... 初始化 右侧 头部 文字 和 tab 文字
        this.initLeft()
      }
    },
    mounted () {
      this.initLeft()
    }
  }
</script>
