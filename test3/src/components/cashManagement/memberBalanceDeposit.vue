<template>
    <div class="mainBox">
        <div class="list-part-out">
            <dl class="public-list clearfix">
                  <!--添加下级代理新增-->
                <dd @click="jumpUrl('/m/queryAccount')" class="common-item">
                    <h5 class="title">会员选择</h5>
                    <p class="con-txt" v-if="chooseMember === null">请选择直属会员<i class="yo-icon icon-next"></i></p>
                    <p class="con-txt" v-else>{{chooseMember.account}}<i class="yo-icon icon-next"></i></p>
                </dd>
                <dd class="common-item">
                    <h5 class="title">现金余额</h5>
                    <p class="con-txt subText">
                        {{this.memberMoney | moneyFilter}}
                    </p>
                </dd>
                <!--end-->
                <dd class="common-item magt10">
                    <h5 class="title">存入金额</h5>
                    <p class="con-txt">
                        <input type="text" v-model="depositMoney" style="width: 122px;"
                            class="input-type2" @input="calculationMoney(depositMoney)" maxlength="14"
                            placeholder="请输入存入金额"/>
                    </p>
                </dd>
                <dd class="common-item">
                  <h5 class="title">存款优惠</h5>
                    <p class="con-txt">
                      <label class="mint-switch">
                        <span class="item-nums">{{depositPre | moneyFilter}}&nbsp;&nbsp;</span>
                        <input type="checkbox" class="mint-switch-input"
                            v-model="depositPreStatus" :disabled="depositPreDisabled"
                            @click="switchOn()"/>
                        <span class="mint-switch-core"></span>
                        <div class="mint-switch-label"></div>
                      </label>
                  </p>
                </dd>
                <dd class="common-item">
                    <h5 class="title">汇款优惠</h5>
                    <p class="con-txt">
                        {{otherPre | moneyFilter}}
                    </p>
                </dd>
                <dd class="common-item">
                    <h5 class="title">综合稽核打码量</h5>
                    <p class="con-txt">
                        <label class="mint-switch">
                            <span class="item-nums">{{compBet | moneyFilter}} &nbsp;&nbsp;</span>
                            <input type="checkbox" class="mint-switch-input"
                                v-model="compBetCheckStatus" :disabled="compBetCheckDisabled"/>
                            <span class="mint-switch-core"></span>
                            <div class="mint-switch-label"></div>
                        </label>
                    </p>
                </dd>
                <dd class="common-item">
                    <h5 class="title">常态性稽核</h5>
                    <p class="con-txt">
                        {{ normalStatus ? '是' : '否' }}
                    </p>
                </dd>
                <dd class="common-item magt10">
                    <h5 class="title">安全码</h5>
                    <p class="con-txt">
                        <input type="text" style="width: 90px;" class="input-type2"
                         placeholder="未绑定请留空" v-model="code" @input="cleanInput()" maxlength="6">
                    </p>
                </dd>
                <dd class="common-item flex-direction-co magt10" style="height: 106px;">
                    <h5 class="title">备注</h5>
                    <p class="con-txt txtarea">
                        <textarea v-model="remark" maxlength="100"
                            placeholder="非必填，最多输入100字">
                        </textarea>
                    </p>
                </dd>
            </dl>
            <div class="note-item flex-direction-co">
                <h5>注:</h5>
                <p>*汇款优惠和常态性优惠稽核不可修改，存款/汇款优惠不扣除自身余额。</p>
                <p>*为了您的资金安全，会员余额存入前请绑定安全码！</p>
            </div>
            <div class="btn-box btn-block text-center">
                <a href="javascript:void(0)" class="btn btn-lg btn-primary" @click="saveSetByAgentMmeber()">
                    {{buttonText}}
                </a>
            </div>
        </div>
    </div>
</template>
<script>
import * as cashTypes from '../../store/cash/type'
import * as statusCode from '../../utils/status_const'
export default {
  data () {
    return {
      depositMoney: '', // 存入金额
      remark: '', // 备注
      depositPre: '', // 存款优惠
      depositPreStatus: false, // 存款优惠勾选框
      depositPreDisabled: false, // 存款优惠勾选框
      otherPre: '', // 其他优惠
      compBet: '', // 综合打码量稽核
      compBetCheckStatus: false, // 综合打码量稽核勾选框
      compBetCheckDisabled: true, // 综合打码量稽核勾选框
      normalStatus: null, // 常态性稽核
      isOpen: true, // 用于限制点击过快处理
      buttonText: '确定', // 按钮文字
      code: '' // 安全码
    }
  },
  computed: {
    chooseMember () {
      return this.$store.state.member.chooseMember
    },
    memberMoney () {
      return this.$store.state.member.memberMoney
    },
    mnyCodeQuantitySet () {
      return this.$store.state.member.mnyCodeQuantitySet
    },
    token () {
      return this.$store.state.member.token
    }
  },
  methods: {
    jumpUrl (url) {
      // 将跳转的路由记录，会员选择完成之后跳转
      this.$set(this.$store.state.member, 'jumpUrl', '/m/cash')
      this.$router.push(url)
    },
    // 计算金额
    calculationMoney (depositMoney) {
      if (depositMoney === '' || depositMoney === null) {
        this.depositMoney = ''
        return
      }
      // 选中存款优惠时会为null，单独处理
      if (depositMoney === undefined) {
        depositMoney = this.depositMoney
      }
      let value = depositMoney.replace(/[^\d.]/g, '') // 清除"数字"和"."以外的字符
      value = value.replace(/^\./g, '') // 验证第一个字符是数字而不是
      value = value.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
      value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
      value = (value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
      if (value === '' || value === null) {
        this.depositMoney = ''
        return
      }
      value = value.trim() // 去掉空格
      if (value !== '') { // 去掉前缀多出的0
        var nmArr = value.split('.')
        if (nmArr[0] !== '') {
          nmArr[0] = Number(nmArr[0])
        }
        value = nmArr.join('.')
      }
      this.depositMoney = value

      this.depositPre = 0.00
      this.otherPre = 0.00
      this.compBet = 0.00

      if (this.depositMoney && this.mnyCodeQuantitySet) {
        var res = 0
        // 不小于最小汇款优惠金额
        if (this.depositMoney >= this.mnyCodeQuantitySet.opreStandardCompany) {
          res = this.depositMoney * this.mnyCodeQuantitySet.oprePerCompany * 0.01
          var otherPre = this.round2(res, 2)
          // 超过最大汇款优惠金额
          if (otherPre > this.mnyCodeQuantitySet.opreUpCompany) {
            otherPre = this.mnyCodeQuantitySet.opreUpCompany
          }
          this.otherPre = otherPre
        }

        // 不小于最小存款优惠
        if (this.mnyCodeQuantitySet.preStandardCompany <= this.depositMoney) {
          // 允许勾选存款优惠
          this.depositPreDisabled = false
          // 勾选存款优惠
          this.depositPreStatus = true

          res = this.depositMoney * this.mnyCodeQuantitySet.prePerCompany * 0.01
          var depositPre = this.round2(res, 2)
          // 大于最低存款优惠
          if (depositPre > this.mnyCodeQuantitySet.preUpCompany) {
            depositPre = this.mnyCodeQuantitySet.preUpCompany
          }
          this.depositPre = depositPre

          // 打开综合打码量稽核，计算打码量
          if (this.mnyCodeQuantitySet.statusCompCompany === 1) {
            this.compBetCheckStatus = true
            res = (parseFloat(this.depositMoney) + parseFloat(depositPre)) * this.mnyCodeQuantitySet.numCompCompany
            this.compBet = this.round2(res, 2)
          }
        } else {
          this.compBetCheckStatus = false
          this.depositPreStatus = false
          this.compBetCheckDisabled = true
          this.depositPreDisabled = true
        }
      }
    },
    cleanInput () {
      if (this.code === '' || this.code === null) {
        return
      }
      this.code = this.code.replace(/[^0-9]+/g, '')
    },
    // 选中存款优惠
    switchOn () {
      setTimeout(() => {
        if (this.mnyCodeQuantitySet) {
          if (this.depositPreStatus) {
            // $("#compBetCheckStatus").removeAttr('disabled');
            // 打开综合打码量稽核，计算打码量
            if (this.mnyCodeQuantitySet.statusCompCompany === 1) {
              this.compBetCheckStatus = true
            }
            this.calculationMoney()
          } else {
            this.compBetCheckStatus = false
            this.compBet = 0
            this.depositPre = 0
            this.compBetCheckDisabled = true
            this.compBetCheckStatus = false
          }
        }
      }, 200)
    },
    // 提交会员余额存入
    saveSetByAgentMmeber () {
      if (!this.chooseMember) {
        window.layer.msgWarn('请先选择会员')
        return
      }
      if (!this.chooseMember.id) {
        window.layer.msgWarn('该用户不存在')
        return
      }
      if (!this.depositMoney) {
        window.layer.msgWarn('请输入存入金额！')
      }
      if (!this.check()) return
      let $this = this
      if (this.isOpen) {
        this.buttonMsg = '提交中...'
        let param = {
          'memberId': this.chooseMember.id,
          'depositMoney': this.depositMoney,
          'depositMoneyRemark': this.remark,
          'depositPreStatus': this.depositPreStatus ? 1 : 0,
          'memberName': this.chooseMember.account,
          'legendCode': this.code,
          'x_token': this.token
        }
        this.$store.dispatch(cashTypes.SAVESETBYAGENTMEMBER_ACTION, param).then(res => {
          if (res.code === statusCode.statusConst.SUCCESS) {
            window.layer.msgWarn('存入成功！')
            $this.reset()
          }
        })
        // 限制两秒才允许再次点击
        setTimeout(() => {
          this.isOpen = true
          this.buttonMsg = '确定'
        }, 1500)
      }
    },
    // 重置
    reset () {
      this.depositMoney = ''
      this.remark = ''
      this.code = ''

      this.$store.state.member.chooseMember = null
      this.$store.state.member.mnyCodeQuantitySet = null
      this.$store.state.member.memberMoney = 0
      this.$store.state.member.xtoken = ''

      this.compBet = 0
      this.depositPre = 0
      this.otherPre = 0

      this.compBetCheckStatus = false
      this.depositPreStatus = false
      this.compBetCheckDisabled = true
      this.depositPreDisabled = true
    },
    /**
       * 数字格式化 2位
       * author: adaf
       */
    round2 (v, e) {
      let d = parseFloat(v)
      if (isNaN(d))d = 0.0
      return Math.floor(d * 100) / 100
    },
    check () {
      // 删除后面的.
      var nmArr = this.depositMoney.split('')
      var _len = nmArr.length - 1
      if (nmArr[_len] === '.') nmArr[_len] = ''
      this.depositMoney = nmArr.join('')
      let status = true
      let len = parseFloat(this.depositMoney).toFixed().length
      if (!this.depositMoney) status = false
      if (len > 14) { // 超过14位数字
        status = false
      }
      return status
    }
  },
  mounted () {
    // 存款设定
    if (this.mnyCodeQuantitySet) {
      // 未打开常态性稽核
      if (this.mnyCodeQuantitySet.statusNormalCompany === 1) {
        this.normalStatus = true
      } else {
        this.normalStatus = false
      }
    }
    this.$store.state.home.headerType = 5
    this.$store.state.home.headTitle = '会员余额存入'
  }
}
</script>
