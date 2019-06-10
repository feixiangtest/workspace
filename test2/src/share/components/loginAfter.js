import { mapState, mapActions } from 'vuex'
import * as userTypes from '@s/store/user/type.js'
let loginAfter = {
  name: 'loginAfter',
  data () {
    return {
      showBalanceBox: false,
      lastLoginTime: 0,
      isOnloading: false
    }
  },
  computed: {
    ...mapState({
      isLogin: state => state.user.isLogin, // 登录状态
      userInfo: state => state.user.userInfo, // 用户信息
      totalDataform: state => state.user.totalDataform, // 获取现金余额，总余额
      msgCount: state => state.user.msgCount // 用户信息
    })
  },
  filters: {
    moneyFilter (money) {
      return isNaN(money) ? 0.00 : Number(money).toFixed(2) // 格式化金钱格式
    }
  },
  methods: {
    ...mapActions({
      loginOutAction: userTypes.LOGINOUT // 登出接口
      // updateMoneyAction: userTypes.UPDATESESSIONMONEY // 刷新余额接口
    }),
    loginOut () {
      if (confirm('确定要退出吗？') === true) {
        if (Date.now() - this.lastLoginTime <= 2000) return
        this.lastLoginTime = Date.now()
        this.loginOutAction()
      } else {
        return false
      }
    },
    toUrl (url, type, title) {
      // 试玩账号从首页链接进取款时也会弹框提示
      if (type === 1) {
        if (window.common.isFree()) {
          window.layer.msgWarn('对不起，' + title + '不对试玩账号开放！')
          return
        }
      }
      window.open(url, '_blank')
    },
    getShowBalanceBox (val) { // 获取子组件的值
      this.showBalanceBox = val
    },
    changeToOnLoading (e) {
      this.isOnloading = e
      console.log(e, 'eee')
    },
    showDownBalance () {
      this.showBalanceBox = !this.showBalanceBox // 切换余额弹框
      if (!this.$store.state.user.userInfo.apiMoneyMap || JSON.stringify(this.$store.state.user.userInfo.apiMoneyMap) === '{}') {
        this.$store.state.user.userInfo.apiMoneyMap = localStorage.thirtyPlatformList ? JSON.parse(localStorage.thirtyPlatformList) : {}
      }
    }
  }
}
export default loginAfter
