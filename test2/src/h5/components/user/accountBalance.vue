<template>
  <div class="common-main main-box">
    <!-- 余额-列表 -->
    <div class="accountSum-box">
      <div class="yo-form-item">
        <h5 class="title">总余额</h5>
        <p class="con-txt">
          <span class="weak-txt grey-txt">{{ totalDataform.totalMoney | moneyFilter }}</span>
        </p>
      </div>
      <div class="yo-form-item">
        <h5 class="title">现金余额</h5>
        <p class="con-txt">
          <span class="weak-txt grey-txt">{{ totalDataform.money | moneyFilter }}</span>
        </p>
      </div>
      <div class="yo-form-item" v-for="(item,key,index) in thirdPlatformList" :key="index">
        <h5 class="title title-img">
          <span class="platform-icon">
            <img :src="commonImgUrl + '/platformLogo/logo-'+key+'.png'">
          </span>
          {{key.toUpperCase()}}平台
        </h5>
        <p class="con-txt">
          <span class="weak-txt grey-txt">{{item |moneyFilter}}</span>
        </p>
      </div>

    </div>


    <!-- 内容页页脚 -->
    <div class="public-footer common-footer">
      <div class="but-footer yow-content">
        <a
          href="javascript:void(0);"
          class="btn btn-disabled btn-lg btn-block"
          v-if="timesStatus"
          @click="refresh"
        >
          <span class="dis-text">{{timeNumber}} S</span>
        </a>
        <a
          href="javascript:void(0);"
          class="btn btn-disabled btn-lg btn-block"
          v-if="refreshFlag && !timesStatus"
          @click="refresh"
        >
          <span class="btn-load">
            <img src="../../assets/img/loading/btn-load.svg" alt>
          </span>
        </a>
        <a
          href="javascript:void(0);"
          class="btn btn-primary btn-lg btn-block"
          v-if="!refreshFlag && !timesStatus"
          @click="refresh"
        >更新</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import * as types from '@m/store/bankTransaction/type'
import * as userTypes from '@s/store/user/type'

let dftMoneyParam = {
  // 默认传参
  api: '1'
}
export default {
  data () {
    return {
      pickTime: {},
      timeId: '', // 定时器
      refreshFlag: false, // 是否可以刷新
      refreshText: '刷新中', // 刷新文字
      isFirstTime: true // 第一次打开页面不刷新
    }
  },
  filters: {
    moneyFilter (money) { // 格式化金额格式
      if (money !== null && money !== undefined && !isNaN(money)) return Number(money).toFixed(2)
      else return money
    }
  },
  computed: {
    ...mapState({
      commonImgUrl: state => state.h5Home.h5img, // H5静态地址
      type: state => state.shareApi.type, // 登录类型
      totalDataform: state => state.user.totalDataform, // 获取现金余额，总余额
      timeNumber: state => state.user.timer // 刷新时间
    }),
    thirdPlatformList () {
      if (this.$store.state.user.thirdPlatformList === null) {
        // 初始页面数据为localStorage中的
        this.$store.state.user.thirdPlatformList = JSON.parse(
          localStorage.getItem('thirtyPlatformList')
        )
      }
      return this.$store.state.user.thirdPlatformList
    },
    timesStatus () {
      if (this.$store.state.user.timer < 30) {
        // 判断30秒倒计时是否开始
        this.$store.state.user.timesStatus = true
      }
      return this.$store.state.user.timesStatus
    }
  },
  methods: {
    ...mapActions({
      initDataAction: types.MONEYCONVERSION_ACTION, // 初始化额度转换数据
      conversionToThirdAction: types.CONVERSIONTOTHIRD, // 确认转换接口
      chgTranMoneyStatusAction: types.CHGTRANMONEYSTATUS, // 切换自动手动
      updataSessionMoneyAction: userTypes.UPDATESESSIONMONEY // 刷新余额
    }),
    // 点击刷新余额
    refresh () {
      if (!this.timesStatus) {
        this.isFirstTime = false
        this.refreshMoney()
      } else {
        this.refreshFlag = false
        window.layer.msgWarn('点击太快啦，请歇会吧')
      }
    },
    // 刷新余额
    refreshMoney (param) {
      let postData = param || dftMoneyParam
      this.refreshFlag = true // 刷新动画
      // 如果倒计时开始，那么清除
      if (this.timeId) {
        clearInterval(this.timeId)
      }
      for (let i in this.thirdPlatformList) {
        this.thirdPlatformList[i] = '加载中...'
      }
      this.totalDataform.totalMoney = '加载中...'
      this.totalDataform.money = '加载中...'
      this.updataSessionMoneyAction(postData)
        .then(res => {
          this.refreshFlag = false
          // this.thirdPlatformList = this.$store.state.user.thirdPlatformList
          if (!this.isFirstTime) {
            // 如果初始化第一次调用，那么不进入倒计时
            this.$store.state.user.timesStatus = true
            this.timeId = setInterval(() => {
              window.store.state.user.timer--
              if (window.store.state.user.timer <= 0) {
                clearInterval(this.timeId)
                this.$store.state.user.timesStatus = false
                window.store.state.user.timer = 30
                this.$store.state.user.refreshText = '刷新余额'
              }
            }, 1000)
          }
        })
        .catch(res => {
          this.refreshFlag = true
          window.layer.msgWarn('刷新失败')
        })
    }
  },
  mounted () {
    this.$store.state.h5Home.headerType = 3
    this.$store.state.h5Home.headTitle = '账户余额'
    this.$store.state.h5Home.headLeft = 'icon-back'
    this.$store.state.h5Home.headRight = ''
    this.$store.state.h5Home.showFoot = false
  }
}
</script>
