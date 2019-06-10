<template>
    <div id='manageCenter'>
        <!--推广管理列表页-->
        <div class="header yo-home-nav">
            <div class="center">
                <div class="hea-menu hea-left">
                    <a href="javascript:;" @click="$router.go(-1)">
                        <i class="yo-icon icon-arrows-left"></i>
                    </a>
                </div>
                <div class="header-text titile">
                    <h1>团队管理</h1>
                </div>
            </div>
        </div>
        <!-- 背景图 -->
        <div class="tmBanner">
            <img src="/static/RESOURCE_VERSION/local/img/teamManage/teamMadeCoin.jpg" alt="">
        </div>
        <!-- 内容去 -->
        <div class="content">
            <!-- 三个菜单导航 -->
            <div class="manageItem nav">
                <div class='menu'>
                    <div class='iconPic' @click="goPage('/wap/teamManage/manage')">
                        <img src="/static/RESOURCE_VERSION/local/img/teamManage/propManage.svg" alt="">
                    </div>
                    <p @click="goPage('/wap/teamManage/manage')">
                        推广管理
                    </p>
                </div>
                <div class='menu'>
                    <div class='iconPic'>
                        <img src="/static/RESOURCE_VERSION/local/img/teamManage/成员@2x.svg" alt="">
                    </div>
                    <p>
                        团队成员
                    </p>
                </div>
                <div class='menu'>
                    <div class='iconPic'>
                        <img src="/static/RESOURCE_VERSION/local/img/teamManage/报表@2x.svg" alt="">
                    </div>
                    <p>
                        团队报表
                    </p>
                </div>
            </div>
            <!-- 跳转列表 -->
            <div class="manageItem">
                <div class="titleIcon">
                    <img src="/static/RESOURCE_VERSION/local/img/teamManage/说明 @2x.svg" alt="">
                </div>
                <p>
                    团队说明
                </p>
                <div class="toDetail">
                    <i class='icon icon-arrows-right'></i>
                </div>
            </div>
            <div class="manageItem">
                <div class="titleIcon">
                    <img src="/static/RESOURCE_VERSION/local/img/teamManage/报表 @2x.svg" alt="">
                </div>
                <p>
                    下级报表
                </p>
                <div class="toDetail">
                    <i class='icon icon-arrows-right'></i>
                </div>
            </div>
            <div class="manageItem">
                <div class="titleIcon">
                    <img src="/static/RESOURCE_VERSION/local/img/teamManage/记录 @2x.svg" alt="">
                </div>
                <p>
                    交易记录
                </p>
                <div class="toDetail">
                    <i class='icon icon-arrows-right'></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    },
    computed: {
    },
    methods: {
      goPage (a) {
        this.$router.push(a)
      }
    },
    mounted () {
    }
  }
</script>
