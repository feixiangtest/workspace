<template>
    <div class="common-main main-box cash-password" >
        <h5 class="title">输入取款密码</h5>
        <div class="password-input" v-if="!hideText">
            <div class="in-cell-box" @click.stop="isShowkKey">{{numText[0]}}</div>
            <div class="in-cell-box" @click.stop="isShowkKey">{{numText[1]}}</div>
            <div class="in-cell-box" @click.stop="isShowkKey">{{numText[2]}}</div>
            <div class="in-cell-box" @click.stop="isShowkKey">{{numText[3]}}</div>
        </div>
        <div class="password-input" v-else>
            <div class="in-cell-box" @click.stop="isShowkKey">{{starText[0]}}</div>
            <div class="in-cell-box" @click.stop="isShowkKey">{{starText[1]}}</div>
            <div class="in-cell-box" @click.stop="isShowkKey">{{starText[2]}}</div>
            <div class="in-cell-box" @click.stop="isShowkKey">{{starText[3]}}</div>
        </div>
        <h5 class="password-hide" @click="changeType()">{{isShowText}}个人密码</h5>

        <div class="yow-content">
          <div class="yow-content">
            <div class="yow-content">
              <a href="javascript:void(0);" class="btn btn-primary btn-lg btn-block" :class="this.numText.length === 4 ? '' : 'btnBgColor'" @click="handleWithDrawMoney()">确定</a>
            </div>
          </div>
        </div>
        <!-- <div>{{numText}}</div>
        <div>{{starText}}</div> -->
        <key-board :isShow="isShow" @keyVal="getKeyVal" @close="closeKeyboard"></key-board> 

    </div>
</template>

<script>
import keyBoard from '@/components/fastCash/keyboard'
import * as type from '@m/store/payment/type'
import { setTimeout } from 'timers'
export default {
  data () {
    return {
      hideText: true,
      isShowText: '显示', // 显示与隐藏密码
      numText: '', // 取款密码存值
      starText: '', // 隐藏密码符号存储
      isShow: false, // 键盘显示与隐藏
      withDrawMoney: sessionStorage.getItem('withDrawMoney'), // 取款金额
      postLock: true, // 防止用户短时间重复点击，重复请求
      quantitySet: {} // 后台设置的取款相关的数据
    }
  },
  components: {
    keyBoard
  },
  computed: {
    onlineDraw () {
      return this.$store.state.payment.onlineDraw
    }
  },
  methods: {
    // 显示隐藏个人密码
    changeType () {
      if (this.isShowText === '隐藏') {
        this.isShowText = '显示'
        this.hideText = true
      } else {
        this.isShowText = '隐藏'
        this.hideText = false
      }
    },
    getKeyVal (val) {
      // 处理键盘传递过来的值
      if (val === 'del') { // 删除
        this.numText = this.numText.toString().substr(0, this.numText.toString().length - 1)
        this.starText = this.starText.toString().substr(0, this.starText.toString().length - 1)
      } else { // 数字
        if (this.numText.length >= 4) return
        if (!isNaN(val)) {
          this.numText += val
          this.starText += '●'
        }
      }
      console.log(this.numText, '父级取到的值')
    },
    // 打开键盘
    isShowkKey () {
      this.isShow = true
    },
    // 关闭键盘
    closeKeyboard (val) {
      this.isShow = val
    },
    handleWithDrawMoney () {
      if (this.numText.length !== 4) return false
      let param = {
        drawPwd: this.numText, // 取款密码
        currentTime: '',
        bankType: '0',
        cash: this.withDrawMoney // 取款金额
      }
      // 提交取款申请
      if (this.postLock) {
        this.postLock = false
        this.$store.dispatch(type.DRAW_MONEY_ACTION, param).then(res => {
          if (res.status === '0') {
            let cueDrawCheck = this.quantitySet.cueDrawCheck
            let moneyDrawCheck = this.quantitySet.moneyDrawCheck
            let timeNumDrawCheck = this.quantitySet.timeNumDrawCheck
            if (cueDrawCheck === 1 && this.withDrawMoney >= moneyDrawCheck) {
              let content = '您提款的金额达到' + moneyDrawCheck + '需要审核，将于' + timeNumDrawCheck + '小时内到账，请耐心等候！'
              window.layer.msgWarn(content, () => {
                this.$router.push('/wap/basicsInfo')
              })
            } else {
              window.layer.msgWarn(res.msg, () => {
                this.$router.push('/wap/basicsInfo')
              })
            }
          }
          if (res.status === '1') {
            window.layer.msgWarn(res.msg, () => {
            })
          }
        }).catch(res => {
          console.log(' DRAW_MONEY_ACTION store error')
        })
        setTimeout(() => {
          this.postLock = true
        }, 2000)
      }
    }
  },
  mounted () {
    let t = /ucbrowser/.test(navigator.userAgent.toLowerCase()) ? 500 : 0
    this.$store.state.h5Home.headerType = 0
    this.$store.dispatch('initDrawData.action', {bankType: 0}).then(res => {
      // 1 未绑定银行卡
      // 0 已绑定
      if (res.status === '0') {
        this.quantitySet = res.data.quantitySet
      }
    })
    setTimeout(() => {
      this.$store.state.h5Home.headerType = 3
      this.$store.state.h5Home.headTitle = '取款密码'
      this.$store.state.h5Home.headLeft = 'icon-back'
      this.$store.state.h5Home.headRight = ''
      this.$store.state.h5Home.showFoot = false
    }, t)
  }
}
</script>
