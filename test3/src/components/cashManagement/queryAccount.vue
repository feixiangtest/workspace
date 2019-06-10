<template>
    <div class="member-selection">
      <div class="list-title">
        <i class="yo-icon icon-search"></i>
        <input type="text" placeholder="请输入会员账号查询"
          @keyup.enter="submit()" v-model="accountName"
          @input="toLowerCaseStr($event)">
      </div>

      <div class="member-selection-list">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"
          @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange">

          <!--选中框-->
          <div class="mint-radiolist">
            <a class="mint-cell" v-for="(member,index) in memberData" :key="index" @click="clickMember(member)">
              <div class="mint-cell-wrapper">
                <div class="mint-cell-title">
                  <label class="mint-radiolist-label">
                    <span class="mint-radio is-right">
                      <input type="radio" class="mint-radio-input" :value="member.id" v-model="checkedValue">
                      <span class="mint-radio-core"></span>
                    </span>
                    <span class="mint-radio-label">
                      {{member.account}}
                    </span>
                  </label>
                </div>
              </div>
            </a>
          </div>

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
    </div>
</template>
<script>
import Vue from 'vue'
import { Radio, Loadmore } from 'mint-ui'
import Spinner from 'mint-ui/lib/spinner' // 按需加载mint-ui的模块
import * as memberTypes from '../../store/member/type'
import * as statusCode from '../../utils/status_const'

Vue.component(Spinner.name, Spinner)
Vue.component(Loadmore.name, Loadmore)
Vue.component(Radio.name, Radio)

export default {
  name: 'modifyAccount',
  data () {
    return {
      topStatus: '', // 顶部状态
      bottomStatus: '', // 底部状态
      allLoaded: false,
      pageNo: 1,
      pageSize: 20,
      checkedValue: '', // 选中值
      memberData: [], // 会员数据
      isOpen: true, // 用于限制点击过快处理
      isClickMember: true, // 限制选择会员过快处理
      accountName: '',
      isload: true // 是否还有下一页
    }
  },
  methods: {
    back () {
      this.$router.go(-1)// 返回上一层
    },
    handleTopChange (status) {
      this.topStatus = status
    },
    handleBottomChange (status) {
      this.bottomStatus = status
    },
    loadTop () {
      // 上拉刷新
      this.memberData = []
      this.pageNo = 1
      this.initData(0)
      this.isload = true
      this.allLoaded = false // 下拉加载后重置滑动加载
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      // 加载更多数据
      if (this.pageNo > this.pageSize) {
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
    /**
     * @augments type 0:下拉刷新  1：上拉加载
     *
     */
    initData (type) {
      if (this.isOpen) {
        this.isOpen = false
        let param = {
          'id': '',
          'page': this.pageNo,
          'limit': this.pageSize,
          'searchFilter': 1, // 0精确查询，1模糊查询
          'searchVal': this.accountName
        }
        // 向下拉不需要拼命加载中
        if (this.pageNo > 1) {
          param.loading = 'pass'
        }
        // 请求基本资料数据
        this.$store.dispatch(memberTypes.MEMBERLIST_ACTION, param).then(res => {
          if (res.code === statusCode.statusConst.SUCCESS) {
            if (res.data.length === 0) {
              this.allLoaded = true // 若数据已全部获取完毕
            } else {
              this.pageNo++
            }
            this.memberData = this.memberData.concat(res.data)
          }
          if (Number(type) === 0) {
            this.$refs.loadmore.onTopLoaded()
          } else if (Number(type) === 1) {
            this.$refs.loadmore.onBottomLoaded()
          }
          if (res.data.length === 0 && this.accountName) {
            window.layer.msgWarn('账号不存在或不属于直属会员，请重新输入！') // 请求成功，但是返回状态码不正确
          }
        })
        setTimeout(() => {
          this.isOpen = true
        }, 1000)
      }
    },
    // 选择会员方法
    clickMember (member) {
      if (this.isClickMember) {
        this.$store.state.member.chooseMember = member
        // 限制两秒才允许再次点击
        this.isClickMember = false
        let param = {
          'searchBy': 'agent', // 0精确查询，1模糊查询
          'accountName': member.account
        }
        // 请求基本资料数据
        if (!window.store.state.member.jumpUrl === '/m/agentReturnOut' && !window.store.state.member.jumpUrl === '/m/cash') {
          this.$store.dispatch(memberTypes.QUERYACCOUNT_ACTION, param).then(res => {
            if (res.code === statusCode.statusConst.SUCCESS) {
            // 跳转返回上一层
              window.router.push(window.store.state.member.jumpUrl)
            }
          })
        }
        if (window.store.state.member.jumpUrl === '/m/agentReturnOut') {
          this.$store.dispatch(memberTypes.QUERYACCOUNTBYAGENT_ACTION, param).then(res => {
            if (res.code === statusCode.statusConst.SUCCESS) {
            // 跳转返回上一层
              window.router.push(window.store.state.member.jumpUrl)
            }
          })
        }
        if (window.store.state.member.jumpUrl === '/m/cash') {
          this.$store.dispatch(memberTypes.QUERYACCOUNTAGENTMEMBER_ACTION, param).then(res => {
            if (res.code === statusCode.statusConst.SUCCESS) {
            // 跳转返回上一层
              window.router.push(window.store.state.member.jumpUrl)
            }
          })
        }
        setTimeout(() => {
          this.isClickMember = true
        }, 1500)
      }
    },
    // 提交查询方法
    submit () {
      this.pageNo = 1
      this.isload = true
      this.memberData = []
      this.initData()
    },
    toLowerCaseStr (event) {
      let account = event.currentTarget.value
      let value = account.replace(/[^0-9a-zA-Z]+/g, '')
      if (value === '') {
        this.accountName = ''
      } else {
        this.accountName = value
      }
      this.accountName = this.accountName.toLowerCase()
    }
  },
  components: {
    chooseMember () {
      return this.$store.state.member.chooseMember
    },
    jumpUrl () {
      return this.$store.state.member.jumpUrl
    }
  },
  mounted () {
    this.$store.state.home.headerType = 6
    this.$store.state.home.headTitle = '会员选择'
    // 如果没有跳转进来的链接不允许进入会员选择页面
    if (!window.store.state.member.jumpUrl) {
      this.$router.push('/m/index')
    }
    this.initData()
  },
  watch: {
    // 监听选中的值
    checkedValue (val) {
      this.checkedValue = val
    }
  }
}
</script>
