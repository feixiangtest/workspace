<template>
  <div class="mainBox  yo10 membershipAdd">
    <div class="list-part-out">
      <div class="list-part">
        <div class="list-title yo-title clearfix">
          <div class="float-l">
            <svgItems :showBasicInfo='true'></svgItems>
          </div>&nbsp;&nbsp;基本信息
        </div>
        <dl class="public-list clearfix">
          <dd class="common-item">
            <h5 class="title">上级用户</h5>
            <p class="con-txt subText">
              {{ memberAdd.upAgentAccount }}
            </p>
          </dd>
          <!--添加下级代理新增-->
          <dd class="common-item">
            <h5 class="title">账号类型</h5>
            <p class="con-txt" @click="switchTab" v-if="id">会员<i class="yo-icon icon-next"></i></p>
            <p class="con-txt" v-else>会员</p>
          </dd>
          <!--end-->
          <dd class="common-item">
            <h5 class="title">
              <span class="star">*</span>
              用户名</h5>
            <p class="con-txt">
              <input type="text" class="input-type1" placeholder="请输入用户名" maxlength="12"
                v-model="info.account" @blur="checkAccount" @input="toLows()">
            </p>
          </dd>
          <dd class="common-item">
            <h5 class="title">
              <span class="star">*</span>
              密码</h5>
            <p class="con-txt">
              <input type="password" class="input-type1" placeholder="6-12位字母和数字的组合" @blur="checkPw" v-model="info.pwd" maxlength="12">
            </p>
          </dd>
          <dd class="common-item">
            <h5 class="title">
              <span class="star" v-if="this.memberAdd.isRequireRealName === 1">*</span>
              真实姓名</h5>
            <p class="con-txt">
              <input type="text" class="input-type1" placeholder="请输入1-20个字符"
                v-model="info.cardName" @input="checkcardNameTrim">
            </p>
          </dd>
          <dd class="common-item">
            <h5 class="title">
              <span class="star">*</span>
              昵称</h5>
            <p class="con-txt">
              <input type="text" placeholder="请输入1-20个字符" @blur="checkNickName" class="input-type1" v-model="info.accountName" maxlength="20">
            </p>
          </dd>
          <dd class="common-item">
            <h5 class="title">账号状态</h5>
            <p class="con-txt">
              <label class="mint-switch">
                <input type="checkbox" class="mint-switch-input" v-model="info.useStatus">
                <span class="mint-switch-core"></span> <div class="mint-switch-label"></div>
              </label>
            </p>
          </dd>
          <dd class="common-item">
            <h5 class="title">投注状态</h5>
            <p class="con-txt">
              <label class="mint-switch">
                <input type="checkbox" class="mint-switch-input" v-model="info.bettingStatus" >
                <span class="mint-switch-core"></span> <div class="mint-switch-label"></div>
              </label>
            </p>
          </dd>
        </dl>
      </div>
      <div class="list-part">
        <div class="list-title yo-title clearfix">
          <div class="float-l">
            <svgItems :showRebatesSet='true'></svgItems>
          </div>&nbsp;&nbsp;返点设置
        </div>
        <dl class="public-list clearfix" v-for="(item,index) in memberAdd.upAgentRebates" :key="index">
          <dd class="common-item">
            <h5 class="title">
              <span class="star">*</span>
              {{ item.platformName }}</h5>
            <p class="con-txt">
              <!-- <input class="small input-type1" type="text" :placeholder="'最低返点 ' + item.minRebate" @click="Rebate(index, 'min')" v-model="upRebates[index].minRebate"><span>% —</span> -->
              <input class="small input-type1 Rebate" type="number"
                     :placeholder="'返点范围 ' + item.minRebateLimit + '-' + item.maxRebateLimit"
                     @blur="keep2"
                     v-model="item.maxRebate">
              <span>%</span>
            </p>
          </dd>
        </dl>
      </div>
      <div class="btn-box btn-block text-center">
        <a href="javascript:void(0)" class="btn btn-lg btn-primary" @click="save()">保存</a>
      </div>
      <!-- 会员类型选择 -->
      <picker :isShowTab.sync='isShowTab' :slots='slots' @getSelectData='getSelectDatas' :title='picTitle'></picker>
    </div>
  </div>
</template>
<script>
  import {
    mapState
  } from 'vuex'
  import Picker from '@/components/common/picker.vue'
  import * as memberTypes from '@/store/member/type'
  import * as agentTypes from '../../../store/agent/type'
  import * as statusCode from '../../../utils/status_const'
  import svgItems from '@/components/common/svgItems.vue'
  import verify from '@/plugins/verify.js'
  import initData from '@/plugins/vueTpl/initData'
  import rebate from '@/plugins/rebate.js'
  import utils from '@/plugins/utils.js'
  export default {
    data () {
      return {
        id: '',
        memberAdd: {},
        searchQuery: '', // 搜索 {}
        accountId: '',
        addAgentOrMember: 0,
        RebateClick: [],
        info: { // 统一使用 info 保存信息
          pwd: '',
          account: '', // 用户名
          accountName: '', // 昵称
          useStatus: true,
          bettingStatus: true,
          cardName: '', // 真实姓名
          agentLevel: 2 // 添加的层级，默认2
        },
        upRebates: {
          0: {},
          1: {},
          2: {},
          3: {},
          4: {},
          5: {},
          6: {},
          7: {}
        },
        title: '',
        isShowTab: null,
        slots: [],
        picTitle: '类型'
      }
    },
    mixins: [initData, rebate], // 混合模式
    components: {
      svgItems,
      Picker
    },
    computed: {
      ...mapState({
        // memberAdd: state => state.member.memberAdd
      })
    },
    mounted () {
      // 获取路由存储的值
      let query = this.$route.query
      //  如果路由对象不为空，将路由传的数据设置为默认值
      if (JSON.stringify(query) !== '{}') {
        this.searchQuery = query
      }
    },
    methods: {
      getSelectDatas (e) {
        let _id = this.id
        if (e[0] === '代理') {
          if (_id) {
            let goPath = `/m/account/agentAdd/${_id}`
            this.$router.push({
              'path': goPath,
              'query': this.searchQuery
            })
            return ''
          }
          return ''
        }
        if (e[0] === '会员') {
          return ''
        }
      },
      switchTab () {
        this.slots = this.$store.state.home.slots
        this.showTabFn()
      },
      keep2 (e) {
        if (e.target.value) {
          e.target.value = utils.keep2(e.target.value)
        }
        this.memberAdd.upAgentRebates.forEach(function (val, index) {
          if (val.maxRebate) val.maxRebate = utils.keep2(val.maxRebate)
        })
      },
      checkPw () {
        let txt = verify.checkPw.errTxt[0]
        let res = verify.checkPw(this.info.pwd)
        if (!res) {
          window.layer.msgWarn(txt)
        }
        return res
      },
      checkNickName () {
        if (!this.info.accountName) {
          window.layer.msgWarn('请输入昵称')
          return false
        }
        return true
      },
      checkCardName () {
        // 真实姓名是否需要验证
        if (this.memberAdd.isRequireRealName !== undefined) {
          if (this.memberAdd.isRequireRealName === 1) {
            if (!this.info.cardName) {
              window.layer.msgWarn('请输入真实姓名')
              return false
            }
          }
        }
        return true
      },
      checkAccount () {
        let account = verify.account
        let a = account(this.info.account)
        if (!a && account.errTxt) {
          window.layer.msgWarn('账号为字母开头，6-12位的字母与数字组合！')
          return false
        }
        this.info.account = this.info.account.replace(/[^0-9a-zA-Z]/ig, '')
        if (!isNaN(this.info.account.slice(0, 1))) {
          window.layer.msgWarn('账号为字母开头，6-12位的字母与数字组合！')
          return false
        }
        return true
      },
      toLows () {
        this.info.account = this.info.account.toLowerCase()
      },
      lowAdd (id) {
        let param = {
          pageGroupId: 1,
          id: id
        }
        let $this = this
        // 请求会员资料数据
        this.$store.dispatch(agentTypes.AGENT_ADD_INIT, param).then(res => {
          res.data.upAgentRebates = res.data.upRebates

          $this.memberAdd = res.data || {}
          $this.memberAdd.useStatus = $this.memberAdd.useStatus === 0
          $this.memberAdd.bettingStatus = $this.memberAdd.bettingStatus === 0
          $this.memberAdd.upAgentRebates = $this.memberAdd.upRebates
        })
      },
      // ------------ 返点
      initData (id) {
        this.id = id
        this.$store.state.home.headerType = 6
        this.$store.state.home.headTitle = '添加'
        let param = {
          pageGroupId: 1
        }
        /**  代理添加 会员 如果要加到特定代理 底下
         *   当前 代理添加
         *   agentAdd
         */
        if (id) {
          this.lowAdd(id)
          return
        }
        // 请求会员资料数据
        this.$store.dispatch(memberTypes.MEMBER_ADD_ACTION, param).then(res => {
          res.data.upAgentRebates.forEach(function (val, index) {
            val.maxRebateLimit = Number(val.maxRebate).toFixed(2)
            val.minRebateLimit = Number(val.minRebate).toFixed(2)
            val.maxRebate = ''
            val.minRebate = ''
          })
          this.memberAdd = res.data || {}
          this.memberAdd.useStatus = this.memberAdd.useStatus === 0
          this.memberAdd.bettingStatus = this.memberAdd.bettingStatus === 0
        })
      },
      saveCheck () {
        let pass = true
        if (!this.checkAccount()) {
          console.log('checkAccount不对')
          return
        }
        if (!this.checkPw()) {
          console.log('checkPw')
          return
        }
        if (!this.checkCardName()) {
          console.log('checkCardName')
          return
        }
        if (!this.checkNickName()) {
          console.log('checkPw')
          return
        }
        return pass
      },
      checkcardNameTrim () {
        this.info.cardName = this.info.cardName.trim()
      },
      RebateCheck () {
        /* 检查返点 合法性 不合法 直接弹出
         maxRebateLimit:80
         minRebate:"26" // 修改后的值
         预设 可以通过检查
         */
        let pass = true
        let err2 = ['返点超过可返点范围', '请输入返点']
        this.memberAdd.upAgentRebates.forEach(function (val, index) {
          if (!pass) { // 已经存在不通过 检查的情况 下面不需要在检查了
            return
          }
          if (!val.maxRebate) {
            window.layer.msgWarn(val.platformName + ': ' + err2[1])
            return pass = false
          }
          if (val.maxRebate * 1 < val.minRebateLimit || val.maxRebate * 1 > val.maxRebateLimit) {
            window.layer.msgWarn(val.platformName + ': ' + err2[0])
            return pass = false
          }
        })
        return pass
      },
      save () {
        // 提交保存的数据
        if (!this.saveCheck()) {
          return
        }
        if (!this.RebateCheck()) return // 检查返点 合法性
        let param = {
          parentId: this.memberAdd.upAgentId,
          rate: 6, // 上级层级 固定传入6
          loginAccountRate: 5
        }
        param.agentLevel = this.memberAdd.agentLevel
        window.$.extend(param, this.info)
        let atRebates = {}
        this.memberAdd.upAgentRebates.forEach((val, index) => {
          atRebates[`atRebates[${index}].platformCode`] = val.platformCode
          atRebates[`atRebates[${index}].platformGame`] = val.platformGame
          atRebates[`atRebates[${index}].gameType`] = val.gameType
          atRebates[`atRebates[${index}].maxRebate`] = val.maxRebate * 1
        })
        if (param.cardName) delete param.cardName
        param['atMemberMessage.cardName'] = this.info.cardName
        param.bettingStatus = this.info.bettingStatus ? 0 : 1
        param.useStatus = this.info.useStatus ? 0 : 1
        window.$.extend(param, atRebates)
        this.$store.dispatch(memberTypes.MEMBER_SAVE_ACTION, param).then(res => {
          if (res.code === statusCode.statusConst.SUCCESS) {
            window.layer.msgWarn('添加会员成功', () => {
              let go = this.id ? '/m/account/agent/0' : '/m/account/membership/0'
              this.$router.push({ 'path': go })
            })
          }
        })
      }
    }
  }
</script>
