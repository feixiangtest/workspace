<template>
    <div class="index-main main-box">
        <banner />
        <div class="index-notice yow-content">
            <span><i class="yo-icon icon-notice"></i></span>
            <marquee scrollamount="3" @click="hotNewsHistory(true)" v-html="$store.state.h5Home.announcementList"></marquee>
        </div>
        <!-- 最新消息 -->
        <history-news v-show="showHotNews" :hotNewsHistory="hotNewsHistory"></history-news>
        <!-- 登录弹框 -->
        <popupLoginAd v-if="showLoginAd" ></popupLoginAd>
        <!-- 首页广告 -->
        <popupHomeAd v-if="showHomeAd" ></popupHomeAd>
        <!-- 维护弹窗 -->
        <maintainNotice v-if="showHomeMN"> </maintainNotice>
        <!-- 跳转栏目列表 -->
        <div class="index-nav yow-content">
            <ul>
                <li>
                    <a href="javascript:void(0);" @click="$authJumpUrl('wap/payment',{needLogin:true,forbidTryUser:true,text:'立即充值功能'})">
                        <img src="../../assets/img/icon/recharge.svg" alt="">
                        <span>立即充值</span>
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0);" @click="toWithDrawl()">
                        <img src="../../assets/img/icon/withdrawal.svg" alt="">
                        <span>快速取款</span>
                    </a>
                </li>
                <!-- 登录前-开启注册显示注册 -未开启注册显示额度转换 -->
                <li v-if='!isShowReg && userInfo && !userInfo.account'>
                    <a href="javascript:void(0);" @click="register()">
                        <img src="../../assets/img/icon/register.svg" alt="">
                        <span>注册</span>
                    </a>
                </li>
                <li v-if='isShowReg || (userInfo && userInfo.account)'>
                    <a href="javascript:void(0);" @click="$authJumpUrl('wap/common/creditConversion',{needLogin:true,forbidTryUser:true,text:'额度转换功能'})">
                        <img src="../../assets/img/icon/change.svg" alt="">
                        <span>额度转换</span>
                    </a>
                </li>
                <li v-if='userInfo && !userInfo.account'>
                    <a href="javascript:void(0);" @click="$authJumpUrl('wap/login')">
                        <img src="../../assets/img/icon/login.svg" alt="">
                        <span>登录</span>
                    </a>
                </li>
                <!-- 登录后 -->
                <li v-if='userInfo.account'>
                    <a href="javascript:void(0);" @click="$authJumpUrl('wap/transactionRecord',{needLogin:true,forbidTryUser:false})">
                        <img src="../../assets/img/icon/betting.svg" alt="">
                        <span>交易记录</span>
                    </a>
                </li>
            </ul>
        </div>
        <!-- 游戏模块 -->
        <div v-if='homeGameList.newGameIndexList&&homeGameList.newGameIndexList.length>0&&homeGameList.hotGameIndex&&homeGameList.hotGameIndex.isExist===1'>
            <div class="public-title">
                <h1 class="yow-content">热门精选</h1>
            </div>
            <div class="hot-game yow-content">
                <img :src="homeGameList.hotGameIndex.indexHotPic" alt="" @click="toGame(homeGameList.hotGameIndex)">
            </div>
        </div>
        <div class="public-title" v-if='homeGameList.newGameIndexList&&homeGameList.newGameIndexList.length>0'>
            <h1 class="yow-content">真人视讯</h1>
        </div>
        <div class="index-game yow-content">
            <ul>
                <li :key="index" v-for="(item, index) in homeGameList.newGameIndexList">
                  <i class="yo-img-icon img-shiwan" v-if='item.trialFlag===1&&type===1'></i>
                  <i class="yo-img-icon" :class='"img-"+transMark[item.gameFlag-1]' v-if='type!==1'></i>
                    <img :src="item.indexPic" alt="" @click="toGame(item)">
                </li>
            </ul>
        </div>
        <!-- 底部换肤，说明等内容 -->
        <div class="window-to-pc yow-content text-center magt10">
            <a href="javascript:void(0);" @click='changeSkin()'><i class="yo-icon icon-pc"></i>&nbsp;&nbsp;切换到电脑版</a>
            <p class="magt5">版权所有Copyright©Reserved</p>
        </div>

        <!-- 首次进入APP弹出引导页 -->
        <div v-if="firstMain !== '1'" class="guidePage" :key="index" v-for="(item, index) in mobIndexWapDirectionsList" :style="currentIndex === index ? 'display:block' : 'display:none'" @click="openGuidePage(index)" @touchmove.prevent>
            <div class="viewpager">
                <img v-if="isPreview2 === 2" :src="guideMap.fastDfsUrl + item.cpicSim" alt="">
                <img v-else :src="fastDfsUrl + item.cpicSim">
            </div>
            <div class="skipButtom" @click.stop="openGuidePage(1000)">
                <!-- <img :src="commonImgUrl + '/tg.png'"> -->
                <a href="javascript:void(0);">跳过</a>
            </div>
        </div>

    </div>
</template>

<script>
    import banner from '@/components/home/banner.vue'
    import historyNews from './historyNews'
    import popupLoginAd from './popupLoginAd'
    import popupHomeAd from './popupHomeAd'
    import maintainNotice from './maintainNotice'
    import {
      mapState
    } from 'vuex'
    export default {
      data () {
        return {
          showHotNews: false,
          currentIndex: 0,
          firstMain: '',
          transMark: ['', 'zuixin', 'huobao', 'huodong'] // 将后端返回的游戏标识转化为对应类名
        }
      },
      created () {
        // 处理骨架 div
        function complete () {
          window.$('#preApp').remove()
          window.$('#preAppJS').remove()
        }
        window.$('#preApp').fadeOut(complete)
        this.firstMain = localStorage.getItem('firstMain')
      },
      mounted () {
        this.$store.state.h5Home.headerType = 1
        // if (this.$store.state.h5Home.forceUpdatePwd) { // 是否提示强制修改密码
        //   window.indexMain.forceUpdateAlert() // 提示强制修改密码
        // }
      },
      components: {
        banner,
        historyNews,
        maintainNotice,
        popupLoginAd,
        popupHomeAd
      },
      computed: {
        ...mapState({
          isLogin: state => state.user.isLogin, // 是否已经登录
          userInfo: state => state.user.userInfo, // 用户信息
          isShowReg: state => state.h5Home.isShowReg, // 是否显示注册入口
          isPreview2: state => state.h5Home.isPreview2, // 预览选项
          guideMap: state => state.h5Home.guideMap, // 预览引导页数据
          fastDfsUrl: state => state.h5Home.fastDfsUrl, // 静态资源地址
          homeGameList: state => state.h5Home.homeGameList, // 游戏数据
          maintainNotice: state => state.shareApi.maintainNotice, // 维护公告数据
          type: state => parseInt(state.h5Home.type) // 登录类型  2表示测试会员，1表示是试玩，0表示正常(包括正常用户和非登陆情况)
        }),
        // 当引导页已经显示完成或者没有引导页（也就是没有引导页出现的情况下），而且用户未登录则弹出首页广告
        showHomeAd () {
          let a = (this.firstMain === '1' || (this.mobIndexWapDirectionsList && this.mobIndexWapDirectionsList.length <= 0)) && !this.isLogin
          // this.ifmaintainNotice('showHomeAd', a)
          return a
        },
        // 当引导页已经显示完成或者没有引导页（也就是没有引导页出现的情况下）则弹出维护公告
        showHomeMN () {
          let a = (this.firstMain === '1' || (this.mobIndexWapDirectionsList && this.mobIndexWapDirectionsList.length <= 0))
          return a
        },
        // 当引导页已经显示完成或者没有引导页（也就是没有引导页出现的情况下），而且用户已登录则弹出登录公告
        showLoginAd () {
          let a = (this.firstMain === '1' || (this.mobIndexWapDirectionsList && this.mobIndexWapDirectionsList.length <= 0)) && this.isLogin
          // this.ifmaintainNotice('showLoginAd', a)
          return a
        },
        // 引导图列表数据
        mobIndexWapDirectionsList () {
          if (this.$store.state.h5Home.guideMap.articleVo) { // 如果是预览就显示预览数据
            this.firstMain = 0
            localStorage.setItem('firstMain', 0)
            return this.$store.state.h5Home.guideMap.articleVo.photoDocList
          } else {
            return this.$store.state.h5Home.mobIndexWapDirectionsList
          }
        }
      },
      methods: {
        /**
         *  this.showLoginAd true 也可能 弹窗已经被关闭了
         *  this.showHomeAd  true 也可能 弹窗已经被关闭了
         *  showLoginAd  showHomeAd 判断并不准确
         *  本函数 更新 showLoginAd  showHomeAd 的状态值
         */
        // h5跳转游戏方法
        toGame (games) {
          // 判断是否登录
          if (!window.common.loginStatus) {
            window.store.state.shareApi.showPopLogin = true // 跳转登录
            return false
          }
          // 如果接口有游戏跳转链接，那么跳转到指定的链接，否则按照平台跳转
          if (games.frontUrl) {
            var left = (document.body.clientWidth - 1000) / 2
            var params = 'height=680,width=970,top=0,left=' + left + ',toolbar=no,menubar=no,scrollbars=no' + ',resizable=yes,location=yes, status=yes'
            var reg = new RegExp('^http')
            var reg2 = new RegExp('^https')
            var jumpUrl = ''
            if (reg.test(games.frontUrl) || reg2.test(games.frontUrl)) {
              jumpUrl = games.frontUrl
            } else {
              jumpUrl = '//' + games.frontUrl
            }
            window.open(jumpUrl, '视讯游戏', params)
          } else {
            this.$jumpLive(games.jumpArgs, 1, games.id)
          }
        },
        // 跳转到取款页面
        toWithDrawl () {
          if (this.isLogin) {
            this.$store.dispatch('initDrawData.action', { bankType: 0 }).then(res => {
              if (res.status === '1') {
                if (this.type === 1) {
                  window.layer.msgWarn('对不起，快速取款功能不对试玩账号开放！')
                } else {
                  window.layer.msgWarn('为保证您的权益，请先绑定您的出款资讯', () => {
                    sessionStorage.setItem('switchPages', '/wap/common/fastCash')
                    this.$authJumpUrl('wap/addCard', {needLogin: true, forbidTryUser: true, text: '快速取款功能'})
                  })
                }
              }
              if (res.status === '0') {
                this.$authJumpUrl('wap/common/fastCash', {needLogin: true, forbidTryUser: true, text: '快速取款功能'})
              }
            }).catch(rej => {
              console.log(rej, 'rej')
            })
          } else {
            this.$router.push('/wap/login')
          }
        },
        /**
             * 引导图点击事件，最终让引导图隐藏
             */
        openGuidePage (index) {
          this.currentIndex = index + 1
          if (this.currentIndex >= this.mobIndexWapDirectionsList.length) {
            localStorage.setItem('firstMain', 1)
            this.firstMain = '1'
          }
        },
        // 换肤到pc端
        changeSkin () {
          delete localStorage.place
          this.setCookie('toPcSite', 'toPcSite') // 将新站点字段存储在cookie，供运维来判断跳转pc地址
          window.location.href = window.location.href.split('?nocache=')[0] + '?nocache=' + (new Date()).getTime()
        },
        setCookie (name, value, time) {
          // 如果不传time，那就就为临时cookie
          if (!time) {
            document.cookie = name + '=' + escape(value) + ';path=/'
            return
          }
          var strsec = this.getsec(time)
          var exp = new Date()
          exp.setTime(exp.getTime() + strsec * 1)
          var path = '/'
          document.cookie = name + '=' + escape(value) + ';path=' + path + ';expires=' + exp.toGMTString()
        },
        // 打开最新消息，如果有弹出消息弹框，就阻止穿透滑动
        hotNewsHistory (val) {
          this.showHotNews = val
          document.documentElement.style.overflow = val ? 'hidden' : ''
        },
        // 注册验证跳转
        register () {
          var postActioin = { type: 'h5', versionFun: true, hideLoading: true }
          // 请求基本资料数据
          this.$store.dispatch('user.register', postActioin).then(res => {
            if (res.data.regStatus) {
              window.layer.msgWarn('本平台暂未开放注册功能，请联系客服')
            } else {
              this.$authJumpUrl('wap/register')
            }
          })
        }
      }
    }
</script>

