<template>
  <div class="member-selection member-ship yo-cell-row4 yo-cell-box">
    <!-- 引导页 -->
    <div v-if="agentList.length > 0" class='gestureMask' v-show='showBetMask'>
      <div class='gestureTop'></div>
      <div class='gestureBottom'>
        <div class='gestureFinger'>
          <img class='palmPic' src="../../../assets/img/huadong.png" alt="">
        </div>
        <div class="teachpage teachpage2">
          <div class="teachout teachout2">
            <div class="teachbox">
              <span>手势左滑动</span><br/> <span>可展示更多操作内容</span>
            </div>
            <a href="javascript:void(0)" class="btn btn-teach btn-primary" @click="closeMask()">我知道了</a>
          </div>
        </div>
      </div>
    </div>

    <!-- 会员搜索框 -->
    <div class="list-title">
        <div class="agent-title">
          <div class="agent-in-box" @click="levelFn">
            <span >{{ agentLevelTxt? agentLevelTxt: '请选择层级'}}</span>
            <i class="zz-icon-down"></i>
          </div>
        </div>
        <div class="agent-title">
            <i class="yo-icon icon-search" @click="searchFn"></i>
            <input placeholder="请输入代理账号查询" @blur="hanldVal" v-model="searchVal"
              @input="assertAccount()" @keyup.enter="searchFn" maxlength="12">
        </div>
    </div>

    <!-- 表头 -->
    <div class="cell-box cell-title" v-if='agentList.length > 0 || searchIT'>
        <div>用户名</div>
        <div>层级</div>
        <div>直属代理</div>
        <div>直属会员</div>
    </div>

    <!-- 列表项 -->
    <div class="member-ship-list" v-if='agentList.length > 0 || searchIT'>

      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"
           @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange">

          <mt-cell-swipe class="yo-cell-item yo-cell-slider"
            v-for='(item, index) in agentList' :key='index'
            :right="item.rightButtons">

            <div class="cell-box cell-item" @click="operate">
              <div>{{ item.account }}</div>
              <div>{{ item.agentLevelText }}</div>
              <div v-if="item.agentNum">
                <router-link :to='`/m/account/agentDeep/${item.agentLevel}/${item.id}?back=` + pathname'  class="link-txt">{{ item.agentNum}}</router-link>
              </div>
              <div v-if="!item.agentNum">
                {{ item.agentNum}}
              </div>
              <!--  直属会员 -->
              <div v-if="item.renshu <=0 ">
                {{ item.renshu}}
              </div>
              <div v-if="item.renshu > 0">
                <router-link :to='`/m/account/memberDeep/${item.id}?back=` + pathname' class="link-txt">{{ item.renshu}}</router-link>
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
    <no-data v-else></no-data>
    <!-- 选择层级 -->
    <picker :isShowTab.sync='isShowTab' :slots='slots' @getSelectData='getSelectDatas' :title='title'></picker>

  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Vue from 'vue'
  import Picker from '@/components/common/picker.vue'
  import {
    Loadmore,
    CellSwipe,
    Spinner
  } from 'mint-ui'
  import * as agentTypes from '../../../store/agent/type'
  import * as statusCode from '../../../utils/status_const'
  import utils from '@/plugins/utils.js'
  import noData from '@/components/noData.vue' // 暂无数据
  Vue.component(Spinner.name, Spinner)
  Vue.component(Loadmore.name, Loadmore)
  Vue.component(CellSwipe.name, CellSwipe)
  export default {
    name: 'agent',
    data () {
      return {
        pathname: location.pathname,
        searchIT: false, // 是否触发了 点击搜索
        action: '',
        showBetMask: false,
        agentLevel: '', // current 页面层级
        agentLevelTxt: '', // current 页面层级 文字
        searchVal: '', // 搜索 关键字
        lsSave: '', // 搜索 本地 关键字
        agentList: [], // 本地数据
        agentLevelMap: {
          '全部': 0
        }, // 中文对照 id
        page: 1,
        pageSize: 20,
        limit: 20,
        slots: [],
        title: '',
        isShowTab: false,
        topStatus: '', // 顶部状态
        bottomStatus: '', // 底部状态
        allLoaded: false,
        isload: true, // 是否还有下一页
        showAddBtn: false, // 是否显示添加按钮
        showUpdateBtn: false, // 是否显示修改按钮
        showUpdateBalance: false // 是否显示余额存取按钮
        // editBg: '#eee',
        // addBg: '#ccc',
      }
    },
    computed: {
      ...mapState({
        otherData: state => state.home.otherData, // 权限管理
        agentlevel: state => state.agent.agentlevel
      })
    },
    created () {
      window._addFn.type = 'addAgent' // 头部添加按钮 标记
    },
    mounted () {
      // 检查权限
      this.Permission()
      // 获取路由存储的值
      let query = this.$route.query
      window.routerOjb[location.pathname] = query
      //  如果路由对象不为空，将路由传的数据设置为默认值
      if (JSON.stringify(query) !== '{}') {
        this.searchVal = query.searchVal
      }
      let id = this.$route.params.id
      if (id) this.agentLevel = id
      this.searchIT = false
      // 先检查本地是否存在查询条件
      this.syncGetLS()
      // 第一次加载列表数据
      this.initData(this.searchVal) // 会员层级
      let $this = this
      this.$store.dispatch(agentTypes.AGENT_LEVEL_ACTION, { 'pageGroupId': 1 }).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          res.data.agentLevelList.forEach((val) => {
            $this.agentLevelMap[val.agentLevelLabel] = val.agentLevel
            $this.agentLevelMap[val.agentLevel] = val.agentLevelLabel
          })
          // 同步层级数据
          this.syncGetLS('agentLevel')
        }
      })
    },
    components: {
      Picker, noData
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
      // 关闭用户引导页
      closeMask () {
        this.showBetMask = false
      },
      operate (e) {
        window.$(e.currentTarget).parent().attr('style', 'transform:translateX(' + 0 + 'px)')
      },
      searchFn () {
        this.page = 1
        let searchVal = {
          useStatus: '',
          searchFilter: 1,
          searchVal: this.searchVal
        }
        if (this.agentLevel < 1 && !this.searchVal) { // 没有选择过滤条件的情况下
          this.searchIT = false
        } else {
          this.searchIT = true
        }
        this.initData(searchVal)
      },
      hanldVal () {
        this.searchVal = utils.toLowerCase(utils.space(this.searchVal))
      },
      levelFn () {
        this.page = 1
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
        slots[0].defaultIndex = this.agentLevel * 1 // 默认值
        this.slots = slots
        this.isShowTab = true
        // window.$('.cell-slider div.content').attr('style', 'transform:translateX(' + 0 + 'px)')
      },
      getSelectDatas (e) {
        let getID = this.agentLevelMap[e]
        this.agentLevelTxt = e[0]
        this.agentLevel = getID
        if (this.agentLevel < 1 && !this.searchVal) { // 没有选择过滤条件的情况下
          this.searchIT = false
        } else {
          this.searchIT = true
        }
        this.agentList = []
        this.initData(null, 0)
        // 同层级不操作
      },
      handleTopChange (status) {
        this.topStatus = status
      },
      handleBottomChange (status) {
        console.log(status)
        this.bottomStatus = status
      },
      loadTop () {
        // 加载更多数据
        this.page = 1
        this.isload = true
        this.initData(this.searchVal, 0)
        this.allLoaded = false // 下拉加载后重置滑动加载
        this.$refs.loadmore.onTopLoaded()
      },
      loadBottom () {
        // 加载更多数据
        if (this.page > this.pageSize) {
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
      initData (searchVal, type = 0) {
        this.$store.state.home.headerType = 7
        this.$store.state.home.headTitle = '代理'
        let param = {
          url: `/api/agent/agentList/${this.agentLevel}`,
          param: {
            page: this.page,
            limit: this.pageSize
          }
        }
        // 向下拉不需要拼命加载中
        if (this.page > 1) {
          param.param.loading = 'pass'
        }
        if (searchVal) {
          let searchObject = {
            useStatus: '',
            searchFilter: 1,
            searchVal: this.searchVal
          }
          window.$.extend(param.param, searchObject)
        }
        let $this = this
        // 同步搜索条件到本地 请求基本资料数据
        this.syncLS(param)
        this.$store.dispatch(agentTypes.AGENT_ACTION, param).then(res => {
          if (res.code === statusCode.statusConst.SUCCESS) {
            if (res.data.length === 0) {
              this.allLoaded = true // 若数据已全部获取完毕
              this.$refs.loadmore.onTopLoaded()
              this.$refs.loadmore.onBottomLoaded()
              this.isload = false
              // 计算是否还有下一页
              return // 归零 key
            }
            // 动态判断是否有权限按钮
            for (let i = 0; i < res.data.length; i++) {
              res.data[i].rightButtons = []
              // 添加按钮
              if ($this.showAddBtn) {
                res.data[i].rightButtons = res.data[i].rightButtons.concat([
                  {
                    content: '添加',
                    style: {
                      background: '#557fde', color: '#fff'
                    },
                    handler: () => $this.isData(res.data[i].id, 'Add')
                  }
                ])
              }
              // 修改按钮
              if ($this.showUpdateBtn) {
                res.data[i].rightButtons = res.data[i].rightButtons.concat([
                  {
                    content: '修改',
                    style: {
                      background: '#5dcb4e', color: '#fff'
                    },
                    handler: () => $this.isData(res.data[i].id, 'Edit')
                  }
                ])
              }
              // 余额存取按钮
              if ($this.showUpdateBalance && res.data[i].agentLevelText === '下一级') {
                res.data[i].rightButtons = res.data[i].rightButtons.concat([
                  {
                    content: '余额存取',
                    style: {
                      background: '#fd9d00', color: '#fff'
                    },
                    handler: () => $this.isData(res.data[i].id, 'Save')
                  }
                ])
              }
            }
            // 下拉刷新 第一页
            if (Number(type) === 0) {
              $this.agentList = res.data
              try { $this.$refs.loadmore.onTopLoaded() } catch (e) { }
            } else if (Number(type) === 1) {
              $this.agentList = $this.agentList.concat(res.data)
              $this.$refs.loadmore.onBottomLoaded()
            }
            // 如果列表有数据，那么弹出提示蒙版，并存储在本地
            if (res.data.length > 0) {
              if (!localStorage.getItem('agentMask')) {
                $this.showBetMask = true
                localStorage.setItem('agentMask', 'true')
              }
            }
            // 标记页码
            $this.page++
          }
        }).catch(res => {
          if (res.code === 1) {
            $this.agentList = []
          }
        })
      },
      syncGetLS (agentLevel) {
        // 同步搜索条件到本地 保存起来
        let a = ''
        try { a = JSON.parse(localStorage[location.pathname]) } catch (e) {
          a = false
        }
        this.agentLevel = a.agentLevel ? a.agentLevel : 0
        if (agentLevel && a.agentLevel) {
          this.agentLevelTxt = this.agentLevelMap[a.agentLevel]
        }
        if (a.agentLevelTxt && a.agentLevelTxt.param) {
          if (a.agentLevelTxt.param.searchVal) {
            this.searchVal = a.agentLevelTxt.param.searchVal // 同步数据
            this.page = a.agentLevelTxt.param.page
          }
        }
      },
      syncLS (param) {
        // 同步搜索条件到本地 保存起来
        localStorage[location.pathname] = JSON.stringify({
          agentLevel: this.agentLevel, // current 页面层级
          agentLevelTxt: param // current 页面层级 文字
        })
      },
      aEdit (e) {
        this.action = e
      },
      isData (memberId, type) {
        if (!memberId) return
        let path = `/m/account/agent${type}/` + memberId
        this.$router.push({
          'path': path,
          query: {
            'searchVal': this.searchVal
          }
        })
      },
      Permission () {
        // 权限检查
        this.showAddBtn = this.otherData['account:agent:addAgent'] ? true : null
        this.showUpdateBtn = this.otherData['account:agent:updateAgent'] ? true : null
        this.showUpdateBalance = this.otherData['account:agent:updateBalance'] ? true : null
      }
    }
  }
</script>
