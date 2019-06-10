<template>
    <div v-if="payType.companyAccountChargeVoList">
        <div class="yo-form-item" @click="clickDeposit(0,0)">
            <h5 class="title">选择银行</h5>
            <span class="con-title">{{bankName}}</span>
            <i class="yo-icon icon-next"></i>
        </div>
        <div class="yo-mask-layer" v-if="showBankList">
            <div class="mask-box"></div>
            <div class="layer-pay-box">
                <div class="pay-box-titile">
                    <span class="Cancel" @click="clickDeposit(1,0)">取消</span>
                    <h5>选择银行</h5>
                    <span class="sure"></span>
                </div>
                <div class="pay-box-content">
                    <dl>
                        <dd v-for="(bank,index) in allBankList"
                            :key="index" @click="selectBanck(bank)">
                            <h2>
                                <i class="yo-icon"></i>&nbsp;&nbsp;{{bank.bankname}}&nbsp;&nbsp;
                                <i class="yo-icon"></i>
                            </h2>
                            <label class="mint-checklist-label">
                                <span class="mint-checkbox is-right">
                                <input type="radio" class="mint-checkbox-input" name="radio"
                                    :checked="bankKey === bank.id">
                                <span class="mint-checkbox-core"></span>
                                </span>
                            </label>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
        <div class="yo-form-item" @click="clickDeposit(0,1)">
            <h5 class="title">存款方式</h5>
            <span class="con-title">{{depositName}}</span>
            <i class="yo-icon icon-next"></i>
        </div>
        <div class="yo-mask-layer" v-if="showDepositList">
            <div class="mask-box"></div>
            <div class="layer-pay-box">
                <div class="pay-box-titile">
                    <span class="Cancel" @click="clickDeposit(1,1)">取消</span>
                    <h5>存款方式</h5>
                    <span class="sure"></span>
                </div>
                <div class="pay-box-content">
                    <dl>
                        <dd v-for="(deposit,index) in depositList"
                            :key="index" @click="changeDeposit(deposit)">
                            <h2>
                                <i class="yo-icon"></i>&nbsp;&nbsp;{{deposit.depositName}}&nbsp;&nbsp;
                                <i class="yo-icon"></i>
                            </h2>
                            <label class="mint-checklist-label">
                                <span class="mint-checkbox is-right">
                                <input type="radio" class="mint-checkbox-input" name="radio"
                                    :checked="depositId === deposit.depositId">
                                <span class="mint-checkbox-core"></span>
                                </span>
                            </label>
                        </dd>
                    </dl>
                </div>
            </div>
        </div>
        <div class="yo-form-item" v-if="depositArr.indexOf(depositId) > -1">
            <h5 class="title">
                所属分行<span class="high-red red-star">*</span>
            </h5>
            <div class="con-cen"> <!--OT-4721 maxlength="30"-->
                <input type="text" class="input-sty1" @input="userDepositFun" maxlength="30"
                placeholder="请输入分行名称" v-model="userDepositSubbranch">
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import * as shareTypes from '@s/store/shareApi/type'
export default {
  data () {
    return {
      bankName: '', // 银行名称
      bankKey: 0, // 银行key
      depositId: 0, // 默认选中网银转账
      depositName: '网银转账', // 存款方式
      showDepositList: false, // 显示存款方式
      showBankList: false, // 显示银行列表
      depositArr: [1, 2, 3], // 此三种存款类型需要显示所属分行
      userDepositSubbranch: '', // 所属分行
      depositList: [ // 线下入款隐含列表
        {
          depositId: 0,
          depositName: '网银转账'
        },
        {
          depositId: 1,
          depositName: 'ATM自动柜员机'
        },
        {
          depositId: 2,
          depositName: 'ATM现金入款'
        },
        {
          depositId: 3,
          depositName: '银行柜台'
        },
        {
          depositId: 4,
          depositName: '手机银行转账'
        },
        {
          depositId: 9,
          depositName: '微信转账'
        },
        {
          depositId: 10,
          depositName: '支付宝转账'
        },
        {
          depositId: 12,
          depositName: 'QQ转账'
        },
        {
          depositId: 14,
          depositName: '财付通转账'
        },
        {
          depositId: 15,
          depositName: '云闪付转账'
        },
        {
          depositId: 7,
          depositName: '其他'
        }
      ]
    }
  },
  mounted () {
    // 银行类型需要处理选中第一个银行
    if (this.payType.companyChargeType === 0) {
      this.$store.dispatch(shareTypes.GETBANAKLIST_ACTION, {versionFun: true}).then(res => {
      // 线下入款银行卡数据
        this.$store.state.payment.allBankList = res.data.bankList
        if (res.data.bankList[0] !== undefined) {
          this.bankKey = res.data.bankList[0].id
          this.bankName = res.data.bankList[0].bankname
          this.$store.state.payment.offlineBankInfo.bankKey = res.data.bankList[0].id
          this.$store.state.payment.offlineBankInfo.bankName = res.data.bankList[0].bankname
        }
      })
      // 默认选中网银转账
      this.$store.state.payment.offlineBankInfo.depositId = 0
      this.$store.state.payment.offlineBankInfo.depositName = '网银转账'
      // 默认赋值空
      this.$store.state.payment.offlineBankInfo.userDepositSubbranch = ''
    }
  },
  methods: {
    // 选择银行
    selectBanck (bank) {
      this.bankName = bank.bankname
      // 当切换选择银行时需要将存款方式也存储起来
      this.$store.state.payment.offlineBankInfo.bankKey = bank.id
      // 隐藏弹框
      this.clickDeposit(1, 2)
    },
    // 选择存款方式
    changeDeposit (deposit) {
      this.depositName = deposit.depositName
      this.depositId = deposit.depositId
      // 当切换选择银行时需要将存款方式也存储起来
      this.$store.state.payment.offlineBankInfo.depositId = deposit.depositId
      this.$store.state.payment.offlineBankInfo.depositName = deposit.depositName
      // 隐藏弹框
      this.clickDeposit(1, 1)
    },
    /*
     * 关闭存款方式下拉框
     * openType:显示类型，0代表显示，1代表关闭
     * showType:弹窗类型，0代表银行，1代表存款方式
     */
    clickDeposit (openType, showType) {
      if (openType === 1) {
        window.indexMain.appHiddenOverflow(false, 'payment')
        this.showDepositList = false
        this.showBankList = false
      } else {
        window.indexMain.appHiddenOverflow(true, 'payment')
        if (showType === 1) {
          this.showDepositList = true
        } else {
          this.showBankList = true
        }
        window.$('input, textarea').blur()// 控制软键盘消失
      }
    },
    // 将分行存储
    userDepositFun () {
      this.$store.state.payment.offlineBankInfo.userDepositSubbranch = this.userDepositSubbranch
    }
  },
  computed: {
    ...mapState({
      payType: state => state.payment.payType,
      bankList: state => state.payment.bankList,
      listDeposit: state => state.payment.listDeposit,
      depositMap: state => state.payment.depositMap,
      bankType: state => state.payment.bankType,
      companyAccount: state => state.payment.companyAccount,
      offlineDeposit: state => state.payment.offlineDeposit,
      allBankList: state => state.payment.allBankList,
      offlineBankInfo: state => state.payment.offlineBankInfo
    })
  }
}
</script>
