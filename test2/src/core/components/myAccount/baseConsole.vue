<template>
  <div class='contentBox'>
    <div class="memberInfo clearfix">
      <div class="memberPhoto floatLf">
        <img src="/resource/core/images/memberPhoto.jpg" alt="">
      </div>
      <div class="infoBox floatLf">
        <div>
          <h3 class="orange">{{ userInfo.account }}</h3><span>欢迎进入基本信息</span>
        </div>
        <p>账户：<span>{{ userInfo.account }}</span></p>
      </div>
    </div>
    <fieldset class="yoFieldset">
      <legend>即时账号资讯</legend>
      <div class="accountBox">
        <dl class="platform">
          <dd v-for='(item,key,index) in thirdPlatformList' :key='index'>
            <div class="platformIco">
              <img :src="'/resource/core/images/platformLogo/logo-'+key+'.png'" alt="">
            </div>
            <div class="platformAmount">
              <h4>{{key.toUpperCase()}}平台</h4>
              <span>{{item | moneyFilter}}</span>
            </div>
          </dd>
          <dd>
            <div class="platformIco">
              <img :src="'/resource/core/images/platformLogo/logo-yue.png'" alt="">
            </div>
            <div class="platformAmount">
              <h4>现金余额</h4>
              <span>{{totalDataform.money | moneyFilter}}</span>
            </div>
          </dd>
          <dd>
            <div class="platformIco">
              <img :src="'/resource/core/images/platformLogo/logo-zyue.png'" alt="">
            </div>
            <div class="platformAmount">
              <h4>总余额</h4>
              <span>{{totalDataform.totalMoney | moneyFilter}}</span>
            </div>
          </dd>
          <dd class="refreshBut">
            <el-button type="primary" @click="refreshMoney(1)">{{refreshText}}</el-button>
          </dd>
        </dl>
      </div>
    </fieldset>
    <fieldset class="yoFieldset">
      <legend>有效投注额</legend>
      <efficacbet-table></efficacbet-table>
    </fieldset>
  </div>

</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import headerNav from '@/components/layout/headerNav.vue'
  import efficacbetTable from '@/components/myAccount/efficacbetTable.vue'
  import * as memberTypes from '@m/store/member/type'
  import * as types from '@m/store/bankTransaction/type'
  import * as userTypes from '@s/store/user/type'
  export default {
    data () {
      return {
        userInfo: JSON.parse(window.localStorage.getItem('userInfo')),
        centerDialogVisible: false
      }
    },
    components: {
      headerNav,
      efficacbetTable
    },
    computed: {
      ...mapState({
        // efficacbetList: state => state.member.efficacbetList, // 获取有效投注额记录
        totalDataform: state => state.user.totalDataform, // 获取现金余额，总余额
        // refreshText: state => state.user.refreshText, // 刷新余额
        timer: state => state.user.timer // 刷新时间
      }),
      thirdPlatformList () {
        if (this.$store.state.user.thirdPlatformList === null) {
          // 初始页面数据为localStorage中的
          this.$store.state.user.thirdPlatformList = JSON.parse(localStorage.getItem('thirtyPlatformList'))
        }
        return this.$store.state.user.thirdPlatformList
      },
      refreshText () {
        if (this.$store.state.user.timer < 30) {
          // 判断30秒倒计时是否开始
          this.$store.state.user.refreshText = this.$store.state.user.timer
          // this.opencCountDown()
        }
        return this.$store.state.user.refreshText
      }
    },
    created () {
      // 初始数据
      // this.initData({ api: 0 })
      // 刚进入页面时查询有效投注额数据
      this.getEfficacBettingAction(this.params)
    },
    methods: {
      ...mapActions({
        initDataAction: types.MONEYCONVERSION_ACTION, // 初始化额度转换数据
        getEfficacBettingAction: memberTypes.GETEFFICACBETTING_ACTION, // 获取有效投注额记录
        // getThirdMoneyAction: types.GETTHIRDMONEY, // 初始化第三方平台金钱数据
        updataSessionMoneyAction: userTypes.UPDATESESSIONMONEY // 刷新余额
      }),
      // 初始化数据
      initData (param) {
        let dftMoneyParam = { // 默认传参
          api: '1'
        }
        let postData = param || dftMoneyParam
        this.initDataAction(postData).then(res => {
          this.handleResData(res) // 赋值处理返回平台数据
        }).catch(res => {})
      },
      // 开启倒计时
      opencCountDown () {
        if (this.$store.state.user.timeId) {
          clearInterval(this.$store.state.user.timeId)
        }
        this.$store.state.user.timeId = setInterval(() => {
          this.$store.state.user.refreshText = this.$store.state.user.timer // 30内不能刷新，30秒之后恢复原状
          this.$store.state.user.timer--
          if (this.$store.state.user.refreshText <= 0) {
            clearInterval(this.$store.state.user.timeId)
            this.$store.state.user.timer = 30
            this.$store.state.user.refreshText = '刷新余额'
            this.$store.state.user.timesStatus = false
          }
        }, 1000)
      },
      // 刷新余额
      refreshMoney (api) {
        // 判断按钮是否是数字类型
        if (!isNaN(this.refreshText) && Number(this.refreshText) > 0) {
          window.layer.msgWarn('点击太快啦，请歇会吧')
          return
        }
        // 不是数字类型，将文字改成加载中
        for (let i in this.thirdPlatformList) {
          this.thirdPlatformList[i] = '加载中...'
        }
        this.totalDataform.money = '加载中...'
        this.totalDataform.totalMoney = '加载中...'
        // 只有查询第三方时才需要倒计时
        if (api === 1) {
          this.opencCountDown()
        }
        this.updataSessionMoneyAction({ api: api })
      }
    },
    filters: {
      moneyFilter (money) { // 格式化金额格式
        if (money !== null && money !== undefined && !isNaN(money)) return Number(money).toFixed(2)
        else return money
      }
    }
  }
</script>
