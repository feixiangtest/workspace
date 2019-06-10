<template>
  <div class="member-selection member-ship yo-cell-row4 yo-cell-box">
    <div class="yo-cell-box yo-cell-row4">
      <!-- 搜索框 -->
      <div class="list-title">
        <i class="yo-icon icon-search" @click="searchFn"></i>
        <input placeholder="请输入代理账号查询" v-model="searchVal"
          @input="assertAccount()" @keyup.enter="searchFn" maxlength="12">
      </div>

      <div class="cell-box cell-title">
        <div>用户名</div>
        <div>层级</div>
        <div>直属代理</div>
        <div>直属会员</div>
      </div>
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"
                   @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange">
        <mt-cell-swipe class="yo-cell-item yo-cell-slider"
          v-for='(item, index) in agentList' :key='index'
          :right="item.rightButtons">
          <div class="cell-box cell-item">
            <div>{{ item.account }}</div>
            <div>{{ item.agentLevelText }}</div>
            <div v-if="item.agentNum">
              <router-link :to='`/m/account/agentDeep/${item.agentLevel}/${item.id}?back=` + pathname'  class="link-txt">{{ item.agentNum}}</router-link>
            </div>
            <div v-if="!item.agentNum">
              {{ item.agentNum}}
            </div>
            <!--  代理 下一层 url 点击下去 -->
            <div v-if="item.renshu <=0 ">
              {{ item.renshu}}
            </div>
            <div v-if="item.renshu > 0">
              <router-link :to='`/m/account/memberDeep/${item.id}`' class="link-txt">{{ item.renshu}}</router-link>
            </div>
          </div>
        </mt-cell-swipe>
        <div slot="top" class="mint-loadmore-top">
              <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">
                  <i class="yo-icon icon-load-top"></i>
                  <em>松开刷新....</em>
              </span>
          <mt-spinner color="#585252" :type="3" v-show="topStatus === 'loading'"></mt-spinner>
        </div>
        <div slot="bottom" class="mint-loadmore-bottom" style="display: block">
          <mt-spinner color="#585252" :type="3" v-show="bottomStatus === 'loading'"></mt-spinner>
        </div>
      </mt-loadmore>
    </div>
    <picker :isShowTab.sync='isShowTab' :slots='slots' @getSelectData='getSelectDatas' :title='title'></picker>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Vue from 'vue'
  import { Loadmore, CellSwipe, Spinner } from 'mint-ui'
  import Picker from '@/components/common/picker.vue'
  import * as agentTypes from '../../../store/agent/type'
  import * as statusCode from '../../../utils/status_const'

  Vue.component(Spinner.name, Spinner)
  Vue.component(Loadmore.name, Loadmore)
  Vue.component(CellSwipe.name, CellSwipe)

  export default {
    name: 'agentDep',
    data () {
      return {
        pathname: location.pathname,
        action: '',
        agentLevel: '', // current 页面层级
        id: '', // current 页面层级
        searchVal: '', // 搜索 关键字
        agentList: [], // 当前数据
        page: 1,
        limit: 16,
        slots: [],
        title: '',
        isShowTab: false,
        topStatus: '', // 顶部状态
        bottomStatus: '', // 底部状态
        allLoaded: false,
        isload: true // 是否还有下一页
      }
    },
    computed: {
      ...mapState({
        agentlevel: state => state.agent.agentlevel
      })
    },
    watch: {
      '$route' (to, from) {
        // 对路由变化作出 重载
        this.beforInit()
      }
    },
    mounted () {
      // 获取路由存储的值
      let query = this.$route.query
      window.routerOjb[location.pathname] = query
      //  如果路由对象不为空，将路由传的数据设置为默认值
      if (JSON.stringify(query) !== '{}') {
        this.searchVal = query.searchVal
      }
      this.beforInit()
    },
    components: {
      Picker
    },
    methods: {
      assertAccount ($this) {
        try {
          this.searchVal = this.searchVal.replace(/[^0-9a-z]/ig, '')
        } catch (e) { }
        try {
          this.searchVal = this.searchVal.toLowerCase()
        } catch (e) { }
      },
      handleTopChange (status) {
        this.topStatus = status
      },
      handleBottomChange (status) {
        this.bottomStatus = status
      },
      loadTop () {
        // 加载更多数据
        this.page = 1
        this.isload = true
        this.initData(this.searchVal, 0)
        this.allLoaded = false // 下拉加载后重置滑动加载
      },
      loadBottom () {
        // 加载更多数据
        if (this.page > 20) {
          window.layer.msgWarn('您查询的数据过多，请使用查询条件进行搜索')
          this.$refs.loadmore.onBottomLoaded() // 刷新节点
          return
        }
        if (this.isload) {
          this.initData(this.searchVal, 1)
          return
        }
        this.$refs.loadmore.onBottomLoaded() // 刷新节点
      },
      beforInit () {
        let { agentLevel, id } = this.$route.params
        this.id = id
        this.agentLevel = agentLevel
        console.log('agent 层级', id)
        this.initData() // 会员层级
      },
      searchFn () {
        this.page = 1
        let searchVal = {
          useStatus: '',
          searchFilter: 1,
          searchVal: this.searchVal
        }
        this.initData(searchVal)
      },
      levelFn () {
        let list = ['全部']
        this.agentlevel.agentLevelList.forEach((val) => {
          list.push(val.agentLevelLabel)
        })
        let slots = [{
          flex: 1,
          values: list,
          className: 'slot1',
          textAlign: 'center'
        }]
        slots[0].defaultIndex = this.agentLevel // 默认值
        this.slots = slots
        this.isShowTab = true
      },
      getSelectDatas (e) {
        console.log(e)
        let getID = this.agentLevelMap[e]
        this.agentLevelTxt = e[0]
        this.agentLevel = getID
        this.initData()
        console.log(getID)
        // 同层级不操作
      },
      initData (searchVal, type = 0) {
        this.$store.state.home.headerType = 6
        this.$store.state.home.headTitle = '直属代理'
        let nextAgentLevel = Number(this.agentLevel) + 1
        let param = {
          url: `/api/agent/agentList/${nextAgentLevel}`, // 传入下一级的代理层级
          param: {
            page: this.page,
            limit: this.limit,
            id: this.id,
            useStatus: '',
            searchFilter: 0,
            searchVal: ''
          }
        }
        if (searchVal) {
          let searchObject = {
            useStatus: '',
            searchFilter: 1,
            searchVal: this.searchVal
          }
          window.$.extend(param.param, searchObject)
        }
        // 请求基本资料数据
        this.$store.dispatch(agentTypes.AGENT_ACTION, param).then(res => {
          if (res.code === statusCode.statusConst.SUCCESS) {
            this.count = res.count
            if (res.data.length === 0) {
              this.allLoaded = true // 若数据已全部获取完毕
              this.$refs.loadmore.onTopLoaded()
              this.$refs.loadmore.onBottomLoaded()
              return // 归零 key
            }
            // 标记页码
            this.page++
            // 动态判断是否有权限按钮
            for (let i = 0; i < res.data.length; i++) {
              res.data[i].rightButtons = []
              // 添加按钮
              res.data[i].rightButtons = res.data[i].rightButtons.concat([
                {
                  content: '添加',
                  style: {
                    background: '#557fde', color: '#fff'
                  },
                  handler: () => this.isData(res.data[i].id, 'Add')
                }
              ])
              // 修改按钮
              res.data[i].rightButtons = res.data[i].rightButtons.concat([
                {
                  content: '修改',
                  style: {
                    background: '#5dcb4e', color: '#fff'
                  },
                  handler: () => this.isData(res.data[i].id, 'Edit')
                }
              ])
            }
            this.agentList = this.agentList.concat(res.data)
            // 下拉刷新 第一页
            if (Number(type) === 0) {
              this.agentList = res.data
              this.$refs.loadmore.onTopLoaded()
            } else if (Number(type) === 1) {
              this.$refs.loadmore.onBottomLoaded()
            }
            // 如果列表有数据，那么弹出提示蒙版，并存储在本地
            if (res.data.length > 0) {
              if (!localStorage.getItem('agentMask')) {
                this.showBetMask = true
                localStorage.setItem('agentMask', 'true')
              }
            }
          }
        })
      },
      aEdit (e) {
        this.action = e
      },
      isData (memberId, type) {
        if (!memberId) return
        // 从代理跳过来的agentAdd/3049 + ?back=xxxx
        let path = `/m/account/agent${type}/${memberId}`
        this.$router.push({
          'path': path,
          query: {
            'searchVal': this.searchVal,
            'back': location.pathname
          }
        })
      }
    }
  }
</script>
