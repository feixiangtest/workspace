<template>
    <div class="mainBox">
        <div class="list-part-out">
            <div class="list-part">
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
                    <dd class="common-item" style="margin-top: 10px;">
                        <h5 class="title">存入金额</h5>
                        <p class="con-txt">
                            <input type="text" class="input-type2"
                                placeholder="请输入存入金额" @input="inputMoney(depositMoney)" maxlength="14"
                                v-model="depositMoney">
                        </p>
                    </dd>
                    <dd class="common-item">
                        <h5 class="title">我的返水</h5>
                        <p class="con-txt subText">
                            {{agentMoney | moneyFilter}}
                        </p>
                    </dd>
                    <dd class="common-item" style="margin-top: 10px;">
                        <h5 class="title">安全码</h5>
                        <p class="con-txt">
                            <input type="text" class="input-type2" @input="cleanInput()"
                             placeholder="未绑定请留空" v-model="code" maxlength="6">
                        </p>
                    </dd>
                    <dd class="common-item flex-direction-co" style="margin-top: 10px;height: 106px;">
                        <h5 class="title">备注</h5>
                        <p class="con-txt txtarea">
                            <textarea v-model="remark" maxlength="100"
                                placeholder="非必填，最多输入100字"></textarea>
                        </p>
                    </dd>
                </dl>
            </div>
            <div class="note-item flex-direction-co">
            	<h5>注:</h5>
            	<p>* 为了您的资金安全，代理返水转出前请绑定安全码！</p>
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
    },
    agentMoney () {
      return this.$store.state.cash.agentMoney
    }
  },
  methods: {
    cleanInput () {
      if (this.code === '' || this.code === null) {
        return
      }
      this.code = this.code.replace(/[^0-9]+/g, '')
    },
    jumpUrl (url) {
      // 将跳转的路由记录，会员选择完成之后跳转
      this.$set(this.$store.state.member, 'jumpUrl', '/m/agentReturnOut')
      this.$router.push(url)
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
      if (!status) window.layer.msgWarn('请输入存入金额！')
      return status
    },
    // 计算金额
    inputMoney (depositMoney) {
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
      if (!this.check()) return
      let $this = this
      if (this.isOpen) {
        this.buttonMsg = '提交中...'
        let param = {
          'memberId': this.chooseMember.id,
          'depositMoney': this.depositMoney,
          'depositMoneyRemark': this.remark,
          'memberName': this.chooseMember.account,
          'legendCode': this.code,
          'x_token': this.token
        }
        this.$store.dispatch(cashTypes.SAVESETBYAGENT_ACTION, param).then(res => {
          if (res.code === statusCode.statusConst.SUCCESS) {
            this.$store.dispatch(cashTypes.AGENTMONEY_ACTION).then(res => {})
            window.layer.msgWarn('转出成功！')
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
    }
  },
  mounted () {
    this.$store.dispatch(cashTypes.AGENTMONEY_ACTION).then(res => {})
    this.$store.state.home.headerType = 5
    this.$store.state.home.headTitle = '代理返水转出'
  }
}
</script>
