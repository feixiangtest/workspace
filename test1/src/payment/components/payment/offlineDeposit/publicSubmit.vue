<template>
  <div>
    <div class="depositMain pay-ali">
      <div class="companyDep" style="margin-top:10px">
        <div class="bankDepOthey">
          <dl class="rechargebox">
            <inputMoney v-on:toAmount="amountFun" v-on:toDiscount="discountFun"></inputMoney>
            <dd>
              <div class="item-input">
                <span class="itemTxt">&nbsp;&nbsp;订单编号</span>
                <div class="specialbox">
                  <input class="typeinput input-one" type="text" :value="this.offlineDeposit.orderNo" style="background-color: darkgray;" readonly>
                </div>
              </div>
            </dd>
            <dd v-if="iconName">
              <div class="item-input">
                <span class="itemTxt" style="font-size:14px;"><i class="red">*</i><span v-html="strSub(iconName, 5)"></span></span>
                <div class="specialbox">
                  <input class="typeinput input-one"  :class="{'midlInput':iconMax}" type="text" v-model="userCardName" :placeholder="'请务必输入您的' + iconName" :maxlength="cnMaxlength">
                </div>
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>  
  <div class="yo-deposit">
    <!--扫码转账-->
    <div class="depositMain" v-if="isScanType">
      <h2 class="yo-headline2 ">
        <p class="fontSize">
          <span style="font-size:16px">扫码支付：</span><br/>
          <span style="font-size:14px" class="saomaTxt">1.填写资料 → 2.扫码支付 → 3.确认提交</span>
        </p>
      </h2>
      <div class="companyDep" style="margin-top:10px">
        <dl class="bankCard">
          <dd @click="setOfflineDeposit(account)" v-if="account.bankId === bankId && account.isbank == 1" v-for="(account,index) in companyAccount" :key="index">
            <div class="cardMain">
              <p class="cardTouchArea">
                <img :src="account.qrCode + '?_=' + refreshTime" class="ewmImg" data-tap-disabled="true" :class="offlineDeposit.indexNumber === account.indexNumber?'active':''" />
                <img class="yo-icon refreshImg" :src="stationCode && stationCode == 'a04' ? commonImgUrl + '/newPayment/a04fresh.png':commonImgUrl + '/newPayment/fresh2.png'" @click="refreshImg(index)" :class="refreshFlag && index === imgNum ? 'lodingPic' : ''" />
              </p>
            </div>
          </dd>
        </dl>
      </div>
    </div>
    <!--好友转账-->
    <div class="depositMain" v-if="!isScanType">
      <div class="companyDep" style="margin-top:10px">
        <dl class="bankCard">
          <dd @click="setOfflineDeposit(account)" :class="offlineDeposit.indexNumber === account.indexNumber?'active':''" v-if="account.bankId === bankId && account.isbank === 1" v-for="(account,index) in companyAccount" :key="index">
            <p class="cardName">&nbsp;&nbsp;{{getInfo.transfer.cardName}}</p>
            <div class="cardMain">
              <span class="cardUserName" style="margin-right: 68px;word-break:break-all;">收款人：
                <em>{{account.chamberlain}}</em>
                <span style="position:absolute;right:45px;">
                  <span style="font-size:14px;color:#F68622;font-weight: normal;" v-clipboard:copy="account.chamberlain" v-clipboard:success="copySuccess">复制</span>
                </span>
              </span>
              <strong class="cardCode" style="width: 68vw;word-break: break-all;">
                <span>{{account.onlineBankAccount || account.mbankaccount}}</span>
                <span style="font-size:14px;color:#F68622;font-weight: normal;position:absolute;right:45px;" v-clipboard:copy="(account.onlineBankAccount || account.mbankaccount)" v-clipboard:success="copySuccess">复制</span>
              </strong>
              <span class="cardUserName" v-if="account.onlineBankName">银行名称：
                <em>{{account.onlineBankName}}</em>
              </span>
            </div>
            <p class="cardBranch">开户网点：
              <em>{{getInfo.transfer.cardName}}</em>
            </p>
            <span class="cardRadio" :class="offlineDeposit.indexNumber === account.indexNumber?'icon-radio-yes':'icon-radio-no'"></span>
          </dd>
        </dl>
      </div>
    </div>
    <!--在线文案-->
    <listDeposit></listDeposit>
    <div class="yo-pad10 sureBtn">
      <button type="button" class="button yo-anOne" @click="submit()" :class=" amount ? 'canClick': 'notClick'" :disabled="!amount">{{buttonMsg}}</button>
    </div>
  </div>
  </div>
</template>

<script>
  import * as payMents from '@/base/config/payMent'
  import * as cookieUtil from '@/base/utils/cookieUtil'
  import inputMoney from './bankAmount'
  import * as type from '@/base/store/payment/type'
  import Toast from 'mint-ui/lib/toast' // 按需加载mint-ui的模块
  import listDeposit from '@/payment/components/payment/listDeposit'
  let { getInfo } = payMents
  export default {
    components: {
      inputMoney,
      listDeposit
    },
    data () {
      return {
        getInfo: getInfo[this.getKeys(this.$store.state.payment.bankType)],
        cnMaxlength: 9999,
        isOpen: true, // 是否允许点击，控制频繁点击
        amount: '',
        discount: 1, // 是否申请优惠，1：申请，0：不申请
        userCardName: '', // 真实姓名
        buttonMsg: '确定',
        orderNo: '', // 订单号
        iconMax: false, // 入款名称是否折行
        wirteTime: cookieUtil.getNowFormatDate(),
        refreshFlag: false,
        refreshTime: '',
        imgNum: null
      }
    },
    methods: {
      copySuccess () {
        Toast({
          message: '复制成功',
          position: 'bottom',
          duration: 500
        })
      },
       /**
      * 刷新图片功能
      */
      refreshImg (index) {
        this.imgNum = index
        if (this.refreshFlag === true) {
          return
        }
        this.refreshFlag = true
        this.refreshTime = new Date().getTime()
        setTimeout(() => {
          this.refreshFlag = false
          this.imgNum = null
        }, 1000)
      },

      /**
       * 切换当前选中的线下入款支付
       */
      setOfflineDeposit (offlineDeposit) {
        this.$store.state.payment.offlineDeposit = offlineDeposit
      },
      /**
       * 监听子组件的金额传输
       */
      amountFun (amount) {
        this.amount = amount
      },
      /**
       * 监听子组件的优惠传输
       */
      discountFun (discount) {
        this.discount = discount
      },
      // 去掉首尾空格
      trimStr (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '')
      },
      // 截取和换行
      strSub (str, len) {
        if (str) {
          let lth = window.innerWidth > 320 ? len : len - 1
          let newStr = str.length > lth ? str.slice(0, lth) + '</br>&nbsp;&nbsp;' + str.slice(lth, 8) : str
          this.iconMax = newStr.indexOf('</br>') > 0
          return newStr
        }
        return ''
      },
      submit () {
        if (this.isOpen) {
          this.buttonMsg = '提交中...'
          if (this.amount === null || this.amount === '' || /^\d+\.?\d{0,2}$/.test(this.amount) === false) {
            window.layer.msgWarn('请您输入充值金额！')
            this.buttonMsg = '确定'
            return false
          }
          // 最低金额
          let minDepositCompany = parseFloat(this.payType.quantitySet.minDepositCompany)
          // 最高金额
          let highDepositCompany = parseFloat(this.payType.quantitySet.highDepositCompany)
          this.amount = parseFloat(this.amount)
          if (this.amount > highDepositCompany || this.amount < minDepositCompany) {
            this.buttonMsg = '确定'
            window.layer.msgWarn('您输入的金额有误！')
            return false
          }
          // 验证存款名
          if (this.iconName && this.trimStr(this.userCardName) === '') {
            this.buttonMsg = '确定'
            window.layer.msgWarn('请您输入' + this.iconName)
            return false
          }
          let data = {}
          // 金额
          data.depositMoney = this.amount
          // 订单号，后台生成
          data.orderno = this.offlineDeposit.orderNo
          // 存款名
          data.userCardName = this.userCardName
          let _obj = {}
          // 0：扫码支付，1：好友转账
          if (this.offlineDeposit.bankType === 0) {
            _obj = this.getInfo.scan
          } else {
            _obj = this.getInfo.transfer
          }
          data.remark = ''
          // 当前使用的银行卡名称
          data.depositBankValue = _obj.depositBankValue
          // 选择的存款方式名称
          data.userDepositValue = _obj.userDepositValue
          // 选择的存款方式id
          data.userDepositType = _obj.userDepositType
          // 当前使用的银行卡key
          data.depositBank = this.offlineDeposit.bankId
          // 当前选择的厅主帐号ID
          data.companyAccountId = this.offlineDeposit.companyAccountId
          // 当前选择的厅主帐号银行卡名称
          data.companyAccountValue = this.offlineDeposit.bankName
          // 当前选择的厅主银行卡帐号
          data.mbankaccount = this.offlineDeposit.mbankaccount || ''
          // 当前选择的厅主银行卡帐号用户名
          data.chamberlain = this.offlineDeposit.chamberlain || ''
          // 当前的银行卡id
          data.bankId = this.offlineDeposit.bankId
          // 当前时间
          data.writeTime = this.wirteTime
          // 所属分行
          data.userDepositSubbranch = this.offlineDeposit.onlineBankName || ''
          // 银行账号
          data.onlineBankAccount = this.offlineDeposit.onlineBankAccount || ''
          // 是否申请优惠，1：申请，0：不申请
          data.abandon = this.discount
          // 验证银行卡信息
          if (data.depositBank === '' || data.companyAccountId === '' || data.userDepositType === '') {
            this.buttonMsg = '确定'
            window.layer.msgWarn('银行信息不能为空！')
            return false
          }
          // APP传递token
          if (window.myNative && window.myNative.isApp && window.myNative.isApp()) {
            data.memberToken = window.myNative.getMemberToken()
          } else { // 兼容之前APP版本
            let mt = localStorage.getItem('memberToken')
            if (mt) {
              data.memberToken = mt
            }
          }
          this.buttonMsg = '确定'
          if (!window.navigator.onLine) {
            window.layer.msgWarn('网络连接中断，请检查您的网络！')
          } else {
            this.$store.dispatch(type.SAVE_COMPANY_DEPOSIT_ACTION, data).then(res => {
              if (res.status === '1') {
                window.layer.msgWarn('提交申请成功，财务将在1-3分钟内为您添加额度，请稍等！', function () {
                  // 判断是否原生APP，并触发原生APP提供的方法
                  if (window.myNative && window.myNative.popToAccount && window.myNative.popToAccount()) {
                    return // 如果触发成功，则阻止后续H5的代码执行
                  }
                  window.moduleRouter.push('/wap/memberCenter/index')
                })
              } else {
                window.layer.msgWarn('失败: ' + res.data.msg)
                return false
              }
            }).catch(res => {
              console.log(' INITPAYMENT store error')
            })
            // 限制两秒才允许再次点击
            this.isOpen = false
            setTimeout(() => {
              this.isOpen = true
            }, 1500)
          }
        }
      },
      getKeys (bankId) { // 按key值区分转账和扫码
        if (bankId === 17 || bankId === 18) {
          return 'ali'
        } else if (bankId === 19 || bankId === 20) {
          return 'weixin'
        } else if (bankId === 21 || bankId === 22) {
          return 'qq'
        } else if (bankId === 23 || bankId === 24) {
          return 'cft'
        } else if (bankId === 25 || bankId === 26) {
          return 'ysf'
        }
      }
    },
    computed: {
      companyAccount () {
        return this.$store.state.payment.companyAccount
      },
      isScanType () {
        let id = this.$store.state.payment.bankType
        if (id === 17 || id === 19 || id === 21 || id === 23 || id === 25) {
          return true
        } else {
          return false
        }
      },
      commonImgUrl () { // 公共图片路径
        return this.$store.state.home.commonImgUrl
      },
      stationCode () {
        return this.$store.state.home.stationCode
      },
      payType () { // 当前选中的支付
        return this.$store.state.payment.payType
      },
      offlineDeposit () {
        return this.$store.state.payment.offlineDeposit
      },
      bankId () {
        return this.$store.state.payment.bankType
      },
      iconName () { // 昵称
        return this.$store.state.payment.iconName
      }
    },
    watch: {
      bankId () {
        this.getInfo = getInfo[this.getKeys(this.$store.state.payment.bankType)]
      }
    },
    mounted () {
      this.getInfo = getInfo[this.getKeys(this.$store.state.payment.bankType)]
      window.indexMain.closeFixed('.paymentMain input', '.yo-pad10.sureBtn') // input聚焦时，取消底部确定按钮Fixed定位
    }
  }
</script>
