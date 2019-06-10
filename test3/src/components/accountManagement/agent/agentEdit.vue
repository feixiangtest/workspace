<template>
  <div class="mainBox yo10">
    <div class="list-part-out">
      <div class="list-part">
        <div class="list-title yo-title clearfix">
            <div class="float-l">
              <svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  width="20px" height="20px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
                <g>
                  <path fill="#C7CFFF" d="M46.967,38.34c0,1.598-1.299,2.796-2.797,2.796H26.398l-9.785,5.491l-2.495-5.491H5.73
                    c-1.598,0-2.795-1.298-2.795-2.796V5.692c0-1.598,1.297-2.796,2.795-2.796H44.17c1.598,0,2.797,1.298,2.797,2.796V38.34z"/>
                  <path fill="#FFFFFF" d="M2.936,2.597V32.35c0,1.599,1.297,2.896,2.795,2.896h8.388l2.495,5.591l9.785-5.591H44.17
                    c1.598,0,2.797-1.298,2.797-2.896V2.597H2.936z"/>
                  <path fill="#557FDD" d="M44.17,0.001H5.73c-3.096,0-5.592,2.596-5.592,5.69v32.647c0,3.096,2.496,5.691,5.69,5.691h6.489
                    l2.396,5.29c0,0,0.699,1.1,2.098,0.5l10.383-5.892H44.17c3.096,0,5.691-2.495,5.691-5.689V5.69
                    C49.861,2.597,47.266,0.001,44.17,0.001z M46.967,38.34c0,1.598-1.299,2.796-2.797,2.796H26.398l-9.785,5.491l-2.495-5.491H5.73
                    c-1.598,0-2.795-1.298-2.795-2.796V5.692c0-1.598,1.297-2.796,2.795-2.796H44.17c1.598,0,2.797,1.298,2.797,2.796V38.34z"/>
                  <g>
                    <path fill="#F3B301" d="M27.896,29.255H12.919c-0.799,0-1.397,0.599-1.397,1.396v0.101c0,0.799,0.6,1.396,1.397,1.396h14.978
                      c0.799,0,1.396-0.599,1.396-1.396v-0.101C29.293,29.953,28.596,29.255,27.896,29.255z"/>
                    <path fill="#F3B301" d="M36.98,19.67H12.918c-0.799,0-1.396,0.599-1.396,1.396v0.101c0,0.799,0.599,1.397,1.396,1.397H36.98
                      c0.799,0,1.398-0.6,1.398-1.397v-0.101C38.379,20.269,37.68,19.67,36.98,19.67z"/>
                    <path fill="#F3B301" d="M36.98,9.985H12.918c-0.799,0-1.396,0.6-1.396,1.397v0.1c0,0.8,0.599,1.398,1.396,1.398H36.98
                      c0.799,0,1.398-0.6,1.398-1.398v-0.1C38.379,10.684,37.68,9.985,36.98,9.985z"/>
                  </g>
                </g>
              </svg>
            </div>&nbsp;&nbsp;基本信息
          </div>
        <dl class="public-list clearfix">
          <!--end-->
          <dd class="common-item">
            <h5 class="title">用户名</h5>
            <p class="con-txt">
              <span>{{ agentEdit.agentAccount}}</span>
            </p>
          </dd>
          <dd class="common-item">
            <h5 class="title">密码</h5>
            <p class="con-txt">
              <input type="password" placeholder="6-12位字母和数字的组合"
                     @blur="checkPw()" class="input-type2" style="width:160px;"
                     v-model="info.pwd" maxlength="12">
            </p>
          </dd>
          <dd class="common-item">
            <h5 class="title">昵称</h5>
            <p class="con-txt">
              <input type="text" class="input-type2" :placeholder="agentEdit.agentAccountName"
                     v-model="info.agentAccountName" maxlength="20">
            </p>
          </dd>
          <dd class="common-item">
            <h5 class="title">账号状态</h5>
            <p class="con-txt">
              <label class="mint-switch">
                <input type="checkbox" class="mint-switch-input" v-model="agentEdit.useStatus"
                       :disabled="limtStatus"
                       @change="info.useStatus = agentEdit.useStatus">
                <span class="mint-switch-core"></span>
                <div class="mint-switch-label"></div>
              </label>
            </p>
          </dd>
          <dd class="common-item">
            <h5 class="title">投注状态</h5>
            <p class="con-txt">
              <label class="mint-switch"><input type="checkbox" class="mint-switch-input"
                                                v-model="agentEdit.bettingStatus"
                                                :disabled="limtBet"
                                                @change="info.bettingStatus = agentEdit.bettingStatus">
                <span class="mint-switch-core"></span>
                <div class="mint-switch-label"></div>
              </label>
            </p>
          </dd>
          <dd class="common-item">
            <h5 class="title">推广码</h5>
            <p class="con-txt">
              <a href="javascript:void(0);" class="randomWord btn btn-xs btn-default" @click="randomWord()"> 随机生成 </a>
              <!-- <span style="width: 50px;">{{ agentEdit.agentNo}}</span> -->
              <input type="text" class="input-type1" v-model="agentEdit.agentNo" style="width: 60px;" >
            </p>
          </dd>
          <dd class="common-item">
            <h5 class="title">余额</h5>
            <p class="con-txt">
              <span>{{ agentEdit.balance}}</span>
            </p>
          </dd>
          <dd class="common-item">
            <h5 class="title">返水金额</h5>
            <p class="con-txt">
              <span>{{ agentEdit.rebateBalance }}</span>
            </p>
          </dd>
          <dd class="common-item">
            <h5 class="title">登录次数</h5>
            <p class="con-txt">
              <span>{{ agentEdit.loginNum }}</span>
            </p>
          </dd>
        </dl>
      </div>
      <div class="list-part">
        <div class="list-title yo-title clearfix">
            <div class="float-l">
              <svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  width="20px" height="20px" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
                <g>
                  <circle fill="#C7CFFF" cx="24.4" cy="25" r="23.5"/>
                  <path fill="#FFFFFF" d="M30.301,41.6c6.199,0,11.799-2.398,16.1-6.199c1.602-3.199,2.5-6.801,2.5-10.601c0-13-10.5-23.5-23.5-23.5
                    c-7.199,0-13.6,3.2-17.899,8.3c-0.8,2.5-1.3,5.101-1.3,7.801C6.2,30.8,17,41.6,30.301,41.6z"/>
                  <path fill="#557FDD" d="M25,0C11.2,0,0,11.2,0,25s11.2,25,25,25c13.801,0,25-11.2,25-25S38.801,0,25,0z M25,47.2
                    c-12.3,0-22.2-10-22.2-22.2S12.7,2.8,25,2.8c12.199,0,22.199,9.9,22.199,22.2C47.1,37.2,37.199,47.2,25,47.2z"/>
                  <g>
                    <path fill="#F3B301" d="M30.699,14.1C30,13.7,29.199,14,28.801,14.7L18.1,33.9c-0.4,0.699-0.1,1.5,0.6,1.898
                      c0.701,0.4,1.5,0.102,1.9-0.6l10.6-19.301C31.6,15.4,31.301,14.5,30.699,14.1z"/>
                    <path fill="#F3B301" d="M32.699,23.8c-2.799,0-5,2.3-5,5.2s2.301,5.2,5,5.2c2.701,0,5-2.3,5-5.2S35.4,23.8,32.699,23.8z
                      M32.699,31.4C31.5,31.4,30.5,30.299,30.5,29s1-2.4,2.199-2.4c1.201,0,2.201,1.102,2.201,2.4S33.9,31.4,32.699,31.4z"/>
                    <path fill="#F3B301" d="M22.1,20.1c0-2.899-2.299-5.199-5-5.199c-2.699,0-5,2.3-5,5.199c0,2.9,2.301,5.2,5,5.2
                      C19.801,25.3,22.1,23,22.1,20.1z M17,22.5c-1.2,0-2.2-1.1-2.2-2.4c0-1.3,1-2.399,2.2-2.399c1.199,0,2.199,1.1,2.199,2.399
                      C19.199,21.4,18.301,22.5,17,22.5z"/>
                  </g>
                </g>
              </svg>
            </div>&nbsp;&nbsp;返点设置
          </div>
        <dl class="public-list clearfix" v-for="(item,index) in agentEdit.rebateList" :key="index">
          <dd class="common-item">
            <h5 class="title">{{ item.platformName }}</h5>
            <p class="con-txt">
              <input class="small input-type1" type="number" v-model="item.minRebate" @blur="keep2" :placeholder="'最低返点' + item.minRebateLimit">
              <span>% —</span>
              <input class="small input-type1" type="number" v-model="item.maxRebate" @blur="keep2" :placeholder="'最高返点' + item.maxRebateLimit"><span>%</span>
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
  import * as statusCode from '../../../utils/status_const'
  import * as agentTypes from '../../../store/agent/type'
  import initData from '@/plugins/vueTpl/initData'
  import verify from '@/plugins/verify.js'
  import rebate from '@/plugins/rebate.js'
  import utils from '@/plugins/utils.js'
  export default {
    name: 'agentEdit',
    data () {
      return {
        limtBet: false,
        limtStatus: false,
        accountId: '',
        info: { // 统一使用 info 保存信息
          pwd: '',
          agentAccountName: ''
        },
        searchVal: '' // 上一页的查询条件
        //  agentNo: this.agentEdit.agentNo
      }
    },
    mixins: [initData, rebate],
    components: { },
    computed: {
      ...mapState({
        agentEdit: state => state.agent.agentEdit // 基本资料
      })
    },
    methods: {
      Permission () {
        // 权限检查 1. 投注状态  2. 进入权限
        this.limtBet = this.$store.state.home.otherData['account:agent:updateBettingStatus'] ? null : true
        this.limtStatus = this.$store.state.home.otherData['account:agent:updateUseStatus'] ? null : true
      },
      initData (id) {
        this.accountId = id
        this.$store.state.home.headerType = 6
        this.$store.state.home.headTitle = '修改账号'
        let param = {
          pageGroupId: 1,
          accountId: this.accountId
        }
        // 请求基本资料数据
        this.$store.dispatch(agentTypes.AGENT_EDIT_ACTION, param).then(res => {
          if (res.code === statusCode.statusConst.SUCCESS) {

          }
        })
        this.Permission()
      },
      keep2 (e) {
        if (e.target.value) {
          e.target.value = utils.keep2(e.target.value)
        }
      },
      randomWord () { // 推广码
        this.$store.state.agent.agentEdit.agentNo = window.randomWord(false, 6)
        this.info.agentNo = this.$store.state.agent.agentEdit.agentNo
      },
      checkPw () { // 密码检查
        if (!this.info.pwd) return true
        let txt = verify.checkPw.errTxt[0]
        let res = verify.checkPw(this.info.pwd)
        if (!res) {
          window.layer.msgWarn(txt)
        }
        return res
      },
      save () {
        // 提交保存的数据
        let param = {
          id: this.accountId,
          agentLevel: this.$store.state.agent.agentEdit.agentLevel
        }
        if (!this.checkPw()) return
        if (!this.info.pwd) delete this.info.pwd
        if (!this.info.agentAccountName) delete this.info.agentAccountName
        if (!this.info.agentNo) this.info.agentNo = this.$store.state.agent.agentEdit.agentNo
        if (!this.RebateCheck()) return // 检查返点 合法性
        param = window.$.extend(param, this.info)
        let atRebates = {}
        this.$store.state.agent.agentEdit.rebateList.forEach(function (val, index) {
          atRebates[`atRebates[${index}].platformCode`] = val.platformCode
          atRebates[`atRebates[${index}].gameType`] = val.gameType
          atRebates[`atRebates[${index}].accountId`] = val.accountId
          atRebates[`atRebates[${index}].maxRebate`] = val.maxRebate * 1
          atRebates[`atRebates[${index}].minRebate`] = val.minRebate * 1
        })
        param = window.$.extend(param, atRebates)
        param.bettingStatus = this.$store.state.agent.agentEdit.bettingStatus ? 0 : 1
        param.useStatus = this.$store.state.agent.agentEdit.useStatus ? 0 : 1
        //
        /**
         *  先预装数据
         *
         atRebates: this.$store.state.agent.agentEdit.rebateList

         id: 100000389
         parentId:
         pwd:
         accountName:
         useStatus: 0
         bettingStatus: 0
         atRebates[0].platformCode: AG
         atRebates[0].gameType: 1
         atRebates[0].accountId: 100000389
         atRebates[0].maxRebate: 1.00
         */
        // 验证
        let query = this.$route.query
        this.$store.dispatch(agentTypes.AGENT_UPDATE_ACTION, param).then(res => {
          if (res.code === statusCode.statusConst.SUCCESS) {
            if (res.msg) {
              window.layer.msgWarn(res.msg, () => {
                if (query.back) {
                  this.$router.push({ // 回到之前
                    path: query.back,
                    query: window.routerOjb[query.back]
                  })
                  return ''
                }
                this.$router.go(-1)
              })
            }
          }
        })
      },
      RebateCheck () {
        /* 检查返点 合法性 不合法 直接弹出
         maxRebateLimit:80
         minRebate:"26" // 修改后的值
         预设 可以通过检查
         */
        let pass = true
        let err1 = ['最低返点超过返点范围', '最低返点需小于最高返点']
        let err2 = ['最高返点超过可返点范围', '最高返点需大于最低返点']
        this.$store.state.agent.agentEdit.rebateList.forEach(function (val, index) {
          val.minRebate = utils.keep2(val.minRebate)
          val.maxRebate = utils.keep2(val.maxRebate)
        })
        this.$store.state.agent.agentEdit.rebateList.forEach(function (val, index) {
          if (!pass) { // 已经存在不通过 检查的情况 下面不需要在检查了
            return
          }
          if (val.minRebate * 1 < val.minRebateLimit) {
            window.layer.msgWarn(val.platformName + ': ' + err1[0])
            return pass = false
          }
          if (val.minRebate * 1 > val.maxRebateLimit) {
            window.layer.msgWarn(val.platformName + ': ' + err1[1])
            return pass = false
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
      }
    },
    mounted () {
      // 获取路由存储的值
      let query = this.$route.query
      //  如果路由对象不为空，将路由传的数据设置为默认值
      if (JSON.stringify(query) !== '{}') {
        this.searchVal = query.searchVal
      }
    }
  }
</script>
