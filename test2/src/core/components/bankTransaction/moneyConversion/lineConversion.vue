<template>
  <div class='contentBox lineConversion'>
    <div class="memberInfo clearfix">
      <!-- 总余额- -->
      <div class="dark overall">
        <span>总余额</span> <span class="allGold">{{ totalDataform.totalMoney | moneyFilter }}</span>
        <span class="refreshBut" v-if='!refreshFlag' @click='refresh'><i class="el-icon-refreshs"></i></span>
        <span class="refreshBut" v-if='refreshFlag'><i class="el-icon-refreshs el-icon-rotation"></i></span>
        <span class="refTime" v-if='timesStatus'>{{timeNumber}}</span>
      </div>

      <!-- 中间内容 -->
      <el-container>
        <!-- 左边 -->
        <el-aside width="400px" class="ConverSide" >
          <!-- 切换手动自动 -->
          <div class="c1">
              <p>现金余额</p>
              <h4>{{ totalDataform.money | moneyFilter }}</h4>
              <el-button @click="toggleIsAuto " plain :disabled="disableToggleBtn">
                切换到{{ isAuto ? '手动' : '自动' }}额度转换
              </el-button>
          </div>

          <div v-if="!isAuto" class="transformBox" @keyup.enter='transform'>
            <el-form ref="form" label-width="80px">
              <!-- 转出 -->
              <el-form-item label="转出：">
                <el-select v-model="selectedFrom" placeholder="请选择" size="small" @change="selectedTo = selectedFrom === 'luoma' ? toAccount[Object.keys(toAccount)[0]] : 'luoma'">
                  <el-option v-for="(item,key) in fromAccount" :key="key" :label="item" :value="key">
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- 转入 -->
              <el-form-item label="转入：">
                <el-select v-model="selectedTo" placeholder="请选择" size="small" @change="selectedFrom = selectedTo === 'luoma' ? fromAccount[Object.keys(fromAccount)[0]] : 'luoma'">
                  <el-option v-for="(item,key) in toAccount" :key="key" :label="item" :value="key">
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- 金额 -->
              <el-form-item label="金额：">
                <el-input type='text' v-model="changeMoney" placeholder="请输入不为0的整数金额"
                @keyup.native='toNumber("changeMoney")' size="small" maxlength="14"></el-input>
              </el-form-item>
              <!-- 按钮 -->
              <el-form-item>
                <el-button type="primary" @click="conversionToThird" :disabled="commitStatus">{{commitWord}}</el-button>
              </el-form-item>
            </el-form>
            <!-- 转出转入-转换按钮 -->
            <div class="transformBut">
              <span class="line lineUp"></span><span class="yoIcon" @click="transPlatFormPos"><i class="el-icon-convert"></i></span><span class="line lineDown"></span>
            </div>

          </div>
          <!-- 自动额度转换-温馨提示 -->
          <div class="subclick" v-if="isAuto">
            <p class="warmPrompt"><span>温馨提示：您目前处于自动额度转换状态，无需转换额度，可以直接进入游戏哦~</span></p>
          </div>
          <!-- 手动额度转换-温馨提示 -->
          <div class="subclick" v-if="!isAuto">
            <p class="warmPrompt"><span>温馨提示：切换到自动额度转换前，请先通过手动转换把额度转移到现金余额。</span></p>
          </div>

        </el-aside>
        <!-- 右边-平台 -->
        <div class="ConverMain" style='user-select:none'>
          <dl class="transformPlatform">
            <!-- 平台列表循环体 -->
            <dd v-for='(item,key,index) in thirdPlatformList' :key='index'>
              <div class="platformIco">
                <img :src="'/resource/core/images/platformLogo/logo-'+key+'.png'" alt="">
              </div>
              <div class="platformAmount">
                <h4>{{key.toUpperCase()}}平台</h4>
                <span>{{item |moneyFilter}}</span>
              </div>
              <div class="platHover" @click="$jumpLive(key)">
                <a href="javascript:;" >进入游戏</a>
              </div>
            </dd>

          </dl>
        </div>

      </el-container>
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
        selectedFrom: 'luoma', // 选中的转出平台,默认为现金余额
        selectedTo: '', // 选中的转入平台
        fromAccount: {}, // 转出账户
        toAccount: {}, // 转入账户
        changeMoney: '', // 转出金额
        refreshFlag: false, // 是否可以刷新
        refreshText: '刷新中', // 刷新文字
        // thirdPlatformList: {}, // 第三方平台列表
        isAuto: true, // 切换自动额度转换
        commitStatus: true, // 是否禁用确认转账按钮
        commitWord: '确认转账', // 提交按钮文字
        disableToggleBtn: true, // 是否禁用切换额度按钮
        timeId: '', // 定时器
        isFirstTime: true, // 第一次打开页面不刷新
        toLoad: true, // 进页面只刷一次
        moneyData: {}
      }
    },
    watch: {
      changeMoney (v) {
        // 判断输入框是否为空，如为空则确认按钮置灰
        if (v.length !== 0) {
          this.commitStatus = false
        } else {
          this.commitStatus = true
        }
      }
    },
    computed: {
      ...mapState({
        type: state => state.shareApi.type, // 登录类型
        totalDataform: state => state.user.totalDataform, // 获取现金余额，总余额
        timeNumber: state => state.user.timer // 刷新时间
      }),
      thirdPlatformList () {
        if (this.$store.state.user.thirdPlatformList === null) {
          // 初始页面数据为localStorage中的
          this.$store.state.user.thirdPlatformList = JSON.parse(localStorage.getItem('thirtyPlatformList'))
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
    filters: {
      moneyFilter (money) { // 格式化金额格式
        if (money !== null && money !== undefined && !isNaN(money)) return Number(money).toFixed(2)
        else return money
      }
    },
    components: {},
    created () {
      try {
        this.fromAccount = this.toAccount = JSON.parse(localStorage.getItem('thirtyPlatformList'))
        this.toAccount.luoma = this.fromAccount.luoma = '现金余额' // 将OT平台的显示文字改为现金余额
        // this.selectedTo = Object.keys(this.toAccount)[0].toUpperCase() + '平台' // 设置默认的转入平台
        this.isAuto = Number(localStorage.getItem('TRANSFER_STATUS')) !== 1
      } catch (err) {
        // this.thirdPlatformList = {}
      }
      if (this.toLoad) {
        // 初始化数据
        this.initData({ api: 0 })
      }
    },
    methods: {
      ...mapActions({
        initDataAction: types.MONEYCONVERSION_ACTION, // 初始化额度转换数据
        // getThirdMoneyAction: types.GETTHIRDMONEY, // 初始化第三方平台金钱数据
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
      // 平台上下互换选项按钮
      transPlatFormPos () {
        [this.selectedFrom, this.selectedTo] = [this.selectedTo, this.selectedFrom]
      },
      toNumber (v) {
        this[v] = this[v].toString().replace(/[^\d]+/g, '').slice(0, 14)
      },
      // 赋值初始化数据
      handleResData (res) {
        // this.moneyData = res.data // 初始化数据
        this.fromAccount = res.data.API_FROM // 转出平台数据
        this.toAccount = res.data.API_TO // 转入平台数据
        this.toAccount.luoma = this.fromAccount.luoma = '现金余额' // 将OT平台的显示文字改为现金余额
        this.selectedFrom = 'luoma' // 设置默认的转出平台
        this.selectedTo = Object.keys(this.toAccount)[0] // 设置默认的转入平台
        this.isAuto = Number(res.data.TRANSFER_STATUS) !== 1 // 转换状态为1是手动转换，否则为自动额度转换
        localStorage.setItem('TRANSFER_STATUS', res.data.TRANSFER_STATUS)// 保存当前状态
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
        this.updataSessionMoneyAction(postData).then(res => {
          this.refreshFlag = false
          // this.thirdPlatformList = this.$store.state.user.thirdPlatformList
          if (!this.isFirstTime) { // 如果初始化第一次调用，那么不进入倒计时
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
        }).catch(res => {
          this.refreshFlag = true
          window.layer.msgWarn('刷新失败')
        })
      },
      // 切换手动自动
      toggleIsAuto () {
        if (!this.isAuto) window.layer.msgWarn('温馨提示：切换到自动额度转换前，请先通过手动转换把额度转移到现金余额。')
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
        let postData = param || dftMoneyParam
        this.initDataAction(postData).then(res => {
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
            let param = {
              'api': '1',
              'key': key
            }
            this.refreshMoney(param)
          })
        }).catch(res => {
          this.commitWord = '确认转账'
          this.commitStatus = false
        })
      },
      // 校验转换的平台信息输入是否正确
      checkConversionData () {
        if (window.common.isFree()) {
          window.layer.msgWarn('对不起，额度转换不对试玩账号开放！')
          return
        }
        if (this.selectedFrom === this.selectedTo) {
          window.layer.msgWarn('转入转出账户不能是同一账户')
          return
        }
        if (!/^\d+$/.test(this.changeMoney)) {
          window.layer.msgWarn('无效金额')
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
