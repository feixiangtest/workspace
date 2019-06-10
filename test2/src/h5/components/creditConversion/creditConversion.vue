<template>
  <div class="common-main main-box" id='creditBox'>
    <!-- 总余额 -->
    <div class="conversion-head" :class="{autoHeight:isAuto}">
      <p class="tiptxt">总余额 ( ¥ )</p>
      <p>{{ totalDataform.totalMoney | moneyFilter }}</p>
    </div>
    <div class="yow-content">
      <!--手动额度转换-->
      <div v-if="!isAuto">
        <div class="conversion-platform yow">
          <!-- 转换平台 -->
          <div class="con-platform-box">
            <div class="amount-text">
              <h6>{{fromAccount[selectedFrom]}}</h6>
              <p class="tips-txt">¥{{selectedFrom ==='luoma'?totalDataform.money:thirdPlatformList[selectedFrom] | moneyFilter}}</p>
            </div>
            <div class="unfold">
              <i class="yo-icon icon-fold any-anime" v-if="showPlatFrom==='selectedFrom'" @click="closePlatForm()"></i>
              <i class="yo-icon icon-fold any-anime" style='transform:rotate(180deg);' v-else @click="showPlatFrom='selectedFrom'"></i>
            </div>
          </div>
          <!-- 转换图标 -->
          <i class="yo-icon icon-transition" :class="{'overturn':isOverturn}" @click="transPlatFormPos()"></i>
          <!-- 转换平台 -->
          <div class="con-platform-box">
            <div class="amount-text">
              <h6>{{toAccount[selectedTo]}}</h6>
              <p class="tips-txt">¥{{selectedTo ==='luoma'?totalDataform.money:thirdPlatformList[selectedTo] | moneyFilter}}</p>
            </div>
            <div class="unfold">
              <i class="yo-icon icon-fold any-anime" v-if="showPlatFrom==='selectedTo'" @click="closePlatForm()"></i>
              <i class="yo-icon icon-fold any-anime" style='transform:rotate(180deg);' v-else @click="showPlatFrom='selectedTo'"></i>
            </div>
          </div>
        </div>
        <!-- 切换平台选择 -->
        <div class="" v-if='showPlatFrom'>
          <div class="yo-form-item" @click="choosePlatForm('luoma')">
            <h5 class="title title-img">现金余额</h5>
            <p class="con-txt plat-ref">
              <span class=" tips-txt">{{ totalDataform.money | moneyFilter }}</span>
              <i class="yo-icon icon-refresh " :class="{'icon-run':(totalDataform.money === '加载中...')}" @click.stop='getPlatFormMoney("luoma")'></i>
            </p>
          </div>
          <div class="yo-form-item" v-for='(item,key,index) in thirdPlatformList' :key='index' @click='choosePlatForm(key)'>
            <h5 class="title title-img">
              <!-- <span class="platform-icon"><img :src="'../../assets/img/conversion/icon-'+key+'.png'"></span> {{key.toUpperCase()}}平台 -->
              <span class="platform-icon"><img :src="commonImgUrl + '/platformLogo/logo-'+key+'.png'"></span> {{key.toUpperCase()}}平台
            </h5>
            <p class="con-txt plat-ref">
              <span class="tips-txt">{{item |moneyFilter}}</span>
              <i class="yo-icon icon-refresh" :class="{'icon-run':(totalDataform.money === '加载中...' && freshKey===key)}" @click.stop='getPlatFormMoney(key)'></i>
            </p>
          </div>
          
        </div>
        <!-- 金额输入 -->
        <div class="yo-form-content magt10">
          <h6 class="form-title grey-txt">转换金额</h6>
          <div class="feed-in-sum">
            <i class="yo-icon icon-mony"></i>
            <input type="tel" v-model="changeMoney" placeholder="请输入金额" @input='toNumber("changeMoney")' size="small" maxlength="14">
          </div>
        </div>
      </div>
      <!--手动额度转换-end-->
      <!-- 切换自动、手动额度转换 -->
      <div class="yo-form-item  radiusinbox ">
        <h5 class="title">切换为{{ isAuto ? '手动':'自动' }}额度转换</h5>
        <div class="con-txt">
          <label class="mint-switch">
                <input type="checkbox" class="mint-switch-input" :checked='isAuto' @change="toggleIsAuto" @click='stopChange'>
                <span class="mint-switch-core" ></span>
                <div class="mint-switch-label"></div>
          </label>
        </div>
      </div>
      <p class="weak-txt grey-txt" v-if="!isAuto">温馨提示：切换到自动额度转换前，请先通过手动转换把额度转移到现金余额。</p>
      <!-- 自动额度转换 -->
      <div v-if="isAuto">
        <div class="yo-form-item">
          <h5 class="title">现金余额</h5>
          <p class="con-txt tips-txt">{{ totalDataform.money | moneyFilter }}</p>
        </div>
        <div class="yo-form-item">
          <h5 class="title">其他平台余额</h5>
          <p class="con-txt">
            <i class="yo-icon icon-next any-anime" style='transform:rotate(90deg);' v-show='!showAutoPlatForm' @click='showAutoPlatForm = !showAutoPlatForm'></i>
            <i class="yo-icon icon-next any-anime" style='transform:rotate(-90deg);' v-show='showAutoPlatForm' @click='showAutoPlatForm = !showAutoPlatForm'></i>
          </p>
        </div>
        <div class="yo-form-item" v-for='(item,key,index) in thirdPlatformList' :key='index' v-show='showAutoPlatForm'>
          <h5 class="title title-img">
            <span class="platform-icon"><img :src="commonImgUrl + '/platformLogo/logo-'+key+'.png'"></span>
            {{key.toUpperCase()}}平台
          </h5>
          <p class="con-txt plat-ref">
            <span class="tips-txt">{{item |moneyFilter}}</span>
            <i class="yo-icon icon-refresh" :class="{'icon-run':totalDataform.money === '加载中...' && freshKey===key}" @click.stop='getPlatFormMoney(key)'></i>
          </p>
        </div>
        <p class="weak-txt grey-txt magt10">温馨提示：您目前处于自动额度转换状态，无需转换额度，可以直接进入游戏哦～</p>
      </div>
      <!--自动额度转换-end-->
    </div>
    <!-- 内容页页脚 -->
    <div class="public-footer common-footer" v-show="!isAuto">
      <div class="but-footer yow-content">
        <a class="btn btn-primary btn-lg btn-block" @click="conversionToThird" :disabled="commitStatus">{{commitWord}}</a>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'
  import * as types from '@m/store/bankTransaction/type'
  import * as userTypes from '@s/store/user/type'
  let dftMoneyParam = { // 默认传参
    api: '1'
  }
  export default {
    data () {
      return {
        showAutoPlatForm: true, // 自动额度转换平台显示
        selectedFrom: 'luoma', // 选中的转出平台,默认为现金余额
        selectedTo: '', // 选中的转入平台
        fromAccount: {}, // 转出账户
        toAccount: {}, // 转入账户
        changeMoney: '', // 转出金额
        refreshText: '刷新中', // 刷新文字
        // thirdPlatformList: {}, // 第三方平台列表
        isAuto: true, // 切换自动额度转换
        commitStatus: true, // 是否禁用确认转账按钮
        commitWord: '确认转账', // 提交按钮文字
        disableToggleBtn: true, // 是否禁用切换额度按钮
        timeId: '', // 定时器
        isFirstTime: true, // 第一次打开页面不刷新
        toLoad: true, // 进页面只刷一次
        moneyData: {}, // 金额数据
        showPlatFrom: '', // 展示第三方平台
        isOverturn: false, // 转换图标动画
        freshKey: '' // 要更新的平台
      }
    },
    watch: {
      // 监控输入的金额，如果无效就置灰按钮
      changeMoney (v) {
        let firstInput = String(v).slice(0, 1)
        if (firstInput === '0') {
          this.changeMoney = ''
        }
        // 判断输入框是否为空，如为空则确认按钮置灰
        this.commitStatus = (v.length === 0)
      }
    },
    computed: {
      ...mapState({
        commonImgUrl: state => state.h5Home.h5img, // H5静态地址
        type: state => state.h5Home.type, // 登录类型
        totalDataform: state => state.user.totalDataform // 获取现金余额，总余额
      }),
      thirdPlatformList () {
        if (this.$store.state.user.thirdPlatformList === null) {
          // 初始页面数据为localStorage中的
          this.$store.state.user.thirdPlatformList = JSON.parse(localStorage.getItem('thirtyPlatformList'))
        }
        return this.$store.state.user.thirdPlatformList
      }
    },
    filters: {
      moneyFilter (money) { // 格式化金额格式
        if (money !== null && money !== undefined && !isNaN(money)) return Number(money).toFixed(2)
        else return money
      }
    },
    components: {},
    mounted () {
      this.$store.state.h5Home.headerType = 3
      this.$store.state.h5Home.headTitle = '额度转换'
      this.$store.state.h5Home.headLeft = 'icon-back'
      this.$store.state.h5Home.headRight = 'icon-online'
      this.$store.state.h5Home.showFoot = false
      try {
        this.fromAccount = this.toAccount = JSON.parse(localStorage.getItem('thirtyPlatformList'))
        this.toAccount.luoma = this.fromAccount.luoma = '现金余额' // 将OT平台的显示文字改为现金余额
        this.isAuto = Number(localStorage.getItem('TRANSFER_STATUS')) !== 1
      } catch (err) {}
      this.initData({
        api: 0
      })
    },
    methods: {
      ...mapActions({
        conversionToThirdAction: types.CONVERSIONTOTHIRD, // 确认转换接口
        chgTranMoneyStatusAction: types.CHGTRANMONEYSTATUS, // 切换自动手动
        updataSessionMoneyAction: userTypes.UPDATESESSIONMONEY // 刷新余额
      }),
      stopChange () {
        document.getElementById('creditBox').focus()
        return false
      },
      // 选择平台
      choosePlatForm (key) {
        this[this.showPlatFrom] = key
        if (this.showPlatFrom === 'selectedTo') {
          this.selectedFrom = this.selectedTo === 'luoma' ? Object.keys(this.fromAccount)[0] : 'luoma'
        } else {
          this.selectedTo = this.selectedFrom === 'luoma' ? Object.keys(this.toAccount)[0] : 'luoma'
        }
        this.showPlatFrom = ''
      },
      closePlatForm () {
        this.showPlatFrom = ''
      },
      getPlatFormMoney (key) {
        this.freshKey = key
        let param = {
          'api': '1',
          'key': key
        }
        this.refreshMoney(param)
      },
      // 平台上下互换选项按钮
      transPlatFormPos () {
        [this.selectedFrom, this.selectedTo] = [this.selectedTo, this.selectedFrom]
        this.isOverturn = !this.isOverturn
      },
      // 格式化数字
      toNumber (v) {
        this[v] = this[v].toString().replace(/[^\d]+/g, '').slice(0, 9)
      },
      // 赋值初始化数据
      handleResData (res) {
        this.fromAccount = res.data.API_FROM // 转出平台数据
        this.toAccount = res.data.API_TO // 转入平台数据
        this.toAccount.luoma = this.fromAccount.luoma = '现金余额' // 将OT平台的显示文字改为现金余额
        this.selectedFrom = 'luoma' // 设置默认的转出平台
        this.selectedTo = Object.keys(this.toAccount)[0] // 设置默认的转入平台
        this.isAuto = Number(res.data.TRANSFER_STATUS) !== 1 // 转换状态为1是手动转换，否则为自动额度转换
        localStorage.setItem('TRANSFER_STATUS', res.data.TRANSFER_STATUS) // 保存当前状态
      },
      // 刷新余额
      refreshMoney (param) {
        let postData = param || dftMoneyParam
        if (this.freshKey !== 'luoma') {
          this.thirdPlatformList[this.freshKey] = '加载中...'
        }
        this.totalDataform.totalMoney = '加载中...'
        this.totalDataform.money = '加载中...'
        this.updataSessionMoneyAction(postData).then(res => {}).catch(res => {
          window.layer.msgWarn('刷新失败')
        })
      },
      // 切换手动自动
      toggleIsAuto () {
        if (!this.isAuto) {
          window.layer.msgWarn('温馨提示：切换到自动额度转换前，请先通过手动转换把额度转移到现金余额。', () => {
            this.changeAuto()
          })
        } else {
          this.changeAuto()
        }
      },
      // 调用手动自动的接口
      changeAuto () {
        this.disableToggleBtn = true // 设置按钮不可点击
        this.chgTranMoneyStatusAction({
          'transferMoneyStatus': this.isAuto ? 1 : 0 // 如果当前是自动，就传1切换到手动，反之传0切换到自动
        }).then(res => {
          this.handleResData(res)
          this.disableToggleBtn = false
        }).catch(res => {
          this.disableToggleBtn = false
        })
      },
      // 初始化数据
      initData (param) {
        // let postData = param || dftMoneyParam
        // 调用刷新余额接口
        window.store.dispatch('user.moneyConversion', {
          api: 0
        }).then(res => {
          this.handleResData(res) // 赋值处理返回平台数据
          this.disableToggleBtn = false
        })
      },
      // 确认转账
      conversionToThird () {
        if (!this.checkConversionData()) return // 如果校验不通过，返回
        let postData = {
          amount: this.changeMoney,
          from: this.selectedFrom,
          to: this.selectedTo
        }
        this.commitWord = '转点中...'
        this.commitStatus = true
        this.conversionToThirdAction(postData).then(res => {
          this.commitWord = '确认转账'
          this.moneyData = res.data
          window.layer.msgWarn(res.msg, () => { // 转点成功重新加载转点后的数据
            this.changeMoney = ''
            let key = this.selectedFrom !== 'luoma' ? this.selectedFrom : this.selectedTo
            // let param = {
            //   'api': '1',
            //   'key': key
            // }
            // this.refreshMoney(param)
            this.getPlatFormMoney(key)
          })
        }).catch(res => {
          this.commitWord = '确认转账'
          this.commitStatus = false
        })
      },
      // 校验转换的平台信息输入是否正确
      checkConversionData () {
        if (window.store.state.shareApi.type === '1') {
          window.layer.msgWarn('对不起，额度转换不对试玩账号开放！')
          return
        }
        if (this.selectedFrom === this.selectedTo) {
          window.layer.msgWarn('转入转出账户不能是同一账户')
          return
        }
        if (!/^\d+$/.test(this.changeMoney)) {
          window.layer.msgWarn('请输入金额')
          return
        }
        if (!parseFloat(this.changeMoney) || isNaN(parseFloat(this.changeMoney)) || parseFloat(this.changeMoney) <= 0) {
          window.layer.msgWarn('无效金额')
          return
        }
        if (this.moneyData.result !== undefined) {
          if (this.selectedFrom !== 'luoma' && parseFloat(this.changeMoney) > parseFloat(this.moneyData.result[this.selectedFrom + 'Money'])) { // 非现金平台转出
            window.layer.msgWarn(this.fromAccount[this.selectedFrom] + '余额不足!')
            return
          }
        }
        if (this.selectedFrom === 'luoma' && parseFloat(this.changeMoney) > parseFloat(this.moneyData.money)) { // 现金平台转出
          window.layer.msgWarn('转点失败，OT平台余额不足!')
          // window.layer.msgWarn(this.fromAccount[this.selectedFrom] + '余额不足!')
          return
        }
        return true
      }
    }
  }
</script>
