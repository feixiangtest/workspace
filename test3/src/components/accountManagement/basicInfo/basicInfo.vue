<template>
    <div class="mainBox basicInfo">
        <!-- 用户基本模块 -->
        <div class="yow-content basic-info uesr-info">
            <div class="basic-details">
                <div class="head-photo">
                    <img src="../../../assets/img/user/head-photo.jpg" alt="">
                </div>
                <div class="head-name">
                    <h2>{{userInfo.account}}</h2>
                    <p>最后登录时间：{{userInfo.loginTime}}</p>
                </div>
            </div>
            <div class="basic-user-info">
                <div class="yow info-box-three">
                    <div class="img-cvs">
                        <!-- <i class="yo-icon icon-svg-info2"></i> -->
                        <img src="../../../assets/img/user/info-2.jpg" alt="">
                    </div>
                    <!-- <img class="img-cvs" src="../../../assets/img/user/info-2.jpg" alt=""> -->
                    <div class="amount">
                        <h4>我的返水金额</h4>
                        <span class="showy-txt">{{userInfo.money | moneyFilter}}</span>
                    </div>
                </div>
                <div class="yow info-box-four">
                    <div class="img-cvs">
                        <!-- <i class="yo-icon icon-svg-info1"></i> -->
                        <img src="../../../assets/img/user/info-1.jpg" alt="">
                        <!-- <img  src="../../../assets/img/user/info-1.svg" alt=""> -->
                    </div>
                    <div class="amount">
                        <h4>我的余额</h4>
                        <span class="showy-txt">{{userInfo.balance | moneyFilter}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="yow">
            <dl class="public-list clearfix">
                <dd class="common-item">
                    <h5 class="title">下级代理总数</h5>
                    <p class="con-txt">
                        <span class="title">{{userInfo.agentNum}}</span>
                        <i class="yo-icon">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
                    </p>
                </dd>
                <dd class="common-item">
                    <h5 class="title">下级会员总数</h5>
                    <p class="con-txt">
                        <span class="title">{{userInfo.memberNum}}</span>
                        <i class="yo-icon">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
                    </p>
                </dd>
                <dd class="common-item" @click="showRebate">
                    <h5 class="title">返点比例</h5>
                    <p class="con-txt">
                        <i class="yo-icon icon-next"></i>
                    </p>
                </dd>
                <dd class="common-item" @click="showPasswd">
                    <h5 class="title">修改密码</h5>
                    <p class="con-txt">
                        <i class="yo-icon icon-next"></i>
                    </p>
                </dd>
                <dd class="common-item">
                    <h5 class="title">推广码</h5>
                    <p class="con-txt">
                        <a href="javascript:void(0);" class="btn btn-xs btn-default" @click="autoGenerateAgentNo()">随机生成</a>&nbsp;&nbsp;
                        <input type="text" class="input-type1" v-model="agentNo" style="width: 60px;" >
                        <i class="yo-icon">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</i>
                    </p>
                </dd>
                <dd class="common-item" @click="toGoogle()" v-if="otherData['account:userInfo:bindLegendCode']">
                    <h5 class="title">安全码</h5>
                    <p class="con-txt">
                        <span class="weak-txt" v-if="bindCode">未绑定<i class="yo-icon icon-next"></i></span>
                        <span class="weak-txt" v-else>已绑定<i class="yo-icon icon-note"></i></span>
                    </p>
                </dd> 
               
            </dl>

            <div class="btn-box btn-block text-center">
                <a href="javascript:void(0)" class="btn btn-lg btn-primary" @click="subBut">确定</a>
            </div>
            <float-page :isfloatPage='isfloatPage' :atRebates='atRebates' :floatPageType='floatPageType' :floatTitle='floatTitle'></float-page>

        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import * as userTypes from '../../../store/user/type'
import * as statusCode from '../../../utils/status_const'
import floatPage from '@/components/floatPage/floatPage'

export default {
  data () {
    return {
      floatTitle: '', // 浮动单页标题
      agentNo: '', // 推广码
      oldAgentNo: '', // 旧推广码
      newAgentNo: '' // 新推广码
    }
  },
  name: 'userCenter',
  components: {
    floatPage
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo, // 基本资料
      otherData: state => state.home.otherData, // 权限管理
      atRebates: state => state.user.atRebates, // 返点比例
      isfloatPage: state => state.user.isfloatPage, // 显示浮动单页
      floatPageType: state => state.user.floatPageType, // 显示类型
      bindCode: state => state.user.bindCode // 安全码是否绑定
    })
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.$store.state.home.headerType = 2
      this.$store.state.home.headTitle = '基本资料'
      let param = {
        'pageGroupId': 1,
        'loading': 'pass'
      }
      // 请求基本资料数据
      this.$store.dispatch(userTypes.USERINFO_ACTION, param).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          this.agentNo = res.data.agentNo
          this.oldAgentNo = res.data.agentNo
        }
      })
    },
    // 验证推广码
    checkAgentNo () {
      let rex = /^[0-9A-Za-z]{6}$/
      if (!rex.test(this.agentNo)) {
        window.layer.msgWarn('只可输入6位英文、数字、英文及数字的组合，支持大小写，不支持输入特殊符号。')
        return false
      }
      return true
    },
    // 随机生成 推广码按钮
    autoGenerateAgentNo () {
      this.agentNo = window.randomWord(false, 6)
    },
    // 修改推广码 确定按钮
    subBut () {
      if (!this.checkAgentNo()) { return }
      this.newAgentNo = this.agentNo
      let param = {
        'oldAgentNo': this.oldAgentNo,
        'newAgentNo': this.newAgentNo
      }
      this.$store.dispatch(userTypes.UPDATEAGENTNO_ACTION, param).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          window.layer.msgWarn('修改成功')
        }
      })
    },
    // 显示返点比例
    showRebate () {
      this.floatTitle = '返点比例'
      this.$store.state.user.isfloatPage = true
      this.$store.state.user.floatPageType = 1
    },
    // 显示修改密码
    showPasswd () {
      this.floatTitle = '修改密码'
      this.$store.state.user.isfloatPage = true
      this.$store.state.user.floatPageType = 2
    },
    toGoogle () {
    // 如果未绑定安全码，跳去绑定安全码页面，否则弹框提示。
      if (this.bindCode) {
        this.$router.push({ path: '/m/account/securityCode' })
      } else {
        window.layer.msgWarn('已绑定安全码，若需重置安全码，请联系客服进行处理,重置成功后请重新登录代理后台,并建议同步删除APP上原有的安全码!')
      }
    }
  }
}
</script>
