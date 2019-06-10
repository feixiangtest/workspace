<template>
    <div class="floatPage" v-if="isfloatPage">
        <div class="index-header">
            <div class="yow-content yow-relative">
                <div class="head-left" @click="close()">
                    <i class="yo-icon icon-back"></i>
                </div>
                <div class="head-title">
                    <span>{{floatTitle}}</span>
                </div>
                <div class="head-right">
                    <!-- <i class="yo-icon"></i> -->
                </div>
            </div>
        </div>
        <div class="mainBox">

            <!-- 基本资料-返点比例 -->
            <div v-if="floatPageType === 1">
                <table class="yo-table table-bg">
                    <thead>
                        <tr>
                            <th>返点平台</th>
                            <th>最低返点</th>
                            <th>最高返点</th>
                        </tr>
                    </thead>
                    <tbody v-for="(item, key) in atRebates" :key="key">
                        <tr>
                            <td>{{item.platformName}}</td>
                            <td>{{item.minRebate}}%</td>
                            <td>{{item.maxRebate}}%</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- 基本资料-修改密码 -->
            <div v-if="floatPageType === 2">
                <dl class="public-list clearfix">
                    <dd class="common-item">
                        <h5 class="title">原密码</h5>
                        <p class="con-txt">
                            <input type="password" class="input-type1" v-model="oldPwd" placeholder="6-12位字母和数字的组合">
                        </p>
                    </dd>
                    <dd class="common-item">
                        <h5 class="title">新密码</h5>
                        <p class="con-txt">
                            <input type="password" class="input-type1" v-model="newPwd" placeholder="6-12位字母和数字的组合">
                        </p>
                    </dd>
                    <dd class="common-item">
                        <h5 class="title">确认密码</h5>
                        <p class="con-txt">
                            <input type="password" class="input-type1" v-model="confirmPwd" placeholder="6-12位字母和数字的组合">
                        </p>
                    </dd>
                </dl>
                <div class="btn-box btn-block text-center">
                    <a href="javascript:void(0)" class="btn btn-lg btn-primary" @click="subBut()">确定</a>
                </div>
            </div>

            <!-- 现金流查询-现金流详情页 -->
            <div v-if="floatPageType === 3">
                <dl class="public-list clearfix">
                    <!--查看详情列表-->
                    <dd class="common-item">
                        <h5 class="title">账号</h5>
                        <p class="con-txt subText">{{cashDetail.account}}</p>
                    </dd>
                    <dd class="common-item">
                        <h5 class="title">交易类型</h5>
                        <p class="con-txt subText" v-html="cashDetail.tradeTypeName"></p>
                    </dd>
                    <dd class="common-item">
                        <h5 class="title">金额</h5>
                        <p class="con-txt subText">{{cashDetail.tradeLimit | moneyFilter}}</p>
                    </dd>
                    <dd class="common-item">
                        <h5 class="title">小计</h5>
                        <p class="con-txt subText">{{cashDetail.existingLimit | moneyFilter}}</p>
                    </dd>
                    <dd class="common-item">
                        <h5 class="title">交易日期</h5>
                        <p class="con-txt subText">{{cashDetail.createDateTime}}</p>
                    </dd>
                    <dd class="common-item">
                        <h5 class="title">单号</h5>
                        <p class="con-txt subText">{{cashDetail.bettingCode}}</p>
                    </dd>
                    <!--end-->
                    <dd class="common-item flex-direction-co" style="margin-top: 10px;height: 106px;">
                        <h5 class="title">备注</h5>
                        <p class="con-txt txtarea">
                            <textarea readonly v-html="cashDetail.remarkContext"></textarea>
                        </p>
                    </dd>
                </dl>
            </div>

            <!-- 代理返水详情-返水详情页 -->
            <div v-if="floatPageType === 4">
                <dl class="public-list clearfix">
                    <!--查看详情列表-->
                    <dd class="common-item">
                        <h5 class="title">返水事件</h5>
                        <p class="con-txt subText">
                            {{rebatesDetail.eventName}}
                        </p>
                    </dd>
                    <dd class="common-item">
                        <h5 class="title">直属下级代理返水</h5>
                        <p class="con-txt subText">
                           {{rebatesDetail.subAgentRebate | moneyFilter}}
                        </p>
                    </dd>
                    <dd class="common-item">
                        <h5 class="title">直属会员返水</h5>
                        <p class="con-txt subText">
                            {{rebatesDetail.subMemberRebate | moneyFilter}}
                        </p>
                    </dd>
                    <dd class="common-item">
                        <h5 class="title">返水金额</h5>
                        <p class="con-txt subText">
                            {{rebatesDetail.totalRebate | moneyFilter}}
                        </p>
                    </dd>
                </dl>
            </div>


        </div>
    </div>
</template>
<script>
import * as userTypes from '../../store/user/type'
import * as statusCode from '../../utils/status_const'
export default {
  props: {
    atRebates: {}, // 返点比例
    isfloatPage: Boolean, // 显示浮动单页
    // 显示类型 1=基本资料-返点比例，2=基本资料-修改密码
    floatPageType: '',
    floatTitle: String, // 浮动单页的标题
    cashDetail: {}, // 现金流详情页
    rebatesDetail: {} // 代理返水详情页
  },
  data () {
    return {
      oldPwd: '', // 旧密码
      newPwd: '', // 新密码
      confirmPwd: '' // 确定密码
    }
  },
  mounted () {
  },
  methods: {
    // 校验密码是否格式正确
    checkPwd (v, t) {
      if (!v) {
        window.layer.msgWarn('请输入' + t + '密码')
        return false
      }
      if (v.length < 6) {
        window.layer.msgWarn(t + '密码长度不能少于6个字')
        return false
      }
      return true
    },
    // 校验新旧确定密码是否相同
    checkAllPwd () {
      if (this.oldPwd === this.newPwd) {
        window.layer.msgWarn('新密码不能和原密码一致，请重新设置')
        return false
      }
      if (this.confirmPwd !== this.newPwd) {
        window.layer.msgWarn('确认新密码与新密码输入不一致')
        return false
      }
      return true
    },
    clearInfo () {
      this.oldPwd = ''
      this.newPwd = ''
      this.confirmPwd = ''
    },
    subBut () {
      if (!this.checkPwd(this.oldPwd, '原')) { return }
      if (!this.checkPwd(this.newPwd, '新')) { return }
      if (!this.checkPwd(this.confirmPwd, '确认新')) { return }
      if (!this.checkAllPwd()) { }
      let param = {
        'oldPwd': this.oldPwd,
        'newPwd': this.newPwd
      }
      this.$store.dispatch(userTypes.UPDATEPWD_ACTION, param).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          this.clearInfo()
          window.layer.msgWarn('修改成功')
        }
      }).catch(rej => {
        window.layer.msgWarn(rej.msg)
      })
    },
    close () {
      this.$store.state.user.isfloatPage = false
      this.$store.state.user.floatPageType = ''
    }
  }
}
</script>


