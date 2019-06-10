<template>
<div class="yo-page-body conver">
    <div class="header yo-home-nav">
        <div class="center">
        <div class="hea-menu hea-left">
            <a href="javascript:;" @click="goback()"><i class="yo-icon icon-arrows-left"></i></a>
        </div>
        <div class="header-text titile">
            <h1>额度转换<span v-if="$store.state.home.isOffLine">(未连接)</span></h1>
        </div>
        <div class="hea-user hea-right">
            <a href="javascript:;" @click="home()"><i class="yo-icon icon-home"></i></a>
        </div>
        </div>
    </div>
    <div class="centerBox mainCenter" v-show="showPage">
        <div class="depositMain onlineDraw">
            <div class="payitembox">
                <dl class="paytype">
                    <dd>
                        <h6 class="banktitle">{{ isSwitch ? '自动' : '手动' }}额度转换</h6>
                        <label class="yo-toggle yo-toggle-positive openMusicLab " >
                            <input type="checkbox" v-model="isSwitch" @click="switchOn()">
                            <div class="track">
                                <div class="handle"></div>
                            </div>
                        </label>
                    </dd>
                </dl>
            </div>
            <dl class="secondForm2" v-if="isSwitch">
                <dd>
                    <div class="formIput">
                        <span class="itemTxt">账户余额</span>
                        <span class="itemNeir lightGray">{{ moneyData.totalmoney | moneyFilter }}</span>
                    </div>
                </dd>
            </dl>
            <p v-if="isSwitch" class="explain text1"><span class="red">温馨提示：您目前处于自动额度转换状态，无需转换额度，可以直接进入游戏哦~</span></p>
            <template v-if="!isSwitch">
                <dl class="secondForm2 secondForm4 secondForm-new5">
                    <dd>
                        <div class="formIput">
                            <span class="itemTxt">总余额</span>
                            <span class="itemNeir PaleOrange">{{ moneyData.totalmoney | moneyFilter }}</span>
                        </div>
                    </dd>
                    <dd>
                        <div class="formIput">
                            <span class="itemTxt">现金余额</span>
                            <span class="itemNeir PaleOrange">{{ moneyData.platformMoney | moneyFilter }}</span>
                        </div>
                    </dd>
                    <dd style="margin-bottom:10px;">
                        <div class="formIput">
                            <span class="banktitle">其他平台余额</span>
                            <span class="itemNeir" @click="showOtherPlatform = !showOtherPlatform"><i class="yo-zz-icon yico-xiala"></i></span>
                        </div>
                        <div v-show="showOtherPlatform">
                            <dl>
                              <!--BBIN某些站点需要特殊屏蔽，所以增加此判断，当bbinShow有值时不显示-->
                              <dd v-for="(val, key) in PlatformList" v-if="key != 'bb' || !moneyData.bbinShow" :key="key">
                                <div class="formIput">
                                  <span class="itemTxt">{{ val }}</span>
                                  <span class="itemNeir"><em class="lightGray">{{ (!moneyData.result || !moneyData.result['apiMoneyMap']) ? 0 : moneyData.result['apiMoneyMap'][key] | moneyFilter }}</em>
                                    <i class="yo-icon icon-refresh" @click="refreshImg(key)" :class="refreshFlag ? 'lodingPic' : ''"></i>
                                  </span>
                                </div>
                              </dd>
                            </dl>
                        </div>
                    </dd>
                    <dd>
                        <div class="formIput">
                            <span class="itemTxt">转出账户</span>
                            <span class="itemNeir fontSize16" @click="showAlterData(moneyData.API_FROM, 'from')">{{ fromAccount.name }}<i class="yo-zz-icon yico-xiala"></i></span>
                        </div>
                    </dd>
                    <dd>
                        <div class="formIput">
                            <span class="itemTxt">转入账户</span>
                            <span class="itemNeir fontSize16" @click="showAlterData(moneyData.API_TO, 'to')">{{ toAccount.name }}<i class="yo-zz-icon yico-xiala"></i></span>
                        </div>
                    </dd>
                    <dd>
                        <div class="formIput">
                            <span class="itemTxt">金额</span>
                            <input type="tel" class="typeinput input-two" placeholder="0" v-model="changeMoney">
                        </div>
                    </dd>
                </dl>
                <p class="explain text1"><span class="red">温馨提示：切换到自动额度转换前，请先通过手动转换把额度转移到现金余额。</span></p>
                <div class="yo-pad10"><button type="button" class="yo-anOne button" @click="conversionToThird()">{{ commitWord }}</button></div>
            </template>
            <div class="TipsWindown" attr-div="conversionModeList" v-show="showAlter">
                <div class="shadeIn">
                    <div class="selBankBox">
                        <h1><a href="javascript:;" @click="closeOpen()">完成</a></h1>
                        <dl style="height:100%;max-height:252px;">
                            <dt v-for="(item, index) in alertData" :key="index" @click="chooseAccount(item, alterType)">
                                <span>{{ item.name }}</span>
                                <i class="yo-icon icon-radio" :class="(alterType === 'from' && item.id === fromAccount.id) || (alterType === 'to' && item.id === toAccount.id) ? 'icon-radio-yes' : 'icon-radio-no'"></i>
                            </dt>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import * as types from '@/base/store/memberCenter/type'
import * as statusCode from '@/base/utils/status_const'
export default {
  data () {
    return {
      showPage: false, // 判断自动或手动额度转换之前先隐藏页面
      commitWord: '提交',
      changeMoney: '', // 转出金额
      refreshFlag: false, // 刷新余额动画
      showOtherPlatform: false, // 是否展示其他平台余额
      isSwitch: false, // 切换自动额度转换
      showAlter: false, // 展示弹出框
      moneyData: {}, // 初始化返回数据
      alertData: [], // 弹出框数据
      fromAccount: {}, // 转出账户
      toAccount: {}, // 转入账户
      alterType: '', // 弹出框的类型（to，from）
      accountInfo: [{'id': 'luoma', 'name': '现金余额'}],
      PlatformList: {}
    }
  },
  methods: {
    goback () {
      this.$router.go(-1)
    },
    home () {
      this.$router.push('/wap/index')
    },
    refreshImg (key) {
      this.refreshFlag = true
      this.refreshMoney(key)
      setTimeout(() => {
        this.refreshFlag = false
      }, 1000)
    },
    refreshMoney (key) { // 刷新余额
      this.$store.dispatch(types.UPDATE_SESSION_MONEY_ACTION, {'api': '1', 'key': key}).then(res => {
        if (res.status === statusCode.statusConst.SUCCESS && res.data.accountBalance !== undefined) {
          this.moneyData.totalmoney = res.data.totalmoney
          this.$set(this.moneyData, 'result', res.data.accountBalance)
        }
      })
    },
    closeOpen () {
      this.showAlter = false
      window.indexMain.appHiddenOverflow(false)
    },
    showAlterData (data, type) { // 展示弹出框
      this.alertData = data
      this.showAlter = true
      this.alterType = type
      window.indexMain.appHiddenOverflow(true)
      // dom结构移至body下
      var $dom = window.$('[attr-div="conversionModeList"]')
      if ($dom[0] && !$dom.parent().is(window.$('body'))) {
        window.$('body').append($dom)
        window.mountedRemoveDoms.push($dom)
        $dom = null
      }
    },
    chooseAccount (item, alterType) { // 弹出框点击选择
      if (alterType === 'from') { // 转出账户
        if (item.id === 'luoma' && this.toAccount.id === 'luoma') { // 两个都是luoma，from变成第三方
          for (let i = 0; i < this.alertData.length; i++) {
            if (this.alertData[i].id !== 'luoma') {
              this.toAccount = this.alertData[i]
              break
            }
          }
        } else if (item.id !== 'luoma' && this.toAccount.id !== 'luoma') { // 两个都不是luoma，from变成luoma
          for (let i = 0; i < this.alertData.length; i++) {
            if (this.alertData[i].id === 'luoma') {
              this.toAccount = this.alertData[i]
              break
            }
          }
        }
        this.fromAccount = item
      } else { // 转出账户
        if (item.id === 'luoma' && this.fromAccount.id === 'luoma') { // 两个都是luoma，to变成第三方
          for (let i = 0; i < this.alertData.length; i++) {
            if (this.alertData[i].id !== 'luoma') {
              this.fromAccount = this.alertData[i]
              break
            }
          }
        } else if (item.id !== 'luoma' && this.fromAccount.id !== 'luoma') { // 两个都不是luoma，to变成luoma
          for (let i = 0; i < this.alertData.length; i++) {
            if (this.alertData[i].id === 'luoma') {
              this.fromAccount = this.alertData[i]
              break
            }
          }
        }
        this.toAccount = item
      }
    },
    switchOn () { // 切换手自动额度转换
      setTimeout(() => {
        if (this.isSwitch) { // 自动
          window.layer.msgWarn('切换到自动额度转换前，请先通过手动转换把额度转移到现金余额。')
          this.$store.dispatch(types.CHANGE_TRANMONEY_STATUS_ACTION, {'transferMoneyStatus': '0'})
        } else { // 手动
          this.$store.dispatch(types.CHANGE_TRANMONEY_STATUS_ACTION, {'transferMoneyStatus': '1'})
        }
      }, 200)
    },
    conversionToThird () {
      if (Number(this.type) === 1) {
        window.layer.msgWarn('对不起，额度转换不对试玩账号开放！')
        return
      }
      if (this.fromAccount.id === this.toAccount.id) {
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
      // if (this.moneyData.result !== undefined) {
      //   if (this.fromAccount.id !== 'luoma' && parseFloat(this.changeMoney) > parseFloat(this.moneyData.result[this.fromAccount.id + 'Money'])) { // 非现金平台转出
      //     window.layer.msgWarn(this.fromAccount.name + '余额不足!')
      //     return
      //   }
      // }
      // if (this.fromAccount.id === 'luoma' && parseFloat(this.changeMoney) > parseFloat(this.moneyData.totalmoney)) { // 现金平台转出
      //   window.layer.msgWarn(this.fromAccount.name + '余额不足!')
      //   return
      // }
      this.commitWord = '转点中...'
      var tempFromAccount = Object.assign({}, this.fromAccount)
      var tempToAccount = Object.assign({}, this.toAccount)
      this.$store.dispatch(types.CONVERSION_TO_THIRD_ACTION, {'from': this.fromAccount.id, 'to': this.toAccount.id, 'amount': this.changeMoney}).then(res => {
        this.commitWord = '提交'
        if (res.status === statusCode.statusConst.SUCCESS) {
          window.layer.msgWarn(res.msg, () => { // 转点成功重新加载转点后的数据
            this.changeMoney = ''
            let key = this.toAccount.id
            if (this.fromAccount.id !== 'luoma') {
              key = this.fromAccount.id
            }
            let param = {'api': '1', 'key': key}
            this.initData(param)
            this.fromAccount = tempFromAccount
            this.toAccount = tempToAccount
          })
        }
      })
    },
    initData (param) {
      if (param === undefined) {
        param = {'api': '1'}
      }
      this.$store.dispatch(types.MONEYCONVERSION_ACTION, param).then(res => {
        if (res.status === statusCode.statusConst.SUCCESS) {
          this.showPage = true // 展示页面
          // this.moneyData = res.data
          this.moneyData.TRANSFER_STATUS = res.data.TRANSFER_STATUS
          this.moneyData.platformMoney = res.data.platformMoney
          this.moneyData.totalmoney = res.data.totalmoney
          let list = JSON.parse(JSON.stringify(res.data.API_FROM))
          delete list.luoma
          this.$set(this, 'PlatformList', list)

          if (Number(res.data.TRANSFER_STATUS) === 1) { // 展示手动额度转化
            this.isSwitch = false
          } else {
            this.isSwitch = true
          }

          let apiFrom = []
          for (let key in res.data.API_FROM) {
            if (key !== 'luoma') { // 重新组装现金余额  对应Luoma
              apiFrom.push({'id': key, 'name': res.data.API_FROM[key]})
            }
          }
          res.data.API_FROM = this.accountInfo.concat(apiFrom)
          // res.data.API_FROM = apiFrom
          this.setFromAccount(res.data.API_FROM)

          let apiTo = []
          for (let key in res.data.API_TO) {
            if (key !== 'luoma') { // 重新组装现金余额  对应Luoma
              apiTo.push({'id': key, 'name': res.data.API_TO[key]})
            }
          }
          res.data.API_TO = this.accountInfo.concat(apiTo)
          this.setToAccount(res.data.API_TO)
          this.moneyData.API_FROM = res.data.API_FROM
          this.moneyData.API_TO = res.data.API_TO
          // res.data.API_TO = apiTo
        }
      })
    },
    setFromAccount (param) {
      if (!this.fromAccount.id) {
        this.fromAccount = param[0]
      }
    },
    setToAccount (param) {
      if (!this.toAccount.id) {
        if (param.length > 1) {
          this.toAccount = param[1]
        }
      }
    },
    /** @augments
     * 获取第三方余额
     */
    getThirdMoney () {
      let $this = this
      window.$.ajax({
        'type': 'post',
        'url': '/api/wap/moneyConversion/getThirdMoney' + '?t=' + new Date().getTime(),
        'dataType': 'json',
        'contentType': 'application/json',
        'data': JSON.stringify({
          'api': '1'
        }),
        'success': (_res) => {
          $this.$set($this.moneyData, 'result', _res.data)
        }
      })
    }
  },
  mounted () {
    window.indexMain.mountedRemoveDoms() // 删除多余dom（防止自动刷新时，多余的dom不被删除）
    this.initData()
    this.getThirdMoney()
  },
  computed: {
    type () { // 1:试玩
      return this.$store.state.home.type
    }
  }
}
</script>
