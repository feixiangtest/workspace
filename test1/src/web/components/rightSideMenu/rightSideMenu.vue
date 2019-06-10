<template>
<div class="yo-right-menu">
    <div class="sideUser">
        <div class="isLogin">
            <!--未登录-->
            <div class="touxiang tx1" v-if="!isLogin">
                <img :src="commonImgUrl + '/common/tx.png'">
            </div>
            <!--已登录-->
            <div class="touxiang tx2" v-if="isLogin">
                <img :src="account.weixinIco" v-if="account.weixinIco">
                <img :src="commonImgUrl + '/common/tx.png'" v-if="!account.weixinIco">
            </div>
            <div v-if="isLogin" class="info">
                <p class="info-t" v-if="account.weixinIco">{{ account.weiXinNickName}}</p>
                <p class="info-t" v-if="!account.weixinIco">{{ account.account}}</p>
                <p><i class="yo-icon icon-balance"></i><span>{{account.money | moneyFilter}}</span><i class="yo-icon icon-f5account" @click="refreshImg()" :class="refreshFlag ? 'lodingPic' : ''"></i></p>
            </div>
        </div>
        <div class="rightout">
            <a v-if="!isLogin" href="javascript:;" class="right-bt-an" @click="GoRegister()">注册</a>
            <a v-if="!isLogin" href="javascript:;" class="right-bt-an" @click="GoLogin()">登录</a>
            <a v-if="!isLogin" href="javascript:;" class="right-bt-an" @click="loginFree()">试玩</a>
            <a v-if="isLogin" href="javascript:;" class="right-bt-tc" @click="logout()">退出</a>

        </div>
    </div>
    <ul class="sideMenu rightMenu">
        <li>
            <a href="javascript:;" @click="GoMyAccount()"><i class="yo-icon icon-myaccount"></i>我的账户</a>
        </li>
        <li v-if="isLogin && account.promotionStatus === 1">
            <a href="javascript:;" @click="goTeamManage()"><i class="yo-icon icon-pay"></i>团队管理</a>
        </li>
        <li>
            <a href="javascript:;" @click="GoTransactionRecord()"><i class="yo-icon icon-transaction"></i>交易记录</a>
        </li>
        <li v-if="isLogin">
            <a href="javascript:;" @click="payOnline()"><i class="yo-icon icon-online"></i>线上取款</a>
        </li>
        <li v-if="isLogin">
            <a href="javascript:;" @click="GoOnlineDeposit()"><i class="yo-icon icon-pay"></i>快速充值</a>
        </li>
        <li>
            <a href="javascript:;" @click="Gomessage()"><i class="yo-icon icon-newmessage"></i>最新消息</a>
        </li>
        <li>
            <a href="javascript:;" @click="goGameNotice()"><i class="yo-icon icon-notice"></i>游戏公告</a>
        </li>
        <li>
            <a :href="onLineService === undefined ? 'javascript:void(0)' : onLineService.junctionSim"><i class="yo-icon icon-service2"></i>在线客服</a>
        </li>
        <li>
            <a href="javascript:;" @click="shareOpen()"><i class="yo-icon icon-share2"></i>分享好友</a>
        </li>
        <li>
            <a href="javascript:;" @click="goGameClient()"><i class="yo-icon icon-gameclient"></i>游戏客户端</a>
        </li>
    </ul>
</div>

</template>

<script>
import * as types from '@/base/store/home/type'
import * as payment from '@/base/store/payment/type'
import * as statusCode from '@/base/utils/status_const'
import * as index from '@/base/config/index'

export default {
  data () {
    return {
      refreshFlag: false
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.home.isLogin
    },
    account () {
      console.info(this.$store.state.home.userInfo)
      return this.$store.state.home.userInfo
    },
    onLineService () {
      return this.$store.state.home.onlineservice
    },
    /** 后端传入值为0 和 1 */
    type () {
      return this.$store.state.home.type
    },
    commonImgUrl () {
      return this.$store.state.home.commonImgUrl
    }
  },
  methods: {
    // 打开分享
    shareOpen (i) {
      this.$store.state.site.openOuterlayer = true
      this.$store.state.site.outerlayerType = index.outerlayerType.share
      this.$store.state.home.MuseUI.openR = false
      this.$store.state.home.MuseUI.dockedRight = true
      setTimeout(() => {
        window.$('.share-component').share()
      }, 50)
    },
    /**
     * 刷新余额（右侧导航栏余额）
     */
    refreshImg () {
      if (!this.refreshFlag) {
        this.refreshFlag = true
        var lTime = new Date().getTime()
        window.$.when(this.refreshMoney()).always(() => {
          var cTime = new Date().getTime() - lTime
          if (cTime < 1000) {
            setTimeout(() => {
              this.refreshFlag = false
            }, 1000 - cTime)
          } else {
            this.refreshFlag = false
          }
        })
      }
    },
    refreshMoney () {
      var dfd = window.$.Deferred()
      let timestamp = Date.parse(new Date())
      window.$.ajax({
        'type': 'post',
        'url': '/api/wap/member/refreshBlances?t=' + timestamp,
        'dataType': 'json',
        'cache': false,
        'async': true, // 不能用同步，否则该轮事件正在轮询（未进入下一个轮询），导致请求过程中刷新图标的lodingPic类未加上去
        'contentType': 'application/json',
        'success': function (result) {
          if (result.status === statusCode.statusConst.SUCCESS) {
            window.store.state.home.userInfo.money = result.data.account.money
          } else if (result.status === '5') {
            // 清空用户数据
            window.store.state.home.userInfo = {}
            window.store.state.home.isLogin = false
          }
          dfd.resolve()
        },
        'error': function (xhr) {
          if (!navigator.onLine) { // 网络无连接
            window.store.state.home.isOffLine = true
            window.layer.msgWarn('网络连接中断，请检查您的网络', () => {
              window.indexMain.hideLoading()
            })
          }
          dfd.reject()
        }
      })
      return dfd.promise()
    },
    GoRegister () {
      this.toggle(true)
      this.$router.push('/wap/register')
    },
    GoLogin () {
      this.toggle(true)
      this.$router.push('/wap/login')
    },
    loginFree () {
      this.toggle(true)
      this.$store.dispatch(types.LOGIN_FREE_ACTION, {}).then(res => {
        if (res.status === statusCode.statusConst.SUCCESS) {
          let versionList = window.indexMain.versionFun('initData', 'homeVersionKey')
          this.$store.dispatch('initData.action', versionList) // 重新获取首页信息
          window.layer.msgWarn('您已进入试玩模式，请尽情体验！！', () => {
            // this.$store.state.home.gameNoticeFlag = true // 首页游戏公告显示 试玩不需要显示公告
            this.$router.push('/wap/index')
            this.$store.state.home.userInfo.money = res.data.money
          })
        }
      })
    },
    /** 快速充值 */
    GoOnlineDeposit () {
      this.toggle(true)
      if (Number(this.type) === 1) {
        window.layer.msgWarn('对不起，充值功能不对试玩账号开放！')
        return false
      } else if (!window.navigator.onLine) {
        window.layer.msgWarn('网络连接中断，请检查您的网络！')
      } else {
        // 每次点击置空支付类型
        this.$store.state.payment.bankType = null
        window.moduleRouter.push('/' + window.moduleRouter._payKey + '/payment') // 跳转支付项目
      }
    },
    /** 交易记录 */
    GoTransactionRecord () {
      this.toggle(true)
      if (!this.isLogin) {
        this.$router.push('/wap/login')
      } else {
        this.$router.push('/wap/transactionRecord')
      }
    },
    /** 线上取款 */
    payOnline () {
      this.toggle(true)
      if (Number(this.type) === 1) {
        window.layer.msgWarn('对不起，取款功能不对试玩账号开放！')
        return false
      } else {
        this.$store.dispatch(payment.INIT_DRAW_DATA_ACTION, {bankType: 0, loading: 'pass'}).then(res => {
          // 如果没有登录需要
          if (res.status === '0') {
            if (res.msg === '为保证您的权益，请先绑定您的出款资讯！') {
              window.layer.msgWarn(res.msg, function () {
                window.router.push('/wap/memberCenter/bindBankcard')
              })
            } else {
              window.layer.msgWarn(res.msg)
            }
          } else {
            window.router.push('/wap/memberCenter/onlineDraw')
          }
        }).catch(res => {
          console.log(' INITPAYMENT store error')
        })
      }
    },
    /** 我的账户 */
    GoMyAccount () {
      // 选中后默认将侧边栏关闭
      this.toggle(true)
      if (!this.isLogin) {
        this.$router.push('/wap/login')
      } else {
        this.$router.push('/wap/memberCenter/index')
      }
    },
    /** 最新消息 */
    Gomessage () {
      // 选中后默认将侧边栏关闭
      this.toggle(true)
      if (this.isLogin) {
        this.$router.push('/wap/memberCenter/message')
      } else {
        this.$router.push('/wap/login')
      }
    },
    /** 游戏公告 */
    goGameNotice () {
      // 选中后默认将侧边栏关闭
      this.toggle(true)
      if (this.isLogin) {
        this.$router.push('/wap/memberCenter/gameNotice')
      } else {
        this.$router.push('/wap/login')
      }
    },
    // 游戏客户端
    goGameClient () {
      // 选中后默认将侧边栏关闭
      this.toggle(true)
      if (this.isLogin) {
        if (Number(this.type) === 1) {
          window.layer.msgWarn('该功能只对正式账号进行开放，请您注册正式账号！')
          return false
        } else {
          this.$router.push('/wap/memberCenter/gameClient')
        }
      } else {
        this.$router.push('/wap/login')
      }
    },
    logout () {
      this.toggle(true)
      this.$store.dispatch('logout.action', {}).then(res => {
        if (res.status === statusCode.statusConst.FAILURE) {
          window.layer.wsgWarn('退出失败', function () {
            window.layer.close()
          })
        } else {
          // 退出成功，返回首页 by aby
          this.delFavorite()
          // 清空MG活动默认数据
          this.$store.state.home.tpsActivityAlias = ''
          this.$store.state.home.hasActivityAlias = 'N'
          this.$router.push({path: '/wap/index'})
          window.$.ajax({
            type: 'POST',
            url: '/api/wap/wapLogin/getLoginSession' + '?t=' + new Date().getTime(),
            async: false,
            dataType: 'json',
            success: function (res) {
            }})
        }
      })
    },
    delFavorite () { // 首页数组，视讯数组，体育数组 找到对应的id 改变为未收藏状态
      // 首页或者是视讯
      for (let i = 0; i < this.$store.state.home.liveGameList.length; i++) {
        this.$set(this.$store.state.home.liveGameList[i], 'isFavofite', false)
      }
      // 以TY结尾的表示是体育
      for (let i = 0; i < this.$store.state.home.sportList.length; i++) {
        this.$set(this.$store.state.home.sportList[i], 'isFavofite', false)
      }
      // 体育，视讯都有可能在首页展示，因此首页列表永远进行循环查询
      for (let i = 0; i < this.$store.state.home.gameList.length; i++) {
        this.$set(this.$store.state.home.gameList[i], 'isFavofite', false)
      }
      // 电子游戏
      for (let key of this.$store.state.home.eGamekeys) {
        let arr = this.$store.state.home[key + 'GameData'] || []
        for (let item of arr) {
          this.$set(item, 'isFavofite', false)
        }
      }
    },
    toggle (type) {
      if (type) { // 右側 需要加參數
        this.$store.state.home.MuseUI.openR = !this.$store.state.home.MuseUI.openR
        this.$store.state.home.MuseUI.dockedRight = !this.$store.state.home.MuseUI.dockedRight
      } else {
        this.$store.state.home.MuseUI.open = !this.$store.state.home.MuseUI.open
        this.$store.state.home.MuseUI.dockedLeft = !this.$store.state.home.MuseUI.dockedLeft
      }
    },
    goTeamManage () {

    }
  }
}
</script>
