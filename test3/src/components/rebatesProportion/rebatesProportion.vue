<template>
	<div class="cash-list-box yo-cell-box yo-cell-row2">

			<div class="cell-box cell-title">
				<div>返水事件</div>
				<div>返水金额</div>
			</div>

      <div class="member-selection-list">

        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"
                @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange">

          <div class="cell-box cell-item" :key='item.eventId' v-for="(item,index) in rebateList">
              <div>{{item.eventName}}</div>
              <div class="link-txt"  @click="goToDetailPage(item)">{{item.totalRebate}}</div>
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

      <float-page :isfloatPage='isfloatPage' :floatPageType='floatPageType' :floatTitle='floatTitle' :rebatesDetail='rebatesDetail'></float-page>

	</div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import { Loadmore } from 'mint-ui'
import Spinner from 'mint-ui/lib/spinner' // 按需加载mint-ui的模块
import * as types from '@/store/rebate/type'
import * as statusCode from '@/utils/status_const'
import floatPage from '@/components/floatPage/floatPage' // 详情
Vue.component(Loadmore.name, Loadmore) // 侧导航专用
Vue.component(Spinner.name, Spinner)
export default {
  name: 'rebatesProportion',
  data () {
    return {
      btnBgColor: 'red',
      allLoaded: false, // 加载
      topStatus: '', // 上滑状态
      bottomStatus: '', // 下滑状态
      isload: true, // 是否还有下一页
      pageSize: 20,
      pageNo: 1,
      rebateList: [],
      rebatesDetail: {},
      floatTitle: '' // 浮动单页标题
    }
  },
  mounted () {
    this.$store.state.user.isfloatPage = false
    this.$store.state.home.headerType = 10
    this.$store.state.home.headTitle = '代理返水查询'
    this.initData()
  },
  computed: {
    ...mapState({
      isfloatPage: state => state.user.isfloatPage, // 显示浮动单页
      floatPageType: state => state.user.floatPageType // 显示类型
    }),
    rebateResultList () {
      return this.$store.state.rebate.rebateResultList
    }
  },
  components: {
    floatPage
  },
  methods: {
    handleTopChange (status) {
      this.topStatus = status
    },
    handleBottomChange (status) {
      this.bottomStatus = status
    },
    loadTop () {
      // 加载更多数据
      this.rebateList = []
      this.pageNo = 1
      this.isload = true
      this.initData(0)
      this.allLoaded = false // 下拉加载后重置滑动加载
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      // 加载更多数据
      if (this.pageNo > this.pageSize) {
        window.layer.msgWarn('您查看的数据过多，请到电脑端查看')
        this.$refs.loadmore.onBottomLoaded() // 刷新节点
        return
      }
      if (this.isload) {
        this.initData(1)
        return
      }
      this.$refs.loadmore.onBottomLoaded() // 刷新节点
    },
    // 进入页面请求数据
    initData (type) {
      let rebateParam = JSON.parse(sessionStorage.getItem('rebateParam'))
      rebateParam.page = this.pageNo
      // 向下拉不需要拼命加载中
      if (this.pageNo > 1) {
        rebateParam.loading = 'pass'
      }
      this.$store.dispatch(types.QUERYREBATE_ACTION, rebateParam).then(res => {
        if (res.code === statusCode.statusConst.SUCCESS) {
          if (res.data.length === 0) {
            this.allLoaded = true // 若数据已全部获取完毕
          } else {
            this.pageNo++
          }
          this.rebateList = this.rebateList.concat(res.data)
        }
        if (Number(type) === 0) {
          this.$refs.loadmore.onTopLoaded()
        } else if (Number(type) === 1) {
          this.$refs.loadmore.onBottomLoaded()
        }
      })
    },
    isDeleteHandle () {},
    //    isDeleteHandle(e){
    //     console.log(e)
    //    }
    goToDetailPage (item) {
      this.floatTitle = '返水详情'
      this.$store.state.user.isfloatPage = true
      this.$store.state.user.floatPageType = 4
      this.rebatesDetail = item
    }
  }
}
</script>

<style>
</style>
