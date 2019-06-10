<template>
  <div class="mainBox yo10">
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
            <p class="con-txt">
              <span>{{memberEdit.upAgentAccount}}</span>
            </p>
          </dd>
          <dd class="common-item">
            <h5 class="title">账号类型</h5>
            <p class="con-txt">
              <span>会员</span>
            </p>
          </dd>
          <!--end-->
          <dd class="common-item">
            <h5 class="title">用户名</h5>
            <p class="con-txt">
              <span>{{ memberEdit.account}}</span>
            </p>
          </dd>
          <dd class="common-item">
            <h5 class="title">昵称</h5>
            <p class="con-txt">
              <input type="text" class="input-type2" :placeholder="memberEdit.accountName" v-model="info.accountName" maxlength="20">
            </p>
          </dd>
          <dd class="common-item">
            <h5 class="title">账号状态</h5>
            <p class="con-txt">
              <label class="mint-switch">
                <input type="checkbox" class="mint-switch-input" v-model="memberEdit.useStatus"
                        :disabled="limtUse"
                        @change="info.useStatus = memberEdit.useStatus">
                <span class="mint-switch-core"></span>
                <div class="mint-switch-label"></div>
              </label>
            </p>
          </dd>
          <dd class="common-item">
            <h5 class="title">投注状态</h5>
            <p class="con-txt">
              <label class="mint-switch"><input type="checkbox" class="mint-switch-input"
                                                :disabled="limtBet"
                                                v-model="memberEdit.bettingStatus"
                                                @change="info.bettingStatus = memberEdit.bettingStatus">
                <span class="mint-switch-core"></span>
                <div class="mint-switch-label"></div>
              </label>
            </p>
          </dd>
          <dd class="common-item">
            <h5 class="title">登录次数</h5>
            <p class="con-txt">
              <span>{{ memberEdit.loginNum }}</span>
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
        <dl class="public-list clearfix" v-for="(item,index) in memberEdit.rebateList" :key="index">
          <dd class="common-item">
            <h5 class="title">{{ item.platformName }}</h5>
            <p class="con-txt">
              <!-- <input class="small input-type1" type="text" v-model="item.minRebate" @click="Rebate(index, 'min')" placeholder="最低返点" readonly>
              <span>% —</span> -->
              <input class="small input-type1" style='width:130px;' :placeholder="'返点范围 '+item.minRebateLimit.toFixed(2)+'-'+item.maxRebateLimit.toFixed(2)" type="number" v-model="item.maxRebate" @blur="keep2" ><span>%</span>
            </p>
          </dd>
        </dl>
      </div>
      <div class="btn-box btn-block text-center">
        <a href="javascript:void(0)" class="btn btn-lg btn-primary" @click="save()">保存</a>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import * as memberTypes from '@/store/member/type'
  import Picker from '@/components/common/picker.vue' // 筛选返点组件
  import svgItems from '@/components/common/svgItems.vue' // svg图标
  import initData from '@/plugins/vueTpl/initData'
  import utils from '@/plugins/utils.js'
  import rebate from '@/plugins/rebate.js'
  let memberEdit = {
    name: 'memberEdit',
    data () {
      return {
        limtBet: false, // 修改中的投注状态
        limtUse: false, // 修改中的账号状态
        memberId: '',
        memberEdit: {}, // 接口获取的账号数据
        info: { // 统一使用 info 保存信息
          accountName: '', // 昵称
          agentLevel: 2 // 添加的层级，默认2
        },
        title: '',
        isShowTab: null,
        slots: [],
        searchVal: '', // 上一页的查询条件
        type: null // 保存时的跳转类型
      }
    },
    mixins: [initData, rebate], // 混合模式
    computed: {
      ...mapState({
        otherData: state => state.home.otherData // 权限管理
      })
    },
    mounted () {
      if (this.$route.params.id > 0) {
        this.memberId = this.$route.params.id
      }
      // 获取路由存储的值
      let query = this.$route.query
      //  如果路由对象不为空，将路由传的数据设置为默认值
      if (JSON.stringify(query) !== '{}') {
        this.searchVal = query.searchVal
        this.type = query.type
      }
    },
    components: {
      Picker,
      svgItems
    },
    methods: {
      Permission () {
        // 权限检查 1. 投注状态  2. 进入权限 limtUse
        //  投注状态
        this.limtBet = this.$store.state.home.otherData['account:member:updateBettingStatus'] ? null : true
        this.limtUse = this.$store.state.home.otherData['account:member:updateUseStatus'] ? null : true
      },
      // 更改头部获取基本资料数据
      initData (id) {
        this.$store.state.home.headerType = 6
        this.$store.state.home.headTitle = '修改账号'
        this.memberId = id
        let param = {
          pageGroupId: 1,
          memberId: this.memberId
        }
        this.$store.dispatch(memberTypes.MEMBER_EDIT_ACTION, param).then(res => {
          this.memberEdit = res.data || {}
          this.memberEdit.useStatus = this.memberEdit.useStatus === 0
          this.memberEdit.bettingStatus = this.memberEdit.bettingStatus === 0
          this.memberEdit.rebateList.forEach((val) => {
            val.maxRebate = Number(val.maxRebate).toFixed(2)
          })
          console.log(this.memberEdit, 'memberEdit')
        })
        this.Permission()
      },
      keep2 (e) {
        if (e.target.value) {
          e.target.value = utils.keep2(e.target.value)
        }
        this.memberEdit.rebateList.forEach(function (val, index) {
          if (val.maxRebate) val.maxRebate = utils.keep2(val.maxRebate)
        })
      },
      // 校验是否输入了用户名
      checkAccountName () {
        if (!this.info.accountName) {
          window.layer.msgWarn('请输入昵称')
          return false
        }
        return true
      },
      save () {
        // if (!this.checkAccountName()) return
        // 修改会员账号
        let param = {
          id: this.memberId
        }
        if (!this.info.accountName) delete this.info.accountName
        param = window.$.extend(param, this.info)
        let atRebates = {}
        this.memberEdit.rebateList.forEach(function (val, index) {
          atRebates[`atRebates[${index}].platformCode`] = val.platformCode
          atRebates[`atRebates[${index}].gameType`] = val.gameType
          atRebates[`atRebates[${index}].accountId`] = val.accountId
          atRebates[`atRebates[${index}].maxRebate`] = val.maxRebate * 1
          // atRebates[`atRebates[${index}].minRebate`] = val.minRebate * 1
        })
        if (!this.RebateCheck()) return // 检查返点 合法性
        param = window.$.extend(param, atRebates)
        param.bettingStatus = this.memberEdit.bettingStatus ? 0 : 1
        param.useStatus = this.memberEdit.useStatus ? 0 : 1
        console.log(param, 'param2')
        let query = this.$route.query
        this.$store.dispatch(memberTypes.UPDATE_MEMBER_ACTION, param).then(res => {
          window.layer.msgWarn('修改账号成功', () => {
            let go = this.type !== null ? '/m/account/memberDeep/' + this.memberId : '/m/account/membership/0'
            if (query.back) {
              this.$router.push({ // 回到之前
                path: query.back,
                query: window.routerOjb[query.back]
              })
              return ''
            }
            this.$router.push({
              'path': go,
              query: {
                'searchVal': this.searchVal
              }
            })
          })
        })
      },
      RebateCheck () {
        /* 检查返点 合法性 不合法 直接弹出
         maxRebateLimit:80
         minRebate:"26" // 修改后的值
         预设 可以通过检查
         */
        let pass = true
        let err2 = ['超过可返点范围！', '超过可返点范围！']
        this.memberEdit.rebateList.forEach(function (val, index) {
          val.minRebate = utils.keep2(val.minRebate)
          val.maxRebate = utils.keep2(val.maxRebate)
        })
        this.memberEdit.rebateList.forEach(function (val, index) {
          if (!pass) { // 已经存在不通过 检查的情况 下面不需要在检查了
            return
          }
          if (val.maxRebate * 1 < val.minRebateLimit) {
            window.layer.msgWarn(val.platformName + ': ' + err2[1])
            return pass = false
          }
          if (val.maxRebate * 1 > val.maxRebateLimit) {
            window.layer.msgWarn(val.platformName + ': ' + err2[0])
            return pass = false
          }
        })
        return pass
      },
      RebateSet (num) { // 设置值 不抽离出去  data 在当前 vue 环境中
        console.log('RebateSet 符合规则 赋值')
        if (!num) return
        let index = this.RebateClick[0]; let type = this.RebateClick[1]
        let valKey = ''
        // 需要设定的 max值
        if (type === 'max') valKey = 'maxRebate'
        if (type === 'min') valKey = 'minRebate'
        num = utils.keep2(num)
        this.memberEdit.rebateList[index][valKey] = num
        // 同步选择数据到 数据源
      }
    }
  }
  export default memberEdit
</script>
