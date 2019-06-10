<template>
<div style="width: 100%; height: 100%;">
   <div class="header yo-home-nav">
    <div class="center">
      <div class="hea-menu hea-left">
          <a href="javascript:;" @click="goback()"><i class="yo-icon icon-home"></i></a>
      </div>
      <div class="header-text titile">
        <h1>我的账户 <span v-if="$store.state.home.isOffLine">(未连接)</span></h1>
      </div>
      <div class="hea-user hea-right">
          <a href="javascript:;" @click="GoModifyPassword()"><i class="yo-icon icon-setup"></i></a>
      </div>
    </div>
  </div>
  <div class="centerBox mainCenter">
      <div class="yo-user-jbbg">
            <div class="user-banner">
                <div class="tx">
                    <a href="javascript:;">
                      <img :src="accounts.weixinIco" v-if="accounts.weixinIco">
                      <img :src="commonImgUrl + '/common/tx.png'" v-if="!accounts.weixinIco">
                    </a>
                </div>
                <div class="bt">
                    <p><span>{{weiXinNickName}}</span><span>{{account}}</span></p>
                </div>
                <div class="yo-but-bar">
                    <a href="javascript:;" class="yo-zhye-but" @click="GoPlatformMoney()">
                        <p>账户余额</p>
                        <p class="money">{{promptMsg}}</p>
                    </a>
                    <a href="javascript:;" @click="GoPerfectAccount()"><p>个人资料</p></a>
                </div>
            </div>
      </div>
      <div class="yo-user-nav">
        <ul>
            <li>
                <a href="javascript:;" @click="GoOnlineDeposit()">
                    <i class="yo-icon icon-recharge"></i>
                    <span>充值</span>
                </a>
            </li>
            <li>
                <a href="javascript:;" @click="GoOnlineDraw()">
                    <i class="yo-icon icon-transfer-accounts"></i>
                    <span>提款</span>
                </a>
            </li>
            <li>
                <a href="javascript:;"  @click="GoMoneyConversion()">
                    <i class="yo-icon icon-transform"></i>
                    <span>额度转换</span>
                </a>
            </li>
            <li>
                <a href="javascript:;" @click="goTransactionRecord()">
                    <i class="yo-icon icon-transaction2"></i>
                    <span>交易记录</span>
                </a>
            </li>
            <li>
                <a href="javascript:;" @click="GoMessage()">
                    <i class="yo-icon icon-message"></i>
                    <span v-if="!isShow" id="messageCount" style="">{{msgNum}}</span>
                    <span>消息记录</span>
                </a>
            </li>
            <li>
                <a href="javascript:;" @click="goGameNotice()">
                    <i class="yo-icon icon-megaphone"></i>
                    <span>游戏公告</span>
                </a>
            </li>
            <li>
              <a href="javascript:;" @click="goGameClient()">
                <i class="yo-icon icon-computer"></i>
                <span>游戏客户端</span>
              </a>
            </li>
          <li>
            <a href="javascript:;" @click="goManage">
              <i class="yo-icon icon-computer"></i>
              <span>团队管理</span>
            </a>
          </li>
            <li></li>
        </ul>
      </div>
  </div>
</div>
</template>
<script>
import bindmethod from '@/base/utils/bindmethod'
import * as payment from '@/base/store/payment/type'
import * as statusCode from '@/base/utils/status_const'
import method from '@/base/utils/method'
import * as memberCenterType from '@/base/store/memberCenter/type'

export default {
  data () {
    return {
      nickName: this.$store.state.home.userInfo.nickName,
      weiXinNickName: this.$store.state.home.userInfo.weiXinNickName,
      tempWeiXin: this.$store.state.home.userInfo.tempWeiXin,
      account: this.$store.state.home.userInfo.account,
      promptMsg: '获取中...'
    }
  },
  computed: {
    /** 后端传入值为0 和 1 */
    type () {
      return this.$store.state.home.type
    },
    // 是否显示消息记录
    isShow () {
      return this.$store.state.memberCenter.isShow
    },
    accounts () {
      return this.$store.state.home.userInfo
    },
    msgNum () {
      return this.$store.state.memberCenter.msgNum
    },
    money () {
      return this.$store.state.memberCenter.totalMoney
    },
    commonImgUrl () {
      return this.$store.state.home.commonImgUrl
    }
  },
  methods: {
    GoOnlineDeposit () {
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
    GoOnlineDraw () {
      if (Number(this.type) === 1) {
        window.layer.msgWarn('对不起，取款功能不对试玩账号开放！')
        return false
      } else {
        this.$store.state.site.nowPosition = 0
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
    GoMoneyConversion () {
      if (Number(this.type) === 1) {
        window.layer.msgWarn('对不起，额度转换不对试玩账号开放！')
      } else if (Number(this.type) === 2) {
        window.layer.msgWarn('额度转换不对测试账号开放！')
        return false
      } else {
        this.$router.push('/wap/memberCenter/moneyConversion')
      }
    },
    GoPerfectAccount () {
      let HttpRequest = bindmethod.HttpRequest
      var $this = this
      // 判断用户是否绑定账户,0跳转用户信息页面 1 跳转完善资料页面
      HttpRequest({
        url: '/api/wap/wapWeiXinLogin/isWeiXinLogin',
        actions: {},
        success: function (_res) {
          if (_res.status === '0') {
            $this.$router.push('/wap/memberCenter/accountInfo')
          } else {
            $this.$router.push('/wap/memberCenter/completeAccount')
          }
        },
        error: function (_res) {
          console.log(_res.msg)
        }
      }, true)
    },
    GoModifyPassword () {
      if (Number(this.type) === 1) {
        window.layer.msgWarn('对不起，登入密码不对试玩账号提供修改！')
      } else {
        this.$router.push('/wap/memberCenter/modifyPassword')
      }
    },
    goTransactionRecord () {
      this.$router.push('/wap/transactionRecord')
    },
    GoPlatformMoney () {
      this.$router.push('/wap/memberCenter/platformMoney')
    },
    GoMessage () {
      this.$router.push('/wap/memberCenter/message')
    },
    goGameNotice () {
      this.$router.push('/wap/memberCenter/gameNotice')
    },
    goManage () {
      this.$router.push('/wap/teamManage/manageCenter')
    },
    goGameClient () {
      if (Number(this.type) === 1) {
        window.layer.msgWarn('该功能只对正式账号进行开放，请您注册正式账号！')
        return false
      } else {
        this.$router.push('/wap/memberCenter/gameClient')
      }
    },
    goback () {
      this.$router.push('/wap/index')
    },
    initBlance () {
      let param = {
        api: 1, // 初始化账户余额入参
        loading: 'pass'
      }
      let $this = this
      let {delay} = method
      delay(function () { // 初始化账户余额 异步请求
        $this.$store.dispatch(memberCenterType.BALANCEREFRESH_ACTION, param).then(res => {
          $this.promptMsg = res.data.money
        }).catch(res => {
          console.log('INITOTALMONEY store error')
        })
        // $this.promptMsg = ''
      }, 10)
    },
    // 未读消息条数
    initMsgCount () {
      // this.$store.dispatch(memberCenterType.MESSAGENUMREFRESH_ACTION, {}).then(res => {
      // }).catch(res => {
      //   console.log('INITOTALMONEY store error')
      // })
      let $this = this
      let timestamp = Date.parse(new Date())
      window.$.ajax({ // 异步加载
        'type': 'post',
        'url': '/api/wap/wapIndex/getMsgCount?t=' + timestamp,
        'dataType': 'json',
        'data': JSON.stringify({}),
        'contentType': 'application/json',
        'success': function (_res) {
          // 更新home中的余额
          if (_res.status === statusCode.statusConst.SUCCESS) { // 返回数据成功
            if (_res.data.msgNum && _res.data.msgNum > 0) {
              $this.$store.state.memberCenter.isShow = false
            } else {
              $this.$store.state.memberCenter.isShow = true
            }
            $this.$store.state.memberCenter.msgNum = _res.data.msgNum
          }
        }
      })
    }
  },
  mounted () {
    // 加载数据之前先清空之前请求的数据
    this.$store.state.memberCenter.msgNum = ''
    this.$store.state.memberCenter.isShow = true
    this.$store.state.memberCenter.totalMoney = ''

    this.initBlance()
    this.initMsgCount()
  }
}
</script>
