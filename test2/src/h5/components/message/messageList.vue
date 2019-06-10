<template>
    <div class="more-list-box messageList" id="msgList">
      <!-- tab切换 -->
      <div class="public-tab more-list-titile">
        <ul>
          <li :class="{active:msgType === 1}" @click="changeMessageTab(1)" id="msgCountP">个人消息
              <img src="/resource/share/RESOURCE_VERSION/imgs/red-dotH5.png" v-if="msgCount > 0">
          </li>
          <li :class="{active:msgType === 2}"  @click="changeMessageTab(2)">最新消息</li>
          <li :class="{active:msgType === 3}"  @click="changeMessageTab(3)">历史消息</li>
        </ul>
      </div>
      <div class="messageList-more">
        <div  v-if="msgType === 1">
          <div v-show="!noData">
              <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"
                      :auto-fill="false" ref="loadmore" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange">
              <!-- 上拉刷新 -->
                <!-- 个人消息 -->
                <div class="message-item magt10"  v-for="(item, index) in currMsgList" :key="index" @click="messageDetail(item, msgType, index)">
                  <div class="title-item">
                      <div class="title">
                          <div class="tit" :class="item.isRead === 0 ? 'high-red' : '' ">{{item.gbkSubject}}</div>
                          <i class="yo-icon right-arrow right-arrow icon-next"></i>
                      </div>
                  </div>
                  <div class="content-item">
                      <p class="content">{{item.gbkContent}}</p>
                      <span class="time">{{item.sendDateTime}}</span>
                  </div>
                </div>

                <!-- 更多 -->
                <div class="yo-more magt10" id="yoMore" v-if="showMore">
                    <span class="moreline"></span><span>{{moreText}}</span><span class="moreline"></span>
                </div>

                <!-- 上拉加载，下拉刷新 -->
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

        <div v-if="msgType === 2">
          <div v-show="!noData">
              <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"
                        :auto-fill="false" ref="loadmore" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange">
                <!-- 上拉刷新 -->

                  <!-- 最新消息 -->
                  <div class="message-item message-item2 magt10"
                      v-for="(item,key) in currMsgList" :key="key" @click="messageDetail(item, msgType)">
                      <div class="content-item">
                          <p class="content">{{item.gbkContent}}</p>
                          <span class="time">{{item.createDateTime}}</span>
                      </div>
                  </div>

                  <!-- 更多 -->
                  <div class="yo-more magt10" id="yoMore" v-if="showMore">
                      <span class="moreline"></span><span>{{moreText}}</span><span class="moreline"></span>
                  </div>

                  <!-- 上拉加载，下拉刷新 -->
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

        <div v-if="msgType === 3">
          <div v-show="!noData">
              <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"
                        :auto-fill="false" ref="loadmore" @top-status-change="handleTopChange" @bottom-status-change="handleBottomChange">
                <!-- 上拉刷新 -->

                  <!-- 历史消息 -->
                  <div class="message-item message-item2 magt10"
                      v-for="(item,key) in currMsgList" :key="key" @click="messageDetail(item, msgType)">
                      <div class="content-item">
                          <p class="content">{{item.gbkContent}}</p>
                          <span class="time">{{item.createDateTime}}</span>
                      </div>
                  </div>

                  <!-- 更多 -->
                  <div class="yo-more magt10" id="yoMore" v-if="showMore">
                      <span class="moreline"></span><span>{{moreText}}</span><span class="moreline"></span>
                  </div>

                  <!-- 上拉加载，下拉刷新 -->
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
      </div>
      <!-- 消息详情-漂浮页 -->
      <float-page :isfloatPage='isfloatPage' :floatPageType='floatPageType' :floatTitle='floatTitle' :messageDetail='detail' :detailType='detailType' :sequence='sequence'></float-page>

       <!-- 无数据 -->
       <no-data-page v-if="noData" :floatClass="floatClass"></no-data-page>
    </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import { Loadmore } from 'mint-ui'
import Spinner from 'mint-ui/lib/spinner' // 按需加载mint-ui的模块
import floatPage from '@/components/floatPage/publicDetails' // 浮动单页-详情
import noDataPage from '@/components/floatPage/noData' // 无数据
import * as types from '@s/store/shareApi/type.js'
import * as h5Types from '@/store/h5Home/type.js'
Vue.component(Spinner.name, Spinner)
Vue.component(Loadmore.name, Loadmore)
export default {
  name: 'messageList',
  data () {
    return {
      msgType: 1,
      floatTitle: '', // 漂浮页标题
      // currMsgList: [], // 1个人消息 2最新消息 3历史消息
      detail: '', // 消息详细内容
      detailType: '', // 消息类型：1个人消息、2最新消息、3历史消息
      noData: false, // 无数据页面显示
      pageNo: 1, // 分页
      pageSize: 20,
      totality: '', // 总页数
      nextlength: '', // 数据长度
      allLoaded: false, // 加载
      topStatus: '', // 上滑状态
      bottomStatus: '', // 下滑状态
      isload: true, // 是否还有下一页
      moreText: '',
      floatClass: 'floatNoData',
      sequence: '',
      showMore: false // 是否显示更多和没有更多提示
    }
  },
  computed: {
    ...mapState({
      isfloatPage: state => state.h5Home.isfloatPage, // 显示浮动单页
      floatPageType: state => state.h5Home.floatPageType, // 显示类型
      mssagesData: state => state.h5Home.mssagesData, // 消息列表参数
      msgCount: state => state.h5Home.msgCount, // 未读消息条数
      currMsgList: state => state.h5Home.currMsgList, // 1个人消息 2最新消息 3历史消息
      currMsgCount: state => state.h5Home.currMsgCount // 展示 消息列表 对象
    })
  },
  components: {
    floatPage,
    noDataPage
  },
  mounted () {
    this.$store.state.h5Home.headerType = 4
    this.$store.state.h5Home.headTitle = '消息记录'
    this.$store.state.h5Home.headLeft = 'icon-back'
    this.$store.state.h5Home.headRight = ''
    this.msgType = this.$store.state.h5Home.curSysMsgType
    this.$store.state.h5Home.currMsgList = []
    this.$store.state.h5Home.currMsgCount = 0
    // 初始化数据
    this.initData(this.msgType)
    // 获取消息条数
    if (this.$store.state.h5Home && !this.$store.state.h5Home.msgCount) {
      this.getMsgCount()
    }
  },
  methods: {
    // 上滑状态
    handleTopChange (status) {
      this.topStatus = status
    },
    // 下滑状态
    handleBottomChange (status) {
      this.bottomStatus = status
    },
    loadTop () {
      // 加载更多数据
      this.pageNo = 1
      this.isload = true
      this.initData(this.msgType, 0)
      this.allLoaded = false // 下拉加载后重置滑动加载
      this.$refs.loadmore.onTopLoaded()
    },
    loadBottom () {
      // 加载更多数据
      if (this.pageNo >= this.pageSize) {
        window.layer.msgWarn('您查询的数据过多，请到电脑端查看')
        this.$refs.loadmore.onBottomLoaded() // 刷新节点
        return
      }
      if (this.isload) {
        this.pageNo++
        this.getPageData()
      }
      this.$refs.loadmore.onBottomLoaded()
    },
    // 初始化数据
    initData (type) {
      let param = { 'page': 1 }
      this.$store.dispatch(h5Types.INITSYSMESSAGE, param).then(res => {
        if (type === 1) {
          if (res.data.personMessageList.length) {
            // 显示为个人消息
            this.$store.state.h5Home.currMsgList = res.data.personMessageList
            this.$store.state.h5Home.currMsgCount = res.data.personMessageCount
          } else {
            this.stickTop(this.mssagesData.personMessageList)
            this.noData = true
          }
        } else if (type === 2) {
          // 显示为最新消息
          if (res.data.newMessageList.length) {
            this.$store.state.h5Home.currMsgList = res.data.newMessageList
            this.$store.state.h5Home.currMsgCount = res.data.newMessagecount
          } else {
            this.stickTop(this.mssagesData.newMessageList)
            this.noData = true
          }
        } else {
          // 显示为历史消息
          if (res.data.historyMessageList.length) {
            this.$store.state.h5Home.currMsgList = res.data.historyMessageList
            this.$store.state.h5Home.currMsgCount = res.data.historyMessageCount
          } else {
            this.stickTop(this.mssagesData.historyMessageList)
            this.noData = true
          }
        }
        this.countNextPage()
        console.log(this.$store.state.h5Home.currMsgList.length, '--------------')
      })
    },
    getMsgCount () {
      let param = {hideLoading: true}
      this.$store.dispatch(h5Types.H5MSGCOUNT, param).then(res => {
      })
    },
    countNextPage () {
      // 计算是否还有下一页
      let nextlength = parseInt((this.$store.state.h5Home.currMsgCount + this.pageSize - 1) / this.pageSize)
      if (nextlength <= this.pageNo) {
        if (this.$store.state.h5Home.currMsgCount <= this.pageSize) {
          this.showMore = false
        } else {
          this.showMore = true
          this.moreText = '没有更多了'
          this.$nextTick(() => {
            window.$('#yoMore').addClass('gray-more')
          })
        }
        this.isload = false
      } else {
        this.showMore = true
        this.moreText = '更多'
        this.$nextTick(() => {
          window.$('#yoMore').removeClass('gray-more')
        })
        this.isload = true
      }
    },
    getPageData () {
      if (this.msgType === 1) {
        this.getPersonalMsg(1)
      } else if (this.msgType === 2) {
        this.getLastestMsg(1)
      } else {
        this.getHistoryMsg(1)
      }
    },
    getPersonalMsg (type) {
      // 个人消息
      this.$store.dispatch(types.INITPERSONALMSG, {currentPage: this.pageNo, pageSize: 20}).then(res => {
        if (res.code === 0) {
          if (!res.data.messageList.length) {
            this.allLoaded = true // 若数据已全部获取完毕
            this.isload = false
            return
          }
          if (Number(type) === 1) {
            this.$store.state.h5Home.currMsgList = window._._uniq(this.$store.state.h5Home.currMsgList.concat(res.data.messageList))
            this.$refs.loadmore.onBottomLoaded()
          }
          // 计算是否还有下一页
          this.countNextPage()
        }
      })
    },
    getLastestMsg (type) {
      // 最新消息
      this.$store.dispatch(types.INITLASTESTMSG, { currentPage: this.pageNo, pageSize: 20, msgType: 'hotNews' }).then(res => {
        if (res.code === 0) {
          if (!res.data.messageList.length) {
            this.allLoaded = true // 若数据已全部获取完毕
            this.isload = false
            return
          }
          if (Number(type) === 1) {
            this.$store.state.h5Home.currMsgList = window._._uniq(this.$store.state.h5Home.currMsgList.concat(res.data.messageList))
            this.$refs.loadmore.onBottomLoaded()
          }
          // 计算是否还有下一页
          this.countNextPage()
        }
      })
    },
    getHistoryMsg (type) {
      // 历史消息
      this.$store.dispatch(types.INITHISTORYMSG, { currentPage: this.pageNo, pageSize: 20, msgType: 'hotHistory' }).then(res => {
        if (res.code === 0) {
          if (!res.data.messageList.length) {
            this.allLoaded = true // 若数据已全部获取完毕
            this.isload = false
            return
          }
          if (Number(type) === 1) {
            this.$store.state.h5Home.currMsgList = window._._uniq(this.$store.state.h5Home.currMsgList.concat(res.data.messageList))
            this.$refs.loadmore.onBottomLoaded()
          }
          // 计算是否还有下一页
          this.countNextPage()
        }
      })
    },
    // 切换类型
    changeMessageTab (e) {
      if (this.msgType === e || !this.mssagesData) {
        // 相同则跳出
        return
      }
      this.pageNo = 1
      this.isload = true
      if (e === 1) {
        // 显示为个人消息
        this.stickTop(this.mssagesData.personMessageList)
        this.$store.state.h5Home.currMsgCount = this.mssagesData.personMessageCount
      } else if (e === 2) {
        // 显示为最新消息
        this.stickTop(this.mssagesData.newMessageList)
        this.$store.state.h5Home.currMsgCount = this.mssagesData.newMessagecount
      } else {
        // 显示为历史消息
        this.stickTop(this.mssagesData.historyMessageList)
        this.$store.state.h5Home.currMsgCount = this.mssagesData.historyMessageCount
      }
      // 计算是否还有下一页
      this.countNextPage()
      this.msgType = e
      this.$refs.loadmore.onBottomLoaded() // 刷新节点
      this.checkNoData()
      setTimeout(() => {
        this.$nextTick(() => {
          window.$('.messageList-more')[0].scrollTop = 0
        })
      }, 10)
    },
    checkNoData () {
      if (this.currMsgList && this.currMsgList.length >= 1) {
        return this.noData = false
      }
      this.noData = true
    },
    // 处理数据过多，内容拉动条不会置顶的问题
    stickTop (cur) {
      let _arr = [...cur]
      if (_arr.length > 4) {
        this.$store.state.h5Home.currMsgList = _arr.splice(0, 4)
        this.$nextTick(() => {
          this.$store.state.h5Home.currMsgList = cur
        })
      } else {
        this.$store.state.h5Home.currMsgList = cur
      }
    },
    /* 查看消息详情
    ** item 数据列表
    ** index 当前类型，1=个人消息，2=最新消息，3=历史消息
    */
    messageDetail (item, index, num) {
      this.$store.state.h5Home.msgCount--
      this.floatTitle = '消息详情'
      this.$store.state.h5Home.isfloatPage = true
      this.$store.state.h5Home.floatPageType = 5
      this.detail = item
      this.detailType = index
      this.sequence = num
      if (this.msgType === 1) {
        this.getUpdataMsg(item)
      }
    },
    // 修改讯息已读未读
    getUpdataMsg (item) {
      if (item.isRead === 0) {
        this.$store.dispatch(h5Types.H5UPDATEPERSONMSG, { msgId: item.id, opType: 'update' }).then(res => {
          if (res.status === '0' || res.status === 0) {
            item.isRead = 1 // OT-4794
          }
          // 刷新 剩余消息数目
          this.getMsgCount()
        })
      }
    }
  }
}
</script>
