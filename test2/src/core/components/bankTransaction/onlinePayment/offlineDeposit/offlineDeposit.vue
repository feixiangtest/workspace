<template>
    <div>
        <!-- 银行汇款 -->
        <div class="publicBox">
            <div class="subNav borNone">
                <div class="text-right backUp">
                    <el-button @click="goTop()">返回上一级</el-button>
                </div>
            </div>

            <!--在线文案-->
            <div v-if="payType && payType.contextSim && payType.useStatus > 0">
                <div v-html="payType.contextSim"></div>
            </div>

            <div class="publicPayMain">
                <div v-if="this.payType.companyChargeType !== 1">
                    <h2>
                        <span v-if="this.payType.companyChargeType !== 0">请选择您欲转账的账户资料：</span>
                        <span v-if="this.payType.companyChargeType === 0">选择您将使用的银行：</span>
                        <a href="javascript:void(0);" class="operation"
                           v-if="this.payType.companyChargeType !== 0 && payType.typeCode !== 25 && payType.typeCode !== 26"
                           @click="operationExplain()">操作说明</a>
                    </h2>
                    <!-- 银行转账 -->
                    <div class="companyBank">
                        <dl class="clearfix paylistStyle">
                            <dd v-for="(bankDetails, index) in payType.companyAccountChargeVoList"
                                :key="'payBankList_' + index"
                                :class="offlineDeposit.companyAccountId === bankDetails.companyAccountId ? 'cur' : ''"
                                @click="chooseBank(bankDetails)">
                                <h6 v-if="payType.companyChargeType === 0">{{bankDetails.bankName}}</h6>
                                <div class="bankDetails" v-if="!bankDetails.onlineBankAccount">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td class="detaTile">
                                                    <span v-if="payType.companyChargeType === 0">收款名称</span>
                                                    <span v-else>{{getInfo.depositBankValue}}姓名</span>：
                                                    <em>{{bankDetails.chamberlain}}</em>
                                                </td>
                                                <td>
                                                    <a class="orange copyTxt"
                                                    v-clipboard:copy="bankDetails.chamberlain"
                                                    v-clipboard:success="copySuccess">复制</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="detaTile">
                                                    {{getInfo.depositBankValue}}账户：
                                                    <em class="bankNumber">{{bankDetails.mbankaccount}}</em>
                                                </td>
                                                <td>
                                                    <a class="orange copyTxt"
                                                    v-clipboard:copy="bankDetails.mbankaccount"
                                                    v-clipboard:success="copySuccess">复制</a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="bankDetails" v-if="bankDetails.onlineBankAccount">
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td class="detaTile">
                                                    收款名称：<em>{{bankDetails.onlineBankName}}</em>
                                                </td>
                                                <td>
                                                    <a class="orange copyTxt"
                                                    v-clipboard:copy="bankDetails.onlineBankName"
                                                    v-clipboard:success="copySuccess">复制</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="detaTile">
                                                    银行账户：<em class="bankNumber">{{bankDetails.onlineBankAccount}}</em>
                                                </td>
                                                <td>
                                                    <a class="orange copyTxt"
                                                    v-clipboard:copy="bankDetails.onlineBankAccount"
                                                    v-clipboard:success="copySuccess">复制</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="detaTile">真实姓名：<em>{{bankDetails.chamberlain}}</em></td>
                                                <td>
                                                    <a class="orange copyTxt"
                                                    v-clipboard:copy="bankDetails.chamberlain"
                                                    v-clipboard:success="copySuccess">复制</a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!--银行有开户网点，其他显示空即可-->
                                <p class="text-right" v-if="payType.companyChargeType === 0">
                                    开户网点：{{bankDetails.bankstation}}
                                </p>
                            </dd>
                        </dl>
                        <table class="warmPrompt">
                            <tr><td style="width: 66px;">温馨提示:</td></tr>
                            <tr><td></td><td>1、请存入带小数点金额(如存 1000.32元,500.77元),以便财务查收</td></tr>
                            <tr><td></td><td>2、转账完成后请保留单据作为核对证明</td></tr>
                            <tr v-if="this.payType.companyChargeType !== 0">
                                <td></td>
                                <td>
                                    注:{{getInfo.depositBankValue}}转账的【添加备注】栏内，必须填写您的会员账号（<span class="orange">{{account.account}}</span>）,以便财务快速核对。
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>

                <!-- 扫码处理 -->
                <div v-if="this.payType.companyChargeType === 1">
                    <h2>
                        <span>请扫描下方二维码：</span>
                    </h2>
                    <div class="scanCode">
                        <dl class="clearfix paylistStyle">
                            <dd v-for="(bankDetails, index) in payType.companyAccountChargeVoList"
                                :key="'payScanBankList_' + index"
                                :class="offlineDeposit.companyAccountId === bankDetails.companyAccountId ? 'cur' : ''"
                                @click="chooseBank(bankDetails)">
                                <div class="QRcode">
                                    <img :src="bankDetails.qrCode + '?_=' + refreshTime">
                                </div>
                                <i class="el-icon-refreshs" @click="refreshImg(index)"
                                    :class="refreshFlag && index === imgNum ? 'lodingPic' : ''">
                                </i>
                            </dd>
                        </dl>
                        <table class="warmPrompt">
                            <tr><td>1、请存入带小数点金额(如存 1000.32元,500.77元),以便财务查收</td></tr>
                            <tr><td>2、转账完成后请保留单据作为核对证明</td></tr>
                            <tr>
                                <td>
                                    注:{{getInfo.depositBankValue}}扫码的【添加备注】栏内，必须填写您的会员账号（<span class="orange">{{account.account}}</span>）,以便财务快速核对。
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>

                <!--提交组件-->
                <bankSubmit></bankSubmit>

            </div>
        </div>

        <!-- 操作说明==查看详情  :autoplay="false"-->
        <el-dialog v-if="payType.companyChargeType !== 0 && payType.typeCode !== 25 && payType.typeCode !== 26"
            :title="this.payType.typeName+'操作说明'" :visible.sync="dialogVisible" center width="725px">
            <div class="efficacbetCon operationExplainBox" v-if="explainList">
                <el-carousel indicator-position="outside">
                    <el-carousel-item v-for="num in explainList.images" :key='num'>
                       <div class="explainList"
                       :style=" 'background-image:url(' + imgPath + (explainList.url) + num + '.jpg)'"></div>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span> -->
        </el-dialog>

    </div>
</template>

<script>
  import Vue from 'vue'
  import bankSubmit from './offlineSubmit'
  import {Carousel, CarouselItem} from 'element-ui'
  import payment from '@s/components/payment/offlinePay.js' // 抽出支付公共js函数
  import * as operationExplain from '@m/config/operationExplain'
  // 按需引入的ElmentUI组件
  Vue.use(Carousel)
  Vue.use(CarouselItem)
  let { explainList } = operationExplain
  export default {
    mixins: [payment],
    data () {
      return {
        dialogVisible: false, // 操作说明弹框
        offlinePayList: [], // 当前线下入款的集合
        refreshFlag: false,
        refreshTime: '',
        imgNum: null,
        explainList: '',
        imgPath: '/resource/share/RESOURCE_VERSION/imgs/', // 操作说明-公共图片路径
        isScanText: ''
      }
    },
    components: {
      bankSubmit
    },
    methods: {
      getExplainKeys (bankId) { // 按key值区分转账和扫码
        let bankStr = ''
        switch (bankId) {
          case 17:
            bankStr = 'alipayScan'
            break
          case 18:
            bankStr = 'alipayTransfer'
            break
          case 19:
            bankStr = 'wechatScan'
            break
          case 20:
            bankStr = 'wechatTrans'
            break
          case 21:
            bankStr = 'qqpayScan'
            break
          case 22:
            bankStr = 'qqTransfer'
            break
          case 23:
            bankStr = 'tenpayScan'
            break
          case 24:
            bankStr = 'tenpayTransfer'
            break
        }
        return bankStr
      },
      copySuccess () {
        window.layer.msgWarn('复制成功')
      },
      goTop () {
        this.$store.state.payment.level = 0
      },
      chooseBank (bankDetails) { // 选择银行方法
        this.$store.state.payment.offlineDeposit = bankDetails
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
       * 查看操作说明功能
       */
      operationExplain () {
        this.dialogVisible = true
      }
    },
    computed: {
    },
    mounted () {
      // 操作说明
      this.explainList = explainList[this.getExplainKeys(this.payType.typeCode)]
    }
  }
</script>
