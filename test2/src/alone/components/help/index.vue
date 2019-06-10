<template>
  <div>
      <header-nav></header-nav>
      <div id="indexvue">
          <div class="center clearfix">
              <div id="memberMenu">
                  <!--左侧菜单-->
                  <menu-nav></menu-nav>
              </div>
              <div id="memberContent">
                  <div class="mainContent">
                      <!-- 右边head面包屑公用部分，如果是问题页面就显示面包屑 -->
                      <el-breadcrumb separator-class="el-icon-arrow-right" v-show="$route.name==='question'">
                          <el-breadcrumb-item v-for='(item,index) in breadcrumb' :key='index'>{{ item }}</el-breadcrumb-item>
                      </el-breadcrumb>
                      <!-- 右侧内容路由  -->
                      <div class="contentBox helpConBox">
                          <router-view></router-view>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    <vue-f5 :key="id"> </vue-f5>
      <!-- </router-view> -->
  </div>
</template>
<script>
  import menuNav from '@/components/help/menuNav'
  import headerNav from '@/components/help/header'
  import vueF5 from '@s/components/bug/vueF5'
  export default {
    components: {
      menuNav,
      headerNav,
      vueF5
    },
    data () {
      return {
        id: +new Date()
      }
    },
    methods: {
      $refresh: function () {
        this.id = +new Date()
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.$refresh()
      })
    },
    computed: {
      breadcrumb () {
        return this.$store.state.help.breadcrumb
      }
    }
  }
</script>

