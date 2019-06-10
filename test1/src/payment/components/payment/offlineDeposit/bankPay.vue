<template>
  <div class="yo-deposit">
    <div class="depositMain">    
      <div class="companyDep" style="position:relative">
        <div class="bankDepOthey">
          <dl class="rechargebox">
            <inputMoney v-on:toAmount="amountFun" v-on:toDiscount="discountFun"></inputMoney>
          </dl>
        </div>
      </div>
    </div>
    <div class="depositMain ">
      <h2 class="yo-headline2 yo-titile2">请您选择汇款银行账号</h2>
      <div class="companyDep" style="margin-top:10px">
        <div class="bankDepOthey">
          <dl class="paytype" @click="clickDeposit(0)">
            <dd>
              <h6 class="banktitle">存款方式</h6>
              <span class="radio_span yo-arrri">
                <i class="yo-icon icon-arrows-right"></i>
              </span>
              <span class="paybankName">{{depositName}}</span>
            </dd>
          </dl>
          <div class="wrapper2" pageId='live' style="margin-bottom: -44px;">
            <div v-show="openStroe" attr-div="depositList" class="TipsWindown">
              <div class="shadeIn">
                <div class="selBankBox">
                  <h1>存款方式
                    <a href="javascript:;" @click="clickDeposit(1)">完成</a>
                  </h1>
                  <dl>
                    <dt v-for="(deposit,index) in payMent.depositType" :key="index" @click="setDeposit(deposit)">
                      <span>{{deposit.depositName}}</span>
                      <i class="yo-icon icon-radio" :class="depositName === deposit.depositName ? 'icon-radio-yes':'icon-radio-no'"></i>
                    </dt>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
        <dl @click="setOfflineDeposit(account)" v-for="(account,index) in companyAccount"
            v-if="account.isbank == 0" :key="index" class="bankCard">
          <dd :class="offlineDeposit.companyAccountId === account.companyAccountId?'active':''">
            <p class="cardName">{{account.bankName}}</p>
            <div class="cardMain">
              <span class="cardUserName" style="margin-right: 68px;word-break:break-all;">收款人：<em>{{account.chamberlain}}</em>
                <span style="position:absolute;right:45px;">
                  <span style="font-size:14px;color:#F68622;font-weight: normal;"
                    v-clipboard:copy="account.chamberlain"
                    v-clipboard:success="copySuccess">复制</span>
                </span>
              </span>
              <strong class="cardCode">{{ account.mbankaccount}}
                <span style="font-size:14px;color:#F68622;font-weight: normal;position:absolute;right:45px;"
                  v-clipboard:copy="account.mbankaccount"
                  v-clipboard:success="copySuccess">复制</span>
              </strong>
            </div>
            <p class="cardBranch">开户网点：<em>{{ account.bankstation }}</em></p>
            <span class="cardRadio" :class="offlineDeposit.companyAccountId === account.companyAccountId?'icon-radio-yes':'icon-radio-no'"></span>
          </dd>
        </dl>
        <div class="bankDepOthey">   
          <dl class="paytype">
            <dd  @click="selectBanck()">
              <h6 class="banktitle">&nbsp;&nbsp;选择银行</h6>
              <span class="radio_span yo-arrri">
                <i class="yo-icon icon-arrows-right"></i>
              </span>
              <span class="paybankName">{{this.bankName}}</span>
            </dd>  
          </dl>
          <dl class=" rechargebox">                 
            <dd>
              <div class="item-input">
                <span class="itemTxt" style="font-size:14px;">
                  <i class="red">*</i><span v-html="strSub(iconName, 5)"></span></span>
                <div class="specialbox">
                  <input class="typeinput input-one" :class="{'midlInput':iconMax}" type="text" v-model="userCardName" maxlength="16">
                </div>
              </div>
            </dd>
            <dd>
              <div class="item-input">
                <span class="itemTxt">&nbsp;&nbsp;汇款留言</span>
                <div class="specialbox">
                  <input class="typeinput input-one" type="text" v-model="remark">
                </div>
              </div>
            </dd>
            <dd v-if="this.offlineDeposit.depositId === 1 || this.offlineDeposit.depositId === 2 || this.offlineDeposit.depositId === 3">
              <div class="item-input">
                <span class="itemTxt">
                  <i class="red">*</i>所属分行</span>
                <div class="specialbox">
                  <input class="typeinput input-one" type="text" v-model="userDepositSubbranch">
                </div>
              </div>
            </dd>
          </dl>
        </div>
        <div class="wrapper2" pageId='live' style="margin-bottom: -44px;">
          <div v-show="openBank" attr-div="depositList2" class="TipsWindown">
            <div class="shadeIn">
              <div class="selBankBox">
                <h1>您所使用的银行卡
                  <a href="javascript:;" @click="closeBankList()">完成</a>
                </h1>
                <dl>
                  <dt v-for="(bankInfo,index) in bankList" :key="index" @click="setBank(bankInfo)">
                    <span>{{bankInfo.bankname}}</span>
                    <i class="yo-icon icon-radio" :class="bankKey === bankInfo.id ? 'icon-radio-yes':'icon-radio-no'"></i>
                  </dt>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--在线文案-->
      <listDeposit></listDeposit>
      <!--确定按钮-->
      <div class="yo-pad10 sureBtn">
        <button type="button" class="button yo-anOne" :class=" amount ? 'canClick': 'notClick'" @click="submit()" :disabled="!amount">{{buttonMsg}}</button>
      </div>
    </div>
  </div>
</template>

<script>
  import * as payMents from '@/base/config/payMent'
  import listDeposit from '@/payment/components/payment/listDeposit'
  import Toast from 'mint-ui/lib/toast' // 按需加载mint-ui的模块
  import * as cookieUtil from '@/base/utils/cookieUtil'
  import inputMoney from './bankAmount'
  import * as type from '@/base/store/payment/type'

  export default {
    components: {
      inputMoney,
      listDeposit
    },
    data () {
      return {
        payMent: payMents, // 存款方式选择，写死的
        openBank: false,
        openStroe: false,
        depositName: '网银转账',
        depositId: 0,
        isOpen: true,
        amount: '',
        discount: 1,
        bankName: '',
        bankKey: 0,
        userCardName: '', // 汇款姓名
        remark: '', // 备注
        userDepositSubbranch: '', // 所属分行
        buttonMsg: '确定',
        iconMax: false, // 入款名称是否折行
        wirteTime: cookieUtil.getNowFormatDate()
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
       * 关闭存款方式下拉框
       */
      clickDeposit (type) {
        if (type === 1) {
          window.indexMain.appHiddenOverflow(false)
          this.openStroe = false
        } else {
          window.indexMain.appHiddenOverflow(true)
          this.openStroe = true // 打开下拉框
          window.$('input, textarea').blur()// 控制软键盘消失
          var $dom = window.$('[attr-div="depositList"]')
          // dom结构移至body下
          if ($dom[0] && !$dom.parent().is(window.$('body'))) {
            window.$('body').append($dom)
            window.mountedRemoveDoms.push($dom)
            $dom = null
          }
        }
      },
      /**
       * 切换存款方式
       */
      setDeposit (deposit) {
        this.depositName = deposit.depositName
        this.depositId = deposit.depositId
        // 当切换选择银行时需要将存款方式也存储起来
        this.$store.state.payment.offlineDeposit.depositId = deposit.depositId
        this.$store.state.payment.offlineDeposit.depositName = deposit.depositName
      },
      /**
       * 切换当前选中的线下入款支付
       */
      setOfflineDeposit (offlineDeposit) {
        this.$store.state.payment.offlineDeposit = offlineDeposit
        // 当切换选择银行时需要将存款方式也存储起来
        this.$store.state.payment.offlineDeposit.depositId = this.depositId
        this.$store.state.payment.offlineDeposit.depositName = this.depositName
      },
      /**
        * 选择银行
      */
      selectBanck () {
        this.openBank = true
        window.indexMain.appHiddenOverflow(true)
        window.$('input, textarea').blur()// 控制软键盘消失
        var $dom = window.$('[attr-div="depositList2"]')
        // dom结构移至body下
        if ($dom[0] && !$dom.parent().is(window.$('body'))) {
          window.$('body').append($dom)
          window.mountedRemoveDoms.push($dom)
          $dom = null
        }
      },
      /**
       * 关闭存款方式下拉框
       */
      closeBankList () {
        this.openBank = false
        window.indexMain.appHiddenOverflow(false)
      },
      /**
       * 切换选中提交的银行
       */
      setBank (bankInfo) {
        this.bankName = bankInfo.bankname
        this.bankKey = bankInfo.id
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
          if (this.amount === null || this.amount === '' || this.amount === 0 || /^\d+\.?\d{0,2}$/.test(this.amount) === false) {
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
          if (this.trimStr(this.userCardName) === '') {
            this.buttonMsg = '确定'
            window.layer.msgWarn('请您输入' + this.iconName.slice(0, 8))
            return false
          }
          if (this.trimStr(this.userCardName).length > 16) {
            this.buttonMsg = '确定'
            window.layer.msgWarn(this.iconName.slice(0, 8) + '格式不对，请输入1-16位字符')
            return false
          }
          if (this.userCardName.indexOf('<') >= 0 || this.userCardName.indexOf('>') >= 0) {
            window.layer.msgWarn(this.iconName.slice(0, 8) + '格式不正确！')
            this.buttonMsg = '确定'
            return false
          }
          if (this.remark.indexOf('<') >= 0 || this.remark.indexOf('>') >= 0) {
            window.layer.msgWarn('汇款留言格式不正确！')
            this.buttonMsg = '确定'
            return false
          }
          // 存款方式为ATM存款等需要填写分行
          if (this.offlineDeposit.depositId === 1 || this.offlineDeposit.depositId === 2 || this.offlineDeposit.depositId === 3) {
            this.re = new RegExp('^[ ]+$')
            if (this.userDepositSubbranch === '') {
              this.buttonMsg = '确定'
              window.layer.msgWarn('所属分行不可为空！')
              return false
            } else {
              if (this.re.test(this.userDepositSubbranch)) {
                this.buttonMsg = '确定'
                window.layer.msgWarn('所属分行不可为空！')
                return false
              }
            }
            if (this.userDepositSubbranch.indexOf('<') >= 0 || this.userDepositSubbranch.indexOf('>') >= 0) {
              window.layer.msgWarn('所属分行格式不正确！')
              this.buttonMsg = '确定'
              return false
            }
          }
          let data = {}
          // 金额
          data.depositMoney = this.amount
          // 备注
          data.remark = this.remark
          // 订单号，后台生成
          data.orderno = this.offlineDeposit.orderNo
          // 存款名
          data.userCardName = this.userCardName
          // 选择的存款方式id
          if (this.offlineDeposit.depositId === undefined) {
            data.userDepositType = 0
          } else {
            data.userDepositType = this.offlineDeposit.depositId
          }
          // 选择的存款方式名称
          data.userDepositValue = this.offlineDeposit.depositName
          // 当前使用的银行卡名称
          data.depositBankValue = this.bankName
          // 当前使用的银行卡key
          data.depositBank = this.bankKey
          // 当前选择的厅主帐号ID
          data.companyAccountId = this.offlineDeposit.companyAccountId
          // 当前选择的厅主帐号银行卡名称
          data.companyAccountValue = this.offlineDeposit.bankName
          // 当前选择的厅主银行卡帐号
          data.mbankaccount = this.offlineDeposit.mbankaccount
          // 当前选择的厅主银行卡帐号用户名
          data.chamberlain = this.offlineDeposit.chamberlain
          // 当前的银行卡id
          data.bankId = this.offlineDeposit.bankId
          // 当前时间
          data.writeTime = this.wirteTime
          // 是否银行类型的标记
          data.isbank = '0'
          // 所属分行
          data.userDepositSubbranch = this.userDepositSubbranch
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
//            alert(JSON.stringify(data))
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
      }
    },
    computed: {
      companyAccount () {
        return this.$store.state.payment.companyAccount
      },
      offlineDeposit () {
        return this.$store.state.payment.offlineDeposit
      },
      bankList () {
        return this.$store.state.payment.bankList
      },
      payType () { // 当前选中的支付
        return this.$store.state.payment.payType
      },
      iconName () { // 昵称
        return this.$store.state.payment.iconName
      }
    },
    mounted () {
      // 当切换选择银行时需要将存款方式也存储起来
      this.$store.state.payment.offlineDeposit.depositId = this.depositId
      window.indexMain.mountedRemoveDoms() // 删除多余dom（防止自动刷新时，多余的dom不被删除）
      window.indexMain.closeFixed('.paymentMain input', '.yo-pad10.sureBtn') // input聚焦时，取消底部确定按钮Fixed定位
      if (this.bankList[0] !== undefined) {
        this.bankKey = this.bankList[0].id
        this.bankName = this.bankList[0].bankname
      }
    }
  }
</script>
