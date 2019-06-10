<template>
    <div id="comHead">
        <!-- logo -->
        <div class="header-logo">
            <img src="/resource/ot001/images/logo.png" alt="" @click="goToIndex">
        </div>
        <!-- header-top -->
        <div class="header-top clearfix">
            <div class="header-left">
                <div class="header-phone changeC2" @click.stop="$changeSkin()">出款零审核，客户三年零投诉</div>
                <div class="top-link-wrap">
                    <router-link class="changeC1" to="/promotion">电子专题优惠</router-link>
                    <span @click="$changeSkin()" style='cursor:pointer'> |切换皮肤</span>
                </div>
                <span class="lang-wrap">
                    <span class="ele-lang-wrap">
                        <a href="javascript:void(0)" class="ele-lang-option ele-lang-zh-tw"></a>
                        <a href="javascript:void(0)" class="ele-lang-option ele-lang-zh-cn"></a>
                        <a href="javascript:void(0)" class="ele-lang-option ele-lang-en"></a>
                    </span>
                </span>
            </div>
            <!--已登录-->
            <login-after v-if='isLogin'></login-after>
            <!-- 未登录 -->
            <login-before v-if='!isLogin'></login-before>
        </div>
        <!-- nav -->
        <div class="nav">
            <ul>
                <li id="menu_01">
                    <router-link to="/home">首页</router-link>
                </li>
                <li class="live has-menu">
                    <a href="javascript:;" @click="$jumpLive('ag')">AG视讯</a>
                </li>
                <li class="slots has-menu hot">
                    <a href="javascript:;" @click="$jumpLive('og')">OG视讯</a>
                </li>
                <li id="menu_mg" class="mggame has-menu">
                    <a href="javascript:;" @click="$jumpLive('bb')">BB视讯</a>
                </li>
                <li class="sports has-menu">
                    <a href="javascript:;" @click="$jumpLive('ab')">AB视讯</a>
                </li>
                <li class="has-menu">
                    <router-link to="/live">视讯大厅</router-link>
                </li>
                <li class="lottery has-menu">
                    <a href="javascript:void(0);" @click="$openChatWin" >在线客服</a>
                </li>
                <li id="menu_06" class="hot">
                    <router-link to="/promotion">优惠活动</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {
      mapState
    } from 'vuex'
    import loginBefore from './login/loginBefore.vue'
    import loginAfter from './login/loginAfter.vue'
    export default {
      name: 'comHeader',
      data () {
        return {}
      },
      computed: {
        ...mapState({
          isLogin: state => state.user.isLogin // 登录状态
        })
      },
      mounted () {
        // 用于处理是否登录状态，每个站必须调用
        this.$isLoginStatus()
      },
      components: {
        loginBefore,
        loginAfter
      },
      methods: {
        goToIndex: function () {
          this.$router.push({
            path: '/home'
          })
        }
      }
    }
</script>
