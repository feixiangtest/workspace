<template>
  <div class="index-main main-box">
    <!-- 用户信息-登录前 -->
    <div v-if="!isLogin" class="user-info-box yow-content" @click="jumpUrl('wap/login')">
      <div class="user-pic">
        <img src="@/assets/img/user.png">
      </div>
      <div class="info-box">
        <h1>登录</h1>
        <p>快速登录立即游戏</p>
      </div>
    </div>
    <!-- 用户信息-登录后 -->
    <div v-else class="user-info-box yow-content" @click="jumpUrl('wap/personSet')">
      <div class="user-pic">
        <img src="@/assets/img/user-pic.png">
      </div>
      <div class="info-box login-after">
        <h1>{{userInfo.account}}</h1>
        <i class="yo-icon icon-next"></i>
      </div>
    </div>
    <!-- 快捷菜单 -->
    <div class="user-menu yow-content">
      <ul>
        <li @click="$authJumpUrl('wap/payment',{needLogin:true,forbidTryUser:true,text:'立即充值功能'})">
          <img src="../../assets/img/icon/recharge.svg" alt="">
          <span>立即充值</span>
        </li>
        <li @click="toWithDrawl()">
          <img src="../../assets/img/icon/withdrawal.svg" alt="">
          <span>快速取款</span>
        </li>
        <li @click="$authJumpUrl('wap/common/creditConversion',{needLogin:true,forbidTryUser:true,text:'额度转换功能'})">
          <img src="../../assets/img/icon/change.svg" alt="">
          <span>额度转换</span>
        </li>
      </ul>
    </div>
    <!-- 菜单列表 -->
    <div class="user-item yow-content">
      <div class="yo-form-item" @click="$authJumpUrl('wap/common/accountBalance',{needLogin:true})">
        <h5 class="title t-balance"><span><i class="yo-icon icon-balance"></i></span>账户余额</h5>
        <p class="con-txt">
          <!-- <span class="num-txt tips-txt" v-if='isLogin && userInfo.money === 0'>{{userInfo.totalmoney | moneyFilter}}</span>&nbsp;&nbsp; -->
          <span class="num-txt tips-txt" v-if='isLogin'>{{userInfo.money | moneyFilter}}</span>&nbsp;&nbsp;
          <i class="yo-icon icon-next"></i>
        </p>
      </div>
      <div class="yo-form-item" @click="$authJumpUrl('wap/cardList',{needLogin:true,forbidTryUser:true,text:'银行卡功能'})">
        <h5 class="title t-bank"><span><i class="yo-icon icon-bank"></i></span>银行卡</h5>
        <p class="con-txt"><i class="yo-icon icon-next"></i></p>
      </div>
      <div class="yo-form-item" @click="$authJumpUrl('wap/transactionRecord',{needLogin:true,forbidTryUser:false})">
        <h5 class="title t-deal"><span><i class="yo-icon icon-deal"></i></span>交易记录</h5>
        <p class="con-txt"><i class="yo-icon icon-next"></i></p>
      </div>
      <div class="yo-form-item" @click="$authJumpUrl('wap/messageList',{needLogin:true})">
        <h5 class="title t-news">
          <span><i class="yo-icon icon-news"></i></span>消息记录
          <span class="msgTips" v-if="this.msgCount > 0">{{msgCount}}</span>
        </h5>
        <p class="con-txt"><i class="yo-icon icon-next"></i></p>
      </div>
      <div class="yo-form-item" @click="$authJumpUrl('wap/gameExplain', {needLogin:true,forbidTryUser:true,text:'游戏客户端功能'})">
        <h5 class="title t-client"><span><i class="yo-icon icon-game-client"></i></span>游戏客户端</h5>
        <p class="con-txt"><i class="yo-icon icon-next"></i></p>
      </div>
    </div>
    <!-- 退出登录-登录后 -->
    <div class="login-out text-center" v-if="isLogin">
      <a href="javascript:void(0);" @click='loginOut()' class="btn btn-ml btn-white">退出登录</a>
    </div>
    <!-- 游戏客户端-漂浮详情页 -->
    <float-page :isfloatPage='isfloatPage' :floatPageType='floatPageType' :floatTitle='floatTitle' :floatBgcolor='floatBgcolor'></float-page>
  </div>
</template>

<script>
  // import * as type from '@m/store/payment/type'
  import {
    mapState,
    mapActions
  } from 'vuex'
  import floatPage from '@/components/floatPage/publicDetails' // 浮动单页-游戏客户端
  // import loginAfter from '@s/components/loginAfter'
  import * as userTypes from '@s/store/user/type.js'
  import * as types from '@/store/h5Home/type.js'
  export default {
    data () {
      return {
        floatTitle: '', // 浮动单页标题
        floatBgcolor: '' // 浮动单页-背景色
      }
    },
    mounted () {
      this.$store.state.h5Home.headerType = 1
      setTimeout(() => {
        if (this.isLogin) {
          // 获取未读消息总条数
          this.getMsgCount()
        }
      }, 50)
    },
    computed: {
      ...mapState({
        isfloatPage: state => state.h5Home.isfloatPage, // 显示浮动单页
        floatPageType: state => state.h5Home.floatPageType, // 显示类型
        isLogin: state => state.user.isLogin, // 是否已经登录
        userInfo: state => state.user.userInfo, // 用户信息
        type: state => parseInt(state.h5Home.type), // 登录类型  2表示测试会员，1表示是试玩，0表示正常(包括正常用户和非登陆情况)
        msgCount: state => state.h5Home.msgCount // 未读消息条数
      })
    },
    watch: {
      isLogin (v) {
        if (v) {
          if (window.store.state.h5Home.type === '1') return
          window.store.dispatch('user.moneyConversion', {
            api: 0
          }) // 调用刷新余额接口
        }
      }
    },
    components: {
      floatPage
    },
    methods: {
      ...mapActions({
        loginOutAction: userTypes.LOGINOUT // 登出接口
        // updateMoneyAction: userTypes.UPDATESESSIONMONEY // 刷新余额接口
      }),
      loginOut () {
        window.layer.confirm('是否确定退出', () => this.loginOutAction())
        this.$store.state.h5Home.msgCount = ''
      },
      // 初始化数据
      toWithDrawl () {
        if (this.isLogin) {
          this.$store.dispatch('initDrawData.action', {
            bankType: 0
          }).then(res => {
            if (res.status === '1') {
              if (this.type === 1) {
                window.layer.msgWarn('对不起，快速取款功能不对试玩账号开放！')
              } else {
                window.layer.msgWarn('为保证您的权益，请先绑定您的出款资讯', () => {
                  sessionStorage.setItem('switchPages', '/wap/common/fastCash')
                  this.$authJumpUrl('wap/addCard', {
                    needLogin: true,
                    forbidTryUser: true,
                    text: '快速取款功能'
                  })
                })
              }
            }
            if (res.status === '0') {
              this.$store.state.isSetBankCard = true
              this.$authJumpUrl('wap/common/fastCash', {
                needLogin: true,
                forbidTryUser: true,
                text: '快速取款功能'
              })
            }
          })
        } else {
          this.$router.push('/wap/login')
        }
      },
      jumpUrl (url) {
        this.$router.push({
          path: '/' + url
        })
      },
      // 获取未读消息总条数
      getMsgCount () {
        let param = {}
        this.$store.dispatch(types.H5MSGCOUNT, param).then(res => {})
      }
    }
  }
</script>

