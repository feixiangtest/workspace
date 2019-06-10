<template>
<div>
    <div class="header yo-home-nav">
        <div class="center">
            <div class="hea-menu hea-left">
                <a href="javascript:;" @click="goback()"><i class="yo-icon icon-arrows-left"></i></a>
            </div>
            <div class="header-text titile">
                <h1>账户余额</h1>
            </div>
            <div class="hea-user hea-right">
                <a href="javascript:;" @click="GoHome()"><i class="yo-icon icon-home"></i></a>
            </div>
        </div>
    </div>
    <div class="centerBox mainCenter">
        <div class="platformList">
            <dl class="secondForm">
                <dd>
                    <div class="formIput"><span class="itemTxt">总余额</span> <span class="itemNeir">{{totalMoney}}</span></div>
                </dd>
                <dd>
                    <div class="formIput"><span class="itemTxt">现金余额</span> <span class="itemNeir">{{money}}</span></div>
                </dd>
                <dd v-for="(item,key,index) in apiFrom" :key="item+''+index">
                    <div class="formIput" >
                        <span class="itemTxt">{{key}}</span>
                        <span class="itemNeir">{{item}}</span>
                    </div>
                </dd>

            </dl>
        </div>
        <div class="yo-pad10 yo-pad-bot20"><button type="button" class="yo-anOne button" id="refeshImgsBtn"  @click="refeshImgs()" :disabled="disabledFun">{{this.buttonMsg}}</button></div>
    </div>
</div>
</template>

<script>
import * as memberCenterType from '@/base/store/memberCenter/type'
import * as cookieUtil from '@/base/utils/cookieUtil'

export default {
  data () {
    return {
      times: {},
      timeNum: 30,
      buttonMsg: '更新',
      isLoaded: false
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    GoHome () {
      this.$router.push('/wap/index')
    },
    // 更新按钮
    refeshImgs () {
      if (this.isLoaded) {

      } else {
        this.showTime()
      // 更新session money
        let param = {
          api: 1 // 是否选择优惠
        }
      // 初始化账户余额
        this.$store.dispatch(memberCenterType.BALANCEREFRESH_ACTION, param).then(res => {

        }).catch(res => {
          console.log('INITOTALMONEY store error')
        })
      // 放到cookie
      }
    },
    // 初始化更新
    initRefresh () {
      if (cookieUtil.getCookie('refesh') !== 'undefined' && cookieUtil.getCookie('refesh')) {
        this.timeNum = cookieUtil.getCookie('refesh')
        console.log(cookieUtil.getCookie('refesh'))
        this.refeshImgs()
      }
    },
    // 时间处理
    showTime () {
      if (this.timeNum === 30) {
        this.buttonMsg = '刷新中'
      } else {
        this.buttonMsg = this.timeNum
      }
      this.times = window.setInterval(() => {
        // 从30秒开始计时，到0时关闭倒计时
        if (this.timeNum >= 0) {
          this.buttonMsg = this.timeNum
          this.timeNum = this.timeNum - 1
          cookieUtil.setCookie('refesh', this.timeNum, '60')
        } else {
          this.isLoaded = false
          this.buttonMsg = '更新'
          this.timeNum = 30
          cookieUtil.delCookie('refesh')
          window.clearInterval(this.times)
        }
      }, 1000)
    },
    initPlatform () {
        // 获取平台金额信息
      this.$store.dispatch(memberCenterType.PLATFORM_ATION, {}).then(res => {

      }).catch(res => {
        console.log('INITOTALMONEY store error')
      })
    }
  },
  computed: {
    apiFrom () {
      return this.$store.state.memberCenter.apiFrom
    },
    accountMoney () {
      return this.$store.state.memberCenter.accountMoney
    },
    totalMoney () {
      return this.$store.state.memberCenter.totalMoney
    },
    money () {
      return this.$store.state.memberCenter.money
    },
    disabledFun () {
      if ((this.timeNum < 30 && this.timeNum !== 0) || this.buttonMsg === '刷新中') {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    this.initPlatform()
    this.initRefresh()
  }
}
</script>
