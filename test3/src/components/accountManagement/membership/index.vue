<template>
  <div class="member-selection member-ship yo-cell-row4 yo-cell-box">
    <!-- 引导页 -->
    <div v-if="memberData.length > 0" class='gestureMask' v-show='showBetMask'>
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
      <i class="yo-icon icon-search" @click='search'></i>
      <input type="text" placeholder="请输入会员账号查询" maxlength="12"
        v-model='searchVal' @blur="hanldVal" @input="assertAccount()" @keyup.enter="search">
    </div>

    <!-- 表头 -->
    <div class="cell-box cell-title" v-if="memberData.length > 0 || searchIT">
      <div>用户名</div>
      <div>账户余额</div>
      <div>账号</div>
      <div>注册时间</div>
    </div>

    <!-- 列表项 -->
    <div class="member-ship-list" v-if="memberData.length > 0 || searchIT">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"
        @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange">
        <mt-cell-swipe class="yo-cell-item yo-cell-slider"
          v-for="(member,index) in memberData" :key='index'
          :right="member.rightButtons">
          <div class="cell-box cell-item" @click="operate">
            <div>{{member.account}}</div>
            <div>{{member.money | moneyFilter}}</div>
            <!-- <div @click='changeUserStatus(member)' :style='{"color":member.useStatus===0 ? "blue":"red"}'> {{member.useStatus | userStatus}}</div> -->
            <div v-if="!stop" @click='changeUserStatus(member)' :class='member.useStatus === 0 && member.errorNum < 6 ? "link-txt":"warn-txt"'> {{member | userStatus}}</div>
            <div v-if="stop"> {{member | userStatus}}</div>

            <div> {{member.createTime}}</div>
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
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import * as memberTypes from '@/store/member/type'
  import Vue from 'vue'
  import {
    Radio,
    Loadmore,
    MessageBox,
    CellSwipe
  } from 'mint-ui'
  import Spinner from 'mint-ui/lib/spinner' // 按需加载mint-ui的模块
  import utils from '@/plugins/utils.js'
  import noData from '@/components/noData.vue' // 暂无数据
  Vue.component(Spinner.name, Spinner)
  Vue.component(Loadmore.name, Loadmore)
  Vue.component(Radio.name, Radio)
  Vue.component(CellSwipe.name, CellSwipe)
  export default {
    name: 'rebatesProportion',
    data () {
      return {
        stop: false,
        stopEdit: false,
        searchIT: false, // 是否触发了 点击搜索
        action: '',
        showBetMask: false,
        page: 1,
        pageSize: 20,
        id: '', // 直属会员不为空
        searchFilter: 1,
        searchVal: '',
        topStatus: '', // 顶部状态
        bottomStatus: '', // 底部状态
        allLoaded: false,
        checkedValue: '', // 选中值
        memberData: [], // 会员数据
        isload: true // 是否还有下一页
      }
    },
    created () {
      window._addFn.type = 'addMember'
      this.$store.state.home.headTitle = '会员'
      this.$store.state.home.headerType = 7
    },
    computed: {
      ...mapState({
        otherData: state => state.home.otherData // 权限管理
      })
    },
    components: {
      MessageBox,
      noData
    },
    filters: {
      userStatus (v) {
        if (v.errorNum < 6) {
          if (v.useStatus === 0) return '正常'
          if (v.useStatus === 1) return '停用'
          if (v.useStatus === 2) return '链锁'
        } else {
          return '冻结'
        }
      }
    },
    methods: {
      operate (e) {
        window.$(e.currentTarget).parent().attr('style', 'transform:translateX(' + 0 + 'px)')
      },
      assertAccount ($this) {
        try {
          this.searchVal = this.searchVal.replace(/[^0-9a-z]/ig, '')
        } catch (e) { }
        try {
          this.searchVal = this.searchVal.toLowerCase()
        } catch (e) { }
        // 同步搜索条件到本地
        this.syncLS()
      },
      Permission () {
        // 权限检查
        this.stop = !this.$store.state.home.otherData['account:member:updateUseStatus'] ? true : null
        this.stopEdit = this.$store.state.home.otherData['account:member:updateMember'] ? true : null
      },
      hanldVal () {
        this.searchVal = utils.toLowerCase(utils.space(this.searchVal))
      },
      aEdit (e) {
        console.log(e, 'e')
        this.action = e
      },
      isData (memberId, type) {
        if (!memberId) return
        let path = `/m/account/membership${type}/` + memberId
        this.$router.push({
          'path': path,
          query: {
            'back': location.pathname,
            'searchVal': this.searchVal,
            'type': this.id !== '' ? 0 : null // id不为空时为直属会员
          }
        })
      },
      // 更改用户状态
      changeUserStatus (item) {
        if (item.useStatus === 0 || item.useStatus === 1) {
          let status = 0
          let msg = ''
          if (item.useStatus === 1) {
            status = 0
            msg = '是否要启用此账号？'
          } else {
            if (item.errorNum < 6) {
              status = 1
              msg = '是否要停用此账号？'
            } else {
              status = 0
              msg = '是否要解冻此账号？'
            }
          }
          window.layer.confirm(msg, () => {
            let param = {
              'id': item.id,
              'status': status
            }
            this.$store.dispatch(memberTypes.CHANGEUSESTATUS_ACTION, param).then(res => {
              item.useStatus = status
              if (status === 0) {
                item.errorNum = 0
              }
            })
          })
        }
      },
      // 关闭用户引导页
      closeMask () {
        this.showBetMask = false
      },
      handleTopChange (status) {
        this.topStatus = status
      },
      handleBottomChange (status) {
        this.bottomStatus = status
      },
      // 搜索用户
      search () {
        this.isload = true
        this.page = 1
        this.memberData = []
        this.initData()
      },
      loadTop () {
        // 加载更多数据
        this.page = 1
        this.isload = true
        this.initData(0)
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
          this.initData(1)
          return
        }
        this.$refs.loadmore.onBottomLoaded() // 刷新节点
      },
      initData (type) {
        window.$('.cell-slider div.content').attr('style', 'transform:translateX(' + 0 + 'px)')
        // window.$('.operate').css('opacity', 0)
        let param = {
          'id': '',
          'page': this.page,
          'limit': this.pageSize,
          'searchFilter': 1, // 0精确查询，1模糊查询
          'searchVal': this.searchVal
        }
        // 向下拉不需要拼命加载中
        if (this.page > 1) {
          param.loading = 'pass'
        }
        if (!this.searchVal) { // 没有选择过滤条件的情况下
          this.searchIT = false
        } else {
          this.searchIT = true
        }
        if (this.id) param.id = this.id
        // 请求基本资料数据
        this.$store.dispatch(memberTypes.MEMBERLIST_ACTION, param).then(res => {
          if (res.data.length === 0) {
            this.allLoaded = true // 若数据已全部获取完毕
            this.$refs.loadmore.onTopLoaded()
            this.$refs.loadmore.onBottomLoaded()
            if (this.searchVal) {
              window.layer.msgWarn('查无数据，请重新输入！')
            }
            this.isload = false
            // 计算是否还有下一页
            return // 归零 key
          }
          this.page++
          // 动态判断是否有权限按钮
          for (let i = 0; i < res.data.length; i++) {
            // 如果有修改权限将按钮设置
            if (this.stopEdit) {
              res.data[i].rightButtons = [
                {
                  content: '修改',
                  style: {
                    background: '#5dcb4e', color: '#fff'
                  },
                  handler: () => this.isData(res.data[i].id, 'Edit')
                }
              ]
            }
          }
          this.memberData = this.memberData.concat(res.data)
          if (Number(type) === 0) {
            this.memberData = res.data
            this.$refs.loadmore.onTopLoaded()
          } else if (Number(type) === 1) {
            this.$refs.loadmore.onBottomLoaded()
          }

          // 如果列表有数据，那么弹出提示蒙版，并存储在本地
          if (this.memberData.length > 0) {
            if (!localStorage.getItem('showBetMask')) {
              this.showBetMask = true
              localStorage.setItem('showBetMask', 'true')
            }
          }
          this.$nextTick(() => {
            window.$('.operate').addClass('hide')
          })
        }).catch(rej => {
          this.memberData = []
          if (param.searchVal) {
            window.layer.msgWarn(rej.msg)
          }
        })
      },
      syncGetLS () {
        // 同步搜索条件到本地 保存起来
        let a = ''
        try { a = JSON.parse(localStorage[location.pathname]) } catch (e) {
          a = false
        }
        this.agentLevel = a.agentLevel ? a.agentLevel : 0
        if (a) {
          this.searchVal = a.searchVal
        }
      },
      syncLS () {
        // 同步搜索条件到本地 保存起来
        if (this.searchVal) {
          localStorage[location.pathname] = JSON.stringify({
            searchVal: this.searchVal
          })
          return
        }
        delete localStorage[location.pathname]
      },
      isDeleteHandle () {}
    },
    mounted () {
      if (this.$route.params.id > 0) {
        this.id = this.$route.params.id
        this.$store.state.home.headTitle = '直属会员'
        this.$store.state.home.headerType = 6
      }
      // 获取路由存储的值
      let query = this.$route.query
      window.routerOjb[location.pathname] = query
      //  如果路由对象不为空，将路由传的数据设置为默认值
      this.syncGetLS()
      // 检查权限
      this.Permission()
      this.initData()
    }
  }
</script>
