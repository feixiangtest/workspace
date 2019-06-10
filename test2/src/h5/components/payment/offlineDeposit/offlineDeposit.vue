<template>
    <div v-if="payType.companyAccountChargeVoList">
        <div class="yo-form-content magt10">
            <h6 class="form-title grey-txt">
                充值金额（元）&nbsp;&nbsp;<span class="high-red red-star">*</span>
            </h6>
            <div class="feed-in-sum">
                <i class="yo-icon icon-mony"></i> <!-- 金额输入框最大长度为14 OT-4721 -->
                <input type="text" :placeholder="place" maxlength="14"
                    v-model="amount" @input="inputMoney(amount)">
            </div>
            <p class="form-title red-txt"
                v-if="amountErrFlag">
                {{amountErrMsg}}
            </p>
          <!--
            && payType.deposite && (item <= payType.deposite.max && item >= payType.deposite.min)
          -->
            <div class="fast-Select-sum" v-if="payType && payType.isShowFlag === '1'">
                <ul>
                    <li class="btn btn-default" :class=" index === curQuickPrice ? 'cur' : '' "
                        v-for="(item,index) in payType.quickPrice.split(',')" :key="index"
                        v-if="item > 0 && (item <= payType.deposite.max && item >= payType.deposite.min)"
                        @click="changeQuickPrice(index,item)">
                        {{item}}元
                    </li>
                </ul>
            </div>
        </div>
        <!-- 线下入款
         入款名称默认为空，但是如果有设置，前端需要显示该字段
         -->
        <div class="magt10">
            <div class="yo-form-item" v-if="payType.incomeName">
                <h5 class="title">
                  {{payType.incomeName}}&nbsp;<span class="high-red red-star">*</span>
                </h5>
                <div class="con-cen">
                    <input type="text" class="input-sty1"
                      :placeholder="'请输入'+payType.incomeName"
                      @keyup.native='noSpace("userCardName")'
                      v-model="userCardName" maxlength="30">
                </div>
            </div>
            <div class="yo-form-item" v-if="payType.companyChargeType === 0">
                <h5 class="title">汇款留言</h5>
                <div class="con-cen"> <!--OT-4721 maxlength="30"-->
                    <input type="text" class="input-sty1" maxlength="30"
                    placeholder="请输入留言" v-model="remark">
                </div>
            </div>
            <div class="yo-form-item" v-if="discountFun">
                <h5 class="title">申请优惠</h5>
                <div class="con-cen">
                    <label class="mint-switch">
                        <input type="checkbox" class="mint-switch-input"
                          v-model="discount" :disabled="applyDiscount">
                        <span class="mint-switch-core"></span>
                        <div class="mint-switch-label"></div>
                    </label> &nbsp;&nbsp;
                    <span class="weak-txt grey-txt">
                      优惠{{offer}},
                      <font v-if="this.companyCodeQuantitySet.statusCompCompany === 1">{{this.companyCodeQuantitySet.codeMultiple}}</font>
                      <font class="orange" v-else>0</font>倍打码
                    </span>
                </div>
            </div>
            <div class="yo-form-item" v-if="payType.companyAccountChargeVoList">
                <h5 class="title">订单编号</h5>
                <div class="con-cen">
                    <input type="text" class="input-sty2"
                      placeholder="请输入订单编号" disabled="true"
                      :value="payType.companyAccountChargeVoList[0].orderNo">
                </div>
            </div>

            <!--只有银行有选择银行和存款方式-->
            <bankList v-if="payType.companyChargeType === 0"></bankList>

        </div>

        <!-- 扫码支付 1为扫码类型，其他为转账 -->
        <div v-if="payType.companyChargeType === 1">
            <div class="public-title magt5">
                <h1 class="yow-content">扫码支付</h1>
            </div>
            <div class="scan-code-pay magt5">
                <p class="scan-titile yow-content">1.填写资料—2.扫码支付—3.确认提交</p>
                <div class="scan-code">
                    <div class="QRcode"
                      v-for="(company,index) in payType.companyAccountChargeVoList"
                      :key="'transfer_'+index" @click="changeBank(company)">
                        <div class="code"
                          :class="offlineDeposit.companyAccountId === company.companyAccountId ? 'cur':''">
                          <img :src="company.qrCode + '?_=' + refreshTime">
                        </div>
                        <i class="yo-icon icon-refresh2"
                        @click="refreshImg(index)" :class="refreshFlag && index === imgNum ? 'icon-run' : ''"></i>
                    </div>
                </div>
            </div>
        </div>

        <!-- 微信、支付宝转账付款、银行卡付款 -->
        <div class="company-bank paylist-style" v-if="payType.companyChargeType !== 1">
            <dl>
                <dd :class="offlineDeposit.companyAccountId === company.companyAccountId ? 'cur':''"
                  v-for="(company,index) in payType.companyAccountChargeVoList"
                  :key="'transfer_'+index" @click="changeBank(company)">
                    <h6>{{company.bankName}}</h6>
                    <div class="bankDetails">
                      <table>
                        <tbody>
                          <tr>
                            <td class="detaTile">
                              收款人：
                              <em>{{company.chamberlain}}</em>
                            </td>
                            <td align='right'>
                                <a class="copyTxt"
                                  v-clipboard:copy="company.chamberlain"
                                  v-clipboard:success="copySuccess">
                                  复制
                                </a>
                            </td>
                          </tr>
                          <tr>
                            <td class="detaTile">
                              <em style="font-weight:bold">{{company.mbankaccount || company.onlineBankAccount}}</em>
                            </td>
                            <td align='right'>
                                <a class="copyTxt"
                                  v-clipboard:copy="(company.onlineBankAccount || company.mbankaccount)"
                                  v-clipboard:success="copySuccess">
                                  复制
                                </a>
                            </td>
                          </tr>
                          <tr v-if="company.onlineBankName">
                            <td class="detaTile">
                              银行名称：
                              <em class="bankNumber">{{company.onlineBankName}}</em>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--银行有开户网点，其他显示空即可-->
                    <p class="text-right" v-if="payType.companyChargeType === 0">
                      开户网点：{{company.bankstation}}
                    </p>
                    <p class="text-right" v-else>&nbsp;&nbsp;</p>
                </dd>
            </dl>
        </div>

        <!-- 提交 -->
        <div class="public-footer common-footer">
            <div class="but-footer yow-content">
                <a href="javascript:void(0);" @click="submit()"
                  :disabled="amountStatus"
                  :class="amountStatus ? 'btn-disabled' : 'btn-primary'"
                  class="btn btn-lg btn-block">
                    {{buttonMsg}}
                </a>
            </div>
        </div>
    </div>
</template>

<script>
// import * as types from '@m/store/payment/type'
import payment from '@s/components/payment/offlinePay.js' // 抽出支付公共js函数
import bankList from './offlineBankList'
import Toast from 'mint-ui/lib/toast' // 按需加载mint-ui的模块
export default {
  mixins: [payment],
  components: {
    bankList
  },
  methods: {
    copySuccess () {
      Toast({
        message: '复制成功',
        duration: 1000
      })
    }
  },
  watch: {
    payType (v) {
      this.amount = null
      this.amountErrFlag = false
      this.amountErrMsg = ''
      this.offer = 0
      this.remark = ''
      this.userCardName = ''
    }
  }
}
</script>
