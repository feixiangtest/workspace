<template>
  <div class="mainBox">
    <dl class="public-list clearfix">
      <dd class="common-item" @click="showPlatForm = true">
        <h5 class="title">选择平台</h5>
        <p class="con-txt subText">
          <span>{{platForm}}</span> <i class="yo-icon icon-next"></i>
        </p>
      </dd>
      <dd class="common-item" @click="showAccountType = true">
        <h5 class="title">账号类型</h5>
        <p class="con-txt subText">
          <span>{{accountType}}</span> <i class="yo-icon icon-next"></i>
        </p>
      </dd>
      <dd class="common-item">
        <h5 class="title">账号查询</h5>
        <p class="con-txt subText">
          <input type="text" maxlength="12" @input="toLowerCaseStr()" class="input-type2" placeholder="请输入查询的账号" v-model='accountName'>
        </p>
      </dd>
      <dd class="common-item" @click="showQuickDate = true">
        <h5 class="title">快选时间</h5>
        <p class="con-txt subText">
          <span>{{date}}</span> <i class="yo-icon icon-next"></i>
        </p>
      </dd>
    </dl>

    <div class="note-item flex-direction-co">
      <h5>温馨提示:</h5>
      <p>1、若查询的数据包含已同步和未同步数据组合时，数据只展示已同步的数据。</p>
      <p>2、已同步数据和各个第三方数据一致。</p>
      <p>3、未同步数据为即时获取数据，查询可能会有几分钟延迟。</p>
    </div>

    <div class="btn-box btn-block text-center">
      <a href="javascript:void(0)" class="btn btn-lg btn-primary" @click="subBut">确定</a>
    </div>
    <picker :isShowTab.sync='showPlatForm' :slots='platFormList' @getSelectData='selectPlatForm' :title='platFormTitle'></picker>
    <picker :isShowTab.sync='showAccountType' :slots='accountTypeList' @getSelectData='selectAccountType' :title='accountTypeTitle'></picker>
    <picker :isShowTab.sync='showQuickDate' :slots='quickDateList' @getSelectData='selectDateList' :title='dateTitle'></picker>
  </div>
</template>

<script>
  import * as types from '@/store/reportForms/type'
  import Picker from '@/components/common/picker.vue'
  import {
    mapState
  } from 'vuex'
  export default {
    data () {
      return {
        page: 1,
        limit: 20,
        accountName: '', // 账号名称
        platForm: '全部', // 选中的平台
        accountType: '代理', // 选中的账号类型
        showPlatForm: false, // 是否展示选择平台
        showAccountType: false, // 是否展示选择账号类型
        showQuickDate: false, // 是否展示快选时间面板
        platFormTitle: '选择平台', // 选择平台面板标题
        accountTypeTitle: '账号类型', // 账号类型面板标题
        platFormList: [{ // 选择平台列表
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        }],
        accountTypeList: [{ // 账号类型列表
          flex: 1,
          values: ['代理', '直属会员'],
          className: 'slot1',
          textAlign: 'center'
        }]
      }
    },
    created () {
      this.$store.state.home.headerType = 5
      this.$store.state.home.headTitle = '报表管理'
      let query = this.$route.query
      // 平台
      this.platForm = query.platformGameCode ? query.platformGameCode.replace('SX', '视讯') : '全部'
      this.accountName = query.accountName
      // 账号类型
      this.accountType = Number(query.typeName) === 1 ? '直属会员' : '代理'

      this.$store.state.reportForms.date = query.quickType ? this.quickDateList[0].values[query.quickType] : '昨日'
      if (Number(query.quickType) === 0) {
        this.$store.state.reportForms.date = '今日'
      }
      // 调用平台接口
      this.$store.dispatch(types.GETPLATFORM, {
        'pageGroupId': 1,
        'loading': 'pass'
      }).then(res => {
        this.platFormList[0].values = res.data.map(v => {
          return v.platformCode + '视讯'
        })
        this.platFormList[0].values.unshift('全部')
      })
    },
    computed: {
      ...mapState({
        quickDateList: state => state.reportForms.quickDateList, // 快选时间列表
        dateTitle: state => state.reportForms.dateTitle, // 快选时间列表
        date: state => state.reportForms.date // 快选时间列表
      })
    },
    methods: {
      toLowerCaseStr () {
        let name = 'accountName'
        try {
          this[name] = this[name].replace(/[^0-9a-z]/ig, '')
        } catch (e) { }
        try {
          this[name] = this[name].toLowerCase()
        } catch (e) { }
      },
      subBut () {
        let quickTypeCode = {
          '今日': 0,
          '昨日': 1,
          '本周': 2,
          '上周': 3,
          '本月': 4,
          '上月': 5
        }
        let param = {
          'pageGroupId': 1,
          'platformGameCode': this.platForm !== '全部' ? this.platForm.replace('视讯', 'SX') : '',
          'accountName': this.accountName,
          'typeName': this.accountType === '代理' ? 2 : 1,
          'quickType': quickTypeCode[this.date],
          'nextQueryPage': 0,
          'caseType': '02',
          'dataType': 0,
          'page': this.page,
          'limit': this.limit
        }
        this.$store.dispatch(types.REPORTSLISTAGENT, param).then(res => {
          this.$router.push({
            path: 'platFormReport',
            query: param
          })
        }).catch(rej => {
          window.layer.msgWarn(rej.msg)
        })
      },
      // 获取选择的平台
      selectPlatForm (e) {
        this.platForm = e[0]
      },
      // 获取选择的账号类型
      selectAccountType (e) {
        this.accountType = e[0]
      },
      // 获取选择的日期
      selectDateList (e) {
        this.$store.state.reportForms.date = e[0]
      }
    },
    components: {
      Picker
    }
  }
</script>

