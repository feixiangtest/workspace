<template>
  <div class="mainBox agentSave">
    <div class="list-part-out">
      <div class="list-part">
        <dl class="public-list clearfix">
          <dd class="common-item">
            <h5 class="title">代理</h5>
            <p class="con-txt subText">
              {{ agentEdit.agentAccount }}
            </p>
          </dd>
          <!--添加下级代理新增-->
          <dd class="common-item">
            <h5 class="title">存取</h5>
            <p class="con-txt" @click="switchTab">{{ txt }}<i class="yo-icon icon-next"></i></p>
          </dd>
          <!--end-->
          <dd class="common-item">
            <h5 class="title">金额</h5>
            <p class="con-txt">
              <input class="input-type1"  placeholder="输入金额" id="setAmount"  @input="oninput(info.amout)" @blur="check"  maxlength="14" v-model="info.amout" type="text">
            </p>
          </dd>
          <dd class="common-item">
            <h5 class="title">安全码</h5>
            <p class="con-txt">
              <input class="input-type1" type="text" placeholder="未绑定请留空" v-model="info.code"
                @input="cleanInput()" maxlength="6">
            </p>
          </dd>
        </dl>
        <p class="txt googleCode"> 注：为了您的资金安全，余额存取前请绑定安全码！ </p>
      </div>
      <div class="btn-box btn-block text-center">
        <a href="javascript:void(0)" class="btn btn-lg btn-primary" @click="save">确定</a>
      </div>
    </div>
    <picker :isShowTab.sync='isShowTab' :slots='slots' @getSelectData='getSelectDatas' :title='picTitle'></picker>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import * as statusCode from '../../../utils/status_const'
  import * as agentTypes from '../../../store/agent/type'
  import Picker from '@/components/common/picker.vue'
  import initData from '@/plugins/vueTpl/initData'
  export default {
    name: 'agentSave',
    data () {
      return {
        checkValue: '',
        accountId: '',
        picTitle: '',
        info: { // 统一使用 info 保存信息
          amout: '',
          code: ''
        },
        isShowTab: null,
        txt: '存入',
        slots: [{ // agent add 账号类型
          flex: 1,
          values: ['存入', '取出'],
          className: 'slot1',
          textAlign: 'center'
        }],
        searchVal: '' // 上一页的查询条件
        //  agentNo: this.agentEdit.agentNo
      }
    },
    components: { Picker },
    mixins: [initData],
    computed: {
      ...mapState({
        agentEdit: state => state.agent.agentEdit // 基本资料
      })
    },
    methods: {
      cleanInput () {
        if (this.info.code === '' || this.info.code === null) {
          return
        }
        this.info.code = this.info.code.replace(/[^0-9]+/g, '')
      },
      oninput (e) {
        let value = e.replace(/[^\d.]/g, '') // 清除"数字"和"."以外的字符
        value = value.replace(/^\./g, '') // 验证第一个字符是数字而不是
        value = value.replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
        value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
        value = (value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
        if (value === '' || value === null) {
          this.info.amout = ''
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
        this.info.amout = value
      },
      check () {
        // 删除后面的.
        var nmArr = this.info.amout.split('')
        var _len = nmArr.length - 1
        if (nmArr[_len] === '.') nmArr[_len] = ''
        this.info.amout = nmArr.join('')
        let status = true
        let len = parseFloat(this.info.amout).toFixed().length
        if (!this.info.amout) status = false
        if (len > 14) { // 超过14位数字
          status = false
        }
        if (!status) window.layer.msgWarn('请输入金额')
        return status
      },
      initData (id) {
        console.log('agentEdit 层级', id)
        this.accountId = id
        this.$store.state.home.headerType = 6
        this.$store.state.home.headTitle = '余额存取'
        let param = {
          pageGroupId: 1,
          accountId: this.accountId
        }
        // 请求基本资料数据
        this.$store.dispatch(agentTypes.AGENT_EDIT_ACTION, param)
      },
      switchTab () {
        this.isShowTab = true
      },
      getSelectDatas (e) {
        console.log(e)
        this.txt = e[0]
      },
      save () {
        if (!this.check()) return
        let param = {
          agentId: this.accountId, // 账号ID
          account: this.$store.state.agent.agentEdit.agentAccount, // 用户名
          type: this.txt === '存入' ? 1 : 0, // 存取类型
          balance: this.info.amout,
          legendCode: this.info.code
        }
        this.$store.dispatch(agentTypes.AGENT_SAVE_ACTION, param).then(res => {
          if (res.code === statusCode.statusConst.SUCCESS) {
            if (res.msg) {
              window.layer.msgWarn('操作成功', () => {
                this.$router.push({
                  'path': '/m/account/agent/0',
                  query: {
                    'searchVal': this.searchVal
                  }
                })
              })
            }
          }
        })
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
