<template>
  <div class="user" id="yo-rightside">
    <div class="yo-is-login" v-if="isLogin">
      <div class="tx1">
        <img :src="'//sytl3.com'+imgUrl+'/common/tx.png'">
      </div>
      <div class="info">
        <div class="info-t" style="color: white;">
          {{account === '' || account === null ? '游客' :account}}
        </div>
        <div class="info-l ng-binding" style="color: white;">
          <span><i class="yo-ico-qd"></i>{{parseFloat(balance).toFixed(2)}}&nbsp;</span>
          <i class="ico yo-ico-sx" :class="refresh ? 'lodingpic' : ''" @click="getBalance(true)"></i>
        </div>
      </div>
    </div>
    <div class="bt" id="rightout" v-if="isLogin">
      <a class="button-assertive" @click="goback()" menu-close="">退出</a>
    </div>
    <div v-if="!isLogin" class="yo-is-no-login">
      <div class="tx2">
        <img :src="'//sytl3.com'+imgUrl+'/common/tx.png'" width="80px" height="80px;">
      </div>
      <div class="info">

      </div>
    </div>
  </div>
</template>
<script>
import * as type from '../../../store/home/type'
import * as statusCode from '../../../utils/status_const'
import * as sideType from 'store/site/type'
export default {
  data () {
    return {
      isOpen: true,
      refresh: false
    }
  },
  methods: {
    goback () {
      if (!navigator.onLine) { // 离线状态
        window.layer.alert('目前处于离线状态')
        return false
      }
      try {
        // 获取设备类型
        var type = window.AppInvokeModel.getDeviceType()
        console.info('设备类型：', type)
        if (type === 'ios' || type === 'android') {
          window.AppInvokeModel.popToUp()
          return
        }
      } catch (e) {
        console.info(e)
      }
      this.$store.dispatch(sideType.LOGOUT_ACTION, {}).then(res => { // 请求后端，退出游戏
        if (res.status === statusCode.statusConst.FAILURE) { // 失败了提示错误
          window.layer.msgWarn('退出失败')
        } else if (res.status === statusCode.statusConst.SUCCESS) { // 退出成功
          window.lotteryMain.closeLtWindow() // 关闭当前彩票窗口
          setTimeout(() => { // 如果关闭当前彩票窗口失败，则延时跳转到主系统会员端
            if (window.store.state.home.memberUrl.indexOf('http') >= 0) {
              window.location.href = window.store.state.home.memberUrl
            } else {
              window.location.href = 'http://' + window.store.state.home.memberUrl
            }
          }, 200)
        }
      })
    },
    /**
     * 刷新余额
     * @param {Boolean} isGetGpo 是否去拉主系统余额过来（非常慢），true=是，默认false
     */
    getBalance (isGetGpo) {
      if (!navigator.onLine) { // 离线状态
        window.layer.alert('目前处于离线状态')
        return false
      }
      if (!this.isLogin) { // 未登录
        return false
      }
      if (this.isOpen) {
        this.isOpen = false
        this.refresh = true
        let url = (isGetGpo === true) ? type.GET_GPO_CP_BALANCE_ACTION : type.GET_BALANCE_ACTION
        this.$store.dispatch(url)
        // 做2s钟时长再改变变量，主要用于刷新图标能够有旋转动画
        setTimeout(() => { // 另外this.isOpen也是控制2s，不与PC端10s保持一致，是因为手机端是旋转的图片，如果控制10s会给用户认为点击无效果的bug
          this.refresh = false
          this.isOpen = true
        }, 2000)
      }
    }
  },
  watch: {
    // 监听右侧导航栏显示/隐藏
    openR (val) {
      // 显示 并且是第一次显示右侧导航 以及登录状态
      if (val && this.$store.state.home.MuseUI.openRightCount <= 1 && this.isLogin) {
        // 说明还从来没有查询过今日彩票输赢
        if (!this.balance && this.balance + '' !== '0') {
          this.getBalance()
        }
      }
    }
  },
  computed: {
    // 修改了 init 调整 判断
    account () {
      if (this.$store.state.home.userInfo.account === '' || this.$store.state.home.userInfo.account === undefined) {
        this.$store.state.home.userInfo = JSON.parse(localStorage.getItem('userInfo'))
      }
      if (this.$store.state.home.userInfo && this.$store.state.home.userInfo.account) {
        return this.$store.state.home.userInfo.account
      } else {
        return ''
      }
    },
    // 获取余额（由于用户名是不经常改变的，所以存在localstorage里面，而余额经常变动，所以不存localstorage里面，则另写获取方法）
    balance () {
      return this.$store.state.home.balance
    },
    isLogin () {
      return this.$store.state.home.isLogin
    },
    imgUrl () {
      return this.$store.state.home.commonImgUrl
    },
    // 是否打开右侧导航栏
    openR () {
      return this.$store.state.home.MuseUI.openR
    }
  }
}
</script>

