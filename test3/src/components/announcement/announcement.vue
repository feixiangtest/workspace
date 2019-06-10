<template>
	<div class="cash-list-box notice-main yow-content ">

				<div class="menu-tab sub-nav notice-tab">
            <ul>
                <li :class="{cur:type === 4}" @click="getNoticeList(4)">代理商公告</li>
                <li :class="{cur:type === 5}" @click="getNoticeList(5)">站点公告</li>
                <li :class="{cur:type === 3}" @click="getNoticeList(3)">维护公告</li>
            </ul>
        </div>

				<div class="notice-list-box">
					<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"
						@top-status-change="handleTopChange" @bottom-status-change="handleBottomChange">

						<!-- 5站点公告 -->
						<div v-show="type && type == 5" class="notice-item yow-content"
							v-for="(item,key) in announceList" :key="item.lastUpdateTime" @click="turnToDetail(item)">
							<div class="content" :style='{"color":item.effective? "":"#c6c6c6"}'>
								{{item.gbkContent}}
								<span class="arrow" style="position: absolute;right: 20px;">
									<i class="yo-icon icon-next"></i>
								</span>
								<div class="time">{{item.lastUpdateTime}}</div>
							</div>
						</div>

						<!-- 3维护公告，4代理公告 -->
						<div v-show="type && type == 3 || type == 4" class="notice-item yow-content"
							v-for="(item,key) in announceList" :key="key" @click="turnToDetail(item)">
							<div class="title">
								<h3 :style='{"color":item.effective? "":"#c6c6c6"}'>{{item.announcementname}}</h3>
								<span class="arrow">
									<i class="yo-icon icon-next"></i>
								</span>
							</div>
							<div class="content" :style='{"color":item.effective? "":"#c6c6c6"}'>
								{{item.content}}
								<div class="time">{{item.beginTime}} 至 {{item.endTime}}</div>
							</div>
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
	import { mapState } from 'vuex'
	import { Loadmore } from 'mint-ui'
	import Spinner from 'mint-ui/lib/spinner' // 按需加载mint-ui的模块
	import * as types from '@/store/announcement/type'
	import * as statusCode from '@/utils/status_const'

	Vue.component(Spinner.name, Spinner)
	Vue.component(Loadmore.name, Loadmore)

	export default {
	  name: 'announcement',
	  data () {
	    return {
	      topStatus: '', // 顶部状态
	      bottomStatus: '', // 底部状态
	      allLoaded: false,
	      pageNo: 1,
	      pageSize: 20,
	      isload: true, // 是否还有下一页
	      announceCount: 0, // 总条数
	      announceList: [], // 公告数据
	      type: 4,
      DB: {},
	      floatTitle: ''
	    }
	  },
	  computed: {
	    ...mapState({
	      announceDetail: state => state.announcement.announcement, // 公告详情内容
	      announceData: state => state.announcement.announceData // 公告数据
	      // noticeType: state => state.announcement.noticeType // 显示类型
	    })
	  },
	  methods: {
	    handleTopChange (status) {
	      this.topStatus = status
	    },
	    handleBottomChange (status) {
	      this.bottomStatus = status
	    },
	    loadTop () {
	      // 上拉刷新
	      this.announceList = []
	      this.pageNo = 1
	      this.initData(this.type, 0)
	      this.isload = true
	      this.allLoaded = false // 下拉加载后重置滑动加载
	      this.$refs.loadmore.onTopLoaded()
	    },
	    loadBottom () {
	      // 加载更多数据
	      if (this.pageNo > this.pageSize) {
	        window.layer.msgWarn('您查询的数据过多')
	        this.$refs.loadmore.onBottomLoaded() // 刷新节点
	        return
	      }
	      if (this.isload) {
	        this.getPageData()
        return
	      }
	      this.$refs.loadmore.onBottomLoaded() // 刷新节点
	    },
    setData () {
      // 切换之前 数据 缓存
      this.DB[this.type] = {
        pageNo: this.pageNo,
        announceList: this.announceList,
        announceCount: this.announceCount
      }
      console.log(this.DB)
    },
    getData (e) {
      this.allLoaded = false
      this.isload = true
	      // 有旧数据
      if (this.DB[e]) {
        this.pageNo = this.DB[e].pageNo
        this.isload = true
        this.announceList = this.DB[e].announceList
        this.announceCount = this.DB[e].announceCount
      } else {
        //  没有数据
        this.pageNo = 1
        if (e === 4) {
          // 显示为代理商公告
          this.announceList = this.announceData.agentList
          this.announceCount = this.announceData.agentCount
        } else if (e === 5) {
          // 显示为站点公告
          this.announceList = this.announceData.noticeList
          this.announceCount = this.announceData.noticeCount
        } else {
          // 显示为维护公告
          this.announceList = this.announceData.maintainList
          this.announceCount = this.announceData.maintainCount
        }
      }
      this.stickTop(this.announceList)
      // 计算是否还有下一页
      if (this.announceList.length >= this.announceCount) {
        this.isload = false
      }
      this.type = e
      this.$refs.loadmore.onBottomLoaded() // 刷新节点
    },
    stickTop (cur) {
      let _arr = [...cur]
      if (_arr.length > 4) {
        this.announceList = _arr.splice(0, 4)
        this.$nextTick(() => {
          this.announceList = cur
        })
      } else {
        this.announceList = cur
      }
    },
	    getNoticeList (e) {
	      this.setData(e)
	      if (this.type === e || !this.announceData) {
	        // 相同则跳出
	        return
	      }
	      this.getData(e)
	      // this.initData(e)
	    },
	    initData (type, pass) {
	      let param = {
	        'page': 1
	      }
	      if (this.pageNo >= 1) param.loading = 'pass'
	      this.$store.dispatch(types.GETNOTICELIST_ACTION, param).then(res => {
	        if (res.code === statusCode.statusConst.SUCCESS) {
	          if (type === 4) {
	            // 显示为代理商公告
	            this.announceList = res.data.agentList
	            this.announceCount = res.data.agentCount
	          } else if (type === 5) {
	            // 显示为站点公告
	            this.announceList = res.data.noticeList
	            this.announceCount = res.data.noticeCount
	          } else {
	            // 显示为维护公告
	            this.announceList = res.data.maintainList
	            this.announceCount = res.data.maintainCount
	          }
	          // 计算是否还有下一页
          if (!this.announceList.length) {
            this.isload = false
          }
	        }
	      })
	    },
	    getPageData () {
	      if (this.pageNo === 1) {
	        this.pageNo = 2
	      }
	      let param = {
	        'page': this.pageNo,
	        'type': this.type
	      }
	      if (this.pageNo >= 1) param.loading = 'pass'
	      this.$store.dispatch(types.GETONENOTICELIST_ACTION, param).then(res => {
	        if (res.code === 0) {
	          if (res.data.length === 0) {
            this.allLoaded = true // 若数据已全部获取完毕
            this.isload = false
	          } else {
            this.pageNo++
            this.$refs.loadmore.onTopLoaded()
            this.$refs.loadmore.onBottomLoaded()
          }
	          this.announceList = this.announceList.concat(res.data.list)
	        }
	      })
	    },
	    turnToDetail (item) {
	      if (this.type === 5) {
	        this.$store.state.announcement.announceDetail.title = ''
	        this.$store.state.announcement.announceDetail.time = item.lastUpdateTime
	        this.$store.state.announcement.announceDetail.content = item.gbkContent
	      }
	      if (this.type === 3 || this.type === 4) {
	        this.$store.state.announcement.announceDetail.title = item.announcementname
	        this.$store.state.announcement.announceDetail.time = item.beginTime + '~' + item.endTime
	        this.$store.state.announcement.announceDetail.content = item.content
	      }
	      this.$router.push({
	        path: '/m/announceDetail',
	        query: { 'noticeType': this.type }
	      })
	    }
	  },
	  mounted () {
	    this.$store.state.home.headerType = 5
	    this.$store.state.home.headTitle = '公告管理'
	    this.type = this.$store.state.announcement.noticeType
	    this.initData(this.type)
	  }
	}
</script>
