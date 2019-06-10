<template>
  <div class="menuCont helpMenu">
    <h1>帮助中心<span id="">PLAYERS HELP</span></h1>
    <el-menu :default-active="activeId.toString()" class="el-menu-vertical-demo" unique-opened>
      <el-menu-item index="home" class="homeTitle" @click.native.stop="toUrl('home')">
        <span slot="title">主页</span>
      </el-menu-item>
      <!-- 下面为数据结构的嵌套，如果某一层是列表那么就设置为菜单标签，否则设置为可点击的item -->
      <div v-for='(item,index) in menus' :key='index' style="width: 100%">
        <el-submenu :index="item.id.toString()" v-if='item.childCategory.length>0' @click.native.stop="openMenu(item)" >
          <el-menu-item :index="item.id.toString()" v-show='false'> </el-menu-item>
          <template slot="title">
            <span>{{item.categoryName}}</span>
          </template>
          <div v-for='(item2,index) in item.childCategory' :key='index'>
            <el-submenu :index="item2.id.toString()" v-if='item2.childCategory.length>0' class="subMenu2" @click.native.stop="openMenu(item2)">
               <el-menu-item :index="item2.id.toString()" v-show='false'> </el-menu-item>
                <template slot="title">
                  <span>{{item2.categoryName}}</span>
                </template>
                <div v-for='(item3,index) in item2.childCategory' :key='index'>
                    <el-menu-item :index="item3.id.toString()" @click.native.stop="toUrl('question',item3.id)">
                      <span slot="title">{{item3.categoryName}}</span>
                    </el-menu-item>
                </div>
            </el-submenu>
            <el-menu-item :index="item2.id.toString()" v-else @click.native.stop="toUrl('question',item2.id)">
              <span slot="title">{{item2.categoryName}}</span>
            </el-menu-item>
          </div>
        </el-submenu>
        <el-menu-item :index="item.id.toString()" class="homeTitle" v-else @click.native.stop="toUrl('question',item.id)">
          <span slot="title">{{item.categoryName}}</span>
        </el-menu-item>
      </div>
      <el-submenu index="pay">
        <template slot="title">
          <span slot="title">支付</span>
        </template>
        <el-menu-item index="deposit" @click.native.stop="toUrl('pay','deposit')">存款</el-menu-item>
        <el-menu-item index="withdrawl" @click.native.stop="toUrl('pay','withdrawl')">提款</el-menu-item>
      </el-submenu>
      <el-menu-item index="empty" style='display:none'></el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'
  import * as types from '@/store/help/type'
  export default {
    data () {
      return {
        subShow: false
      }
    },
    created () {
      this.initMenuData()
    },
    methods: {
      ...mapActions({
        getNavigationMenuAction: types.GETNAVIGATIONMENU // 初始化额度转换数据
      }),
      openMenu (item) {
        this.$router.push({ name: 'question', params: { id: item.id } })
      },
      toUrl (name, id) {
        this.$router.push({ name: name, params: { id: id } })
      },
      // 初始化左侧栏菜单数据
      initMenuData () {
        this.getNavigationMenuAction().then(res => {
          console.log(res.data, '左侧菜单栏数据')
        })
      }
    },
    computed: {
      ...mapState({
        menus: state => state.help.menus, // 侧边栏按钮数据
        activeId: state => state.help.activeId // 选中的菜单栏index
      })
    }
  }
</script>


